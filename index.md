---
layout: default
title: "Nicolas Dabène - Senior PHP Developer & AI Orchestrator | Expert PrestaShop"
description: "15+ ans d'expérience, 11+ ans chez Business Tech. Modules PrestaShop, architecture e-commerce, AI-assisted development."
keywords: "senior php developer, prestashop expert, business tech, ai orchestrator, symfony, e-commerce architecture, php fullstack"
---

<!-- HERO SECTION EXECUTIVE -->
<section class="hero-section">
    <div class="container">
        <div class="hero-grid">
            <div class="hero-content">
                <h1>Nicolas Dabène</h1>
                <p class="hero-subtitle">Senior PHP FullStack Developer & AI Orchestrator</p>
                <div class="hero-badges">
                    {% include tech-badge.html tech="Expert PrestaShop" category="prestashop" %}
                    {% include tech-badge.html tech="15+ ans d'expérience" category="experience" %}
                    {% include tech-badge.html tech="Business Tech" category="business" %}
                </div>
                
                <div class="hero-description">
                    <p>Chez <strong>Business Tech</strong>, je contribue depuis plus de <strong>11 ans</strong> à l'élaboration de solutions e-commerce performantes et à la création de modules PrestaShop personnalisés, répondant aux besoins spécifiques de nos clients. Mon rôle inclut également l'intégration de technologies assistées par intelligence artificielle pour optimiser les workflows de développement et accélérer la livraison de projets.</p>
                    <p>Fort de plusieurs années d'expérience en développement Full Stack et en orchestration AI-Assisted, je suis motivé par l'innovation et la création de valeur dans le secteur du e-commerce. Mon objectif est de transformer les défis techniques en opportunités stratégiques, tout en promouvant des solutions sur mesure qui maximisent les performances des boutiques en ligne.</p>
                </div>

                <div class="hero-metrics">
                    <div class="metric-box">
                        <span class="metric-value">15+</span>
                        <span class="metric-label">ans d'expérience</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">11+</span>
                        <span class="metric-label">ans chez Business Tech</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">50+</span>
                        <span class="metric-label">Modules PrestaShop créés</span>
                    </div>
                    <div class="metric-box">
                        <span class="metric-value">25+</span>
                        <span class="metric-label">Publications techniques</span>
                    </div>
                </div>

                <div class="hero-actions">
                    <a href="/projects" class="btn btn--primary">Voir mes projets</a>
                    <a href="#contact" class="btn btn--secondary">Collaboration</a>
                </div>
            </div>
            
            <div class="hero-visual">
                <div class="expertise-cloud">
                    {% include tech-badge.html tech="PHP" category="php" years="15" %}
                    {% include tech-badge.html tech="Symfony" category="php" years="10" %}
                    {% include tech-badge.html tech="PrestaShop" category="prestashop" years="11" %}
                    {% include tech-badge.html tech="AI/ML" category="ai" years="3" %}
                    {% include tech-badge.html tech="Docker" category="devops" years="8" %}
                    {% include tech-badge.html tech="Vue.js" category="frontend" years="6" %}
                </div>
            </div>
        </div>
    </div>
</section>

<!-- EXPERTISE HIGHLIGHTS SECTION -->
<section class="section expertise-section">
    <div class="container">
        <div class="section-header">
            <h2>Expertise Technique</h2>
            <p class="section-subtitle">Plus de 15 ans d'expérience dans le développement de solutions e-commerce et d'applications web complexes</p>
        </div>
        
        <div class="grid-system grid-2-cols">
            {% for expertise in site.data.expertise %}
            <div class="card expertise-card">
                <div class="card-header">
                    <div class="card-icon">
                        {% include tech-badge.html tech=expertise.icon category=expertise.icon %}
                    </div>
                    <h3 class="card-title">{{ expertise.name }}</h3>
                </div>
                <div class="card-content">
                    <p class="card-description">{{ expertise.description }}</p>
                    <ul class="expertise-list">
                        {% for skill in expertise.skills %}
                        <li>{{ skill }}</li>
                        {% endfor %}
                    </ul>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<!-- MODULES PRESTASHOP FEATURED SECTION -->
<section class="section modules-section">
    <div class="container">
        <div class="section-header">
            <h2>Modules PrestaShop Signature</h2>
            <p class="section-subtitle">Sélection de modules développés chez Business Tech pour répondre aux besoins spécifiques de nos clients e-commerce</p>
        </div>
        
        <div class="grid-system grid-3-cols">
            {% for module in site.data.modules %}
            <div class="card module-card">
                <div class="card-header">
                    <h3 class="card-title">{{ module.title }}</h3>
                    <div class="module-tags">
                        {% for tag in module.tags %}
                        {% include tech-badge.html tech=tag.tech category=tag.category %}
                        {% endfor %}
                    </div>
                </div>
                <div class="card-content">
                    <p class="card-description">{{ module.description }}</p>
                </div>
                <div class="card-footer">
                    <a href="{{ module.link }}" class="btn btn--outline" target="_blank">
                        Voir chez Business Tech <span class="external-icon">↗</span>
                    </a>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<!-- PUBLICATIONS SECTION -->
<section class="section publications-section">
    <div class="container">
        <div class="section-header">
            <h2>Mes Publications</h2>
            <p class="section-subtitle">Retrouvez mes articles et tutoriels sur le blog de Business Tech.</p>
        </div>
        
        <div class="grid-system grid-2-cols">
            {% for publication in site.data.publications %}
            <a href="{{ publication.link }}" target="_blank" class="card publication-card">
                <div class="card-content">
                    <h3 class="card-title">{{ publication.title }}</h3>
                    <span class="publication-link">
                        Lire l'article <span class="external-icon">↗</span>
                    </span>
                </div>
            </a>
            {% endfor %}
        </div>
    </div>
</section>

<!-- BUSINESS TECH PARTNERSHIP SECTION -->
<section class="section partnership-section">
    <div class="container">
        <div class="partnership-grid">
            <div class="partnership-content">
                <div class="section-header">
                    <h2>Collaboration Business Tech</h2>
                    <p class="section-subtitle">Plus de 11 années de collaboration fructueuse dans le développement de solutions e-commerce innovantes</p>
                </div>
                
                <div class="partnership-highlights">
                    <div class="highlight-item">
                        <div class="highlight-icon">
                            <span class="icon-achievement">🏆</span>
                        </div>
                        <div class="highlight-content">
                            <h4>Projets Marquants</h4>
                            <p>Plus de 200 projets e-commerce livrés avec succès, incluant des architectures complexes pour des clients Fortune 500.</p>
                        </div>
                    </div>
                    
                    <div class="highlight-item">
                        <div class="highlight-icon">
                            <span class="icon-innovation">💡</span>
                        </div>
                        <div class="highlight-content">
                            <h4>Innovation Continue</h4>
                            <p>Développement de frameworks internes et intégration de technologies AI pour optimiser nos processus de développement.</p>
                        </div>
                    </div>
                    
                    <div class="highlight-item">
                        <div class="highlight-icon">
                            <span class="icon-expertise">🔧</span>
                        </div>
                        <div class="highlight-content">
                            <h4>Expertise Technique</h4>
                            <p>Leadership technique sur les projets complexes et mentorat des équipes junior pour maintenir notre excellence.</p>
                        </div>
                    </div>
                </div>

                <div class="partnership-testimonial">
                    <blockquote>
                        <p>"Nicolas apporte une expertise technique exceptionnelle et une vision stratégique qui nous permet de rester à la pointe de l'innovation e-commerce. Sa capacité à intégrer des technologies AI dans nos workflows a révolutionné notre approche du développement."</p>
                        <footer>
                            <strong>Équipe Business Tech</strong>
                            <span>Témoignage interne</span>
                        </footer>
                    </blockquote>
                </div>

                <div class="partnership-cta">
                    <a href="https://business-tech.fr" class="btn btn--primary" target="_blank">
                        Découvrir Business Tech <span class="external-icon">↗</span>
                    </a>
                    <a href="/about#business-tech" class="btn btn--secondary">
                        Notre collaboration
                    </a>
                </div>
            </div>
            
            <div class="partnership-metrics">
                <div class="metric-card">
                    <span class="metric-number">11+</span>
                    <span class="metric-label">Années de collaboration</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">200+</span>
                    <span class="metric-label">Projets livrés</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">50+</span>
                    <span class="metric-label">Modules développés</span>
                </div>
                <div class="metric-card">
                    <span class="metric-number">€25M+</span>
                    <span class="metric-label">Chiffre d'affaires généré</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CALL TO ACTION FINAL -->
<section class="section cta-section">
    <div class="container">
        <div class="cta-content">
            <h2>Prêt à collaborer sur votre prochain projet ?</h2>
            <p>Discutons de vos besoins en développement e-commerce et de la façon dont mon expertise peut contribuer à votre succès.</p>
            <div class="cta-actions">
                <a href="/contact" class="btn btn--primary btn--large">Démarrer une collaboration</a>
                <a href="/projects" class="btn btn--secondary btn--large">Voir mes réalisations</a>
            </div>
        </div>
    </div>
</section>