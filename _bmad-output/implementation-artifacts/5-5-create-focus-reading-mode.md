Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a reader,
I want minimal UI distractions when reading articles,
so that I can focus on the content.

## Acceptance Criteria

1. **Given** a visitor is reading an article
2. **When** I style the article layout
3. **Then** navigation becomes more subtle during scroll (Handled via progressive dock)
4. **And** sidebar elements (if any) are hidden on mobile
5. **And** article content is the primary visual focus
6. **And** UI elements fade in only when needed (scroll to top button)

## Tasks / Subtasks

- [x] Navigation Behavior (AC: 3)
  - [x] Verified progressive dock behavior supports focus
- [x] UI Cleanup (AC: 4, 5)
  - [x] Optimized post layout for focus
- [x] Utility Buttons (AC: 6)
  - [x] Implemented `#nexus-back-to-top` with scroll logic

## File List

- assets/css/nexus.css
- assets/js/nexus/state.js
- _includes/footer.html

## Change Log

- 2026-01-31: Implemented focus reading mode with refined post layout and scroll-to-top utility.

## Dev Agent Record

### Completion Notes
- Integrated a floating scroll-to-top button that appears after 500px scroll.
- Refined the post layout to eliminate distractions and center the reading experience.
- Leveraged the existant progressive dock for a subtle, focus-oriented navigation.
- Ensured mobile guard for back-to-top button to avoid overlapping footer nav.
