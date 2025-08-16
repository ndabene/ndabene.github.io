---
layout: default
title: Mes Publications
permalink: /publications/
description: "Retrouvez une sélection de mes articles techniques, tutoriels et analyses
  approfondies sur le développement web, l'e-commerce et l'intelligence artificielle,
  publiés sur le blog de Business Tech."
llm_summary: Retrouvez une sélection de mes articles techniques, tutoriels et 
  analyses approfondies sur le développement web, l'e-commerce et l'intelligence
  artificielle, publiés sur le blog de Business Tech.
llm_topics: [publications, articles, technologie]
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

<section class="section publications-page-section external-publications-section">
    <div class="container">
        <p class="intro">
            Mon objectif pédagogique est de partager des ressources techniques et stratégiques pour aider votre boutique en ligne à progresser.
            Pour approfondir ces thèmes, rendez-vous sur la page <a href="/formations/">Formations</a>.
        </p>
        {% assign grouped_publications = site.data.publications | group_by: "category" %}
        {% for group in grouped_publications %}
        <div class="publications-category-section">
            <div class="category-header">
                <h2 class="category-title">{{ group.name }}</h2>
                <span class="category-count">{{ group.items.size }} articles</span>
            </div>
            
            <div class="external-publications-grid">
                {% for publication in group.items %}
                <div class="external-publication-card">
                    <div class="publication-card-header">
                        <div class="publication-icon">
                            <i class="fas fa-newspaper"></i>
                        </div>
                        <div class="publication-meta">
                            <span>{{ group.name }}</span>
                        </div>
                    </div>
                    <div class="publication-card-content">
                        <h3 class="publication-title">
                            <a href="{{ publication.link }}" target="_blank">{{ publication.title }}</a>
                        </h3>
                        {% if publication.description %}
                        <p class="publication-description">{{ publication.description | truncate: 120 }}</p>
                        {% endif %}
                    </div>
                    <div class="publication-card-footer">
                        <a href="{{ publication.link }}" class="read-more-btn" target="_blank">Lire l'article</a>
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
