#!/bin/bash

# Назначение:
#   Показать краткую карту всех root helper-скриптов проекта.
#
# Когда использовать:
#   - если забыл, какой скрипт нужен для конкретной задачи;
#   - при первом знакомстве с проектом;
#   - перед выбором между build, check, Netlify Dev, audit, clean и reset.
#
# Как использовать:
#   ./script_help.sh
#
# Что делает:
#   Печатает список скриптов, их назначение и безопасный порядок ежедневной
#   работы. Ничего не устанавливает, не удаляет и не запускает.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

cat <<'HELP'
Aerocool helper scripts

Первый запуск проекта:
  ./script_setup.sh
    Подтянуть git-подмодули, установить версии через mise, поставить npm-зависимости.

Ежедневная разработка:
  ./script_start.sh
    Запустить локальный Hugo server.

  ./script_build.sh
    Собрать сайт в development-режиме.

  ./script_check.sh
    Запустить базовую проверку перед коммитом.

Production/SEO:
  ./script_build_production.sh
    Собрать сайт в production-режиме локально.

Netlify routing и headers:
  ./script_netlify_dev.sh
    Собрать public/ и запустить Netlify Dev на http://localhost:8899.

  ./script_check_routes.sh
    Проверить ключевые URL и scanner/sensitive 404. Требует запущенный Netlify Dev.

Аудит качества:
  ./script_audit_urls.sh
    Запустить Unlighthouse-аудит критических URL.

Очистка:
  ./script_clean.sh
    Безопасно очистить только Hugo-артефакты: public/, resources/, lock-файлы сборки.

  ./script_reset_full.sh
    Полностью переустановить npm-зависимости, но сохранить package-lock.json.

  ./script_reset_full.sh --with-lockfile
    Самый жесткий reset: дополнительно удалить package-lock.json и создать его заново.

Рекомендуемый обычный цикл:
  ./script_start.sh
  ./script_check.sh

После изменений Netlify routing/headers:
  ./script_netlify_dev.sh
  ./script_check_routes.sh
HELP
