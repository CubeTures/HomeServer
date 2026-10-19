# Technologies

## Future Technologies

### Definitely Use

#### Infra

- ZFS Proxmox VE
    - https://www.proxmox.com/en/
    - Easily spin up multiple VMs
    - Great for ansible and messing around

#### Services

- GitHub Runner
    - https://github.com/myoung34/docker-github-actions-runner
    - For CI/CD builds of custom apps
- Some backup service
    - https://www.backblaze.com/cloud-storage
    - Blackblaze B2
- Pocket ID
    - https://pocket-id.org/
    - IdP but passkeys (no more passwords!)

### Possibly Use

#### Infra

- Tofu Controller
    - https://github.com/flux-iac/tofu-controller
    - Applying terraform in k8s
- Reloader
    - https://github.com/stakater/Reloader
    - Only if Flux doesn't already cover this
- Cloudflared
    - https://github.com/cloudflare/cloudflared
    - Tunneling without port forwarding
- DNS Server
    - For resolving nested subdomains on tailscale?

#### Services

- VictoriaMetrics, VictoriaLogs
    - https://github.com/VictoriaMetrics
    - For server metrics and logs
- ntfy
    - https://ntfy.sh/
    - Push notifications

## Ported Technologies

### Definitely Use

#### Services

- VGMDJ
- FlareSolverr
- Restic Rest Server
- Obsidian Livesync
- RomM
    - Postgres
- Vaultwarden

### Possibly Use

#### Services

- Registry
    - Might be built in to Flux

## Using

- Debian
- Ansible
- k3s
- Flux
- Tailscale
- Homepage
- CloudNativePG
- Jellyfin
- Immich
