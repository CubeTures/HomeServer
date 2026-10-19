# Secrets

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

### `k8s/infra/tailscale/auth.sops.yaml`

```yml
stringData:
    client_secret: ""
```

#### Tailscale OAuth Credential

- Access Controls > Definitions > Tags > Create Tag
    - `home`, owner `autogroup:admin`
- Settings > Trust Credentials > New Credential
    - Keys: Auth Keys (write) + `tag:home`

### headlamp

```bash
kubectl -n headlamp get secret headlamp-token \
  -o jsonpath='{.data.token}' | base64 -d; echo
```