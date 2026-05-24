#!/bin/bash

# Назначение:
#   Собрать сайт локально в production-режиме Hugo.
#
# Когда использовать:
#   - перед финальной SEO-проверкой индексируемых страниц;
#   - перед переходом Netlify из development/noindex в production;
#   - после SEO, schema.org, sitemap, robots или metadata-правок.
#
# Как использовать:
#   ./scripts/script_build_production.sh
#
# Что делает:
#   Запускает npm run build:production, то есть Hugo-сборку с
#   --environment production --gc --minify. Это не меняет netlify.toml,
#   а только проверяет production-поведение локально.

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "Building Hugo site in production mode"
npm run build:production
