# Story 1.4: Create GitHub Actions CI Pipeline

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want automated validation of content integrity,
so that broken deployments are prevented (FR-07).

## Acceptance Criteria

1. **Given** the project needs automated quality gates
2. **When** I create `.github/workflows/ci.yml`
3. **Then** the workflow runs on push to main and on pull requests
4. **And** yamllint validates all YAML frontmatter
5. **And** xmllint validates RSS and sitemap XML files
6. **And** Jekyll build is executed and must succeed
7. **And** the workflow blocks merge if any validation fails (NFR-07)

## Tasks / Subtasks

- [ ] Create Workflow File (AC: 2, 3)
  - [ ] Define triggers (push, pull_request)
- [ ] Implement Linters (AC: 4, 5)
  - [ ] Add job for yamllint
  - [ ] Add job for xmllint
- [ ] Implement Build Check (AC: 6)
  - [ ] Add job for `jekyll build`
- [ ] Branch Protection (AC: 7)
  - [ ] Ensure workflow failure blocks merge (note: this is a GitHub repo setting, but workflow must report status)

## Dev Notes

### Architecture & Design System
- **GitHub Actions Validation:** Part of the CI/CD strategy.
- **Dependencies:** GitHub Actions ecosystem.

### References
- [Epics: Story 1.4](../planning-artifacts/epics.md#story-14-create-github-actions-ci-pipeline)
- [Architecture: CI/CD](../planning-artifacts/architecture.md)
