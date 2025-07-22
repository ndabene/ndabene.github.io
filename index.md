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
                    <img src="/assets/images/hero/profile-hero.jpg" alt="Nicolas Dabène - Senior PHP Developer" class="profile-image-modern">
                    <div class="profile-status-indicator"></div>
                </div>
                <div class="floating-tech-icons">
                    <div class="tech-icon animate-float" style="animation-delay: 0s;">🚀</div>
                    <div class="tech-icon animate-float" style="animation-delay: 0.5s;">⚡</div>
                    <div class="tech-icon animate-float" style="animation-delay: 1s;">🤖</div>
                    <div class="tech-icon animate-float" style="animation-delay: 1.5s;">🎯</div>
                </div>
            </div>
            
            <!-- Hero Content avec animations -->
            <div class="hero-content">
                <div class="hero-header scroll-reveal">
                    <h1 class="hero-title text-gradient-animated">Nicolas Dabène</h1>
                    <p class="hero-subtitle typing-effect">Senior PHP FullStack Developer & AI Orchestrator</p>
                    
                    <div class="hero-badges-modern stagger-animation">
                        <div class="animate-item glass-card badge-modern">
                            <span class="badge-icon">🏆</span>
                            <span class="badge-text">Expert PrestaShop</span>
                        </div>
                        <div class="animate-item glass-card badge-modern">
                            <span class="badge-icon">📅</span>
                            <span class="badge-text">15+ ans d'expérience</span>
                        </div>
                        <div class="animate-item glass-card badge-modern">
                            <span class="badge-icon">🤖</span>
                            <span class="badge-text">Innovation IA</span>
                        </div>
                    </div>
                </div>
                
                <div class="hero-description scroll-reveal">
                    <p class="hero-text-highlight"><strong>Développeur e-commerce passionné, je conçois des solutions performantes depuis plus de 15 ans, avec une expertise pointue dans la création de modules PrestaShop sur mesure.</strong> Ma spécialité ? Intégrer l'intelligence artificielle pour révolutionner les workflows de développement et accélérer considérablement la mise en production des projets.</p>
                    <p><strong>Expert Full Stack animé par l'innovation, je transforme chaque défi technique en levier de croissance stratégique.</strong> Mon approche consiste à développer des solutions parfaitement adaptées qui propulsent les performances des boutiques en ligne et génèrent des résultats mesurables pour mes clients.</p>
                </div>

                <div class="hero-metrics stagger-animation">
                    <div class="metric-card animate-item glass-card">
                        <div class="metric-value metric-infinity">∞</div>
                        <div class="metric-label">Cafés</div>
                    </div>
                    <div class="metric-card animate-item glass-card">
                        <div class="metric-value">15</div>
                        <div class="metric-label">Années d'expérience</div>
                    </div>
                    <div class="metric-card animate-item glass-card">
                        <div class="metric-value">50</div>
                        <div class="metric-label">Modules créés</div>
                    </div>
                </div>

                <div class="hero-highlights-modern stagger-animation">
                    <div class="highlight-card animate-item hover-lift">
                        <div class="highlight-icon-modern">🚀</div>
                        <div class="highlight-content">
                            <h3>Architecture e-commerce</h3>
                            <p>Optimisée et évolutive</p>
                        </div>
                    </div>
                    <div class="highlight-card animate-item hover-lift">
                        <div class="highlight-icon-modern">⚡</div>
                        <div class="highlight-content">
                            <h3>Modules PrestaShop</h3>
                            <p>Haute performance</p>
                        </div>
                    </div>
                    <div class="highlight-card animate-item hover-lift">
                        <div class="highlight-icon-modern">🤖</div>
                        <div class="highlight-content">
                            <h3>Intégration IA</h3>
                            <p>Automatisation des processus</p>
                        </div>
                    </div>
                    <div class="highlight-card animate-item hover-lift">
                        <div class="highlight-icon-modern">🎯</div>
                        <div class="highlight-content">
                            <h3>Solutions sur mesure</h3>
                            <p>Adaptées aux enjeux business</p>
                        </div>
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
        
        <div class="expertise-grid-clean stagger-animation">
            {% for expertise in site.data.expertise limit:4 %}
            <div class="expertise-card-clean animate-item hover-lift" data-id="{{ expertise.id }}">
                <div class="expertise-header">
                    <div class="expertise-icon-clean">{{ expertise.icon }}</div>
                    {% if expertise.id == 'prestashop' or expertise.id == 'ai' %}
                    <div class="expert-badge">Expert</div>
                    {% endif %}
                </div>
                <h3 class="expertise-title-clean">{{ expertise.name }}</h3>
                <p class="expertise-desc-clean">{{ expertise.description }}</p>
                <div class="expertise-skills-clean">
                    {% for skill in expertise.skills limit:2 %}
                    <span class="skill-clean">{{ skill }}</span>
                    {% endfor %}
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
            <h2 class="section-title-clean">Mes Modules PrestaShop</h2>
            <p class="section-subtitle-clean">Sélection de modules développés pour répondre aux besoins spécifiques des e-commerçants</p>
        </div>
        
        <div class="modules-showcase stagger-animation">
            {% for module in site.data.modules %}
            <div class="module-card-modern animate-item glass-card hover-lift">
                {% if module.image %}
                <div class="module-image-container">
                    <img src="{{ module.image }}" alt="{{ module.title }}" class="module-image-modern">
                    <div class="module-overlay">
                        <a href="{{ module.link }}" class="btn--primary ripple-effect" target="_blank">
                            Découvrir
                        </a>
                    </div>
                </div>
                {% endif %}
                
                <div class="module-card-content">
                    <div class="module-header">
                        <h3 class="module-title">{{ module.title }}</h3>
                        <div class="module-tags-modern">
                            {% for tag in module.tags %}
                            <span class="tech-tag tech-tag--{{ tag.category | downcase }}">{{ tag.tech }}</span>
                            {% endfor %}
                        </div>
                    </div>
                    
                    <p class="module-description-modern">{{ module.description }}</p>
                    
                    <div class="module-features">
                        <!-- Placeholder pour features spécifiques -->
                        <div class="feature-highlight">✨ Prêt à l'emploi</div>
                    </div>
                </div>
                
                <div class="module-card-actions">
                    <a href="{{ module.link }}" class="btn-modern btn--primary ripple-effect" target="_blank">
                        Voir le projet
                        <svg class="external-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                        </svg>
                    </a>
                </div>
            </div>
            {% endfor %}
        </div>
        
        <div class="view-all-section scroll-reveal">
            <a href="/projects" class="btn-modern btn--secondary btn--large ripple-effect">
                Tous mes projets
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
        
        <div class="publications-grid stagger-animation">
            {% for publication in site.data.publications %}
            <div class="publication-card-modern animate-item glass-card hover-lift">
                {% if publication.image %}
                <div class="publication-image-wrapper">
                    <img src="{{ publication.image }}" alt="{{ publication.title }}" class="publication-image-modern">
                    <div class="publication-category-badge">
                        {% if publication.category %}
                        <span class="category-tag category-tag--{{ publication.category | downcase }}">{{ publication.category }}</span>
                        {% endif %}
                    </div>
                </div>
                {% endif %}
                
                <div class="publication-content">
                    <div class="publication-meta">
                        <time class="publication-date">Article technique</time>
                        <div class="reading-time">5 min de lecture</div>
                    </div>
                    
                    <h3 class="publication-title">{{ publication.title }}</h3>
                    <p class="publication-excerpt">{{ publication.description }}</p>
                    
                    <div class="publication-tags">
                        <!-- Tags dynamiques basés sur le contenu -->
                        <span class="topic-tag">PrestaShop</span>
                        <span class="topic-tag">Développement</span>
                    </div>
                </div>
                
                <div class="publication-footer">
                    <a href="{{ publication.link }}" class="read-article-btn" target="_blank">
                        Lire l'article complet
                        <svg class="article-arrow" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                        </svg>
                    </a>
                </div>
            </div>
            {% endfor %}
        </div>
        
        <div class="publications-cta scroll-reveal">
            <div class="cta-content-modern glass-card">
                <h3>Découvrez tous mes articles</h3>
                <p>Explorez l'ensemble de mes publications techniques et guides de développement</p>
                <a href="https://www.businesstech.fr/landing/articles/index.html" class="btn-modern btn--primary btn--large ripple-effect" target="_blank">
                    Toutes les publications
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                    </svg>
                </a>
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