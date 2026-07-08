#!/bin/bash
# Sync this folder with GitHub — run any time, safe to repeat.
# Usage: ./sync.sh ["optional commit message"]
set -e
cd "$(dirname "$0")"
git pull --rebase --autostash origin main
if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "${1:-sync: $(date '+%Y-%m-%d %H:%M') local changes}"
fi
git push origin main
echo "✅ In sync with GitHub ($(git rev-parse --short HEAD))"
