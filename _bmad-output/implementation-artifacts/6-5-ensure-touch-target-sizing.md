# Story 6.5: Ensure Touch Target Sizing

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a mobile visitor,
I want all interactive elements to be easy to tap,
so that I don't accidentally tap the wrong thing.

## Acceptance Criteria

1. **Given** the site is used on touch devices
2. **When** I audit all interactive elements
3. **Then** all buttons and links are minimum 48x48px on mobile
4. **And** adequate spacing exists between touch targets (8px minimum)
5. **And** navigation items are thumb-friendly on mobile bottom bar
6. **And** filter buttons are appropriately sized for touch

## Tasks / Subtasks

- [ ] Audit & Fix (AC: 3, 4)
  - [ ] Check padding/margins
  - [ ] Increase tappable area with pseudo-elements if visual size is small

## Dev Notes

### Architecture & Design System
- **Mobile UX:** 48px standard.
- **Reference:** Google / Apple guidelines.

### References
- [Epics: Story 6.5](../planning-artifacts/epics.md#story-65-ensure-touch-target-sizing)
- [UX Design: Touch Target Sizing](../planning-artifacts/ux-design-specification.md)
