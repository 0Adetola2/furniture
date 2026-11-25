/**
 * TOLEX FURNITURE — Progressive Web App Service Worker
 * Fast offline caching, asset pre-fetching, and instant application load
 */

const CACHE_NAME = 'tolex-furniture-v2.0-spa';
const APP_SHELL = [
  './',
  './index.html',
  './about.html',
  './services.html',
  './contact.html',
  './manifest.json',
  './css/style.css',
  './js/main.js',
  './js/slider.js',
  './assets/icons/favicon.svg',
  './assets/images/hero_living.jpg',
  './assets/images/hero_bedroom.jpg',
  './assets/images/hero_dining.jpg'
];

// Install event — pre-cache core application shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    }).then(() => self.skipWaiting())
  );
});

// Activate event — clean up previous caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event — stale-while-revalidate for dynamic resilience
self.addEventListener('fetch', (event) => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // If response valid, clone to cache
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse); // Fallback to cache if network fails

      return cachedResponse || fetchPromise;
    })
  );
});
