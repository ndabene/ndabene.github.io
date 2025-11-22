# 🤖 Prompt pour Agents IA - Publication d'Articles

> Copier-coller ce prompt lors de la publication d'articles

---

## Consignes de Publication d'Articles

Tu es un agent IA assistant à la publication d'articles sur le blog ndabene.github.io. **Respecte STRICTEMENT** ces règles :

### 🏗️ Architecture des Dossiers

```
RÈGLE ABSOLUE :
- Articles FR : _posts/YYYY/MM/YYYY-MM-DD-titre.md (SANS suffixe -fr)
- Articles EN : _posts_en/YYYY/MM/YYYY-MM-DD-titre.md (SANS suffixe -en)
```

**❌ INTERDIT :**
- `_posts/2025/12/article-fr.md` ❌ Suffixe -fr
- `_posts/2025/12/article-en.md` ❌ Version EN dans _posts/
- `_posts_en/2025/article.md` ❌ Pas dans un sous-dossier MM/

**✅ CORRECT :**
- `_posts/2025/12/2025-12-20-article.md` ✅ FR
- `_posts_en/2025/12/2025-12-20-article.md` ✅ EN (même nom)

### 📋 Front Matter pour Articles Bilingues

**Version FR :**
```yaml
---
layout: post
title: 'Titre en français'
date: 2025-12-20
lang: fr                    # OBLIGATOIRE
ref: unique-ref-id          # OBLIGATOIRE (même pour FR et EN)
author: Nicolas Dabène
categories: [Cat1, Cat2]
tags: [tag1, tag2]
excerpt: Description courte
---
```

**Version EN :**
```yaml
---
layout: post
title: 'Title in English'
date: 2025-12-20
lang: en                    # OBLIGATOIRE
ref: unique-ref-id          # MÊME ref que la version FR
author: Nicolas Dabène
categories: [Cat1, Cat2]
tags: [tag1, tag2]
excerpt: Short description
---
```

### ✅ Checklist OBLIGATOIRE Avant Publication

**Avant CHAQUE publication, vérifie :**

1. ✅ **Architecture correcte ?**
   - FR dans `_posts/YYYY/MM/` (sans -fr)
   - EN dans `_posts_en/YYYY/MM/` (sans -en)

2. ✅ **Pas de doublons de titres ?**
   ```bash
   grep -r "title:" _posts _posts_en | grep -i "mot-clé-titre"
   ```

3. ✅ **Front matter cohérent ?**
   - `lang: fr` et `lang: en` présents
   - `ref:` identique entre FR et EN
   - `date:` correspond au nom de fichier

4. ✅ **Les deux versions existent ?**
   - Si FR existe → EN doit exister (sauf article monolingue)
   - Même nom de fichier (sans suffixe langue)

5. ✅ **Pas de fichiers mal placés ?**
   ```bash
   # Aucun résultat attendu
   find _posts_en/2025 -maxdepth 1 -name "*.md"
   find _posts -name "*-fr.md" -o -name "*-en.md"
   ```

### 🚨 Erreurs à ÉVITER

| ❌ Erreur | ✅ Correction |
|-----------|---------------|
| `article-fr.md` dans `_posts/` | Renommer en `article.md` |
| `article-en.md` dans `_posts/` | Déplacer vers `_posts_en/` et renommer `article.md` |
| Titre identique à un autre article | Différencier le titre |
| `ref:` différentes FR/EN | Utiliser la même `ref:` |
| Article dans `_posts_en/2025/` | Déplacer dans `_posts_en/2025/12/` |

### 📝 Workflow Standard

```bash
# 1. Créer l'article FR
_posts/2025/12/2025-12-20-titre-unique.md

# 2. Créer l'article EN (même nom sans suffixe)
_posts_en/2025/12/2025-12-20-titre-unique.md

# 3. Vérifier avant commit
find _posts _posts_en -name "*-fr.md" -o -name "*-en.md"  # Doit retourner vide
grep -r "^title:" _posts _posts_en | sort | uniq -d       # Doit retourner vide

# 4. Commiter
git add _posts/2025/12/2025-12-20-titre-unique.md
git add _posts_en/2025/12/2025-12-20-titre-unique.md
git commit -m "feat: Ajouter article [titre]"
git push
```

### 🎯 Règles d'Or (Mémoriser)

1. **Jamais de suffixe -fr ou -en** dans les noms de fichiers
2. **FR dans _posts/, EN dans _posts_en/** (jamais l'inverse)
3. **Organisation YYYY/MM/** obligatoire
4. **Même nom de fichier** pour FR et EN
5. **`lang:` et `ref:` obligatoires** pour articles bilingues
6. **Vérifier les doublons de titres** avant publication
7. **Toujours vérifier l'architecture** avant de commiter

---

**Guide complet disponible dans :** `.claude/article-publication-guidelines.md`

**En cas de doute :** Consulte le guide complet ou demande confirmation avant de publier.

---

**IMPORTANT :** Si tu détectes une incohérence ou un problème, **ARRÊTE et SIGNALE** avant de continuer.
