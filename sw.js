self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("led-banner-cache").then(cache =>
      cache.addAll([
        "index.html",
        "setup.html",
        "led-play.html",
        "style.css",
        "app.js",
        "manifest.json",
        "icon-192.png",
        "icon-512.png"
      ])
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
