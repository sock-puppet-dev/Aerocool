#!/bin/bash

# Назначение:
#   Выполнить базовую локальную проверку проекта перед коммитом.
#
# Когда использовать:
#   - после правок content/, layouts/, assets/, static/ или config-файлов;
#   - перед git commit;
#   - перед ручной проверкой сайта в браузере;
#   - когда нужно быстро поймать типичные нарушения правил проекта.
#
# Как использовать:
#   ./script_check.sh
#
# Что делает:
#   Запускает обычную development-сборку, проверяет наличие public/_redirects,
#   ищет случайные .DS_Store, запрещенные markdown H1 в content/, inline-code
#   в видимом content/ и устаревшее поле schema_type.
#
# Важно:
#   Скрипт намеренно проверяет только быстрый базовый слой. Для Netlify routing
#   использовать ./script_netlify_dev.sh и ./script_check_routes.sh.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if ! command -v rg >/dev/null 2>&1; then
  echo "ripgrep is required for content checks. Install rg and run this script again."
  exit 1
fi

echo "Running Hugo development build"
npm run build

echo "Checking generated Netlify redirects file"
if [ ! -f "public/_redirects" ]; then
  echo "public/_redirects was not generated. Check static/_redirects and Hugo build output."
  exit 1
fi

echo "Checking for accidental .DS_Store files"
DS_STORE_FILES="$(find static public -name '.DS_Store' -print)"
if [ -n "$DS_STORE_FILES" ]; then
  echo "Found .DS_Store files that should not be committed:"
  printf '%s\n' "$DS_STORE_FILES"
  exit 1
fi

echo "Checking that content files do not contain markdown H1 headings"
H1_MATCHES="$(rg -n '^# ' content --glob '*.md' || true)"
if [ -n "$H1_MATCHES" ]; then
  echo "Found markdown H1 headings in content files. Use front matter h1/title instead:"
  printf '%s\n' "$H1_MATCHES"
  exit 1
fi

echo "Checking that visible content does not use inline-code backticks"
BACKTICK_MATCHES="$(rg -n '`[^`]+`' content --glob '*.md' || true)"
if [ -n "$BACKTICK_MATCHES" ]; then
  echo "Found inline-code backticks in content files. Use bold text for visible content values:"
  printf '%s\n' "$BACKTICK_MATCHES"
  exit 1
fi

echo "Checking that content uses schema_types, not schema_type"
SCHEMA_TYPE_MATCHES="$(rg -n 'schema_type:' content --glob '*.md' || true)"
if [ -n "$SCHEMA_TYPE_MATCHES" ]; then
  echo "Found schema_type in content files. Use schema_types instead:"
  printf '%s\n' "$SCHEMA_TYPE_MATCHES"
  exit 1
fi

echo "Checking noindex on generated service pages when present"
for NOINDEX_FILE in \
  public/404.html \
  public/ru/404.html \
  public/search/index.html \
  public/ru/search/index.html
do
  if [ -f "$NOINDEX_FILE" ]; then
    if ! rg -q 'noindex,nofollow' "$NOINDEX_FILE"; then
      echo "$NOINDEX_FILE does not contain noindex,nofollow."
      exit 1
    fi
  fi
done

echo "Basic project checks passed."
