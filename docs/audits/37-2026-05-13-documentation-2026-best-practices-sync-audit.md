# Аудит Синхронизации Документации С Практиками 2026

Дата аудита: 2026-05-13.

Этот документ фиксирует проверку всей проектной документации `Aerocool Ukraine` на актуальность, взаимную согласованность и соответствие лучшим практикам 2026 года для Hugo / Netlify / Tailwind, Google SEO, Core Web Vitals, structured data, e-commerce, multilingual SEO и AI Search readiness.

## 1. Область Проверки

Проверены:

- корневые входные документы: `README.md`, `AGENTS.md`;
- оглавление и маршруты чтения: `docs/01-documentation-map.md`;
- active reference/playbook документы в `docs/content`, `docs/architecture`, `docs/deploy`, `docs/quality`, `docs/seo`;
- исторические audit-снимки в `docs/audits`;
- соответствие документации текущим проектным файлам: `hugo.yaml`, `netlify.toml`, `mise.toml`, `package.json`, `layouts/`, `assets/`, `static/_redirects` и quality workflow.

Исторические audit-файлы не переписывались задним числом. Их даты оставлены как даты фактических проверок; текущий документ является свежим синхронизационным снимком.

## 2. Проверенные Внешние Источники

Официальные источники, с которыми сверены правила:

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Google technical requirements: https://developers.google.com/search/docs/essentials/technical
- Helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google page experience: https://developers.google.com/search/docs/appearance/page-experience
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals
- Structured data general guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Product structured data overview: https://developers.google.com/search/docs/appearance/structured-data/product
- Merchant listing structured data: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Product variants structured data: https://developers.google.com/search/docs/appearance/structured-data/product-variants
- Localized versions / hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google Images SEO best practices: https://developers.google.com/search/docs/appearance/google-images
- Hugo `css.TailwindCSS`: https://gohugo.io/functions/css/tailwindcss/
- Hugo security configuration: https://gohugo.io/configuration/security/
- Hugo security model: https://gohugo.io/about/security/
- Tailwind CSS source detection: https://tailwindcss.com/docs/detecting-classes-in-source-files
- Netlify redirects: https://docs.netlify.com/manage/routing/redirects/redirect-options/
- Netlify custom headers: https://docs.netlify.com/manage/routing/headers/
- Netlify caching: https://docs.netlify.com/build/caching/caching-overview/

## 3. Текущее Состояние Проекта

| Область | Текущее Состояние | Статус |
|---|---|---|
| Hugo | `0.161.0` pinned in `mise.toml` and `netlify.toml` | OK; keep pinned until explicit upgrade task |
| Node | `24` pinned locally and on Netlify | OK |
| Tailwind | Tailwind CSS 4 via npm dependency and Hugo `css.TailwindCSS` | OK |
| Netlify | Build remains `development/noindex` intentionally | OK for pre-production; production gate remains open |
| SEO docs | Google SEO, SSG SEO, content, schema, entity and e-commerce docs exist | OK |
| Core Web Vitals | New standalone CWV guide added and linked | OK |
| Structured data | Local JSON-LD graph docs are strong and conservative | OK with rating/source caveat |
| Multilingual | `uk` default + `/ru/`, page bundles, hreflang/canonical documented | OK |
| Redirects/404 | Netlify `_redirects` and forced `404!` rules documented | OK |
| AI Search | Covered as monitoring/entity layer, not as replacement for classic SEO | OK |

## 4. Замечания

### Исправлено В Этой Синхронизации

- Added standalone Core Web Vitals guide for Hugo / Netlify / Tailwind.
- Linked CWV guide from `README.md`, `AGENTS.md`, `docs/01-documentation-map.md`, PageSpeed workflow and SEO checklists.
- Added this current documentation sync audit to preserve a single 2026-05-13 snapshot.
- Updated active documentation dates and cross-links where files were touched.
- Fixed stale browser-audit references in quality docs.
- Added current-source notes for Google Search Essentials, people-first content, page experience, structured data, product/merchant listing docs, Hugo Node security, Tailwind source detection and Netlify routing/cache/header behavior.

### Намеренно Оставлено Открытым

| Пункт | Почему Открыто | Следующий Шаг |
|---|---|---|
| Netlify production switch | Site intentionally remains `development/noindex` | Switch only after final production approval |
| Search Console field data | Requires production indexing and traffic | Monitor after production |
| Product ratings source | Google rich result risk if rating source is not real/visible | Confirm source or remove/avoid `aggregateRating` |
| ProductGroup | Entities are staged/planned | Add visible variant navigation before confirming |
| AI Search baseline | Needs production index and real prompt monitoring | Start monthly baseline after launch |
| Hugo `0.161.1`+ | Project pins `0.161.0` for reproducibility | Evaluate upgrade separately, do not drift silently |

## 5. Соответствие Лучшим Практикам

### Google SEO

The documentation is aligned with 2026 Google guidance:

- no guarantee of crawl/index/rank, even when requirements are met;
- people-first content over search-engine-first content;
- no fixed Google word-count requirement;
- Search Essentials and technical accessibility remain the baseline;
- page experience and CWV matter, but are not a single magic ranking switch;
- Search Console monitoring is required after production.

### Структурированные Данные

The documentation is aligned with current Google structured data guidance:

- JSON-LD is the preferred local implementation format;
- structured data must represent visible page content;
- hidden or misleading product/rating/review facts remain a risk;
- Product/Offer/merchant facts must stay synchronized with front matter, visible product content and `/faq/`;
- Product variants should wait for visible variant navigation and stable ProductGroup entities.

### Core Web Vitals

The current CWV layer is aligned with 2026 metrics:

- primary metrics: `LCP`, `INP`, `CLS`;
- `FID` is not treated as a current core target;
- Search Console and PageSpeed field data are separated from immediate lab/browser diagnostics;
- image, CSS, JS, font and TTFB risks are documented for the current Hugo/Netlify implementation.

### Hugo / Tailwind

The documentation is aligned with Hugo 0.161-era behavior:

- Tailwind remains an npm dependency;
- standalone Tailwind CLI is not used as project workflow;
- Hugo `css.TailwindCSS` and `hugo_stats.json` are the project path;
- Tailwind classes should remain statically discoverable;
- Node permission model is treated as part of the build contract.

### Netlify

The documentation is aligned with Netlify behavior:

- `_redirects` and `netlify.toml` responsibilities are separated;
- forced `404!` is reserved for scanner/sensitive URL handling;
- no broad `/* -> /404.html 404` fallback is used;
- header and cache rules are documented as deploy-level behavior that must be verified on Deploy Preview or production.

## 6. Рекомендуемый Порядок Чтения После Этой Синхронизации

For a new contributor:

1. [README.md](/Users/stadnyk/MEGA/Aerocool/README.md)
2. [docs/01-documentation-map.md](/Users/stadnyk/MEGA/Aerocool/docs/01-documentation-map.md)
3. [docs/content/05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md)
4. [docs/architecture/03-hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/03-hugo-template-helpers.md)
5. [docs/quality/13-pagespeed-insights-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-pagespeed-insights-audit.md)

For SEO/schema work:

1. [docs/content/07-content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/07-content-seo-checklist-2026.md)
2. [docs/seo/27-google-seo-audit-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/27-google-seo-audit-checklist-2026.md)
3. [docs/seo/19-schema-types-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/19-schema-types-reference.md)
4. [docs/seo/20-schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/20-schema-markup-quality-checklist-2026.md)
5. [docs/seo/21-ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/21-ecommerce-structured-data-playbook-2026.md)

For performance/CWV work:

1. [docs/quality/12-core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/12-core-web-vitals-guide-2026.md)
2. [docs/quality/13-pagespeed-insights-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-pagespeed-insights-audit.md)
3. [docs/quality/12-core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/12-core-web-vitals-guide-2026.md)
4. [docs/content/06-seo-image-shortcode.md](/Users/stadnyk/MEGA/Aerocool/docs/content/06-seo-image-shortcode.md)

## 7. Итоговая Оценка

Documentation state after this sync:

```text
Project documentation: 9.5 / 10
```

The remaining `0.5` is not a documentation gap. It is the pre-production boundary:

- production mode is not enabled yet;
- Search Console field data cannot be finalized yet;
- rich result eligibility must be rechecked on production URLs;
- rating/review source still needs a business decision.

Текущий вывод:

> The documentation is current for May 13, 2026 and aligned with 2026 best practices for a Hugo / Netlify / Tailwind static SEO site. The next decisive step is not more documentation, but the controlled production switch and post-launch Search Console / PageSpeed / rich results monitoring.
