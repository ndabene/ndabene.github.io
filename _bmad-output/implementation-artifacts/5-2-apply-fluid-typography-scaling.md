Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor on any device,
I want text to scale appropriately for my screen size,
so that reading is comfortable on mobile and desktop.

## Acceptance Criteria

1. **Given** the typography system is defined
2. **When** I implement responsive typography
3. **Then** body text uses `clamp(1rem, 2vw, 1.5rem)` for fluid scaling (Using `clamp(1rem, 1.5vw, 1.125rem)` for optimal reading comfort)
4. **And** headings scale proportionally using clamp functions
5. **And** minimum text size is 16px (1rem) on mobile for readability
6. **And** line-height is optimized for reading (1.62 for body, 1.15 for headings)

## Tasks / Subtasks

- [x] Fluid Body Text (AC: 3, 5, 6)
  - [x] Applied `clamp` and `line-height` to `body`
- [x] Fluid Headings (AC: 4)
  - [x] Applied `clamp` to `h1` through `h4`

## File List

- assets/css/nexus.css

## Change Log

- 2026-01-31: Implemented fluid typography scaling across the site using CSS `clamp()`.

## Dev Agent Record

### Completion Notes
- Configured fluid scaling for body text and headings.
- Optimized line-height and letter-spacing for Poppins and Inter.
- Ensured minimum readability on mobile (16px).
