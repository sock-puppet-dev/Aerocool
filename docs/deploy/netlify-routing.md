# Netlify Routing И Forced 404

Обновлено: 2026-05-06.

Этот документ описывает, как в проекте устроены Netlify redirects и кастомная `404`.

## 1. Где Живут Правила

В проекте есть два слоя routing-настроек:

- `static/_redirects` — plain text `_redirects` для Netlify. Hugo копирует его в `public/_redirects` как статический файл.
- `netlify.toml` — основной Netlify config со сборкой, headers и общим fallback на `404`.

Netlify обрабатывает `_redirects` раньше правил из `netlify.toml`. Внутри файла первое совпавшее правило выигрывает, поэтому более конкретные правила должны стоять выше более общих.

## 2. Назначение `static/_redirects`

Текущий `static/_redirects` не является SEO-картой старых URL.

Его задача — принудительно отдавать кастомную `404` для типовых bot/scanner запросов:

- WordPress scanner URL: `/wp-login.php`, `/wp-admin/*`, `/xmlrpc.php`;
- sensitive files: `/.env`, `/.git/*`, `/.aws/*`;
- common backup/config probes: `/config.php`, `/database.sql`, `/backup.sql`;
- cPanel/OpenID probes: `/cpanel/*`, `/openid_connect/*`.

Для таких правил используется статус `404!`.

## 3. Почему `404!`

В Netlify `404` показывает страницу ошибки без смены URL в адресной строке.

`!` делает правило forced. Это важно для scanner/sensitive URL: если файл с таким путем случайно окажется в publish-директории, forced rule все равно должен отдать кастомную `404`, а не содержимое файла.

Пример:

```text
/.env                                   /404.html  404!
/.git/*                                 /404.html  404!
```

Это не заменяет нормальную hygiene проекта: `.env`, `.git`, `.DS_Store`, дампы БД и backup-файлы не должны попадать в `static/` и `public/`.

## 4. Синтаксис Netlify

В `_redirects` нельзя использовать `*` как wildcard в середине пути.

Не делать так:

```text
/*/wp-login.php                         /404.html  404!
/*/.env                                 /404.html  404!
```

Для одного path segment использовать placeholder:

```text
/:prefix/wp-login.php                   /404.html  404!
/:prefix/.env                           /404.html  404!
```

Для остатка пути использовать splat в конце:

```text
/wp-admin/*                             /404.html  404!
/cpanel/*                               /404.html  404!
```

Текущие `/:prefix/...` правила покрывают один уровень вложенности, например `/ru/wp-login.php`. Более глубокие scanner URL обычно перехватываются общим fallback из `netlify.toml`.

## 5. Общий Fallback 404

Общий fallback находится в `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

Он нужен, чтобы все несуществующие URL получали кастомную `404`. Отдельные правила в `static/_redirects` нужны только там, где важен forced `404!` или более явная обработка scanner-noise.

## 6. `layouts/404.html`

HTML кастомной страницы ошибки задается в `layouts/404.html`.

Для нее обязательно:

- украинская и русская версии должны оставаться локализованными;
- `/404.html` и `/ru/404.html` должны оставаться `noindex,nofollow`;
- страница не должна рендерить JSON-LD;
- ссылка на главную должна вести на текущий язык: `/` для `uk`, `/ru/` для `ru`;
- после изменения 404-шаблона проверять главную, `/404.html` и `/ru/404.html`.

## 7. Проверка После Правок

Минимальная проверка:

```bash
npm run build
nl -ba public/_redirects
find static public -name '.DS_Store' -print
```

Что проверить:

- `public/_redirects` содержит актуальные правила из `static/_redirects`;
- нет mid-path splat вида `/*/something`;
- scanner/sensitive правила используют `404!`;
- файл заканчивается newline;
- `.DS_Store` не попал в `static/` и `public/`;
- `public/404.html` и `public/ru/404.html` содержат `noindex,nofollow`.

Для полной проверки redirect engine лучше использовать Netlify Deploy Preview или Netlify CLI, потому что локальная Hugo-сборка проверяет генерацию файлов, но не полностью эмулирует Netlify routing.
