# Документация Aerocool

Обновлено: 2026-05-31.

Этот файл — главная карта всей документации проекта. Его задача простая: показать новичку, что читать сначала, что читать потом и какие документы нужны только для профильных задач.

Корневые файлы остаются со стандартными именами и не получают цифровой префикс:

- [README.md](/Users/stadnyk/MEGA/Aerocool/README.md) — краткая карта проекта, стека, структуры и основных команд.
- [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md) — правила безопасной работы для Codex/агентов.

Все файлы внутри `docs/` пронумерованы глобально от `01` до `58`. Номер в начале имени показывает рекомендуемый порядок чтения.

## Как Пользоваться Новичку

Если ты впервые открыл проект, не читай все сразу. Начни с базового маршрута:

1. [README.md](/Users/stadnyk/MEGA/Aerocool/README.md)
2. [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md)
3. [docs/01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md)
4. [docs/architecture/02-documentation-style-guide.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/02-documentation-style-guide.md)
5. [docs/architecture/03-hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/03-hugo-template-helpers.md)
6. [docs/content/05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md)
7. [docs/quality/13-unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-unlighthouse-site-audit.md)

Этого достаточно, чтобы понять структуру сайта, правила правки контента, шаблонный слой и базовую проверку качества.

## Правило Нумерации

Внутри `docs/` используется единая глобальная нумерация:

- `01-...` — главный вход в документацию;
- `02-04` — архитектура и шаблонный слой;
- `05-11` — контент, front matter, изображения и шаблоны материалов;
- `12-14` — качество, Core Web Vitals, Lighthouse и Unlighthouse;
- `15-17` — локальные инструменты, Netlify routing и Netlify Database reviews;
- `18-28` — SEO, schema.org, entity registry и structured data;
- `29-50` — исторические и текущие audit-снимки до UI-карты;
- `51` — прикладная карта UI/UX-внедрения;
- `52+` — новые audit-снимки, SEO-базы и последующие проектные документы.

Для новых файлов выбирать следующий свободный номер и сразу обновлять эту карту, `README.md`, `AGENTS.md` и все локальные ссылки.

## Полная Последовательность Чтения

### База Проекта

1. [01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md) — эта карта документации и полный порядок чтения.

### Архитектура

2. [architecture/02-documentation-style-guide.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/02-documentation-style-guide.md) — правила языка, структуры, обновления и проверки документации.
3. [architecture/03-hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/03-hugo-template-helpers.md) — локальные Hugo partials/helpers, SEO helpers и schema helpers.
4. [architecture/04-browser-view-transitions.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/04-browser-view-transitions.md) — View Transitions и внешний `assets/js/site.js`.

### Контент

5. [content/05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md) — все front matter поля для страниц.
6. [content/06-seo-image-shortcode.md](/Users/stadnyk/MEGA/Aerocool/docs/content/06-seo-image-shortcode.md) — shortcode `seo-image` и правила изображений.
7. [content/07-content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/07-content-seo-checklist-2026.md) — редакционный SEO-чеклист для контентных правок.
8. [content/templates/08-article-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/08-article-template.md) — шаблон новой статьи.
9. [content/templates/09-news-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/09-news-template.md) — шаблон новости.
10. [content/templates/10-product-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/10-product-template.md) — шаблон товарной страницы.
11. [content/templates/11-series-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/11-series-template.md) — шаблон страницы серии.

### Качество

12. [quality/12-core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/12-core-web-vitals-guide-2026.md) — полный Core Web Vitals playbook для Hugo/Netlify/Tailwind сайта.
13. [quality/13-unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-unlighthouse-site-audit.md) — массовый Unlighthouse-аудит.
14. [quality/14-lighthouse-single-page-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/14-lighthouse-single-page-audit.md) — одиночный Lighthouse-аудит одной страницы.

### Деплой И Инфраструктура

15. [deploy/15-local-tooling-mise.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/15-local-tooling-mise.md) — локальные версии Hugo/Node через `mise`.
16. [deploy/16-netlify-routing.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/16-netlify-routing.md) — Netlify `_redirects`, forced 404 и служебная 404-страница.
17. [deploy/17-netlify-database-reviews.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/17-netlify-database-reviews.md) — Netlify Database, Direct SQL, миграции, Functions, branch `dev` и SEO-first pipeline для отзывов.

### SEO, Schema.org И Сущности

18. [seo/18-seo-keyword-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/18-seo-keyword-map-2026.md) — карта ключевых слов и коммерческих интентов.
19. [seo/19-schema-types-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/19-schema-types-reference.md) — поле `schema_types` и соответствие типов страниц schema.org-разметке.
20. [seo/20-schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/20-schema-markup-quality-checklist-2026.md) — QA-чеклист schema.org-графа.
21. [seo/21-ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/21-ecommerce-structured-data-playbook-2026.md) — Product/Offer/rating/variant/images policy для каталога.
22. [seo/22-entity-registry-beginner-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/22-entity-registry-beginner-guide-2026.md) — объяснение Entity Registry для новичка.
23. [seo/23-entity-registry-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/23-entity-registry-2026.md) — реестр сущностей, entity home, `@id`, статусы и управляемые связи.
24. [seo/24-entities-knowledge-graph-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/24-entities-knowledge-graph-playbook-2026.md) — правила entities, semantic triples и knowledge graph.
25. [seo/25-ai-search-entity-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/25-ai-search-entity-map-2026.md) — AI Search-аудит, prompt matrix, entity map и agentic readiness.
26. [seo/26-json-ld-graph-audit-roadmap-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/26-json-ld-graph-audit-roadmap-2026.md) — аудит и roadmap JSON-LD graph.
27. [seo/27-google-seo-audit-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/27-google-seo-audit-checklist-2026.md) — полный SEO-аудит для сильного ранжирования в Google.
28. [seo/28-ssg-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/28-ssg-seo-checklist-2026.md) — общий SSG SEO-чеклист.

### Аудиты

Аудиты читать после базовых документов. Они фиксируют историю решений и текущие риски.

29. [audits/29-2026-04-29-hugo-0-161-compliance-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/29-2026-04-29-hugo-0-161-compliance-audit.md) — аудит совместимости с Hugo 0.161.0.
30. [audits/30-2026-04-29-google-rich-results-quality-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/30-2026-04-29-google-rich-results-quality-audit.md) — аудит Google rich results качества.
31. [audits/31-2026-05-06-content-depth-literary-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/31-2026-05-06-content-depth-literary-audit.md) — аудит глубины и литературной обработки `content/`.
32. [audits/32-2026-05-06-schemaapp-pdf-documentation-integration-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/32-2026-05-06-schemaapp-pdf-documentation-integration-audit.md) — интеграция выводов из SchemaApp PDF.
33. [audits/33-2026-05-06-project-readiness-assessment.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/33-2026-05-06-project-readiness-assessment.md) — оценка готовности проекта после обновления документации и аудита.
34. [audits/34-2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/34-2026-05-07-documentation-refresh-and-project-action-plan.md) — актуальный P0/P1/P2/P3 план действий.
35. [audits/35-2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/35-2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md) — corpus-анализ статей SchemaApp за 2016-2026.
36. [audits/36-2026-05-13-content-image-cover-alt-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/36-2026-05-13-content-image-cover-alt-audit.md) — аудит `image`, `cover`, `cover.alt` и content image consistency.
37. [audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md) — синхронизация документации с практиками 2026.
38. [audits/38-2026-05-14-seo-image-documentation-cleanup.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/38-2026-05-14-seo-image-documentation-cleanup.md) — очистка документации по `seo-image`.
39. [audits/39-2026-05-15-documentation-full-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/39-2026-05-15-documentation-full-audit.md) — полный аудит документационного слоя.
40. [audits/40-2026-05-17-documentation-current-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/40-2026-05-17-documentation-current-audit.md) — текущий аудит документации на 2026-05-17.
41. [audits/41-2026-05-17-core-web-vitals-project-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/41-2026-05-17-core-web-vitals-project-audit.md) — Core Web Vitals аудит проекта.
42. [audits/42-2026-05-17-schemaapp-support-knowledge-base-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/42-2026-05-17-schemaapp-support-knowledge-base-audit.md) — аудит support-статей Schema App.
43. [audits/43-2026-05-17-json-ld-entity-full-audit-after-schemaapp-support.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/43-2026-05-17-json-ld-entity-full-audit-after-schemaapp-support.md) — контрольный аудит JSON-LD после support-данных Schema App.
44. [audits/44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md) — анализ PDF Schema App про connected schema и Agentic Web.
45. [audits/45-2026-05-17-json-ld-entity-full-audit-after-schemaapp-pdf-data.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/45-2026-05-17-json-ld-entity-full-audit-after-schemaapp-pdf-data.md) — контрольный аудит после PDF Schema App.
46. [audits/46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md) — анализ Schema App customer stories/case studies.
47. [audits/47-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/47-2026-05-18-json-ld-entity-full-audit-after-customer-stories.md) — контрольный JSON-LD/entity audit после customer stories.
48. [audits/48-2026-05-18-documentation-current-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/48-2026-05-18-documentation-current-audit.md) — аудит всей документации на 2026-05-18.
49. [audits/49-2026-05-19-documentation-current-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/49-2026-05-19-documentation-current-audit.md) — текущий аудит всей документации на 2026-05-19.
50. [audits/50-2026-05-19-visible-page-meta-policy-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/50-2026-05-19-visible-page-meta-policy-audit.md) — аудит новой политики видимой meta-строки страниц.

### UI/UX Карты

51. [architecture/51-tailwind-plus-ui-section-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/51-tailwind-plus-ui-section-map-2026.md) — карта внедрения Tailwind Plus UI-секций для главной, каталога, серий, товаров, FAQ, контактов, форм и footer.

### Свежие Аудиты После UI/UX Карты

52. [audits/52-2026-05-20-json-ld-entity-full-audit-current.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/52-2026-05-20-json-ld-entity-full-audit-current.md) — свежий полный аудит JSON-LD, Entity Registry, Product graph, breadcrumbs, ratings/reviews, ProductGroup и актуальных P0/P1/P2/P3 задач на 2026-05-20.

### SEO Базы После Аудитов

53. [seo/53-keyword-database-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/53-keyword-database-2026.md) — рабочая база ключевых слов проекта и ссылка на CSV-файл для аналитики, развития контента и проверки каннибализации.

### Актуальные CWV Аудиты

54. [audits/54-2026-05-26-core-web-vitals-current-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/54-2026-05-26-core-web-vitals-current-audit.md) — актуальный аудит Core Web Vitals проекта и CWV-документации на 2026-05-26.

### Актуальные Schema/Entity Аудиты

55. [audits/55-2026-05-26-schema-entity-full-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/55-2026-05-26-schema-entity-full-audit.md) — полный аудит schema/entity-слоя, Entity Registry, всех сущностей, Product graph, connected schema, ratings/reviews governance и списка проблем на 2026-05-26.

### Актуальные Hugo Аудиты

56. [audits/56-2026-05-26-hugo-0-162-compliance-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/56-2026-05-26-hugo-0-162-compliance-audit.md) — аудит перехода проекта на Hugo 0.162.0, обновленных pins, сборки и deprecated language API cleanup.

### Текущие Schema/Entity Аудиты

57. [audits/57-2026-05-31-schema-entity-full-audit-current.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/57-2026-05-31-schema-entity-full-audit-current.md) — актуальный полный schema/entity-аудит на 2026-05-31: rendered JSON-LD, Entity Registry, все сущности, Product graph, ProductGroup, reviews pipeline, connected schema и текущий список проблем.

### Операционные SEO/Schema Регламенты

58. [seo/58-product-facts-maintenance-process-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/58-product-facts-maintenance-process-2026.md) — регламент поддержки product facts: роли команды Aerocool Украина, порядок обновления front matter, HTML, JSON-LD, `/faq/`, Entity Registry и post-deploy QA.

## Маршруты По Задачам

Для контентной правки читать:

1. [content/05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md)
2. [content/07-content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/07-content-seo-checklist-2026.md)
3. нужный шаблон из `content/templates/`

Для schema.org или rich results читать:

1. [seo/19-schema-types-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/19-schema-types-reference.md)
2. [seo/20-schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/20-schema-markup-quality-checklist-2026.md)
3. [seo/26-json-ld-graph-audit-roadmap-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/26-json-ld-graph-audit-roadmap-2026.md)
4. [seo/21-ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/21-ecommerce-structured-data-playbook-2026.md), если задача касается каталога или товаров
5. [deploy/17-netlify-database-reviews.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/17-netlify-database-reviews.md), если задача касается отзывов, рейтингов или `AggregateRating`
6. [seo/58-product-facts-maintenance-process-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/58-product-facts-maintenance-process-2026.md), если задача касается цены, наличия, гарантии, доставки, возврата, оплаты, `priceValidUntil`, цвета или характеристик товара
7. [audits/57-2026-05-31-schema-entity-full-audit-current.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/57-2026-05-31-schema-entity-full-audit-current.md), если нужен актуальный список проблем и текущая оценка schema/entity-состояния

Для AI Search и entity SEO читать:

1. [seo/22-entity-registry-beginner-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/22-entity-registry-beginner-guide-2026.md)
2. [seo/23-entity-registry-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/23-entity-registry-2026.md)
3. [seo/24-entities-knowledge-graph-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/24-entities-knowledge-graph-playbook-2026.md)
4. [seo/25-ai-search-entity-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/25-ai-search-entity-map-2026.md)
5. [audits/57-2026-05-31-schema-entity-full-audit-current.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/57-2026-05-31-schema-entity-full-audit-current.md)

Для SEO-ключей, семантики и планирования новых посадочных страниц читать:

1. [seo/18-seo-keyword-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/18-seo-keyword-map-2026.md)
2. [seo/53-keyword-database-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/53-keyword-database-2026.md)
3. [content/07-content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/07-content-seo-checklist-2026.md)

Для performance/Core Web Vitals читать:

1. [quality/12-core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/12-core-web-vitals-guide-2026.md)
2. [quality/13-unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-unlighthouse-site-audit.md)
3. [quality/14-lighthouse-single-page-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/14-lighthouse-single-page-audit.md)
4. [audits/54-2026-05-26-core-web-vitals-current-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/54-2026-05-26-core-web-vitals-current-audit.md)

Для UI-блоков, Tailwind Plus и визуальной структуры страниц читать:

1. [architecture/51-tailwind-plus-ui-section-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/51-tailwind-plus-ui-section-map-2026.md)
2. [architecture/03-hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/03-hugo-template-helpers.md)
3. [content/07-content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/07-content-seo-checklist-2026.md)

## Правило Поддержки

Если меняется код, который описан в документации, документацию нужно обновлять в том же изменении.

Примеры:

- поменял `layouts/_partials/head.html` — проверь [architecture/03-hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/03-hugo-template-helpers.md);
- поменял front matter поля — проверь [content/05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md);
- поменял видимую meta-строку, `post_meta`, `translation-list`, `single`, `faq/single`, `list` или `search` — проверь [architecture/03-hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/03-hugo-template-helpers.md), [content/05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md), [content/07-content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/07-content-seo-checklist-2026.md) и [seo/19-schema-types-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/19-schema-types-reference.md);
- поменял `seo-image` — проверь [content/06-seo-image-shortcode.md](/Users/stadnyk/MEGA/Aerocool/docs/content/06-seo-image-shortcode.md);
- поменял schema.org partials — проверь [seo/19-schema-types-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/19-schema-types-reference.md), [seo/20-schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/20-schema-markup-quality-checklist-2026.md), [seo/26-json-ld-graph-audit-roadmap-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/26-json-ld-graph-audit-roadmap-2026.md) и [audits/57-2026-05-31-schema-entity-full-audit-current.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/57-2026-05-31-schema-entity-full-audit-current.md);
- поменял product facts, товарный front matter, цвет, характеристики, гарантию, доставку, возврат, оплату или `priceValidUntil` — проверь [seo/58-product-facts-maintenance-process-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/58-product-facts-maintenance-process-2026.md), [content/05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md), [seo/21-ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/21-ecommerce-structured-data-playbook-2026.md) и [audits/57-2026-05-31-schema-entity-full-audit-current.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/57-2026-05-31-schema-entity-full-audit-current.md);
- поменял review-систему, Netlify Database migrations, `review_target_id`, moderation flow или build-time export отзывов — проверь [deploy/17-netlify-database-reviews.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/17-netlify-database-reviews.md), [content/05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md), [seo/21-ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/21-ecommerce-structured-data-playbook-2026.md) и [seo/20-schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/20-schema-markup-quality-checklist-2026.md);
- поменял entity strategy, `about`, `mentions`, `sameAs` или `@id` — проверь [seo/24-entities-knowledge-graph-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/24-entities-knowledge-graph-playbook-2026.md), [seo/25-ai-search-entity-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/25-ai-search-entity-map-2026.md) и [audits/57-2026-05-31-schema-entity-full-audit-current.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/57-2026-05-31-schema-entity-full-audit-current.md);
- поменял hero, изображения первого экрана, CSS, JS или performance-sensitive layout — проверь [quality/12-core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/12-core-web-vitals-guide-2026.md);
- поменял Unlighthouse конфиг — проверь [quality/13-unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-unlighthouse-site-audit.md);
- поменял версии Hugo/Node — проверь [deploy/15-local-tooling-mise.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/15-local-tooling-mise.md), [README.md](/Users/stadnyk/MEGA/Aerocool/README.md) и `netlify.toml`;
- поменял `static/_redirects`, `layouts/404.html` или routing/headers в `netlify.toml` — проверь [deploy/16-netlify-routing.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/16-netlify-routing.md), [README.md](/Users/stadnyk/MEGA/Aerocool/README.md) и [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md).
