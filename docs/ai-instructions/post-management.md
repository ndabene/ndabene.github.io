# Consignes de Gestion des Articles (AI-Ready)

Ce document sert de référence unique pour les agents IA chargés de créer ou modifier des articles sur ce blog.

## 📁 Structure des Articles
Les articles sont séparés par langue dans des collections distinctes avec une **symétrie stricte des chemins** :
- **Français** : `_posts/YYYY/MM/YYYY-MM-DD-slug.md`
- **Anglais** : `_posts_en/YYYY/MM/YYYY-MM-DD-slug.md`

*Note : Le slug et la structure de dossiers (Année/Mois) doivent être identiques pour les deux versions.*

## 📝 Front Matter (Template Minimal)
```yaml
---
layout: post
title: "Titre de l'article"
date: YYYY-MM-DD
author: Nicolas Dabène
categories: [Catégorie]
tags: [Tag1, Tag2]
excerpt: "Description courte (150-160 caractères)"
image: /assets/images/blog/YYYY-MM-DD-nom-image.webp
featured: false
difficulty: "Débutant/Intermédiaire/Avancé"
technologies: ["Tech1", "Tech2"]
lang: fr # ou en
published: true
---
```

## 🖼️ Gestion des Images (Assets Isoles)
1. **Format** : Utiliser exclusivement le format `.webp`.
2. **Structure de Dossier** : Chaque article a son propre dossier d'assets.
   - Chemin : `/assets/images/blog/YYYY/MM/slug-de-l-article/`
3. **Fichier Image** : `image-principale.webp` (pour le front-matter) et autres images dans le même dossier.
4. **Usage dans le texte** :
   Toujours utiliser le composant Liquid `responsive-image.html` :
   ```liquid
   {% include responsive-image.html 
      src="/assets/images/blog/2026/01/mon-article/image.webp" 
      alt="Description" 
      class="post-image" %}
   ```

## 🤖 Workflow pour les Agents
1. **Initialisation** : Déterminer le `slug` et la date `YYYY-MM-DD`.
2. **Architecture** : Créer le dossier d'images `/assets/images/blog/YYYY/MM/slug/`.
3. **Génération double** : Créer systématiquement les deux fichiers `.md` dans `_posts` et `_posts_en`.
4. **Validation** : Lancer `npm run validate:frontmatter` pour vérifier la conformité.
