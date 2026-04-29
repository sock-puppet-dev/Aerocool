# Аудит соответствия проекта Hugo v0.159.0

Дата аудита: 2026-04-29  
Проект: Aerocool Ukraine  
Цель: проверить готовность проекта к Hugo 0.159.0 и соответствие затронутым частям официальной документации.

## Итоговый вердикт

Проект технически готов к Hugo 0.159.0: сборка на реальном Hugo 0.159.0 проходит, `npm run build` под Hugo 0.159.0 проходит, `--printPathWarnings` и `--printI18nWarnings` чистые.

Во время аудита найден и исправлен один локальный deprecated-вызов:

- `layouts/sitemapindex.xml`: `site.Sites` заменён на `hugo.Sites`.

После этой правки сборка Hugo 0.159.0 больше не показывает deprecation warning.

Остаточные шаги для фактического перехода:

1. Обновить `.mise.toml` с `hugo = "0.158.0"` на `hugo = "0.159.0"`.
2. Обновить `netlify.toml` с `HUGO_VERSION = "0.158.0"` на `HUGO_VERSION = "0.159.0"`.
3. Сделать Netlify build environment явным: `hugo --environment production --gc --minify`.
4. Убрать неоднозначный `HUGO_ENV = "development"` или заменить его на официальный `HUGO_ENVIRONMENT` в Netlify contexts.

## Использованные официальные источники

- [Hugo v0.159.0 release notes](https://github.com/gohugoio/hugo/releases/tag/v0.159.0)
- [Node.js dependencies in Hugo Modules](https://gohugo.io/hugo-modules/nodejs-dependencies/)
- [Configure languages](https://gohugo.io/configuration/languages/)
- [Page.Language methods](https://gohugo.io/methods/page/language/)
- [Configuration introduction](https://gohugo.io/configuration/introduction/)
- [css.TailwindCSS](https://gohugo.io/functions/css/tailwindcss/)

## Что изменилось в Hugo 0.159.0 и что важно для проекта

Главное изменение Hugo 0.159.0 касается Node.js/npm зависимостей в Hugo Modules:

- Hugo Modules могут объявлять Node-зависимости через `package.json` или `package.hugo.json` в корне модуля.
- `hugo mod npm pack` теперь собирает зависимости модулей в `packages/hugoautogen/package.json`.
- Root `package.json` получает workspace-запись на `packages/hugoautogen`.
- Если модульные npm-зависимости расходятся, Hugo может просить выполнить `hugo mod npm pack`.

Для этого проекта:

- Root `package.json` содержит только прямые зависимости проекта: `@tailwindcss/cli` и `tailwindcss`.
- `hugo mod graph` показывает только `project PaperMod`.
- В `themes/PaperMod` не найдено `package.json` или `package.hugo.json`.
- `packages/hugoautogen` отсутствует и сейчас не нужен.
- Сборка Hugo 0.159.0 не выдаёт warning про out-of-sync npm dependencies.

Вывод: новая npm/workspace-модель Hugo 0.159.0 не требует изменений в текущем проекте.

## Проверенные команды

```bash
mise x hugo@0.159.0 -- hugo version
mise x hugo@0.159.0 -- hugo --environment production --gc --minify --printPathWarnings --printI18nWarnings --templateMetrics --templateMetricsHints
mise x hugo@0.159.0 node@24 -- npm run build
mise x hugo@0.159.0 -- hugo config
mise x hugo@0.159.0 -- hugo mod graph
mise x hugo@0.159.0 -- hugo mod npm pack --help
rg -n --glob '!themes/**' --glob '!public/**' --glob '!resources/**' --glob '!node_modules/**' 'languageCode|languageName|languageDirection|LanguageCode|LanguageName|LanguageDirection|\.Language\.Lang|\.Site\.Language\.Lang|site\.Language\.Lang|\.Lang\b|site\.Sites\b|\.Site\.Sites\b|\.Page\.Sites\b|site\.Data\b|\.Site\.Data\b|excludeFiles|includeFiles|:filename' layouts hugo.yaml netlify.toml package.json
git diff --check
```

Результат:

- Hugo: `v0.159.0-2ed7d193cfdfcf11808fb2a921a9429423b0ebe9`.
- Production build: успешен.
- `npm run build`: успешен.
- `--printPathWarnings`: предупреждений нет.
- `--printI18nWarnings`: предупреждений нет.
- Deprecated grep по локальным шаблонам/config после правки: чисто.
- `git diff --check`: чисто.
- Сгенерировано: `47` страниц `uk`, `45` страниц `ru`, `6/6` paginator pages, `264` processed images, `8/7` aliases.

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

- Проект протестирован на 0.159.0, но локальная и Netlify-конфигурация ещё не переведены на 0.159.0.
- Без этой правки фактический переход на Hugo 0.159.0 не состоится.

Рекомендация:

```toml
# .mise.toml
hugo = "0.159.0"
node = "24"
```

```toml
# netlify.toml
HUGO_VERSION = "0.159.0"
```

### P2 - Netlify production environment задан неоднозначно

Файл: `netlify.toml`

Сейчас:

```toml
command = "git submodule update --init --recursive && hugo --gc --minify"
HUGO_ENV = "development"
```

Факты:

- Hugo documentation описывает `--environment` и `HUGO_ENVIRONMENT`.
- `hugo build` по умолчанию работает как `production`.
- В предыдущей проверке `HUGO_ENV=development` не менял `hugo.Environment`, а `HUGO_ENVIRONMENT=development` менял.

Риск:

- `HUGO_ENV = "development"` выглядит как development-сборка, хотя фактически не управляет Hugo 0.159.0 так, как ожидает документация.
- Это усложняет аудит и может сбить с толку при CI/Netlify troubleshooting.

Рекомендация:

```toml
[build]
  command = "git submodule update --init --recursive && hugo --environment production --gc --minify"

[build.environment]
  HUGO_VERSION = "0.159.0"
  NODE_VERSION = "24"
```

Для deploy preview/noindex лучше использовать Netlify contexts и официальный `HUGO_ENVIRONMENT`.

### P2 - Устранён локальный deprecation warning `.Site.Sites`

Файл:

- `layouts/sitemapindex.xml`

Было:

```go-html-template
{{- range site.Sites }}
```

Стало:

```go-html-template
{{- range hugo.Sites }}
```

Причина:

- Hugo 0.159.0 показывал warning: `.Site.Sites` / `.Page.Sites` deprecated, использовать `hugo.Sites`.

Статус:

- Исправлено.
- Повторная сборка Hugo 0.159.0 проходит без deprecation warning.

### P3 - `params.env = "development"` остаётся legacy-сигналом

Файл:

- `hugo.yaml`

Факты:

- Итоговый `hugo config` всё ещё содержит `params.env = 'development'`.
- Локальные шаблоны используют `hugo.IsProduction` / `hugo.IsDevelopment` и только fallback через `site.Params.env`.
- Production output корректный: `index,follow`, fingerprinted CSS, production-ветки изображений.

Риск:

- Семантический шум: production-сборка соседствует с `params.env = development`.
- Это не blocker для Hugo 0.159.0, но лучше убрать после перехода.

Рекомендация:

- Постепенно удалить `site.Params.env` из шаблонной логики.
- Использовать только `hugo.Environment`, `hugo.IsProduction`, `hugo.IsDevelopment`.

### P3 - PaperMod всё ещё содержит старые language API

Файлы внутри `themes/PaperMod` содержат:

- `.Lang`
- `.Language.Lang`
- `.Language.LanguageCode`
- `.Language.LanguageName`
- `.Language.LanguageDirection`
- `site.Language.LanguageCode`

Статус:

- Это код подмодуля темы.
- Основные live-пути перекрыты локальными overrides.
- Сборка Hugo 0.159.0 после локальных правок не выдаёт warnings по этим местам.

Рекомендация:

- Не править подмодуль напрямую.
- При обновлении PaperMod повторить grep-аудит и проверить, какие overrides всё ещё нужны.

## Матрица соответствия по частям проекта

### Hugo config

Статус: соответствует, кроме версии toolchain.

- `locale` используется вместо deprecated `languageCode`.
- `languages.*.locale` используется вместо `languages.*.languageCode`.
- `label` используется вместо `languageName`.
- `direction` используется вместо `languageDirection`.
- `defaultContentLanguage = uk`.
- `defaultContentLanguageInSubdir = true`.
- `disableKinds = taxonomy, term` работает ожидаемо.

### Local layouts

Статус: соответствует.

- Deprecated language API в локальных `layouts/` не найден.
- `.Language.Name` используется для языкового ключа.
- `.Language.Locale` используется для `lang`, hreflang, RSS, OpenGraph и schema language.
- `.Language.Label` используется для отображения языка.
- `.Language.Direction` используется для `dir`.
- `hugo.Sites` используется в sitemap index.

### i18n

Статус: соответствует.

- `i18n/uk.yaml` и `i18n/ru.yaml` закрывают `page_not_found` и `words`.
- `--printI18nWarnings` чистый.
- 404 output локализован:
  - `Сторінку не знайдено`
  - `Страница не найдена`

### Node/npm dependencies

Статус: соответствует Hugo 0.159.0.

- Root `package.json` содержит прямые project dependencies.
- Hugo module dependency graph: `project PaperMod`.
- PaperMod не объявляет npm-зависимости через `package.json`/`package.hugo.json`.
- `packages/hugoautogen` не требуется.
- Warning `npm dependencies are out of sync` не появляется.

### Tailwind CSS 4 / Hugo Pipes

Статус: соответствует.

- `assets/css/main.css` использует Tailwind 4 pattern.
- `@source "hugo_stats.json"` подключён.
- `build.buildStats.enable = true`.
- `hugo_stats.json` смонтирован в `assets/notwatching/hugo_stats.json`.
- CSS собирается через `css.TailwindCSS`.
- CSS partial вызывается через `templates.Defer`.
- Production output содержит fingerprinted stylesheet.

### Sitemap

Статус: соответствует.

- `public/sitemap.xml` является sitemap index.
- В index есть:
  - `https://aerocool.ua/uk/sitemap.xml`
  - `https://aerocool.ua/ru/sitemap.xml`
- `layouts/sitemapindex.xml` теперь использует `hugo.Sites` и `.Language.Name`.
- Языковые sitemap-файлы содержат индексируемые URL и hreflang `uk-UA`/`ru-UA`.

### RSS

Статус: соответствует.

- Локальный `layouts/_default/rss.xml` перекрывает theme-шаблон.
- RSS language использует `.Language.Locale`.
- Output содержит:
  - `<language>uk-UA</language>`
  - `<language>ru-UA</language>`
- RSS generator показывает Hugo 0.159.0.

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

### Static assets and images

Статус: соответствует.

- `static/` используется для файлов, которые копируются как есть.
- Page bundle images лежат рядом с контентом.
- Product pages сохраняют pattern `image`, `cover.image`, `seo-image`.
- Hugo 0.159.0 обработал `264` изображения.

## Рекомендуемый порядок перехода на Hugo 0.159.0

1. Обновить `.mise.toml` до `hugo = "0.159.0"`.
2. Обновить `netlify.toml` до `HUGO_VERSION = "0.159.0"`.
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

Hugo 0.159.0 для проекта безопасен. Единственный runtime/deprecation warning, который появился при тестовой сборке, был связан с `site.Sites` в `layouts/sitemapindex.xml` и уже исправлен. Новая npm/workspace-модель Hugo 0.159.0 не требует изменений, потому что PaperMod не объявляет Node-зависимости как Hugo Module.

Для полноценного перехода осталось обновить версии в `.mise.toml` и `netlify.toml`, а также подчистить Netlify environment.
