# Story 6.7: Run Lighthouse CI Validation

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want automated performance validation,
so that performance regressions are caught before deployment (NFR-01).

## Acceptance Criteria

1. **Given** the site must maintain high performance
2. **When** I create `.github/workflows/lighthouse.yml`
3. **Then** Lighthouse CI runs on every pull request
4. **And** mobile score must be > 90 or build fails
5. **And** desktop score must be > 95 or build fails
6. **And** Lighthouse report is saved as CI artifact
7. **And** performance budgets are enforced (FCP < 1s, LCP < 2.5s, TTI < 3s)

## Tasks / Subtasks

- [x] Create Workflow (AC: 2, 3)
  - [x] `.github/workflows/lighthouse.yml`
- [x] Configure LHCI (AC: 4, 5, 7)
  - [x] `lighthouserc.js` configuration
  - [x] Set assertions (Scores > 90/95, budgets enforced)

## Dev Notes

### Architecture & Design System
- **Performance:** Automated gating.
- **Tool:** Google Lighthouse CI Action.

### References
- [Epics: Story 6.7](../planning-artifacts/epics.md#story-67-run-lighthouse-ci-validation)
- [Architecture: Validation](../planning-artifacts/architecture.md)
