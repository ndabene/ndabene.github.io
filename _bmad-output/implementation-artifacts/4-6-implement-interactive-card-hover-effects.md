# Story 4.6: Implement Interactive Card Hover Effects

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a desktop visitor,
I want cards to respond to my cursor with glow effects,
so that I know which card I'm about to click.

## Acceptance Criteria

1. **Given** the blog cards are styled
2. **When** I add hover effects to `_sass/nexus/_cards-nexus.scss`
3. **Then** cursor-following radial glow appears on hover (desktop only)
4. **And** card border transitions from transparent to gold
5. **And** card scales up by 2% on hover
6. **And** hover effects are disabled on touch devices
7. **And** hover response time is < 50ms (NFR-03)

## Tasks / Subtasks

- [ ] Border & Scale (AC: 4, 5)
  - [ ] CSS `:hover` states
- [ ] Radial Glow (AC: 3)
  - [ ] JS needed to track cursor within card (x,y) and update CSS variables (`--mouse-x`, `--mouse-y`)
  - [ ] Add event listener in `parallax.js` or new `interactions.js`
- [ ] Mobile Guard (AC: 6)
  - [ ] `@media (hover: hover)`

## Dev Notes

### Architecture & Design System
- **Interactive Glow:** "Interactive Glow Pattern" from UX doc.
- **Technique:** `mousemove` on card sets `--x`, `--y`. CSS `radial-gradient` uses these vars.

### References
- [Epics: Story 4.6](../planning-artifacts/epics.md#story-46-implement-interactive-card-hover-effects)
- [UX Design: Interactive Glow](../planning-artifacts/ux-design-specification.md)
