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
        
        <div class="expertise-grid">
            {% for expertise in site.data.expertise %}
            <div class="expertise-item" data-id="{{ expertise.id }}">
                <div class="expertise-item-header">
                    <span class="badge badge--{{ expertise.icon }}">{{ expertise.icon }}</span>
                    <h3>{{ expertise.name }}</h3>
                </div>
                <p class="expertise-item-description">{{ expertise.description }}</p>
                <div class="expertise-item-skills">
                    <ul>
                        {% for skill in expertise.skills limit:3 %}
                        <li>{{ skill }}</li>
                        {% endfor %}
                    </ul>
                </div>
                {% if expertise.id == 'prestashop' or expertise.id == 'ai' %}
                <div class="expertise-item-highlight">{{ expertise.id | capitalize }} Expert</div>
                {% endif %}
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
            <p class="section-subtitle">Sélection de modules développés pour répondre aux besoins spécifiques des e-commerçants</p>
        </div>
        
        <div class="grid-system grid-3-cols">
            {% for module in site.data.modules %}
            <div class="card module-card">
                {% if module.image %}
                <a href="{{ module.link }}" target="_blank" class="card-image-link">
                    <div class="card-image">
                        <img src="{{ module.image }}" alt="{{ module.title }}" class="module-image">
                    </div>
                </a>
                {% endif %}
                <div class="card-header">
                    <h3 class="card-title">{{ module.title }}</h3>
                    <div class="module-tags">
                        {% for tag in module.tags %}
                        <span class="badge badge--{{ tag.category | downcase }}">{{ tag.tech }}</span>
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
        
        <div class="grid-system grid-3-cols">
            {% for publication in site.data.publications %}
            <div class="card publication-card">
                {% if publication.image %}
                <a href="{{ publication.link }}" target="_blank" class="card-image-link">
                    <div class="card-image">
                        <img src="{{ publication.image }}" alt="{{ publication.title }}" class="publication-image">
                    </div>
                </a>
                {% endif %}
                <div class="card-header">
                    <h3 class="card-title">{{ publication.title }}</h3>
                    {% if publication.category %}
                    <div class="publication-category">
                        <span class="badge badge--{{ publication.category | downcase }}">{{ publication.category }}</span>
                    </div>
                    {% endif %}
                </div>
                <div class="card-content">
                    <p class="card-description">{{ publication.description }}</p>
                </div>
                <div class="card-footer">
                    <a href="{{ publication.link }}" class="btn btn--outline" target="_blank">
                        Lire l'article <span class="external-icon">↗</span>
                    </a>
                </div>
            </div>
            {% endfor %}
        </div>
        
        <div class="view-all-publications">
            <a href="https://www.businesstech.fr/landing/articles/index.html" class="btn btn--primary" target="_blank">
                Voir toutes les publications <span class="external-icon">↗</span>
            </a>
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
                <a href="/projects" class="btn btn--secondary btn--large">Voir mes réalisations</a>
            </div>
        </div>
    </div>
</section>