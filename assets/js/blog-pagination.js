// Blog pagination - Nexus Design System compatible
document.addEventListener('DOMContentLoaded', function () {
    const postsContainer = document.getElementById('blog-posts-container');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const paginationNumbers = document.getElementById('pagination-numbers');
    const showingRange = document.getElementById('showing-range');
    const totalPostsSpan = document.getElementById('total-posts');

    if (!postsContainer) return;

    const postsPerPage = 12; // Changed to match grid layout
    let currentPage = 1;
    let lazyPostsLoaded = false;

    // Fonction pour charger les posts lazy
    function loadLazyPosts() {
        if (lazyPostsLoaded) return;

        const lazyPostsData = document.getElementById('lazy-posts-data');
        if (!lazyPostsData) {
            lazyPostsLoaded = true;
            return;
        }

        const lazyPosts = Array.from(lazyPostsData.querySelectorAll('.lazy-post-data'));
        if (lazyPosts.length === 0) {
            lazyPostsLoaded = true;
            return;
        }

        console.log('🔄 Chargement de', lazyPosts.length, 'articles supplémentaires...');

        const fragment = document.createDocumentFragment();

        lazyPosts.forEach(postData => {
            const article = document.createElement('article');
            article.className = 'nexus-card';
            article.setAttribute('data-category', postData.dataset.categories || '');
            article.setAttribute('data-tags', postData.dataset.tags || '');

            const imageUrl = postData.dataset.image || '/assets/images/blog/default-post.png';

            article.innerHTML = `
                <div class="nexus-card__image-container">
                    <img src="${imageUrl}" 
                         alt="${postData.dataset.title}" 
                         class="nexus-card__image"
                         loading="lazy">
                </div>
                <div class="nexus-card__content">
                    <h3 class="nexus-card__title">
                        <a href="${postData.dataset.url}">${postData.dataset.title}</a>
                    </h3>
                    <div class="nexus-card__meta" style="font-size: 0.85rem; color: var(--color-text-dim); margin-bottom: 0.5rem;">
                        <time>${postData.dataset.dateFormatted}</time>
                    </div>
                    <p class="nexus-card__excerpt">${postData.dataset.excerpt}</p>
                </div>
            `;

            fragment.appendChild(article);
        });

        // Insérer avant le div lazy-posts-data
        lazyPostsData.parentNode.insertBefore(fragment, lazyPostsData);
        lazyPostsData.remove();

        lazyPostsLoaded = true;
        console.log('✅ Articles supplémentaires chargés');
    }

    // Fonction pour obtenir tous les articles visibles
    function getVisiblePosts() {
        const allCards = postsContainer.querySelectorAll('.nexus-card');
        return Array.from(allCards).filter(card => {
            return card.style.display !== 'none' && !card.classList.contains('hidden-by-filter');
        });
    }

    // Fonction pour obtenir le nombre total de posts
    function getTotalPostsCount() {
        const renderedPosts = postsContainer.querySelectorAll('.nexus-card');
        const lazyPostsData = document.getElementById('lazy-posts-data');
        const lazyCount = lazyPostsData ? lazyPostsData.querySelectorAll('.lazy-post-data').length : 0;
        return renderedPosts.length + lazyCount;
    }

    // Mettre à jour l'affichage de la pagination
    function updateDisplay() {
        const visiblePosts = getVisiblePosts();
        const allPostsCount = getTotalPostsCount();

        const renderedPostsCount = postsContainer.querySelectorAll('.nexus-card').length;
        const hasActiveFilters = visiblePosts.length < renderedPostsCount;
        const totalPosts = hasActiveFilters ? visiblePosts.length : allPostsCount;
        const totalPages = Math.ceil(totalPosts / postsPerPage);

        if (currentPage > totalPages && totalPages > 0) {
            currentPage = 1;
        }

        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        // Masquer/afficher les articles
        visiblePosts.forEach((post, index) => {
            if (index >= startIndex && index < endIndex) {
                post.classList.remove('pagination-hidden');
                post.style.display = '';
            } else {
                post.classList.add('pagination-hidden');
                post.style.display = 'none';
            }
        });

        // Mettre à jour les boutons
        if (prevButton) {
            prevButton.disabled = currentPage === 1;
        }
        if (nextButton) {
            nextButton.disabled = currentPage >= totalPages || totalPages === 0;
        }

        // Mettre à jour les numéros
        updatePaginationNumbers(totalPages);

        // Mettre à jour les infos
        if (showingRange) {
            const start = visiblePosts.length > 0 ? startIndex + 1 : 0;
            const end = Math.min(endIndex, visiblePosts.length);
            showingRange.textContent = `${start}-${end}`;
        }

        if (totalPostsSpan) {
            totalPostsSpan.textContent = totalPosts;
        }

        // Masquer pagination si pas assez d'articles
        const paginationContainer = document.querySelector('.pagination-container');
        if (paginationContainer) {
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

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            endPage = Math.min(5, totalPages);
        }
        if (currentPage > totalPages - 3) {
            startPage = Math.max(1, totalPages - 4);
        }

        // Ajouter page 1 et "..." si nécessaire
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

        // Ajouter "..." et dernière page si nécessaire
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
        pageButton.className = 'nexus-btn nexus-btn--glass';
        pageButton.style.padding = '0.5rem 0.75rem';
        pageButton.style.minWidth = '2.5rem';
        pageButton.textContent = pageNum;
        pageButton.onclick = () => goToPage(pageNum);

        if (pageNum === currentPage) {
            pageButton.classList.add('active');
            pageButton.style.background = 'var(--color-primary)';
            pageButton.style.color = 'white';
        }

        paginationNumbers.appendChild(pageButton);
    }

    // Créer des points de suspension
    function createEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        ellipsis.style.padding = '0.5rem';
        ellipsis.style.color = 'var(--color-text-dim)';
        return ellipsis;
    }

    // Aller à une page spécifique
    function goToPage(pageNum) {
        currentPage = pageNum;

        const startIndex = (pageNum - 1) * postsPerPage;
        const renderedPosts = postsContainer.querySelectorAll('.nexus-card').length;

        if (startIndex >= renderedPosts - postsPerPage && !lazyPostsLoaded) {
            loadLazyPosts();
            setTimeout(() => updateDisplay(), 50);
        } else {
            updateDisplay();
        }

        // Scroll vers le haut
        postsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Event listeners
    if (prevButton) {
        prevButton.addEventListener('click', function () {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function () {
            const totalPosts = getTotalPostsCount();
            const totalPages = Math.ceil(totalPosts / postsPerPage);
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        });
    }

    // Initialiser
    updateDisplay();

    // Exposer pour les filtres
    window.blogPaginationUpdate = function () {
        currentPage = 1;
        updateDisplay();
    };
});
