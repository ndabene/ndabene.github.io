// scroll-animations.js
// Animations au scroll pour les éléments fade-in et fade-in-up
// ============================================================================

(function() {
  'use strict';

  // Configuration
  const config = {
    threshold: 0.1, // Pourcentage de l'élément visible avant déclenchement
    rootMargin: '0px 0px -50px 0px' // Marge avant déclenchement
  };

  // Fonction pour ajouter la classe "is-visible" aux éléments
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optionnel : arrêter d'observer après animation (performance)
        // observer.unobserve(entry.target);
      }
    });
  }

  // Initialiser l'observer
  function initScrollAnimations() {
    // Vérifier si IntersectionObserver est supporté
    if (!('IntersectionObserver' in window)) {
      // Fallback : afficher tous les éléments sans animation
      document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    // Créer l'observer
    const observer = new IntersectionObserver(handleIntersection, config);

    // Observer tous les éléments avec les classes d'animation
    document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
      observer.observe(el);
    });
  }

  // Ajouter automatiquement la classe fade-in-up aux cartes et autres éléments
  function autoAddAnimationClasses() {
    // Cartes de blog
    document.querySelectorAll('.blog-featured-card, .article-card, .post-card').forEach((card, index) => {
      card.classList.add('fade-in-up');
      card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Cartes de modules
    document.querySelectorAll('.module-card, .formation-card, .youtube-video-card').forEach((card, index) => {
      card.classList.add('fade-in-up');
      card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Headers de section
    document.querySelectorAll('.section-header-creator, .section-header, .section-title, .section-title-creator').forEach(header => {
      header.classList.add('fade-in-up');
    });

    // Sections complètes
    document.querySelectorAll('.section-creator, section[class*="section"]').forEach((section, index) => {
      // Ne pas ajouter l'animation si l'élément a déjà une classe d'animation
      if (!section.classList.contains('fade-in-up') && !section.classList.contains('fade-in')) {
        const children = section.querySelectorAll('.fade-in-up, .fade-in');
        // Seulement si la section n'a pas d'enfants avec animation
        if (children.length === 0) {
          section.classList.add('fade-in');
        }
      }
    });

    // Éléments de grille
    document.querySelectorAll('.blog-featured-grid > *, .modules-grid > *, .formations-grid > *, .youtube-featured-grid > *').forEach((item, index) => {
      if (!item.classList.contains('fade-in-up')) {
        item.classList.add('fade-in-up');
        item.style.transitionDelay = `${index * 0.1}s`;
      }
    });

    // Contenus principaux
    const heroElements = document.querySelectorAll('.hero-creator-visual, .hero-creator-content');
    heroElements.forEach((hero, index) => {
      hero.classList.remove('fade-in');
      hero.classList.add('fade-in-up');
      hero.style.transitionDelay = `${index * 0.12}s`;
    });

    document.querySelectorAll('.hero-content').forEach(hero => {
      if (!hero.classList.contains('fade-in-up')) {
        hero.classList.add('fade-in');
      }
    });
  }

  // Initialiser au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      autoAddAnimationClasses();
      initScrollAnimations();
    });
  } else {
    // DOM déjà chargé
    autoAddAnimationClasses();
    initScrollAnimations();
  }
})();
