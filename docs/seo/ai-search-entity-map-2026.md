# AI Search Entity Map 2026

Актуально на `2026-05-13`.

Этот документ переводит идеи из `Mastering AI Search`, `Schema Markup and AI Search`, `Designing Content for Humans and Machines` и `How to Prepare Your Content for Generative AI Search` от SchemaApp в практическую систему для проекта `Aerocool Ukraine`: какие сущности нужно закрепить на сайте, какие AI Search-метрики отслеживать, какие prompt-наборы проверять и как развивать JSON-LD graph без переспама.

Главная мысль: для AI Search недостаточно просто иметь много SEO-текста. Сайт должен давать машинам полную, связанную и проверяемую картину бренда, товаров, серий, материалов, механизмов, сценариев использования и коммерческих условий.

Текущий порядок внедрения зафиксирован в [2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-07-documentation-refresh-and-project-action-plan.md).
Текущая синхронизация всей документации с лучшими практиками 2026 зафиксирована в [2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-13-documentation-2026-best-practices-sync-audit.md).

Важно: AI Search-слой не заменяет Google Search Essentials, people-first content, Core Web Vitals и structured data quality. До production-запуска и индексации AI Search считать мониторинговым и entity-governance слоем, а не причиной внедрять chatbot, NLWeb, MCP или `llms.txt` как P0.

## 1. Зачем Это Нужно

AI-поиск меняет SEO-логику:

- часть ответов пользователь получает без клика;
- бренд может быть упомянут рядом с конкурентами прямо в AI-ответе;
- важны не только позиции и клики, но и цитирование, корректность описания бренда, качество AI referral-трафика;
- LLM и AI search-системы сильнее опираются на сущности, связи, структурированные данные, ясные ответы и доверительные сигналы.

Для Aerocool это означает: текущий SEO-фундамент уже сильный, но нужен отдельный слой `AI Search visibility`.

## 2. Связь С Текущей Документацией

Этот документ дополняет, а не заменяет:

- `docs/seo/seo-keyword-map-2026.md` — интенты и поисковые кластеры;
- `docs/content/content-seo-checklist-2026.md` — качество видимого контента;
- `docs/seo/schema-types-reference.md` — текущие `schema_types`;
- `docs/seo/json-ld-graph-audit-roadmap-2026.md` — технический roadmap JSON-LD graph;
- `docs/quality/unlighthouse-site-audit.md` — техническая проверка published URL.

Практическая граница:

- keyword map отвечает на вопрос: `по каким запросам сайт должен быть найден`;
- content checklist отвечает: `каким должен быть полезный текст`;
- JSON-LD roadmap отвечает: `как размечать видимый контент`;
- этот документ отвечает: `как сделать бренд и товары понятными для AI-ответов`.

## 3. AI Search Метрики

Отслеживать нужно не только Google Search Console.

| Метрика | Что Значит | Как Проверять | Ограничение |
| --- | --- | --- | --- |
| AI visibility | Появляется ли Aerocool или URL сайта в AI-ответах | Ручные prompt-проверки, Semrush/Profound/аналогичные инструменты при наличии | Инструменты неполные и зависят от выбранных запросов |
| Brand citations | Как AI описывает бренд и рядом с кем его ставит | Ручная проверка ChatGPT, Gemini, Copilot, Perplexity, Google AI Overviews | Ответы нестабильны и зависят от языка/локации |
| Source citations | Какие страницы AI использует как источники | Follow-up вопросы: `какие источники?`, `покажи ссылки`, `откуда информация?` | Не все платформы показывают источники |
| AI referral traffic | Переходы из AI-платформ | GA4 referrals и landing pages | Часть трафика может попадать в `direct` |
| Engagement quality | Насколько AI-трафик полезен бизнесу | engagement rate, average engagement time, conversion events | Нужны настроенные события |
| Representation accuracy | Есть ли ошибки в описании бренда, товаров, условий | Ручной аудит ответов | Требует регулярной фиксации |
| Prompt variants | Как люди формулируют conversational-запросы | Матрица persona × intent stage | Нельзя ограничиваться exact-match ключами |
| Semantic relevance | Насколько сайт связан с темой в AI-ответах | Частота попадания в ответы по топикам, а не только бренду | Метрика пока качественная |
| Brand sentiment | В каком тоне AI описывает Aerocool | Ручной аудит формулировок и сравнений | Ответы меняются по платформам |
| Citation ownership | Какие URL и домены владеют цитированием по теме | AI-ответы, source links, GSC/SEO tools | AI не всегда показывает источники |
| AI crawler traffic | Приходят ли AI-боты и агенты | Server logs / Netlify logs при наличии | GA4 это обычно не показывает |

## 4. Ежемесячный AI Search Аудит

Периодичность: `1` раз в месяц после production-запуска и индексации.

Платформы для проверки:

- Google AI Overviews, если доступны для целевых запросов;
- ChatGPT;
- Gemini;
- Microsoft Copilot;
- Perplexity;
- другие AI-поисковые интерфейсы, если они начинают давать заметный referral-трафик.

Минимальная таблица аудита:

| Дата | Платформа | Язык | Prompt | Упомянут Aerocool | Цитируемый URL | Конкуренты | Ошибки | Действие |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `2026-05-06` | ChatGPT | `ru` | `лучшее кресло для home office Украина` | да/нет | URL | бренды | факт/нет | усилить страницу |

Follow-up вопросы после основного prompt:

- `Откуда ты взял эту информацию?`
- `Какие источники подтверждают ответ?`
- `Почему ты рекомендуешь эти бренды?`
- `Aerocool является надежным вариантом для этого сценария?`
- `Какая серия Aerocool лучше подходит для этого сценария?`

## 5. Prompt-Банк

Проверять нужно брендовые, коммерческие и entity-запросы на украинском и русском. Английские prompts полезны для международных AI-моделей, но приоритет для сайта — `uk` и `ru`.

### Брендовые Prompts

- `Що таке Aerocool Ukraine?`
- `Хто продає крісла Aerocool в Україні?`
- `Aerocool Ukraine офіційний сайт`
- `Что такое Aerocool Ukraine?`
- `Кто продает кресла Aerocool в Украине?`
- `Aerocool Ukraine официальный сайт`
- `Who is Aerocool Ukraine?`

### Коммерческие Prompts

- `краще ігрове крісло в Україні`
- `офісне крісло для роботи за комп'ютером`
- `комп'ютерне крісло для home office`
- `крісло з mesh спинкою`
- `ігрове крісло для тривалих сесій`
- `лучшее игровое кресло в Украине`
- `офисное кресло для работы за компьютером`
- `компьютерное кресло для home office`
- `кресло с mesh спинкой`
- `игровое кресло для длительных сессий`

### Серии И Модели

- `Aerocool SKY крісло`
- `Aerocool WING крісло`
- `Aerocool XTAL крісло`
- `Aerocool SKY 360`
- `Aerocool SKY Lite`
- `Aerocool WING Elite`
- `Aerocool XTAL Pro`
- `Aerocool SKY кресло`
- `Aerocool WING кресло`
- `Aerocool XTAL кресло`

### Материалы И Механизмы

- `що таке Synchronous Tilt у кріслі`
- `SYNC4 механізм крісла`
- `SYNC5 механізм крісла`
- `mesh чи екошкіра для крісла`
- `що таке dual backrest`
- `что такое Synchronous Tilt в кресле`
- `SYNC4 механизм кресла`
- `SYNC5 механизм кресла`
- `mesh или экокожа для кресла`
- `что такое dual backrest`

### Выбор И Сравнение

- `яке крісло Aerocool обрати для home office`
- `чим відрізняються Aerocool SKY і WING`
- `Aerocool SKY чи XTAL`
- `крісло для постави і довгої роботи`
- `какое кресло Aerocool выбрать для home office`
- `чем отличаются Aerocool SKY и WING`
- `Aerocool SKY или XTAL`
- `кресло для осанки и долгой работы`

### Persona × Funnel Prompt Matrix

`Schema Markup and AI Search` полезен тем, что предлагает мыслить не только ключами, а пересечением `persona × intent stage`. Для Aerocool это важнее, чем простой список запросов, потому что AI Search отвечает на длинные разговорные prompts.

| Persona | Educational | Comparison | Cost Analysis | Recommendation | Purchase | Support |
| --- | --- | --- | --- | --- | --- | --- |
| Home office worker | `як облаштувати робоче місце для довгої роботи` | `mesh чи екошкіра для home office крісла` | `скільки коштує нормальне офісне крісло в Україні` | `яке крісло Aerocool обрати для роботи вдома` | `де купити Aerocool SKY з доставкою по Україні` | `як налаштувати крісло для довгої роботи` |
| Gamer | `що важливо в ігровому кріслі для довгих сесій` | `Aerocool SKY чи WING для геймінгу` | `чи варте дорожче ігрове крісло своїх грошей` | `краще ігрове крісло Aerocool для вентиляції` | `купити ігрове крісло Aerocool в Україні` | `як доглядати за матеріалом крісла Aerocool` |
| Office buyer | `які крісла потрібні для офісної команди` | `офісні крісла mesh проти шкірозамінника` | `вартість комплекту крісел для офісу` | `яка серія Aerocool підходить для офісу` | `де замовити кілька крісел Aerocool` | `гарантія і повернення крісел Aerocool` |
| Student | `що потрібно для зручного навчального місця` | `компактне комп'ютерне крісло чи ігрове крісло` | `недороге крісло для навчання і комп'ютера` | `яке крісло Aerocool вибрати для маленької кімнати` | `купити комп'ютерне крісло Aerocool` | `як зібрати і налаштувати крісло` |

Русские версии этой матрицы нужно вести параллельно при реальном аудите, а не переводить автоматически в момент проверки. В AI Search формулировка prompt влияет на ответ сильнее, чем в классическом exact-match SEO.

AI follow-up вопросы не равны обычному Google `People Also Ask`. В AI snapshot и conversational search цепочка вопросов зависит от context window пользователя, поэтому при аудите нужно сохранять не только первый prompt, но и последующие вопросы, которые предлагает или принимает AI-система.

## 6. Entity Operations: Identify, Connect, Manage

Вебинар формулирует простой операционный цикл для данных, которые будут потреблять AI-агенты.

| Шаг | Что Делать В Aerocool | Результат |
| --- | --- | --- |
| Identify | Найти все ключевые сущности: бренд, локальную организацию, серии, модели, материалы, механизмы, сценарии, политики | Понятная entity map и канонические страницы |
| Connect internally | Связать сущности внутри сайта через ссылки, `@id`, `about`, `mentions`, `brand`, `seller`, `mainEntity`, `isVariantOf` | Машина понимает отношения между страницами |
| Connect externally | Добавлять `sameAs` только к точным официальным или авторитетным внешним сущностям | Снижается неоднозначность бренда, терминов и объектов |
| Manage | Проверять актуальность связей, свойств, URL, цен, наличия, политики доставки и возврата | Меньше schema drift и ошибок в AI-ответах |
| Measure | Отслеживать prompts, citations, sentiment, AI referrals, AI crawler traffic и конверсии | Понятно, что реально влияет на видимость и бизнес |

Практический вывод: entity map — не разовый документ. Это слой данных, который нужно поддерживать вместе с контентом и JSON-LD.

### Semantic Search Principles

`How to Prepare Your Content for Generative AI Search` добавляет важную рамку: поиск движется от lexical matching к semantic search. Значит, Aerocool нужно оптимизировать не только exact-match фразы, а близость смыслов, атрибутов и отношений между сущностями.

Практические правила:

- писать целостные страницы вокруг сущностей и подтем, а не узкие страницы под отдельные ключи;
- покрывать атрибуты сущности: материал, механизм, серия, модель, сценарий, доставка, гарантия;
- связывать сущности на уровне сайта, потому что neural matching учитывает отношения между темами и объектами;
- держать Aerocool в consideration set для follow-up вопросов, а не только для первого запроса;
- проверять фактическую согласованность, потому что связка LLM + knowledge graph усиливает значение противоречий.

### Entity Home And Maturity Scale

Для каждой важной сущности нужен `entity home`: страница, которая лучше всего определяет эту сущность на сайте. Внешний источник может уточнять или дезамбигуировать сущность, но не должен быть главным определением вместо собственного URL.

Локальная шкала зрелости:

| Уровень | Состояние | Пример Для Aerocool |
| --- | --- | --- |
| 1 | Keywords | `ігрове крісло`, `офісне крісло`, `home office` |
| 2 | Topics | выбор кресла, материалы, эргономика, доставка |
| 3 | Entities with context | `SKY` как серия, `Synchronous Tilt` как механизм, `Mesh` как материал |
| 4 | External linked entities | точные `sameAs` на официальные или авторитетные источники |
| 5 | Internal linked knowledge graph | сущности связаны через `@id`, `about`, `mentions`, `brand`, `seller`, `isVariantOf` |

Цель проекта — двигаться к уровню `5`, но только через видимый контент и реальные связи.

### Semantic Triples

Для проектирования связей удобно думать в формате `subject -> predicate -> object`.

Примеры:

- `Aerocool SKY -> is series of -> Aerocool chairs`;
- `Aerocool SKY 360 -> brand -> Aerocool`;
- `Aerocool SKY 360 -> has material -> Mesh`;
- `Aerocool WING -> mentions -> Synchronous Tilt`;
- `Home office guide -> about -> office chair`;
- `Product page -> seller -> Aerocool Ukraine`;
- `Product variant -> isVariantOf -> ProductGroup`.

Такая запись помогает выбирать точные Schema.org properties, а не использовать общий `mentions` там, где подходит `brand`, `seller`, `about`, `mainEntity` или `isVariantOf`.

## 7. Entity Map

Эта карта нужна для управляемых `about`, `mentions`, `ProductGroup`, будущих `additionalProperty` и внутренних ссылок. Канонический список entity IDs и entity homes находится в [entity-registry-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entity-registry-2026.md), а структурированный источник для schema resolver — в [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml).

| Entity | Тип Schema.org | Каноническая Страница | Где Усиливать | Следующее Действие |
| --- | --- | --- | --- | --- |
| Aerocool | `Brand` | `/` или `/about/` | Home, About, Product, Collection | Использовать стабильный `@id`; глобальные соцпрофили держать как `sameAs` бренда/global organization |
| Aerocool Ukraine | `Organization` / `OnlineStore`, если подтвердится модель магазина | `/about/`, `/contact/`, `/faq/` | Organization graph, FAQ, Contact | Local facts подтверждены `2026-05-07`; не расширять до `OnlineStore`; связь с глобальным Aerocool через `parentOrganization` и `brand`, без local `sameAs` |
| Каталог кресел | `CollectionPage` | `/products/` | Product hub, series pages | Связать с сериями и коммерческими интентами |
| SKY | `ProductGroup` / `CollectionPage` | `/products/sky/` | Серия, товары, статьи | Entity IDs зафиксированы; перед JSON-LD ProductGroup нужна видимая variant navigation |
| WING | `ProductGroup` / `CollectionPage` | `/products/wing/` | Серия, товары, статьи | Entity IDs зафиксированы; перед JSON-LD ProductGroup нужна видимая variant navigation |
| XTAL | `ProductGroup` / `CollectionPage` | `/products/xtal/` | Серия, товары, статьи | Entity IDs зафиксированы; перед JSON-LD ProductGroup нужна видимая variant navigation |
| Товарный вариант | `Product` | `/products/<series>/<model>/` | Product pages | Добавить `additionalProperty` после видимой таблицы характеристик |
| Игровое кресло | `Thing` / product category | `/products/`, статьи | Hubs, products, articles | Использовать как `about` для релевантных страниц |
| Офисное кресло | `Thing` / product category | `/products/`, статьи | Hubs, products, articles | Использовать как `about` для home office страниц |
| Компьютерное кресло | `Thing` / product category | `/products/`, статьи | Hubs, products, articles | Связать с выбором для работы и учебы |
| Home office | `Thing` / use case | статьи, product copy | Articles, products, series | Создать/усилить отдельный explain-блок |
| Synchronous Tilt | `DefinedTerm` / `Thing` | статья или glossary-блок | Articles, product specs | Сделать короткое объяснение и связать с моделями |
| SYNC4 | `DefinedTerm` / `Thing` | статья или серия | Products, specs | Использовать как характеристику только при видимом факте |
| SYNC5 | `DefinedTerm` / `Thing` | статья или серия | Products, specs | Использовать как характеристику только при видимом факте |
| Mesh | `DefinedTerm` / material | article/product pages | Materials, specs | Добавить сравнение с экокожей |
| Racer | `DefinedTerm` / material | product pages | Materials, specs | Привязать к конкретным товарам |
| Loft Air | `DefinedTerm` / material | product pages | Materials, specs | Привязать к конкретным товарам |
| Dual backrest | `DefinedTerm` / feature | статьи/товары | Product specs, articles | Нужен короткий ответ и видимый контекст |
| Доставка | `OfferShippingDetails` / policy | product front matter + `/faq/` | Product, FAQ | Front matter — source of truth; UI и FAQ подтверждают |
| Возврат | `MerchantReturnPolicy` | product front matter + `/faq/` | Product, FAQ | Front matter — source of truth; UI и FAQ подтверждают |
| Гарантия | `WarrantyPromise` / `PropertyValue` | product front matter + products + `/faq/` | Product pages | Показывать видимо перед расширением schema |

## 8. Schema Roadmap Для AI Search

Не добавлять новые свойства только ради количества. Сначала видимый контент и источник правды, затем JSON-LD.

| Уровень | Что Добавить | Где | Условие |
| --- | --- | --- | --- |
| P0 | Уточнить источник рейтингов или убрать `aggregateRating` | Product schema | Рейтинг должен быть реальным и видимым |
| P1 | `about` | Article, NewsArticle, CollectionPage | В front matter должна быть главная сущность страницы |
| P1 | `mentions` | Article, NewsArticle, Product, CollectionPage | Нужны явные связанные товары/серии/темы |
| P1 | `ProductGroup` | Product variants, series pages | Нужны group ID, variant links, visible variant navigation |
| P1 | `additionalProperty` | Product | Нужна видимая таблица характеристик |
| P2 | `DefinedTerm` / glossary layer | Articles, glossary or FAQ sections | Нужны реальные объяснения терминов |
| P2 | Author / reviewer layer | Articles, NewsArticle | Только реальные люди или прозрачная организация |
| P2 | `sameAs` | Brand, Organization, entities | Только точные официальные профили или авторитетные knowledge bases |
| P2 | `llms.txt` | Root static file | После production-стабилизации и ясной карты ключевых URL |

## 9. Front Matter И Связи

Текущие шаблоны читают `schema_types`. Это правило не менять.

Текущий безопасный набор entity-полей уже документирован в `docs/content/front-matter-reference.md`, объяснен для новичков в [entity-registry-beginner-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entity-registry-beginner-guide-2026.md) и читается шаблонами:

- `about_entities`;
- `mentions_entities`;
- `product_group_id`.

На `2026-05-07` эти поля точечно заполнены на priority pages. Новые значения не добавлять массово: каждое значение должно существовать в [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml), иметь статус `confirmed` для JSON-LD и быть видимо раскрыто в тексте, ссылках, навигации или характеристиках страницы. `product_group_id` может быть подготовлен как staged field, но `isVariantOf` появится только после подтверждения ProductGroup.

Поля, которые пока остаются проектными и требуют отдельного решения:

- `related_products`;
- `related_series`;
- `varies_by`;
- `product_properties`;
- `same_as`.

## 10. Контентные Паттерны Для AI-Ответов

AI-friendly контент не должен быть короче или беднее. Он должен иметь легко извлекаемые ответы внутри полноценной страницы.

Принцип из `Designing Content for Humans and Machines`: писать компонентами, а не только страницами. Каждый важный тип URL должен иметь повторяемые блоки, которые можно понять человеку, преобразовать в schema.org и переиспользовать в AI summary или агентском интерфейсе.

Добавлять в статьи, серии и товары:

- стабильный набор компонентов для типа страницы;
- блок `Короткий ответ`;
- блок `Кому подходит`;
- блок `Кому не подходит`;
- сравнение соседних серий;
- видимые характеристики;
- FAQ с прямыми ответами;
- объяснение терминов;
- таблицы выбора;
- ссылки на релевантные товары, серии, FAQ и контакты.

Писать семантически:

- называть конкретную сущность, а не абстрактное “решение”;
- показывать отношение между сущностями: серия -> модель -> материал -> механизм -> сценарий;
- использовать одну терминологию в `uk`, `ru`, front matter, visible copy и JSON-LD;
- избегать фраз, которые человек поймет из контекста, но машина не сможет разобрать без него.

Примеры коротких answer-блоков:

- `Synchronous Tilt — это механизм синхронного отклонения спинки и сиденья, который помогает удерживать более естественную посадку во время долгой работы.`
- `Mesh-спинка лучше подходит пользователям, которым важна вентиляция, особенно летом или при долгих сессиях за компьютером.`
- `Серия SKY ближе к универсальному игровому и рабочему сценарию, WING — к более выраженной поддержке, XTAL — к визуально легкому и современному рабочему месту.`

Эти блоки должны быть локализованы отдельно для `uk` и `ru`, а не машинно скопированы без редакторской проверки.

## 11. Agentic Web Readiness

`Designing Content for Humans and Machines` отдельно подчеркивает: контент становится строительным материалом для агентских интерфейсов. Для Aerocool это пока не задача немедленной разработки, но уже влияет на контент и данные.

Что это значит практически:

- товарные данные должны быть структурированы и синхронизированы с видимым контентом;
- коммерческие условия должны быть понятны не только человеку, но и машине: цена, наличие, доставка, возврат, гарантия, оплата;
- RSS, schema.org, sitemap и будущий `llms.txt` должны указывать на стабильные URL и актуальные сущности;
- если рынок начнет использовать Agentic Commerce Protocol или похожие commerce-стандарты, проекту понадобится надежный источник товарной правды;
- если появится задача conversational-интерфейса на сайте, NLWeb-подход логично рассматривать поверх уже опубликованных semi-structured данных: schema.org, RSS, sitemap, FAQ и каталог.

На текущем этапе не внедрять agentic commerce или NLWeb “на всякий случай”. Сначала нужна production-индексация, чистый schema graph, стабильные товарные данные и понятная entity map.

## 12. GA4 AI Referral Monitoring

После production-запуска нужно создать отдельный сегмент или отчет для AI referrals.

Проверять источники:

- `chatgpt.com`;
- `openai.com`;
- `perplexity.ai`;
- `copilot.microsoft.com`;
- `bing.com/chat`, если появляется;
- `gemini.google.com`;
- `google.com`, если landing page и контекст указывают на AI Overview;
- новые referral domains, которые появляются в отчетах.

Смотреть не только sessions:

- landing page;
- engagement rate;
- average engagement time;
- scroll/contact/catalog events;
- переходы в `/products/`;
- переходы на product pages;
- отправки формы или клики по контактам, если события настроены.

Если AI referral-трафика мало, это не доказывает отсутствие AI visibility: часть визитов может попадать в `direct`, а часть AI-ответов вообще не дает клика.

Дополнительно, если Netlify logs или другой серверный лог доступны, отдельно проверять AI crawler traffic. Это не показатель конверсии, но полезный сигнал, что AI-системы и агенты начинают обращаться к данным сайта.

## 13. Что Не Делать

Не делать:

- не добавлять фиктивные отзывы, рейтинги, авторов или reviewer-сущности;
- не ссылаться на Wikipedia/Wikidata, если там нет точной сущности;
- не размечать `sameAs` на случайные маркетплейсы или неофициальные страницы;
- не добавлять `HowTo`, `VideoObject`, `Review`, если такого видимого контента нет;
- не создавать новые front matter поля без шаблонной поддержки;
- не подменять AI Search-аудит общим Lighthouse-аудитом.
- не внедрять agentic commerce или NLWeb без реальной бизнес-задачи и стабильного источника товарных данных.

## 14. Backlog

### P0

1. Переключить Netlify на production только после финальной готовности.
2. Проверить `index,follow`, sitemap, служебные `noindex` страницы и Unlighthouse strict audit на реальном URL.
3. Решить источник рейтингов: подтвердить видимым и реальным источником или убрать `aggregateRating`.
4. Завести ежемесячную таблицу AI Search-аудита.
5. Добавить в AI-аудит поля для sentiment, citation ownership и prompt variant.
6. Проверить, что ключевые типы страниц собраны из повторяемых контентных компонентов.

### P1

1. Подготовить технический дизайн для `about` и `mentions`.
2. Подготовить `ProductGroup` для вариантов по серии, модели, материалу и цвету.
3. Добавить видимую таблицу характеристик как источник для `additionalProperty`.
4. Усилить страницы терминов и сценариев: `Synchronous Tilt`, `SYNC4`, `SYNC5`, `Mesh`, `home office`, `dual backrest`.
5. Проверить, какие текущие статьи лучше всего подходят как entity pages.
6. Расширить prompt-аудит до матрицы `persona × intent stage`.
7. Описать компонентные паттерны для product, series, article, news и FAQ страниц.

### P2

1. Спроектировать glossary или entity hub.
2. Рассмотреть `llms.txt` после production-стабилизации.
3. Добавить author/reviewer layer только при наличии реальной редакционной модели.
4. Добавить внешние `sameAs` только для точных официальных источников.
5. Подключить AI referral monitoring к регулярному SEO-отчету.
6. При наличии логов добавить AI crawler traffic в регулярный отчет.
7. Рассмотреть `llms.txt`, NLWeb или agentic commerce-требования только после production-стабилизации и появления понятной бизнес-задачи.

## 15. Контрольный Вывод

Для Aerocool самый полезный вывод из SchemaApp eBook такой: проект уже не нужно спасать базовой schema-разметкой. Его нужно развивать как связанную систему сущностей.

Следующий практический слой:

- entity map;
- AI Search prompt-аудит;
- `about` / `mentions`;
- `ProductGroup`;
- видимые характеристики для `additionalProperty`;
- осторожные trust-сигналы только на реальных данных;
- измерение AI referrals и качества этого трафика.
- оценка prompts через personas и intent stages;
- управление данными по циклу `Identify -> Connect -> Manage -> Measure`.
- проектирование контента как набора reusable components для людей, schema.org, AI summaries и будущих agentic surfaces.
