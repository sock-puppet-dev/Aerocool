#!/bin/bash

# Назначение:
#   Запустить быстрый Unlighthouse-аудит критических URL.
#
# Когда использовать:
#   - после крупных правок CSS, шаблонов, изображений или SEO-метаданных;
#   - перед публикацией или проверкой Netlify Deploy Preview;
#   - когда нужно проверить не весь сайт, а заранее выбранный набор важных URL.
#
# Как использовать:
#   ./script_audit_urls.sh
#
# Что делает:
#   Переходит в папку unlighthouse, при необходимости ставит зависимости,
#   проверяет TypeScript-конфиги и запускает npm run audit:urls.
#
# Важно:
#   Unlighthouse проверяет опубликованный URL или URL из своего конфига. Этот
#   скрипт не деплоит сайт и не заменяет Netlify-проверку.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/unlighthouse"

if [ ! -d "node_modules" ]; then
  echo "Installing Unlighthouse npm dependencies"
  npm install
fi

echo "Checking Unlighthouse TypeScript config"
npm run check:types

echo "Running critical URL audit"
npm run audit:urls
