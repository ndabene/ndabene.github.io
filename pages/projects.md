---
layout: default
title: Mes Projets
permalink: /projects/
description: "Découvrez une sélection de mes projets, incluant des modules PrestaShop sur mesure, des frameworks internes et des solutions innovantes développées chez BusinessTech."
body_class: "page-projects"
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

<section class="projects-main-section">
    <div class="container">
        <div class="projects-filters-modern">
            <div class="filters-header">
                <h2>Explorer mes projets</h2>
                <p>Filtrez par catégorie pour découvrir les projets qui vous intéressent</p>
            </div>
            
            <div class="filter-buttons">
                <button class="filter-btn-modern active" data-filter="all">
                    <span class="filter-icon">🔍</span>
                    Tous les projets
                </button>
                <button class="filter-btn-modern" data-filter="prestashop">
                    <span class="filter-icon">🛒</span>
                    PrestaShop
                </button>
                <button class="filter-btn-modern" data-filter="ai">
                    <span class="filter-icon">🤖</span>
                    Intelligence Artificielle
                </button>
                <button class="filter-btn-modern" data-filter="opensource">
                    <span class="filter-icon">📂</span>
                    Open Source
                </button>
                <button class="filter-btn-modern" data-filter="payment">
                    <span class="filter-icon">💳</span>
                    Paiement
                </button>
                <button class="filter-btn-modern" data-filter="marketing">
                    <span class="filter-icon">📊</span>
                    Marketing
                </button>
            </div>
        </div>

        <div class="projects-grid-modern">
            {% assign projects = site.data.projects | sort: 'date' | reverse %}
            {% for project in projects %}
                <article class="project-card-modern" data-categories="{{ project.categories | join: ' ' }}">
                    <div class="project-header-visual">
                        <div class="project-category-badge">
                            {% if project.categories %}
                                {% for category in project.categories limit:1 %}
                                    {% case category %}
                                        {% when 'prestashop' %}🛒 PrestaShop
                                        {% when 'ai' %}🤖 IA
                                        {% when 'opensource' %}📂 Open Source
                                        {% when 'payment' %}💳 Paiement
                                        {% when 'marketing' %}📊 Marketing
                                        {% when 'dev-tools' %}🔧 Outils Développement
                                        {% else %}{{ category | capitalize }}
                                    {% endcase %}
                                {% endfor %}
                            {% endif %}
                        </div>
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">{{ project.title }}</h3>
                            <div class="project-meta">
                                {% if project.company %}
                                <span class="project-company">{{ project.company }}</span>
                                {% endif %}
                                <span class="project-role">{{ project.role }}</span>
                            </div>
                        </div>
                        
                        <p class="project-description">{{ project.description }}</p>
                        
                        {% if project.tagline %}
                        <div class="project-tagline">
                            <em>{{ project.tagline }}</em>
                        </div>
                        {% endif %}
                        
                        <div class="project-technologies">
                            {% for tag in project.tags limit:4 %}
                            <span class="tech-tag-modern tech-tag--{{ tag.category }}">{{ tag.tech }}</span>
                            {% endfor %}
                            {% if project.tags.size > 4 %}
                            <span class="tech-more">+{{ project.tags.size | minus: 4 }}</span>
                            {% endif %}
                        </div>
                        
                        <div class="project-actions">
                            {% if project.project_url %}
                            <a href="{{ project.project_url }}" class="btn-modern btn-primary" target="_blank" rel="noopener">
                                Voir le projet
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                    <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                </svg>
                            </a>
                            {% endif %}
                            <a href="{{ project.project_url }}" class="btn-modern btn-secondary" target="_blank">
                                Détails
                            </a>
                        </div>
                    </div>
                </article>
            {% endfor %}
        </div>

        {% if site.data.projects.size == 0 %}
        <div class="no-projects-modern">
            <div class="empty-state">
                <div class="empty-icon">📁</div>
                <h3>Aucun projet trouvé</h3>
                <p>Les projets seront bientôt disponibles. Revenez nous voir prochainement !</p>
            </div>
        </div>
        {% endif %}
    </div>
</section>
