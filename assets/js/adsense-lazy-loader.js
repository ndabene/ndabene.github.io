/**
 * Lazy Loader pour Google AdSense
 * Optimise le chargement des publicités pour améliorer les performances
 *
 * Stratégies implémentées :
 * 1. Lazy loading avec Intersection Observer
 * 2. Chargement différé du script AdSense
 * 3. Respect du consentement RGPD
 * 4. Initialisation progressive des annonces
 */

class AdSenseLazyLoader {
    constructor() {
        this.adsenseLoaded = false;
        this.adsenseScriptLoading = false;
        this.pendingAds = [];
        this.consentGranted = false;
        this.observer = null;

        this.init();
    }

    init() {
        // Attendre que le DOM soit complètement chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Vérifier le consentement avant tout
        this.checkConsent();

        // Si consentement OK, initialiser l'observation des annonces
        if (this.consentGranted) {
            this.observeAds();
        } else {
            // Écouter les changements de consentement
            this.listenForConsentChanges();
        }
    }

    checkConsent() {
        // Vérifier le consentement via le système de cookies
        if (window.cookieConsent) {
            const consentData = window.cookieConsent.getConsentData();
            this.consentGranted = consentData &&
                                  consentData.preferences &&
                                  (consentData.preferences.ad === true ||
                                   consentData.preferences.adUserData === true ||
                                   consentData.preferences.adPersonalization === true);
        } else {
            // Fallback : vérifier le localStorage directement
            try {
                const data = localStorage.getItem('ndabene_cookie_consent');
                if (data) {
                    const consent = JSON.parse(data);
                    this.consentGranted = consent.preferences &&
                                         (consent.preferences.ad === true ||
                                          consent.preferences.adUserData === true ||
                                          consent.preferences.adPersonalization === true);
                }
            } catch (e) {
                this.consentGranted = false;
            }
        }
    }

    listenForConsentChanges() {
        // Observer les changements dans le localStorage pour le consentement
        window.addEventListener('storage', (e) => {
            if (e.key === 'ndabene_cookie_consent') {
                this.checkConsent();
                if (this.consentGranted) {
                    this.observeAds();
                }
            }
        });

        // Alternative : écouter un événement personnalisé
        document.addEventListener('cookieConsentUpdated', () => {
            this.checkConsent();
            if (this.consentGranted) {
                this.observeAds();
            }
        });
    }

    observeAds() {
        // Trouver toutes les containers AdSense
        const adContainers = document.querySelectorAll('.adsense-container');

        if (adContainers.length === 0) {
            return; // Pas d'annonces sur cette page
        }

        // Créer l'Intersection Observer si pas déjà créé
        if (!this.observer) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    // Charger l'annonce quand elle est à 200px du viewport
                    rootMargin: '200px 0px',
                    threshold: 0.01
                }
            );
        }

        // Observer chaque container
        adContainers.forEach(container => {
            // Marquer comme non chargé
            container.dataset.adsenseLoaded = 'false';
            this.observer.observe(container);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;

                // Vérifier si déjà chargé
                if (container.dataset.adsenseLoaded === 'true') {
                    return;
                }

                // Marquer comme en cours de chargement
                container.dataset.adsenseLoaded = 'pending';

                // Charger le script AdSense si nécessaire
                if (!this.adsenseLoaded && !this.adsenseScriptLoading) {
                    this.loadAdSenseScript().then(() => {
                        this.initializeAd(container);
                    });
                } else if (this.adsenseLoaded) {
                    // Script déjà chargé, initialiser directement
                    this.initializeAd(container);
                } else {
                    // Script en cours de chargement, mettre en attente
                    this.pendingAds.push(container);
                }

                // Arrêter d'observer ce container
                this.observer.unobserve(container);
            }
        });
    }

    loadAdSenseScript() {
        return new Promise((resolve, reject) => {
            this.adsenseScriptLoading = true;

            // Vérifier si le script n'existe pas déjà
            const existingScript = document.querySelector('script[src*="pagead2.googlesyndication.com"]');
            if (existingScript) {
                this.adsenseLoaded = true;
                this.adsenseScriptLoading = false;
                resolve();
                return;
            }

            // Créer le script
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1445021827447908';
            script.crossOrigin = 'anonymous';

            script.onload = () => {
                this.adsenseLoaded = true;
                this.adsenseScriptLoading = false;

                // Initialiser toutes les annonces en attente
                this.pendingAds.forEach(container => this.initializeAd(container));
                this.pendingAds = [];

                resolve();
            };

            script.onerror = () => {
                this.adsenseScriptLoading = false;
                console.error('Failed to load AdSense script');
                reject(new Error('AdSense script failed to load'));
            };

            // Insérer le script dans le head
            document.head.appendChild(script);
        });
    }

    initializeAd(container) {
        // Vérifier que le container n'a pas déjà été initialisé
        if (container.dataset.adsenseLoaded === 'true') {
            return;
        }

        // Trouver l'élément ins adsbygoogle dans le container
        const adElement = container.querySelector('.adsbygoogle');

        if (!adElement) {
            console.warn('No .adsbygoogle element found in container');
            return;
        }

        // Vérifier que adsbygoogle est disponible
        if (typeof window.adsbygoogle === 'undefined') {
            console.warn('adsbygoogle not available yet');
            return;
        }

        try {
            // Pousser l'annonce pour initialisation
            (window.adsbygoogle = window.adsbygoogle || []).push({});

            // Marquer comme chargé
            container.dataset.adsenseLoaded = 'true';

            // Ajouter une classe pour animations CSS optionnelles
            container.classList.add('adsense-loaded');

        } catch (error) {
            console.error('Error initializing AdSense ad:', error);
        }
    }

    // Méthode publique pour forcer le chargement (si besoin)
    forceLoadAll() {
        const adContainers = document.querySelectorAll('.adsense-container');

        if (!this.adsenseLoaded && !this.adsenseScriptLoading) {
            this.loadAdSenseScript().then(() => {
                adContainers.forEach(container => this.initializeAd(container));
            });
        } else if (this.adsenseLoaded) {
            adContainers.forEach(container => this.initializeAd(container));
        }
    }
}

// Initialiser automatiquement
window.adSenseLazyLoader = new AdSenseLazyLoader();

// Exposer l'API globalement
window.AdSenseLazyLoader = AdSenseLazyLoader;
