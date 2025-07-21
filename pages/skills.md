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

    <div class="skills-grid">
        {% assign categories = site.data.skills | group_by: "category" %}
        {% for category in categories %}
        <div class="skills-category">
            <h2>{{ category.name | replace: "-", " " | capitalize }}</h2>
            <ul>
                {% for skill in category.items %}
                <li>
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-level">({{ skill.level }}%)</span>
                    <span class="skill-experience">({{ skill.years_experience }} ans)</span>
                </li>
                {% endfor %}
            </ul>
        </div>
        {% endfor %}
    </div>
</div>
