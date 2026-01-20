// Blog Filters & Featured Articles - Optimized Version
// Performance optimizations for Mac Chrome and all browsers

(function () {
    'use strict';

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

    // Utility: Request Animation Frame wrapper
    function scheduleUpdate(callback) {
        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(callback);
        } else {
            callback();
        }
    }

    // Utility: Generate srcset for responsive images
    function generateSrcset(src) {
        if (!src || src.includes('://') || !src.endsWith('.webp')) return '';
        const basePath = src.split('.').slice(0, -1).join('.');
        return `${basePath}-480.webp 480w, ${basePath}-720.webp 720w, ${basePath}-1080.webp 1080w, ${src} 1200w`;
    }

    // Randomisation des articles featured - Optimisée avec cache
    function renderRandomFeaturedArticles() {
        const dataContainer = document.querySelector('.featured-articles-data');
        const gridContainer = document.getElementById('featured-articles-grid');

        if (!dataContainer || !gridContainer) return;

        const allArticles = Array.from(dataContainer.querySelectorAll('.featured-article-data'));
        if (allArticles.length === 0) return;

        // Vérifier si on a des articles en cache (session en cours)
        const CACHE_KEY = 'blog_featured_articles_cache';
        const CACHE_VERSION_KEY = 'blog_featured_articles_version';
        const currentVersion = allArticles.length.toString(); // Version basée sur le nombre d'articles

        let randomArticles;
        try {
            const cachedVersion = sessionStorage.getItem(CACHE_VERSION_KEY);
            const cachedIndices = sessionStorage.getItem(CACHE_KEY);

            // Utiliser le cache si la version correspond
            if (cachedVersion === currentVersion && cachedIndices) {
                const indices = JSON.parse(cachedIndices);
                randomArticles = indices.map(i => allArticles[i]).filter(Boolean);

                // Si le cache est valide, l'utiliser
                if (randomArticles.length === 3) {
                    console.log('📦 Articles featured chargés depuis le cache');
                } else {
                    randomArticles = null; // Cache invalide, regénérer
                }
            }
        } catch (e) {
            console.warn('Erreur lecture cache featured articles:', e);
            randomArticles = null;
        }

        // Générer de nouveaux articles si pas de cache valide
        if (!randomArticles) {
            // Optimisation: Fisher-Yates shuffle (plus performant que sort + random)
            const shuffled = [...allArticles];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            randomArticles = shuffled.slice(0, 3);

            // Sauvegarder les indices dans le cache
            try {
                const indices = randomArticles.map(article => allArticles.indexOf(article));
                sessionStorage.setItem(CACHE_KEY, JSON.stringify(indices));
                sessionStorage.setItem(CACHE_VERSION_KEY, currentVersion);
                console.log('💾 Articles featured mis en cache');
            } catch (e) {
                console.warn('Erreur sauvegarde cache featured articles:', e);
            }
        }

        // Utiliser DocumentFragment pour minimiser les reflows
        const fragment = document.createDocumentFragment();
        const tempContainer = document.createElement('div');

        randomArticles.forEach(article => {
            const url = article.dataset.url || '#';
            const title = article.dataset.title || 'Sans titre';
            const image = article.dataset.image || '/assets/images/default-post.jpg';
            const category = article.dataset.category || '';
            const categorySlug = article.dataset.categorySlug || '';
            const dateFormatted = article.dataset.dateFormatted || '';
            const readTime = article.dataset.readTime || '5';
            const excerpt = article.dataset.excerpt || '';
            const tagsStr = article.dataset.tags || '';
            const tags = tagsStr ? tagsStr.split(',') : [];

            const categoryBadge = category ?
                `<span class="featured-category-badge" data-category="${categorySlug}">${category}</span>` : '';

            const tagsHtml = tags.length > 0 ?
                `<div class="featured-tags">${tags.map(tag =>
                    `<span class="tag-pill">#${tag.trim()}</span>`
                ).join('')}</div>` : '';

            const srcset = generateSrcset(image);
            const sizes = "(max-width: 600px) 480px, (max-width: 900px) 720px, 1080px";

            const articleHTML = `
                <article class="featured-article-card">
                    <a href="${url}" class="featured-card-link">
                        <div class="featured-card-image">
                            <img src="${image}" 
                                 srcset="${srcset}" 
                                 sizes="${sizes}" 
                                 alt="${title}" 
                                 loading="lazy" 
                                 width="400" 
                                 height="250" 
                                 decoding="async">
                            ${categoryBadge}
                            <div class="featured-card-overlay"></div>
                        </div>
                        <div class="featured-card-content">
                            <div class="featured-card-meta">
                                <time><i class="fas fa-calendar-alt"></i> ${dateFormatted}</time>
                                <span class="reading-time"><i class="fas fa-clock"></i> ${readTime} min</span>
                            </div>
                            <h3 class="featured-card-title">${title}</h3>
                            <p class="featured-card-excerpt">${excerpt}</p>
                            <div class="featured-card-footer">
                                ${tagsHtml}
                                <span class="featured-read-more">Lire <i class="fas fa-arrow-right"></i></span>
                            </div>
                        </div>
                    </a>
                </article>
            `;

            tempContainer.innerHTML = articleHTML;
            fragment.appendChild(tempContainer.firstElementChild);
        });

        // Un seul reflow au lieu de plusieurs
        scheduleUpdate(() => {
            gridContainer.innerHTML = '';
            gridContainer.appendChild(fragment);
        });
    }

    // Toggle filtres
    function initializeFiltersToggle() {
        const toggleFiltersBtn = document.getElementById('toggle-filters');
        const filtersContent = document.getElementById('filters-content');

        if (toggleFiltersBtn && filtersContent) {
            toggleFiltersBtn.addEventListener('click', function () {
                const isVisible = filtersContent.style.display !== 'none';

                scheduleUpdate(() => {
                    if (isVisible) {
                        filtersContent.style.display = 'none';
                        this.classList.remove('active');
                    } else {
                        filtersContent.style.display = 'block';
                        this.classList.add('active');
                    }
                });
            });
        }
    }

    // Toggle tags populaires
    function initializeTagsToggle() {
        const toggleTagsBtn = document.getElementById('toggle-tags');
        const tagsContent = document.getElementById('tags-content');

        if (toggleTagsBtn && tagsContent) {
            toggleTagsBtn.addEventListener('click', function () {
                const isVisible = tagsContent.style.display !== 'none';
                const chevronIcon = this.querySelector('.chevron-icon');

                scheduleUpdate(() => {
                    if (isVisible) {
                        tagsContent.style.display = 'none';
                        if (chevronIcon) {
                            chevronIcon.classList.remove('fa-chevron-up');
                            chevronIcon.classList.add('fa-chevron-down');
                        }
                        this.classList.remove('active');
                    } else {
                        tagsContent.style.display = 'block';
                        if (chevronIcon) {
                            chevronIcon.classList.remove('fa-chevron-down');
                            chevronIcon.classList.add('fa-chevron-up');
                        }
                        this.classList.add('active');
                    }
                });
            });
        }
    }

    // Filtrage des articles - Version optimisée
    function initializeBlogFilters() {
        const postsContainer = document.getElementById('blog-posts-container');
        if (!postsContainer) return;

        // Forcer le mode grille
        postsContainer.classList.add('grid-view');

        // Cache des éléments DOM (évite les querySelectorAll répétés)
        // Note: La recherche est maintenant gérée par blog-search-modern.js
        const domCache = {
            // searchInput: document.getElementById('search-input'), // DÉSACTIVÉ - Géré par blog-search-modern.js
            // clearSearchBtn: document.getElementById('clear-search'), // DÉSACTIVÉ - Géré par blog-search-modern.js
            categoryPills: document.querySelectorAll('.category-pill'),
            sortPills: document.querySelectorAll('.sort-pill'),
            resetFiltersBtn: document.getElementById('reset-filters'),
            noResultsDiv: document.getElementById('no-results'),
            filteredCountSpan: document.getElementById('filtered-count'),
            activeFiltersDiv: document.getElementById('active-filters'),
            categorySidebarLinks: document.querySelectorAll('.category-compact')
        };

        // État des filtres
        // Note: currentSearch retiré - géré par blog-search-modern.js
        const state = {
            currentCategory: '',
            currentSort: 'date-desc'
            // currentSearch: '' // DÉSACTIVÉ - Géré par blog-search-modern.js
        };

        // Masquer par défaut le div "pas de résultats"
        if (domCache.noResultsDiv) {
            domCache.noResultsDiv.style.display = 'none';
        }

        // Nettoyer les tags "intermédiaire" - Optimisé avec setTimeout plus court
        setTimeout(() => {
            const allBadges = document.querySelectorAll('.badge');
            allBadges.forEach(badge => {
                if (badge.classList.contains('badge--intermediaire') ||
                    badge.textContent.trim().toLowerCase() === 'intermédiaire') {

                    const parentElement = badge.parentElement;
                    if (!parentElement ||
                        (!parentElement.classList.contains('series-card-difficulty') &&
                            !parentElement.classList.contains('difficulty-badge'))) {
                        badge.remove();
                    }
                }
            });
        }, 100); // Réduit de 300ms à 100ms

        // Fonction pour ajouter un filtre actif
        // NOTE: Désactivée car gérée par blog-categories-navigation.html
        function addActiveFilter(value, type) {
            // Cette fonction n'est plus utilisée car le filtrage par catégories
            // est maintenant géré par la navbar de catégories
            return;
        }

        // Fonction pour trier les posts - Optimisée
        function sortPosts(sortValue) {
            const posts = Array.from(postsContainer.querySelectorAll('.post-preview-wrapper'));
            if (posts.length <= 1) return;

            posts.sort((a, b) => {
                const postA = a.querySelector('.post-preview-news');
                const postB = b.querySelector('.post-preview-news');

                if (!postA || !postB) return 0;

                switch (sortValue) {
                    case 'date-desc':
                        return parseInt(postB.getAttribute('data-date') || '0') -
                            parseInt(postA.getAttribute('data-date') || '0');
                    case 'date-asc':
                        return parseInt(postA.getAttribute('data-date') || '0') -
                            parseInt(postB.getAttribute('data-date') || '0');
                    case 'title':
                        const titleA = a.querySelector('.post-news-title')?.textContent || '';
                        const titleB = b.querySelector('.post-news-title')?.textContent || '';
                        return titleA.localeCompare(titleB);
                    case 'reading-time':
                        return parseInt(postA.getAttribute('data-read-time') || '0') -
                            parseInt(postB.getAttribute('data-read-time') || '0');
                    default:
                        return 0;
                }
            });

            // Réorganiser avec requestAnimationFrame pour éviter les reflows
            scheduleUpdate(() => {
                posts.forEach(post => postsContainer.appendChild(post));
            });
        }

        // Fonction pour appliquer les filtres - Optimisée
        function applyFilters() {
            const posts = Array.from(postsContainer.querySelectorAll('.post-preview-wrapper'));
            if (posts.length === 0) return;

            let visibleCount = 0;

            // Mise à jour des filtres actifs - DÉSACTIVÉ
            // Le filtrage par catégories est maintenant géré par blog-categories-navigation.html
            // if (domCache.activeFiltersDiv) domCache.activeFiltersDiv.innerHTML = '';
            // if (state.currentCategory) {
            //     addActiveFilter(state.currentCategory, 'category');
            // }
            // Note: Recherche gérée par blog-search-modern.js
            // if (state.currentSearch) {
            //     addActiveFilter(state.currentSearch, 'search');
            // }

            // Batch DOM updates avec requestAnimationFrame
            scheduleUpdate(() => {
                posts.forEach(post => {
                    const postPreviewElement = post.querySelector('.post-preview-news');
                    if (!postPreviewElement) return;

                    // NOTE: Le filtrage par catégories est désormais géré par blog-categories-navigation.html
                    // On ne filtre plus sur data-categories (ancien système)
                    // Les articles utilisent maintenant data-category et data-subcategory

                    const title = post.querySelector('.post-news-title')?.textContent.toLowerCase() || '';
                    const content = post.querySelector('.post-news-excerpt')?.textContent.toLowerCase() || '';

                    let visible = true;

                    // Filtre catégorie - DÉSACTIVÉ - Géré par la navbar de catégories
                    // La logique de filtrage par catégorie est maintenant dans blog-categories-navigation.html

                    // Note: Recherche maintenant gérée par blog-search-modern.js avec Fuse.js
                    // Filtre recherche (amélioré : titre, contenu, catégories ET tags) - DÉSACTIVÉ
                    // if (state.currentSearch &&
                    //     !title.includes(state.currentSearch) &&
                    //     !content.includes(state.currentSearch) &&
                    //     !categoriesText.includes(state.currentSearch) &&
                    //     !tagsText.includes(state.currentSearch)) {
                    //     visible = false;
                    // }

                    post.style.display = visible ? '' : 'none';

                    if (visible) {
                        visibleCount++;
                    }
                });

                // Mettre à jour le compteur
                if (domCache.filteredCountSpan) {
                    domCache.filteredCountSpan.textContent = `(${visibleCount})`;
                }

                if (domCache.noResultsDiv) {
                    domCache.noResultsDiv.style.display = visibleCount === 0 ? 'flex' : 'none';
                }

                // Appliquer le tri
                sortPosts(state.currentSort);

                // Mettre à jour la pagination
                if (window.blogPaginationUpdate) {
                    window.blogPaginationUpdate();
                }
            });
        }

        // Note: La recherche est maintenant gérée par blog-search-modern.js
        // Gestion de la recherche avec debouncing (300ms) - DÉSACTIVÉ
        // if (domCache.searchInput) {
        //     const debouncedSearch = debounce((value) => {
        //         state.currentSearch = value.toLowerCase();
        //         applyFilters();
        //     }, 300);

        //     domCache.searchInput.addEventListener('input', function() {
        //         if (this.value) {
        //             domCache.clearSearchBtn.style.display = 'flex';
        //         } else {
        //             domCache.clearSearchBtn.style.display = 'none';
        //         }
        //         debouncedSearch(this.value);
        //     });
        // }

        // if (domCache.clearSearchBtn) {
        //     domCache.clearSearchBtn.addEventListener('click', function() {
        //         domCache.searchInput.value = '';
        //         state.currentSearch = '';
        //         this.style.display = 'none';
        //         applyFilters();
        //     });
        // }

        // Gestion des pills de catégories - DÉSACTIVÉ
        // Le filtrage par catégories est maintenant géré par blog-categories-navigation.html
        // domCache.categoryPills.forEach(pill => {
        //     pill.addEventListener('click', function () {
        //         domCache.categoryPills.forEach(p => p.classList.remove('active'));
        //         this.classList.add('active');
        //         state.currentCategory = this.dataset.category;
        //         applyFilters();
        //     });
        // });

        // Gestion des pills de tri
        domCache.sortPills.forEach(pill => {
            pill.addEventListener('click', function () {
                domCache.sortPills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                state.currentSort = this.dataset.sort;
                applyFilters();
            });
        });

        // Réinitialiser les filtres
        if (domCache.resetFiltersBtn) {
            domCache.resetFiltersBtn.addEventListener('click', function () {
                // Note: Les catégories sont réinitialisées par blog-categories-navigation.html
                // state.currentCategory = ''; // DÉSACTIVÉ
                // state.currentSearch = ''; // DÉSACTIVÉ - Géré par blog-search-modern.js
                state.currentSort = 'date-desc';

                // Note: La recherche est réinitialisée par blog-search-modern.js
                // if (domCache.searchInput) domCache.searchInput.value = '';
                // if (domCache.clearSearchBtn) domCache.clearSearchBtn.style.display = 'none';

                // Déclencher la réinitialisation de la recherche moderne
                const searchInput = document.getElementById('search-input');
                const clearSearchBtn = document.getElementById('clear-search');
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.dispatchEvent(new Event('input'));
                }
                if (clearSearchBtn) clearSearchBtn.style.display = 'none';

                // Réinitialisation des pills de catégories - DÉSACTIVÉ
                // domCache.categoryPills.forEach(p => p.classList.remove('active'));
                // if (domCache.categoryPills[0]) {
                //     domCache.categoryPills[0].classList.add('active');
                // }

                domCache.sortPills.forEach(p => p.classList.remove('active'));
                if (domCache.sortPills[0]) {
                    domCache.sortPills[0].classList.add('active');
                }

                // Déclencher la réinitialisation de la navbar de catégories
                const clearCategoryFilter = document.getElementById('clear-filter-btn');
                if (clearCategoryFilter) {
                    clearCategoryFilter.click();
                }

                applyFilters();
            });
        }

        // Catégories sidebar - DÉSACTIVÉ
        // Le filtrage par catégories est maintenant géré par blog-categories-navigation.html
        // domCache.categorySidebarLinks.forEach(link => {
        //     link.addEventListener('click', function (e) {
        //         e.preventDefault();
        //         const category = this.dataset.category;
        //         state.currentCategory = category;
        //
        //         domCache.categoryPills.forEach(p => {
        //             if (p.dataset.category === category) {
        //                 p.classList.add('active');
        //             } else {
        //                 p.classList.remove('active');
        //             }
        //         });
        //
        //         applyFilters();
        //     });
        // });

        // Filtrage initial - Délai réduit
        setTimeout(() => {
            applyFilters();

            // Vérifier si des posts sont visibles
            const posts = Array.from(postsContainer.querySelectorAll('.post-preview-wrapper'));
            const visiblePosts = posts.filter(post => post.style.display !== 'none');

            if (visiblePosts.length === 0 && posts.length > 0) {
                applyFilters();
            }
        }, 100); // Réduit de 300ms à 100ms
    }

    // Initialisation au chargement du DOM
    document.addEventListener('DOMContentLoaded', function () {
        renderRandomFeaturedArticles();
        initializeFiltersToggle();
        initializeTagsToggle();
        initializeBlogFilters();
    });

})();
