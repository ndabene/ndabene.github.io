// Blog pagination simple - gère uniquement la pagination
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

    // Fonction pour obtenir tous les articles visibles (non masqués par les filtres)
    function getVisiblePosts() {
        const allWrappers = postsContainer.querySelectorAll('.post-preview-wrapper');
        return Array.from(allWrappers).filter(wrapper => {
            return wrapper.style.display !== 'none';
        });
    }

    // Mettre à jour l'affichage de la pagination
    function updateDisplay() {
        const visiblePosts = getVisiblePosts();
        const totalPages = Math.ceil(visiblePosts.length / postsPerPage);

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
            totalPostsSpan.textContent = visiblePosts.length;
        }

        // Masquer le container de pagination si pas assez d'articles
        const paginationContainer = document.querySelector('.pagination-container');
        if (paginationContainer) {
            if (visiblePosts.length <= postsPerPage) {
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
        updateDisplay();

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
            const visiblePosts = getVisiblePosts();
            const totalPages = Math.ceil(visiblePosts.length / postsPerPage);
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

        const visiblePosts = getVisiblePosts();
        const totalPages = Math.ceil(visiblePosts.length / postsPerPage);

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
