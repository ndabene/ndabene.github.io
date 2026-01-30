# Story 5.2: Apply Fluid Typography Scaling

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor on any device,
I want text to scale appropriately for my screen size,
so that reading is comfortable on mobile and desktop.

## Acceptance Criteria

1. **Given** the typography system is defined
2. **When** I implement responsive typography
3. **Then** body text uses `clamp(1rem, 2vw, 1.5rem)` for fluid scaling
4. **And** headings scale proportionally using clamp functions
5. **And** minimum text size is 16px on mobile for readability
6. **And** line-height is optimized for reading (1.6 for body, 1.2 for headings)

## Tasks / Subtasks

- [ ] Fluid Body Text (AC: 3, 5, 6)
  - [ ] Set `font-size` on `body` or `html`
- [ ] Fluid Headings (AC: 4)
  - [ ] Define variables for `h1` through `h6` using clamp

## Dev Notes

### Architecture & Design System
- **Scaling:** Modern `clamp()` CSS function.
- **Access:** Ensure minimums meet accessibility standards.

### References
- [Epics: Story 5.2](../planning-artifacts/epics.md#story-52-apply-fluid-typography-scaling)
- [UX Design: Fluid Typography](../planning-artifacts/ux-design-specification.md)
