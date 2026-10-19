# Setup

Use this file to guide the setup of the local system before running playbooks and then understand what each playbook does.

## Proxmox

// TODO

## Ansible

```bash
apt install ansible
```

### Playbooks

#### Local

This playbook holds two different roles which install local tools for development.

- Validate
    - Installs the required tools to be able to run `validate.sh`
- VM
    - Creates and configures a `virsh` vm for development

```bash
cd ansible && ansible-playbook local.yml -K --tags <playbook>
```

#### Server

This playbook set up the required technologies for the server to run.

```bash
cd ansible && ansible-playbook server.yml
```

## SOPS and age

`sops/age.key` and `sops/age.pub`

```bash
apt install age
age-keygen -o age.key
age-keygen -y age.key > age.pub
```

> Add the age.pub to .sops.yaml
