# AGENTS.md — Agent Guidelines for Nicolas Dabène's Portfolio

## Project Overview

Bilingual Jekyll blog portfolio (FR/EN) for Nicolas Dabène — Senior PHP Developer & AI-Native E-commerce Architect. Deploys to GitHub Pages via GitHub Actions CI/CD.

**Tech Stack:** Jekyll 4.x / Ruby 3.2 · Node.js 20 + Sharp · Pagefind · GitHub Actions

---

## Build / Lint / Test Commands

```bash
# Install dependencies
bundle install && npm install

# Dev server (live reload, 5 posts max)
npm run dev

# Production build
npm run build          # bundle exec jekyll build --config _config.yml,_config_github.yml
npm run serve          # bundle exec jekyll serve --port 4000
npm run clean          # clean _site/
npm run rebuild        # clean + build

# Validate a single article's frontmatter
ruby scripts/validate_frontmatter.rb --file _posts/2026/03/my-article.md

# Validate all frontmatter / products / images
npm run validate:frontmatter
npm run validate:produits
ruby scripts/validate_images_complete.rb

# Check missing translations (FR vs EN)
python3 scripts/analyze_translations.py

# Image generation
npm run generate:webp       # PNG/JPG → WebP
npm run generate:variants   # responsive 480/720/1080 + AVIF

# Individual script tests
node scripts/test-sharp.mjs                       # Test Sharp image processing
node scripts/gen-variants.mjs                     # Test responsive image generation
ruby scripts/test_youtube_local.rb                # Test YouTube API integration

# Debug build with trace
bundle exec jekyll build --trace --config _config.yml,_config_github.yml
```

---

## Code Style

| Language | Conventions |
|----------|-------------|
| **YAML** | 2-space indent, `snake_case` keys, `true/false` booleans, no quotes unless needed |
| **Ruby** | `frozen_string_literal: true`, `snake_case`, constants `UPPER_SNAKE_CASE`, `.freeze` |
| **Python** | Type hints, docstrings, `snake_case`, constants `UPPER_SNAKE_CASE` |
| **JS/Node** | ES6+, `async/await`, `camelCase`, `const` over `let`, prefer arrow functions |
| **SCSS** | BEM-like naming (`.block__element--modifier`), max 3 levels nesting |
| **HTML/Liquid** | Semantic HTML5, kebab-case classes, `loading="lazy"` on images |
| **Git** | Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:` |

### Ruby Style (scripts/*.rb)

```ruby
# frozen_string_literal: true
require 'json'
require 'yaml'

module MyModule
  class MyClass
    attr_reader :items
    def initialize(items)
      @items = items.freeze
    end
    def process
      @items.map { |item| transform(item) }
    end
    private
    def transform(item)
      item.upcase
    end
  end
end
```

### JavaScript/Node Style (scripts/*.js, scripts/*.mjs)

```javascript
import sharp from 'sharp';
const DEFAULT_OPTIONS = { quality: 80, format: 'webp' };

export async function generateVariants(inputPath, outputDir, options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  // Implementation
}
```

### Python Style (scripts/*.py)

```python
from __future__ import annotations
from pathlib import Path
def analyze_translations(base_dir: Path, threshold: int = 5) -> dict[str, list[str]]:
    """Analyze translation coverage between FR and EN content."""
    return {}
```

---

## Blog Post Frontmatter (required)

```yaml
---
layout: post
title: "Article Title"
date: 2026-03-31 14:30:00 +0200
author: Nicolas Dabène
categories: ["IA", "PrestaShop"]
tags: ["agents IA", "module PrestaShop", "MCP"]
excerpt: "Brief SEO description (150-160 chars)"
image: /assets/images/blog/2026/03/article-title.webp
lang: fr
---
```

Filename: `YYYY-MM-DD-slug.md` — date must match frontmatter `date:`.

---

## Important Paths

| Content | Path |
|---------|------|
| French posts | `_posts/YYYY/MM/YYYY-MM-DD-slug.md` |
| English posts | `_posts_en/YYYY/MM/YYYY-MM-DD-slug.md` |
| Images | `assets/images/blog/YYYY/MM/` |
| Data | `_data/*.yml` · `_data/i18n/{fr,en}.yml` |
| Templates | `_includes/` · `_layouts/` · `_sass/` |

---

## Validation Rules (DO NOT BREAK)

1. Frontmatter must include all required fields
2. Image paths must exist on disk
3. Frontmatter `image:` uses `.webp`, never `.png`/`.jpg`
4. Every WebP needs `-480`, `-720`, `-1080` variants + AVIF equivalents
5. Filename date must equal frontmatter `date:`
6. Every post must have `lang: fr` or `lang: en`

---

## CI/CD Pipeline (`.github/workflows/jekyll.yml`)

Runs on push/PR to `main`: Ruby setup → frontmatter validation → tag harmonization → Jekyll build → Pagefind → GitHub Pages deploy. **Do not bypass validation steps.**

---

## SEO & GEO Rules (NON-NEGOTIABLE)

**Optimization must NEVER denature original content.**

**ALLOWED:** Adjust frontmatter (`excerpt`, `seo_title`, `canonical_url`, `faq:`), optimize image alt text, ensure heading hierarchy, add natural internal links.

**FORBIDDEN:** Add SEO intros, comparison tables, forced mid-sentence links, visible FAQs, rewrite author voice, remove original content, add filler paragraphs.

> SEO serves the reader first. The original voice, structure, and intent are sacred.

---

## Quick Reference

- **New article:** `_posts/` (FR) or `_posts_en/` (EN), follow frontmatter, use `.webp` image
- **Add image:** `assets/images/blog/YYYY/MM/`, then `npm run generate:webp`
- **Fix error:** Run the specific validation script, fix the source
- **Deploy:** Push to `main` — CI/CD handles everything