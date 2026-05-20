# RETRO UNIX BLOG — MASTER TODO ROADMAP

> Goal: Build a personal blog inspired by 80s–90s Unix systems, FreeBSD aesthetics, terminal interfaces, and hacker culture using mostly pure HTML + CSS with a no-JS philosophy.

---

# GLOBAL PROJECT GOALS

## Primary Goals

* [ ] Create a retro Unix/terminal aesthetic
* [ ] Implement a FreeBSD-inspired visual identity
* [ ] Maintain near-zero JavaScript usage
* [ ] Keep the website extremely lightweight
* [ ] Integrate ASCII art into the UI
* [ ] Build a responsive layout
* [ ] Add dark/light theme support
* [ ] Optimize for readability
* [ ] Keep page load under 1 second
* [ ] Achieve Lighthouse score above 95
* [ ] Support RSS feeds
* [ ] Support Markdown blog workflow
* [ ] Deploy publicly with CI/CD

---

# PHASE 1 — PROJECT INITIALIZATION

## Goal

Create the development environment and define the architecture.

## Dependencies

None

---

## TODO — Repository Setup

* [ ] Create Git repository
* [ ] Create `README.md`
* [ ] Add project description
* [ ] Add project philosophy section
* [ ] Create `.gitignore`
* [ ] Create `LICENSE`
* [ ] Create development branch

---

## TODO — Choose Stack

### Recommended Stack

* [ ] Use static HTML/CSS
* [ ] Use Markdown for blog posts
* [ ] Use Hugo OR pure static HTML
* [ ] Use GitHub Pages deployment

---

## TODO — Define Directory Structure

* [ ] Create root structure

```txt id="2mg0rl"
/
├── index.html
├── about/
├── blog/
├── posts/
├── css/
├── ascii/
├── assets/
├── templates/
├── public/
└── rss/
```

---

## TODO — Define Design Rules

* [ ] Define typography scale
* [ ] Define spacing scale
* [ ] Define border style rules
* [ ] Define ASCII art rules
* [ ] Define layout width
* [ ] Define responsive breakpoints
* [ ] Define color naming conventions
* [ ] Define accessibility standards

---

## TODO — Create Initial Documentation

* [ ] Add setup instructions
* [ ] Add deployment instructions
* [ ] Add folder explanation
* [ ] Add coding standards
* [ ] Add CSS naming conventions

---

# PHASE 2 — HTML FOUNDATION

## Goal

Build the semantic HTML structure for the entire website.

## Dependencies

Phase 1 completed

---

## TODO — Base Layout

* [ ] Create reusable page shell
* [ ] Add semantic HTML tags

  * [ ] `<header>`
  * [ ] `<nav>`
  * [ ] `<main>`
  * [ ] `<section>`
  * [ ] `<footer>`

---

## TODO — Navigation

* [ ] Create terminal-style navbar
* [ ] Add Home link
* [ ] Add Blog link
* [ ] Add About link
* [ ] Add RSS link
* [ ] Add Theme Toggle link
* [ ] Add shell-prompt style UI

Example:

```txt id="iv9yb6"
shane@freebsd:~$
```

---

## TODO — Homepage Structure

* [ ] Create hero section
* [ ] Create intro text
* [ ] Create featured posts section
* [ ] Create latest thoughts section
* [ ] Create ASCII banner area

---

## TODO — Blog Structure

* [ ] Create blog index page
* [ ] Create single post template
* [ ] Create archive page
* [ ] Create category page
* [ ] Create tag page

---

## TODO — About Page

* [ ] Add bio section
* [ ] Add tech interests
* [ ] Add Unix philosophy section
* [ ] Add open-source section
* [ ] Add workstation setup section

---

## TODO — Utility Pages

* [ ] Create 404 page
* [ ] Create sitemap page
* [ ] Create RSS page
* [ ] Create notes/thoughts page

---

# PHASE 3 — CSS ARCHITECTURE

## Goal

Build the entire retro terminal visual system.

## Dependencies

Phase 2 completed

---

## TODO — CSS File Organization

* [ ] Create `reset.css`
* [ ] Create `variables.css`
* [ ] Create `layout.css`
* [ ] Create `typography.css`
* [ ] Create `components.css`
* [ ] Create `themes.css`
* [ ] Create `ascii.css`

---

## TODO — Typography System

* [ ] Select monospace font
* [ ] Add fallback font stack
* [ ] Style headings
* [ ] Style paragraphs
* [ ] Style links
* [ ] Style blockquotes
* [ ] Style code blocks
* [ ] Style inline code

---

## TODO — Color System

### Dark Theme

* [ ] Add terminal-black background
* [ ] Add phosphor-green accent
* [ ] Add amber highlights
* [ ] Add cyan links
* [ ] Add muted gray text

### Light Theme

* [ ] Add paper-style background
* [ ] Add dark terminal text
* [ ] Add retro blue accents
* [ ] Add warm highlight tones

---

## TODO — Layout Styling

* [ ] Create centered content container
* [ ] Add responsive widths
* [ ] Add responsive padding
* [ ] Add mobile typography scaling
* [ ] Add spacing utilities

---

## TODO — Retro Effects

* [ ] Add CRT glow effect
* [ ] Add cursor blink animation
* [ ] Add scanline overlay
* [ ] Add phosphor text glow
* [ ] Add terminal shadow styling

---

# PHASE 4 — ASCII ART SYSTEM

## Goal

Build the visual personality of the site.

## Dependencies

Phase 3 completed

---

## TODO — ASCII Branding

* [ ] Create ASCII site logo
* [ ] Create terminal startup banner
* [ ] Create footer signature
* [ ] Create ASCII loading banner

---

## TODO — ASCII Components

* [ ] Create ASCII borders
* [ ] Create ASCII cards
* [ ] Create ASCII separators
* [ ] Create ASCII menu blocks
* [ ] Create ASCII warning boxes

Example:

```txt id="knpjmb"
+----------------------+
| latest thoughts      |
+----------------------+
```

---

## TODO — FreeBSD-Inspired Styling

* [ ] Add BSD daemon references
* [ ] Add Unix man-page styling
* [ ] Add shell prompt indicators
* [ ] Add terminal-style windows
* [ ] Add retro CLI aesthetics

---

## TODO — Decorative Assets

* [ ] Create terminal icons
* [ ] Create ANSI-style color blocks
* [ ] Create pixel-style separators
* [ ] Create retro status indicators

---

# PHASE 5 — CONTENT SYSTEM

## Goal

Build the blogging workflow and post structure.

## Dependencies

Phase 4 completed

---

## TODO — Markdown Workflow

* [ ] Create Markdown template
* [ ] Add metadata structure
* [ ] Add tag support
* [ ] Add category support
* [ ] Add reading-time support

---

## TODO — Blog Templates

* [ ] Create article layout
* [ ] Create metadata header
* [ ] Create footer navigation
* [ ] Create previous/next post links
* [ ] Create related posts section

---

## TODO — Content Categories

* [ ] Create Unix thoughts section
* [ ] Create FreeBSD notes section
* [ ] Create Linux/kernel section
* [ ] Create networking section
* [ ] Create open-source opinions section
* [ ] Create research notes section

---

## TODO — Initial Posts

* [ ] Write welcome post
* [ ] Write Unix philosophy article
* [ ] Write FreeBSD setup article
* [ ] Write Linux kernel notes
* [ ] Write open-source thoughts article

---

# PHASE 6 — NO-JS THEME TOGGLE

## Goal

Implement dark/light theme switching without JavaScript.

## Dependencies

Phase 5 completed

---

## TODO — Theme Architecture

* [ ] Create CSS variable system
* [ ] Create theme token structure
* [ ] Create dark theme variables
* [ ] Create light theme variables

---

## TODO — Theme Toggle Method

### Option A — CSS Checkbox Hack

* [ ] Create hidden checkbox
* [ ] Create toggle label
* [ ] Use sibling selectors

### Option B — Separate Theme Pages

* [ ] Create `/dark/`
* [ ] Create `/light/`

### Option C — System Theme Detection

* [ ] Use `prefers-color-scheme`

---

## TODO — Toggle UI

* [ ] Create ASCII toggle design

Example:

```txt id="v9xv84"
[ dark_mode: ON ]
```

* [ ] Add hover state
* [ ] Add focus state
* [ ] Add accessibility labels

---

# PHASE 7 — RESPONSIVENESS & ACCESSIBILITY

## Goal

Ensure usability across devices and assistive technologies.

## Dependencies

Phase 6 completed

---

## TODO — Mobile Optimization

* [ ] Optimize navbar
* [ ] Optimize typography
* [ ] Optimize code blocks
* [ ] Optimize ASCII rendering
* [ ] Fix horizontal overflow

---

## TODO — Accessibility

* [ ] Add semantic landmarks
* [ ] Add keyboard navigation
* [ ] Add focus states
* [ ] Add ARIA labels
* [ ] Verify heading hierarchy
* [ ] Verify color contrast

---

## TODO — Browser Compatibility

Test on:

* [ ] Firefox
* [ ] Chromium
* [ ] Safari
* [ ] Android browsers
* [ ] iOS browsers

---

## TODO — Performance

* [ ] Minify CSS
* [ ] Self-host fonts
* [ ] Compress assets
* [ ] Reduce HTTP requests
* [ ] Remove unnecessary dependencies

---

# PHASE 8 — SEO & FEEDS

## Goal

Make the site discoverable and syndication-friendly.

## Dependencies

Phase 7 completed

---

## TODO — SEO

* [ ] Add meta descriptions
* [ ] Add Open Graph tags
* [ ] Add Twitter card tags
* [ ] Add canonical URLs
* [ ] Add sitemap.xml
* [ ] Add robots.txt

---

## TODO — RSS

* [ ] Generate RSS feed
* [ ] Validate feed
* [ ] Add RSS icon
* [ ] Add RSS autodiscovery tag

---

# PHASE 9 — DEPLOYMENT

## Goal

Publish the website publicly.

## Dependencies

Phase 8 completed

---

## TODO — Hosting

Choose one:

* [ ] GitHub Pages
* [ ] Cloudflare Pages
* [ ] Netlify

---

## TODO — Domain

* [ ] Purchase custom domain
* [ ] Configure DNS
* [ ] Enable HTTPS
* [ ] Configure redirects

---

## TODO — CI/CD

* [ ] Add deployment workflow
* [ ] Add automatic build
* [ ] Add production branch
* [ ] Add deployment checks

---

## TODO — Final Validation

* [ ] Test all pages
* [ ] Test all links
* [ ] Validate HTML
* [ ] Validate CSS
* [ ] Run Lighthouse audit
* [ ] Check RSS feed

---

# PHASE 10 — FUTURE ENHANCEMENTS

## Goal

Expand the retro Unix ecosystem later.

---

## TODO — Retro Extensions

* [ ] Add Gopher support
* [ ] Add Gemini capsule
* [ ] Add terminal search
* [ ] Add web ring support
* [ ] Add ANSI color mode
* [ ] Add printable man-page mode

---

## TODO — Advanced Features

* [ ] Add static comments system
* [ ] Add guestbook
* [ ] Add changelog page
* [ ] Add terminal command simulator
* [ ] Add shell-history inspired navigation

---

# FINAL PROJECT CHECKLIST

## Design Goals

* [ ] Feels like a Unix terminal
* [ ] Feels like old BSD systems
* [ ] Minimal and distraction-free
* [ ] Extremely readable
* [ ] Text-first experience

---

## Technical Goals

* [ ] No JavaScript 
* [ ] Fully responsive
* [ ] Accessible
* [ ] Fast loading
* [ ] SEO optimized
* [ ] RSS enabled

---

## Identity Goals

* [ ] Reflects your opinions on tech
* [ ] Reflects your Unix/Linux journey
* [ ] Reflects hacker culture
* [ ] Reflects minimalist philosophy
* [ ] Reflects open-source values

---

## Inspiration References

* Retro Unix culture discussions ([Reddit][1])
* Minimalist Linux workflow inspiration ([unixbhaskar.wordpress.com][2])
* Retro terminal web inspiration ([github.com][3])

[1]: https://www.reddit.com/r/vintageunix/comments/kd10ll/what_do_you_actually_do_with_vintage_unix/?utm_source=chatgpt.com "What do you actually do with vintage Unix? : r/vintageunix"
[2]: https://unixbhaskar.wordpress.com/2021/11/01/minimalist-way-to-run-the-computer-with-linux/?utm_source=chatgpt.com "Minimalist way to run the computer with Linux"
[3]: https://github.com/edhinrichsen/retro-computer-website?utm_source=chatgpt.com "edhinrichsen/retro-computer-website"
