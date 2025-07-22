/**
 * MODERN ANIMATIONS & INTERACTIONS
 * Système d'animations modernes pour le portfolio
 */

class ModernAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }

  init() {
    this.setupScrollReveal();
    this.setupStaggeredAnimations();
    this.setupParallaxElements();
    this.setupHoverEffects();
    this.setupLoadingAnimations();
    this.setupTextReveal();
  }

  /**
   * Animation de révélation au scroll
   */
  setupScrollReveal() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Déconnecter après animation pour optimiser les performances
          scrollObserver.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    scrollElements.forEach(el => scrollObserver.observe(el));
  }

  /**
   * Animations échelonnées pour les listes d'éléments
   */
  setupStaggeredAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-animation');
    
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.animate-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.animationDelay = `${index * 0.1}s`;
              item.classList.add('animate-fade-in-up');
            }, index * 50);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    staggerContainers.forEach(container => staggerObserver.observe(container));
  }

  /**
   * Effets de parallaxe pour les éléments
   */
  setupParallaxElements() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((element, index) => {
        const rate = scrolled * -0.5;
        const yPos = rate / (index + 1);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  /**
   * Effets de hover améliorés
   */
  setupHoverEffects() {
    // Effet de magnétisme pour les boutons
    const magnetButtons = document.querySelectorAll('.btn--primary');
    
    magnetButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });

    // Effet ripple pour les éléments interactifs
    const rippleElements = document.querySelectorAll('.ripple-effect');
    
    rippleElements.forEach(element => {
      element.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  /**
   * Animations de chargement
   */
  setupLoadingAnimations() {
    // Simuler le chargement avec effet shimmer
    const shimmerElements = document.querySelectorAll('.shimmer');
    
    shimmerElements.forEach(element => {
      setTimeout(() => {
        element.classList.remove('shimmer');
        element.classList.add('animate-fade-in-up');
      }, Math.random() * 1000 + 500);
    });

    // Animation des barres de compétences
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          skillObserver.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    skillBars.forEach(bar => skillObserver.observe(bar));
  }

  /**
   * Animation de révélation de texte
   */
  setupTextReveal() {
    const textRevealElements = document.querySelectorAll('.text-reveal');
    
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, 200);
          textObserver.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    textRevealElements.forEach(element => textObserver.observe(element));
  }

  /**
   * Utilitaire pour ajouter des classes d'animation avec délai
   */
  static addAnimationWithDelay(element, animationClass, delay = 0) {
    setTimeout(() => {
      element.classList.add(animationClass);
    }, delay);
  }

  /**
   * Utilitaire pour créer des animations de compteur
   */
  static animateCounter(element, start = 0, end = 100, duration = 2000) {
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(start + (end - start) * easeOutQuart);
      
      element.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = end;
      }
    };
    
    requestAnimationFrame(updateCounter);
  }

  /**
   * Détection de support des animations pour l'accessibilité
   */
  static supportsAnimations() {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}

// Utilitaires pour les développeurs
window.ModernAnimations = ModernAnimations;

// Auto-initialisation
document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si les animations sont supportées
  if (ModernAnimations.supportsAnimations()) {
    new ModernAnimations();
  }
  
  // Animation des compteurs dans les métriques
  const counters = document.querySelectorAll('.metric-value');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetValue = parseInt(entry.target.textContent);
        ModernAnimations.animateCounter(entry.target, 0, targetValue, 1500);
        counterObserver.unobserve(entry.target);
      }
    });
  });
  
  counters.forEach(counter => counterObserver.observe(counter));
});

// Export pour usage en module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModernAnimations;
} 