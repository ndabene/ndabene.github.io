# Story 3.3: Implement Progressive Dock Behavior

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the navigation to transform into a centered floating dock after scrolling,
so that it feels premium and saves screen space.

## Acceptance Criteria

1. **Given** the sticky navigation is functional
2. **When** I create `assets/js/nexus/state.js`
3. **Then** the navigation starts as full-width bar
4. **And** after 200px scroll, it transforms to centered floating dock
5. **And** the transition is smooth (200-300ms duration)
6. **And** state is managed via `.is-docked` CSS class
7. **And** the behavior respects `prefers-reduced-motion`

## Tasks / Subtasks

- [x] Create State Script (AC: 2, 4)
  - [x] Monitor scroll position
  - [x] Toggle `.is-docked` class
- [x] Style Dock State (AC: 3, 5)
  - [x] CSS for `.nexus-nav.is-docked` (centered, rounded corners)
  - [x] Transition properties

## File List

- assets/js/nexus/state.js
- assets/css/nexus.css
- _includes/footer.html

## Change Log

- 2026-01-31: Implemented progressive dock behavior. Added state.js for scroll monitoring and updated nexus.css with docked styles.

## Dev Agent Record

### Completion Notes
- Created `assets/js/nexus/state.js` to toggle `.is-docked` class on scroll.
- Added smooth transition and docked styling in `assets/css/nexus.css`.
- Included script in `_includes/footer.html`.
