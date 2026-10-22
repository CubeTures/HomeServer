# Local Development

Follow these steps to setup a local development environment.

## `libvirt`

```bash
sudo apt install libvirt-daemon-system virtinst
```

> `sudo usermod -aG libvirt $USER` and re-login to grant non-root libvirt perms.

```bash
set -Ux LIBVIRT_DEFAULT_URI qemu:///system # fish; makes virsh use the system VMs, not per-user ones
virsh net-autostart default
virsh net-start default # fine if it says "already active"
```

## Debian Image

```bash
sudo wget -O /var/lib/libvirt/images/debian-13-genericcloud-amd64.qcow2 \
  https://cloud.debian.org/images/cloud/trixie/latest/debian-13-genericcloud-amd64.qcow2
```

## Create VM

- Run `cd ansible && ansible-playbook local.yml -K` to create the VM
    - `-e vm_rebuild=true` to destroy and recreate it

## Commands

Useful commands once setup:

```bash
virsh shutdown k3s
virsh start k3s
virsh list --all
ssh cube@<ip>
flux reconcile kustomization apps --with-source
kubectl -n <namespace> rollout restart # update secrets

flux suspend kustomization apps
export KUBECONFIG="ansible/kubeconfig/k3s.yaml" && \
	sops/sops.sh -d k8s/apps/homepage/secrets.sops.yaml | kubectl apply -n homepage -f - && \
	kubectl kustomize k8s/apps/homepage | yq 'select(.kind != "Secret")' | kubectl apply --server-side --force-conflicts -f - && \
	kubectl -n homepage rollout restart deploy/homepage && \
	kubectl -n homepage rollout status deploy/homepage
flux resume kustomization apps
```

## Testing

- Run `cd ansible && ansible-playbook local.yml -K` to install the dependencies
- Run `tests/validate-k8s.sh` and `tests/validate-ansible.sh` to validate
