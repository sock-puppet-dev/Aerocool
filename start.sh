#!/bin/bash
# ↑ Указывает системе запускать скрипт через Bash (оболочку командной строки)

set -e
# ↑ Скрипт остановится, если какая-то команда завершится с ошибкой

trap "kill 0" EXIT
# Автоматически убиваем все фоновые процессы при выходе (например, CTRL+C)
# убиваются все фоновые процессы, включая Tailwind dev-сервер.

echo "🚀 Starting Tailwind dev server in background..."

npm run dev &
# Tailwind / PostCSS dev-сервер в фоне, чтобы терминал не блокировался.

echo "🌟 Starting Hugo server..."

hugo server
# Hugo dev-сервер в первом плане, выводится в терминал.
