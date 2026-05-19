# Карта Tailwind Plus UI-Секций Для Aerocool

Обновлено: 2026-05-19.

## Зачем Нужен Этот Документ

Этот документ фиксирует рабочую карту UI-блоков для проекта `Aerocool Ukraine` на базе трех групп Tailwind Plus:

- [Marketing UI Blocks](https://tailwindcss.com/plus/ui-blocks#product-marketing)
- [Application UI Blocks](https://tailwindcss.com/plus/ui-blocks#product-application-ui)
- [Ecommerce UI Blocks](https://tailwindcss.com/plus/ui-blocks#product-ecommerce)

Важно: Tailwind Plus используется здесь как **референс структуры и UX-паттернов**, а не как источник для механического копирования. Реализация должна учитывать текущий стек проекта: `Hugo 0.161.0`, `Tailwind CSS 4`, локальные overrides в `layouts/`, контент в `content/`, schema.org partials в `layouts/_partials/_schema` и текущий visual layer в `assets/css/main.css`.

## Базовые Правила Внедрения

| Правило | Что Это Значит Для Проекта |
|---|---|
| Сначала локальные overrides | Правки вносятся в `layouts/`, `content/`, `assets/css/main.css` и `data/`, а не напрямую в `themes/PaperMod`, если это можно решить локально. |
| Tailwind Plus не копируется слепо | Берем структуру секции, UX-логику, responsive-поведение и типы элементов, но адаптируем визуальный слой под Aerocool. |
| Блок должен решать задачу страницы | Каждый UI-блок должен помогать выбрать кресло, перейти в каталог, сравнить модели, понять условия покупки или связаться с Aerocool. |
| SEO и UX должны совпадать | Видимый текст, внутренние ссылки, product facts и JSON-LD не должны расходиться. |
| Не добавлять тяжелый JS без причины | Для базового каталога, FAQ, контактов, таблиц и карточек сначала использовать статический Hugo/Tailwind. |
| Не плодить SEO-мусорные URL | Фильтры каталога должны быть UX-инструментом, а не генератором лишних индексируемых страниц. |
| Двуязычность обязательна | Если блок появляется в `uk`, должна быть синхронная `ru`-версия, если задача явно не ограничена одним языком. |
| Проверять сборку | После реализации запускать минимум `npm run build`; для шаблонов и CSS дополнительно проверять главную, листинг и детальную страницу в обоих языках. |

## Сводная Таблица По Страницам И Блокам

| Где В Aerocool | Четкое Пояснение | Tailwind Plus Ссылка | UI-Секция | Рекомендованный Вариант | Зачем Блок Нужен | Что Учесть В Текущем Стеке | Статус На 2026-05-19 | Приоритет |
|---|---|---|---|---|---|---|---|---|
| Главная, первый экран | Доработать текущий `home-hero`: фото кресла, каталог, помощь с выбором, быстрый вход в серии. | [Marketing](https://tailwindcss.com/plus/ui-blocks#product-marketing) | Hero Sections | Split with image | Быстро объяснить, что сайт продает кресла Aerocool в Украине, и дать вход в каталог. | Текущий hero живет в `layouts/_shortcodes/home-hero.html`; LCP-изображение должно оставаться `loading="eager"` и `fetchpriority="high"`. | Запланировано | P1 |
| Главная, блок серий | Три основных входа: `SKY`, `WING`, `XTAL`. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Category Previews | Three-column with description | Сократить путь пользователя к нужной серии. | Использовать реальные фото/обложки серий, локализованные ссылки `/products/sky/`, `/products/wing/`, `/products/xtal/` и `/ru/...`. | Запланировано | P0 |
| Главная, популярные модели | 4-6 товарных карточек: фото, цена, наличие, серия, материал, регулировки. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Product Lists | Card with full details | Дать коммерческий вход в товары без перехода через весь каталог. | Данные брать из front matter товаров; не дублировать цену/наличие вручную в отдельных data-файлах без единого источника правды. | Запланировано | P1 |
| Главная, преимущества выбора | Объяснить `Synchronous Tilt`, `7D/8D/11D`, материалы, доставку/гарантию. | [Marketing](https://tailwindcss.com/plus/ui-blocks#product-marketing) | Bento Grids | Two row bento grid | Визуально разложить сложные причины выбора. | Не делать декоративный bento без пользы; каждый блок должен вести к статье, FAQ, серии или товару. | Запланировано | P1 |
| Главная, маршрут выбора | Сценарий -> серия -> материал -> модель. | [Marketing](https://tailwindcss.com/plus/ui-blocks#product-marketing) | Feature Sections | Offset with feature list | Поддержать UX и SEO-интент “как выбрать кресло”. | Логика должна совпадать с FAQ и статьями, особенно с `how-to-choose-aerocool-chair`. | Запланировано | P1 |
| Главная, статьи/гайды | Показать статьи, которые помогают выбрать кресло и ведут в каталог. | [Marketing](https://tailwindcss.com/plus/ui-blocks#product-marketing) | Blog Sections | With featured post | Связать informational traffic с money-разделами. | Использовать реальные статьи из `content/articles`; карточки не должны выглядеть как товарные. | Запланировано | P2 |
| Главная, финальный CTA | “Не уверены, какая модель подходит?” -> FAQ или контакты. | [Marketing](https://tailwindcss.com/plus/ui-blocks#product-marketing) | CTA Sections | Simple justified | Закрыть сомнения и направить в поддержку выбора. | CTA должен быть компактным, без маркетингового hero-дубля внизу страницы. | Запланировано | P2 |
| `/products/`, верх страницы | Заголовок каталога, описание, хлебные крошки, быстрые действия. | [Application](https://tailwindcss.com/plus/ui-blocks#product-application-ui) | Page Headings | With actions and breadcrumbs | Сделать каталог похожим на каталог, а не на блоговый листинг. | Согласовать с `layouts/list.html`, `breadcrumbs.html`, `page-h1.html`; не возвращать блоговую meta-строку. | Запланировано | P0 |
| `/products/`, быстрый вход в серии | Карточки `SKY`, `WING`, `XTAL` перед списком товаров. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Category Previews | Three-column | Дать быстрый выбор серии до фильтров и списка товаров. | Можно реализовать как partial для переиспользования на главной и в каталоге. | Запланировано | P0 |
| `/products/`, фильтры | Фильтры по серии, материалу, регулировкам, сценарию. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Category Filters | With inline actions and expandable sidebar filters | Ускорить подбор модели. | Без генерации индексируемых filter URL; для первого этапа лучше статические группы или noindex-параметры. | Запланировано | P1 |
| `/products/`, карточки товаров | Заменить блоговые карточки PaperMod на каталоговые товарные карточки. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Product Lists | With supporting text или Card with full details | Показать фото, цену, наличие и ключевые характеристики прямо в списке. | Данные брать из product front matter: цена, наличие, серия, материал, регулировки, механизм. | Запланировано | P0 |
| `/products/`, статусы | `InStock`, серия, материал, `11D`, `SYNC5` как компактные метки. | [Application](https://tailwindcss.com/plus/ui-blocks#product-application-ui) | Badges | Flat with dot или Pill with border and dot | Быстро дать сканируемые product facts. | Цвета бейджей должны быть спокойными; не превращать список в набор ярких маркетинговых плашек. | Запланировано | P1 |
| `/products/`, сравнение моделей | Таблица: модель, серия, материал, регулировки, механизм, цена. | [Application](https://tailwindcss.com/plus/ui-blocks#product-application-ui) | Tables | With stacked columns on mobile | Помочь выбрать между моделями без открытия каждой карточки. | На mobile использовать stacked layout; таблица не должна ломать ширину `.main`. | Запланировано | P1 |
| Страница серии, первый экран | Например `/products/wing/`: показать платформу серии, ключевые факты и фото. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Product Features | With header, images, and descriptions | Объяснить, чем серия отличается от других. | Серии сейчас `section`-страницы; правки делать через локальный list/section partial или отдельный template, не через тему. | Запланировано | P1 |
| Страница серии, материалы | `Racer`, `Loft Air`, `Mesh` как понятные варианты внутри серии. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Category Previews | Three-column with description | Помочь выбрать материал до выбора модели. | Описания материалов должны совпадать со статьей о `Racer vs Loft Air vs Mesh` и FAQ. | Запланировано | P1 |
| Страница серии, модели серии | Все модели серии в товарном виде. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Product Lists | With inline price and CTA link | Свести пользователя от серии к конкретному товару. | Использовать те же product card helpers, что и в `/products/`, чтобы не плодить разный UI. | Запланировано | P0 |
| Страница серии, сравнение серий | `WING` vs `SKY` vs `XTAL`: посадка, регулировки, механизм, материалы. | [Application](https://tailwindcss.com/plus/ui-blocks#product-application-ui) | Tables | With hidden columns on mobile | Показать разницу между платформами. | Не скрывать критически важные коммерческие факты на mobile; если скрываются колонки, должна быть stacked-версия. | Запланировано | P2 |
| Страница серии, FAQ | Вопросы только по серии: кому подходит, чем отличается, какой материал выбрать. | [Marketing](https://tailwindcss.com/plus/ui-blocks#product-marketing) | FAQs | Two columns | Снять сомнения на уровне серии. | Не дублировать весь `/faq/`; вопросы должны быть специфичны для серии. | Запланировано | P2 |
| Товарная страница, первый экран | Галерея, название, цена, наличие, `SKU/MPN/GTIN`, гарантия, CTA. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Product Overviews | With image gallery and expandable details | Превратить страницу товара в полноценную e-commerce карточку. | Сохранять product facts в front matter как единый источник правды; schema `Product` должна совпадать с видимым блоком. | Запланировано | P0 |
| Товарная страница, условия покупки | Доставка, гарантия, возврат, оплата рядом с товарным решением. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Incentives | 3-column with icons and supporting text | Снять основные коммерческие возражения до CTA. | Значения должны совпадать с `/faq/` и merchant facts товара. | Запланировано | P0 |
| Товарная страница, характеристики | Структурировать характеристики вместо длинного markdown-списка. | [Application](https://tailwindcss.com/plus/ui-blocks#product-application-ui) | Description Lists | Two-column или Left-aligned striped | Сделать характеристики сканируемыми. | Для характеристик лучше собрать helper из front matter, а не писать таблицу вручную в body каждой страницы. | Запланировано | P1 |
| Товарная страница, детали | Характеристики, доставка, гарантия, FAQ. | [Application](https://tailwindcss.com/plus/ui-blocks#product-application-ui) | Tabs | Tabs with underline | Сгруппировать подробности без бесконечной простыни. | Без JS tabs можно реализовать как якорные секции или `details`; JS tabs отложить до необходимости. | Запланировано | P2 |
| Товарная страница, фичи | Спинка, механизм, подлокотники, материал, база/ролики. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Product Features | With alternating sections | Показать реальные преимущества конструкции. | Нужны реальные изображения или аккуратные локальные product visuals; не использовать абстрактные декоративные блоки. | Запланировано | P1 |
| Товарная страница, альтернативы | Похожие модели внутри серии или варианты материала/цвета. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Product Lists | With color swatches and horizontal scrolling | Удержать пользователя, если текущая модель не подходит. | Color swatches использовать только для реальных цветов/вариантов. | Запланировано | P2 |
| Товарная страница, отзывы | Только после реальных approved отзывов из Netlify Database. | [Ecommerce](https://tailwindcss.com/plus/ui-blocks#product-ecommerce) | Reviews | With summary chart | Добавить social proof без фейковых рейтингов. | До build-time export approved отзывов не выводить `AggregateRating` и `Review` в JSON-LD. | Отложено | P3 |
| `/faq/` | Разделить вопросы: выбор, доставка, гарантия, материалы, регулировки. | [Marketing](https://tailwindcss.com/plus/ui-blocks#product-marketing) | FAQs | Side-by-side | Сделать FAQ сканируемым и тематическим. | Реализовано через `faq_groups` в front matter и `layouts/_shortcodes/faq-list.html`; schema flatten-ит группы в единый `FAQPage`. | Выполнено | Done |
| `/contact/` | Форма + контакты + быстрые ссылки на FAQ и каталог. | [Marketing](https://tailwindcss.com/plus/ui-blocks#product-marketing) | Contact Sections | Side-by-side grid | Дать способ связи и направить пользователя в полезные разделы до отправки формы. | Реализовано в `layouts/_shortcodes/contact.html`; markdown содержит только `{{< contact >}}`; график согласован с `Organization` JSON-LD. | Выполнено | Done |
| Формы и поля | Поля формы, подсказки, ошибки, валидация. | [Application](https://tailwindcss.com/plus/ui-blocks#product-application-ui) | Input Groups | Input with label and help text | Улучшить понятность и доступность формы. | Labels и HTML validation уже есть. Если подсказки должны быть внутри поля, использовать `placeholder`, но `label` сохранять обязательно. | Частично | P2 |
| Успех/ошибка формы | Сообщения после отправки или ошибки заполнения. | [Application](https://tailwindcss.com/plus/ui-blocks#product-application-ui) | Alerts | With description или With accent border | Сделать success/error состояния заметными и понятными. | Без JS можно оформить success page как alert. Error alert после попытки отправки без JS полноценно не сделать; можно оставить browser validation и статичный info/warning alert. | Частично | P2 |
| Footer | Карта сайта: серии, товары, статьи, FAQ, контакты, соцсети. | [Marketing](https://tailwindcss.com/plus/ui-blocks#product-marketing) | Footers | 4-column with company mission | Дать понятную нижнюю навигацию и trust links. | Footer должен оставаться компактным; глобальные соцсети уместны здесь, а не отдельным блоком на `/contact/`. | Запланировано | P2 |

## Приоритет Внедрения

| Очередь | Блоки | Почему Именно Так |
|---|---|---|
| P0 | `/products/` heading, category previews, product cards; product overview; product incentives; series product lists | Это напрямую влияет на каталог, коммерческую ясность и выбор модели. |
| P1 | Главная: серии, популярные модели, bento/feature choice route; product description lists; series hero/materials | Это улучшает маршрут выбора и внутреннюю перелинковку. |
| P2 | Forms input polish, alerts, footer, series FAQ, comparison tables, alternatives | Это важно для качества UX, но не блокирует базовый каталог. |
| P3 | Reviews, quickviews, advanced interactive filters | Это требует подтвержденных данных или дополнительного JS/инфраструктуры. |

## Что Не Брать Сейчас

| Tailwind Plus Блок | Почему Не Сейчас | Когда Вернуться |
|---|---|---|
| Shopping Carts | На сайте пока нет полноценной корзины. | После появления cart-flow или checkout. |
| Checkout Forms | Нет собственного checkout-flow. | После подтверждения модели оформления заказа. |
| Order Summaries | Нужны только при оформлении заказа. | После появления корзины или заказа на сайте. |
| Order History | Нужен только для кабинета пользователя. | Если появится личный кабинет. |
| Pricing Sections | Это SaaS-паттерн, не каталог кресел. | Только если появятся тарифы услуг, а не товары. |
| Team Sections | Не влияет на выбор товара и коммерческий путь. | Если команда Aerocool Украина будет публично представлена как trust-фактор. |
| Logo Clouds | Нужны только при реальных партнерах, медиа или дистрибьюторах. | После подтверждения официальных партнеров/публикаций. |
| Product Quickviews | Добавляет модалки и JS, а базовый каталог еще важнее. | После стабилизации product cards, product pages и фильтров. |

## Проверка После Реализации Блока

| Проверка | Что Смотреть |
|---|---|
| `npm run build` | Сборка Hugo должна проходить без ошибок. |
| Двуязычность | Проверить `uk` и `ru` версии, локализованные ссылки и тексты. |
| Responsive | Проверить mobile и desktop; таблицы, карточки и формы не должны ломать ширину. |
| SEO | `title`, `description`, visible `H1`, breadcrumbs, canonical, hreflang и schema не должны расходиться. |
| Schema.org | Product, FAQ, ContactPage, Organization и BreadcrumbList должны совпадать с видимым контентом. |
| Core Web Vitals | Не добавлять тяжелый JS и изображения без размеров; LCP-изображения должны иметь правильный priority. |
| Внутренняя перелинковка | Блоки должны вести в каталог, серии, товары, FAQ, контакты или профильные статьи. |
