# Story 3.3: Implement Progressive Dock Behavior

Status: ready-for-dev

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

- [ ] Create State Script (AC: 2, 4)
  - [ ] Monitor scroll position
  - [ ] Toggle `.is-docked` class
- [ ] Style Dock State (AC: 3, 5)
  - [ ] CSS for `.nexus-nav.is-docked` (centered, rounded corners)
  - [ ] Transition properties

## Dev Notes

### Architecture & Design System
- **State Management:** `.is-docked` class toggled by JS.
- **Location:** `assets/js/nexus/state.js`.
- **Performance:** Debounce or throttle scroll listener, or use IntersectionObserver.

### References
- [Epics: Story 3.3](../planning-artifacts/epics.md#story-33-implement-progressive-dock-behavior)
- [Architecture: State Management](../planning-artifacts/architecture.md)
