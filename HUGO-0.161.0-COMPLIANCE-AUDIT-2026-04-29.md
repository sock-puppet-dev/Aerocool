# Hugo v0.161.0 compliance audit

Дата аудита: 2026-04-29  
Проект: Aerocool Ukraine  
Проверяемая версия: Hugo `v0.161.0`  
Локальная связка проверки: Hugo `v0.161.0`, Node `v24.15.0`

## Итоговый вердикт

Проект технически совместим с Hugo `0.161.0`.

Сборка на Hugo `0.161.0` и Node `24` в текущем окружении `development` проходит без ошибок, без `--printI18nWarnings`, без path warnings и без предупреждений по deprecated language API. Самое важное изменение `0.161.0` - запуск Node-инструментов Hugo через Node `--permission` - на проект не ломает сборку: Tailwind установлен как npm-пакет, `css.TailwindCSS` работает, Node версии `>= 22` доступен.

Переход на Hugo `0.161.0` можно считать безопасным по совместимости: pinned-версии в `.mise.toml` и `netlify.toml` переведены на Hugo `0.161.0`. Окружение сборки временно оставлено `development`; production-режим включать только после финальной проверки.

## Источники документации Hugo

- Hugo release `v0.161.0`: https://github.com/gohugoio/hugo/releases/tag/v0.161.0
- Announcement: https://discourse.gohugo.io/t/hugo-v0-161-0-released/57060
- Security configuration: https://gohugo.io/configuration/security/
- Tailwind CSS integration: https://gohugo.io/functions/css/tailwindcss/
- Language configuration: https://gohugo.io/configuration/languages/
- `Site.Language`: https://gohugo.io/methods/site/language/
- `Site.Sites` deprecation: https://gohugo.io/methods/site/sites/
- Permalinks configuration: https://gohugo.io/configuration/permalinks/

## Что изменилось в Hugo 0.161.0 и влияние на проект

### 1. Node tools теперь запускаются с Node `--permission`

В `0.161.0` Hugo hardened execution для Node-инструментов PostCSS, Babel и TailwindCSS. Теперь они запускаются через Node permission model, а разрешения берутся из `security.node.permissions`.

Проверка проекта:

- Локальный Node: `v24.15.0`, требование Node `>= 22` выполнено.
- `package.json` содержит `tailwindcss` и `@tailwindcss/cli`.
- `package-lock.json` содержит npm-пакеты Tailwind, включая `@tailwindcss/oxide`.
- Standalone Tailwind executable не используется.
- `layouts/_partials/css.html` использует Hugo `css.TailwindCSS`.
- `assets/css/main.css` содержит `@import "tailwindcss";` и `@source "hugo_stats.json";`.
- Сборка на `0.161.0` прошла, значит default Node permissions достаточны.

Вывод: риска блокировки Tailwind из-за Node permission model нет.

### 2. Новые default security settings

Эффективный конфиг Hugo `0.161.0` показал:

```toml
[security.exec]
allow = ['^(dart-)?sass(-embedded)?$', '^go$', '^git$', '^node$', '^postcss$', '^tailwindcss$']

[security.http]
urls = ['(?i)^https?://[a-z]', '! (?i)localhost', '! @']

[security.node.permissions]
allowaddons = ['tailwindcss']
allowread = ['.']
allowworker = ['tailwindcss']
```

В проекте нет локального override `security`, поэтому используются актуальные defaults Hugo `0.161.0`.

Проверка проекта:

- `resources.GetRemote` не найден в локальных шаблонах и конфигурации.
- Сборка не обращается к remote resources.
- Более строгие `security.http.urls` не влияют на текущий build.
- `node` есть в `security.exec.allow`.

Вывод: security changes 0.161.0 совместимы с проектом.

### 3. Tailwind CSS через Hugo Pipes

Документация `css.TailwindCSS` требует Tailwind CLI v4 как npm dependency и build stats.

Проверка проекта:

- `hugo.yaml` включает `build.buildStats.enable: true`.
- `hugo.yaml` монтирует `hugo_stats.json` в `assets/notwatching/hugo_stats.json`.
- `assets/css/main.css` явно подключает `@source "hugo_stats.json";`.
- `layouts/_partials/css.html` вызывает `css.TailwindCSS`.
- `package.json` содержит `tailwindcss` и `@tailwindcss/cli`.
- CSS pipeline успешно собирается через Hugo `css.TailwindCSS`.

Вывод: CSS pipeline соответствует документации Hugo `0.161.0`.

### 4. Языки и deprecated language API

Актуальная документация Hugo считает deprecated:

- `.Language.Lang` -> использовать `.Language.Name`
- `.Language.LanguageCode` -> использовать `.Language.Locale`
- `.Language.LanguageDirection` -> использовать `.Language.Direction`
- `.Language.LanguageName` -> использовать `.Language.Label`

Проверка локальных шаблонов:

- Deprecated `.Language.Lang`, `.Language.LanguageCode`, `.Language.LanguageDirection`, `.Language.LanguageName` в локальных `layouts/` не найдены.
- `layouts/baseof.html` использует `.Language.Direction`.
- `layouts/_partials/page-language.html` использует `.Language.Locale` с fallback на `.Language.Name`.
- `layouts/rss.xml` использует `site.Language.Locale | default site.Language.Name`.
- OpenGraph использует `.Site.Language.Locale`.
- Переключатель языка и sitemap index используют `.Language.Name` для language key, что соответствует документации.
- `layouts/_partials/translation-list.html` использует `.Language.Name` и `.Language.Label`.

В теме PaperMod deprecated API еще есть:

- `themes/PaperMod/layouts/_default/baseof.html`
- `themes/PaperMod/layouts/_default/rss.xml`
- `themes/PaperMod/layouts/partials/header.html`
- `themes/PaperMod/layouts/partials/templates/opengraph.html`
- `themes/PaperMod/layouts/partials/templates/schema_json.html`
- `themes/PaperMod/layouts/partials/translation_list.html`

Но активные пути перекрыты локальными override в `layouts/`, включая `layouts/search.html`, и сборка на `0.161.0` не выдает deprecated warnings.

Вывод: локальная часть проекта соответствует актуальному language API. Theme debt остается только как неисполняемый риск при будущих обновлениях/удалении override.

### 5. I18n

Проверка:

- `i18n/uk.yaml` содержит `page_not_found` и pluralized `words`.
- `i18n/ru.yaml` содержит `page_not_found` и pluralized `words`.
- `hugo --printI18nWarnings` на `0.161.0` не вывел предупреждений.
- `public/404.html` содержит украинский текст `Сторінку не знайдено`.
- `public/ru/404.html` содержит русский текст `Страница не найдена`.
- RSS language выводится как `uk-UA` и `ru-UA`.

Вывод: i18n совместим, прошлые пропущенные переводы закрыты.

### 6. `hugo.Sites` вместо deprecated `.Site.Sites`

Проверка:

- Deprecated `.Site.Sites`, `.Page.Sites`, `site.Sites` в локальных шаблонах не найдены.
- `layouts/sitemapindex.xml` использует `hugo.Sites`.

Вывод: этот блок соответствует актуальной документации.

### 7. Permalinks

В Hugo `0.161.0` появился slice-based internal representation для permalink config с PageMatcher target.

Проверка:

- Текущий YAML-синтаксис `permalinks.products/articles/news` принят без предупреждений.
- `hugo config` нормализует его в array-style target form.
- Фактические URL продуктов, новостей и статей собираются корректно.

Вывод: миграция синтаксиса permalinks не требуется.

### 8. Content model

Проверка:

- Контент использует текущую двуязычную схему `index.md` / `index.ru.md`.
- Главные страницы: `content/_index.md`, `content/_index.ru.md`.
- Статичные страницы `about`, `contact`, `faq` синхронизированы по языкам.
- `articles`, `news`, `products` используют page bundle structure.
- Markdown `# H1` в `content/` не найден.
- `schema_type:` singular не найден.
- `schema_types` используется в контенте и шаблонах.
- `date` и `lastmod` присутствуют у проверенных страниц.

Вывод: content model совместим с Hugo `0.161.0` и локальными правилами проекта.

### 9. SEO, schema.org, robots

Проверка generated output:

- В текущем `development`-окружении `/` и `/ru/` намеренно имеют `noindex,nofollow`.
- После включения production-режима нужно отдельно подтвердить, что индексируемые URL снова получают `index,follow`.
- `/404.html`, `/ru/404.html`, `/search/`, alias `/page/1/` имеют `noindex,nofollow`.
- `og:locale` выводится как `uk_UA` и `ru_UA`.
- HTML lang/dir выводится как `uk-UA/ltr` и `ru-UA/ltr`.
- JSON-LD собирается на главных и внутренних страницах.
- Шаблоны schema читают `.Params.schema_types`.

Вывод: SEO/schema слой не конфликтует с Hugo `0.161.0`.

### 10. Sitemap и RSS

Проверка:

- Корневой `public/sitemap.xml` является sitemap index.
- В index есть:
  - `https://aerocool.ua/uk/sitemap.xml`
  - `https://aerocool.ua/ru/sitemap.xml`
- `public/uk/sitemap.xml` и `public/ru/sitemap.xml` генерируются.
- Активный локальный RSS-шаблон находится в `layouts/rss.xml`.
- RSS содержит `<generator>Hugo -- 0.161.0</generator>`.
- RSS language: `uk-UA`, `ru-UA`.

Вывод: sitemap/RSS слой совместим.

### 11. Theme PaperMod

Проверка:

- Hugo module graph: `project PaperMod`.
- У темы не найден `package.json` или `package.hugo.json`, значит Node package merge из Hugo modules не требуется.
- Deprecated language API в теме есть, но локально перекрыты активными шаблонами.
- Локальные overrides покрывают критичные `baseof`, `head`, `header`, `footer`, RSS, sitemap, 404, alias, search, SEO/schema partials.
- В локальном слое больше нет папки `layouts/_default`; RSS и search лежат как `layouts/rss.xml` и `layouts/search.html`.

Вывод: текущая тема не блокирует переход, но при обновлении PaperMod нужно повторно прогнать grep по deprecated language API.

### 12. Netlify

Текущее состояние:

- `netlify.toml` закрепляет `HUGO_VERSION = "0.161.0"`.
- `.mise.toml` закрепляет `hugo = "0.161.0"`.
- `NODE_VERSION = "24"` соответствует требованиям Hugo `0.161.0`.
- Build command: `git submodule update --init --recursive && hugo --environment development --gc --minify`.
- `HUGO_ENVIRONMENT = "development"` оставляет сборку во временном development-режиме.

Вывод: runtime и deploy pin совместимы с Hugo `0.161.0`; production environment пока намеренно не включен.

## Команды проверки

```bash
mise x hugo@0.161.0 -- hugo version
mise x node@24 -- node --version
mise x hugo@0.161.0 node@24 -- hugo --environment development --gc --minify --printPathWarnings --printI18nWarnings
mise x hugo@0.161.0 node@24 -- hugo --environment development --gc --minify --templateMetrics --templateMetricsHints
mise x hugo@0.161.0 node@24 -- npm run build
mise x hugo@0.161.0 node@24 -- hugo config --format toml
mise x hugo@0.161.0 -- hugo mod graph
rg -n --glob '!themes/**' --glob '!public/**' --glob '!resources/**' --glob '!node_modules/**' 'languageCode|languageName|languageDirection|LanguageCode|LanguageName|LanguageDirection|\.Language\.Lang|\.Site\.Language\.Lang|site\.Language\.Lang|\.Lang\b|site\.Sites\b|\.Site\.Sites\b|\.Page\.Sites\b|site\.Data\b|\.Site\.Data\b|excludeFiles|includeFiles|:filename' layouts hugo.yaml netlify.toml package.json .mise.toml
rg -n 'schema_type:' content layouts
rg -n '^# ' content
rg -n 'resources\.GetRemote|http\.Get|GetRemote|remoteResource' layouts assets hugo.yaml netlify.toml package.json
git diff --check
```

Результаты:

- Hugo version: `v0.161.0`.
- Node version: `v24.15.0`.
- Development-environment build: success.
- `npm run build`: success.
- Pages: `47` UK, `45` RU.
- Paginator pages: `6` UK, `6` RU.
- Non-page files: `36` UK.
- Static files: `16` UK, `16` RU.
- Processed images: `144` UK.
- Aliases: `8` UK, `7` RU.
- I18n warnings: none.
- Path warnings: none.
- Template metrics hints: no actionable warnings.
- `git diff --check`: clean.
- Template metrics подтверждают использование `rss.xml`, `search.html` и `_partials/translation-list.html`.

## Findings

### Resolved - Hugo pins point to 0.161.0

Files:

- `.mise.toml:2`
- `netlify.toml:10`

Current values:

```toml
hugo = "0.161.0"
HUGO_VERSION = "0.161.0"
```

Impact: local/default tooling and Netlify build use Hugo `0.161.0`.

### Intentional - Netlify build still uses development environment

File: `netlify.toml:12`

Current value:

```toml
HUGO_ENVIRONMENT = "development"
```

Impact: Netlify build uses the official Hugo environment variable, but intentionally remains in `development` until production mode is approved.

Build command:

```toml
command = "git submodule update --init --recursive && hugo --environment development --gc --minify"
```

### P2 - `params.env` remains `development`

File: `hugo.yaml:110`

Current value:

```yaml
params:
  env: development
```

Impact: this is a theme/project param, not the same as Hugo's build environment, and current local templates mostly avoid relying on it for robots. But it is misleading for production and can affect theme logic if a PaperMod partial becomes active later.

Recommended change after confirming no local dev dependency:

```yaml
params:
  env: production
```

### P3 - Dormant RSS fallback still references deprecated `site.Author`

File: `layouts/rss.xml`

The local RSS template still includes fallback branches referencing `site.Author.email` and `site.Author.name`. They are not reached with the current config because `site.Params.author` is set, so the build emits no warning.

Impact: not blocking for Hugo `0.161.0`, but this is low-grade template debt.

Recommended cleanup: remove the `site.Author` fallback and keep only `site.Params.author`.

### P3 - PaperMod submodule still contains deprecated language API

Files in `themes/PaperMod/layouts/` still reference deprecated language fields. Active project output is safe because local overrides replace those paths. Keep this on the checklist for future theme updates.

## Current Hugo 0.161.0 checklist

1. Expected `.mise.toml`:

```toml
[tools]
hugo = "0.161.0"
node = "24"
```

2. Expected `netlify.toml`:

```toml
[build]
  command = "git submodule update --init --recursive && hugo --environment development --gc --minify"

[build.environment]
  HUGO_VERSION = "0.161.0"
  HUGO_ENVIRONMENT = "development"
  NODE_VERSION = "24"
```

3. Keep `HUGO_ENVIRONMENT = "development"` until production mode is approved.

4. Optionally change `params.env` from `development` to `production`.

5. Re-run:

```bash
mise trust
mise install
mise x hugo@0.161.0 node@24 -- hugo --environment development --gc --minify --printPathWarnings --printI18nWarnings
mise x hugo@0.161.0 node@24 -- npm run build
```

## Final assessment

Hugo `0.161.0` is adopted in project tooling and Netlify configuration. The project code, local templates, i18n, Tailwind pipeline, SEO/schema templates, sitemap/RSS output and multilingual content model are compatible. The build environment remains `development` by design until production mode is approved.
