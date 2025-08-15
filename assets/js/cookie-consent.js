/**
 * Système de gestion du consentement RGPD
 * Conforme aux exigences européennes
 */

class CookieConsent {
    constructor() {
        this.cookieName = 'ndabene_cookie_consent';
        this.consentData = this.getConsentData();
        this.init();
    }

    init() {
        // Vérifier si le consentement existe déjà
        if (!this.hasValidConsent()) {
            this.showBanner();
        } else {
            // Charger les services selon le consentement
            this.loadServices();
        }

        // Écouter les changements de préférences
        this.bindEvents();
    }

    hasValidConsent() {
        return this.consentData && 
               this.consentData.timestamp && 
               (Date.now() - this.consentData.timestamp) < (365 * 24 * 60 * 60 * 1000); // 1 an
    }

    getConsentData() {
        try {
            const data = localStorage.getItem(this.cookieName);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    setConsentData(preferences) {
        const consentData = {
            timestamp: Date.now(),
            preferences: preferences,
            version: '1.0'
        };
        
        try {
            localStorage.setItem(this.cookieName, JSON.stringify(consentData));
            this.consentData = consentData;
        } catch (e) {
            console.error('Impossible de sauvegarder les préférences cookies:', e);
        }
    }

    showBanner() {
        // Créer le banner s'il n'existe pas
        if (!document.getElementById('cookie-banner')) {
            this.createBanner();
        }
        
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'block';
            // Animation d'entrée
            setTimeout(() => banner.classList.add('show'), 100);
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-info">
                    <h3>🍪 Respect de votre vie privée</h3>
                    <p>Ce site utilise des cookies pour améliorer votre expérience et analyser l'audience. 
                    Vous pouvez accepter tous les cookies ou personnaliser vos préférences.</p>
                </div>
                <div class="cookie-banner-actions">
                    <button id="cookie-settings" class="btn-secondary">Personnaliser</button>
                    <button id="cookie-refuse" class="btn-outline">Refuser</button>
                    <button id="cookie-accept" class="btn-primary">Accepter tout</button>
                </div>
            </div>
            <div id="cookie-settings-panel" class="cookie-settings-panel" style="display: none;">
                <h4>Personnaliser les cookies</h4>
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h5>Cookies essentiels</h5>
                        <span class="required">Obligatoire</span>
                    </div>
                    <p>Nécessaires au fonctionnement du site (navigation, sécurité).</p>
                </div>
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h5>Cookies d'analyse</h5>
                            <label class="toggle">
                                <input type="checkbox" id="analytics-consent">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <p>Google Analytics pour comprendre l'utilisation du site. Par défaut, mesure anonyme sans cookie (Consent Mode). Cookies activés uniquement si vous acceptez.</p>
                    </div>
                <div class="cookie-settings-actions">
                    <button id="cookie-save" class="btn-primary">Sauvegarder</button>
                    <button id="cookie-cancel" class="btn-secondary">Annuler</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
    }

    bindEvents() {
        // Délégation d'événements pour gérer les éléments créés dynamiquement
        document.addEventListener('click', (e) => {
            if (e.target.id === 'cookie-accept') {
                this.acceptAll();
            } else if (e.target.id === 'cookie-refuse') {
                this.refuseAll();
            } else if (e.target.id === 'cookie-settings') {
                this.showSettings();
            } else if (e.target.id === 'cookie-save') {
                this.savePreferences();
            } else if (e.target.id === 'cookie-cancel') {
                this.hideSettings();
            }
        });

        // Gestion du lien "Modifier les préférences" dans le footer
        const cookieLink = document.querySelector('a[href="#cookie-preferences"]');
        if (cookieLink) {
            cookieLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showBanner();
                this.showSettings();
            });
        }
    }

    acceptAll() {
        this.setConsentData({
            essential: true,
            analytics: true
        });
        this.loadServices();
        this.hideBanner();
        this.showNotification('Préférences cookies sauvegardées.');
    }

    refuseAll() {
        this.setConsentData({
            essential: true,
            analytics: false
        });
        this.loadServices();
        this.hideBanner();
        this.showNotification('Seuls les cookies essentiels sont activés.');
    }

    showSettings() {
        const panel = document.getElementById('cookie-settings-panel');
        if (panel) {
            panel.style.display = 'block';
            
            // Préremplir selon le consentement actuel
            if (this.consentData && this.consentData.preferences) {
                const analyticsCheckbox = document.getElementById('analytics-consent');
                if (analyticsCheckbox) {
                    analyticsCheckbox.checked = this.consentData.preferences.analytics || false;
                }
            }
        }
    }

    hideSettings() {
        const panel = document.getElementById('cookie-settings-panel');
        if (panel) {
            panel.style.display = 'none';
        }
    }

    savePreferences() {
        const analyticsCheckbox = document.getElementById('analytics-consent');
        const preferences = {
            essential: true,
            analytics: analyticsCheckbox ? analyticsCheckbox.checked : false
        };
        
        this.setConsentData(preferences);
        this.loadServices();
        this.hideBanner();
        this.showNotification('Préférences cookies mises à jour.');
    }

    loadServices() {
        if (!this.consentData || !this.consentData.preferences) return;

        const { analytics } = this.consentData.preferences;

        // Charger Google Analytics si consenti
        if (analytics && window.gtag) {
            // GA déjà chargé, activer le tracking
            this.enableGoogleAnalytics();
        } else if (analytics) {
            // Charger GA dynamiquement
            this.loadGoogleAnalytics();
        } else {
            // Désactiver GA si refusé
            this.disableGoogleAnalytics();
        }
    }

    loadGoogleAnalytics() {
        // Avec Consent Mode, le script global est déjà inclus dans la page
        // On se contente d'activer le stockage analytics si l'utilisateur consent
        this.enableGoogleAnalytics();
    }

    enableGoogleAnalytics() {
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }

    disableGoogleAnalytics() {
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }

    showNotification(message) {
        // Créer une notification temporaire
        const notification = document.createElement('div');
        notification.className = 'cookie-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // API publique pour vérifier le consentement
    hasAnalyticsConsent() {
        return this.consentData && 
               this.consentData.preferences && 
               this.consentData.preferences.analytics === true;
    }

    // Révoquer le consentement (pour bouton "Supprimer mes données")
    revokeConsent() {
        localStorage.removeItem(this.cookieName);
        this.consentData = null;
        
        // Nettoyer les cookies GA existants
        this.clearGoogleAnalyticsCookies();
        
        this.showNotification('Consentement révoqué. Rechargez la page.');
    }

    clearGoogleAnalyticsCookies() {
        // Liste des cookies GA à supprimer
        const gaCookies = ['_ga', '_ga_*', '_gid', '_gat', '_gat_gtag_*'];
        
        gaCookies.forEach(cookieName => {
            if (cookieName.includes('*')) {
                // Gérer les cookies avec patterns
                const pattern = cookieName.replace('*', '');
                document.cookie.split(';').forEach(cookie => {
                    const cookieKey = cookie.trim().split('=')[0];
                    if (cookieKey.startsWith(pattern)) {
                        this.deleteCookie(cookieKey);
                    }
                });
            } else {
                this.deleteCookie(cookieName);
            }
        });
    }

    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

// Initialisation automatique quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cookieConsent = new CookieConsent();
    });
} else {
    window.cookieConsent = new CookieConsent();
}

// Exposer l'API globalement
window.CookieConsent = CookieConsent;