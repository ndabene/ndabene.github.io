# GA4 Micro-Conversions Tracking - Documentation

## 📊 Objectif

Ce système de tracking permet de **mesurer l'engagement réel des visiteurs** au-delà des simples pageviews, afin de :
- Qualifier la qualité du trafic
- Identifier les pages et sources les plus efficaces
- Optimiser le contenu en fonction du comportement utilisateur
- Améliorer la rétention des primo-visiteurs

## 🎯 Événements Trackés

### 1. `scroll_depth_75` - Scroll profond (> 75%)

**Déclenchement** : Quand l'utilisateur scrolle au-delà de 75% de la hauteur de la page

**Paramètres envoyés** :
```javascript
{
  event_category: 'engagement',
  event_label: 'Deep scroll engagement',
  scroll_percentage: 87, // Pourcentage exact atteint
  page_path: '/blog/2024/mon-article',
  page_title: 'Titre de l\'article',
  value: 0.5
}
```

**Utilité** :
- Mesure l'intérêt réel pour le contenu
- Identifie les articles qui retiennent l'attention
- Indicateur de qualité du contenu

---

### 2. `internal_cta_click` - Clics sur CTA internes

**Déclenchement** : Click sur un lien interne, bouton CTA, ou élément de navigation interne

**Éléments trackés** :
- Liens internes (`href^="/"`)
- Boutons CTA (`.cta-button`, `.btn-primary`, `.btn-secondary`)
- Liens relatifs (`./`, `../`)

**Paramètres envoyés** :
```javascript
{
  event_category: 'engagement',
  event_label: 'Découvrir mes modules',
  link_text: 'Découvrir mes modules',
  link_url: '/modules',
  link_location: 'article_content', // header, footer, hero, cta_section, etc.
  link_classes: 'btn-primary cta-button',
  page_path: '/blog/2024/mon-article',
  page_title: 'Titre de l\'article',
  value: 0.3
}
```

**Utilité** :
- Comprendre le parcours utilisateur
- Identifier les CTAs les plus efficaces
- Optimiser le maillage interne

---

### 3. `engaged_session` - Session engagée (> 90s)

**Déclenchement** : Automatiquement après 90 secondes de présence sur la page

**Paramètres envoyés** :
```javascript
{
  event_category: 'engagement',
  event_label: 'Session > 90 seconds',
  session_duration_seconds: 127,
  page_path: '/blog/2024/mon-article',
  page_title: 'Titre de l\'article',
  value: 1
}
```

**Utilité** :
- Identifier les visiteurs vraiment intéressés
- Mesurer la qualité des sources de trafic
- Détecter les articles qui retiennent l'attention

---

### 4. `code_copy` - Copie de code

**Déclenchement** : Quand l'utilisateur copie du texte depuis un bloc de code

**Blocs de code détectés** :
- `<pre><code>` (standard Markdown)
- `.highlight`, `.highlighter-rouge` (Jekyll/Rouge)
- `code[class*="language-"]` (Prism, Highlight.js)

**Paramètres envoyés** :
```javascript
{
  event_category: 'engagement',
  event_label: 'Code copied from article',
  code_language: 'javascript', // Détecté automatiquement
  code_length: 243, // Nombre de caractères copiés
  article_title: 'Titre de l\'article',
  page_path: '/blog/2024/mon-article',
  page_title: 'Titre de l\'article',
  value: 0.8
}
```

**Utilité** :
- Mesure l'utilité pratique du contenu
- Identifie les tutoriels les plus utilisés
- Indicateur fort d'engagement

---

## 🧪 Comment Tester

### Test en Local (Console Navigateur)

1. Ouvrir la console navigateur (F12)
2. Les événements sont loggés dans la console :
   ```
   Micro-conversion tracked: scroll_depth_75 {event_category: "engagement", ...}
   ```

### Test avec GA4 DebugView

1. **Activer le mode debug** :
   ```javascript
   // Dans la console
   gtag('set', 'debug_mode', true);
   ```

2. **Accéder à DebugView** :
   - Google Analytics 4 → Configure → DebugView
   - Les événements apparaissent en temps réel

3. **Simuler les événements** :
   - **scroll_depth_75** : Scroller jusqu'en bas de la page
   - **internal_cta_click** : Cliquer sur un lien interne
   - **engaged_session** : Attendre 90 secondes
   - **code_copy** : Sélectionner et copier du code (Ctrl/Cmd+C)

### Vérification Chrome DevTools

```javascript
// Vérifier que gtag est chargé
typeof gtag
// → "function"

// Simuler manuellement un événement
gtag('event', 'test_event', {
  event_category: 'test',
  event_label: 'Manual test'
});
```

---

## 📈 Exploitation dans GA4

### Créer des Segments d'Audience

**Visiteurs engagés** :
- Ont déclenché `engaged_session` OU `scroll_depth_75`
- Parfait pour le retargeting

**Utilisateurs qualifiés** :
- Ont copié du code (`code_copy`)
- Cible idéale pour les formations/produits

### Rapports Personnalisés

1. **Exploration → Analyse de l'engagement** :
   - Dimension : `page_path`
   - Métrique : Nombre de `scroll_depth_75`
   - Filtre : Articles de blog uniquement

2. **Efficacité des CTAs** :
   - Dimension : `link_location` + `link_text`
   - Métrique : Nombre de `internal_cta_click`
   - Trier par volume

3. **Contenu technique populaire** :
   - Dimension : `article_title`
   - Métrique : Nombre de `code_copy`
   - Identifier les tutoriels les plus utiles

---

## 🎛️ Configuration

### Modifier les Seuils

Éditer `/assets/js/ga4-micro-conversions.js` :

```javascript
const CONFIG = {
  scrollDepthThreshold: 75,      // % → Modifier si besoin (ex: 50, 90)
  engagedSessionTime: 90000,     // ms → 90s par défaut
  debounceDelay: 300,            // ms → Performance scroll
};
```

### Ajouter de Nouveaux Événements

Le code est modulaire. Exemple pour tracker les vidéos :

```javascript
function initVideoTracking() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('play', () => {
      trackMicroConversion('video_play', {
        event_label: 'Video started',
        video_title: video.title || 'Unknown',
        value: 0.6
      });
    });
  });
}

// Ajouter dans initMicroConversionTracking()
initVideoTracking();
```

---

## 🚀 Évolutions Possibles

### Court terme
- [ ] Ajouter un événement pour les téléchargements (PDFs, e-books)
- [ ] Tracker les ouvertures de lightbox/modals
- [ ] Mesurer le temps passé sur les blocs de code

### Moyen terme
- [ ] Heatmaps des clics avec Hotjar/Microsoft Clarity
- [ ] A/B testing des CTAs
- [ ] Scoring automatique des visiteurs (lead scoring)

### Long terme
- [ ] Machine learning pour prédire l'engagement
- [ ] Personnalisation du contenu basée sur l'engagement
- [ ] Recommandations d'articles intelligentes

---

## 📝 Notes Techniques

### Performance
- Tous les listeners utilisent `{ passive: true }` pour optimiser le scroll
- Debouncing sur le scroll (300ms) pour éviter trop d'appels
- Les événements sont trackés une seule fois (state management)
- Scripts chargés en `defer` pour ne pas bloquer le rendering

### Respect de la Vie Privée
- Compatible avec Google Consent Mode v2
- Pas de données personnelles collectées
- Respect RGPD : données anonymisées
- Les événements ne sont envoyés que si l'utilisateur accepte les cookies analytics

### Compatibilité
- ✅ Tous navigateurs modernes (Chrome, Firefox, Safari, Edge)
- ✅ Mobile et desktop
- ✅ Compatible avec le PWA et Service Workers
- ✅ Fonctionne avec les sites statiques Jekyll

---

## 🆘 Troubleshooting

### Les événements ne s'affichent pas dans GA4

1. **Vérifier que GA4 est chargé** :
   ```javascript
   console.log(typeof gtag); // Doit retourner "function"
   ```

2. **Vérifier le consentement cookies** :
   - Les événements ne sont envoyés que si analytics_storage = 'granted'

3. **Activer DebugView** :
   ```javascript
   gtag('set', 'debug_mode', true);
   ```

### Les événements sont dupliqués

- Vérifier qu'il n'y a pas de double inclusion du script
- Le système de state management devrait empêcher les doublons

### Code copy ne fonctionne pas

- Vérifier que les blocs de code utilisent les classes attendues
- Tester avec `Ctrl+C` (pas clic droit → copier)

---

## 📚 Ressources

- [GA4 Events Documentation](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Google Consent Mode v2](https://support.google.com/analytics/answer/9976101)
- [DebugView Guide](https://support.google.com/analytics/answer/7201382)

---

**Version** : 1.0.0
**Dernière mise à jour** : {{ "now" | date: "%Y-%m-%d" }}
**Auteur** : Nicolas Dabène
