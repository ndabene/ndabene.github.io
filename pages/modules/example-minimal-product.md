---
layout: product-landing
title: "CleanCart - Module PrestaShop Minimaliste"
permalink: /modules/example-minimal-product/
lang: fr
description: "Exemple de landing page avec un design minimaliste et épuré."

# Product data
product:
  name: "CleanCart"
  price: "29€"
  currency: "EUR"

# Navigation
nav_links:
  - text: "Fonctionnalités"
    href: "#features"
  - text: "Tarifs"
    href: "#pricing"

# Features
features:
  - icon: "fas fa-bolt"
    icon_color: "#111827"
    title: "Ultra Rapide"
    description: "Optimisé pour la vitesse avec un temps de chargement minimal."
  - icon: "fas fa-shield-alt"
    icon_color: "#111827"
    title: "Sécurisé"
    description: "Protection renforcée contre les vulnérabilités."
  - icon: "fas fa-mobile-alt"
    icon_color: "#111827"
    title: "Mobile First"
    description: "Design responsive optimisé pour tous les appareils."
  - icon: "fas fa-sync"
    icon_color: "#111827"
    title: "Mise à jour auto"
    description: "Toujours à jour sans intervention manuelle."
---

{% comment %}
  Exemple de landing page MINIMALISTE
  Design épuré, sobre, sans fioritures
  Parfait pour des produits simples et élégants
{% endcomment %}

<!-- Navigation Minimaliste -->
{% include landing-page/navigation.html
  product_name="CleanCart"
  nav_links=page.nav_links
  cta_text="Acheter"
  cta_url="#"
  style='minimal'
  sticky=false
%}

<!-- Hero Centré Minimaliste -->
{% include landing-page/hero.html
  layout='centered'
  theme='solid'
  title='Simple. Rapide. <span class="text-[#111827]">Efficace.</span>'
  subtitle="CleanCart est le module PrestaShop minimaliste qui ne fait qu'une chose : simplifier votre panier d'achat. Rien de plus, rien de moins."
  price="29€"
  price_period="Paiement unique"
  price_features=page.price_features
  cta_primary_text="Acheter maintenant"
  cta_primary_url="#"
  trust_badges=page.trust_badges
%}

<!-- Stats Bar Simple -->
<section class="py-12 border-y border-[#E2E8F0]">
    <div class="max-w-[1200px] mx-auto px-6 lg:px-4">
        <div class="grid grid-cols-3 gap-8 text-center">
            <div>
                <div class="text-3xl font-bold text-[#111827] mb-1">1.2kb</div>
                <div class="text-[#475569] text-sm">Poids du module</div>
            </div>
            <div>
                <div class="text-3xl font-bold text-[#111827] mb-1">0.01s</div>
                <div class="text-[#475569] text-sm">Temps de chargement</div>
            </div>
            <div>
                <div class="text-3xl font-bold text-[#111827] mb-1">100%</div>
                <div class="text-[#475569] text-sm">Compatible</div>
            </div>
        </div>
    </div>
</section>

<!-- Features Minimales (2 colonnes, style minimal) -->
{% include landing-page/features-grid.html
  title="Tout ce dont vous avez besoin"
  subtitle="Quatre fonctionnalités. Pas une de plus."
  features=page.features
  columns=2
  style='minimal'
  bg='white'
%}

<!-- Section Custom : Code Exemple -->
<section class="py-24 bg-[#FAFAFA]">
    <div class="max-w-[800px] mx-auto px-6 lg:px-4 text-center">
        <h2 class="text-2xl font-bold mb-4 text-[#111827]">Installation en 2 lignes</h2>
        <p class="text-[#475569] mb-8">Pas de configuration complexe. Juste ça :</p>
        <div class="bg-[#111827] text-white p-6 rounded font-mono text-sm text-left">
            <div class="text-[#6B7280]"># 1. Uploader le module</div>
            <div class="text-[#10B981]">$ prestashop install cleancart</div>
            <div class="text-[#6B7280] mt-4"># 2. Activer</div>
            <div class="text-[#10B981]">$ prestashop enable cleancart</div>
            <div class="text-[#6B7280] mt-4"># C'est tout ✓</div>
        </div>
    </div>
</section>

<!-- CTA Minimal (outlined style) -->
{% include landing-page/cta-section.html
  title="Prêt à simplifier ?"
  subtitle="Rejoignez les 500+ boutiques qui ont choisi la simplicité."
  price="29€"
  price_period="Paiement unique"
  cta_text="Acheter CleanCart"
  cta_url="#"
  cta_icon="fas fa-shopping-cart"
  style='outlined'
%}

<!-- Footer Minimal -->
<footer class="py-8 bg-white border-t border-[#E2E8F0]">
    <div class="max-w-[1200px] mx-auto px-6 lg:px-4">
        <div class="text-center text-[#6B7280] text-sm">
            <p>CleanCart © 2025 - Exemple de landing page minimaliste</p>
        </div>
    </div>
</footer>
