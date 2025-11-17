/**
 * GOOGLE CMP INTEGRATION
 * Intègre le CMP de Google Funding Choices avec le système de gestion des cookies
 * et gère le reset des cookies Google Analytics
 */

(function() {
    'use strict';

    // Fonction pour supprimer les cookies Google Analytics
    function clearGoogleAnalyticsCookies() {
        console.log('[Google CMP] Suppression des cookies Google Analytics...');

        // Liste des cookies GA à supprimer
        const gaCookiePatterns = ['_ga', '_ga_', '_gid', '_gat', '_gat_gtag_'];

        // Récupérer tous les cookies
        const cookies = document.cookie.split(';');

        cookies.forEach(cookie => {
            const cookieName = cookie.trim().split('=')[0];

            // Vérifier si le cookie correspond à un pattern GA
            const isGACookie = gaCookiePatterns.some(pattern => cookieName.startsWith(pattern));

            if (isGACookie) {
                // Supprimer le cookie pour tous les domaines possibles
                const domain = window.location.hostname;
                const paths = ['/', ''];
                const domains = [domain, '.' + domain, ''];

                paths.forEach(path => {
                    domains.forEach(d => {
                        const domainPart = d ? `domain=${d};` : '';
                        const pathPart = path ? `path=${path};` : '';
                        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;${pathPart}${domainPart}`;
                    });
                });

                console.log('[Google CMP] Cookie supprimé:', cookieName);
            }
        });
    }

    // Fonction pour mettre à jour le consentement Google Analytics
    function updateGoogleAnalyticsConsent(hasConsent) {
        if (window.gtag) {
            if (hasConsent) {
                console.log('[Google CMP] Activation de Google Analytics');
                window.gtag('consent', 'update', {
                    'analytics_storage': 'granted',
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted'
                });

                // Reconfigurer GA avec stockage activé
                if (window.GA_MEASUREMENT_ID) {
                    window.gtag('config', window.GA_MEASUREMENT_ID, {
                        'client_storage': 'auto',
                        'anonymize_ip': true,
                        'allow_google_signals': false,
                        'allow_ad_personalization_signals': false,
                        'cookie_flags': 'SameSite=Strict;Secure'
                    });
                }
            } else {
                console.log('[Google CMP] Désactivation de Google Analytics');

                // D'abord supprimer les cookies
                clearGoogleAnalyticsCookies();

                // Ensuite mettre à jour le consentement
                window.gtag('consent', 'update', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied'
                });
            }
        }
    }

    // Fonction pour ouvrir le CMP de Google
    function openGoogleCMP(e) {
        e.preventDefault();

        console.log('[Google CMP] Tentative d\'ouverture du CMP...');

        // Méthode 1 : Via __tcfapi (Transparency and Consent Framework)
        if (typeof window.__tcfapi === 'function') {
            console.log('[Google CMP] Ouverture via __tcfapi');
            window.__tcfapi('displayConsentUi', 2, function(success) {
                console.log('[Google CMP] TCF displayConsentUi:', success);
            });
            return;
        }

        // Méthode 2 : Via __gpp (Global Privacy Platform)
        if (typeof window.__gpp === 'function') {
            console.log('[Google CMP] Ouverture via __gpp');
            window.__gpp('displayConsentUi');
            return;
        }

        // Méthode 3 : Via l'API Funding Choices
        if (window.googlefc && window.googlefc.callbackQueue) {
            console.log('[Google CMP] Ouverture via googlefc API');
            window.googlefc.callbackQueue.push(function() {
                if (window.googlefc.showRevocationMessage) {
                    window.googlefc.showRevocationMessage();
                }
            });
            return;
        }

        // Si aucune méthode ne fonctionne, afficher un message
        console.warn('[Google CMP] Impossible d\'ouvrir le CMP - API non disponible');
        alert('Le gestionnaire de cookies se chargera dans quelques instants. Veuillez réessayer.');
    }

    // Écouter les changements de consentement via __tcfapi
    function listenToConsentChanges() {
        if (typeof window.__tcfapi === 'function') {
            console.log('[Google CMP] Écoute des changements de consentement TCF');

            window.__tcfapi('addEventListener', 2, function(tcData, success) {
                if (success) {
                    console.log('[Google CMP] Événement TCF reçu:', tcData.eventStatus);

                    // Quand l'utilisateur a fait un choix
                    if (tcData.eventStatus === 'useractioncomplete' || tcData.eventStatus === 'tcloaded') {
                        console.log('[Google CMP] Consentement mis à jour:', tcData);

                        // Vérifier si le consentement analytics est accordé
                        const hasAnalyticsConsent = tcData.purpose && tcData.purpose.consents &&
                                                   (tcData.purpose.consents[1] || tcData.purpose.consents[7]);

                        // Si le consentement est refusé, supprimer les cookies
                        if (!hasAnalyticsConsent) {
                            clearGoogleAnalyticsCookies();
                        }

                        updateGoogleAnalyticsConsent(hasAnalyticsConsent);
                    }
                }
            });
        }

        // Écouter aussi via __gpp si disponible
        if (typeof window.__gpp === 'function') {
            console.log('[Google CMP] Écoute des changements de consentement GPP');

            window.__gpp('addEventListener', function(evt) {
                console.log('[Google CMP] Événement GPP reçu:', evt);

                if (evt && evt.eventName === 'sectionChange') {
                    // Récupérer le consentement
                    window.__gpp('ping', function(pingData) {
                        const hasConsent = pingData && pingData.gppData &&
                                         pingData.gppData.applicableSections &&
                                         pingData.gppData.applicableSections.length > 0;

                        if (!hasConsent) {
                            clearGoogleAnalyticsCookies();
                        }

                        updateGoogleAnalyticsConsent(hasConsent);
                    });
                }
            });
        }
    }

    // Initialisation
    function init() {
        console.log('[Google CMP] Initialisation de l\'intégration CMP Google');

        // Attacher l'événement au bouton
        const trigger = document.getElementById('google-cmp-trigger');
        if (trigger) {
            trigger.addEventListener('click', openGoogleCMP);
            console.log('[Google CMP] Bouton "Gérer mes cookies" attaché');
        } else {
            console.warn('[Google CMP] Bouton "Gérer mes cookies" non trouvé');
        }

        // Écouter les changements de consentement
        // Attendre que le CMP soit chargé
        let attempts = 0;
        const maxAttempts = 20; // 10 secondes max

        const checkCMPReady = setInterval(function() {
            attempts++;

            if (typeof window.__tcfapi === 'function' || typeof window.__gpp === 'function') {
                clearInterval(checkCMPReady);
                listenToConsentChanges();
            } else if (attempts >= maxAttempts) {
                clearInterval(checkCMPReady);
                console.warn('[Google CMP] Timeout - CMP API non disponible');
            }
        }, 500);
    }

    // Lancer l'initialisation quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
