# Story 1.3: Setup Modular SCSS Architecture

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want a clean SCSS file organization following BEM-like naming,
so that the codebase is maintainable and scalable.

## Acceptance Criteria

1. **Given** the Nexus foundation files exist
2. **When** I update `_sass/main.scss`
3. **Then** it imports all Nexus partials in correct order (tokens, mixins, glass, layout, components, animations)
4. **And** all Nexus files use `nexus-` prefix for class names
5. **And** no styles are written directly in `main.scss` (import orchestrator only)
6. **And** legacy styles remain functional alongside Nexus styles

## Tasks / Subtasks

- [ ] Create Entry Point (AC: 2, 5)
  - [ ] Refactor `_sass/main.scss`
  - [ ] Add imports for Nexus foundation
- [ ] Verify Prefixing (AC: 4)
  - [ ] Document `nexus-` naming convention in comments or README

## Dev Notes

### Architecture & Design System
- **Modular SCSS Structure:** BEM-like naming with `nexus-` prefix.
- **Critical CSS:** Note for later stories, keep `main.scss` clean so critical parts can be extracted if needed.

### References
- [Epics: Story 1.3](../planning-artifacts/epics.md#story-13-setup-modular-scss-architecture)
- [Architecture: SCSS Structure](../planning-artifacts/architecture.md)
