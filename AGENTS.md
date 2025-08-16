---
title: Repository Guidelines
sitemap: false
---

# Repository Guidelines

## Project Structure & Module Organization
- Root contains site content (HTML/Markdown) and config files. Common folders: `/assets/` (images, fonts), `/css/` and `/js/` (styles/scripts), and `/images/`.
- If present, `/src/` holds source files that are built into the public site; `/dist/` or `/_site/` holds build output (do not edit by hand).
- Tests, when present, live under `/tests/` or `/spec/`. Example: `/tests/homepage.spec.js`.

## Build, Test, and Development Commands
- Node-based workflow (if `package.json` exists):
  - `npm install`: install dependencies.
  - `npm run dev`: start local dev server with hot reload.
  - `npm run build`: produce optimized production build into `/dist/`.
  - `npm test`: run unit/integration tests.
- Jekyll-based workflow (if `_config.yml` and `Gemfile` exist):
  - `bundle install`: install Ruby gems.
  - `bundle exec jekyll serve --livereload`: run site locally at `http://127.0.0.1:4000`.
  - `bundle exec jekyll build`: generate static site into `/_site/`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for HTML/CSS/JS/Markdown/YAML.
- Filenames: kebab-case for pages/assets (e.g., `about-me.md`, `site-header.css`).
- JavaScript: camelCase for variables/functions, PascalCase for components/classes.
- CSS/SCSS: use BEM-style classes (e.g., `.hero__title--large`).
- Run formatters/linters if configured: `npm run lint`, `npm run format` or `bundle exec rubocop`.

## Testing Guidelines
- Prefer small, fast tests close to the code. Name tests `*.spec.ts|js` (Node) or `*_spec.rb` (Ruby).
- Run locally via `npm test` or `bundle exec rake test` (if defined). Aim for meaningful coverage of templates, helpers, and critical pages.

## Commit & Pull Request Guidelines
- Commits: follow Conventional Commits where possible (e.g., `feat: add homepage hero`, `fix: correct nav aria labels`). Keep commits focused and descriptive.
- PRs: include a clear summary, linked issues (e.g., `Closes #123`), screenshots for visual changes, and steps to verify locally. Ensure CI/lint/tests pass.

## Security & Configuration Tips
- Do not commit secrets or API keys. Use `.env.local` (git-ignored) when needed.
- Avoid committing build output (e.g., `/_site/`, `/dist/`) and local dependencies (`/node_modules/`).
- For GitHub Pages, the default branch content is served; when using a builder, ensure the output dir is correctly configured in project settings.
