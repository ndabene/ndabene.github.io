---
layout: default
title: Mes Publications
permalink: /publications/
description: "Retrouvez une sélection de mes articles techniques, tutoriels et analyses approfondies sur le développement web, l'e-commerce et l'intelligence artificielle, publiés sur le blog de BusinessTech."
---

<section class="section">
    <div class="container">
        <div class="section-header">
            <h1>{{ page.title }}</h1>
            <p class="section-subtitle">{{ page.description }}</p>
        </div>

        <div class="grid-system grid-2-cols">
            {% for publication in site.data.publications %}
            <a href="{{ publication.link }}" target="_blank" rel="noopener noreferrer" class="card publication-card">
                <div class="card-content">
                    <h3 class="card-title">{{ publication.title }}</h3>
                    <span class="publication-link">
                        Lire sur BusinessTech <span class="external-icon">↗</span>
                    </span>
                </div>
            </a>
            {% endfor %}
        </div>
    </div>
</section>