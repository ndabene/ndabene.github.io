---
layout: default
title: Mes Projets
permalink: /projects/
description: "Découvrez une sélection de mes projets, incluant des modules PrestaShop
  sur mesure, des frameworks internes et des solutions innovantes développées chez
  BusinessTech."
body_class: "page-projects"
llm_summary: Découvrez une sélection de mes projets, incluant des modules 
  PrestaShop sur mesure, des frameworks internes et des solutions innovantes 
  développées chez BusinessTech.
llm_topics: [projets, prestashop, innovation]
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
                    <span class="filter-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="10.5" cy="10.5" r="7.5"/>
                            <path d="m21 21-5.2-5.2"/>
                        </svg>
                    </span>
                    Tous les projets
                </button>
                <button class="filter-btn-modern" data-filter="prestashop">
                    <span class="filter-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                    </span>
                    PrestaShop
                </button>
                <button class="filter-btn-modern" data-filter="ai">
                    <span class="filter-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M12 1v6m0 6v6"/>
                            <path d="m12 1 3 3-3 3-3-3 3-3Z"/>
                        </svg>
                    </span>
                    Intelligence Artificielle
                </button>
                <button class="filter-btn-modern" data-filter="opensource">
                    <span class="filter-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                        </svg>
                    </span>
                    Open Source
                </button>
                <button class="filter-btn-modern" data-filter="payment">
                    <span class="filter-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                            <line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                    </span>
                    Paiement
                </button>
                <button class="filter-btn-modern" data-filter="marketing">
                    <span class="filter-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="20" x2="18" y2="10"/>
                            <line x1="12" y1="20" x2="12" y2="4"/>
                            <line x1="6" y1="20" x2="6" y2="14"/>
                        </svg>
                    </span>
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
                                        {% when 'prestashop' %}PrestaShop
                                        {% when 'ai' %}Intelligence Artificielle
                                        {% when 'opensource' %}Open Source
                                        {% when 'payment' %}Paiement
                                        {% when 'marketing' %}Marketing
                                        {% when 'dev-tools' %}Outils Développement
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
                    </div>
                </article>
            {% endfor %}
        </div>

        {% if site.data.projects.size == 0 %}
        <div class="no-projects-modern">
            <div class="empty-state">
                <div class="empty-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                </div>
                <h3>Aucun projet trouvé</h3>
                <p>Les projets seront bientôt disponibles. Revenez nous voir prochainement !</p>
            </div>
        </div>
        {% endif %}
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des filtres de projets
    const filterBtns = document.querySelectorAll('.filter-btn-modern');
    const projectCards = document.querySelectorAll('.project-card-modern');
    const projectsGrid = document.querySelector('.projects-grid-modern');

    // Ajouter la classe visible à tous les projets initialement
    projectCards.forEach(card => {
        card.classList.add('visible');
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Mise à jour du bouton actif
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrage des projets
            if (filter === 'all') {
                // Afficher tous les projets
                projectCards.forEach(card => {
                    card.style.display = '';
                    card.classList.add('visible');
                });
            } else {
                // Filtrer par catégorie
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-categories');
                    if (categories && categories.includes(filter)) {
                        card.style.display = '';
                        card.classList.add('visible');
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            if (!card.classList.contains('visible')) {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            }
            
            // Force le réarrangement du layout
            setTimeout(() => {
                // Trick pour forcer un reflow
                projectsGrid.style.display = 'none';
                void projectsGrid.offsetHeight; // Force un reflow
                projectsGrid.style.display = '';
            }, 350);
        });
    });
});
</script>

<style>
/* Styles pour l'animation des projets */
.project-card-modern {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease-out;
}

.project-card-modern.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Animation pour les boutons de filtre */
.filter-btn-modern {
    transition: all 0.3s ease;
}

.filter-btn-modern.active {
    background: #0f172a;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);
}

/* Correction pour la grille des projets */
.projects-grid-modern {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

@media (max-width: 768px) {
    .projects-grid-modern {
        grid-template-columns: 1fr;
    }
}
</style>
