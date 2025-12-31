// Pagefind Search Integration for Blog
// Remplacement de Fuse.js par Pagefind pour une recherche plus performante

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        DEBOUNCE_DELAY: 300,
        MAX_RESULTS: 50,
        EXCERPT_LENGTH: 120
    };

    let pagefind = null;
    let isInitialized = false;

    // Debounce utility
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Initialize Pagefind
    async function initializePagefind() {
        if (isInitialized) return;

        try {
            // Charger Pagefind depuis le CDN ou le fichier généré
            const script = document.createElement('script');
            script.src = '/pagefind/pagefind.js';
            script.async = true;

            await new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });

            // Initialiser l'instance Pagefind
            if (window.PagefindUI) {
                pagefind = window.PagefindUI;
                isInitialized = true;
                console.log('✅ Pagefind initialisé avec succès');
            } else {
                throw new Error('PagefindUI not found');
            }
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation de Pagefind:', error);
            // Fallback vers la recherche basique si Pagefind échoue
            initializeFallbackSearch();
        }
    }

    // Recherche avec Pagefind
    async function performPagefindSearch(query) {
        if (!query || query.length < 2) {
            showAllPosts();
            return;
        }

        if (!isInitialized) {
            await initializePagefind();
        }

        try {
            // Utiliser l'API Pagefind pour rechercher
            const results = await window.pagefind.search(query);

            displaySearchResults(results, query);
        } catch (error) {
            console.error('Erreur de recherche Pagefind:', error);
            performFallbackSearch(query);
        }
    }

    // Afficher les résultats de recherche
    function displaySearchResults(results, query) {
        const postsContainer = document.getElementById('blog-posts-container');
        const noResultsDiv = document.getElementById('no-results');
        const filteredCountSpan = document.getElementById('filtered-count');

        if (!postsContainer) return;

        // Cacher tous les posts
        const allPosts = postsContainer.querySelectorAll('.post-preview-wrapper');
        allPosts.forEach(post => {
            post.style.display = 'none';
        });

        if (!results || results.results.length === 0) {
            if (filteredCountSpan) filteredCountSpan.textContent = '(0)';
            if (noResultsDiv) noResultsDiv.style.display = 'flex';
            updatePagination();
            return;
        }

        // Afficher les posts correspondants
        let visibleCount = 0;
        results.results.forEach(result => {
            // Trouver le post correspondant dans le DOM
            // Pagefind retourne l'URL du post
            const postUrl = result.url;
            const matchingPost = Array.from(allPosts).find(post => {
                const titleLink = post.querySelector('.post-news-title a');
                return titleLink && titleLink.getAttribute('href') === postUrl;
            });

            if (matchingPost) {
                matchingPost.style.display = '';
                visibleCount++;

                // Optionnel: mettre en surbrillance les termes de recherche
                highlightSearchTerms(matchingPost, query);
            }
        });

        // Mettre à jour l'interface
        if (filteredCountSpan) {
            filteredCountSpan.textContent = `(${visibleCount})`;
        }
        if (noResultsDiv) {
            noResultsDiv.style.display = visibleCount === 0 ? 'flex' : 'none';
        }

        updatePagination();
    }

    // Afficher tous les posts (réinitialiser la recherche)
    function showAllPosts() {
        const postsContainer = document.getElementById('blog-posts-container');
        const noResultsDiv = document.getElementById('no-results');
        const filteredCountSpan = document.getElementById('filtered-count');

        if (!postsContainer) return;

        const allPosts = postsContainer.querySelectorAll('.post-preview-wrapper');
        let totalCount = 0;

        allPosts.forEach(post => {
            post.style.display = '';
            totalCount++;

            // Retirer les surlignages
            const titleElement = post.querySelector('.post-news-title a');
            const excerptElement = post.querySelector('.post-news-excerpt');

            if (titleElement && titleElement.dataset.originalText) {
                titleElement.textContent = titleElement.dataset.originalText;
            }
            if (excerptElement && excerptElement.dataset.originalText) {
                excerptElement.textContent = excerptElement.dataset.originalText;
            }
        });

        if (filteredCountSpan) {
            filteredCountSpan.textContent = `(${totalCount})`;
        }
        if (noResultsDiv) {
            noResultsDiv.style.display = 'none';
        }

        updatePagination();
    }

    // Mettre en surbrillance les termes de recherche
    function highlightSearchTerms(postElement, query) {
        const titleElement = postElement.querySelector('.post-news-title a');
        const excerptElement = postElement.querySelector('.post-news-excerpt');

        const searchTerms = query.toLowerCase().split(/\s+/);

        [titleElement, excerptElement].forEach(element => {
            if (!element) return;

            // Sauvegarder le texte original
            if (!element.dataset.originalText) {
                element.dataset.originalText = element.textContent;
            }

            let text = element.dataset.originalText;

            searchTerms.forEach(term => {
                if (term.length < 2) return;

                const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
                text = text.replace(regex, '<mark class="search-highlight">$1</mark>');
            });

            element.innerHTML = text;
        });
    }

    // Échapper les caractères spéciaux pour regex
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Mettre à jour la pagination
    function updatePagination() {
        if (window.blogPaginationUpdate) {
            window.blogPaginationUpdate();
        }
    }

    // Recherche de secours (fallback) si Pagefind n'est pas disponible
    function performFallbackSearch(query) {
        const postsContainer = document.getElementById('blog-posts-container');
        if (!postsContainer) return;

        const searchTerm = query.toLowerCase();
        const allPosts = postsContainer.querySelectorAll('.post-preview-wrapper');
        let visibleCount = 0;

        allPosts.forEach(post => {
            const titleElement = post.querySelector('.post-news-title');
            const excerptElement = post.querySelector('.post-news-excerpt');
            const postElement = post.querySelector('.post-preview-news');

            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const excerpt = excerptElement ? excerptElement.textContent.toLowerCase() : '';
            const categories = postElement ? postElement.getAttribute('data-categories') || '' : '';
            const tags = postElement ? postElement.getAttribute('data-tags') || '' : '';

            const matches =
                title.includes(searchTerm) ||
                excerpt.includes(searchTerm) ||
                categories.toLowerCase().includes(searchTerm) ||
                tags.toLowerCase().includes(searchTerm);

            post.style.display = matches ? '' : 'none';
            if (matches) {
                visibleCount++;
                highlightSearchTerms(post, query);
            }
        });

        const filteredCountSpan = document.getElementById('filtered-count');
        const noResultsDiv = document.getElementById('no-results');

        if (filteredCountSpan) {
            filteredCountSpan.textContent = `(${visibleCount})`;
        }
        if (noResultsDiv) {
            noResultsDiv.style.display = visibleCount === 0 ? 'flex' : 'none';
        }

        updatePagination();
    }

    // Initialiser la recherche de secours
    function initializeFallbackSearch() {
        console.log('⚠️  Utilisation de la recherche de secours (Pagefind non disponible)');
        isInitialized = false;
    }

    // Initialiser la recherche dans la page blog
    function initializeBlogSearch() {
        const searchInput = document.getElementById('search-input');
        const clearSearchBtn = document.getElementById('clear-search');

        if (!searchInput) return;

        // Fonction de recherche avec debounce
        const debouncedSearch = debounce(async (value) => {
            if (value.trim().length === 0) {
                showAllPosts();
                return;
            }

            await performPagefindSearch(value.trim());
        }, CONFIG.DEBOUNCE_DELAY);

        // Événement input sur la barre de recherche
        searchInput.addEventListener('input', function() {
            const value = this.value.trim();

            if (clearSearchBtn) {
                clearSearchBtn.style.display = value ? 'flex' : 'none';
            }

            debouncedSearch(value);
        });

        // Bouton de réinitialisation
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', function() {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.focus();
            });
        }

        // Raccourcis clavier
        document.addEventListener('keydown', function(e) {
            // "/" pour focus la recherche
            if (e.key === '/' && !isInputFocused()) {
                e.preventDefault();
                searchInput.focus();
            }

            // Ctrl/Cmd + K pour focus la recherche
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }

            // Échap pour effacer la recherche
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        });

        console.log('🔍 Recherche Pagefind initialisée (raccourcis: / ou Ctrl+K)');
    }

    // Helper pour vérifier si un input est focus
    function isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable
        );
    }

    // Pré-charger Pagefind au chargement de la page
    function preloadPagefind() {
        if (document.getElementById('search-input')) {
            initializePagefind();
        }
    }

    // Initialiser au chargement de la page
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeBlogSearch();
            // Pré-charger Pagefind après un court délai
            setTimeout(preloadPagefind, 1000);
        });
    } else {
        initializeBlogSearch();
        setTimeout(preloadPagefind, 1000);
    }

})();
