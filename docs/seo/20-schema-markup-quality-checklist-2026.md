# Чек-Лист Качества Schema-Разметки 2026

Актуально на 2026-06-02.

Этот документ переводит `Schema Markup Checklist` и универсальные выводы из `Definitive Guide to Healthcare Structured Data in SEO` от SchemaApp в локальный QA-чеклист для `Aerocool Ukraine`. Его задача — проверять не только валидность JSON-LD, но и качество schema.org-графа: правильные типы, полезные свойства, связи между сущностями, устойчивые `@id`, отсутствие schema drift и соответствие schema-стратегии реальной цели страницы.

Важно: этот чеклист не требует использовать SchemaApp как сервис. В проекте уже есть собственный Hugo-слой в `layouts/_partials/_schema` и единый JSON-LD graph через `layouts/_partials/_seo/jsonld.html`.

Документ синхронизирован с текущими Google structured data guidelines: JSON-LD должен описывать видимый контент страницы, не вводить пользователя в заблуждение, не скрывать размеченные факты и проходить не только validator, но и quality-проверку соответствия интенту страницы.

Текущий порядок внедрения P0/P1/P2 описан в [34-2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/34-2026-05-07-documentation-refresh-and-project-action-plan.md).
Базовый sync-аудит документации: [37-2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/37-2026-05-13-documentation-2026-best-practices-sync-audit.md).
Дополнительный аудит support-статей Schema App по `sameAs`, primary entity, `additionalType`, breadcrumbs и image license metadata: [42-2026-05-17-schemaapp-support-knowledge-base-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/42-2026-05-17-schemaapp-support-knowledge-base-audit.md).
Анализ 4 PDF Schema App про connected schema, Content Knowledge Graphs, impact и Agentic Web: [44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/44-2026-05-17-schemaapp-pdf-agentic-graph-impact-analysis.md).
Анализ 21 Schema App customer stories/case studies по real-world внедрениям: [46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/46-2026-05-18-schemaapp-customer-stories-case-studies-audit.md).
Операционный регламент поддержки product facts: [58-product-facts-maintenance-process-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/58-product-facts-maintenance-process-2026.md).
Image license metadata внедрена через видимую страницу `/image-license/` и centralized schema helper; текущий статус зафиксирован в [57-2026-05-31-schema-entity-full-audit-current.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/57-2026-05-31-schema-entity-full-audit-current.md).
Обновление `2026-05-25` учитывает статью Schema App [Stop Chasing Visibility. Build Understanding.](https://www.schemaapp.com/schema-markup/stop-chasing-visibility-build-understanding/) и официальный Google guide [Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## 0. Рамка Для AI Search

Structured data не является отдельным AI-хаком. В Google generative AI search нет специального schema.org-типа, который нужно добавить “для AI”. Поэтому качество разметки в проекте оценивается не по количеству свойств, а по тому, насколько точно graph помогает машинам понять реальные сущности и связи.

Для Aerocool это правило означает:

- не добавлять свойства только потому, что они звучат полезно для AI;
- не размечать невидимые или неподтвержденные факты;
- не создавать отдельную `AI schema`;
- не считать `llms.txt` или chunking заменой видимого контента, индексации, entity registry и JSON-LD graph;
- считать лучшей schema-разметкой ту, которая синхронизирована с source of truth и снижает риск неправильного представления бренда, товара или условий покупки.

## 1. Семь Проверок Schema-Разметки

| # | Проверка | Приоритет | Смысл Для Aerocool |
| ---: | --- | --- | --- |
| 1 | Правильный `Schema.org` type | High | Тип должен соответствовать главному интенту страницы |
| 2 | Релевантные properties по видимому контенту | High | Разметка должна описывать реальные факты на странице |
| 3 | Осмысленный nesting / hierarchy | Medium | Связанные сущности должны быть вложены или связаны с главной сущностью |
| 4 | Устойчивые URI / `@id` | High | Каждая важная сущность должна иметь один стабильный идентификатор |
| 5 | Связи между сущностями сайта | High | Страница должна ссылаться на уже определенные сущности, а не создавать дубли |
| 6 | Внешнее entity linking | Medium | `sameAs` и внешние knowledge bases использовать только при точном совпадении |
| 7 | Защита от schema drift | High | JSON-LD должен оставаться синхронным с видимым контентом |

## 2. Правильный Type По Интенту Страницы

В проекте это решается через `schema_types`.

Текущие соответствия:

| Тип Страницы | Локальный `schema_types` | Статус |
| --- | --- | --- |
| Главная | `["website", "organization", "brand"]` | Ок |
| О бренде | `["website", "organization", "brand", "about-page", "breadcrumbs"]` | Ок |
| Контакты | `["website", "organization", "contact-page", "breadcrumbs"]` | Ок |
| Каталог / хабы | `["website", "collection", "organization", "breadcrumbs"]` | Ок |
| Серия товаров | `["website", "collection", "organization", "breadcrumbs"]` | Ок; `ProductGroup` не использовать для всей серии |
| Товар | `["website", "product", "organization", "breadcrumbs"]` | Ок |
| Статья | `["website", "article", "organization", "breadcrumbs"]` | Ок |
| Новость | `["website", "news", "organization", "breadcrumbs"]` | Ок |
| FAQ | `["website", "faq", "organization", "breadcrumbs"]` | Ок как видимый FAQ и структурированное описание; не считать Google FAQ rich result целью после `2026-05-07` |
| Search | JSON-LD не рендерится для `layout: "search"` | Ок |

Правило: выбирать самый конкретный тип, который описывает главный смысл страницы. Если страница продает конкретный товар — `Product`; если объясняет тему — `Article`; если является разделом каталога — `CollectionPage`.

### Матрица Primary Entity

Перед добавлением или изменением schema-разметки определить главную сущность страницы.

| Тип Страницы | Primary Entity | Как Связывать |
| --- | --- | --- |
| Главная | `Organization`, `Brand`, `WebSite` | site-level graph и publisher |
| О бренде | `AboutPage` -> `Organization` | `mainEntity` |
| Контакты | `ContactPage` -> `Organization` / contact points | `mainEntity` |
| Каталог | `CollectionPage` -> список серий/товаров | `mainEntity` + `ItemList` |
| Серия | `CollectionPage` | `mainEntity`, `ItemList`, видимые ссылки на товары |
| Товар | `Product` | `WebPage.mainEntity` и `Product.mainEntityOfPage` |
| Статья | `Article` + главная тема из registry | `about`, `mentions`, `mainEntityOfPage` |
| Новость | `NewsArticle` + событие/серия/товар | `about`, `mentions`, `mainEntityOfPage` |
| FAQ | `FAQPage` | `mainEntity` questions |
| Неясная страница | сначала доработать контент | schema не усиливать |

Если нельзя коротко назвать primary entity, проблема в контенте или intent страницы. В таком случае сначала уточнить страницу, а не добавлять больше JSON-LD.

### Типы Для Конкретных Вертикалей

Healthcare-гайд полезен как напоминание: schema.org type выбирается по реальному вертикальному контенту, а не по желанию получить больше свойств.

Для Aerocool сейчас не использовать:

- `MedicalOrganization`;
- `Hospital`;
- `MedicalClinic`;
- `Physician`;
- `IndividualPhysician`;
- `MedicalProcedure`;
- `MedicalWebPage`;
- healthcare-specific properties вроде `medicalSpecialty`, `healthCondition`, `medicalAudience`;
- `Recipe`, если на сайте нет настоящих рецептов;
- `JobPosting`, если нет реальной вакансии с полным описанием и способом отклика.

Потенциально допустимо только при появлении соответствующего реального раздела:

- `JobPosting` — если Aerocool публикует настоящие вакансии;
- `HowTo` — если есть видимые пошаговые инструкции по сборке, настройке или уходу;
- `VideoObject` — если есть реальные product videos;
- `LocalBusiness` / `OnlineStore` — только если бизнес-модель, адрес, часы, обслуживание и merchant facts явно подтверждены видимым контентом.

Правило: vertical schema нельзя переносить из чужого примера. Сначала page intent и видимый контент, потом type.

## 3. Свойства Только По Видимому Контенту

Качественная schema-разметка использует не только required-поля для rich results, но и свойства, которые реально помогают описать сущность.

Перед добавлением свойства ответить:

- есть ли этот факт в видимом HTML;
- помогает ли свойство понять сущность;
- требуется ли оно или рекомендовано для поддерживаемого rich result;
- есть ли надежный источник правды для этого поля;
- будет ли поле обновляться вместе с контентом.

Если полезное свойство есть в Schema.org, но на странице нет видимого факта, сначала добавить видимый контент, а уже потом JSON-LD.

Для товаров Aerocool сильные кандидаты:

- `price`;
- `availability`;
- `sku`;
- `mpn`, если есть официальный MPN;
- `gtin13`, если есть официальный GTIN;
- `color`;
- `material`;
- `additionalProperty` для механизма, подлокотников, базы, роликов, гарантии, сценария использования;
- `isVariantOf` / `inProductGroupWithID` для confirmed ProductGroup вариантов.

На `2026-05-31` `Product.color` выводится из registry, а `Product.additionalProperty` строится из видимой вкладки `characteristics`. Если характеристика не видна пользователю, она не должна попадать в `additionalProperty`.

Для цены, наличия, гарантии, доставки, возврата, оплаты, `priceValidUntil`, цвета и характеристик использовать регламент [58-product-facts-maintenance-process-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/58-product-facts-maintenance-process-2026.md): сначала бизнес-подтверждение, затем front matter или registry, затем видимый HTML, JSON-LD и `/faq/`, если факт относится к общей политике.

Открытый риск: `aggregateRating`. Его нужно держать только при реальном и видимом источнике рейтинга/отзывов. Целевой источник для проекта — approved отзывы из `Netlify Database`, выгруженные на build в `data/generated/reviews.json`.

## 4. Вложенность И Иерархия

SchemaApp checklist подчеркивает: если сущности относятся к главной сущности страницы, их нужно вложить или связать так, чтобы была понятна иерархия.

Текущий проект уже делает правильные вещи:

- `WebPage.mainEntity` указывает на `Product`, `Article`, `NewsArticle`, `FAQPage` или `CollectionPage`;
- `Product.offers` вложен в `Product`;
- `Product.brand` ссылается на один `Brand @id`;
- `Product.aggregateRating` вложен в `Product` только если есть approved отзывы, видимые на этой же товарной странице;
- `Article.author` и `Article.publisher` ссылаются на `Organization`;
- `BreadcrumbList` остается отдельной навигационной сущностью и не вкладывается в `Product` или `Article`.

Правило: breadcrumb — навигация, а не смысловая часть товара или статьи. Его нормально держать отдельным узлом графа.

## 5. URI И `@id`

Каждая важная сущность должна иметь стабильный `@id`.

Текущий паттерн проекта:

- локальная организация: `https://aerocool.ua/#organization`;
- локальный сайт: языковой `WebSite @id` через `page-website-id.html`;
- глобальный бренд: `https://aerocool.io/#brand`;
- глобальная организация: `https://aerocool.io/#organization`;
- страница: `<page-url>#webpage`;
- товар: `<page-url>#product`;
- статья: `<page-url>#article`;
- новость: `<page-url>#news`;
- коллекция: `<page-url>#collection`;
- FAQ: `<page-url>#faq`;
- хлебные крошки: `<page-url>#breadcrumbs`;
- primary image: `<page-url>#primary-image`.

Правила:

- не создавать второй `@id` для той же сущности на другой странице;
- при связи с уже существующей сущностью ссылаться на ее `@id`;
- не использовать случайные fragment-имена без понятной системы;
- для entity-полей использовать только `entity_id` из registry/data layer; front matter добавлять точечно после проверки видимого контента.

## 6. Связи Между Сущностями

PDF особенно полезен здесь: важна не просто ссылка на сущность, а точное свойство связи.

Примеры правильной логики:

- статья опубликована организацией -> `publisher`;
- статья написана организацией или человеком -> `author`;
- статья посвящена серии SKY -> `about`;
- статья упоминает WING и XTAL для сравнения -> `mentions`;
- товар принадлежит бренду Aerocool -> `brand`;
- локальная организация связана с глобальной -> `parentOrganization`;
- реальный товарный вариант связан с группой вариантов -> `isVariantOf` или `inProductGroupWithID`.

Менее точное свойство вроде `mentions` не должно заменять более точное `publisher`, `author`, `brand`, `seller` или `mainEntity`.

## 7. Внешняя Связь Сущностей

Внешние связи помогают устранить неоднозначность, но для Aerocool их нужно применять осторожно.

Можно использовать:

- официальные профили Aerocool как `sameAs` глобального бренда и global organization;
- официальный глобальный сайт;
- точные публичные профили компании;
- Wikidata/Wikipedia только если сущность совпадает без сомнений;
- внешние knowledge bases для общих терминов только после проверки точности.

Не использовать:

- маркетплейсы как `sameAs`;
- случайные обзоры;
- страницы конкурентов;
- неофициальные карточки бренда;
- внешние URL только ради увеличения количества ссылок;
- Wikidata/Wikipedia, если там нет точной сущности Aerocool, модели, серии или термина.

Для текущего проекта: глобальные соцпрофили Aerocool официальные и единые для всех представительств, но они не являются отдельной идентичностью `Aerocool Ukraine`. Поэтому local organization не получает `sameAs`; она ссылается на global organization через `parentOrganization` и на бренд через `brand`. Local organization facts подтверждены пользователем проекта: адрес, телефон и support/sales email зафиксированы `2026-05-07`, а часы работы обновлены `2026-05-19` до `Monday-Sunday 09:00-18:00`. Эти факты считаются актуальными публичными business facts и должны совпадать с видимым contact-блоком.

Для терминов вроде `Mesh`, `Synchronous Tilt`, `SYNC4`, `SYNC5` лучше сначала создать сильное собственное объяснение на сайте, а внешнее связывание добавлять только при надежном совпадении.

### `additionalType` И `sameAs`

`sameAs` и `additionalType` решают разные задачи.

`sameAs` означает exact identity: текущая сущность является той же самой сущностью, что и внешний URL.

`additionalType` означает уточнение типа: внешний термин является более узким типом для текущей schema.org сущности.

Правила:

- не использовать `additionalType` как замену `sameAs`;
- не использовать `sameAs` для связанных, похожих или тематически близких страниц;
- использовать `additionalType` только если внешний термин не противоречит базовому `@type`;
- Wikidata/Wikipedia добавлять только после ручной проверки;
- для коммерческих сущностей Aerocool сначала строить собственный entity home, затем рассматривать внешнее уточнение.

Официальные `sameAs` ссылки проверять раз в квартал: URL должен быть живым, стабильным и по-прежнему представлять global Aerocool, а не локальное представительство или стороннюю карточку.

## 8. Расхождение Schema-Разметки С Видимым Контентом

Schema drift — расхождение между JSON-LD и видимым контентом.

Для Aerocool наиболее рискованные поля:

- `price`;
- `availability`;
- `priceValidUntil`;
- `shippingRate`;
- сроки доставки;
- возврат;
- гарантия;
- `ratingValue`;
- `reviewCount`;
- `mpn`;
- `gtin13`;
- материал и цвет;
- характеристики товара.

Правило поддержки: product front matter является источником правды для merchant facts. Если меняется видимый коммерческий факт, сначала обновить front matter, затем одновременно проверить `Product` JSON-LD, `/faq/` и контент страницы. Для рейтинга и отзывов источник другой: approved reviews snapshot из `data/generated/reviews.json`, собранный из `Netlify Database`.

Особенно внимательно:

- при изменении цены;
- при изменении наличия;
- при добавлении новых товаров;
- при изменении условий доставки/возврата;
- при переносе URL;
- при изменении локализации `uk` / `ru`.

## 9. Метаданные Лицензии Изображений (Image License Metadata)

Текущий проект создает `ImageObject` для primary image страницы и логотипа. С `2026-05-31` каждый такой `ImageObject` получает:

- `license`;
- `acquireLicensePage`;
- `creator`;
- `creditText`;
- `copyrightNotice`.

Правило поддержки: эти поля не заполняются в content и не передаются в shortcode. Единый источник для metadata - helper [image-license-metadata.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/_schema/image-license-metadata.html), а видимое объяснение условий - страницы `/image-license/` и `/ru/image-license/`.

Важно: текущая страница не объявляет изображения public domain или Creative Commons. Она фиксирует ограниченный порядок использования: смотреть и делиться ссылкой можно, копировать или коммерчески использовать изображения можно только после письменного разрешения. Если бизнес-условия или правообладатель меняются, сначала обновить видимую страницу, затем проверить JSON-LD.

Для товарных изображений по-прежнему обязательны crawlable visible images, корректный `alt`, `contentUrl`, `width`, `height` и соответствие изображения реальному товару.

## 10. QA-Процесс На Уровне Страницы

Использовать этот чеклист для ключевых страниц после schema/content изменений.

Минимальный набор URL:

- `/`;
- `/about/`;
- `/contact/`;
- `/faq/`, но без ожидания Google FAQ rich result после `2026-05-07`;
- `/products/`;
- `/products/sky/`;
- один товар SKY;
- один товар WING;
- один товар XTAL;
- одна статья;
- одна новость;
- соответствующие `ru`-версии.

Проверка:

1. Собрать сайт.
2. Открыть HTML и найти JSON-LD.
3. Проверить, что `@graph` содержит ожидаемые типы.
4. Проверить, что `@id` стабильны и не дублируют сущности.
5. Проверить, что `WebPage.mainEntity` указывает на главную сущность страницы.
6. Проверить, что properties совпадают с видимым контентом.
7. Проверить `BreadcrumbList`: `position` последовательный, `item` абсолютный, `name` совпадает с видимой навигацией или ожидаемой иерархией.
8. Проверить, что `sameAs` используется только для exact identity.
9. Проверить, что `additionalType`, если появится, уточняет тип, а не связанную тему.
10. Проверить Schema Markup Validator.
11. Проверить Google Rich Results Test для страниц, где rich result важен.
12. После production-перехода проверить Search Console reports.

### Проверка Стратегии И Пользы

Structured data должна быть связана с целью страницы, а не добавляться ради самого факта разметки.

| Цель | Подходящая Schema/страница | Что Измерять |
| --- | --- | --- |
| Продать товар | `Product`, `Offer`, merchant facts | impressions, clicks, CTR, product page visits, qualified traffic, contact/catalog actions, conversions |
| Помочь выбрать | `Article`, `CollectionPage`, `FAQPage` где уместно | relevant queries, engagement, переходы в серии и товары, AI citations по выбору кресла |
| Укрепить доверие | `Organization`, `Brand`, `AboutPage`, `ContactPage` | branded visibility, contact actions, корректность brand facts, AI representation accuracy |
| Снять возражения | FAQ и видимые support-блоки | FAQ engagement, переходы в контакты/каталог, корректность AI-ответов о доставке, оплате, возврате и гарантии |
| Нанять сотрудника | `JobPosting` | только если есть реальная вакансия; job views/applications |

Интерпретация данных: снижение нерелевантных impressions или общего traffic не всегда плохо, если растут CTR, качество запросов, переходы в каталог, контакты или другие конверсионные действия.

Schema strategy — это ongoing process. После production-запуска отслеживать не только validator pass, но и Search Console, rich result reports, AI Search-аудит, schema drift и реальные бизнес-действия.

### Schema Как Performance Layer

`Impact of Schema Markup` усиливает важную рамку: schema в 2026 году нельзя оценивать только по принципу “валидно / невалидно” или “есть rich result / нет rich result”. Для Aerocool schema должна работать как слой измеримой производительности.

После production-перехода фиксировать baseline:

- Search Console impressions, clicks и CTR по product, series, article и FAQ URL;
- non-branded commercial queries: `игровое кресло`, `офисное кресло`, `компьютерное кресло`, `home office`;
- rich result reports для Product snippets и Merchant listings, если Google показывает данные;
- AI citations: какие URL цитируются в ChatGPT, Gemini, Copilot, Perplexity и Google AI Overviews;
- entity-level performance: какие сущности реально тянут видимость, переходы и контактные действия;
- qualified traffic и конверсии, а не только общий organic traffic.

До production и индексации эти метрики не являются основанием для новых schema-типов. Сначала нужен чистый граф, затем baseline, затем улучшения.

Customer stories Schema App подтверждают ту же логику на реальных внедрениях: сильный эффект дают не добавленные свойства сами по себе, а связка `visible content -> reliable source of truth -> structured data -> measurement`. Для Aerocool это означает, что Product rich results, entity linking и AI Search readiness нельзя оценивать без источника product facts, source для ratings и post-production reporting.

### Операционная Поддержка И Владение Данными

`The Schema App` полезен не как причина переходить на внешний SaaS, а как напоминание: structured data требует операционной модели.

Для Aerocool текущий правильный путь — локальный Hugo schema-слой, потому что:

- сайт статический и управляется в репозитории;
- schema partials уже централизованы в `layouts/_partials/_schema`;
- front matter является контролируемым источником product facts;
- документация фиксирует правила добавления и проверки;
- изменения можно ревьюить вместе с контентом и шаблонами.

Но это работает только если есть поддержка процесса:

- schema-изменения должны иметь владельца, а не быть случайными правками;
- новые page types сначала описываются в документации, потом в шаблонах;
- массовые поля front matter не добавляются без шаблонной поддержки;
- schema backlog должен идти вместе с content backlog;
- при миграции URL, redesign или изменении товарных данных проверять JSON-LD отдельно;
- измерять влияние через существующие business metrics, а не придумывать vanity-метрики.

Внешний schema SaaS имеет смысл рассматривать только если проект резко вырастет до сотен/тысяч шаблонно разных страниц, появится частая смена коммерческих данных без участия разработки или понадобится отдельный non-dev workflow для SEO-команды. Сейчас это не требуется.

## 11. Что Добавлять В План Развития

Из PDF для проекта реально полезны следующие задачи:

- формализовать registry сущностей и `@id`;
- внедрить `about` и `mentions` через явные front matter поля;
- поддерживать активный `ProductGroup` для реальных вариантов и не расширять его на одиночные товары;
- поддерживать видимые характеристики как источник `additionalProperty`;
- документировать источник рейтингов или убрать `aggregateRating`;
- создать schema drift QA как регулярную проверку;
- привязывать schema-изменения к цели страницы и измеримой метрике;
- поддерживать schema ownership и backlog как часть контентно-технического процесса;
- при новых страницах выбирать type через intent страницы, а не по шаблону “похоже на прошлую”.
- поддерживать [отчет по эффективности сущностей (Entity Performance Report)](/Users/stadnyk/MEGA/Aerocool/docs/seo/59-entity-performance-report-2026.md): entity -> URL -> impressions -> clicks -> CTR -> AI citations -> business actions; внешние performance-поля заполнять после production.

## 12. Что Не Менять Сейчас

Не нужно:

- переходить на сторонний SchemaApp Highlighter;
- менять `schema_types` на другое поле;
- добавлять `schema_type`;
- переносить логику из Hugo partials в контент;
- добавлять внешние `sameAs` без проверки;
- расширять schema невидимыми фактами;
- делать `BreadcrumbList` вложенным в главную сущность.
- добавлять healthcare, recipe, job posting или local business types без реального соответствующего контента;
- переходить на внешний schema SaaS без реальной проблемы масштаба, ownership или скорости обновлений;
- добавлять agentic actions, если нет реального business endpoint, owner, validation rules и видимого процесса.

## 13. Контрольный Вывод

Главная практическая польза `Schema Markup Checklist` для Aerocool — это QA-дисциплина.

Проект уже имеет сильную schema-базу. Следующий уровень качества:

- меньше дублей сущностей;
- точнее свойства связей;
- больше стабильных entity `@id`;
- меньше риска schema drift;
- properties как подсказка для полезного видимого контента;
- регулярная проверка ключевых URL, а не разовый validator pass.
