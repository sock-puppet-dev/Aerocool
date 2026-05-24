#!/bin/bash

# Назначение:
#   Запустить локальный сервер Hugo для ежедневной разработки.
#
# Когда использовать:
#   - когда нужно открыть сайт локально и сразу видеть изменения в content/,
#     layouts/, assets/css/main.css и других исходниках;
#   - перед ручной проверкой страниц в браузере;
#   - после мягкой очистки через ./scripts/script_clean.sh.
#
# Как использовать:
#   ./scripts/script_start.sh
#
# Что делает:
#   Выполняет hugo server из корня проекта. Tailwind CSS собирается внутри
#   Hugo-пайплайна, отдельный Tailwind watch-процесс запускать не нужно.

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "🌟 Запускаем сервер Hugo со встроенным Tailwind-пайплайном"
exec hugo server
