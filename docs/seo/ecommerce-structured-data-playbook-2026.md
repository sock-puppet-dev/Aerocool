# E-Commerce Structured Data Playbook 2026

Актуально на `2026-05-13`.

Этот документ переводит `Guide to E-Commerce Structured Data` от SchemaApp в локальные правила для товарного каталога `Aerocool Ukraine`.

Главная мысль: e-commerce structured data нужна не только для синтаксически валидного `Product`, а для полного пути покупателя в поиске: товар, цена, наличие, изображения, рейтинг, FAQ, инструкции, хлебные крошки, варианты и доверие.

Документ синхронизирован с текущими Google Search Central правилами для `Product`, merchant listings и product variants. Внешние SchemaApp материалы используются как стратегический слой, но eligibility для Google rich results всегда проверять по официальной документации Google.

Текущий порядок внедрения для ratings, product facts, `ProductGroup` и production gate описан в [2026-05-07-documentation-refresh-and-project-action-plan.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-05-07-documentation-refresh-and-project-action-plan.md).

## 1. Связь С Текущими Документами

Этот playbook дополняет:

- `docs/seo/json-ld-graph-audit-roadmap-2026.md` — технический roadmap JSON-LD graph;
- `docs/seo/schema-markup-quality-checklist-2026.md` — QA schema.org-графа;
- `docs/content/content-seo-checklist-2026.md` — требования к видимому контенту;
- `docs/content/front-matter-reference.md` — источники product metadata;
- `docs/content/seo-image-shortcode.md` — правила видимых изображений.
- `docs/audits/2026-05-13-documentation-2026-best-practices-sync-audit.md` — базовая синхронизация документации с лучшими практиками 2026.

Практическая граница:

- JSON-LD roadmap отвечает, что уже есть и что внедрять в шаблонах;
- этот документ отвечает, какие e-commerce rich result возможности использовать, а какие откладывать или запрещать.

## 2. Текущий Статус Aerocool

В проекте уже есть:

- `Product`;
- `Offer`;
- `price`;
- `availability`;
- `priceValidUntil`;
- `sku`;
- `brand`;
- `seller`;
- `shippingDetails`;
- `hasMerchantReturnPolicy`;
- `acceptedPaymentMethod`;
- `WarrantyPromise`, если заполнено в front matter;
- `AggregateRating`, если заполнены `rating.value` и `rating.count`;
- `BreadcrumbList`;
- `FAQPage` для канонического `/faq/`;
- единый `ImageObject` для primary image страницы.

Главный риск: данные e-commerce schema должны совпадать с видимым контентом и единым источником правды. Для Aerocool таким источником является product front matter; владелец бизнес-значений — команда Aerocool Украина. Видимый commercial block и `/faq/` подтверждают те же значения. Особенно это касается цены, `priceValidUntil`, наличия, рейтинга, количества отзывов, доставки, возврата и гарантии. Текущее значение `priceValidUntil: 2027-12-31` подтверждено командой Aerocool Украина `2026-05-07`.

## 3. Essential Product Properties

Для товарных страниц Aerocool минимальный e-commerce набор:

| Поле | Где Живет | Статус |
| --- | --- | --- |
| Product name | `title` / visible H1 | Обязательно |
| Product description | `description`, summary, visible body | Обязательно |
| Price | front matter + visible commercial block | Обязательно для rich result |
| Currency | `UAH` | Обязательно |
| Availability | front matter + visible commercial block | Обязательно |
| Brand | schema `Brand @id` | Обязательно |
| SKU | front matter + visible commercial block | Обязательно |
| Product images | `image`, `cover.image`, visible `seo-image` | Обязательно |
| Breadcrumbs | template layer | Обязательно для product pages |
| Reviews / rating | только реальные видимые данные | Опционально и рискованно |
| MPN / GTIN | front matter, если официально известны | Желательно |
| Warranty | front matter + visible product/FAQ facts | Желательно |
| Shipping / returns | front matter + Product schema + visible commercial block + `/faq/` | Желательно |

Если поле попадает в JSON-LD, но не видно пользователю, это потенциальный schema quality риск.

## 4. Rich Result Portfolio

| Возможность | Применимость Для Aerocool | Условие |
| --- | --- | --- |
| Product rich result | Да | Product page с ценой, наличием, изображением и SKU |
| Product snippet / merchant listing | Да, после production-проверки | Видимые и актуальные merchant facts |
| Google Images product visibility | Да | Качественные crawlable product images |
| Breadcrumb rich result | Да | Реальная иерархия URL и `BreadcrumbList` |
| FAQ rich result | Ограниченно | FAQ должен быть видимым; Google часто ограничивает показ FAQ rich results |
| Review snippet | Только при реальных отзывах | Нужны видимые отзывы/рейтинг и надежный источник |
| HowTo | Только при реальных инструкциях | Пошаговая инструкция должна быть видна на странице |
| Video rich result | Только при реальном видео | Видео должно быть видимым и crawlable |

Не строить стратегию вокруг одного rich result. Google может не показать enhancement даже при валидной structured data.

## 5. Reviews And Ratings Policy

PDF подчеркивает коммерческую пользу reviews и aggregate rating, но для Aerocool это зона повышенного риска.

Правила:

- не добавлять `Review`, если на странице нет реальных видимых отзывов;
- не добавлять дополнительные `AggregateRating`, если источник рейтинга не подтвержден;
- не использовать вымышленные отзывы или “маркетинговые” звезды;
- если рейтинг остается в Product JSON-LD, должен быть видимый блок с `ratingValue`, `reviewCount` и понятным источником;
- если источник рейтинга нельзя подтвердить, удалить `aggregateRating` из schema и front matter.

Лучше временно не иметь review rich result, чем потерять доверие к product structured data.

## 6. FAQ, HowTo And Support Content

FAQ полезен для e-commerce не только как rich result, но и как слой снятия возражений.

Для Aerocool FAQ должен покрывать:

- выбор серии;
- материалы;
- механизмы и регулировки;
- посадку, рост и вес;
- доставку;
- оплату;
- возврат;
- гарантию;
- сборку;
- консультацию перед покупкой.

`HowTo` не добавлять заранее. Он допустим только для реальных пошаговых материалов, например:

- как собрать кресло;
- как настроить Synchronous Tilt;
- как отрегулировать подлокотники;
- как ухаживать за материалом.

Условие: шаги, изображения и результат должны быть видимыми в контенте. Без этого `HowTo` не использовать.

## 7. Product Images

Для e-commerce structured data изображения — не декоративный слой, а часть товарного понимания.

Правила:

- сохранять текущий стандарт `image + cover.image + seo-image`;
- primary image должен показывать реальный товар, а не абстрактную иллюстрацию;
- для product rich results и Google Images желательно иметь высокое разрешение;
- позже расширить до набора изображений `1:1`, `4:3`, `16:9`;
- добавить изображения деталей: спинка, материал, механизм, подлокотники, база, ролики;
- не добавлять изображения в JSON-LD, если они не присутствуют в видимом HTML или не являются crawlable.

## 8. Product Variants Strategy

PDF выделяет три типовых подхода к вариантам товара.

| Стратегия | Смысл | Для Aerocool |
| --- | --- | --- |
| Simplified / aggregate offers | Один product, несколько offers | Не основной вариант: может скрыть различия моделей и материалов |
| Each variant as individual Offer | Один product, варианты как offers | Подходит, если варианты отличаются только коммерчески |
| Each variant as product model | Каждый вариант как отдельный product/model | Ближе к текущей структуре Aerocool |

Текущий проект сознательно хранит варианты товаров отдельными URL. Поэтому основной будущий путь:

- оставить отдельные product pages для вариантов;
- добавить видимую навигацию между вариантами;
- спроектировать `ProductGroup`;
- связать варианты через `isVariantOf` или `inProductGroupWithID`;
- использовать variant-specific `sku`, `color`, `material`, `image`, `offers`.

Не внедрять `ProductGroup`, пока нет понятной видимой навигации или ссылок между вариантами.

## 9. E-E-A-T For E-Commerce

Schema помогает E-E-A-T только тогда, когда усиливает реальный контент.

Для Aerocool доверие строится через:

- официальность бренда;
- понятный каталог;
- видимые характеристики;
- честные ограничения товара;
- сравнение с соседними сериями;
- FAQ;
- контакты;
- условия доставки, оплаты, возврата и гарантии;
- реальные отзывы, если они есть;
- статьи и гайды, которые помогают выбрать товар.

Нельзя компенсировать слабый видимый контент расширенной schema-разметкой.

## 10. Implementation Backlog

### P0

1. Проверить источник `aggregateRating` и решить: подтвердить или убрать.
2. Поддерживать product front matter как единый источник правды для Product schema.
3. Держать видимый commercial block, `/faq/` и `Product` JSON-LD синхронными с front matter по доставке, возврату, оплате и гарантии.
4. При каждом изменении product facts брать подтверждение у команды Aerocool Украина.

### P1

1. Спроектировать `ProductGroup` для вариантов.
2. Добавить видимую навигацию между вариантами товара.
3. Расширить product image strategy до набора `1:1`, `4:3`, `16:9`.
4. Добавить видимые таблицы характеристик как источник для `additionalProperty`.
5. Подготовить реальные HowTo-материалы только там, где есть пошаговый контент.

### P2

1. Добавить `Review` только после появления реальных видимых отзывов.
2. Добавить `VideoObject` только после появления реальных product videos.
3. Рассмотреть отдельные страницы доставки, оплаты, возврата и гарантии, если FAQ станет слишком перегруженным.
4. Вынести merchant policy на уровень Organization или отдельной policy-сущности после стабилизации видимых policy pages.

## 11. Что Не Делать

Не делать:

- не добавлять fake reviews;
- не добавлять fake ratings;
- не размечать HowTo без видимых шагов;
- не размечать VideoObject без реального видео;
- не добавлять product images только в JSON-LD без видимого/crawlable слоя;
- не скрывать различия вариантов товара агрегированной offer-структурой;
- не рассчитывать, что FAQ rich result будет стабильно показываться.

## 12. Контрольный Вывод

Для Aerocool главный вывод из `Guide to E-Commerce Structured Data`: текущий Product schema-фундамент уже есть, но e-commerce structured data должна развиваться вокруг покупательского пути.

Приоритеты:

- реальные product facts;
- видимые commercial blocks;
- качественные product images;
- честная review/rating policy;
- FAQ и будущие HowTo как поддержка выбора;
- ProductGroup для вариантов;
- синхронизация schema, content и front matter.
