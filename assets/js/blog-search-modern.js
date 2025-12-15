// Modern Blog Search with Fuse.js - Recherche floue et moderne
// Amélioration de l'expérience de recherche avec fonctionnalités avancées

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        DEBOUNCE_DELAY: 200,
        MAX_HISTORY_ITEMS: 5,
        HISTORY_KEY: 'blog_search_history',
        FUSE_OPTIONS: {
            threshold: 0.4, // 0 = exact match, 1 = match anything
            distance: 100,
            minMatchCharLength: 2,
            keys: [
                { name: 'title', weight: 0.4 },
                { name: 'excerpt', weight: 0.2 },
                { name: 'categories', weight: 0.2 },
                { name: 'tags', weight: 0.2 }
            ],
            includeScore: true,
            includeMatches: true
        }
    };

    let fuse = null;
    let searchIndex = [];
    let searchHistory = [];

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
            const results = fuse.search(query).slice(0, 5);

            if (results.length > 0) {
                suggestionsContainer.innerHTML = `
                    <div class="search-suggestions-header">
                        <i class="fas fa-search"></i> Suggestions
                    </div>
                    ${results.map(result => {
                        const item = result.item;
                        const score = (1 - result.score) * 100;
                        return `
                            <div class="search-suggestion" data-query="${item.title}">
                                <i class="fas fa-file-alt"></i>
                                <div class="suggestion-content">
                                    <div class="suggestion-title">${item.title}</div>
                                    <div class="suggestion-meta">
                                        ${item.categories ? `<span class="suggestion-category">${item.categories}</span>` : ''}
                                        <span class="suggestion-score">${Math.round(score)}% pertinent</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                `;
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.innerHTML = `
                    <div class="search-no-suggestions">
                        <i class="fas fa-search"></i>
                        Aucune suggestion trouvée
                    </div>
                `;
                suggestionsContainer.style.display = 'block';
            }
        }
    }

    // Build search index from DOM
    function buildSearchIndex() {
        const postsContainer = document.getElementById('blog-posts-container');
        if (!postsContainer) return;

        const posts = postsContainer.querySelectorAll('.post-preview-wrapper');
        searchIndex = [];

        posts.forEach((wrapper, index) => {
            const postElement = wrapper.querySelector('.post-preview-news');
            if (!postElement) return;

            const titleElement = wrapper.querySelector('.post-news-title');
            const excerptElement = wrapper.querySelector('.post-news-excerpt');

            searchIndex.push({
                id: index,
                element: wrapper,
                title: titleElement ? titleElement.textContent.trim() : '',
                excerpt: excerptElement ? excerptElement.textContent.trim() : '',
                categories: postElement.getAttribute('data-categories') || '',
                tags: postElement.getAttribute('data-tags') || ''
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

    // Perform fuzzy search
    function performFuzzySearch(query) {
        if (!query || query.length < 2) {
            // Show all posts
            searchIndex.forEach(item => {
                item.element.style.display = '';
                // Remove highlights
                const titleElement = item.element.querySelector('.post-news-title a');
                const excerptElement = item.element.querySelector('.post-news-excerpt');
                if (titleElement) titleElement.innerHTML = item.title;
                if (excerptElement) excerptElement.innerHTML = item.excerpt;
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
            item.element.style.display = 'none';
            // Remove previous highlights
            const titleElement = item.element.querySelector('.post-news-title a');
            const excerptElement = item.element.querySelector('.post-news-excerpt');
            if (titleElement) titleElement.innerHTML = item.title;
            if (excerptElement) excerptElement.innerHTML = item.excerpt;
        });

        // Show matching results with highlights
        results.forEach(result => {
            const item = result.item;
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
                    const query = suggestion.dataset.query;
                    searchInput.value = query;
                    searchInput.dispatchEvent(new Event('input'));
                    suggestionsContainer.style.display = 'none';
                    searchInput.focus();
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
