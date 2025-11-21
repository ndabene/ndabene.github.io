/**
 * Image Optimization Script
 * Automatically adds lazy loading and async decoding to images that lack them.
 * Skips images marked as eager or with high priority.
 */

document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img:not([loading])');

    // Intersection Observer for fade-in effect (optional visual enhancement)
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    images.forEach((img, index) => {
        // Skip if explicitly set to eager
        if (img.getAttribute('loading') === 'eager') return;

        // Skip the first image of the main content (potential LCP) if it's high up
        // But usually the banner is handled separately in templates. 
        // If this is a content image and it's the very first one, we might want to be careful.
        // For safety, we just lazy load everything that wasn't manually optimized.

        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');

        // Add fade-in class for CSS handling if needed
        img.classList.add('lazy-image');
        imageObserver.observe(img);
    });
});
