# Système de Gestion des Cookies

## Architecture

Le site utilise une architecture hybride pour la gestion du consentement RGPD :

### 1. Système Local (`cookie-consent.js`)
- Système de fallback RGPD
- S'active uniquement si le CMP Google n'est pas disponible
- Gère le localStorage pour persister les préférences
- Interface de secours pour les utilisateurs

### 2. CMP Google (`google-cmp-integration.js`)
- Système principal via Google Funding Choices
- Conforme TCF 2.0 (Transparency & Consent Framework)
- Supporte __tcfapi, __gpp, et googlefc APIs
- Synchronise automatiquement avec le système local

## Flux de Fonctionnement

### Au Chargement de la Page

1. **analytics.html** charge Google Analytics avec consentement "denied" par défaut
2. **cookie-consent.js** s'initialise et vérifie :
   - Si le CMP Google est disponible → délègue la gestion au CMP
   - Si pas de CMP Google → utilise le système local
3. **google-cmp-integration.js** s'initialise et :
   - Attache le bouton "Gérer mes cookies" dans le footer
   - Écoute les changements de consentement du CMP Google
   - Synchronise avec le système local via `syncWithLocalCookieSystem()`

### Quand l'Utilisateur Gère ses Cookies

1. Utilisateur clique sur "Gérer mes cookies" (footer.html:44)
2. `google-cmp-integration.js` détecte le clic via `#google-cmp-trigger`
3. Le CMP Google s'ouvre via une des méthodes :
   - `__tcfapi('displayConsentUi', 2, callback)` (TCF 2.0)
   - `__gpp('displayConsentUi')` (GPP)
   - `googlefc.showRevocationMessage()` (Funding Choices)

### Après le Choix de l'Utilisateur

1. Le CMP Google déclenche un événement de consentement
2. `listenToConsentChanges()` capture l'événement
3. Les préférences TCF sont converties en format local :
   ```javascript
   {
     essential: true,
     analytics: boolean,  // TCF Purpose 1 ou 7
     ad: boolean,         // TCF Purpose 3 ou 4
     adUserData: boolean,
     adPersonalization: boolean
   }
   ```
4. `updateGoogleAnalyticsConsent()` met à jour Google Analytics
5. `syncWithLocalCookieSystem()` sauvegarde dans localStorage
6. Les cookies Google Analytics sont nettoyés si consentement refusé

## Synchronisation

### CMP Google → Système Local

La fonction `syncWithLocalCookieSystem(preferences)` :
- Attend que `window.cookieConsent` soit disponible
- Appelle `window.cookieConsent.setConsentData(preferences)`
- Sauvegarde dans localStorage pour persistance
- Permet le fallback sur système local si CMP indisponible ultérieurement

### Système Local → Google Analytics

Si le CMP Google n'est pas disponible :
- Le système local gère directement Google Analytics
- Appelle `gtag('consent', 'update', ...)` selon les préférences
- Nettoie les cookies si consentement retiré

## Mapping TCF → Préférences Locales

| TCF Purpose | Description | Préférence Locale |
|-------------|-------------|-------------------|
| Purpose 1 | Store and/or access information | analytics |
| Purpose 7 | Measurement | analytics |
| Purpose 3 | Create personalised ads profile | ad |
| Purpose 4 | Select personalised ads | ad |

## Gestion des Cookies Google Analytics

### Nettoyage Automatique

La fonction `clearGoogleAnalyticsCookies()` supprime :
- `_ga*` : Client ID et session
- `_gid` : Session ID
- `_gat*` : Throttling
- Pour tous les domaines et chemins possibles

### Mise à Jour du Consentement

```javascript
gtag('consent', 'update', {
  'analytics_storage': 'granted'|'denied',
  'ad_storage': 'granted'|'denied',
  'ad_user_data': 'granted'|'denied',
  'ad_personalization': 'granted'|'denied'
});
```

## Ordre de Chargement des Scripts

1. `analytics.html` (dans `<head>`) - Consent Mode v2 par défaut
2. `cookie-consent.js` - Système local RGPD
3. `google-cmp-integration.js` - Intégration CMP Google

## Debugging

Les deux systèmes utilisent des préfixes de log clairs :
- `[Cookie Consent]` : Système local
- `[Google CMP]` : Intégration CMP Google

Activer la console pour suivre :
- Détection du CMP Google
- Événements de consentement TCF/GPP
- Synchronisation entre systèmes
- Mise à jour Google Analytics
- Nettoyage des cookies
