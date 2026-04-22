# Руководство По `mise`

Короткий справочник по `mise` для текущего проекта `Aerocool`.

## Актуальные Версии Проекта

- `Hugo 0.157.0`
- `Node 24`

Именно эти версии зафиксированы в `netlify.toml`, поэтому локальная среда через `mise` должна совпадать с ними максимально близко.

## Базовая Диагностика

```bash
mise version
mise doctor
mise current hugo
mise which hugo
mise ls --installed
```

## Hugo Через Стандартный Backend

```bash
mise install hugo@0.157.0
mise use hugo@0.157.0
mise use --global hugo@0.157.0
mise uninstall hugo@0.153.0
```

Если стандартный backend не дает нужную старшую или младшую версию, для Hugo в этом проекте удобнее использовать `aqua`.

## Hugo Через Aqua

В `mise` с backend `aqua` инструмент задается как `aqua:<owner>/<repo>`.

```bash
mise install aqua:gohugoio/hugo@0.157.0
mise use aqua:gohugoio/hugo@0.157.0
mise use --global aqua:gohugoio/hugo@0.157.0
mise uninstall aqua:gohugoio/hugo@0.157.0
```

## Практическая Проверка После Переключения

```bash
hugo version
node -v
npm -v
```

После этого можно запускать проект:

```bash
npm install
npm run dev
```

или production-подобную проверку:

```bash
hugo --environment production --minify --gc --cleanDestinationDir
```
