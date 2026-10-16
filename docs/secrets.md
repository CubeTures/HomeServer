# Config

After following [docs/setup.md](setup.md), use this guide to create the secrets files for the repo.

### `ansible/group_vars/all.sops.yml`

```yml
flux_github_token: ""
```

#### GitHub Access Token

- Profile > Settings > Developer Settings > Fine-grained Tokens > Generate new token
- Repository access > home-server
- Add permissions
    - Administration (read & write)
    - Content (read & write)
    - Metadata (read)

> The token is only used during bootstrap so the expiration only needs to exist until then

### `k8s/infra/tailscale/operator-oauth.sops.yaml`

```yml
stringData:
    client_id: ""
    client_secret: ""
```

#### Tailscale OAuth Credentials

- Access Controls > Definitions > Tags > Create Tags
    - `k8s-operator`, no owner
    - `k8s`, owner `k8s operator`
- Settings > Trust Credentials > New Credential
    - Write permission with the `k8s-operator` tag
        - General: Services
        - Devices: Core
        - Keys: Auth Keys
