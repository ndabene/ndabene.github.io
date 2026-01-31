/**
 * Nexus Core JavaScript Bundle
 * Combined state, filters, and parallax logic
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        // --- STATE & CORE ---
        const header = document.querySelector('.nexus-header');
        let ticking = false;
        const threshold = 100;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (header) {
                        if (window.scrollY > threshold) {
                            header.classList.add('is-docked');
                        } else {
                            header.classList.remove('is-docked');
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        const initCards = () => {
            const cards = document.querySelectorAll('.nexus-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    card.style.setProperty('--mouse-x', `${x}%`);
                    card.style.setProperty('--mouse-y', `${y}%`);
                });
            });
        };
        initCards();
        window.addEventListener('nexus:cardsUpdated', initCards);

        const backToTop = document.getElementById('nexus-back-to-top');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTop.classList.add('is-visible');
                } else {
                    backToTop.classList.remove('is-visible');
                }
            }, { passive: true });
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        const copyButtons = document.querySelectorAll('.nexus-code-block__copy');
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const container = button.closest('.nexus-code-block');
                const code = container.querySelector('code').innerText;
                navigator.clipboard.writeText(code).then(() => {
                    const span = button.querySelector('span');
                    const originalText = span.innerText;
                    span.innerText = 'Copié !';
                    button.classList.add('is-copied');
                    setTimeout(() => {
                        span.innerText = originalText;
                        button.classList.remove('is-copied');
                    }, 2000);
                });
            });
        });

        // --- FILTERS ---
        const filterButtons = document.querySelectorAll('.nexus-filters-container [data-filter]');
        const filterCards = document.querySelectorAll('.nexus-card');
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filterValue = button.getAttribute('data-filter');
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    const state = [];
                    filterCards.forEach(card => {
                        const rect = card.getBoundingClientRect();
                        state.push({ card, top: rect.top, left: rect.left, visible: !card.classList.contains('is-hidden') });
                    });
                    filterCards.forEach(card => {
                        const cardCategory = card.getAttribute('data-category');
                        if (filterValue === 'all' || cardCategory === filterValue) {
                            card.classList.remove('is-hidden');
                        } else {
                            card.classList.add('is-hidden');
                        }
                    });
                    requestAnimationFrame(() => {
                        filterCards.forEach((card, i) => {
                            if (card.classList.contains('is-hidden')) return;
                            const rect = card.getBoundingClientRect();
                            const oldState = state[i];
                            if (oldState.visible) {
                                const deltaX = oldState.left - rect.left;
                                const deltaY = oldState.top - rect.top;
                                if (deltaX !== 0 || deltaY !== 0) {
                                    card.style.transition = 'none';
                                    card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                                    requestAnimationFrame(() => {
                                        card.style.transition = '';
                                        card.style.transform = '';
                                    });
                                }
                            } else {
                                card.classList.add('is-new');
                                card.addEventListener('animationend', () => {
                                    card.classList.remove('is-new');
                                }, { once: true });
                            }
                        });
                    });
                    window.dispatchEvent(new CustomEvent('nexus:filterChange', { detail: { filter: filterValue } }));
                });
            });
        }

        // --- PARALLAX ---
        const isMobile = window.innerWidth < 1024;
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const parallaxElements = document.querySelectorAll('[data-nexus-parallax]');
        if (!isMobile && !isReducedMotion && parallaxElements.length > 0) {
            let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
            const smoothing = 0.08;
            document.addEventListener('mousemove', (e) => {
                targetX = (e.clientX - window.innerWidth / 2);
                targetY = (e.clientY - window.innerHeight / 2);
            });
            function animate() {
                currentX += (targetX - currentX) * smoothing;
                currentY += (targetY - currentY) * smoothing;
                parallaxElements.forEach(el => {
                    const depth = parseFloat(el.getAttribute('data-nexus-parallax')) || 0.02;
                    el.style.transform = `translate3d(${currentX * depth}px, ${currentY * depth}px, 0)`;
                });
                requestAnimationFrame(animate);
            }
            animate();
        }
    });
})();
