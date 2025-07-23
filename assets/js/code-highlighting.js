// Code highlighting et fonctionnalités interactives pour les blocs de code
document.addEventListener('DOMContentLoaded', function() {
    
    // Ajouter des boutons de copie à tous les blocs de code
    addCopyButtonsToCodeBlocks();
    
    // Améliorer la présentation des blocs de code
    enhanceCodeBlocks();
    
    // Ajouter la numérotation des lignes si nécessaire
    addLineNumbers();
    
});

/**
 * Ajoute des boutons de copie à tous les blocs de code
 */
function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
        const pre = codeBlock.parentElement;
        
        // Créer le conteneur avec bouton de copie
        const container = document.createElement('div');
        container.className = 'code-block-container';
        
        // Créer le bouton de copie
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copier';
        copyButton.setAttribute('aria-label', 'Copier le code');
        
        // Envelopper le pre dans le container
        pre.parentNode.insertBefore(container, pre);
        container.appendChild(copyButton);
        container.appendChild(pre);
        
        // Ajouter l'événement de copie
        copyButton.addEventListener('click', function() {
            copyCodeToClipboard(codeBlock, copyButton);
        });
    });
}

/**
 * Copie le code dans le presse-papiers
 */
function copyCodeToClipboard(codeElement, button) {
    const text = codeElement.textContent;
    
    if (navigator.clipboard && window.isSecureContext) {
        // API moderne
        navigator.clipboard.writeText(text).then(function() {
            showCopySuccess(button);
        }).catch(function(err) {
            console.error('Erreur lors de la copie:', err);
            fallbackCopyToClipboard(text, button);
        });
    } else {
        // Fallback pour les anciens navigateurs
        fallbackCopyToClipboard(text, button);
    }
}

/**
 * Méthode de fallback pour copier dans le presse-papiers
 */
function fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            showCopyError(button);
        }
    } catch (err) {
        console.error('Erreur lors de la copie:', err);
        showCopyError(button);
    }
    
    document.body.removeChild(textArea);
}

/**
 * Affiche le feedback de succès de copie
 */
function showCopySuccess(button) {
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copié !';
    button.classList.add('copied');
    
    setTimeout(function() {
        button.innerHTML = originalContent;
        button.classList.remove('copied');
    }, 2000);
}

/**
 * Affiche le feedback d'erreur de copie
 */
function showCopyError(button) {
    const originalContent = button.innerHTML;
    button.innerHTML = '<i class="fas fa-times"></i> Erreur';
    button.style.backgroundColor = '#fee2e2';
    button.style.color = '#dc2626';
    
    setTimeout(function() {
        button.innerHTML = originalContent;
        button.style.backgroundColor = '';
        button.style.color = '';
    }, 2000);
}

/**
 * Améliore la présentation des blocs de code
 */
function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
        const pre = codeBlock.parentElement;
        
        // Détecter le langage depuis la classe
        const classList = codeBlock.className.split(' ');
        let language = '';
        
        classList.forEach(function(className) {
            if (className.startsWith('language-')) {
                language = className.replace('language-', '');
            }
        });
        
        // Ajouter une classe au container parent si c'est un exemple dangereux/sécurisé
        const codeText = codeBlock.textContent.toLowerCase();
        const container = pre.closest('.code-block-container');
        
        if (container) {
            // Détecter les exemples dangereux
            if (codeText.includes('dangereux') || 
                codeText.includes('vulnérabilité') || 
                codeText.includes('sql injection') ||
                codeText.includes('# exemple typique') ||
                codeText.includes('// code généré par vibe coding')) {
                
                const dangerousWrapper = document.createElement('div');
                dangerousWrapper.className = 'code-example dangerous';
                
                const header = document.createElement('div');
                header.className = 'code-header';
                header.textContent = 'Code dangereux - Ne pas utiliser en production';
                
                container.parentNode.insertBefore(dangerousWrapper, container);
                dangerousWrapper.appendChild(header);
                dangerousWrapper.appendChild(container);
            }
            
            // Détecter les exemples sécurisés
            else if (codeText.includes('prompt-driven development') ||
                     codeText.includes('sécurisé') ||
                     codeText.includes('authentifie un utilisateur') ||
                     codeText.includes('requête paramétrée') ||
                     codeText.includes('# prompt-driven development')) {
                
                const secureWrapper = document.createElement('div');
                secureWrapper.className = 'code-example secure';
                
                const header = document.createElement('div');
                header.className = 'code-header';
                header.textContent = 'Code sécurisé - Bonnes pratiques';
                
                container.parentNode.insertBefore(secureWrapper, container);
                secureWrapper.appendChild(header);
                secureWrapper.appendChild(container);
            }
        }
    });
}

/**
 * Ajoute la numérotation des lignes pour les longs blocs de code
 */
function addLineNumbers() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
        const lines = codeBlock.textContent.split('\n');
        
        // Ajouter la numérotation seulement pour les blocs de plus de 5 lignes
        if (lines.length > 5) {
            const pre = codeBlock.parentElement;
            pre.classList.add('line-numbers');
            
            // Créer le conteneur pour les numéros de ligne
            const lineNumbersContainer = document.createElement('div');
            lineNumbersContainer.className = 'line-numbers-container';
            
            for (let i = 1; i <= lines.length; i++) {
                const lineNumber = document.createElement('span');
                lineNumber.className = 'line-number';
                lineNumber.textContent = i;
                lineNumbersContainer.appendChild(lineNumber);
            }
            
            pre.insertBefore(lineNumbersContainer, codeBlock);
        }
    });
}

/**
 * Fonction utilitaire pour surligner une ligne spécifique
 */
function highlightLine(codeBlock, lineNumber) {
    const lines = codeBlock.querySelectorAll('.line');
    if (lines[lineNumber - 1]) {
        lines[lineNumber - 1].classList.add('highlight-line');
    }
}

/**
 * Fonction pour créer des liens vers des lignes spécifiques
 */
function createLineLinks() {
    // Gérer les liens vers des lignes spécifiques (#L12, #L25-L30, etc.)
    if (window.location.hash.match(/^#L\d+(-L\d+)?$/)) {
        const hash = window.location.hash.substring(1);
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(function(codeBlock) {
            const lines = codeBlock.querySelectorAll('.line');
            
            if (hash.includes('-')) {
                // Plage de lignes (ex: L10-L15)
                const [start, end] = hash.split('-').map(l => parseInt(l.substring(1)));
                for (let i = start - 1; i < end && i < lines.length; i++) {
                    lines[i].classList.add('highlight-line');
                }
            } else {
                // Ligne unique (ex: L10)
                const lineNum = parseInt(hash.substring(1));
                if (lines[lineNum - 1]) {
                    lines[lineNum - 1].classList.add('highlight-line');
                    lines[lineNum - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
}

// Initialiser les liens vers les lignes au chargement
document.addEventListener('DOMContentLoaded', createLineLinks);

// Réinitialiser lors des changements de hash
window.addEventListener('hashchange', createLineLinks);