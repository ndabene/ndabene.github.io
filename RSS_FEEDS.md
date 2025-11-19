# Feeds RSS Multilingues

## 🎯 Problème résolu

Les automatisations n8n utilisent le feed RSS pour publier automatiquement sur les réseaux sociaux. Avec un site bilingue, il faut **éviter les doublons** (publication du même article en FR et EN).

## ✅ Solution : Feeds séparés par langue

### Feeds disponibles

| Langue | URL du Feed | Collection | Usage |
|--------|-------------|------------|-------|
| 🇫🇷 Français | `/feed.xml` | `site.posts` | Articles français uniquement |
| 🇬🇧 Anglais | `/feed_en.xml` | `site.posts_en` | Articles anglais uniquement |

### Caractéristiques

- ✅ **Séparation totale** : Chaque feed contient uniquement les articles de sa langue
- ✅ **Pas de doublons** : Un article traduit n'apparaît que dans son feed respectif
- ✅ **Balises `<language>`** : Chaque feed déclare sa langue (`fr` ou `en`)
- ✅ **Titre différencié** : Les feeds ont des titres distincts (« - Français » / « - English »)
- ✅ **Automatiquement référencés** : Les deux feeds sont déclarés dans le `<head>` de toutes les pages

## 🔧 Configuration n8n

### Configuration actuelle (à conserver)

```
URL du feed : https://nicolas-dabene.fr/feed.xml
→ Publie uniquement les articles français
```

✅ **Aucun changement nécessaire** pour vos automatisations actuelles

### Configuration pour les articles anglais (optionnel)

Si vous souhaitez publier automatiquement les articles anglais sur d'autres comptes sociaux (par exemple un compte Twitter EN) :

```
URL du feed : https://nicolas-dabene.fr/feed_en.xml
→ Publie uniquement les articles anglais
```

## 📊 Structure technique

### feed.xml (Français)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nicolas Dabène - Français</title>
    <language>fr</language>
    <link>https://nicolas-dabene.fr/</link>
    <atom:link href="https://nicolas-dabene.fr/feed.xml" rel="self" type="application/rss+xml"/>

    <!-- Articles de la collection 'posts' uniquement -->
    <item>
      <title>Titre de l'article en français</title>
      <link>https://nicolas-dabene.fr/articles/2025/06/15/mon-article/</link>
      ...
    </item>
  </channel>
</rss>
```

### feed_en.xml (Anglais)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nicolas Dabène - English</title>
    <language>en</language>
    <link>https://nicolas-dabene.fr/en/</link>
    <atom:link href="https://nicolas-dabene.fr/feed_en.xml" rel="self" type="application/rss+xml"/>

    <!-- Articles de la collection 'posts_en' uniquement -->
    <item>
      <title>Article title in English</title>
      <link>https://nicolas-dabene.fr/en/articles/2025/06/15/my-article/</link>
      ...
    </item>
  </channel>
</rss>
```

## 🧪 Tester les feeds

### En local

```bash
# Build du site
bundle exec jekyll serve

# Accéder aux feeds
# Français : http://localhost:4000/feed.xml
# Anglais : http://localhost:4000/feed_en.xml
```

### En production

```
Français : https://nicolas-dabene.fr/feed.xml
Anglais : https://nicolas-dabene.fr/feed_en.xml
```

### Valider le format RSS

Utilisez ces outils pour vérifier que vos feeds sont valides :
- https://validator.w3.org/feed/
- https://www.feedvalidator.org/

## 📝 Bonnes pratiques

### 1. Ne pas mélanger les langues

❌ **Mauvais :** Publier les deux feeds sur le même compte Twitter
```
→ Résultat : Vos followers FR verront des posts EN et vice-versa
```

✅ **Bon :** Utiliser un feed par compte social
```
Compte Twitter FR → feed.xml (FR uniquement)
Compte Twitter EN → feed_en.xml (EN uniquement)
```

### 2. Synchroniser les dates de publication

Si vous publiez un article traduit :
```yaml
# Article FR (_posts/2025/06/15-mon-article.md)
date: 2025-06-15

# Article EN (_posts_en/2025/06/15-my-article.md)
date: 2025-06-15  # ← Même date
```

✅ **Avantage :** Les deux versions apparaîtront en même temps dans leurs feeds respectifs

### 3. Vérifier avant de publier

Avant de pousser un nouvel article traduit :

```bash
# 1. Build local
bundle exec jekyll serve

# 2. Vérifier le feed FR
curl http://localhost:4000/feed.xml | grep "<title>"

# 3. Vérifier le feed EN
curl http://localhost:4000/feed_en.xml | grep "<title>"

# 4. Confirmer qu'il n'y a pas de doublon
```

## 🔍 Dépannage

### Le feed FR contient des articles EN

**Cause :** Un article EN a été placé dans `_posts/` au lieu de `_posts_en/`

**Solution :**
```bash
# Déplacer l'article dans le bon répertoire
mv _posts/2025/06/15-my-article.md _posts_en/2025/06/15-my-article.md

# Rebuild
bundle exec jekyll build
```

### Le feed EN est vide

**Cause :** Aucun article dans `_posts_en/` ou articles avec une date future

**Vérification :**
```bash
# Vérifier le contenu de _posts_en/
ls -la _posts_en/2025/

# Vérifier les dates des articles
grep "date:" _posts_en/2025/*.md
```

### Les articles n'apparaissent pas dans le feed

**Cause :** Le filtre de date (articles futurs uniquement)

**Code du filtre :**
```liquid
{% assign post_date = post.date | date: "%Y-%m-%d" %}
{% assign today = site.time | date: "%Y-%m-%d" %}
{% if post_date >= today %}
  <!-- Article affiché -->
{% endif %}
```

**Solution :** Vérifier que la date de l'article est supérieure ou égale à aujourd'hui

### Le feed n'est pas généré

**Cause :** Erreur dans le fichier XML

**Solution :**
```bash
# Vérifier les logs de build
bundle exec jekyll build --verbose

# Chercher les erreurs XML
# Les feeds sont générés dans _site/feed.xml et _site/feed_en.xml
```

## 🚀 Automatisations n8n recommandées

### Workflow 1 : Publications françaises (actuel)

```
1. RSS Feed Trigger
   URL: https://nicolas-dabene.fr/feed.xml

2. Filtre (optionnel)
   Condition: item.categories contient "Intelligence Artificielle"

3. Publier sur Twitter FR
4. Publier sur LinkedIn FR
5. etc.
```

### Workflow 2 : Publications anglaises (nouveau - optionnel)

```
1. RSS Feed Trigger
   URL: https://nicolas-dabene.fr/feed_en.xml

2. Filtre (optionnel)
   Condition: item.categories contient "Artificial Intelligence"

3. Publier sur Twitter EN (compte séparé)
4. Publier sur LinkedIn EN
5. etc.
```

## 📌 Résumé

| Aspect | Solution |
|--------|----------|
| **Feed FR** | `/feed.xml` → Collection `posts` → Automatisations existantes inchangées |
| **Feed EN** | `/feed_en.xml` → Collection `posts_en` → Nouvelles automatisations optionnelles |
| **Doublons** | ✅ Impossible (collections séparées) |
| **Référencement** | ✅ Les deux feeds sont dans le `<head>` |
| **Validation** | ✅ Format RSS 2.0 standard |

---

**Conclusion :** Vos automatisations n8n actuelles continueront de fonctionner exactement comme avant. Le feed français (`/feed.xml`) ne contiendra jamais d'articles anglais, donc **aucun doublon possible**. 🎉
