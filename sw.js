const CACHE_NAME = 'ndabene-image-cache-v1';
const ASSETS_TO_CACHE = [
    '/assets/images/logo.png'
    // Only cache critical assets that are guaranteed to exist
    // Other images will be cached on-demand via the fetch handler
];

// Install event: cache critical assets (don't fail if some are missing)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Use Promise.all with error handling to prevent install failure
            return Promise.all(
                ASSETS_TO_CACHE.map(url => {
                    return cache.add(url).catch(err => {
                        console.warn('Failed to cache:', url, err);
                        // Don't fail the entire installation if one asset fails
                    });
                })
            );
        })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Claim all clients immediately
    return self.clients.claim();
});

// Fetch event: Stale-while-revalidate for images
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // Only handle image requests
    if (requestUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((cachedResponse) => {
                    const fetchPromise = fetch(event.request).then((networkResponse) => {
                        // Cache the new response if it's valid
                        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch(() => {
                        // If network fails, return cached response or a fallback
                        return cachedResponse;
                    });

                    // Return cached response immediately if available, otherwise wait for network
                    return cachedResponse || fetchPromise;
                });
            })
        );
    }
});
