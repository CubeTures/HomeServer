#!/usr/bin/env bash
set -euo pipefail

# Usage: sops/sops.sh <sops args...>
# e.g. sops/sops.sh edit path/to/file.sops.yml

sops_dir="$(cd "$(dirname "$0")" && pwd)"
repo_dir="$(dirname "$sops_dir")"

export SOPS_DIR="$sops_dir"
export SOPS_USER="$(id -u):$(id -g)"

tty=-T
[ -t 0 ] && [ -t 1 ] && tty=

exec docker compose -f "$sops_dir/docker-compose.yml" run --rm --quiet-pull $tty \
  -v "$repo_dir:$repo_dir" -w "$PWD" \
  sops sops "$@"	
