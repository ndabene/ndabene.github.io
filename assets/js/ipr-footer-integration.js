/**
 * IPR FOOTER INTEGRATION
 * Intègre le conteneur ipr-container de Google Funding Choices dans le footer
 */

(function() {
    'use strict';

    // Fonction pour déplacer l'IPR dans le footer
    function moveIPRToFooter() {
        // Chercher le conteneur IPR créé par Google
        const iprContainer = document.querySelector('.ipr-container');

        if (!iprContainer) {
            return false;
        }

        // Chercher le conteneur de destination dans le footer
        const iprFooterContainer = document.querySelector('.ipr-footer-container');

        if (!iprFooterContainer) {
            console.warn('IPR Footer container not found');
            return false;
        }

        // Déplacer l'IPR dans le footer
        iprFooterContainer.appendChild(iprContainer);

        // Retirer les styles inline qui positionnent l'IPR en fixed
        iprContainer.style.position = 'static';
        iprContainer.style.bottom = 'auto';
        iprContainer.style.left = 'auto';
        iprContainer.style.right = 'auto';
        iprContainer.style.width = 'auto';
        iprContainer.style.zIndex = 'auto';

        return true;
    }

    // Fonction pour retirer le padding-bottom ajouté par Google
    function removeBodyPadding() {
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        const paddingBottom = computedStyle.paddingBottom;

        // Si Google a ajouté un padding-bottom important, on le retire
        if (paddingBottom && parseInt(paddingBottom) > 100) {
            body.style.paddingBottom = '0px';
        }
    }

    // Observer pour détecter quand Google ajoute l'ipr-container
    function observeIPRContainer() {
        const observer = new MutationObserver(function(mutations) {
            for (let mutation of mutations) {
                if (mutation.type === 'childList') {
                    for (let node of mutation.addedNodes) {
                        // Vérifier si c'est l'ipr-container ou s'il contient l'ipr-container
                        if (node.classList && node.classList.contains('ipr-container')) {
                            if (moveIPRToFooter()) {
                                removeBodyPadding();
                                // Arrêter l'observation une fois qu'on a déplacé l'IPR
                                observer.disconnect();
                            }
                        } else if (node.querySelector && node.querySelector('.ipr-container')) {
                            if (moveIPRToFooter()) {
                                removeBodyPadding();
                                observer.disconnect();
                            }
                        }
                    }
                }

                // Surveiller aussi les changements de style sur le body
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    if (mutation.target === document.body) {
                        removeBodyPadding();
                    }
                }
            }
        });

        // Observer le body pour détecter l'ajout de l'ipr-container
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style']
        });

        // Timeout de sécurité pour arrêter l'observation après 10 secondes
        setTimeout(function() {
            observer.disconnect();
        }, 10000);
    }

    // Initialisation
    function init() {
        // Essayer de déplacer l'IPR immédiatement si déjà présent
        if (!moveIPRToFooter()) {
            // Sinon, observer pour le détecter quand il sera ajouté
            observeIPRContainer();
        } else {
            // Si déjà déplacé, retirer le padding
            removeBodyPadding();
        }

        // Vérifier aussi toutes les 500ms pendant 5 secondes au cas où
        let attempts = 0;
        const checkInterval = setInterval(function() {
            attempts++;
            if (moveIPRToFooter()) {
                removeBodyPadding();
                clearInterval(checkInterval);
            }
            if (attempts >= 10) {
                clearInterval(checkInterval);
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
