Lighthouse — это open-source инструмент для автоматического аудита качества веб-страниц. Он проверяет:

Performance         скорость загрузки, LCP, CLS, TBT, FCP
Accessibility       доступность сайта для пользователей с ограничениями
Best Practices      безопасность, HTTPS, ошибки в консоли, устаревшие API
SEO                 meta description, canonical, hreflang, robots.txt, mobile-friendly
PWA                 базовые требования Progressive Web App


Как запускать Lighthouse

Для твоего Hugo + Netlify сайта главный вариант:

lighthouse https://aerocool.ua --view

Lighthouse — это лабораторный тест. То есть он измеряет страницу в контролируемых условиях. 
Для настоящего SEO и Core Web Vitals тебе нужно смотреть два типа данных:

Тип данных          Где смотреть                                                    Значение
Lab data            Lighthouse, DevTools                                            Тест “здесь и сейчас”
Field data          PageSpeed Insights, Chrome UX Report, Google Search Console     Реальные пользователи

Для топового Hugo-сайта недостаточно просто иметь 100/100 Lighthouse. 
Это отлично, но нужно также держать реальные Core Web Vitals в зелёной зоне.


Что особенно важно для твоего Hugo-сайта
Для aerocool.ua я бы использовал Lighthouse как строгий чекер после каждого изменения:

Изменение на сайте                          Что проверять в Lighthouse
Добавил hero-картинку                       LCP
Добавил изображения без width / height      CLS
Добавил JS, слайдер, анимации               TBT / INP-related diagnostics
Добавил шрифты                              FCP / render-blocking
Добавил Tailwind UI блоки                   размер CSS, unused CSS
Добавил новые страницы товаров              SEO, canonical, meta description
Добавил мультиязычность                     hreflang


Команды для твоего проекта:
Установка:                              npm install -g lighthouse          
Обычный тест:                           lighthouse https://aerocool.ua
Открыть отчёт сразу в браузере:         lighthouse https://aerocool.ua --view

Отчет HTML + JSON одновременно:

lighthouse https://aerocool.ua \
  --output html \
  --output json \
  --output-path ~/Desktop/aerocool-home \
  --view

Lighthouse создаст два файла:

~/Desktop/aerocool-home.report.html
~/Desktop/aerocool-home.report.json


Для твоего сайта Lighthouse нужен как постоянный технический контроль качества:
Hugo build → Netlify deploy → Lighthouse test → PageSpeed Insights → Search Console

Для SEO топ-1 важнее связка:
Lighthouse 100
+ реальные Core Web Vitals зелёные
+ сильная структура контента
+ schema.org JSON-LD
+ правильный hreflang
+ canonical
+ быстрая индексация
+ качественные страницы товаров


Проверить твою установленную версию:
lighthouse --version

Проверить последнюю версию в npm
npm view lighthouse version

Обновить Lighthouse
npm install -g lighthouse@latest










