#!/bin/bash

# Назначение:
#   Быстро очистить только Hugo-артефакты сборки без сброса зависимостей.
#
# Когда использовать:
#   - если локальная сборка ведет себя странно из-за старого public/ или
#     resources/;
#   - перед чистой локальной сборкой через ./scripts/script_build.sh;
#   - когда нужна безопасная очистка без удаления node_modules и
#     package-lock.json.
#
# Как использовать:
#   ./scripts/script_clean.sh
#
# Что делает:
#   Удаляет public, resources, .hugo_build.lock и hugo_stats.json.
#   Не трогает node_modules, .cache и package-lock.json. Для полного сброса
#   использовать ./scripts/script_reset_full.sh.

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "Cleaning Hugo build artifacts"

rm -rf public resources .hugo_build.lock hugo_stats.json

echo "Done. Node dependencies and package-lock.json were kept."
