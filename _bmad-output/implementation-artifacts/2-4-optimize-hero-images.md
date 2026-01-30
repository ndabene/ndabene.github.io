# Story 2.4: Optimize Hero Images

Status: ready-for-dev

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

- [ ] Prepare Images (AC: 2, 3, 4)
  - [ ] Generate WebP/AVIF images
  - [ ] Optimize size
- [ ] Implement Preloading (AC: 5)
  - [ ] Update `_includes/head.html` or similar
- [ ] Implement Markup (AC: 6)
  - [ ] Use `<picture>` and `loading="lazy"` where appropriate

## Dev Notes

### Architecture & Design System
- **Performance:** Critical path optimization.
- **Formats:** Modern formats only (with JPG fallback if strictly necessary, but NFR implies WebP/AVIF primary).

### References
- [Epics: Story 2.4](../planning-artifacts/epics.md#story-24-optimize-hero-images)
- [Architecture: Asset Optimization](../planning-artifacts/architecture.md)
