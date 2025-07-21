---
layout: page
title: Mes Compétences Techniques
permalink: /skills/
description: "Découvrez l'ensemble de mes compétences techniques, classées par catégorie et niveau de maîtrise, incluant PHP, Symfony, PrestaShop, IA, Frontend, DevOps et Leadership."
keywords: "compétences techniques, php, symfony, prestashop, ia, frontend, devops, leadership, nicolas dabène"
show_sidebar: false
---

<div class="container">
    <div class="page-header">
        <h1>{{ page.title }}</h1>
        <p class="section-description">Voici un aperçu détaillé de mes compétences techniques, acquises et affinées au fil de mes années d'expérience. Chaque compétence est évaluée sur ma maîtrise et le nombre d'années de pratique.</p>
    </div>

    <div class="skills-filter">
        <button class="skill-filter-btn active" data-filter="all">Toutes</button>
        {% assign categories = site.data.skills | map: "category" | uniq %}
        {% for cat in categories %}
            <button class="skill-filter-btn" data-filter="{{ cat }}">{{ cat | replace: "-", " " | capitalize }}</button>
        {% endfor %}
    </div>

    <div class="skills-chart">
        {% assign categories = site.data.skills | group_by: "category" %}
        {% for category in categories %}
        <div class="skills-category-group visible" data-category="{{ category.name }}">
            <h2>{{ category.name | replace: "-", " " | capitalize }}</h2>
            <div class="skills-grid">
                {% for skill in category.items %}
                <div class="skill-card">
                    <div class="skill-header">
                        <h3 class="skill-name">{{ skill.name }}</h3>
                        <div class="skill-info">
                            <div class="skill-level-badge">{{ skill.level }}%</div>
                            {% if skill.years_experience %}
                            <span class="skill-years">{{ skill.years_experience }} ans</span>
                            {% endif %}
                        </div>
                    </div>
                    <div class="skill-bar skill-bar--{{ skill.category }}">
                        <div class="skill-fill skill-animated skill-visible" data-level="{{ skill.level }}" style="width: {{ skill.level }}%;">
                            <span class="skill-tooltip">{{ skill.level }}% - {{ skill.years_experience }} ans d'expérience</span>
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
    // S'assurer que tout est visible au chargement initial
    document.querySelectorAll('.skills-category-group').forEach(group => {
        group.style.display = 'block';
        group.classList.add('visible');
    });
    
    // S'assurer que les barres sont bien initialisées
    document.querySelectorAll('.skill-fill').forEach(bar => {
        const level = bar.getAttribute('data-level') + '%';
        bar.style.width = level;
        // Ajouter la classe visible pour l'animation
        bar.classList.add('skill-visible');
    });

    // Gestion du filtrage
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillGroups = document.querySelectorAll('.skills-category-group');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Mise à jour du bouton actif
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrage des groupes de compétences avec animation
            skillGroups.forEach(group => {
                if (filter === 'all' || group.getAttribute('data-category') === filter) {
                    group.style.display = 'block';
                    setTimeout(() => {
                        group.classList.add('visible');
                    }, 10);
                } else {
                    group.classList.remove('visible');
                    setTimeout(() => {
                        group.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});
</script>