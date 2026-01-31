# Story 6.3: Optimize JavaScript Bundle

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the site to be interactive quickly,
so that I don't wait for JavaScript to load (NFR-01).

## Acceptance Criteria

1. **Given** the site uses JavaScript for interactions
2. **When** I create `assets/js/nexus.js` as main bundle
3. **Then** the bundle includes state.js, filters.js, and parallax.js
4. **And** the bundle is minified and gzipped
5. **And** total bundle size is < 20KB gzipped
6. **And** non-critical JS is loaded with `defer` attribute
7. **And** Time to Interactive (TTI) is < 3 seconds

## Tasks / Subtasks

- [x] Bundle Creation (AC: 2, 3)
  - [x] Combine scripts (manual concat or build script)
- [x] Minification (AC: 4)
  - [x] Use manual light minification (removal of overhead)
- [x] Defer Loading (AC: 6)
  - [x] `<script defer src="...">`

## Dev Notes

### Architecture & Design System
- **Bundling:** Single file `nexus.js`.
- **Constraint:** Vanilla JS implies no heavy frameworks, so 20KB limit is reasonable.

### References
- [Epics: Story 6.3](../planning-artifacts/epics.md#story-63-optimize-javascript-bundle)
- [Architecture: JavaScript Bundle](../planning-artifacts/architecture.md)
