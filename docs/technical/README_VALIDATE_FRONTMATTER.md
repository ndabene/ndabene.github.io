# Validation du Front Matter des Articles de Blog

## 📋 Description

Ce script valide le front matter (métadonnées YAML) de tous les articles de blog dans `_posts/` et `_posts_en/` pour garantir la cohérence et la qualité éditoriale.

## 🚀 Utilisation

### En local

```bash
# Avec npm
npm run validate:frontmatter

# Ou directement avec Ruby
ruby scripts/validate_frontmatter.rb
```

### Lors du déploiement

Le script s'exécute automatiquement lors du déploiement via GitHub Actions (voir `.github/workflows/jekyll.yml`).

Si des erreurs sont détectées, le déploiement échouera.

## ✅ Champs requis

Chaque article **doit** contenir ces champs dans son front matter :

- `layout` : Doit être `post`
- `title` : Titre de l'article (max 120 caractères recommandé)
- `date` : Format `YYYY-MM-DD` ou `YYYY-MM-DD HH:MM:SS +ZZZZ`
- `author` : Nom de l'auteur
- `categories` : Liste (array) de catégories
- `tags` : Liste (array) de tags
- `excerpt` : Description courte (50-300 caractères recommandé)
- `image` : Chemin vers l'image principale

## 🔍 Validations effectuées

### Erreurs (bloquantes)

- ❌ Syntaxe YAML invalide
- ❌ Champs requis manquants
- ❌ Format de date invalide
- ❌ Layout invalide
- ❌ `categories` ou `tags` ne sont pas des tableaux
- ❌ FAQ mal formatée (doit avoir `question` et `answer`)
- ❌ `technologies` n'est pas un tableau

### Warnings (non-bloquants)

- ⚠️ Image manquante (le fichier peut être ajouté plus tard)
- ⚠️ Date du nom de fichier différente de la date du front matter
- ⚠️ Langue non standard
- ⚠️ Difficulté non standard (attendu : Débutant, Intermédiaire, Avancé, Advanced, Beginner, Intermediate)
- ⚠️ `excerpt` trop court (< 50 caractères) ou trop long (> 300 caractères)
- ⚠️ `title` très long (> 120 caractères)
- ⚠️ `categories` ou `tags` vide
- ⚠️ `author` vide
- ⚠️ `featured` n'est pas un booléen

## 📝 Exemple de front matter valide

```yaml
---
layout: post
title: "Mon super article sur PrestaShop"
date: 2025-12-17
lang: fr
ref: article-prestashop
author: Nicolas Dabène
categories:
- PrestaShop
- Développement
tags:
- prestashop
- php
- best-practices
excerpt: >
  Découvrez comment optimiser votre boutique PrestaShop avec ces astuces simples et efficaces.
image: /assets/images/blog/2025/12/mon-article.jpg
featured: true
difficulty: Intermédiaire
technologies:
- PrestaShop 9
- PHP 8.4
estimated_reading_time: 8 minutes
faq:
- question: "Est-ce compatible avec PrestaShop 8 ?"
  answer: "Oui, ces techniques fonctionnent aussi sur PrestaShop 8."
---
```

## 🛠️ Maintenance

Pour ajouter de nouvelles validations, modifiez le fichier `scripts/validate_frontmatter.rb`.

### Structure du script

1. **Lecture du front matter** : Extraction du YAML entre les délimiteurs `---`
2. **Validation des champs requis** : Vérification de la présence
3. **Validation des formats** : Vérification des types et formats
4. **Validation des références** : Vérification de l'existence des fichiers (images)

## 🐛 En cas d'erreur

Si le script détecte des erreurs :

1. Lisez attentivement le message d'erreur
2. Ouvrez le fichier concerné
3. Corrigez le problème dans le front matter
4. Relancez le script pour vérifier

## 💡 Bonnes pratiques

- ✅ Toujours tester localement avant de push
- ✅ Utiliser des éditeurs avec support YAML (VS Code, JetBrains)
- ✅ Respecter les longueurs recommandées pour le SEO
- ✅ Utiliser le champ `ref` pour lier les versions FR/EN d'un article
- ✅ Ajouter des FAQ pour améliorer le SEO et l'engagement
