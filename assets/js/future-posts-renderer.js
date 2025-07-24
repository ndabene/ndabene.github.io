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
        
        console.log(`✅ ${futurePosts.length} futurs posts ajoutés en mode admin`);
        
    } catch (error) {
        console.error('Erreur lors du chargement des futurs posts:', error);
    }
}

function generatePostPreviewHtml(post) {
    const tagsHtml = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    const categoriesHtml = post.categories.map(cat => `<span class="badge badge--category">${cat}</span>`).join('');
    
    return `
        <div class="post-preview-wrapper future-post-item" data-is-future="true">
            <article class="post-preview-card">
                <div class="post-preview-content">
                    ${post.image ? `
                        <div class="post-preview-image">
                            <img src="${post.image}" alt="${post.title}" loading="lazy">
                        </div>
                    ` : ''}
                    <div class="post-preview-text">
                        <div class="post-meta">
                            <time datetime="${post.date}">${post.date_formatted}</time>
                            ${post.author ? `<span class="author">• ${post.author}</span>` : ''}
                            ${post.estimated_reading_time ? `<span class="reading-time">• ${post.estimated_reading_time}</span>` : ''}
                        </div>
                        
                        <h3 class="post-title">
                            <a href="${post.url}" class="future-post-link" onclick="return false;" title="Article futur - Non accessible">
                                ${post.title}
                            </a>
                        </h3>
                        
                        <p class="post-excerpt">${post.excerpt}</p>
                        
                        <div class="post-footer">
                            <div class="post-categories-tags">
                                ${categoriesHtml}
                                ${post.difficulty ? `<span class="badge badge--difficulty-${post.difficulty.toLowerCase()}">${post.difficulty}</span>` : ''}
                            </div>
                            <div class="post-tags">
                                ${tagsHtml}
                            </div>
                        </div>
                        
                        ${post.series ? `
                            <div class="post-series-info">
                                <i class="fas fa-list-ol"></i>
                                <strong>Série:</strong> ${post.series} 
                                ${post.series_part ? `- Partie ${post.series_part}` : ''}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </article>
            
            <div class="future-post-badge">
                <i class="fas fa-clock"></i> Publication prévue le ${post.date_formatted}
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