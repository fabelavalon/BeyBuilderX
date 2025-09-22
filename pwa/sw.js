const CACHE_NAME = 'beybuilderx-cache-v1';
const PRECACHE_URLS = [
  'registerSW.js',
  'index.html',
  'main.js',
  'parts.js',
  'beyblade.js',
  'beybuilder.css',
  'theme-dark-purple.css',
  'theme-default.css',
  'theme-grey.css',
  'theme-none.css',
  'theme-wbo.css',
  'favicon.png',
  'libraries/debounce/debounce.js',
  'libraries/pouchdb-7.3.1.js',
  'pwa/apple-touch-icon-180x180.png',
  'libraries/bootstrap/bootstrap.css',
  'libraries/bootstrap/bootstrap.bundle.js'
];

// Install event: Cache files
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

// Activate event: Cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch event: Serve from cache, fallback to network
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // SPA navigation fallback
    event.respondWith(
      caches.match('index.html').then(response => response || fetch(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
