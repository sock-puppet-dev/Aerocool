# Аудит Интеграции PDF-Документации SchemaApp 2026-05-06

Дата аудита: 2026-05-06.

Этот аудит фиксирует, как внешние PDF-материалы SchemaApp были использованы для актуализации документации проекта `Aerocool Ukraine`.

## Что Было Проанализировано

- `Mastering-AI-Search-eBook.pdf`
- `Schema Markup Checklist.pdf`
- `Schema Markup and AI Search.pdf`
- `Designing Content.pdf`
- `How to Prepare Your Content for Generative AI Search.pdf`
- `Guide to E-Commerce SD.pdf`
- `Guide to Entities and Knowledge Graphs for SEO.pdf`
- `Guide to HC SD.pdf`
- `The Schema App.pdf`

## Что Реально Добавлено В Проект

- AI Search как отдельный процесс: prompt-аудит, AI visibility, citations, sentiment, citation ownership, AI referrals и AI crawler traffic.
- Entity strategy: entity home, entity registry, semantic triples, stable `@id`, internal/external entity linking.
- Knowledge graph playbook: как использовать entities и Schema.org не только для rich results, но и для semantic SEO и будущих AI-сценариев.
- Schema QA: type-by-intent, visible-content requirement, nesting, URI, schema drift, vertical-specific запреты, ownership и ROI/metrics.
- E-commerce structured data: Product/Offer/rating/review policy, product image strategy, HowTo policy, ProductGroup для вариантов.
- Контентный процесс: reusable components, semantic writing, coverage of subtopics and follow-up questions.

## Что Не Переносить В Проект

- Не переходить на SchemaApp SaaS без реальной проблемы масштаба, ownership или скорости обновлений.
- Не добавлять healthcare-типы (`MedicalOrganization`, `Physician`, `MedicalWebPage`, `MedicalProcedure`) в Aerocool.
- Не добавлять `Review`, `AggregateRating`, `HowTo`, `VideoObject`, `JobPosting`, `Recipe`, `LocalBusiness` или `OnlineStore` без реального видимого контента и бизнес-основания.
- Не добавлять `sameAs` на внешние источники, если сущность не совпадает точно.
- Не создавать новые front matter поля без поддержки в Hugo templates и обновления `05-front-matter-reference.md`.

## Новые Или Обновленные Документы

- `docs/seo/25-ai-search-entity-map-2026.md`
- `docs/seo/24-entities-knowledge-graph-playbook-2026.md`
- `docs/seo/20-schema-markup-quality-checklist-2026.md`
- `docs/seo/21-ecommerce-structured-data-playbook-2026.md`
- `docs/content/07-content-seo-checklist-2026.md`
- `docs/seo/27-google-seo-audit-checklist-2026.md`
- `docs/seo/26-json-ld-graph-audit-roadmap-2026.md`
- `docs/audits/30-2026-04-29-google-rich-results-quality-audit.md`
- `docs/audits/33-2026-05-06-project-readiness-assessment.md`
- `README.md`
- `AGENTS.md`
- `docs/01-documentation-map.md`

## Итог

Документы SchemaApp не изменили базовую архитектуру проекта: Hugo, local partials, `schema_types`, JSON-LD `@graph`, content bundles и PageSpeed quality workflow остаются правильной основой.

Их главная польза — усиление верхнего стратегического слоя:

- от keywords к entities;
- от валидного JSON-LD к managed knowledge graph;
- от classic SEO к AI Search visibility;
- от одноразовой schema-разметки к ongoing schema QA;
- от отдельных страниц к reusable content components.

Главный практический результат после этой интеграции: product facts source of truth подтвержден как front matter, local organization facts подтверждены бизнесово, entity registry и safe resolver добавлены, а priority pages получили `about_entities`, `mentions_entities` и staged `product_group_id`. Следующий шаг — не добавлять новые schema-типы “для красоты”, а подтвердить источник rating/reviews, сделать visible variant navigation и переводить ProductGroup в JSON-LD только там, где связь видима пользователю.

Актуальный порядок внедрения после повторной ревизии `2026-05-07` зафиксирован в [34-2026-05-07-documentation-refresh-and-project-action-plan.md](34-2026-05-07-documentation-refresh-and-project-action-plan.md).

Отдельная ревизия 126 статей SchemaApp за `2016-2026` хранится в [35-2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md](35-2026-05-07-schemaapp-articles-2016-2026-corpus-analysis.md).
