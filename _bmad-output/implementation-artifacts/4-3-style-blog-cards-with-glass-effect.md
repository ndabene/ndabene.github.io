# Story 4.3: Style Blog Cards with Glass Effect

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want blog cards to have depth and premium feel,
so that the blog interface matches the Hero quality.

## Acceptance Criteria

1. **Given** the blog card HTML exists
2. **When** I create `_sass/nexus/_cards-nexus.scss`
3. **Then** cards use the `nexus-glass` mixin for background
4. **And** cards have multi-layer structure (glass background, content, hover overlay, border)
5. **And** default state has subtle transparency
6. **And** hover state reveals gold border and radial glow
7. **And** all states maintain WCAG AA contrast (NFR-04)

## Tasks / Subtasks

- [ ] Create Styles (AC: 2)
  - [ ] Import in `main.scss`
- [ ] Apply Glass (AC: 3, 5)
  - [ ] Use mixin with lower opacity than nav/hero
- [ ] Implement Layers (AC: 4)
  - [ ] Use pseudo-elements (`::before`/`::after`) for borders/glows

## Dev Notes

### Architecture & Design System
- **Visuals:** Consistent glass effect.
- **Contrast:** Ensure text is readable over likely diverse wallpapers/backgrounds (or fixed dark background).

### References
- [Epics: Story 4.3](../planning-artifacts/epics.md#story-43-style-blog-cards-with-glass-effect)
- [Architecture: Glass Effects](../planning-artifacts/architecture.md)
