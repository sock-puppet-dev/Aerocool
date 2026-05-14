# Документация Aerocool

Обновлено: 2026-05-15.

Это оглавление всей проектной документации. В корне репозитория остались только два входных документа:

- [README.md](/Users/stadnyk/MEGA/Aerocool/README.md) — короткая карта проекта.
- [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md) — правила работы для Codex/агентов.

Все подробные гайды, чеклисты, шаблоны и аудиты лежат здесь, в `docs/`.

## Стандарт Документации

Вся документация проекта должна быть написана на русском языке и быть понятной новичку.

Базовые правила:

- заголовки и поясняющий текст пишутся по-русски;
- английские слова оставляем только для названий технологий, файлов, команд, полей и официальных терминов;
- у длинного документа должен быть понятный вход: зачем он нужен, как им пользоваться и что проверять после правок;
- новые документы обязательно добавляются в это оглавление;
- подробные правила стиля описаны в [architecture/documentation-style-guide.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/documentation-style-guide.md).

## Правило Имен Файлов

Имена файлов документации должны быть короткими, но понятными без открытия файла:

- использовать английский `kebab-case`, без пробелов и случайных заглавных букв;
- не начинать новые файлы с `GUIDE to ...`, потому что назначение должно быть видно из темы файла;
- справочники называть через `*-reference.md`;
- шаблоны называть через `*-template.md`;
- чеклисты называть через `*-checklist-2026.md` или другой актуальный год;
- аудиты-снимки называть через дату в начале: `YYYY-MM-DD-topic-audit.md`;
- если документ описывает инструмент и сценарий проверки, в имени должны быть оба смысла: например `unlighthouse-site-audit.md`.

## Быстрый Старт

Если ты новичок в проекте, читай в таком порядке:

1. [README.md](/Users/stadnyk/MEGA/Aerocool/README.md)
2. [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md)
3. [content/front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/front-matter-reference.md)
4. [architecture/hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/hugo-template-helpers.md)
5. [quality/unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/unlighthouse-site-audit.md)

Этого достаточно, чтобы понять структуру проекта, правила контента, шаблонный слой и базовые проверки качества.

## Маршруты Чтения

Для контентной правки:

1. [content/front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/front-matter-reference.md)
2. [content/content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/content-seo-checklist-2026.md)
3. соответствующий шаблон из `content/templates/`

Для schema.org или rich results:

1. [seo/schema-types-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/schema-types-reference.md)
2. [seo/schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/schema-markup-quality-checklist-2026.md)
3. [seo/json-ld-graph-audit-roadmap-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/json-ld-graph-audit-roadmap-2026.md)
4. [seo/ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ecommerce-structured-data-playbook-2026.md), если задача касается каталога или товаров

Для AI Search и entity SEO:

1. [seo/ai-search-entity-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ai-search-entity-map-2026.md)
2. [seo/entities-knowledge-graph-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entities-knowledge-graph-playbook-2026.md)
3. [seo/entity-registry-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entity-registry-2026.md)
4. [seo/seo-keyword-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/seo-keyword-map-2026.md)
5. [audits/2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-07-documentation-refresh-and-project-action-plan.md), если нужен порядок внедрения

Для Core Web Vitals и performance:

1. [quality/core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/core-web-vitals-guide-2026.md)
2. [quality/unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/unlighthouse-site-audit.md)
3. [quality/lighthouse-single-page-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/lighthouse-single-page-audit.md)
4. [content/seo-image-shortcode.md](/Users/stadnyk/MEGA/Aerocool/docs/content/seo-image-shortcode.md), если задача касается изображений

## Архитектура

- [architecture/documentation-style-guide.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/documentation-style-guide.md) — единый стиль документации: русский язык, структура, пояснения для новичка и правила обновления.
- [architecture/hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/hugo-template-helpers.md) — локальные Hugo partials/helpers, SEO helpers и schema helpers.
- [architecture/browser-view-transitions.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/browser-view-transitions.md) — View Transitions и внешний `assets/js/site.js`.

## Контент

- [content/front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/front-matter-reference.md) — все front matter поля для страниц.
- [content/seo-image-shortcode.md](/Users/stadnyk/MEGA/Aerocool/docs/content/seo-image-shortcode.md) — shortcode `seo-image`.
- [content/content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/content-seo-checklist-2026.md) — редакционный SEO-чеклист.

Шаблоны новых материалов:

- [content/templates/article-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/article-template.md)
- [content/templates/news-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/news-template.md)
- [content/templates/product-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/product-template.md)
- [content/templates/series-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/series-template.md)

## SEO

- [seo/seo-keyword-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/seo-keyword-map-2026.md) — карта ключевых слов.
- [seo/schema-types-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/schema-types-reference.md) — поле `schema_types`.
- [seo/ai-search-entity-map-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ai-search-entity-map-2026.md) — карта сущностей, AI Search-аудит и prompt-наборы.
- [seo/entity-registry-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entity-registry-2026.md) — реестр сущностей, entity home, `@id`, статусы и управляемые связи.
- [seo/entity-registry-beginner-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entity-registry-beginner-guide-2026.md) — гайд для новичка по Entity Registry и entity-полям front matter.
- [seo/entities-knowledge-graph-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entities-knowledge-graph-playbook-2026.md) — правила entities, `@id`, semantic triples и knowledge graph.
- [seo/schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/schema-markup-quality-checklist-2026.md) — QA-чеклист schema.org-графа.
- [seo/ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ecommerce-structured-data-playbook-2026.md) — правила e-commerce structured data для каталога.
- [seo/json-ld-graph-audit-roadmap-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/json-ld-graph-audit-roadmap-2026.md) — аудит и roadmap JSON-LD graph.
- [seo/google-seo-audit-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/google-seo-audit-checklist-2026.md) — полный SEO-аудит для сильного ранжирования в Google.
- [seo/ssg-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ssg-seo-checklist-2026.md) — общий SSG SEO-чеклист.

## Качество

- [quality/core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/core-web-vitals-guide-2026.md) — полный Core Web Vitals playbook для Hugo/Netlify/Tailwind сайта.
- [quality/lighthouse-single-page-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/lighthouse-single-page-audit.md) — одиночный Lighthouse-аудит.
- [quality/unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/unlighthouse-site-audit.md) — массовый Unlighthouse-аудит.

## Деплой

- [deploy/local-tooling-mise.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/local-tooling-mise.md) — локальные версии Hugo/Node через `mise`.
- [deploy/netlify-routing.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/netlify-routing.md) — Netlify `_redirects`, forced 404 и служебная 404-страница.

## Аудиты

- [audits/2026-04-29-hugo-0-161-compliance-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-04-29-hugo-0-161-compliance-audit.md) — аудит совместимости с Hugo 0.161.0.
- [audits/2026-04-29-google-rich-results-quality-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-04-29-google-rich-results-quality-audit.md) — аудит Google rich results качества.
- [audits/2026-05-06-content-depth-literary-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-06-content-depth-literary-audit.md) — аудит глубины, целевых объемов и литературной обработки `content/`.
- [audits/2026-05-06-schemaapp-pdf-documentation-integration-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-06-schemaapp-pdf-documentation-integration-audit.md) — интеграция выводов из SchemaApp PDF в локальную документацию.
- [audits/2026-05-06-project-readiness-assessment.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-06-project-readiness-assessment.md) — итоговая оценка готовности проекта после обновления документации и аудита.
- [audits/2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-07-documentation-refresh-and-project-action-plan.md) — актуальный P0/P1/P2/P3 план действий для production, schema, entities и AI Search.
- [audits/2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md) — corpus-анализ 126 статей SchemaApp за 2016-2026.
- [audits/2026-05-13-content-image-cover-alt-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-13-content-image-cover-alt-audit.md) — аудит `image`, `cover`, `cover.alt`, markdown H1, inline-code и content image consistency.
- [audits/2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-13-documentation-2026-best-practices-sync-audit.md) — базовая синхронизация документации с лучшими практиками 2026.
- [audits/2026-05-14-seo-image-documentation-cleanup.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-14-seo-image-documentation-cleanup.md) — очистка устаревшей информации по `seo-image`, LCP preload, `sizes`, AVIF, WebP и SEO-обещаниям.
- [audits/2026-05-15-documentation-full-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-15-documentation-full-audit.md) — полный аудит документационного слоя, перекрестных ссылок, entity URL, оглавлений и открытых production-gate рисков.

## Правило Поддержки

Если меняется код, который описан в документации, документацию нужно обновлять в том же изменении.

Примеры:

- поменял `layouts/_partials/head.html` — проверь `architecture/hugo-template-helpers.md`;
- поменял front matter поля — проверь `content/front-matter-reference.md`;
- поменял `seo-image` — проверь `content/seo-image-shortcode.md`;
- поменял schema.org partials — проверь `seo/schema-types-reference.md`, `seo/schema-markup-quality-checklist-2026.md` и `seo/json-ld-graph-audit-roadmap-2026.md`;
- поменял product schema, варианты, rating, delivery или return policy — проверь `content/front-matter-reference.md`, `seo/ecommerce-structured-data-playbook-2026.md`, product front matter, видимый товарный текст и `/faq/` как policy-зеркало;
- поменял entity strategy, `about`, `mentions`, `sameAs` или `@id` — проверь `seo/entities-knowledge-graph-playbook-2026.md` и `seo/ai-search-entity-map-2026.md`;
- поменял hero, изображения первого экрана, CSS, JS или performance-sensitive layout — проверь `quality/core-web-vitals-guide-2026.md`;
- поменял Unlighthouse конфиг — проверь `quality/unlighthouse-site-audit.md`;
- поменял версии Hugo/Node — проверь `deploy/local-tooling-mise.md`, `README.md` и `netlify.toml`;
- поменял `static/_redirects`, `layouts/404.html` или routing/headers в `netlify.toml` — проверь `deploy/netlify-routing.md`, `README.md` и `AGENTS.md`.
