---
layout: default
title: Mes Projets
permalink: /projects/
description: "Découvrez une sélection de mes projets, incluant des modules PrestaShop sur mesure, des frameworks internes et des solutions innovantes développées chez BusinessTech."
---

<section class="section">
    <div class="container">
        <div class="section-header">
            <h1>{{ page.title }}</h1>
            <p class="section-subtitle">{{ page.description }}</p>
        </div>

        <div class="grid-system grid-3-cols">
            {% for project in site.projects %}
                <div class="card module-card">
                    <div class="card-header">
                        <h3 class="card-title">{{ project.title }}</h3>
                        <div class="module-tags">
                            {% for tag in project.tags %}
                                {% include tech-badge.html tech=tag.tech category=tag.category %}
                            {% endfor %}
                        </div>
                    </div>
                    <div class="card-content">
                        <p class="card-description">{{ project.description }}</p>
                    </div>
                    <div class="card-footer">
                        <a href="{{ project.url | relative_url }}" class="btn btn--secondary">Voir les détails</a>
                    </div>
                </div>
            {% endfor %}
        </div>
    </div>
</section>