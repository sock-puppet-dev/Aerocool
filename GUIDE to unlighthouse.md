Unlighthouse — это инструмент, который запускает Lighthouse не для одной страницы,
а для многих страниц сайта сразу.

Установка:
npm install -g unlighthouse

Проверка:
unlighthouse --version

Обновить:
npm install -g unlighthouse@latest

Запуск:
unlighthouse --site https://aerocool.ua

Что произойдёт:
1. Unlighthouse откроет сайт
2. найдёт внутренние ссылки
3. выберет страницы для аудита
4. запустит Lighthouse
5. создаст локальный dashboard
6. откроет результаты в браузере

Главные метрики в Unlighthouse:
Он основан на Lighthouse, поэтому метрики похожие:

Метрика             Что значит
FCP                 First Contentful Paint — когда появился первый контент
LCP                 Largest Contentful Paint — когда появился главный большой элемент
CLS                 Cumulative Layout Shift — сдвиги макета
TBT                 Total Blocking Time — блокировка главного потока
Speed Index         Скорость визуального заполнения
TTI                 Time to Interactive, в новых версиях менее важен
Performance Score   Общая оценка производительности

Для твоего Hugo-сайта самые важные:
LCP
CLS
TBT
FCP
Performance Score
SEO Score

Unlighthouse хорош для разработки.
Для SEO-реальности нужно ещё смотреть:

Google Search Console → Core Web Vitals
PageSpeed Insights
Chrome UX Report

Ниже — максимальный production-набор конфигов Unlighthouse под твой сайт:
Hugo v0.160+
Netlify
aerocool.ua
мультиязычность uk / ru
SEO
Core Web Vitals
Lighthouse
Unlighthouse

Что запускать
Из папки:
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse

npm run audit:urls
npm run audit
npm run audit:mobile
npm run audit:desktop
npm run audit:strict
npm run audit:preview

Главный рабочий порядок для тебя:
cd /Users/stadnyk/MEGA/Aerocool/unlighthouse
npm run audit:urls
npm run audit
npm run audit:strict

audit:urls      быстрая проверка главных шаблонов.
audit           обычная проверка production.
audit:strict    глубокая проверка перед важным релизом.

Финальная проверка установки:

cd /Users/stadnyk/MEGA/Aerocool/unlighthouse

npm run audit:urls
npm run audit
npm run audit:desktop


npm run audit:urls      → unlighthouse/reports/critical-urls/
npm run audit           → unlighthouse/reports/production/
npm run audit:mobile    → unlighthouse/reports/mobile/
npm run audit:desktop   → unlighthouse/reports/desktop/
npm run audit:strict    → unlighthouse/reports/strict/
npm run audit:preview   → unlighthouse/reports/preview/

