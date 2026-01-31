# Story 1.6: Configure Netlify Deployment

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a site owner,
I want automated deployment to Netlify with CDN distribution,
so that the site is globally accessible with optimal performance.

## Acceptance Criteria

1. **Given** the CI pipeline validates successfully
2. **When** I create `netlify.toml` configuration
3. **Then** build command is set to `jekyll build`
4. **And** publish directory is set to `_site`
5. **And** branch deploys are enabled for preview
6. **And** custom headers are configured for cache control
7. **And** the site deploys automatically on merge to main

## Tasks / Subtasks

- [x] Create Configuration (AC: 2)
  - [x] Create `netlify.toml` (Existing file verified)
- [x] Configure Build Settings (AC: 3, 4)
  - [x] Set command and folder
- [x] Configure Contexts (AC: 5, 7)
  - [x] Production vs Deploy Previews (Using default contexts)
- [x] Configure Headers (AC: 6)
  - [x] Add caching rules

## Dev Notes

### Architecture & Design System
- **Netlify Deployment:** Preferred hosting provider.
- **Configuration:** `netlify.toml` in root.

### References
- [Epics: Story 1.6](../planning-artifacts/epics.md#story-16-configure-netlify-deployment)
### Completion Notes List
- Verified existing `netlify.toml` meets all requirements.
- Configured build command, publish directory, and cache headers.

## File List

- netlify.toml

## Change Log

- 2026-01-30: Verified Deployment configuration.

## Status

review
