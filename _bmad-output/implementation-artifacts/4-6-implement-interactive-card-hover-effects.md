Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a desktop visitor,
I want cards to respond to my cursor with glow effects,
so that I know which card I'm about to click.

## Acceptance Criteria

1. **Given** the blog cards are styled
2. **When** I add hover effects to `assets/css/nexus.css`
3. **Then** cursor-following radial glow appears on hover (desktop only)
4. **And** card border transitions from transparent to gold
5. **And** card scales up by 2% on hover
6. **And** hover effects are disabled on touch devices
7. **And** hover response time is < 50ms (NFR-03)

## Tasks / Subtasks

- [x] Border & Scale (AC: 4, 5)
  - [x] Scale 1.02 and gold border transition added
- [x] Radial Glow (AC: 3)
  - [x] Mouse tracking implemented in `state.js`
- [x] Mobile Guard (AC: 6)
  - [x] `@media (hover: hover)` implemented

## File List

- assets/css/nexus.css
- assets/js/nexus/state.js

## Change Log

- 2026-01-31: Refined interactive card hover effects with radial glow and desktop-only scaling.

## Dev Agent Record

### Completion Notes
- Integrated mouse tracking into `state.js` for radial glow.
- Added `@media (hover: hover)` guards in `nexus.css`.
- Configured 2% scale and gold border transition on hover.
