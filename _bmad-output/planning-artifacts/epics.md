---
stepsCompleted: [1, 2, 3]
inputDocuments:
  - "docs/prd-design-rework.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
  - "_bmad-output/planning-artifacts/product-brief-ndabene.github.io-2026-01-26.md"
---

# ndabene.github.io - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for ndabene.github.io, decomposing the requirements from the PRD, UX Design, Architecture, and Product Brief into implementable stories.

## Requirements Inventory

### Functional Requirements

**FR-01:** Users can perceive depth and hierarchy through an immersive interface using Glassmorphism (background blur, transparency) on all main containers. (Ref: Journey 4.1, 4.2)

**FR-02:** Users can experience a coherent visual identity with the "Deep Slate & Gold" color system applied globally. (Ref: Journey 4.1)

**FR-03:** Users can navigate via a floating (Sticky) menu that remains accessible during scrolling, ensuring readability over content. (Ref: Journey 4.1, 4.2)

**FR-04:** Users can filter blog articles instantly without page reload, receiving immediate visual feedback. (Ref: Journey 4.2)

**FR-05:** Visitors can explore key areas of expertise (Orchestration, AI) presented in a dynamic Hero Section with parallax effects responsive to mouse movement. (Ref: Journey 4.1)

**FR-06:** Users can scan and select articles from a responsive "Bento" grid layout that emphasizes cover images while maintaining clear hierarchy. (Ref: Journey 4.1, 4.2)

**FR-07:** The system can automatically validate data integrity and structure during build, blocking deployment if content validity checks fail. (Ref: System Integrity)

### NonFunctional Requirements

**NFR-01:** The Mobile Lighthouse Score shall remain > 90.

**NFR-02:** Total image weight on the homepage shall not exceed 1.5MB (using WebP/Avif).

**NFR-03:** Visual micro-interactions (parallax, hover) shall respond in < 50ms to input events to ensure fluidity.

**NFR-04:** Glassmorphism effects shall maintain a contrast ratio complying with WCAG AA standards for text readability over blurred backgrounds.

**NFR-05:** The site shall remain fully functional on modern browsers (Chrome, Firefox, Safari, Edge) and degrade gracefully without JS.

**NFR-06:** Technical stack is strictly limited to Jekyll, Vanilla CSS/SCSS, and Vanilla JS (No React/Vue client-side frameworks).

**NFR-07:** XML structure and Frontmatter validity must be enforced by CI pipeline checks before any merge.

### Additional Requirements

#### From Architecture Document:

- **Nexus Custom Foundation:** Creation of a modular SCSS architecture layer on top of existing Jekyll site with tokens, glass effects, and layout systems
- **State-based CSS Classes:** UI state management using `.is-active`, `.is-filtered`, `.is-loading` classes with Vanilla JS coordination
- **Modular SCSS Structure:** BEM-like naming with `nexus-` prefix under `_sass/nexus/` directory
- **Native Lazy Loading:** Blog images use `<img loading="lazy">` with Hero section using preload
- **Critical CSS Strategy:** Inline critical Nexus styles for above-the-fold content in `<head>`
- **JavaScript Bundle Optimization:** Single `nexus.js` bundle < 20KB gzipped for all interactions
- **GitHub Actions Validation:** Pre-commit hooks + CI validation using yamllint, xmllint, and custom Ruby scripts
- **Netlify Deployment:** CDN hosting with branch deploys for preview and global edge network
- **Environment-based Jekyll Configs:** Separate dev and production configurations
- **Design Tokens System:** Centralized SCSS variables for colors, spacing, typography, z-index, and blur levels
- **Custom Event Namespacing:** All JS events use `nexus:` prefix (e.g., `nexus:filterChange`)
- **Responsive Breakpoints:** Mobile (320px), Tablet (768px), Desktop (1024px), Wide (1440px)
- **Animation Timing Standards:** Micro-interactions (150-200ms), state transitions (200-300ms), parallax (< 50ms)
- **Graceful Degradation:** All JS-dependent features must work without JavaScript
- **Asset Optimization:** Pre-optimized WebP/AVIF images and WOFF2 fonts before commit

#### From UX Design Document:

- **Deep Slate & Gold Color Palette:** Primary backgrounds (#020617), Gold accents (#FFD700, #FFE55C), Tech Blue (#3B82F6)
- **Typography System:** Poppins (headings), Inter (body), JetBrains Mono (code)
- **Fluid Typography:** Use of `clamp()` functions for responsive text scaling
- **12-Column Fluid Grid:** 24px gutters (desktop), 16px gutters (mobile)
- **Reading Width Constraint:** Blog articles limited to 65ch (~700px) for readability
- **Motion Reduction Support:** Respect `prefers-reduced-motion` media query for accessibility
- **Glass Card Component:** Multi-layer structure with blur, content, hover glow, and border states
- **Nav Dock Pattern:** Floating dock navigation (macOS/iOS style) that detaches from edges
- **Code Block Component:** Syntax highlighting with filename header, language badge, and copy-to-clipboard
- **Interactive Glow Pattern:** Cursor-following radial glow on clickable elements (desktop only)
- **Progressive Dock Behavior:** Navigation shrinks to centered floating dock after 200px scroll
- **Backdrop Blur for Overlays:** All modals/menus use `backdrop-filter: blur(10px)`
- **Bento Grid Shuffle Animation:** Cards fly to new positions on filter with smooth CSS transitions
- **Mobile Bottom Tab Bar:** Fixed bottom navigation on mobile, floating top dock on desktop
- **Touch Target Sizing:** Minimum 48x48px for all mobile interactive elements
- **Focus Management:** High-visibility Gold focus rings for keyboard navigation
- **Skip Links:** "Skip to Content" link visible on Tab focus
- **Semantic HTML:** Proper use of `<article>`, `<section>`, `<nav>` elements

### FR Coverage Map

**FR-01** (Glassmorphism) → Epic 2: Hero Section Immersive  
**FR-02** (Visual identity) → Epic 1: Fondations du Système Nexus  
**FR-03** (Sticky navigation) → Epic 3: Navigation Sticky Glass  
**FR-04** (Instant filters) → Epic 4: Blog Bento Grid avec Filtres  
**FR-05** (Hero parallax) → Epic 2: Hero Section Immersive  
**FR-06** (Bento Grid) → Epic 4: Blog Bento Grid avec Filtres  
**FR-07** (CI/CD validation) → Epic 1: Fondations du Système Nexus

## Epic List

### Epic 1: Fondations du Système Nexus
Visitors can discover a premium web interface with "Deep Slate & Gold" visual identity and solid technical architecture.
**FRs covered:** FR-02, FR-07

### Epic 2: Hero Section Immersive
Visitors can be immediately impressed by a dynamic Hero section that demonstrates technical expertise through design.
**FRs covered:** FR-01, FR-05

### Epic 3: Navigation Sticky Glass
Visitors can navigate easily with a floating menu that remains accessible during scroll while creating visual depth.
**FRs covered:** FR-03

### Epic 4: Blog Bento Grid avec Filtres
Visitors can discover and filter blog articles in a modern "Bento" grid with fluid and instant interactions.
**FRs covered:** FR-04, FR-06

### Epic 5: Expérience de Lecture Optimisée
Visitors can read technical articles in optimal conditions with perfect typography and adapted layout.
**FRs covered:** (Supports all FRs by improving readability)

### Epic 6: Performance et Accessibilité
All visitors, regardless of device or abilities, can access the site quickly and comfortably.
**FRs covered:** (Supports all FRs with performance)

## Epic 1: Fondations du Système Nexus

Visitors can discover a premium web interface with "Deep Slate & Gold" visual identity and solid technical architecture.

### Story 1.1: Create Nexus Design Tokens

As a developer,
I want a centralized SCSS tokens file with all Nexus design variables,
So that I can maintain visual consistency across all components.

**Acceptance Criteria:**

**Given** the project needs a design system foundation
**When** I create `_sass/nexus/_tokens.scss`
**Then** the file contains all color variables (Deep Slate, Gold palette, Tech Blue)
**And** spacing scale is defined (xs: 4px through 2xl: 48px)
**And** typography variables are defined (Poppins, Inter, JetBrains Mono with weights)
**And** blur levels are defined (light: 8px, heavy: 20px)
**And** z-index scale is defined (base: 1, dropdown: 50, nav: 100, modal: 1000, toast: 2000)
**And** responsive breakpoints are defined (mobile: 320px, tablet: 768px, desktop: 1024px, wide: 1440px)

### Story 1.2: Create Glassmorphism Mixins

As a developer,
I want reusable SCSS mixins for Glassmorphism effects,
So that I can apply consistent glass effects across components.

**Acceptance Criteria:**

**Given** the Nexus tokens are defined
**When** I create `_sass/nexus/_glass.scss`
**Then** a `nexus-glass` mixin is available that applies backdrop-filter blur
**And** the mixin uses token variables for blur intensity
**And** the mixin includes fallback for browsers without backdrop-filter support
**And** border and background transparency are configurable parameters
**And** the mixin maintains WCAG AA contrast ratios (NFR-04)

### Story 1.3: Setup Modular SCSS Architecture

As a developer,
I want a clean SCSS file organization following BEM-like naming,
So that the codebase is maintainable and scalable.

**Acceptance Criteria:**

**Given** the Nexus foundation files exist
**When** I update `_sass/main.scss`
**Then** it imports all Nexus partials in correct order (tokens, mixins, glass, layout, components, animations)
**And** all Nexus files use `nexus-` prefix for class names
**And** no styles are written directly in `main.scss` (import orchestrator only)
**And** legacy styles remain functional alongside Nexus styles

### Story 1.4: Create GitHub Actions CI Pipeline

As a developer,
I want automated validation of content integrity,
So that broken deployments are prevented (FR-07).

**Acceptance Criteria:**

**Given** the project needs automated quality gates
**When** I create `.github/workflows/ci.yml`
**Then** the workflow runs on push to main and on pull requests
**And** yamllint validates all YAML frontmatter
**And** xmllint validates RSS and sitemap XML files
**And** Jekyll build is executed and must succeed
**And** the workflow blocks merge if any validation fails (NFR-07)

### Story 1.5: Create Validation Scripts

As a developer,
I want custom validation scripts for Jekyll-specific checks,
So that content quality is enforced automatically.

**Acceptance Criteria:**

**Given** the CI pipeline is configured
**When** I create `scripts/validate-frontmatter.rb`
**Then** the script validates required frontmatter fields in all posts
**And** it checks for valid date formats
**And** it validates tag and category values
**When** I create `scripts/validate-xml.sh`
**Then** the script validates XML structure of feed.xml and sitemap.xml
**And** both scripts exit with non-zero code on validation failure

### Story 1.6: Configure Netlify Deployment

As a site owner,
I want automated deployment to Netlify with CDN distribution,
So that the site is globally accessible with optimal performance.

**Acceptance Criteria:**

**Given** the CI pipeline validates successfully
**When** I create `netlify.toml` configuration
**Then** build command is set to `jekyll build`
**And** publish directory is set to `_site`
**And** branch deploys are enabled for preview
**And** custom headers are configured for cache control
**And** the site deploys automatically on merge to main

---

## Epic 2: Hero Section Immersive

Visitors can be immediately impressed by a dynamic Hero section that demonstrates technical expertise through design.

### Story 2.1: Create Hero Layout Structure

As a visitor,
I want to see a visually striking Hero section on the homepage,
So that I immediately understand the site's premium quality.

**Acceptance Criteria:**

**Given** the Nexus design tokens are available
**When** I create `_includes/nexus/hero.html`
**Then** the Hero section uses semantic HTML5 `<section>` element
**And** it includes a main heading with the site tagline
**And** it displays key expertise areas (Orchestration, AI)
**And** the layout is responsive across all breakpoints
**And** the component uses `nexus-hero` BEM class naming

### Story 2.2: Apply Glassmorphism to Hero

As a visitor,
I want the Hero section to demonstrate depth through Glassmorphism,
So that I perceive the site as premium and immersive (FR-01).

**Acceptance Criteria:**

**Given** the Hero HTML structure exists
**When** I create `_sass/nexus/_hero-nexus.scss`
**Then** the Hero uses the `nexus-glass` mixin for background blur
**And** multiple layers create visual depth (background, glass layer, content)
**And** gold borders and accents are applied using token variables
**And** contrast ratio meets WCAG AA standards (NFR-04)
**And** the effect degrades gracefully on browsers without backdrop-filter (NFR-05)

### Story 2.3: Implement Parallax Effects

As a visitor,
I want the Hero section to respond to my mouse movement with subtle parallax,
So that the interface feels alive and interactive (FR-05).

**Acceptance Criteria:**

**Given** the Hero section is styled
**When** I create `assets/js/nexus/parallax.js`
**Then** mouse movement triggers parallax on designated elements with `data-nexus-parallax` attribute
**And** parallax response time is < 50ms (NFR-03)
**And** parallax is disabled on mobile devices (touch-only)
**And** parallax respects `prefers-reduced-motion` media query
**And** the Hero remains functional without JavaScript (NFR-05)

### Story 2.4: Optimize Hero Images

As a visitor,
I want the Hero section to load instantly,
So that I don't wait for the first impression (NFR-01, NFR-02).

**Acceptance Criteria:**

**Given** the Hero section needs visual assets
**When** I add Hero images to `assets/images/nexus/`
**Then** all images are in WebP format with AVIF fallback
**And** total Hero image weight is < 500KB
**And** critical Hero image uses `<link rel="preload">` in `<head>`
**And** non-critical images use native lazy loading
**And** Largest Contentful Paint (LCP) is < 1 second

### Story 2.5: Integrate Hero into Homepage

As a visitor,
I want to see the Hero section when I land on the homepage,
So that I immediately experience the Nexus design system.

**Acceptance Criteria:**

**Given** the Hero component is complete
**When** I update the homepage layout (`_layouts/home.html` or `index.md`)
**Then** the Hero section is included via `{% include nexus/hero.html %}`
**And** the Hero appears above the fold on all devices
**And** the page maintains Lighthouse score > 90 (NFR-01)
**And** the Hero is fully responsive (mobile, tablet, desktop)

---

## Epic 3: Navigation Sticky Glass

Visitors can navigate easily with a floating menu that remains accessible during scroll while creating visual depth.

### Story 3.1: Create Navigation Component Structure

As a visitor,
I want a clear navigation menu to access different sections,
So that I can explore the site easily.

**Acceptance Criteria:**

**Given** the site needs navigation
**When** I create `_includes/nexus/nav.html`
**Then** the navigation uses semantic `<nav>` element
**And** it includes links to main sections (Home, Blog, About, Contact)
**And** navigation items are defined in `_data/navigation.yml`
**And** the component uses `nexus-nav` BEM class naming
**And** the structure is accessible with proper ARIA labels

### Story 3.2: Apply Sticky Glass Effect to Navigation

As a visitor,
I want the navigation to float above content with a glass effect,
So that I can always access navigation while seeing context below (FR-03).

**Acceptance Criteria:**

**Given** the navigation HTML exists
**When** I style the navigation in `_sass/nexus/_layout.scss`
**Then** the navigation uses `position: sticky` with `top: 0`
**And** the `nexus-glass` mixin is applied for backdrop blur
**And** the navigation blurs content underneath when scrolling
**And** z-index uses the defined scale (nav: 100)
**And** contrast meets WCAG AA standards (NFR-04)

### Story 3.3: Implement Progressive Dock Behavior

As a visitor,
I want the navigation to transform into a centered floating dock after scrolling,
So that it feels premium and saves screen space.

**Acceptance Criteria:**

**Given** the sticky navigation is functional
**When** I create `assets/js/nexus/state.js`
**Then** the navigation starts as full-width bar
**And** after 200px scroll, it transforms to centered floating dock
**And** the transition is smooth (200-300ms duration)
**And** state is managed via `.is-docked` CSS class
**And** the behavior respects `prefers-reduced-motion`

### Story 3.4: Create Responsive Navigation

As a mobile visitor,
I want navigation optimized for touch devices,
So that I can navigate comfortably on my phone.

**Acceptance Criteria:**

**Given** the navigation works on desktop
**When** I add mobile styles to `_sass/nexus/_layout.scss`
**Then** navigation shows as fixed bottom tab bar on mobile (< 768px)
**And** navigation shows as floating top dock on desktop (>= 1024px)
**And** all touch targets are minimum 48x48px (NFR-04)
**And** mobile menu is accessible with thumb-friendly positioning

### Story 3.5: Implement Keyboard Navigation

As a keyboard user,
I want full keyboard access to navigation,
So that I can navigate without a mouse.

**Acceptance Criteria:**

**Given** the navigation is visually complete
**When** I add accessibility features
**Then** all navigation links are keyboard focusable
**And** focus indicators use high-visibility Gold rings
**And** Tab order is logical (left to right, top to bottom)
**And** "Skip to Content" link is visible on Tab focus
**And** navigation works without JavaScript (NFR-05)

---

## Epic 4: Blog Bento Grid avec Filtres

Visitors can discover and filter blog articles in a modern "Bento" grid with fluid and instant interactions.

### Story 4.1: Create Bento Grid Layout

As a visitor,
I want to see blog articles in a modern grid layout,
So that I can scan and discover content easily (FR-06).

**Acceptance Criteria:**

**Given** the blog needs a modern layout
**When** I create `_sass/nexus/_layout.scss` (grid section)
**Then** a responsive Bento grid is defined using CSS Grid
**And** grid shows 1 column on mobile, 2 on tablet, 4 on desktop
**And** grid uses 24px gutters on desktop, 16px on mobile
**And** cards have varying heights for visual interest (Bento style)
**And** the layout is fluid and responsive

### Story 4.2: Create Blog Card Component

As a visitor,
I want each blog article to be presented in an attractive card,
So that I'm encouraged to explore the content.

**Acceptance Criteria:**

**Given** the Bento grid layout exists
**When** I create `_includes/nexus/card-bento.html`
**Then** the card displays article title, excerpt, date, and tags
**And** the card includes a cover image (if available)
**And** the card uses `nexus-card` BEM class naming
**And** the component is reusable via Jekyll include

### Story 4.3: Style Blog Cards with Glass Effect

As a visitor,
I want blog cards to have depth and premium feel,
So that the blog interface matches the Hero quality.

**Acceptance Criteria:**

**Given** the blog card HTML exists
**When** I create `_sass/nexus/_cards-nexus.scss`
**Then** cards use the `nexus-glass` mixin for background
**And** cards have multi-layer structure (glass background, content, hover overlay, border)
**And** default state has subtle transparency
**And** hover state reveals gold border and radial glow
**And** all states maintain WCAG AA contrast (NFR-04)

### Story 4.4: Implement Instant Filter System

As a visitor,
I want to filter blog articles by category without page reload,
So that I can find relevant content quickly (FR-04).

**Acceptance Criteria:**

**Given** the blog grid is displayed
**When** I create `assets/js/nexus/filters.js`
**Then** filter buttons are generated from available categories
**And** clicking a filter shows/hides cards instantly (no page reload)
**And** filter state is managed via `.is-filtered` CSS class
**And** filter response time is < 50ms (NFR-03)
**And** filters work with page reload fallback if JS is disabled (NFR-05)

### Story 4.5: Add Filter Transition Animations

As a visitor,
I want smooth animations when filtering content,
So that the interface feels polished and responsive.

**Acceptance Criteria:**

**Given** the filter system is functional
**When** I add animations to `_sass/nexus/_animations.scss`
**Then** cards "fly" to new positions using CSS transitions
**And** filtered-out cards fade out smoothly
**And** filtered-in cards fade in smoothly
**And** transition duration is 200-300ms
**And** animations respect `prefers-reduced-motion`

### Story 4.6: Implement Interactive Card Hover Effects

As a desktop visitor,
I want cards to respond to my cursor with glow effects,
So that I know which card I'm about to click.

**Acceptance Criteria:**

**Given** the blog cards are styled
**When** I add hover effects to `_sass/nexus/_cards-nexus.scss`
**Then** cursor-following radial glow appears on hover (desktop only)
**And** card border transitions from transparent to gold
**And** card scales up by 2% on hover
**And** hover effects are disabled on touch devices
**And** hover response time is < 50ms (NFR-03)

---

## Epic 5: Expérience de Lecture Optimisée

Visitors can read technical articles in optimal conditions with perfect typography and adapted layout.

### Story 5.1: Implement Typography System

As a reader,
I want perfectly readable text with appropriate fonts,
So that I can read technical content comfortably.

**Acceptance Criteria:**

**Given** the Nexus tokens define typography
**When** I create `_sass/nexus/_typography.scss`
**Then** Poppins is used for headings (weights: 600, 700, 900)
**And** Inter is used for body text (weights: 400, 500)
**And** JetBrains Mono is used for code and technical elements
**And** fonts are loaded as WOFF2 format from `assets/fonts/`
**And** font-display: swap is used to prevent FOIT

### Story 5.2: Apply Fluid Typography Scaling

As a visitor on any device,
I want text to scale appropriately for my screen size,
So that reading is comfortable on mobile and desktop.

**Acceptance Criteria:**

**Given** the typography system is defined
**When** I implement responsive typography
**Then** body text uses `clamp(1rem, 2vw, 1.5rem)` for fluid scaling
**And** headings scale proportionally using clamp functions
**And** minimum text size is 16px on mobile for readability
**And** line-height is optimized for reading (1.6 for body, 1.2 for headings)

### Story 5.3: Constrain Article Reading Width

As a reader,
I want article content to have optimal line length,
So that my eyes don't fatigue from reading long lines.

**Acceptance Criteria:**

**Given** blog articles need optimal readability
**When** I style article layouts in `_layouts/post.html`
**Then** article content is constrained to maximum 65ch width (~700px)
**And** content is centered on wider screens
**And** padding is maintained on mobile devices
**And** code blocks can extend beyond 65ch if needed for readability

### Story 5.4: Implement Syntax Highlighting for Code

As a technical reader,
I want code snippets to be beautifully highlighted,
So that I can understand code examples easily.

**Acceptance Criteria:**

**Given** articles contain code blocks
**When** I create `_includes/nexus/code-block.html`
**Then** code blocks include filename header and language badge
**And** syntax highlighting matches the Deep Slate color palette
**And** code uses JetBrains Mono font
**And** "Copy to Clipboard" button is included
**And** code blocks have proper contrast for WCAG AA (NFR-04)

### Story 5.5: Create Focus Reading Mode

As a reader,
I want minimal UI distractions when reading articles,
So that I can focus on the content.

**Acceptance Criteria:**

**Given** a visitor is reading an article
**When** I style the article layout
**Then** navigation becomes more subtle during scroll
**And** sidebar elements (if any) are hidden on mobile
**And** article content is the primary visual focus
**And** UI elements fade in only when needed (scroll to top button)

---

## Epic 6: Performance et Accessibilité

All visitors, regardless of device or abilities, can access the site quickly and comfortably.

### Story 6.1: Implement Critical CSS Inlining

As a visitor,
I want the above-the-fold content to render instantly,
So that I don't see a flash of unstyled content (NFR-01).

**Acceptance Criteria:**

**Given** the site needs optimal performance
**When** I update `_includes/head.html`
**Then** critical Nexus styles (Hero, Navigation) are inlined in `<style>` tag
**And** non-critical styles are loaded asynchronously
**And** First Contentful Paint (FCP) is < 1 second
**And** Cumulative Layout Shift (CLS) is < 0.1

### Story 6.2: Implement Image Lazy Loading

As a visitor on a slow connection,
I want images to load progressively,
So that I can start reading without waiting for all images (NFR-02).

**Acceptance Criteria:**

**Given** the site contains many images
**When** I update image tags across the site
**Then** blog grid images use `loading="lazy"` attribute
**And** Hero images use `<link rel="preload">` for priority loading
**And** all images are in WebP format with AVIF fallback
**And** total homepage image weight is < 1.5MB (NFR-02)

### Story 6.3: Optimize JavaScript Bundle

As a visitor,
I want the site to be interactive quickly,
So that I don't wait for JavaScript to load (NFR-01).

**Acceptance Criteria:**

**Given** the site uses JavaScript for interactions
**When** I create `assets/js/nexus.js` as main bundle
**Then** the bundle includes state.js, filters.js, and parallax.js
**And** the bundle is minified and gzipped
**And** total bundle size is < 20KB gzipped
**And** non-critical JS is loaded with `defer` attribute
**And** Time to Interactive (TTI) is < 3 seconds

### Story 6.4: Implement Motion Reduction Support

As a visitor with motion sensitivity,
I want animations to be disabled when I request reduced motion,
So that I can use the site comfortably.

**Acceptance Criteria:**

**Given** some visitors prefer reduced motion
**When** I add accessibility features to `_sass/nexus/_animations.scss`
**Then** `@media (prefers-reduced-motion: reduce)` disables parallax effects
**And** filter transitions are instant instead of animated
**And** hover effects remain but without motion
**And** the site remains fully functional with reduced motion

### Story 6.5: Ensure Touch Target Sizing

As a mobile visitor,
I want all interactive elements to be easy to tap,
So that I don't accidentally tap the wrong thing.

**Acceptance Criteria:**

**Given** the site is used on touch devices
**When** I audit all interactive elements
**Then** all buttons and links are minimum 48x48px on mobile
**And** adequate spacing exists between touch targets (8px minimum)
**And** navigation items are thumb-friendly on mobile bottom bar
**And** filter buttons are appropriately sized for touch

### Story 6.6: Implement Complete Focus Management

As a keyboard-only user,
I want clear visual feedback when navigating with keyboard,
So that I always know where I am on the page.

**Acceptance Criteria:**

**Given** the site must be keyboard accessible
**When** I implement focus styles across all components
**Then** all interactive elements have high-visibility Gold focus rings
**And** focus indicators are never hidden with `outline: none`
**And** focus order is logical throughout the page
**And** "Skip to Content" link is first focusable element
**And** modal traps focus when open

### Story 6.7: Run Lighthouse CI Validation

As a developer,
I want automated performance validation,
So that performance regressions are caught before deployment (NFR-01).

**Acceptance Criteria:**

**Given** the site must maintain high performance
**When** I create `.github/workflows/lighthouse.yml`
**Then** Lighthouse CI runs on every pull request
**And** mobile score must be > 90 or build fails
**And** desktop score must be > 95 or build fails
**And** Lighthouse report is saved as CI artifact
**And** performance budgets are enforced (FCP < 1s, LCP < 2.5s, TTI < 3s)
