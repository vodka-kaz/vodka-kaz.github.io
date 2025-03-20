const CACHE_NAME = "vodka-cache-v1";

// Файлы для кэширования
const urlsToCache = [
  "/cache/styles-bcd890.css",
  "/cache/styles2-efg012.css",
  "/cache/font-ghi789.css",
  "/cache/styles.amp-min.css",
  "/cache/amp-abc123.js",
  "/cache/eventListeners-def456.js",
  "/cache/menuToggle-jkl012.js",
  "/cache/promo-code-pqr678.js",
  "/cache/questSteps-stu901.js",
  "/cache/randomColor-vwx234.js",
  "/cache/vodka-hij345.js",
  "/cache/vodka-casino-567.svg",
  "/cache/vodka-kazino-456.svg",
  "/cache/android-chrome-192x192-min.webp",
  "/cache/android-chrome-512x512-min.webp",
  "/cache/apple-touch-icon-180x180-min.webp",
  "/cache/favicon-16x16-min.webp",
  "/cache/favicon-32x32-min.webp",
  "/cache/favicon-48x48-min.webp",
  "/cache/favicon-64x64-min.webp",
  "/cache/favicon-96x96-min.webp",
  "/cache/favicon-min.svg",
  "/cache/favicon-min.ico",
  "/cache/vodka-casino-min.webp",
  "/cache/web-app-manifest-192x192-min.webp",
];

// Установка Service Worker и кэширование ресурсов
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Кэш загружен");
      return cache.addAll(urlsToCache);
    })
  );
});

// Очистка старого кеша при обновлении
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Перехват запросов и работа с кешем
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("✅ Отдаём из кеша:", event.request.url);
        return cachedResponse;
      }
      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => new Response("⚠️ Ошибка: Нет сети", { status: 500 }));
    })
  );
});
