---
layout: default
title: E-books and Training (AI, PrestaShop, Development)
permalink: /en/shop/
lang: en
alternates:
  - lang: fr
    url: /boutique/
description: "Practical PDF e-books and complementary training courses to progress
  in AI, PrestaShop and development. Instant download, clear and actionable content
  to level up step by step."
body_class: page-boutique

# SEO & Social Media Optimization
image: /assets/images/produits/boutique-og-image.jpg
og_type: website
twitter_card: summary_large_image

# Generative Engine Optimization (GEO)
ai_intent: discover_and_purchase_training
ai_primary_action: buy_training
ai_topics: [AI, PrestaShop, Development, Training, E-book, learning, skills]
ai_audience: [developers, teachers, tech professionals, entrepreneurs]
ai_benefits: [instant download, actionable content, rapid skill development, various formats]
llm_summary: |
  Nicolas Dabène's online shop offering PDF e-books and training courses
  in the fields of Artificial Intelligence, PrestaShop and web development.
  All content is practical, instantly downloadable and actionable.
  Available formats: PDF, Podcast, tool sheets. 14-day money-back guarantee.
llm_topics: [ebooks, training, ai, artificial intelligence, prestashop, ecommerce, web development, online learning]
llm_context: |
  This page presents Nicolas Dabène's complete training product catalog.
  Products are organized by universe (AI, PrestaShop, Development) and levels (beginner, intermediate, advanced).
  Each product includes a detailed description, program, expected results and price in euros excluding tax.
  Payment is secured via Lemon Squeezy. Customer support available within 48h.
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
          {% if product.garantie %}"warranty": "{{ product.garantie }} money-back guarantee",{% endif %}
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
          "audienceType": "{% if product.niveau %}{{ product.niveau }}{% else %}All levels{% endif %}"
        },
        {% if product.resultats %}"teaches": [
          {% for resultat in product.resultats %}
            "{{ resultat | escape }}"{% unless forloop.last %},{% endunless %}
          {% endfor %}
        ]{% endif %}
      }{% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  ]
}
</script>

{% comment %}
  JSON-LD for E-books (PDF) - Optimized GEO/VEO
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
          {% if product.garantie %}"warranty": "{{ product.garantie }} money-back guarantee",{% endif %}
          "seller": {
            "@type": "Person",
            "name": "Nicolas Dabène"
          }
        },
        {% if product.resultats or product.micro_extraits %}"educationalUse": "Professional and personal learning",{% endif %}
        {% if product.niveau %}"audience": {
          "@type": "EducationalAudience",
          "educationalRole": "{% if product.niveau %}{{ product.niveau }}{% else %}All levels{% endif %}"
        },{% endif %}
        "learningResourceType": "PDF E-book"
      }{% unless forloop.last %},{% endunless %}
      {% endif %}
    {% endfor %}
  ]
}
</script>

{% comment %}
  JSON-LD specific for Training (Course) - Optimized GEO/VEO
  Generated separately to keep valid JSON without managing complex commas.
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
        {% if product.resultats %}"coursePrerequisites": "No technical prerequisites",
        "teaches": [
          {% for resultat in product.resultats %}
            "{{ resultat | escape }}"{% unless forloop.last %},{% endunless %}
          {% endfor %}
        ],{% endif %}
        "learningResourceType": "Online training",
        "educationalCredentialAwarded": "Completion certificate",
        {% if product.last_update %}"dateModified": "{{ product.last_update }}",{% endif %}
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "courseWorkload": "{% if product.duree %}{{ product.duree }}{% else %}At your own pace{% endif %}"
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
          {% if product.garantie %}"warranty": "{{ product.garantie }} money-back guarantee",{% endif %}
          "seller": {
            "@type": "Person",
            "name": "Nicolas Dabène"
          },
          "validFrom": "{{ 'now' | date: '%Y-%m-%d' }}"
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
  "url": "{{ site.url }}{{ site.baseurl }}/en/shop/",
  "image": {
    "@type": "ImageObject",
    "url": "{{ site.url }}{{ site.baseurl }}/assets/images/produits/boutique-og-image.jpg",
    "width": "1200",
    "height": "630"
  },
  "inLanguage": "en-US",
  "isPartOf": {
    "@type": "WebSite",
    "name": "{{ site.title | escape }}",
    "url": "{{ site.url }}"
  },
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": "{% assign active_count = 0 %}{% for p in site.data.produits %}{% assign is_inactive = false %}{% if p.actif == false or p.active == false or p.enabled == false or p.status == 'inactive' %}{% assign is_inactive = true %}{% endif %}{% if is_inactive == false %}{% assign active_count = active_count | plus: 1 %}{% endif %}{% endfor %}{{ active_count }}",
    "itemListElement": [
      {% for product in site.data.produits %}
      {% assign is_inactive = false %}
      {% if product.actif == false or product.active == false or product.enabled == false or product.status == 'inactive' %}{% assign is_inactive = true %}{% endif %}
      {% if is_inactive == false %}
      {
        "@type": "ListItem",
        "position": {{ forloop.index }},
        "name": "{{ product.nom | escape }}",
        "url": "{{ site.url }}{{ site.baseurl }}/boutique/{{ product.nom | slugify }}/",
        "description": "{{ product.description | truncate: 150 | escape }}",
        "image": "{{ site.url }}{{ site.baseurl }}/{{ product.image }}"
      }{% unless forloop.last %},{% endunless %}
      {% endif %}
      {% endfor %}
    ]
  },
  "specialty": ["Artificial Intelligence", "PrestaShop", "Web Development", "E-commerce"],
  "audience": {
    "@type": "Audience",
    "audienceType": "Tech professionals, developers, teachers, entrepreneurs"
  }
}
</script>

{%- comment -%} WebSite schema with SearchAction for GEO {%- endcomment -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{ site.title | escape }} - Shop",
  "url": "{{ site.url }}{{ site.baseurl }}/en/shop/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "{{ site.url }}{{ site.baseurl }}/en/shop/?q={search_term_string}"
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
            <a href="/en/">Home</a>
            <span>{{ page.title }}</span>
        </nav>
        <div class="hero-content">
            <h1>{{ page.title }}</h1>
            <p class="section-description">{{ page.description }}</p>
            {% assign total_products = site.data.produits | size %}
            {% assign univers_all = site.data.produits | map: 'univers' | compact | uniq %}
            <p class="section-description" style="margin-top:.5rem;color:#475569;">
                Choose a universe (AI, PrestaShop e-commerce, development...) and explore resources structured by levels and themes. Objective: learn fast, apply immediately.
            </p>

        </div>
    </div>
</section>

{%- comment -%} Hero pack removed to lighten the shop page {%- endcomment -%}

<section class="section boutique-page-section">
    <div class="container">
        <!-- Benefits section removed: content moved to top -->
        {%- comment -%} Quick dynamic menu (Universe / Categories) {%- endcomment -%}
            {% assign univers_list = site.data.produits | map: 'univers' | compact | uniq | sort %}
            {% assign categories_list = site.data.produits | map: 'categorie' | compact | uniq | sort %}
            {% assign niveaux_list = site.data.produits | map: 'niveau' | compact | uniq | sort %}
            {%- comment -%} Build formats list without using map (avoids errors if an item is invalid) {%- endcomment -%}
            {% assign formats_concat = '' %}
            {% for pr in site.data.produits %}
              {% if pr.format %}{% assign formats_concat = formats_concat | append: pr.format | append: '|' %}{% endif %}
              {% if pr.file_format %}{% assign formats_concat = formats_concat | append: pr.file_format | append: '|' %}{% endif %}
            {% endfor %}
            {% assign formats_list = formats_concat | downcase | split: '|' | uniq | sort %}
        <div class="shop-layout">
          <aside class="shop-sidebar">
            <nav class="boutique-quick-nav" aria-label="Filters">
            {% if univers_list.size > 0 %}
            <div class="quick-nav-block quick-nav-univers">
                <span class="label">Universe</span>
                <button class="nav-chip active" data-univers="all">All</button>
                {% for u in univers_list %}
                  <button class="nav-chip" data-univers="{{ u }}">{{ u }}</button>
                {% endfor %}
            </div>
            {% endif %}

            {% if categories_list.size > 0 %}
            <div class="quick-nav-block quick-nav-categorie">
                <span class="label">Categories</span>
                <button class="nav-chip" data-categorie="all">All</button>
                {% for c in categories_list %}
                  <button class="nav-chip" data-categorie="{{ c }}">{{ c }}</button>
                {% endfor %}
            </div>
            {% endif %}

            {% if niveaux_list.size > 0 %}
            <div class="quick-nav-block quick-nav-niveau">
                <span class="label">Levels</span>
                <button class="nav-chip" data-niveau="all">All</button>
                {% for n in niveaux_list %}
                  <button class="nav-chip" data-niveau="{{ n }}">{{ n }}</button>
                {% endfor %}
            </div>
            {% endif %}

            {% if formats_list.size > 0 %}
            <div class="quick-nav-block quick-nav-format">
                <span class="label">Formats</span>
                <button class="nav-chip" data-format="all">All</button>
                {% for f in formats_list %}
                  <button class="nav-chip" data-format="{{ f }}">{{ f | upcase }}</button>
                {% endfor %}
            </div>
            {% endif %}

            <div class="quick-search">
                <button id="clear-filters" class="nav-chip reset" type="button" title="Reset">Reset</button>
            </div>
            </nav>
          </aside>
          <main class="shop-main">
            <div class="results-summary">
              <span id="results-count" class="results-count">0 result</span>
            </div>

        <div class="active-filters" id="active-filters" aria-live="polite"></div>


        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "When will online purchase be available?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The shop is being activated. Purchases will open as soon as the payment provider validates. You can already browse the product sheets and program content."
              }
            },
            {
              "@type": "Question",
              "name": "What universes are covered?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The catalog is organized by universe (AI, PrestaShop e-commerce, development, ...). Each product indicates its universe and level to guide you quickly."
              }
            },
            {
              "@type": "Question",
              "name": "How is content updated?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Training courses and e-books are regularly maintained and enriched to remain useful and applicable. The update log is mentioned on each product sheet."
              }
            }
          ]
        }
        </script>
        {% unless site.shop_enabled %}
        <div class="notice info" style="margin-top:1rem;border:1px solid #e5e7eb;border-radius:10px;padding:1rem;margin-bottom:1rem;">
            <strong>Purchase available soon.</strong>
            The shop is being activated. Training courses and e-books will be purchasable soon. Other content is being written.
        </div>
        {% endunless %}


        {% assign grouped_products = site.data.produits | group_by: "categorie" %}

        {%- comment -%} Packs section {%- endcomment -%}
{%- comment -%}
  Dedicated packs section removed to harmonize display:
  packs now appear in the general grid via standard cards.
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

        <div id="no-results" class="no-results" style="display:none;">No products match your filters.</div>

        <div style="text-align:center; margin-top:1rem;">
            <button id="load-more" class="facet-button filter-btn-modern" style="display:none;">Load more</button>
        </div>
    </div>
</section>

<!-- Sticky mobile bar for quick access to filters -->
<div class="sticky-shopbar show-on-mobile is-hidden" role="navigation" aria-label="Quick shop access" id="shopbar">
  <a href="#" class="btn-secondary" id="jump-to-filters">Filters</a>
  <a href="#top" class="btn-primary" id="jump-to-top">Top</a>
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
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "{{ site.url }}{{ site.baseurl }}/en/"},
    {"@type": "ListItem", "position": 2, "name": "Shop", "item": "{{ site.url }}{{ site.baseurl }}/en/shop/"}
  ]
}
</script>

<section class="faq-section-blog" aria-label="FAQ Shop">
  <div class="faq-container">
    <h2>Frequently Asked Questions</h2>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-question">How to access your e-book or training after purchase?</div>
        <div class="faq-answer">After secure payment, you immediately receive a confirmation email with your access/download link. Keep it, it remains active. Need help? <strong>Response within 48h</strong> via the <a href="/en/contact/">contact form</a>.</div>
      </div>

      <div class="faq-item">
        <div class="faq-question">What universes are covered?</div>
        <div class="faq-answer">Our content is organized by universe (AI, PrestaShop, development). Each sheet displays <strong>universe, level, duration and format</strong> to guide you quickly.</div>
      </div>

      <div class="faq-item">
        <div class="faq-question">How is content updated?</div>
        <div class="faq-answer">We publish regular updates to remain useful and applicable. The <strong>update date</strong> is visible on each sheet.</div>
      </div>

      <div class="faq-item">
        <div class="faq-question">Can I start right away?</div>
        <div class="faq-answer">Yes. Content is <strong>immediately actionable</strong>: clear materials, ready-to-use methods and checklists to progress step by step.</div>
      </div>
    </div>
  </div>
</section>
