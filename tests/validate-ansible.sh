#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "$0")/.." && pwd)"

# Also syntax-checks every playbook; ansible-lint 6.x (apt) only finds the config automatically when it has no .yml extension
echo "== ansible-lint"
cd "$repo_dir/ansible"
ansible-lint -c .ansible-lint.yml
