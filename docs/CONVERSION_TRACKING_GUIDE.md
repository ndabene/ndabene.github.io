# Guide du Tracking des Conversions Google Analytics

## Vue d'ensemble

Ce document décrit le système de tracking des conversions mis en place sur nicolas-dabene.fr pour Google Analytics 4 (GA4).

## Fichiers modifiés

1. **Nouveau fichier créé :**
   - `assets/js/conversion-tracking.js` - Script principal de tracking des conversions

2. **Fichiers modifiés :**
   - `_layouts/default.html` - Ajout du script de tracking
   - `_layouts/product-landing.html` - Ajout du script de tracking

## Conversions Trackées

### 1. Conversions Primaires (High Value)

#### A. Clics vers PrestaShop Addons Marketplace
- **Événement GA4 :** `marketplace_click`
- **Valeur :** 1
- **Localisation :**
  - Page MCP Tools Plus (FR) : `/modules/mcp-tools-plus/`
  - Page MCP Tools Plus (EN) : `/en/modules/mcp-tools-plus/`
  - Tous les liens vers `addons.prestashop.com`

**Paramètres trackés :**
```javascript
{
  event_category: 'conversion',
  event_label: 'MCP Tools Plus', // Nom du produit
  product_id: '96638', // ID du produit
  link_text: 'Obtenir sur PrestaShop Addons',
  link_location: 'header|hero|cta_section|footer',
  destination_url: 'https://addons.prestashop.com/...',
  value: 1
}
```

#### B. Soumission du Formulaire de Contact
- **Événement GA4 :** `contact_form_submission`
- **Valeur :** 5
- **Localisation :** `/contact/`

**Paramètres trackés :**
```javascript
{
  event_category: 'conversion',
  event_label: 'Mission freelance|Formation|Conseil',
  form_subject: 'Sujet du message',
  value: 5
}
```

### 2. Conversions Secondaires (Medium Value)

#### A. Clics vers Autres Produits/Modules
- **Événement GA4 :** `other_product_click`
- **Valeur :** 0.5
- **Produits concernés :**
  - Geo Suite
  - Google Pay
  - Google Merchant Center PRO

**Paramètres trackés :**
```javascript
{
  event_category: 'engagement',
  event_label: 'Nom du produit',
  destination_url: 'https://businesstech.fr/...',
  value: 0.5
}
```

#### B. Visites de Pages Produit
- **Événement GA4 :** `product_page_view`
- **Valeur :** 0.5
- **Localisation :** Toutes les pages `/modules/`

**Paramètres trackés :**
```javascript
{
  event_category: 'engagement',
  event_label: 'Nom du produit',
  page_language: 'fr|en',
  value: 0.5
}
```

### 3. Micro-Conversions (Low Value)

#### A. Clics sur les Blocs CTA dans les Articles
- **Événement GA4 :** `cta_block_click`
- **Valeur :** 0.3
- **Localisation :** Articles de blog contenant le bloc `blog-mcp-tools-plus-block`

**Paramètres trackés :**
```javascript
{
  event_category: 'engagement',
  event_label: 'MCP Tools Plus CTA',
  article_title: 'Titre de l\'article',
  link_text: 'En savoir plus',
  destination_url: '/modules/mcp-tools-plus/',
  value: 0.3
}
```

#### B. Clics vers les Réseaux Sociaux
- **Événement GA4 :** `social_media_click`
- **Valeur :** 0.1
- **Plateformes :** LinkedIn, GitHub, YouTube, Twitter/X, Facebook, Dev.to

**Paramètres trackés :**
```javascript
{
  event_category: 'engagement',
  event_label: 'LinkedIn|GitHub|YouTube|...',
  value: 0.1
}
```

## Configuration dans Google Analytics 4

### Étape 1 : Créer les Conversions

1. Allez dans Google Analytics 4
2. Cliquez sur **Admin** (en bas à gauche)
3. Dans la colonne **Propriété**, cliquez sur **Événements**
4. Activez chaque événement comme conversion en cliquant sur le bouton à bascule

### Étape 2 : Événements à Marquer comme Conversions

Marquez les événements suivants comme conversions dans GA4 :

**Conversions Primaires (OBLIGATOIRE) :**
- ✅ `marketplace_click` - Clic vers marketplace PrestaShop Addons
- ✅ `contact_form_submission` - Soumission formulaire contact

**Conversions Secondaires (RECOMMANDÉ) :**
- ⚠️ `other_product_click` - Clic vers autres produits
- ⚠️ `product_page_view` - Visite page produit

**Micro-Conversions (OPTIONNEL) :**
- 💡 `cta_block_click` - Clic sur bloc CTA article
- 💡 `social_media_click` - Clic réseaux sociaux

### Étape 3 : Créer des Segments et Rapports

#### Rapport 1 : Conversions Marketplace
**But :** Voir quels liens marketplace génèrent le plus de clics

1. Allez dans **Rapports** > **Engagement** > **Événements**
2. Filtrez sur l'événement `marketplace_click`
3. Ajoutez les dimensions :
   - `link_location` (header, hero, cta_section)
   - `link_text`
   - `page_language`

#### Rapport 2 : Performance des CTA Articles
**But :** Voir quels articles génèrent le plus d'engagement

1. Filtrez sur l'événement `cta_block_click`
2. Ajoutez la dimension `article_title`
3. Triez par nombre d'événements

#### Rapport 3 : Formulaire de Contact
**But :** Analyser les types de demandes

1. Filtrez sur l'événement `contact_form_submission`
2. Ajoutez la dimension `event_label` (type de demande)

## Valeurs de Conversion

Les valeurs attribuées permettent de comparer l'importance relative des différentes actions :

| Événement | Valeur | Justification |
|-----------|--------|---------------|
| `contact_form_submission` | 5 | Contact direct = intention forte |
| `marketplace_click` | 1 | Clic vers achat potentiel |
| `other_product_click` | 0.5 | Intérêt produit secondaire |
| `product_page_view` | 0.5 | Découverte produit |
| `cta_block_click` | 0.3 | Engagement article |
| `social_media_click` | 0.1 | Engagement faible |

## Vérification du Tracking

### Console du Navigateur

Pour vérifier que les conversions sont bien trackées :

1. Ouvrez la console du navigateur (F12)
2. Cliquez sur un lien marketplace
3. Vous devriez voir : `Conversion tracked: marketplace_click {event_category: 'conversion', ...}`

### Google Analytics DebugView

1. Allez dans GA4 > **Admin** > **DebugView**
2. Installez l'extension Chrome "GA Debugger"
3. Naviguez sur le site et vérifiez les événements en temps réel

### Google Tag Assistant

1. Installez l'extension Chrome "Tag Assistant"
2. Activez le debug mode
3. Vérifiez que les événements sont bien envoyés à GA4

## Maintenance et Optimisation

### Ajouter de Nouvelles Conversions

Pour ajouter un nouveau type de conversion :

1. Éditez `assets/js/conversion-tracking.js`
2. Créez une nouvelle fonction de tracking
3. Appelez-la dans `initConversionTracking()`
4. Mettez à jour ce document

### Exemple d'Ajout

```javascript
// Track download clicks
function trackDownloadClicks() {
  const downloadLinks = document.querySelectorAll('a[href$=".pdf"], a[href*="download"]');

  downloadLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const filename = this.href.split('/').pop();

      trackConversion('file_download', {
        event_category: 'engagement',
        event_label: filename,
        file_type: filename.split('.').pop(),
        value: 0.5
      });
    });
  });
}
```

## Troubleshooting

### Les conversions ne sont pas trackées

1. **Vérifiez que GA4 est chargé :**
   - Ouvrez la console : `typeof gtag !== 'undefined'` devrait retourner `true`

2. **Vérifiez le consentement cookies :**
   - Les conversions ne sont trackées que si l'utilisateur a accepté les cookies analytiques

3. **Vérifiez les AdBlockers :**
   - Certains bloqueurs de publicité bloquent Google Analytics

4. **Vérifiez la console :**
   - Recherchez des erreurs JavaScript

### Les événements n'apparaissent pas dans GA4

1. Attendez 24-48h (les événements peuvent prendre du temps à apparaître)
2. Utilisez DebugView pour voir les événements en temps réel
3. Vérifiez que l'ID de mesure GA4 est correct dans `_config.yml`

## Ressources

- [Documentation Google Analytics 4](https://support.google.com/analytics/answer/9267735)
- [Guide des Conversions GA4](https://support.google.com/analytics/answer/9267568)
- [DebugView GA4](https://support.google.com/analytics/answer/7201382)

## Changelog

- **2025-11-28** : Création du système de tracking des conversions
  - Ajout de 6 types d'événements
  - Configuration automatique pour tous les liens marketplace
  - Tracking du formulaire de contact
  - Documentation complète

---

**Auteur :** Nicolas Dabène
**Dernière mise à jour :** 2025-11-28
