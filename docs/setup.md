# Setup

Use this file to guide the setup of the local system before running playbooks.

## Docker

Install docker on the server using [their guides](https://docs.docker.com/engine/install/).

> `sudo usermod -aG docker $USER` and re-login to grant non-root docker perms.

## SOPS and age

`sops/age.key` and `sops/age.pub`

```bash
apt install age
age-keygen -o age.key
age-keygen -y age.key > age.pub
```

> Write the age.pub to .sops.yaml

## GitHub Access Token

- Profile > Settings > Developer Settings > Fine-grained Tokens > Generate new token
- Repository access > home-server
- Add permissions
    - Administration (read & write)
    - Content (read & write)
    - Metadata (read)

> The token is only used during bootstrap so the expiration only needs to exist until then
