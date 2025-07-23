---
layout: default
title: Mes Projets
permalink: /projects/
description: "Découvrez une sélection de mes projets, incluant des modules PrestaShop sur mesure, des frameworks internes et des solutions innovantes développées chez BusinessTech."
---

<section class="hero-section-projects">
    <div class="container">
        <nav class="breadcrumb">
            <a href="/">Accueil</a>
            <span>{{ page.title }}</span>
        </nav>
        
        <div class="hero-content-projects">
            <h1>{{ page.title }}</h1>
            <p class="hero-description">{{ page.description }}</p>

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
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">{{ project.title }}</h3>
                                                         <div class="project-meta">
                                 {% if project.company %}
                                 <span class="project-company">{{ project.company }}</span>
                                 {% endif %}
                                 <span class="project-role">{{ project.role }}</span>
                                 <span class="project-date">
                                     {% if project.end_date %}
                                     {{ project.date | date: "%b %Y" }} - {{ project.end_date | date: "%b %Y" }}
                                     {% else %}
                                     {{ project.date | date: "%b %Y" }} - présent
                                     {% endif %}
                                 </span>
                             </div>
                        </div>
                        
                        <p class="project-description">{{ project.description }}</p>
                        
                        {% if project.tagline %}
                        <div class="project-tagline">
                            <em>{{ project.tagline }}</em>
                        </div>
                        {% endif %}
                        
                        <div class="project-technologies">
                            {% for tech in project.technologies limit:4 %}
                            <span class="tech-tag-modern">{{ tech }}</span>
                            {% endfor %}
                            {% if project.technologies.size > 4 %}
                            <span class="tech-more">+{{ project.technologies.size | minus: 4 }}</span>
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

<style>
/* Hero Section pour la page projects */
.hero-section-projects {
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(147, 197, 253, 0.1) 100%);
    padding: 4rem 0 3rem;
    position: relative;
    overflow: hidden;
}

.hero-section-projects::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
    pointer-events: none;
}

.hero-content-projects {
    text-align: center;
    position: relative;
    z-index: 10;
}

.hero-content-projects h1 {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-description {
    font-size: 1.25rem;
    color: #4A5568;
    max-width: 700px;
    margin: 0 auto 3rem;
    line-height: 1.6;
}



/* Section principale des projets */
.projects-main-section {
    padding: 4rem 0;
}

.projects-filters-modern {
    text-align: center;
    margin-bottom: 3rem;
}

.filters-header {
    margin-bottom: 2rem;
}

.filters-header h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 1rem;
}

.filters-header p {
    font-size: 1.1rem;
    color: #4A5568;
    margin-bottom: 0;
}

.filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.filter-btn-modern {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    background: white;
    border: 2px solid #E5E7EB;
    border-radius: 50px;
    color: #4B5563;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
}

.filter-btn-modern:hover {
    border-color: #2563EB;
    color: #2563EB;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.15);
}

.filter-btn-modern.active {
    background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%);
    border-color: #2563EB;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
}

.filter-icon {
    font-size: 1.1rem;
}

/* Grille des projets */
.projects-grid-modern {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.project-card-modern {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: all 0.4s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}

.project-card-modern::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563EB 0%, #7C3AED 50%, #3B82F6 100%);
    transform: scaleX(0);
    transition: all 0.4s ease;
}

.project-card-modern:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.project-card-modern:hover::before {
    transform: scaleX(1);
}



.project-content {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.project-header {
    margin-bottom: 1rem;
}

.project-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1F2937;
    margin-bottom: 0.75rem;
    line-height: 1.3;
    font-family: 'Poppins', sans-serif;
}

 .project-meta {
     display: flex;
     gap: 1rem;
     flex-wrap: wrap;
     align-items: center;
 }
 
 .project-company {
     padding: 0.25rem 0.75rem;
     background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.15) 100%);
     color: #059669;
     border-radius: 20px;
     font-size: 0.8rem;
     font-weight: 600;
     border: 1px solid rgba(16, 185, 129, 0.2);
 }
 
 .project-role {
     padding: 0.25rem 0.75rem;
     background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.15) 100%);
     color: #2563EB;
     border-radius: 20px;
     font-size: 0.8rem;
     font-weight: 600;
     border: 1px solid rgba(59, 130, 246, 0.2);
 }

.project-date {
    color: #6B7280;
    font-size: 0.9rem;
    font-weight: 500;
}

.project-description {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 1rem;
    flex-grow: 1;
    font-size: 0.95rem;
}

.project-tagline {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(59, 130, 246, 0.05);
    border-left: 4px solid #3B82F6;
    border-radius: 0.5rem;
    font-style: italic;
    color: #1E40AF;
}

.project-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.tech-tag-modern {
    padding: 0.4rem 0.8rem;
    background: #F3F4F6;
    color: #374151;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid #E5E7EB;
    transition: all 0.2s ease;
}

.tech-tag-modern:hover {
    background: #E5E7EB;
    transform: translateY(-1px);
}

.tech-more {
    padding: 0.4rem 0.8rem;
    background: #2563EB;
    color: white;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
}

.project-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: auto;
}

.btn-modern {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}

.btn-primary {
    background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%);
    color: white;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
    color: white;
    text-decoration: none;
}

.btn-secondary {
    background: white;
    color: #2563EB;
    border: 2px solid #E5E7EB;
}

.btn-secondary:hover {
    border-color: #2563EB;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.15);
    color: #2563EB;
    text-decoration: none;
}

/* État vide */
.no-projects-modern {
    text-align: center;
    padding: 4rem 2rem;
}

.empty-state {
    max-width: 400px;
    margin: 0 auto;
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
}

.empty-state h3 {
    font-size: 1.5rem;
    color: #374151;
    margin-bottom: 1rem;
}

.empty-state p {
    color: #6B7280;
    font-size: 1.1rem;
}

/* Responsive */
 @media (max-width: 768px) {
     .hero-content-projects h1 {
         font-size: 2.2rem;
     }
     
     .hero-description {
         font-size: 1.1rem;
     }
     
     .projects-grid-modern {
         grid-template-columns: 1fr;
         gap: 1.5rem;
     }
     
     .filter-buttons {
         gap: 0.75rem;
     }
     
     .filter-btn-modern {
         padding: 0.75rem 1.25rem;
         font-size: 0.9rem;
     }
 }
 
 @media (max-width: 480px) {
     .project-meta {
         flex-direction: column;
         gap: 0.5rem;
         align-items: flex-start;
     }
     
     .project-actions {
         flex-direction: column;
     }
     
     .btn-modern {
         justify-content: center;
     }
 }
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn-modern');
    const projectCards = document.querySelectorAll('.project-card-modern');
    
    // Animation des projets au chargement
    function animateCards() {
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    animateCards();
    
    // Gestion des filtres
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Mise à jour du bouton actif
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Animation de sortie
            projectCards.forEach(card => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });
            
            // Filtrage et animation d'entrée
            setTimeout(() => {
                let visibleCount = 0;
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-categories');
                    
                    if (filter === 'all' || (categories && categories.includes(filter))) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50 * visibleCount);
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });
            }, 300);
        });
    });
    
    // Smooth scroll pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
</script>