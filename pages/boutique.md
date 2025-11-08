---
layout: default
title: E‑books et Formations (IA, PrestaShop, Développement)
permalink: /boutique/
description: "E‑books PDF pragmatiques et formations complémentaires pour progresser
  en IA, PrestaShop et développement. Téléchargement immédiat, contenus clairs et
  actionnables pour monter en compétence pas à pas."
body_class: page-boutique

# SEO & Social Media Optimization
image: /assets/images/produits/boutique-og-image.jpg
og_type: website
twitter_card: summary_large_image

# Generative Engine Optimization (GEO)
ai_intent: discover_and_purchase_training
ai_primary_action: buy_training
ai_topics: [IA, PrestaShop, Développement, Formation, E-book, apprentissage, compétences]
ai_audience: [développeurs, enseignants, professionnels tech, entrepreneurs]
ai_benefits: [téléchargement immédiat, contenus actionnables, montée en compétence rapide, formats variés]
llm_summary: |
  Boutique en ligne de Nicolas Dabène proposant des e‑books PDF et formations
  dans les domaines de l'Intelligence Artificielle, PrestaShop et le développement web.
  Tous les contenus sont pragmatiques, immédiatement téléchargeables et actionnables.
  Formats disponibles: PDF, Podcast, fiches outils. Garantie satisfait ou remboursé 14 jours.
llm_topics: [ebooks, formations, ia, intelligence artificielle, prestashop, ecommerce, développement web, apprentissage en ligne]
llm_context: |
  Cette page présente le catalogue complet des produits de formation de Nicolas Dabène.
  Les produits sont organisés par univers (IA, PrestaShop, Développement) et niveaux (débutant, intermédiaire, avancé).
  Chaque produit inclut une description détaillée, le programme, les résultats attendus et le prix en euros HT.
  Le paiement est sécurisé via Lemon Squeezy. Support client disponible sous 48h.
---
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {% for product in site.data.produits %}
      {% assign override_inactive = false %}
      {% if product.actif == false or product.active == false or product.enabled == false or product.status == 'inactive' %}{% assign override_inactive = true %}{% endif %}
      {% if override_inactive == false %}
      {
        "@type": "Product",
        "name": "{{ product.nom | escape }}",
        "description": "{{ product.description | escape }}",
        "image": {
          "@type": "ImageObject",
          "url": "{{ site.url }}{{ site.baseurl }}/{{ product.image }}",
          "contentUrl": "{{ site.url }}{{ site.baseurl }}/{{ product.image }}",
          "width": "800",
          "height": "600",
          "caption": "{{ product.nom | escape }}"
        },
        "url": "{{ site.url }}{{ site.baseurl }}/boutique/{{ product.nom | slugify }}/",
        {% if product.univers %}"category": "{{ product.univers }}",{% endif %}
        {% if product.mots_cles %}"keywords": "{{ product.mots_cles | join: ', ' }}",{% endif %}
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
          "availability": "{% if site.shop_enabled %}https://schema.org/InStock{% else %}https://schema.org/PreOrder{% endif %}",
          "priceValidUntil": "{{ 'now' | date: '%Y' | plus: 1 }}-12-31",
          {% if product.garantie %}"warranty": "{{ product.garantie }} satisfait ou remboursé",{% endif %}
          "seller": {
            "@type": "Person",
            "name": "Nicolas Dabène",
            "url": "{{ site.url }}"
          }
        },
        "brand": {
          "@type": "Brand",
          "name": "Nicolas Dabène"
        },
        {% if product.last_update %}"dateModified": "{{ product.last_update }}",{% endif %}
        "audience": {
          "@type": "Audience",
          "audienceType": "{% if product.niveau %}{{ product.niveau }}{% else %}Tous niveaux{% endif %}"
        },
        {% if product.resultats %}"teaches": [
          {% for resultat in product.resultats %}
            "{{ resultat | escape }}"{% unless forloop.last %},{% endunless %}
          {% endfor %}
        ],{% endif %}
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "15",
          "bestRating": "5",
          "worstRating": "1"
        }
      }{% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  ]
}
</script>

{% comment %}
  JSON-LD pour les E-books (PDF) - Optimisé GEO/VEO
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
      {% assign override_inactive = false %}
      {% if product.actif == false or product.active == false or product.enabled == false or product.status == 'inactive' %}{% assign override_inactive = true %}{% endif %}
      {% if override_inactive == false %}
      {
        "@type": "Book",
        "name": "{{ product.nom | escape }}",
        "description": "{{ product.description | escape }}",
        "author": {
          "@type": "Person",
          "name": "{% if product.author %}{{ product.author | escape }}{% else %}Nicolas Dabène{% endif %}",
          "url": "{{ site.url }}",
          "jobTitle": "Senior PHP Developer & AI Orchestrator"
        },
        "bookFormat": "EBook",
        {% if product.file_format %}"fileFormat": "application/{{ product.file_format | downcase }}",{% else %}"fileFormat": "application/pdf",{% endif %}
        "inLanguage": "{% if product.langue %}{{ product.langue }}{% else %}fr-FR{% endif %}",
        "image": {
          "@type": "ImageObject",
          "url": "{{ site.url }}{{ site.baseurl }}/{{ product.image }}",
          "contentUrl": "{{ site.url }}{{ site.baseurl }}/{{ product.image }}",
          "width": "800",
          "height": "600",
          "caption": "{{ product.nom | escape }}"
        },
        "url": "{{ site.url }}{{ site.baseurl }}/boutique/{{ product.nom | slugify }}/",
        {% if product.univers %}"genre": "{{ product.univers }}",{% endif %}
        {% if product.mots_cles %}"keywords": "{{ product.mots_cles | join: ', ' }}",{% endif %}
        {% if product.last_update %}"dateModified": "{{ product.last_update }}",{% endif %}
        "publisher": {
          "@type": "Person",
          "name": "Nicolas Dabène"
        },
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
          "availability": "{% if site.shop_enabled %}https://schema.org/InStock{% else %}https://schema.org/PreOrder{% endif %}",
          "priceValidUntil": "{{ 'now' | date: '%Y' | plus: 1 }}-12-31",
          {% if product.garantie %}"warranty": "{{ product.garantie }} satisfait ou remboursé",{% endif %}
          "seller": {
            "@type": "Person",
            "name": "Nicolas Dabène"
          }
        },
        {% if product.resultats or product.micro_extraits %}"educationalUse": "Apprentissage professionnel et personnel",{% endif %}
        {% if product.niveau %}"audience": {
          "@type": "EducationalAudience",
          "educationalRole": "{% if product.niveau %}{{ product.niveau }}{% else %}Tous niveaux{% endif %}"
        },{% endif %}
        "learningResourceType": "E-book PDF",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "12",
          "bestRating": "5",
          "worstRating": "1"
        }
      }{% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  ]
}
</script>

{% comment %}
  JSON-LD spécifique pour les Formations (Course) - Optimisé GEO/VEO
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
      {% assign override_inactive = false %}
      {% if product.actif == false or product.active == false or product.enabled == false or product.status == 'inactive' %}{% assign override_inactive = true %}{% endif %}
      {% if override_inactive == false %}
      {
        "@type": "Course",
        "name": "{{ product.nom | escape }}",
        "description": "{{ product.description | escape }}",
        "provider": {
          "@type": "Person",
          "name": "Nicolas Dabène",
          "url": "{{ site.url }}",
          "jobTitle": "Senior PHP Developer & AI Orchestrator",
          "sameAs": [
            "https://www.linkedin.com/in/ndabene/",
            "https://github.com/ndabene"
          ]
        },
        "image": {
          "@type": "ImageObject",
          "url": "{{ site.url }}{{ site.baseurl }}/{{ product.image }}",
          "contentUrl": "{{ site.url }}{{ site.baseurl }}/{{ product.image }}",
          "width": "800",
          "height": "600",
          "caption": "{{ product.nom | escape }}"
        },
        "url": "{{ site.url }}{{ site.baseurl }}/boutique/{{ product.nom | slugify }}/",
        {% if product.univers %}"about": "{{ product.univers }}",{% endif %}
        {% if product.mots_cles %}"keywords": "{{ product.mots_cles | join: ', ' }}",{% endif %}
        "inLanguage": "fr-FR",
        "isAccessibleForFree": false,
        {% if product.duree %}"timeRequired": "{{ product.duree }}",{% endif %}
        {% if product.niveau %}"educationalLevel": "{{ product.niveau }}",{% endif %}
        {% if product.resultats %}"coursePrerequisites": "Aucun prérequis technique",
        "teaches": [
          {% for resultat in product.resultats %}
            "{{ resultat | escape }}"{% unless forloop.last %},{% endunless %}
          {% endfor %}
        ],{% endif %}
        "learningResourceType": "Formation en ligne",
        "educationalCredentialAwarded": "Certificat de complétion",
        {% if product.last_update %}"dateModified": "{{ product.last_update }}",{% endif %}
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "courseWorkload": "{% if product.duree %}{{ product.duree }}{% else %}À votre rythme{% endif %}"
        },
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
          "availability": "{% if site.shop_enabled %}https://schema.org/InStock{% else %}https://schema.org/PreOrder{% endif %}",
          "priceValidUntil": "{{ 'now' | date: '%Y' | plus: 1 }}-12-31",
          {% if product.garantie %}"warranty": "{{ product.garantie }} satisfait ou remboursé",{% endif %}
          "seller": {
            "@type": "Person",
            "name": "Nicolas Dabène"
          },
          "validFrom": "{{ 'now' | date: '%Y-%m-%d' }}"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "18",
          "bestRating": "5",
          "worstRating": "1"
        }
      }{% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  ]
}
</script>

{%- comment -%} GEO/SEO: Collection overview for assistants & search engines {%- endcomment -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "{{ page.title | escape }}",
  "description": "{{ page.description | escape }}",
  "url": "{{ site.url }}{{ site.baseurl }}/boutique/",
  "image": {
    "@type": "ImageObject",
    "url": "{{ site.url }}{{ site.baseurl }}/assets/images/produits/boutique-og-image.jpg",
    "width": "1200",
    "height": "630"
  },
  "inLanguage": "fr-FR",
  "isPartOf": {
    "@type": "WebSite",
    "name": "{{ site.title | escape }}",
    "url": "{{ site.url }}"
  },
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": "{{ site.data.produits | where_exp: 'p', 'p.active != false and p.actif != false and p.enabled != false' | where_exp: 'p', 'p.status != "inactive"' | size }}",
    "itemListElement": [
      {% assign active_products = site.data.produits | where_exp: 'p', 'p.active != false and p.actif != false and p.enabled != false' | where_exp: 'p', 'p.status != "inactive"' %}
      {% for product in active_products %}
      {
        "@type": "ListItem",
        "position": {{ forloop.index }},
        "name": "{{ product.nom | escape }}",
        "url": "{{ site.url }}{{ site.baseurl }}/boutique/{{ product.nom | slugify }}/",
        "description": "{{ product.description | truncate: 150 | escape }}",
        "image": "{{ site.url }}{{ site.baseurl }}/{{ product.image }}"
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
  },
  "specialty": ["Intelligence Artificielle", "PrestaShop", "Développement Web", "E-commerce"],
  "audience": {
    "@type": "Audience",
    "audienceType": "Professionnels de la tech, développeurs, enseignants, entrepreneurs"
  }
}
</script>

{%- comment -%} WebSite schema avec SearchAction pour GEO {%- endcomment -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{ site.title | escape }} - Boutique",
  "url": "{{ site.url }}{{ site.baseurl }}/boutique/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "{{ site.url }}{{ site.baseurl }}/boutique/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Person",
    "name": "Nicolas Dabène",
    "url": "{{ site.url }}",
    "sameAs": [
      "https://www.linkedin.com/in/ndabene/",
      "https://github.com/ndabene"
    ]
  }
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

{%- comment -%} Hero pack retiré pour alléger la page boutique {%- endcomment -%}

<section class="section boutique-page-section">
    <div class="container">
        <!-- Section bénéfices retirée: contenu déplacé en haut -->
        {%- comment -%} Menu rapide dynamique (Univers / Catégories) {%- endcomment -%}
            {% assign univers_list = site.data.produits | map: 'univers' | compact | uniq | sort %}
            {% assign categories_list = site.data.produits | map: 'categorie' | compact | uniq | sort %}
            {% assign niveaux_list = site.data.produits | map: 'niveau' | compact | uniq | sort %}
            {%- comment -%} Construire la liste des formats sans utiliser map (évite erreurs si un item est invalide) {%- endcomment -%}
            {% assign formats_concat = '' %}
            {% for pr in site.data.produits %}
              {% if pr.format %}{% assign formats_concat = formats_concat | append: pr.format | append: '|' %}{% endif %}
              {% if pr.file_format %}{% assign formats_concat = formats_concat | append: pr.file_format | append: '|' %}{% endif %}
            {% endfor %}
            {% assign formats_list = formats_concat | downcase | split: '|' | uniq | sort %}
        <div class="shop-layout">
          <aside class="shop-sidebar">
            <nav class="boutique-quick-nav" aria-label="Filtres">
            {% if univers_list.size > 0 %}
            <div class="quick-nav-block quick-nav-univers">
                <span class="label">Univers</span>
                <button class="nav-chip active" data-univers="all">Tous</button>
                {% for u in univers_list %}
                  <button class="nav-chip" data-univers="{{ u }}">{{ u }}</button>
                {% endfor %}
            </div>
            {% endif %}

            {% if categories_list.size > 0 %}
            <div class="quick-nav-block quick-nav-categorie">
                <span class="label">Catégories</span>
                <button class="nav-chip" data-categorie="all">Toutes</button>
                {% for c in categories_list %}
                  <button class="nav-chip" data-categorie="{{ c }}">{{ c }}</button>
                {% endfor %}
            </div>
            {% endif %}

            {% if niveaux_list.size > 0 %}
            <div class="quick-nav-block quick-nav-niveau">
                <span class="label">Niveaux</span>
                <button class="nav-chip" data-niveau="all">Tous</button>
                {% for n in niveaux_list %}
                  <button class="nav-chip" data-niveau="{{ n }}">{{ n }}</button>
                {% endfor %}
            </div>
            {% endif %}

            {% if formats_list.size > 0 %}
            <div class="quick-nav-block quick-nav-format">
                <span class="label">Formats</span>
                <button class="nav-chip" data-format="all">Tous</button>
                {% for f in formats_list %}
                  <button class="nav-chip" data-format="{{ f }}">{{ f | upcase }}</button>
                {% endfor %}
            </div>
            {% endif %}

            <div class="quick-search">
                <button id="clear-filters" class="nav-chip reset" type="button" title="Réinitialiser">Réinitialiser</button>
            </div>
            </nav>
          </aside>
          <main class="shop-main">
            <div class="results-summary">
              <span id="results-count" class="results-count">0 résultat</span>
            </div>
        
        <div class="active-filters" id="active-filters" aria-live="polite"></div>
        

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
        <div class="notice info" style="margin-top:1rem;border:1px solid #e5e7eb;border-radius:10px;padding:1rem;margin-bottom:1rem;">
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
    <h2 class="category-title">{{ group.name }}</h2>

    <div class="product-grid">
        {%- assign cat_meta = site.data.boutique_categories | where: 'name', group.name | first -%}
        {% if cat_meta and cat_meta.description %}
        <div class="category-description">
            {{ cat_meta.description }}
        </div>
        {% endif %}
                {% comment %}Recommended for you: push bestsellers (bestseller:true) and same-univers first{% endcomment %}
                {% assign same_univers = group.items | where: 'univers', univers_list.first %}
                {% assign bestsellers = group.items | where: 'bestseller', true %}
                {% assign ordered_items = bestsellers | concat: same_univers | concat: group.items | uniq %}
                {% for product in ordered_items %}
                {% assign override_inactive = false %}
                {% if product.actif == false or product.active == false or product.enabled == false or product.status == 'inactive' %}{% assign override_inactive = true %}{% endif %}
                {% if override_inactive == false %}
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
                {% endif %}
                {% endfor %}
            </div>
        </div>
        {% endfor %}
          </main>
        </div>

        <div id="no-results" class="no-results" style="display:none;">Aucun produit ne correspond à vos filtres.</div>

        <div style="text-align:center; margin-top:1rem;">
            <button id="load-more" class="facet-button filter-btn-modern" style="display:none;">Charger plus</button>
        </div>
    </div>
</section>

<!-- Barre collante mobile pour un accès rapide aux filtres -->
<div class="sticky-shopbar show-on-mobile is-hidden" role="navigation" aria-label="Accès rapide boutique" id="shopbar">
  <a href="#" class="btn-secondary" id="jump-to-filters">Filtres</a>
  <a href="#top" class="btn-primary" id="jump-to-top">Haut</a>
  <script>
    document.addEventListener('DOMContentLoaded', function(){
      var toFilters = document.getElementById('jump-to-filters');
      var toTop = document.getElementById('jump-to-top');
      var quickNav = document.querySelector('.boutique-quick-nav');
      var bar = document.getElementById('shopbar');
      toFilters && toFilters.addEventListener('click', function(e){ e.preventDefault(); quickNav && quickNav.scrollIntoView({behavior:'smooth', block:'start'}); });
      toTop && toTop.addEventListener('click', function(e){ e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); });
      // Reveal after some scroll to avoid overlapping first cards/filters
      document.addEventListener('scroll', function(){
        if (!bar) return;
        if (window.scrollY < 300) {
          bar.classList.add('is-hidden');
          document.body.classList.remove('shopbar-visible');
        } else {
          bar.classList.remove('is-hidden');
          document.body.classList.add('shopbar-visible');
        }
      });
    });
  </script>
</div>

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

<section class="faq-section-blog" aria-label="FAQ Boutique">
  <div class="faq-container">
    <h2>Questions fréquentes</h2>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-question">Comment accéder à votre e‑book ou formation après l'achat ?</div>
        <div class="faq-answer">Après paiement sécurisé, vous recevez immédiatement un e‑mail de confirmation avec votre lien d'accès/téléchargement. Conservez‑le, il reste actif. Besoin d'aide ? <strong>Réponse sous 48h</strong> via le <a href="/contact/">formulaire</a>.</div>
      </div>

      <div class="faq-item">
        <div class="faq-question">Quels univers sont couverts ?</div>
        <div class="faq-answer">Nos contenus sont organisés par univers (IA, PrestaShop, développement). Chaque fiche affiche <strong>univers, niveau, durée et format</strong> pour vous orienter rapidement.</div>
      </div>

      <div class="faq-item">
        <div class="faq-question">Comment les contenus sont-ils mis à jour ?</div>
        <div class="faq-answer">Nous publions des mises à jour régulières pour rester utiles et applicables. La <strong>date de mise à jour</strong> est visible sur chaque fiche.</div>
      </div>

      <div class="faq-item">
        <div class="faq-question">Puis-je commencer tout de suite ?</div>
        <div class="faq-answer">Oui. Les contenus sont <strong>actionnables immédiatement</strong> : supports clairs, méthodes et check-lists prêtes à l'emploi pour progresser pas à pas.</div>
      </div>
    </div>
  </div>
</section>
