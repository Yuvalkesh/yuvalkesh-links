# yuvkesh — links page + SEO blog

Personal links page (Linktree alternative) + git-based blog for Yuval Keshtcher.
Live: https://yuvkesh.onrender.com

## Stack
- [Astro 5](https://astro.build) static build — pure HTML, best-case SEO
- Articles = markdown files in `src/content/blog/` (git is the CMS)
- Deployed as a **free Render static site** (`render.yaml`); every `git push` to `main` auto-builds and deploys

## Publish an article
Create `src/content/blog/my-slug.md`:

```markdown
---
title: "Article title"
description: "Up to 160 chars, used for meta description + OG."
pubDate: 2026-06-10
lang: he            # 'he' (RTL) or 'en' (LTR)
tags: ["tag1"]
# optional:
# updatedDate: 2026-06-12
# ogImage: /images/my-image.jpg
# draft: true
# canonical: https://original-source.com/post
# translationOf: my-slug-en   # slug of the paired-language version (adds hreflang)
---

Article body in markdown.
```

Then `git add -A && git commit && git push`. Live at `/blog/my-slug/` within ~1 minute.

Every article automatically gets: meta title/description, canonical, Open Graph + Twitter cards, JSON-LD Article schema, correct `lang`/`dir`, sitemap + RSS entries.

## Develop
```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve dist/ locally
```

## SEO endpoints
- `/sitemap-index.xml` (submit to Google Search Console)
- `/rss.xml`
- `/robots.txt`
