# Story 1.2: Create Glassmorphism Mixins

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want reusable SCSS mixins for Glassmorphism effects,
so that I can apply consistent glass effects across components.

## Acceptance Criteria

1. **Given** the Nexus tokens are defined
2. **When** I create `_sass/nexus/_glass.scss`
3. **Then** a `nexus-glass` mixin is available that applies backdrop-filter blur
4. **And** the mixin uses token variables for blur intensity
5. **And** the mixin includes fallback for browsers without backdrop-filter support
6. **And** border and background transparency are configurable parameters
7. **And** the mixin maintains WCAG AA contrast ratios (NFR-04)

## Tasks / Subtasks

- [ ] Create Glass Mixin (AC: 3, 4, 6)
  - [ ] Define `nexus-glass` mixin
  - [ ] Implement parameter logic for blur, opacity, border
- [ ] Implement Fallbacks (AC: 5)
  - [ ] Use `@supports` or solid background fallback
- [ ] Verify Contrast (AC: 7)
  - [ ] Ensure default values pass WCAG AA

## Dev Notes

### Architecture & Design System
- **Pattern:** Reusable mixins for standardized effects.
- **Location:** `_sass/nexus/_glass.scss`.
- **Dependencies:** `_tokens.scss`.

### References
- [Epics: Story 1.2](../planning-artifacts/epics.md#story-12-create-glassmorphism-mixins)
- [Architecture: Glass Effects](../planning-artifacts/architecture.md)
