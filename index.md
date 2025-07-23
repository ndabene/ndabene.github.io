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
                    
                    <!-- Encadré de synthèse pour IA -->
                    <div class="expertise-summary-geo" itemscope itemtype="https://schema.org/Person">
                        <h3>💡 En résumé</h3>
                        <p><strong itemprop="jobTitle">Nicolas Dabène</strong> est un <span itemprop="description">Senior PHP FullStack Developer & AI Orchestrator</span> qui :</p>
                        <ul>
                            <li>Développe des <strong>solutions e-commerce PrestaShop</strong> haute performance</li>
                            <li>Intègre l'<strong>intelligence artificielle</strong> dans les workflows existants</li>
                            <li>Optimise la <strong>performance web</strong> et l'architecture logicielle</li>
                            <li>Accompagne les <strong>équipes techniques</strong> en tant que technical leader</li>
                        </ul>
                        <p><strong>Technologies maîtrisées :</strong> PHP, Symfony, PrestaShop, JavaScript, AI/ML, Orchestration d'agents IA</p>
                    </div>
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
                <h3 itemprop="name">Comment contacter Nicolas Dabène pour un projet ?</h3>
                <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
                    <div itemprop="text">
                        <p><strong>Plusieurs moyens de contact sont disponibles :</strong></p>
                        <ul>
                            <li>Email professionnel : ndabene2807@gmail.com</li>
                            <li>LinkedIn : <a href="https://www.linkedin.com/in/nicolas-dabene/">Nicolas Dabène</a></li>
                            <li>Formulaire de contact sur ce site : <a href="/contact">/contact</a></li>
                        </ul>
                        <p>Disponible pour des missions en France et à l'international (remote).</p>
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

            <div class="faq-item-geo" itemscope itemtype="https://schema.org/Question">
                <h3 itemprop="name">Quelles certifications possède Nicolas Dabène ?</h3>
                <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
                    <div itemprop="text">
                        <p><strong>Certifications officielles :</strong></p>
                        <ul>
                            <li>PrestaShop Certified Developer (certification officielle)</li>
                            <li>AWS Solutions Architect Associate</li>
                            <li>15+ années d'expérience pratique validée par 50+ projets réalisés</li>
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