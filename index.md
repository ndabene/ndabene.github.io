---
layout: default
title: "Nicolas Dabène - Senior PHP Developer & AI Orchestrator | Expert PrestaShop"
description: "15+ ans d'expérience en développement e-commerce. Modules PrestaShop, architecture e-commerce, AI-assisted development."
keywords: "senior php developer, prestashop expert, ai orchestrator, symfony, e-commerce architecture, php fullstack"
---

<!-- HERO SECTION EXECUTIVE -->
<section class="hero-section">
    <div class="container">
        <div class="hero-top">
            <div class="hero-visual">
                <div class="profile-container">
                    <img src="/assets/images/hero/profile-hero.jpg" alt="Nicolas Dabène - Senior PHP Developer" class="profile-image">
                </div>
            </div>
            <div class="hero-header">
                <h1>Nicolas Dabène</h1>
                <p class="hero-subtitle">Senior PHP FullStack Developer & AI Orchestrator</p>
                <div class="hero-badges">
                    {% include tech-badge.html tech="Expert PrestaShop" category="prestashop" %}
                    {% include tech-badge.html tech="15+ ans d'expérience" category="experience" %}
                    {% include tech-badge.html tech="Innovation IA" category="ai" %}
                </div>
            </div>
        </div>
        
        <div class="hero-description">
            <p><strong>Développeur e-commerce passionné, je conçois des solutions performantes depuis plus de 15 ans, avec une expertise pointue dans la création de modules PrestaShop sur mesure.</strong> Ma spécialité ? Intégrer l'intelligence artificielle pour révolutionner les workflows de développement et accélérer considérablement la mise en production des projets.</p>
            <p><strong>Expert Full Stack animé par l'innovation, je transforme chaque défi technique en levier de croissance stratégique.</strong> Mon approche consiste à développer des solutions parfaitement adaptées qui propulsent les performances des boutiques en ligne et génèrent des résultats mesurables pour mes clients.</p>
        </div>

        <div class="hero-highlights">
            <div class="highlight-item">
                <span class="highlight-icon">🚀</span>
                <span class="highlight-text">Architecture e-commerce optimisée et évolutive</span>
            </div>
            <div class="highlight-item">
                <span class="highlight-icon">⚡</span>
                <span class="highlight-text">Modules PrestaShop haute performance</span>
            </div>
            <div class="highlight-item">
                <span class="highlight-icon">🤖</span>
                <span class="highlight-text">Intégration IA pour automatiser les processus</span>
            </div>
            <div class="highlight-item">
                <span class="highlight-icon">🎯</span>
                <span class="highlight-text">Solutions sur mesure adaptées aux enjeux business</span>
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
        
        <div class="expertise-tabs-container">
            <div class="expertise-tabs">
                {% for expertise in site.data.expertise %}
                <button class="tab-button{% if forloop.first %} active{% endif %}" data-tab="{{ expertise.id }}">
                    <span class="badge badge--{{ expertise.icon }}">{{ expertise.icon }}</span>
                    <span class="tab-label">{{ expertise.name }}</span>
                </button>
                {% endfor %}
            </div>
            
            <div class="expertise-content">
                {% for expertise in site.data.expertise %}
                <div class="tab-content{% if forloop.first %} active{% endif %}" id="tab-{{ expertise.id }}">
                    <div class="expertise-header">
                        <h3>{{ expertise.name }}</h3>
                        <div class="expertise-badge large">
                            <span class="badge badge--{{ expertise.icon }}">{{ expertise.icon }}</span>
                        </div>
                    </div>
                    <div class="expertise-description">
                        <p>{{ expertise.description }}</p>
                    </div>
                    <div class="expertise-skills">
                        <h4>Compétences clés</h4>
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
    </div>
</section>

<!-- MODULES PRESTASHOP FEATURED SECTION -->
<section class="section modules-section">
    <div class="container">
        <div class="section-header">
            <h2>Modules PrestaShop Signature</h2>
            <p class="section-subtitle">Sélection de modules développés pour répondre aux besoins spécifiques des e-commerçants</p>
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
                        Voir le projet <span class="external-icon">↗</span>
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
            <p class="section-subtitle">Articles techniques et retours d'expérience sur le développement e-commerce</p>
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

<!-- CALL TO ACTION FINAL -->
<section class="section cta-section">
    <div class="container">
        <div class="cta-content">
            <h2>Prêt à propulser votre projet e-commerce ?</h2>
            <p>Discutons de vos besoins en développement e-commerce et de la façon dont mon expertise peut transformer vos défis en opportunités de croissance.</p>
            <div class="cta-actions">
                <a href="/contact" class="btn btn--primary btn--large">Démarrer une collaboration</a>
                <a href="/projects" class="btn btn--secondary btn--large">Voir mes réalisations</a>
            </div>
        </div>
    </div>
</section>