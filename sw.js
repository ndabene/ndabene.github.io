const CACHE_NAME = 'ndabene-cache-v2';
const ASSETS_TO_CACHE = [
    '/assets/images/logo.png'
    // Only cache critical assets that are guaranteed to exist
    // Other images will be cached on-demand via the fetch handler
];

// Pages that should use network-first strategy to always get fresh content
const DYNAMIC_PAGES = [
    '/blog/',
    '/en/blog/'
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

// Fetch event: Different strategies based on resource type
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // Network-first strategy for blog pages to always get fresh content
    const isDynamicPage = DYNAMIC_PAGES.some(page => requestUrl.pathname === page || requestUrl.pathname === page + 'index.html');
    if (isDynamicPage) {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Cache the fresh response
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // If network fails, fallback to cache
                    return caches.match(event.request).then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        // Return a basic offline page if nothing in cache
                        return new Response('Page non disponible hors ligne', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
                })
        );
        return;
    }

    // Stale-while-revalidate for images
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
