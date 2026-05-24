#!/bin/bash

# Назначение:
#   Собрать сайт локально в обычном development-режиме проекта.
#
# Когда использовать:
#   - после правок content/, layouts/, assets/ или static/;
#   - перед коммитом, чтобы проверить, что Hugo-сборка не сломана;
#   - перед локальной проверкой public/ и сгенерированных файлов.
#
# Как использовать:
#   ./scripts/script_build.sh
#
# Что делает:
#   Запускает npm run build, а эта команда выполняет Hugo-сборку с
#   --environment development --gc --minify. В текущем режиме HTML-страницы
#   остаются noindex,nofollow, как задано для безопасной разработки.

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "Building Hugo site in development mode"
npm run build
