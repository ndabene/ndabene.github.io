# Story 3.4: Create Responsive Navigation

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a mobile visitor,
I want navigation optimized for touch devices,
so that I can navigate comfortably on my phone.

## Acceptance Criteria

1. **Given** the navigation works on desktop
2. **When** I add mobile styles to `_sass/nexus/_layout.scss`
3. **Then** navigation shows as fixed bottom tab bar on mobile (< 768px)
4. **And** navigation shows as floating top dock on desktop (>= 1024px)
5. **And** all touch targets are minimum 48x48px (NFR-04)
6. **And** mobile menu is accessible with thumb-friendly positioning

## Tasks / Subtasks

- [ ] Mobile Styles (AC: 3)
  - [ ] Media queries for bottom bar
- [ ] Touch Targets (AC: 5)
  - [ ] Ensure padding/height meets 48px
- [ ] Desktop Styles (AC: 4)
  - [ ] Verify top positioning

## Dev Notes

### Architecture & Design System
- **Responsive Strategy:** Bottom bar for mobile is a specific UX decision.
- **Breakpoints:** Use token variables.

### References
- [Epics: Story 3.4](../planning-artifacts/epics.md#story-34-create-responsive-navigation)
- [UX Design: Nav Dock Pattern](../planning-artifacts/ux-design-specification.md)
