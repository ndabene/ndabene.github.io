# 📚 Documentation pour Agents IA

Ce dossier contient les consignes et outils pour assister les agents IA dans la publication d'articles sur le blog.

## 🎯 Objectif

Éviter les erreurs courantes lors de la publication :
- ❌ Doublons de titres
- ❌ Fichiers avec suffixes `-fr.md` ou `-en.md` dans `_posts/`
- ❌ Articles mal classés (hors dossiers `YYYY/MM/`)
- ❌ Front matter incohérent entre versions FR/EN
- ❌ Versions bilingues avec des noms de fichiers différents

## 📁 Fichiers Disponibles

### 1. `QUICK-PROMPT.txt` ⚡
**À utiliser en priorité**

Prompt court (20 lignes) à copier-coller directement dans votre conversation avec l'agent IA.

```bash
cat .claude/QUICK-PROMPT.txt
```

### 2. `agent-prompt-publication.md` 📋
**Guide détaillé pour agents IA**

Prompt structuré avec :
- Règles d'architecture
- Front matter obligatoire
- Checklist de validation
- Workflow standard
- Exemples d'erreurs à éviter

```bash
cat .claude/agent-prompt-publication.md
```

### 3. `article-publication-guidelines.md` 📖
**Documentation complète**

Guide de référence exhaustif (400+ lignes) couvrant :
- Architecture des dossiers
- Règles de nommage
- Format du front matter
- Exemples complets FR/EN
- Erreurs courantes avec solutions
- Workflow de publication étape par étape

```bash
cat .claude/article-publication-guidelines.md
```

### 4. `validate-articles.sh` ✅
**Script de validation automatique**

Vérifie 7 points critiques :
1. Suffixes interdits `-fr.md` / `-en.md`
2. Fichiers mal placés (hors `YYYY/MM/`)
3. Doublons de titres
4. Cohérence `lang:` / `ref:`
5. Correspondances bilingues FR/EN
6. Noms de fichiers FR/EN identiques
7. Statistiques générales

**Usage :**
```bash
bash .claude/validate-articles.sh
```

**Sortie :**
- ✅ `exit 0` : Validation réussie
- ❌ `exit 1` : Erreurs détectées (détails dans le rapport)

---

## 🚀 Guide d'Utilisation

### Pour un Agent IA Débutant

1. **Copier le prompt rapide**
   ```bash
   cat .claude/QUICK-PROMPT.txt
   ```

2. **Le coller au début de votre conversation**

3. **Avant chaque commit, valider**
   ```bash
   bash .claude/validate-articles.sh
   ```

### Pour un Agent IA Expérimenté

1. **Lire le guide complet une fois**
   ```bash
   less .claude/article-publication-guidelines.md
   ```

2. **Mémoriser les règles d'or**
   - Pas de suffixes `-fr` / `-en`
   - FR dans `_posts/`, EN dans `_posts_en/`
   - Organisation `YYYY/MM/` obligatoire
   - `lang:` + `ref:` pour articles bilingues

3. **Utiliser le script de validation**
   ```bash
   bash .claude/validate-articles.sh
   ```

---

## 📝 Workflow Recommandé

### Avant de Créer un Article

1. Vérifier qu'aucun article similaire n'existe
   ```bash
   grep -ri "titre de l'article" _posts _posts_en
   ```

2. Choisir une `ref:` unique
   ```bash
   grep -r "^ref:" _posts _posts_en | grep "ma-ref"
   ```

### Lors de la Création

**Version FR :**
```bash
_posts/2025/12/2025-12-20-mon-article.md
```

**Version EN :**
```bash
_posts_en/2025/12/2025-12-20-mon-article.md  # Même nom !
```

**Front Matter FR :**
```yaml
---
layout: post
title: 'Mon Article'
date: 2025-12-20
lang: fr
ref: mon-article-unique-id
author: Nicolas Dabène
---
```

**Front Matter EN :**
```yaml
---
layout: post
title: 'My Article'
date: 2025-12-20
lang: en
ref: mon-article-unique-id  # Même ref !
author: Nicolas Dabène
---
```

### Avant de Commiter

1. **Valider la structure**
   ```bash
   bash .claude/validate-articles.sh
   ```

2. **Si validation réussie ✅**
   ```bash
   git add _posts/2025/12/2025-12-20-mon-article.md
   git add _posts_en/2025/12/2025-12-20-mon-article.md
   git commit -m "feat: Ajouter article sur [sujet]"
   git push
   ```

3. **Si validation échouée ❌**
   - Lire le rapport d'erreurs
   - Corriger les problèmes
   - Relancer le script
   - Recommencer

---

## 🔍 Exemples de Validation

### ✅ Validation Réussie

```bash
$ bash .claude/validate-articles.sh

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 VALIDATION DE LA STRUCTURE DES ARTICLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 [1/7] Vérification des suffixes...
   ✅ Aucun fichier avec suffixe trouvé

📂 [2/7] Vérification des fichiers mal placés...
   ✅ Aucun fichier mal placé

📝 [3/7] Vérification des doublons de titres...
   ✅ Aucun doublon détecté

🔗 [4/7] Vérification lang: / ref:...
   ✅ Tous les articles avec lang: ont une ref:

🌐 [5/7] Vérification correspondances bilingues...
   ✅ Toutes les traductions complètes

📄 [6/7] Vérification noms de fichiers...
   ✅ Tous les noms correspondent

📊 [7/7] Statistiques...
   📚 Articles FR : 72
   📚 Articles EN : 72
   📚 Total      : 144

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ VALIDATION RÉUSSIE - Aucune erreur détectée
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### ❌ Validation Échouée

```bash
$ bash .claude/validate-articles.sh

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 VALIDATION DE LA STRUCTURE DES ARTICLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 [1/7] Vérification des suffixes...
   ❌ ERREUR: Fichiers avec suffixes trouvés
      → _posts/2025/12/article-fr.md
      → _posts/2025/12/article-en.md

📝 [3/7] Vérification des doublons...
   ❌ ERREUR: Titres en double
      → title: 'Mon Article'
         dans: _posts/2025/12/article1.md
         dans: _posts/2025/12/article2.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ VALIDATION ÉCHOUÉE - 2 erreur(s) détectée(s)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 Actions à effectuer :
   1. Corriger les erreurs listées
   2. Relancer ce script
   3. Consulter .claude/article-publication-guidelines.md
```

---

## ⚠️ Règles d'Or (à Mémoriser)

| Règle | ✅ Correct | ❌ Incorrect |
|-------|-----------|-------------|
| **Pas de suffixes** | `article.md` | `article-fr.md` |
| **FR dans _posts/** | `_posts/2025/12/article.md` | `_posts/2025/12/article-en.md` |
| **EN dans _posts_en/** | `_posts_en/2025/12/article.md` | `_posts/2025/article.md` |
| **Organisation YYYY/MM/** | `_posts/2025/12/article.md` | `_posts/2025/article.md` |
| **Même nom FR/EN** | Même slug | Slugs différents |
| **Même ref: FR/EN** | `ref: article-id` | Différentes refs |
| **lang: obligatoire** | `lang: fr` / `lang: en` | Pas de `lang:` |

---

## 🆘 Support

En cas de problème :

1. **Consulter le guide complet**
   ```bash
   less .claude/article-publication-guidelines.md
   ```

2. **Relire le prompt pour agents**
   ```bash
   less .claude/agent-prompt-publication.md
   ```

3. **Valider la structure**
   ```bash
   bash .claude/validate-articles.sh
   ```

4. **Chercher des exemples dans le dépôt**
   ```bash
   # Articles bilingues bien structurés
   ls _posts/2025/12/2025-12-1*
   ls _posts_en/2025/12/2025-12-1*
   ```

---

## 📅 Dernière Mise à Jour

**Date :** 2025-11-22
**Version :** 1.0.0
**Maintenu par :** Nicolas Dabène

---

**Questions ?** Créer une issue sur le dépôt GitHub.
