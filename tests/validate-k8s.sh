#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_dir/k8s"

export KUBECONFIG="$repo_dir/ansible/kubeconfig/k3s.yaml"
kubectl get nodes

CRD_SCHEMAS='https://raw.githubusercontent.com/datreeio/CRDs-catalog/main/{{.Group}}/{{.ResourceKind}}_{{.ResourceAPIVersion}}.json'

# Reads manifests from the given files, or stdin if none
validate() {
  # SOPS adds a top-level `sops:` field to encrypted files, which -strict would reject
  # The default schemas have none for CustomResourceDefinition itself
  yq 'del(.sops)' "$@" | kubeconform -strict -summary -skip CustomResourceDefinition \
    -schema-location default -schema-location "$CRD_SCHEMAS"
}

# Each Flux Kustomization in the cluster points at a path, which the diff below needs

clusters=clusters/home
mapfile -t names < <(yq -N '.metadata.name' $clusters/*.yaml)
mapfile -t paths < <(yq -N '.spec.path' $clusters/*.yaml)

# Renders every Flux Kustomization and HelmRelease offline, as Flux would apply them
echo "== flate test"
flate test all --path "$clusters"

echo "== flate build"
flate build all --path "$clusters" | validate

# flate never emits SOPS-encrypted files, so check their structure directly
echo "== sops"
mapfile -t sops_files < <(find . -name '*.sops.yaml')
if (( ${#sops_files[@]} )); then
  validate "${sops_files[@]}"
fi

# Server-side dry-run against the live cluster; changes are expected, so this only reports them

if ! command -v flux >/dev/null || ! kubectl get --raw /readyz >/dev/null 2>&1; then
  echo "Skipping cluster diff (flux not installed or cluster unreachable)"
  exit 0
fi

for i in "${!names[@]}"; do
  echo "== diff ${names[$i]}"
  flux diff kustomization "${names[$i]}" --path "$repo_dir/${paths[$i]#./}" --progress-bar=false || true
done
