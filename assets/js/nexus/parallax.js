// Nexus Parallax System
// Lightweight vanilla JS for mouse movement parallax effects
// Author: BMad Agent (Nexus System)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Feature Detection & Guards
    const isMobile = window.innerWidth < 1024; // Disable on tablet/mobile
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || isReducedMotion) {
        console.log('Nexus Parallax: Disabled (Mobile or Reduced Motion)');
        return;
    }

    const parallaxElements = document.querySelectorAll('[data-nexus-parallax]');

    if (parallaxElements.length === 0) {
        return;
    }

    // 2. State
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Lerp smoothing factor (lower = smoother/slower)
    const smoothing = 0.08;

    // 3. Event Listeners
    document.addEventListener('mousemove', (e) => {
        // Normalize coordinates from center of screen
        targetX = (e.clientX - window.innerWidth / 2);
        targetY = (e.clientY - window.innerHeight / 2);
    });

    // 4. Animation Loop
    function animate() {
        // Linear Interpolation (Lerp) for smooth movement
        currentX += (targetX - currentX) * smoothing;
        currentY += (targetY - currentY) * smoothing;

        parallaxElements.forEach(el => {
            // Get depth factor from attribute (default 0.02)
            // positive = standard parallax, negative = inverse
            const depth = parseFloat(el.getAttribute('data-nexus-parallax')) || 0.02;

            const moveX = currentX * depth;
            const moveY = currentY * depth;

            // Use translate3d for hardware acceleration
            el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });

        requestAnimationFrame(animate);
    }

    // Start loop
    animate();
});
