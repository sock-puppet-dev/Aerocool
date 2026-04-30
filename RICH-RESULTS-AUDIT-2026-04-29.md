# Google Rich Results Quality Audit

Дата аудита: 2026-04-29  
Актуализировано: 2026-04-30
Проект: `Aerocool Ukraine` / Hugo / двуязычный сайт `uk` + `ru`

## Scope

Проверено:

- сборка через `npm run build` в текущем окружении `development`;
- фактический HTML в `public/`, а не только Hugo-шаблоны;
- все `application/ld+json` блоки;
- соответствие основным Google rich result features, которые реально затрагивает проект:
  - Product snippet;
  - Merchant listing;
  - Review snippet / AggregateRating;
  - Breadcrumb;
  - FAQ;
  - Article / NewsArticle;
  - Organization;
  - WebSite / SearchAction;
  - supporting nodes: Brand, ImageObject, WebPage, CollectionPage, AboutPage, ContactPage.

Официальные источники Google:

- General structured data guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Product snippet: https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- Merchant listing: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Review snippet: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- FAQPage: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Article: https://developers.google.com/search/docs/appearance/structured-data/article
- Breadcrumb: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Organization: https://developers.google.com/search/docs/appearance/structured-data/organization
- Sitelinks search box removal: https://developers.google.com/search/blog/2024/10/sitelinks-search-box

## Build Result

Примечание: проект временно собирается с `HUGO_ENVIRONMENT = "development"`, поэтому текущий generated HTML получает `noindex,nofollow`. Rich Results eligibility нужно перепроверить после включения production-режима, когда индексируемые страницы снова будут отдавать `index,follow`.

Команда:

```bash
npm run build
```

Результат:

- Hugo: `v0.161.0`
- Pages: `50` UK, `48` RU
- Paginator pages: `7` UK, `7` RU
- Aliases: `8` UK, `7` RU
- Processed images: `154`
- Build: успешный

## Inventory

Фактически найдено 88 HTML-страниц с JSON-LD.

| Type | Count | Google rich result role |
|---|---:|---|
| `Product` | 24 | Да: Product snippet / Merchant listing |
| `BreadcrumbList` | 76 | Да: Breadcrumb rich result |
| `Article` | 14 | Да, как Article structured data / enhanced understanding |
| `NewsArticle` | 14 | Да, как Article structured data / enhanced understanding |
| `FAQPage` | 2 | Формально да, но eligibility сильно ограничена |
| `Organization` | 172 | Да, organization information / logo / knowledge signals |
| `WebSite` | 86 | Поддерживающая сущность; SearchAction больше не дает sitelinks search box |
| `Brand` | 86 | Поддерживающая сущность |
| `ImageObject` | 174 | Поддерживающая сущность |
| `WebPage` | 84 | Поддерживающая сущность |
| `CollectionPage` | 16 | Не отдельный Google rich result, но полезная семантика |
| `AboutPage` | 2 | Поддерживающая сущность |
| `ContactPage` | 2 | Поддерживающая сущность |

Так как сборка сейчас намеренно идет в `development`, все 88 HTML-страниц с JSON-LD получают `noindex,nofollow`. Это временное состояние проекта. Служебные `search`, `404` и alias-страницы JSON-LD не рендерят.

## Executive Summary

Техническая база хорошая: JSON-LD валиден, граф централизован, обязательные поля основных типов в целом присутствуют. Основная проблема не синтаксис, а quality compliance: часть разметки описывает данные, которые не видны пользователю на странице.

Самые важные риски:

1. Все 24 `Product` nodes содержат `price`, `availability`, `aggregateRating`, `sku`, часто `mpn` и `gtin13`, но эти данные не выводятся видимо на товарных страницах. Это риск по Google quality guidelines: structured data не должна размечать невидимый пользователю контент.
2. Все 24 `aggregateRating` nodes невидимы на странице. Review snippet documentation отдельно говорит, что при `AggregateRating` пользователь должен видеть aggregate rating на странице.
3. Merchant listing eligibility под вопросом, если товар нельзя купить прямо на странице. Сейчас страницы выглядят скорее как каталог/маркетинговые карточки, а не checkout-ready merchant pages.
4. `FAQPage` технически корректен и видим, но Google ограничивает FAQ rich results well-known authoritative government/health сайтами. Для коммерческого сайта это почти нулевая ставка на видимый FAQ rich result.
5. Все `Article` и `NewsArticle` используют одно primary image `1536x1024` с ratio `1.5`. Google рекомендует несколько high-resolution images в ratio `16x9`, `4x3`, `1x1`.
6. `WebSite.SearchAction` больше не дает sitelinks search box: Google удалил этот визуальный элемент с 2024-11-21.
7. `Organization` размечается на каждой странице. Google рекомендует размещать organization information на главной или отдельной странице об организации; это не критично, но можно упростить.

## Rich Result Eligibility By Feature

| Feature | Current state | Eligibility | Quality risk |
|---|---|---|---|
| Product snippet | Есть на 24 товарных URL | Технически близко к eligible | Высокий: price/rating/availability не видны |
| Merchant listing | Есть Offer, shipping, return policy | Условно, если страница реально продает товар | Высокий: нет явного purchase flow, не видны price/availability |
| Review snippet | Есть `aggregateRating` на 24 товарах | Сомнительно | Высокий: rating не виден, источник отзывов не ясен |
| Breadcrumb | 76 nodes, positions/items ok | Хорошая eligible-зона | Низкий |
| FAQ rich result | 2 pages, 33 Q/A видимы | Низкая для коммерческого сайта | Низкий технически, высокий ожиданиями |
| Article | 14 nodes | Хорошая семантика | Средний: image ratios, author inline data |
| NewsArticle | 14 nodes | Хорошая семантика | Средний: image ratios, author inline data |
| Organization | 172 nodes | Поддерживающая eligible-зона | Средний: слишком широко дублируется |
| WebSite/SearchAction | 86 nodes | Не дает sitelinks search box | Низкий |
| CollectionPage | 16 nodes | Не отдельный Google rich result | Низкий |

## Critical Findings

### P1: Product commercial data is not visible

Affected:

- 24/24 `Product` nodes.

Fields affected:

- `offers.price`
- `offers.availability`
- `sku`
- `mpn`
- `gtin13`
- `offers.warranty`
- `aggregateRating`

Template source:

- `layouts/_partials/_schema/product.html`

Why it matters:

Google quality guidelines say structured data should describe visible page content. Product and review examples may be syntactically accepted by Rich Results Test, but hidden or unsupported price/rating data can suppress rich results or create manual-action risk if interpreted as misleading.

Recommended fix:

- Add a visible product facts block to every product page:
  - price in UAH;
  - availability;
  - SKU;
  - MPN / GTIN when available;
  - warranty;
  - delivery/return summary;
  - rating only if real reviews exist and are shown.

### P1: AggregateRating is high risk

Affected:

- 24/24 `Product` nodes.

Why it matters:

Google review snippet documentation says users should be able to see the aggregate rating on the marked-up page. It also recommends ratings come from users and not be aggregated from other websites.

Recommended fix:

- If ratings are real: show rating, count, source, and ideally individual reviews or review summary on the product page.
- If ratings are placeholders/editorial: remove `rating` from front matter and suppress `aggregateRating`.

### P1: Merchant listing promise may exceed page reality

Affected:

- 24/24 product pages.

Current schema includes:

- `Offer`
- `price`
- `priceCurrency`
- `availability`
- `shippingDetails`
- `hasMerchantReturnPolicy`

Risk:

Merchant listing documentation is aimed at product pages where shoppers can purchase products. If these are catalog pages without direct purchase, Google may treat them as weaker product snippets rather than full merchant listings.

Recommended fix:

- Either make product pages merchant-ready with visible price, availability, purchase/contact CTA, delivery/return/payment facts;
- or keep schema conservative and focus on Product snippet rather than full Merchant listing.

### P2: Article/NewsArticle image quality can be improved

Affected:

- 14 `Article` nodes.
- 14 `NewsArticle` nodes.

Current:

- one referenced `ImageObject`;
- dimensions mostly `1536x1024`;
- aspect ratio `1.5`;
- no `16x9`, `4x3`, `1x1` image array.

Recommended fix:

- Generate/serve three article image variants:
  - `1x1`;
  - `4x3`;
  - `16x9`;
- update `Article.image` / `NewsArticle.image` to an array of crawlable absolute URLs or `ImageObject`s.

### P2: Author node is resolved indirectly

Affected:

- 28 article/news nodes.

Current:

- `author` is `{"@id": "https://aerocool.ua/#organization"}`;
- the Organization node exists in the same graph, so this is structurally valid.

Quality improvement:

- Inline author as:

```json
{
  "@type": "Organization",
  "@id": "https://aerocool.ua/#organization",
  "name": "Aerocool Ukraine",
  "url": "https://aerocool.ua/"
}
```

This aligns more closely with Google author markup best practices.

### P2: Organization nodes are duplicated everywhere

Affected:

- 86 pages with local `Organization`;
- 86 pages with global parent `Organization`.

Google recommends placing organization information on the home page or a single page that describes the organization. Current duplication is not a syntax error, but it makes every page heavier and increases the chance of stale organization data being repeated everywhere.

Recommended fix:

- Keep full `Organization` graph on home/about/contact.
- On other pages, reference `publisher` by `@id` only or keep a smaller stable node.

### P3: SearchAction is obsolete as a rich result lever

Affected:

- 86 `WebSite` nodes.

Google removed the sitelinks search box visual element starting 2024-11-21. The `SearchAction` node is not harmful, but it should not be treated as a rich-result opportunity.

## Product Element Audit

Legend:

- `Visible commercial fields`: whether price / availability / rating / SKU-like facts are visible in rendered body text.
- `ID completeness`: MPN + GTIN coverage.

| URL | Lang | Price | ID completeness | Visible commercial fields | Risk |
|---|---|---:|---|---|---|
| `/products/sky/360/` | uk | 12400 | missing MPN, GTIN | no | P1 |
| `/products/sky/lite/` | uk | 8500 | missing MPN, GTIN | no | P1 |
| `/products/wing/loft-air-dark-grey/` | uk | 12000 | ok | no | P1 |
| `/products/wing/loft-air-light-grey/` | uk | 12000 | ok | no | P1 |
| `/products/wing/mesh-black/` | uk | 11000 | ok | no | P1 |
| `/products/wing/racer-black/` | uk | 11500 | ok | no | P1 |
| `/products/wing/racer-dark-grey/` | uk | 11500 | ok | no | P1 |
| `/products/xtal/loft-air-dark-grey/` | uk | 12500 | ok | no | P1 |
| `/products/xtal/loft-air-light-grey/` | uk | 12500 | ok | no | P1 |
| `/products/xtal/mesh-black/` | uk | 12000 | ok | no | P1 |
| `/products/xtal/racer-black/` | uk | 12000 | ok | no | P1 |
| `/products/xtal/racer-dark-grey/` | uk | 12000 | ok | no | P1 |
| `/ru/products/sky/360/` | ru | 12400 | missing MPN, GTIN | no | P1 |
| `/ru/products/sky/lite/` | ru | 8500 | missing MPN, GTIN | no | P1 |
| `/ru/products/wing/loft-air-dark-grey/` | ru | 12000 | ok | no | P1 |
| `/ru/products/wing/loft-air-light-grey/` | ru | 12000 | ok | no | P1 |
| `/ru/products/wing/mesh-black/` | ru | 11000 | ok | no | P1 |
| `/ru/products/wing/racer-black/` | ru | 11500 | ok | no | P1 |
| `/ru/products/wing/racer-dark-grey/` | ru | 11500 | ok | no | P1 |
| `/ru/products/xtal/loft-air-dark-grey/` | ru | 12500 | ok | no | P1 |
| `/ru/products/xtal/loft-air-light-grey/` | ru | 12500 | ok | no | P1 |
| `/ru/products/xtal/mesh-black/` | ru | 12000 | ok | no | P1 |
| `/ru/products/xtal/racer-black/` | ru | 12000 | ok | no | P1 |
| `/ru/products/xtal/racer-dark-grey/` | ru | 12000 | ok | no | P1 |

### Product Node

Current fields:

- `@type`
- `@id`
- `mainEntityOfPage`
- `name`
- `image`
- `description`
- `sku`
- `category`
- `brand`
- `offers`
- optional `mpn`
- optional `gtin13`
- `aggregateRating`

Status:

- Required structure for Product snippet: OK.
- Recommended product identifiers: partial.
- Quality: needs visible facts block.

Improvement:

- Change `brand` from only `{"@id": "https://aerocool.io/#brand"}` to an object that includes `@type` and `name`, or ensure Rich Results Test resolves the referenced Brand cleanly.

### Offer Node

Current fields:

- `price`
- `priceCurrency`
- `priceValidUntil`
- `availability`
- `itemCondition`
- `priceSpecification`
- `seller`
- `shippingDetails`
- `hasMerchantReturnPolicy`
- `acceptedPaymentMethod`
- `areaServed`
- optional `warranty`

Status:

- Required merchant fields: technically strong.
- Quality: price/availability/shipping/returns/payment facts should be visible to users.

Potential issue:

- `shippingRate.value = 0` and `returnFees = FreeReturn` should only be used if shipping and returns are genuinely free in the stated context. If customer pays delivery or return shipping, these values should be changed.

### AggregateRating Node

Current:

- `ratingValue`
- `reviewCount`

Status:

- Structurally valid.
- Quality risk: not visible and no visible review source.

Recommended:

- Display ratings or remove them.

## Article And NewsArticle Audit

All articles/news have:

- `headline`;
- `description`;
- `datePublished`;
- `dateModified`;
- `author`;
- `publisher`;
- `wordCount`;
- `timeRequired`;
- `mainEntityOfPage`;
- `image` reference.

Common warnings:

- single image reference;
- primary image ratio `1.5`, not recommended `1:1`, `4:3`, `16:9`;
- author is referenced by `@id`, not inline with `name` / `url`.

| URL | Type | Words | Image | Published | Modified | Risk |
|---|---|---:|---|---|---|---|
| `/articles/how-to-choose-aerocool-chair/` | Article | 1833 | 1536x1024 | 2026-04-14 | 2026-04-30 | P2 image/author |
| `/articles/how-to-choose-chair-by-adjustability/` | Article | 1789 | 1536x1024 | 2026-04-12 | 2026-04-30 | P2 image/author |
| `/articles/racer-vs-loft-air-vs-mesh/` | Article | 1715 | 1536x1024 | 2026-04-08 | 2026-04-30 | P2 image/author |
| `/articles/sky-lite-vs-sky-360/` | Article | 1772 | 1536x1024 | 2026-04-04 | 2026-04-30 | P2 image/author |
| `/articles/sync4-sync5-mechanism-guide/` | Article | 1997 | 1536x1024 | 2026-04-30 | 2026-04-30 | P2 image/author |
| `/articles/what-is-synchronous-tilt/` | Article | 1722 | 1536x1024 | 2026-04-10 | 2026-04-30 | P2 image/author |
| `/articles/wing-vs-xtal/` | Article | 1705 | 1536x1024 | 2026-04-06 | 2026-04-30 | P2 image/author |
| `/news/loft-air-and-mesh-focus/` | NewsArticle | 805 | 1536x1024 | 2026-04-20 | 2026-04-30 | P2 image/author |
| `/news/sky-360-launch/` | NewsArticle | 843 | 1536x1024 | 2026-04-18 | 2026-04-30 | P2 image/author |
| `/news/sky-lite-launch/` | NewsArticle | 796 | 1536x1024 | 2026-04-19 | 2026-04-30 | P2 image/author |
| `/news/sky-series-launch/` | NewsArticle | 816 | 1536x1024 | 2026-04-15 | 2026-04-30 | P2 image/author |
| `/news/sync4-sync5-mechanism-update/` | NewsArticle | 787 | 1536x1024 | 2026-04-30 | 2026-04-30 | P2 image/author |
| `/news/wing-series-launch/` | NewsArticle | 811 | 1536x1024 | 2026-04-16 | 2026-04-30 | P2 image/author |
| `/news/xtal-series-launch/` | NewsArticle | 789 | 1536x1024 | 2026-04-17 | 2026-04-30 | P2 image/author |
| `/ru/articles/how-to-choose-aerocool-chair/` | Article | 1878 | 1536x1024 | 2026-04-14 | 2026-04-30 | P2 image/author |
| `/ru/articles/how-to-choose-chair-by-adjustability/` | Article | 1787 | 1536x1024 | 2026-04-12 | 2026-04-30 | P2 image/author |
| `/ru/articles/racer-vs-loft-air-vs-mesh/` | Article | 1745 | 1536x1024 | 2026-04-08 | 2026-04-30 | P2 image/author |
| `/ru/articles/sky-lite-vs-sky-360/` | Article | 1786 | 1536x1024 | 2026-04-04 | 2026-04-30 | P2 image/author |
| `/ru/articles/sync4-sync5-mechanism-guide/` | Article | 2023 | 1536x1024 | 2026-04-30 | 2026-04-30 | P2 image/author |
| `/ru/articles/what-is-synchronous-tilt/` | Article | 1726 | 1536x1024 | 2026-04-10 | 2026-04-30 | P2 image/author |
| `/ru/articles/wing-vs-xtal/` | Article | 1716 | 1536x1024 | 2026-04-06 | 2026-04-30 | P2 image/author |
| `/ru/news/loft-air-and-mesh-focus/` | NewsArticle | 809 | 1536x1024 | 2026-04-20 | 2026-04-30 | P2 image/author |
| `/ru/news/sky-360-launch/` | NewsArticle | 816 | 1536x1024 | 2026-04-18 | 2026-04-30 | P2 image/author |
| `/ru/news/sky-lite-launch/` | NewsArticle | 799 | 1536x1024 | 2026-04-19 | 2026-04-30 | P2 image/author |
| `/ru/news/sky-series-launch/` | NewsArticle | 809 | 1536x1024 | 2026-04-15 | 2026-04-30 | P2 image/author |
| `/ru/news/sync4-sync5-mechanism-update/` | NewsArticle | 792 | 1536x1024 | 2026-04-30 | 2026-04-30 | P2 image/author |
| `/ru/news/wing-series-launch/` | NewsArticle | 835 | 1536x1024 | 2026-04-16 | 2026-04-30 | P2 image/author |
| `/ru/news/xtal-series-launch/` | NewsArticle | 804 | 1536x1024 | 2026-04-17 | 2026-04-30 | P2 image/author |

Note:

- Existing local content rules target 10000 characters for evergreen articles and 5000 characters for news. Current word counts are broadly consistent with that direction, but this is content-depth SEO rather than structured-data eligibility.

## Breadcrumb Audit

Current:

- 76 `BreadcrumbList` nodes.
- 0 bad position/item checks.
- All have at least two items.

Status:

- Good.

Recommendation:

- Keep current logic.
- Optionally shorten very long breadcrumb names for search presentation quality, especially section titles.

## FAQ Audit

| URL | Questions | Visible Q/A | Google FAQ rich-result expectation |
|---|---:|---|---|
| `/faq/` | 33 | yes | very low |
| `/ru/faq/` | 33 | yes | very low |

Status:

- Technical: OK.
- Content visibility: OK.
- Rich result: low probability because Google restricts FAQ rich results to well-known authoritative government/health sites.

Recommendation:

- Keep FAQPage if it helps semantic clarity.
- Do not treat FAQPage as a key traffic/rich-result lever.

## CollectionPage Audit

Current:

| URL | Items |
|---|---:|
| `/articles/` | 5 |
| `/articles/page/2/` | 1 |
| `/news/` | 5 |
| `/news/page/2/` | 1 |
| `/products/` | 3 |
| `/products/sky/` | 2 |
| `/products/wing/` | 5 |
| `/products/xtal/` | 5 |
| `/ru/articles/` | 5 |
| `/ru/articles/page/2/` | 1 |
| `/ru/news/` | 5 |
| `/ru/news/page/2/` | 1 |
| `/ru/products/` | 3 |
| `/ru/products/sky/` | 2 |
| `/ru/products/wing/` | 5 |
| `/ru/products/xtal/` | 5 |

Status:

- Semantically OK.
- Not a direct Google rich result.

Recommendation:

- Keep as supporting graph.
- For product series pages, consider adding stronger visible introductory copy and internal links, but this is not a rich-result requirement.

## Organization / Brand / Logo Audit

Current:

- Local organization: `https://aerocool.ua/#organization`
- Global parent organization: `https://aerocool.io/#organization`
- Brand: `https://aerocool.io/#brand`
- Logo: `https://aerocool.ua/#logo`

Strengths:

- Stable IDs.
- Parent/brand relationship is explicit.
- `sameAs` is present.
- Contact points are present.
- Local address exists.

Risks / improvements:

- Full organization graph repeats on every page. Google recommends organization markup on home/about-style pages; repeating is not required.
- Local organization uses Kyiv address and geo. Verify legal/business accuracy before production if this address is not a public customer-facing location.
- If this is effectively an online catalog/store, consider `OnlineStore` for the local entity, but only if merchant facts are visible and accurate.

## WebSite / SearchAction Audit

Current:

- `WebSite` emitted on 86 of 88 JSON-LD pages; the two contact-success service pages only render `BreadcrumbList`, `ImageObject` and `WebPage`.
- `SearchAction` points to localized search URL.

Status:

- Technically valid.
- No longer a visible Google rich result since Google removed sitelinks search box globally starting 2024-11-21.

Recommendation:

- Optional: keep for semantic completeness.
- Do not optimize around this as a Search rich-result opportunity.

## ImageObject Audit

Current:

- 174 `ImageObject` nodes.
- Product images: mostly `2000x2000`, strong for product presentation.
- Article/news images: `1536x1024`, enough pixels but not in recommended article ratios.
- Logo image is SVG.

Recommendations:

- Product: keep square primary images.
- Article/news: generate and expose 1:1, 4:3, 16:9 variants.
- Organization logo: consider a crawlable PNG fallback in addition to SVG if Rich Results Test ever warns about logo.

## WebPage / AboutPage / ContactPage Audit

Current:

- `WebPage`: 76 nodes.
- `AboutPage`: 2 nodes.
- `ContactPage`: 2 nodes.

Status:

- Good supporting graph.
- `mainEntity` links product/article/news/faq/collection nodes appropriately.
- `primaryImageOfPage` links to `ImageObject`.
- Breadcrumb references are present where expected.

Recommendation:

- Keep.
- For contact/about, ensure all organization contact data in schema matches visible page content.

## Prioritized Fix Plan

### Phase 1: Protect Product rich results

1. Add visible product facts block to product layout/content:
   - price;
   - availability;
   - SKU;
   - MPN/GTIN where available;
   - warranty;
   - delivery;
   - returns;
   - payment methods.
2. Remove `aggregateRating` until ratings are visible and sourced.
3. Confirm if `shippingRate: 0` and `returnFees: FreeReturn` are legally/operationally true. If not, correct them.
4. Add MPN/GTIN for SKY Lite and SKY 360 if official identifiers exist; otherwise leave omitted.

### Phase 2: Improve Article/News rich-result quality

1. Update `Article` and `NewsArticle` image output to include 1:1, 4:3, 16:9 variants.
2. Inline author `Organization` data with `@type`, `name`, `url`.
3. Keep `datePublished` and `dateModified` synchronized with actual editorial changes.

### Phase 3: Clean global graph weight

1. Emit full `Organization` graph only on home/about/contact or keep a reduced global reference elsewhere.
2. Keep `WebSite` on home; use references elsewhere if desired.
3. Keep FAQ schema, but do not over-invest in FAQ rich result expectations.

## Current Risk Rating

| Area | Rating |
|---|---|
| JSON-LD validity | Good |
| Breadcrumb rich results | Good |
| Product snippet syntax | Good |
| Product rich-result quality | Needs work |
| Merchant listing eligibility | Needs decision |
| Review snippet eligibility | High risk |
| FAQ rich-result expectation | Low probability |
| Article/News schema quality | Medium |
| Organization graph | Medium cleanup |

Overall: the schema system is structurally solid, but product rich-result quality needs tightening before relying on Google rich results at scale.
