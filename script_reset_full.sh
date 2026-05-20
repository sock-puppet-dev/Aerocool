#!/bin/bash

# Назначение:
#   Сделать полный сброс локальных артефактов Hugo и npm-зависимостей.
#
# Когда использовать:
#   - если node_modules явно сломались;
#   - после проблем с зависимостями Tailwind, Netlify Database или Node;
#   - когда мягкой очистки ./script_clean.sh недостаточно.
#
# Как использовать:
#   ./script_reset_full.sh
#   ./script_reset_full.sh --with-lockfile
#
# Что делает:
#   По умолчанию удаляет public, resources, .hugo_build.lock, hugo_stats.json,
#   node_modules и .cache, затем заново запускает npm install. package-lock.json
#   сохраняется, чтобы dependency state оставался стабильным.
#
# Важно:
#   Это тяжелая операция. Для обычной ежедневной работы сначала использовать
#   ./script_clean.sh, а полный reset запускать только при реальной необходимости.
#   Флаг --with-lockfile удаляет package-lock.json и нужен только когда lock-файл
#   действительно поврежден или его нужно намеренно пересоздать.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

REMOVE_LOCKFILE="false"

case "${1:-}" in
  "")
    ;;
  "--with-lockfile")
    REMOVE_LOCKFILE="true"
    ;;
  *)
    echo "Unknown argument: $1"
    echo "Usage: ./script_reset_full.sh [--with-lockfile]"
    exit 1
    ;;
esac

echo "Resetting Hugo artifacts and Node dependencies"

rm -rf public resources .hugo_build.lock hugo_stats.json
rm -rf node_modules .cache

if [ "$REMOVE_LOCKFILE" = "true" ]; then
  echo "Removing package-lock.json by explicit request"
  rm -f package-lock.json
else
  echo "Keeping package-lock.json"
fi

echo "Installing npm dependencies"
npm install

echo "Done. Run ./script_start.sh to start local development."
