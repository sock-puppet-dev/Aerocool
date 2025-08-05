// static/sw.js

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log('✅ Workbox загружен');

  // 🔧 Настройки кэша
  workbox.setConfig({ debug: false });

  // 💡 Кэш HTML-страниц (включая мультиязычные)
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 дней
        }),
      ],
    })
  );

  // 💡 Кэш стилей (CSS)
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'styles-cache',
    })
  );

  // 💡 Кэш скриптов (JS)
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'scripts-cache',
    })
  );

  // 💡 Кэш изображений
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
        }),
      ],
    })
  );

  // 🌐 Кэш webmanifest
  workbox.routing.registerRoute(
    /\/site\.webmanifest$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'manifest-cache',
    })
  );

  // 📄 Оффлайн fallback
  workbox.routing.setCatchHandler(async ({ event }) => {
    if (event.request.destination === 'document') {
      return caches.match('/offline.html');
    }
    return Response.error();
  });

} else {
  console.log('❌ Workbox не загружен');
}
