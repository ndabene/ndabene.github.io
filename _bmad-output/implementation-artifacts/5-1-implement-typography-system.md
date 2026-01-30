# Story 5.1: Implement Typography System

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a reader,
I want perfectly readable text with appropriate fonts,
so that I can read technical content comfortably.

## Acceptance Criteria

1. **Given** the Nexus tokens define typography
2. **When** I create `_sass/nexus/_typography.scss`
3. **Then** Poppins is used for headings (weights: 600, 700, 900)
4. **And** Inter is used for body text (weights: 400, 500)
5. **And** JetBrains Mono is used for code and technical elements
6. **And** fonts are loaded as WOFF2 format from `assets/fonts/`
7. **And** font-display: swap is used to prevent FOIT

## Tasks / Subtasks

- [ ] Font Assets (AC: 6)
  - [ ] Add WOFF2 files to `assets/fonts/` (manual or script)
- [ ] @font-face Rules (AC: 7)
  - [ ] Define in CSS with `font-display: swap`
- [ ] Font Stacks (AC: 3, 4, 5)
  - [ ] Define variables for each family

## Dev Notes

### Architecture & Design System
- **Fonts:** Self-hosted for performance/privacy (no Google Fonts CDM).
- **Location:** `_sass/nexus/_typography.scss`.

### References
- [Epics: Story 5.1](../planning-artifacts/epics.md#story-51-implement-typography-system)
- [UX Design: Typography System](../planning-artifacts/ux-design-specification.md)
