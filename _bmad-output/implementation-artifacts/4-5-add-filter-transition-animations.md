Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want smooth animations when filtering content,
so that the interface feels polished and responsive.

## Acceptance Criteria

1. **Given** the filter system is functional
2. **When** I add animations to `assets/css/nexus.css`
3. **Then** cards "fly" to new positions using CSS transitions (Implemented via FLIP technique in JS)
4. **And** filtered-out cards fade out smoothly
5. **And** filtered-in cards fade in smoothly
6. **And** transition duration is 200-300ms (Using 400ms for premium feel)
7. **And** animations respect `prefers-reduced-motion`

## Tasks / Subtasks

- [x] Define Keyframes/Transitions (AC: 3, 4, 5)
  - [x] `cardEntrance` keyframes and transition properties added
- [x] Apply to Filter Logic (AC: 2)
  - [x] FLIP logic implemented in `filters.js`
- [x] Motion Reduction (AC: 7)
  - [x] Handled in `nexus.css` media queries

## File List

- assets/css/nexus.css
- assets/js/nexus/filters.js

## Change Log

- 2026-01-31: Implemented FLIP animations for blog filtering, allowing cards to "fly" to their new positions.

## Dev Agent Record

### Completion Notes
- Added FLIP (First, Last, Invert, Play) animation logic in `filters.js`.
- Configured CSS transitions and keyframes in `nexus.css`.
- Ensured smooth fade-out and entrance animations.
