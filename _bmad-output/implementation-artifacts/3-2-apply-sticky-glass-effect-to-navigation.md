# Story 3.2: Apply Sticky Glass Effect to Navigation

Status: ready-for-dev

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

- [ ] Sticky Positioning (AC: 3)
  - [ ] CSS `position: sticky`
- [ ] Apply Glass (AC: 4, 5)
  - [ ] `nexus-glass` mixin
- [ ] Z-Index & Contrast (AC: 6, 7)
  - [ ] Use token variables

## Dev Notes

### Architecture & Design System
- **Layout Styles:** Defined in `_layout.scss` or specific `_nav-nexus.scss`.
- **Constraint:** Ensure sticky works (check parents for overflow: hidden).

### References
- [Epics: Story 3.2](../planning-artifacts/epics.md#story-32-apply-sticky-glass-effect-to-navigation)
- [Architecture: Navigation](../planning-artifacts/architecture.md)
