# Story 4.5: Add Filter Transition Animations

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want smooth animations when filtering content,
so that the interface feels polished and responsive.

## Acceptance Criteria

1. **Given** the filter system is functional
2. **When** I add animations to `_sass/nexus/_animations.scss`
3. **Then** cards "fly" to new positions using CSS transitions
4. **And** filtered-out cards fade out smoothly
5. **And** filtered-in cards fade in smoothly
6. **And** transition duration is 200-300ms
7. **And** animations respect `prefers-reduced-motion`

## Tasks / Subtasks

- [ ] Define Keyframes/Transitions (AC: 3, 4, 5)
  - [ ] Use `transform` and `opacity`
- [ ] Apply to Filter Logic (AC: 2)
  - [ ] Ensure `filters.js` adds/removes classes that trigger transition
  - [ ] Use `ISOTOPE` or `Flip` technique if complex reordering is needed, OR simple hide/show with CSS Grid flow (simpler is better for Vanilla).

## Dev Notes

### Architecture & Design System
- **Animation:** CSS transitions preferred over JS animation libraries.
- **Grid Flow:** If using CSS Grid, hiding elements (`display: none`) causes reflow. Animated `display: none` is tricky. Suggest using `opacity/scale` for exit, then `display: none` after timeout, or use a lightweight flip helper if "fly" is strictly required. For now, simple fade/scale is acceptable for "smooth animations" unless "fly" implies absolute positioning shuffle. *UX Doc says "Cards fly to new positions" - this implies Flip technique.* simple display none is not "flying".
- **Decision:** Use simple fade-out -> collapse width -> fade-in for MVP, or Flip.

### References
- [Epics: Story 4.5](../planning-artifacts/epics.md#story-45-add-filter-transition-animations)
- [Architecture: Animation Patterns](../planning-artifacts/architecture.md)
