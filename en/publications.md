---
layout: page
title: Publications
permalink: /en/publications/
lang: en
description: "Professional articles and publications by Nicolas Dabène on e-commerce, PHP, AI, and web development."
keywords: "publications, articles, e-commerce, PHP, AI, web development, technical writing"
llm_summary: Professional articles and publications by Nicolas Dabène on e-commerce, PHP, AI, and web development.
llm_topics:
- publications
- articles
- technical writing
- e-commerce
- PHP
- AI
---
<main>

<section class="page-hero-section">
 <div class="container">
  <nav class="breadcrumb">
   <a href="/en/">Home</a>
   <span>{{ page.title }}</span>
  </nav>
  <div class="hero-content">
   <h1>{{ page.title }}</h1>
   <p class="section-description">{{ page.description }}</p>
 </div>
 </div>
</section>


<section class="section publications-page-section external-publications-section">
 <div class="container">
 <p class="intro">
            My educational goal is to share technical and strategic resources to help your online store grow.
            To explore these topics further, visit the <a href="/en/training/">Training</a> page.
 </p>
        {% assign grouped_publications = site.data.publications | group_by: "category" %}
        {% for group in grouped_publications %}
 <div class="publications-category-section">
 <div class="category-header">
 <h2 class="category-title">{{ group.name }}</h2>
 <span class="category-count">{{ group.items.size }} articles</span>
 </div>

 <div class="external-publications-grid">
                {% for publication in group.items %}
 <div class="external-publication-card">
 <div class="publication-card-header">
 <div class="publication-icon">
 <i class="fas fa-newspaper"></i>
 </div>
 <div class="publication-meta">
 <span>{{ group.name }}</span>
 </div>
 </div>
 <div class="publication-card-content">
 <h3 class="publication-title">
 <a href="{{ publication.link }}" target="_blank">{{ publication.title }}</a>
 </h3>
                        {% if publication.description %}
 <p class="publication-description">{{ publication.description | truncate: 120 }}</p>
                        {% endif %}
 </div>
 <div class="publication-card-footer">
 <a href="{{ publication.link }}" class="read-more-btn" target="_blank">Read article</a>
 </div>
 </div>
                {% endfor %}
 </div>
 </div>
        {% endfor %}

 <div class="view-all-section publications-external-link">
 <a href="https://www.businesstech.fr/landing/articles/index.html" class="view-all-btn" target="_blank">
 <span class="btn-text">See all my articles on Business Tech</span>
 <svg viewBox="0 0 24 24" fill="currentColor">
 <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
 </svg>
 </a>
 </div>

 <p>Want to go further? Discover my <a href="/en/training/">training courses</a>, browse my <a href="/en/blog/">articles</a>, or <a href="/en/contact/">Contact me to discuss</a>.</p>

 </div>
</section>

</main>
