---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: ["docs/architecture.md", "docs/architecture-nexus.md", "docs/prd-design-rework.md"]
date: 2026-01-26
author: Nikko
---

# Product Brief: ndabene.github.io

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

La refonte de `ndabene.github.io` vise à transformer une plateforme technique robuste en une vitrine numérique haut de gamme, sans compromettre les fondations critiques du projet. Le projet adopte le système **Nexus**, alliant une esthétique premium (Glassmorphism, Bento design) à une architecture logicielle moderne et modulaire. L'objectif est double : offrir une expérience utilisateur immersive qui reflète l'expertise technique de Nicolas Dabène, tout en renforçant la fiabilité du pipeline de déploiement via une validation automatisée accrue et une structure de code exemplaire, le tout en garantissant une compatibilité totale avec les automations XML existantes.

---

## Core Vision

### Problem Statement

Le site actuel, bien qu'efficace techniquement, ne reflète plus pleinement le niveau d'expertise et le prestige des projets de Nicolas Dabène. Son interface manque de la "vibrance" et de la "profondeur" attendues pour un site moderne. De plus, bien que le pipeline de déploiement soit fonctionnel, il peut encore bénéficier d'une structure plus propre et de tests de validation plus rigoureux pour éviter toute régression dans les flux automatisés (XML).

### Problem Impact

Une image de marque moins percutante peut limiter l'engagement des visiteurs et ne pas rendre justice à la qualité du contenu technique produit. Sur le plan technique, une structure de code manquant de modularité rend la maintenance plus complexe à mesure que de nouvelles fonctionnalités (comme l'IA orchestration) sont ajoutées.

### Why Existing Solutions Fall Short

Les solutions de modernisation classiques (changement complet de thème ou de CMS) ne sont pas adaptées car elles risquent de casser les automations XML critiques (n8n, LinkedIn, RSS) qui dépendent de la structure précise des données Jekyll. Une simple couche de CSS ad-hoc sans refonte de l'architecture SCSS ne ferait qu'ajouter de la "dette visuelle" sans améliorer la maintenabilité.

### Proposed Solution

L'implémentation du **Système Design Nexus** au sein de Jekyll. Cette approche combine :
1.  **Modernisation Visuelle** : Glassmorphism, typographie dynamique, et layout Bento pour une interface premium.
2.  **Architecture Modulaire** : Réorganisation du SCSS en tokens Nexus et organisation des composants pour une clarté maximale.
3.  **Pipeline AI-Ready Renforcé** : Introduction de validations plus strictes dans GitHub Actions pour garantir l'intégrité des données et des fichiers XML.

### Key Differentiators

- **Préservation de l'Héritage** : Modernisation radicale sans aucune rupture des flux XML critiques.
- **Rigueur Architecturale** : Structure conçue pour être "AI-Collaborative", facilitant les futures interventions d'agents intelligents.
- **Esthétique de Prestige** : Utilisation de la palette Slate & Gold sublimée par des effets de profondeur et de micro-animations.

---

## Target Users

### Primary Users

**Marc, le CTO Stratège**
- **Backstory** : Responsable technique d'une scale-up, Marc doit déléguer des parties critiques de son infrastructure.
- **Rôle** : Décisionnaire technique.
- **Goals** : Identifier des partenaires capables de gérer de l'orchestration complexe et de l'IA.
- **Problem Experience** : Perte de temps sur des profils manquant de finition visuelle et de rigueur apparente.
- **Success Vision** : Une navigation fluide sur un site "premium" qui prouve l'excellence opérationnelle par le design même.

### Secondary Users

**Sophie, la Développeuse Senior**
- **Goals** : Apprendre des techniques avancées de développement et d'automatisation.
- **Success Vision** : Une mise en page "Bento" qui hiérarchise l'information technique et rend le savoir accessible.

**Nikko, le Propriétaire du Système**
- **Goals** : Maintenir un pipeline de publication 100% automatisé et fiable (XML/RSS).
- **Success Vision** : Une architecture SCSS modulaire qui permet d'évoluer visuellement sans risque de régression technique.

### User Journey

1. **Découverte** : Un post LinkedIn (via XML automation) attire Marc ou Sophie.
2. **Onboarding** : Impact visuel immédiat de la Hero Section "Nexus".
3. **Usage Core** : Lecture d'études de cas ou d'articles techniques avec une interface moderne et fluide.
4. **Moment "Aha!"** : Marc réalise que l'attention au détail du site reflète la qualité du travail technique (Orchestration/IA).
5. **Fidélisation** : Sophie revient pour la clarté des contenus ; Nikko publie sans crainte grâce aux tests automatisés.

---

## Success Metrics

Le succès du projet sera validé par l'équilibre entre une perception utilisateur haut de gamme et une stabilité technique sans faille.

### Business Objectives

**Objectif de Notoriété & Expertise**
- Positionner Nicolas Dabène comme l'expert de référence en orchestration IA et PrestaShop via une interface "Nexus" qui inspire confiance et autorité.

**Objectif de Fiabilité Technique**
- Sécuriser l'écosystème d'automations (LinkedIn, n8n) pour permettre des publications quotidiennes sans risque de régression technique.

### Key Performance Indicators

| Catégorie | KPI | Cible |
| :--- | :--- | :--- |
| **User Experience** | Temps moyen sur Case Studies | +25% de durée de session |
| **User Experience** | Taux de rebond (Blog) | Réduction de 15% |
| **Trust & Authority** | Contacts qualifiés | Mention "Design/Prestige" dans 1er contact |
| **Technical** | Validité des flux XML | 100% de succès (CI/CD) |
| **Maintainability** | Couverture de validation | 3 nouveaux tests automatisés critiques |
| **Performance** | Temps de Build (GA) | < +10% d'augmentation malgré les nouveaux tests |

---

## MVP Scope

### Core Features

*   **Fondations Nexus** : Refonte de l'architecture SCSS (tokens, variables) pour implémenter la palette Slate & Gold et les effets de verre (Glassmorphism).
*   **Hero Section "Alive"** : Nouvelle page d'accueil avec typographie dynamique et mise en page impactante.
*   **Blog Bento Layout** : Transformation de la liste des articles en une grille "Bento" moderne, sans toucher aux données existantes.
*   **Pipeline Sécurisé** : Ajout des validations GitHub Actions (XML, Frontmatter) pour garantir la non-régression.
*   **Navigation & Footer** : Mise à jour stylistique pour s'aligner sur la charte Nexus.

### Out of Scope for MVP

*   **Réécriture du contenu** : On ne touche pas au texte des articles existants.
*   **Nouvelles fonctionnalités fonctionnelles** : Pas de nouvelle section (type 'Boutique' ou 'Formation') pour le moment, on se concentre sur le design et l'infra.
*   **Animations lourdes (3D)** : On se limite aux transitions CSS performantes et aux micro-interactions, pas de Three.js ou WebGL complexe pour l'instant.

### MVP Success Criteria

*   **Validation Visuelle** : La nouvelle charte est implémentée sur 100% des pages clés (Home, Blog, Article).
*   **Validation Technique** : Le pipeline GitHub Actions passe au vert avec les nouveaux tests de sécurité XML.
*   **Performance** : Le score Lighthouse Mobile reste supérieur à 90 malgré les enrichissements visuels.

### Future Vision

Un site entièrement piloté par des agents IA autonomes qui rédigent, illustrent et déploient du contenu technique de pointe, avec une expérience utilisateur qui s'adapte en temps réel au visiteur.
