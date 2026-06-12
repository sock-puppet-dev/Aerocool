# Playbook Изображений И AI-Промптов Aerocool 2026

Обновлено: 2026-06-12.

Этот документ фиксирует повторяемый стандарт для всех изображений проекта `Aerocool Ukraine`: обложек статей и новостей, section covers, fallback-изображений, home hero, товарных фото, product gallery, контентных иллюстраций, технических схем, логотипов и служебных иконок.

Главная цель: удерживать единый визуальный ДНК 2026 на стороне tactile/high-tech/AI-assisted storytelling, но не превращать весь сайт в набор одинаковых темных баннеров. Для e-commerce сайта важно разделять два слоя:

- брендово-редакционный слой - high-tech обложки, hero, fallback, category covers и иллюстрации для статей;
- фактический товарный слой - точные product images, реальные ракурсы, масштаб, материалы, механизмы и gallery, где важнее доверие и проверяемость.

Документ использовать вместе с:

- [06-seo-image-shortcode.md](/Users/stadnyk/MEGA/Aerocool/docs/content/06-seo-image-shortcode.md) - технический вывод изображений через Hugo;
- [07-content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/07-content-seo-checklist-2026.md) - редакционный SEO-чеклист;
- [12-core-web-vitals-guide-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/12-core-web-vitals-guide-2026.md) - LCP, responsive images и производительность;
- [20-schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/20-schema-markup-quality-checklist-2026.md) - `ImageObject` и schema.org;
- [21-ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/21-ecommerce-structured-data-playbook-2026.md) - product images, Product/Offer и e-commerce structured data.

## 1. Как Пользоваться Новичку

1. Определи тип изображения: cover, fallback, hero, product primary, gallery, inline, technical, logo или icon.
2. Посмотри матрицу в разделе 4 и выбери цель изображения.
3. Если это AI-generated image, возьми master prompt из раздела 9 и добавь подходящий вариант из раздела 11.
4. Всегда добавь negative prompt из раздела 10.
5. Если это товарное фото, не подменяй его фантазийной high-tech сценой: сначала нужна точность модели, цвета и материала.
6. После генерации или обработки проверь дефекты по разделу 13.
7. Оптимизируй файл, положи его в правильное место и обнови `image`, `cover.image`, `cover.alt`; для article/news обнови первый `seo-image`, для product обнови gallery-файлы page bundle.
8. Запусти `npm run build`.

Короткое правило: изображение должно либо продавать через доверие, либо объяснять через смысл. Если оно только “красивое”, но не помогает выбрать кресло, понять материал, механизм или раздел, его нужно переделать.

## 2. Визуальный ДНК Aerocool 2026

### 2.1. Брендово-Редакционный Слой

Этот слой использовать для `content/articles`, `content/news`, section covers, fallback и home hero.

Обязательные признаки:

- photorealistic high-tech product editorial;
- темный graphite / blue-black технологичный интерьер;
- холодные cyan, blue, violet акценты, точечно amber или green-cyan;
- tactile материалы: ткань, mesh, Loft Air, Racer surface, швы, перфорация, тиснение;
- AI-assisted storytelling: сцена объясняет идею страницы через композицию, свет, материал и предметы;
- реальные кресла Aerocool как главный объект, без fantasy-форм;
- логотип Aerocool в верхнем левом углу для обложек, category covers и fallback; для горизонтальных cover-файлов **1536x1024** использовать единый logo lockup из раздела 5.6;
- бренд Aerocool на самих креслах как печать, тиснение или вышивка на материале;
- чистый премиальный e-commerce mood без дешевых рекламных плашек.

### 2.2. Фактический Товарный Слой

Этот слой использовать для `content/products/**/01-front.png`, дополнительных product gallery images и будущих in-scale изображений.

Обязательные признаки:

- модель, цвет, материал и форма должны совпадать с реальным товаром;
- основное product image должно показывать кресло ясно, без художественного искажения;
- бренд на кресле должен быть настоящим или аккуратно интегрированным в материал, не наклейкой;
- дополнительные изображения должны раскрывать ракурсы, механизмы, текстуры, посадку, масштаб и детали;
- high-tech контекст допустим только как вторичное contextual image, если он не мешает распознать товар.

### 2.3. Служебный Слой

Этот слой использовать для `static/images/logo.svg`, favicon, touch icons и pinned tab.

Правила:

- логотипы и favicon не генерировать заново через AI без отдельного brand-governance решения;
- не применять к ним high-tech фильтры, glow, material texture или 3D-стилизацию;
- source of truth для логотипа - существующий брендовый SVG/официальный asset;
- изменения логотипа проверять отдельно от обложек.

## 3. Что Неизменно Для Всего Проекта

- Любое важное изображение должно быть связано с реальной темой страницы.
- Для контента предпочтителен WebP; тяжелые PNG в статьях и новостях не оставлять после финальной замены.
- У видимых изображений должны быть понятные `alt`, `width`, `height`, responsive delivery и корректное `loading`.
- Для первого LCP-кандидата - `eager`, `fetchpriority="high"` и только один приоритетный preload на страницу.
- Для вторичных изображений - `lazy`, `decoding="async"` и без `fetchpriority="high"`.
- Изображения должны быть crawlable и присутствовать в HTML через `<img>` / `<picture>`, а не только CSS background, если они важны для SEO.
- `cover.alt`, `alt` и `title` локализуются под язык страницы.
- Изображение не должно противоречить видимому тексту, front matter, schema.org и товарным фактам.

## 4. Матрица Типов Изображений

| Тип | Где лежит | Формат | Роль | Стиль |
|---|---|---|---|---|
| Article cover | `content/articles/<slug>/01-front.webp` | **1536x1024**, WebP | Объяснить идею статьи и усилить CTR | High-tech editorial |
| News cover | `content/news/<slug>/01-front.webp` | **1536x1024**, WebP | Передать инфоповод: запуск, поставка, обновление | High-tech announcement |
| Section cover | `content/<section>/cover.webp` | **1536x1024**, WebP | Визуально объяснить раздел | High-tech category |
| Series cover | `content/products/<series>/cover.webp` | **1536x1024**, WebP | Позиционировать серию | Product lineup high-tech |
| Root cover | `content/cover.webp` | **1536x1024**, WebP | Базовый brand/site image | Broad Aerocool showroom |
| Default article/news/product | `static/images/default-*.webp` | **1536x1024**, WebP | Качественный fallback | Не заглушка, а полноценная сцена |
| Home hero | `assets/images/home-hero85.webp` | **2102x1401**, WebP | Первый экран главной | Tailwind Plus split hero image |
| Product primary | `content/products/**/01-front.png` сейчас, целевой WebP/JPEG позже | исходный product size | Точное фото товара | Neutral factual |
| Product gallery | рядом с товаром | WebP/JPEG/PNG по источнику | Ракурсы, детали, масштаб | Factual + optional context |
| Inline article image | page bundle | WebP | Объяснить блок текста | High-tech или factual по смыслу |
| Technical diagram | page bundle или `static/images` | SVG/WebP | Механизм, регулировки, размеры | Clean technical, без fake specs |
| Logo/favicon | `static/` | SVG/PNG | Идентичность сайта | Только brand source |

## 5. Технический Стандарт Файлов

### 5.1. Статьи И Новости

```yaml
image: "01-front.webp"
cover:
  image: "01-front.webp"
  alt: "Описание изображения на языке страницы"
  relative: true
  hiddenInSingle: true
```

- Файл: `01-front.webp`.
- Размер: **1536x1024**.
- Ratio: **3:2**.
- Первое видимое изображение article/news в теле страницы выводить через `seo-image`.
- Для топовых article/news URL в P2 подготовить дополнительные crops **16:9**, **4:3**, **1:1** для schema.org и Search surfaces.

### 5.2. Section Covers И Fallback

- Section cover: `content/<section>/cover.webp`.
- Series cover: `content/products/<series>/cover.webp`.
- Fallback:
  - `static/images/default-article.webp`;
  - `static/images/default-news.webp`;
  - `static/images/default-product.webp`.

Fallback-файл не должен выглядеть как аварийная заглушка. Он должен быть полноценным изображением в стиле утвержденных обложек.

### 5.3. Home Hero

- Файл: `assets/images/home-hero85.webp`.
- Размер из hero-кода Tailwind Plus: **2102x1401**.
- Ratio: примерно **3:2**.
- Render-код: `aspect-3/2 w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full`.
- Responsive `sizes`: `(min-width: 1280px) 50vw, (min-width: 1024px) 42vw, 100vw`.
- Srcset widths: **320**, **480**, **640**, **768**, **1024**, **1280**, **1600**, **2102**.
- Сцена: landscape high-tech hero image для правой части маркетингового первого экрана, без заголовков и бейджей.
- Важно: главный объект должен держаться в центрально-правой safe area, потому что на desktop изображение работает как `object-cover` в правой половине hero, а на mobile показывается как `aspect-3/2`.
- Home hero не использует механический верхний левый logo lockup из cover-стандарта. Для главной важнее clean product scene, а бренд должен быть виден на самом кресле как печать, тиснение или вышивка на материале.
- Белый factual product cutout не подходит для hero главной: нужен high-tech/tactile editorial слой с темным graphite studio, холодным cyan/violet светом и читаемым креслом.

### 5.4. Product Primary И Product Gallery

Текущие product primary images в проекте в основном `01-front.png`. Их не нужно автоматически превращать в темные high-tech обложки. Это товарные доказательства, а не рекламные постеры.

Целевой набор для сильной PDP:

- front view - главное фото;
- side view - профиль и глубина посадки;
- back view - спинка, бренд, форма;
- material close-up - ткань, mesh, Loft Air, Racer surface;
- mechanism close-up - рычаги, наклон, подлокотники;
- in-scale/context image - кресло рядом с рабочим столом или объектом понятного размера;
- optional editorial image - high-tech сцена для эмоционального усиления, но не вместо factual photo.

### 5.5. Оптимизация

Горизонтальная обложка:

```bash
magick input.png -auto-orient -resize 1536x1024^ -gravity center -extent 1536x1024 -strip -quality 82 -define webp:method=6 01-front.webp
```

Hero-картинка главной из Tailwind Plus hero-кода:

```bash
magick input.png -auto-orient -resize 2102x1401^ -gravity center -extent 2102x1401 -strip -quality 82 -define webp:method=6 home-hero85.webp
```

Product/detail image не обрезать без проверки объекта:

```bash
magick input.png -auto-orient -resize 2000x2000\> -strip -quality 86 product-detail.webp
```

### 5.6. Единый Logo Lockup Для Cover-Изображений

Для всех брендово-редакционных горизонтальных изображений **1536x1024** используется один и тот же логотип:

- источник логотипа: `static/images/logo.svg`;
- итоговый raster-lockup: **205x112 px**;
- координаты на canvas **1536x1024**: **x=34**, **y=34**;
- цвет: чисто белый без смены формы логотипа, если фон темный; чисто черный без смены формы логотипа, если фон светлый или белый;
- зона под логотипом может быть слегка затемнена только мягкой vignette-ретушью, без видимой прямоугольной плашки;
- старые AI-rendered логотипы в этом же углу нужно перекрывать единым official lockup;
- дубли логотипа внизу слева, справа, по центру или в других местах не допускаются.

Это правило относится к:

- `content/articles/<slug>/01-front.webp`;
- `content/news/<slug>/01-front.webp`;
- `content/articles/cover.webp`;
- `content/news/cover.webp`;
- будущим section covers, category covers и fallback-файлам **1536x1024**.

Для дополнительных schema crops используется отдельный утвержденный lockup:

- **16:9** `1600x900`: logo **214x117 px**, координаты **x=35**, **y=31**;
- **4:3** `1200x900`: logo **160x87 px**, координаты **x=27**, **y=27**;
- **1:1** `1200x1200`: logo **160x87 px**, координаты **x=27**, **y=27**.

Портретный home hero не использует механический перенос этих координат: для него safe area и logo/brand treatment утверждаются отдельно.

## 6. Где Хранить И Как Называть

- Статья: `content/articles/<slug>/01-front.webp`.
- Новость: `content/news/<slug>/01-front.webp`.
- Section cover: `content/<section>/cover.webp`.
- Серия: `content/products/<series>/cover.webp`.
- Root cover: `content/cover.webp`.
- Product primary: `content/products/<series>/<model>/01-front.*`.
- Product gallery: рядом с `index.md` / `index.ru.md` товара.
- Fallback: `static/images/default-article.webp`, `static/images/default-news.webp`, `static/images/default-product.webp`.
- Home hero: `assets/images/home-hero85.webp`.
- Logo: `static/images/logo.svg`.

Не использовать имена `final-v3.webp`, `new-image.webp`, `banner.webp`, `cover-test.webp` для production-файлов.

## 7. Правило Разнообразия

У всех изображений должна быть одна система, но разные роли:

- сравнение - lineup, параллельные зоны, визуальная логика выбора;
- работа - workstation, фокус, спокойный свет;
- gaming - более плотный contrast, red/violet accents, но без агрессивного мусора;
- материал - крупные tactile surfaces;
- механизм - technical arcs, cutaway, детали под сиденьем;
- запуск - spotlight и ощущение official update;
- категория - широкий scene-setting;
- товар - точность и доверие;
- FAQ/contact/about - сервисный, поддерживающий, менее агрессивный high-tech;
- fallback - универсальная, но не пустая сцена.

Если изображения рядом в листинге выглядят как один и тот же кадр с переставленными креслами, стандарт нарушен.

## 8. Общий Negative Prompt

```text
no article title, no random text, no letters except the official Aerocool logo and Aerocool chair branding, no numbers, no badges, no UI labels, no fake logo, no misspelled logo, no duplicated logo, no inconsistent logo size, no bottom-left logo, no sticker-like logo on chair, no people, no hands, no medical symbols, no cheap banner style, no cartoon, no fantasy chair, no distorted wheels, no extra wheels, no extra armrests, no broken headrest, no incorrect dual backrest, no cluttered infographic, no overexposed logo, no cropped top edge, no cropped logo, no blurry product, no low-resolution texture, no unrelated objects, no false dimensions, no fake specs, no mismatched chair color, no product shape distortion
```

## 9. Master Prompt Для Брендово-Редакционного Слоя

```text
Photorealistic premium high-tech e-commerce editorial image for Aerocool Ukraine. Dark graphite futuristic studio, cold cyan-blue and violet technical lighting, subtle reflective floor, glass panels, holographic grid details, tactile material textures, precise realistic Aerocool chair geometry, sharp product-focused composition, cinematic but clean.

Use real Aerocool ergonomic gaming and office chair design language. The chair must have correct wheels, armrests, headrest, backrest geometry, seat cushion and mechanism details. Reserve clean upper-left space for the official Aerocool corporate logo when the image is used as a cover, category image, fallback or brand hero. For final production 1536x1024 covers, apply the logo from static/images/logo.svg as a fixed 205x112 px lockup at x=34, y=34; do not rely on AI-rendered logo text. Add Aerocool brand marks on the chair itself as subtle printed, embossed or stitched branding integrated into the headrest or seat material, not as a sticker overlay.

No article title text, no captions, no badges, no UI labels. Communicate the page idea through scene, objects, lighting, material texture and composition only. The result must feel tactile, high-tech, product-accurate and commercially premium.
```

## 10. Master Prompt Для Товарного Слоя

```text
Photorealistic accurate product image of a real Aerocool chair model. Preserve exact chair silhouette, color, material, wheels, armrests, headrest, seat cushion, backrest and mechanism details. Use clean studio lighting, realistic shadows and sharp material texture. The Aerocool branding on the chair must look printed, embroidered or embossed into the actual material. Do not invent extra parts or change the model.

If a contextual scene is requested, place the chair in a clean modern workstation or office environment with enough scale context to understand size and use case. Keep the product fully readable and do not let the environment hide the chair.
```

## 11. Reusable Prompts По Типам

### 11.1. Article: Выбор Или Сравнение

```text
Create a 1536x1024 high-tech comparison cover showing three Aerocool chair series as a premium lineup: SKY, WING and XTAL. Each chair should have a distinct silhouette and material identity, arranged in a balanced triangular or side-by-side comparison scene. Dark graphite showroom, cyan and violet holographic floor paths separating the options, subtle technical panels in the background. The image should feel like a serious buying guide, not an advertisement banner. Include the official Aerocool logo in the upper-left corner and subtle integrated Aerocool branding on each chair.
```

### 11.2. Article: Работа, Ergonomics, Posture

```text
Create a 1536x1024 calm high-tech workstation cover with one Aerocool ergonomic chair as the hero object near a clean dark computer workspace. Use green-cyan ergonomic light contours around the backrest and armrests to suggest posture support and long work comfort. Keep the scene premium, focused and quiet, with no people and no text. The chair branding must be printed or embossed into the material, and the official Aerocool logo must be glowing in the upper-left corner.
```

### 11.3. Article: Материалы И Текстуры

```text
Create a 1536x1024 high-tech material comparison cover with Aerocool chairs and floating close-up material panels showing Racer surface, Loft Air texture and Mesh ventilation. Dark metallic studio, cool silver-cyan lighting, realistic tactile fabric and leather-like details, reflective grid floor. The composition must make material choice immediately understandable without labels or captions. Include official Aerocool logo upper-left and integrated chair branding.
```

### 11.4. Article: Механизм Или Регулировки

```text
Create a 1536x1024 high-tech ergonomic mechanism cover with one Aerocool chair centered and precise holographic motion arcs around the seat, backrest and armrests. The light arcs should suggest synchronous tilt, recline or multi-adjustable controls without using text or icons. Dark graphite technical studio, clean blue-violet circuit lines, premium realistic chair render, visible correct mechanisms under the seat. Official Aerocool logo upper-left, subtle printed chair branding.
```

### 11.5. News: Запуск Серии Или Модели

```text
Create a 1536x1024 premium high-tech product launch cover for Aerocool chairs. Show the new chair or series as the main object in a dark futuristic showroom with controlled spotlight, subtle reveal lighting, clean cyan-blue energy lines and a sense of announcement. The scene should feel current and newsworthy, but without text, badges, dates or promotional labels. Official Aerocool logo upper-left, integrated Aerocool branding on the chair material.
```

### 11.6. News: Поставка, Availability, Обновление Каталога

```text
Create a 1536x1024 high-tech logistics and availability cover for Aerocool chairs without showing trucks or warehouse clutter. Use a dark premium product staging area with multiple Aerocool chairs arranged as a ready-to-ship fleet, subtle glowing floor routes, clean inventory-light accents and a corporate technology mood. The idea should communicate availability and updated catalog selection through arrangement and lighting only. Official Aerocool logo upper-left, brand marks printed or embossed on chairs.
```

### 11.7. Category: Articles

```text
Create a 1536x1024 high-tech editorial knowledge hub cover for Aerocool articles. Show several Aerocool chairs in a dark premium studio with holographic comparison paths, technical material panels and a clean workstation in the background. The scene should communicate guides, comparison and practical chair selection, without text or UI. Official Aerocool logo upper-left, integrated branding on chairs.
```

### 11.8. Category: News

```text
Create a 1536x1024 high-tech Aerocool news hub cover with a product announcement mood. Use a dark futuristic showroom, spotlighted Aerocool chairs, subtle launch-stage lighting, cyan-blue and amber accents, and clean depth. The image should feel like official brand updates and new arrivals, not a generic blog cover. No text except official Aerocool logo upper-left and subtle chair branding.
```

### 11.9. Category: Products

```text
Create a 1536x1024 premium high-tech product catalog cover for Aerocool Ukraine. Show a curated lineup of Aerocool SKY, WING and XTAL chairs in a dark graphite showroom, with clear product silhouettes, realistic materials, reflective floor, and clean cyan-violet technical lighting. The composition should feel like a catalog entrance: broad, trustworthy and product-focused. Official Aerocool logo upper-left, integrated Aerocool branding on every visible chair.
```

### 11.10. Default Product Fallback

```text
Create a 1536x1024 high-tech single-product fallback cover with one Aerocool ergonomic chair centered as a hero object. Dark graphite studio, cool cyan backlight, subtle reflective floor, minimal glass-panel background, realistic product geometry and premium material texture. The image should be generic enough for product fallback use but still feel like an Aerocool cover, not a placeholder. Official Aerocool logo upper-left, brand printed or embossed on the chair material.
```

### 11.11. Home Hero Portrait

```text
Create a 2102x1401 landscape premium high-tech hero image for Aerocool Ukraine, designed for a Tailwind Plus split marketing hero section. The image is used as the right-side hero image with `object-cover` on desktop and `aspect-3/2` full-width on mobile. One real Aerocool ergonomic chair is the main object, positioned slightly right of center, with enough safe space around the headrest, armrests, base and wheels. Dark graphite futuristic studio, cold cyan rim light, subtle violet depth, reflective floor, premium product photography mood. The chair must carry integrated Aerocool branding on the headrest or seat material. Keep the composition clean for a website homepage hero, with no text, no badges and no people.

Do not add a corner logo to the home hero. Do not use a white studio background or a flat factual product cutout. Branding on the chair must look printed, embossed or stitched into the material, not like a sticker.
```

### 11.12. Product Gallery: Material Close-Up

```text
Create a photorealistic close-up product image of Aerocool chair material. Focus on tactile surface quality: weave, mesh ventilation, Loft Air texture, Racer pattern, stitching and subtle embossed Aerocool branding. Clean studio lighting, high detail, no decorative text, no fake specifications. The material must look touchable and commercially realistic.
```

### 11.13. Product Gallery: In-Scale Context

```text
Create an accurate contextual product image of an Aerocool chair in a clean modern workstation, with a desk and monitor as scale references. No people. Keep the full chair visible and product-accurate. Lighting should be premium but neutral enough to judge the size, height, wheels, backrest and seat depth. Integrated Aerocool branding must appear naturally on the chair material.
```

### 11.14. Technical Diagram Or Mechanism Image

```text
Create a clean high-tech technical visual explaining an Aerocool chair mechanism or adjustment area without text labels. Use realistic close-up product geometry, subtle cyan technical light lines, visible lever or hinge details, and a dark neutral background. Do not invent specifications, dimensions, icons or medical symbols.
```

### 11.15. About, FAQ, Contact

```text
Create a premium high-tech service-oriented Aerocool cover image. Dark graphite corporate studio, clean cyan lighting, Aerocool chair or chair lineup as supporting object, calm trustworthy mood. The image should communicate official brand support, information clarity or contact readiness without text, people, badges or fake UI. Official Aerocool logo upper-left and subtle integrated chair branding.
```

## 12. Google / Schema Ratios

Основной стандарт **1536x1024** остается видимой editorial-обложкой, а для `Article` / `NewsArticle` дополнительно поддерживаются crop-варианты под search surfaces и schema.org.

Для статей и новостей с `image: "01-front.webp"` стандартный bundle-набор такой:

- `01-front.webp` - **1536x1024**, видимая обложка и текущий primary image;
- `01-front-16x9.webp` - **1600x900**;
- `01-front-4x3.webp` - **1200x900**;
- `01-front-1x1.webp` - **1200x1200**.

Эти дополнительные файлы должны быть не случайными crop-ами, а проверенными композициями: логотип не обрезан, кресло читается, ключевой объект остается в фокусе.

Schema layer подключает эти файлы автоматически через `layouts/_partials/_schema/page-image-list.html`: первым элементом остается основной `ImageObject` `#primary-image`, затем добавляются существующие `01-front-16x9.webp`, `01-front-4x3.webp` и `01-front-1x1.webp`. Новые front matter поля для этого не нужны.

Для schema crops нельзя использовать координаты **x=34**, **y=34**, **205x112 px** из горизонтального **1536x1024** cover-стандарта. У каждого ratio есть свой safe-area lockup из раздела **5.6**, иначе логотип может стать слишком крупным, мелким или попасть в зону crop.

## 13. QA-Чеклист Изображения

Перед утверждением проверить:

- [ ] Тип изображения выбран правильно: cover, fallback, hero, product, gallery, inline, technical или logo.
- [ ] Размер и ratio соответствуют матрице.
- [ ] Файл оптимизирован, без лишнего тяжелого исходника рядом.
- [ ] Изображение присутствует в HTML через `<img>` / `<picture>`, если оно важно для SEO.
- [ ] У изображения есть `width`, `height`, `alt`, корректные `sizes` и правильный `loading`.
- [ ] Для cover/category/fallback **1536x1024** логотип Aerocool взят из `static/images/logo.svg`, имеет raster-lockup **205x112 px** и стоит строго в позиции **x=34**, **y=34**.
- [ ] Для article/news schema crops логотип соответствует отдельным safe-area координатам: **16:9** `214x117` на **x=35/y=31**, **4:3** и **1:1** `160x87` на **x=27/y=27**.
- [ ] Для `assets/images/home-hero85.webp` размер ровно **2102x1401**, сцена landscape **3:2** под Tailwind Plus split hero, без corner logo, с интегрированным брендом на кресле и безопасной центрально-правой композицией для desktop `object-cover`.
- [ ] Логотип Aerocool не обрезан, не искажен, не перегорел и не выглядит как случайно сгенерированный текст.
- [ ] Нет второго логотипа внизу слева, справа, по центру или в других местах изображения.
- [ ] Бренд на кресле выглядит как часть материала, а не наклейка.
- [ ] Нет случайного текста, fake logo, UI labels, бейджей, цифр и фальшивых характеристик.
- [ ] Кресло не имеет лишних колес, подлокотников, сломанных механизмов или фантазийной формы.
- [ ] Product image не меняет реальный цвет, модель, материал и форму.
- [ ] Product gallery помогает оценить масштаб, ракурсы, материал или механизм.
- [ ] Обложка раскрывает смысл конкретной страницы, а не просто показывает кресло.
- [ ] Изображения рядом в листинге не выглядят однотипно.
- [ ] На мобильной карточке главный объект остается читаемым после crop.
- [ ] `cover.alt` и `alt` локализованы под язык страницы.
- [ ] `npm run build` проходит без ошибок.

## 14. Сравнение С Best Practices И Трендами 2026

| Критерий | Стандарт Aerocool | Сравнение с практиками 2026 | Оценка |
|---|---|---|---|
| Репрезентативность | Каждое изображение обязано раскрывать страницу, продукт, материал, механизм или раздел. | Google Image SEO рекомендует релевантные representative images и не полагаться на generic logo-only preview. | **9/10** |
| HTML / crawlability | Article/news изображения выводятся через `seo-image` и `<picture>`, product primary image — через `products/gallery.html`, SEO/schema источник — front matter `image`. | Google рекомендует стандартные `<img>` / `<picture>`, crawlable URL, supported formats и metadata. | **9/10** |
| Performance | WebP, responsive pipeline Hugo, `width/height`, lazy/eager, осторожный `fetchpriority`. | web.dev указывает, что изображения часто самый тяжелый ресурс; нужны proper sizing, `srcset`, `sizes`, dimensions, lazy loading и аккуратный LCP priority. | **8.8/10** |
| Article/News ratios | Основной cover **3:2** дополнен schema crops **16:9**, **4:3**, **1:1**, которые автоматически попадают в `Article.image` и `NewsArticle.image`. | Google Article structured data рекомендует несколько high-resolution images в **16:9**, **4:3**, **1:1**. | **9/10** |
| Product UX | Товарный слой отделен от editorial covers; product gallery выводит primary image и дополнительные кадры из page bundle. | Baymard подчеркивает, что пользователи оценивают размер и свойства по product images; in-scale images критичны. | **8/10** сейчас, **9/10** после расширения ракурсов и in-scale фото |
| Tactile/high-tech 2026 | Материалы, отражения, mesh, тиснение, cinematic technical scenes. | Canva 2026 выделяет tactile textures, cinematic storytelling и AI как controlled creative tool; Adobe 2026 усиливает multisensory и useful storytelling. | **9/10** |
| AI-assisted governance | Есть master prompts, negative prompt, role matrix и дефект-чеклист. | Adobe/Canva тренды 2026 сходятся в том, что AI полезен, когда бренд сохраняет creative control. | **9/10** |
| Риск однотипности | Введено правило разнообразия по роли изображения. | 2026-тренды уходят от стерильной шаблонности к tactile, характерному и смысловому визуалу. | **8.5/10** |

Итоговая оценка регламента: **9.1 / 10**.

Почему не **10/10**:

- product gallery пока не закрывает все ракурсы, material close-ups и in-scale images;
- нет автоматического QA-скрипта, который проверяет размеры, вес, наличие `cover.alt`, тяжелые PNG и повторяемость fallback-стиля;
- AI-генерация логотипа и бренда на кресле требует ручного визуального контроля.

Что поднимет стандарт до **9.5/10**:

1. Расширить product gallery: front, side, back, material, mechanism, in-scale.
2. Добавить скрипт аудита изображений по размеру, весу, формату и ссылкам в front matter.
3. Для самых важных URL делать ручную art-direction версий **16:9**, **4:3**, **1:1**, если механический crop хуже раскрывает смысл страницы.
4. Хранить утвержденные визуальные референсы и reject examples в отдельной папке для QA.

## 15. Что Не Делать

- Не делать все изображения одинаковыми dark high-tech covers.
- Не подменять реальные product photos AI-фантазией.
- Не использовать случайный fake logo или кривой текст вместо Aerocool.
- Не делать бренд на кресле похожим на наклейку.
- Не вставлять заголовок статьи внутрь изображения.
- Не использовать людей, руки, медицинские символы или инфографику без отдельного решения.
- Не хранить тяжелые PNG в `content/articles` или `content/news` после финальной WebP-замены.
- Не менять массово опубликованные image URLs без SEO/redirect-плана.
- Не использовать CSS background для SEO-critical image.
- Не добавлять `fetchpriority="high"` на вторичные изображения.

## 16. Источники Для Сверки

- Google Image SEO best practices: https://developers.google.com/search/docs/appearance/google-images
- Google Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- web.dev Image performance: https://web.dev/learn/performance/image-performance
- web.dev Responsive images: https://web.dev/learn/design/responsive-images
- Baymard Product Page UX 2026: https://baymard.com/blog/current-state-ecommerce-product-page-ux
- Baymard In-scale product images: https://baymard.com/blog/in-scale-product-images
- Adobe 2026 Creative Trends: https://blog.adobe.com/en/publish/2026/01/08/how-creators-leveraging-adobe-2026-creative-trends
- Canva Design Trends 2026: https://www.canva.com/newsroom/news/design-trends-2026/
