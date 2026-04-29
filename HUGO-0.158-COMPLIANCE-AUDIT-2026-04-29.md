# Аудит соответствия проекта Hugo v0.158.0

> Архивный отчет. Текущая версия проекта: Hugo `0.161.0`. Актуальный аудит: [HUGO-0.161.0-COMPLIANCE-AUDIT-2026-04-29.md](/Users/stadnyk/MEGA/Aerocool/HUGO-0.161.0-COMPLIANCE-AUDIT-2026-04-29.md).

Дата актуального прохода: 2026-04-29  
Проект: Aerocool Ukraine  
Контекст: повторный аудит после перехода на Hugo 0.158.0, замены deprecated language API в локальных шаблонах и добавления локальных i18n-переводов.

## Итоговый вердикт

Проект совместим с Hugo 0.158.0 и по локальному коду в основном соответствует актуальной документации Hugo 0.158.0.

Блокирующих ошибок сборки, i18n warnings, path warnings или live-использования deprecated language API в локальных `layouts/` не найдено.

Остаточные зоны внимания:

1. `netlify.toml` содержит устаревший/неоднозначный `HUGO_ENV = "development"`. В Hugo 0.158.0 официальный способ управлять окружением - `--environment` или `HUGO_ENVIRONMENT`. Локальная проверка показывает, что `HUGO_ENV=development` не меняет `hugo.Environment`, но настройка всё равно вводит в заблуждение.
2. `themes/PaperMod` как подмодуль содержит deprecated language API. Live-пути перекрыты локальными overrides, но при обновлении темы это нужно перепроверять.
3. `params.env = "development"` остаётся в итоговом `hugo config`. Сейчас шаблоны опираются прежде всего на `hugo.IsProduction`, поэтому production build не ломается, но настройку лучше убрать или заменить на явную Hugo environment-логику.

## Использованные официальные источники

- [Hugo v0.158.0 release notes](https://github.com/gohugoio/hugo/releases/tag/v0.158.0)
- [Configure languages](https://gohugo.io/configuration/languages/)
- [Page.Language methods](https://gohugo.io/methods/page/language/)
- [Configuration introduction](https://gohugo.io/configuration/introduction/)
- [hugo.Environment](https://gohugo.io/functions/hugo/environment/)
- [hugo.IsProduction](https://gohugo.io/functions/hugo/isproduction/)
- [css.TailwindCSS](https://gohugo.io/functions/css/tailwindcss/)

Ключевые требования Hugo 0.158.0, применимые к проекту:

- `languageCode` заменяется на `locale`.
- `languageName` заменяется на `label`.
- `languageDirection` заменяется на `direction`.
- `.Language.Lang` заменяется на `.Language.Name`.
- `.Language.LanguageCode` заменяется на `.Language.Locale`.
- `.Language.LanguageName` заменяется на `.Language.Label`.
- `.Language.LanguageDirection` заменяется на `.Language.Direction`.
- `hugo build` по умолчанию работает в `production`; `hugo server` - в `development`.
- Окружение задаётся через `--environment` или `HUGO_ENVIRONMENT`.
- Для Tailwind 4 через Hugo Pipes допустим и рекомендован `css.TailwindCSS` вместе с Hugo build stats.

## Проверенные команды

```bash
mise exec -- hugo version
mise exec -- hugo config
mise exec -- hugo --environment production --gc --minify --printPathWarnings --printI18nWarnings --templateMetrics --templateMetricsHints
mise exec -- npm run build
rg -n --glob '!themes/**' --glob '!public/**' --glob '!resources/**' --glob '!node_modules/**' 'languageCode|languageName|languageDirection|LanguageCode|LanguageName|LanguageDirection|\.Language\.Lang|\.Site\.Language\.Lang|site\.Language\.Lang|\.Lang\b' .
rg -n 'HUGO_VERSION|HUGO_ENV|NODE_VERSION|--environment|hugo.IsProduction|hugo.IsDevelopment|site.Params.env' netlify.toml layouts hugo.yaml .mise.toml package.json
rg -n 'schema_type\b|schema_types' content layouts hugo.yaml
find public -name '*.html' | wc -l
git diff --check
```

Результат:

- Hugo: `v0.158.0-f41be7959a44108641f1e081adf5c4be7fc1bb63`.
- Production build: успешен.
- `npm run build`: успешен.
- `--printPathWarnings`: предупреждений нет.
- `--printI18nWarnings`: предупреждений нет.
- `git diff --check`: чисто.
- Сгенерировано: `47` страниц `uk`, `45` страниц `ru`, `6/6` paginator pages, `264` processed images, `8/7` aliases.
- В `public/` найдено `100` HTML-файлов.

## Находки по приоритету

### P2 - Netlify environment задан неоднозначно

Файл: `netlify.toml`

Сейчас:

```toml
[build]
  command = "git submodule update --init --recursive && hugo --gc --minify"

[build.environment]
  HUGO_VERSION = "0.158.0"
  HUGO_ENV = "development"
  NODE_VERSION = "24"
```

Факты аудита:

- Официальная документация Hugo описывает `--environment` и `HUGO_ENVIRONMENT`.
- `hugo build` без флага по умолчанию работает как `production`.
- Проверка `HUGO_ENV=development hugo config` оставляет `environment = 'production'`.
- Проверка `HUGO_ENVIRONMENT=development hugo config` меняет `environment = 'development'`.

Риск:

- `HUGO_ENV = "development"` выглядит как production blocker, хотя в Hugo 0.158.0 фактически не меняет `hugo.Environment`.
- Следующий разработчик или CI-аудит может трактовать это как намеренный development build.
- Если Netlify/плагины/будущие инструменты начнут читать `HUGO_ENV`, поведение может стать неочевидным.

Рекомендация:

```toml
[build]
  command = "git submodule update --init --recursive && hugo --environment production --gc --minify"

[build.environment]
  HUGO_VERSION = "0.158.0"
  NODE_VERSION = "24"
```

Если deploy previews должны быть noindex, лучше использовать Netlify contexts и официальный `HUGO_ENVIRONMENT`.

### P3 - `params.env = "development"` остаётся legacy-сигналом

Файл: `hugo.yaml`

Факты аудита:

- Итоговый `hugo config` содержит `params.env = 'development'`.
- Локальные шаблоны используют `hugo.IsProduction` / `hugo.IsDevelopment`; `site.Params.env` остаётся только fallback-веткой.
- Production build сейчас отдаёт `index,follow`, fingerprinted CSS и production-ветки, потому что `hugo.IsProduction` истинный.

Риск:

- Значение `params.env = development` конфликтует семантически с production-сборкой.
- Это не ломает текущий output, но затрудняет аудит.

Рекомендация:

- Постепенно убрать `params.env` из production-логики.
- Оставить единственный источник истины: `hugo.Environment`, `hugo.IsProduction`, `hugo.IsDevelopment`.

### P3 - PaperMod содержит deprecated language API

Файлы внутри `themes/PaperMod`:

- `layouts/partials/header.html`
- `layouts/partials/translation_list.html`
- `layouts/_default/baseof.html`
- `layouts/_default/rss.xml`
- `layouts/partials/templates/opengraph.html`
- `layouts/partials/templates/schema_json.html`
- `layouts/partials/head.html`

Найдены deprecated обращения:

- `.Lang`
- `.Language.Lang`
- `.Language.LanguageCode`
- `.Language.LanguageName`
- `.Language.LanguageDirection`
- `site.Language.LanguageCode`

Состояние:

- Это подмодуль темы.
- Основные live-пути перекрыты локальными файлами в `layouts/`.
- Сборка Hugo 0.158.0 не падает.

Рекомендация:

- Не править подмодуль напрямую.
- При обновлении PaperMod заново прогонять grep-аудит и проверять, какие overrides ещё нужны.

## Матрица соответствия по частям проекта

### Toolchain

Статус: соответствует.

- `.mise.toml` фиксирует `hugo = "0.158.0"` и `node = "24"`.
- `netlify.toml` фиксирует `HUGO_VERSION = "0.158.0"` и `NODE_VERSION = "24"`.
- `mise exec -- hugo version` подтверждает Hugo 0.158.0.
- `npm run build` использует Hugo 0.158.0 и проходит успешно.

Рекомендация: сделать Netlify command явным через `--environment production`.

### Hugo config

Статус: соответствует.

- Top-level `locale = uk-UA` присутствует.
- `defaultContentLanguage = uk`.
- `languages.uk.locale = uk-UA`.
- `languages.ru.locale = ru-UA`.
- `languages.uk.label = Українська`.
- `languages.ru.label = Русский`.
- `languages.*.direction = ltr`.
- Deprecated config keys `languageCode`, `languageName`, `languageDirection` в локальном config не найдены.
- `defaultContentLanguageInSubdir = true` корректно сочетается с корневым sitemap index и языковыми sitemap-файлами.

### Environment

Статус: функционально соответствует, конфигурационно требует cleanup.

- `hugo config` при обычной сборке показывает `environment = production`.
- `hugo --environment production` работает корректно.
- `HUGO_ENVIRONMENT=development` меняет environment, как описано в документации.
- `HUGO_ENV=development` в локальной проверке не меняет environment.

Рекомендация: заменить `HUGO_ENV` на явный `--environment production` или официальный `HUGO_ENVIRONMENT`.

### Локальные шаблоны `layouts/`

Статус: соответствует.

- Deprecated language API в локальных `layouts/` не найден.
- Языковой ключ используется через `.Language.Name`.
- Locale для HTML/RSS/OG/hreflang используется через `.Language.Locale`.
- Название языка в переключателях берётся через `.Language.Label`.
- Direction используется через `.Language.Direction`.
- `alias.html` теперь выводит `lang` и `dir`.

Проверка:

```bash
rg -n --glob '!themes/**' --glob '!public/**' --glob '!resources/**' --glob '!node_modules/**' 'languageCode|languageName|languageDirection|LanguageCode|LanguageName|LanguageDirection|\.Language\.Lang|\.Site\.Language\.Lang|site\.Language\.Lang|\.Lang\b' layouts hugo.yaml netlify.toml
```

Ожидаемый результат: пусто.

### i18n

Статус: соответствует.

- Добавлены локальные `i18n/uk.yaml` и `i18n/ru.yaml`.
- `page_not_found` есть для украинского и русского.
- `words` есть для украинского и русского.
- `--printI18nWarnings` больше не выдаёт предупреждений.
- Сгенерированные 404-страницы выводят локализованный текст:
  - `Сторінку не знайдено`
  - `Страница не найдена`

### Multilingual content model

Статус: соответствует.

- Сохраняется pattern `index.md` / `index.ru.md` внутри page bundles.
- Для section bundles используются `_index.md` / `_index.ru.md`.
- Главные страницы: `content/_index.md` и `content/_index.ru.md`.
- Search: `content/search.md` и `content/search.ru.md`.
- Статичные страницы, статьи, новости, серии и продуктовые варианты имеют синхронные пары `uk`/`ru`.

### Content front matter

Статус: соответствует.

- В контенте используется `schema_types`.
- `schema_type` не найден.
- Это соответствует локальным schema partials, которые читают `.Params.schema_types`.
- `slug` используется там, где нужен контроль URL.
- Page bundle-структура для товаров, статей и новостей сохраняется.

### SEO partials и schema.org

Статус: соответствует Hugo 0.158.0.

- Локальные partials находятся в `layouts/_partials/_seo` и `layouts/_partials/_schema`.
- `inLanguage`, `og:locale`, hreflang и RSS language строятся на `.Language.Locale`.
- Breadcrumbs и локализованные labels строятся на `.Language.Name` / `.Site.Language.Name`.
- `search`, `404` и alias-страницы остаются `noindex,nofollow`.

### Sitemap

Статус: соответствует.

- `public/sitemap.xml` является sitemap index.
- В корневом index есть:
  - `https://aerocool.ua/uk/sitemap.xml`
  - `https://aerocool.ua/ru/sitemap.xml`
- `/uk/sitemap.xml` и `/ru/sitemap.xml` содержат индексируемые URL.
- Hreflang использует `uk-UA` и `ru-UA`.
- Alias/search/404 не попали в индексируемые sitemap URL.

### RSS

Статус: соответствует.

- Локальный `layouts/_default/rss.xml` перекрывает theme-шаблон.
- RSS `<language>` использует `site.Language.Locale`.
- В output проверены:
  - `<language>uk-UA</language>`
  - `<language>ru-UA</language>`
- `<generator>` показывает Hugo 0.158.0.

### Alias, 404, search

Статус: соответствует.

- Alias output содержит `lang=uk-UA` и `dir=ltr`.
- Alias output содержит `noindex,nofollow`.
- 404 output содержит `lang`, `dir`, `noindex,nofollow`.
- Search остаётся служебной страницей с `noindex,nofollow`.
- 404-тексты локализованы через i18n.

### Tailwind CSS 4 и Hugo Pipes

Статус: соответствует.

- `assets/css/main.css` использует Tailwind 4 pattern.
- `@source "hugo_stats.json"` подключён.
- `hugo.yaml` включает `build.buildStats.enable = true`.
- `hugo.yaml` монтирует `hugo_stats.json` в `assets/notwatching/hugo_stats.json`.
- `layouts/_partials/css.html` использует `css.TailwindCSS`.
- CSS partial вызывается через `templates.Defer`.
- Production output содержит fingerprinted stylesheet.

### Images и page resources

Статус: соответствует.

- Изображения page bundles лежат рядом с контентом.
- Product pages сохраняют pattern `image`, `cover.image`, `seo-image`.
- Production build обработал `264` изображения.
- Ошибок resource lookup не найдено.

### Static assets

Статус: соответствует.

- `static/` используется для файлов, которые Hugo копирует как есть.
- Manifest, icons, service worker и статические ассеты не конфликтуют с Hugo 0.158.0.

### Netlify

Статус: работает, но требует cleanup.

- Production build command проходит локально через `npm run build`.
- Версии Hugo/Node зафиксированы.
- Headers/redirects не конфликтуют с Hugo 0.158.0.

Рекомендация: убрать неоднозначный `HUGO_ENV = "development"` и сделать production environment явным.

## Рекомендуемые следующие шаги

1. В `netlify.toml` заменить build command на `hugo --environment production --gc --minify`.
2. Убрать `HUGO_ENV = "development"` или заменить на официальный `HUGO_ENVIRONMENT` в Netlify contexts.
3. Постепенно убрать `params.env` из шаблонной логики и оставить `hugo.IsProduction` / `hugo.IsDevelopment`.
4. При следующем обновлении PaperMod повторить theme grep и пересмотреть локальные overrides.
5. Оставить в регулярной проверке:

```bash
mise exec -- hugo --environment production --gc --minify --printPathWarnings --printI18nWarnings
rg -n --glob '!themes/**' --glob '!public/**' --glob '!resources/**' --glob '!node_modules/**' 'languageCode|languageName|languageDirection|LanguageCode|LanguageName|LanguageDirection|\.Language\.Lang|\.Site\.Language\.Lang|site\.Language\.Lang|\.Lang\b' layouts hugo.yaml netlify.toml
```

## Финальный вывод

После последних исправлений проект готов к Hugo 0.158.0 на уровне сборки, локальных шаблонов, i18n, sitemap/RSS, Tailwind/Hugo Pipes, multilingual content model и generated output. Остался не кодовый blocker, а cleanup конфигурации Netlify/environment и наблюдение за deprecated API внутри подмодуля PaperMod.
