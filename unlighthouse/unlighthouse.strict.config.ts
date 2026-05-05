import { defineUnlighthouseConfig } from 'unlighthouse/config'
import { cleanPuppeteerOptions, qualityCategories } from './unlighthouse.shared.ts'

/**
 * Unlighthouse Strict Config
 * ------------------------------------------------------------
 * Назначение файла:
 * Максимально строгий аудит сайта.
 *
 * Когда использовать:
 * - перед важным релизом;
 * - после redesign;
 * - после добавления новых hero-изображений;
 * - после изменения Tailwind CSS;
 * - после изменения Product/Article schema.org;
 * - после изменения hreflang/canonical;
 * - после массового добавления новых страниц.
 *
 * Команда:
 * npm run audit:strict
 *
 * Важно:
 * Этот конфиг может работать дольше, потому что samples: 5.
 */

export default defineUnlighthouseConfig({
  /**
   * Production-сайт.
   */
  site: 'https://aerocool.ua',

  /**
   * Отдельная папка для strict-отчётов.
   */
  outputPath: './reports/strict',

  /**
   * Только свежий аудит.
   */
  cache: false,

  /**
   * debug false.
   *
   * Если появятся странные ошибки — можно временно поставить true
   * или запускать npm run audit:debug.
   */
  debug: false,

  puppeteerOptions: cleanPuppeteerOptions,

  scanner: {
    /**
     * Strict-аудит делаем mobile-first.
     */
    device: 'mobile',

    /**
     * Throttling включён.
     */
    throttle: true,

    /**
     * 5 прогонов на страницу.
     *
     * Это помогает сгладить случайные скачки:
     * - сеть;
     * - CPU;
     * - CDN;
     * - временная нагрузка MacBook.
     *
     * Минус:
     * аудит будет дольше.
     */
    samples: 5,

    /**
     * Очень большой запас по URL.
     *
     * Сейчас у тебя около 72 URL,
     * но если сайт вырастет, strict всё равно сможет проверить больше.
     */
    maxRoutes: 1000,

    /**
     * Используем sitemap.
     */
    sitemap: true,

    /**
     * Отключаем robots.txt для технического аудита.
     */
    robotsTxt: false,

    /**
     * Crawler включён как дополнительный механизм.
     */
    crawler: true,

    /**
     * Для статического Hugo-сайта JS для поиска ссылок не нужен.
     */
    skipJavascript: true,

    /**
     * Проверяем i18n-страницы.
     */
    ignoreI18nPages: false,

    /**
     * false = максимально подробно проверять найденные маршруты.
     */
    dynamicSampling: false,

    /**
     * Исключения.
     */
    exclude: [
      '/tags/**',
      '/categories/**',
      '/page/**',

      '/wp-**',
      '/wp-admin/**',
      '/wp-content/**',
      '/wp-includes/**',
      '/xmlrpc.php',

      '/.git/**',
      '/.env',
      '/.env.**',
      '/openid_connect/**',
      '/cpanel/**',

      '/sitemap.xml',
      '/robots.txt',
      '/manifest.webmanifest',
      '/site.webmanifest',
      '/sw.js'
    ]
  },

  lighthouseOptions: {
    /**
     * Проверяем все основные категории.
     */
    onlyCategories: qualityCategories,

    /**
     * Чистый запуск.
     */
  },

  ci: {
    /**
     * Очень строгие бюджеты.
     *
     * Performance 98:
     * - не 100, потому что Lighthouse может прыгать;
     * - но достаточно строго для топового сайта.
     */
    budget: {
      performance: 98,
      accessibility: 100,
      'best-practices': 100,
      seo: 100
    },

    /**
     * Генерация статического отчёта.
     */
    buildStatic: true
  }
})
