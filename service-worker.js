const CACHE_NAME = 'builder-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './components/buttonComponent.js',
  './components/textComponent.js',
  './components/containerComponent.js',
  './workspace/canvas.js',
  './utils/codeGenerator.js',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
  );
});
