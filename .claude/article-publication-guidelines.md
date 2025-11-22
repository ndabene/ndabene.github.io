# 📝 Consignes de Publication d'Articles - ndabene.github.io

> Guide pour les agents IA assistant à la publication d'articles sur le blog

## 🏗️ Architecture des Dossiers

### Structure Obligatoire

```
_posts/                          # Articles en FRANÇAIS uniquement
  └── YYYY/MM/
      └── YYYY-MM-DD-titre.md    # SANS suffixe -fr

_posts_en/                       # Articles en ANGLAIS uniquement
  └── YYYY/MM/
      └── YYYY-MM-DD-titre.md    # SANS suffixe -en
```

### ❌ ERREURS À ÉVITER

```
❌ _posts/2025/12/article-fr.md           # Suffixe -fr interdit
❌ _posts/2025/12/article-en.md           # Version EN au mauvais endroit
❌ _posts_en/2025/article.md              # Doit être dans /2025/12/
❌ _posts/2025/article.md                 # Doit être dans /2025/12/
```

### ✅ CORRECT

```
✅ _posts/2025/12/2025-12-20-mon-article.md        # FR
✅ _posts_en/2025/12/2025-12-20-mon-article.md     # EN (même nom de base)
```

---

## 📋 Règles de Nommage

### Format de Fichier

```
YYYY-MM-DD-titre-en-minuscules-avec-tirets.md
```

**Exemples :**
- ✅ `2025-12-20-prestashop-module-guide.md`
- ✅ `2025-12-20-ia-developpement-bonnes-pratiques.md`
- ❌ `2025-12-20-PrestaShop_Module_Guide.md` (majuscules et underscores)
- ❌ `prestashop-module-guide.md` (pas de date)

### Règles de Titre

1. **Unicité obligatoire** : Vérifier qu'aucun autre article n'a le même titre
2. **Correspondance FR/EN** : Les versions bilingues doivent avoir le même slug de fichier
3. **Pas de caractères spéciaux** : Utiliser uniquement `a-z`, `0-9`, `-`

---

## 🔍 Front Matter Obligatoire

### Pour un Article Français (`_posts/`)

```yaml
---
layout: post
title: 'Titre de l''article en français'
date: YYYY-MM-DD
lang: fr                                    # OBLIGATOIRE pour articles bilingues
ref: unique-article-reference               # OBLIGATOIRE pour lier FR/EN
author: Nicolas Dabène
categories:
- Catégorie1
- Catégorie2
tags:
- tag1
- tag2
excerpt: Description courte de l'article
image: /assets/images/blog/YYYY/MM/YYYY-MM-DD-titre.jpg
featured: false
difficulty: Intermédiaire
technologies:
- Tech1
- Tech2
estimated_reading_time: X minutes
---
```

### Pour un Article Anglais (`_posts_en/`)

```yaml
---
layout: post
title: 'Article title in English'
date: YYYY-MM-DD
lang: en                                    # OBLIGATOIRE
ref: unique-article-reference               # MÊME ref que la version FR
author: Nicolas Dabène
categories:
- Category1
- Category2
tags:
- tag1
- tag2
excerpt: Short article description
image: /assets/images/blog/YYYY/MM/YYYY-MM-DD-titre.jpg
featured: false
difficulty: Intermediate
technologies:
- Tech1
- Tech2
estimated_reading_time: X minutes
---
```

### ⚠️ POINTS CRITIQUES

- ✅ `lang:` et `ref:` sont **OBLIGATOIRES** pour les articles bilingues
- ✅ La `ref:` doit être **identique** entre FR et EN
- ✅ La `date:` doit correspondre au nom du fichier
- ✅ Le nom de fichier (sans date) doit être **identique** pour FR/EN

---

## ✅ Checklist Avant Publication

### 1. Vérifier l'Architecture

```bash
# L'article FR est-il dans le bon dossier ?
_posts/YYYY/MM/YYYY-MM-DD-titre.md ✓

# L'article EN est-il dans le bon dossier ?
_posts_en/YYYY/MM/YYYY-MM-DD-titre.md ✓

# Pas de suffixes -fr ou -en ?
Fichiers sans -fr.md ou -en.md ✓
```

### 2. Vérifier les Doublons

```bash
# Chercher des titres similaires existants
grep -r "title:" _posts/ _posts_en/ | grep -i "mot-clé-du-titre"

# Chercher des fichiers avec le même slug
find _posts _posts_en -name "*slug-similaire*"
```

### 3. Vérifier le Front Matter

- [ ] `lang: fr` ou `lang: en` présent
- [ ] `ref:` identique entre FR et EN
- [ ] `date:` correspond au nom de fichier
- [ ] `title:` unique (pas de doublon)
- [ ] `image:` existe dans `/assets/images/blog/YYYY/MM/`
- [ ] `excerpt:` renseigné
- [ ] `categories:` et `tags:` pertinents

### 4. Vérifier les Versions Bilingues

```bash
# Si article FR existe, vérifier qu'EN existe
Article FR : _posts/2025/12/2025-12-20-titre.md
Article EN : _posts_en/2025/12/2025-12-20-titre.md

# Vérifier que les ref: sont identiques
grep "^ref:" _posts/2025/12/2025-12-20-titre.md
grep "^ref:" _posts_en/2025/12/2025-12-20-titre.md
```

---

## 🤖 Commandes de Vérification Automatique

### Script de Validation Rapide

```bash
#!/bin/bash
# Vérifier qu'il n'y a pas de fichiers avec suffixes -fr/-en dans _posts/
echo "Vérification des suffixes interdits..."
find _posts -name "*-fr.md" -o -name "*-en.md"

# Vérifier qu'il n'y a pas de fichiers à la racine des années
echo "Vérification des fichiers mal placés..."
find _posts_en/2025 -maxdepth 1 -name "*.md"
find _posts/2025 -maxdepth 1 -name "*.md"

# Vérifier les doublons de titres
echo "Vérification des doublons de titres..."
grep -rh "^title:" _posts _posts_en | sort | uniq -d

# Lister les articles sans version bilingue
echo "Articles FR sans version EN :"
for file in _posts/2025/*/*.md; do
  basename=$(basename "$file")
  if [ ! -f "_posts_en/2025/$(basename $(dirname $file))/$basename" ]; then
    echo "  ❌ $file (manque EN)"
  fi
done
```

---

## 📊 Exemples Complets

### Exemple 1 : Article Bilingue Complet

**Fichier FR :** `_posts/2025/12/2025-12-20-guide-mcp-serveur.md`
```yaml
---
layout: post
title: 'Guide complet : Créer un serveur MCP'
date: 2025-12-20
lang: fr
ref: complete-guide-mcp-server
author: Nicolas Dabène
categories:
- IA
- Tutoriel
tags:
- MCP
- TypeScript
excerpt: Apprenez à créer un serveur MCP de A à Z
---
```

**Fichier EN :** `_posts_en/2025/12/2025-12-20-guide-mcp-serveur.md`
```yaml
---
layout: post
title: 'Complete Guide: Create an MCP Server'
date: 2025-12-20
lang: en
ref: complete-guide-mcp-server
author: Nicolas Dabène
categories:
- AI
- Tutorial
tags:
- MCP
- TypeScript
excerpt: Learn how to create an MCP server from scratch
---
```

### Exemple 2 : Article Monolingue (FR uniquement)

**Fichier FR :** `_posts/2025/12/2025-12-20-actualite-prestashop.md`
```yaml
---
layout: post
title: 'Actualité PrestaShop France - Décembre 2025'
date: 2025-12-20
author: Nicolas Dabène
categories:
- PrestaShop
- Actualités
tags:
- PrestaShop
- France
excerpt: Les actualités PrestaShop du mois
---
```

**Pas de champ `lang:` ni `ref:`** car pas de version EN prévue.

---

## 🚨 Erreurs Courantes à Éviter

### 1. Doublons de Titres

**❌ Problème :**
```
_posts/2025/08/2025-08-03-mcp-protocol-guide.md
  title: Comment sécuriser un serveur MCP?

_posts/2025/12/2025-12-11-securiser-serveur-mcp.md
  title: Comment sécuriser un serveur MCP?
```

**✅ Solution :** Différencier les titres
```
_posts/2025/08/2025-08-03-mcp-protocol-guide.md
  title: 'Comprendre le Model Context Protocol (MCP) : Guide Complet'

_posts/2025/12/2025-12-11-securiser-serveur-mcp.md
  title: 'Sécuriser votre Serveur MCP : Permissions et Protection'
```

### 2. Mauvaise Organisation des Versions Bilingues

**❌ Problème :**
```
_posts/2025/12/2025-12-20-article-fr.md
_posts/2025/12/2025-12-20-article-en.md
```

**✅ Solution :**
```
_posts/2025/12/2025-12-20-article.md        # FR
_posts_en/2025/12/2025-12-20-article.md     # EN
```

### 3. Références Bilingues Non Cohérentes

**❌ Problème :**
```yaml
# FR
ref: article-mcp-guide

# EN
ref: mcp-guide-article
```

**✅ Solution :**
```yaml
# FR et EN
ref: mcp-guide-article
```

---

## 📝 Workflow de Publication

### Étape par Étape

1. **Préparer l'article**
   - Écrire le contenu en markdown
   - Choisir un titre **unique**
   - Déterminer la date de publication

2. **Créer le fichier**
   ```bash
   # Pour FR
   _posts/2025/12/2025-12-20-titre-unique.md

   # Pour EN (si applicable)
   _posts_en/2025/12/2025-12-20-titre-unique.md
   ```

3. **Remplir le front matter**
   - Copier le template ci-dessus
   - Renseigner tous les champs obligatoires
   - Ajouter `lang:` et `ref:` si bilingue

4. **Vérifier avant commit**
   ```bash
   # Pas de doublons de titres
   grep -r "title: '$(grep "^title:" mon-article.md | cut -d"'" -f2)'" _posts _posts_en

   # Pas de fichiers mal nommés
   ls _posts/2025/12/*-fr.md _posts/2025/12/*-en.md 2>/dev/null

   # Les deux versions existent
   ls _posts/2025/12/2025-12-20-titre.md
   ls _posts_en/2025/12/2025-12-20-titre.md
   ```

5. **Commiter et pusher**
   ```bash
   git add _posts/2025/12/2025-12-20-titre.md
   git add _posts_en/2025/12/2025-12-20-titre.md
   git commit -m "feat: Ajouter article sur [sujet]"
   git push
   ```

---

## 🎯 Résumé des Règles d'Or

1. ✅ **UN dossier par langue** : `_posts/` (FR) et `_posts_en/` (EN)
2. ✅ **Organisation par date** : `YYYY/MM/YYYY-MM-DD-titre.md`
3. ✅ **Pas de suffixes** : Jamais de `-fr.md` ou `-en.md`
4. ✅ **Même nom de fichier** : Versions FR/EN ont le même slug
5. ✅ **Front matter cohérent** : `lang:` et `ref:` identiques entre versions
6. ✅ **Titres uniques** : Aucun doublon de titre
7. ✅ **Vérification avant push** : Toujours valider l'architecture

---

## 🔗 Ressources

- **Guide Jekyll** : https://jekyllrb.com/docs/posts/
- **Front Matter YAML** : https://jekyllrb.com/docs/front-matter/
- **Structure du blog** : Voir `.github/ARCHITECTURE.md` (si existant)

---

**Dernière mise à jour :** 2025-11-22
**Maintenu par :** Nicolas Dabène
**Pour toute question :** Créer une issue sur le repo
