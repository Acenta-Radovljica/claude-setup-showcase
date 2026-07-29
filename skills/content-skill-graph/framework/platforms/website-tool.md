# Platform Specification: Product/Service Review Pages

> Structured review and resource pages on your website. Covers tools, services, products, or any entity that benefits from a detailed, data-driven page with sections, pricing, comparisons, and visual blocks. Platform agnostic.

References: [[voice/brand-voice]], [[voice/anti-patterns]], [[quality/calibration]], [[config.md]]

---

## What It Is

A product/service review page is a structured, in-depth resource page on your website. Unlike a blog article (which is narrative and time-stamped), a review page is an evergreen reference: it covers what a tool or product is, what it costs, how it compares to alternatives, who it is best for, and how to get started.

These pages serve people who are actively evaluating options. The reader has search intent: they want to understand a specific tool or service before making a decision. Your page should be the most useful, honest, and complete resource they find.

Common names for this format include: tool review page, product page, resource page, comparison page, hub page, directory entry, or listing page. The underlying structure is the same regardless of what you call it.

---

## Page Data Structure

Regardless of your platform (CMS, TypeScript data files, Markdown, database), each review page needs these categories of information:

### Identity Fields

| Field | Description |
|-------|-------------|
| **Slug** | URL path segment. Kebab case, unique, matches the product/service name. |
| **Name** | Official product or service name. Use the name the company uses. |
| **Tagline** | One to two sentence summary of what it does and why it matters. Specific and factual, not marketing fluff. |
| **Company/Maker** | Who makes this. Link to the company's page if you have one. |
| **Category** | The type of product (e.g., "chatbot", "coding tool", "analytics", "CRM", "design tool"). Define categories that make sense for your domain. |
| **Icon/Logo** | The official logo. Source from the company's website, GitHub, or press kit. Never generate logos with AI. |

### Content Fields

| Field | Description |
|-------|-------------|
| **What It Is** | A paragraph explaining what the product is, when it was released, what it does, and how it fits into the landscape. Written as a factual overview, not marketing copy. |
| **Key Features** | Array of features, each with a short name, a 1 to 2 sentence description, and optionally a link to a deeper section on the page. Aim for 6 to 12 features. |
| **Pricing** | All publicly available pricing tiers. Include tier name, price, billing interval, per user or flat, description, and included features. Mark the recommended tier if applicable. |
| **API/Usage Pricing** | If the product has usage-based pricing (per API call, per token, per GB), document it here with specific rates. |
| **Best For** | 3 to 6 specific descriptions of who benefits most. Be specific about the user type and scenario, not generic. |
| **Pros** | 5 to 8 specific, factual advantages. Avoid vague praise. Each pro should contain enough detail to be useful. |
| **Cons** | 3 to 6 honest limitations, gotchas, or tradeoffs. Credibility comes from being willing to state real drawbacks. |
| **Getting Started** | 3 to 5 numbered steps for a new user to go from zero to productive. Include links to official docs, signup pages, etc. |
| **Deep Dive Sections** | The main content areas (see below). |
| **External Links** | Links to the official site, documentation, pricing page, blog, and other relevant resources. Categorize by type. |

### Metadata Fields

| Field | Description |
|-------|-------------|
| **Last Updated** | YYYY-MM-DD. Update whenever page data is revised. |
| **Related Items** | Slugs of related products/services that appear in a "Related" section. Usually 3 to 6. |
| **Tags** | Kebab case tags for search and categorization. |
| **SEO Title** | Under 60 characters. Format: "Product Name Review [Year]: Brief Description \| Your Site". |
| **SEO Description** | Under 160 characters. Include key features, pricing range, and differentiator. |

---

## Deep Dive Sections

Deep dive sections are the main content areas of the review page. They appear as expandable, scrollable, or tabbed sections below the overview. Each section has its own anchor for direct linking.

### Section Structure

Each section needs:

| Field | Description |
|-------|-------------|
| **ID** | Kebab case anchor. Example: "what-it-does", "pricing", "vs-competitors". |
| **Title** | Section heading. |
| **Content** | HTML or Markdown content with paragraphs, lists, and subheadings. |
| **Visual Blocks** | Optional structured data objects rendered as interactive components (charts, comparisons, stat callouts). |
| **Summary** | Optional one sentence summary for collapsed/preview state. |

### Common Section Patterns

These section topics appear frequently across review pages:

| Section | Purpose | Typical Content |
|---------|---------|------------------|
| What It Does | Core functionality explained | Architecture, key capabilities, how it works |
| Pricing Analysis | Detailed pricing breakdown | Tier comparisons, hidden costs, value assessment |
| Competitors / Comparison | Feature by feature comparison | Named alternatives with honest assessment |
| Use Cases / Scenarios | Practical applications | Specific workflow examples with before/after context |
| Ecosystem / Integrations | What it works with | Compatible tools, platforms, APIs |
| Getting Deeper | Advanced features | In depth look at power user capabilities |

---

## Visual Blocks

Visual blocks are structured data that your page renderer converts into styled, interactive components. They are not images; they are data-driven UI elements.

### Common Block Types

| Type | Purpose | When to Use |
|------|---------|-------------|
| **Stat Callout** | Big numbers with labels | When you have 2 to 4 impressive metrics (speed, adoption, pricing) |
| **Comparison Table** | Side by side feature comparison | Feature by feature tool comparisons. Highlight the reviewed product. |
| **Feature Cards** | Grid of icon + title + description | Listing capabilities, integrations, or platform availability |
| **Process Steps** | Numbered sequential steps | Onboarding flows, setup guides, workflows |
| **Callout** | Info/tip/warning accent card | Important notes, tips, warnings, editorial commentary |
| **Bar/Column Chart** | Quantitative comparison | Performance benchmarks, pricing comparisons, adoption data |
| **Timeline** | Connected events in sequence | Product history, release timeline, roadmap |
| **Radar Chart** | Multi-axis comparison | Speed vs quality vs price vs ecosystem comparisons |

### Block Selection Guidelines

- Use stat callouts when you have impressive numbers that summarize a point
- Use comparison tables (not prose) for feature by feature comparisons
- Use feature cards for listing things with icons (capabilities, integrations, platforms)
- Use process steps for anything sequential (setup, onboarding, workflows)
- Use callouts for editorial commentary that should visually stand out from content
- Use charts only when quantitative data is central to the argument

How you implement these blocks depends on your platform. They could be React/Vue/Svelte components, shortcodes, custom HTML elements, or CMS block types. The important thing is having a consistent library that you reuse across pages.

---

## Company/Maker Pages

If your site has a directory of products, you may also want company pages that group multiple products by the same maker.

A company page typically includes:

| Field | Description |
|-------|-------------|
| **Slug** | Kebab case. |
| **Name** | Official company name. |
| **Tagline** | One sentence company description. |
| **Website** | Primary URL. |
| **Founded** | Year. |
| **Logo** | Path to official logo file. |
| **Overview** | Paragraph about the company. |
| **What Makes Them Different** | Paragraph on unique positioning. |
| **Product Slugs** | References to products by this company on your site. |
| **Links** | External links (website, blog, press). |
| **SEO Fields** | Title and description for search. |

---

## Icons and Logos

### Requirements

1. **Must be the official logo.** Source from the company's website, GitHub, or press kit. Never generate logos with AI.
2. **Format:** SVG preferred for vector logos. PNG acceptable for logos only available as raster. Use transparent backgrounds.
3. **Naming:** Kebab case matching the product slug.
4. **Size:** SVGs should have a reasonable viewBox. PNGs should be at least 64x64 pixels.

### Where to Find Official Logos

1. The company's press/brand page (most reliable)
2. The company's GitHub organization (often has logos in repos or READMEs)
3. The company's favicon or app icon (as a fallback)
4. Search for "[product name] press kit" or "[product name] brand assets"

---

## Writing Standards

All text on review pages must follow the same standards as your other content:

1. **No dashes as punctuation.** Restructure sentences instead.
2. **No dramatic fragment pairs.** Write complete sentences.
3. **No fabricated stats.** Every number must come from a verifiable source. If a stat cannot be verified, do not include it. Always check the official pricing page before writing pricing sections.
4. **Be specific.** "Handles JavaScript rendered pages" is useful. "Powerful web scraping" is not.
5. **Honest cons.** The cons section builds credibility. Include real limitations, not softened marketing disclaimers.
6. **Voice:** Follow [[voice/brand-voice]] and [[voice/anti-patterns]]. The tone is helpful and factual, like a thorough review from someone who has actually used the product.
7. **Calibration:** Run [[quality/calibration]] on the tagline, "what it is" paragraph, pros, and cons.

---

## SEO for Review Pages

Review pages have strong search intent. Optimize accordingly:

| Element | Requirement |
|---------|-------------|
| SEO title | Format: "Product Review [Year]: Brief Description \| Your Site". Under 60 chars. |
| SEO description | Under 160 chars. Include key features, pricing range, differentiator. |
| Structured data | Product or SoftwareApplication schema with review markup. |
| Heading hierarchy | H2 for main sections, H3 for subsections. |
| Internal linking | Link to related products, comparison pages, and relevant blog articles. |
| Freshness | Update pricing and feature data regularly. Search engines reward fresh review content. |

---

## Creation Checklist

When adding a new review page, verify all of these:

1. Company/maker page exists (create if needed)
2. Official logo sourced and saved
3. All required fields populated (identity, content, metadata, SEO)
4. At least 3 deep dive sections with substantive content and visual blocks
5. Pricing data is current and complete (verified against the official pricing page)
6. All external links are valid URLs
7. Related items reference pages that actually exist on your site
8. Tags are kebab case and include the product name, company name, and category
9. SEO title under 60 characters, SEO description under 160 characters
10. The page renders correctly at desktop, tablet, and mobile widths
11. Visual blocks display correctly and add genuine value
12. All logos are official (never AI generated)
