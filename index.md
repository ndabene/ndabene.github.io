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
            <div class="module-card-simple animate-item">
                {% if module.image %}
                <div class="module-image-simple">
                    <img src="{{ module.image }}" alt="{{ module.title }}" loading="lazy">
                </div>
                {% else %}
                <div class="module-image-simple"></div>
                {% endif %}
                
                <div class="module-content-simple">
                    <h3 class="module-title-simple">{{ module.title }}</h3>
                    
                    <div class="module-tags-simple">
                        {% for tag in module.tags %}
                        <span class="tag-simple tag-simple--{{ tag.category | downcase }}">{{ tag.tech }}</span>
                        {% endfor %}
                    </div>
                    
                    <p class="module-description-simple">{{ module.description }}</p>
                </div>
                
                <div class="module-footer-simple">
                    <a href="{{ module.link }}" class="view-btn" target="_blank">
                        <span class="btn-text">Découvrir</span>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                        </svg>
                    </a>
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

{% include future-posts-data.html %}

<!-- PUBLICATIONS SECTION MODERNE -->
<section class="section publications-section-modern">
    <div class="container">
        <div class="section-header-clean scroll-reveal">
            <h2 class="section-title-clean">Mes Publications</h2>
            <p class="section-subtitle-clean">Articles techniques et retours d'expérience sur le développement e-commerce</p>
        </div>
        
        <div id="publications-home-container" class="post-grid-home homepage-publications stagger-animation">
            {% for publication in site.data.publications %}
            <div class="home-article-card animate-item">
                <article class="home-article">
                    <div class="home-article-content">
                        <!-- Vignette compacte -->
                        {% if publication.image %}
                            <div class="post-news-thumb">
                                <img src="{{ publication.image }}" alt="{{ publication.title }}" loading="lazy">
                                <span class="post-category-mini">Article</span>
                            </div>
                        {% endif %}
                        
                        <!-- Contenu principal -->
                        <div class="post-news-text">
                            <!-- Méta-données compactes -->
                            <div class="post-news-meta">
                                <span class="publication-type-beautiful">Article technique</span>
                                <span class="reading-time">5 min de lecture</span>
                            </div>
                            
                            <!-- Titre -->
                            <h3 class="post-news-title">
                                <a href="{{ publication.link }}" target="_blank">{{ publication.title }}</a>
                            </h3>
                            
                            <!-- Extrait -->
                            <p class="post-news-excerpt">
                                {{ publication.description }}
                            </p>
                            
                            <!-- Tags compacts -->
                            <div class="post-news-tags">
                                <span class="tag-mini">PrestaShop</span>
                                <span class="tag-mini">Développement</span>
                                {% if publication.category and publication.category != '' %}
                                <span class="tag-mini">{{ publication.category }}</span>
                                {% endif %}
                            </div>
                        </div>
                        
                        <!-- Actions -->
                        <div class="post-news-actions">
                            <a href="{{ publication.link }}" class="view-btn" target="_blank">
                                <span class="btn-text">Lire l'article</span>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </article>
            </div>
            {% endfor %}
        </div>
        
        <div class="view-all-section">
            <a href="https://www.businesstech.fr/landing/articles/index.html" class="view-all-btn" target="_blank">
                <span class="btn-text">Découvrir tous mes articles</span>
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
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
        
        <div class="skills-grid-circular stagger-animation">
            <div class="skill-card-circular animate-item" itemscope itemtype="https://schema.org/Question">
                <div class="skill-visual-circular">
                    <div class="circular-progress-container">
                        <svg class="circular-progress" width="80" height="80" viewBox="0 0 36 36">
                            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2"/>
                            <path class="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2" stroke-dasharray="100, 100" data-level="100"/>
                        </svg>
                        <div class="progress-percentage">?</div>
                    </div>
                </div>
                
                <div class="skill-info-circular">
                    <h3 class="skill-name-circular" itemprop="name">Qui est Nicolas Dabène ?</h3>
                    <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
                        <div itemprop="text" class="skill-description-circular">
                            <p><strong>Senior PHP FullStack Developer & AI Orchestrator avec plus de 15 ans d'expérience</strong> spécialisé dans le développement e-commerce PrestaShop et l'intégration d'intelligence artificielle.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="skill-card-circular animate-item" itemscope itemtype="https://schema.org/Question">
                <div class="skill-visual-circular">
                    <div class="circular-progress-container">
                        <svg class="circular-progress" width="80" height="80" viewBox="0 0 36 36">
                            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2"/>
                            <path class="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2" stroke-dasharray="100, 100" data-level="100"/>
                        </svg>
                        <div class="progress-percentage">?</div>
                    </div>
                </div>
                
                <div class="skill-info-circular">
                    <h3 class="skill-name-circular" itemprop="name">Quelles sont ses spécialités techniques ?</h3>
                    <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
                        <div itemprop="text" class="skill-description-circular">
                            <p>PHP/Symfony avancé, architecture PrestaShop, intégration d'IA, optimisation de performance web, et leadership technique.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="skill-card-circular animate-item" itemscope itemtype="https://schema.org/Question">
                <div class="skill-visual-circular">
                    <div class="circular-progress-container">
                        <svg class="circular-progress" width="80" height="80" viewBox="0 0 36 36">
                            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2"/>
                            <path class="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2" stroke-dasharray="100, 100" data-level="100"/>
                        </svg>
                        <div class="progress-percentage">?</div>
                    </div>
                </div>
                
                <div class="skill-info-circular">
                    <h3 class="skill-name-circular" itemprop="name">Quels types de projets peut-il réaliser ?</h3>
                    <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
                        <div itemprop="text" class="skill-description-circular">
                            <p>Boutiques e-commerce PrestaShop, modules sur mesure, intégrations d'IA, optimisations web, audits techniques et formation d'équipes.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="skill-card-circular animate-item" itemscope itemtype="https://schema.org/Question">
                <div class="skill-visual-circular">
                    <div class="circular-progress-container">
                        <svg class="circular-progress" width="80" height="80" viewBox="0 0 36 36">
                            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2"/>
                            <path class="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2" stroke-dasharray="100, 100" data-level="100"/>
                        </svg>
                        <div class="progress-percentage">?</div>
                    </div>
                </div>
                
                <div class="skill-info-circular">
                    <h3 class="skill-name-circular" itemprop="name">Quelle est son approche pour l'IA ?</h3>
                    <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
                        <div itemprop="text" class="skill-description-circular">
                            <p>Prompt-Driven Development, automatisation intelligente, optimisation par ML et intégration seamless dans les architectures existantes.</p>
                        </div>
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

// Script pour l'animation des cercles FAQ
document.addEventListener('DOMContentLoaded', function() {
    // Animation des FAQ circulaires
    function animateFaqCircles() {
        const circles = document.querySelectorAll('.faq-section-geo .circle');
        const percentages = document.querySelectorAll('.faq-section-geo .progress-percentage');
        
        circles.forEach((circle, index) => {
            setTimeout(() => {
                circle.style.strokeDasharray = `${100}, 100`;
                
                if (percentages[index]) {
                    percentages[index].textContent = "!";
                }
            }, index * 300);
        });
    }
    
    // Observer pour déclencher l'animation quand les FAQ sont visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFaqCircles();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const faqSection = document.querySelector('.faq-section-geo');
    if (faqSection) {
        observer.observe(faqSection);
    }
});
</script>