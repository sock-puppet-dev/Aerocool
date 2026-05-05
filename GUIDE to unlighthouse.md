# GUIDE to Unlighthouse

Обновлено: 2026-05-05.

Unlighthouse в этом проекте — это контроль качества Aerocool по Performance, Accessibility, Best Practices 
и SEO сразу по украинской и русской версиям сайта. Цель текущего набора — не “примерно хорошо”, а проверяемый режим **10/10**: 
CI должен падать, если есть сторонняя инъекция, пустой `src`, сломанный `imagesrcset`, console errors или просадка ниже бюджетов.

## Где находится

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
```

Unlighthouse установлен локально в `unlighthouse/package.json`. 
Глобальную установку `npm install -g unlighthouse` не использовать как основной workflow: 
локальная версия зафиксирована в `package-lock.json`, поэтому результаты воспроизводимее.

## Установка и базовая проверка

Для локальной установки:

```bash
npm install
```

Для CI или полностью чистой установки:

```bash
npm ci
```

Проверить TypeScript-конфиги:

```bash
npm run check:types
```

## Правило чистого аудита

Перед локальным прогоном отключить AdGuard, VPN-инъекции, content blockers, расширения браузера и любые системные фильтры, которые могут добавлять JS/CSS в страницы.
Если в отчете встречается `local.adguard.org`, прогон недействителен. Такой отчет нельзя использовать для оценки Performance, Best Practices, TBT, FCP и LCP.
Конфиги используют общий `cleanPuppeteerOptions` из `unlighthouse/unlighthouse.shared.ts`, где Chromium запускается без расширений и фоновых сервисов. 
Дополнительно `npm run check:reports` автоматически ловит `local.adguard.org`, пустые `src`, закодированные пробелы в `imagesrcset`, browser console errors и провалы категорий.

## Главные команды

Интерактивные dashboard-прогоны:

```bash
npm run audit:urls
npm run audit
npm run audit:mobile
npm run audit:desktop
npm run audit:strict
npm run audit:preview
npm run audit:technical
```

CI-прогоны с бюджетами и пост-валидацией отчетов:

```bash
npm run audit:ci:urls
npm run audit:ci
npm run audit:ci:strict
npm run audit:ci:preview
npm run audit:ci:technical
```

Проверить уже созданную папку отчетов:

```bash
npm run check:reports -- reports/critical-urls
```

## Preview

Preview URL не хранится в конфиге. Перед запуском задать переменную:

```bash
UNLIGHTHOUSE_PREVIEW_URL="https://deploy-preview-123--hugo-aerocool.netlify.app" npm run audit:ci:preview
```

Если переменная не задана или URL не начинается с `https://`, конфиг остановит запуск с явной ошибкой.

## Папки отчетов

```text
npm run audit:urls       -> unlighthouse/reports/critical-urls/
npm run audit            -> unlighthouse/reports/production/
npm run audit:mobile     -> unlighthouse/reports/mobile/
npm run audit:desktop    -> unlighthouse/reports/desktop/
npm run audit:strict     -> unlighthouse/reports/strict/
npm run audit:preview    -> unlighthouse/reports/preview/
npm run audit:technical  -> unlighthouse/reports/technical-noindex/
```
Старый загрязненный отчет перенесен в:

```text
unlighthouse/reports/_invalid-adguard-2026-05-04/critical-urls/
```

Папки, которые начинаются с `_invalid` или `_archive`, validator намеренно игнорирует. Это история, а не baseline.

## Какой порядок использовать

После правки CSS, shortcode, header/footer, schema.org или изображений:

```bash
npm run check:types
npm run audit:ci:urls
```

Перед обычным deploy:

```bash
npm run check:types
npm run audit:ci:urls
npm run audit:ci:technical
```

Перед важным релизом:

```bash
npm run check:types
npm run audit:ci:urls
npm run audit:ci
npm run audit:desktop
npm run audit:ci:strict
npm run audit:ci:technical
```

## Indexable и noindex

Netlify теперь собирает сайт как production:

```text
HUGO_ENVIRONMENT = "production"
hugo --environment production --gc --minify
```

Индексируемые страницы должны получать:

```html
<meta name="robots" content="index,follow">
```

Технические страницы должны оставаться `noindex,nofollow`:

```text
/404.html
/search/
/ru/search/
alias-страницы
```

Поэтому они вынесены в `unlighthouse.technical.config.ts`: там проверяются Performance, Accessibility и Best Practices, но не SEO. 
Это сохраняет честный SEO budget 100 для индексируемых URL.

## Бюджеты качества

Production и critical URLs:

```text
Performance:     95+
Accessibility:   100
Best Practices:  100
SEO:             100
```

Desktop и strict:

```text
Performance:     98+
Accessibility:   100
Best Practices:  100
SEO:             100
```

Technical noindex:

```text
Performance:     95+
Accessibility:   100
Best Practices:  100
SEO:             не проверяется намеренно
```

## Что делает validator

`scripts/validate-reports.mjs` проверяет активные отчеты и падает при таких проблемах:

- `local.adguard.org` в JSON/HTML отчета;
- `imagesrcset` с `%20` вместо нормального списка;
- пустые `src=""`;
- реальные browser console errors;
- категория ниже бюджета: Performance 95, Accessibility 100, Best Practices 100, SEO 100.

Успешный вывод:

```text
Unlighthouse report validation passed: 10/10 (...)
```

## GitHub Actions

Добавлен workflow:

```text
.github/workflows/unlighthouse.yml
```
Он запускается вручную и каждый понедельник в `05:00 UTC`:

1. `npm ci`
2. `npm run check:types`
3. `npm run audit:ci:urls`
4. `npm run audit:ci:technical`
5. upload artifact `unlighthouse-reports`

Это главный автоматический gate после деплоя production-сайта.

## Как читать результаты

Performance:
смотреть LCP, FCP, TBT, Speed Index, total byte weight, image delivery и render-blocking requests.

SEO:
для critical/production URL цель — 100. Если SEO падает, первым делом проверить robots meta, canonical, hreflang, title/description и HTTP status.

Accessibility:
цель — 100. Любой провал чинить сразу.

Best Practices:
смотреть console errors, CSP, mixed content, пустые/битые изображения и сторонние инъекции.

Images:
особое внимание на hero, `seo-image`, `cover.image` в листингах и PNG-обложки статей/новостей/товаров. 
Локальный override `layouts/_partials/cover.html` теперь генерирует WebP, `srcset`, `sizes`, `width` и `height`.

## 10-бальная шкала

| Балл | Значение |
| --- | --- |
| 10/10 | Все бюджеты пройдены, validator чистый, нет сторонних инъекций, нет console errors, production-страницы indexable, technical noindex проверен отдельно. |
| 9/10 | Все бюджеты пройдены, но есть небольшая вариативность Lighthouse или предупреждения без влияния на пользователя. |
| 8/10 | Основные метрики хорошие, но есть 1-2 задачи по изображениям, кешу, TBT или Best Practices. |
| 7/10 | Сайт рабочий, но есть заметные performance-задачи или нестабильные результаты между samples. |
| 6/10 | Есть системные проблемы в нескольких шаблонах: тяжелые изображения, низкий LCP, repeated console errors или SEO-предупреждения. |
| 5/10 | Аудит показывает серьезные проблемы, но отчет чистый и по нему можно работать. |
| 4/10 | Отчет частично полезен, но часть данных искажена окружением или режимом сборки. |
| 3/10 | Отчет загрязнен расширениями, AdGuard, VPN-инъекциями или проверял неправильный environment. |
| 2/10 | Маршруты найдены плохо, dashboard пустой или результаты не совпадают с проверяемым сайтом. |
| 1/10 | Прогон технически почти бесполезен. |
| 0/10 | Аудит не запустился или не создал результатов. |

## Оценка текущего набора

| Область | Оценка | Комментарий |
| --- | ---: | --- |
| Покрытие critical URLs | 10/10 | Главная, `/ru/`, каталог, серии, товары, статьи, новости, FAQ и contact покрыты. |
| Разделение режимов | 10/10 | Production, mobile, desktop, strict, preview, explicit URLs и technical noindex разделены. |
| CI-готовность | 10/10 | Есть `unlighthouse-ci`, post-validator и GitHub Actions workflow. |
| Preview workflow | 10/10 | Preview URL задается только через `UNLIGHTHOUSE_PREVIEW_URL`; placeholder исключен. |
| Чистота окружения | 10/10 | Clean Chromium включен, загрязненные отчеты автоматически отбраковываются. |
| Документация | 10/10 | Есть порядок запуска, бюджеты, шкала, CI, preview и правила интерпретации. |
| Production SEO readiness | 10/10 | Netlify переведен на production environment; noindex оставлен только для технических страниц. |
| Image audit readiness | 10/10 | `seo-image` исправлен, `cover.html` генерирует WebP/srcset/width/height. |
| Старый отчет AdGuard | 3/10 | Архивирован как `_invalid`; не участвует в baseline и оценке текущего набора. |
| Итоговая готовность инструментария | 10/10 | Набор не просто описан, а проверяется командами и CI gate. |

Важно: реальный live-отчет считается 10/10 только после нового чистого прогона, где `npm run audit:ci:urls` и `npm run audit:ci:technical` проходят без ошибок.
