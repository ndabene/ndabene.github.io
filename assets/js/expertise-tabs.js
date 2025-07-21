document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const selectionHint = document.querySelector('.expertise-selection-hint');
    
    // Ajout des événements de clic sur les onglets
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Récupération de l'ID de l'onglet à afficher
            const tabId = button.getAttribute('data-tab');
            
            // Désactivation de tous les onglets
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Cachons progressivement le contenu actif
            let activeContent = document.querySelector('.tab-content.active');
            if (activeContent) {
                fadeOut(activeContent, 150);
            }
            
            // Activation de l'onglet sélectionné après un court délai
            setTimeout(() => {
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Activation de l'onglet sélectionné
                button.classList.add('active');
                let newContent = document.getElementById('tab-' + tabId);
                newContent.classList.add('active');
                fadeIn(newContent, 200);
                
                // Masquer l'indice de sélection après le premier clic
                if (selectionHint && selectionHint.style.display !== 'none') {
                    fadeOut(selectionHint, 300);
                }
            }, 150);
        });
    });
    
    // Fonction pour faire apparaître progressivement un élément
    function fadeIn(element, duration) {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        let start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            element.style.opacity = Math.min(progress / duration, 1);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }
    
    // Fonction pour faire disparaître progressivement un élément
    function fadeOut(element, duration) {
        let start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            element.style.opacity = 1 - Math.min(progress / duration, 1);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                element.style.display = 'none';
            }
        }
        
        window.requestAnimationFrame(step);
    }
}); 