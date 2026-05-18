#!/bin/bash

# Назначение:
#   Сделать полный сброс локальных артефактов Hugo и npm-зависимостей.
#
# Когда использовать:
#   - если node_modules или npm lock-файл явно сломались;
#   - после проблем с зависимостями Tailwind, Netlify Database или Node;
#   - когда мягкой очистки ./script_clean.sh недостаточно.
#
# Как использовать:
#   ./script_reset_full.sh
#
# Что делает:
#   Удаляет public, resources, .hugo_build.lock, hugo_stats.json, node_modules,
#   .cache и package-lock.json, затем заново запускает npm install.
#
# Важно:
#   Это тяжелая операция. Для обычной ежедневной работы сначала использовать
#   ./script_clean.sh, а полный reset запускать только при реальной необходимости.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Resetting Hugo artifacts, Node dependencies, and npm lockfile"

rm -rf public resources .hugo_build.lock hugo_stats.json
rm -rf node_modules .cache package-lock.json

echo "Installing npm dependencies"
npm install

echo "Done. Run ./script_start.sh to start local development."
