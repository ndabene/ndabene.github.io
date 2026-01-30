# Story 3.1: Create Navigation Component Structure

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want a clear navigation menu to access different sections,
so that I can explore the site easily.

## Acceptance Criteria

1. **Given** the site needs navigation
2. **When** I create `_includes/nexus/nav.html`
3. **Then** the navigation uses semantic `<nav>` element
4. **And** it includes links to main sections (Home, Blog, About, Contact)
5. **And** navigation items are defined in `_data/navigation.yml`
6. **And** the component uses `nexus-nav` BEM class naming
7. **And** the structure is accessible with proper ARIA labels

## Tasks / Subtasks

- [ ] Create Navigation Data (AC: 5)
  - [ ] Create `_data/navigation.yml`
- [ ] Create Component (AC: 2, 3, 6)
  - [ ] Create partial `_includes/nexus/nav.html`
  - [ ] Loop through data to build links
- [ ] Add Accessibility (AC: 7)
  - [ ] ARIA roles and labels

## Dev Notes

### Architecture & Design System
- **Navigation:** Semantic nav.
- **Location:** `_includes/nexus/nav.html`.
- **Data Source:** Jekyll data file separation.

### References
- [Epics: Story 3.1](../planning-artifacts/epics.md#story-31-create-navigation-component-structure)
- [Architecture: Components](../planning-artifacts/architecture.md)
