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
    let activeFilters = {
        tags: [],
        categories: []
    };

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
            // Import dynamique moderne (ES6)
            const pagefindModule = await import('/pagefind/pagefind.js');
            pagefind = pagefindModule.default || pagefindModule;
            isInitialized = true;
            console.log('✅ Pagefind initialisé avec succès');
        } catch (error) {
            console.error('❌ Erreur lors de l\'initialisation de Pagefind:', error);
            // Fallback vers la recherche basique si Pagefind échoue
            initializeFallbackSearch();
        }
    }

    // Recherche avec Pagefind (avec support des filtres)
    async function performPagefindSearch(query, filters = null) {
        const hasActiveFilters = activeFilters.tags.length > 0 || activeFilters.categories.length > 0;

        // Si pas de query et pas de filtres, afficher tout
        if ((!query || query.length < 2) && !hasActiveFilters) {
            showAllPosts();
            return;
        }

        if (!isInitialized) {
            await initializePagefind();
        }

        if (!isInitialized) {
            // Si l'initialisation a échoué, utiliser le fallback
            if (hasActiveFilters) {
                performFallbackFilter();
            } else {
                performFallbackSearch(query);
            }
            return;
        }

        try {
            // Préparer les options de recherche avec filtres
            const searchOptions = {};

            // Construire l'objet filters pour Pagefind
            const pagefindFilters = {};

            if (activeFilters.tags.length > 0) {
                pagefindFilters.tags = activeFilters.tags;
            }

            if (activeFilters.categories.length > 0) {
                pagefindFilters.category = activeFilters.categories;
            }

            if (Object.keys(pagefindFilters).length > 0) {
                searchOptions.filters = pagefindFilters;
            }

            // Rechercher avec Pagefind (query peut être vide si on filtre seulement)
            const searchQuery = query && query.length >= 2 ? query : '';
            const search = await pagefind.search(searchQuery, searchOptions);

            // Charger les données complètes des résultats
            const results = await Promise.all(
                search.results.map(r => r.data())
            );

            displaySearchResults(results, query);
        } catch (error) {
            console.error('Erreur de recherche Pagefind:', error);
            if (hasActiveFilters) {
                performFallbackFilter();
            } else {
                performFallbackSearch(query);
            }
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

        if (!results || results.length === 0) {
            if (filteredCountSpan) filteredCountSpan.textContent = '(0)';
            if (noResultsDiv) noResultsDiv.style.display = 'flex';
            updatePagination();
            return;
        }

        // Afficher les posts correspondants
        let visibleCount = 0;
        results.forEach(result => {
            // Trouver le post correspondant dans le DOM
            // Pagefind retourne l'URL du post (raw_url ou url)
            const postUrl = result.url || result.raw_url;

            const matchingPost = Array.from(allPosts).find(post => {
                const titleLink = post.querySelector('.post-news-title a');
                if (!titleLink) return false;

                const href = titleLink.getAttribute('href');
                // Comparer les URLs (avec et sans trailing slash)
                return href === postUrl ||
                       href === postUrl + '/' ||
                       href + '/' === postUrl ||
                       href.endsWith(postUrl) ||
                       postUrl.endsWith(href);
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

        console.log(`🔍 ${visibleCount} résultat(s) trouvé(s) pour "${query}"`);
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

    // Fallback filter (filtrage manuel par tags/catégories)
    function performFallbackFilter() {
        const postsContainer = document.getElementById('blog-posts-container');
        if (!postsContainer) return;

        const allPosts = postsContainer.querySelectorAll('.post-preview-wrapper');
        let visibleCount = 0;

        allPosts.forEach(wrapper => {
            const postElement = wrapper.querySelector('.post-preview-news');
            if (!postElement) return;

            const postTags = (postElement.getAttribute('data-tags') || '').toLowerCase().split(' ');
            const postCategories = (postElement.getAttribute('data-categories') || '').toLowerCase().split(' ');

            // Vérifier si le post correspond aux filtres actifs
            let matchesTags = true;
            let matchesCategories = true;

            if (activeFilters.tags.length > 0) {
                matchesTags = activeFilters.tags.some(tag =>
                    postTags.includes(tag.toLowerCase())
                );
            }

            if (activeFilters.categories.length > 0) {
                matchesCategories = activeFilters.categories.some(cat =>
                    postCategories.includes(cat.toLowerCase())
                );
            }

            const matches = matchesTags && matchesCategories;
            wrapper.style.display = matches ? '' : 'none';
            if (matches) visibleCount++;
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

    // Ajouter/retirer un tag des filtres actifs
    function toggleTagFilter(tag) {
        const index = activeFilters.tags.indexOf(tag);

        if (index > -1) {
            // Retirer le tag
            activeFilters.tags.splice(index, 1);
        } else {
            // Ajouter le tag
            activeFilters.tags.push(tag);
        }

        // Mettre à jour l'UI des filtres actifs
        updateActiveFiltersUI();

        // Relancer la recherche avec les nouveaux filtres
        const searchInput = document.getElementById('search-input');
        const query = searchInput ? searchInput.value.trim() : '';
        performPagefindSearch(query);
    }

    // Ajouter/retirer une catégorie des filtres actifs
    function toggleCategoryFilter(category) {
        const index = activeFilters.categories.indexOf(category);

        if (index > -1) {
            // Retirer la catégorie
            activeFilters.categories.splice(index, 1);
        } else {
            // Ajouter la catégorie
            activeFilters.categories.push(category);
        }

        // Mettre à jour l'UI des filtres actifs
        updateActiveFiltersUI();

        // Relancer la recherche avec les nouveaux filtres
        const searchInput = document.getElementById('search-input');
        const query = searchInput ? searchInput.value.trim() : '';
        performPagefindSearch(query);
    }

    // Réinitialiser tous les filtres
    function clearAllFilters() {
        activeFilters.tags = [];
        activeFilters.categories = [];

        updateActiveFiltersUI();

        // Relancer la recherche sans filtres
        const searchInput = document.getElementById('search-input');
        const query = searchInput ? searchInput.value.trim() : '';

        if (!query || query.length < 2) {
            showAllPosts();
        } else {
            performPagefindSearch(query);
        }
    }

    // Mettre à jour l'UI des filtres actifs
    function updateActiveFiltersUI() {
        const activeFiltersContainer = document.getElementById('active-filters');
        if (!activeFiltersContainer) return;

        const totalFilters = activeFilters.tags.length + activeFilters.categories.length;

        if (totalFilters === 0) {
            activeFiltersContainer.innerHTML = '';
            activeFiltersContainer.style.display = 'none';
            return;
        }

        activeFiltersContainer.style.display = 'flex';

        let html = '<div class="active-filters-list">';

        // Afficher les tags actifs
        activeFilters.tags.forEach(tag => {
            html += `
                <button class="active-filter-tag" data-tag="${tag}">
                    <i class="fas fa-tag"></i> ${tag}
                    <i class="fas fa-times"></i>
                </button>
            `;
        });

        // Afficher les catégories actives
        activeFilters.categories.forEach(category => {
            html += `
                <button class="active-filter-tag" data-category="${category}">
                    <i class="fas fa-folder"></i> ${category}
                    <i class="fas fa-times"></i>
                </button>
            `;
        });

        html += `
            <button class="clear-all-filters" id="clear-all-filters-btn">
                <i class="fas fa-times-circle"></i> Tout effacer
            </button>
        `;

        html += '</div>';

        activeFiltersContainer.innerHTML = html;

        // Ajouter les événements de clic sur les filtres actifs
        activeFiltersContainer.querySelectorAll('.active-filter-tag').forEach(btn => {
            btn.addEventListener('click', function() {
                const tag = this.getAttribute('data-tag');
                const category = this.getAttribute('data-category');

                if (tag) {
                    toggleTagFilter(tag);
                } else if (category) {
                    toggleCategoryFilter(category);
                }
            });
        });

        // Événement pour "Tout effacer"
        const clearAllBtn = document.getElementById('clear-all-filters-btn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', clearAllFilters);
        }

        // Mettre à jour les tags visuellement
        updateTagsVisualState();
    }

    // Mettre à jour l'état visuel des tags (actif/inactif)
    function updateTagsVisualState() {
        const allTagLinks = document.querySelectorAll('.tag-pill-large[data-tag-filter]');

        allTagLinks.forEach(link => {
            const tag = link.getAttribute('data-tag-filter');
            if (activeFilters.tags.includes(tag)) {
                link.classList.add('active-filter');
            } else {
                link.classList.remove('active-filter');
            }
        });
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

        // Initialiser les événements de filtrage sur les tags
        initializeTagFilters();

        console.log('🔍 Recherche Pagefind initialisée avec filtres par tags (raccourcis: / ou Ctrl+K)');
    }

    // Initialiser les filtres de tags
    function initializeTagFilters() {
        // Transformer tous les liens de tags en filtres cliquables
        const allTagLinks = document.querySelectorAll('.tag-pill-large');

        allTagLinks.forEach(link => {
            // Extraire le nom du tag depuis le texte ou l'attribut
            const tagText = link.textContent.trim();
            const tagMatch = tagText.match(/#([^\s(]+)/);

            if (tagMatch) {
                const tagName = tagMatch[1];

                // Ajouter un attribut data pour identifier le tag
                link.setAttribute('data-tag-filter', tagName);

                // Remplacer le comportement par défaut (navigation)
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    toggleTagFilter(tagName);
                });

                // Ajouter un indicateur visuel que c'est cliquable
                link.style.cursor = 'pointer';
                link.title = `Filtrer par ${tagName} (cliquer pour activer/désactiver)`;
            }
        });

        console.log(`🏷️  ${allTagLinks.length} tags configurés comme filtres`);
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
