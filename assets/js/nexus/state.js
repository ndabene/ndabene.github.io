document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.nexus-header');

    // Scroll handling
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

    // Card Hover Effects (Radial Glow)
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

    // In case cards are loaded dynamically (e.g. filters)
    window.addEventListener('nexus:cardsUpdated', initCards);

    // Back to Top Logic
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Code Block Copy Button
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
});
