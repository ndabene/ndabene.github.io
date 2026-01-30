# Story 6.6: Implement Complete Focus Management

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a keyboard-only user,
I want clear visual feedback when navigating with keyboard,
so that I always know where I am on the page.

## Acceptance Criteria

1. **Given** the site must be keyboard accessible
2. **When** I implement focus styles across all components
3. **Then** all interactive elements have high-visibility Gold focus rings
4. **And** focus indicators are never hidden with `outline: none`
5. **And** focus order is logical throughout the page
6. **And** "Skip to Content" link is first focusable element
7. **And** modal traps focus when open

## Tasks / Subtasks

- [ ] Global Focus Style (AC: 3, 4)
  - [ ] `*:focus-visible` in `_reset.scss` or `_base.scss`
- [ ] Modal Focus Trap (AC: 7)
  - [ ] Implement JS trap loop for modals
- [ ] Skip Link (AC: 6)
  - [ ] Verify existence (from Story 3.5)

## Dev Notes

### Architecture & Design System
- **Accessibility:** Consistent focus state.
- **Style:** Gold ring (`box-shadow` or `outline`).

### References
- [Epics: Story 6.6](../planning-artifacts/epics.md#story-66-implement-complete-focus-management)
- [UX Design: Focus Management](../planning-artifacts/ux-design-specification.md)
