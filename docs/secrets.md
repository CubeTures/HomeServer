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

### `k8s/apps/personal/vgmdj/secrets.sops.yaml`

See [VGMDJ/SETUP.md](https://github.com/CubeTures/VGMDJ/blob/main/SETUP.md)

```yml
stringData:
	JELLYFIN_USER_ID: ""
	JELLYFIN_TOKEN: ""
```

### `k8s/apps/personal/daily/secrets.sops.yaml`

See [DailyGamesBot/SETUP.md](https://github.com/CubeTures/DailyGamesBot/blob/main/SETUP.md)

```yml
stringData:
    DISCORD_BOT_TOKEN: ""
    DISCORD_RESULTS_CHANNEL_ID: ""
    DGB_PUBLIC_URL: ""
```

### `k8s/apps/obsidian-livesync/secrets.sops.yaml`

```yml
stringData:
    COUCHDB_USER: ""
    COUCHDB_PASSWORD: ""
```

### headlamp

// TODO

```bash
kubectl -n headlamp get secret headlamp-token \
  -o jsonpath='{.data.token}' | base64 -d; echo
```
