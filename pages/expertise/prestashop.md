---
layout: page
title: Expertise PrestaShop
permalink: /expertise/prestashop/
show_sidebar: false
llm_summary: "Expertise avancée sur la plateforme e-commerce PrestaShop."
llm_topics: [prestashop, ecommerce]
---
{% assign exp = site.data.expertise | where: 'id', 'prestashop' | first %}
<section class="expertise-detail">
  <div class="container">
    <div class="expertise-grid">
      <article class="expertise-card">
        <h3>Expertise PrestaShop</h3>
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
        {% include expertise-related.html expertise_id='prestashop' %}
        {% include expertise-related-resources.html expertise_id='prestashop' %}
      </aside>
    </div>
  </div>
</section>

