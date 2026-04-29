# Аудит соответствия проекта Hugo v0.160.1

Дата аудита: 2026-04-29  
Проект: Aerocool Ukraine  
Цель: проверить готовность всего проекта к Hugo 0.160.1 и затронутым изменениям документации Hugo 0.160.x.

## Итоговый вердикт

Проект совместим с Hugo 0.160.1. Тестовая production-сборка на реальном `hugo@0.160.1` проходит без `path`, `i18n` и deprecation warnings. `npm run build` под `hugo@0.160.1` и Node 24 тоже проходит.

С точки зрения кода проекта переход на Hugo 0.160.1 безопасен. Фактический переход ещё не выполнен только в toolchain-конфигурации: `.mise.toml` и `netlify.toml` всё ещё закрепляют Hugo 0.158.0.

## Использованные официальные источники

- [Hugo v0.160.1 release notes](https://github.com/gohugoio/hugo/releases/tag/v0.160.1)
- [Hugo v0.160.0 release notes](https://github.com/gohugoio/hugo/releases/tag/v0.160.0)
- [css.Build](https://gohugo.io/functions/css/build/)
- [css.TailwindCSS](https://gohugo.io/functions/css/tailwindcss/)
- [Node.js dependencies in Hugo Modules](https://gohugo.io/hugo-modules/nodejs-dependencies/)
- [Configure languages](https://gohugo.io/configuration/languages/)
- [Render hooks](https://gohugo.io/render-hooks/)

## Что важно в Hugo 0.160.x

Hugo 0.160.0:

- Добавил `vars` option для `css.Build`, который позволяет инжектить CSS custom properties через `@import "hugo:vars"`.
- Обновил и уточнил `.Position` в Goldmark render hooks.
- Исправил double-escaping ampersands в Goldmark link URLs.
- Исправил проблемы partial decorator в script context.

Hugo 0.160.1:

- Исправил panic при passthrough elements внутри headings.
- Исправил panic при legacy mapped template names.
- Исправил утечки context markers в `RenderShortcodes`.
- Исправил auto-creation root sections в multilingual sites.

Затронутые зоны проекта:

- CSS pipeline: проект использует `css.TailwindCSS`, не `css.Build`.
- Render hooks: локальные `_markup/render-link` и `_markup/render-table` есть, но `.Position` не используют.
- `RenderShortcodes`: в проекте не найден.
- Passthrough headings: в контенте/шаблонах не найдено специфичного использования, которое попадает под bugfix 0.160.1.
- Multilingual root sections: проект многоязычный, поэтому проверка sitemap/output была обязательной; проблем не найдено.

## Проверенные команды

```bash
mise x hugo@0.160.1 -- hugo version
mise x hugo@0.160.1 -- hugo --environment production --gc --minify --printPathWarnings --printI18nWarnings --templateMetrics --templateMetricsHints
mise x hugo@0.160.1 node@24 -- npm run build
mise x hugo@0.160.1 -- hugo config
mise x hugo@0.160.1 -- hugo mod graph
mise x hugo@0.160.1 -- hugo mod npm pack --help
rg -n --glob '!themes/**' --glob '!public/**' --glob '!resources/**' --glob '!node_modules/**' 'languageCode|languageName|languageDirection|LanguageCode|LanguageName|LanguageDirection|\.Language\.Lang|\.Site\.Language\.Lang|site\.Language\.Lang|\.Lang\b|site\.Sites\b|\.Site\.Sites\b|\.Page\.Sites\b|site\.Data\b|\.Site\.Data\b|excludeFiles|includeFiles|:filename' layouts hugo.yaml netlify.toml package.json
rg -n --glob '!public/**' --glob '!resources/**' --glob '!node_modules/**' 'RenderShortcodes|\.Position\b|passthrough|cascade\.|_target\b|css\.Build|hugo:vars|css\.TailwindCSS|@import "hugo:vars"|@source "hugo_stats\.json"' .
git diff --check
```

Результат:

- Hugo: `v0.160.1-d6bc8165e62b29d7d70ede01ed01d0f88de327e6`.
- Production build: успешен.
- `npm run build`: успешен.
- `--printPathWarnings`: предупреждений нет.
- `--printI18nWarnings`: предупреждений нет.
- Deprecated grep по локальному коду: чисто.
- `git diff --check`: чисто.
- Сгенерировано: `47` страниц `uk`, `45` страниц `ru`, `6/6` paginator pages, `264` processed images, `8/7` aliases.
- В `public/` найдено `100` HTML-файлов.

## Приоритетные находки

### P1 - Toolchain ещё закреплён на Hugo 0.158.0

Файлы:

- `.mise.toml`
- `netlify.toml`

Сейчас:

```toml
# .mise.toml
hugo = "0.158.0"
```

```toml
# netlify.toml
HUGO_VERSION = "0.158.0"
```

Риск:

- Проект проверен на 0.160.1, но локальная и Netlify-конфигурация всё ещё не переключены.
- Пока эти значения не обновлены, реальный переход на 0.160.1 не произойдёт.

Рекомендация:

```toml
# .mise.toml
hugo = "0.160.1"
node = "24"
```

```toml
# netlify.toml
HUGO_VERSION = "0.160.1"
```

### P2 - Netlify production environment остаётся неоднозначным

Файл:

- `netlify.toml`

Сейчас:

```toml
command = "git submodule update --init --recursive && hugo --gc --minify"
HUGO_ENV = "development"
```

Факты:

- Hugo documentation управляет окружением через `--environment` и `HUGO_ENVIRONMENT`.
- `hugo build` по умолчанию работает как `production`.
- В предыдущих проверках `HUGO_ENV=development` не менял `hugo.Environment`, а `HUGO_ENVIRONMENT=development` менял.

Риск:

- Значение выглядит как production/development конфликт.
- Для будущего аудита и CI лучше сделать intent явным.

Рекомендация:

```toml
[build]
  command = "git submodule update --init --recursive && hugo --environment production --gc --minify"

[build.environment]
  HUGO_VERSION = "0.160.1"
  NODE_VERSION = "24"
```

Если deploy previews должны быть noindex, лучше использовать Netlify contexts и `HUGO_ENVIRONMENT`.

### P3 - `params.env = "development"` остаётся legacy-сигналом

Файл:

- `hugo.yaml`

Факты:

- `hugo config` на 0.160.1 показывает `environment = production`.
- Но `params.env = 'development'` остаётся в итоговой конфигурации.
- Текущий output корректный, потому что шаблоны используют `hugo.IsProduction` / `hugo.IsDevelopment` как основной сигнал.

Риск:

- Семантический шум в конфиге.
- Может путать будущие проверки production behavior.

Рекомендация:

- Постепенно убрать `site.Params.env` из production-логики.
- Оставить `hugo.Environment`, `hugo.IsProduction`, `hugo.IsDevelopment` как единственный источник истины.

### P3 - PaperMod содержит старые language API

Файлы внутри `themes/PaperMod` всё ещё содержат старые конструкции:

- `.Lang`
- `.Language.Lang`
- `.Language.LanguageCode`
- `.Language.LanguageName`
- `.Language.LanguageDirection`
- `site.Language.LanguageCode`

Статус:

- Это подмодуль темы.
- Основные live-пути перекрыты локальными overrides.
- Сборка Hugo 0.160.1 не выдаёт warnings по live-коду проекта.

Рекомендация:

- Не править подмодуль напрямую.
- При обновлении PaperMod повторить grep-аудит и проверить, какие overrides ещё нужны.

## Матрица соответствия по частям проекта

### Hugo config

Статус: соответствует, кроме закреплённой версии toolchain.

- `locale` используется вместо deprecated `languageCode`.
- `languages.*.locale` используется вместо `languages.*.languageCode`.
- `label` используется вместо `languageName`.
- `direction` используется вместо `languageDirection`.
- `defaultContentLanguage = uk`.
- `defaultContentLanguageInSubdir = true`.
- `disableKinds = taxonomy, term` работает ожидаемо.
- `hugo config` на 0.160.1 показывает `environment = production`.

### Local layouts

Статус: соответствует.

- Deprecated language API в локальных `layouts/` не найден.
- `hugo.Sites` используется в `layouts/sitemapindex.xml`.
- `.Language.Name` используется для языкового ключа.
- `.Language.Locale` используется для HTML `lang`, hreflang, RSS, OpenGraph и schema language.
- `.Language.Label` используется для отображения языка.
- `.Language.Direction` используется для `dir`.

### Render hooks и Markdown pipeline

Статус: соответствует.

- Локальные render hooks есть для links/tables.
- `.Position` в локальных render hooks не используется.
- `RenderShortcodes` в проекте не найден.
- Passthrough/cascade `_target` проблем не найдено.
- Bugfixes 0.160.1 не требуют изменений в проекте.

### CSS pipeline: Tailwind, css.Build, vars

Статус: соответствует.

- Проект использует `css.TailwindCSS`, что соответствует документации для Tailwind CSS 4.
- `assets/css/main.css` содержит `@import "tailwindcss";`.
- `assets/css/main.css` содержит `@source "hugo_stats.json";`.
- `build.buildStats.enable = true`.
- `hugo_stats.json` смонтирован в `assets/notwatching/hugo_stats.json`.
- `templates.Defer` используется для CSS partial.
- `css.Build` и `@import "hugo:vars"` не используются, поэтому новое `vars` API в 0.160.0 не требует миграции.
- Production output содержит fingerprinted stylesheet.

### Node/npm dependencies

Статус: соответствует.

- Root `package.json` содержит прямые project dependencies: `tailwindcss` и `@tailwindcss/cli`.
- `hugo mod graph` показывает `project PaperMod`.
- В `themes/PaperMod` не найдено `package.json` или `package.hugo.json`.
- `packages/hugoautogen` не нужен.
- Warning `npm dependencies are out of sync` не появляется.

### i18n

Статус: соответствует.

- `i18n/uk.yaml` и `i18n/ru.yaml` закрывают `page_not_found` и `words`.
- `--printI18nWarnings` чистый.
- 404 output локализован:
  - `Сторінку не знайдено`
  - `Страница не найдена`

### Sitemap

Статус: соответствует.

- `public/sitemap.xml` является sitemap index.
- В index есть:
  - `https://aerocool.ua/uk/sitemap.xml`
  - `https://aerocool.ua/ru/sitemap.xml`
- `layouts/sitemapindex.xml` использует `hugo.Sites` и `.Language.Name`.
- Языковые sitemap-файлы содержат индексируемые URL и hreflang `uk-UA`/`ru-UA`.
- 0.160.1 bugfix по multilingual root sections не выявил проблем в output.

### RSS

Статус: соответствует.

- Локальный `layouts/_default/rss.xml` перекрывает theme-шаблон.
- RSS language использует `.Language.Locale`.
- Output содержит:
  - `<language>uk-UA</language>`
  - `<language>ru-UA</language>`
- RSS generator показывает Hugo 0.160.1.

### Alias, 404, search

Статус: соответствует.

- Alias output содержит `lang=uk-UA` и `dir=ltr`.
- Alias output остаётся `noindex,nofollow`.
- 404 output содержит `lang`, `dir`, `noindex,nofollow`.
- Search остаётся служебной страницей с `noindex,nofollow`.

### Multilingual content model

Статус: соответствует.

- Page bundle pattern `index.md` / `index.ru.md` сохранён.
- Section bundle pattern `_index.md` / `_index.ru.md` сохранён.
- Главные страницы: `content/_index.md` и `content/_index.ru.md`.
- Search: `content/search.md` и `content/search.ru.md`.
- Статьи, новости, серии и продуктовые варианты сохраняют синхронные пары `uk`/`ru`.

### SEO/schema content model

Статус: соответствует.

- Front matter использует `schema_types`.
- `schema_type` не найден.
- Schema partials читают `.Params.schema_types`.
- `inLanguage`, `og:locale`, hreflang и RSS language строятся на `.Language.Locale`.
- Index/noindex поведение проверено на main, 404 и alias output.

### Static assets and images

Статус: соответствует.

- `static/` используется для файлов, которые Hugo копирует как есть.
- Page bundle images лежат рядом с контентом.
- Product pages сохраняют pattern `image`, `cover.image`, `seo-image`.
- Hugo 0.160.1 обработал `264` изображения.

## Рекомендуемый порядок перехода на Hugo 0.160.1

1. Обновить `.mise.toml` до `hugo = "0.160.1"`.
2. Обновить `netlify.toml` до `HUGO_VERSION = "0.160.1"`.
3. В `netlify.toml` заменить build command на `hugo --environment production --gc --minify`.
4. Убрать `HUGO_ENV = "development"` из production environment.
5. Запустить:

```bash
mise trust
mise install
mise exec -- hugo --environment production --gc --minify --printPathWarnings --printI18nWarnings
mise exec -- npm run build
```

6. Проверить:

```bash
rg -n --glob '!themes/**' --glob '!public/**' --glob '!resources/**' --glob '!node_modules/**' 'languageCode|languageName|languageDirection|LanguageCode|LanguageName|LanguageDirection|\.Language\.Lang|\.Site\.Language\.Lang|site\.Language\.Lang|\.Lang\b|site\.Sites\b|\.Site\.Sites\b|\.Page\.Sites\b|site\.Data\b|\.Site\.Data\b|excludeFiles|includeFiles|:filename' layouts hugo.yaml netlify.toml package.json
```

Ожидаемый результат: пусто.

## Финальный вывод

Переход на Hugo 0.160.1 безопасен. Новые возможности 0.160.0/0.160.1 не требуют обязательной миграции в этом проекте, а затронутые зоны - CSS pipeline, render hooks, multilingual root sections, i18n, sitemap/RSS и Node module dependencies - проверены на живой сборке. Для фактического перехода осталось обновить закреплённые версии Hugo в `.mise.toml` и `netlify.toml` и подчистить Netlify environment.
