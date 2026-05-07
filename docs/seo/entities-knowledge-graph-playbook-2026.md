# Entities And Knowledge Graphs Playbook 2026

Актуально на `2026-05-07`.

Этот документ переводит `Guide to Entities & Knowledge Graphs for SEO` от SchemaApp в локальные правила для проекта `Aerocool Ukraine`.

Главная мысль: SEO больше не держится только на совпадении слов. Поиск и AI-системы пытаются понять сущности, их атрибуты и связи. Поэтому сайт Aerocool должен не просто покрывать ключевые слова, а строить понятный reusable knowledge graph из бренда, организации, серий, товаров, материалов, механизмов, сценариев и коммерческих условий.

Текущий порядок внедрения entity registry, entity home, `about`, `mentions` и `ProductGroup` описан в [2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-07-documentation-refresh-and-project-action-plan.md). Актуальный реестр сущностей находится в [entity-registry-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entity-registry-2026.md).

## 1. Что Такое Entity

Entity — это вещь или концепт, который является:

- единичным;
- уникальным;
- хорошо определенным;
- отличимым от других сущностей.

Для Aerocool entity может быть:

- бренд `Aerocool`;
- локальная организация `Aerocool Ukraine`;
- серия `SKY`, `WING`, `XTAL`;
- конкретная модель;
- материал `Mesh`, `Racer`, `Loft Air`;
- механизм `Synchronous Tilt`, `SYNC4`, `SYNC5`;
- сценарий `home office`, `gaming`, `long work session`;
- коммерческая политика: доставка, возврат, гарантия.

Ключевое отличие: keyword — это строка поиска, topic — группа связанных запросов, entity — объект с атрибутами и связями.

## 2. Зачем Knowledge Graph В SEO

Knowledge graph — это сеть отношений между сущностями, описанная контролируемым словарем. В проекте таким словарем выступает Schema.org, а формат вывода — JSON-LD.

Практическая польза:

- поисковики лучше понимают, что именно описывает страница;
- AI search получает более точный источник фактов;
- снижается риск неправильного описания бренда или товара;
- можно анализировать, какие сущности и темы уже покрыты, а где есть пробелы;
- в будущем тот же слой может быть полезен для AI-chatbot, NLWeb, `llms.txt` или agentic interfaces.

Важно: knowledge graph строится из видимого контента. JSON-LD не должен описывать факты, которых нет на странице или в подтвержденной структуре сайта.

## 3. Три Шага Построения Knowledge Graph

| Шаг | Что Делать В Aerocool | Результат |
| --- | --- | --- |
| 1. Design content | Проектировать страницы вокруг конкретных entities и подтем | Сайт покрывает темы глубоко, без keyword-тонкости |
| 2. Describe with schema | Описывать сущности и их отношения через Schema.org | Машины получают явную структуру |
| 3. Link entities | Связывать внутренние entities и точные внешние knowledge bases | Снижается неоднозначность, появляется reusable graph |

Эти шаги должны быть частью редакционного процесса, а не только технического SEO.

## 4. Entity Home

Для каждой важной сущности нужна главная страница-определение.

| Entity | Entity Home | Комментарий |
| --- | --- | --- |
| Aerocool | `/about/` или `/` | Должна объяснять бренд и связь с Украиной |
| Aerocool Ukraine | `/about/`, `/contact/`, `/faq/` | Нужны организация, контакты, сервисная модель |
| Catalog | `/products/` | Главный вход в коммерческую структуру |
| SKY | `/products/sky/` | Entity home серии |
| WING | `/products/wing/` | Entity home серии |
| XTAL | `/products/xtal/` | Entity home серии |
| Product variant | `/products/<series>/<model>/` | Entity home конкретного товара |
| FAQ/service policies | `/faq/` | Главный источник доставки, оплаты, возврата, гарантии |
| Synchronous Tilt | статья, FAQ-блок или glossary | Нужна отдельная объясняющая сущность |
| Mesh | статья, product block или glossary | Нужна связь с товарами и сценариями |

Правило: если сущность важна для выбора или AI-ответа, но на сайте нет страницы или сильного блока, который ее определяет, это контентный gap.

## 5. Semantic Triples

Knowledge graph можно проектировать через тройки:

`subject -> predicate -> object`

Примеры для Aerocool:

- `Aerocool SKY 360 -> brand -> Aerocool`;
- `Aerocool SKY 360 -> seller -> Aerocool Ukraine`;
- `Aerocool SKY 360 -> isVariantOf -> SKY ProductGroup`;
- `Aerocool WING -> has material -> Mesh`;
- `Synchronous Tilt -> used in -> Aerocool chair models`;
- `Home office guide -> about -> office chair`;
- `Product page -> mentions -> warranty policy`;
- `FAQ -> mainEntity -> delivery and return questions`.

Такой формат помогает выбирать точные свойства Schema.org. Не использовать общий `mentions`, если связь точнее описывается через `brand`, `seller`, `author`, `publisher`, `mainEntity`, `about`, `isVariantOf`, `parentOrganization` или другое конкретное свойство.

## 6. URI И `@id`

Каждая важная сущность должна иметь стабильный URI через `@id`.

Текущий паттерн проекта:

- `https://aerocool.ua/#organization`;
- `https://aerocool.io/#brand`;
- `https://aerocool.io/#organization`;
- `<page-url>#webpage`;
- `<page-url>#product`;
- `<page-url>#article`;
- `<page-url>#news`;
- `<page-url>#collection`;
- `<page-url>#faq`;
- `<page-url>#breadcrumbs`;
- `<page-url>#primary-image`.

Правила:

- не создавать новый `@id` для сущности, если она уже определена;
- ссылаться на существующий `@id` при повторном упоминании сущности;
- не менять `@id` без миграционной причины;
- не строить связи на текстовом парсинге, если можно использовать явные front matter поля;
- перед добавлением массовых entity-полей обновить `docs/content/front-matter-reference.md`.

## 7. Internal Entity Linking

Внутренняя связность должна существовать в двух слоях:

- видимые HTML-ссылки для пользователей;
- JSON-LD связи через `@id` и точные Schema.org properties.

Минимальные связи:

- product -> brand;
- product -> seller;
- product -> page image;
- product -> collection/series через visible links и, после подтверждения групп, `ProductGroup`;
- article/news -> publisher;
- article/news -> related series/products через visible links и точечные `about` / `mentions`;
- FAQ -> organization/service policy;
- local organization -> global organization / brand.

Если связь важна для SEO или AI Search, она должна быть понятна не только из текста, но и из структуры страницы.

## 8. External Entity Linking

Внешние knowledge bases полезны для disambiguation, но они не должны заменять собственное определение сущности.

Можно использовать:

- официальный глобальный сайт Aerocool;
- официальные социальные профили Aerocool на глобальных сущностях `Brand` и global `Organization`;
- точные Wikidata/Wikipedia/Google KG сущности, если совпадение не вызывает сомнений;
- authoritative источники для общих терминов, если они действительно помогают уточнить смысл.

Не использовать:

- `sameAs` на маркетплейсы;
- `sameAs` на случайные обзоры;
- внешнюю страницу, где сущность отличается от нашей;
- Wikipedia/Wikidata только ради количества ссылок;
- автоматическое external linking без ручной проверки для ключевых коммерческих сущностей.

Особенно осторожно с `sameAs`: это утверждение “это та же самая сущность”, а не просто “связано с темой”.

Для текущего проекта: глобальные соцпрофили Aerocool официальные и единые для всех представительств. Поэтому `sameAs` остается у `https://aerocool.io/#brand` и `https://aerocool.io/#organization`; локальная сущность `https://aerocool.ua/#organization` связывается с ними через `brand` и `parentOrganization`, а не через собственный `sameAs`. Local organization facts для `Aerocool Ukraine` подтверждены пользователем проекта `2026-05-07`: адрес, телефон, support/sales email и часы работы считаются актуальными публичными business facts.

## 9. Entity Maturity Scale

| Уровень | Состояние | Что Делать |
| --- | --- | --- |
| 1 | Keywords | Зафиксировать поисковые фразы |
| 2 | Topics | Сгруппировать фразы в темы |
| 3 | Entities | Определить объекты, атрибуты и entity home |
| 4 | External linked entities | Добавить точные внешние идентификаторы |
| 5 | Internal knowledge graph | Связать entities через `@id`, видимые ссылки и Schema.org properties |

Aerocool уже находится выше уровня keyword/topics благодаря хабам, сериям, товарам и JSON-LD graph. Следующий рост — не больше ключей, а явнее entity home, `about`, `mentions`, `ProductGroup`, `additionalProperty` и registry сущностей.

## 10. Content Gap Audit Через Knowledge Graph

Использовать knowledge graph как инструмент анализа контента.

Вопросы аудита:

- Какие Schema.org types используются чаще всего?
- Какие entities есть на каждой странице?
- Какие важные entities не имеют entity home?
- Какие product properties видны пользователю, но не представлены в schema?
- Какие schema properties есть в JSON-LD, но не видны пользователю?
- Какие серии или материалы слабо связаны со статьями?
- Какие темы покрыты только keywords, но не entity-страницами?
- Какие внешние `sameAs` есть и все ли они точные?
- Какие сущности нужны для AI prompt-аудита, но отсутствуют в контенте?
- Где есть риск cannibalization между entity home и статьей?

Результат аудита должен превращаться в контентные задачи, а не только в schema-задачи.

## 11. Beyond SEO

Knowledge graph может быть переиспользован за пределами классического SEO:

- grounding для будущего AI-chatbot;
- проверка фактов о товарах и условиях сервиса;
- анализ контентной библиотеки;
- подготовка к AI Search;
- подготовка к `llms.txt`, NLWeb или agentic interfaces;
- внутренняя база знаний для команды.

Но это P2/P3-направление. До production-стабилизации не внедрять chatbot, NLWeb или agentic commerce только ради тренда.

## 12. Backlog

### P0

1. Поддерживать текущие стабильные `@id` без случайных изменений.
2. Не добавлять external `sameAs` без ручной проверки точности.
3. Решить риск `aggregateRating`: подтвердить реальным источником или убрать.
4. Считать `/faq/` главным entity home для текущих service policies.

### P1

1. Done `2026-05-07`: initial entity registry создан в [entity-registry-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entity-registry-2026.md).
2. Done `2026-05-07`: entity home для `Synchronous Tilt`, `SYNC4`, `SYNC5`, `Mesh`, `Racer`, `Loft Air`, `Dual backrest` зафиксированы.
3. Done `2026-05-07`: front matter для `about_entities` и `mentions_entities` спроектирован и подключен к safe resolver.
4. Done `2026-05-07`: `ProductGroup` и `product_group_id` спроектированы; ProductGroup выводится только для confirmed entity.
5. Done `2026-05-07`: beginner-гайд по Entity Registry добавлен.
6. Done `2026-05-07`: priority pages получили `about_entities`, `mentions_entities` и staged `product_group_id`.
7. Добавить видимые характеристики как источник для `additionalProperty`.
8. Провести content gap audit по entity map.

### P2

1. Рассмотреть glossary или entity hub.
2. Рассмотреть author/reviewer entities только при реальной редакционной модели.
3. Использовать knowledge graph как источник для будущего `llms.txt`.
4. Подготовить данные для AI-chatbot только после production-стабилизации и актуализации product facts.

## 13. Что Не Делать

Не делать:

- не подменять entity strategy списком keywords;
- не создавать страницы под каждую микросущность без полезного контента;
- не добавлять фиктивные Person/Reviewer entities;
- не добавлять `sameAs`, если сущности не идентичны;
- не создавать дубли `@id`;
- не использовать JSON-LD для фактов, которых нет в видимом контенте;
- не запускать AI-chatbot на неактуальных товарных данных.

## 14. Контрольный Вывод

Для Aerocool самый полезный вывод из `Guide to Entities & Knowledge Graphs for SEO`: проекту нужен управляемый слой сущностей поверх уже сильной SEO-структуры.

Следующий уровень:

- entity registry;
- entity home для каждой важной сущности;
- стабильные URI / `@id`;
- semantic triples для проектирования связей;
- internal + external entity linking;
- content gap audit по entities;
- reusable knowledge graph для SEO и будущих AI-сценариев.
