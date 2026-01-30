---
layout: prd
title: "PRD: Rework Design 2026 - Nexus System"
status: Draft
version: 1.1
author: BMad PM
date: 2026-01-30
priority: High
target_branch: design
workflowType: 'prd'
workflow: 'edit'
classification:
  domain: 'Personal Portfolio'
  projectType: 'web_app'
  complexity: 'Low'
inputDocuments: ["planning-artifacts/product-brief-ndabene.github.io-2026-01-26.md"]
stepsCompleted: ['step-e-01-discovery', 'step-e-02-review', 'step-e-03-edit']
lastEdited: '2026-01-30'
editHistory:
  - date: '2026-01-30'
    changes: 'Refined FRs to active voice, added traceability tags, defined visual NFR metrics, and detailed the roadmap.'
  - date: '2026-01-30'
    changes: 'Converted to BMAD Standard Format. Added User Journeys, Success Criteria, and Product Scope.'
---

# PRD: Refonte Design Complète (Système Nexus)

## 1. Executive Summary
Transformer l'interface actuelle du site `nicolas-dabene.fr` en une expérience numérique **premium, immersive et vivante**, tout en respectant l'autorité technique et l'expertise de Nicolas Dabène.

Le projet adopte le système **Nexus**, alliant une esthétique premium (Glassmorphism, Bento design) à une architecture logicielle moderne et modulaire. L'objectif est double : offrir une expérience utilisateur immersive qui reflète l'expertise technique de Nicolas Dabène, tout en renforçant la fiabilité du pipeline de déploiement.

---

## 2. Success Criteria

### 2.1 Engagement Goals
- **Durée de Session :** Augmenter le temps moyen sur les Case Studies de +25%.
- **Retention :** Réduire le taux de rebond sur le Blog de 15%.

### 2.2 Brand Perception
- **Prestige :** Recevoir des contacts qualifiés mentionnant spécifiquement la qualité du design ("Design/Prestige").

### 2.3 Technical Performance
- **Validation Automatique :** 100% de succès sur les nouveaux tests XML/Frontmatter.
- **Vitesse :** Maintenir un score Lighthouse > 90 sur mobile malgré les enrichissements visuels.

---

## 3. Product Scope

### 3.1 In-Scope (MVP)
- **Fondations Nexus :** Architecture SCSS modulaire (Tokens, Variables) et palette "Deep Slate & Gold".
- **Hero Section :** Nouvelle page d'accueil "vivante" (Glassmorphism, Parallaxe).
- **Blog Interface :** Layout "Bento Grid" pour les articles avec filtres intégrés.
- **Navigation & Footer :** Refonte stylistique complète (Sticky Glass Nav).
- **Pipeline CI/CD :** Renforcement des tests (XML, Frontmatter).

### 3.2 Out-of-Scope
- **Contenu :** Réécriture des articles existants.
- **Nouvelles Pages :** Pas de section Boutique ou Formation.
- **Web 3D :** Pas de Three.js / WebGL lourd pour l'instant.

---

## 4. User Journeys

### 4.1 Marc, le CTO Stratège (Persona Décisionnaire)
**Goal:** Identifier un expert technique capable de gérer la complexité.
1.  **Arrivée :** Arrive sur la Home via LinkedIn. Est immédiatement frappé par la qualité visuelle "Nexus" (Hero Section).
2.  **Exploration :** Scanne rapidement les expertises (IA, Orchestration) présentées dans une grille Bento claire.
3.  **Conviction :** Note la fluidité des micro-interactions. "Si le site est si propre, le code l'est aussi."
4.  **Action :** Contacte Nicolas pour une mission d'orchestration complexe.

### 4.2 Sophie, la Développeuse Senior (Persona Tech)
**Goal:** Apprendre et valider la légitimité technique.
1.  **Arrivée :** Arrive sur un article de blog technique.
2.  **Lecture :** Apprécie la lisibilité du mode sombre (Deep Slate) et la clarté du code.
3.  **Navigation :** Utilise les filtres "Glass" pour trouver d'autres articles sur l'IA.
4.  **Rétention :** S'abonne au flux RSS (XML) qui est parfaitement valide.

---

## 5. Functional Requirements

### 5.1 Design System Core (Nexus)
- **FR-01 :** Users can perceive depth and hierarchy through an immersive interface using Glassmorphism (background blur, transparency) on all main containers. (Ref: Journey 4.1, 4.2)
- **FR-02 :** Users can experience a coherent visual identity with the "Deep Slate & Gold" color system applied globally. (Ref: Journey 4.1)

### 5.2 Navigational Experience
- **FR-03 :** Users can navigate via a floating (Sticky) menu that remains accessible during scrolling, ensuring readability over content. (Ref: Journey 4.1, 4.2)
- **FR-04 :** Users can filter blog articles instantly without page reload, receiving immediate visual feedback. (Ref: Journey 4.2)

### 5.3 Technical Showcase (Hero)
- **FR-05 :** Visitors can explore key areas of expertise (Orchestration, AI) presented in a dynamic Hero Section with parallax effects responsive to mouse movement. (Ref: Journey 4.1)

### 5.4 Content Consumption (Bento Blog)
- **FR-06 :** Users can scan and select articles from a responsive "Bento" grid layout that emphasizes cover images while maintaining clear hierarchy. (Ref: Journey 4.1, 4.2)

### 5.5 Pipeline Security
- **FR-07 :** The system can automatically validate data integrity and structure during build, blocking deployment if content validity checks fail. (Ref: System Integrity)

---

## 6. Non-Functional Requirements

### 6.1 Performance & Responsiveness
- **NFR-01 :** The Mobile Lighthouse Score shall remain > 90.
- **NFR-02 :** Total image weight on the homepage shall not exceed 1.5MB (using WebP/Avif).
- **NFR-03 :** Visual micro-interactions (parallax, hover) shall respond in < 50ms to input events to ensure fluidity.

### 6.2 Visual Integrity & Compatibility
- **NFR-04 :** Glassmorphism effects shall maintain a contrast ratio complying with WCAG AA standards for text readability over blurred backgrounds.
- **NFR-05 :** The site shall remain fully functional on modern browsers (Chrome, Firefox, Safari, Edge) and degrade gracefully without JS.

### 6.3 Stack & Constraints
- **NFR-06 :** Technical stack is strictly limited to Jekyll, Vanilla CSS/SCSS, and Vanilla JS (No React/Vue client-side frameworks).
- **NFR-07 :** XML structure and Frontmatter validity must be enforced by CI pipeline checks before any merge.

---

## 7. Roadmap Design
1. **Phase 1 : Foundations (Est. 1 Sprint)**
   - Update SCSS variables (Colors, Fonts).
   - Implement Nexus Design Tokens.
   - Refactor Layout templates.

2. **Phase 2 : Hero & Core Visuals (Est. 2 Sprints)**
   - Implement Hero Section with Parallax.
   - Design and build "Glass" components.
   - Integrate animations (CSS/JS).

3. **Phase 3 : Content & Features (Est. 2 Sprints)**
   - Implement Bento Grid for Blog.
   - Filter system implementation.
   - New Footer & Navigation integration.

4. **Phase 4 : Optimization & QA (Est. 1 Sprint)**
   - Performance tuning (Lighthouse > 90).
   - Pipeline hardening (XML Validators).
   - Cross-browser testing.
