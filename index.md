---
layout: default
title: "Nicolas Dabène - Senior PHP Developer & AI Orchestrator | Expert PrestaShop"
description: "15+ ans d'expérience en développement e-commerce. Modules PrestaShop, architecture e-commerce, AI-assisted development."
keywords: "senior php developer, prestashop expert, ai orchestrator, symfony, e-commerce architecture, php fullstack"
no_bg: true
body_class: homepage-modern
---

{% include home/hero.html %}

<div class="sticky-jump show-on-mobile" id="sticky-jump">
  <a href="#formations" class="btn-primary">Formations</a>
  <a href="#hero-ctas" class="btn-secondary">Haut</a>
</div>

{% include home/formations.html %}

{% include home/value_trilogy.html %}

{% include home/expertise.html %}

{% include home/achievements.html %}

{% include home/modules.html %}

{% include home/approach.html %}

{% include future-posts-data.html %}

{% include home/publications.html %}

{% include home/faq.html %}

<!-- SCRIPTS SPÉCIFIQUES -->
<script>
// Script pour l'expansion des cartes d'expertise
function expandExpertise(expertiseId) {
    const card = document.querySelector(`[data-id="${expertiseId}"]`);
    card.classList.toggle('expanded');
}

// Hide sticky jump near top to avoid overlapping important hero content
document.addEventListener('scroll', function(){
  var el = document.getElementById('sticky-jump');
  if(!el) return;
  if (window.scrollY < 250) el.classList.add('is-hidden');
  else el.classList.remove('is-hidden');
});
// Animation simple pour FAQ inline - pas d'animations complexes
</script>