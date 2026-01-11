# Génération automatique des images WebP

Ce document explique comment fonctionne le système de conversion automatique des images en format WebP pour le site.

## 📋 Vue d'ensemble

Le site utilise désormais exclusivement des images au format **WebP** pour optimiser les performances et réduire la bande passante. Cependant, vous pouvez continuer à ajouter vos images aux formats classiques (JPG, PNG), et le système génère automatiquement les versions WebP.

## 🔄 Workflow

### 1. Ajout d'une nouvelle image

Placez simplement votre image au format JPG ou PNG dans le dossier `assets/images/` :

```bash
# Exemple
assets/images/blog/2025/12/mon-nouvel-article.jpg
```

### 2. Génération des WebP en développement

Avant de commencer à travailler, lancez le script de génération :

```bash
npm run generate:webp
```

Ce script va :
- ✅ Parcourir tous les dossiers dans `assets/images/`
- ✅ Détecter les images JPG/PNG sans version WebP
- ✅ Générer automatiquement les fichiers `.webp` correspondants
- ✅ Ignorer les images déjà converties (optimisation)

### 3. Utilisation dans les articles

Dans vos fichiers markdown, référencez toujours l'image en `.webp` :

```yaml
---
title: Mon article
image: /assets/images/blog/2025/12/mon-nouvel-article.webp
---
```

**Important** : Même si vous ajoutez `mon-nouvel-article.jpg`, référencez toujours `mon-nouvel-article.webp` dans le frontmatter.

### 4. Déploiement automatique

Lors du push vers `main`, GitHub Actions exécute automatiquement :

1. Installation de webp
2. Génération des WebP manquants
3. Build du site Jekyll
4. Déploiement

Vous n'avez **rien à faire** ! 🎉

## 🛠️ Commandes disponibles

### En développement local

```bash
# Générer tous les WebP manquants
npm run generate:webp

# Équivalent à :
bash scripts/generate-webp.sh
```

### Sortie du script

```
🖼️  Génération automatique des images WebP

📁 Parcours de assets/images...

✓ assets/images/blog/2025/12/article.jpg → assets/images/blog/2025/12/article.webp

=========================================
✓ Génération terminée
=========================================
Images converties    : 1
Images déjà existantes : 104
Erreurs              : 0
=========================================
```

## ⚙️ Configuration

Le script utilise les paramètres suivants :

- **Qualité WebP** : 85 (bon compromis qualité/taille)
- **Extensions supportées** : `.jpg`, `.jpeg`, `.png`
- **Dossier cible** : `assets/images/`

Pour modifier la qualité, éditez `scripts/generate-webp.sh` :

```bash
QUALITY=85  # Changez cette valeur (0-100)
```

## 📊 Avantages du WebP

- **Taille réduite** : ~30% plus léger que JPG/PNG
- **Qualité préservée** : Qualité visuelle identique
- **Support navigateurs** : 96%+ des navigateurs modernes
- **SEO** : Google favorise les sites optimisés

## 🔍 Débogage

### Vérifier si webp est installé

```bash
which cwebp
# Devrait retourner : /usr/bin/cwebp
```

### Installation manuelle de webp

**Ubuntu/Debian :**
```bash
sudo apt-get install webp
```

**macOS :**
```bash
brew install webp
```

**Windows :**
Téléchargez depuis [Google WebP Downloads](https://developers.google.com/speed/webp/download)

### Le script ne trouve pas d'images

Vérifiez que vous êtes à la racine du projet :

```bash
pwd
# Devrait afficher : /chemin/vers/ndabene.github.io
```

### Erreur de conversion

Si une image ne se convertit pas, vérifiez :
- Le fichier source existe et n'est pas corrompu
- Vous avez les permissions en écriture sur le dossier
- Le nom du fichier ne contient pas de caractères spéciaux

## 🚀 Workflow complet (exemple)

1. **Ajout d'une nouvelle image** :
   ```bash
   # Copier votre image
   cp ~/Downloads/mon-image.jpg assets/images/blog/2025/12/
   ```

2. **Génération du WebP** :
   ```bash
   npm run generate:webp
   # ✓ assets/images/blog/2025/12/mon-image.jpg → mon-image.webp
   ```

3. **Utilisation dans l'article** :
   ```markdown
   ---
   image: /assets/images/blog/2025/12/mon-image.webp
   ---

   ![Description]({{ site.baseurl }}/assets/images/blog/2025/12/mon-image.webp)
   ```

4. **Commit et push** :
   ```bash
   git add .
   git commit -m "feat: Ajouter article avec image"
   git push origin main
   # GitHub Actions génère automatiquement le WebP si manquant
   ```

## 📝 Notes importantes

- ⚠️ **Ne commitez PAS** les fichiers JPG/PNG si vous avez déjà les WebP (alourdissement du dépôt)
- ✅ Les références dans le markdown doivent **toujours** pointer vers `.webp`
- 🔄 Le script est **idempotent** : on peut le relancer autant de fois qu'on veut
- 🎯 Seules les images **manquantes** sont générées (pas de regénération inutile)

## 🐛 Problèmes connus

**Q : Mon image n'apparaît pas sur le site**
- Vérifiez que vous référencez bien `.webp` dans le frontmatter
- Vérifiez que le fichier `.webp` existe dans `assets/images/`
- Relancez `npm run generate:webp` pour être sûr

**Q : Le script est lent**
- C'est normal pour la première génération (104 images)
- Les exécutions suivantes sont quasi-instantanées (uniquement les nouvelles images)

**Q : Puis-je supprimer les JPG/PNG originaux ?**
- Techniquement oui, une fois les WebP générés
- Mais gardez-les si vous voulez pouvoir régénérer avec une qualité différente

## 📚 Ressources

- [Google WebP Documentation](https://developers.google.com/speed/webp)
- [Can I use WebP?](https://caniuse.com/webp)
- [WebP Compression Study](https://developers.google.com/speed/webp/docs/webp_study)

---

**Auteur** : Nicolas Dabène
**Dernière mise à jour** : 2025-11-29
