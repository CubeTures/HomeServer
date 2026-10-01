# Home Server

## Future Technologies

### Definitely Use

#### Infra

- Proxmox VE
    - https://www.proxmox.com/en/
    - Easily spin up multiple VMs
    - Great for ansible and messing around
- ZFS Headless Debian
    - https://wiki.debian.org/ZFS
    - Build in software RAID
- Ansible
    - install via apt
    - Set up config files on how to configure the VM
- k3s
    - https://k3s.io/
    - Lightweight k8s targeted for a single node
- Flux
    - https://fluxcd.io/
    - CD for k8s

#### Services

- Homepage
    - https://gethomepage.dev/
    - Clean landing page for app access and stats
- GitHub Runner
    - https://github.com/myoung34/docker-github-actions-runner
    - For CI/CD builds of custom apps
- Some backup service

### Possibly Use

#### Infra

- Tofu Controller
    - https://github.com/flux-iac/tofu-controller
    - Applying terraform in k8s
- Reloader
    - https://github.com/stakater/Reloader
    - Only if Flux doesn't already cover this
- CloudNativePG
    - https://cloudnative-pg.io/
    - Config declaration of dbs and users

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

- Tailscale
- Jellyfin
- VGMDJ
- FlareSolverr
- Immich
	- Postgres
	- Redis
	- Immich Server
	- Immich Machine Learning
- Restic Rest Server
- Obsidian Livesync
- RomM
	- Postgres
- Vaultwarden

### Possibly Use

#### Services

- Registry
    - Might be built in to Flux
