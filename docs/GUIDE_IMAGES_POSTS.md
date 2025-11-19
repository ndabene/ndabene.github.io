# Guide d'utilisation des images dans les articles

Ce guide explique comment contrôler l'affichage des images dans vos articles grâce aux nouveaux paramètres du front-matter.

## 🎯 Vue d'ensemble

Le système hybride intelligent permet de contrôler précisément comment vos images sont affichées :
- **Par défaut** : Les images sont affichées en entier (`contain`) sans recadrage
- **Personnalisable** : Vous pouvez forcer le mode `cover` ou `fill` par article
- **Positionnable** : Vous pouvez ajuster la position de l'image

## 📍 Zones d'affichage concernées

### 1. Hero Article (page /blog/)
L'article principal affiché en grand en haut de la page blog.

### 2. Vignettes d'articles (page /blog/)
Les petites vignettes dans la liste des articles.

### 3. Bannière de l'article (page article individuelle)
L'image de bannière affichée en haut de chaque article.

## 🔧 Paramètres disponibles

### Pour la page blog (Hero + vignettes)

Ajoutez ces paramètres dans le front-matter de votre article :

```yaml
---
title: "Mon article"
image: /assets/images/mon-image.jpg
image_display: contain  # contain (défaut), cover, fill
image_position: center   # center (défaut), top, bottom, left, right
---
```

### Pour la bannière de l'article

Ajoutez ces paramètres dans le front-matter de votre article :

```yaml
---
title: "Mon article"
image: /assets/images/mon-image.jpg
banner_display: contain  # contain (défaut), cover, fill
banner_position: center  # center (défaut), top, bottom, left, right
---
```

## 📖 Explication des modes

### `image_display` / `banner_display`

- **`contain`** (défaut) : L'image entière est visible, sans recadrage
  - ✅ Idéal pour : logos, infographies, diagrammes
  - ⚠️ Peut créer des espaces vides si l'image n'a pas le bon ratio

- **`cover`** : L'image remplit tout l'espace, peut être recadrée
  - ✅ Idéal pour : photos de paysage, photos génériques
  - ⚠️ Peut couper des parties importantes de l'image

- **`fill`** : L'image est étirée pour remplir l'espace
  - ✅ Idéal pour : cas très spécifiques
  - ⚠️ Peut déformer l'image

### `image_position` / `banner_position`

Détermine quelle partie de l'image est visible en mode `cover` :

- **`center`** (défaut) : Centre l'image
- **`top`** : Affiche le haut de l'image
- **`bottom`** : Affiche le bas de l'image
- **`left`** : Affiche la gauche de l'image
- **`right`** : Affiche la droite de l'image

## 💡 Exemples d'utilisation

### Exemple 1 : Logo ou infographie (mode par défaut)

```yaml
---
title: "Architecture de notre système"
image: /assets/images/architecture-diagram.png
# Pas besoin de spécifier image_display, le mode 'contain' est appliqué par défaut
---
```

L'image sera affichée en entier sans recadrage.

### Exemple 2 : Photo de paysage

```yaml
---
title: "Notre voyage en montagne"
image: /assets/images/montagne.jpg
image_display: cover
image_position: top  # Affiche le sommet de la montagne
banner_display: cover
banner_position: top
---
```

L'image remplira l'espace et sera recadrée en affichant prioritairement le haut.

### Exemple 3 : Portrait avec sujet centré

```yaml
---
title: "Interview avec..."
image: /assets/images/portrait.jpg
image_display: cover
image_position: center  # Centre le visage
banner_display: cover
banner_position: center
---
```

### Exemple 4 : Configuration mixte

```yaml
---
title: "Tutoriel technique"
image: /assets/images/tutorial-header.png
# Sur la page blog : afficher en entier
image_display: contain
# Dans l'article : mode cover pour un meilleur rendu
banner_display: cover
banner_position: top
---
```

## 🎨 Aspect ratios utilisés

### Hero Article
- **Desktop** : `16:9` (min 400px, max 600px)
- **Mobile** : `4:3` (min 300px, max 450px)

### Vignettes d'articles
- **Desktop** : `16:10` (min 160px)
- **Mobile** : `16:9` (min 200px)

### Bannière d'article
- **Desktop** : `16:9` (min 300px, max 500px)
- **Mobile** : `4:3` (min 200px, max 350px)

## 🚀 Recommandations

### Images pour le mode `contain` (défaut)
- Format recommandé : PNG avec transparence ou JPG
- Ratio recommandé : 16:9 ou 16:10
- Taille recommandée : 1200x675px minimum

### Images pour le mode `cover`
- Format recommandé : JPG
- Ratio recommandé : 16:9
- Taille recommandée : 1920x1080px minimum
- Assurez-vous que le sujet principal est au centre

### Images avec texte/logo
- Utilisez toujours `image_display: contain`
- Assurez-vous d'un bon contraste
- Taille recommandée : 1200x630px (format OpenGraph)

## 🔍 Dépannage

### L'image est coupée sur la page blog
➡️ Ajoutez `image_display: contain` dans le front-matter

### Il y a des espaces vides autour de l'image
➡️ Utilisez `image_display: cover` ou redimensionnez l'image au bon ratio

### L'image est déformée
➡️ Vérifiez que vous n'utilisez pas `image_display: fill`

### Une partie importante est coupée en mode cover
➡️ Utilisez `image_position` pour ajuster (top/bottom/left/right)

## 📝 Checklist avant publication

- [ ] L'image a une résolution suffisante (1200px minimum de largeur)
- [ ] L'image est optimisée (WebP si possible, sinon JPG compressé)
- [ ] Le paramètre `image_display` est adapté au contenu de l'image
- [ ] Le paramètre `banner_display` est défini si différent du comportement de la page blog
- [ ] L'image s'affiche correctement en mobile ET desktop
- [ ] Le texte de l'overlay du hero article reste lisible

## 🔗 Fichiers concernés

- `_sass/blog-news.scss` : Styles pour hero article et featured cards
- `_sass/blog-modern.scss` : Styles pour vignettes et bannières
- `_includes/hero-article.html` : Template du hero article
- `_includes/post-preview-news.html` : Template des vignettes
- `_layouts/post.html` : Layout des articles individuels
