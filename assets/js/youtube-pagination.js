// Pagination des vidéos YouTube - Adapté du script blog-pagination.js
(function() {
    const videosContainer = document.getElementById('youtube-videos-container');
    if (!videosContainer) return;

    const prevBtn = document.getElementById('youtube-prev-page');
    const nextBtn = document.getElementById('youtube-next-page');
    const paginationNumbers = document.getElementById('youtube-pagination-numbers');
    const showingRange = document.getElementById('youtube-showing-range');
    const totalVideos = document.getElementById('youtube-total-videos');

    if (!prevBtn || !nextBtn || !paginationNumbers) return;

    const videosPerPage = 6;
    let currentPage = 1;
    let totalPages = 0;

    // Fonction pour calculer le nombre total de pages
    function calculateTotalPages() {
        const allVideos = Array.from(videosContainer.querySelectorAll('.post-preview-wrapper'));
        const visibleVideos = allVideos.filter(video => video.style.display !== 'none');
        totalPages = Math.ceil(visibleVideos.length / videosPerPage);
        return visibleVideos;
    }

    // Fonction pour afficher la page courante
    function showPage(page) {
        const visibleVideos = calculateTotalPages();

        // Masquer toutes les vidéos
        visibleVideos.forEach(video => video.style.display = 'none');

        // Calculer les indices de début et fin
        const startIndex = (page - 1) * videosPerPage;
        const endIndex = Math.min(startIndex + videosPerPage, visibleVideos.length);

        // Afficher les vidéos de la page courante
        for (let i = startIndex; i < endIndex; i++) {
            visibleVideos[i].style.display = '';
        }

        // Mettre à jour les contrôles de pagination
        updatePaginationControls(page, visibleVideos.length);

        currentPage = page;
    }

    // Fonction pour mettre à jour les contrôles de pagination
    function updatePaginationControls(page, totalVisible) {
        // Mettre à jour les boutons précédent/suivant
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;

        // Calculer la plage affichée
        const startItem = (page - 1) * videosPerPage + 1;
        const endItem = Math.min(page * videosPerPage, totalVisible);

        if (showingRange) {
            showingRange.textContent = `${startItem}-${endItem}`;
        }

        if (totalVideos) {
            totalVideos.textContent = totalVisible;
        }

        // Générer les numéros de page
        generatePaginationNumbers(page);
    }

    // Fonction pour générer les numéros de page
    function generatePaginationNumbers(currentPage) {
        paginationNumbers.innerHTML = '';

        if (totalPages <= 1) return;

        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Ajuster si on est près de la fin
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Ajouter le bouton première page si nécessaire
        if (startPage > 1) {
            const firstBtn = createPaginationButton(1);
            firstBtn.textContent = '1';
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                paginationNumbers.appendChild(ellipsis);
            }
        }

        // Ajouter les numéros de page
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = createPaginationButton(i);
            pageBtn.textContent = i;
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
        }

        // Ajouter le bouton dernière page si nécessaire
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                paginationNumbers.appendChild(ellipsis);
            }
            const lastBtn = createPaginationButton(totalPages);
            lastBtn.textContent = totalPages;
        }
    }

    // Fonction pour créer un bouton de pagination
    function createPaginationButton(pageNum) {
        const btn = document.createElement('button');
        btn.className = 'pagination-btn';
        btn.textContent = pageNum;
        btn.addEventListener('click', () => showPage(pageNum));
        paginationNumbers.appendChild(btn);
        return btn;
    }

    // Événements pour les boutons précédent/suivant
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });

    // Fonction appelée après le filtrage pour mettre à jour la pagination
    window.youtubePaginationUpdate = function() {
        const visibleVideos = calculateTotalPages();

        if (visibleVideos.length <= videosPerPage) {
            // Masquer la pagination si tous les éléments tiennent sur une page
            const paginationContainer = document.querySelector('.pagination-container');
            if (paginationContainer) {
                paginationContainer.style.display = 'none';
            }
            // Afficher toutes les vidéos
            visibleVideos.forEach(video => video.style.display = '');
        } else {
            // Afficher la pagination
            const paginationContainer = document.querySelector('.pagination-container');
            if (paginationContainer) {
                paginationContainer.style.display = 'flex';
            }
            // Réinitialiser à la page 1
            showPage(1);
        }
    };

    // Initialisation
    setTimeout(() => {
        const visibleVideos = calculateTotalPages();
        if (visibleVideos.length > videosPerPage) {
            showPage(1);
        }
    }, 500);
})();
