# AGENTS.md — Agent Guidelines for Nicolas Dabène's Portfolio

## Project Overview

This is a bilingual Jekyll blog portfolio (FR/EN) for Nicolas Dabène — Senior PHP Developer & AI-Native E-commerce Architect. The site features blog articles, projects showcase, modules store, and formations. It deploys to GitHub Pages via Jekyll CI/CD.

**Tech Stack:**
- **Static Site Generator:** Jekyll 4.x with Ruby 3.2
- **Image Processing:** Node.js + Sharp (WebP/AVIF generation)
- **Search:** Pagefind static search index
- **CI/CD:** GitHub Actions (`.github/workflows/jekyll.yml`)
- **Data:** YAML files in `_data/`, multilingual collections (`_posts`, `_posts_en`)

---

## Build Commands

### Core Jekyll Commands

```bash
# Install dependencies
bundle install
npm install

# Build production site
npm run build
# Equivalent: bundle exec jekyll build --config _config.yml,_config_github.yml

# Dev server with live reload (limited to 5 posts)
npm run dev
# Equivalent: bundle exec jekyll serve --config _config.yml,_config_dev.yml --limit_posts 5 --port 4000

# Production server (port 4000)
npm run serve
# Equivalent: bundle exec jekyll serve --port 4000

# Clean build artifacts
npm run clean

# Full rebuild (clean + build)
npm run rebuild
```

### Validation Scripts

```bash
# Validate blog post frontmatter (required fields, date format, image paths)
ruby scripts/validate_frontmatter.rb

# Validate boutique products data
ruby scripts/validate_produits.rb

# Validate images have WebP + AVIF variants
ruby scripts/validate_images_complete.rb

# Validate article image paths
ruby scripts/test_youtube_local.rb

# Check for missing translations (FR vs EN)
python3 scripts/analyze_translations.py
```

### Image Generation

```bash
# Generate WebP images from PNG/JPG
npm run generate:webp

# Generate responsive variants (480/720/1080) + AVIF
npm run generate:variants
```

### Tag Management

```bash
# Harmonize tags (AI → IA, lowercase, etc.)
python3 scripts/harmonize_tags.py --apply

# Normalize tags for filtering
ruby scripts/normalize_tags.rb --apply

# Generate tag pages automatically
ruby scripts/generate_tag_pages.rb
```

### Single Test / Debug Commands

```bash
# Build with trace for debugging
bundle exec jekyll build --trace --config _config.yml,_config_github.yml

# Validate a single article's frontmatter
ruby scripts/validate_frontmatter.rb --file _posts/2026/03/my-article.md

# Test a single image conversion
node scripts/test-sharp.mjs
```

---

## Code Style Guidelines

### General Principles

- **Encoding:** UTF-8 everywhere
- **Line endings:** Unix (LF) — configure your editor
- **Trailing whitespace:** Remove on save
- **No hard tabs:** Use spaces (2 spaces for YAML, 2-4 for code)

### YAML Configuration (`_config.yml`, `_data/*.yml`)

```yaml
# Use lowercase keys, snake_case for multi-word keys
github_username: ndabene
linkedin_username: nicolas-dabène-473a43b8

# Use 2-space indentation
collections:
  posts:
    output: true
    permalink: "/articles/:year/:month/:day/:title/"

# Booleans: true/false (no quotes)
future: false
shop_enabled: true
```

### Blog Post Frontmatter

**Required fields:**
```yaml
---
layout: post
title: "Article Title"
date: 2026-03-31 14:30:00 +0200
author: Nicolas Dabène
categories: ["IA", "PrestaShop"]
tags: ["agents IA", "module PrestaShop", "MCP"]
excerpt: "Brief description for SEO and previews (150-160 chars)"
image: /assets/images/blog/2026/03/article-title.webp
lang: fr
---
```

**Filename convention:** `YYYY-MM-DD-slug.md` (e.g., `2026-03-31-ai-agents-prestashop.md`)

**Date must match:** Filename date must equal `date` in frontmatter.

### Ruby Scripts

```ruby
# frozen_string_literal: true

require 'yaml'
require 'date'

ROOT = File.expand_path('..', __dir__).freeze

# Use snake_case for methods and variables
def validate_date_format(date_str)
  # ...
end

# Constants in UPPER_SNAKE_CASE
REQUIRED_FIELDS = %w[layout title date].freeze
```

### Python Scripts

```python
#!/usr/bin/env python3
"""Docstring describing the script."""

import os
import re
import yaml

# snake_case for functions and variables
def harmonize_tags(posts_dir: str, dry_run: bool = True) -> dict:
    """Docstring for functions."""
    pass

# Constants in UPPER_SNAKE_CASE
TAG_REPLACEMENTS = {
    "AI": "IA",
    "PrestaShop": "PrestaShop",
}
```

### JavaScript/Node.js

```javascript
// Use ES6+ syntax
const sharp = require('sharp');
const path = require('path');

// camelCase for variables and functions
async function generateWebpImages(inputDir, outputDir) {
  // ...
}

// Use async/await, not callbacks
```

### HTML/Liquid Templates

```html
<!-- Use descriptive class names, kebab-case -->
<div class="blog-post-card">
  <img src="{{ post.image }}" alt="{{ post.title | escape }}" loading="lazy">
</div>

<!-- Prefer semantic HTML5 elements -->
<article class="post-content">
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</article>
```

### CSS/SCSS

```scss
// Use SCSS with variables from _sass/
// BEM-like naming: .block__element--modifier
.blog-post-card {
  &__title { ... }
  &__image { ... }
  &--featured { ... }
}

// Use nesting sparingly, max 3 levels
.article {
  &__header { ... }
  .meta { ... }  // Keep shallow
}
```

### Git Commit Messages

Use **Conventional Commits** format:
- `feat: Add new blog post about MCP`
- `fix: Correct frontmatter date in article`
- `chore: Generate WebP variants`
- `docs: Update AGENTS.md`
- `refactor: Simplify tag harmonization script`

---

## Error Handling

### Ruby
```ruby
begin
  YAML.safe_load(content, permitted_classes: [Date, Time], aliases: true)
rescue Psych::SyntaxError => e
  puts "⚠️  YAML error: #{e.message}"
  exit 1
end
```

### Python
```python
try:
    front_matter = yaml.safe_load(front_matter_str)
except yaml.YAMLError as e:
    print(f"⚠️  Erreur YAML: {e}")
    continue
```

### Node.js
```javascript
try {
  await sharp(inputPath).toFile(outputPath);
} catch (err) {
  console.error(`❌ Error processing ${inputPath}:`, err.message);
  process.exit(1);
}
```

---

## Important Paths

| Purpose | Path |
|---------|------|
| French posts | `_posts/YYYY/MM/YYYY-MM-DD-slug.md` |
| English posts | `_posts_en/YYYY/MM/YYYY-MM-DD-slug.md` |
| Projects | `_projects/` (collection) |
| Images (blog) | `assets/images/blog/YYYY/MM/` |
| Data files | `_data/*.yml` |
| Translations | `_data/i18n/fr.yml`, `_data/i18n/en.yml` |
| Includes | `_includes/` (Liquid partials) |
| Layouts | `_layouts/` |

---

## Validation Rules (DO NOT BREAK)

1. **Frontmatter required fields:** `layout`, `title`, `date`, `author`, `categories`, `tags`, `excerpt`, `image`
2. **Image path must exist:** Verify image file exists before commit
3. **Image format:** Use `.webp` in frontmatter, not `.png` or `.jpg`
4. **Responsive variants:** Every WebP needs `-480.webp`, `-720.webp`, `-1080.webp` + AVIF equivalents
5. **Date consistency:** Filename date must match `date:` in frontmatter
6. **Language tag:** All posts must have `lang: fr` or `lang: en`

---

## CI/CD Pipeline (`.github/workflows/jekyll.yml`)

The pipeline runs on every push/PR to `main`:
1. Install Ruby 3.2 + bundle
2. Validate frontmatter (`ruby scripts/validate_frontmatter.rb`)
3. Setup Python 3.11 for tag harmonization
4. Harmonize + normalize tags
5. Generate tag pages
6. Install Node.js 20 + sharp
7. Generate WebP + responsive variants
8. Validate image completeness
9. Build Jekyll site
10. Generate Pagefind search index
11. Deploy to GitHub Pages

**Do not bypass validation steps.** Breaking the CI causes deployment failure.

---

## SEO & GEO Optimization Rules (NON-NEGOTIABLE)

**SEO and GEO optimization must NEVER denature the original content.**

When optimizing a blog post for search engines or AI visibility:

### What is ALLOWED (structural only)
- Adjust frontmatter fields: `excerpt`, `seo_title`, `canonical_url`, `reading_time`, `difficulty`
- Add structured `faq:` entries in frontmatter (YAML only, not visible in article body)
- Optimize image alt text and file names
- Ensure proper heading hierarchy (H1 → H2 → H3)
- Add internal links **only if** they naturally fit the existing flow

### What is FORBIDDEN (content distortion)
- **NEVER** add an SEO intro paragraph before the author's original opening
- **NEVER** insert comparison tables that weren't in the original text
- **NEVER** add forced internal links mid-sentence that break the author's rhythm
- **NEVER** add a visible FAQ section in the article body with meta-commentary like *(optimized for rich snippets)*
- **NEVER** rewrite the author's voice, tone, or phrasing to "sound more SEO-friendly"
- **NEVER** remove original content to make room for optimized content
- **NEVER** add filler paragraphs, definitions, or summaries that the author didn't write

### Core principle
> **SEO serves the reader first, search engines second.**
> If an optimization changes what the author meant to say, it's not optimization — it's rewriting.
> The original voice, structure, and intent of the article are sacred.

---

## Quick Reference for Agent Tasks

- **Add new article:** Create in `_posts/` (FR) or `_posts_en/` (EN), follow frontmatter template, use `.webp` image
- **Edit data:** Edit YAML in `_data/`, validate with corresponding script
- **Add image:** Place in `assets/images/blog/YYYY/MM/`, run `npm run generate:webp`
- **Fix validation error:** Run the specific validation script to see the error, fix the source
- **Deploy:** Push to `main` branch — CI/CD handles everything automatically