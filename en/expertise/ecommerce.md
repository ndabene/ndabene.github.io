---
layout: page
title: E-commerce Expertise
permalink: /en/expertise/ecommerce/
lang: en
show_sidebar: false
llm_summary: "Expertise in e-commerce solutions and online store optimization."
llm_topics: [ecommerce, digital solutions]
---
{% assign exp = site.data.expertise | where: 'id', 'ecommerce' | first %}
<section class="expertise-detail">
  <div class="container">
    <div class="expertise-grid">
      <article class="expertise-card">
        <h3>What I do in e-commerce</h3>
        <p class="section-description">{{ exp.description }}</p>
        <h3>Key Skills</h3>
        <ul class="expertise-list-compact">
          {% for s in exp.skills %}
          <li>{{ s }}</li>
          {% endfor %}
        </ul>
        <div class="expertise-cta">
          <a class="btn btn--primary" href="{{ '/en/contact/' | relative_url }}">Contact me</a>
        </div>
      </article>
      <aside>
        <div class="expertise-card">
          <h3>Areas of Expertise</h3>
          {% assign ex_ids = 'prestashop,ecommerce,ai,fullstack,innovation' | split: ',' %}
          <ul class="expertise-list-compact">
            {% for ex in site.data.expertise %}
              {% if ex_ids contains ex.id %}
                <li><a href="{{ '/en/expertise/' | append: ex.id | downcase | append: '/' | relative_url }}" class="{% if page.url contains ex.id %}active{% endif %}">{{ ex.name }}</a></li>
              {% endif %}
            {% endfor %}
          </ul>
        </div>
        {% include expertise-related.html expertise_id='ecommerce' %}
        {% include expertise-related-resources.html expertise_id='ecommerce' %}
      </aside>
    </div>
  </div>
</section>
