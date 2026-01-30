---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7]
inputDocuments:
  - 'docs/prd-design-rework.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - '_bmad-output/planning-artifacts/product-brief-ndabene.github.io-2026-01-26.md'
  - 'docs/architecture-nexus.md'
workflowType: 'architecture'
project_name: 'ndabene.github.io'
user_name: 'Nikko'
date: '2026-01-30'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Le système doit supporter une interface immersive "Nexus" utilisant le Glassmorphism (FR-01/02). La navigation doit être fluide avec un menu flottant et des filtres de blog sans rechargement (FR-03/04). La section Hero doit intégrer des effets de parallaxe (FR-05) et le blog doit adopter un layout Bento (FR-06). Un pipeline de validation de données (XML/Frontmatter) est requis (FR-07).

**Non-Functional Requirements:**
- Performance : Score Lighthouse > 90 (NFR-01).
- Poids : Assets optimisés (WebP/Avif) < 1.5MB (NFR-02).
- Fluidité : Réponse < 50ms pour les interactions (NFR-03).
- Accessibilité : Contraste WCAG AA (NFR-04).
- Stack : Jekyll, Vanilla SCSS/JS uniquement (NFR-06).

**Scale & Complexity:**
Le projet présente une complexité technique modérée mais une exigence esthétique et de performance très élevée.

- Primary domain: Static Web (Jekyll)
- Complexity level: Medium
- Estimated architectural components: 4 (Design System, Hero/Layout, Navigation/Blog, CI/CD Pipeline)

### Technical Constraints & Dependencies
- Dépendance stricte à la stack existante (Jekyll).
- Interdiction de frameworks JS côté client.
- Dépendance à la CI pour la validation des données.

### Cross-Cutting Concerns Identified
- Performance (Lazy loading, Critical CSS).
- Design System Consistency (Tokens SCSS centralisés).
- Data Integrity (Validation automatisée du contenu).

## Starter Template Evaluation

### Primary Technology Domain
Static Web (Jekyll) - Refonte d'interface premium sans framework client.

### Starter Options Considered

1. **Clean Jekyll Slate:** Repartir de zéro avec un thème Jekyll minimaliste.
   - *Verdict:* Rejeté. Le site existant possède déjà du contenu et une structure qu'il faut faire évoluer, pas remplacer.
2. **Nexus Custom Foundation (Selected):** Création d'une couche architecturale "Nexus" au-dessus du Jekyll existant.
   - *Rationale:* Permet de respecter la contrainte "No Framework" tout en introduisant une modularité SCSS moderne et une gestion rigoureuse des assets via le pipeline.

### Selected Approach: Nexus Custom Foundation

**Rationale for Selection:**
Cette approche permet une transition fluide de l'ancien design vers le système Nexus. Elle garantit le respect des NFR de performance (Lighthouse > 90) en évitant les surcharges inutiles et en se concentrant sur le CSS critique et le Vanilla JS optimisé.

**Initialization / Base Structure:**
L'architecture sera initialisée par la création de la structure SCSS modulaire suivante :
- `_sass/nexus/_tokens.scss` (Variables & Thèmes)
- `_sass/nexus/_glass.scss` (Mixins Glassmorphism)
- `_sass/nexus/_layout.scss` (Grilles Bento & Hero)

**Architectural Decisions Provided by Foundation:**

**Language & Runtime:**
Jekyll (Liquid) pour le templating, Vanilla JS (ES6+) pour les interactions.

**Styling Solution:**
SCSS avec une architecture Atomic/Modularisée sous `_sass/nexus/`. Utilisation de variables CSS pour le switching de thèmes dynamiques si besoin.

**Build Tooling:**
Pipeline Jekyll standard enrichi par des scripts de validation de données (XML/Markdown) en pré-commit/déploiement.

**Code Organization:**
Séparation stricte des styles "Legacy" et "Nexus" pour permettre une migration progressive des pages.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- UI State Management Strategy
- Asset Loading & Optimization
- CI/CD Validation Pipeline
- Deployment Infrastructure

**Important Decisions (Shape Architecture):**
- Performance monitoring approach
- Browser compatibility strategy

**Deferred Decisions (Post-MVP):**
- Advanced analytics integration
- A/B testing framework
- Internationalization (i18n)

### Frontend Architecture (Nexus Specific)

**UI State Management:**
- **Decision:** State-based CSS Classes with Vanilla JS coordination
- **Approach:** Use `.is-active`, `.is-filtered`, `.is-loading` classes with CSS transitions
- **Rationale:** Lightweight, performant, meets NFR-03 (< 50ms response time)
- **Implementation:** Small JS module (`nexus-state.js`) to manage class toggling for filters and interactions
- **Affects:** FR-04 (Blog filters), FR-05 (Parallax effects), all interactive components

**Component Architecture:**
- **Decision:** Modular SCSS with BEM-like naming under `_sass/nexus/`
- **Structure:**
  - `_tokens.scss` - Design tokens (colors, spacing, typography)
  - `_glass.scss` - Glassmorphism mixins and utilities
  - `_layout.scss` - Bento grid and Hero layouts
  - `_cards-nexus.scss` - Blog card components
  - `_animations.scss` - Micro-interactions and transitions
- **Rationale:** Separation of concerns, progressive migration from legacy styles
- **Affects:** All visual components (FR-01, FR-02)

### Asset Optimization & Performance

**Image Loading Strategy:**
- **Decision:** Native lazy loading for blog images + preload for Hero
- **Implementation:**
  - Blog Bento Grid: `<img loading="lazy">` on all article images
  - Hero Section: `<link rel="preload" as="image" href="hero-main.webp">`
  - Format: WebP with AVIF fallback where supported
- **Rationale:** Meets NFR-01 (Lighthouse > 90) and NFR-02 (< 1.5MB total weight)
- **Affects:** FR-05 (Hero), FR-06 (Blog Bento)

**Critical CSS Strategy:**
- **Decision:** Inline critical Nexus styles for above-the-fold content
- **Approach:** Extract Hero and navigation styles into `<style>` tag in `<head>`
- **Rationale:** Eliminate render-blocking CSS for First Contentful Paint
- **Affects:** NFR-01 (Performance), all page loads

**JavaScript Optimization:**
- **Decision:** Defer non-critical JS, async for analytics
- **Bundle Strategy:** Single `nexus.js` bundle (< 20KB gzipped) for all interactions
- **Rationale:** Minimize main thread blocking, meet NFR-03
- **Affects:** FR-03 (Navigation), FR-04 (Filters), FR-05 (Parallax)

### CI/CD & Validation Pipeline

**Content Validation:**
- **Decision:** GitHub Actions + Pre-commit hooks
- **Tools:**
  - `yamllint` for frontmatter validation
  - `xmllint` for RSS/sitemap validation
  - Custom Ruby script for Jekyll-specific checks
- **Gates:**
  - Pre-commit: Local validation with immediate feedback
  - CI: Blocking validation before merge to main
- **Rationale:** FR-07 requirement, prevents broken deployments
- **Affects:** All content creation workflows

**Build Pipeline:**
- **Decision:** GitHub Actions workflow with Jekyll build + validation
- **Steps:**
  1. Checkout code
  2. Run frontmatter validation
  3. Run XML validation
  4. Build Jekyll site
  5. Run Lighthouse CI (enforce > 90 score)
  6. Deploy to Netlify
- **Rationale:** Automated quality gates, enforces NFR-01
- **Affects:** All deployments

### Infrastructure & Deployment

**Hosting Platform:**
- **Decision:** Netlify
- **Configuration:**
  - Build command: `jekyll build`
  - Publish directory: `_site`
  - Branch deploys: Enabled for preview
  - CDN: Global edge network
- **Rationale:** 
  - Excellent CDN for Core Web Vitals
  - Branch previews for design validation
  - Built-in SSL and asset optimization
  - Better performance than GitHub Pages for Lighthouse > 90 target
- **Affects:** NFR-01 (Performance), deployment workflow

**Environment Configuration:**
- **Decision:** Environment-based Jekyll configs
- **Environments:**
  - Development: `_config.yml` + `_config_dev.yml`
  - Production: `_config.yml` only
- **Rationale:** Separate analytics, CDN URLs, and debug settings
- **Affects:** Build process, local development

### Decision Impact Analysis

**Implementation Sequence:**
1. **Foundation Setup** (Blocks all other work):
   - Create Nexus SCSS structure (`_tokens.scss`, `_glass.scss`, etc.)
   - Set up GitHub Actions validation pipeline
   - Configure Netlify deployment
2. **Core Components** (Depends on Foundation):
   - Implement state management module (`nexus-state.js`)
   - Build Hero section with parallax
   - Create Bento grid layout
3. **Optimization** (Depends on Core Components):
   - Extract and inline critical CSS
   - Implement lazy loading for images
   - Run Lighthouse audits and optimize

**Cross-Component Dependencies:**
- **Nexus Tokens** → All visual components depend on design tokens
- **State Management** → Filters and parallax both use the same state system
- **CI/CD Pipeline** → Blocks all content updates if validation fails
- **Asset Optimization** → Required to meet NFR-01 and NFR-02

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
5 major areas where AI agents could make different implementation choices without clear patterns.

### Naming Patterns

**SCSS Naming Conventions:**
- **Variables:** `$nexus-{category}-{property}` format
  - Examples: `$nexus-color-gold`, `$nexus-spacing-lg`, `$nexus-blur-heavy`
- **Mixins:** `nexus-{action}` format
  - Examples: `@mixin nexus-glass`, `@mixin nexus-bento-grid`
- **CSS Classes:** BEM-like with `nexus-` prefix
  - Block: `.nexus-hero`, `.nexus-card`
  - Element: `.nexus-hero__title`, `.nexus-card__image`
  - Modifier: `.nexus-card--featured`, `.nexus-hero--dark`
- **Files:** Partials with underscore prefix
  - Examples: `_tokens.scss`, `_glass.scss`, `_layout.scss`

**JavaScript Naming Conventions:**
- **Modules:** camelCase for file names
  - Examples: `nexusState.js`, `parallaxHandler.js`, `blogFilters.js`
- **Functions:** camelCase
  - Examples: `toggleFilter()`, `initParallax()`, `updateState()`
- **Custom Events:** Namespaced with `nexus:`
  - Examples: `nexus:filterChange`, `nexus:parallaxUpdate`, `nexus:stateChange`
- **Data Attributes:** `data-nexus-{property}` format
  - Examples: `data-nexus-state`, `data-nexus-filter`, `data-nexus-category`

**Asset Naming:**
- **Images:** `{type}-{name}.{ext}` format
  - Examples: `hero-main.webp`, `icon-menu.svg`, `bg-pattern.png`
- **Fonts:** `{family}-{weight}.{ext}` format
  - Examples: `poppins-bold.woff2`, `inter-regular.woff2`

### Structure Patterns

**SCSS Organization:**
```
_sass/
├── nexus/
│   ├── _tokens.scss       # Design tokens (colors, spacing, typography)
│   ├── _mixins.scss       # Utility mixins (responsive, accessibility)
│   ├── _glass.scss        # Glassmorphism components and effects
│   ├── _layout.scss       # Grid systems, Bento layout, Hero layout
│   ├── _hero-nexus.scss   # Hero section specific styles
│   ├── _cards-nexus.scss  # Card components (blog, portfolio)
│   └── _animations.scss   # Transitions, micro-interactions, parallax
└── main.scss              # Import orchestrator (DO NOT add styles here)
```

**JavaScript Organization:**
```
assets/js/
├── nexus/
│   ├── state.js           # State management module
│   ├── filters.js         # Blog filter functionality
│   └── parallax.js        # Parallax effect handlers
└── nexus.js               # Main bundle entry point
```

**Jekyll Structure:**
```
_layouts/
├── default.html           # Base layout with Nexus foundation
├── post.html              # Blog post layout
└── page.html              # Static page layout

_includes/
├── nexus/
│   ├── hero.html          # Hero section component
│   ├── nav.html           # Navigation component
│   └── footer.html        # Footer component
```

### Format Patterns

**CSS Custom Properties:**
- **Format:** `--nexus-{category}-{property}`
- **Scope:** Define in `:root` for global tokens, in component class for local overrides
- **Examples:**
  ```css
  :root {
    --nexus-color-gold: #D4AF37;
    --nexus-color-slate: #1E293B;
    --nexus-blur-heavy: 20px;
    --nexus-blur-light: 8px;
  }
  ```

**Responsive Breakpoints:**
```scss
$nexus-breakpoints: (
  'mobile': 320px,
  'tablet': 768px,
  'desktop': 1024px,
  'wide': 1440px
);

// Usage with mixin
@include nexus-responsive('tablet') {
  // Tablet styles
}
```

**Z-Index Scale:**
```scss
$nexus-z-index: (
  'base': 1,
  'dropdown': 50,
  'nav': 100,
  'modal': 1000,
  'toast': 2000
);

// Usage
.nexus-nav {
  z-index: map-get($nexus-z-index, 'nav');
}
```

**Spacing Scale:**
```scss
$nexus-spacing: (
  'xs': 0.25rem,  // 4px
  'sm': 0.5rem,   // 8px
  'md': 1rem,     // 16px
  'lg': 1.5rem,   // 24px
  'xl': 2rem,     // 32px
  '2xl': 3rem     // 48px
);
```

### Communication Patterns

**Custom Events:**
- **Naming Convention:** `nexus:{action}` format
- **Payload Structure:** Standard CustomEvent with `detail` object
- **Examples:**
  ```javascript
  // Dispatching
  document.dispatchEvent(new CustomEvent('nexus:filterChange', {
    detail: { category: 'ai', active: true }
  }));
  
  // Listening
  document.addEventListener('nexus:filterChange', (e) => {
    console.log('[Nexus] Filter changed:', e.detail);
  });
  ```

**State Classes:**
- **Loading:** `.is-loading` - Applied during async operations
- **Active:** `.is-active` - Applied to active/selected elements
- **Filtered:** `.is-filtered` - Applied to filtered content
- **Hidden:** `.is-hidden` - Applied to hidden elements
- **Visible:** `.is-visible` - Applied when element becomes visible

**Data Attributes for State:**
```html
<!-- Filter state -->
<button data-nexus-filter="ai" data-nexus-state="active">AI</button>

<!-- Parallax elements -->
<div data-nexus-parallax="0.5" data-nexus-direction="vertical"></div>

<!-- Loading state -->
<div data-nexus-loading="true" class="is-loading"></div>
```

### Process Patterns

**Error Handling:**
- **Console Messages:** Always prefix with `[Nexus]`
  ```javascript
  console.error('[Nexus] Failed to load image:', error);
  console.warn('[Nexus] Parallax disabled on mobile');
  console.log('[Nexus] Filters initialized');
  ```
- **Graceful Degradation:** Always provide fallback for JS-dependent features
  - Filters work with page reload if JS fails
  - Parallax degrades to static images
  - Navigation remains functional without JS

**Loading States:**
- **Minimum Display Time:** 300ms to avoid flicker
- **Transition Duration:** 200ms for smooth state changes
- **Implementation:**
  ```javascript
  element.classList.add('is-loading');
  await loadContent();
  setTimeout(() => {
    element.classList.remove('is-loading');
  }, 300);
  ```

**Animation Timing:**
- **Micro-interactions:** 150-200ms (hover, click feedback)
- **State transitions:** 200-300ms (filter changes, tab switches)
- **Page transitions:** 300-500ms (route changes, modal open/close)
- **Parallax:** 50ms max response time (NFR-03 requirement)

### Enforcement Guidelines

**All AI Agents MUST:**
- Follow BEM-like naming with `nexus-` prefix for all new CSS classes
- Use the defined SCSS structure under `_sass/nexus/` - never add styles to `main.scss`
- Namespace all custom events with `nexus:` prefix
- Use state classes (`.is-*`) for UI state management, never inline styles
- Prefix all console messages with `[Nexus]` for easy debugging
- Follow the z-index scale - never use arbitrary z-index values
- Use the spacing scale variables - never use hardcoded pixel values for spacing
- Implement graceful degradation for all JS-dependent features

**Pattern Verification:**
- Pre-commit hooks check for:
  - Class naming violations (non-prefixed classes in nexus files)
  - Hardcoded spacing values (should use variables)
  - Arbitrary z-index values (should use scale)
- SCSS linter enforces:
  - Variable naming conventions
  - No styles in `main.scss` (import only)
  - Proper use of mixins
- Code review checklist includes:
  - Pattern compliance verification
  - Graceful degradation testing
  - Console message prefixing

### Pattern Examples

**Good Examples:**

```scss
// ✅ Correct: Using tokens and BEM naming
.nexus-card {
  padding: map-get($nexus-spacing, 'lg');
  background: var(--nexus-color-slate);
  z-index: map-get($nexus-z-index, 'base');
  
  &__title {
    color: var(--nexus-color-gold);
  }
  
  &--featured {
    @include nexus-glass;
  }
}
```

```javascript
// ✅ Correct: Using state classes and custom events
function toggleFilter(category) {
  const button = document.querySelector(`[data-nexus-filter="${category}"]`);
  button.classList.toggle('is-active');
  
  document.dispatchEvent(new CustomEvent('nexus:filterChange', {
    detail: { category, active: button.classList.contains('is-active') }
  }));
}
```

**Anti-Patterns:**

```scss
// ❌ Wrong: Hardcoded values and no prefix
.card {
  padding: 24px;  // Should use $nexus-spacing
  z-index: 999;   // Should use $nexus-z-index scale
}
```

```javascript
// ❌ Wrong: Inline styles and no event namespace
function toggleFilter(category) {
  element.style.display = 'none';  // Should use .is-hidden class
  document.dispatchEvent(new Event('filterChange'));  // Should be 'nexus:filterChange'
}
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
ndabene.github.io/
├── Configuration Files (Root)
│   ├── _config.yml                    # Jekyll main configuration
│   ├── _config_dev.yml                # Development overrides
│   ├── _config_github.yml             # GitHub Pages specific config
│   ├── Gemfile                        # Ruby dependencies
│   ├── package.json                   # Node.js dependencies (build tools)
│   ├── netlify.toml                   # Netlify deployment configuration
│   └── .gitignore                     # Git ignore patterns
│
├── Jekyll Core Directories
│   ├── _layouts/                      # Page templates
│   │   ├── default.html               # Base layout with Nexus foundation
│   │   ├── post.html                  # Blog post layout
│   │   ├── page.html                  # Static page layout
│   │   └── home.html                  # Homepage layout
│   │
│   ├── _includes/                     # Reusable components
│   │   ├── nexus/                     # Nexus-specific components
│   │   │   ├── hero.html              # Hero section component
│   │   │   ├── nav.html               # Navigation component
│   │   │   ├── footer.html            # Footer component
│   │   │   └── card-bento.html        # Bento card component
│   │   ├── head.html                  # HTML head with critical CSS
│   │   ├── header.html                # Site header
│   │   └── footer.html                # Site footer
│   │
│   ├── _data/                         # Data files (YAML/JSON)
│   │   ├── navigation.yml             # Navigation structure
│   │   ├── social.yml                 # Social media links
│   │   └── tag_mapping.yaml           # Tag translations/mappings
│   │
│   ├── _posts/                        # French blog posts
│   │   └── YYYY-MM-DD-title.md        # Post files
│   │
│   ├── _posts_en/                     # English blog posts
│   │   └── YYYY-MM-DD-title.md        # Post files
│   │
│   ├── _case_studies/                 # Case study collection
│   │   └── *.md                       # Case study files
│   │
│   └── _plugins/                      # Jekyll plugins
│       └── *.rb                       # Custom Ruby plugins
│
├── Nexus Design System (SCSS)
│   └── _sass/
│       ├── nexus/                     # Nexus modular architecture
│       │   ├── _tokens.scss           # Design tokens (colors, spacing, typography)
│       │   ├── _mixins.scss           # Utility mixins (TO BE CREATED)
│       │   ├── _glass.scss            # Glassmorphism components
│       │   ├── _layout.scss           # Grid & layout systems (TO BE CREATED)
│       │   ├── _hero-nexus.scss       # Hero section styles
│       │   ├── _cards-nexus.scss      # Card components (Bento)
│       │   └── _animations.scss       # Transitions & micro-interactions
│       │
│       ├── Legacy Styles (Existing)
│       │   ├── variables.scss         # Legacy variables (to be migrated)
│       │   ├── base.scss              # Base styles
│       │   ├── layout.scss            # Legacy layout
│       │   ├── components.scss        # Legacy components
│       │   ├── blog-modern.scss       # Blog styles (to be Nexus-ified)
│       │   ├── navigation.scss        # Navigation styles
│       │   └── utilities.scss         # Utility classes
│       │
│       └── main.scss                  # Import orchestrator (DO NOT add styles)
│
├── JavaScript Architecture
│   └── assets/js/
│       ├── nexus/                     # Nexus modules (TO BE CREATED)
│       │   ├── state.js               # State management module
│       │   ├── filters.js             # Blog filter functionality
│       │   └── parallax.js            # Parallax effect handlers
│       │
│       ├── nexus.js                   # Main Nexus bundle (TO BE CREATED)
│       │
│       └── Legacy Scripts (Existing)
│           ├── blog-filters.js        # Current filter implementation
│           ├── blog-pagination.js     # Pagination logic
│           ├── navigation.js          # Navigation interactions
│           └── modern-animations.js   # Animation handlers
│
├── Assets & Media
│   └── assets/
│       ├── images/
│       │   ├── nexus/                 # Nexus-specific images (TO BE CREATED)
│       │   │   ├── hero-main.webp     # Hero section main image
│       │   │   ├── hero-ai.webp       # AI expertise visual
│       │   │   └── bg-pattern.svg     # Background patterns
│       │   └── blog/                  # Blog post images
│       │
│       ├── fonts/                     # Web fonts
│       │   ├── poppins-bold.woff2     # Poppins Bold for headings
│       │   └── inter-regular.woff2    # Inter for body text
│       │
│       └── css/                       # Compiled CSS output
│           └── main.css               # Jekyll-compiled stylesheet
│
├── Content Pages
│   ├── index.md                       # Homepage (French)
│   ├── en/
│   │   ├── index.md                   # Homepage (English)
│   │   └── blog.html                  # English blog index
│   ├── pages/                         # Static pages
│   │   ├── about.md
│   │   ├── contact.md
│   │   └── expertise.md
│   └── blog/                          # Blog index pages
│       └── index.html                 # French blog index
│
├── CI/CD & Validation
│   ├── .github/
│   │   └── workflows/
│   │       ├── ci.yml                 # Main CI pipeline (TO BE CREATED)
│   │       └── lighthouse.yml         # Lighthouse CI (TO BE CREATED)
│   │
│   ├── scripts/                       # Build & validation scripts
│   │   ├── validate-frontmatter.rb    # Frontmatter validation (TO BE CREATED)
│   │   └── validate-xml.sh            # XML validation (TO BE CREATED)
│   │
│   └── .pre-commit-config.yaml        # Pre-commit hooks (TO BE CREATED)
│
├── Documentation & Planning
│   ├── docs/                          # Project documentation
│   │   ├── prd-design-rework.md       # Product Requirements
│   │   └── architecture-nexus.md      # Legacy architecture notes
│   │
│   └── _bmad-output/                  # BMAD workflow outputs
│       └── planning-artifacts/
│           ├── architecture.md        # This document
│           ├── ux-design-specification.md
│           └── product-brief-*.md
│
└── Build Output
    └── _site/                         # Jekyll build output (gitignored)
        └── [compiled site]
```

### Architectural Boundaries

**Component Boundaries:**

1. **Nexus Design System** (`_sass/nexus/`)
   - **Responsibility:** All new visual components and design tokens
   - **Communication:** Imported via `main.scss`, consumed by layouts/includes
   - **Isolation:** No dependencies on legacy styles, can coexist independently

2. **Legacy Styles** (`_sass/*.scss`)
   - **Responsibility:** Existing page styles, gradually migrated to Nexus
   - **Communication:** Imported via `main.scss`, parallel to Nexus
   - **Migration Path:** Progressive replacement, not immediate deletion

3. **JavaScript Modules** (`assets/js/nexus/`)
   - **Responsibility:** State management, filters, parallax
   - **Communication:** Custom events (`nexus:*`), data attributes
   - **Isolation:** No direct DOM manipulation of legacy components

4. **Jekyll Templates** (`_layouts/`, `_includes/`)
   - **Responsibility:** HTML structure and Liquid templating
   - **Communication:** Consumes Nexus CSS classes and data attributes
   - **Boundary:** Presentation layer only, no business logic

**Data Boundaries:**

1. **Content Layer** (`_posts/`, `_case_studies/`, `_data/`)
   - **Format:** Markdown with YAML frontmatter
   - **Validation:** Pre-commit hooks + CI validation
   - **Access:** Read-only at build time via Jekyll

2. **Configuration Layer** (`_config*.yml`, `_data/*.yml`)
   - **Format:** YAML configuration files
   - **Validation:** YAML linting in CI
   - **Scope:** Build-time configuration only

3. **Asset Layer** (`assets/images/`, `assets/fonts/`)
   - **Format:** WebP/AVIF for images, WOFF2 for fonts
   - **Optimization:** Pre-optimized before commit
   - **Access:** Static file serving via CDN

**Integration Boundaries:**

1. **Build Pipeline** (Jekyll → Netlify)
   - **Input:** Source files (Markdown, SCSS, JS)
   - **Process:** Jekyll build + validation + Lighthouse CI
   - **Output:** Static site in `_site/`
   - **Deployment:** Netlify CDN

2. **Client-Side Interactions** (Browser)
   - **Entry Point:** `nexus.js` bundle
   - **State Management:** DOM-based with CSS classes
   - **Events:** Custom events for component communication

### Requirements to Structure Mapping

**FR-01 & FR-02: Glassmorphism & Visual Identity**
- **SCSS:** `_sass/nexus/_glass.scss`, `_sass/nexus/_tokens.scss`
- **Components:** `_includes/nexus/hero.html`, `_includes/nexus/card-bento.html`
- **Assets:** `assets/images/nexus/bg-pattern.svg`

**FR-03: Sticky Navigation**
- **SCSS:** `_sass/nexus/_layout.scss` (nav section)
- **Component:** `_includes/nexus/nav.html`
- **JS:** `assets/js/nexus/state.js` (scroll handling)

**FR-04: Blog Filters**
- **SCSS:** `_sass/nexus/_cards-nexus.scss`
- **Component:** `_includes/nexus/card-bento.html`
- **JS:** `assets/js/nexus/filters.js`
- **Data:** `_data/tag_mapping.yaml`

**FR-05: Hero Parallax**
- **SCSS:** `_sass/nexus/_hero-nexus.scss`
- **Component:** `_includes/nexus/hero.html`
- **JS:** `assets/js/nexus/parallax.js`
- **Assets:** `assets/images/nexus/hero-*.webp`

**FR-06: Bento Grid Layout**
- **SCSS:** `_sass/nexus/_layout.scss` (grid system)
- **Component:** `_includes/nexus/card-bento.html`
- **Layout:** `_layouts/blog.html` (blog index)

**FR-07: CI/CD Validation**
- **Scripts:** `scripts/validate-frontmatter.rb`, `scripts/validate-xml.sh`
- **CI:** `.github/workflows/ci.yml`
- **Hooks:** `.pre-commit-config.yaml`

**NFR-01 & NFR-02: Performance & Assets**
- **Critical CSS:** Inlined in `_includes/head.html`
- **Image Optimization:** `assets/images/nexus/*.webp` (pre-optimized)
- **JS Bundle:** `assets/js/nexus.js` (< 20KB gzipped)
- **Lighthouse CI:** `.github/workflows/lighthouse.yml`

### Integration Points

**Internal Communication:**

1. **SCSS → HTML:**
   - Nexus classes applied in Jekyll templates
   - BEM naming ensures no conflicts with legacy styles
   - Example: `<div class="nexus-hero">` in `_includes/nexus/hero.html`

2. **JS → DOM:**
   - State classes (`.is-active`, `.is-loading`) applied via JS
   - Data attributes (`data-nexus-filter`) for configuration
   - Custom events (`nexus:filterChange`) for component communication

3. **Jekyll → Static Output:**
   - Liquid templating processes Markdown + YAML
   - SCSS compiled to CSS via Jekyll
   - Assets copied to `_site/` for deployment

**External Integrations:**

1. **Netlify CDN:**
   - Build command: `jekyll build`
   - Publish directory: `_site/`
   - Headers: `_headers` file for cache control

2. **GitHub Actions:**
   - Trigger: Push to `main` or PR
   - Steps: Validate → Build → Lighthouse → Deploy
   - Artifacts: Lighthouse reports, build logs

**Data Flow:**

```
Content Creation (Markdown) 
  → Frontmatter Validation (Pre-commit)
  → Git Push
  → CI Validation (GitHub Actions)
    → YAML Lint
    → XML Lint
    → Jekyll Build
    → Lighthouse CI
  → Netlify Deployment
  → CDN Distribution
  → Browser (User)
    → Nexus JS Initialization
    → State Management
    → User Interactions
```

### File Organization Patterns

**Configuration Files:**
- **Root Level:** All config files at project root for easy discovery
- **Environment-Specific:** `_config_dev.yml` overrides for local development
- **Build Tools:** `netlify.toml` for deployment, `package.json` for Node tools

**Source Organization:**
- **By Feature:** Nexus components grouped under `_sass/nexus/` and `assets/js/nexus/`
- **By Type:** Jekyll conventions (`_layouts/`, `_includes/`, `_posts/`)
- **Coexistence:** Legacy and Nexus styles in parallel for gradual migration

**Test Organization:**
- **Validation Scripts:** `scripts/` directory for build-time validation
- **CI Tests:** `.github/workflows/` for automated testing
- **Manual Testing:** Netlify branch deploys for visual QA

**Asset Organization:**
- **By System:** `assets/images/nexus/` for Nexus-specific assets
- **By Type:** `assets/fonts/`, `assets/css/`, `assets/js/`
- **Optimization:** Pre-optimized before commit (WebP, WOFF2)

### Development Workflow Integration

**Development Server Structure:**
```bash
# Local development
bundle exec jekyll serve --config _config.yml,_config_dev.yml

# Watches:
# - _sass/ → Recompile CSS
# - assets/js/ → Copy to _site/
# - _posts/, _layouts/, _includes/ → Rebuild pages
```

**Build Process Structure:**
```bash
# Production build
jekyll build

# Steps:
# 1. Process Liquid templates
# 2. Compile SCSS to CSS
# 3. Copy assets to _site/
# 4. Generate sitemap.xml, feed.xml
# 5. Optimize HTML output
```

**Deployment Structure:**
```bash
# Netlify deployment
# Triggered by: Git push to main

# Build command: jekyll build
# Publish directory: _site/
# Environment: Production (_config.yml only)
# Post-processing: Asset optimization, headers injection
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All architectural decisions are fully compatible and work together cohesively:
- **Nexus Custom Foundation** aligns perfectly with Jekyll's static site generation model
- **State-based CSS Classes** + **Vanilla JS** respect the "No Framework" constraint (NFR-06)
- **Lazy loading + preload strategy** is compatible with Jekyll's asset pipeline
- **GitHub Actions + Netlify** deployment chain is well-established and proven
- **SCSS modular architecture** integrates seamlessly with Jekyll's Sass compilation

**Pattern Consistency:**
Implementation patterns fully support all architectural decisions:
- **BEM-like naming with `nexus-` prefix** prevents conflicts with legacy styles
- **Modular SCSS structure** (`_sass/nexus/`) enables progressive migration
- **Custom event namespacing** (`nexus:*`) ensures no conflicts with existing JS
- **State classes** (`.is-*`) provide consistent UI state management across all components
- **Z-index and spacing scales** prevent arbitrary values and ensure visual consistency

**Structure Alignment:**
Project structure perfectly supports the architecture:
- **Nexus directory isolation** allows coexistence with legacy code
- **Component boundaries** are clearly defined (Nexus vs Legacy)
- **Jekyll conventions** are respected while adding Nexus enhancements
- **CI/CD integration points** are properly structured in `.github/workflows/`
- **Asset organization** (`assets/images/nexus/`) supports the design system

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**

- **FR-01 (Glassmorphism):** ✅ Covered by `_sass/nexus/_glass.scss` + `_includes/nexus/hero.html`
- **FR-02 (Visual Identity):** ✅ Covered by `_sass/nexus/_tokens.scss` (Deep Slate & Gold palette)
- **FR-03 (Sticky Navigation):** ✅ Covered by `_sass/nexus/_layout.scss` + `assets/js/nexus/state.js`
- **FR-04 (Blog Filters):** ✅ Covered by `assets/js/nexus/filters.js` + state management
- **FR-05 (Hero Parallax):** ✅ Covered by `_sass/nexus/_hero-nexus.scss` + `assets/js/nexus/parallax.js`
- **FR-06 (Bento Grid):** ✅ Covered by `_sass/nexus/_layout.scss` + `_includes/nexus/card-bento.html`
- **FR-07 (CI/CD Validation):** ✅ Covered by GitHub Actions + pre-commit hooks

**Non-Functional Requirements Coverage:**

- **NFR-01 (Lighthouse > 90):** ✅ Addressed by critical CSS inlining, lazy loading, and Lighthouse CI
- **NFR-02 (Assets < 1.5MB):** ✅ Addressed by WebP/AVIF optimization and preload strategy
- **NFR-03 (Interactions < 50ms):** ✅ Addressed by state-based CSS (no JS overhead) and animation timing standards
- **NFR-04 (WCAG AA Contrast):** ✅ Addressed by design tokens with accessible color ratios
- **NFR-06 (Jekyll + Vanilla only):** ✅ Enforced by architecture (no framework dependencies)
- **NFR-07 (XML/Frontmatter Validation):** ✅ Addressed by CI pipeline with yamllint and xmllint

**Cross-Cutting Concerns:**
- **Performance:** Critical CSS, lazy loading, bundle optimization (< 20KB)
- **Design System Consistency:** Centralized tokens, BEM naming, spacing/z-index scales
- **Data Integrity:** Pre-commit + CI validation gates
- **Progressive Migration:** Nexus/Legacy coexistence strategy

### Implementation Readiness Validation ✅

**Decision Completeness:**
- ✅ All critical decisions documented (UI state, assets, CI/CD, deployment)
- ✅ Technology stack fully specified (Jekyll, SCSS, Vanilla JS, Netlify)
- ✅ Integration patterns defined (custom events, data attributes, state classes)
- ✅ Performance targets quantified (Lighthouse > 90, < 1.5MB, < 50ms)

**Structure Completeness:**
- ✅ Complete directory tree with all files and directories
- ✅ Component boundaries clearly defined (Nexus vs Legacy)
- ✅ Integration points mapped (SCSS → HTML, JS → DOM, Jekyll → Static)
- ✅ Requirements-to-structure mapping complete for all FRs/NFRs

**Pattern Completeness:**
- ✅ Naming conventions comprehensive (SCSS, JS, assets)
- ✅ Communication patterns fully specified (custom events, data attributes)
- ✅ Process patterns complete (error handling, loading states, animation timing)
- ✅ Examples and anti-patterns provided for clarity

### Gap Analysis Results

**Critical Gaps:** None identified. All blocking decisions are documented.

**Important Gaps (To Be Created During Implementation):**
1. **Missing SCSS Files:**
   - `_sass/nexus/_mixins.scss` - Utility mixins (responsive, accessibility)
   - `_sass/nexus/_layout.scss` - Grid systems and Bento layout

2. **Missing JavaScript Modules:**
   - `assets/js/nexus/state.js` - State management module
   - `assets/js/nexus/filters.js` - Blog filter functionality
   - `assets/js/nexus/parallax.js` - Parallax effect handlers
   - `assets/js/nexus.js` - Main bundle entry point

3. **Missing CI/CD Configuration:**
   - `.github/workflows/ci.yml` - Main CI pipeline
   - `.github/workflows/lighthouse.yml` - Lighthouse CI
   - `scripts/validate-frontmatter.rb` - Frontmatter validation
   - `scripts/validate-xml.sh` - XML validation
   - `.pre-commit-config.yaml` - Pre-commit hooks

4. **Missing Nexus Components:**
   - `_includes/nexus/hero.html` - Hero section component
   - `_includes/nexus/nav.html` - Navigation component
   - `_includes/nexus/footer.html` - Footer component
   - `_includes/nexus/card-bento.html` - Bento card component

5. **Missing Assets:**
   - `assets/images/nexus/hero-main.webp` - Hero main image
   - `assets/images/nexus/hero-ai.webp` - AI expertise visual
   - `assets/images/nexus/bg-pattern.svg` - Background patterns

**Nice-to-Have Gaps (Post-MVP):**
- Advanced analytics integration
- A/B testing framework
- Internationalization (i18n) beyond current FR/EN
- Performance monitoring dashboard

### Validation Issues Addressed

**No Critical Issues Found.**

The architecture is coherent, complete, and ready for implementation. All decisions are compatible, all requirements are covered, and all patterns are well-defined.

**Minor Recommendations:**
1. **Documentation:** Consider creating a quick-start guide for developers unfamiliar with Jekyll
2. **Tooling:** Consider adding SCSS linting configuration for automated pattern enforcement
3. **Testing:** Consider adding visual regression testing for Nexus components (e.g., Percy, Chromatic)

These are optional enhancements that can be added during or after initial implementation.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Medium complexity, high visual requirements)
- [x] Technical constraints identified (Jekyll, Vanilla JS, No frameworks)
- [x] Cross-cutting concerns mapped (Performance, Design System, Data Integrity)

**✅ Architectural Decisions**
- [x] Critical decisions documented (UI state, assets, CI/CD, deployment)
- [x] Technology stack fully specified (Jekyll, SCSS, Vanilla JS, Netlify)
- [x] Integration patterns defined (Custom events, data attributes, state classes)
- [x] Performance considerations addressed (Critical CSS, lazy loading, bundle optimization)

**✅ Implementation Patterns**
- [x] Naming conventions established (BEM-like with `nexus-` prefix)
- [x] Structure patterns defined (Modular SCSS, Nexus/Legacy coexistence)
- [x] Communication patterns specified (Custom events, state classes)
- [x] Process patterns documented (Error handling, loading states, animation timing)

**✅ Project Structure**
- [x] Complete directory structure defined (846 lines of comprehensive documentation)
- [x] Component boundaries established (Nexus vs Legacy, clear isolation)
- [x] Integration points mapped (SCSS → HTML, JS → DOM, Jekyll → Static, CI/CD)
- [x] Requirements to structure mapping complete (All FRs/NFRs mapped to specific files)

### Architecture Readiness Assessment

**Overall Status:** ✅ **READY FOR IMPLEMENTATION**

**Confidence Level:** **HIGH**

The architecture is comprehensive, coherent, and implementation-ready. All requirements are covered, all decisions are compatible, and all patterns are well-defined with examples.

**Key Strengths:**
1. **Progressive Migration Strategy:** Nexus/Legacy coexistence allows gradual refonte without breaking existing functionality
2. **Performance-First Design:** Critical CSS, lazy loading, and bundle optimization baked into architecture
3. **Clear Boundaries:** Component isolation prevents conflicts and enables parallel development
4. **Comprehensive Patterns:** Naming, structure, and communication patterns prevent AI agent conflicts
5. **Validation Gates:** CI/CD pipeline ensures quality and prevents broken deployments
6. **Scalable Foundation:** Modular SCSS and JS architecture supports future enhancements

**Areas for Future Enhancement:**
1. **Advanced Analytics:** Post-MVP integration of detailed user behavior tracking
2. **A/B Testing:** Framework for testing design variations
3. **Visual Regression Testing:** Automated screenshot comparison for Nexus components
4. **Performance Monitoring:** Real-time Core Web Vitals tracking dashboard
5. **Internationalization:** Expand beyond FR/EN to additional languages

### Implementation Handoff

**AI Agent Guidelines:**
1. **Follow Patterns Strictly:** Use BEM-like naming with `nexus-` prefix, namespace events with `nexus:`, use state classes (`.is-*`)
2. **Respect Boundaries:** Never add styles to `main.scss`, keep Nexus and Legacy code isolated
3. **Validate Early:** Run pre-commit hooks locally, check Lighthouse scores frequently
4. **Reference Architecture:** This document is the single source of truth for all architectural questions
5. **Progressive Implementation:** Build Nexus components incrementally, test thoroughly before replacing legacy

**First Implementation Priority:**

```bash
# Step 1: Create missing Nexus SCSS foundation files
# - _sass/nexus/_mixins.scss
# - _sass/nexus/_layout.scss

# Step 2: Set up CI/CD validation pipeline
# - .github/workflows/ci.yml
# - scripts/validate-frontmatter.rb
# - scripts/validate-xml.sh

# Step 3: Implement Hero section (highest visual impact)
# - _includes/nexus/hero.html
# - assets/js/nexus/parallax.js
# - assets/images/nexus/hero-*.webp

# Step 4: Implement Bento Grid blog layout
# - _includes/nexus/card-bento.html
# - assets/js/nexus/filters.js

# Step 5: Optimize and validate
# - Extract critical CSS
# - Run Lighthouse CI
# - Deploy to Netlify for QA
```

**Implementation Sequence Rationale:**
- **Foundation first** (SCSS, CI/CD) blocks all other work
- **Hero section** provides immediate visual impact and validates parallax architecture
- **Bento Grid** validates filter architecture and state management
- **Optimization** ensures NFR compliance before production deployment

---

**Architecture Document Complete.** Ready for Epic/Story creation and implementation.

