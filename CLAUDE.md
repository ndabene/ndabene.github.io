# CLAUDE.md - Règles de Développement

Ce fichier définit les conventions et règles pour maintenir la cohérence du développement du portfolio de Nicolas Dabène.

## 🏗️ Architecture du Projet

### Type de Projet
- **Framework** : Jekyll (Ruby)
- **Type** : Portfolio personnel avec blog technique
- **Déploiement** : GitHub Pages
- **URL Production** : https://nicolas-dabene.fr
- **Audience** : Développeurs PHP/JavaScript, Architectes logiciels, CTOs

### Structure des Dossiers
```
/
├── _posts/          # Articles de blog (YYYY-MM-DD-titre.md)
├── _case_studies/   # Études de cas clients
├── _data/           # Données YAML (skills, projects, etc.)
├── _includes/       # Composants HTML réutilisables  
├── _layouts/        # Templates de pages
├── _sass/           # Fichiers SCSS modulaires
├── assets/          # CSS, JS, images
├── pages/           # Pages statiques
└── scripts/         # Scripts de déploiement et maintenance
```

## 📝 Conventions de Code

### Fichiers Markdown
- **Articles** : `_posts/YYYY-MM-DD-titre-en-kebab-case.md`
- **Front Matter obligatoire** : layout, title, date, author, categories, tags, excerpt
- **Langue** : Français pour le contenu, Anglais pour les variables techniques
- **Encoding** : UTF-8

### Système de Publication
- **published: true/false** : Contrôle la publication (défaut: true)
- **draft: true/false** : Mode brouillon visible uniquement en preview
- **preview_key: "xxx"** : Clé d'accès sécurisé pour drafts sensibles
- **Preview URLs** : 
  - `?preview=true` : Tous les drafts publics
  - `?preview_key=xxx` : Drafts avec clé spécifique

### CSS/SCSS
- **Architecture** : SCSS modulaire dans `_sass/`
- **Naming** : BEM methodology
- **Variables** : Définies dans `_sass/variables.scss`
- **Mobile-first** : Responsive design obligatoire

### JavaScript
- **Localisation** : `assets/js/`
- **ES6+** : Utiliser les fonctionnalités modernes
- **Vanilla JS** : Pas de jQuery, privilégier le JavaScript natif
- **Performance** : Code optimisé pour le mobile

## 🎯 Standards de Contenu

### Articles de Blog
- **Longueur** : 800-2000 mots minimum
- **Structure** : H2 pour sections principales, H3 pour sous-sections
- **Code** : Toujours avec coloration syntaxique et commentaires
- **Images** : JPG 1200x630px pour bannière, alt text obligatoire
- **SEO** : Optimisé pour référencement classique + IA génératives (GEO)

### Catégories Autorisées (français uniquement)
- Développement, PHP, PrestaShop, Intelligence Artificielle
- Performance, Architecture, Sécurité, Bonnes Pratiques
- Tutoriel, Ecommerce, Entrepreneuriat, Success Story

### Technologies Meta
- **PHP** : Version 8+ en exemples
- **PrestaShop** : Versions 1.7+ et 8+
- **Frontend** : HTML5, CSS3, ES6+, APIs modernes

## 🚀 Workflows de Développement

### Branches Git
- **main** : Production (deploy automatique)
- **develop** : Développement principal
- **feature/nom** : Nouvelles fonctionnalités
- **hotfix/nom** : Corrections urgentes

### Scripts Disponibles
```bash
npm run build          # Build Jekyll
npm run serve          # Serveur local port 4000
npm run new-post       # Créer nouvel article
npm run update-sitemap # Mettre à jour le sitemap
npm run preview        # Mode admin preview (articles futurs)
npm run preview-stop   # Arrêter le mode preview

# Création d'articles avec options
npm run new-draft --title="Mon Draft"              # Draft non publié  
npm run new-future --title="Article" --date="2025-12-25"  # Article futur
./scripts/new-post.sh "Titre" --draft --preview-key="secret123"  # Draft sécurisé
```

### Déploiement
- **Auto** : Push sur `main` → déploiement GitHub Pages + build quotidien à 6h UTC
- **Test local** : `bundle exec jekyll serve` avant push
- **Vérifications** : Links checker, responsive test
- **Articles futurs** : Publication automatique via GitHub Actions quotidiennes

## 🎨 Identité Visuelle

### Design System
- **Couleurs** : Définies dans `_sass/variables.scss`
- **Typographie** : Inter (titres) + Poppins (body)
- **Icônes** : Font Awesome + icônes custom SVG
- **Layout** : Grid CSS + Flexbox

### Composants Clés
- **Navigation** : Sticky header avec mega-menu
- **Blog** : Banner moderne + TOC intégrée + boutons copier
- **Cards** : Hover effects + responsive design
- **Forms** : Validation JS + styles cohérents

## 📊 Performance & SEO

### Optimisations Requises
- **Images** : WebP avec fallback JPG/PNG
- **CSS** : Minification automatique (SCSS compressed)
- **JS** : Bundling et minification
- **Fonts** : Préchargement des polices critiques

### Métriques Cibles
- **PageSpeed** : 90+ sur mobile et desktop
- **Accessibility** : 100% (WCAG 2.1 AA)
- **SEO** : 100% (meta tags complets)
- **Best Practices** : 100%

## 🔧 Outils et Commandes

### Jekyll
```bash
bundle exec jekyll serve --port 4000  # Dev server
bundle exec jekyll build              # Production build
bundle exec jekyll clean              # Clean cache
```

### Scripts Maintenance
```bash
bash scripts/new-post.sh "Titre Article"     # Nouveau post
bash scripts/test-sitemap.sh                 # Test sitemap
bash update-sitemap.sh                       # Update sitemap
```

## ⚡ Nouvelles Fonctionnalités 2025

### UX/UI Rework Completé
- ✅ **Banner moderne** : Design épuré avec overlay
- ✅ **TOC intégrée** : Navigation sticky et repliable
- ✅ **Boutons copier** : Auto sur blocs de code
- ✅ **Responsive** : Mobile-first optimisé
- ✅ **Résumé Exécutif supprimé** : Métadonnées dans banner

### Améliorations Techniques
- ✅ **Auto-génération TOC** : H2/H3 → navigation
- ✅ **Scroll offset intelligent** : Évite navbar
- ✅ **Transitions fluides** : Animations CSS optimisées
- ✅ **Breadcrumb intégré** : Navigation contextuelle

## 🚫 Restrictions & Sécurité

### Ne JAMAIS faire
- ❌ Créer de nouveaux fichiers de documentation sans demande explicite
- ❌ Modifier `_config.yml` sans validation
- ❌ Ajouter des dépendances externes non testées
- ❌ Exposer des informations sensibles dans le code
- ❌ Utiliser des CDNs non-fiables

### Validation Obligatoire
- ✅ HTML W3C validator
- ✅ CSS Lint
- ✅ JS Lint (ESLint recommended)
- ✅ Links checker
- ✅ Image optimization check

## 📞 Contact & Maintenance

**Propriétaire** : Nicolas Dabène  
**Email** : ndabene2807@gmail.com  
**Dernière MAJ** : Juillet 2025  
**Version Jekyll** : 4.3+  
**Ruby Version** : 3.0+

---

*Ce fichier est maintenu automatiquement. Toute modification doit être validée par le propriétaire du projet.*