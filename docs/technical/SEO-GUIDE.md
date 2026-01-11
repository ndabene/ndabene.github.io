# Guide d'Optimisation SEO/GEO/VEO

Ce guide documente les bonnes pratiques SEO pour le blog, optimisé pour les moteurs de recherche traditionnels (Google, Bing) et les moteurs d'IA génératifs (ChatGPT, Perplexity, Gemini).

## 📋 Table des matières

1. [Données Structurées (Schema.org)](#données-structurées-schemaorg)
2. [Meta Descriptions](#meta-descriptions)
3. [Images et Attributs Alt](#images-et-attributs-alt)
4. [Frontmatter des Articles](#frontmatter-des-articles)
5. [Maillage Interne](#maillage-interne)

---

## 🏗️ Données Structurées (Schema.org)

### Implémentation actuelle

Le site utilise le markup **Schema.org JSON-LD** pour tous les articles via `_includes/blog-post-jsonld.html`.

#### Type de schéma : `TechArticle`

Nous utilisons `TechArticle` au lieu de `Article` car nos contenus sont techniques et orientés développeurs.

#### Propriétés clés implémentées :

```yaml
✅ headline          # Titre de l'article
✅ description       # Description courte (excerpt)
✅ image             # Image principale avec dimensions (1200x630)
✅ datePublished     # Date de publication
✅ dateModified      # Date de dernière modification (important!)
✅ author            # Informations sur l'auteur
✅ publisher         # Organisation avec logo (600x60)
✅ wordCount         # Nombre de mots
✅ timeRequired      # Temps de lecture estimé
✅ keywords          # Mots-clés (tags + technologies)
✅ inLanguage        # Langue de l'article (fr-FR ou en-US)
✅ audience          # Public cible
✅ educationalLevel  # Niveau de difficulté
✅ isAccessibleForFree # true (important pour les moteurs IA)
✅ license           # Licence Creative Commons
✅ about             # Sujets traités
✅ mentions          # Technologies/outils mentionnés
✅ citation          # Sources citées (optionnel)
✅ isBasedOn         # Sources de base (optionnel)
```

### Comment utiliser `dateModified` correctement

Dans le frontmatter de votre article, ajoutez :

```yaml
---
title: "Mon Article"
date: 2025-11-12
last_modified_at: 2025-11-15  # ⚠️ Mettez à jour cette date quand vous modifiez l'article
---
```

Si `last_modified_at` n'est pas défini, le système utilise automatiquement `date`.

---

## 📝 Meta Descriptions

### Système actuel

Le site utilise une cascade intelligente pour les meta descriptions (dans `_includes/head.html`) :

```liquid
{{ page.description | default: page.excerpt | strip_html | strip | truncatewords: 30 | default: site.description }}
```

**Ordre de priorité :**
1. `description` (frontmatter) - si défini explicitement
2. `excerpt` (frontmatter) - utilisé par 98% des articles
3. `site.description` - fallback global

### Bonnes pratiques

#### ✅ À FAIRE :

```yaml
---
title: "Maîtriser PrestaShop 8/9"
excerpt: "Guide pratique pour développer des modules PrestaShop compatibles versions 8 et 9 malgré la migration Tactician vers Symfony Messenger."
---
```

**Caractéristiques d'un bon excerpt :**
- **Longueur** : 120-155 caractères (optimal pour Google)
- **Clair et concis** : résume l'article en une phrase
- **Contient des mots-clés** : naturellement intégrés
- **Incitatif** : donne envie de cliquer
- **Action** : commence souvent par un verbe (Guide, Découvrez, Apprenez...)

#### ❌ À ÉVITER :

```yaml
# ❌ Trop long (Google le tronquera)
excerpt: "Dans cet article très détaillé, nous allons explorer en profondeur toutes les subtilités et particularités techniques de la migration complexe entre PrestaShop 8 et PrestaShop 9 en analysant chaque composant..."

# ❌ Trop court (n'exploite pas l'espace disponible)
excerpt: "Migration PrestaShop 8 vers 9."

# ❌ Pas assez descriptif
excerpt: "Un guide sur PrestaShop."
```

### Vérifier vos meta descriptions

```bash
# Compter les articles sans excerpt
grep -L "^excerpt:" _posts/**/*.md

# Vérifier la longueur des excerpts
grep "^excerpt:" _posts/**/*.md | wc -c
```

---

## 🖼️ Images et Attributs Alt

### Bonnes pratiques actuelles

Les images du blog utilisent déjà des attributs alt descriptifs. Continuez sur cette lancée !

#### ✅ Exemples EXCELLENTS (déjà utilisés) :

```markdown
![Carte mentale des 8 concepts essentiels pour l'Admin API PrestaShop 9](/assets/images/blog/carte-mental.png)

![Statistiques clés du Black Friday 2025 en Europe - Budget moyen par consommateur et taux de participation](/assets/images/blog/stats.png "Tendances du Black Friday 2025")
```

**Pourquoi c'est excellent :**
- ✅ Décrit précisément le contenu de l'image
- ✅ Contient des mots-clés pertinents naturellement
- ✅ Aide les lecteurs d'écran (accessibilité)
- ✅ Aide Google Images à indexer correctement
- ✅ Le titre (après `"`) ajoute un contexte supplémentaire

#### ❌ Exemples à ÉVITER :

```markdown
# ❌ Trop générique
![screenshot](/assets/images/screenshot.png)
![image](/assets/images/image1.png)

# ❌ Pas assez descriptif
![exemple](/assets/images/demo.png)

# ❌ Alt vide (très mauvais pour SEO et accessibilité)
![](/assets/images/photo.png)
```

#### 🎯 Template de description d'image :

Pour créer un bon alt, répondez à : **"Que montre cette image et pourquoi est-elle là ?"**

```markdown
![{Type de contenu} {détails précis} {contexte si pertinent}](/chemin/image.png "{titre descriptif optionnel}")
```

**Exemples :**
```markdown
![Diagramme de séquence du pattern Command Bus dans PrestaShop 9](/assets/images/command-bus.png)

![Graphique de performance comparant Tactician et Symfony Messenger](/assets/images/perf-comparison.png "Benchmarks sur 10000 commandes")

![Code PHP montrant l'implémentation d'un handler compatible PrestaShop 8 et 9](/assets/images/handler-code.png)
```

### Images générées automatiquement

Pour les images de couverture générées automatiquement (og:image), assurez-vous que :

```yaml
---
image: /assets/images/blog/2025/11/mon-article.jpg  # 1200x630px recommandé
---
```

---

## 📄 Frontmatter des Articles

### Template complet recommandé

```yaml
---
layout: post
title: "Votre titre accrocheur et descriptif"
date: 2025-11-12
last_modified_at: 2025-11-12  # ⚠️ Mettez à jour si vous modifiez l'article
author: Nicolas Dabène
categories:
  - PrestaShop          # Maximum 3 catégories
  - Architecture
  - Développement
tags:
  - PrestaShop          # Tags spécifiques
  - PHP
  - Symfony
  - Command Bus
excerpt: "Description concise de 120-155 caractères qui résume l'article et incite au clic."
description: "Optionnel - surcharge l'excerpt si vous voulez une meta description différente"
image: /assets/images/blog/2025/11/article-image.jpg  # 1200x630px
featured: false
difficulty: Intermédiaire  # Débutant | Intermédiaire | Avancé | Expert
technologies:
  - PrestaShop
  - PHP 8.1
  - Symfony 6
estimated_reading_time: "12 minutes"
llm_summary: "Version courte optimisée pour les LLMs (peut être identique à excerpt)"
llm_topics:
  - PrestaShop 9
  - Command Bus
  - Symfony Messenger
lang: fr  # ou en pour les articles anglais
ref: unique-article-id  # Pour lier les traductions

# Optionnel - pour les articles avec FAQ
faq:
  - question: "Quelle est la différence entre X et Y ?"
    answer: "Réponse détaillée ici..."
  - question: "Comment faire Z ?"
    answer: "Explication étape par étape..."

# Optionnel - pour citer des sources
sources:
  - name: "Documentation officielle PrestaShop"
    url: "https://docs.prestashop.com"
    organization: "PrestaShop"
    type: "WebPage"

# Optionnel - pour citer d'autres articles
citations:
  - name: "Article sur le Command Pattern"
    url: "https://example.com/article"
    author: "John Doe"
    publisher: "Tech Blog"
---
```

### Champs obligatoires minimum

```yaml
---
layout: post
title: "Titre de l'article"
date: 2025-11-12
author: Nicolas Dabène
categories:
  - Catégorie principale
tags:
  - tag1
  - tag2
excerpt: "Description concise pour SEO"
image: /assets/images/blog/image.jpg
---
```

---

## 🔗 Maillage Interne

### Pourquoi c'est important

Le maillage interne :
- 📈 Distribue "l'autorité SEO" sur tout le site
- 🔍 Aide Google à découvrir et indexer tout le contenu
- 👤 Améliore l'expérience utilisateur
- 🤖 Aide les LLMs à comprendre la structure de votre contenu

### Comment faire du bon maillage

#### 1. Liens contextuels dans le contenu

Quand vous mentionnez un concept déjà traité, ajoutez un lien :

```markdown
PrestaShop 9 introduit [Symfony Messenger](/blog/symfony-messenger-prestashop/)
à la place de Tactician pour gérer les Command Bus.

Pour plus de détails sur l'architecture e-commerce, consultez notre
[guide complet sur PrestaShop](/expertise/prestashop/).
```

#### 2. Section "Ressources liées" (automatique)

Le système détecte automatiquement une section `### Ressources liées` et la stylise :

```markdown
### Ressources liées

- [Services IA & e-commerce](/services/)
- [Formations IA pour développeurs](/formations/)
- [Expertise PrestaShop](/expertise/prestashop/)
```

#### 3. Liens vers des articles connexes

À la fin de chaque article, ajoutez 2-4 liens vers des articles connexes :

```markdown
## Pour aller plus loin

Si cet article vous a plu, vous aimerez aussi :

- [Migration PrestaShop 8 vers 9 : Guide complet](/blog/migration-prestashop-9/)
- [Optimiser les performances de PrestaShop](/blog/prestashop-performance/)
- [Tests unitaires pour les modules PrestaShop](/blog/tests-prestashop/)
```

#### 4. Bonnes pratiques

- ✅ 2-5 liens internes par article (ni trop, ni pas assez)
- ✅ Texte d'ancre descriptif (pas "cliquez ici")
- ✅ Liens pertinents et en contexte
- ✅ Vérifier que les liens ne sont pas cassés
- ❌ Éviter trop de liens (spam)
- ❌ Éviter les liens vers la même page

---

## 🎯 Checklist avant publication

Avant de publier un article, vérifiez :

### Frontmatter
- [ ] `title` : clair, descriptif, contient des mots-clés
- [ ] `date` : date de publication
- [ ] `last_modified_at` : identique à `date` pour un nouvel article
- [ ] `excerpt` : 120-155 caractères, accrocheur
- [ ] `image` : chemin correct, image 1200x630px
- [ ] `categories` : 1-3 catégories pertinentes
- [ ] `tags` : 5-10 tags spécifiques
- [ ] `technologies` : liste des technologies mentionnées
- [ ] `difficulty` : niveau approprié
- [ ] `estimated_reading_time` : estimation réaliste

### Contenu
- [ ] Titre H1 unique et descriptif
- [ ] Structure avec H2, H3 logiques
- [ ] Images avec attributs alt descriptifs
- [ ] 2-5 liens internes vers d'autres articles/pages
- [ ] Section "Ressources liées" à la fin
- [ ] FAQ si pertinent (améliore le SEO)
- [ ] Orthographe et grammaire vérifiées

### Après publication
- [ ] Tester l'article sur mobile et desktop
- [ ] Vérifier le Schema.org avec [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Vérifier les meta tags avec [Meta Tags](https://metatags.io/)
- [ ] Soumettre l'URL dans Google Search Console

---

## 🔧 Outils de vérification

### Valider le Schema.org

```bash
# Générer un article en local
bundle exec jekyll build

# Trouver le fichier HTML généré
cat _site/blog/mon-article/index.html | grep -A 100 "application/ld+json"
```

Puis testez sur :
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

### Vérifier les meta descriptions

```bash
# Lister tous les articles sans excerpt
find _posts -name "*.md" -exec grep -L "^excerpt:" {} \;

# Vérifier la longueur des excerpts (devrait être ~120-155 chars)
grep -r "^excerpt:" _posts/ | while read line; do
  echo "$line" | wc -c
done
```

### Vérifier les images alt

```bash
# Trouver les images sans alt descriptif
grep -rn "!\[\](" _posts/

# Trouver les images avec alt générique
grep -rn "!\[image\](" _posts/
grep -rn "!\[screenshot\](" _posts/
```

---

## 📚 Ressources supplémentaires

### Documentation officielle
- [Schema.org TechArticle](https://schema.org/TechArticle)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

### Guides SEO
- [Moz Beginner's Guide to SEO](https://moz.com/beginners-guide-to-seo)
- [Google Search Essentials](https://developers.google.com/search/docs/essentials)

### Outils
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Schema Markup Validator](https://validator.schema.org/)

---

## 📝 Notes de version

- **2025-11-12** : Création du guide
  - Implémentation du Schema.org TechArticle complet
  - Documentation des bonnes pratiques meta descriptions
  - Guide des attributs alt pour images
  - Checklist de publication

---

**Maintenu par** : Nicolas Dabène
**Dernière mise à jour** : 12 novembre 2025
