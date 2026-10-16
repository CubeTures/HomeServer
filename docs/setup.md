# Setup

Use this file to guide the setup of the local system before running playbooks.

## Proxmox

// TODO

## Ansible

```bash
apt install ansible
```

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
