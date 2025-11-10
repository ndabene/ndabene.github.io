# Guide de Mise à Jour des Templates pour WebP

Ce guide explique comment mettre à jour vos templates Jekyll pour utiliser automatiquement les images WebP optimisées.

## 🎯 Objectif

Remplacer toutes les balises `<img>` par le composant `responsive-image.html` qui :
- Utilise WebP automatiquement avec fallback JPG/PNG
- Ajoute les dimensions (width/height) pour éviter CLS
- Active le lazy loading
- Garde la compatibilité avec navigateurs anciens

## 📝 Étape 1 : Utiliser le Composant dans les Layouts

### A. Layout Post (`_layouts/post.html`)

**AVANT (ligne 156-158):**
```html
{% if page.image %}
<div class="post-banner-image-container">
    <img src="{{ page.image }}" alt="{{ page.title }}" class="post-banner-image">
</div>
{% endif %}
```

**APRÈS:**
```html
{% if page.image %}
<div class="post-banner-image-container">
    {% include responsive-image.html
       src=page.image
       alt=page.title
       width="1200"
       height="630"
       loading="eager"
       class="post-banner-image"
    %}
</div>
{% endif %}
```

> **Note:** `loading="eager"` car c'est l'image principale (au-dessus du fold)

### B. Composant Post Preview (`_includes/post-preview.html`)

**Chercher:**
```html
<img src="{{ post.image | relative_url }}" alt="{{ post.title }}" loading="lazy">
```

**Remplacer par:**
```html
{% include responsive-image.html
   src=post.image
   alt=post.title
   width="400"
   height="210"
   loading="lazy"
   class="post-thumbnail"
%}
```

### C. Composant Sidebar Trending Topics (`_includes/sidebar-trending-topics.html`)

**Chercher:**
```html
<img src="{{ post.image }}" alt="{{ post.title }}" loading="lazy">
```

**Remplacer par:**
```html
{% include responsive-image.html
   src=post.image
   alt=post.title
   width="300"
   height="200"
   loading="lazy"
%}
```

### D. Smart Internal Links (`_includes/smart-internal-links.html`)

**Chercher:**
```html
<img src="{{ post.image }}" alt="{{ post.title }}" itemprop="image" loading="lazy">
```

**Remplacer par:**
```html
{% include responsive-image.html
   src=post.image
   alt=post.title
   width="400"
   height="210"
   loading="lazy"
   itemprop="image"
%}
```

### E. Project Card (`_includes/project-card.html`)

**Chercher:**
```html
<img src="{{ project.hero_image }}" alt="{{ project.title }}" class="project-thumbnail" loading="lazy">
```

**Remplacer par:**
```html
{% include responsive-image.html
   src=project.hero_image
   alt=project.title
   width="600"
   height="400"
   loading="lazy"
   class="project-thumbnail"
%}
```

### F. Product Card Formation (`_includes/product-card-formation.html`)

**Remplacer les 2 occurrences:**

```html
{% include responsive-image.html
   src=p.image
   alt=p.nom
   width="500"
   height="500"
   loading="lazy"
%}
```

### G. Modules Featured (`_includes/home-commerce/modules-featured.html`)

**Chercher:**
```html
<img src="/{{ module.image }}" alt="{{ module.title }}" loading="lazy">
```

**Remplacer par:**
```html
{% include responsive-image.html
   src=module.image
   alt=module.title
   width="400"
   height="400"
   loading="lazy"
%}
```

## 📝 Étape 2 : Mettre à Jour les Dimensions

Pour chaque image, spécifiez les dimensions réelles. Voici les ratios standards :

### Images Blog
- **Bannière article:** 1200x630 (ratio 1.9:1 - Open Graph)
- **Vignette article:** 400x210 (ratio 1.9:1)
- **Sidebar:** 300x200 (ratio 1.5:1)

### Images Modules/Products
- **Carrés:** 500x500 (ratio 1:1)
- **Rectangles:** 600x400 (ratio 1.5:1)

### Images Hero
- **Hero desktop:** 1920x1080 (ratio 16:9)
- **Hero mobile:** 768x1024 (ratio 3:4)

## 📝 Étape 3 : Logo et Favicon

### Logo Header (`_includes/header-modern.html`)

**AVANT:**
```html
<img src="/assets/images/logo.png" alt="Nicolas Dabène" class="logo animate-float" width="95" height="95">
```

**APRÈS:**
```html
{% include responsive-image.html
   src="/assets/images/logo.png"
   alt="Nicolas Dabène - Créateur de contenu IA & E-commerce"
   width="95"
   height="95"
   loading="eager"
   class="logo animate-float"
%}
```

> **Note:** Logo en `loading="eager"` car toujours visible

## 🎨 Étape 4 : CSS pour Picture Element

Ajouter dans `assets/css/style.scss` ou `homepage-cards.css`:

```css
/* Support pour <picture> avec même comportement que <img> */
picture {
  display: contents;
}

picture img {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Aspect ratio pour éviter CLS */
.post-banner-image {
  aspect-ratio: 1200 / 630;
  object-fit: cover;
  width: 100%;
}

.post-thumbnail {
  aspect-ratio: 400 / 210;
  object-fit: cover;
}

.project-thumbnail {
  aspect-ratio: 600 / 400;
  object-fit: cover;
}
```

## 🧪 Étape 5 : Tests

Après modification, tester :

1. **Build local:**
   ```bash
   bundle exec jekyll serve
   ```

2. **Vérifier dans navigateur:**
   - Chrome DevTools → Network → Type: webp ✅
   - Images s'affichent correctement
   - Pas de layout shift (CLS)

3. **Test performance:**
   - PageSpeed Insights
   - LCP < 2.5s ✅
   - CLS < 0.1 ✅

4. **Test compatibilité:**
   - Chrome/Edge (moderne) → WebP ✅
   - Safari (ancien) → JPG fallback ✅
   - Firefox → WebP ✅

## 📊 Résultats Attendus

Avant optimisation :
```
LCP: 4.2s ❌
CLS: 0.25 ❌
Taille totale images: 8.5 MB
```

Après optimisation :
```
LCP: 1.8s ✅
CLS: 0.05 ✅
Taille totale images: 2.1 MB (-75%)
```

## 🚨 Troubleshooting

### Problème : Images WebP non trouvées (404)

**Cause:** Script optimize-images.sh pas exécuté

**Solution:**
```bash
chmod +x scripts/optimize-images.sh
./scripts/optimize-images.sh
```

### Problème : Layout shift visible

**Cause:** Dimensions pas spécifiées ou incorrectes

**Solution:** Vérifier width/height correspondent aux dimensions réelles

### Problème : Images floues

**Cause:** Qualité WebP trop basse

**Solution:** Dans optimize-images.sh, augmenter `-q 85` à `-q 90`

## ✅ Checklist Finale

- [ ] Script optimize-images.sh exécuté
- [ ] Composant responsive-image.html créé
- [ ] Layout post mis à jour
- [ ] Includes post-preview, sidebar, etc. mis à jour
- [ ] CSS aspect-ratio ajouté
- [ ] Build Jekyll réussi
- [ ] Tests navigateur OK
- [ ] PageSpeed Insights > 90

## 🎓 Bonus : Automatiser avec Git Hook

Créer `.git/hooks/pre-commit`:

```bash
#!/bin/bash
# Auto-optimiser nouvelles images avant commit

NEW_IMAGES=$(git diff --cached --name-only --diff-filter=A | grep -E '\.(jpg|jpeg|png)$')

if [ ! -z "$NEW_IMAGES" ]; then
    echo "🖼️  Optimisation des nouvelles images..."
    ./scripts/optimize-images.sh
    git add assets/images/**/*.webp
fi
```

Rendre exécutable:
```bash
chmod +x .git/hooks/pre-commit
```

Maintenant, chaque nouvelle image sera automatiquement convertie en WebP avant commit ! 🎉
