Status: review

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

- [x] Container Styles (AC: 3, 4)
  - [x] `.nexus-reading-container` with `max-width: 65ch`
- [x] Mobile Layout (AC: 5)
  - [x] Padding handled via `.nexus-container`
- [x] Full Bleed Elements (AC: 6)
  - [x] `pre` blocks allow breakout on wide screens

## File List

- _layouts/post.html
- assets/css/nexus.css

## Change Log

- 2026-01-31: Implemented 65ch reading constraint and refined post layout.

## Dev Agent Record

### Completion Notes
- Updated `post.html` layout to use Nexus semantics.
- Added `nexus-reading-container` to center and constrain content.
- Configured breakout code blocks for better technical reading.
- Integrated breadcrumbs and enhanced meta information.
