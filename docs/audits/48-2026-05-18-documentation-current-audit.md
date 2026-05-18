# Текущий Аудит Документации 2026-05-18

Дата аудита: 2026-05-18.

Этот audit-снимок фиксирует актуальное состояние документации проекта `Aerocool Ukraine` после добавления новых материалов `2026-05-18`, обновления порядка чтения `01-48` и контрольного JSON-LD/entity graph аудита.

## 1. Область Проверки

Проверены:

- [README.md](/Users/stadnyk/MEGA/Aerocool/README.md);
- [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md);
- [docs/01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md);
- все документы внутри `docs/`;
- все audit-снимки внутри `docs/audits/`;
- соответствие [03-hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/03-hugo-template-helpers.md) текущим файлам `layouts/`;
- соответствие review/rating документации текущему `Netlify Database` и Google Review Snippet подходу;
- открытые project gates: `development/noindex`, `AggregateRating`, `ProductGroup`, production monitoring.

## 2. Проверенные Официальные Источники

Использованы первичные источники:

- Google FAQ structured data: `https://developers.google.com/search/docs/appearance/structured-data/faqpage`
- Google Product Snippet structured data: `https://developers.google.com/search/docs/appearance/structured-data/product-snippet`
- Google Review Snippet structured data: `https://developers.google.com/search/docs/appearance/structured-data/review-snippet`
- Hugo `css.TailwindCSS`: `https://gohugo.io/functions/css/tailwindcss/`
- Netlify Database CLI: `https://docs.netlify.com/build/data-and-storage/netlify-database/cli/`
- Netlify Database API: `https://docs.netlify.com/build/data-and-storage/netlify-database/api/`
- Netlify build environment variables: `https://docs.netlify.com/build/configure-builds/environment-variables/`
- Tailwind CSS v4.0: `https://tailwindcss.com/blog/tailwindcss-v4`

## 3. Машинные Проверки

Проверено:

- `50` markdown-файлов в `README.md`, `AGENTS.md` и `docs/`;
- `48` markdown-файлов внутри `docs/`;
- `20` audit-файлов внутри `docs/audits/`;
- `55` layout-файлов внутри `layouts/`;
- `76` content markdown-файлов внутри `content/`.

Контроль:

- все рабочие документы имеют явную дату, кроме шаблонов в `docs/content/templates/`;
- [docs/01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md) перечисляет все документы внутри `docs/` в порядке чтения `01-48`;
- [README.md](/Users/stadnyk/MEGA/Aerocool/README.md) ведет к полной карте документации, а [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md) перечисляет все `48` файлов из `docs/`;
- [03-hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/03-hugo-template-helpers.md) упоминает все `55` текущих layout-файлов;
- служебные англоязычные заголовки вроде `Scope`, `Findings`, `Current Status`, `Implementation Backlog`, `Executive Summary`, `Prioritized Fix Plan` не найдены;
- локальные markdown-ссылки проверены;
- `git diff --check` проходит;
- `npm run build` проходит.

## 4. Что Обновлено В Этом Проходе

### P1. Файлы Документации Получили Порядок Чтения `01-48`

Все файлы внутри `docs/` переименованы с глобальным двухзначным префиксом. Новичок теперь видит порядок чтения прямо в имени файла:

- `01` — карта документации;
- `02-04` — архитектура;
- `05-11` — контент;
- `12-14` — качество;
- `15-17` — деплой и инфраструктура;
- `18-28` — SEO/schema/entity слой;
- `29-48` — audit-снимки.

[docs/01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md) стал главным источником порядка чтения и описывает назначение каждого файла.

### P1. Новые Audit-Снимки 2026-05-18 Добавлены В Главные Карты

В [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md) и [docs/01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md) добавлены:

- [46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md);
- [47-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/47-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md);
- этот текущий documentation audit.

### P2. Даты В Новых Audit-Файлах Приведены К Стандарту

В новых audit-файлах дата была оформлена в обратных кавычках. Для единого стандарта она приведена к виду:

```text
Дата аудита: 2026-05-18.
Дата анализа: 2026-05-18.
```

### P2. Документация По Customer Stories Синхронизирована

Активные SEO/entity документы уже ссылаются на новый customer stories audit:

- [25-ai-search-entity-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/25-ai-search-entity-map-2026.md);
- [24-entities-knowledge-graph-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/24-entities-knowledge-graph-playbook-2026.md);
- [20-schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/20-schema-markup-quality-checklist-2026.md);
- [21-ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/21-ecommerce-structured-data-playbook-2026.md).

## 5. Текущий Вывод

На `2026-05-18` документация проекта синхронизирована:

- структура понятна новичку;
- основная документация написана на русском языке;
- новые audit-снимки включены в главные карты;
- внешние правила по Google structured data, Hugo Tailwind pipeline, Netlify Database и Tailwind CSS v4 сверены с официальными источниками;
- открытые риски явно зафиксированы.

Открытые project gates не закрывались в этом проходе:

- `Netlify` все еще собирает сайт в `development/noindex`;
- `AggregateRating` остается риском до перехода на approved reviews snapshot из `Netlify Database`;
- `ProductGroup` остается staged до появления видимой variant navigation;
- production Search Console / rich results / entity baseline возможны только после production-перехода.
