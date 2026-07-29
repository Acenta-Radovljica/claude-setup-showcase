# Platform Specification: Blog Articles

> The canonical long form content format on your website. Covers article structure, section design, visual components, SEO requirements, and quality standards. Platform agnostic: works with Markdown blogs, CMS platforms, or custom renderers.

References: [[voice/brand-voice]], [[voice/anti-patterns]], [[quality/calibration]], [[quality/hormozi-standard]], [[workflows/image-generation]], [[config.md]]

---

## What It Is

A blog article is the deepest content format in your content system. It is the canonical version of an idea, optimized for search, designed for thorough reading, and structured for repurposing across other platforms ([[platforms/x-article]], [[platforms/linkedin-article]], [[platforms/linkedin-post]], [[platforms/x-post]]).

Blog articles serve the audience defined in [[audience/]] and are written in the language configured for your website in [[config.md]].

---

## Article Metadata

Regardless of your blog platform (Markdown files, CMS, TypeScript data files, database entries), every article needs these fields:

| Field | Description |
|-------|-------------|
| **Slug** | URL path segment. Kebab case, unique, descriptive, keyword rich. |
| **Title** | Display title. Can be long and provocative. This is not the SEO title. |
| **Description** | 1 to 2 sentences shown in the hero section and listing cards. |
| **Author** | Name and optional role. |
| **Published date** | YYYY-MM-DD format. Used in structured data. |
| **Last updated** | YYYY-MM-DD format. Update when content changes. Used in structured data. |
| **Reading time** | Integer (minutes). Calculate based on ~200 words per minute. |
| **Category** | Free text label displayed as a badge (e.g., "AI Strategy", "Tools", "Workflow"). |
| **Tags** | Kebab case strings for categorization and related content. |
| **Cover image** | Optional. Used on listing page cards and social sharing. |
| **SEO title** | Format: "Title | Your Blog Name". Under 60 characters ideal. |
| **SEO description** | Under 160 characters. Include primary keyword naturally. |

Adapt these fields to your platform's data format (frontmatter, CMS fields, TypeScript objects, database columns).

---

## Content Structure

### Opening Section

The first 2 to 3 paragraphs orient the reader and establish the article's thesis. Start with a specific observation, situation, or problem the reader recognizes. State what the article will cover and what the reader will know by the end.

### Table of Contents

For articles over 1,500 words, include a table of contents. Many blog platforms generate this automatically from headings. If yours does not, create a manual TOC at the top.

### Body Sections

Use H2 headers for main sections and H3 for subsections. Never skip heading levels (H2 to H4 without an H3 between them).

Each section should:

- **Open** with 1 to 2 sentences stating the section's key point
- **Develop** the point with evidence, examples, specific details, or practical explanation
- **Ground** the point in something the reader can relate to or act on

Sections should be self-contained enough that a reader who skips to one section still gets value.

### Visual Components

Break up long text with visual elements. Effective types include:

- **Comparison tables:** Feature by feature, before/after, tool A vs tool B
- **Stat callouts:** Big numbers or key metrics that summarize a section's point
- **Process steps:** Numbered sequential workflows
- **Callout boxes:** Tips, warnings, important notes that should stand out
- **Charts or diagrams:** When data or process flows are central to the argument
- **Screenshots:** Real tool interfaces with annotations when discussing specific tools

Keep visual components consistent in style. If your blog platform supports custom HTML components, build a small library of reusable patterns (grids, cards, comparison tables, callouts) and apply them consistently across articles.

### Closing Section

End with a thought that gives the reader something to take away. Options:

- A practical next step the reader can act on today
- A reframe that puts the article's thesis in a new light
- A forward looking observation about where the topic is heading

Do not end with a hard sell. If you want to mention your product or service, keep it soft: one sentence that connects naturally to the article's topic, or simply link to a relevant page. The article's value should stand on its own.

---

## Images

- **Format:** WebP preferred for web performance. Fall back to PNG for images that need transparency or maximum quality.
- **Naming:** SEO friendly, descriptive filenames. Example: `ai-coding-tool-comparison-chart.webp`, not `img-003.webp`.
- **Alt text:** Every image needs descriptive alt text. This is both an accessibility requirement and an SEO signal.
- **Brand logos:** When referencing tools or companies, always use the official logo from the company's website, GitHub, or press kit. Never generate brand logos with AI.
- **AI generated images:** If you use AI image generation, review outputs carefully. Remove any watermarks. Ensure the image adds genuine information or context, not just decoration.
- **Cover image:** If your platform supports cover images, use a relevant image that works at landscape (article header) and square (social sharing card) crops.

---

## SEO Checklist

| Element | Requirement |
|---------|-------------|
| SEO title | Under 60 characters. Include primary keyword. Format: "Title \| Your Blog". |
| SEO description | Under 160 characters. Include primary keyword naturally. |
| Open Graph title | Use the article's display title (not the SEO title). |
| Open Graph type | "article" |
| Open Graph dates | `publishedTime` and `modifiedTime` from article dates. |
| Structured data | Article and BreadcrumbList JSON-LD. Most CMS platforms handle this. If yours does not, add it manually. |
| Image alt text | Every image has descriptive alt text. |
| Heading hierarchy | H2 for main sections, H3 for subsections. Never skip levels. |
| URL | Descriptive, keyword rich slug. |

---

## Repurposing Strategy

Blog articles are the source of truth for ideas. Other platforms get derivative content:

| Derivative Format | What Changes | Reference |
|-------------------|-------------|-----------|
| X Article | Different angle, more technical/opinionated, different audience | [[platforms/x-article]] |
| LinkedIn Article | Different audience framing, localized examples, consequence driven | [[platforms/linkedin-article]] |
| X Short Post | One insight extracted, compressed to under 500 chars | [[platforms/x-post]] |
| LinkedIn Post | One insight reframed for business audience | [[platforms/linkedin-post]] |
| LinkedIn Carousel | Key points turned into visual slide sequence | [[platforms/linkedin-carousel]] |

The repurposing rules in [[engine/repurpose-rules]] ensure each derivative feels like native content for its platform, not a reformatted blog post.

---

## Writing Standards

Every article must pass these checks before being considered complete:

1. **Voice:** Follow [[voice/brand-voice]]. The tone should feel like a knowledgeable peer sharing honest results, not a guru selling systems.
2. **Anti-patterns:** Review [[voice/anti-patterns]]. No hype words, no dramatic fragment pairs, no dashes as punctuation, no fabricated statistics.
3. **Philosophy alignment:** If you have a [[philosophy]] or brand principles document, verify the article is consistent with your stated positions.
4. **Copy review:** Have a final review pass focused on clarity, flow, and engagement. If you have a copywriting agent or editor, use them.
5. **Calibration:** Run [[quality/calibration]] checks. Does the content meet your quality bar?
6. **Value test:** Run [[quality/hormozi-standard]] or equivalent: would your target reader pay for this content? If not, it needs more depth.

---

## Platform-Specific Notes

This specification is intentionally platform agnostic. Below are notes for common blog platforms:

### Markdown (Hugo, Jekyll, Astro, Eleventy, etc.)

- Content lives as `.md` files with YAML or TOML frontmatter
- Visual components can be shortcodes, MDX components, or raw HTML
- TOC is often auto-generated from headings via a plugin or template

### CMS (WordPress, Ghost, Sanity, Contentful, etc.)

- Content lives in the CMS database with structured fields
- Visual components are usually block types or custom embeds
- SEO fields are often handled by plugins (Yoast, RankMath, etc.)

### Custom Renderer (Next.js, Nuxt, SvelteKit, etc.)

- Content can live as TypeScript data objects, MDX files, or fetched from an API
- Visual components can be React/Vue/Svelte components or raw HTML
- You control the full rendering pipeline, so you can build exactly the component library you need
- Be aware of CSS scoping: if your content uses `dangerouslySetInnerHTML` or equivalent, Tailwind utility classes may not work inside the rendered content unless they are referenced elsewhere in your codebase. Use scoped CSS or a global stylesheet for visual components.

Adapt the metadata fields, image paths, and component patterns to match your specific platform.

---

## Assembly Checklist

When an article is ready, verify these items before publishing:

1. All metadata fields are populated (slug, title, description, author, dates, reading time, category, tags, SEO fields)
2. All images are optimized (WebP format, descriptive filenames, alt text on every image)
3. All brand logos are sourced from official sources (never AI generated)
4. Visual components are styled consistently with your existing article designs
5. TOC or section navigation works correctly
6. The article renders correctly at desktop, tablet, and mobile widths
7. Structured data validates (check with Google's Rich Results Test)
8. SEO title under 60 characters, SEO description under 160 characters
9. All links in the article are valid
10. The article has been reviewed against [[voice/anti-patterns]] and [[quality/calibration]]
