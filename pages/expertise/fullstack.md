---
layout: page
title: Expertise Développement FullStack
permalink: /expertise/fullstack/
show_sidebar: false
---

{% assign exp = site.data.expertise | where: 'id', 'fullstack' | first %}
<section class="expertise-detail">
  <div class="container">
    <div class="expertise-grid">
      <article class="expertise-card">
        <h3>Développement FullStack</h3>
        <p class="section-description">{{ exp.description }}</p>
        <h3>Compétences clés</h3>
        <ul class="expertise-list-compact">
          {% for s in exp.skills %}
          <li>{{ s }}</li>
          {% endfor %}
        </ul>
        <div class="expertise-cta">
          <a class="btn btn--primary" href="{{ '/contact/' | relative_url }}">Me contacter</a>
        </div>
      </article>
      <aside>
        <div class="expertise-card">
          <h3>Domaines d'expertise</h3>
          {% assign ex_ids = 'prestashop,ecommerce,ai,fullstack,innovation' | split: ',' %}
          <ul class="expertise-list-compact">
            {% for ex in site.data.expertise %}
              {% if ex_ids contains ex.id %}
                <li><a href="{{ '/expertise/' | append: ex.id | downcase | append: '/' | relative_url }}" class="{% if page.url contains ex.id %}active{% endif %}">{{ ex.name }}</a></li>
              {% endif %}
            {% endfor %}
          </ul>
        </div>
        {% include expertise-related.html expertise_id='fullstack' %}
        {% include expertise-related-resources.html expertise_id='fullstack' %}
      </aside>
    </div>
  </div>
</section>

