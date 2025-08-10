---
layout: default
title: Boutique
permalink: /boutique/
description: "Découvrez nos modules et outils pour PrestaShop. Des solutions conçues pour optimiser votre boutique, améliorer l'expérience client et booster vos ventes."
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
        </div>
    </div>
</section>

<section class="section boutique-page-section">
    <div class="container">
        {% assign grouped_products = site.data.produits | group_by: "categorie" %}
        {% for group in grouped_products %}
        <div class="product-category-section">
            <div class="category-header">
                <h2 class="category-title">{{ group.name }}</h2>
                <span class="category-count">{{ group.items.size }} produits</span>
            </div>

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
                <div class="product-card" {% if is_course %}data-type="formation"{% endif %} {% if is_ebook %}data-type="ebook"{% endif %}>
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
    </div>
</section>
