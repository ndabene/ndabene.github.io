---
layout: page
title: Innovation & Leadership Technique
permalink: /expertise/innovation/
show_sidebar: true
---

{% assign exp = site.data.expertise | where: 'id', 'innovation' | first %}
<section class="expertise-detail">
  <div class="container">
    <p class="section-description">{{ exp.description }}</p>

    <h3>Compétences clés</h3>
    <ul>
      {% for s in exp.skills %}
      <li>{{ s }}</li>
      {% endfor %}
    </ul>

    {% include expertise-related.html expertise_id='innovation' %}

    <div style="margin-top:1.25rem;">
      <a class="btn btn--primary" href="{{ '/contact/' | relative_url }}">Me contacter</a>
    </div>
  </div>
</section>

