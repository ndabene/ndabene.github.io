---
layout: default
title: "Nicolas Dabène | AI Orchestrator & PHP Expert"
description: "Senior PHP Developer turning complex requirements into elegant AI-driven solutions."
---

<section class="nexus-hero">
  <div class="nexus-hero__content">
    <h1 class="nexus-hero__title">
      Orchestrating <span>Intelligence</span>
    </h1>
    <p class="nexus-hero__description">
      Senior PHP Developer & AI Orchestrator turning complex requirements into elegant, scalable solutions.
    </p>
    <div class="nexus-hero__actions">
      <a href="/blog/" class="nexus-btn nexus-btn--primary">Read Articles</a>
      <a href="/pages/boutique.html" class="nexus-btn nexus-btn--glass">View Modules</a>
    </div>
  </div>
</section>

<section class="section-padding">
  <div class="nexus-container">
    <h2 class="text-center mb-lg">Latest Insights</h2>
    
    <div class="nexus-grid-3">
      {% assign blog_posts = site.posts | where_exp: "post", "post.linkedin != true" %}
      {% for post in blog_posts limit:3 %}
      <article class="nexus-card">
        {% if post.image %}
        <img src="{{ post.image }}" alt="{{ post.title }}" class="nexus-card__image" loading="lazy">
        {% else %}
        <img src="/assets/images/blog/default-post.png" alt="{{ post.title }}" class="nexus-card__image" loading="lazy">
        {% endif %}
        <h3 class="nexus-card__title">
          <a href="{{ post.url }}">{{ post.title }}</a>
        </h3>
        <p class="nexus-card__excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
        <a href="{{ post.url }}" class="nexus-card__action" style="color: #a78bfa; font-weight: 600;">Read More →</a>
      </article>
      {% endfor %}
    </div>
  </div>
</section>
