---
layout: prd
title: "PRD: Rework Design 2026 - Nexus System"
status: Draft
version: 1.0
author: BMad PM
date: 2026-01-22
priority: High
target_branch: design
---

# PRD: Refonte Design Complète (Système Nexus)

## 1. Vision & Objectifs
Transformer l'interface actuelle du site `nicolas-dabene.fr` en une expérience numérique **premium, immersive et vivante**, tout en respectant l'autorité technique et l'expertise de Nicolas Dabène.

### Objectifs Principaux :
- **Modernité Absolue** : Adopter le style "Nexus" (Glassmorphism, profondeur, vibrance).
- **Engagement Visuel** : Utiliser des micro-animations et des transitions fluides.
- **Autorité & Prestige** : Conserver la palette "Deep Slate & Gold" pour l'aspect haut de gamme.
- **Performance de Pointe** : Atteindre un score Lighthouse > 90 sur mobile malgré les effets visuels.

## 2. Identité Visuelle (Système Nexus)

### 2.1 Esthétique & UI
- **Glassmorphism Généralisé** : 
    - Application sur TOUS les composants (cartes d'articles, barres de navigation, filtres, modales).
    - Propriétés : `backdrop-filter: blur(12px)`, `background: rgba(255, 255, 255, 0.05)`, bordures subtiles d'un pixel.
- **Palette de Couleurs (Nexus Deep Slate & Gold)** :
    - **Base** : Deep Slate (#0F172A) pour les fonds et structures.
    - **Accent** : Or (#D4AF37) pour les call-to-actions, badges techniques et accents de prestige.
    - **Surface** : Utilisation de dégradés profonds pour créer de la dimension.

### 2.2 Hero Section (Dynamic AI)
- **Concept** : Une section d'accueil "vivante".
- **Assets** : Utilisation d'images générées par IA (Antigravity/DALL-E) pour illustrer les expertises (PrestaShop, IA, Orchestration).
- **Interactivité** : Effets de parallaxe au survol et typographie dynamique (Poppins Black).

## 3. Spécifications Fonctionnelles & UX

### 3.1 Expérience Multicanale (Desktop & Mobile)
Le design doit être conçu **simultanément** pour les deux formats :
- **Desktop Immersif** : Utilisation de l'espace pour des grilles complexes (Bento Layout) et des effets de profondeur.
- **Mobile Fluide** : Navigation optimisée au pouce, réduction des poids d'images via WebP, et maintien du flou de verre (Glass) sans sacrifier les FPS.

### 3.2 Composants Clés à Refondre
1. **Blog (Grid & Filters)** :
    - Remplacement des cartes actuelles par des cartes Glassmorphism Nexus.
    - Animations au survol (Lift & Glow).
    - Filtres de catégories (`blog-filters.js`) intégrés de manière transparente dans l'interface.
2. **Navigation** :
    - Barre de navigation flottante (Sticky) avec effet Glass.
3. **Pied de page** :
    - Structure simplifiée et élégante.

## 4. Contraintes Techniques
- **Stack** : Jekyll (Vanilla CSS/SCSS + JavaScript pur).
- **Performance** : 
    - Utilisation systématique de `responsive-image.html`.
    - Pas de bibliothèques lourdes (Framer Motion ou GSAP) sauf si absolutement nécessaire ; privilégier `CSS Transitions` et `Intersection Observer`.
- **SEO** : Préservation de la sémantique HTML5 (H1 unique, balises méta).

## 5. Roadmap Design
1. **Phase 1** : Mise à jour des variables SCSS et fondations (Nexus Tokens).
2. **Phase 2** : Refonte de la Hero Section & Assets IA.
3. **Phase 3** : Rework des composants (Blog Cards, Navigation).
4. **Phase 4** : Optimisation des performances et validation QA.

---
*Document généré par l'agent BMad PM pour Nikko.*
