const CACHE_NAME = 'beybuilderx-cache-v1';
const PRECACHE_URLS = [
  'pwa/registerSW.js',
  // main application
  'index.html',
  'main.js',
  'parts.js',
  'beyblade.js',
  // themes
  'beybuilder.css',
  'theme-dark-purple.css',
  'theme-default.css',
  'theme-grey.css',
  'theme-none.css',
  'theme-wbo.css',
  // images
  'images/BeyBuilder_Logo2.png',
  'favicon.png',
  // libraries
  'libraries/debounce/debounce.js',
  'libraries/pouchdb-7.3.1.js',
  'libraries/bootstrap/bootstrap.css',
  'libraries/bootstrap/bootstrap.bundle.js'
];

// Install event: Cache files
self.addEventListener('install', event => {
  self.skipWaiting();
  console.log("install event");
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

// Fetch event: Cache first, then refresh cache in background
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // SPA navigation fallback
    event.respondWith(
      caches.match('index.html').then(response => response || fetch(event.request).catch(() => null))
    );
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response immediately
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          // Update cache with fresh response
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => null); // Handle offline errors silently
      
      // Return cached response, or wait for network if no cache
      return response || fetchPromise;
    })
  );
});
