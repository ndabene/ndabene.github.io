---
layout: default
title: Mes Compétences Techniques
permalink: /skills/
description: "Découvrez l'ensemble de mes compétences techniques, classées par catégorie et niveau de maîtrise, incluant PHP, Symfony, PrestaShop, IA, Frontend, DevOps et Leadership."
keywords: "compétences techniques, php, symfony, prestashop, ia, frontend, devops, leadership, nicolas dabène"
show_sidebar: false
body_class: "page-skills"
---

<section class="page-hero-section">
    <div class="container">
        <nav class="breadcrumb">
            <a href="/">Home</a>
            <span>{{ page.title }}</span>
        </nav>
        <div class="hero-content">
            <h1>{{ page.title }}</h1>
            <p class="section-description">Voici un aperçu détaillé de mes compétences techniques et humaines, acquises et affinées au fil de mes années d'expérience. Chaque compétence reflète ma passion pour l'excellence et l'innovation continue.</p>
        </div>
    </div>
</section>

<div class="skills-page-modern">

    <div class="container">
        <div class="skills-filter">
            <button class="skill-filter-btn active" data-filter="all">Toutes les compétences</button>
            {% assign categories = site.data.skills | map: "category" | uniq %}
            {% for cat in categories %}
                {% assign category_name = cat | replace: "-", " " | replace: "php backend", "PHP & Backend" | replace: "soft skills", "Soft Skills" | replace: "frontend", "Frontend & Design" | replace: "learning", "Apprentissage" %}
                <button class="skill-filter-btn" data-filter="{{ cat }}">{{ category_name }}</button>
            {% endfor %}
        </div>

        {% assign categories = site.data.skills | group_by: "category" %}
        {% for category in categories %}
        <div class="skills-category-modern visible" data-category="{{ category.name }}">
            <div class="category-header-modern">
                {% assign category_display = category.name | replace: "-", " " | replace: "php backend", "PHP & Backend" | replace: "soft skills", "Soft Skills" | replace: "frontend", "Frontend & Design" | replace: "learning", "Apprentissage" | replace: "integrations", "Intégrations & APIs" %}
                <h2>{{ category_display | capitalize }}</h2>
                <div class="category-description">
                    {% if category.name == "php-backend" %}
                        Développement backend robuste et architecture moderne avec PHP, Symfony et bases de données.
                    {% elsif category.name == "ecommerce" %}
                        Expertise e-commerce avec PrestaShop, gestion de produits digitaux et solutions marchandes.
                    {% elsif category.name == "ai" %}
                        Intelligence artificielle, machine learning et orchestration d'agents automatisés.
                    {% elsif category.name == "frontend" %}
                        Interfaces utilisateur modernes, design UX/UI et technologies web interactives.
                    {% elsif category.name == "devops" %}
                        Déploiement, intégration continue et infrastructure cloud moderne.
                    {% elsif category.name == "integrations" %}
                        Intégrations API, résolution de problèmes complexes et revue de code.
                    {% elsif category.name == "leadership" %}
                        Leadership technique, gestion de projet et management d'équipes.
                    {% elsif category.name == "soft-skills" %}
                        Communication, empathie et compétences interpersonnelles essentielles.
                    {% elsif category.name == "learning" %}
                        Apprentissage continu, adaptabilité et veille technologique permanente.
                    {% endif %}
                </div>
            </div>
            
            <div class="skills-grid-circular">
                {% for skill in category.items %}
                <div class="skill-card-circular" data-category="{{ skill.category }}">
                    <div class="skill-visual-circular">
                        <div class="circular-progress-container">
                            <svg class="circular-progress" width="80" height="80" viewBox="0 0 36 36">
                                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2"/>
                                <path class="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2" stroke-dasharray="{{ skill.level }}, 100" data-level="{{ skill.level }}"/>
                            </svg>
                            <div class="progress-percentage">{{ skill.level }}%</div>
                        </div>
                        <!-- Icônes supprimées -->
                    </div>
                    
                    <div class="skill-info-circular">
                        <h3 class="skill-name-circular">{{ skill.name }}</h3>
                        {% if skill.description %}
                        <div class="skill-description-circular">
                            {{ skill.description }}
                        </div>
                        {% endif %}
                    </div>
                </div>
                {% endfor %}
            </div>
        </div>
        {% endfor %}
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Animation des progress circulaires
    function animateCircularProgress() {
        const circles = document.querySelectorAll('.circle');
        const percentages = document.querySelectorAll('.progress-percentage');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const level = parseInt(circle.getAttribute('data-level'));
                    const container = circle.closest('.skill-card-circular');
                    const percentageEl = container.querySelector('.progress-percentage');
                    
                    // Animation du cercle
                    setTimeout(() => {
                        circle.style.strokeDasharray = `${level}, 100`;
                    }, 200);
                    
                    // Animation du compteur
                    let currentValue = 0;
                    const increment = level / 60; // 60 frames pour 1 seconde
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= level) {
                            currentValue = level;
                            clearInterval(timer);
                        }
                        percentageEl.textContent = Math.round(currentValue) + '%';
                    }, 16); // ~60fps
                    
                    observer.unobserve(circle);
                }
            });
        }, { threshold: 0.3 });

        circles.forEach(circle => observer.observe(circle));
    }

    // Gestion du filtrage
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillCategories = document.querySelectorAll('.skills-category-modern');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Mise à jour du bouton actif
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrage des catégories avec animation
            skillCategories.forEach(category => {
                const categoryName = category.getAttribute('data-category');
                
                if (filter === 'all' || categoryName === filter) {
                    category.style.display = 'block';
                    setTimeout(() => {
                        category.classList.add('visible');
                    }, 10);
                } else {
                    category.classList.remove('visible');
                    setTimeout(() => {
                        category.style.display = 'none';
                    }, 300);
                }
            });

            // Re-animer les progress circulaires visibles
            setTimeout(animateCircularProgress, 400);
        });
    });

    // Initialiser les animations
    animateCircularProgress();

    // Animation d'apparition des cartes
    const cards = document.querySelectorAll('.skill-card-circular');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animationDelay = (index * 0.1) + 's';
                    entry.target.classList.add('animate-in');
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => cardObserver.observe(card));
});
</script>

<style>
.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.skills-category-modern {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease-out;
}

.skills-category-modern.visible {
    opacity: 1;
    transform: translateY(0);
}
</style>