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
                <div class="product-card">
                    {% if product.image %}
                    <div class="product-card-image">
                        <img src="{{ site.baseurl }}/{{ product.image }}" alt="Image pour {{ product.nom }}">
                    </div>
                    {% endif %}
                    <div class="product-card-content">
                        <h3 class="product-title">{{ product.nom }}</h3>
                        <p class="product-description">{{ product.description | truncate: 120 }}</p>
                    </div>
                    <div class="product-card-footer">
                        <span class="product-price">{{ product.prix }}</span>
                        <a href="{{ product.lien_paiement }}" class="buy-btn" target="_blank">Acheter</a>
                    </div>
                </div>
                {% endfor %}
            </div>
        </div>
        {% endfor %}
    </div>
</section>
