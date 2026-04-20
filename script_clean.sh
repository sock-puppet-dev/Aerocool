#!/bin/bash

echo "🧹 Cleaning project..."

# ⚡ Очистка Hugo

rm -rf public

rm -rf resources

rm -rf .hugo_build.lock

rm -rf hugo_stats.json

# ⚡ Очистка Node / toolchain

rm -rf node_modules

rm -rf .cache

rm -rf package-lock.json

# ⚡ Переустановка зависимостей, нужных Hugo Tailwind pipeline

echo "📦 Reinstalling..."

npm install

echo "🚀 Done. Run hugo server."

