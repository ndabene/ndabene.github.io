# Plan de corrections du blog

## 🎯 Objectifs
1. Corriger les titres dupliqués/identiques
2. Ajouter les extraits manquants
3. Améliorer le moteur de recherche
4. Corriger les titres tronqués

---

## 📋 Phase 1 : Correction des titres (Priorité HAUTE)

### Problème : Titres identiques créant de la confusion

#### Articles à renommer :

**Groupe 1 : "ChatGPT autorise les conversations érotiques" (3 articles)**
- `_posts/2025/10/2025-10-07-faq-geo-essentielles.md`
  - Titre actuel incorrect (ne correspond pas au contenu)
  - Devrait être lié aux FAQ GEO
- `_posts/2025/09/2025-09-16-black-friday-geo-suite.md`
  - Titre actuel incorrect
  - Devrait être lié au Black Friday et GEO
- `_posts/2025/12/2025-12-02-chatgpt-souvre-aux-conversations-erotiques-un-tournant-assume-par-openai.md`
  - ✓ Titre correct pour cet article

**Groupe 2 : "Comment l'IA découvre vos outils MCP?" (3 articles)**
- `_posts/2025/12/2025-12-04-menu-mcp-comment-l-ia-decouvre-et-utilise-vos-outils.md`
  - ✓ Titre correct
- `_posts/2025/11/2025-11-24-agents-ia-ecommerce-mcp.md`
  - Titre devrait parler d'agents IA e-commerce
- `_posts/2025/11/2025-11-20-piloter-sa-boutique-prestashop-en-langage-naturel.md`
  - Titre devrait parler de pilotage PrestaShop en langage naturel

**Groupe 3 : "OpenAI Agent Builder" (2 articles)**
- `_posts/2025/10/2025-10-16-openai-agent-builder-revolution-assistants-ia-personnalises.md`
  - ✓ Titre correct
- `_posts/2025/08/2025-08-08-chatgpt-shopify.md`
  - Titre devrait parler de ChatGPT et Shopify

**Groupe 4 : Titres tronqués "L" ou "l"**
- `_posts/2025/12/2025-12-01-ia-opportunite-pas-menace.md`
  - Titre tronqué, vérifier le contenu
- `_posts/2025/07/2025-07-17-evolution-historique-back-to-school.md`
  - Titre tronqué, vérifier le contenu
- `_posts/2025/11/2025-11-21-ia-paresseuse-superpouvoir.md`
  - Titre tronqué, vérifier le contenu
- `_posts/2025/11/2025-11-25-voice-engine-optimization-veo.md`
  - Titre incomplet "VEO 2025 : l"

**Groupe 5 : Autres doublons**
- `_posts/2025/09/2025-09-18-google-shopping-gemini-revolution-ia-e-commerce.md`
- `_posts/2025/09/2025-09-23-google-shopping-evolution.md`
  - Les deux parlent de "Évolution de Google Shopping : Froogle à l"
  - Vérifier si c'est vraiment le même contenu ou si titres à différencier

---

## 📋 Phase 2 : Ajout des extraits manquants (Priorité MOYENNE)

### 43 articles sans `excerpt:` dans le front matter

**Action** :
1. Parcourir chaque article
2. Extraire 1-2 phrases pertinentes du début
3. Ajouter dans le front matter :
```yaml
excerpt: 'Description courte et engageante de l'article en 1-2 phrases.'
```

**Liste des articles à traiter** : Voir `comprehensive_analysis_report.txt` section "EXTRAITS MANQUANTS"

---

## 📋 Phase 3 : Amélioration du moteur de recherche (Priorité HAUTE)

### Problèmes actuels :
1. ❌ Ne cherche pas dans le contenu complet des articles
2. ❌ Ne cherche pas dans les catégories ou tags
3. ❌ Pas de recherche floue
4. ❌ Pas de suggestions

### Solutions proposées :

#### Option A : Amélioration simple (recommandé pour démarrer)
**Fichier** : `assets/js/blog-filters.js`

**Modifications** :
1. Ajouter recherche dans les catégories et tags
2. Ajouter recherche dans le contenu (si disponible en data-attribute)
3. Améliorer le feedback quand 0 résultat

**Code à modifier** (lignes 286-308) :
```javascript
// Actuel : cherche seulement dans title + excerpt
const title = post.querySelector('.post-news-title')?.textContent.toLowerCase() || '';
const content = post.querySelector('.post-news-excerpt')?.textContent.toLowerCase() || '';

// Proposé : ajouter catégories et tags
const title = post.querySelector('.post-news-title')?.textContent.toLowerCase() || '';
const content = post.querySelector('.post-news-excerpt')?.textContent.toLowerCase() || '';
const categories = postPreviewElement.getAttribute('data-categories')?.toLowerCase() || '';
const tags = postPreviewElement.getAttribute('data-tags')?.toLowerCase() || '';

// Filtre recherche modifié
if (state.currentSearch &&
    !title.includes(state.currentSearch) &&
    !content.includes(state.currentSearch) &&
    !categories.includes(state.currentSearch) &&
    !tags.includes(state.currentSearch)) {
    visible = false;
}
```

#### Option B : Index de recherche avancé (pour plus tard)
- Implémenter Lunr.js ou Fuse.js
- Créer un index JSON de tous les articles avec contenu complet
- Recherche floue, scoring de pertinence, suggestions

---

## 📋 Phase 4 : Articles futurs (Info)

**14 articles futurs non visibles** sans `?admin_preview=true`

**Dates de publication** :
- 2025-11-20, 2025-11-21, 2025-11-24, 2025-11-25, 2025-11-26, 2025-11-27, 2025-11-28
- 2025-12-01, 2025-12-02, 2025-12-03, 2025-12-04, 2025-12-09, 2025-12-11, 2025-12-18

**Note** : C'est normal, pas de correction nécessaire. Ils apparaîtront automatiquement à leurs dates respectives.

---

## 🚀 Ordre d'exécution recommandé

### Semaine 1 : Corrections critiques
1. ✅ **Analyser tous les titres dupliqués** (fait)
2. ⏳ **Corriger les 10-15 titres problématiques**
   - Ouvrir chaque fichier
   - Lire le contenu
   - Mettre à jour le `title:` dans le front matter
3. ⏳ **Corriger les 4 titres tronqués "L"**

### Semaine 2 : Amélioration recherche
4. ⏳ **Améliorer le moteur de recherche** (Option A)
   - Ajouter recherche dans catégories/tags
   - Ajouter message utile si 0 résultat
   - Tester

### Semaine 3-4 : Finalisation
5. ⏳ **Ajouter les 43 extraits manquants**
   - Peut être fait progressivement
   - 5-10 articles par jour

---

## 📊 Métriques de succès

Après corrections :
- ✅ 0 titre dupliqué
- ✅ 100% des articles avec excerpt
- ✅ Recherche fonctionnelle dans catégories/tags
- ✅ Meilleure expérience utilisateur

---

## 🔧 Scripts utiles créés

1. `analyze_posts.py` - Analyse basique des posts
2. `comprehensive_analysis.py` - Analyse complète avec tous les problèmes
3. `comprehensive_analysis_report.txt` - Rapport détaillé

---

## ❓ Décisions à prendre

1. **Titres dupliqués** : Quel titre donner à chaque article ?
   - Besoin de lire le contenu pour choisir
   - Voulez-vous que je propose des titres ?

2. **Extraits** : Génération automatique ou manuelle ?
   - Je peux créer un script pour proposer des extraits
   - Ou les ajouter manuellement un par un

3. **Recherche** : Option A (simple) ou Option B (avancée) ?
   - Option A = rapide, amélioration immédiate
   - Option B = plus long, meilleure expérience

---

## 📝 Notes

- Rapport complet disponible : `comprehensive_analysis_report.txt`
- Tous les fichiers à corriger sont listés
- Aucune perte de données, seulement des améliorations
