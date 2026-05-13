# Entity Registry: Гайд Для Новичка

Обновлено: 2026-05-13.

Базовая синхронизация документации с лучшими практиками 2026 зафиксирована в [2026-05-13-documentation-2026-best-practices-sync-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-13-documentation-2026-best-practices-sync-audit.md).

Этот гайд объясняет `Entity Registry` простым языком. Его задача — помочь человеку, который впервые открыл проект `Aerocool Ukraine`, понять, зачем нужен реестр сущностей, где он живет и как аккуратно добавлять `about_entities`, `mentions_entities` и `product_group_id` в страницы сайта.

## 1. Коротко: Что Такое Entity

Entity — это не просто слово из текста. Это конкретная сущность, о которой сайт говорит как о самостоятельном объекте.

Например:

- `Aerocool` — бренд.
- `Aerocool Ukraine` — локальная организация.
- `Aerocool WING` — серия кресел.
- `Aerocool WING Racer Black` — конкретный товар.
- `Synchronous Tilt` — механизм.
- `Mesh` — тип поверхности.
- `Доставка` — сервисная политика.

Если написать в тексте “WING”, человек поймет из контекста, что речь о серии кресел. Поисковая система или AI-модель тоже может догадаться, но ей лучше дать ясную структуру: это не случайное слово, а конкретная сущность с постоянным идентификатором.

## 2. Зачем Проекту Реестр Сущностей

Без реестра каждый автор может называть одну и ту же сущность по-разному:

- `wing`;
- `aerocool-wing`;
- `wing-series`;
- `WING chairs`;
- `серия Wing`.

Для человека это почти одно и то же. Для JSON-LD и knowledge graph это риск: одна реальная сущность начинает выглядеть как несколько разных объектов.

Entity Registry решает эту проблему. Он говорит:

> “Вот каноническое имя сущности, вот ее `entity_id`, вот ее стабильный `@id`, вот страница, где человек может понять, что это такое”.

## 3. Какие Файлы Нужно Знать

В проекте есть четыре важных слоя.

### Документ-реестр

[entity-registry-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/entity-registry-2026.md)

Это человеческая карта. Здесь объяснены правила, статусы, связи, entity homes, ProductGroup, service policies и roadmap.

### Структурированный data layer

[data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml)

Это машинный источник для Hugo-шаблонов. Если `entity_id` отсутствует здесь, шаблон не сможет превратить его в JSON-LD reference.

### Front matter страниц

Файлы в `content/`, например:

- `content/_index.md`;
- `content/products/wing/racer-black/index.md`;
- `content/articles/how-to-choose-aerocool-chair/index.md`.

Именно сюда точечно добавляются:

```yaml
about_entities:
  - "wing-series"
mentions_entities:
  - "synchronous-tilt"
product_group_id: "wing-racer-product-group"
```

### Hugo schema partials

Шаблоны в `layouts/_partials/_schema/` читают front matter, проверяют `entity_id` через [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml) и выводят JSON-LD только для безопасных сущностей.

## 4. Главное Правило

Не добавляй entity-поле “на всякий случай”.

Перед добавлением нужно ответить на три вопроса:

1. Эта сущность есть в [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml)?
2. Она реально видна или объяснена на странице?
3. Связь помогает понять страницу, а не просто украшает JSON-LD?

Если хотя бы один ответ “нет”, поле лучше не добавлять.

## 5. Что Означают Статусы

В registry есть статусы.

`confirmed` — сущность можно использовать в JSON-LD. У нее есть понятный `@id`, entity home и видимый контекст.

`planned` — сущность уже полезна для планирования, но пока не должна становиться сильной JSON-LD-связью. Например, ProductGroup можно заранее указать в front matter как staged data, но шаблон не выведет `isVariantOf`, пока группа не будет подтверждена.

`needs-review` — сущность требует проверки. Ее не использовать в production-разметке.

`do-not-markup` — сущность сознательно не размечать. Например, если нет реального checkout flow, не нужно называть сайт `OnlineStore`.

## 6. `about_entities`: О Чем Страница

`about_entities` отвечает на вопрос:

> “Какие главные сущности объясняет эта страница?”

Пример для страницы серии WING:

```yaml
about_entities:
  - "wing-series"
  - "gaming-chair"
  - "computer-chair"
  - "office-chair"
```

Здесь страница действительно о серии WING и о сценариях, где она применяется.

Пример для статьи про материалы:

```yaml
about_entities:
  - "racer-material"
  - "loft-air-material"
  - "mesh-material"
```

Это главная тема статьи, поэтому эти сущности подходят для `about`.

## 7. `mentions_entities`: Что Важно Упоминается

`mentions_entities` отвечает на вопрос:

> “Какие связанные сущности заметно упомянуты на странице, но не являются ее главной темой?”

Пример для статьи про выбор кресла:

```yaml
mentions_entities:
  - "sky-series"
  - "wing-series"
  - "xtal-series"
  - "home-office"
  - "synchronous-tilt"
```

Статья не только о серии SKY или WING, но эти сущности помогают раскрыть выбор.

## 8. `product_group_id`: К Какой Группе Вариантов Относится Товар

`product_group_id` нужен только для товарных вариантов.

Пример:

```yaml
product_group_id: "wing-racer-product-group"
```

Это значит: конкретный товар, например `WING Racer Black`, относится к группе вариантов `WING Racer`.

Важно: в текущем проекте ProductGroup entities пока остаются `planned`. Поэтому поле можно подготовить в front matter, но JSON-LD `isVariantOf` начнет выводиться только после двух условий:

1. На странице или в серии есть понятная видимая навигация между вариантами.
2. Соответствующая ProductGroup entity переведена в `confirmed`.

Так мы заранее готовим данные, но не создаем скрытую связь раньше, чем ее увидит пользователь.

## 9. Как Выбрать Правильные Entity IDs

Сначала открой [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml).

Найди нужную сущность по понятному имени:

- бренд: `aerocool-brand`;
- локальная организация: `aerocool-ukraine`;
- каталог: `aerocool-catalog`;
- серия SKY: `sky-series`;
- серия WING: `wing-series`;
- серия XTAL: `xtal-series`;
- материал Mesh: `mesh-material`;
- механизм SYNC5: `sync5-mechanism`;
- гарантия: `warranty-policy`.

Не придумывай новый id, если похожий уже есть. Лучше использовать существующий, чем создать вторую версию той же сущности.

## 10. Как Добавить Entity-Поля В Страницу

1. Открой нужный файл в `content/`.
2. Найди front matter между первыми `---`.
3. Найди строку `schema_types`.
4. Ниже добавь `about_entities`, `mentions_entities` или `product_group_id`.
5. Обнови `lastmod`.
6. Запусти `npm run build`.

Пример:

```yaml
schema_types: ["website", "article", "organization", "breadcrumbs"]
about_entities:
  - "synchronous-tilt"
mentions_entities:
  - "sync4-mechanism"
  - "sync5-mechanism"
  - "office-chair"
```

## 11. Как Не Ошибиться С `sameAs`

`sameAs` не означает “связано с темой”. Оно означает “это та же самая сущность”.

Для проекта уже принято правило:

- глобальные соцсети Aerocool относятся к `aerocool-brand` и `aerocool-global-organization`;
- локальная `Aerocool Ukraine` связана с глобальной организацией через `parentOrganization` и с брендом через `brand`;
- local organization не получает global social `sameAs`.

Это важно для точности graph: локальное представительство и глобальный бренд связаны, но это не одна и та же сущность.

## 12. Примеры Для Типовых Страниц

### Главная

Главная говорит о бренде, локальном сайте и каталоге.

```yaml
about_entities:
  - "aerocool-brand"
  - "aerocool-ukraine"
  - "aerocool-catalog"
mentions_entities:
  - "sky-series"
  - "wing-series"
  - "xtal-series"
```

### Каталог

Каталог говорит о товарном ассортименте.

```yaml
about_entities:
  - "aerocool-catalog"
mentions_entities:
  - "sky-series"
  - "wing-series"
  - "xtal-series"
  - "gaming-chair"
  - "office-chair"
```

### Товар

Товарная страница говорит о конкретной модели, серии и сценарии использования.

```yaml
about_entities:
  - "wing-racer-black"
  - "wing-series"
  - "gaming-chair"
mentions_entities:
  - "racer-material"
  - "sync5-mechanism"
  - "11d-adjustment"
product_group_id: "wing-racer-product-group"
```

### FAQ

FAQ объясняет сервисные условия.

```yaml
about_entities:
  - "faq-page"
  - "delivery-policy"
  - "payment-policy"
  - "return-policy"
  - "warranty-policy"
```

## 13. Что Нельзя Делать

- Не добавлять entity IDs, которых нет в registry.
- Не использовать `sameAs` для похожих, но не идентичных сущностей.
- Не добавлять `ProductGroup` как confirmed, если пользователь не видит связь между вариантами.
- Не размечать `OnlineStore`, пока сайт остается каталогом без checkout flow.
- Не размечать reviews/rating как сильную сущность, пока источник рейтингов не подтвержден.
- Не создавать новые `@id` вручную в content-файлах.

## 14. Быстрый Чеклист Перед Коммитом

- Entity IDs есть в [data/entities.yaml](/Users/stadnyk/MEGA/Aerocool/data/entities.yaml).
- Для JSON-LD используются только `confirmed` сущности.
- `product_group_id` заполнен только на товарных страницах.
- ProductGroup не переводится в `confirmed` без видимой навигации вариантов.
- Украинская и русская версии страницы синхронны.
- `lastmod` обновлен.
- `npm run build` проходит без ошибок.

## 15. Самая Простая Формула

Если сомневаешься, думай так:

> `about_entities` — главная тема страницы.
> `mentions_entities` — важные связанные сущности.
> `product_group_id` — группа вариантов товара.
> `data/entities.yaml` — список разрешенных id.
> Видимый текст страницы — доказательство, что связь честная.

Entity Registry нужен не для того, чтобы сделать JSON-LD больше. Он нужен, чтобы сайт Aerocool говорил о бренде, сериях, моделях и условиях аккуратно, одинаково и понятно для людей, поисковых систем и AI-поиска.
