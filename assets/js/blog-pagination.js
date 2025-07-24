// Blog pagination et filtres
document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('blog-posts-container');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const paginationNumbers = document.getElementById('pagination-numbers');
    const showingRange = document.getElementById('showing-range');
    const totalPostsSpan = document.getElementById('total-posts');
    const viewListBtn = document.getElementById('view-list');
    const viewGridBtn = document.getElementById('view-grid');
    
    if (!postsContainer) return;
    
    const postsPerPage = 6;
    let currentPage = 1;
    let allPosts = [];
    let filteredPosts = [];
    
    // Récupérer tous les articles au chargement
    function initializePosts() {
        const postElements = postsContainer.querySelectorAll('.post-preview-news');
        allPosts = Array.from(postElements).map(post => {
            const wrapper = post.closest('.post-preview-wrapper');
            return {
                element: wrapper,
                categories: (wrapper.dataset.categories || post.dataset.categories || '').split(' ').filter(c => c),
                tags: (wrapper.dataset.tags || post.dataset.tags || '').split(' ').filter(t => t),
                date: parseInt(wrapper.dataset.date || post.dataset.date) || 0,
                title: post.querySelector('.post-news-title a')?.textContent.trim() || '',
                readTime: parseInt(wrapper.dataset.readTime || post.dataset.readTime) || 0
            };
        });
        
        filteredPosts = [...allPosts];
        if (totalPostsSpan) {
            totalPostsSpan.textContent = allPosts.length;
        }
        updateDisplay();
    }
    
    // Filtrer les articles par catégorie
    function filterByCategory(category) {
        if (!category) {
            filteredPosts = [...allPosts];
        } else {
            filteredPosts = allPosts.filter(post => 
                post.categories.includes(category)
            );
        }
        currentPage = 1;
        updateDisplay();
    }
    
    // Trier les articles
    function sortPosts(sortBy) {
        switch(sortBy) {
            case 'date-desc':
                filteredPosts.sort((a, b) => b.date - a.date);
                break;
            case 'date-asc':
                filteredPosts.sort((a, b) => a.date - b.date);
                break;
            case 'title':
                filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
        currentPage = 1;
        updateDisplay();
    }
    
    // Mettre à jour l'affichage
    function updateDisplay() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const currentPosts = filteredPosts.slice(startIndex, endIndex);
        
        // Cacher tous les articles
        allPosts.forEach(post => {
            post.element.style.display = 'none';
        });
        
        // Afficher les articles de la page courante
        currentPosts.forEach(post => {
            post.element.style.display = 'block';
        });
        
        // Mettre à jour les boutons de pagination
        if (prevButton) {
            prevButton.disabled = currentPage === 1;
        }
        if (nextButton) {
            nextButton.disabled = currentPage === totalPages || totalPages === 0;
        }
        
        // Mettre à jour les numéros de pagination
        updatePaginationNumbers(totalPages);
        
        // Mettre à jour les informations d'affichage
        if (showingRange) {
            const start = filteredPosts.length > 0 ? startIndex + 1 : 0;
            const end = Math.min(endIndex, filteredPosts.length);
            showingRange.textContent = `${start}-${end}`;
        }
        
        if (totalPostsSpan) {
            totalPostsSpan.textContent = filteredPosts.length;
        }
        
        // Scroll vers le haut de la liste
        postsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Mettre à jour les numéros de pagination
    function updatePaginationNumbers(totalPages) {
        if (!paginationNumbers) return;
        
        paginationNumbers.innerHTML = '';
        
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
    }
    
    // Event listeners
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterByCategory(this.value);
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            sortPosts(this.value);
        });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                goToPage(currentPage - 1);
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
            if (currentPage < totalPages) {
                goToPage(currentPage + 1);
            }
        });
    }
    
    // Navigation par clavier
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        
        if (e.key === 'ArrowLeft' && currentPage > 1) {
            e.preventDefault();
            goToPage(currentPage - 1);
        } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
            e.preventDefault();
            goToPage(currentPage + 1);
        }
    });
    
    // Filtrage par hash URL pour les catégories
    function handleCategoryFromHash() {
        const hash = window.location.hash;
        if (hash.startsWith('#category-')) {
            const category = decodeURIComponent(hash.replace('#category-', ''));
            if (categoryFilter) {
                categoryFilter.value = category;
                filterByCategory(category);
            }
        }
    }
    
    // Écouter les changements de hash
    window.addEventListener('hashchange', handleCategoryFromHash);
    
    // Toggle vue liste/grille
    function toggleView(viewType) {
        if (viewType === 'grid') {
            postsContainer.classList.add('grid-view');
            viewGridBtn.classList.add('active');
            viewListBtn.classList.remove('active');
        } else {
            postsContainer.classList.remove('grid-view');
            viewListBtn.classList.add('active');
            viewGridBtn.classList.remove('active');
        }
        localStorage.setItem('blog-view', viewType);
    }
    
    // Event listeners pour les boutons de vue
    if (viewListBtn) {
        viewListBtn.addEventListener('click', () => toggleView('list'));
    }
    
    if (viewGridBtn) {
        viewGridBtn.addEventListener('click', () => toggleView('grid'));
    }
    
    // Restaurer la vue sauvegardée
    const savedView = localStorage.getItem('blog-view') || 'list';
    toggleView(savedView);
    
    // Initialiser
    initializePosts();
    handleCategoryFromHash();
});