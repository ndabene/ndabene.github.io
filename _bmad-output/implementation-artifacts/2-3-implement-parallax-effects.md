# Story 2.3: Implement Parallax Effects

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the Hero section to respond to my mouse movement with subtle parallax,
so that the interface feels alive and interactive (FR-05).

## Acceptance Criteria

1. **Given** the Hero section is styled
2. **When** I create `assets/js/nexus/parallax.js`
3. **Then** mouse movement triggers parallax on designated elements with `data-nexus-parallax` attribute
4. **And** parallax response time is < 50ms (NFR-03)
5. **And** parallax is disabled on mobile devices (touch-only)
6. **And** parallax respects `prefers-reduced-motion` media query
7. **And** the Hero remains functional without JavaScript (NFR-05)

## Tasks / Subtasks

- [x] Create Parallax Script (AC: 2, 3)
  - [x] Implement mousemove event listener
  - [x] Apply transform translate based on cursor position
- [x] Optimize Performance (AC: 4, 6)
  - [x] Use `requestAnimationFrame`
  - [x] Check `prefers-reduced-motion`
- [x] Mobile Guard (AC: 5)
  - [x] Disable checking userAgent or screen width

## Dev Notes

### Architecture & Design System
- **Interactions:** Lightweight vanilla JS.
- **Performance:** Use RAF loop.
- **Location:** `assets/js/nexus/parallax.js`.

### References
- [Epics: Story 2.3](../planning-artifacts/epics.md#story-23-implement-parallax-effects)
### Completion Notes List
- Created `assets/js/nexus/parallax.js` with `requestAnimationFrame`.
- Implemented mobile and reduced-motion guards.
- Support `data-nexus-parallax` attribute for depth control.

## File List

- assets/js/nexus/parallax.js

## Change Log

- 2026-01-30: Implemented parallax logic.

## Status

review
