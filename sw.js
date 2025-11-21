const CACHE_NAME = 'ndabene-image-cache-v1';
const ASSETS_TO_CACHE = [
    '/assets/images/logo.png',
    '/assets/images/default-post.jpg'
];

// Install event: cache critical assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
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
                    });

                    // Return cached response if available, otherwise wait for network
                    return cachedResponse || fetchPromise;
                });
            })
        );
    }
});
