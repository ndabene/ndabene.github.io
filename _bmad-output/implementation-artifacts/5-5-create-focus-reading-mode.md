# Story 5.5: Create Focus Reading Mode

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a reader,
I want minimal UI distractions when reading articles,
so that I can focus on the content.

## Acceptance Criteria

1. **Given** a visitor is reading an article
2. **When** I style the article layout
3. **Then** navigation becomes more subtle during scroll
4. **And** sidebar elements (if any) are hidden on mobile
5. **And** article content is the primary visual focus
6. **And** UI elements fade in only when needed (scroll to top button)

## Tasks / Subtasks

- [ ] Navigation Behavior (AC: 3)
  - [ ] Nav might retract or become transparent (already covered in Epic 3 progressive dock, here we verify it supports reading mode).
- [ ] UI Cleanup (AC: 4, 5)
  - [ ] Hide sidebars, minimize footer distractions.
- [ ] Utility Buttons (AC: 6)
  - [ ] Implement scroll-to-top button appearing after scroll.

## Dev Notes

### Architecture & Design System
- **Focus:** Content first.
- **Interactions:** Subtle transitions.

### References
- [Epics: Story 5.5](../planning-artifacts/epics.md#story-55-create-focus-reading-mode)
- [UX Design: Focus Management](../planning-artifacts/ux-design-specification.md)
