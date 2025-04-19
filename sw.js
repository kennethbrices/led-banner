
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open("led-banner-cache").then((cache) => {
    return cache.addAll([
      "index.html",
      "setup.html",
      "led-play.html",
      "style.css",
      "app.js",
      "manifest.json"
    ]);
  }));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((response) => {
    return response || fetch(e.request);
  }));
});
