# Руководство По Shortcode `seo-image`

Короткое руководство по shortcode `seo-image` в текущем проекте `Aerocool`.

Shortcode `seo-image` находится в `layouts/_shortcodes/seo-image.html` и работает только с изображениями, которые лежат внутри папки страницы (`page bundle` в терминологии Hugo). Если файла нет рядом со страницей, сборка упадет с ошибкой.
Этот shortcode отвечает только за изображение, `preload`, `srcset` и необязательный `ImageObject` JSON-LD. Он не рендерит `H1` страницы и не влияет на `title`.
Текущее hero-изображение главной страницы — отдельное исключение: оно живет в `layouts/_shortcodes/home-content-section.html` и `layouts/_shortcodes/home-content-section-ru.html` и сейчас не проходит через `seo-image`.

## 1. Главное изображение товара в первом экране (LCP)

```md
{{< seo-image 
  src="sky-360.png"
  width="1920"
  height="1080"
  alt="Кресло Aerocool SKY 360 — эргономичная модель с 11D регулировкой"
  title="Aerocool SKY 360"
  loading="eager"
  preload=true
  fetchpriority=high
  class="w-full rounded-2xl shadow-xl"
  sizes="100vw"
  jsonld=true
/>}}
```

- Для главного изображения товара использовать `loading="eager"`, `preload=true`, `fetchpriority=high`.
- `jsonld=true` оставлять только на основной языковой версии страницы.
- Для перевода использовать тот же shortcode, но ставить `jsonld=false`, даже если картинка и `src` остаются теми же.

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
  class="w-full rounded-2xl shadow-lg"
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
- `jsonld`: `true` только на основной языковой странице, `false` на переводе; даже если на переводе по ошибке оставить `true`, shortcode не выведет `ImageObject`

## Важно

1. Для статей и новостей без локальной обложки можно не использовать shortcode, а задать `image` во front matter как `images/default-article.jpg` или `images/default-news.jpg`.
2. Не использовать устаревшие примеры с `Baron` в новых материалах; ориентироваться на текущие серии `SKY`, `WING`, `XTAL`.
3. Не вставлять через shortcode изображения, которых нет в папке страницы.
4. На переведенной странице локализовать `alt` и `title`, даже если используется тот же исходный файл изображения.
