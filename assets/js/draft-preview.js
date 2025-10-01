// JavaScript pour gérer les previews de drafts en production
// Permet de voir les articles draft avec ?preview=true ou ?preview_key=xxx

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isPreviewMode = urlParams.get('preview') === 'true';
    const previewKey = urlParams.get('preview_key');
    
    // Mode preview activé
    if (isPreviewMode || previewKey) {
        enableDraftPreview(previewKey);
    }
    
    function enableDraftPreview(providedKey) {
        let draftsShown = 0;
        
        // Afficher les articles marqués comme draft
        document.querySelectorAll('[data-draft="true"]').forEach(el => {
            const articleKey = el.getAttribute('data-preview-key');
            
            // Si pas de clé requise OU clé correcte
            if (!articleKey || (providedKey && articleKey === providedKey)) {
                el.style.display = 'block';
                el.classList.add('draft-preview-mode');
                draftsShown++;
            }
        });
        
        // Afficher les éléments de navigation draft
        document.querySelectorAll('.draft-navigation').forEach(el => {
            el.style.display = 'block';
        });
        
        // Créer la notification de preview
        if (draftsShown > 0) {
            createDraftNotification(draftsShown, !!providedKey);
        }
        
        // Marquer les articles draft visuellement
        addDraftStyles();
    }
    
    function createDraftNotification(count, hasKey) {
        const notification = document.createElement('div');
        notification.id = 'draft-notification';
        notification.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                color: white;
                padding: 12px 20px;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 9999;
                text-align: center;
                font-weight: 600;
                box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
            ">
                📝 MODE PREVIEW ACTIF - ${count} draft${count > 1 ? 's' : ''} visible${count > 1 ? 's' : ''}
                ${hasKey ? ' (accès sécurisé)' : ''}
                <button onclick="disableDraftPreview()" style="
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 6px 12px;
                    border-radius: 6px;
                    margin-left: 15px;
                    cursor: pointer;
                    font-size: 13px;
                    transition: all 0.2s ease;
                " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                   onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                    Désactiver
                </button>
            </div>
        `;
        document.body.insertBefore(notification, document.body.firstChild);
        
        // Ajuster le padding du body pour la notification
        document.body.style.paddingTop = '60px';
    }
    
    function addDraftStyles() {
        // Ajouter des styles CSS pour marquer visuellement les drafts
        if (!document.getElementById('draft-preview-styles')) {
            const style = document.createElement('style');
            style.id = 'draft-preview-styles';
            style.textContent = `
                .draft-preview-mode {
                    position: relative;
                    border: 2px dashed #3b82f6 !important;
                    border-radius: 8px;
                    background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(29, 78, 216, 0.05));
                }
                
                .draft-preview-mode::before {
                    content: "DRAFT";
                    position: absolute;
                    top: -12px;
                    right: 12px;
                    background: #3b82f6;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: bold;
                    z-index: 10;
                    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
                }
                
                .draft-preview-mode .post-title::after {
                    content: " 📝";
                    opacity: 0.7;
                }
                
                @media (max-width: 768px) {
                    .draft-preview-mode::before {
                        top: 8px;
                        right: 8px;
                        font-size: 10px;
                        padding: 3px 6px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Fonction globale pour désactiver le mode preview
    window.disableDraftPreview = function() {
        const url = new URL(window.location);
        url.searchParams.delete('preview');
        url.searchParams.delete('preview_key');
        window.location.href = url.toString();
    };
    
    // Utilitaire pour générer une URL de preview
    window.generatePreviewUrl = function(previewKey = null) {
        const url = new URL(window.location);
        url.searchParams.set('preview', 'true');
        if (previewKey) {
            url.searchParams.set('preview_key', previewKey);
        }
        return url.toString();
    };
    
    // Helper pour copier l'URL de preview
    window.copyPreviewUrl = function(previewKey = null) {
        const previewUrl = generatePreviewUrl(previewKey);
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(previewUrl).then(() => {
                showCopySuccess('URL de preview copiée !');
            });
        } else {
            // Fallback pour anciens navigateurs
            const textArea = document.createElement('textarea');
            textArea.value = previewUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopySuccess('URL de preview copiée !');
        }
    };
    
    function showCopySuccess(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = '✅ ' + message;
        
        // Animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 3000);
    }
});

// Debug helper pour les développeurs - logs supprimés pour production
// if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
//     console.log('🔧 Draft Preview System loaded');
//     console.log('💡 Utilisez ?preview=true pour voir les drafts');
//     console.log('🔑 Utilisez ?preview_key=xxx pour les drafts sécurisés');
// }