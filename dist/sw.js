// Service Worker for WorthyTen
// Version: 1.0.0

const CACHE_NAME = 'worthyten-v2.1.0';
const RUNTIME_CACHE = 'worthyten-runtime-v2.1.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/logger.js',
  '/js/header.js',
  '/js/ui.js',
  '/js/script.js',
  '/js/state-helper.js',
  '/js/firebase-config.js',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('Failed to cache some assets:', err);
      });
    })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip Firebase and external API requests
  if (
    url.hostname.includes('firebase') ||
    url.hostname.includes('googleapis') ||
    url.hostname.includes('gstatic') ||
    url.hostname.includes('cdnjs')
  ) {
    return;
  }

  // Strategy: Cache First for static assets, Network First for HTML
  if (request.destination === 'document') {
    // Network first for HTML pages
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback to index.html for SPA-like behavior
            return caches.match('/index.html');
          });
        })
    );
  } else {
    // Cache first for static assets
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
  }
});

// Background sync for offline form submissions (future enhancement)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-pickup-request') {
    event.waitUntil(syncPickupRequests());
  }
});

async function syncPickupRequests() {
  // Future: Sync offline pickup requests when back online
  // This would require IndexedDB to store offline requests
}
