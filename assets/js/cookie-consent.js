/**
 * Système de gestion du consentement RGPD
 * Conforme aux exigences européennes
 */

class CookieConsent {
    constructor() {
        this.cookieName = 'ndabene_cookie_consent';
        this.consentData = this.getConsentData();
        this.analyticsConsentGranted = this.consentData &&
            this.consentData.preferences &&
            this.consentData.preferences.analytics === true;
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
        // Utiliser le banner intégré dans le footer
        const banner = document.getElementById('cookie-consent');
        if (banner) {
            banner.style.display = 'block';
            // Animation d'entrée
            setTimeout(() => banner.classList.add('show'), 100);

            // Scroll vers le footer pour rendre le banner visible
            banner.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookie-consent');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    bindEvents() {
        // Exposer les fonctions globalement pour les onclick dans le HTML
        window.acceptAllCookies = () => this.acceptAll();
        window.rejectAllCookies = () => this.refuseAll();
        window.toggleCookieSettings = () => this.toggleSettings();
        window.saveCustomCookies = () => this.savePreferences();
        window.showCookieConsent = () => {
            this.showBanner();
            this.showSettings();
        };

        // Délégation d'événements pour les éléments créés dynamiquement
        document.addEventListener('click', (e) => {
            // Classes des boutons dans le nouveau HTML du footer
            if (e.target.classList.contains('btn-cookie-accept')) {
                this.acceptAll();
            } else if (e.target.classList.contains('btn-cookie-reject')) {
                this.refuseAll();
            } else if (e.target.classList.contains('btn-cookie-customize')) {
                this.showSettings();
            } else if (e.target.classList.contains('btn-cookie-save')) {
                this.savePreferences();
            } else if (e.target.classList.contains('btn-cookie-cancel')) {
                this.hideSettings();
            }
        });
    }

    toggleSettings() {
        const panel = document.getElementById('cookie-settings');
        if (panel) {
            if (panel.style.display === 'none' || !panel.style.display) {
                this.showSettings();
            } else {
                this.hideSettings();
            }
        }
    }

    acceptAll() {
        const preferences = {
            essential: true,
            analytics: true,
            ad: true,
            adUserData: true,
            adPersonalization: true
        };

        this.setConsentData(preferences);
        this.enableGoogleAnalytics(preferences);
        this.hideBanner();
        this.showNotification('Préférences cookies sauvegardées.');
    }

    refuseAll() {
        this.setConsentData({
            essential: true,
            analytics: false,
            ad: false,
            adUserData: false,
            adPersonalization: false
        });
        this.disableGoogleAnalytics();
        this.hideBanner();
        this.showNotification('Seuls les cookies essentiels sont activés.');
    }

    showSettings() {
        const panel = document.getElementById('cookie-settings');
        if (panel) {
            panel.style.display = 'block';
            panel.classList.add('show');

            // Préremplir selon le consentement actuel
            if (this.consentData && this.consentData.preferences) {
                const analyticsCheckbox = document.getElementById('analytics-cookies');
                if (analyticsCheckbox) {
                    analyticsCheckbox.checked = this.consentData.preferences.analytics || false;
                }

                const marketingCheckbox = document.getElementById('marketing-cookies');
                if (marketingCheckbox) {
                    marketingCheckbox.checked = this.consentData.preferences.ad || false;
                }
            }
        }
    }

    hideSettings() {
        const panel = document.getElementById('cookie-settings');
        if (panel) {
            panel.classList.remove('show');
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
    }

    savePreferences() {
        const analyticsCheckbox = document.getElementById('analytics-cookies');
        const marketingCheckbox = document.getElementById('marketing-cookies');

        const preferences = {
            essential: true,
            analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
            ad: marketingCheckbox ? marketingCheckbox.checked : false,
            adUserData: marketingCheckbox ? marketingCheckbox.checked : false,
            adPersonalization: marketingCheckbox ? marketingCheckbox.checked : false
        };

        this.setConsentData(preferences);

        const anyConsent = preferences.analytics ||
            preferences.ad ||
            preferences.adUserData ||
            preferences.adPersonalization;

        if (anyConsent) {
            this.enableGoogleAnalytics(preferences);
        } else {
            this.disableGoogleAnalytics();
        }

        this.hideSettings();
        this.hideBanner();
        this.showNotification('Préférences cookies mises à jour.');
    }

    loadServices() {
        if (!this.consentData || !this.consentData.preferences) return;

        const preferences = this.consentData.preferences;
        const anyConsent = preferences.analytics ||
            preferences.ad ||
            preferences.adUserData ||
            preferences.adPersonalization;

        // Gérer Google Analytics localement
        if (anyConsent) {
            if (window.gtag) {
                this.enableGoogleAnalytics(preferences);
            } else {
                this.loadGoogleAnalytics(preferences);
            }
        } else {
            this.disableGoogleAnalytics();
        }
    }

    loadGoogleAnalytics(preferences) {
        // Avec Consent Mode, le script global est déjà inclus dans la page
        // Si consentement déjà donné au chargement, reconfigurer avec stockage activé
        if (window.gtag && window.GA_MEASUREMENT_ID && preferences.analytics) {
            window.gtag('config', window.GA_MEASUREMENT_ID, {
                'client_storage': 'auto',  // Active les cookies pour données enrichies
                'anonymize_ip': true,
                'allow_google_signals': false,
                'allow_ad_personalization_signals': false,
                'cookie_flags': 'SameSite=Strict;Secure'
            });
        }
        this.enableGoogleAnalytics(preferences);
    }

    enableGoogleAnalytics(preferences = {}) {
        if (window.gtag && window.GA_MEASUREMENT_ID) {
            const wasGranted = this.analyticsConsentGranted;
            const update = {};

            if (preferences.analytics) {
                update.analytics_storage = 'granted';
            }
            if (preferences.ad) {
                update.ad_storage = 'granted';
            }
            if (preferences.adUserData) {
                update.ad_user_data = 'granted';
            }
            if (preferences.adPersonalization) {
                update.ad_personalization = 'granted';
            }

            // Mettre à jour le consentement
            window.gtag('consent', 'update', update);

            // Si analytics accepté, reconfigurer avec stockage activé pour données enrichies
            if (preferences.analytics && !wasGranted) {
                window.gtag('config', window.GA_MEASUREMENT_ID, {
                    'client_storage': 'auto',  // Active les cookies pour données enrichies
                    'anonymize_ip': true,
                    'allow_google_signals': false,
                    'allow_ad_personalization_signals': false,
                    'cookie_flags': 'SameSite=Strict;Secure'
                });
                // Envoyer un événement page_view avec le nouveau mode
                window.gtag('event', 'page_view', {
                    page_location: location.href,
                    page_title: document.title
                });
            }
            this.analyticsConsentGranted = preferences.analytics === true;
        }
    }

    disableGoogleAnalytics() {
        if (window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
        this.analyticsConsentGranted = false;
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
