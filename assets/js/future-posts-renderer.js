// Rendu côté client des futurs posts pour contourner la limitation Jekyll
// Charge les données JSON et génère le HTML des futurs posts

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si on est en mode admin
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminPreview = urlParams.get('admin_preview') === 'true' || 
                          sessionStorage.getItem('admin_preview') === 'true';
    
    if (isAdminPreview) {
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
        
        // Générer le HTML pour chaque futur post
        futurePosts.forEach(post => {
            const postHtml = generatePostPreviewHtml(post);
            container.insertAdjacentHTML('afterbegin', postHtml);
        });
        
        // Réappliquer la vue actuelle après ajout des futurs posts
        const savedView = localStorage.getItem('blog-view') || 'list';
        if (savedView === 'grid') {
            container.classList.add('grid-view');
        }
        
        console.log(`✅ ${futurePosts.length} futurs posts ajoutés en mode admin`);
        
    } catch (error) {
        console.error('Erreur lors du chargement des futurs posts:', error);
    }
}

function generatePostPreviewHtml(post) {
    const tagsHtml = post.tags.slice(0, 3).map(tag => `<span class="tag-mini">${tag}</span>`).join('');
    const moreTagsHtml = post.tags.length > 3 ? `<span class="tag-more">+${post.tags.length - 3}</span>` : '';
    
    return `
        <div class="post-preview-wrapper future-post-item" 
             data-is-future="true"
             data-categories="${post.categories.join(' ')}"
             data-tags="${post.tags.join(' ')}"
             data-date="${new Date(post.date).getTime() / 1000}">
            <article class="post-preview-news">
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
                        <a href="${post.url}" class="read-more-compact" onclick="return false;" title="Article futur - Non accessible">
                            Lire <svg class="icon" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
                        </a>
                    </div>
                </div>
            </article>
            
            <div class="future-post-badge-compact">
                <svg class="icon" aria-hidden="true"><use href="#icon-clock"></use></svg> Prévu le ${post.date_formatted}
            </div>
            
            <!-- Helper LinkedIn pour les futurs posts -->
            <div class="future-post-linkedin-helper">
                <div class="linkedin-preview-mini">
                    <h5><svg class="icon" aria-hidden="true"><use href="#icon-linkedin"></use></svg> Planification LinkedIn</h5>
                    <div class="url-copy-section">
                        <input type="text" value="https://nicolas-dabene.fr${post.url}" readonly class="production-url-input">
                        <button onclick="copyFuturePostUrl(this)" class="btn-copy-mini">
                            <svg class="icon" aria-hidden="true"><use href="#icon-copy"></use></svg>
                        </button>
                    </div>
                    <textarea readonly class="linkedin-suggestion-mini" rows="3">🚀 Nouvel article bientôt publié : ${post.title}

${post.excerpt.substring(0, 100)}...

👉 https://nicolas-dabene.fr${post.url}

#${post.tags.join(' #')}</textarea>
                    <button onclick="copyLinkedInPost(this)" class="btn-copy-mini">
                        <svg class="icon" aria-hidden="true"><use href="#icon-copy"></use></svg> Copier le post
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
    button.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg> ${message}`;
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 2000);
}