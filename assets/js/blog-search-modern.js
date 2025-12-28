// Modern Blog Search with Fuse.js - Recherche floue et moderne
// Amélioration de l'expérience de recherche avec fonctionnalités avancées

(function() {
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

    // Show search suggestions
    function showSearchSuggestions(input, suggestionsContainer) {
        if (!suggestionsContainer) return;

        const query = input.value.trim().toLowerCase();

        if (query.length < 2) {
            // Show history if available
            if (searchHistory.length > 0) {
                suggestionsContainer.innerHTML = `
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
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none';
            }
            return;
        }

        // Perform fuzzy search for suggestions
        if (fuse) {
            const results = fuse.search(query).slice(0, CONFIG.MAX_SUGGESTIONS);

            if (results.length > 0) {
                suggestionsContainer.innerHTML = `
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
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.innerHTML = `
                    <div class="search-no-suggestions">
                        <i class="fas fa-search"></i>
                        <div>Aucune suggestion trouvée</div>
                    </div>
                `;
                suggestionsContainer.style.display = 'block';
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
        if (!query || query.length < 2) {
            // Show all posts
            searchIndex.forEach(item => {
                if (item.element) {
                    item.element.style.display = '';
                    // Remove highlights
                    const titleElement = item.element.querySelector('.post-news-title a');
                    const excerptElement = item.element.querySelector('.post-news-excerpt');
                    if (titleElement) titleElement.innerHTML = item.title;
                    if (excerptElement) excerptElement.innerHTML = item.excerpt;
                }
            });
            return searchIndex.length;
        }

        if (!fuse) {
            // Fallback to basic search
            return performBasicSearch(query);
        }

        const results = fuse.search(query);
        let visibleCount = 0;

        // Hide all posts first
        searchIndex.forEach(item => {
            if (item.element) {
                item.element.style.display = 'none';
                // Remove previous highlights
                const titleElement = item.element.querySelector('.post-news-title a');
                const excerptElement = item.element.querySelector('.post-news-excerpt');
                if (titleElement) titleElement.innerHTML = item.title;
                if (excerptElement) excerptElement.innerHTML = item.excerpt;
            }
        });

        // Show matching results with highlights
        results.forEach(result => {
            const item = result.item;

            if (item.element) {
                item.element.style.display = '';
                visibleCount++;

                // Highlight matches
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
        let visibleCount = 0;

        searchIndex.forEach(item => {
            const matches =
                item.title.toLowerCase().includes(searchTerm) ||
                item.excerpt.toLowerCase().includes(searchTerm) ||
                item.categories.toLowerCase().includes(searchTerm) ||
                item.tags.toLowerCase().includes(searchTerm);

            item.element.style.display = matches ? '' : 'none';
            if (matches) visibleCount++;
        });

        return visibleCount;
    }

    // Initialize modern search
    function initializeModernSearch() {
        const searchInput = document.getElementById('search-input');
        const clearSearchBtn = document.getElementById('clear-search');
        const noResultsDiv = document.getElementById('no-results');
        const filteredCountSpan = document.getElementById('filtered-count');

        if (!searchInput) return;

        // Load search history
        loadSearchHistory();

        // Build search index
        buildSearchIndex();

        // Create suggestions container
        const searchWrapper = searchInput.closest('.search-input-wrapper');
        let suggestionsContainer = document.getElementById('search-suggestions');

        if (!suggestionsContainer && searchWrapper) {
            suggestionsContainer = document.createElement('div');
            suggestionsContainer.id = 'search-suggestions';
            suggestionsContainer.className = 'search-suggestions';
            searchWrapper.appendChild(suggestionsContainer);
        }

        // Debounced search function
        const debouncedSearch = debounce((value) => {
            // Load lazy posts if searching (ensures all posts are searchable)
            if (value.trim().length >= 2) {
                loadLazyPostsForSearch();
                // Rebuild index if lazy posts were just loaded
                if (lazyPostsLoadedForSearch && searchIndex.length < document.querySelectorAll('.post-preview-wrapper').length) {
                    buildSearchIndex();
                }
            }

            const visibleCount = performFuzzySearch(value);

            // Update UI
            if (filteredCountSpan) {
                filteredCountSpan.textContent = `(${visibleCount})`;
            }

            if (noResultsDiv) {
                noResultsDiv.style.display = visibleCount === 0 && value.length > 0 ? 'flex' : 'none';
            }

            // Update pagination
            if (window.blogPaginationUpdate) {
                window.blogPaginationUpdate();
            }

            // Save to history if results found
            if (visibleCount > 0 && value.trim().length >= 2) {
                saveSearchHistory(value.trim());
            }
        }, CONFIG.DEBOUNCE_DELAY);

        // Debounced suggestions
        const debouncedSuggestions = debounce((input) => {
            // Load lazy posts if user is typing for suggestions
            const value = input.value.trim();
            if (value.length >= 2) {
                loadLazyPostsForSearch();
                // Rebuild index if lazy posts were just loaded
                if (lazyPostsLoadedForSearch && searchIndex.length < document.querySelectorAll('.post-preview-wrapper').length) {
                    buildSearchIndex();
                }
            }
            showSearchSuggestions(input, suggestionsContainer);
        }, 150);

        // Search input handler
        searchInput.addEventListener('input', function() {
            const value = this.value.trim();

            if (clearSearchBtn) {
                clearSearchBtn.style.display = value ? 'flex' : 'none';
            }

            debouncedSearch(value);
            debouncedSuggestions(this);
        });

        // Focus handler - show suggestions
        searchInput.addEventListener('focus', function() {
            if (suggestionsContainer) {
                debouncedSuggestions(this);
            }
        });

        // Blur handler - hide suggestions (with delay for click)
        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                if (suggestionsContainer) {
                    suggestionsContainer.style.display = 'none';
                }
            }, 200);
        });

        // Click handler for suggestions
        if (suggestionsContainer) {
            suggestionsContainer.addEventListener('click', function(e) {
                const suggestion = e.target.closest('.search-suggestion');
                if (suggestion) {
                    // Si c'est un lien vers un article, laisser la navigation se faire naturellement
                    if (suggestion.dataset.url) {
                        // La navigation se fera via le href du <a>
                        return;
                    }
                    // Sinon, pour les recherches récentes, remplir l'input
                    const query = suggestion.dataset.query;
                    if (query) {
                        searchInput.value = query;
                        searchInput.dispatchEvent(new Event('input'));
                        suggestionsContainer.style.display = 'none';
                        searchInput.focus();
                    }
                }
            });
        }

        // Clear search button
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', function() {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.focus();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // "/" to focus search
            if (e.key === '/' && !isInputFocused()) {
                e.preventDefault();
                searchInput.focus();
            }

            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }

            // Escape to clear and blur
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        });

        console.log('🚀 Recherche moderne initialisée (raccourcis: / ou Ctrl+K)');
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

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeModernSearch);
    } else {
        initializeModernSearch();
    }

})();
