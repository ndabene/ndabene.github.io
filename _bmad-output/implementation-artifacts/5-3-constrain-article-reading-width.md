# Story 5.3: Constrain Article Reading Width

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a reader,
I want article content to have optimal line length,
so that my eyes don't fatigue from reading long lines.

## Acceptance Criteria

1. **Given** blog articles need optimal readability
2. **When** I style article layouts in `_layouts/post.html`
3. **Then** article content is constrained to maximum 65ch width (~700px)
4. **And** content is centered on wider screens
5. **And** padding is maintained on mobile devices
6. **And** code blocks can extend beyond 65ch if needed for readability

## Tasks / Subtasks

- [ ] Container Styles (AC: 3, 4)
  - [ ] `max-width: 65ch` on article body
- [ ] Mobile Layout (AC: 5)
  - [ ] `padding: 0 1rem`
- [ ] Full Bleed Elements (AC: 6)
  - [ ] Allow code/images to break out of container if layout permits

## Dev Notes

### Architecture & Design System
- **Readability:** 65 characters is the golden standard.
- **Layout:** Centered container.

### References
- [Epics: Story 5.3](../planning-artifacts/epics.md#story-53-constrain-article-reading-width)
- [UX Design: Reading Width](../planning-artifacts/ux-design-specification.md)
