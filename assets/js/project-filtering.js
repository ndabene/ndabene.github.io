document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn-modern');
    const projectCards = document.querySelectorAll('.project-card-modern');
    
    if (!filterButtons.length || !projectCards.length) return;

    // Fonction de filtrage
    function filterProjects(category) {
        projectCards.forEach(card => {
            const cardCategories = card.dataset.categories ? card.dataset.categories.split(' ') : [];
            
            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });
        
        // Mettre à jour le compteur si il existe
        updateProjectCount(category);
    }
    
    // Fonction pour mettre à jour le compteur de projets
    function updateProjectCount(activeFilter) {
        const visibleProjects = Array.from(projectCards).filter(card => 
            card.style.display !== 'none'
        );
        
        const countElement = document.querySelector('.projects-count');
        if (countElement) {
            const count = visibleProjects.length;
            const total = projectCards.length;
            countElement.textContent = activeFilter === 'all' 
                ? `${total} projets au total`
                : `${count} projet${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}`;
        }
    }
    
    // Gestionnaire d'événements pour les boutons de filtre
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Filtrer les projets
            const filterValue = this.dataset.filter;
            filterProjects(filterValue);
            
            // Animation d'effet de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Initialisation : afficher tous les projets
    filterProjects('all');
    
    // Ajouter des animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer tous les cartes de projet
    projectCards.forEach(card => {
        observer.observe(card);
    });
});