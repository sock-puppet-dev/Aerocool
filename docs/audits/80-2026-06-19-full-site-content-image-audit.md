# Полный Аудит Текстов И Изображений Всего Сайта 2026-06-19

Дата полного аудита: 2026-06-19. Актуализация перелинковки: 2026-06-21.

## 1. Охват

Проверены:

- **100** Markdown-файлов: **50** логических страниц на украинском и их **50** русских версий;
- главная, About, Contact, FAQ, Image License, Search и Contact Success;
- хабы `/articles/`, `/news/`, `/products/`;
- **3** страницы серий;
- **12** товарных вариантов;
- **16** evergreen-статей;
- **9** новостей;
- **168** raster/vector assets внутри `content/` и **13** assets в `assets/images` и `static`;
- front matter, заголовки, объем, внутренние ссылки, shortcode `seo-image`, page bundles, размеры, форматы, веса и SHA-256 дубликаты;
- визуальные contact sheets covers, schema crops, inline и product assets.

Аудит оценивает качество текущего репозитория. Он не гарантирует первое место в SERP и не заменяет Search Console, реальную выдачу, product feed, PageSpeed Insights и юридическое подтверждение бизнес-фактов.

### Актуализация Перелинковки 2026-06-21

После точечного усиления `/about/`, семи evergreen-статей и доступных имен CTA товарных карточек повторно проверен полный production-граф:

- **132** HTML-страницы и **96** индексируемых canonical URL в production-сборке: **48** UK и **48** RU;
- **7 086** внутренних ссылок и **2 412** уникальных связей между индексируемыми страницами;
- максимальная глубина от главной — **2** клика;
- broken links, orphan pages, ссылки на неcanonical URL, языковые пересечения и расхождения sitemap/canonical — **0**;
- **1 488** локальных fragment links проверены, broken fragment links — **0**; reciprocal hreflang errors — **0**;
- пустых `href`, `href="#"` и `javascript:` links — **0**; контактные ссылки `mailto:` / `tel:` — **6 / 2**;
- `/about/` получает **5** контекстных источников вместо **2**;
- пять ранее слабых evergreen-статей получают по **11-12** входящих ссылок в основной области;
- `what-is-fully-replaceable-design` получает **12** входящих ссылок в основной области, `what-is-dual-backrest` — **13**; UK/RU-показатели совпадают;
- **48** неинформативных анкоров `Подробнее` / `Детальніше` заменены доступными именами с `$page.Title`; анкоров без названия страницы назначения осталось **0**;
- UK/RU-графы и variant links остаются синхронными.
- пять внешних social profile URL повторно вернули HTTP **200**.

Текущая оценка системы internal linking после актуализации — **9.5 / 10**. Значение **9.2 / 10** в исходной таблице ниже сохранено как снимок полного аудита от 2026-06-19. SEO-эффект на основном домене остается заблокирован до снятия `noindex,nofollow` с production-сборки; это deployment-риск, а не дефект графа ссылок.

Подробные метрики, правила поддержки и P0-P3 roadmap вынесены в актуальный [контракт перелинковки и качества ссылок Aerocool 2026](../seo/81-internal-linking-strategy-2026.md).

## 2. Короткий Вывод

Текстовый слой зрелый: языковые пары синхронны, основные страницы достигли внутренних ориентиров, статьи и новости структурно полезны, а internal linking развит. Массово добавлять новые абзацы не нужно.

Главный открытый риск — **товарные изображения**. Все **12** `content/products/**/01-front.png` побайтно одинаковы и показывают один объект для разных серий, цветов и материалов. Два дополнительных SKY-файла `360.png` и `lite.png` также одинаковы и содержат видимую надпись `TEST`. Это конфликтует с ролью изображения как доказательства конкретного товара.

Второй риск — визуальная однотипность редакционного слоя. Article/news covers и inline technically сильные, но часто повторяют один AI-assisted мотив: темная студия, центральное кресло, cyan/violet свет и круглая платформа. Уникальные файлы есть, но визуальный язык слишком легко распознается как серийная генерация.

## 3. Приоритеты

### P1. Заменить Недостоверный Product Image Layer

1. Получить official assets для каждого SKU/MPN/GTIN.
2. Заменить все 12 одинаковых `01-front.png` точными изображениями варианта.
3. Удалить или заменить `content/products/sky/360/360.png` и `content/products/sky/lite/lite.png` с надписью `TEST`.
4. Для каждой карточки подготовить минимум front, side/back, material, control/mechanism и in-scale кадр.
5. После замены проверить product gallery, LCP preload, list cards, OG и Product JSON-LD.

Почему это P1: Google требует, чтобы product image представляло фактический размеченный товар. Технически корректный `alt` не исправляет неверный объект в кадре.

### P2. Усилить Factual Evidence

- заменить наиболее важные AI material/mechanism visuals официальными macro и close-up;
- добавить реальные размеры и in-scale сцены там, где они влияют на выбор;
- для About и Contact использовать реальные фото команды/места/процесса, если права и факты подтверждены;
- не добавлять новые pure-AI кресла, пока не закрыт factual backlog.

### P2. Разнообразить Композиции

Новые covers и inline должны чередовать room context, macro, side profile, back view, top-down, controls, mechanism, lineup и exploded view. Новая dark-studio сцена допустима только когда она добавляет отдельный смысл.

### P3. Сократить Мета-Текст При Следующей Редактуре

Хабы и About местами подробно объясняют редакционную логику сайта. Это полезно для доверия, но часть формулировок можно заменить более сильными доказательствами: кто отвечает за данные, какие источники используются, как устроена консультация, какой реальный процесс проверки товара.

## 4. Проверки Текстового Слоя

| Проверка | Результат |
|---|---:|
| Пары page bundle `index.md` / `index.ru.md` | **42/42 OK** |
| Расхождение структуры заголовков в языковых парах | **0** |
| Расхождение front matter keys в языковых парах | **0** |
| Разница очищенного объема более 15% | **0** |
| Product pages ниже внутреннего ориентира 6000 знаков | **0/12** |
| Series pages ниже внутреннего ориентира 6000 знаков | **0/3** |
| About ниже внутреннего ориентира 10000 знаков | **0/1** |
| Products hub ниже внутреннего ориентира 7000 знаков | **0/1** |

Страницы Contact и FAQ рендерят основной текст из shortcode/front matter, поэтому нулевой объем Markdown-body для них не означает пустую страницу.

Сходство товарных текстов закономерно выше внутри одной платформы: максимальный Jaccard по 5-word shingles — около **41%** у двух цветовых XTAL Loft Air и около **40%** у WING Loft Air. Это не точные дубликаты, но при следующей редактуре нужно усиливать variant-specific материал, цвет, уход и визуальные доказательства, а не добавлять еще один общий абзац о серии.

## 5. Постраничная Матрица: Главная И Служебные Страницы

| URL / source | Текст | Что добавить или изменить | Изображения |
|---|---|---|---|
| `/` — `content/_index.md` | Маршрут по SKY/WING/XTAL понятен; body и shortcodes вместе закрывают первый выбор. | Не расширять общим SEO-текстом. Добавить только подтвержденный proof-блок: реальные условия консультации/доставки/гарантии или данные выбора. | Hero оставить. Product cards станут достоверными только после P1. Future: один реальный lineup/in-scale workplace кадр вместо еще одной dark studio сцены. |
| `/about/` — `content/about/index.md` | Объем и структура сильные, но много текста о редакционной логике сайта. | При подтверждении добавить историю локального представительства, ответственную команду, официальный статус, процесс консультации и проверки данных. | Нужны **2-4** реальные фото: команда, офис/шоурум, консультация, сервисный процесс. Не генерировать фиктивное помещение. |
| `/contact/` — `content/contact/index.md` + `contact.html` | Контакты, сценарии обращения, часы и форма понятны. | Указать ожидаемый срок ответа и юридическое имя только после бизнес-подтверждения. Проверять часы и адрес операционно. | Декоративный visual не нужен. Полезно одно реальное фото входа/офиса/команды как подтверждение места. |
| `/faq/` — `content/faq/index.md` | Большой FAQ сгруппирован и синхронизирован, прямые ответы есть. | Не наращивать количеством вопросов ради schema. Обновлять при изменении фактов товаров и политик. | Новая декоративная картинка не нужна. Для сложных механизмов вести в статьи с factual diagrams. |
| `/image-license/` — `content/image-license/index.md` | Условия понятны, но это правовая политика. | Нужна финальная проверка владельцем прав/юристом, особенно формулировок о правообладателе и разрешении. | Изображение в теле не нужно; root cover достаточно для metadata. |
| `/contact/success/` — `content/contact-success/index.md` | Короткая функциональная `noindex`-страница. | Не расширять для SEO. Проверить понятный следующий шаг и возврат в каталог. | Не добавлять. |
| `/search/` — `content/search.md` | Функциональная `noindex`-страница. | Не добавлять SEO-текст; улучшения относятся к search UX и пустым результатам. | Не добавлять. |

Русские URL `/ru/.../` получают те же рекомендации; факты и структура должны оставаться симметричными.

## 6. Постраничная Матрица: Хабы И Серии

| URL / source | Текст | Что добавить или изменить | Изображения |
|---|---|---|---|
| `/articles/` — `content/articles/_index.md` | Маршруты чтения и связь с каталогом раскрыты. | Не добавлять новые общие разделы. При редактуре сократить мета-объяснения и поднять наверх 3-4 decision routes. | Card covers закрывают visual need; приоритет — разнообразие новых статей, не новый hub image. |
| `/news/` — `content/news/_index.md` | Отличие новости от статьи объяснено, архив связан с каталогом. | Не растягивать хаб. Добавить только реальную политику обновлений или фильтрацию по событиям при появлении объема. | Covers достаточны; следить, чтобы соседние карточки не повторяли одну dark-studio композицию. |
| `/products/` — `content/products/_index.md` | Сценарии, серии, материалы и путь выбора раскрыты. | Текст не расширять. Улучшать product finding, comparison и подтвержденные условия покупки. | P1: точные thumbnails всех 12 SKU. Future: neutral official lineup SKY/WING/XTAL. |
| `/products/sky/` — `content/products/sky/_index.md` | Разница Lite/360 и сценарии описаны. | Добавить только подтвержденную таблицу размеров/регулировок, если данных еще нет в UI. | Official SKY Lite + SKY 360 lineup; detail сравнения 1D/3D X 360, базы и роликов. |
| `/products/wing/` — `content/products/wing/_index.md` | Racer/Loft Air/Mesh и 11D-платформа раскрыты. | Не повторять пять карточек. Усилить различия ухода, температуры и контакта только подтвержденными фактами. | Official lineup пяти вариантов; dual-backrest close-up; три factual material macro. |
| `/products/xtal/` — `content/products/xtal/_index.md` | Логика 7D, материалов и сменных элементов понятна. | Не обещать доступность replacement parts без подтверждения. Добавить точные ограничения/порядок сервиса, если он утвержден. | Official lineup пяти вариантов; replaceable element/exploded view; три factual material macro. |

## 7. Постраничная Матрица: Товары

Для всех 12 карточек текущий текст достаточен по объему. Приоритет — не новые абзацы, а точность facts, variant-specific формулировки и product images.

| URL | Текстовый следующий шаг | Обязательный shot list |
|---|---|---|
| `/products/sky/360/` | Проверить все заявления **11D**, **SYNC5**, 2D сиденье, базу и ролики по official sheet; добавить реальные габариты, диапазоны регулировок и допустимую нагрузку только при наличии источника. | Exact SKY 360 front 3/4; side/back; 3D X 360 armrest; 2D seat/lumbar; SYNC5 underside; steel base/65 mm rollers; in-scale desk. |
| `/products/sky/lite/` | Проверить **8D**, **SYNC4**, 1D сиденье/подлокотники; не описывать простоту как недостаток. | Exact SKY Lite front 3/4; side/back; 1D controls; SYNC4 underside; nylon base/50 mm rollers; Mesh macro; compact in-scale workplace. |
| `/products/wing/loft-air-dark-grey/` | Сохранить отличия цвета и ощущений без неподтвержденных thermal claims; убрать универсальные фразы при следующей редактуре. | Exact Dark Grey front; side/back; Loft Air macro в нейтральном свете; dual backrest; 4D X 360; SYNC5; in-scale. |
| `/products/wing/loft-air-light-grey/` | Сделать текст варианта заметно специфичнее по цвету, уходу и интерьерному сочетанию, но только по наблюдаемым фактам. | Exact Light Grey front; тот же controlled angle для честного color compare; side/back; Loft Air macro; dual backrest; controls; in-scale. |
| `/products/wing/mesh-black/` | Усилить отличие Mesh от Loft Air фактической конструкцией, а не общей фразой о вентиляции. | Exact Mesh Black front; transparent/mesh macro; back view; dual backrest; 4D X 360; mechanism; in-scale. |
| `/products/wing/racer-black/` | Проверить термин `Leatherette`, правила ухода и отсутствие недоказанных обещаний долговечности. | Exact Racer Black front; side/back; Leatherette/stitch macro; dual backrest; controls; mechanism; in-scale. |
| `/products/wing/racer-dark-grey/` | Развести текст с Racer Black через реальный цвет и интерьерный сценарий, не выдумывая функциональную разницу. | Exact Racer Dark Grey front; controlled color-comparison angle; side/back; material macro; controls; in-scale. |
| `/products/xtal/loft-air-dark-grey/` | Проверить **7D**, сменные элементы и сервисные границы; не обещать наличие деталей. | Exact Dark Grey front; side/back; Loft Air macro; replaceable headrest/lumbar detail; 3D padded armrest; SYNC5; in-scale. |
| `/products/xtal/loft-air-light-grey/` | Усилить только фактические отличия цвета/ухода; не копировать Dark Grey с заменой названия. | Exact Light Grey front; controlled color compare; side/back; material macro; replaceable element; controls; in-scale. |
| `/products/xtal/mesh-black/` | Объяснить фактическую Mesh-конструкцию и уход без абсолютов `максимальная вентиляция`, если это не измерено. | Exact Mesh Black front; mesh macro; back view; replaceable element; 3D armrest; mechanism; in-scale. |
| `/products/xtal/racer-black/` | Проверить Leatherette и границы replaceable design; отделить реальные свойства от визуального характера. | Exact Racer Black front; side/back; Leatherette macro; replaceable element; armrest; mechanism; in-scale. |
| `/products/xtal/racer-dark-grey/` | Развести вариант с Black по цвету и уходу, не приписывая другой комфорт при общей платформе. | Exact Racer Dark Grey front; controlled color compare; side/back; material macro; replaceable element; controls; in-scale. |

## 8. Постраничная Матрица: Статьи

| URL | Текст | Изображения |
|---|---|---|
| `/articles/best-chair-for-home-office/` | Не расширять. Добавить только проверяемые размеры стола/помещения как checklist. | Future factual in-scale home-office photo; третья AI-сцена не нужна. |
| `/articles/chair-for-computer-work/` | Полный текст; усиление только official dimensions и control mapping. | Armrest/desk-height close-up из official asset. |
| `/articles/chair-for-posture-and-long-work/` | Не расширять medical language; новые claims требуют авторитетных источников. | Factual seat/backrest support close-up. |
| `/articles/chair-setup-after-purchase/` | Добавлять только model-specific действия из официальных инструкций. | Реальные controls и mechanism sequence. |
| `/articles/chairs-for-office-team/` | Future value — procurement matrix и подтвержденный процесс тестовой посадки. | Реальная fleet/in-scale съемка. |
| `/articles/gaming-chair-long-sessions/` | Новые абзацы не нужны; только factual seat/material data. | Official material macro или side profile. |
| `/articles/how-to-choose-aerocool-chair/` | Аргументация цельная, один вывод. Обновлять при изменении линейки. | Двух visuals достаточно; future exact lineup. |
| `/articles/how-to-choose-chair-by-adjustability/` | 7D/8D/11D объяснены; не дописывать общий текст. | Реальные control close-ups каждого уровня. |
| `/articles/racer-vs-loft-air-vs-mesh-materials/` | Структура очищена от повторов; новые claims только из material data. | Приоритетная замена: official Racer/Loft Air/Mesh macro. |
| `/articles/sky-lite-vs-sky-360-guide/` | Decision path полный. | Exact SKU side/back comparison. |
| `/articles/sky-vs-wing-vs-xtal/` | Текст логичный; обновлять состав серий и facts. | Exact official lineup лучше новой иллюстрации. |
| `/articles/sync4-sync5-mechanism-guide/` | Не расширять без официальной инструкции/product sheet и visible provenance. | Приоритет: factual underside/mechanism photos. |
| `/articles/what-is-dual-backrest/` | Текст полный; усиливать только проверяемой конструкцией. | Official dual-backrest close-up. |
| `/articles/what-is-fully-replaceable-design/` | Не обещать доступность деталей без подтверждения. | Official exploded component view. |
| `/articles/what-is-synchronous-tilt-guide/` | Техническая дуга цельная. | Real mechanism sequence вместо дополнительной abstract scene. |
| `/articles/wing-vs-xtal-comparison/` | Сравнение полное; обновлять facts при изменении моделей. | Exact WING/XTAL SKU side-by-side. |

## 9. Постраничная Матрица: Новости

| URL | Текст | Изображения |
|---|---|---|
| `/news/sky-series-launch/` | Обновлять только при реальном изменении линейки или поставки. | Official SKY Lite/360 lineup. |
| `/news/wing-series-launch/` | Не расширять evergreen-объяснения. | Official dual-backrest и material variants. |
| `/news/xtal-series-launch/` | Не обещать наличие сменных деталей без подтверждения. | Official replaceable component detail. |
| `/news/sky-360-launch/` | Добавлять только подтвержденные availability/spec changes. | Official adjustment controls/mechanism. |
| `/news/sky-lite-launch/` | Текст достаточен; не превращать в evergreen guide. | Real compact workplace. |
| `/news/loft-air-and-mesh-focus/` | Material intent принадлежит статье, новость не расширять. | Official material macro. |
| `/news/sync4-sync5-mechanism-update/` | При редактуре сократить повтор evergreen-объяснения. | Official SYNC4/SYNC5 evidence. |
| `/news/chair-selection-guides-update/` | Обновлять только при выпуске новых guides. | Одного inline visual достаточно. |
| `/news/practical-chair-guides-update/` | Обновлять только при реальном расширении practical cluster. | Одного inline visual достаточно. |

## 10. Техническое Состояние Изображений

### Прошло

- article/news cover: **1536x1024 WebP**;
- schema crops: **1600x900**, **1200x900**, **1200x1200 WebP**;
- inline: обычно **1200x800 WebP**;
- home hero: **2102x1401 WebP**;
- article/news dimensions, formats и weight thresholds соответствуют текущему playbook;
- exact duplicate article/news visuals не обнаружены;
- logo lockup и crop-safe набор визуально читаются.

### Не Прошло

- **12/12** product primary files имеют одинаковый SHA-256;
- каждый product primary весит около **1,75 МБ** и имеет **2000x2000 PNG**;
- `360.png` и `lite.png` одинаковы, имеют **1980x1080 PNG** и содержат `TEST`;
- product gallery не закрывает front/side/back/material/mechanism/in-scale contract;
- редакционный слой слишком часто повторяет одну AI-assisted композицию.

PNG сам по себе не является ошибкой для processable factual source. Ошибка — неверный или общий объект, который выдается за конкретный товар.

## 11. Рекомендуемая Очередность Работ

1. Получить и сопоставить official product assets с 12 SKU/MPN/GTIN.
2. Заменить P1 product primary и удалить test assets.
3. Заполнить product gallery по shot list и проверить mobile crop/LCP.
4. Добавить factual material/mechanism replacements в шесть самых технических articles/news.
5. Подготовить реальные About/Contact evidence assets с правами.
6. Для новых covers применять composition rotation из документа `79`.
7. После каждого пакета запускать build, route checks, PageSpeed и URL-level structured data checks.
8. Сравнивать Search Console impressions/CTR/queries до и после, не менять все URL одновременно без возможности измерить эффект.

## 12. Оценка

| Направление | Оценка |
|---|---:|
| Полнота и структура текстов | **9.1 / 10** |
| Человечность и читаемость | **8.8 / 10** |
| Языковая синхронизация | **9.8 / 10** |
| Интенты и internal linking | **9.2 / 10** |
| Article/news image coverage | **9.5 / 10** |
| Техническое image SEO article/news | **9.5 / 10** |
| Визуальное разнообразие | **7.7 / 10** |
| Product image truthfulness | **2.5 / 10** |
| Product gallery completeness | **3.0 / 10** |
| Документированность процесса после этого аудита | **9.7 / 10** |

Итоговая текущая оценка всего content/image слоя: **7.8 / 10**.

Оценку резко ограничивает один критический кластер — product imagery. После точных изображений всех вариантов, полноценных galleries и первых factual replacements в статьях реалистичная оценка составит **9.1-9.4 / 10**. До `10/10` все равно останутся внешние факторы: реальные пользовательские данные, Search Console, подтвержденные отзывы, правовые/бизнес-проверки и конкурентная динамика SERP.

## 13. Источники

- [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: Image SEO best practices](https://developers.google.com/search/docs/appearance/google-images)
- [Google: Generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: Merchant listing structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
- [web.dev: Responsive images](https://web.dev/articles/responsive-images)
- [web.dev: Preload responsive images](https://web.dev/articles/preload-responsive-images)
- [web.dev: Fetch Priority API](https://web.dev/articles/fetch-priority)
- [Hugo: Image processing](https://gohugo.io/content-management/image-processing/)
- [Hugo: Page resources](https://gohugo.io/content-management/page-resources/)

Постоянные правила по итогам аудита вынесены в [ДНК текстов и изображений страниц Aerocool 2026](../content/79-page-content-design-dna-2026.md).
