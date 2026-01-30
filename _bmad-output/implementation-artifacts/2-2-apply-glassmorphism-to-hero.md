# Story 2.2: Apply Glassmorphism to Hero

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the Hero section to demonstrate depth through Glassmorphism,
so that I perceive the site as premium and immersive (FR-01).

## Acceptance Criteria

1. **Given** the Hero HTML structure exists
2. **When** I create `_sass/nexus/_hero-nexus.scss`
3. **Then** the Hero uses the `nexus-glass` mixin for background blur
4. **And** multiple layers create visual depth (background, glass layer, content)
5. **And** gold borders and accents are applied using token variables
6. **And** contrast ratio meets WCAG AA standards (NFR-04)
7. **And** the effect degrades gracefully on browsers without backdrop-filter (NFR-05)

## Tasks / Subtasks

- [ ] Create Hero Styles (AC: 2)
  - [ ] Create partial `_sass/nexus/_hero-nexus.scss`
  - [ ] Import in `main.scss` (if not already done in 1.3)
- [ ] Apply Glass Effects (AC: 3, 4)
  - [ ] Apply `nexus-glass` mixin
  - [ ] Layer elements using z-index
- [ ] Refine Visuals (AC: 5, 6)
  - [ ] Add Golden accents
  - [ ] Verify contrast

## Dev Notes

### Architecture & Design System
- **Hero Styles:** Specific Nexus styles for Hero.
- **Location:** `_sass/nexus/_hero-nexus.scss`.
- **Dependencies:** `_glass.scss` mixin.

### References
- [Epics: Story 2.2](../planning-artifacts/epics.md#story-22-apply-glassmorphism-to-hero)
- [Architecture: Visual depth](../planning-artifacts/architecture.md)
