#!/bin/bash

# Назначение:
#   Быстро проверить ключевые локальные маршруты и scanner/sensitive 404.
#
# Когда использовать:
#   - после запуска ./scripts/script_netlify_dev.sh;
#   - после правок static/_redirects;
#   - после правок netlify.toml или 404-шаблона;
#   - когда нужно быстро увидеть, что реальные страницы дают 200, а scanner URL
#     остаются 404.
#
# Как использовать:
#   ./scripts/script_check_routes.sh
#   ./scripts/script_check_routes.sh http://localhost:8899
#
# Что делает:
#   Отправляет HEAD/GET-запросы через curl к локальному Netlify Dev и проверяет
#   ожидаемые HTTP-статусы.
#
# Важно:
#   Перед запуском должен быть активен сервер Netlify Dev на указанном URL.

set -euo pipefail

BASE_URL="${1:-http://localhost:8899}"
BASE_URL="${BASE_URL%/}"

check_status() {
  local path="$1"
  local expected_status="$2"
  local actual_status

  actual_status="$(curl -sS -o /dev/null -w '%{http_code}' "$BASE_URL$path")"

  if [ "$actual_status" != "$expected_status" ]; then
    echo "$path expected $expected_status, got $actual_status"
    exit 1
  fi

  echo "$path -> $actual_status"
}

echo "Checking routes on $BASE_URL"

check_status "/" "200"
check_status "/ru/" "200"
check_status "/404.html" "200"
check_status "/ru/404.html" "200"
check_status "/wp-login.php" "404"
check_status "/.env" "404"
check_status "/dev/phpinfo.php" "404"
check_status "/_nuxt/manifest.json" "404"

echo "Route checks passed."
