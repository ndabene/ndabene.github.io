# Story 1.5: Create Validation Scripts

Status: review

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

- [x] Create Frontmatter Validator (AC: 2, 3, 4, 5)
  - [x] Write Ruby script to parse Frontmatter (Using existing `validate_frontmatter.rb`)
  - [x] Implement validation logic
- [x] Create XML Validator (AC: 6, 7)
  - [x] Write Shell script wrapping xmllint or similar (Created `validate-xml.sh`)

## Dev Notes

### Architecture & Design System
- **Custom Scripts:** Custom Ruby scripts as per architecture.
- **Location:** `scripts/` directory.

### References
- [Epics: Story 1.5](../planning-artifacts/epics.md#story-15-create-validation-scripts)
### Completion Notes List
- Confirmed `validate_frontmatter.rb` exists and covers requirements.
- Created `scripts/validate-xml.sh` for sitemap/feed checks.
- Registered script in `package.json` as `validate:xml`.
- Updated CI to use new script.

## File List

- scripts/validate_frontmatter.rb
- scripts/validate-xml.sh
- package.json
- .github/workflows/ci.yml

## Change Log

- 2026-01-30: Added XML validation script and registered in package.json.

## Status

review
