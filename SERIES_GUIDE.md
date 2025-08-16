---
sitemap: { exclude: yes }
---

# Guide d'utilisation du système de séries

Ce guide explique comment utiliser le système de séries d'articles que j'ai mis en place pour votre blog Jekyll.

## ✨ Fonctionnalités

### 🔗 Séries d'articles liés
- Navigation automatique entre les articles d'une série
- Barre de progression visuelle
- Liste complète des articles de la série
- Gestion des articles futurs

### 👁️ Preview admin des futurs posts
- Mode admin pour voir les articles futurs
- Barre d'administration discrète
- Navigation série complète même avec des futurs posts
- Parfait pour planifier vos posts LinkedIn à l'avance

## 📝 Comment créer une série d'articles

### 1. Configurer la série dans `_data/series.yml`

```yaml
"Ma Nouvelle Série":
  description: "Description de votre série d'articles"
  category: "Catégorie"
  difficulty: "Débutant/Intermédiaire/Avancé"
```

### 2. Créer vos articles avec les métadonnées série

Dans le Front Matter de chaque article :

```yaml
---
layout: post
title: "Titre de votre article"
date: 2025-08-15  # Date future pour planification
series: "Ma Nouvelle Série"
series_part: 1    # Numéro de l'article dans la série
# ... autres métadonnées
---
```

### 3. Exemple d'article de série

```markdown
---
layout: post
title: "PrestaShop Advanced - Partie 1 : Architecture des Modules"
date: 2025-08-01
series: "Maîtriser PrestaShop"
series_part: 1
categories: [E-commerce, PrestaShop]
tags: [PHP, PrestaShop, modules, architecture]
excerpt: "Découvrez l'architecture interne des modules PrestaShop..."
---

# Votre contenu ici
```

## 🔮 Mode Admin Preview

### Activer le mode admin en local

```bash
# Méthode 1 : Script dédié
./scripts/admin-preview.sh start

# Méthode 2 : Variable d'environnement
JEKYLL_ADMIN_PREVIEW=true bundle exec jekyll serve --future
```

### Utilisation pour LinkedIn

**En local** : Le bouton "Mode Admin" apparaît automatiquement sur `/blog/`
**En production** : Ajoutez `?admin_preview=true` à n'importe quelle URL

En mode admin preview, vous obtenez :
- ✅ **URL de production** (https://nicolas-dabene.fr) même en local
- ✅ **Suggestion de post LinkedIn** générée automatiquement  
- ✅ **Countdown** jusqu'à la publication
- ✅ **Boutons de copie** en un clic
- ✅ **Tous les futurs articles** visibles sur le blog

Parfait pour préparer vos posts LinkedIn à l'avance !

## 🎨 Personnalisation des styles

Les styles sont dans `_sass/series.scss` :
- `.series-navigation` : Navigation principale
- `.admin-preview-bar` : Barre d'administration
- `.future-post-preview` : Style des futurs posts

## 📁 Structure des fichiers créés

```
├── _data/
│   └── series.yml              # Configuration des séries
├── _includes/
│   ├── series-navigation.html  # Navigation entre articles
│   └── admin-preview-bar.html  # Barre admin
├── _layouts/
│   └── series.html            # Page d'index d'une série
├── _plugins/
│   └── admin_preview.rb       # Logique admin preview
├── _sass/
│   └── series.scss           # Styles pour les séries
└── scripts/
    └── admin-preview.sh      # Script d'activation admin
```

## 🔄 Workflow de publication

### Pour une série planifiée

1. **Création** : Créez tous vos articles avec des dates futures
2. **Preview** : Utilisez le mode admin pour vérifier la navigation
3. **Planification LinkedIn** : Préparez vos posts à l'avance
4. **Publication** : Les articles s'activent automatiquement à leur date

### Exemple de dates échelonnées

```yaml
# Article 1
date: 2025-08-01

# Article 2 
date: 2025-08-08

# Article 3
date: 2025-08-15
```

## 🔍 Fonctionnalités avancées

### Navigation intelligente
- Détecte automatiquement l'article actuel
- Masque les futurs articles pour les visiteurs
- Affiche tout pour l'admin

### Pages de série automatiques
- Génère automatiquement `/series/nom-de-la-serie.html`
- Vue d'ensemble de la progression
- Statistiques de publication

### SEO optimisé
- Métadonnées Schema.org pour les séries
- Navigation breadcrumb
- Liens internes optimisés

## 🚀 Prochaines étapes

Votre système est prêt ! Vous pouvez maintenant :

1. Créer votre première série dans `_data/series.yml`
2. Rédiger vos articles avec les métadonnées `series` et `series_part`
3. Utiliser le mode admin pour planifier vos publications LinkedIn
4. Publier au rythme que vous souhaitez

Le système s'occupe automatiquement du reste : navigation, progression, style et SEO ! 🎉