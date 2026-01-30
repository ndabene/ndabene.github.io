# Story 4.4: Implement Instant Filter System

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to filter blog articles by category without page reload,
so that I can find relevant content quickly (FR-04).

## Acceptance Criteria

1. **Given** the blog grid is displayed
2. **When** I create `assets/js/nexus/filters.js`
3. **Then** filter buttons are generated from available categories
4. **And** clicking a filter shows/hides cards instantly (no page reload)
5. **And** filter state is managed via `.is-filtered` CSS class
6. **And** filter response time is < 50ms (NFR-03)
7. **And** filters work with page reload fallback if JS is disabled (NFR-05)

## Tasks / Subtasks

- [ ] Generate Category List (AC: 3)
  - [ ] Can be done in Liquid (rendering buttons) or JS (scanning DOM). Liquid preferred for SSR/fallback.
- [ ] Create Filter Script (AC: 2, 4, 6)
  - [ ] Event delegation on filter buttons
  - [ ] Loop through cards to toggle visibility
- [ ] Manage State (AC: 5)
  - [ ] Toggle active class on buttons and cards

## Dev Notes

### Architecture & Design System
- **Interactions:** Vanilla JS.
- **Event Namespacing:** `nexus:filterChange`.
- **SSR:** Render all cards initially so JS just hides them.

### References
- [Epics: Story 4.4](../planning-artifacts/epics.md#story-44-implement-instant-filter-system)
- [Architecture: Event Namespacing](../planning-artifacts/architecture.md)
