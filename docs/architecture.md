# Architecture du Projet - nicolas-dabene.fr

Ce document décrit l'architecture technique du projet, les choix structurants et les règles de maintenance pour garantir la stabilité et la performance du site (AI-Ready).

## 🛠 Stack Technique
- **Générateur de site statique** : Jekyll
- **Hébergement** : GitHub Pages (via Netlify pour certaines fonctionnalités)
- **Design** : Vanilla CSS / SCSS (Optimisation mobile 2025)
- **Recherche** : Pagefind
- **Multilingue** : Collections doublées (FR/EN) - *En cours de simplification*

## 📁 Structure du Projet
- `_posts/` & `_posts_en/` : Articles de blog par langue.
- `_case_studies/` & `_case_studies_en/` : Études de cas.
- `_data/` : Données structurées (navigation, boutique, expertise).
- `_includes/` & `_layouts/` : Composants et templates.
- `assets/` : Ressources statiques (images, css, js).
- `docs/` : Documentation technique, consignes IA et archives.

## 🏗 Principes d'Architecture (ADRs)

### ADR 1 : Centralisation des métadonnées (Docs & Archives)
Toute documentation non destinée à être publiée sur le site doit résider dans `docs/`. 
Les fichiers racines sont limités au strict nécessaire (config, readme, licenses).

### ADR 2 : Workflow AI-First
L'architecture est optimisée pour être lue et manipulée par des agents IA :
- Utilisation de `llms.txt` pour l'indexation.
- Dossier `docs/ai-instructions/` pour les règles de rédaction et de structure.
- Simplification des collections pour réduire la "charge mentale" des agents.

### ADR 3 : Gestion des Images
- Priorité au format **WebP**.
- Utilisation systématique du composant `responsive-image.html`.

## 🔄 Flux de Publication (Cible)
1. L'IA reçoit un contenu.
2. L'IA génère les fichiers `.md` dans les collections respectives (FR/EN).
3. L'IA utilise les chemins d'images standardisés.
4. Validation automatique via les scripts de `validate_frontmatter.rb` (à venir).

---
**Version :** 1.0 (Phase de Rework)
**Dernière mise à jour :** 11 Janvier 2026
