// Modern Blog Search with Fuse.js - Recherche floue et moderne
// Amélioration de l'expérience de recherche avec fonctionnalités avancées

(function () {
    'use strict';

    // Configuration
    const CONFIG = {
        DEBOUNCE_DELAY: 200,
        MAX_HISTORY_ITEMS: 5,
        MAX_SUGGESTIONS: 10, // Augmenté de 5 à 10 pour plus de résultats
        HISTORY_KEY: 'blog_search_history',
        FUSE_OPTIONS: {
            threshold: 0.3, // 0 = exact match, 1 = match anything (diminué pour meilleure pertinence)
            distance: 50, // Distance réduite pour des résultats plus précis
            minMatchCharLength: 2,
            ignoreLocation: false, // Prendre en compte la position du match
            location: 0, // Privilégier les matchs au début
            keys: [
                { name: 'title', weight: 0.5 }, // Poids augmenté pour le titre (plus important)
                { name: 'excerpt', weight: 0.25 }, // Poids augmenté pour l'extrait
                { name: 'categories', weight: 0.15 }, // Poids diminué pour les catégories
                { name: 'tags', weight: 0.1 } // Poids diminué pour les tags
            ],
            includeScore: true,
            includeMatches: true,
            shouldSort: true, // Trier les résultats par pertinence
            findAllMatches: false, // Arrêter à la première bonne correspondance
            useExtendedSearch: false // Recherche standard (plus rapide)
        }
    };

    let fuse = null;
    let searchIndex = [];
    let searchHistory = [];
    let lazyPostsLoadedForSearch = false;

    // Utility: Debounce function
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

    // Utility: Highlight matching text
    function highlightText(text, matches) {
        if (!matches || matches.length === 0) return text;

        const highlighted = [];
        let lastIndex = 0;

        // Sort matches by position
        const sortedMatches = matches.sort((a, b) => a[0] - b[0]);

        sortedMatches.forEach(([start, end]) => {
            // Add text before match
            if (start > lastIndex) {
                highlighted.push(text.substring(lastIndex, start));
            }
            // Add highlighted match
            highlighted.push(`<mark class="search-highlight">${text.substring(start, end + 1)}</mark>`);
            lastIndex = end + 1;
        });

        // Add remaining text
        if (lastIndex < text.length) {
            highlighted.push(text.substring(lastIndex));
        }

        return highlighted.join('');
    }

    // Load search history from localStorage
    function loadSearchHistory() {
        try {
            const stored = localStorage.getItem(CONFIG.HISTORY_KEY);
            searchHistory = stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.warn('Error loading search history:', e);
            searchHistory = [];
        }
    }

    // Save search history to localStorage
    function saveSearchHistory(query) {
        if (!query || query.length < 2) return;

        // Remove duplicates and add to front
        searchHistory = [query, ...searchHistory.filter(q => q !== query)];

        // Keep only MAX_HISTORY_ITEMS
        searchHistory = searchHistory.slice(0, CONFIG.MAX_HISTORY_ITEMS);

        try {
            localStorage.setItem(CONFIG.HISTORY_KEY, JSON.stringify(searchHistory));
        } catch (e) {
            console.warn('Error saving search history:', e);
        }
    }

    // Show search suggestions in modal
    function showSearchSuggestions(input, suggestionsModal) {
        if (!suggestionsModal) return;

        const query = input.value.trim().toLowerCase();
        const modalContent = suggestionsModal.querySelector('.search-modal-content');

        if (query.length < 2) {
            // Show history if available
            if (searchHistory.length > 0) {
                modalContent.innerHTML = `
                    <div class="search-suggestions-header">
                        <i class="fas fa-history"></i> Recherches récentes
                    </div>
                    ${searchHistory.map(term => `
                        <div class="search-suggestion" data-query="${term}">
                            <i class="fas fa-clock"></i>
                            <span>${term}</span>
                        </div>
                    `).join('')}
                `;
                suggestionsModal.classList.add('active');
            } else {
                suggestionsModal.classList.remove('active');
            }
            return;
        }

        // Perform fuzzy search for suggestions
        if (fuse) {
            const results = fuse.search(query).slice(0, CONFIG.MAX_SUGGESTIONS);

            if (results.length > 0) {
                modalContent.innerHTML = `
                    <div class="search-suggestions-header">
                        <i class="fas fa-sparkles"></i> ${results.length} résultat${results.length > 1 ? 's' : ''} pertinent${results.length > 1 ? 's' : ''}
                    </div>
                    ${results.map((result, index) => {
                    const item = result.item;
                    const score = (1 - result.score) * 100;

                    // Extraire un court extrait avec le match
                    let excerpt = item.excerpt;
                    if (excerpt.length > 80) {
                        excerpt = excerpt.substring(0, 80) + '...';
                    }

                    return `
                            <a href="${item.url}" class="search-suggestion" data-url="${item.url}">
                                <i class="fas fa-${index === 0 ? 'star' : 'file-alt'}"></i>
                                <div class="suggestion-content">
                                    <div class="suggestion-title">${item.title}</div>
                                    <div class="suggestion-excerpt">${excerpt}</div>
                                    <div class="suggestion-meta">
                                        ${item.categories ? `<span class="suggestion-category"><i class="fas fa-tag"></i> ${item.categories}</span>` : ''}
                                        <span class="suggestion-score"><i class="fas fa-check-circle"></i> ${Math.round(score)}%</span>
                                    </div>
                                </div>
                            </a>
                        `;
                }).join('')}
                `;
                suggestionsModal.classList.add('active');
            } else {
                modalContent.innerHTML = `
                    <div class="search-no-suggestions">
                        <i class="fas fa-search"></i>
                        <div>Aucune suggestion trouvée</div>
                    </div>
                `;
                suggestionsModal.classList.add('active');
            }
        }
    }

    // Load lazy posts into the DOM for search
    function loadLazyPostsForSearch() {
        if (lazyPostsLoadedForSearch) return;

        const lazyPostsData = document.getElementById('lazy-posts-data');
        if (!lazyPostsData) {
            lazyPostsLoadedForSearch = true;
            return;
        }

        const lazyPosts = Array.from(lazyPostsData.querySelectorAll('.lazy-post-data'));
        if (lazyPosts.length === 0) {
            lazyPostsLoadedForSearch = true;
            return;
        }

        console.log('🔍 Chargement de', lazyPosts.length, 'articles paginés pour la recherche...');

        const postsContainer = document.getElementById('blog-posts-container');
        const fragment = document.createDocumentFragment();

        lazyPosts.forEach(postData => {
            const wrapper = document.createElement('div');
            wrapper.className = 'post-preview-wrapper';
            wrapper.setAttribute('data-lazy-loaded', 'true'); // Marquer comme chargé pour la recherche

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
        lazyPostsData.remove();

        lazyPostsLoadedForSearch = true;
        console.log('✅ Articles paginés chargés pour la recherche');
    }

    // Build search index from DOM (includes all content)
    function buildSearchIndex() {
        const postsContainer = document.getElementById('blog-posts-container');
        if (!postsContainer) return;

        const posts = postsContainer.querySelectorAll('.post-preview-wrapper');
        searchIndex = [];

        // Index all visible posts (including lazy-loaded ones)
        posts.forEach((wrapper, index) => {
            const postElement = wrapper.querySelector('.post-preview-news');
            if (!postElement) return;

            const titleElement = wrapper.querySelector('.post-news-title');
            const titleLink = wrapper.querySelector('.post-news-title a');
            const excerptElement = wrapper.querySelector('.post-news-excerpt');

            searchIndex.push({
                id: index,
                element: wrapper,
                title: titleElement ? titleElement.textContent.trim() : '',
                excerpt: excerptElement ? excerptElement.textContent.trim() : '',
                categories: postElement.getAttribute('data-categories') || '',
                tags: postElement.getAttribute('data-tags') || '',
                url: titleLink ? titleLink.getAttribute('href') : '',
                isLazyLoaded: wrapper.getAttribute('data-lazy-loaded') === 'true'
            });
        });

        // Initialize Fuse.js with the search index
        if (window.Fuse) {
            fuse = new window.Fuse(searchIndex, CONFIG.FUSE_OPTIONS);
            console.log('🔍 Index de recherche créé:', searchIndex.length, 'articles');
        } else {
            console.warn('⚠️ Fuse.js non chargé, utilisation de la recherche basique');
        }
    }

    // Perform fuzzy search (simplified - all posts are loaded)
    function performFuzzySearch(query) {
        // Obtenir l'état global du filtrage (catégories)
        const activeCategory = window.blogState ? window.blogState.currentCategory : '';
        const activeSubcategory = window.blogState ? window.blogState.currentSubcategory : '';

        if (!query || query.length < 2) {
            // Si pas de recherche, on laisse blog-filters.js gérer tout (y compris les catégories)
            if (window.applyBlogFilters) {
                window.applyBlogFilters();
            } else {
                searchIndex.forEach(item => {
                    if (item.element) item.element.style.display = '';
                });
            }
            return searchIndex.length;
        }

        if (!fuse) {
            return performBasicSearch(query);
        }

        const results = fuse.search(query);
        let visibleCount = 0;

        // On réinitialise tout le monde à masqué d'abord
        searchIndex.forEach(item => {
            if (item.element) {
                item.element.style.display = 'none';
                const titleElement = item.element.querySelector('.post-news-title a');
                const excerptElement = item.element.querySelector('.post-news-excerpt');
                if (titleElement) titleElement.innerHTML = item.title;
                if (excerptElement) excerptElement.innerHTML = item.excerpt;
            }
        });

        // Gérer les sections Hero et Featured (on les cache en cas de recherche)
        const heroSection = document.querySelector('.hero-article');
        const featuredSection = document.querySelector('.featured-section');
        if (heroSection) heroSection.style.display = 'none';
        if (featuredSection) featuredSection.style.display = 'none';

        // Filtrer les résultats de recherche par la catégorie active
        results.forEach(result => {
            const item = result.item;
            const postElement = item.element.querySelector('.post-preview-news');

            let categoryMatches = true;
            if (activeCategory) {
                const postCategory = postElement.getAttribute('data-category') || '';
                const postSubcategory = postElement.getAttribute('data-subcategory') || '';
                const postCategories = (postElement.getAttribute('data-categories') || '').toLowerCase().split(' ');

                const matchesCat = (postCategory === activeCategory) || postCategories.includes(activeCategory.toLowerCase());

                if (activeSubcategory) {
                    if (postSubcategory !== activeSubcategory) categoryMatches = false;
                } else if (!matchesCat) {
                    categoryMatches = false;
                }
            }

            if (categoryMatches && item.element) {
                item.element.style.display = '';
                visibleCount++;

                // Highlights
                if (result.matches) {
                    result.matches.forEach(match => {
                        const element = item.element.querySelector(
                            match.key === 'title' ? '.post-news-title a' : '.post-news-excerpt'
                        );
                        if (element && match.indices) {
                            const highlighted = highlightText(match.value, match.indices);
                            element.innerHTML = highlighted;
                        }
                    });
                }
            }
        });

        return visibleCount;
    }

    // Fallback basic search (si Fuse.js n'est pas disponible)
    function performBasicSearch(query) {
        const searchTerm = query.toLowerCase();
        const activeCategory = window.blogState ? window.blogState.currentCategory : '';
        let visibleCount = 0;

        searchIndex.forEach(item => {
            const postElement = item.element.querySelector('.post-preview-news');
            const matchesSearch =
                item.title.toLowerCase().includes(searchTerm) ||
                item.excerpt.toLowerCase().includes(searchTerm) ||
                item.categories.toLowerCase().includes(searchTerm) ||
                item.tags.toLowerCase().includes(searchTerm);

            let categoryMatches = true;
            if (activeCategory) {
                const postCategory = postElement.getAttribute('data-category') || '';
                const postCategories = (postElement.getAttribute('data-categories') || '').toLowerCase().split(' ');
                categoryMatches = (postCategory === activeCategory) || postCategories.includes(activeCategory.toLowerCase());
            }

            const visible = matchesSearch && categoryMatches;
            item.element.style.display = visible ? '' : 'none';
            if (visible) visibleCount++;
        });

        return visibleCount;
    }

    // Initialize modern search
    function initializeModernSearch() {
        const pageSearchInput = document.getElementById('search-input');
        const clearSearchBtn = document.getElementById('clear-search');
        const noResultsDiv = document.getElementById('no-results');
        const filteredCountSpan = document.getElementById('filtered-count');

        if (!pageSearchInput) return;

        // Load search history
        loadSearchHistory();

        // Build search index
        buildSearchIndex();

        // Create suggestions modal
        let suggestionsModal = document.getElementById('search-modal');
        let modalSearchInput = null;

        if (!suggestionsModal) {
            suggestionsModal = document.createElement('div');
            suggestionsModal.id = 'search-modal';
            suggestionsModal.className = 'search-modal';
            suggestionsModal.innerHTML = `
                <div class="search-modal-overlay"></div>
                <div class="search-modal-box">
                    <div class="search-modal-header">
                        <i class="fas fa-search search-modal-icon"></i>
                        <input type="text" class="search-modal-input" placeholder="Rechercher un article, un outil..." autocomplete="off">
                        <button class="search-modal-close" aria-label="Fermer">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="search-modal-content"></div>
                </div>
            `;
            document.body.appendChild(suggestionsModal);

            modalSearchInput = suggestionsModal.querySelector('.search-modal-input');

            // Close modal functions
            const closeModal = () => {
                suggestionsModal.classList.remove('active');
                // Sync value back to page input (visual only)
                // pageSearchInput.value = modalSearchInput.value; 
            };

            // Close modal on overlay click
            const overlay = suggestionsModal.querySelector('.search-modal-overlay');
            overlay.addEventListener('click', closeModal);

            // Close modal on close button click
            const closeBtn = suggestionsModal.querySelector('.search-modal-close');
            closeBtn.addEventListener('click', closeModal);

            // Close modal on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && suggestionsModal.classList.contains('active')) {
                    closeModal();
                }
            });

            // Click handler for suggestions in modal
            suggestionsModal.addEventListener('click', function (e) {
                const suggestion = e.target.closest('.search-suggestion');
                if (suggestion) {
                    // Si lien article
                    if (suggestion.dataset.url) {
                        closeModal();
                        return;
                    }
                    // Si historique
                    const query = suggestion.dataset.query;
                    if (query) {
                        modalSearchInput.value = query;
                        modalSearchInput.dispatchEvent(new Event('input'));
                        modalSearchInput.focus();
                    }
                }
            });
        } else {
            modalSearchInput = suggestionsModal.querySelector('.search-modal-input');
        }

        // Open Modal Function
        const openSearchModal = () => {
            // Load lazy posts when opening (ensure index is ready)
            loadLazyPostsForSearch();
            if (lazyPostsLoadedForSearch && searchIndex.length < document.querySelectorAll('.post-preview-wrapper').length) {
                buildSearchIndex();
            }

            suggestionsModal.classList.add('active');

            // Sync value from page input if any
            if (pageSearchInput.value.trim()) {
                modalSearchInput.value = pageSearchInput.value;
                // Trigger search immediately
                modalSearchInput.dispatchEvent(new Event('input'));
            } else {
                // Show history/initial state
                showSearchSuggestions(modalSearchInput, suggestionsModal);
            }

            setTimeout(() => modalSearchInput.focus(), 50);
        };

        // Debounced search logic (inside modal)
        const debouncedModalSearch = debounce((input) => {
            const value = input.value.trim();

            // 1. Update/Filter Page Content (optional, but good for "Spotlight" feel if visible behind)
            // performFuzzySearch(value); 
            // We might want to DISABLE page filtering if the modal is covering everything
            // For now let's keep it disconnected or basic

            // 2. Show Results in Modal (Primary)
            showSearchSuggestions(input, suggestionsModal);

            // Save history handled inside showSearchSuggestions or manually?
            // Existing showSearchSuggestions uses Fuse results.

            // Save to history if valid search
            if (value.length >= 2) {
                saveSearchHistory(value);
            }

        }, 150);

        // Modal Input Listener
        if (modalSearchInput) {
            modalSearchInput.addEventListener('input', function () {
                debouncedModalSearch(this);
            });
        }

        // Page Input Listeners - Now act as triggers
        pageSearchInput.addEventListener('focus', function (e) {
            e.preventDefault();
            this.blur(); // Remove focus from page input
            openSearchModal();
        });

        pageSearchInput.addEventListener('click', function (e) {
            e.preventDefault();
            openSearchModal();
        });

        // Clear button on page - just clears page input
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                pageSearchInput.value = '';
                // Also clear modal?
                if (modalSearchInput) modalSearchInput.value = '';
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function (e) {
            // "/" or Ctrl+K to open search
            if ((e.key === '/' && !isInputFocused()) || ((e.ctrlKey || e.metaKey) && e.key === 'k')) {
                e.preventDefault();
                openSearchModal();
            }
        });

        console.log('🚀 Recherche moderne initialisée (Modal Mode)');
    }

    // Helper to check if input is focused
    function isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable
        );
    }

    // Re-export function to rebuild index when posts are loaded
    window.rebuildSearchIndex = buildSearchIndex;
    window.loadLazyPostsForSearch = loadLazyPostsForSearch;

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeModernSearch);
    } else {
        initializeModernSearch();
    }

})();
