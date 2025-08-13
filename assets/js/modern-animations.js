/**
 * MODERN ANIMATIONS & INTERACTIONS
 * Système d'animations modernes pour le portfolio
 */

// FALLBACK IMMÉDIAT POUR AFFICHAGE DU CONTENU
document.addEventListener('DOMContentLoaded', () => {
    // Forcer l'affichage du contenu après 1 seconde si les animations ne se déclenchent pas
    setTimeout(() => {
        const hiddenElements = document.querySelectorAll('.scroll-reveal:not(.animate-in), .animate-item:not(.animate-in)');
        hiddenElements.forEach(element => {
            element.classList.add('animate-in');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }, 1000);
});

// Classe principale pour les animations modernes
class ModernAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollReveal();
        this.initRippleEffect();
        this.initHoverAnimations();
        this.initTypingEffect();
        this.initCounterAnimations();
        this.initGradientAnimations();
        this.initParallaxEffects();
        this.initExpertiseInteractions();
    }

    // Animation au scroll avec Intersection Observer
    initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Gestion des animations en cascade
                    if (entry.target.classList.contains('stagger-animation')) {
                        const items = entry.target.querySelectorAll('.animate-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate-in');
                            }, index * 150);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observer tous les éléments avec scroll-reveal
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Effet de frappe (typing effect)
    initTypingEffect() {
        const typingElements = document.querySelectorAll('.typing-effect');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid';
            
            let index = 0;
            const typeWriter = () => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Animation du curseur clignotant
                    setInterval(() => {
                        element.style.borderRight = element.style.borderRight === '2px solid transparent' 
                            ? '2px solid' 
                            : '2px solid transparent';
                    }, 500);
                }
            };
            
            // Démarrer l'animation après un délai
            setTimeout(typeWriter, 1000);
        });
    }

    // Animations des compteurs/métriques
    initCounterAnimations() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ignorer les éléments avec le symbole infini
                    if (entry.target.classList.contains('metric-infinity')) {
                        counterObserver.unobserve(entry.target);
                        return;
                    }
                    
                    const targetValue = parseInt(entry.target.textContent);
                    
                    // Vérifier que la valeur est valide
                    if (!isNaN(targetValue)) {
                        this.animateCounter(entry.target, 0, targetValue, 2000);
                    }
                    
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.metric-value').forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Animation des gradients
    initGradientAnimations() {
        const gradientElements = document.querySelectorAll('.text-gradient-animated');
        
        gradientElements.forEach(element => {
            // Animation continue du gradient
            element.style.backgroundSize = '300% 300%';
            element.style.animation = 'gradientMove 3s ease infinite';
        });
    }

    // Effets parallax subtils
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.floating-tech-icons .tech-icon');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Interactions des cartes d'expertise
    initExpertiseInteractions() {
        const expertiseCards = document.querySelectorAll('.expertise-card-modern');
        
        expertiseCards.forEach(card => {
            const expandBtn = card.querySelector('.btn-modern');
            const skillsPreview = card.querySelector('.expertise-skills-preview');
            
            if (expandBtn && skillsPreview) {
                expandBtn.addEventListener('click', () => {
                    card.classList.toggle('expanded');
                    
                    const arrow = expandBtn.querySelector('.expand-arrow');
                    if (arrow) {
                        arrow.style.transform = card.classList.contains('expanded') 
                            ? 'rotate(180deg)' 
                            : 'rotate(0deg)';
                    }
                    
                    expandBtn.textContent = card.classList.contains('expanded') 
                        ? 'Voir moins' 
                        : 'Voir plus';
                });
            }
        });
    }

    // Effet ripple sur les boutons
    initRippleEffect() {
        document.querySelectorAll('.ripple-effect').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Animations de survol avancées
    initHoverAnimations() {
        // Animation des cartes au survol
        document.querySelectorAll('.hover-lift').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });

        // Animation des badges modernes
        document.querySelectorAll('.badge-modern').forEach(badge => {
            badge.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
            });
            
            badge.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            });
        });

        // Animation des highlight cards
        document.querySelectorAll('.highlight-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.highlight-icon-modern');
                if (icon) {
                    icon.style.transform = 'rotate(10deg) scale(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.highlight-icon-modern');
                if (icon) {
                    icon.style.transform = 'rotate(0deg) scale(1)';
                }
            });
        });
    }

    // Animation de compteur améliorée
    animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end + (end > 20 ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Vérification du support des animations
    static supportsAnimations() {
        return 'animate' in document.documentElement ||
               'IntersectionObserver' in window;
    }

    // Gestion des performances
    initPerformanceOptimizations() {
        // Réduire les animations si l'utilisateur préfère moins de mouvement
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
        }

        // Pause des animations lors du scroll rapide
        let scrollTimer = null;
        window.addEventListener('scroll', () => {
            document.body.classList.add('scrolling');
            
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 150);
        });
    }
}

// Fonctions utilitaires pour les interactions
function expandExpertise(expertiseId) {
    const card = document.querySelector(`[data-id="${expertiseId}"]`);
    if (card) {
        card.classList.toggle('expanded');
        
        const button = card.querySelector('.btn-modern');
        const arrow = card.querySelector('.expand-arrow');
        
        if (button && arrow) {
            const isExpanded = card.classList.contains('expanded');
            button.innerHTML = `
                ${isExpanded ? 'Voir moins' : 'Voir plus'}
                <svg class="expand-arrow" viewBox="0 0 24 24" fill="currentColor" style="transform: ${isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'}">
                    <path d="M7 10l5 5 5-5z"/>
                </svg>
            `;
        }
    }
}

// Système de notifications toast modernes
class ToastNotifications {
    constructor() {
        this.container = this.createContainer();
        document.body.appendChild(this.container);
    }

    createContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.style.cssText = `
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 8px;
            padding: 16px 20px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            border-left: 4px solid var(--color-${type});
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        toast.textContent = message;

        this.container.appendChild(toast);

        // Animation d'entrée
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });

        // Animation de sortie et suppression
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }
}

// Export pour usage global
window.ModernAnimations = ModernAnimations;
window.expandExpertise = expandExpertise;
window.ToastNotifications = ToastNotifications;

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si les animations sont supportées
    if (ModernAnimations.supportsAnimations()) {
        const animations = new ModernAnimations();
        animations.initPerformanceOptimizations();
        // Réduire le saut visuel initial sous la nav fixe
        document.documentElement.style.setProperty('--nav-offset-applied', 'true');
        // Initialiser les notifications toast
        window.toastNotifications = new ToastNotifications();
    }

    // Initialisation des modules spécifiques
    initModuleInteractions();
    initPublicationInteractions();
});

// Interactions spécifiques aux modules
function initModuleInteractions() {
    const moduleCards = document.querySelectorAll('.module-card-modern');
    
    moduleCards.forEach(card => {
        const imageContainer = card.querySelector('.module-image-container');
        const image = card.querySelector('.module-image-modern');
        
        if (imageContainer && image) {
            imageContainer.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.1) rotate(2deg)';
            });
            
            imageContainer.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });
}

// Interactions spécifiques aux publications
function initPublicationInteractions() {
    const publicationCards = document.querySelectorAll('.publication-card-modern');
    
    publicationCards.forEach(card => {
        const readBtn = card.querySelector('.read-article-btn');
        
        if (readBtn) {
            readBtn.addEventListener('click', (e) => {
                // Analytics tracking (si disponible)
                if (window.gtag) {
                    window.gtag('event', 'click', {
                        event_category: 'Publication',
                        event_label: card.querySelector('.publication-title').textContent
                    });
                }
            });
        }
    });
}

// Export pour usage en module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernAnimations;
} 