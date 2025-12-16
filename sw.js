// Service Worker for WorthyTen
// Version: 2.0.0 - Enhanced for offline quotes

const CACHE_VERSION = '2.2.0';
const CACHE_NAME = `worthyten-v${CACHE_VERSION}`;
const RUNTIME_CACHE = `worthyten-runtime-v${CACHE_VERSION}`;
const QUOTE_CACHE = `worthyten-quotes-v${CACHE_VERSION}`;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/quote.html',
  '/css/style.css',
  '/css/dark-mode.css',
  '/css/animations.css',
  '/css/loading-skeletons.css',
  '/css/how-it-works-ultra.css',
  '/css/reviews-faq-ultra.css',
  '/js/logger.js',
  '/js/header.js',
  '/js/ui.js',
  '/js/script.js',
  '/js/state-helper.js',
  '/js/firebase-config.js',
  '/js/theme-toggle.js',
  '/js/loading-skeletons.js',
  '/manifest.json'
];

// Pages for offline access
const OFFLINE_PAGES = [
  '/index.html',
  '/quote.html',
  '/physical-condition.html',
  '/summary.html'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Failed to cache some assets:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheName.includes(CACHE_VERSION)) {
            console.log('[SW] Deleting old cache:', cacheName);
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

  // Strategy: Network First for HTML, Cache First for assets
  if (request.destination === 'document') {
    event.respondWith(networkFirstWithCache(request));
  } else if (request.destination === 'image') {
    event.respondWith(cacheFirstWithNetwork(request, RUNTIME_CACHE));
  } else {
    event.respondWith(cacheFirstWithNetwork(request, CACHE_NAME));
  }
});

// Network first strategy with cache fallback
async function networkFirstWithCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return offline fallback
    return caches.match('/index.html');
  }
}

// Cache first strategy with network fallback
async function cacheFirstWithNetwork(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return placeholder for images
    if (request.destination === 'image') {
      return new Response('', { status: 404 });
    }
    throw error;
  }
}

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-pickup-request') {
    event.waitUntil(syncPickupRequests());
  }
  if (event.tag === 'sync-quote') {
    event.waitUntil(syncOfflineQuotes());
  }
});

// Sync offline pickup requests
async function syncPickupRequests() {
  console.log('[SW] Syncing pickup requests...');
  // Future: Sync offline pickup requests when back online
}

// Sync offline quotes
async function syncOfflineQuotes() {
  console.log('[SW] Syncing offline quotes...');
  // Future: Sync quotes saved offline
}

// Push notification handler
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/images/icons/icon-192x192.png',
    badge: '/images/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    },
    actions: data.actions || []
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'WorthyTen', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();

  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // Check if there's already a window open
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Message handler from main thread
self.addEventListener('message', event => {
  if (event.data.type === 'CACHE_PRODUCTS') {
    event.waitUntil(cacheProducts(event.data.products));
  }
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Cache products for offline access
async function cacheProducts(products) {
  try {
    const cache = await caches.open(QUOTE_CACHE);
    const blob = new Blob([JSON.stringify(products)], { type: 'application/json' });
    const response = new Response(blob);
    await cache.put('/api/products-cache', response);
    console.log('[SW] Products cached for offline access');
  } catch (error) {
    console.error('[SW] Failed to cache products:', error);
  }
}
