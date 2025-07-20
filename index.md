---
layout: default
title: "Senior PHP Developer & AI Orchestrator"
description: "Expert PrestaShop certifié avec 15+ ans d'expérience. Architecture complexe, innovation AI et performance e-commerce."
permalink: /
---

<section class="hero">
  <div class="hero__container">
    <div class="hero__content">
      <h1 class="hero__title">
        Senior PHP FullStack Developer
        <span class="hero__subtitle">& AI Orchestrator</span>
      </h1>
      <p class="hero__description">
        Expert PrestaShop certifié avec <strong>15+ ans d'expérience</strong>. 
        Spécialisé en architecture complexe et innovation AI pour l'e-commerce haute performance.
      </p>
      <div class="hero__stats">
        <div class="stat">
          <span class="stat__number">50+</span>
          <span class="stat__label">Projets complexes</span>
        </div>
        <div class="stat">
          <span class="stat__number">€10M+</span>
          <span class="stat__label">Revenue générée</span>
        </div>
        <div class="stat">
          <span class="stat__number">Fortune 500</span>
          <span class="stat__label">Clients</span>
        </div>
      </div>
      <div class="hero__actions">
        <a href="#contact" class="btn btn--primary">Démarrer un projet</a>
        <a href="/projects" class="btn btn--secondary">Voir mes réalisations</a>
      </div>
    </div>
    <div class="hero__image">
      <div class="hero__badge-cloud">
        {% include tech-badge.html tech="PHP" category="backend" %}
        {% include tech-badge.html tech="PrestaShop" category="ecommerce" %}
        {% include tech-badge.html tech="AI/ML" category="ai" %}
        {% include tech-badge.html tech="Symfony" category="backend" %}
        {% include tech-badge.html tech="Docker" category="devops" %}
        {% include tech-badge.html tech="Vue.js" category="frontend" %}
      </div>
    </div>
  </div>
</section>

<section class="expertise">
  <div class="container">
    <h2 class="section__title">Expertise Technique</h2>
    <div class="expertise__grid">
      <div class="expertise__card tech-category--backend">
        <h3>Backend Architecture</h3>
        <p>PHP 8+, Symfony, microservices, API REST/GraphQL</p>
        <div class="expertise__tech">
          {% include tech-badge.html tech="PHP 8" category="backend" %}
          {% include tech-badge.html tech="Symfony" category="backend" %}
          {% include tech-badge.html tech="API REST" category="backend" %}
        </div>
      </div>
      
      <div class="expertise__card tech-category--ecommerce">
        <h3>E-commerce Expert</h3>
        <p>PrestaShop certifié, optimisation performance, modules custom</p>
        <div class="expertise__tech">
          {% include tech-badge.html tech="PrestaShop" category="ecommerce" %}
          {% include tech-badge.html tech="WooCommerce" category="ecommerce" %}
          {% include tech-badge.html tech="Magento" category="ecommerce" %}
        </div>
      </div>
      
      <div class="expertise__card tech-category--ai">
        <h3>AI Orchestrator</h3>
        <p>Machine Learning, NLP, automation intelligente</p>
        <div class="expertise__tech">
          {% include tech-badge.html tech="TensorFlow" category="ai" %}
          {% include tech-badge.html tech="OpenAI" category="ai" %}
          {% include tech-badge.html tech="Python" category="ai" %}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="projects-preview">
  <div class="container">
    <h2 class="section__title">Projets Récents</h2>
    <p class="section__subtitle">Solutions innovantes pour des clients exigeants</p>
    
    <div class="projects__grid">
      <div class="project-card">
        <div class="project-card__image">
          <img src="/assets/images/projects/ecommerce-platform.jpg" alt="Plateforme E-commerce" loading="lazy">
        </div>
        <div class="project-card__content">
          <h3>Plateforme E-commerce Multi-tenant</h3>
          <p>Architecture microservices pour marketplace B2B avec 50k+ produits</p>
          <div class="project-card__tech">
            {% include tech-badge.html tech="PHP 8" category="backend" %}
            {% include tech-badge.html tech="Symfony" category="backend" %}
            {% include tech-badge.html tech="Docker" category="devops" %}
          </div>
          <div class="project-card__metrics">
            <span class="metric">300% performance boost</span>
            <span class="metric">€2M+ revenue</span>
          </div>
        </div>
      </div>
      
      <div class="project-card">
        <div class="project-card__image">
          <img src="/assets/images/projects/ai-optimization.jpg" alt="AI Optimization" loading="lazy">
        </div>
        <div class="project-card__content">
          <h3>AI-Powered Inventory Management</h3>
          <p>Système prédictif pour optimisation stock e-commerce</p>
          <div class="project-card__tech">
            {% include tech-badge.html tech="Python" category="ai" %}
            {% include tech-badge.html tech="TensorFlow" category="ai" %}
            {% include tech-badge.html tech="API REST" category="backend" %}
          </div>
          <div class="project-card__metrics">
            <span class="metric">40% réduction stock</span>
            <span class="metric">95% précision</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="projects__cta">
      <a href="/projects" class="btn btn--primary">Voir tous les projets</a>
    </div>
  </div>
</section>