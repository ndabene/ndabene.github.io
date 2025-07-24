---
layout: default
title: "Nicolas Dabène - Senior PHP Developer & AI Orchestrator | Expert PrestaShop"
description: "15+ ans d'expérience en développement e-commerce. Modules PrestaShop, architecture e-commerce, AI-assisted development."
keywords: "senior php developer, prestashop expert, ai orchestrator, symfony, e-commerce architecture, php fullstack"
---

<!-- HERO SECTION MODERNE -->
<section class="hero-section-modern">
    <div class="hero-background-pattern"></div>
    <div class="container">
        <div class="hero-layout">
            <!-- Profile Visual avec effets modernes -->
            <div class="hero-visual scroll-reveal">
                <div class="profile-container-modern glass-card">
                    <img src="/assets/images/hero/profile-hero.jpg" alt="Nicolas Dabène - Senior PHP FullStack Developer & AI Orchestrator, expert PrestaShop avec 15+ ans d'expérience en développement e-commerce et intégration d'intelligence artificielle" class="profile-image-modern">
                    </div>
            </div>
            
            <!-- Hero Content avec animations -->
            <div class="hero-content">
                <div class="hero-header scroll-reveal">
                    <h1 class="hero-title text-gradient-animated">Nicolas Dabène</h1>
                    <p class="hero-subtitle typing-effect">Senior PHP FullStack Developer & AI Orchestrator</p>
                    
                    <div class="hero-badges-modern stagger-animation">
                        <div class="animate-item glass-card badge-modern">
                            <span class="badge-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6"/>
                                    <path d="M12 3L12 15"/>
                                    <path d="m8 21 4-4 4 4"/>
                                </svg>
                            </span>
                            <span class="badge-text">Expert PrestaShop</span>
                        </div>
                        <div class="animate-item glass-card badge-modern">
                            <span class="badge-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                            </span>
                            <span class="badge-text">15+ ans d'expérience</span>
                        </div>
                        <div class="animate-item glass-card badge-modern">
                            <span class="badge-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="3"/>
                                    <path d="M12 1v6m0 6v6"/>
                                    <path d="m12 1 3 3-3 3-3-3 3-3Z"/>
                                </svg>
                            </span>
                            <span class="badge-text">Innovation IA</span>
                        </div>
                    </div>
                </div>
                
                <div class="hero-description scroll-reveal">
                    <p class="hero-text-highlight"><strong>Développeur e-commerce passionné, je conçois des solutions performantes depuis plus de 15 ans, avec une expertise pointue dans la création de modules PrestaShop sur mesure.</strong> Ma spécialité ? Intégrer l'intelligence artificielle pour révolutionner les workflows de développement.</p>
                </div>

                <div class="hero-metrics-compact stagger-animation">
                    <div class="metric-inline animate-item">
                        <span class="metric-value">15</span>
                        <span class="metric-label">ans d'expérience</span>
                    </div>
                    <div class="metric-inline animate-item">
                        <span class="metric-value">50+</span>
                        <span class="metric-label">modules créés</span>
                    </div>
                    <div class="metric-inline animate-item">
                        <span class="metric-value">∞</span>
                        <span class="metric-label">cafés</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- EXPERTISE SECTION MODERNE -->
<section class="section expertise-section-clean">
    <div class="container">
        <div class="section-header-clean scroll-reveal">
            <h2 class="section-title-clean">Mes Compétences</h2>
            <p class="section-subtitle-clean">15+ années d'expertise en développement e-commerce et solutions web</p>
        </div>
        
        <div class="grid-unified stagger-animation">
            {% for expertise in site.data.expertise limit:4 %}
            <div class="expertise-card-beautiful animate-item" data-id="{{ expertise.id }}">
                <div class="expertise-card-inner">
                    <div class="expertise-visual">
                        <div class="expertise-icon-beautiful">{{ expertise.icon }}</div>
                        {% if expertise.id == 'prestashop' or expertise.id == 'ai' %}
                        <div class="expertise-badge-beautiful">Expert</div>
                        {% endif %}
                    </div>
                    <div class="expertise-content-beautiful">
                        <h3 class="expertise-title-beautiful">{{ expertise.name }}</h3>
                        <p class="expertise-description-beautiful">{{ expertise.description }}</p>
                        <div class="expertise-skills-beautiful">
                            {% for skill in expertise.skills limit:4 %}
                            <span class="skill-beautiful">{{ skill }}</span>
                            {% endfor %}
                        </div>
                    </div>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<!-- MODULES SECTION MODERNE -->
<section class="section modules-section-modern">
    <div class="container">
        <div class="section-header-clean scroll-reveal">
            <h2 class="section-title-clean">Modules PrestaShop</h2>
            <p class="section-subtitle-clean">Sélection de modules développés pour répondre aux besoins spécifiques des e-commerçants</p>
        </div>
        
        <div class="grid-unified stagger-animation">
            {% for module in site.data.modules %}
            <div class="module-card-beautiful animate-item">
                {% if module.image %}
                <div class="module-image-beautiful">
                    <img src="{{ module.image }}" alt="{{ module.title }}" loading="lazy">
                    <div class="module-overlay-beautiful">
                        <a href="{{ module.link }}" class="preview-btn" target="_blank">
                            Découvrir
                        </a>
                    </div>
                </div>
                {% else %}
                <div class="module-image-beautiful"></div>
                {% endif %}
                
                <div class="module-content-container">
                    <div class="module-header-beautiful">
                        <h3 class="module-title-beautiful">{{ module.title }}</h3>
                        <div class="module-tags-beautiful">
                            {% for tag in module.tags %}
                            <span class="tech-tag-beautiful tech-tag-beautiful--{{ tag.category | downcase }}">{{ tag.tech }}</span>
                            {% endfor %}
                        </div>
                    </div>
                    
                    <div class="module-content-beautiful">
                        <p class="module-description-beautiful">{{ module.description }}</p>
                    </div>
                    
                    <div class="module-footer-beautiful">
                        <a href="{{ module.link }}" class="module-action-beautiful" target="_blank">
                            <span>Voir le projet</span>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            {% endfor %}
        </div>
        
        <div class="view-all-section">
            <a href="/projects" class="view-all-btn">
                <span class="btn-text">Découvrir tous mes projets</span>
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                </svg>
            </a>
        </div>
    </div>
</section>

<!-- PUBLICATIONS SECTION MODERNE -->
<section class="section publications-section-modern">
    <div class="container">
        <div class="section-header-clean scroll-reveal">
            <h2 class="section-title-clean">Mes Publications</h2>
            <p class="section-subtitle-clean">Articles techniques et retours d'expérience sur le développement e-commerce</p>
        </div>
        
        <div class="grid-unified stagger-animation">
            {% for publication in site.data.publications %}
            <div class="publication-card-beautiful animate-item">
                {% if publication.image %}
                <div class="publication-image-beautiful">
                    <img src="{{ publication.image }}" alt="{{ publication.title }}" loading="lazy">
                    {% if publication.category %}
                    <div class="publication-category-beautiful">{{ publication.category }}</div>
                    {% endif %}
                </div>
                {% else %}
                <div class="publication-image-beautiful">
                    {% if publication.category %}
                    <div class="publication-category-beautiful">{{ publication.category }}</div>
                    {% endif %}
                </div>
                {% endif %}
                
                <div class="publication-content-container">
                    <div class="publication-header-beautiful">
                        <div class="publication-meta-beautiful">
                            <span class="publication-type-beautiful">Article technique</span>
                            <span class="publication-time-beautiful">5 min de lecture</span>
                        </div>
                        <h3 class="publication-title-beautiful">{{ publication.title }}</h3>
                    </div>
                    
                    <div class="publication-content-beautiful">
                        <p class="publication-excerpt-beautiful">{{ publication.description }}</p>
                        
                        <div class="publication-topics-beautiful">
                            <span class="topic-beautiful">PrestaShop</span>
                            <span class="topic-beautiful">Développement</span>
                            {% if publication.category and publication.category != '' %}
                            <span class="topic-beautiful">{{ publication.category }}</span>
                            {% endif %}
                        </div>
                    </div>
                    
                    <div class="publication-footer-beautiful">
                        <a href="{{ publication.link }}" class="publication-link-beautiful" target="_blank">
                            <span>Lire l'article complet</span>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            {% endfor %}
        </div>
        
        <div class="view-all-section">
            <a href="https://www.businesstech.fr/landing/articles/index.html" class="view-all-btn" target="_blank">
                <span class="btn-text">Découvrir tous mes articles</span>
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                </svg>
            </a>
        </div>
    </div>
</section>

<!-- FAQ SECTION pour GEO - Optimisation IA génératives -->
<section class="section faq-section-geo">
    <div class="container">
        <div class="section-header-clean scroll-reveal">
            <h2 class="section-title-clean">Questions Fréquentes</h2>
            <p class="section-subtitle-clean">Réponses directes aux questions les plus courantes sur mes services</p>
        </div>
        
        <div class="faq-grid-geo">
            <div class="faq-item-geo" itemscope itemtype="https://schema.org/Question">
                <h3 itemprop="name">Qui est Nicolas Dabène ?</h3>
                <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
                    <div itemprop="text">
                        <p><strong>Nicolas Dabène est un Senior PHP FullStack Developer & AI Orchestrator avec plus de 15 ans d'expérience</strong> spécialisé dans le développement e-commerce PrestaShop et l'intégration d'intelligence artificielle. Expert certifié PrestaShop, il a développé plus de 50 modules sur mesure et dirigé des équipes techniques sur des projets d'envergure.</p>
                    </div>
                </div>
            </div>

            <div class="faq-item-geo" itemscope itemtype="https://schema.org/Question">
                <h3 itemprop="name">Quelles sont les spécialités techniques de Nicolas Dabène ?</h3>
                <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
                    <div itemprop="text">
                        <p><strong>Ses principales spécialités incluent :</strong></p>
                        <ul>
                            <li>Développement PHP/Symfony avancé</li>
                            <li>Architecture e-commerce PrestaShop</li>
                            <li>Intégration d'intelligence artificielle dans les workflows</li>
                            <li>Optimisation de performance web</li>
                            <li>Leadership technique et mentorat d'équipes</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="faq-item-geo" itemscope itemtype="https://schema.org/Question">
                <h3 itemprop="name">Quels types de projets Nicolas Dabène peut-il réaliser ?</h3>
                <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
                    <div itemprop="text">
                        <p><strong>Nicolas Dabène peut réaliser :</strong></p>
                        <ul>
                            <li>Développement de boutiques e-commerce PrestaShop haute performance</li>
                            <li>Création de modules PrestaShop sur mesure</li>
                            <li>Intégration d'IA pour automatiser les processus métier</li>
                            <li>Optimisation et refactoring d'applications web existantes</li>
                            <li>Audit technique et conseil en architecture logicielle</li>
                            <li>Formation et accompagnement d'équipes techniques</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="faq-item-geo" itemscope itemtype="https://schema.org/Question">
                <h3 itemprop="name">Quelle est l'approche de Nicolas Dabène pour l'intégration IA ?</h3>
                <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
                    <div itemprop="text">
                        <p><strong>L'approche d'intégration IA de Nicolas Dabène se base sur :</strong></p>
                        <ul>
                            <li>Le Prompt-Driven Development pour une génération de code structurée</li>
                            <li>L'automatisation intelligente des workflows existants</li>
                            <li>L'optimisation des performances grâce aux algorithmes ML</li>
                            <li>L'intégration seamless dans l'architecture technique existante</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SCRIPTS SPÉCIFIQUES -->
<script>
// Script pour l'expansion des cartes d'expertise
function expandExpertise(expertiseId) {
    const card = document.querySelector(`[data-id="${expertiseId}"]`);
    card.classList.toggle('expanded');
}
</script>