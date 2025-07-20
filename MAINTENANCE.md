# 🚧 Système de Maintenance Mode

Ce système permet de mettre le site en mode maintenance tout en autorisant l'accès depuis une IP spécifique pour le développement.

## 📋 Fonctionnalités

- ✅ **Protection par IP** : Seule l'IP `109.210.10.225` peut accéder au site en mode maintenance
- ✅ **Page de maintenance moderne** : Design professionnel avec informations de contact
- ✅ **Gestion via GitHub Actions** : Activation/désactivation en un clic
- ✅ **Clé de développement** : Accès d'urgence via URL spéciale
- ✅ **Mode développeur** : Badge et raccourcis pour le debug

## 🎯 Utilisation

### Méthode 1: GitHub Actions (Recommandée)

1. Aller dans **Actions** sur GitHub
2. Sélectionner **Toggle Maintenance Mode**
3. Cliquer sur **Run workflow**
4. Choisir:
   - `true` pour activer le mode maintenance
   - `false` pour le désactiver
   - Ajouter une raison (optionnel)

### Méthode 2: Clé de développement d'urgence

Si vous n'avez pas accès aux GitHub Actions, utilisez cette URL:
```
https://ndabene.github.io?dev=ndabene_dev_2025
```

Cette clé sera stockée dans le `localStorage` pour les visites futures.

### Méthode 3: Console développeur

Dans la console du navigateur:
```javascript
// Désactiver le mode maintenance
disableMaintenanceMode();

// Activer le mode maintenance
enableMaintenanceMode();

// Voir la configuration actuelle
console.log(MAINTENANCE_CONFIG);
```

## 📁 Fichiers concernés

- **`maintenance.html`** : Page de maintenance
- **`assets/js/maintenance-check.js`** : Script de vérification IP
- **`_config.yml`** : Configuration Jekyll
- **`.github/workflows/maintenance-mode.yml`** : GitHub Action

## ⚙️ Configuration

### IP autorisée
Modifiez dans `assets/js/maintenance-check.js`:
```javascript
const ALLOWED_IP = '109.210.10.225';
```

Et dans `_config.yml`:
```yaml
allowed_ips:
  - "109.210.10.225"
```

### Clé de développement
Modifiez dans `assets/js/maintenance-check.js`:
```javascript
const DEV_ACCESS_KEY = 'ndabene_dev_2025';
```

## 🔄 Workflow GitHub Action

L'action automatise:
1. ✅ Mise à jour de `_config.yml`
2. ✅ Mise à jour du script JavaScript
3. ✅ Commit et push automatiques
4. ✅ Log des changements
5. ✅ Vérification du déploiement

## 🚨 Accès d'urgence

Si le système de maintenance pose problème:

1. **Via GitHub**: Éditez directement `assets/js/maintenance-check.js` et changez:
   ```javascript
   const MAINTENANCE_MODE = false;
   ```

2. **Via URL**: Utilisez la clé de développement dans l'URL

3. **Via Console**: Utilisez `disableMaintenanceMode()` dans la console

## 📊 Logs

Les activations/désactivations sont enregistrées dans `maintenance.log`:
```
2025-01-20 14:30:00: Maintenance mode set to true
Reason: Deploying new features
Triggered by: ndabene
---
```

## 🔧 Debug

### Vérifier l'IP détectée
```javascript
fetch('https://api.ipify.org?format=json')
  .then(r => r.json())
  .then(data => console.log('Mon IP:', data.ip));
```

### Tester le mode maintenance
```javascript
console.log('Mode maintenance:', MAINTENANCE_CONFIG.mode);
console.log('IP autorisée:', MAINTENANCE_CONFIG.allowedIP);
```

## 🎨 Personnalisation de la page de maintenance

Éditez `maintenance.html` pour:
- Changer le design
- Modifier les informations de contact
- Ajuster la barre de progression
- Ajouter/modifier les fonctionnalités présentées

## 📱 Responsive

La page de maintenance est optimisée pour:
- ✅ Desktop
- ✅ Tablet  
- ✅ Mobile
- ✅ Navigation clavier
- ✅ Lecteurs d'écran

## 🔒 Sécurité

- ✅ Vérification IP côté client (approximative)
- ✅ Clé de développement sécurisée
- ✅ Pas d'exposition de données sensibles
- ✅ Fallback en cas d'erreur API
- ✅ Mode `noindex` sur la page de maintenance