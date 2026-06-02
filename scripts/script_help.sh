#!/bin/bash

# Назначение:
#   Показать краткую карту всех helper-скриптов из папки scripts/.
#
# Когда использовать:
#   - если забыл, какой скрипт нужен для конкретной задачи;
#   - при первом знакомстве с проектом;
#   - перед выбором между build, check, Netlify Dev, audit, clean и reset.
#
# Как использовать:
#   ./scripts/script_help.sh
#
# Что делает:
#   Печатает список скриптов, их назначение и безопасный порядок ежедневной
#   работы. Ничего не устанавливает, не удаляет и не запускает.

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

cat <<'HELP'
Aerocool helper scripts

Первый запуск проекта:
  ./scripts/script_setup.sh
    Подтянуть git-подмодули, установить версии через mise, поставить npm-зависимости.

Ежедневная разработка:
  ./scripts/script_start.sh
    Запустить локальный Hugo server.

  ./scripts/script_build.sh
    Собрать сайт в development-режиме.

  ./scripts/script_check.sh
    Запустить базовую проверку перед коммитом.

Production/SEO:
  ./scripts/script_build_production.sh
    Собрать сайт в production-режиме локально.

Netlify routing и headers:
  ./scripts/script_netlify_dev.sh
    Собрать public/ и запустить Netlify Dev на http://localhost:8899.

  ./scripts/script_check_routes.sh
    Проверить ключевые URL и scanner/sensitive 404. Требует запущенный Netlify Dev.

Очистка:
  ./scripts/script_clean.sh
    Безопасно очистить только Hugo-артефакты: public/, resources/, lock-файлы сборки.

  ./scripts/script_reset_full.sh
    Полностью переустановить npm-зависимости, но сохранить package-lock.json.

  ./scripts/script_reset_full.sh --with-lockfile
    Самый жесткий reset: дополнительно удалить package-lock.json и создать его заново.

Рекомендуемый обычный цикл:
  ./scripts/script_start.sh
  ./scripts/script_check.sh

После изменений Netlify routing/headers:
  ./scripts/script_netlify_dev.sh
  ./scripts/script_check_routes.sh
HELP
