# Retro Unix Blog

Personal website and blog for Shane Cardoz, built as a lightweight static site with a retro Unix and FreeBSD-inspired visual language.

## Philosophy

This project is intentionally simple:

- Static HTML first
- CSS for presentation and theming
- Near-zero JavaScript
- Text-first content
- Fast load times
- Readable source structure

The goal is not to recreate a terminal literally. The goal is to build a personal site that borrows the restraint, density, and clarity of older Unix systems while still reading well on modern browsers and small screens.

## Stack Decision

Phase 1 locks the project to a plain static-site approach:

- HTML for pages
- CSS for layout, typography, themes, and retro styling
- Markdown files in `posts/` as source material for articles
- GitHub Pages for deployment

For the MVP, published pages are maintained as static HTML. Markdown source files are kept so the project can move to a generator later if the writing workflow outgrows hand-authored HTML.

## Current Structure

```text
/
├── index.html
├── about.html
├── blog/
├── posts/
├── css/
├── ascii/
├── assets/
├── templates/
├── public/
├── rss/
├── TODO.md
├── README.md
└── LICENSE
```

## Folder Guide

- `index.html`: homepage
- `about.html`: about page
- `blog/`: blog index and published post pages
- `posts/`: Markdown source drafts and post source files
- `css/`: global stylesheet(s)
- `ascii/`: reusable ASCII art snippets and branding assets
- `assets/`: images, icons, fonts, and other static media
- `templates/`: reusable HTML skeletons or reference snippets
- `public/`: optional generated output if a build step is introduced later
- `rss/`: feed-related files

## Development

There is no build step yet.

Open the HTML files directly in a browser during early development, or serve the repo with any small static file server when relative-path testing matters.

Example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Coding Standards

- Use semantic HTML.
- Keep markup shallow and readable.
- Prefer plain CSS over tooling unless a real maintenance problem appears.
- Default to ASCII content and source files.
- Avoid JavaScript unless there is no clean HTML/CSS alternative.
- Keep decorative effects subordinate to readability.

## CSS Conventions

- Use lowercase class names.
- Prefer descriptive names tied to layout or component purpose.
- Keep theme values in CSS custom properties.
- Avoid one-off inline styles.
- Group related rules together: tokens, layout, typography, components, utilities.

Suggested naming pattern:

- Layout: `site-header`, `content-shell`, `page-section`
- Components: `prompt-nav`, `post-card`, `ascii-block`
- Utilities: `visually-hidden`, `stack`, `cluster`

## Deployment Plan

Target deployment is GitHub Pages from the repository after the base pages and feed are in place.

## Next Phase

Phase 2 should build a shared page shell across:

- `index.html`
- `about.html`
- `blog/index.html`
- at least one real post page
