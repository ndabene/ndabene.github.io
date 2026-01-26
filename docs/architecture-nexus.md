---
layout: architecture
title: "Technical Architecture: Nexus Design System"
status: Draft
version: 1.0
author: BMad Architect
date: 2026-01-22
prd_reference: docs/prd-design-rework.md
---

# Architecture Technique : Système Design Nexus

## 1. Principes Directeurs (Design Tokens)
Le système Nexus repose sur trois piliers techniques : **Layering (Couches)**, **Vibrance (Éclat)** et **Fluidity (Fluidité)**.

### 1.1 Palette Nexus (Variables SCSS)
Nous allons enrichir `_sass/variables.scss` avec des tokens de profondeur :
- `nexus-glass-heavy`: Flou prononcé pour les fonds de section.
- `nexus-glass-light`: Bordures et accents de surface.
- `nexus-gold-glow`: Effet d'illumination pour l'or.

## 2. Structure SCSS Modularisée
Pour éviter la pollution des fichiers actuels, nous allons introduire un dossier `_sass/nexus/` :

```
_sass/
├── nexus/
│   ├── _tokens.scss       # Nouvelles variables spécifiques
│   ├── _glass.scss        # Mixins de glassmorphism
│   ├── _hero-nexus.scss   # Refonte de la section Hero
│   ├── _cards-nexus.scss  # Refonte des cartes blog bento
│   └── _animations.scss   # Micro-animations Nexus
└── main.scss              # Import central
```

## 3. Stratégie d'Assets (AI-Driven)
Le PRD demande des visuels dynamiques. 
- **Outil** : `generate_image`.
- **Format** : WebP uniquement.
- **Naming** : `assets/images/nexus/hero-[category].webp`.

## 4. Composants JavaScript (Filtres & Interaction)
La logique de `assets/js/blog-filters.js` sera conservée mais l'aspect visuel des transitions sera délégué au CSS via des classes state-based :
- `.is-loading` -> `.is-visible` avec transition de fade-in glass.

## 5. Plan d'Implémentation (Technical Roadmap)

### Étape 1 : Fondations (Nexus Tokens)
- [ ] Injection des tokens dans `variables.scss`.
- [ ] Création du mixin `@mixin nexus-glass`.

### Étape 2 : Hero & Branding
- [ ] Génération des 3 assets majeurs pour la Hero Section via IA.
- [ ] Implémentation du nouveau layout Hero (Poppins Black + Glass Background).

### Étape 3 : Blog & Bento
- [ ] Application du style Nexus sur les `post-preview-news`.
- [ ] Optimisation mobile des effets de flou (utilisation de `will-change: transform, opacity`).

## 6. Performance & Optimisations
- **Critical CSS** : Les styles Nexus de la Hero seront inlinés.
- **Adaptive Blur** : Le `backdrop-filter` sera désactivé sur les appareils à faibles performances via `matchMedia`.

---
*Document produit par l'Architecte BMAD pour validation par Nikko.*
