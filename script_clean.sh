#!/bin/bash

echo "🧹 Очищаем проект..."

# ⚡ Очистка Hugo

rm -rf public
rm -rf resources
rm -rf .hugo_build.lock
rm -rf hugo_stats.json

# ⚡ Очистка Node / toolchain

rm -rf node_modules
rm -rf .cache
rm -rf package-lock.json

# ⚡ Переустановка зависимостей, нужных для Hugo Tailwind pipeline

echo "📦 Переустанавливаем зависимости..."

npm install

echo "🚀 Готово. Запусти hugo server."