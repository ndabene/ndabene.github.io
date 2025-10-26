// Script pour afficher les publications en mode admin_preview sur la page d'accueil
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si on est en mode admin
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminPreview = urlParams.get('admin_preview') === 'true' || 
                          sessionStorage.getItem('admin_preview') === 'true' ||
                          localStorage.getItem('admin_preview') === 'true';
    
    // Vérifier si on est sur la page d'accueil
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname === '/index.html';
    
    if (isAdminPreview && isHomePage) {
        loadAndRenderHomePublications();
    }
});

function loadAndRenderHomePublications() {
    // Récupérer les données des futurs posts
    const dataScript = document.getElementById('future-posts-data');
    if (!dataScript) return;
    
    try {
        const futurePosts = JSON.parse(dataScript.textContent);
        const container = document.getElementById('publications-home-container');
        
        if (!container) {
            console.error('Conteneur de publications sur la page d\'accueil non trouvé');
            return;
        }
        
        // Convertir les futurs posts en publications et les ajouter au conteneur
        futurePosts.forEach(post => {
            const publicationHtml = generateHomePublicationHtml(post);
            container.insertAdjacentHTML('beforeend', publicationHtml);
        });

        // console.log(`✅ ${futurePosts.length} futurs posts ajoutés en mode admin`);

    } catch (error) {
        console.error('Erreur lors du chargement des publications pour la homepage:', error);
    }
}

function generateHomePublicationHtml(post) {
    // Générer le HTML pour une publication sur la page d'accueil
    return `
    <div class="home-article-card animate-item future-publication">
        <article class="home-article">
            <div class="home-article-content">
                <!-- Vignette compacte -->
                ${post.image ? `
                    <div class="post-news-thumb">
                        <img src="${post.image}" alt="${post.title}" loading="lazy">
                        <span class="post-category-mini">À venir</span>
                    </div>
                ` : ''}
                
                <!-- Contenu principal -->
                <div class="post-news-text">
                    <!-- Méta-données compactes -->
                    <div class="post-news-meta">
                        <span class="publication-type-beautiful">Futur article</span>
                        <span class="reading-time">${post.estimated_reading_time || '5 min de lecture'}</span>
                    </div>
                    
                    <!-- Titre -->
                    <h3 class="post-news-title">
                        <a href="${post.url}" onclick="return false;" title="Article futur - Non accessible">${post.title}</a>
                    </h3>
                    
                    <!-- Extrait -->
                    <p class="post-news-excerpt">
                        ${post.excerpt}
                    </p>
                    
                    <!-- Tags compacts -->
                    <div class="post-news-tags">
                        ${post.tags.slice(0, 3).map(tag => `<span class="tag-mini">${tag}</span>`).join('')}
                    </div>
                </div>
                
                <!-- Actions -->
                <div class="post-news-actions">
                    <div class="future-post-badge">
                        <i class="fas fa-clock"></i> Publication prévue le ${post.date_formatted}
                    </div>
                </div>
            </div>
        </article>
    </div>
    `;
} 