// Fonctionnalités de partage social pour les articles
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialiser les fonctionnalités de partage
    initSocialSharing();
    
});

/**
 * Initialise les fonctionnalités de partage social
 */
function initSocialSharing() {
    // Ajouter des analytics aux clics de partage
    trackSocialSharing();
    
    // Améliorer l'UX des boutons sociaux
    enhanceSocialButtons();
}

/**
 * Copie l'URL dans le presse-papiers
 */
function copyToClipboard(url) {
    // Utiliser l'API Clipboard moderne si disponible
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(function() {
            showCopySuccess();
        }).catch(function(err) {
            // Fallback en cas d'erreur
            fallbackCopyToClipboard(url);
        });
    } else {
        // Fallback pour navigateurs plus anciens
        fallbackCopyToClipboard(url);
    }
}

/**
 * Méthode de fallback pour copier dans le presse-papiers
 */
function fallbackCopyToClipboard(url) {
    // Créer un élément temporaire
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

/**
 * Affiche le feedback de succès pour la copie
 */
function showCopySuccess() {
    const copyBtn = document.querySelector('.social-btn--copy');
    if (copyBtn) {
        // Ajouter la classe de succès
        copyBtn.classList.add('copied');
        
        // Retirer la classe après 2 secondes
        setTimeout(() => {
            copyBtn.classList.remove('copied');
        }, 2000);
    }
    
    // Notification toast optionnelle
    showToast('Lien copié dans le presse-papiers !', 'success');
}

/**
 * Affiche le feedback d'erreur pour la copie
 */
function showCopyError() {
    showToast('Erreur lors de la copie du lien', 'error');
}

/**
 * Affiche une notification toast
 */
function showToast(message, type = 'info') {
    // Créer l'élément toast
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    
    // Styles inline pour le toast
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '9999',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        fontFamily: 'Inter, sans-serif'
    });
    
    // Ajouter au DOM
    document.body.appendChild(toast);
    
    // Animation d'entrée
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

/**
 * Track les clics de partage pour analytics
 */
function trackSocialSharing() {
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const platform = this.className.match(/social-btn--(\w+)/);
            if (platform && typeof gtag !== 'undefined') {
                gtag('event', 'share', {
                    method: platform[1],
                    content_type: 'article',
                    item_id: window.location.pathname
                });
            }
        });
    });
}

/**
 * Améliore l'UX des boutons sociaux
 */
function enhanceSocialButtons() {
    // Ajouter des tooltips au hover
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const platform = this.querySelector('span')?.textContent || 'Partager';
            this.setAttribute('title', `Partager sur ${platform}`);
        });
    });
    
    // Améliorer l'accessibilité
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Fonctions globales pour compatibilité
window.copyToClipboard = copyToClipboard;