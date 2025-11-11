# Guide Complet - Site Bilingue FR/EN

## 📚 Table des matières

1. [Architecture du système](#architecture-du-système)
2. [Comment traduire un article](#comment-traduire-un-article)
3. [Comment créer des pages statiques en anglais](#comment-créer-des-pages-statiques-en-anglais)
4. [Mapping des catégories](#mapping-des-catégories)
5. [Référence des traductions UI](#référence-des-traductions-ui)
6. [SEO et hreflang](#seo-et-hreflang)
7. [Troubleshooting](#troubleshooting)

---

## Architecture du système

### Structure des URLs

```
Français (URLs actuelles préservées) :
  /                                    → Homepage FR
  /articles/2025/06/15/mon-article/   → Article FR
  /blog/                               → Index blog FR
  /blog/intelligence-artificielle/    → Catégorie FR
  /skills/                             → Page FR

Anglais (nouveau préfixe /en/) :
  /en/                                 → Homepage EN
  /en/articles/2025/06/15/my-article/ → Article EN
  /en/blog/                            → Index blog EN
  /en/blog/artificial-intelligence/   → Catégorie EN
  /en/skills/                          → Page EN
```

### Collections Jekyll

```yaml
Collections françaises (existantes) :
  _posts/          → Articles français
  _projects/       → Projets français
  _case_studies/   → Études de cas français

Collections anglaises (nouvelles) :
  _posts_en/       → Articles anglais
  _projects_en/    → Projets anglais
  _case_studies_en/ → Études de cas anglais
```

### Fichiers de traduction UI

```
_data/i18n/
  ├── fr.yml       → Toutes les chaînes UI en français
  └── en.yml       → Toutes les chaînes UI en anglais

_data/
  ├── navigation_fr.yml → Menu navigation français
  └── navigation_en.yml → Menu navigation anglais
```

---

## Comment traduire un article

### Étape 1 : Copier l'article français

```bash
# Exemple : traduire un article de juin 2025
cp _posts/2025/06/2025-06-15-mon-article-francais.md \
   _posts_en/2025/2025-06-15-my-english-article.md
```

### Étape 2 : Modifier le front matter

**Article français original (_posts/2025/06/2025-06-15-mon-article.md) :**

```yaml
---
layout: post
title: "Comment utiliser Claude pour automatiser vos tâches"
lang: fr                           # ← Langue française
ref: claude-automation-guide       # ← Identifiant unique (même pour EN)
date: 2025-06-15
author: Nicolas Dabène
categories:
  - Intelligence Artificielle
  - Développement
tags:
  - IA
  - Claude
  - Automatisation
excerpt: "Découvrez comment utiliser Claude AI pour automatiser vos workflows de développement."
image: /assets/images/blog/2025/06/claude-automation.jpg
featured: true
llm_summary: "Guide pratique d'automatisation avec Claude AI pour développeurs"
llm_topics:
  - Intelligence artificielle
  - Automatisation
  - Développement
faq:
  - question: "Qu'est-ce que Claude AI ?"
    answer: "Claude est un assistant IA développé par Anthropic..."
---
```

**Article anglais traduit (_posts_en/2025/2025-06-15-my-article.md) :**

```yaml
---
layout: post
title: "How to Use Claude to Automate Your Tasks"
lang: en                           # ← Langue anglaise
ref: claude-automation-guide       # ← MÊME identifiant (critique pour le lien FR↔EN)
date: 2025-06-15                   # ← Même date
author: Nicolas Dabène
categories:
  - Artificial Intelligence        # ← Catégorie traduite (voir mapping)
  - Development
tags:
  - AI
  - Claude
  - Automation
excerpt: "Discover how to use Claude AI to automate your development workflows."
image: /assets/images/blog/2025/06/claude-automation.jpg  # ← Même image
featured: true
llm_summary: "Practical guide to automation with Claude AI for developers"
llm_topics:
  - Artificial intelligence
  - Automation
  - Development
faq:
  - question: "What is Claude AI?"
    answer: "Claude is an AI assistant developed by Anthropic..."
---
```

### Étape 3 : Traduire le contenu

1. **Traduire le corps de l'article** en anglais
2. **Adapter les liens internes** :
   ```markdown
   <!-- Français -->
   [Voir mon article sur le SEO](/articles/2025/06/15/seo-guide/)

   <!-- Anglais -->
   [See my article on SEO](/en/articles/2025/06/15/seo-guide/)
   ```
3. **Garder les chemins d'images identiques** (pas besoin de dupliquer)
4. **Traduire les alt texts des images**

### Étape 4 : Vérifier la liaison FR ↔ EN

Le système de liaison utilise le champ `ref` du front matter :

```yaml
# Article FR
ref: claude-automation-guide

# Article EN (DOIT être identique)
ref: claude-automation-guide
```

✅ **Vérification** : Le sélecteur de langue affichera automatiquement le lien vers l'autre version.

---

## Comment créer des pages statiques en anglais

### Structure des répertoires

```
Pages françaises (racine) :
  pages/about.md
  pages/skills.md
  pages/boutique.md

Pages anglaises (sous-répertoire /en/) :
  en/about.md
  en/skills.md
  en/shop.md
```

### Exemple : Créer la page "About" en anglais

**Fichier : `en/about.md`**

```yaml
---
layout: page
title: "About Nicolas Dabène"
lang: en                    # ← Langue anglaise
permalink: /en/about/       # ← URL anglaise
description: "Senior PHP Developer & AI Orchestrator with 15+ years of experience"
---

# About Me

I'm Nicolas Dabène, a Senior PHP Developer specializing in...

[Your English content here]
```

**Checklist pour les pages statiques :**

- [ ] Front matter avec `lang: en`
- [ ] Permalink avec préfixe `/en/`
- [ ] Contenu traduit en anglais
- [ ] Liens internes adaptés avec `/en/`
- [ ] Mettre à jour `_data/navigation_en.yml` si nécessaire

---

## Mapping des catégories

### Fichier de référence : `_data/category_translations.yml`

```yaml
mappings:
  "Intelligence Artificielle": "Artificial Intelligence"
  "Développement": "Development"
  "Architecture": "Architecture"
  "Performance": "Performance"
  "Sécurité": "Security"
  "E-commerce": "E-commerce"
  "PrestaShop": "PrestaShop"
  "SEO": "SEO"
  "Tutoriels": "Tutorials"
  "PHP": "PHP"

slugs:
  fr:
    "Intelligence Artificielle": "intelligence-artificielle"
    "Développement": "developpement"
    "Sécurité": "securite"
    # ...
  en:
    "Artificial Intelligence": "artificial-intelligence"
    "Development": "development"
    "Security": "security"
    # ...
```

### Utilisation dans les articles

```yaml
# Article FR
categories:
  - Intelligence Artificielle
  - Développement

# Article EN (traduit)
categories:
  - Artificial Intelligence
  - Development
```

### Créer des pages de catégories en anglais

**Fichier : `en/blog/categories/artificial-intelligence.md`**

```yaml
---
layout: category
title: "Artificial Intelligence"
lang: en
category: "Artificial Intelligence"
permalink: /en/blog/artificial-intelligence/
---
```

---

## Référence des traductions UI

### Utilisation dans les templates

```liquid
{% comment %} Charger les traductions {% endcomment %}
{% assign current_lang = page.lang | default: site.default_lang %}
{% assign t = site.data.i18n[current_lang] %}

{% comment %} Utiliser une traduction {% endcomment %}
<h2>{{ t.blog.latest_articles }}</h2>
<a href="#">{{ t.blog.read_more }}</a>
```

### Traductions disponibles

**Navigation :**
```yaml
t.nav.home         → "Accueil" / "Home"
t.nav.about        → "À propos" / "About"
t.nav.skills       → "Compétences" / "Skills"
t.nav.blog         → "Blog" / "Blog"
t.nav.contact      → "Contact" / "Contact"
```

**Blog :**
```yaml
t.blog.latest_articles  → "Derniers articles" / "Latest articles"
t.blog.read_more        → "Lire la suite" / "Read more"
t.blog.published_on     → "Publié le" / "Published on"
t.blog.min_read         → "min de lecture" / "min read"
```

**Commun :**
```yaml
t.common.back      → "Retour" / "Back"
t.common.next      → "Suivant" / "Next"
t.common.search    → "Rechercher" / "Search"
```

**Voir `_data/i18n/fr.yml` et `_data/i18n/en.yml` pour la liste complète.**

---

## SEO et hreflang

### Balises hreflang automatiques

Le système génère automatiquement les balises hreflang dans `<head>` :

```html
<!-- Pour un article avec ref: claude-automation-guide -->
<link rel="alternate" hreflang="fr" href="https://nicolas-dabene.fr/articles/2025/06/15/mon-article/" />
<link rel="alternate" hreflang="en" href="https://nicolas-dabene.fr/en/articles/2025/06/15/my-article/" />
<link rel="alternate" hreflang="x-default" href="https://nicolas-dabene.fr/articles/2025/06/15/mon-article/" />
```

### Sitemap multilingue

Jekyll génère automatiquement un sitemap incluant toutes les URLs FR et EN.

### Open Graph locale

```html
<!-- Français -->
<meta property="og:locale" content="fr_FR">
<meta property="og:locale:alternate" content="en_US">

<!-- Anglais -->
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="fr_FR">
```

---

## Troubleshooting

### Le sélecteur de langue n'apparaît pas

**Vérifier :**

1. Le fichier `_includes/language-switcher.html` existe
2. Le header inclut `{% include language-switcher.html %}`
3. Le CSS est importé dans `assets/css/style.scss`

### La traduction ne se lie pas à l'article français

**Cause probable :** Le champ `ref` n'est pas identique

**Solution :**
```yaml
# Article FR
ref: mon-identifiant-unique

# Article EN (doit être IDENTIQUE)
ref: mon-identifiant-unique
```

### Les traductions UI ne fonctionnent pas

**Vérifier :**

1. Le fichier `_data/i18n/[lang].yml` existe
2. La clé existe dans le fichier YAML
3. La syntaxe Liquid est correcte :
   ```liquid
   {% assign t = site.data.i18n[current_lang] %}
   {{ t.blog.title }}
   ```

### Les URLs anglaises retournent 404

**Solutions :**

1. **Rebuild Jekyll** : `bundle exec jekyll build`
2. **Vérifier la collection** dans `_config.yml` :
   ```yaml
   collections:
     posts_en:
       output: true
       permalink: /en/articles/:year/:month/:day/:title/
   ```
3. **Vérifier le front matter** :
   ```yaml
   lang: en
   ```

### Les catégories anglaises n'affichent pas d'articles

**Vérifier :**

1. Les catégories dans l'article EN correspondent au mapping
2. Le layout `category` filtre correctement par langue
3. Le fichier de catégorie EN existe dans `en/blog/categories/`

---

## Workflow de traduction recommandé

### Pour les 54 articles existants

**Option 1 : Traduction manuelle**
1. Copier l'article dans `_posts_en/`
2. Renommer le fichier
3. Traduire le front matter
4. Traduire le contenu
5. Vérifier les liens et images

**Option 2 : Traduction assistée par IA**
1. Utiliser Claude ou ChatGPT pour traduire le contenu
2. Réviser la traduction (surtout termes techniques)
3. Vérifier les métadonnées SEO (llm_summary, llm_topics)
4. Valider les FAQ traduites

**Option 3 : Traduction progressive**
1. **Phase 1** : Traduire les 10 articles les plus populaires
2. **Phase 2** : Traduire les articles de 2025 (plus récents)
3. **Phase 3** : Traduire le reste selon demande/trafic

### Script utile : Créer un squelette d'article EN

```bash
#!/bin/bash
# create-en-article.sh

FR_FILE=$1
EN_SLUG=$2

# Extraire le nom de fichier
FILENAME=$(basename "$FR_FILE")
DATE_PREFIX=${FILENAME:0:10}

# Créer le fichier EN
EN_FILE="_posts_en/2025/${DATE_PREFIX}-${EN_SLUG}.md"

# Copier et adapter
cp "$FR_FILE" "$EN_FILE"

echo "✅ Article EN créé : $EN_FILE"
echo "⚠️  N'oubliez pas de :"
echo "   1. Changer lang: en"
echo "   2. Traduire title, excerpt, categories, tags"
echo "   3. Traduire le contenu"
echo "   4. Vérifier le champ 'ref' (doit être identique au FR)"
```

**Usage :**
```bash
./create-en-article.sh _posts/2025/06/2025-06-15-mon-article.md "my-article"
```

---

## Checklist finale avant publication

### Pour chaque article traduit

- [ ] Front matter complet et traduit
- [ ] `lang: en` défini
- [ ] `ref` identique à la version française
- [ ] Catégories traduites selon `category_translations.yml`
- [ ] Tags traduits
- [ ] `excerpt` traduit
- [ ] `llm_summary` et `llm_topics` traduits
- [ ] FAQ traduite (si présente)
- [ ] Contenu traduit et relu
- [ ] Liens internes adaptés avec `/en/`
- [ ] Images et alt texts vérifiés
- [ ] Build local réussi : `bundle exec jekyll serve`
- [ ] Sélecteur de langue fonctionne
- [ ] Balises hreflang présentes dans le `<head>`

### Pour les pages statiques

- [ ] Fichier créé dans `/en/`
- [ ] `permalink: /en/...` défini
- [ ] `lang: en` défini
- [ ] Ajout dans `_data/navigation_en.yml` si nécessaire
- [ ] Contenu traduit
- [ ] Liens internes adaptés

---

## Ressources supplémentaires

- **Configuration Jekyll** : `_config.yml`
- **Fichiers de traduction** : `_data/i18n/`
- **Mapping des catégories** : `_data/category_translations.yml`
- **Layout multilingue** : `_layouts/default.html`, `_includes/head.html`
- **Sélecteur de langue** : `_includes/language-switcher.html`

---

## Support

Pour toute question ou problème, consulter :

1. Ce guide (BILINGUAL_GUIDE.md)
2. Les fichiers de configuration dans `_data/`
3. Les exemples d'articles traduits dans `_posts_en/`

**Bonne traduction ! 🌐**
