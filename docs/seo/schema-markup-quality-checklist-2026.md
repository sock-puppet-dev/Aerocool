# Schema Markup Quality Checklist 2026

Актуально на `2026-05-07`.

Этот документ переводит `Schema Markup Checklist` и универсальные выводы из `Definitive Guide to Healthcare Structured Data in SEO` от SchemaApp в локальный QA-чеклист для `Aerocool Ukraine`. Его задача — проверять не только валидность JSON-LD, но и качество schema.org-графа: правильные типы, полезные свойства, связи между сущностями, устойчивые `@id`, отсутствие schema drift и соответствие schema-стратегии реальной цели страницы.

Важно: этот чеклист не требует использовать SchemaApp как сервис. В проекте уже есть собственный Hugo-слой в `layouts/_partials/_schema` и единый JSON-LD graph через `layouts/_partials/_seo/jsonld.html`.

Текущий порядок внедрения P0/P1/P2 описан в [2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-07-documentation-refresh-and-project-action-plan.md).

## 1. Семь Проверок Schema Markup

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
| Серия товаров | `["website", "collection", "organization", "breadcrumbs"]` | Ок сейчас; позже рассмотреть `ProductGroup` |
| Товар | `["website", "product", "organization", "breadcrumbs"]` | Ок |
| Статья | `["website", "article", "organization", "breadcrumbs"]` | Ок |
| Новость | `["website", "news", "organization", "breadcrumbs"]` | Ок |
| FAQ | `["website", "faq", "organization", "breadcrumbs"]` | Ок |
| Search | JSON-LD не рендерится для `layout: "search"` | Ок |

Правило: выбирать самый конкретный тип, который описывает главный смысл страницы. Если страница продает конкретный товар — `Product`; если объясняет тему — `Article`; если является разделом каталога — `CollectionPage`.

### Vertical-Specific Types

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

## 3. Properties Только По Видимому Контенту

Качественная schema-разметка использует не только required-поля для rich results, но и свойства, которые реально помогают описать сущность.

Перед добавлением свойства ответить:

- есть ли этот факт в видимом HTML;
- помогает ли свойство понять сущность;
- требуется ли оно или рекомендовано для rich result;
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
- `isVariantOf` / `inProductGroupWithID` после внедрения `ProductGroup`.

Открытый риск: `aggregateRating`. Его нужно держать только при реальном и видимом источнике рейтинга/отзывов.

## 4. Nesting И Иерархия

SchemaApp checklist подчеркивает: если сущности относятся к главной сущности страницы, их нужно вложить или связать так, чтобы была понятна иерархия.

Текущий проект уже делает правильные вещи:

- `WebPage.mainEntity` указывает на `Product`, `Article`, `NewsArticle`, `FAQPage` или `CollectionPage`;
- `Product.offers` вложен в `Product`;
- `Product.brand` ссылается на один `Brand @id`;
- `Product.aggregateRating` вложен в `Product`, если рейтинг есть в front matter;
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
- товарный вариант связан с группой -> `isVariantOf` или `inProductGroupWithID`.

Менее точное свойство вроде `mentions` не должно заменять более точное `publisher`, `author`, `brand`, `seller` или `mainEntity`.

## 7. Внешнее Entity Linking

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

Для текущего проекта: глобальные соцпрофили Aerocool официальные и единые для всех представительств, но они не являются отдельной идентичностью `Aerocool Ukraine`. Поэтому local organization не получает `sameAs`; она ссылается на global organization через `parentOrganization` и на бренд через `brand`. Local organization facts подтверждены пользователем проекта `2026-05-07`: адрес, телефон, support/sales email и часы работы считаются актуальными публичными business facts.

Для терминов вроде `Mesh`, `Synchronous Tilt`, `SYNC4`, `SYNC5` лучше сначала создать сильное собственное объяснение на сайте, а внешнее связывание добавлять только при надежном совпадении.

## 8. Schema Drift

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

Правило поддержки: product front matter является источником правды для коммерческих фактов. Если меняется видимый коммерческий факт, сначала обновить front matter, затем одновременно проверить `Product` JSON-LD, `/faq/` и контент страницы.

Особенно внимательно:

- при изменении цены;
- при изменении наличия;
- при добавлении новых товаров;
- при изменении условий доставки/возврата;
- при переносе URL;
- при изменении локализации `uk` / `ru`.

## 9. Page-Level QA Процесс

Использовать этот чеклист для ключевых страниц после schema/content изменений.

Минимальный набор URL:

- `/`;
- `/about/`;
- `/contact/`;
- `/faq/`;
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
7. Проверить Schema Markup Validator.
8. Проверить Google Rich Results Test для страниц, где rich result важен.
9. После production-перехода проверить Search Console reports.

### Strategy And ROI Check

Structured data должна быть связана с целью страницы, а не добавляться ради самого факта разметки.

| Цель | Подходящая Schema/страница | Что Измерять |
| --- | --- | --- |
| Продать товар | `Product`, `Offer`, merchant facts | impressions, clicks, CTR, product page visits, contact/catalog actions |
| Помочь выбрать | `Article`, `CollectionPage`, `FAQPage` где уместно | relevant queries, engagement, переходы в серии и товары |
| Укрепить доверие | `Organization`, `Brand`, `AboutPage`, `ContactPage` | branded visibility, contact actions, корректность brand facts |
| Снять возражения | FAQ и видимые support-блоки | FAQ engagement, переходы в контакты/каталог |
| Нанять сотрудника | `JobPosting` | только если есть реальная вакансия; job views/applications |

Интерпретация данных: снижение нерелевантных impressions или общего traffic не всегда плохо, если растут CTR, качество запросов, переходы в каталог, контакты или другие конверсионные действия.

Schema strategy — это ongoing process. После production-запуска отслеживать не только validator pass, но и Search Console, rich result reports, AI Search-аудит, schema drift и реальные бизнес-действия.

### Operations And Ownership

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

## 10. Что Добавлять В Roadmap

Из PDF для проекта реально полезны следующие задачи:

- формализовать registry сущностей и `@id`;
- внедрить `about` и `mentions` через явные front matter поля;
- внедрить `ProductGroup` для вариантов;
- добавить видимые характеристики и затем `additionalProperty`;
- документировать источник рейтингов или убрать `aggregateRating`;
- создать schema drift QA как регулярную проверку;
- привязывать schema-изменения к цели страницы и измеримой метрике;
- поддерживать schema ownership и backlog как часть контентно-технического процесса;
- при новых страницах выбирать type через intent страницы, а не по шаблону “похоже на прошлую”.

## 11. Что Не Менять Сейчас

Не нужно:

- переходить на сторонний SchemaApp Highlighter;
- менять `schema_types` на другое поле;
- добавлять `schema_type`;
- переносить логику из Hugo partials в контент;
- добавлять внешние `sameAs` без проверки;
- расширять schema невидимыми фактами;
- делать `BreadcrumbList` вложенным в главную сущность.
- добавлять healthcare, recipe, job posting или local business types без реального соответствующего контента.
- переходить на внешний schema SaaS без реальной проблемы масштаба, ownership или скорости обновлений.

## 12. Контрольный Вывод

Главная практическая польза `Schema Markup Checklist` для Aerocool — это QA-дисциплина.

Проект уже имеет сильную schema-базу. Следующий уровень качества:

- меньше дублей сущностей;
- точнее свойства связей;
- больше стабильных entity `@id`;
- меньше риска schema drift;
- properties как подсказка для полезного видимого контента;
- регулярная проверка ключевых URL, а не разовый validator pass.
