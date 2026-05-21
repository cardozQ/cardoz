# Posts

Markdown source files for blog posts live here.

Published HTML pages live in `blog/`.

## Workflow

1. Copy `posts/_template.md`.
2. Fill in the front matter.
3. Write the article body in Markdown.
4. Publish the post as a matching HTML page in `blog/`.
5. Add the post to:
   - `blog/index.html`
   - `index.html` if it should appear on the homepage
   - `rss/feed.xml`
   - `sitemap.html`
   - `sitemap.xml`

## Front Matter

Required fields:

- `title`
- `slug`
- `date`
- `summary`
- `description`
- `category`
- `tags`
- `reading_time`
- `published`

Use ISO dates: `YYYY-MM-DD`.

The `slug` should match the published HTML filename in `blog/`.
