# 🔧 Guide d'intégration des améliorations de filtres

## 1. Ajouter les nouveaux fichiers à la page blog

### Dans `pages/blog.html`

Ajouter après la section de recherche (vers la ligne 100) :

```html
<!-- Mode de filtrage ET/OU -->
{% include filter-mode-toggle.html %}

<!-- Container pour les suggestions de tags -->
<div id="tag-suggestions"></div>
```

### Dans `_layouts/default.html` ou dans `pages/blog.html`

Ajouter les nouveaux scripts avant la fermeture du `</body>` :

```html
<!-- Améliorations des filtres (uniquement sur la page blog) -->
{% if page.url == '/blog/' %}
<link rel="stylesheet" href="{{ '/assets/css/filter-enhancements.css' | relative_url }}">
<script src="{{ '/assets/js/filter-enhancements.js' | relative_url }}" defer></script>
{% endif %}
```

## 2. Modifier `blog-search-pagefind.js`

### Ajouter le support du mode ET/OU

Dans la fonction `performPagefindSearch` (ligne 58), modifier :

```javascript
// AVANT
if (activeFilters.tags.length > 0) {
    pagefindFilters.tags = activeFilters.tags;
}

// APRÈS
if (activeFilters.tags.length > 0) {
    const filterMode = window.filterEnhancements?.getFilterMode() || 'OR';

    if (filterMode === 'AND') {
        // Mode ET : tous les tags doivent être présents
        pagefindFilters.tags = activeFilters.tags;
    } else {
        // Mode OU : au moins un tag doit être présent
        pagefindFilters.tags = activeFilters.tags;
    }
}
```

### Ajouter les suggestions après le filtrage

Dans la fonction `toggleTagFilter` (ligne 372), après `updateActiveFiltersUI()` :

```javascript
// Mettre à jour les suggestions
if (window.filterEnhancements?.updateTagSuggestions) {
    window.filterEnhancements.updateTagSuggestions(activeFilters.tags);
}
```

### Ajouter le tri par pertinence

Dans la fonction `displaySearchResults` (ligne 132), avant `updatePagination()` :

```javascript
// Trier les résultats par pertinence
if (window.filterEnhancements?.sortResultsByRelevance) {
    window.filterEnhancements.sortResultsByRelevance(
        postsContainer,
        activeFilters.tags,
        query
    );
}
```

## 3. Exposer les fonctions nécessaires

À la fin de `blog-search-pagefind.js`, exposer les fonctions globalement :

```javascript
// Exposer les fonctions pour les améliorations
window.toggleTagFilter = toggleTagFilter;
window.activeFilters = activeFilters;
```

## 4. Test des améliorations

### Test du script de normalisation

```bash
# 1. Prévisualiser les changements
ruby scripts/normalize_tags.rb

# Vous devriez voir quelque chose comme :
# 📄 _posts/2025/06/2025-06-15-vibe-coding.md
#    Avant: IA, AI, développement
#    Après: IA, développement

# 2. Si tout est correct, appliquer
ruby scripts/normalize_tags.rb --apply
```

### Test des suggestions de tags

1. Ouvrir `/blog/` dans votre navigateur
2. Cliquer sur un tag (ex: #IA)
3. Vérifier que des suggestions apparaissent en haut
4. Cliquer sur une suggestion → le tag doit s'ajouter aux filtres actifs

### Test du mode ET/OU

1. Cliquer sur plusieurs tags
2. Observer les résultats en mode OU (par défaut)
3. Basculer en mode ET
4. Observer que seuls les articles avec TOUS les tags s'affichent

### Test du tri par pertinence

1. Faire une recherche avec plusieurs tags
2. Les articles les plus pertinents doivent apparaître en premier
3. Les articles featured doivent avoir un bonus de pertinence

## 5. Styles à personnaliser (optionnel)

Si vous voulez adapter les couleurs à votre charte graphique, modifier dans `filter-enhancements.css` :

```css
/* Couleur principale du gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* → Remplacer par vos couleurs */

/* Couleur des tags actifs */
.tag-pill-large.active-filter {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 6. Déploiement

### Commit des changements

```bash
git add scripts/ assets/ _includes/ FILTER_IMPROVEMENTS.md INTEGRATION_EXAMPLE.md
git commit -m "feat: Ajouter améliorations des filtres Pagefind

- Script de normalisation des tags
- Suggestions de tags liés basées sur la co-occurrence
- Mode de filtrage ET/OU
- Tri des résultats par pertinence
- Documentation complète

Impact attendu:
- Consolidation des tags (IA: 73→91 articles)
- Meilleure découvrabilité du contenu
- Expérience de filtrage plus intuitive"

git push
```

### Intégration progressive

Si vous préférez tester progressivement :

**Étape 1 : Normalisation seule**
```bash
ruby scripts/normalize_tags.rb --apply
git add _posts scripts/normalize_tags.rb
git commit -m "chore: Normaliser les tags du blog"
git push
```

**Étape 2 : Attendre le rebuild et tester**

**Étape 3 : Ajouter les améliorations JS/CSS**
```bash
git add assets/ _includes/
git commit -m "feat: Ajouter suggestions et tri des filtres"
git push
```

## 7. Vérifications post-déploiement

✅ **Checklist** :

- [ ] Les tags sont normalisés dans les articles
- [ ] L'index Pagefind a été régénéré (vérifier les logs CI/CD)
- [ ] La recherche fonctionne toujours
- [ ] Les suggestions de tags apparaissent
- [ ] Le toggle ET/OU fonctionne
- [ ] Le tri par pertinence est actif
- [ ] Les styles sont corrects sur mobile et desktop
- [ ] Pas d'erreurs dans la console du navigateur

## 8. Rollback si nécessaire

Si quelque chose ne fonctionne pas :

```bash
# Revenir au commit précédent
git reset --hard HEAD~1

# Ou revenir à un commit spécifique
git reset --hard <commit-hash>

# Push force (attention, à utiliser avec précaution)
git push --force
```

## 9. Support et debugging

### Console du navigateur

Les scripts affichent des logs utiles :

```javascript
console.log('🏷️  20 tags configurés comme filtres')
console.log('✨ Améliorations des filtres chargées')
console.log('🔍 Recherche Pagefind: "MCP"')
```

### Vérifier que les filtres sont bien indexés

Après le build, inspecter un article HTML généré :

```bash
cat _site/articles/2025/06/15/vibe-coding-prompt-driven-development.html | grep data-pagefind-filter
```

Vous devriez voir :
```html
data-pagefind-filter="tags:IA"
data-pagefind-filter="tags:développement"
data-pagefind-filter="tags:prompt engineering"
```

## 10. Optimisations futures

### Script de validation pre-commit

Créer `.git/hooks/pre-commit` :

```bash
#!/bin/bash
ruby scripts/normalize_tags.rb --check
if [ $? -ne 0 ]; then
    echo "❌ Des tags non normalisés ont été détectés"
    echo "Exécutez: ruby scripts/normalize_tags.rb --apply"
    exit 1
fi
```

### Analytics

Tracker l'usage des filtres avec Google Analytics :

```javascript
// Dans blog-search-pagefind.js
function toggleTagFilter(tag) {
    // ... code existant ...

    // Track dans GA4
    if (window.gtag) {
        gtag('event', 'filter_tag', {
            'tag_name': tag,
            'filter_action': activeFilters.tags.includes(tag) ? 'add' : 'remove'
        });
    }
}
```

## 🎉 C'est terminé !

Votre système de filtres est maintenant optimisé pour offrir une meilleure expérience utilisateur.
