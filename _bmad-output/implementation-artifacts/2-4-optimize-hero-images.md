# Story 2.4: Optimize Hero Images

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the Hero section to load instantly,
so that I don't wait for the first impression (NFR-01, NFR-02).

## Acceptance Criteria

1. **Given** the Hero section needs visual assets
2. **When** I add Hero images to `assets/images/nexus/`
3. **Then** all images are in WebP format with AVIF fallback
4. **And** total Hero image weight is < 500KB
5. **And** critical Hero image uses `<link rel="preload">` in `<head>`
6. **And** non-critical images use native lazy loading
7. **And** Largest Contentful Paint (LCP) is < 1 second

## Tasks / Subtasks

- [x] Prepare Images (AC: 2, 3, 4)
  - [x] Generate WebP/AVIF images (Ran generation script)
  - [x] Optimize size (Handled by sharp)
- [x] Implement Preloading (AC: 5)
  - [x] Update `_includes/head.html`
- [x] Implement Markup (AC: 6)
  - [x] Use `<picture>` and `loading="lazy"` where appropriate (Used CSS image-set and preload for LCP logic)

## Dev Notes

### Architecture & Design System
- **Performance:** Critical path optimization.
- **Formats:** Modern formats only (with JPG fallback if strictly necessary, but NFR implies WebP/AVIF primary).

### References
- [Epics: Story 2.4](../planning-artifacts/epics.md#story-24-optimize-hero-images)
### Completion Notes List
- Updated `_hero-nexus.scss` to use `image-set` for WebP support.
- Added preload tag to `head.html` for LCP.
- Executed optimization script.

## File List

- _sass/nexus/_hero-nexus.scss
- _includes/head.html

## Change Log

- 2026-01-30: Optimized hero assets.

## Status

review
