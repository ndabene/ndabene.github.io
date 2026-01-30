# Story 2.5: Integrate Hero into Homepage

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to see the Hero section when I land on the homepage,
so that I immediately experience the Nexus design system.

## Acceptance Criteria

1. **Given** the Hero component is complete
2. **When** I update the homepage layout (`_layouts/home.html` or `index.md`)
3. **Then** the Hero section is included via `{% include nexus/hero.html %}`
4. **And** the Hero appears above the fold on all devices
5. **And** the page maintains Lighthouse score > 90 (NFR-01)
6. **And** the Hero is fully responsive (mobile, tablet, desktop)

## Tasks / Subtasks

- [ ] Update Layout (AC: 2, 3)
  - [ ] Modify homepage template
- [ ] Verify Layout (AC: 4, 6)
  - [ ] Check fold position
  - [ ] Check responsiveness

## Dev Notes

### Architecture & Design System
- **Integration:** Standard Jekyll include.
- **Layout:** Ensure no CLS shifts.

### References
- [Epics: Story 2.5](../planning-artifacts/epics.md#story-25-integrate-hero-into-homepage)
- [Architecture: Layouts](../planning-artifacts/architecture.md)
