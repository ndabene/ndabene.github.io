---
layout: page
title: Compétences techniques
permalink: /skills/
---

<section class="skills-professional-section">
  <div class="container">
    <h1>Compétences techniques</h1>
    <p class="section-intro">Plus de 15 ans d'expérience en développement web, e-commerce et intégration IA.</p>

    {% for category_hash in site.data.skills_by_category %}
      {% assign category_key = category_hash[0] %}
      {% assign category = category_hash[1] %}
      <div class="skill-category-section">
        <h2 class="category-title-section">{{ category.icon }} {{ category.title }}</h2>
        <p class="category-description">{{ category.description }}</p>
        
        <div class="skills-grid-section">
          {% for skill in category.skills %}
            <div class="skill-card-section">
              <div class="skill-level-section" data-level="{{ skill.level }}">
                <div class="level-circle" data-level="{{ skill.level }}"></div>
                <span class="level-text-section">{{ skill.level }}/100</span>
              </div>
              
              <div class="skill-content-section">
                <h3 class="skill-name-section">{{ skill.name }}</h3>
                <p class="skill-description-section">{{ skill.description }}</p>
                
                {% if skill.achievements %}
                  <div class="skill-achievements-section">
                    <div class="achievement-item-section">
                      <svg class="achievement-icon-section" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                        <circle cx="12" cy="8" r="7"/>
                        <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
                      </svg>
                      <span class="achievement-text-section">{{ skill.achievements }}</span>
                    </div>
                  </div>
                {% endif %}
                
                {% if skill.impact %}
                  <div class="skill-impact-section">
                    <div class="impact-item-section">
                      <svg class="impact-icon-section" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
                      </svg>
                      <span class="impact-text-section">{{ skill.impact }}</span>
                    </div>
                  </div>
                {% endif %}
              </div>
            </div>
          {% endfor %}
        </div>
      </div>
    {% endfor %}
  </div>
</section>

<section class="share-resources-section">
  <div class="container">
    <h2>Partage &amp; ressources</h2>
    <div class="resources-columns">
      <div class="resources-column">
        <h3>Articles de blog</h3>
        <ul>
          <li><a href="{{ '/articles/2025/08/06/prestashop-growth-hacking-mindset/' | relative_url }}">Quand l'édition de modules PrestaShop rencontre le growth hacking</a></li>
          <li><a href="{{ '/articles/2025/08/03/mcp-protocol-guide/' | relative_url }}">Model Context Protocol : Le Pont Révolutionnaire entre l'IA et vos Systèmes</a></li>
          <li><a href="{{ '/articles/2025/07/28/github-pages-jekyll-portfolio/' | relative_url }}">Créez Votre Portfolio Tech en Ligne avec GitHub Pages et Jekyll</a></li>
        </ul>
      </div>
      <div class="resources-column">
        <h3>Formations</h3>
        <ul>
          <li><a href="{{ '/formations/#formation-ia-pour-developpeurs-programme-phare' | relative_url }}">Formation "IA pour Développeurs"</a></li>
          <li><a href="{{ '/formations/#formation-entreprise-transformation-ia' | relative_url }}">Formation Entreprise "Transformation IA"</a></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<p>Vous souhaitez aller plus loin ? Découvrez mes <a href="{{ '/formations/' | relative_url }}">formations</a>, parcourez mes <a href="{{ '/blog/' | relative_url }}">articles</a> ou <a href="{{ '/contact/' | relative_url }}">contactez-moi pour échanger</a>.</p>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Animation des niveaux de compétences
    function animateSkillLevels() {
        const levelCircles = document.querySelectorAll('.level-circle[data-level]');
        
        levelCircles.forEach((circle, index) => {
            const level = parseInt(circle.dataset.level, 10);
            
            // Retarder légèrement chaque animation
            setTimeout(() => {
                // Appliquer une classe pour l'animation
                circle.style.background = `conic-gradient(
                    var(--skill-fill-color) ${level * 10}%, 
                    var(--skill-bg-color) 0
                )`;
                
                // Ajouter la classe animée
                circle.classList.add('animated');
            }, index * 120);
        });
    }
    
    // Observer l'intersection pour déclencher l'animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillLevels();
                observer.disconnect(); // Ne déclencher qu'une fois
            }
        });
    }, { threshold: 0.1 });
    
    // Observer la section des compétences
    const skillsSection = document.querySelector('.skills-professional-section');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});
</script>