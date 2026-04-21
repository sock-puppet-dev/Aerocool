Короткий гид по shortcode `seo-image` в текущем проекте `Aerocool`.

Shortcode живет в `layouts/_shortcodes/seo-image.html` и работает только с изображениями, которые лежат внутри page bundle. Если файла нет рядом со страницей, сборка упадет с ошибкой.

1. Hero / LCP изображение товара

```md
{{< seo-image 
  src="sky-360.png"
  width="1920"
  height="1080"
  alt="Крісло Aerocool SKY 360 — ергономічна модель з 11D регулюванням"
  title="Aerocool SKY 360"
  loading="eager"
  preload=true
  fetchpriority=high
  class="w-full rounded-2xl shadow-xl"
  sizes="100vw"
  jsonld=true
/>}}
```

- Для главного изображения товара используем `loading="eager"`, `preload=true`, `fetchpriority=high`.
- `jsonld=true` оставляем только на основной языковой версии страницы.
- Для перевода используем тот же shortcode, но ставим `jsonld=false`.

2. Основное контентное изображение

```md
{{< seo-image 
  src="wing-mesh-black.png"
  width="1200"
  height="800"
  alt="Крісло Aerocool WING Mesh Black"
  title="Aerocool WING Mesh Black"
  loading="lazy"
  preload=false
  fetchpriority=auto
  class="w-full rounded-2xl shadow-lg"
  sizes="(max-width: 768px) 100vw, 1200px"
/>}}
```

- Для обычных изображений внутри страницы используем `loading="lazy"`.
- `width` и `height` обязательны, потому что shortcode строит адаптивный рендер и помогает избежать CLS.

3. Второстепенное / галерейное изображение

```md
{{< seo-image 
  src="wing-mesh-side.png"
  width="800"
  height="600"
  alt="Боковий вигляд Aerocool WING Mesh Black"
  title="Aerocool WING Mesh Black — боковий вигляд"
  loading="lazy"
  preload=false
  fetchpriority=auto
  class="w-full rounded-xl"
  sizes="(max-width: 768px) 100vw, 800px"
/>}}
```

Параметры:
- `src`: имя файла внутри page bundle.
- `alt`: обязательное описание изображения.
- `title`: короткий title для UX, не дублировать alt слово в слово.
- `width` / `height`: размеры исходного целевого рендера.
- `loading`: `eager` для LCP, `lazy` для всего остального.
- `preload`: использовать только для hero.
- `fetchpriority`: `high` только для hero.
- `sizes`: media query для адаптивной загрузки.
- `class`: Tailwind-классы.
- `jsonld`: `true` только на основной языковой странице, `false` на переводе.

Важно:
1. Для статей и новостей без локальной обложки можно не использовать shortcode, а задать `image` в front matter как `images/default-article.jpg` или `images/default-news.jpg`.
2. Не использовать legacy-примеры с `Baron` в новых материалах; ориентироваться на текущие серии `SKY`, `WING`, `XTAL`.
3. Не вставлять через shortcode изображения, которых нет в bundle страницы.
