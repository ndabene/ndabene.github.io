// Blog pagination simple - gère uniquement la pagination avec chargement lazy
document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('blog-posts-container');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const paginationNumbers = document.getElementById('pagination-numbers');
    const showingRange = document.getElementById('showing-range');
    const totalPostsSpan = document.getElementById('total-posts');

    if (!postsContainer) return;

    const postsPerPage = 8;
    let currentPage = 1;
    let lazyPostsLoaded = false;

    // Fonction pour charger les posts lazy
    function loadLazyPosts() {
        if (lazyPostsLoaded) return;

        const lazyPostsData = document.getElementById('lazy-posts-data');
        if (!lazyPostsData) {
            lazyPostsLoaded = true; // Pas de posts lazy à charger
            return;
        }

        const lazyPosts = Array.from(lazyPostsData.querySelectorAll('.lazy-post-data'));
        if (lazyPosts.length === 0) {
            lazyPostsLoaded = true;
            return;
        }

        console.log('🔄 Chargement de', lazyPosts.length, 'articles supplémentaires...');

        // Créer un fragment pour éviter les reflows multiples
        const fragment = document.createDocumentFragment();

        lazyPosts.forEach(postData => {
            const wrapper = document.createElement('div');
            wrapper.className = 'post-preview-wrapper';

            const article = document.createElement('article');
            article.className = 'post-preview-news';
            article.setAttribute('data-categories', postData.dataset.categories || '');
            article.setAttribute('data-tags', postData.dataset.tags || '');
            article.setAttribute('data-date', postData.dataset.date || '');
            article.setAttribute('data-read-time', postData.dataset.readTime || '5');

            const seriesHtml = postData.dataset.series ?
                `<span class="series-indicator">${postData.dataset.series}</span>` : '';

            article.innerHTML = `
                <div class="post-news-content">
                    ${postData.dataset.image ? `
                    <div class="post-news-thumb">
                        <img src="${postData.dataset.image}" alt="${postData.dataset.title}" loading="lazy" width="200" height="150" decoding="async">
                    </div>
                    ` : ''}
                    <div class="post-news-text">
                        <div class="post-news-meta">
                            <time>${postData.dataset.dateFormatted}</time>
                            <span class="reading-time">${postData.dataset.readTime} min</span>
                            ${seriesHtml}
                        </div>
                        <h3 class="post-news-title">
                            <a href="${postData.dataset.url}">${postData.dataset.title}</a>
                        </h3>
                        <p class="post-news-excerpt">${postData.dataset.excerpt}</p>
                    </div>
                    <div class="post-news-actions">
                        <a href="${postData.dataset.url}" class="read-more-compact">
                            Lire l'article <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;

            wrapper.appendChild(article);
            fragment.appendChild(wrapper);
        });

        // Insérer avant le div lazy-posts-data
        lazyPostsData.parentNode.insertBefore(fragment, lazyPostsData);

        // Retirer le container de données
        lazyPostsData.remove();

        lazyPostsLoaded = true;
        console.log('✅ Articles supplémentaires chargés');
    }

    // Fonction pour obtenir tous les articles visibles (non masqués par les filtres)
    function getVisiblePosts() {
        const allWrappers = postsContainer.querySelectorAll('.post-preview-wrapper');
        return Array.from(allWrappers).filter(wrapper => {
            return wrapper.style.display !== 'none';
        });
    }

    // Fonction pour obtenir le nombre total de posts (y compris lazy non encore chargés)
    function getTotalPostsCount() {
        const renderedPosts = postsContainer.querySelectorAll('.post-preview-wrapper');
        const lazyPostsData = document.getElementById('lazy-posts-data');
        const lazyCount = lazyPostsData ? lazyPostsData.querySelectorAll('.lazy-post-data').length : 0;
        return renderedPosts.length + lazyCount;
    }

    // Mettre à jour l'affichage de la pagination
    function updateDisplay() {
        const visiblePosts = getVisiblePosts();
        const allPostsCount = getTotalPostsCount();

        // Si des filtres sont actifs (visiblePosts < posts rendus), utiliser visiblePosts
        // Sinon, utiliser le total incluant les posts lazy
        const renderedPostsCount = postsContainer.querySelectorAll('.post-preview-wrapper').length;
        const hasActiveFilters = visiblePosts.length < renderedPostsCount;
        const totalPosts = hasActiveFilters ? visiblePosts.length : allPostsCount;
        const totalPages = Math.ceil(totalPosts / postsPerPage);

        // Réinitialiser à la page 1 si on dépasse
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = 1;
        }

        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        // Masquer tous les articles visibles d'abord
        visiblePosts.forEach((post, index) => {
            if (index >= startIndex && index < endIndex) {
                post.classList.remove('pagination-hidden');
            } else {
                post.classList.add('pagination-hidden');
            }
        });

        // Mettre à jour les boutons de pagination
        if (prevButton) {
            prevButton.disabled = currentPage === 1;
        }
        if (nextButton) {
            nextButton.disabled = currentPage >= totalPages || totalPages === 0;
        }

        // Mettre à jour les numéros de pagination
        updatePaginationNumbers(totalPages);

        // Mettre à jour les informations d'affichage
        if (showingRange) {
            const start = visiblePosts.length > 0 ? startIndex + 1 : 0;
            const end = Math.min(endIndex, visiblePosts.length);
            showingRange.textContent = `${start}-${end}`;
        }

        if (totalPostsSpan) {
            // Afficher le nombre total (incluant les posts lazy et les posts filtrés)
            totalPostsSpan.textContent = totalPosts;
        }

        // Masquer le container de pagination si pas assez d'articles
        const paginationContainer = document.querySelector('.pagination-container');
        if (paginationContainer) {
            // Utiliser totalPosts pour décider si on affiche la pagination
            if (totalPosts <= postsPerPage) {
                paginationContainer.style.display = 'none';
            } else {
                paginationContainer.style.display = 'block';
            }
        }
    }

    // Mettre à jour les numéros de pagination
    function updatePaginationNumbers(totalPages) {
        if (!paginationNumbers) return;

        paginationNumbers.innerHTML = '';

        if (totalPages === 0) return;

        // Calculer les pages à afficher
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        // Ajuster si on est au début ou à la fin
        if (currentPage <= 3) {
            endPage = Math.min(5, totalPages);
        }
        if (currentPage > totalPages - 3) {
            startPage = Math.max(1, totalPages - 4);
        }

        // Ajouter "..." au début si nécessaire
        if (startPage > 1) {
            addPageNumber(1);
            if (startPage > 2) {
                paginationNumbers.appendChild(createEllipsis());
            }
        }

        // Ajouter les numéros de page
        for (let i = startPage; i <= endPage; i++) {
            addPageNumber(i);
        }

        // Ajouter "..." à la fin si nécessaire
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationNumbers.appendChild(createEllipsis());
            }
            addPageNumber(totalPages);
        }
    }

    // Ajouter un numéro de page
    function addPageNumber(pageNum) {
        const pageButton = document.createElement('button');
        pageButton.className = 'page-number';
        pageButton.textContent = pageNum;
        pageButton.onclick = () => goToPage(pageNum);

        if (pageNum === currentPage) {
            pageButton.classList.add('active');
        }

        paginationNumbers.appendChild(pageButton);
    }

    // Créer des points de suspension
    function createEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        ellipsis.className = 'pagination-ellipsis';
        return ellipsis;
    }

    // Aller à une page spécifique
    function goToPage(pageNum) {
        currentPage = pageNum;

        // Charger les posts lazy si nécessaire pour afficher cette page
        // On charge dès qu'on atteint la page 2 (posts 9-16) car la page 3 aura besoin des posts lazy
        const startIndex = (pageNum - 1) * postsPerPage;
        const renderedPosts = postsContainer.querySelectorAll('.post-preview-wrapper').length;

        if (startIndex >= renderedPosts - postsPerPage && !lazyPostsLoaded) {
            // On approche de la fin des posts rendus, charger les lazy
            loadLazyPosts();
            // Attendre un peu que les posts soient insérés dans le DOM
            setTimeout(() => updateDisplay(), 50);
        } else {
            updateDisplay();
        }

        // Scroll vers le haut de la liste
        const blogContent = document.querySelector('.blog-filters-container');
        if (blogContent) {
            blogContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Event listeners pour les boutons
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const totalPosts = getTotalPostsCount();
            const totalPages = Math.ceil(totalPosts / postsPerPage);
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        });
    }

    // Navigation par clavier - Optimisée pour éviter les écoutes inutiles
    let keyboardNavigationEnabled = false;

    // Activer la navigation clavier seulement si l'utilisateur interagit avec la pagination
    function enableKeyboardNavigation() {
        if (keyboardNavigationEnabled) return;
        keyboardNavigationEnabled = true;

        document.addEventListener('keydown', handleKeyboardNavigation);
    }

    function handleKeyboardNavigation(e) {
        // Ignorer si l'utilisateur tape dans un champ
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        const totalPosts = getTotalPostsCount();
        const totalPages = Math.ceil(totalPosts / postsPerPage);

        if (e.key === 'ArrowLeft' && currentPage > 1) {
            e.preventDefault();
            goToPage(currentPage - 1);
        } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
            e.preventDefault();
            goToPage(currentPage + 1);
        }
    }

    // Activer au survol ou clic sur les boutons de pagination
    const paginationContainer = document.querySelector('.pagination-container');
    if (paginationContainer) {
        paginationContainer.addEventListener('mouseenter', enableKeyboardNavigation, { once: true });
        paginationContainer.addEventListener('click', enableKeyboardNavigation, { once: true });
    }

    // Initialiser l'affichage
    updateDisplay();

    // Exposer la fonction updateDisplay pour que les filtres puissent la rappeler
    window.blogPaginationUpdate = function() {
        currentPage = 1; // Réinitialiser à la page 1 quand les filtres changent
        updateDisplay();
    };
});
