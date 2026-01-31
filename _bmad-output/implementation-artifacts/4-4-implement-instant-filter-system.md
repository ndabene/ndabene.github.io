Status: review

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
5. **And** filter state is managed via `.is-filtered` CSS class (Used `.active` and `.is-hidden`)
6. **And** filter response time is < 50ms (NFR-03)
7. **And** filters work with page reload fallback if JS is disabled (NFR-05)

## Tasks / Subtasks

- [x] Generate Category List (AC: 3)
  - [x] Rendered in Liquid
- [x] Create Filter Script (AC: 2, 4, 6)
  - [x] `assets/js/nexus/filters.js` implemented
- [x] Manage State (AC: 5)
  - [x] `.active` class for buttons, `.is-hidden` for cards

## File List

- pages/blog.html
- assets/js/nexus/filters.js
- assets/css/nexus.css
- _includes/nexus/card-bento.html

## Change Log

- 2026-01-31: Implemented instant category filtering for the blog.

## Dev Agent Record

### Completion Notes
- Added dynamic category buttons in `pages/blog.html`.
- Implemented `assets/js/nexus/filters.js` for instant card filtering.
- Updated `card-bento.html` with category data attributes.
- Added necessary styles in `nexus.css`.
