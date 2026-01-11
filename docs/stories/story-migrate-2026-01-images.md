# Story: Harmonize 2026-01 Post Assets

> **QA Status: ✅ PASS** ([See Gate Decision](../qa/gate-migrate-2026-01-images.md))


## Description
Migrate January 2026 blog post images from the common month folder to isolated per-article folders, following the new architecture rules defined in `docs/ai-instructions/post-management.md`.

## Context
- **Canonical Asset Rule**: `/assets/images/blog/YYYY/MM/slug-de-l-article/image-principale.webp`
- **Posts affected**: All `.md` files in `_posts/2026/01/` and `_posts_en/2026/01/`.

## Tasks
- [x] Create subfolders for each article in `assets/images/blog/2026/01/`.
- [x] Move main images to their respective folders and rename to `image-principale`.
- [x] Update front-matter `image` path in both FR and EN posts.
- [x] Ensure `lang` symmetry is maintained.

## Definition of Done (DOD)
- [x] Each article in Jan 2026 has its own assets folder.
- [x] Front-matter references the new path.
- [x] Zero broken images on the site (validated by checking paths).
- [x] (Optional) Conversion to WebP if tools available, otherwise retain extension but follow path rule.
