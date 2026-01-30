# Story 2.1: Create Hero Layout Structure

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to see a visually striking Hero section on the homepage,
so that I immediately understand the site's premium quality.

## Acceptance Criteria

1. **Given** the Nexus design tokens are available
2. **When** I create `_includes/nexus/hero.html`
3. **Then** the Hero section uses semantic HTML5 `<section>` element
4. **And** it includes a main heading with the site tagline
5. **And** it displays key expertise areas (Orchestration, AI)
6. **And** the layout is responsive across all breakpoints
7. **And** the component uses `nexus-hero` BEM class naming

## Tasks / Subtasks

- [ ] Create Hero Component (AC: 2, 3, 7)
  - [ ] Create `_includes/nexus/hero.html`
  - [ ] Use `nexus-hero` block class
- [ ] Implement Content Structure (AC: 4, 5)
  - [ ] Add tagline H1
  - [ ] Add expertise area list
- [ ] Implement Responsive Layout (AC: 6)
  - [ ] Ensure mobile stack vs desktop row layout (using Nexus layout tokens)

## Dev Notes

### Architecture & Design System
- **Hero Section:** Key visual element.
- **Location:** `_includes/nexus/hero.html`.
- **Dependencies:** `_tokens.scss` for breakpoints.

### References
- [Epics: Story 2.1](../planning-artifacts/epics.md#story-21-create-hero-layout-structure)
- [UX Design: Hero Section](../planning-artifacts/ux-design-specification.md)
