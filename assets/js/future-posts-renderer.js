// Rendu côté client des futurs posts pour contourner la limitation Jekyll
// Charge les données JSON et génère le HTML des futurs posts

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si on est en mode admin
    const urlParams = new URLSearchParams(window.location.search);
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isAdminPreview = urlParams.get('admin_preview') === 'true' ||
                          sessionStorage.getItem('admin_preview') === 'true' ||
                          isLocalhost; // Auto-activer en local

    // Debug: Future Posts Renderer
    // console.log('📝 Future Posts Renderer:', { isLocalhost, isAdminPreview });

    if (isAdminPreview) {
        // console.log('🚀 Loading future posts...');
        loadAndRenderFuturePosts();
    }
});

function loadAndRenderFuturePosts() {
    // Récupérer les données des futurs posts
    const dataScript = document.getElementById('future-posts-data');
    if (!dataScript) return;

    try {
        const futurePosts = JSON.parse(dataScript.textContent);
        const container = document.getElementById('blog-posts-container');

        if (!container) return;

        // Trier les futurs posts par date (plus récent en premier)
        futurePosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Générer le HTML pour chaque futur post en les insérant en haut
        // On inverse l'ordre pour que le plus récent soit tout en haut
        futurePosts.reverse().forEach(post => {
            const postHtml = generatePostPreviewHtml(post);
            container.insertAdjacentHTML('afterbegin', postHtml);
        });

        // Réappliquer la vue actuelle après ajout des futurs posts
        const savedView = localStorage.getItem('blog-view') || 'list';
        if (savedView === 'grid') {
            container.classList.add('grid-view');
        }

        // console.log(`✅ ${futurePosts.length} futurs posts ajoutés en mode admin`);

    } catch (error) {
        console.error('Erreur lors du chargement des futurs posts:', error);
    }
}

function generatePostPreviewHtml(post) {
    const tagsHtml = post.tags.slice(0, 3).map(tag => `<span class="tag-mini">${tag}</span>`).join('');
    const moreTagsHtml = post.tags.length > 3 ? `<span class="tag-more">+${post.tags.length - 3}</span>` : '';
    const timestamp = new Date(post.date).getTime() / 1000;

    return `
        <div class="post-preview-wrapper future-post-item"
             data-is-future="true"
             data-categories="${post.categories.join(' ')}"
             data-tags="${post.tags.join(' ')}"
             data-date="${timestamp}">
            <article class="post-preview-news"
                     data-date="${timestamp}"
                     data-categories="${post.categories.join(' ')}"
                     data-tags="${post.tags.join(' ')}"
                     data-read-time="${post.estimated_reading_time ? post.estimated_reading_time.replace(/\D/g, '') : '5'}">
                <div class="post-news-content">
                    ${post.image ? `
                        <div class="post-news-thumb">
                            <img src="${post.image}" alt="${post.title}" loading="lazy">
                            <span class="post-category-mini">${post.categories[0] || 'Article'}</span>
                        </div>
                    ` : ''}
                    
                    <div class="post-news-text">
                        <div class="post-news-meta">
                            <time datetime="${post.date}">${post.date_formatted}</time>
                            ${post.estimated_reading_time ? `<span class="reading-time">${post.estimated_reading_time}</span>` : ''}
                            ${post.series ? `<span class="series-indicator">Série: ${post.series}</span>` : ''}
                        </div>
                        
                        <h3 class="post-news-title">
                            <a href="${post.url}" class="future-post-link" onclick="return false;" title="Article futur - Non accessible">
                                ${post.title}
                            </a>
                        </h3>
                        
                        <p class="post-news-excerpt">${post.excerpt}</p>
                        
                        <div class="post-news-tags">
                            ${tagsHtml}
                            ${moreTagsHtml}
                        </div>
                    </div>
                    
                    <div class="post-news-actions">
                        ${post.difficulty ? `
                            <span class="difficulty-badge difficulty-${post.difficulty.toLowerCase()}">
                                ${post.difficulty}
                            </span>
                        ` : ''}
                        <a href="${post.url}" class="read-more-compact" title="Article futur - Non accessible">
                            Lire <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </article>
            
            <div class="future-post-badge-compact">
                <i class="fas fa-clock"></i> Prévu le ${post.date_formatted}
            </div>
            
            <!-- Helper LinkedIn pour les futurs posts -->
            <div class="future-post-linkedin-helper">
                <div class="linkedin-preview-mini">
                    <h5><i class="fab fa-linkedin"></i> Planification LinkedIn</h5>
                    <div class="url-copy-section">
                        <input type="text" value="https://nicolas-dabene.fr${post.url}" readonly class="production-url-input">
                        <button onclick="copyFuturePostUrl(this)" class="btn-copy-mini">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <textarea readonly class="linkedin-suggestion-mini" rows="3">🚀 Nouvel article bientôt publié : ${post.title}

${post.excerpt.substring(0, 100)}...

👉 https://nicolas-dabene.fr${post.url}

#${post.tags.join(' #')}</textarea>
                    <button onclick="copyLinkedInPost(this)" class="btn-copy-mini">
                        <i class="fas fa-copy"></i> Copier le post
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Fonctions utilitaires pour les boutons de copie
window.copyFuturePostUrl = function(button) {
    const input = button.parentElement.querySelector('.production-url-input');
    input.select();
    
    try {
        document.execCommand('copy') || navigator.clipboard.writeText(input.value);
        showCopyFeedback(button, 'URL copiée !');
    } catch (err) {
        console.error('Erreur copie:', err);
    }
};

window.copyLinkedInPost = function(button) {
    const textarea = button.parentElement.querySelector('.linkedin-suggestion-mini');
    textarea.select();
    
    try {
        document.execCommand('copy') || navigator.clipboard.writeText(textarea.value);
        showCopyFeedback(button, 'Post copié !');
    } catch (err) {
        console.error('Erreur copie:', err);
    }
};

function showCopyFeedback(button, message) {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-check"></i> ${message}`;
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}