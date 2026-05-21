# Текущий Аудит Документации 2026-05-19

Дата аудита: 2026-05-19.
Актуализировано: 2026-05-21.

Примечание от 2026-05-21: это исторический audit-снимок состояния на 2026-05-19. Текущий порядок документации, актуальные счетчики файлов и последнюю оценку нужно смотреть в [01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md), [52-2026-05-20-json-ld-entity-full-audit-current.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/52-2026-05-20-json-ld-entity-full-audit-current.md) и [53-keyword-database-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/53-keyword-database-2026.md). Числа `01-51`, `51` docs и `76` content-файлов ниже оставлены как значение исторического среза, а не как текущая инструкция.

Этот аудит-снимок фиксирует состояние документации проекта `Aerocool Ukraine` после синхронизации правил `linkTitle`, видимых хлебных крошек, `BreadcrumbList`, политики видимой meta-строки страниц, карты Tailwind Plus UI-секций и обновленной карты чтения `01-51`.

## 1. Область Проверки

Проверены:

- [README.md](/Users/stadnyk/MEGA/Aerocool/README.md);
- [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md);
- [docs/01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md);
- все документы внутри `docs/`;
- все audit-снимки внутри `docs/audits/`;
- соответствие [03-hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/03-hugo-template-helpers.md) текущим файлам `layouts/`;
- соответствие [05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md) текущему front matter полю `linkTitle`;
- синхронизация видимых breadcrumbs и schema.org `BreadcrumbList`;
- открытые project gates: `development/noindex`, `AggregateRating`, `ProductGroup`, production monitoring.

## 2. Проверенные Официальные Источники

Использованы первичные источники:

- Google Product structured data: `https://developers.google.com/search/docs/appearance/structured-data/product-snippet`
- Google Review Snippet structured data: `https://developers.google.com/search/docs/appearance/structured-data/review-snippet`
- Google FAQ structured data: `https://developers.google.com/search/docs/appearance/structured-data/faqpage`
- Hugo `css.TailwindCSS`: `https://gohugo.io/functions/css/tailwindcss/`
- Netlify Database: `https://docs.netlify.com/build/data-and-storage/netlify-database/`
- Netlify Database CLI: `https://docs.netlify.com/build/data-and-storage/netlify-database/cli/`
- Netlify Database API: `https://docs.netlify.com/build/data-and-storage/netlify-database/api/`
- Tailwind CSS v4.0: `https://tailwindcss.com/blog/tailwindcss-v4`

## 3. Машинные Проверки

Проверено:

- `53` markdown-файла в `README.md`, `AGENTS.md` и `docs/`;
- `51` markdown-файл внутри `docs/`;
- `22` audit-файла внутри `docs/audits/`;
- `60` layout-файлов внутри `layouts/`;
- `76` content markdown-файлов внутри `content/`.

Контроль:

- все файлы внутри `docs/` имеют глобальный числовой префикс `01-51`;
- [docs/01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md) перечисляет все документы внутри `docs/` в порядке чтения `01-51`;
- [README.md](/Users/stadnyk/MEGA/Aerocool/README.md) ведет к полной карте документации, а [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md) перечисляет все `51` файлов из `docs/`;
- [03-hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/03-hugo-template-helpers.md) упоминает все `60` текущих layout-файлов;
- локальные markdown-ссылки проверены;
- активные англоязычные служебные заголовки не найдены;
- ссылочные заглушки с троеточием вместо URL не найдены;
- лишние активные `# H1` вне code block не найдены;
- `git diff --check` проходит;
- `npm run build` проходит.

## 4. Что Синхронизировано В Этом Проходе

### P1. Карта Чтения Обновлена До `01-51`

В документацию добавлены документы текущего прохода:

- [49-2026-05-19-documentation-current-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/49-2026-05-19-documentation-current-audit.md).
- [50-2026-05-19-visible-page-meta-policy-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/50-2026-05-19-visible-page-meta-policy-audit.md).
- [51-tailwind-plus-ui-section-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/51-tailwind-plus-ui-section-map-2026.md).

Диапазон audit-документов изменен с `29-48` на `29-50`, а прикладные UI/UX-карты начинаются с `51+`. Главная карта документации, `README.md` и `AGENTS.md` должны вести новичка к актуальному порядку чтения.

### P1. Breadcrumbs И `linkTitle` Сведены В Единое Правило

Текущий шаблонный слой использует:

- [breadcrumb-label.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/breadcrumb-label.html) — единый helper для короткого имени страницы;
- [breadcrumbs.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/breadcrumbs.html) — видимые хлебные крошки;
- [_schema/breadcrumbs.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/breadcrumbs.html) — schema.org `BreadcrumbList`.

Правило для новичка: если `title` длинный и плохо выглядит в навигации, нужно добавить короткий `linkTitle`. Видимые breadcrumbs и `BreadcrumbList` используют один и тот же helper, поэтому HTML и JSON-LD не расходятся по названиям.

### P2. Шаблоны Контента Обновлены Под `linkTitle`

В шаблоны добавлено необязательное поле `linkTitle`, чтобы новые страницы не расходились с [05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md):

- [08-article-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/08-article-template.md);
- [09-news-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/09-news-template.md);
- [10-product-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/10-product-template.md);
- [11-series-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/11-series-template.md).

## 5. Текущий Вывод

На `2026-05-19` документация проекта синхронизирована:

- структура понятна новичку;
- основная документация написана на русском языке;
- порядок чтения обновлен до `01-51`;
- новые правила `linkTitle` и breadcrumbs описаны в справочнике front matter, helper-документации и шаблонах контента;
- внешние правила по Google structured data, Hugo Tailwind pipeline, Netlify Database и Tailwind CSS v4 сверены с официальными источниками;
- открытые риски явно зафиксированы.

Текущая оценка качества документации: `9.7/10`.

Открытые project gates не закрывались в этом проходе:

- `Netlify` все еще собирает сайт в `development/noindex`;
- `AggregateRating` остается риском до перехода на approved reviews snapshot из `Netlify Database`;
- `ProductGroup` остается staged до появления видимой variant navigation;
- production Search Console / rich results / entity baseline возможны только после production-перехода.
