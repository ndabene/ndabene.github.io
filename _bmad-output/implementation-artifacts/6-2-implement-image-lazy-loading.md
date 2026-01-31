# Story 6.2: Implement Image Lazy Loading

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor on a slow connection,
I want images to load progressively,
so that I can start reading without waiting for all images (NFR-02).

## Acceptance Criteria

1. **Given** the site contains many images
2. **When** I update image tags across the site
3. **Then** blog grid images use `loading="lazy"` attribute
4. **And** Hero images use `<link rel="preload">` for priority loading
5. **And** all images are in WebP format with AVIF fallback
6. **And** total homepage image weight is < 1.5MB (NFR-02)

## Tasks / Subtasks

- [x] Audit Images (AC: 3)
  - [x] Add `loading="lazy"` to Bento cards and post content
- [x] Preload Hero (AC: 4)
  - [x] Ensure LCP image is preloaded

## Dev Notes

### Architecture & Design System
- **Lazy Loading:** Native HTML attribute.
- **Formats:** WebP is standard.

### References
- [Epics: Story 6.2](../planning-artifacts/epics.md#story-62-implement-image-lazy-loading)
- [Architecture: Lazy Loading](../planning-artifacts/architecture.md)
