self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("vodka-cache").then((cache) => {
      const urlsToCache = [
        "/vodka-kaz.online/cashe/styles-bcd890.css",
        "/vodka-kaz.online/cashe/styles2-efg012.css",
        "/vodka-kaz.online/cashe/font-ghi789.css",
        "/vodka-kaz.online/cashe/amp-abc123.js",
        "/vodka-kaz.online/cashe/eventListeners-def456.js",
        "/vodka-kaz.online/cashe/menuToggle-jkl012.js",
        "/vodka-kaz.online/cashe/promo-code-pqr678.js",
        "/vodka-kaz.online/cashe/questSteps-stu901.js",
        "/vodka-kaz.online/cashe/randomColor-vwx234.js",
        "/vodka-kaz.online/cashe/vodka-hij345.js",
        "/vodka-kaz.online/cashe/vodka-casino-567.svg",
        "/vodka-kaz.online/cashe/vodka-kazino-456.svg",
        "/vodka-kaz.online/cashe/android-chrome-192x192-min.webp",
        "/vodka-kaz.online/cashe/android-chrome-512x512-min.webp",
        "/vodka-kaz.online/cashe/apple-touch-icon-180x180-min.webp",
        "/vodka-kaz.online/cashe/favicon-16x16-min.webp",
        "/vodka-kaz.online/cashe/favicon-32x32-min.webp",
        "/vodka-kaz.online/cashe/favicon-48x48-min.webp",
        "/vodka-kaz.online/cashe/favicon-64x64-min.webp",
        "/vodka-kaz.online/cashe/favicon-96x96-min.webp",
        "/vodka-kaz.online/cashe/vodka-casino-min.webp",
        "/vodka-kaz.online/cashe/web-app-manifest-192x192-min.webp",
      ];

      return cache.addAll(urlsToCache)
        .then(() => console.log("✅ Static file cache"))
        .catch((error) => console.error("❌ Error cache:", error));
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("vodka-cache").then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log("✅ Download cache:", event.request.url);
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        }).catch((err) => {
          console.error("❌ Error online:", err);
          return new Response(null, { status: 500, statusText: "Error online" });
        });
      });
    })
  );
});
