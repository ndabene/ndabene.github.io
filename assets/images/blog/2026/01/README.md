# Gestion des Assets - Janvier 2026

Ce dossier suit la nouvelle architecture **"Isolated Assets"** définie dans `docs/ai-instructions/post-management.md`.

## 📁 Structure
Chaque article possède son propre sous-dossier nommé d'après son **slug**.

Exemple : 
`assets/images/blog/2026/01/mon-article-slug/`
  ├── `image-principale.webp` (Image de couverture par défaut)
  └── `screenshot-1.webp` (Images additionnelles)

## ✅ État de la Migration (Janvier 2026)
Tous les articles de ce mois ont été migrés vers cette structure.

| Article (Slug) | Dossier d'Images |
| :--- | :--- |
| `retrospective-evenements-prestashop-2025` | Validé |
| `rapport-securite-modules-prestashop` | Validé |
| `daily-merchant-morning-automatise-prestashop-ia` | Validé (3 images) |
| `retrospective-cybersecurite-ecommerce-2025` | Validé |
| `illusion-code-jetable-ia-prestashop` | Validé |
| `prestashop-sylius-module-produit-futur-hybride` | Validé |
| `notebooklm-copilote-experts-prestashop` | Validé |
| `ia-q1-2026-industrialisation-agents-autonomes` | Validé |
| `orchestrateur-ia-developpeurs-futur` | Validé |
| `analyse-strategique-tensions-marche-ram-2026` | Dossier créé (Image manquante) |

## ⚠️ Notes pour les Agents IA
Lors de la création d'un nouvel article :
1. Déterminez le slug.
2. Créez le dossier `assets/images/blog/YYYY/MM/slug/`.
3. Nommez l'image principale `image-principale.webp`.
4. Mettez à jour le front-matter en conséquence.
