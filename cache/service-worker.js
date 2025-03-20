self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("vodka-cache").then((cache) => {
      const urlsToCache = [
        "/vodka-kaz.online/cache/styles-bcd890.css",
        "/vodka-kaz.online/cache/styles2-efg012.css",
        "/vodka-kaz.online/cache/font-ghi789.css",
        "/vodka-kaz.online/cache/amp-abc123.js",
        "/vodka-kaz.online/cache/eventListeners-def456.js",
        "/vodka-kaz.online/cache/menuToggle-jkl012.js",
        "/vodka-kaz.online/cache/promo-code-pqr678.js",
        "/vodka-kaz.online/cache/questSteps-stu901.js",
        "/vodka-kaz.online/cache/randomColor-vwx234.js",
        "/vodka-kaz.online/cache/vodka-hij345.js",
        "/vodka-kaz.online/cache/vodka-casino-567.svg",
        "/vodka-kaz.online/cache/vodka-kazino-456.svg",
        "/vodka-kaz.online/cache/android-chrome-192x192-min.webp",
        "/vodka-kaz.online/cache/android-chrome-512x512-min.webp",
        "/vodka-kaz.online/cache/apple-touch-icon-180x180-min.webp",
        "/vodka-kaz.online/cache/favicon-16x16-min.webp",
        "/vodka-kaz.online/cache/favicon-32x32-min.webp",
        "/vodka-kaz.online/cache/favicon-48x48-min.webp",
        "/vodka-kaz.online/cache/favicon-64x64-min.webp",
        "/vodka-kaz.online/cache/favicon-96x96-min.webp",
        "/vodka-kaz.online/cache/favicon-min.svg",
        "/vodka-kaz.online/cache/favicon-min.ico",
        "/vodka-kaz.online/cache/vodka-casino-min.webp",
        "/vodka-kaz.online/cache/web-app-manifest-192x192-min.webp",
      ];

      return Promise.all(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => console.warn(`⚠️ Не удалось закешировать ${url}:`, err))
        )
      ).then(() => console.log("✅ Статические файлы закешированы"))
       .catch((error) => console.error("❌ Ошибка кеширования:", error));
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("vodka-cache").then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log("✅ Загружено из кеша:", event.request.url);
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch((err) => {
          console.error("❌ Ошибка загрузки из сети:", err);
          return new Response(null, { status: 500, statusText: "Ошибка сети" });
        });
      });
    })
  );
});
