# Текущий Аудит Документации 2026-05-17

Дата аудита: 2026-05-17.

Этот документ фиксирует проверку текущей документации проекта `Aerocool Ukraine` на понятность для новичка, русский язык, строгую структуру, полноту оглавления, актуальность по фактическим файлам проекта и внешним SEO/Hugo/Netlify/Tailwind правилам.

## 1. Область Проверки

Проверены:

- корневые документы: [README.md](/Users/stadnyk/MEGA/Aerocool/README.md) и [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md);
- оглавление [docs/README.md](/Users/stadnyk/MEGA/Aerocool/docs/README.md);
- все markdown-файлы в `docs/`;
- активные гайды в `docs/content`, `docs/architecture`, `docs/deploy`, `docs/quality`, `docs/seo`;
- audit-снимки в `docs/audits`;
- фактические файлы проекта: `layouts/`, `hugo.yaml`, `netlify.toml`, `mise.toml`, `package.json`;
- внешние первичные источники для актуальности SEO, structured data, Hugo, Netlify и Tailwind CSS.

## 2. Проверенные Внешние Источники

Использованы только первичные источники:

- Google FAQ structured data: `https://developers.google.com/search/docs/appearance/structured-data/faqpage`
- Google Product snippet structured data: `https://developers.google.com/search/docs/appearance/structured-data/product-snippet`
- Hugo `css.TailwindCSS`: `https://gohugo.io/functions/css/tailwindcss/`
- Netlify build environment variables: `https://docs.netlify.com/build/configure-builds/environment-variables/`
- Netlify Hugo framework docs: `https://docs.netlify.com/frameworks/hugo/`
- Tailwind CSS v4.0: `https://tailwindcss.com/blog/tailwindcss-v4`

## 3. Что Проверено Машинно

Проверки:

- `40` markdown-файлов в `README.md`, `AGENTS.md` и `docs/`;
- `38` markdown-файлов внутри `docs/`;
- покрытие `docs/README.md`: все документы из `docs/` перечислены в оглавлении;
- отсутствие служебных англоязычных заголовков вроде `Scope`, `Findings`, `Current Status`, `Implementation Backlog`, `Executive Summary`, `Prioritized Fix Plan`;
- локальные markdown-ссылки на файлы проекта;
- сборка Hugo через `npm run build`.

## 4. Текущий Итог

Документация в целом соответствует требованию:

- основной язык документации — русский;
- структура входа для новичка есть: `README.md` -> `docs/README.md` -> профильные гайды;
- в `docs/README.md` перечислены все текущие документы;
- технические английские слова остаются только там, где это точные названия технологий, команд, полей, schema.org-типов или официальных терминов;
- контентные, SEO, schema, deploy и quality-гайды связаны с реальными файлами проекта;
- текущий статус `Netlify development/noindex` отражен в документации и не маскируется как production-готовность.

## 5. Исправлено В Этом Проходе

### P1. FAQ Rich Results Были Описаны Слишком Мягко

Официальная документация Google сообщает, что с `2026-05-07` FAQ rich results больше не показываются в Google Search. Поэтому FAQ больше нельзя описывать как ограниченную, но потенциальную Google SERP-цель.

Обновлены:

- [content/content-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/content/content-seo-checklist-2026.md);
- [seo/ecommerce-structured-data-playbook-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ecommerce-structured-data-playbook-2026.md);
- [seo/json-ld-graph-audit-roadmap-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/json-ld-graph-audit-roadmap-2026.md);
- [seo/schema-markup-quality-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/schema-markup-quality-checklist-2026.md);
- [seo/google-seo-audit-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/google-seo-audit-checklist-2026.md);
- [seo/ssg-seo-checklist-2026.md](/Users/stadnyk/MEGA/Aerocool/docs/seo/ssg-seo-checklist-2026.md);
- [audits/2026-04-29-google-rich-results-quality-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/audits/2026-04-29-google-rich-results-quality-audit.md).

Текущий стандарт: `FAQPage` можно оставлять для видимого FAQ, структуры страницы, AI/search-понимания и подтверждения сервисных фактов. Нельзя планировать SEO-результат вокруг Google FAQ rich result.

### P2. Helper-Гайд Не Покрывал Все Важные Layout-Файлы

Проверка `layouts/` показала, что [hugo-template-helpers.md](/Users/stadnyk/MEGA/Aerocool/docs/architecture/hugo-template-helpers.md) не называл часть верхнеуровневых layout-файлов и shortcode-файлов.

Добавлены понятные для новичка карты:

- верхнеуровневые layout-файлы;
- служебные страницы `404`, `search`, `alias`;
- sitemap и RSS;
- shortcode-файлы `home-hero`, `seo-image`, `faq-list`, `contact`.

### P2. Исторические Audit-Файлы Имели Неодинаковую Дату

Часть audit-снимков имела дату только в имени файла или в заголовке. Для строгой структуры добавлены явные строки даты сразу после заголовка.

### P2. Оглавления Нужно Было Обновить Под Новый Снимок

Новый audit-снимок добавлен в:

- [README.md](/Users/stadnyk/MEGA/Aerocool/README.md);
- [docs/README.md](/Users/stadnyk/MEGA/Aerocool/docs/README.md);
- [AGENTS.md](/Users/stadnyk/MEGA/Aerocool/AGENTS.md).

## 6. Что Осталось Намеренно

Не менялось:

- `Netlify` остается в `development/noindex`, потому что это осознанный project gate до production-перехода;
- `ProductGroup` остается staged, пока не будет подтвержден как `confirmed` в entity registry;
- рейтинг и отзывы остаются открытым бизнес-риском, пока источник ratings/reviews не будет явно подтвержден;
- исторические audit-оценки не переписывались как новые, кроме добавления текущих уточнений и дат.

## 7. Контрольный Вывод

На `2026-05-17` текущая документация проекта соответствует требованию: она русскоязычная, структурированная, связана с реальными файлами, ориентирована на новичка и актуализирована по найденному внешнему изменению Google FAQ rich results.

Следующий обязательный пересмотр нужен при любом из событий:

- перевод Netlify из `development` в `production`;
- изменение `schema_types`, entity registry или product front matter;
- изменение Hugo/Tailwind pipeline;
- появление подтвержденного источника отзывов и рейтингов;
- изменение Google/Netlify/Hugo/Tailwind официальной документации, влияющее на текущие правила проекта.
