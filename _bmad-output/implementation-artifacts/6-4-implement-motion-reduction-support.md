# Story 6.4: Implement Motion Reduction Support

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor with motion sensitivity,
I want animations to be disabled when I request reduced motion,
so that I can use the site comfortably.

## Acceptance Criteria

1. **Given** some visitors prefer reduced motion
2. **When** I add accessibility features to `_sass/nexus/_animations.scss`
3. **Then** `@media (prefers-reduced-motion: reduce)` disables parallax effects
4. **And** filter transitions are instant instead of animated
5. **And** hover effects remain but without motion
6. **And** the site remains fully functional with reduced motion

## Tasks / Subtasks

- [ ] CSS Overrides (AC: 3, 4, 5)
  - [ ] `transition: none` inside media query
  - [ ] `animation: none`
- [ ] JS Awareness (AC: 3)
  - [ ] `window.matchMedia` check in parallax script

## Dev Notes

### Architecture & Design System
- **Accessibility:** Mandatory support.
- **Implementation:** Global CSS variable reset or specific overrides.

### References
- [Epics: Story 6.4](../planning-artifacts/epics.md#story-64-implement-motion-reduction-support)
- [UX Design: Motion Reduction](../planning-artifacts/ux-design-specification.md)
