# Nicolas Dabène - Portfolio Professionnel

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Nicolas%20Dabène-2563EB?style=for-the-badge&logo=github&logoColor=white)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.3+-CC0000?style=for-the-badge&logo=jekyll&logoColor=white)](https://jekyllrb.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-22863a?style=for-the-badge&logo=github&logoColor=white)](https://ndabene.github.io)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**Portfolio personnel de Nicolas Dabène**  
*Senior PHP FullStack Developer & AI Orchestrator avec 15+ ans d'expérience*

[🌐 Voir le site](https://ndabene.github.io) • [📧 Contact](mailto:contact@ndabene.fr) • [💼 LinkedIn](https://linkedin.com/in/nicolasdabene)

</div>

## 📋 Table des matières

- [🚀 Aperçu](#-aperçu)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies](#️-technologies)
- [📁 Structure du projet](#-structure-du-projet)
- [🏃‍♂️ Installation et développement](#️-installation-et-développement)
- [🎨 Design System](#-design-system)
- [📝 Gestion du contenu](#-gestion-du-contenu)
- [🚀 Déploiement](#-déploiement)
- [🤝 Contribution](#-contribution)
- [📄 License](#-license)

## 🚀 Aperçu

Ce portfolio présente le parcours professionnel de Nicolas Dabène, développeur senior spécialisé dans l'écosystème PHP/Symfony et l'e-commerce PrestaShop. Le site met en valeur ses 15+ années d'expérience, ses expertises techniques, ses projets marquants et son expertise en intégration d'IA.

### 🎯 Expertises principales

| Domaine | Description | Expérience |
|---------|-------------|------------|
| **PrestaShop Development** | 50+ modules développés, architecture e-commerce | 10+ ans |
| **PHP/Symfony** | Architecture backend robuste, APIs haute performance | 15+ ans |
| **AI Integration** | Orchestration d'IA dans les workflows de développement | 2+ ans |
| **FullStack Development** | Frontend moderne + Backend scalable | 15+ ans |
| **Product Management** | Gestion de produits techniques, roadmaps | 5+ ans |
| **Innovation & Leadership** | Direction technique, mentoring équipes | 8+ ans |

## ✨ Fonctionnalités

- ✅ **Design moderne et responsive** - Compatible tous écrans
- ✅ **Navigation dynamique** - Générée depuis les données YAML
- ✅ **Contenu modulaire** - Sections réutilisables et maintenables
- ✅ **SEO optimisé** - Meta tags, Open Graph, structure sémantique
- ✅ **Performance élevée** - CSS minifié, images optimisées
- ✅ **Accessibilité** - WCAG 2.1, navigation clavier, ARIA
- ✅ **Blog intégré** - Articles techniques et cas d'usage
- ✅ **Études de cas détaillées** - Projets avec métriques business
- ✅ **Portfolio de modules** - 50+ modules PrestaShop documentés

## 🛠️ Technologies

### Core Stack
- **Framework**: [Jekyll](https://jekyllrb.com/) 4.3+
- **Langages**: Ruby, Liquid, Markdown, HTML5, CSS3/Sass
- **Hébergement**: GitHub Pages
- **CI/CD**: GitHub Actions

### Design & Assets
- **CSS Framework**: Sass/SCSS avec design system personnalisé
- **Typographie**: Inter (corps) + Poppins (titres)
- **Icons**: Font Awesome Pro
- **Responsive**: Mobile-first approach

### Outils de développement
- **Bundler**: Gestion des dépendances Ruby
- **Sass**: Préprocesseur CSS avec modules
- **Jekyll Plugins**: SEO, sitemap, feed RSS

## 📁 Structure du projet

```
├── 📂 _data/                 # Données structurées (YAML)
│   ├── navigation.yml        # Menu principal
│   ├── expertise.yml         # Domaines d'expertise
│   ├── modules.yml          # Modules PrestaShop
│   └── publications.yml     # Articles et tutoriels
├── 📂 _includes/            # Composants réutilisables
│   ├── header.html          # En-tête du site
│   ├── footer.html          # Pied de page
│   └── components/          # Cards, boutons, badges
├── 📂 _layouts/             # Templates de page
│   ├── default.html         # Template de base
│   ├── page.html           # Pages statiques
│   └── post.html           # Articles de blog
├── 📂 _posts/               # Articles de blog (Markdown)
├── 📂 _projects/            # Portfolio de projets
├── 📂 _case_studies/        # Études de cas détaillées
├── 📂 _sass/                # Styles modulaires
│   ├── _variables.scss      # Variables globales
│   ├── _components.scss     # Composants UI
│   └── _layouts.scss        # Mise en page
├── 📂 assets/               # Assets statiques
│   ├── css/                # CSS compilé
│   ├── js/                 # JavaScript
│   └── images/             # Images et médias
├── 📂 pages/                # Pages principales
│   ├── expertise.md         # Page expertise
│   ├── projets.md          # Portfolio projets
│   └── contact.md          # Page contact
├── 📄 _config.yml           # Configuration Jekyll
├── 📄 Gemfile              # Dépendances Ruby
└── 📄 index.md             # Page d'accueil
```

## 🏃‍♂️ Installation et développement

### Prérequis

- **Ruby** 3.0+ ([Installation](https://www.ruby-lang.org/fr/documentation/installation/))
- **Bundler** 2.0+ (`gem install bundler`)
- **Git** pour le clonage du repository

### Installation

```bash
# Cloner le repository
git clone https://github.com/ndabene/ndabene.github.io.git
cd ndabene.github.io

# Installer les dépendances Ruby
bundle install

# Démarrer le serveur de développement
bundle exec jekyll serve

# Le site sera accessible sur http://localhost:4000
```

### Commandes utiles

```bash
# Développement avec rechargement automatique
bundle exec jekyll serve --livereload

# Build pour production
bundle exec jekyll build

# Build avec environnement de production
JEKYLL_ENV=production bundle exec jekyll build

# Vérifier la configuration
bundle exec jekyll doctor
```

## 🎨 Design System

### Palette de couleurs

```scss
// Couleurs principales
$primary-blue: #2563EB;     // Bleu tech principal
$accent-teal: #0D9488;      // Accent teal
$accent-orange: #EA580C;    // Accent orange
$dark-navy: #1E293B;        // Texte principal
$light-gray: #F8FAFC;       // Arrière-plans

// Dégradés
$gradient-primary: linear-gradient(135deg, $primary-blue, $accent-teal);
$gradient-accent: linear-gradient(135deg, $accent-orange, #F59E0B);
```

### Typographie

- **Titres**: Poppins (600, 700)
- **Corps de texte**: Inter (400, 500, 600)
- **Code**: Monaco, Consolas, monospace

### Composants

- **Cards**: Ombre subtile, bordures arrondies, hover effects
- **Boutons**: Styles primary, secondary, outline avec animations
- **Badges**: Couleurs sémantiques pour technologies et compétences
- **Grid**: Système flexible basé sur CSS Grid et Flexbox

## 📝 Gestion du contenu

Le contenu est entièrement géré via des fichiers YAML dans le dossier `_data/` pour faciliter la maintenance :

### Structure des données

```yaml
# _data/expertise.yml
- domain: "PrestaShop Development"
  icon: "fab fa-php"
  description: "Architecture e-commerce et développement de modules"
  skills:
    - name: "Module Development"
      level: 95
    - name: "Theme Integration"
      level: 90
  projects_count: 50
```

### Ajout de contenu

1. **Nouvel article** : Créer un fichier `.md` dans `_posts/`
2. **Nouveau projet** : Ajouter une entrée dans `_data/modules.yml`
3. **Nouvelle expertise** : Modifier `_data/expertise.yml`

## 🚀 Déploiement

Le site est automatiquement déployé sur GitHub Pages via GitHub Actions :

1. **Push sur `main`** déclenche le build automatique
2. **Jekyll build** génère les fichiers statiques
3. **Déploiement** sur `https://ndabene.github.io`

### Configuration GitHub Pages

```yaml
# _config.yml
url: "https://ndabene.github.io"
baseurl: ""
repository: "ndabene/ndabene.github.io"
```

## 🤝 Contribution

Ce projet étant un portfolio personnel, les contributions externes ne sont pas acceptées. Cependant, vous pouvez :

- 🐛 [Signaler des bugs](https://github.com/ndabene/ndabene.github.io/issues)
- 💡 [Suggérer des améliorations](https://github.com/ndabene/ndabene.github.io/issues)
- ⭐ Mettre une étoile si le projet vous inspire !

### Guidelines pour les issues

- Utilisez les templates d'issues fournis
- Incluez des captures d'écran si pertinent
- Précisez votre navigateur et OS

## 📊 Métriques et performance

- **Performance Score**: 95+ (Lighthouse)
- **Accessibilité**: 100/100 (WCAG 2.1 AA)
- **SEO Score**: 100/100
- **Temps de chargement**: < 2s (3G)

## 📧 Contact et liens

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nicolas%20Dabène-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/nicolas-dabène-473a43b8)
[![GitHub](https://img.shields.io/badge/GitHub-ndabene-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ndabene)

</div>

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">

**Développé avec ❤️ par Nicolas Dabène**  
*Utilisant Jekyll et déployé sur GitHub Pages*

[![Made with Jekyll](https://img.shields.io/badge/Made%20with-Jekyll-CC0000?style=flat-square&logo=jekyll&logoColor=white)](https://jekyllrb.com/)
[![Hosted on GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-22863a?style=flat-square&logo=github&logoColor=white)](https://pages.github.com/)

</div>