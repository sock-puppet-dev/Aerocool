# Исправление Сводки Lighthouse В Netlify

Обновлено: 2026-06-01.

Этот документ фиксирует решение по проблеме сводки Lighthouse в Netlify для проекта `Aerocool Ukraine`.

## 1. Короткий Итог

Официальный плагин `@netlify/plugin-lighthouse` больше не используется в проекте.

Причина: в текущем runtime Netlify плагин мог завершаться как успешный, но отдавать пустой результат:

```text
@netlify/plugin-lighthouse ran successfully
Summary for path '/': undefined
```

Вместо него подключен локальный build-плагин проекта:

```text
netlify/plugins/lighthouse-summary/
```

Он подключается в `netlify.toml`:

```toml
[[plugins]]
  package = "./netlify/plugins/lighthouse-summary"
```

## 2. Что Было Проверено

Была проверена версия с официальным плагином:

```text
@netlify/plugin-lighthouse@6.0.4 from netlify.toml and package.json
```

Двойной конфигурации не было: плагин в Netlify UI был отключен, а в deploy log плагин загружался один раз из `netlify.toml`.

Несмотря на это, Deploy Summary продолжал показывать:

```text
Summary for path '/': undefined
```

Это означает, что проблема была не в HTML страницы и не в двойном подключении, а в связке официального плагина, runtime Lighthouse/Chrome/Puppeteer и build environment Netlify.

## 3. Почему Не Оставили Официальный Плагин

Официальный `@netlify/plugin-lighthouse` на момент проверки тянул устаревший стек:

```text
lighthouse 9.x
puppeteer 24.8.2
```

Дополнительно `puppeteer 24.8.2` уже отдавал warning:

```text
puppeteer@24.8.2: < 24.15.0 is no longer supported
```

Главная практическая проблема была не в warning, а в том, что плагин скрывал внутреннюю ошибку и отдавал пользователю не диагностируемый результат `undefined`.

## 4. Текущее Решение

В проект добавлены прямые dev-зависимости:

```json
"chrome-launcher": "1.2.1",
"lighthouse": "13.3.0",
"puppeteer": "25.1.0"
```

Локальный плагин:

- запускается после успешного Netlify deploy;
- берет опубликованный URL из `DEPLOY_PRIME_URL`, `DEPLOY_URL` или `URL`;
- проверяет путь `/`;
- пропускает audit `is-crawlable`, потому что branch deploy сейчас намеренно может быть `development/noindex`;
- выводит читаемый Deploy Summary;
- не является жестким production gate и не блокирует deploy по score.

## 5. Подтвержденный Результат

После замены plugin на локальный Netlify Branch Deploy `dev@e858777` успешно показал:

```text
./netlify/plugins/lighthouse-summary ran successfully
Lighthouse summary for path '/': Performance: 100, Accessibility: 100, Best Practices: 100, SEO: 100, Agentic Browsing: 100
```

В этом же deploy:

```text
found 0 vulnerabilities
Building without cache
```

То есть проверка прошла без старого cache и без npm vulnerabilities.

## 6. Что Не Делать В Netlify UI

В Netlify UI может появляться баннер:

```text
Install Lighthouse plugin
```

Не нажимать эту кнопку.

Она снова установит официальный `@netlify/plugin-lighthouse`, который был заменен из-за результата `Summary for path '/': undefined`.

Правильный источник Lighthouse summary для проекта сейчас только этот:

```text
netlify/plugins/lighthouse-summary/
```

## 7. Как Проверять После Следующих Deploy

В Deploy Summary должно быть:

```text
./netlify/plugins/lighthouse-summary ran successfully
Lighthouse summary for path '/': Performance: ..., Accessibility: ..., Best Practices: ..., SEO: ..., Agentic Browsing: ...
```

В Deploy log должно быть:

```text
./netlify/plugins/lighthouse-summary@1.0.0 from netlify.toml
```

В Deploy Summary не должно быть:

```text
@netlify/plugin-lighthouse
Summary for path '/': undefined
```

Если снова появляется `@netlify/plugin-lighthouse`, значит официальный plugin был повторно установлен через Netlify UI или возвращен в `netlify.toml` / `package.json`.

## 8. Связанные Файлы

Основные файлы решения:

- `netlify.toml`
- `netlify/plugins/lighthouse-summary/index.js`
- `netlify/plugins/lighthouse-summary/manifest.yml`
- `package.json`
- `package-lock.json`

Профильная документация:

- [docs/deploy/16-netlify-routing.md](/Users/stadnyk/MEGA/Aerocool/docs/deploy/16-netlify-routing.md)
- [docs/quality/14-lighthouse-single-page-audit.md](/Users/stadnyk/MEGA/Aerocool/docs/quality/14-lighthouse-single-page-audit.md)

## 9. Статус

Статус на 2026-06-01:

```text
Закрыто.
```

Причина закрытия:

- официальный plugin заменен;
- локальный plugin работает;
- Deploy Summary больше не показывает `undefined`;
- npm dependencies чистые;
- документация синхронизирована.
