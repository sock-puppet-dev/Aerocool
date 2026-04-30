# Руководство По Shortcode `seo-image`

Короткое руководство по shortcode `seo-image` в текущем проекте `Aerocool`.

Shortcode `seo-image` находится в `layouts/_shortcodes/seo-image.html` и работает только с изображениями, которые лежат внутри папки страницы (`page bundle` в терминологии Hugo). Если файла нет рядом со страницей, сборка упадет с ошибкой.
Этот shortcode отвечает только за HTML-изображение, `preload` и `srcset`. Он не рендерит `H1` страницы, не влияет на `title` и больше не выводит отдельный JSON-LD.
Текущее hero-изображение главной страницы — отдельное исключение: оно живет в `layouts/_shortcodes/home-content-section.html` и `layouts/_shortcodes/home-content-section-ru.html` и сейчас не проходит через `seo-image`.

JSON-LD для основного изображения страницы собирается централизованно через `layouts/_partials/_schema/page-image-object.html` и попадает в общий `@graph`. Источник URL изображения - поле `image` во front matter через helper `page-image.html`.

Для товарных страниц текущий стандарт проекта такой:

- `image` во front matter — для `og:image`, `twitter:image` и schema;
- `cover.image` — для preview в листингах;
- `seo-image` в теле страницы — для основного видимого изображения карточки.

## 1. Главное изображение товара в первом экране (LCP)

Сначала во front matter:

```yaml
image: "01-front.png"
cover:
  image: "01-front.png"
  alt: "Кресло Aerocool SKY 360"
  relative: true
  hiddenInSingle: true
```

Потом в теле страницы:

```md
{{< seo-image 
  src="01-front.png"
  width="2000"
  height="2000"
  alt="Кресло Aerocool SKY 360 — эргономичная модель с 11D регулировкой"
  title="Aerocool SKY 360"
  loading="eager"
  preload=true
  fetchpriority=high
  class="w-full rounded-2xl"
  sizes="100vw"
/>}}
```

- Для главного изображения товара использовать `loading="eager"`, `preload=true`, `fetchpriority=high`.
- Для квадратного фронтального product image нормален точный размер `2000x2000`.
- Параметр `jsonld` больше не нужен: schema для primary image берется из `image` во front matter.
- `jsonld=true` / `jsonld=false` в новых материалах не добавлять. Если legacy-параметр встречается в старом контенте, его можно удалить: текущий shortcode его не использует.

## 2. Основное контентное изображение

```md
{{< seo-image 
  src="wing-mesh-black.png"
  width="1200"
  height="800"
  alt="Кресло Aerocool WING Mesh Black"
  title="Aerocool WING Mesh Black"
  loading="lazy"
  preload=false
  fetchpriority=auto
  class="w-full rounded-2xl"
  sizes="(max-width: 768px) 100vw, 1200px"
/>}}
```

- Для обычных изображений внутри страницы использовать `loading="lazy"`.
- `width` и `height` обязательны, потому что shortcode строит адаптивный рендер и помогает избежать `CLS`.

## 3. Второстепенное или галерейное изображение

```md
{{< seo-image 
  src="wing-mesh-side.png"
  width="800"
  height="600"
  alt="Вид сбоку кресла Aerocool WING Mesh Black"
  title="Aerocool WING Mesh Black — вид сбоку"
  loading="lazy"
  preload=false
  fetchpriority=auto
  class="w-full rounded-xl"
  sizes="(max-width: 768px) 100vw, 800px"
/>}}
```

## Параметры

- `src`: имя файла внутри папки страницы
- `alt`: обязательное описание изображения
- `title`: короткий заголовок для интерфейса страницы; не дублировать `alt` слово в слово
- `width` / `height`: размеры целевого рендера; если заданы оба значения, shortcode формирует точный итоговый кадр под эту пропорцию
- `loading`: `eager` для LCP, `lazy` для всего остального
- `preload`: использовать только для главных изображений первого экрана
- `fetchpriority`: `high` только для главных изображений первого экрана
- `sizes`: media query для адаптивной загрузки
- `class`: Tailwind-классы
- `jsonld`: legacy-параметр без эффекта в текущей архитектуре

## Важно

1. Текущий рекомендуемый стандарт для статей и новостей с локальной обложкой в проекте — `image + cover.image + seo-image`. Fallback на `images/default-article.jpg` или `images/default-news.jpg` допустим только если локальной обложки в папке страницы действительно нет.
2. Не использовать устаревшие примеры с `Baron` в новых материалах; ориентироваться на текущие серии `SKY`, `WING`, `XTAL`.
3. Не вставлять через shortcode изображения, которых нет в папке страницы.
4. На переведенной странице локализовать `alt` и `title`, даже если используется тот же исходный файл изображения.
5. Для product page не забывать, что `cover.image` нужен отдельно: без него картинка появится в теле страницы, но не появится в preview-листингах.
6. Для schema.org основным источником изображения остается front matter `image`, а не параметры shortcode.
