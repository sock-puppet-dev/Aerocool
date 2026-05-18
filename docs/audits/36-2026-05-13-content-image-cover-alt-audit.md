# Аудит Контентных Изображений, Cover И Alt

Дата: 2026-05-13.

## Цель

Проверить весь `content/**/*.md` на наличие и качество связки:

- `image`;
- `cover.image`;
- `cover.alt`;
- `cover.relative`;
- `cover.hiddenInSingle`.

## Итог

- Проверено `76` markdown-файлов в `content/`.
- У всех файлов есть `image`.
- У всех файлов есть полный служебный `cover`-блок.
- `cover.alt` заполнен, локализован и не начинается с общей формулы `Обложка` / `Обкладинка`.
- Для page bundle и section bundle используется `relative: true`.
- Для служебных страниц, которые переиспользуют root/section assets, используется `relative: false`.
- `layouts/_partials/page-image.html` больше не использует `images/logo.svg` как общий social fallback; для страниц без собственного `image` применяется root `cover.webp`.

## Зафиксированный стандарт

Для обычных bundle-страниц:

```yaml
image: "cover.webp"
cover:
  image: "cover.webp"
  alt: "Каталог крісел Aerocool в Україні"
  relative: true
  hiddenInSingle: true
```

Для служебных страниц с переиспользованием root/section картинки:

```yaml
image: "/cover.webp"
cover:
  image: "/cover.webp"
  alt: "Пошук по сайту Aerocool"
  relative: false
  hiddenInSingle: true
```

## Правило Для `cover.alt`

`cover.alt` должен описывать тему или объект изображения на языке страницы. Для SEO, accessibility и social/listing previews лучше писать `Кресло Aerocool SKY 360`, `Серия Aerocool WING`, `FAQ Aerocool в Украине`, чем служебное `Обложка страницы...`.

## Контрольные Проверки

- `content/**/*.md`: проверено `76` файлов, `issues=0` по наличию `image`, полному `cover`-блоку, качеству `cover.alt` и существованию assets.
- `content/**/*.md`: не найдено markdown `# H1`, inline-code через обратные кавычки и старых формулировок `Обложка` / `Обкладинка`.
- `public/**/*.html`: `missing_internal_refs=0`.
- `public/**/*.html`: `jsonld_parse_issues=0`.
- `public/**/*.html`: не найдено `og:image` / `twitter:image` с fallback на `images/logo.svg`.
- Контентные пороги проекта для статей, новостей, товарных страниц, серий, хабов и `/about/`: `below_content_targets=0`.
- `npm run build`: сборка Hugo прошла успешно.

## Обновленная Документация

- [README.md](/Users/stadnyk/MEGA/Aerocool/README.md)
- [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md)
- [docs/content/05-front-matter-reference.md](/Users/stadnyk/MEGA/Aerocool/docs/content/05-front-matter-reference.md)
- [docs/content/07-content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/07-content-seo-checklist-2026.md)
- [docs/content/06-seo-image-shortcode.md](/Users/stadnyk/MEGA/Aerocool/docs/content/06-seo-image-shortcode.md)
- [docs/content/templates/08-article-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/08-article-template.md)
- [docs/content/templates/09-news-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/09-news-template.md)
- [docs/content/templates/11-series-template.md](/Users/stadnyk/MEGA/Aerocool/docs/content/templates/11-series-template.md)
- [docs/quality/13-unlighthouse-site-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/13-unlighthouse-site-audit.md)
- [layouts/_partials/page-image.html](/Users/stadnyk/MEGA/Aerocool/layouts/_partials/page-image.html)
