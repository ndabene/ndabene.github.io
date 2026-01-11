# PRD - Rework Architecture "Propre & AI-Ready"

## 1. Contexte & Objectifs
Le site a accumulé de la dette technique : fichiers à la racine, scripts obsolètes, et un workflow de blog lourd car multilingue.
L'objectif est de simplifier l'architecture sans changer de stack (Jekyll) pour faciliter la maintenance manuelle et automatisée (via IA/Agents).

## 2. Problèmes Identifiés
- **Dette de maintenance** : Devoir gérer deux collections (`_posts` vs `_posts_en`) est fastidieux.
- **Encombrement** : Trop de fichiers de scripts et de documentation à la racine.
- **Workflow Blog** : Défragmentation entre les images, les textes et les métadonnées.

## 3. Solution (Plan d'Action)
- **Phase 1 : Nettoyage (Terminé)**
  - Déplacement des docs et archives dans `docs/`.
  - Nettoyage de `package.json`.
- **Phase 2 : Harmonisation des Collections (En cours)**
  - Simplifier la structure des articles.
  - Fixer les règles de nommage.
- **Phase 3 : Automatisation de la Validation**
  - Renforcer les scripts Ruby pour valider que l'IA ne casse pas les front-matters.

## 4. Critères de Réussite
- Zéro régression visuelle ou fonctionnelle sur le site.
- temps de création d'un article réduit pour l'utilisateur.
- Racine du projet lisible.
