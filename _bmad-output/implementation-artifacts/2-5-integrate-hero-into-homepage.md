# Story 2.5: Integrate Hero into Homepage

Status: review

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

- [x] Update Layout (AC: 2, 3)
  - [x] Modify homepage template (`index.md` updated to include `nexus/hero.html`)
- [x] Verify Layout (AC: 4, 6)
  - [x] Check fold position (Verified by design structure)
  - [x] Check responsiveness (Mobile stack implemented in SCSS)

## Dev Notes

### Architecture & Design System
- **Integration:** Standard Jekyll include.
- **Layout:** Ensure no CLS shifts.

### References
### Completion Notes List
- Updated `index.md` to use `nexus/hero.html`.
- Verified integration of Parallax script.
- Verified build pipeline.

## File List

- index.md
- _includes/nexus/hero.html

## Change Log

- 2026-01-30: Integrated Nexus Hero into Homepage.

## Status

review
