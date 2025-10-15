// Filtrage et tri des vidéos YouTube - Version adaptée du blog
document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments DOM
    const videosContainer = document.getElementById('youtube-videos-container');
    const searchInput = document.getElementById('youtube-search-input');
    const clearSearchBtn = document.getElementById('clear-youtube-search');
    const channelPills = document.querySelectorAll('.category-pill[data-channel]');
    const categoryPills = document.querySelectorAll('.category-pill[data-category]');
    const sortPills = document.querySelectorAll('.sort-pill[data-sort]');
    const resetFiltersBtn = document.getElementById('reset-youtube-filters');
    const filteredCountSpan = document.getElementById('youtube-filtered-count');
    const activeFiltersDiv = document.getElementById('youtube-active-filters');

    if (!videosContainer) return;

    // État des filtres
    let currentChannel = '';
    let currentCategory = '';
    let currentSort = 'date-desc';
    let currentSearch = '';

    // Masquer par défaut le div "pas de résultats"
    const noResultsDiv = document.getElementById('youtube-no-results');
    if (noResultsDiv) {
        noResultsDiv.style.display = 'none';
    }

    // Fonction pour appliquer les filtres
    function applyFilters() {
        // Récupérer toutes les vidéos
        const videos = Array.from(videosContainer.querySelectorAll('.post-preview-wrapper'));
        if (videos.length === 0) return;

        let visibleCount = 0;

        // Mise à jour des filtres actifs
        if (activeFiltersDiv) activeFiltersDiv.innerHTML = '';
        if (currentChannel) {
            addActiveFilter(currentChannel, 'channel');
        }
        if (currentCategory) {
            addActiveFilter(currentCategory, 'category');
        }
        if (currentSearch) {
            addActiveFilter(currentSearch, 'search');
        }

        // Filtrer les vidéos
        videos.forEach(video => {
            const videoCard = video.querySelector('.post-preview-card');
            if (!videoCard) return;

            // Récupérer les données de la vidéo
            const channel = videoCard.getAttribute('data-channel') || '';
            const categories = videoCard.getAttribute('data-categories') || '';
            const title = videoCard.getAttribute('data-title') || '';
            const excerpt = video.querySelector('.post-preview-excerpt');
            const content = excerpt ? excerpt.textContent.toLowerCase() : '';

            // Appliquer les filtres
            let visible = true;

            // Filtre chaîne
            if (currentChannel && channel !== currentChannel) {
                visible = false;
            }

            // Filtre catégorie
            if (currentCategory && categories && !categories.includes(currentCategory)) {
                visible = false;
            }

            // Filtre recherche
            if (currentSearch && !title.toLowerCase().includes(currentSearch) && !content.includes(currentSearch)) {
                visible = false;
            }

            // Afficher/masquer les vidéos
            video.style.display = visible ? '' : 'none';

            if (visible) {
                visibleCount++;
            }
        });

        // Mettre à jour le compteur
        if (filteredCountSpan) filteredCountSpan.textContent = `(${visibleCount})`;

        // Afficher/masquer le message "aucun résultat"
        if (noResultsDiv) {
            noResultsDiv.style.display = visibleCount === 0 ? 'flex' : 'none';
        }

        // Appliquer le tri
        sortVideos(currentSort);
    }

    // Fonction pour ajouter un filtre actif
    function addActiveFilter(value, type) {
        if (!activeFiltersDiv) return;

        const filterTag = document.createElement('div');
        filterTag.className = 'active-filter';

        let icon = '';
        let label = value;

        switch (type) {
            case 'channel':
                icon = 'fab fa-youtube';
                label = `Chaîne: ${value}`;
                break;
            case 'category':
                icon = 'fa-folder';
                label = `Catégorie: ${value}`;
                break;
            case 'search':
                icon = 'fa-search';
                label = `Recherche: "${value}"`;
                break;
        }

        filterTag.innerHTML = `
            <i class="fas ${icon}"></i>
            ${label}
            <button class="remove-filter" data-type="${type}">
                <i class="fas fa-times"></i>
            </button>
        `;

        activeFiltersDiv.appendChild(filterTag);

        // Ajouter l'événement pour supprimer le filtre
        filterTag.querySelector('.remove-filter').addEventListener('click', function() {
            const filterType = this.dataset.type;

            switch (filterType) {
                case 'channel':
                    currentChannel = '';
                    channelPills.forEach(p => p.classList.remove('active'));
                    channelPills[0]?.classList.add('active');
                    break;
                case 'category':
                    currentCategory = '';
                    categoryPills.forEach(p => p.classList.remove('active'));
                    categoryPills[0]?.classList.add('active');
                    break;
                case 'search':
                    currentSearch = '';
                    if (searchInput) searchInput.value = '';
                    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
                    break;
            }

            applyFilters();
        });
    }

    // Fonction pour trier les vidéos
    function sortVideos(sortValue) {
        const videos = Array.from(videosContainer.querySelectorAll('.post-preview-wrapper'));
        if (videos.length <= 1) return;

        videos.sort((a, b) => {
            const videoA = a.querySelector('.post-preview-card');
            const videoB = b.querySelector('.post-preview-card');

            if (!videoA || !videoB) return 0;

            switch (sortValue) {
                case 'date-desc':
                    const dateA = videoA.getAttribute('data-date') || '0';
                    const dateB = videoB.getAttribute('data-date') || '0';
                    return parseInt(dateB) - parseInt(dateA);
                case 'date-asc':
                    const dateAsc1 = videoA.getAttribute('data-date') || '0';
                    const dateAsc2 = videoB.getAttribute('data-date') || '0';
                    return parseInt(dateAsc1) - parseInt(dateAsc2);
                case 'title':
                    const titleElemA = a.querySelector('.post-preview-title');
                    const titleElemB = b.querySelector('.post-preview-title');
                    const titleA = titleElemA ? titleElemA.textContent : '';
                    const titleB = titleElemB ? titleElemB.textContent : '';
                    return titleA.localeCompare(titleB);
                default:
                    return 0;
            }
        });

        // Réorganiser les vidéos dans le DOM
        videos.forEach(video => videosContainer.appendChild(video));
    }

    // Gestion de la recherche
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value.toLowerCase();
            if (currentSearch) {
                clearSearchBtn.style.display = 'flex';
            } else {
                clearSearchBtn.style.display = 'none';
            }
            applyFilters();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            searchInput.value = '';
            currentSearch = '';
            this.style.display = 'none';
            applyFilters();
        });
    }

    // Gestion des pills de chaînes
    if (channelPills) {
        channelPills.forEach(pill => {
            pill.addEventListener('click', function() {
                channelPills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                currentChannel = this.dataset.channel;
                applyFilters();
            });
        });
    }

    // Gestion des pills de catégories
    if (categoryPills) {
        categoryPills.forEach(pill => {
            pill.addEventListener('click', function() {
                categoryPills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                currentCategory = this.dataset.category;
                applyFilters();
            });
        });
    }

    // Gestion des pills de tri
    if (sortPills) {
        sortPills.forEach(pill => {
            pill.addEventListener('click', function() {
                sortPills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                currentSort = this.dataset.sort;
                applyFilters();
            });
        });
    }

    // Événement pour réinitialiser les filtres
    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', function() {
        currentChannel = '';
        currentCategory = '';
        currentSearch = '';
        currentSort = 'date-desc';
        if (searchInput) searchInput.value = '';
        if (clearSearchBtn) clearSearchBtn.style.display = 'none';
        channelPills.forEach(p => p.classList.remove('active'));
        categoryPills.forEach(p => p.classList.remove('active'));
        sortPills.forEach(p => p.classList.remove('active'));
        channelPills[0]?.classList.add('active');
        categoryPills[0]?.classList.add('active');
        sortPills[0]?.classList.add('active');
        applyFilters();
    });

    // Toggle filtres
    const toggleFiltersBtn = document.getElementById('toggle-youtube-filters');
    const filtersContent = document.getElementById('youtube-filters-content');

    if (toggleFiltersBtn && filtersContent) {
        toggleFiltersBtn.addEventListener('click', function() {
            const isVisible = filtersContent.style.display !== 'none';

            if (isVisible) {
                filtersContent.style.display = 'none';
                this.classList.remove('active');
            } else {
                filtersContent.style.display = 'block';
                this.classList.add('active');
            }
        });
    }

    // Exécuter un filtrage initial
    setTimeout(applyFilters, 300);
});
