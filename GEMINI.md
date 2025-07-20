# Configuration Gemini CLI - Portfolio Senior Developer

## 👤 PROFIL
Senior PHP FullStack Developer & AI Orchestrator avec 15+ ans d'expérience.
Expert PrestaShop certifié, spécialisé en architecture complexe et innovation AI.

---

## 🏗️ ARCHITECTURE PROJET OBLIGATOIRE

### Structure Jekyll Standard
```
portfolio/
├── _config.yml              # Configuration Jekyll
├── Gemfile                  # Dépendances Ruby
├── Gemfile.lock            # Lock versions
├── .gitignore              # Fichiers à ignorer
├── index.md                # Page d'accueil
├── README.md               # Documentation
├── GEMINI.md              # Ce fichier
│
├── _layouts/               # Templates Jekyll
│   ├── default.html       # Layout principal
│   ├── page.html          # Pages statiques
│   ├── post.html          # Articles blog
│   ├── project.html       # Projets
│   └── case-study.html    # Case studies
│
├── _includes/              # Composants réutilisables
│   ├── head.html          # Meta-tags et CSS
│   ├── header.html        # Navigation
│   ├── footer.html        # Pied de page
│   ├── navigation.html    # Menu principal
│   ├── tech-badges.html   # Badges technologies
│   ├── project-card.html  # Card projet
│   ├── social-share.html  # Partage social
│   └── analytics.html     # Google Analytics
│
├── _sass/                  # Fichiers SCSS (SANS front matter)
│   ├── variables.scss     # Variables couleurs/fonts
│   ├── mixins.scss        # Mixins réutilisables
│   ├── base.scss          # Reset CSS et base
│   ├── components.scss    # Composants UI
│   ├── layout.scss        # Grids et layouts
│   ├── navigation.scss    # Styles navigation
│   ├── blog.scss          # Styles blog
│   └── utilities.scss     # Classes utilitaires
│
├── assets/                 # Assets statiques
│   ├── css/
│   │   └── main.scss      # Import SCSS (AVEC front matter)
│   ├── js/
│   │   ├── navigation.js  # Menu mobile
│   │   ├── theme-switcher.js # Dark mode
│   │   └── analytics.js   # Events tracking
│   └── images/
│       ├── hero/          # Images hero section
│       ├── projects/      # Screenshots projets
│       ├── blog/          # Images articles
│       └── icons/         # Icônes et logos
│
├── _projects/              # Collection projets
│   ├── 2024-01-15-ecommerce-prestashop.md
│   ├── 2023-12-10-ai-integration-platform.md
│   └── template-project.md
│
├── _posts/                 # Articles blog
│   ├── 2024-01-20-php8-performance.md
│   ├── 2024-01-15-microservices-prestashop.md
│   └── template-article.md
│
├── _data/                  # Données YAML
│   ├── navigation.yml     # Menu principal
│   ├── skills.yml         # Compétences
│   ├── certifications.yml # Certifications
│   └── seo.yml           # Métadonnées SEO
│
└── pages/                  # Pages statiques
    ├── about.md           # À propos
    ├── expertise.md       # Expertise technique
    ├── projects.html      # Liste projets
    ├── blog.html          # Liste articles
    └── contact.md         # Contact
```

### Commandes création structure
```bash
# Créer tous les dossiers nécessaires
mkdir -p _layouts _includes _sass assets/css assets/js assets/images/hero assets/images/projects assets/images/blog assets/images/icons _projects _posts _data pages

# Créer fichiers .gitkeep pour dossiers vides
touch _layouts/.gitkeep _includes/.gitkeep _data/.gitkeep
```

---

## 🎨 CHARTE GRAPHIQUE STRICTE

### Couleurs EXACTES
```scss
// Couleurs principales - SYNTAXE STRICTE
$primary-navy: #1e293b;          // Headers, navigation
$primary-blue: #3b82f6;          // CTA, liens
$accent-cyan: #06b6d4;           // Highlights, badges

// Couleurs expertise  
$php-purple: #8b5cf6;            // Badges PHP/Backend
$ai-green: #10b981;              // Badges AI/ML
$prestashop-orange: #ff6b35;     // Badge PrestaShop (parcimonie)

// Couleurs neutres
$white: #ffffff;                 // Backgrounds
$light-gray: #f1f5f9;           // Sections alternées
$secondary-gray: #64748b;        // Texte secondaire
$black: #0f172a;                // Texte principal

// Dark mode
$dark-bg: #0f172a;              // Background principal dark
$dark-surface: #1e293b;         // Cards dark mode
$dark-text: #f8fafc;            // Texte principal dark
$dark-text-muted: #94a3b8;      // Texte secondaire dark

// Status colors
$success: #10b981;
$warning: #f59e0b;
$error: #ef4444;
```

### Typographie SCSS
```scss
// Google Fonts - SYNTAXE CORRECTE
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-mono: 'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace;

// Hiérarchie typographique
$h1-size: 3.5rem;               // 56px - Hero title
$h2-size: 2.5rem;               // 40px - Section titles
$h3-size: 2rem;                 // 32px - Subsections
$h4-size: 1.5rem;               // 24px - Card titles
$h5-size: 1.25rem;              // 20px - Small headers
$h6-size: 1rem;                 // 16px - Labels
$body-size: 1rem;               // 16px - Body text
$large-size: 1.125rem;          // 18px - Intro paragraphs
$small-size: 0.875rem;          // 14px - Meta info

// Font weights
$font-bold: 700;
$font-semibold: 600;
$font-medium: 500;
$font-regular: 400;

// Line heights
$line-height-tight: 1.2;
$line-height-normal: 1.6;
$line-height-relaxed: 1.8;
```

### Spacing System
```scss
// Système d'espacement harmonieux
$spacing-xs: 8px;
$spacing-sm: 16px;
$spacing-md: 24px;
$spacing-lg: 48px;
$spacing-xl: 96px;

// Breakpoints responsive
$mobile: 640px;
$tablet: 768px;
$desktop: 1024px;
$large: 1280px;

// Container
$container-max-width: 1200px;
$container-padding: 24px;
```

---

## 📋 RÈGLES SCSS/CSS STRICTES

### ✅ SYNTAXE OBLIGATOIRE
```scss
// Variables : TOUJOURS $ au début et : avant la valeur
$ma-variable: valeur;

// Point-virgule OBLIGATOIRE après chaque déclaration
$primary-color: #3b82f6;
$font-size: 1rem;

// Imports en haut du fichier avec guillemets et point-virgule
@import "variables";
@import "mixins";

// Mixins avec @mixin et @include
@mixin button-style($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  border: none;
  padding: $spacing-sm $spacing-md;
  border-radius: 6px;
}

.btn-primary {
  @include button-style($primary-blue);
}

// Nesting maximum 3 niveaux
.navigation {
  .menu {
    .item {
      // MAX 3 niveaux - STOP ICI
      color: $primary-navy;
    }
  }
}

// Comments avec // uniquement en SCSS
// Commentaire SCSS correct

// Strings avec guillemets simples
font-family: 'Inter', sans-serif;
```

### ❌ ERREURS À ÉVITER ABSOLUMENT
```scss
// ❌ Variables sans $
primary-color: #3b82f6;

// ❌ Manque point-virgule
$color: #3b82f6

// ❌ Manque deux-points
$color #3b82f6;

// ❌ Espaces dans noms de variables
$primary color: #3b82f6;

// ❌ Import sans guillemets et point-virgule
@import variables

// ❌ Nesting trop profond (4+ niveaux) - INTERDIT
.nav {
  .menu {
    .item {
      .link {
        .text { } // TROP PROFOND
      }
    }
  }
}

// ❌ Comments CSS dans SCSS
/* Commentaire CSS - NE PAS UTILISER */

// ❌ Front matter dans fichiers _sass/
---
---
// INTERDIT dans _sass/ - Seulement dans assets/css/
```

### FRONT MATTER JEKYLL RÈGLES
```scss
// ✅ Fichiers _sass/ - PAS de front matter
$variable: valeur;
@import "autre-fichier";

// ✅ assets/css/main.scss - AVEC front matter obligatoire
---
---
// Comments après le front matter
@import "variables";
@import "mixins";

// ❌ JAMAIS de # dans front matter SCSS
---
# Commentaire - INTERDIT
---

// ❌ Front matter avec contenu
---
title: "CSS"
---
```

---

## 🔧 RÈGLES GÉNÉRATION CODE

### Validation obligatoire avant réponse
Avant de donner du code SCSS/CSS, vérifier :
- [ ] Variables commencent par $
- [ ] Point-virgules après déclarations
- [ ] Imports avec guillemets et point-virgule
- [ ] Nesting pas plus de 3 niveaux
- [ ] Comments avec // seulement
- [ ] Front matter correct selon le fichier
- [ ] Syntaxe SCSS valide compilable

### Structure progressive obligatoire
1. **D'ABORD** : _sass/variables.scss (variables seules)
2. **PUIS** : _sass/mixins.scss (mixins seules)
3. **PUIS** : _sass/base.scss (reset + base)
4. **PUIS** : assets/css/main.scss (imports)
5. **ENSUITE** : autres fichiers _sass/

### En cas de doute
- Utiliser syntaxe CSS classique plutôt que SCSS avancé
- Un fichier à la fois, pas tout d'un coup
- Tester mentalement la compilation
- Préférer la simplicité

---

## 🎯 STYLE & DESIGN PRINCIPLES

### Minimalisme technique professionnel
- Espaces blancs généreux (utiliser $spacing-lg, $spacing-xl)
- Maximum 3 couleurs par section
- Éléments alignés sur grille 8px
- Transitions subtiles : `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`

### Composants UI standards
```scss
// Cards avec subtle shadows
.card {
  background: $white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: $spacing-md;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}

// Badges technologies avec couleurs charte
.badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: $small-size;
  font-weight: $font-medium;
  
  &--php { background: $php-purple; color: $white; }
  &--ai { background: $ai-green; color: $white; }
  &--prestashop { background: $prestashop-orange; color: $white; }
}

// Buttons avec états hover
.btn {
  padding: $spacing-sm $spacing-md;
  border-radius: 6px;
  font-weight: $font-medium;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  &--primary {
    background: $primary-blue;
    color: $white;
    
    &:hover {
      background: darken($primary-blue, 10%);
    }
  }
}
```

---

## 📱 RESPONSIVE & ACCESSIBILITY

### Mobile-first obligatoire
```scss
// Base styles pour mobile
.element {
  // Styles mobile par défaut
}

// Tablet et plus
@media (min-width: $tablet) {
  .element {
    // Styles tablet
  }
}

// Desktop et plus
@media (min-width: $desktop) {
  .element {
    // Styles desktop
  }
}
```

### Accessibilité WCAG AA
- Contraste minimum 4.5:1 pour texte normal
- Contraste minimum 3:1 pour texte large
- Focus visible sur tous éléments interactifs
- Navigation clavier complète
- Alt-text sur toutes images
- ARIA labels appropriés

---

## 🏆 PROFIL SENIOR REQUIREMENTS

### Contenu à mettre en avant
- **15+ ans d'expérience** (visible hero section)
- **Expert PrestaShop certifié** (badges proéminents)
- **AI Orchestrator** (différenciateur moderne)
- **50+ projets complexes** (metrics business)
- **€10M+ revenue generated** (impact client)
- **Fortune 500 clients** (crédibilité)

### Technologies expertise
```scss
// Couleurs par domaine d'expertise
.tech-category {
  &--backend { border-left: 4px solid $php-purple; }
  &--ecommerce { border-left: 4px solid $prestashop-orange; }
  &--ai { border-left: 4px solid $ai-green; }
  &--frontend { border-left: 4px solid $primary-blue; }
  &--devops { border-left: 4px solid $accent-cyan; }
}
```

### Tone & Voice
- Professionnel et expert senior
- Orienté résultats business et ROI
- Crédible pour décideurs C-suite/CTO
- Leadership technique évident
- Moderne sans être trop technique

---

## 🚀 PERFORMANCE & SEO

### Optimisations obligatoires
- Images WebP avec fallback JPEG
- Lazy loading natif
- Critical CSS inline
- Fonts preload avec font-display: swap
- Core Web Vitals : LCP < 1.5s, FID < 100ms, CLS < 0.1

### Mots-clés SEO cibles
- "senior php developer"
- "prestashop expert"
- "ai orchestrator"
- "php architect"
- "prestashop performance optimization"
- "php microservices architecture"

---

## 📞 BUSINESS OBJECTIVES

### Conversion goals
1. **Project inquiries** (primary)
2. **Technical consultations** (secondary)
3. **LinkedIn connections** (networking)
4. **Blog engagement** (thought leadership)

### Lead qualification
- Budget range indicators
- Project complexity assessment
- Timeline expectations
- Technology stack requirements

---

## ⚠️ CONTRAINTES TECHNIQUES

### GitHub Pages limitations
- Plugins whitelist Jekyll uniquement
- Pas de gems custom
- Build automatique depuis branche main
- Pas de backend processing
- Limitation 1GB storage

### Compatibilité requise
- Chrome, Firefox, Safari, Edge dernières versions
- iOS Safari, Android Chrome
- Responsive 320px à 1920px+
- Keyboard navigation complète
- Screen readers compatible