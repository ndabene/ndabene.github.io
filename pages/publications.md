---
layout: default
title: Mes Publications
permalink: /publications/
description: "Retrouvez une sélection de mes articles techniques, tutoriels et analyses approfondies sur le développement web, l'e-commerce et l'intelligence artificielle, publiés sur le blog de Business Tech."
---

<section class="page-hero-section">
    <div class="container">
        <nav class="breadcrumb">
            <a href="/">Accueil</a>
            <span>{{ page.title }}</span>
        </nav>
        <div class="hero-content">
            <h1>{{ page.title }}</h1>
            <p class="section-description">{{ page.description }}</p>
        </div>
    </div>
</section>

<section class="section publications-page-section">
    <div class="container">
        {% assign grouped_publications = site.data.publications | group_by: "category" %}
        {% for group in grouped_publications %}
        <div class="publications-category-section">
            <div class="category-header">
                <h2 class="category-title">{{ group.name }}</h2>
                <span class="category-count">{{ group.items.size }} articles</span>
            </div>
            
            <div class="grid-unified publications-grid">
                {% for publication in group.items %}
                <div class="module-card-simple publication-full-card">
                    <div class="module-image-simple publication-image-placeholder">
                        <div class="publication-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                        </div>
                    </div>
                    
                    <div class="module-content-simple">
                        <h3 class="module-title-simple">{{ publication.title }}</h3>
                        
                        {% if publication.description %}
                        <p class="module-description-simple">{{ publication.description }}</p>
                        {% endif %}
                        
                        <div class="module-tags-simple">
                            <span class="tag-simple tag-simple--category">{{ group.name }}</span>
                            <span class="tag-simple tag-simple--prestashop">PrestaShop</span>
                            <span class="tag-simple tag-simple--external">Externe</span>
                        </div>
                    </div>
                    
                    <div class="module-footer-simple">
                        <a href="{{ publication.link }}" class="view-btn" target="_blank">
                            <span class="btn-text">Lire l'article</span>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                {% endfor %}
            </div>
        </div>
        {% endfor %}
        
        <div class="view-all-section publications-external-link">
            <a href="https://www.businesstech.fr/landing/articles/index.html" class="view-all-btn" target="_blank">
                <span class="btn-text">Voir tous mes articles sur Business Tech</span>
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                </svg>
            </a>
        </div>
    </div>
</section>