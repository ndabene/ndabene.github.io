# Story 1.5: Create Validation Scripts

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want custom validation scripts for Jekyll-specific checks,
so that content quality is enforced automatically.

## Acceptance Criteria

1. **Given** the CI pipeline is configured
2. **When** I create `scripts/validate-frontmatter.rb`
3. **Then** the script validates required frontmatter fields in all posts
4. **And** it checks for valid date formats
5. **And** it validates tag and category values
6. **When** I create `scripts/validate-xml.sh`
7. **Then** the script validates XML structure of feed.xml and sitemap.xml
8. **And** both scripts exit with non-zero code on validation failure

## Tasks / Subtasks

- [ ] Create Frontmatter Validator (AC: 2, 3, 4, 5)
  - [ ] Write Ruby script to parse Frontmatter
  - [ ] Implement validation logic
- [ ] Create XML Validator (AC: 6, 7)
  - [ ] Write Shell script wrapping xmllint or similar

## Dev Notes

### Architecture & Design System
- **Custom Scripts:** Custom Ruby scripts as per architecture.
- **Location:** `scripts/` directory.

### References
- [Epics: Story 1.5](../planning-artifacts/epics.md#story-15-create-validation-scripts)
- [Architecture: Validation](../planning-artifacts/architecture.md)
