import { defineUnlighthouseConfig } from 'unlighthouse/config'

/**
 * Unlighthouse Production Config
 * ------------------------------------------------------------
 * Назначение файла:
 * Основной регулярный аудит production-сайта https://aerocool.ua.
 *
 * Это главный конфиг для команды:
 * npm run audit
 *
 * Отличие от strict:
 * - быстрее;
 * - меньше samples;
 * - подходит для регулярного использования;
 * - проверяет сайт глубоко, но без чрезмерной нагрузки.
 */

export default defineUnlighthouseConfig({
  /**
   * Основной домен сайта.
   */
  site: 'https://aerocool.ua',

  /**
   * Папка для обычных production-отчётов.
   */
  outputPath: './reports/production',

  /**
   * Каждый аудит должен быть свежим.
   */
  cache: false,

  /**
   * userAgent
   * ------------------------------------------------------------
   * Пользовательский User-Agent для технического аудита.
   *
   * Это полезно в логах Netlify:
   * ты сможешь понять, что запросы пришли от твоего аудита,
   * а не от обычного пользователя или бота.
   */
  userAgent: 'Aerocool-Unlighthouse-Audit/1.0',

  scanner: {
    /**
     * Основной production-аудит делаем mobile-first.
     */
    device: 'mobile',

    /**
     * Включаем throttling.
     */
    throttle: true,

    /**
     * 2 samples = хороший баланс.
     *
     * Быстрее, чем strict,
     * но точнее, чем один случайный запуск.
     */
    samples: 2,

    /**
     * Запас по URL.
     */
    maxRoutes: 500,

    /**
     * Берём URL из sitemap.xml.
     */
    sitemap: true,

    /**
     * Не учитываем robots.txt только для аудита,
     * чтобы Unlighthouse не пропускал все страницы.
     */
    robotsTxt: false,

    /**
     * Включаем crawler как дополнительный механизм поиска ссылок.
     */
    crawler: true,

    /**
     * Для Hugo не нужно выполнять JS для поиска ссылок.
     */
    skipJavascript: true,

    /**
     * Проверяем обе языковые версии.
     */
    ignoreI18nPages: false,

    /**
     * Для твоего сайта лучше не группировать страницы слишком сильно.
     */
    dynamicSampling: false,

    /**
     * Исключения.
     */
    exclude: [
      /**
       * Технические/архивные страницы Hugo.
       */
      '/tags/**',
      '/categories/**',
      '/page/**',

      /**
       * Мусорные WordPress-сканирования.
       */
      '/wp-**',
      '/wp-admin/**',
      '/wp-content/**',
      '/wp-includes/**',
      '/xmlrpc.php',

      /**
       * Частые bot-scan пути.
       */
      '/.git/**',
      '/.env',
      '/.env.**',
      '/openid_connect/**',
      '/cpanel/**',

      /**
       * Не HTML-страницы.
       */
      '/sitemap.xml',
      '/robots.txt',
      '/manifest.webmanifest',
      '/site.webmanifest',
      '/sw.js'
    ]
  },

  lighthouseOptions: {
    /**
     * Основные категории аудита.
     */
    onlyCategories: [
      'performance',
      'accessibility',
      'best-practices',
      'seo'
    ],

    /**
     * Очищаем storage перед запуском.
     */
  },

  ci: {
    /**
     * Production-бюджеты.
     *
     * Цель сайта — 100/100,
     * но performance budget 95 даёт небольшой запас
     * на естественные колебания Lighthouse.
     */
    budget: {
      performance: 95,
      accessibility: 100,
      'best-practices': 100,
      seo: 100
    },

    /**
     * Статический отчёт можно сохранять.
     */
    buildStatic: true
  }
})