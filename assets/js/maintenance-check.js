// Maintenance Mode & IP Check
// Ce script vérifie si le site est en mode maintenance et redirige si nécessaire

(function() {
    'use strict';
    
    // Configuration
    const MAINTENANCE_MODE = true; // Changer à false pour désactiver le mode maintenance
    const ALLOWED_IP = '109.210.10.225'; // IP autorisée pour accéder au site en développement
    const MAINTENANCE_PAGE = '/maintenance/';
    
    // Fonction pour obtenir l'IP du visiteur (approximative côté client)
    async function checkMaintenanceMode() {
        // Si le mode maintenance est désactivé, ne rien faire
        if (!MAINTENANCE_MODE) {
            console.log('🟢 Mode maintenance désactivé');
            return;
        }
        
        // Si on est déjà sur la page de maintenance, ne pas rediriger
        if (window.location.pathname === MAINTENANCE_PAGE) {
            console.log('🚧 Déjà sur la page de maintenance');
            return;
        }
        
        try {
            // Méthode 1: Vérifier via un service d'IP gratuit
            const response = await fetch('https://api.ipify.org?format=json', {
                timeout: 3000
            });
            
            if (response.ok) {
                const data = await response.json();
                const userIP = data.ip;
                
                console.log('🔍 IP détectée:', userIP);
                console.log('🔐 IP autorisée:', ALLOWED_IP);
                
                // Si l'IP n'est pas autorisée, rediriger vers la page de maintenance
                if (userIP !== ALLOWED_IP) {
                    console.log('🚧 Redirection vers la page de maintenance');
                    showMaintenanceNotice();
                    
                    // Redirection avec un délai pour l'UX
                    setTimeout(() => {
                        window.location.href = MAINTENANCE_PAGE;
                    }, 2000);
                } else {
                    console.log('✅ IP autorisée - Accès accordé');
                    showDeveloperNotice();
                }
            } else {
                // En cas d'erreur de l'API, rediriger par sécurité (sauf IP en whitelist)
                console.warn('⚠️ Impossible de vérifier l\'IP - Redirection par sécurité');
                fallbackMaintenanceCheck();
            }
        } catch (error) {
            console.error('❌ Erreur lors de la vérification IP:', error);
            // En cas d'erreur, utiliser une méthode de fallback
            fallbackMaintenanceCheck();
        }
    }
    
    // Méthode de fallback si l'API IP ne fonctionne pas
    function fallbackMaintenanceCheck() {
        // Vérifier si une clé spéciale est présente dans l'URL ou le localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const devKey = urlParams.get('dev');
        const storedDevKey = localStorage.getItem('ndabene_dev_access');
        
        // Clé de développement secrète
        const DEV_ACCESS_KEY = 'ndabene_dev_2025';
        
        if (devKey === DEV_ACCESS_KEY) {
            // Stocker la clé pour les futures visites
            localStorage.setItem('ndabene_dev_access', DEV_ACCESS_KEY);
            console.log('🔑 Clé de développement validée');
            showDeveloperNotice();
            return;
        }
        
        if (storedDevKey === DEV_ACCESS_KEY) {
            console.log('🔑 Accès développeur via localStorage');
            showDeveloperNotice();
            return;
        }
        
        // Sinon, rediriger vers la maintenance
        console.log('🚧 Mode maintenance activé - Redirection');
        showMaintenanceNotice();
        setTimeout(() => {
            window.location.href = MAINTENANCE_PAGE;
        }, 2000);
    }
    
    // Afficher une notification de maintenance
    function showMaintenanceNotice() {
        const notice = document.createElement('div');
        notice.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                color: white;
                padding: 1rem;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                border-bottom: 3px solid #06b6d4;
            ">
                <div style="max-width: 800px; margin: 0 auto;">
                    <h3 style="margin: 0 0 0.5rem 0; color: #06b6d4;">🚧 Site en cours de développement</h3>
                    <p style="margin: 0; opacity: 0.9;">Redirection vers la page de maintenance...</p>
                </div>
            </div>
        `;
        document.body.appendChild(notice);
        
        // Ajouter un overlay pour bloquer l'interaction
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.8);
            z-index: 9999;
            backdrop-filter: blur(5px);
        `;
        document.body.appendChild(overlay);
    }
    
    // Afficher une notification développeur
    function showDeveloperNotice() {
        // Créer un badge discret en bas à droite
        const devBadge = document.createElement('div');
        devBadge.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.875rem;
                font-weight: 600;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                animation: fadeInUp 0.5s ease;
            ">
                🔧 Mode développement
            </div>
            <style>
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            </style>
        `;
        document.body.appendChild(devBadge);
        
        // Retirer le badge après 5 secondes
        setTimeout(() => {
            devBadge.style.opacity = '0';
            devBadge.style.transform = 'translateY(20px)';
            setTimeout(() => devBadge.remove(), 300);
        }, 5000);
        
        // Ajouter des raccourcis clavier pour le développement
        document.addEventListener('keydown', function(e) {
            // Ctrl + Shift + M pour basculer le mode maintenance
            if (e.ctrlKey && e.shiftKey && e.key === 'M') {
                e.preventDefault();
                const newMode = !MAINTENANCE_MODE;
                console.log(`🔧 Mode maintenance ${newMode ? 'activé' : 'désactivé'}`);
                // Note: en production, ceci devrait être géré côté serveur
            }
        });
    }
    
    // Fonction publique pour désactiver le mode maintenance (pour debug)
    window.disableMaintenanceMode = function() {
        localStorage.setItem('ndabene_dev_access', 'ndabene_dev_2025');
        location.reload();
    };
    
    // Fonction publique pour activer le mode maintenance
    window.enableMaintenanceMode = function() {
        localStorage.removeItem('ndabene_dev_access');
        location.href = MAINTENANCE_PAGE;
    };
    
    // Démarrer la vérification quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkMaintenanceMode);
    } else {
        checkMaintenanceMode();
    }
    
    // Exporter la configuration pour debug
    window.MAINTENANCE_CONFIG = {
        mode: MAINTENANCE_MODE,
        allowedIP: ALLOWED_IP,
        maintenancePage: MAINTENANCE_PAGE
    };
    
})();