# Scripts d'optimisation d'images

Ce dossier contient les scripts pour optimiser automatiquement les images du blog.

## 🚀 Génération automatique lors du déploiement

Les images WebP et leurs variants responsive sont **automatiquement générés** lors de chaque déploiement via GitHub Actions.

### Workflow de génération

1. **Conversion WebP** (via `generate-webp.js` + sharp)
   - Convertit tous les PNG/JPG en WebP (qualité 85)
   - Génère automatiquement les variants responsive (480px, 720px, 1080px)
   - Très rapide et robuste même sur gros fichiers

2. **Génération des variants responsive** (via ImageMagick - backup)
   - Génère les variants manquants si nécessaire
   - Fallback au cas où le script Node.js échoue

## 📝 Scripts disponibles

### `generate-webp.js` (Recommandé)

**Utilisation en local :**
```bash
npm install        # Installer sharp
npm run generate:webp
```

**Avantages :**
- ✅ Très rapide (2-3 secondes pour tout le blog)
- ✅ Gère bien les gros fichiers (8-10MB)
- ✅ Génère automatiquement les variants responsive
- ✅ Logs détaillés avec statistiques

### `generate-webp.sh` (Fallback)

**Utilisation :**
```bash
bash scripts/generate-webp.sh
```

**Note :** Nécessite `cwebp` installé. Plus lent sur gros fichiers.

### `generate-responsive-images.sh`

**Utilisation :**
```bash
bash scripts/generate-responsive-images.sh
```

Génère les variants 480px, 720px, 1080px pour chaque image WebP.

## 🎯 Processus recommandé

### Pour ajouter une nouvelle image

**Option 1 : Laissez le CI/CD s'en charger** (recommandé)
1. Ajoutez votre PNG/JPG dans `assets/images/blog/`
2. Référencez-la en `.webp` dans votre article :
   ```yaml
   image: /assets/images/blog/2026/01/mon-article/image.webp
   ```
3. Commitez et pushez
4. Le workflow GitHub Actions générera automatiquement :
   - `image.webp`
   - `image-480.webp`
   - `image-720.webp`
   - `image-1080.webp`

**Option 2 : Générez localement**
```bash
npm run generate:webp
git add assets/images/
git commit -m "feat: Add optimized images"
git push
```

## 🔍 Vérification

Pour vérifier que tout fonctionne, consultez les logs GitHub Actions :

```
📊 Vérification des fichiers générés...
224 fichiers WebP
   - Variants 480px: 224
   - Variants 720px: 224
   - Variants 1080px: 224
```

## ⚡ Performances

### Gains typiques

- **PNG → WebP** : 70-98% de réduction
- **Variant 480px** : 99% plus léger que l'original
- **Variant 720px** : 95% plus léger que l'original
- **Variant 1080px** : 90% plus léger que l'original

### Exemple réel

```
image-principale.png: 8.5MB
→ image-principale.webp: 495KB (94% réduction)
→ image-principale-480.webp: 38KB (99.5% réduction)
→ image-principale-720.webp: 73KB (99% réduction)
→ image-principale-1080.webp: 141KB (98% réduction)
```

## 🐛 Dépannage

### Les WebP ne sont pas générés lors du déploiement

1. Vérifiez les logs GitHub Actions
2. Assurez-vous que les fichiers source (PNG/JPG) sont bien commités
3. Vérifiez que le workflow a bien exécuté `npm run generate:webp`

### Erreur "Cannot find module 'sharp'"

En local :
```bash
npm install
```

Dans le CI/CD : Vérifiez que l'étape "Install npm dependencies" s'est bien exécutée.

### Le site charge toujours les PNG

Assurez-vous que vos références d'images utilisent `.webp` :
```yaml
# ✅ Correct
image: /assets/images/blog/2026/01/article/image.webp

# ❌ Incorrect
image: /assets/images/blog/2026/01/article/image.png
```

## 📚 Plus d'informations

- Composant responsive : `_includes/responsive-image.html`
- Configuration workflow : `.github/workflows/jekyll.yml`
