# Documentation Refresh And Project Action Plan 2026-05-07

Этот документ фиксирует актуальное состояние документации после интеграции материалов SchemaApp и переводит обновленные знания в практический план для текущего проекта `Aerocool Ukraine`.

Главная идея: документация уже описывает сильный SEO/schema/AI Search-фундамент. Следующий этап — не добавлять новые schema-типы “для красоты”, а закрыть реальные риски перед production, затем последовательно развивать entity graph, ProductGroup, AI Search-аудит и reusable content components.

## 1. Текущее Состояние

Проект уже имеет сильную базу:

- Hugo `0.161.0`, Node `24`, Tailwind CSS 4 и Netlify зафиксированы в локальных и deploy-настройках.
- Основной сайт двуязычный: `uk` как основной язык и `ru` как второй.
- Контентная структура через page bundles уже подходит для SEO, изображений и локализации.
- В `layouts/_partials/_schema` есть централизованный JSON-LD слой для `Website`, `Organization`, `Brand`, `CollectionPage`, `Product`, `Article`, `NewsArticle`, `FAQPage`, `BreadcrumbList`, `WebPage` и изображений.
- Документация теперь покрывает classic SEO, AI Search, entity SEO, knowledge graph, schema QA, e-commerce structured data и Unlighthouse/Lighthouse проверки.

Главные открытые ограничения:

- Netlify всё ещё намеренно работает в `development/noindex` режиме.
- У всех product pages есть `rating.value` и `rating.count`, но источник рейтингов/отзывов нужно подтвердить или убрать `aggregateRating`.
- `ProductGroup`, `about`, `mentions`, entity registry и будущие entity front matter поля пока описаны в документации, но ещё не внедрены в шаблоны.
- AI Search baseline нельзя честно снять до production-запуска и индексации.

## 2. P0 Перед Production

### P0.1. Решить Production Gate

Что сделать:

1. Оставить `netlify.toml` в `development` до финального решения об индексации.
2. Перед запуском production локально выполнить `npm run build:production`.
3. Проверить, что индексируемые страницы получают `index,follow`.
4. Проверить, что `/search/`, `404` и alias-страницы остаются `noindex,nofollow`.
5. После Deploy Preview прогнать Unlighthouse по critical URLs и strict-конфигу.
6. Только после этого переключать Netlify command и `HUGO_ENVIRONMENT` на production.

Где смотреть:

- `netlify.toml`
- `README.md`
- `docs/quality/unlighthouse-site-audit.md`
- `docs/deploy/netlify-routing.md`
- `docs/audits/2026-05-06-project-readiness-assessment.md`

Критерий готовности:

- production build проходит;
- sitemap содержит только индексируемые URL;
- technical noindex URL не попадают в SEO-индекс;
- Unlighthouse strict audit не показывает критических SEO/performance/accessibility проблем.

### P0.2. Подтвердить Или Убрать `aggregateRating`

Сейчас `layouts/_partials/_schema/product.html` добавляет `aggregateRating`, если во front matter есть:

```yaml
rating:
  value: 4.8
  count: 10
```

В product content рейтинг уже выводится видимо как значение и количество оценок. Но для Google и AI Search этого недостаточно, если источник оценок неясен.

Что сделать:

1. Определить источник рейтингов: реальные покупатели, внешняя платформа, внутренний review-сбор, редакционная оценка или временные маркетинговые данные.
2. Если источник реальный — добавить видимый блок с объяснением источника рейтинга и, желательно, отдельными отзывами или summary отзывов.
3. Если источник нельзя доказать — удалить `rating` из product front matter и подавить `aggregateRating`.
4. Добавить в `docs/content/front-matter-reference.md` правило для будущего поля `rating_source`, но только после решения о реальном источнике.

Где смотреть:

- `content/products/**/index.md`
- `content/products/**/index.ru.md`
- `layouts/_partials/_schema/product.html`
- `docs/seo/json-ld-graph-audit-roadmap-2026.md`
- `docs/seo/ecommerce-structured-data-playbook-2026.md`

Критерий готовности:

- либо rating/review source виден пользователю и совпадает с JSON-LD;
- либо `aggregateRating` не выводится в JSON-LD.

### P0.3. Проверить Local Organization, Address И `sameAs`

В `layouts/_partials/_schema/local-organization.html` локальная сущность `Aerocool Ukraine` использует адрес, телефон, email, часы работы, `parentOrganization` и `sameAs` на глобальные профили Aerocool.

Что сделать:

1. Подтвердить, что адрес `Kyiv, Stepana Rudnytskoho, 19/14` является публичным customer-facing адресом.
2. Подтвердить телефон `+380665020441`, `support@aerocool.ua` и `sales@aerocool.ua`.
3. Решить, должен ли локальный `Aerocool Ukraine` иметь `sameAs` на глобальные профили или лучше оставить эти `sameAs` только у глобальной организации/бренда.
4. Если локальная сущность не идентична глобальным профилям, убрать `sameAs` из local organization и оставить связь через `parentOrganization` и `brand`.

Где смотреть:

- `layouts/_partials/_schema/local-organization.html`
- `layouts/_partials/_schema/global-organization.html`
- `content/about/index.md`
- `content/contact/index.md`

Критерий готовности:

- локальная organization schema не утверждает неподтвержденных фактов;
- `sameAs` используется только для точного совпадения сущности.

### P0.4. Зафиксировать Источник Правды Для Product Facts

Product schema уже содержит price, availability, SKU, MPN, GTIN, delivery, returns, warranty и payment methods. Это сильный e-commerce слой, но он становится риском, если данные устаревают.

Что сделать:

1. Назначить source of truth для цены, наличия, SKU, MPN, GTIN и гарантии.
2. Определить, кто и как обновляет product front matter.
3. Проверить, что `priceValidUntil` реалистичен и не создает ложного обещания.
4. При изменении доставки/возврата сначала обновлять `/faq/`, затем product schema и товарные страницы.

Где смотреть:

- `content/products/**/index.md`
- `content/products/**/index.ru.md`
- `content/faq/index.md`
- `content/faq/index.ru.md`
- `layouts/_partials/_schema/product.html`
- `docs/content/front-matter-reference.md`

Критерий готовности:

- видимый product facts block, front matter и JSON-LD говорят одно и то же;
- нет поля в JSON-LD, которое невозможно поддерживать операционно.

## 3. P1 После Закрытия P0

### P1.1. Создать Entity Registry

Нужен отдельный реестр сущностей, прежде чем добавлять новые entity front matter поля.

Что включить:

- бренд `Aerocool`;
- локальная организация `Aerocool Ukraine`;
- серии `SKY`, `WING`, `XTAL`;
- модели и варианты;
- материалы `Racer`, `Loft Air`, `Mesh`;
- механизмы `Synchronous Tilt`, `SYNC4`, `SYNC5`;
- сценарии `home office`, gaming, office work, long sitting;
- service policies: доставка, оплата, возврат, гарантия.

Рекомендуемый новый документ:

- `docs/seo/entity-registry-2026.md`

Критерий готовности:

- у каждой важной сущности есть `entity home`;
- понятно, какие страницы могут использовать `about` и `mentions`;
- нет конкуренции между страницами за одну и ту же entity home.

### P1.2. Спроектировать Front Matter Для Entities

Добавлять новые поля только после entity registry.

Кандидаты:

```yaml
about_entities:
  - aerocool-wing
  - gaming-chair
mentions_entities:
  - synchronous-tilt
  - mesh
  - warranty-policy
product_group_id: "wing-racer"
variant_attributes:
  material: "Racer"
  color: "Black"
rating_source: ""
```

Что сделать:

1. Описать поля в `docs/content/front-matter-reference.md`.
2. Добавить поддержку в Hugo partials только после документации.
3. Не ломать текущее правило: `schema_types` остается единственным полем выбора schema.org типов.

Критерий готовности:

- новые поля не являются свободным текстовым мусором;
- каждое значение связано с entity registry;
- шаблоны игнорируют пустые или неизвестные значения безопасно.

### P1.3. Спроектировать `ProductGroup`

У проекта есть отдельные product URL для вариантов по серии, модели, материалу и цвету. Это хороший кандидат для `ProductGroup`, но внедрять его нужно после видимой навигации вариантов.

Что сделать:

1. Определить группы: например `SKY Lite`, `SKY 360`, `WING Racer`, `WING Loft Air`, `WING Mesh`, `XTAL Racer`, `XTAL Loft Air`, `XTAL Mesh`.
2. Для каждого варианта определить `color`, `material`, `sku`, `gtin13`, `mpn`.
3. Добавить видимую навигацию между вариантами на product pages.
4. Только затем добавить `ProductGroup`, `isVariantOf` или `inProductGroupWithID`.

Где смотреть:

- `content/products/<series>/_index.md`
- `content/products/<series>/<model>/index.md`
- `layouts/_partials/_schema/product.html`
- будущий partial `layouts/_partials/_schema/product-group.html`

Критерий готовности:

- пользователь видит, что это варианты одной группы;
- JSON-LD отражает видимую структуру, а не придумывает ее скрыто.

### P1.4. Добавить `about` И `mentions` В `WebPage`

Сейчас `layouts/_partials/_schema/webpage.html` добавляет `about` для organization, но не использует страницу как полноценную entity/mentions карту.

Что сделать:

1. После entity registry добавить поддержку `about_entities` и `mentions_entities`.
2. Для страницы товара `about` должен вести к product entity, series/product group и бренду.
3. Для статей `about` должен указывать главную тему, а `mentions` — связанные модели, материалы, механизмы и сценарии.
4. Для FAQ `about` должен покрывать service policies и ключевые entity.

Критерий готовности:

- AI Search и Google получают понятный graph отношений;
- не создаются случайные новые `@id`;
- связи совпадают с видимыми ссылками и текстом.

### P1.5. Компонентный Контент Для AI Search

Тексты уже достаточно объемные. Следующий рост — не просто добавлять символы, а улучшать извлекаемость.

На ключевых страницах добавить/усилить:

- короткий ответ в начале раздела;
- блок “кому подходит”;
- сравнение с соседними сериями/моделями;
- таблицу характеристик;
- блок фактов для покупки;
- FAQ;
- внутренние ссылки на entity home;
- CTA, который соответствует интенту страницы.

Критерий готовности:

- фрагмент страницы можно цитировать в AI-ответе без потери смысла;
- каждый блок отвечает на отдельный пользовательский вопрос;
- структура повторяется между страницами одного типа.

## 4. P2 После Production И Индексации

### P2.1. Завести AI Search Baseline

После production-запуска и индексации нужно один раз в месяц проверять AI Search visibility.

Что отслеживать:

- появляется ли `aerocool.ua` в ответах;
- кого цитируют AI-системы: сайт, маркетплейсы, конкурентов, обзоры;
- корректно ли описаны серии и модели;
- есть ли искажения по цене, наличию, доставке, гарантии;
- тональность ответа: нейтральная, положительная, сомнительная, негативная.

Платформы для ручного baseline:

- Google AI Overviews, если доступно по запросу;
- ChatGPT;
- Perplexity;
- Gemini;
- Bing/Copilot.

Критерий готовности:

- есть таблица prompts и результатов;
- есть список missing citations;
- есть backlog страниц, которые нужно усилить.

### P2.2. Улучшить Article / News Images

Rich results audit фиксирует, что `Article` и `NewsArticle` сейчас в основном используют один primary image. Для Google лучше иметь варианты `1x1`, `4x3`, `16x9`.

Что сделать:

1. Определить, нужно ли генерировать несколько image crops для статей и новостей.
2. Спроектировать front matter или Hugo image processing для image array.
3. Обновить `Article.image` и `NewsArticle.image`, если это не усложнит поддержку.

Критерий готовности:

- изображения crawlable;
- размеры и aspect ratio подходят для Google recommendations;
- контентная команда понимает, какие изображения готовить.

### P2.3. Рассмотреть `llms.txt`

`llms.txt` не является заменой sitemap, robots или schema.org. Его стоит добавлять только после production-стабилизации.

Что сделать:

1. Выбрать 10-30 ключевых URL: home, about, products, серии, FAQ, главные статьи.
2. Дать короткое описание сайта и основных сущностей.
3. Не включать неиндексируемые, тонкие или временные страницы.

Критерий готовности:

- карта ключевых URL уже стабильна;
- entity registry готов;
- production URL индексируется.

## 5. P3 Только После Появления Бизнес-Задачи

Не делать сейчас:

- NLWeb или agentic commerce “на всякий случай”;
- chatbot без стабильной product facts базы;
- `OnlineStore` без реального merchant/checkout сценария;
- `Review` без реальных видимых отзывов;
- author/reviewer entities без реальной редакционной модели;
- external `sameAs` на маркетплейсы, обзоры или случайные страницы;
- healthcare, recipe, job posting или другие vertical-specific schema без соответствующего видимого раздела.

## 6. Рекомендуемый Порядок Работ

### Неделя 1

1. Принять решение по `aggregateRating`.
2. Проверить local organization facts: адрес, телефон, email, `sameAs`.
3. Зафиксировать source of truth для product facts.
4. Обновить документацию по rating/source, если решение принято.

### Неделя 2

1. Выполнить локальный `npm run build:production`.
2. Проверить robots meta для indexable и technical pages.
3. Проверить sitemap index и языковые sitemap.
4. Прогнать Unlighthouse critical URLs.
5. Подготовить production switch plan для Netlify.

### Неделя 3

1. Создать entity registry.
2. Определить entity home для серий, материалов, механизмов и сценариев.
3. Спроектировать `about_entities`, `mentions_entities`, `product_group_id`.
4. Обновить `docs/content/front-matter-reference.md`.

### Неделя 4

1. Спроектировать visible variant navigation.
2. Подготовить `ProductGroup` partial.
3. Добавить `about`/`mentions` в `WebPage` после entity registry.
4. Обновить schema QA checklist по фактической реализации.

### После Production

1. Снять baseline Search Console.
2. Снять baseline AI Search prompts.
3. Проверить rich result reports.
4. Проверить AI citations и brand sentiment.
5. Обновить roadmap по фактическим данным, а не предположениям.

## 7. Главный Вывод

Проект уже не нуждается в хаотичном расширении документации. Следующая ценность — дисциплина исполнения:

- сначала P0-риск рейтингов и production gate;
- затем entity registry;
- затем ProductGroup и about/mentions;
- затем AI Search baseline;
- затем llms.txt/agentic-направления только при реальной пользе.

Такой порядок сохраняет сильную сторону проекта: Hugo остается простым и контролируемым, schema.org граф развивается без schema drift, а AI Search-подготовка опирается на реальные сущности и видимые факты.
