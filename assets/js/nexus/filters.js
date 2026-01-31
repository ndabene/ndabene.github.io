document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.nexus-filters-container [data-filter]');
    const cards = document.querySelectorAll('.nexus-card');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // FLIP Animation: First
            const state = [];
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                state.push({
                    card,
                    top: rect.top,
                    left: rect.left,
                    visible: !card.classList.contains('is-hidden')
                });
            });

            // Apply filter
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('is-hidden');
                } else {
                    card.classList.add('is-hidden');
                }
            });

            // FLIP Animation: Last & Invert
            requestAnimationFrame(() => {
                cards.forEach((card, i) => {
                    if (card.classList.contains('is-hidden')) return;

                    const rect = card.getBoundingClientRect();
                    const oldState = state[i];

                    // If it was visible, calculate delta
                    if (oldState.visible) {
                        const deltaX = oldState.left - rect.left;
                        const deltaY = oldState.top - rect.top;

                        if (deltaX !== 0 || deltaY !== 0) {
                            // Invert
                            card.style.transition = 'none';
                            card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

                            // Play
                            requestAnimationFrame(() => {
                                card.style.transition = ''; // Restore transition from CSS
                                card.style.transform = '';
                            });
                        }
                    } else {
                        // If it's newly shown, add entrance animation
                        card.classList.add('is-new');
                        card.addEventListener('animationend', () => {
                            card.classList.remove('is-new');
                        }, { once: true });
                    }
                });
            });

            // Dispatch global event
            window.dispatchEvent(new CustomEvent('nexus:filterChange', {
                detail: { filter: filterValue }
            }));
        });
    });
});
