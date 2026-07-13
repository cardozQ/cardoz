# Redesign: Two-Panel Split Layout with Terminal Sidebar

Reference: https://www.welcome-to-the-sunny-side.com/home.html

## Phase 1: CSS Foundation

### 1a. Variables (`css/variables.css`)
- Shift accent from green `#63f28d` to teal `#64ffda`
- Update `--glow` to `rgba(100, 255, 218, 0.18)`
- Update `--accent-dim` to dark teal
- Add `--sidebar-width: 22rem`
- Keep spacing scale, content-width, measure, radius

### 1b. Themes (`css/themes.css`)
- Update light theme accent to teal-compatible dark color
- Reduce scanline opacity for cleaner look
- Update `::selection` to teal accent
- Use subtle teal glow instead of green radial glow
- Keep CSS-only radio toggle mechanism

### 1c. Layout (`css/layout.css`) — full rewrite
- Full viewport height two-panel grid
- Desktop: `grid-cols [1fr auto]` (content + sidebar)
- Mobile: `grid-cols [1fr]` (content only, sidebar hidden)
- Content panel: scrollable, full height
- Sidebar panel: fixed width `--sidebar-width`, full height
- Mobile breadcrumb bar: fixed top, `~` home link + page path
- Remove old `.site-shell` centered-column pattern

### 1d. Components (`css/components.css`) — major rewrite
- Breadcrumb bar styling (mobile top bar)
- Sidebar panel styling (desktop terminal)
- `.sidebar-toggle` collapse/expand button
- `.terminal-nav`, `.terminal-link` styles
- `.terminal-output` content area
- Theme toggle as icon button (☾ / ☀)
- Keep card/list styles, simplify

### 1e. Typography (`css/typography.css`)
- Keep monospace font stack
- Update link hover to teal
- Clean prose styles (reference: `prose prose-invert`)
- Adjust heading sizes if needed

### 1f. ASCII (`css/ascii.css`) — simplify
- Remove: `.ascii-window`, `.ascii-menu`, `.ascii-warning`, `.ascii-block`
- Keep: `.ascii-separator`, `.ascii-footer-signature` (minimal)

---

## Phase 2: Homepage (`index.html`)

New skeleton:
```
<body>
  skip-link
  theme radio inputs (hidden)
  .breadcrumb-bar (mobile)
  .content-panel (main)
  .sidebar (desktop terminal)
</body>
```

- Hero section with name + description
- Contents listing (clean links, no ASCII menus)
- Blog status section
- Site status section
- Sidebar: site nav, file tree, theme toggle

---

## Phase 3: About Page (`about.html`)

- Remove ASCII window blocks (profile, workstation)
- Convert to clean prose sections
- Keep: Bio, Tech Interests, Unix Philosophy, Open Source, Workstation Setup
- Use plain text/ lists instead of ASCII boxes
- Sidebar: `whoami` output, nav links

---

## Phase 4: Blog Pages

### `blog/index.html`
- Clean post listing (empty state message)
- Remove ASCII sub-menu
- Sidebar: `ls` output, post count

### `blog/archive.html`
- Simple chronological list (empty state)
- Remove old header/nav pattern

### `blog/categories.html`
- Simple category list (empty state)

### `blog/tags.html`
- Simple tag list (empty state)

---

## Phase 5: Utility Pages

### `404.html`
- Simple centered error message
- No ASCII warning block
- Link back to home

### `sitemap.html`
- Clean link list
- No ASCII decoration

### `rss.html`
- Feed info page
- No ASCII window block

---

## Phase 6: Post Template (`templates/post-template.html`)

- Update to new skeleton with sidebar
- Clean post layout: header, meta, lead, body, footer, nav
- Remove ASCII window from post header
- Sidebar: TOC or file metadata

---

## Phase 7: Testing

- Serve locally: `python3 -m http.server 8000`
- Check every page renders correctly
- Test responsive behavior (desktop sidebar, mobile breadcrumb)
- Test theme toggle (dark/light switching)
- Verify all links work
- Check accessibility (skip link, aria labels, focus states)
