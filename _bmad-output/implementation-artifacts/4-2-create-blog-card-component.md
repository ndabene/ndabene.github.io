# Story 4.2: Create Blog Card Component

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want each blog article to be presented in an attractive card,
so that I'm encouraged to explore the content.

## Acceptance Criteria

1. **Given** the Bento grid layout exists
2. **When** I create `_includes/nexus/card-bento.html`
3. **Then** the card displays article title, excerpt, date, and tags
4. **And** the card includes a cover image (if available)
5. **And** the card uses `nexus-card` BEM class naming
6. **And** the component is reusable via Jekyll include

## Tasks / Subtasks

- [ ] Create Component (AC: 2, 6)
  - [ ] `_includes/nexus/card-bento.html`
- [ ] Implement Content (AC: 3, 4)
  - [ ] Liquid tags for post data
  - [ ] Conditional image rendering
- [ ] BEM Structure (AC: 5)
  - [ ] `nexus-card__image`, `nexus-card__content`, etc.

## Dev Notes

### Architecture & Design System
- **Component:** Reusable card.
- **Data:** Should accept `post` object as parameter/include var.

### References
- [Epics: Story 4.2](../planning-artifacts/epics.md#story-42-create-blog-card-component)
- [Architecture: Components](../planning-artifacts/architecture.md)
