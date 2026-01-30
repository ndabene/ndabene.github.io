# Story 5.4: Implement Syntax Highlighting for Code

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a technical reader,
I want code snippets to be beautifully highlighted,
so that I can understand code examples easily.

## Acceptance Criteria

1. **Given** articles contain code blocks
2. **When** I create `_includes/nexus/code-block.html`
3. **Then** code blocks include filename header and language badge
4. **And** syntax highlighting matches the Deep Slate color palette
5. **And** code uses JetBrains Mono font
6. **And** "Copy to Clipboard" button is included
7. **And** code blocks have proper contrast for WCAG AA (NFR-04)

## Tasks / Subtasks

- [ ] Syntax Highlighting Theme (AC: 4, 7)
  - [ ] Configure Rogue (Jekyll default) or PrismJS/HighlightJS (Architecture implies Vanilla JS, so maybe Prism lightweight or compile-time Rogue with CSS). *Jekyll uses Rogue by default.* Create custom CSS for Rogue classes.
- [ ] Code Component Container (AC: 3, 6)
  - [ ] Wrap code output in container with header
  - [ ] Add copy button JS

## Dev Notes

### Architecture & Design System
- **Highlighting:** Use Jekyll's Rogue for generation, style with CSS.
- **Interactions:** Vanilla JS for copy button.
- **Font:** JetBrains Mono.

### References
- [Epics: Story 5.4](../planning-artifacts/epics.md#story-54-implement-syntax-highlighting-for-code)
- [UX Design: Code Block](../planning-artifacts/ux-design-specification.md)
