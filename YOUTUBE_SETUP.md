# Configuration YouTube - Récupération Automatique des Vidéos

Ce guide explique comment configurer la récupération automatique des vidéos YouTube pour votre site Jekyll.

## Vue d'ensemble

Le système récupère automatiquement les nouvelles vidéos de vos chaînes YouTube et les ajoute à votre page `/youtube/`. La mise à jour s'effectue quotidiennement via GitHub Actions.

## Configuration requise

### 1. Clé API YouTube

Vous devez obtenir une clé API YouTube Data v3 :

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API YouTube Data v3
4. Créez des credentials (clé API)
5. Copiez la clé API

### 2. Configuration GitHub Secrets

Ajoutez la clé API YouTube à vos secrets GitHub :

1. Allez dans votre repository GitHub
2. Settings → Secrets and variables → Actions
3. Ajoutez un nouveau secret nommé `YOUTUBE_API_KEY`
4. Collez votre clé API YouTube

### 3. Chaînes YouTube à surveiller

Le script surveille actuellement ces chaînes (configuré dans `scripts/fetch_youtube_videos.rb`) :

- `UCUVY-O2kPvU3mibvP3xdM7A` → `ndabene06`

Pour ajouter d'autres chaînes :
1. Ouvrez `scripts/fetch_youtube_videos.rb`
2. Ajoutez l'ID de la chaîne dans le hash `@channels`

## Fichiers créés/modifiés

### Nouveaux fichiers :
- `_data/youtube_videos.yml` - Stockage des données vidéos
- `pages/youtube.md` - Page d'affichage des vidéos
- `_sass/youtube.scss` - Styles CSS pour la page
- `scripts/fetch_youtube_videos.rb` - Script de récupération
- `.github/workflows/fetch-youtube-videos.yml` - Workflow GitHub Actions

### Fichiers modifiés :
- `_data/navigation.yml` - Ajout du lien vers la page YouTube
- `_sass/components.scss` - Import du fichier CSS YouTube

## Structure des données

Chaque vidéo est stockée avec ces informations :

```yaml
- title: "Titre de la vidéo"
  video_id: "VIDEO_ID"
  url: "https://www.youtube.com/watch?v=VIDEO_ID"
  thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
  description: "Description de la vidéo"
  published_at: "2025-01-15T10:00:00Z"
  duration: "PT10M30S"
  channel: "ndabene06"
  category: "Technique"
```

## Catégorisation automatique

Les vidéos sont automatiquement catégorisées selon leur contenu :

- **PrestaShop & E-commerce** : Contient "prestashop", "e-commerce", "boutique"
- **PHP & Frameworks** : Contient "php", "symfony", "laravel"
- **IA & Automatisation** : Contient "ai", "intelligence artificielle", "machine learning"
- **Frontend & JavaScript** : Contient "javascript", "vue", "react", "frontend"
- **DevOps & Infrastructure** : Contient "docker", "devops", "déploiement"
- **Technique** : Catégorie par défaut

## Utilisation manuelle

Pour exécuter le script manuellement :

```bash
# Avec une clé API dans les variables d'environnement
export YOUTUBE_API_KEY="votre_clé_api"
ruby scripts/fetch_youtube_videos.rb
```

## Workflow GitHub Actions

Le workflow s'exécute :
- **Automatiquement** : Tous les jours à 2h du matin (UTC)
- **Manuellement** : Via l'onglet Actions de GitHub

### Ce que fait le workflow :
1. Récupère le code source
2. Installe Ruby et les dépendances
3. Exécute le script de récupération des vidéos
4. Commit et push les changements si de nouvelles vidéos sont trouvées

## Limites et quotas

### API YouTube :
- 10,000 unités gratuites par jour
- Chaque requête de recherche coûte 100 unités
- Chaque requête de détails vidéo coûte 1 unité

### Script :
- Limité à 50 vidéos maximum par chaîne
- Récupère seulement les vidéos (pas les shorts ou lives)

## Dépannage

### Le workflow échoue :
1. Vérifiez que `YOUTUBE_API_KEY` est défini dans les secrets GitHub
2. Vérifiez que l'API YouTube Data v3 est activée
3. Consultez les logs du workflow

### Aucune nouvelle vidéo :
1. Vérifiez que l'ID de la chaîne YouTube est correct
2. Les chaînes privées ne sont pas accessibles
3. Les vidéos très récentes peuvent prendre du temps à apparaître

### Erreur de quota API :
1. Le quota quotidien est dépassé
2. Attendez le lendemain ou demandez une augmentation de quota

## Personnalisation

### Modifier les catégories :
Éditez la méthode `categorize_video` dans `scripts/fetch_youtube_videos.rb`

### Changer la fréquence :
Modifiez le cron dans `.github/workflows/fetch-youtube-videos.yml`

### Modifier l'apparence :
Éditez `_sass/youtube.scss` et `pages/youtube.md`

## Sécurité

- La clé API YouTube est stockée de manière sécurisée dans les secrets GitHub
- Aucune donnée sensible n'est exposée dans le code public
- Le script ne fait que des requêtes GET en lecture seule
