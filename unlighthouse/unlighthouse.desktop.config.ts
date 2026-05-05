import { defineUnlighthouseConfig } from 'unlighthouse/config'
import { cleanPuppeteerOptions, qualityCategories } from './unlighthouse.shared.ts'

/**
 * Unlighthouse Desktop Config
 * ------------------------------------------------------------
 * Назначение файла:
 * Проверять https://aerocool.ua в desktop-режиме.
 *
 * Почему desktop тоже нужен:
 * - пользователи могут заходить с ноутбуков и ПК;
 * - Google PageSpeed Insights показывает отдельный desktop-результат;
 * - на desktop могут быть другие hero-изображения;
 * - layout может отличаться от mobile;
 * - большие изображения могут стать LCP-элементом.
 *
 * Команда запуска:
 * npm run audit:desktop
 */

export default defineUnlighthouseConfig({
  /**
   * Production-домен сайта.
   */
  site: 'https://aerocool.ua',

  /**
   * Отдельная папка для desktop-отчётов.
   */
  outputPath: './reports/desktop',

  /**
   * Выключаем кэш, чтобы каждый запуск был свежим.
   */
  cache: false,

  puppeteerOptions: cleanPuppeteerOptions,

  scanner: {
    /**
     * desktop = аудит как на большом экране.
     */
    device: 'desktop',

    /**
     * Включаем throttling для более честного теста.
     */
    throttle: true,

    /**
     * Desktop обычно стабильнее mobile, но 3 samples дают хороший результат.
     */
    samples: 3,

    /**
     * Запас по количеству страниц.
     */
    maxRoutes: 500,

    /**
     * Используем sitemap.xml от Hugo.
     */
    sitemap: true,

    /**
     * Отключаем robots.txt для технического аудита,
     * потому что у тебя он уже блокировал маршруты в Unlighthouse.
     */
    robotsTxt: false,

    /**
     * Разрешаем crawler, если нужно будет дополнительно найти ссылки.
     */
    crawler: true,

    /**
     * Для Hugo-сайта ссылки уже есть в HTML, JS для поиска ссылок не нужен.
     */
    skipJavascript: true,

    /**
     * Проверяем и украинскую, и русскую версии.
     */
    ignoreI18nPages: false,

    /**
     * Не группируем динамические маршруты слишком агрессивно.
     */
    dynamicSampling: false,

    /**
     * Исключаем технические и не-HTML маршруты.
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
     * Проверяем основные категории качества.
     */
    onlyCategories: qualityCategories,

    /**
     * Чистый запуск без старого storage.
     */
  },

  ci: {
    /**
     * Для desktop performance можно требовать строже.
     * У твоего Hugo-сайта desktop должен быть близко к 100.
     */
    budget: {
      performance: 98,
      accessibility: 100,
      'best-practices': 100,
      seo: 100
    },

    /**
     * Разрешаем статический отчёт.
     */
    buildStatic: true
  }
})
