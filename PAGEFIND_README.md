# Pagefind - Recherche Statique pour le Blog

## 🎯 Qu'est-ce que Pagefind ?

[Pagefind](https://pagefind.app/) est un outil de recherche statique ultra-performant qui remplace Fuse.js sur notre blog. Il génère un index de recherche au moment du build (via GitHub Actions), ce qui offre :

- ✅ **Performance** : Index créé au build-time, pas de chargement runtime
- ✅ **Full-text search** : Recherche dans tout le contenu des articles
- ✅ **Léger** : Chargement progressif des fragments d'index
- ✅ **Multilingue** : Support natif FR/EN
- ✅ **SEO-friendly** : Fonctionne avec le contenu statique généré

## 📦 Installation et Configuration

### 1. Workflow GitHub Actions

Le fichier `.github/workflows/jekyll.yml` a été modifié pour inclure :

```yaml
- name: Install Pagefind
  run: |
    echo "📦 Installation de Pagefind pour l'indexation de recherche..."
    npm install -g pagefind
    echo "✅ Pagefind installé avec succès"

- name: Build Pagefind index
  run: |
    echo "🔍 Génération de l'index de recherche Pagefind..."
    npx pagefind --site _site --output-path _site/pagefind
    echo "✅ Index Pagefind généré avec succès"
```

### 2. Configuration Pagefind

Le fichier `pagefind.yml` contient la configuration de l'indexation :

```yaml
source: _site
glob: "**/*.html"
exclude_selectors:
  - ".social-sharing-section"
  - ".post-meta"
  - "nav"
  - "footer"
force_language: fr
```

### 3. Attributs HTML pour l'indexation

Les articles utilisent les attributs suivants :

- `data-pagefind-body` : Marque le contenu principal à indexer
- `data-pagefind-ignore` : Exclut certaines sections (partage social, meta, etc.)
- `data-pagefind-meta` : Métadonnées pour filtrer/trier

Exemple dans `_layouts/post.html` :

```html
<article class="post-page" data-pagefind-body data-pagefind-meta="lang:{{ page.lang | default: 'fr' }}">
  <h1 class="post-title" data-pagefind-meta="title">{{ page.title }}</h1>
  <div class="post-meta" data-pagefind-ignore>...</div>
  <article class="post-content" data-pagefind-body>
    {{ content }}
  </article>
</article>
```

## 🧪 Tester localement

### Option 1 : Avec Jekyll + Pagefind

```bash
# 1. Build Jekyll
bundle exec jekyll build

# 2. Installer Pagefind (si pas déjà fait)
npm install -g pagefind

# 3. Générer l'index
npx pagefind --site _site --output-path _site/pagefind

# 4. Servir le site
bundle exec jekyll serve
```

### Option 2 : Avec le serveur Pagefind

```bash
# 1. Build Jekyll et index
bundle exec jekyll build
npx pagefind --site _site

# 2. Servir avec le serveur Pagefind
npx pagefind --serve --site _site
```

## 🚀 Déploiement

L'indexation Pagefind se fait **automatiquement** à chaque push sur `main` via GitHub Actions :

1. ✅ Jekyll build le site → `_site/`
2. ✅ Pagefind indexe le contenu → `_site/pagefind/`
3. ✅ Le tout est déployé sur GitHub Pages

**Aucune action manuelle requise !**

## 📝 Intégration JavaScript

Le fichier `assets/js/blog-search-pagefind.js` gère :

- Chargement asynchrone de Pagefind
- Recherche avec debounce (300ms)
- Affichage des résultats
- Mise en surbrillance des termes de recherche
- Fallback vers recherche basique si Pagefind échoue
- Raccourcis clavier (`/` ou `Ctrl+K`)

## 🎨 Interface Utilisateur

La recherche réutilise l'interface existante du blog :

- Barre de recherche globale
- Affichage des résultats filtrés
- Message "Aucun résultat trouvé"
- Compatible avec la pagination existante

## 🔄 Migration depuis Fuse.js

### Fichiers modifiés :

- ✅ `.github/workflows/jekyll.yml` - Ajout étapes Pagefind
- ✅ `pages/blog.html` - Remplacement Fuse.js par Pagefind
- ✅ `en/blog.html` - Remplacement Fuse.js par Pagefind
- ✅ `_layouts/post.html` - Ajout attributs data-pagefind

### Fichiers créés :

- ✅ `assets/js/blog-search-pagefind.js` - Script de recherche
- ✅ `pagefind.yml` - Configuration Pagefind
- ✅ `PAGEFIND_README.md` - Cette documentation

### Fichiers conservés (rétrocompatibilité) :

- ⚠️ `assets/js/blog-search-modern.js` - Peut être supprimé après validation

## 📊 Performance

### Avant (Fuse.js) :
- Chargement CDN Fuse.js (~50KB)
- Indexation runtime de tous les articles
- Recherche côté client sur tous les posts

### Après (Pagefind) :
- Index pré-généré au build
- Chargement progressif (~10KB initial + fragments à la demande)
- Recherche ultra-rapide sur l'index pré-calculé

## 🐛 Debugging

### Vérifier que l'index est généré :

```bash
# Après le build
ls -la _site/pagefind/
# Devrait contenir : pagefind.js, index files, etc.
```

### Logs GitHub Actions :

Vérifiez les logs de l'action "Build Pagefind index" dans le workflow Jekyll.

### Console navigateur :

```javascript
// Vérifier que Pagefind est chargé
console.log(window.pagefind);
```

## 📚 Ressources

- [Documentation officielle Pagefind](https://pagefind.app/docs/)
- [Configuration options](https://pagefind.app/docs/config-options/)
- [API Reference](https://pagefind.app/docs/api/)

---

**Mis en place le** : 31 décembre 2025
**Indexation automatique** : ✅ Activée via GitHub Actions
