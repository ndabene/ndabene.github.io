---
layout: default
title: E‑books et Formations (IA, PrestaShop, Développement)
permalink: /boutique/
description: "E‑books PDF pragmatiques et formations complémentaires pour progresser en IA, PrestaShop et développement. Téléchargement immédiat, contenus clairs et actionnables pour monter en compétence pas à pas."
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
        "url": "{{ site.url }}{{ site.baseurl }}/boutique/{{ product.nom | slugify }}/",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "{{ product.prix
            | replace: '€ / HT',''
            | replace: '/ HT',''
            | replace: '€ HT',''
            | replace: '€',''
            | replace: 'HT',''
            | strip }}",
          "url": "{{ product.lien_paiement }}",
          "availability": "{% if site.shop_enabled %}https://schema.org/InStock{% else %}https://schema.org/PreOrder{% endif %}"
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
        "url": "{{ site.url }}{{ site.baseurl }}/boutique/{{ product.nom | slugify }}/",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "{{ product.prix
            | replace: '€ / HT',''
            | replace: '/ HT',''
            | replace: '€ HT',''
            | replace: '€',''
            | replace: 'HT',''
            | strip }}",
          "url": "{{ product.lien_paiement }}",
          "availability": "{% if site.shop_enabled %}https://schema.org/InStock{% else %}https://schema.org/PreOrder{% endif %}"
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
        "url": "{{ site.url }}{{ site.baseurl }}/boutique/{{ product.nom | slugify }}/",
        "isAccessibleForFree": false,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "{{ product.prix
            | replace: '€ / HT',''
            | replace: '/ HT',''
            | replace: '€ HT',''
            | replace: '€',''
            | replace: 'HT',''
            | strip }}",
          "url": "{{ product.lien_paiement }}",
          "availability": "{% if site.shop_enabled %}https://schema.org/InStock{% else %}https://schema.org/PreOrder{% endif %}"
        }
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>

{%- comment -%} GEO/SEO: Collection overview for assistants {%- endcomment -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "{{ page.title | escape }}",
  "description": "{{ page.description | escape }}",
  "hasPart": [
    {% for product in site.data.produits %}
      {
        "@type": "ListItem",
        "name": "{{ product.nom | escape }}",
        "url": "{{ site.url }}{{ site.baseurl }}/boutique/{{ product.nom | slugify }}/"
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

{%- comment -%} Hero unique focalisé sur le pack (objectif: Voir le programme) {%- endcomment -%}
{% assign packs_hero_by_type = site.data.produits | where: 'type', 'pack' %}
{% assign packs_hero_by_cat = site.data.produits | where: 'categorie', 'Pack' %}
{% assign packs_hero_tmp = packs_hero_by_type | concat: packs_hero_by_cat %}
{% assign pack_featured = packs_hero_tmp | uniq | first %}
{% if pack_featured %}
<section class="boutique-hero" aria-label="Mise en avant pack">
  <div class="container">
    <div class="hero-banner">
      <img src="{{ '/' | append: pack_featured.image | replace: '//' , '/' | relative_url }}" alt="{{ pack_featured.nom }}">
      <div class="hero-caption">
        <h2>{{ pack_featured.nom }}</h2>
        <p>{{ pack_featured.description | truncate: 160 }}</p>
        <div class="hero-actions">
          {% if site.shop_enabled and pack_featured.programme_url %}
            <a class="btn-primary" href="{{ pack_featured.programme_url }}" target="_blank" rel="noopener">Voir le programme</a>
          {% else %}
            <span class="btn-primary disabled" aria-disabled="true">Programme bientôt</span>
          {% endif %}
          <span class="price-chip">{{ pack_featured.prix }}</span>
        </div>
      </div>
    </div>
    <div class="guarantee-strip" aria-label="Garanties">
      <div class="guarantee-item" role="text">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
        <span>Mises à jour incluses</span>
      </div>
      <div class="guarantee-item" role="text">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 1l7 4v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-4z"/></svg>
        <span>Support 48h</span>
      </div>
      <div class="guarantee-item" role="text">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="10" width="18" height="11" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
        <span>Paiement sécurisé</span>
      </div>
    </div>
  </div>
</section>
{% endif %}

<section class="section boutique-page-section">
    <div class="container">
        <section class="benefits-row" aria-label="Pourquoi ces e‑books et formations ?">
            <div class="benefit-box">
                <div class="benefit-icon-circle">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20l9-16H3l9 16z"/></svg>
                </div>
                <div class="benefit-body">
                    <h3>Actionnables tout de suite</h3>
                    <p>E‑books PDF et supports clairs, orientés résultats, avec méthodes, check‑lists et exemples prêts à l’emploi.</p>
                </div>
            </div>
            <div class="benefit-box">
                <div class="benefit-icon-circle">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg>
                </div>
                <div class="benefit-body">
                    <h3>Progresser par étapes</h3>
                    <p>Parcours simple: bases solides, impacts & bonnes pratiques, puis maîtrise des prompts et cas concrets.</p>
                </div>
            </div>
            <div class="benefit-box">
                <div class="benefit-icon-circle">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div class="benefit-body">
                    <h3>Support & mises à jour</h3>
                    <p>Mises à jour régulières et support efficace pour rester utiles (IA, PrestaShop, patterns de dev).</p>
                </div>
            </div>
        </section>
        {%- comment -%} Menu rapide dynamique (Univers / Catégories) {%- endcomment -%}
            {% assign univers_list = site.data.produits | map: 'univers' | compact | uniq | sort %}
            {% assign categories_list = site.data.produits | map: 'categorie' | compact | uniq | sort %}
            {% assign niveaux_list = site.data.produits | map: 'niveau' | compact | uniq | sort %}
            {%- comment -%}
              Normalise les formats en minuscules pour éviter les doublons (ex: "PDF" et "pdf")
            {%- endcomment -%}
            {% assign formats_from_format = site.data.produits | map: 'format' | compact | join: '|' | downcase | split: '|' %}
            {% assign formats_from_file = site.data.produits | map: 'file_format' | compact | join: '|' | downcase | split: '|' %}
            {% assign formats_list_tmp = formats_from_format | concat: formats_from_file %}
            {% assign formats_list = formats_list_tmp | uniq | sort %}
        <nav class="boutique-quick-nav" aria-label="Navigation rapide">
            {% if univers_list.size > 0 %}
            <div class="quick-nav-block quick-nav-univers">
                <span class="label">Univers</span>
                <button class="nav-chip filter-btn-modern active" data-univers="all">Tous</button>
                {% for u in univers_list %}
                  <button class="nav-chip filter-btn-modern" data-univers="{{ u }}">{{ u }}</button>
                {% endfor %}
            </div>
            {% endif %}

            {% if categories_list.size > 0 %}
            <div class="quick-nav-block quick-nav-categorie">
                <span class="label">Catégories</span>
                <button class="nav-chip filter-btn-modern" data-categorie="all">Toutes</button>
                {% for c in categories_list %}
                  <button class="nav-chip filter-btn-modern" data-categorie="{{ c }}">{{ c }}</button>
                {% endfor %}
            </div>
            {% endif %}

            {% if niveaux_list.size > 0 %}
            <div class="quick-nav-block quick-nav-niveau">
                <span class="label">Niveaux</span>
                <button class="nav-chip filter-btn-modern" data-niveau="all">Tous</button>
                {% for n in niveaux_list %}
                  <button class="nav-chip filter-btn-modern" data-niveau="{{ n }}">{{ n }}</button>
                {% endfor %}
            </div>
            {% endif %}

            {% if formats_list.size > 0 %}
            <div class="quick-nav-block quick-nav-format">
                <span class="label">Formats</span>
                <button class="nav-chip filter-btn-modern" data-format="all">Tous</button>
                {% for f in formats_list %}
                  <button class="nav-chip filter-btn-modern" data-format="{{ f }}">{{ f | upcase }}</button>
                {% endfor %}
            </div>
            {% endif %}

            <div class="quick-search">
                <input id="quick-search" type="search" placeholder="Rechercher (titre, mots‑clés)" aria-label="Rechercher" />
            </div>
        </nav>
        

        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Quand l’achat en ligne sera-t-il disponible ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "La boutique est en cours d’activation. Les achats seront ouverts dès la validation du prestataire de paiement. Vous pouvez déjà consulter les fiches et le programme des contenus."
              }
            },
            {
              "@type": "Question",
              "name": "Quels univers sont couverts ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Le catalogue s’organise par univers (IA, e‑commerce PrestaShop, développement, …). Chaque produit indique son univers et son niveau pour vous orienter rapidement."
              }
            },
            {
              "@type": "Question",
              "name": "Comment les contenus sont-ils mis à jour ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Les formations et e‑books sont maintenus et enrichis régulièrement afin de rester utiles et applicables. Le journal de mise à jour est mentionné sur chaque fiche."
              }
            }
          ]
        }
        </script>
        {% unless site.shop_enabled %}
        <div class="notice info" style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:1rem;margin-bottom:1rem;">
            <strong>Achat bientôt disponible.</strong>
            La boutique est en cours d’activation. Les formations et e‑books seront achetables prochainement. D’autres contenus sont en cours de rédaction.
        </div>
        {% endunless %}

        
        {% assign grouped_products = site.data.produits | group_by: "categorie" %}

        {%- comment -%} Section packs {%- endcomment -%}
{%- comment -%}
  Section packs dédiée retirée pour harmoniser l’affichage:
  les packs apparaissent maintenant dans la grille générale via les cartes standard.
{%- endcomment -%}

        
        {% for group in grouped_products %}
        <div class="product-category-section" id="{{ group.name | slugify }}">
            <div class="category-header">
                <h2 class="category-title">{{ group.name }}</h2>
                <span class="category-count">{{ group.items.size }} produit{% if group.items.size > 1 %}s{% endif %}</span>
            </div>

            <div class="product-grid">
                {%- assign cat_meta = site.data.boutique_categories | where: 'name', group.name | first -%}
                {% if cat_meta and cat_meta.description %}
                <div class="category-description">
                    {{ cat_meta.description }}
                </div>
                {% endif %}
                {% for product in group.items %}
                {% assign is_course = false %}
                {% assign is_ebook = false %}
                {% assign is_pack = false %}
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
                {% if product.type == 'pack' or product.categorie == 'Pack' %}
                  {% assign is_pack = true %}
                {% endif %}
                {% include product-card-formation.html product=product %}
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
<script src="{{ '/assets/js/boutique-modal.js' | relative_url }}" defer></script>

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

<section class="faq-section-inline" aria-label="FAQ Boutique">
  <div class="container">
    <h2>Questions fréquentes</h2>
    <div class="faq-grid-inline">
      <div class="faq-item-inline animate-item">
        <div class="faq-icon-inline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18v-6h6v6"></path><path d="M9 9V5h6v4"></path></svg>
        </div>
        <div class="faq-content-inline">
          <div class="faq-question-inline">Comment accéder à votre e‑book ou formation après l’achat&nbsp;?</div>
          <div class="faq-answer-inline"><p>Vous recevez immédiatement un e‑mail de confirmation contenant le lien d’accès et/ou de téléchargement. Conservez cet e‑mail pour retrouver vos contenus ultérieurement. En cas de difficulté, contactez le support via le <a href="/contact/">formulaire</a>.</p></div>
        </div>
      </div>

      <div class="faq-item-inline animate-item">
        <div class="faq-icon-inline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path></svg>
        </div>
        <div class="faq-content-inline">
          <div class="faq-question-inline">Quels univers sont couverts&nbsp;?</div>
          <div class="faq-answer-inline"><p>Le catalogue s’organise par univers (IA, e‑commerce PrestaShop, développement, …). Chaque produit indique son univers et son niveau pour vous orienter rapidement.</p></div>
        </div>
      </div>

      <div class="faq-item-inline animate-item">
        <div class="faq-icon-inline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v4H3z"></path><path d="M7 7v14"></path><path d="M17 7v14"></path></svg>
        </div>
        <div class="faq-content-inline">
          <div class="faq-question-inline">Comment les contenus sont-ils mis à jour&nbsp;?</div>
          <div class="faq-answer-inline"><p>Les formations et e‑books sont maintenus et enrichis régulièrement afin de rester utiles et applicables. Le journal de mise à jour est mentionné sur chaque fiche.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>
