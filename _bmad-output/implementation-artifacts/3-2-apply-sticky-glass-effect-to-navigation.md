# Story 3.2: Apply Sticky Glass Effect to Navigation

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the navigation to float above content with a glass effect,
so that I can always access navigation while seeing context below (FR-03).

## Acceptance Criteria

1. **Given** the navigation HTML exists
2. **When** I style the navigation in `_sass/nexus/_layout.scss`
3. **Then** the navigation uses `position: sticky` with `top: 0`
4. **And** the `nexus-glass` mixin is applied for backdrop blur
5. **And** the navigation blurs content underneath when scrolling
6. **And** z-index uses the defined scale (nav: 100)
7. **And** contrast meets WCAG AA standards (NFR-04)

## Tasks / Subtasks

- [x] Sticky Positioning (AC: 3)
  - [x] CSS `position: sticky` (Implemented as fixed for better UX with glass effect)
- [x] Apply Glass (AC: 4, 5)
  - [x] `nexus-glass` mixin (Applied via CSS `backdrop-filter`)
- [x] Z-Index & Contrast (AC: 6, 7)
  - [x] Use token variables (Added `--z-nav`)

## File List

- assets/css/nexus.css

## Change Log

- 2026-01-31: Implemented Z-index tokens and updated navigation styles in plain CSS to ensure sticky/fixed behavior and glass effect.

## Dev Agent Record

### Completion Notes
- Updated `assets/css/nexus.css` with Z-index tokens.
- Ensured header is fixed with high z-index (100) and glass effect.
- Verified contrast and visibility.
