---
layout: page
title: Mes Compétences Techniques
permalink: /skills/
description: "Découvrez l'ensemble de mes compétences techniques, classées par catégorie et niveau de maîtrise, incluant PHP, Symfony, PrestaShop, IA, Frontend, DevOps et Leadership."
keywords: "compétences techniques, php, symfony, prestashop, ia, frontend, devops, leadership, nicolas dabène"
show_sidebar: false
---

<div class="skills-page-modern">
    <div class="page-header">
        <h1>{{ page.title }}</h1>
        <p class="section-description">Voici un aperçu détaillé de mes compétences techniques et humaines, acquises et affinées au fil de mes années d'expérience. Chaque compétence reflète ma passion pour l'excellence et l'innovation continue.</p>
    </div>

    <!-- Section Expertise en ligne -->
    <div class="expertise-section-clean">
        <div class="container">
            <div class="section-header-clean">
                <h2 class="section-title-clean">Mes Domaines d'Expertise</h2>
                <p class="section-subtitle-clean">Découvrez mes spécialisations techniques et sectorielles développées au fil de 15+ années d'expérience</p>
            </div>
            
            <div class="grid-unified expertise-cards-linear" id="expertise-cards-container" style="display: flex !important; flex-direction: column !important; gap: 2rem !important;">
                {% for expertise in site.data.expertise %}
                <div class="expertise-card-beautiful animate-item" data-id="{{ expertise.id }}">
                    <div class="expertise-card-inner">
                        <div class="expertise-visual">
                            <div class="expertise-icon-beautiful">{{ expertise.icon }}</div>
                            {% if expertise.id == 'prestashop' or expertise.id == 'ai' %}
                            <div class="expertise-badge-beautiful">Expert</div>
                            {% endif %}
                        </div>
                        <div class="expertise-content-beautiful">
                            <h3 class="expertise-title-beautiful">{{ expertise.name }}</h3>
                            <p class="expertise-description-beautiful">{{ expertise.description }}</p>
                            <div class="expertise-skills-beautiful">
                                {% for skill in expertise.skills limit:4 %}
                                <span class="skill-beautiful">{{ skill }}</span>
                                {% endfor %}
                            </div>
                        </div>
                    </div>
                </div>
                {% endfor %}
            </div>
        </div>
    </div>

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
            
            <div class="skills-grid">
                {% for skill in category.items %}
                <div class="skill-card-modern" data-category="{{ skill.category }}">
                    <div class="skill-header-modern">
                        <div class="skill-icon-modern" data-category="{{ skill.category }}"></div>
                        <div class="skill-info-modern">
                            <h3 class="skill-name-modern">{{ skill.name }}</h3>
                            <div class="skill-meta">
                                <div class="skill-level-badge">{{ skill.level }}%</div>
                                {% if skill.years_experience %}
                                <span class="skill-years">{{ skill.years_experience }} ans d'expérience</span>
                                {% endif %}
                            </div>
                        </div>
                    </div>
                    
                    <div class="skill-progress-modern">
                        <div class="skill-progress-label">
                            <span class="progress-text">Niveau de maîtrise</span>
                            <span class="progress-percentage">{{ skill.level }}%</span>
                        </div>
                        <div class="skill-progress-track">
                            <div class="skill-progress-fill" data-level="{{ skill.level }}" style="width: 0%;"></div>
                        </div>
                    </div>
                    
                    {% if skill.description %}
                    <div class="skill-description">
                        {{ skill.description }}
                    </div>
                    {% endif %}
                </div>
                {% endfor %}
            </div>
        </div>
        {% endfor %}
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Animation des barres de progression
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.skill-progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const level = bar.getAttribute('data-level');
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 200);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        progressBars.forEach(bar => observer.observe(bar));
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

            // Re-animer les barres de progression visibles
            setTimeout(animateProgressBars, 400);
        });
    });

    // Initialiser les animations
    animateProgressBars();

    // Animation d'apparition des cartes
    const cards = document.querySelectorAll('.skill-card-modern');
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