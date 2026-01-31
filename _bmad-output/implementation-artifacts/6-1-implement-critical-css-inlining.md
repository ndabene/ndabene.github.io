# Story 6.1: Implement Critical CSS Inlining

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want the above-the-fold content to render instantly,
so that I don't see a flash of unstyled content (NFR-01).

## Acceptance Criteria

1. **Given** the site needs optimal performance
2. **When** I update `_includes/head.html`
3. **Then** critical Nexus styles (Hero, Navigation) are inlined in `<style>` tag
4. **And** non-critical styles are loaded asynchronously
5. **And** First Contentful Paint (FCP) is < 1 second
6. **And** Cumulative Layout Shift (CLS) is < 0.1

## Tasks / Subtasks

- [x] Extract Critical CSS (AC: 3)
  - [x] Identify Hero and Nav styles
  - [x] Move into `_includes/critical-css.html` or similar
- [x] Async Loading (AC: 4)
  - [x] Use `media="print" onload="this.media='all'"` pattern for main stylesheet

## Dev Notes

### Architecture & Design System
- **Strategy:** Inline critical, async rest.
- **Tools:** Manual extraction or automated tool (Jekyll plugin usually, but architecture says "Inline critical Nexus styles").

### References
- [Epics: Story 6.1](../planning-artifacts/epics.md#story-61-implement-critical-css-inlining)
- [Architecture: Critical CSS Strategy](../planning-artifacts/architecture.md)
