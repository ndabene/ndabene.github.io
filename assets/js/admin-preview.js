// JavaScript pour gérer le mode admin preview
// Détecte automatiquement si on est en mode admin et affiche les éléments appropriés

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si on est en mode admin preview
    const urlParams = new URLSearchParams(window.location.search);
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isAdminPreview = urlParams.get('admin_preview') === 'true' ||
                          sessionStorage.getItem('admin_preview') === 'true' ||
                          localStorage.getItem('admin_preview') === 'true' ||
                          isLocalhost; // Auto-activer en local

    // Debug: Admin Preview
    // console.log('🔍 Admin Preview Debug:', { hostname: window.location.hostname, isLocalhost, isAdminPreview });

    if (isAdminPreview) {
        // console.log('✅ Mode admin activé');
        enableAdminMode();
    } else {
        // console.log('❌ Mode admin désactivé');
        // Afficher le bouton admin si on est en local
        if (isLocalhost) {
            const adminToggle = document.getElementById('admin-toggle-section');
            if (adminToggle) {
                adminToggle.style.display = 'block';
            }
        }
    }
    
    // Fonction pour activer le mode admin
    function enableAdminMode() {
        // Marquer la session comme admin
        sessionStorage.setItem('admin_preview', 'true');
        
        // Afficher tous les éléments admin
        document.querySelectorAll('.admin-preview-bar, .linkedin-preview-helper').forEach(el => {
            el.style.display = 'block';
        });
        
        // Afficher les futurs posts dans les listes
        document.querySelectorAll('[data-future="true"]').forEach(el => {
            el.style.display = 'block';
        });
        
        // Ajouter une classe au body pour les styles admin
        document.body.classList.add('admin-preview-mode');
    }
    
    // Fonction pour désactiver le mode admin
    window.disableAdminMode = function() {
        sessionStorage.removeItem('admin_preview');
        localStorage.removeItem('admin_preview');
        
        const url = new URL(window.location);
        url.searchParams.delete('admin_preview');
        window.location.href = url.toString();
    };
    
    // Bouton pour activer le mode admin (peut être ajouté n'importe où)
    window.enableAdminPreview = function() {
        const url = new URL(window.location);
        url.searchParams.set('admin_preview', 'true');
        window.location.href = url.toString();
    };
    
    // Notification admin désactivée
    // if (isAdminPreview) {
    //     createAdminNotification();
    // }

    // function createAdminNotification() {
    //     const notification = document.createElement('div');
    //     notification.id = 'admin-notification';
    //     notification.innerHTML = `
    //         <div style="
    //             background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    //             color: white;
    //             padding: 10px 20px;
    //             position: fixed;
    //             top: 0;
    //             left: 0;
    //             right: 0;
    //             z-index: 9999;
    //             text-align: center;
    //             font-weight: bold;
    //             box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    //         ">
    //             🔮 MODE ADMIN ACTIF - Futurs posts visibles
    //             <button onclick="disableAdminMode()" style="
    //                 background: rgba(255,255,255,0.2);
    //                 border: 1px solid rgba(255,255,255,0.3);
    //                 color: white;
    //                 padding: 5px 10px;
    //                 border-radius: 4px;
    //                 margin-left: 15px;
    //                 cursor: pointer;
    //             ">
    //                 Désactiver
    //             </button>
    //         </div>
    //     `;
    //     document.body.insertBefore(notification, document.body.firstChild);
    // }
});

// Fonctions utilitaires pour les boutons admin
window.copyProductionUrl = function() {
    const urlInput = document.getElementById('production-url');
    urlInput.select();
    urlInput.setSelectionRange(0, 99999); // Pour mobile
    
    try {
        document.execCommand('copy');
        showCopySuccess(event.target.closest('button'), 'URL copiée !');
    } catch (err) {
        // Fallback pour les navigateurs modernes
        navigator.clipboard.writeText(urlInput.value).then(() => {
            showCopySuccess(event.target.closest('button'), 'URL copiée !');
        });
    }
};

window.copyLinkedInSuggestion = function() {
    const textarea = document.getElementById('linkedin-suggestion');
    textarea.select();
    textarea.setSelectionRange(0, 99999); // Pour mobile
    
    try {
        document.execCommand('copy');
        showCopySuccess(event.target.closest('button'), 'Post copié !');
    } catch (err) {
        // Fallback pour les navigateurs modernes
        navigator.clipboard.writeText(textarea.value).then(() => {
            showCopySuccess(event.target.closest('button'), 'Post copié !');
        });
    }
};

function showCopySuccess(button, message) {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-check"></i> ${message}`;
    button.classList.add('success');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('success');
    }, 2000);
}