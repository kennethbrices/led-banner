const CACHE_NAME = "led-banner-v2";
const FILES_TO_CACHE = [
  "index.html",
  "setup.html",
  "led-play.html",
  "style.css",
  "app.js",
  "manifest.json"
];

// Install: cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch: use network if online, else fallback to cache
self.addEventListener("fetch", (event) => {
  if (navigator.onLine) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(caches.match(event.request));
  }
});
