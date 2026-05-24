#!/bin/bash

# Назначение:
#   Запустить локальную проверку собранного сайта через Netlify Dev.
#
# Когда использовать:
#   - после правок static/_redirects;
#   - после правок netlify.toml;
#   - после изменений 404, headers, CSP или cache rules;
#   - когда нужно проверить поведение ближе к Netlify, а не только Hugo server.
#
# Как использовать:
#   ./scripts/script_netlify_dev.sh
#
# Что делает:
#   Сначала собирает сайт через npm run build, затем запускает Netlify Dev
#   поверх папки public на http://localhost:8899.
#
# Важно:
#   Этот процесс остается запущенным, пока его не остановить через Ctrl+C.
#   В другом терминале можно запустить ./scripts/script_check_routes.sh.

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "Building site before Netlify Dev"
npm run build

echo "Starting Netlify Dev on http://localhost:8899"
exec npm exec --yes --package=netlify-cli netlify -- dev -d public --offline --skip-gitignore --no-open --port 8899
