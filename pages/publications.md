---
layout: default
title: Mes Publications
permalink: /publications/
description: "Retrouvez une sélection de mes articles techniques, tutoriels et analyses approfondies sur le développement web, l'e-commerce et l'intelligence artificielle, publiés sur le blog de Business Tech."
---

<section class="section">
    <div class="container">
        <div class="section-header">
            <h1>{{ page.title }}</h1>
            <p class="section-subtitle">{{ page.description }}</p>
        </div>

        <div class="grid-system publication-grid">
            {% for publication in site.data.publications %}
            <a href="{{ publication.link }}" target="_blank" class="publication-card">
                <div class="publication-image-container">
                    <img src="{{ publication.image }}" alt="{{ publication.title }}" class="publication-image">
                    <div class="publication-overlay">
                        <span class="read-more">Lire l'article <span class="external-icon">↗</span></span>
                    </div>
                </div>
                <div class="publication-content">
                    <h3 class="publication-title">{{ publication.title }}</h3>
                </div>
            </a>
            {% endfor %}
        </div>
        
        <div class="view-all-publications">
            <a href="https://www.businesstech.fr/landing/articles/index.html" class="btn btn--outline btn--large" target="_blank">
                Voir toutes les publications <span class="external-icon">↗</span>
            </a>
        </div>
    </div>
    </div>
</section>