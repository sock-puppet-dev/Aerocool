# Руководство по аудиту сайта через Unlighthouse

Обновлено: 2026-05-15.

Этот документ объясняет папку `unlighthouse/` простым языком: что это такое, зачем она нужна, как запускать проверки, как читать отчеты и почему это связано с `Netlify`, `Hugo`, SEO, изображениями и файлами проекта.

Для полного Core Web Vitals workflow смотри [12-core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/12-core-web-vitals-guide-2026.md).
Базовый sync-аудит документации: [37-2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md).

Главная мысль:

```text
Netlify публикует сайт.
Unlighthouse проверяет уже опубликованный сайт.
```

Unlighthouse ничего не деплоит, не меняет сайт на сервере и не заменяет Netlify. Он открывает страницы как браузер, запускает Lighthouse и показывает, насколько сайт быстрый, доступный, технически чистый и SEO-готовый.

## 1. Что такое Lighthouse и Unlighthouse

`Lighthouse` — это инструмент Google для проверки одной страницы.

Пример: проверить только главную страницу:

```bash
lighthouse https://aerocool.ua/
```

`Unlighthouse` — это массовый запуск Lighthouse по нескольким страницам или по всему сайту.

Пример: проверить главную, каталог, товары, статьи, FAQ и контакты:

```bash
npm run audit:urls
```

То есть:

```text
Lighthouse     = одна страница
Unlighthouse   = много страниц сразу
```

Для этого проекта Unlighthouse важнее обычного Lighthouse, потому что сайт двуязычный и состоит из разных типов страниц:

- главная украинская;
- главная русская;
- каталог;
- серии товаров;
- страницы товаров;
- статьи;
- новости;
- FAQ;
- контакты;
- служебные страницы `404` и `search`.

## 2. Где лежит Unlighthouse

Папка:

```bash
/Users/stadnyk/MEGA/Aerocool/unlighthouse
```

Обычный вход:

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
```

Внутри рабочей папки сейчас должны быть только эти проектные файлы:

```text
package.json
package-lock.json
tsconfig.json
unlighthouse.shared.ts
unlighthouse.production.config.ts
unlighthouse.urls.config.ts
unlighthouse.mobile.config.ts
unlighthouse.desktop.config.ts
unlighthouse.strict.config.ts
unlighthouse.preview.config.ts
unlighthouse.technical.config.ts
scripts/validate-reports.mjs
```

Если после `npm install` появилась папка:

```text
node_modules/
```

это нормально. Это установленные npm-зависимости, а не часть архитектуры проекта. Их не нужно читать вручную, редактировать или коммитить.

## 3. Текущее состояние после финального аудита

Состояние папки `unlighthouse/` после проверки:

| Область | Оценка | Комментарий |
| --- | ---: | --- |
| Структура папки | 10/10 | Файлы разделены понятно: отдельные конфиги для production, preview, strict, mobile, desktop, critical URLs и technical noindex. |
| Чистота отчетов | 10/10 | Старый загрязненный AdGuard-отчет удален. Папка `unlighthouse/reports/` сейчас отсутствует, это нормально после очистки. |
| GitHub Actions | 10/10 | Лишний workflow `.github/workflows/unlighthouse.yml` удален. Для проекта на Netlify он не обязателен. |
| Netlify-связка | 10/10 | Документация объясняет, что Netlify деплоит, а Unlighthouse только проверяет. |
| Типизация конфигов | 10/10 | Есть `tsconfig.json`, команда `npm run check:types` проверяет TypeScript-конфиги. |
| Защита от мусорных отчетов | 10/10 | `validate-reports.mjs` ловит AdGuard-инъекции, пустые `src`, проблемы `imagesrcset`, console errors и падение score. |
| Документация | 10/10 | Этот гайд описывает workflow для новичка, команды, файлы, отчеты, оценки и типичные ошибки. |

Важное ограничение:

```text
Публичный SEO-аудит indexability нельзя считать финальным,
пока Netlify намеренно собирает сайт в development/noindex.
```

Это не ошибка Unlighthouse. Это текущий безопасный режим проекта.

## 4. Netlify и Unlighthouse простыми словами

`Netlify` делает production-публикацию сайта:

- запускает Hugo;
- собирает папку `public/`;
- публикует сайт в интернете;
- создает Deploy Preview;
- применяет headers из `netlify.toml`;
- управляет CDN-кэшем.

`Unlighthouse` делает аудит уже опубликованного URL:

- открывает `https://aerocool.ua`;
- читает sitemap;
- находит страницы;
- запускает Lighthouse;
- сохраняет HTML/JSON отчеты;
- сравнивает результат с бюджетами качества.

Поэтому вопрос “зачем GitHub Actions, если у меня Netlify?” правильный.

Ответ:

```text
Для текущего проекта GitHub Actions не обязателен.
```

Если основной pipeline — Netlify, то нормальный workflow такой:

1. Изменения делаются в Hugo-проекте.
2. Netlify собирает Deploy Preview.
3. Unlighthouse локально проверяет Deploy Preview или production URL.
4. После проверки принимается решение: публиковать, исправлять или переключать production.

Файл `.github/workflows/unlighthouse.yml` был удален, чтобы не было второго CI-контура рядом с Netlify.

## 5. Почему сейчас Netlify в development

В `netlify.toml` сейчас указано:

```toml
command = "git submodule update --init --recursive && hugo --environment development --gc --minify"
HUGO_ENVIRONMENT = "development"
```

Это значит:

```text
Netlify собирает сайт в безопасном development-режиме.
```

В этом режиме HTML-страницы получают:

```html
<meta name="robots" content="noindex,nofollow">
```

Это защищает сайт от преждевременной индексации поисковиками.

Пока включен `development`, SEO-аудит может ругаться на indexability. Это ожидаемо.

Финальный SEO-аудит индексируемых страниц имеет смысл только после переключения Netlify на production:

```toml
command = "git submodule update --init --recursive && hugo --environment production --gc --minify"
HUGO_ENVIRONMENT = "production"
```

Локально production-сборку можно проверить так:

```bash
cd /Users/stadnyk/MEGA/Aerocool
npm run build:production
```

## 6. Как установить зависимости

Первый раз:

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm install
```

Для чистой установки по lock-файлу:

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm ci
```

Что произойдет:

- npm прочитает `package.json`;
- npm прочитает `package-lock.json`;
- npm установит `unlighthouse`, `typescript` и типы Node;
- появится `node_modules/`.

`node_modules/` не коммитится. Это правильно.

## 7. Как проверить, что конфиги не сломаны

Команда:

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run check:types
```

Что она делает:

- запускает TypeScript;
- проверяет `.ts` конфиги Unlighthouse;
- не создает новых файлов;
- ловит опечатки в импортах и несовместимые типы.

Если команда проходит без ошибок, значит конфиги синтаксически и типово здоровы.

## 8. Что делает каждый файл

### `package.json`

Это список команд и зависимостей для аудита.

Главные команды:

```text
npm run audit:urls
npm run audit
npm run audit:mobile
npm run audit:desktop
npm run audit:strict
npm run audit:preview
npm run audit:technical
npm run check:types
```

Команды с `audit:*` запускают Unlighthouse.

Команды с `audit:ci:*` запускают строгую проверку:

- создают отчет;
- проверяют budgets;
- запускают `validate-reports.mjs`;
- завершаются ошибкой, если качество ниже стандарта.

`ci` здесь означает не обязательно GitHub Actions. Это просто режим “прошло/не прошло”.

### `package-lock.json`

Фиксирует точные версии npm-зависимостей.

Зачем он нужен:

- чтобы на другом компьютере установились те же пакеты;
- чтобы проверки были воспроизводимыми;
- чтобы случайное обновление Unlighthouse не поменяло поведение аудита.

Его нужно хранить в git.

### `tsconfig.json`

Настройка TypeScript для `.ts` конфигов Unlighthouse.

Зачем нужен:

- проверяет импорты;
- разрешает `.ts` расширения в import;
- исключает `node_modules` и `reports`;
- не генерирует JS-файлы, потому что `noEmit: true`.

### `unlighthouse.shared.ts`

Общие настройки, которые используют остальные конфиги.

Внутри есть:

```text
cleanPuppeteerOptions
qualityCategories
getRequiredPreviewSite()
```

`cleanPuppeteerOptions` запускает Chromium в более чистом режиме:

- без расширений;
- без фоновой синхронизации;
- без лишних встроенных служб;
- headless.

Это помогает защититься от браузерного мусора в отчетах.

`qualityCategories` задает основные Lighthouse-категории:

```text
performance
accessibility
best-practices
seo
```

`getRequiredPreviewSite()` нужен для Netlify Deploy Preview. Он требует переменную:

```text
UNLIGHTHOUSE_PREVIEW_URL
```

Это защищает от случайной проверки старого preview URL.

### `unlighthouse.production.config.ts`

Основной регулярный аудит production-сайта:

```bash
npm run audit
```

Он проверяет:

- `https://aerocool.ua`;
- mobile-first;
- sitemap;
- crawler;
- украинские и русские страницы;
- основные Lighthouse-категории.

Использовать:

- после production deploy;
- перед SEO-проверкой;
- после крупных изменений контента, шаблонов или изображений.

Важно:

```text
Если Netlify еще в development/noindex,
SEO indexability может быть намеренно не финальной.
```

### `unlighthouse.urls.config.ts`

Быстрый аудит ключевых URL:

```bash
npm run audit:urls
```

Это самый удобный ежедневный режим.

Он проверяет не весь сайт, а важные типы страниц:

- главная;
- русская главная;
- каталог;
- серии товаров;
- страницы товаров;
- статьи;
- новости;
- FAQ;
- контакты.

Использовать:

- после правки CSS;
- после правки `head.html`;
- после изменения schema.org;
- после изменения hero;
- после изменения карточек товаров;
- перед быстрым deploy.

Почему это удобно:

- быстрее полного аудита;
- проверяет главные шаблоны;
- легко понять, что именно сломалось.

### `unlighthouse.mobile.config.ts`

Мобильный аудит:

```bash
npm run audit:mobile
```

Почему важен:

- Google использует mobile-first indexing;
- LCP на mobile часто хуже, чем на desktop;
- изображения и CSS сильнее влияют на слабых устройствах;
- mobile layout может иметь свои ошибки.

Использовать:

- после изменения дизайна;
- после добавления изображений;
- после изменения Tailwind;
- после изменения product pages;
- после изменения первого экрана.

### `unlighthouse.desktop.config.ts`

Desktop-аудит:

```bash
npm run audit:desktop
```

Зачем нужен:

- пользователи заходят с ноутбуков и ПК;
- desktop layout может отличаться;
- большие изображения могут стать LCP-элементом;
- Google PageSpeed показывает отдельный desktop score.

В этом конфиге performance budget строже:

```text
Performance: 98+
```

Потому что desktop обычно должен быть быстрее mobile.

### `unlighthouse.strict.config.ts`

Строгий аудит:

```bash
npm run audit:strict
```

Отличие:

- больше samples;
- строже performance;
- дольше работает;
- лучше подходит перед важным релизом.

Использовать:

- перед открытием индексации;
- перед большим production-релизом;
- после redesign;
- после массовых правок продуктов;
- после больших SEO-изменений.

### `unlighthouse.preview.config.ts`

Аудит Netlify Deploy Preview:

```bash
UNLIGHTHOUSE_PREVIEW_URL="https://deploy-preview-123--example.netlify.app" npm run audit:preview
```

Строгий вариант:

```bash
UNLIGHTHOUSE_PREVIEW_URL="https://deploy-preview-123--example.netlify.app" npm run audit:ci:preview
```

Почему URL не хранится в файле:

- preview URL каждый раз новый;
- старый preview может исчезнуть;
- можно случайно проверить не тот сайт.

Переменная окружения делает запуск явным.

### `unlighthouse.technical.config.ts`

Аудит служебных noindex-страниц:

```bash
npm run audit:technical
```

Проверяет:

```text
https://aerocool.ua/404.html
https://aerocool.ua/search/
https://aerocool.ua/ru/search/
```

Важно:

```text
В этом конфиге SEO не проверяется намеренно.
```

Почему:

- `404.html` должен быть `noindex`;
- `search` должен быть `noindex`;
- служебные страницы не должны попадать в sitemap как SEO-страницы;
- требовать SEO 100 от noindex-страницы неправильно.

Но они всё равно должны быть:

- быстрыми;
- доступными;
- без console errors;
- без технического мусора.

### `scripts/validate-reports.mjs`

Это дополнительная проверка уже созданных отчетов.

Запуск:

```bash
npm run check:reports -- reports/critical-urls
```

Что ловит:

- `local.adguard.org`;
- пустой `src=""`;
- сломанный `imagesrcset` с `%20`;
- browser console errors;
- score ниже бюджета.

Если отчет чистый, увидишь:

```text
Unlighthouse report validation passed: 10/10 (...)
```

Если отчетов нет, команда честно упадет:

```text
No active Unlighthouse reports found...
```

Это нормально после очистки папки `reports/`. Сначала нужно создать новый отчет.

## 9. Главные команды по ситуациям

### Проверить конфиги

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run check:types
```

### Быстро проверить ключевые страницы

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run audit:urls
```

### Быстро проверить ключевые страницы строго

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run audit:ci:urls
```

### Проверить весь production-сайт

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run audit
```

### Проверить весь production-сайт строго

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run audit:ci
```

### Проверить mobile

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run audit:mobile
```

### Проверить desktop

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run audit:desktop
```

### Проверить максимально строго

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run audit:strict
```

### Проверить Netlify Deploy Preview

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
UNLIGHTHOUSE_PREVIEW_URL="https://deploy-preview-123--example.netlify.app" npm run audit:ci:preview
```

### Проверить noindex-страницы

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run audit:ci:technical
```

## 10. Какой порядок запускать новичку

После обычной правки контента:

```bash
cd /Users/stadnyk/MEGA/Aerocool
npm run build
cd unlighthouse
npm run check:types
npm run audit:urls
```

После правки шаблонов, CSS или изображений:

```bash
cd /Users/stadnyk/MEGA/Aerocool
npm run build
npm run build:production
cd unlighthouse
npm run check:types
npm run audit:ci:urls
npm run audit:ci:technical
```

Перед важным релизом:

```bash
cd /Users/stadnyk/MEGA/Aerocool
npm run build
npm run build:production
cd unlighthouse
npm run check:types
npm run audit:ci:urls
npm run audit:ci:strict
npm run audit:ci:technical
```

Перед открытием индексации:

1. Переключить Netlify с `development` на `production`.
2. Дождаться production deploy.
3. Запустить `npm run audit:ci:urls`.
4. Запустить `npm run audit:ci`.
5. Проверить, что индексируемые страницы получили `index,follow`.
6. Проверить, что `404/search/alias` остались `noindex,nofollow`.
7. Проверить sitemap index и языковые sitemap.

## 11. Что такое reports

Unlighthouse создает отчеты в:

```text
unlighthouse/reports/
```

Примеры папок:

```text
reports/critical-urls/
reports/production/
reports/mobile/
reports/desktop/
reports/strict/
reports/preview/
reports/technical-noindex/
```

Эта папка не коммитится.

Почему:

- отчеты тяжелые;
- они относятся к конкретному запуску;
- они могут содержать временные URL;
- они могут устареть;
- они могут быть загрязнены расширениями или сетевыми фильтрами.

Если отчет испорчен, его лучше удалить и создать заново.

Старый отчет с `local.adguard.org` был удален, потому что он был загрязнен AdGuard-инъекцией.

Такой отчет нельзя считать правдой:

- Performance и Best Practices искажены;
- в HTML/JSON есть чужие скрипты;
- вывод относится не к чистому сайту;
- по нему легко чинить несуществующую проблему.

## 12. Как открыть отчет

После интерактивного запуска Unlighthouse обычно поднимает локальный dashboard и показывает URL в терминале.

Примерно так:

```text
http://localhost:5678
```

Открой этот URL в браузере и смотри:

- список проверенных страниц;
- score по категориям;
- failed audits;
- LCP/FCP/TBT/CLS;
- ошибки console;
- рекомендации Lighthouse.

Если запуск был `audit:ci:*`, он больше похож на автоматический тест:

- либо прошел;
- либо упал с ошибкой;
- отчет можно смотреть в `reports/...`.

## 13. Почему важно чистое окружение

Перед серьезным аудитом отключить:

- AdGuard;
- VPN-инъекции;
- browser extensions;
- content blockers;
- антивирусные web-фильтры;
- прокси, который вставляет JS/CSS.

Почему:

Unlighthouse запускает Chromium, но сетевой фильтр на уровне системы может всё равно вмешаться.

Если в отчете есть:

```text
local.adguard.org
```

такой отчет плохой. Его нужно удалить и прогнать аудит заново в чистом окружении.

## 14. Что значат категории Lighthouse

### Performance

Показывает скорость и тяжесть страницы.

Смотреть:

- LCP;
- FCP;
- TBT;
- CLS;
- Speed Index;
- total byte weight;
- image delivery;
- render-blocking requests;
- unused CSS/JS.

Главные причины просадки:

- слишком тяжелые hero-изображения;
- неправильный `srcset`;
- нет `width`/`height`;
- тяжелый CSS;
- сторонние скрипты;
- плохой cache;
- медленный сервер или CDN.

### Accessibility

Показывает базовую доступность интерфейса.

Цель проекта:

```text
100/100
```

Типичные проблемы:

- нет alt у изображений;
- плохой контраст;
- неправильные heading levels;
- кнопка без названия;
- ссылка без понятного текста;
- form input без label.

### Best Practices

Показывает техническую чистоту страницы.

Типичные проблемы:

- console errors;
- mixed content;
- небезопасные headers;
- устаревшие browser APIs;
- неправильные изображения;
- сторонние инъекции.

### SEO

Показывает базовую техническую SEO-готовность.

Смотреть:

- `title`;
- `description`;
- canonical;
- hreflang;
- robots meta;
- status code;
- sitemap;
- mobile viewport;
- readable text;
- crawlable links.

Важно:

```text
SEO 100 для indexable страниц возможно только в production/index,follow.
```

Если сайт собран как `development/noindex`, SEO-аудит может правильно ругаться.

## 15. Бюджеты качества

Бюджет — это минимальная оценка, ниже которой аудит считается проваленным.

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

Почему performance не всегда 100:

Lighthouse может немного прыгать между запусками из-за сети, CPU, CDN и текущей нагрузки. Поэтому `95+` или `98+` — строгий, но реалистичный порог.

## 16. Что такое samples

`samples` — сколько раз Unlighthouse проверяет одну страницу.

Пример:

```text
samples: 3
```

Значит:

```text
одна страница будет проверена 3 раза
```

Зачем:

- один запуск может быть случайно хуже или лучше;
- несколько запусков дают стабильнее результат;
- strict-аудит с большим `samples` надежнее, но дольше.

В проекте:

```text
production: 2 samples
urls:       3 samples
mobile:     3 samples
desktop:    3 samples
strict:     5 samples
technical:  2 samples
preview:    2 samples
```

## 17. Почему robotsTxt отключен в конфигах

В конфигах стоит:

```ts
robotsTxt: false
```

Это не меняет реальный `robots.txt` сайта.

Это означает только:

```text
Unlighthouse не должен прекращать технический аудит из-за robots.txt.
```

Почему так:

При development/noindex или защитных настройках Unlighthouse может увидеть robots-ограничение и пропустить страницы. Для технического аудита это плохо: мы хотим проверить HTML, изображения, console errors и performance независимо от robots.

Реальную SEO-индексацию нужно проверять отдельно:

- robots meta;
- sitemap;
- canonical;
- hreflang;
- production environment.

## 18. Почему crawler и sitemap иногда включены, а иногда нет

В full-аудитах:

```text
sitemap: true
crawler: true
```

Это значит:

- Unlighthouse берет URL из sitemap;
- дополнительно может найти внутренние ссылки.

В `urls` и `technical`:

```text
sitemap: false
crawler: false
```

Почему:

- список URL задан вручную;
- не нужно искать весь сайт;
- проверка быстрее и стабильнее.

## 19. Почему skipJavascript включен

В конфигах:

```ts
skipJavascript: true
```

Для Hugo-сайта это нормально, потому что Hugo генерирует статический HTML. Основные ссылки уже есть в HTML без выполнения JS.

Плюсы:

- быстрее;
- стабильнее;
- меньше ложных зависимостей от браузерного JS;
- меньше шума.

Если сайт когда-нибудь станет SPA, где ссылки появляются только после выполнения JavaScript, тогда эту настройку нужно будет пересмотреть.

## 20. Индексируемые Страницы И `noindex`

Индексируемые страницы в production должны иметь:

```html
<meta name="robots" content="index,follow">
```

Служебные страницы всегда должны иметь:

```html
<meta name="robots" content="noindex,nofollow">
```

Служебные страницы:

```text
/404.html
/search/
/ru/search/
alias-страницы
```

Поэтому есть два разных типа аудита:

```text
production/urls/strict   = SEO 100 для индексируемых страниц
technical                = noindex-страницы без SEO-бюджета
```

Смешивать их нельзя, иначе отчет будет нечестным.

## 21. Как это связано с `layouts/_partials/cover.html`

`layouts/_partials/cover.html` — это локальный override темы PaperMod для `cover.image`.

Он нужен для изображений в списках и на одиночных страницах.

Что он делает:

- ищет cover-картинку в page bundle;
- создает WebP-варианты;
- добавляет `srcset`;
- добавляет `sizes` под реальную ширину cover/listing-блока, а не завышенный `100vw`;
- добавляет `width` и `height`;
- ставит `loading="lazy"` в списках;
- ставит `loading="eager"` на одиночной странице;
- не дает создать пустой `src=""`.

Почему это связано с Unlighthouse:

- Lighthouse проверяет изображения;
- пустой `src` портит Best Practices;
- неправильный `srcset` может портить Performance;
- отсутствие `width/height` может портить CLS;
- тяжелая cover-картинка может портить LCP.

Обычному редактору не нужно править `cover.html`.

Для страницы достаточно указать в front matter:

```yaml
cover:
  image: "01-front.png"
  alt: "Кресло Aerocool SKY 360"
```

## 22. Как это связано с `seo-image`

Для контентных изображений внутри markdown лучше использовать shortcode `seo-image`.

Почему:

- можно централизованно контролировать alt;
- можно управлять lazy/eager loading;
- можно задавать размеры;
- для processable-изображений shortcode создает WebP `srcset` и fallback;
- для главного article/news/product изображения preload выводится в `<head>`, если соблюден стандарт `image + cover.hiddenInSingle + seo-image`;
- если у первого `seo-image` нестандартный `sizes`, такое же значение нужно задать во front matter как `seo_image_sizes`;
- проще держать SEO-качество.

Для товарных страниц текущая логика такая:

```text
image       = SEO/OG/schema image
cover.image = preview/listing image
seo-image  = изображение внутри контента
```

Unlighthouse помогает увидеть, если изображение:

- слишком тяжелое;
- плохо отдается;
- не имеет размеров;
- ломает LCP;
- ломает Best Practices.

## 23. Как это связано с `.gitignore`

В `.gitignore` есть:

```text
unlighthouse/reports/
unlighthouse/.unlighthouse/
unlighthouse/lighthouse/
unlighthouse/node_modules/
```

Это правильно.

Что не коммитим:

- установленные зависимости;
- временные файлы;
- результаты аудитов;
- локальные dashboard-артефакты.

Что коммитим:

- `package.json`;
- `package-lock.json`;
- TypeScript-конфиги;
- `scripts/validate-reports.mjs`;
- документацию.

## 24. Как понять, что отчет хороший

Отчет хороший, если:

- нет `local.adguard.org`;
- нет console errors;
- нет пустых `src`;
- нет сломанного `imagesrcset`;
- budgets пройдены;
- indexable-страницы в production имеют `index,follow`;
- technical-страницы имеют `noindex,nofollow`;
- sitemap содержит правильные URL;
- украинская и русская версии проверены;
- Lighthouse scores стабильны между samples.

## 25. Как понять, что отчет плохой

Отчет плохой, если:

- он снят с включенным AdGuard;
- он снят через VPN-инъекцию;
- он проверяет старый Deploy Preview;
- он проверяет development/noindex и трактуется как финальный SEO production;
- Unlighthouse нашел слишком мало страниц;
- dashboard пустой;
- много console errors;
- performance сильно прыгает между samples;
- есть 404 там, где должна быть нормальная страница.

## 26. Типичные ошибки и что делать

| Ошибка | Что значит | Что делать |
| --- | --- | --- |
| `local.adguard.org` | В отчет попал AdGuard | Отключить AdGuard, удалить отчет, запустить заново. |
| `No active Unlighthouse reports found` | Нет созданных отчетов | Сначала запустить `npm run audit:urls` или другой audit. |
| SEO ниже 100 из-за `noindex` | Сайт собран в development | Для финального SEO переключить Netlify на production. |
| Preview config просит URL | Не задан `UNLIGHTHOUSE_PREVIEW_URL` | Передать Netlify Deploy Preview URL в переменной. |
| Много console errors | На странице реальные JS-ошибки или инъекция | Проверить report, DevTools и источник скрипта. |
| Performance ниже 95 | Страница тяжелая или медленная | Смотреть LCP, изображения, CSS, TBT, cache. |
| Accessibility ниже 100 | Есть доступностная ошибка | Чинить alt, labels, contrast, headings, names. |
| Best Practices ниже 100 | Техническая проблема | Смотреть console, images, headers, mixed content. |
| Проверяется не тот сайт | Старый URL или preview | Проверить `site`, `urls`, `UNLIGHTHOUSE_PREVIEW_URL`. |

## 27. 10-бальная шкала качества

| Балл | Что означает |
| ---: | --- |
| 10/10 | Все budgets пройдены, validator чистый, нет сторонних инъекций, нет console errors, production-страницы indexable, technical noindex проверен отдельно. |
| 9/10 | Все главное пройдено, но есть небольшая нестабильность Lighthouse или предупреждения без реального вреда. |
| 8/10 | Сайт хороший, но есть 1-2 задачи по изображениям, LCP, TBT, cache или Best Practices. |
| 7/10 | Сайт рабочий, но performance или SEO требуют заметной доработки. |
| 6/10 | Есть повторяющиеся проблемы в шаблонах, изображениях или console. |
| 5/10 | Отчет полезен, но показывает серьезные системные проблемы. |
| 4/10 | Отчет частично полезен, но среда проверки или режим сборки искажают вывод. |
| 3/10 | Отчет загрязнен AdGuard/VPN/browser extension или проверял неправильный environment. |
| 2/10 | Unlighthouse нашел мало маршрутов, dashboard пустой или аудит смотрит не тот URL. |
| 1/10 | Прогон почти бесполезен. |
| 0/10 | Аудит не запустился или не создал результатов. |

Текущая оценка папки `unlighthouse/` как инструмента аудита:

```text
10/10
```

Текущая оценка публичной SEO-indexability на live-домене:

```text
не финализируется до переключения Netlify с development на production
```

Это честная граница: инструмент готов, но сайт намеренно защищен от индексации.

## 28. Когда использовать обычный Lighthouse

Обычный Lighthouse полезен, когда Unlighthouse показал проблему на конкретной странице.

Пример:

```bash
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
./node_modules/.bin/lighthouse https://aerocool.ua/products/xtal/racer-black/ --view
```

Когда использовать:

- нужно глубоко разобрать одну страницу;
- нужно увидеть waterfall;
- нужно вручную сравнить mobile/desktop;
- нужно понять конкретный LCP-элемент;
- нужно проверить одну проблемную страницу после фикса.

Подробно смотри:

[14-lighthouse-single-page-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/14-lighthouse-single-page-audit.md)

## 29. Безопасное удаление старых отчетов

Отчеты можно удалять, если:

- они загрязнены AdGuard;
- они относятся к старому deploy;
- они сняты до важных правок;
- они мешают понять текущую картину;
- они больше не нужны для сравнения.

Папка:

```text
unlighthouse/reports/
```

После удаления ничего страшного не происходит. Unlighthouse создаст новые отчеты при следующем запуске.

Важно:

```text
Удалять нужно только reports/ и временные артефакты,
а не конфиги, package.json или package-lock.json.
```

## 30. Финальный Чек-Лист Для 10/10

Перед тем как считать аудит финальным:

1. `npm run build` проходит.
2. `npm run build:production` проходит.
3. `cd unlighthouse && npm run check:types` проходит.
4. Чистое окружение: AdGuard/VPN/content blockers отключены.
5. `npm run audit:ci:urls` проходит для ключевых страниц.
6. `npm run audit:ci:technical` проходит для `404/search`.
7. Перед релизом `npm run audit:ci:strict` проходит.
8. Для Deploy Preview используется свежий `UNLIGHTHOUSE_PREVIEW_URL`.
9. После production-переключения indexable URL имеют `index,follow`.
10. `404/search/alias` остаются `noindex,nofollow`.
11. В reports нет `local.adguard.org`.
12. В reports нет console errors.
13. В reports нет пустых `src`.
14. В reports нет сломанного `imagesrcset`.
15. Украинские и русские страницы проверены.

Если всё это выполнено, аудит можно считать:

```text
10/10
```

## 31. Самый короткий рабочий сценарий

Если нужно просто проверить “всё ли ок после правки”:

```bash
cd /Users/stadnyk/MEGA/Aerocool
npm run build
npm run build:production
cd unlighthouse
npm run check:types
npm run audit:ci:urls
npm run audit:ci:technical
```

Если `audit:ci:urls` падает на SEO из-за `noindex`, сначала проверь:

```text
Netlify все еще в development?
```

Если да, это ожидаемо для финальной SEO-indexability. Для технической проверки можно смотреть остальные категории, но окончательный SEO 100 нужен после production deploy.
