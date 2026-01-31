# Story 3.1: Create Navigation Component Structure

Status: review

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

- [x] Create Navigation Data (AC: 5)
  - [x] Create `_data/navigation.yml`
- [x] Create Component (AC: 2, 3, 6)
  - [x] Create partial `_includes/nexus/nav.html`
  - [x] Loop through data to build links
- [x] Add Accessibility (AC: 7)
  - [x] ARIA roles and labels

## File List

- _data/navigation.yml
- _includes/nexus/nav.html
- _includes/header.html

## Change Log

- 2026-01-31: Implemented navigation data and component using Nexus design. Replaced hardcoded header navigation.

## Dev Agent Record

### Completion Notes
- Created semantic navigation component in `_includes/nexus/nav.html`.
- Centralized navigation links in `_data/navigation.yml`.
- Updated header to use dynamic navigation.
- Maintained accessibility and styling.
