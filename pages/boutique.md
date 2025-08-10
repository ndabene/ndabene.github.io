---
layout: default
title: Boutique
permalink: /boutique/
description: "Formations et e-books pour progresser en continu (IA, PrestaShop, développement…). Des contenus clairs, pragmatiques et tenus à jour pour monter en compétence pas à pas."
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {% for product in site.data.produits %}
      {
        "@type": "Product",
        "name": "{{ product.nom | escape }}",
        "description": "{{ product.description | escape }}",
        "image": "{{ site.url }}{{ site.baseurl }}/{{ product.image }}",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "{{ product.prix | remove: '€' | strip }}",
          "url": "{{ product.lien_paiement }}"
        },
        "brand": {
          "@type": "Brand",
          "name": "Presta Module"
        }
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>

{% comment %}
  JSON-LD pour les E-books (PDF)
{% endcomment %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {% assign ebooks_by_type = site.data.produits | where: 'type', 'ebook' %}
    {% assign ebooks_by_ff = site.data.produits | where: 'file_format', 'pdf' %}
    {% assign ebooks_by_format = site.data.produits | where: 'format', 'PDF' %}
    {% assign ebooks_tmp = ebooks_by_type | concat: ebooks_by_ff %}
    {% assign ebooks = ebooks_tmp | concat: ebooks_by_format | uniq %}
    {% for product in ebooks %}
      {
        "@type": "Book",
        "name": "{{ product.nom | escape }}",
        "description": "{{ product.description | escape }}",
        {% if product.author %}"author": { "@type": "Person", "name": "{{ product.author | escape }}" },{% endif %}
        "bookFormat": "EBook",
        {% if product.file_format %}"fileFormat": "application/{{ product.file_format | downcase }}",{% else %}"fileFormat": "application/pdf",{% endif %}
        {% if product.langue %}"inLanguage": "{{ product.langue }}",{% endif %}
        "image": "{{ site.url }}{{ site.baseurl }}/{{ product.image }}",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "{{ product.prix | remove: '€' | strip }}",
          "url": "{{ product.lien_paiement }}"
        }
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>

{% comment %}
  JSON-LD spécifique pour les Formations (Course)
  Généré séparément pour garder un JSON valide sans gérer les virgules complexes.
{% endcomment %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {% assign courses_by_type = site.data.produits | where: 'type', 'formation' %}
    {% assign courses_by_cat = site.data.produits | where: 'categorie', 'Formation en ligne' %}
    {% assign courses = courses_by_type | concat: courses_by_cat | uniq %}
    {% for product in courses %}
      {
        "@type": "Course",
        "name": "{{ product.nom | escape }}",
        "description": "{{ product.description | escape }}",
        "provider": {
          "@type": "Organization",
          "name": "{{ site.title | escape }}",
          "url": "{{ site.url }}"
        },
        "image": "{{ site.url }}{{ site.baseurl }}/{{ product.image }}",
        "isAccessibleForFree": false,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "{{ product.prix | remove: '€' | strip }}",
          "url": "{{ product.lien_paiement }}"
        }
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>

<section class="page-hero-section">
    <div class="container">
        <nav class="breadcrumb">
            <a href="/">Accueil</a>
            <span>{{ page.title }}</span>
        </nav>
        <div class="hero-content">
            <h1>{{ page.title }}</h1>
            <p class="section-description">{{ page.description }}</p>
            {% assign total_products = site.data.produits | size %}
            {% assign univers_all = site.data.produits | map: 'univers' | compact | uniq %}
            <p class="section-description" style="margin-top:.5rem;color:#475569;">
                Choisissez un univers (IA, e‑commerce PrestaShop, développement…) et explorez des ressources structurées par niveaux et thématiques. Objectif&nbsp;: apprendre vite, appliquer tout de suite.
            </p>
            
        </div>
    </div>
</section>

<section class="section boutique-page-section">
    <div class="container">
        <div class="boutique-filters" id="boutique-filters" aria-label="Filtres boutique">
            <div class="facets">
                {% assign categories = site.data.produits | map: 'categorie' | compact | uniq | sort %}
                {% if categories.size > 0 %}
                <div class="facet-group" data-facet="categorie">
                    <span class="facet-label">Catégorie:</span>
                    <button class="facet-button filter-btn-modern active" data-value="all">Toutes</button>
                    {% for c in categories %}
                    <button class="facet-button filter-btn-modern" data-value="{{ c | escape }}">{{ c }}</button>
                    {% endfor %}
                </div>
                {% endif %}
            </div>
            <input type="search" id="facet-search" class="facet-search" placeholder="Rechercher un produit (titre, mots-clés)" aria-label="Rechercher">
        </div>
        {% assign grouped_products = site.data.produits | group_by: "categorie" %}

        {% if grouped_products.size > 0 %}
        <nav class="boutique-filters" aria-label="Navigation catégories">
            <div class="facet-group">
                <span class="facet-label">Par catégorie:</span>
                {% for group in grouped_products %}
                <a class="facet-button filter-btn-modern" href="#{{ group.name | slugify }}">{{ group.name }}</a>
                {% endfor %}
            </div>
        </nav>
        {% endif %}
        {% for group in grouped_products %}
        <div class="product-category-section" id="{{ group.name | slugify }}">

            <div class="product-grid">
                {% for product in group.items %}
                {% assign is_course = false %}
                {% assign is_ebook = false %}
                {% if product.type == 'formation' %}
                  {% assign is_course = true %}
                {% endif %}
                {% if product.categorie == 'Formation en ligne' %}
                  {% assign is_course = true %}
                {% endif %}
                {% if product.type == 'ebook' %}
                  {% assign is_ebook = true %}
                {% endif %}
                {% if product.file_format == 'pdf' %}
                  {% assign is_ebook = true %}
                {% endif %}
                {% if product.format == 'PDF' %}
                  {% assign is_ebook = true %}
                {% endif %}
                <div class="product-card" {% if is_course %}data-type="formation"{% endif %} {% if is_ebook %}data-type="ebook"{% endif %} data-univers="{{ product.univers | default: '' }}" data-categorie="{{ product.categorie | default: '' }}" data-name="{{ product.nom | downcase }}">
                    {% if product.image %}
                    <div class="product-card-image">
                        <a href="/boutique/{{ product.nom | slugify }}/">
                            <img src="{{ site.baseurl }}/{{ product.image }}" alt="Image pour {{ product.nom }}">
                        </a>
                    </div>
                    {% endif %}
                    <div class="product-card-content">
                        <h3 class="product-title"><a href="/boutique/{{ product.nom | slugify }}/">{{ product.nom }}</a></h3>
                        <p class="product-description">{{ product.description | truncate: 120 }}</p>

                        {% if is_course %}
                        <ul class="course-meta">
                            {% if product.niveau %}<li class="badge">Niveau: {{ product.niveau }}</li>{% endif %}
                            {% if product.duree %}<li class="badge">Durée: {{ product.duree }}</li>{% endif %}
                            {% if product.format %}<li class="badge">Format: {{ product.format }}</li>{% endif %}
                            {% if product.langue %}<li class="badge">Langue: {{ product.langue }}</li>{% endif %}
                        </ul>
                        {% if product.programme_url %}
                        <div class="course-actions">
                            <a href="{{ product.programme_url }}" class="btn-outline" target="_blank" rel="noopener">Voir le programme</a>
                        </div>
                        {% endif %}
                        {% endif %}

                        {% if is_ebook %}
                        <ul class="ebook-meta">
                            {% if product.author %}<li class="badge">Auteur: {{ product.author }}</li>{% endif %}
                            <li class="badge">Format: {{ product.format | default: 'PDF' }}</li>
                            {% if product.pages %}<li class="badge">Pages: {{ product.pages }}</li>{% endif %}
                            {% if product.langue %}<li class="badge">Langue: {{ product.langue }}</li>{% endif %}
                        </ul>
                        {% endif %}
                    </div>
                    <div class="product-card-footer">
                        <span class="product-price">{{ product.prix }}</span>
                        {% if is_course %}
                          <a href="{{ product.lien_paiement }}" class="buy-btn" target="_blank" rel="noopener">S'inscrire</a>
                        {% elsif is_ebook %}
                          <a href="{{ product.lien_paiement }}" class="buy-btn" target="_blank" rel="noopener">Acheter le PDF</a>
                        {% else %}
                          <a href="{{ product.lien_paiement }}" class="buy-btn" target="_blank" rel="noopener">Acheter</a>
                        {% endif %}
                    </div>
                </div>
                {% endfor %}
            </div>
        </div>
        {% endfor %}

        <div id="no-results" class="no-results" style="display:none;">Aucun produit ne correspond à vos filtres.</div>

        <div style="text-align:center; margin-top:1rem;">
            <button id="load-more" class="facet-button filter-btn-modern" style="display:none;">Charger plus</button>
        </div>
    </div>
</section>

<script src="{{ '/assets/js/boutique-filters.js' | relative_url }}" defer></script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Accueil", "item": "{{ site.url }}{{ site.baseurl }}/"},
    {"@type": "ListItem", "position": 2, "name": "Boutique", "item": "{{ site.url }}{{ site.baseurl }}/boutique/"}
  ]
}
</script>
