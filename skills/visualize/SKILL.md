---
name: visualize
description: Use when the user runs /visualize <source> or asks to turn a document, plan, dataset, portfolio, or topic into a premium single-file HTML page, dashboard, or tracker.
---

# /visualize <source>

Transform any text source into a premium single-file HTML page.

This skill has TWO modes, chosen automatically based on the source shape:

- **Mode B — Book/Essay mode** (default): for books, articles, essays, and notes. Explains the key principles, frameworks, and ideas. Optionally personalised to the reader. This is the original mode; see Step 1b onwards.
- **Mode P — Plan/PRD mode**: for implementation plans, PRDs, strategy docs, roadmaps, proposals, and other structured technical/business documents with sections like "Executive Summary", "Timeline", "Risk Register", "Budget", "Phase Plan". Produces a sticky-nav, scroll-spy, decision-maker-ready presentation with gantt-style timelines, risk heatmaps, and budget charts. See Step 1p onwards.

## Arguments

- `<source>`: Path to the source file (required). Accepts `.md`, `.txt`, `.pdf`, or any text format. Can also be a URL to scrape.

## Step 0: Detect Mode

After ingesting the source (Step 1 is shared across modes), inspect the markdown structure and pick mode:

**Mode P triggers (any ≥ 2 of these):**
- Document contains H2 headings named (case-insensitive): "Executive Summary", "Phase Plan", "Risk Register", "Budget", "Success Metrics", "Implementation Plan", "Timeline", "Roadmap", "System Architecture", "Open Questions", "Phase 1" / "Phase 2" / "Week 1" etc.
- Document path contains `/plans/`, `/roadmaps/`, `PRD`, `-plan-`, `strategy`, `rfc-`, or similar
- Document has ≥ 3 tables AND at least one uses weeks/dates OR currency (€, $) OR risk/impact columns

**Mode B triggers (the default if Mode P does not fire):**
- Single-author long-form (book, essay, article)
- Has chapters, principles, quotes
- Source is a book or essay URL/PDF

If both modes could apply, pick Mode P (structured docs benefit more from structured visualisation) but TELL the user and offer to switch if they prefer Mode B.

## Step 1: Ingest the Source and Ensure a Markdown Version Exists

The working format is always `.md`. Every source must be converted to markdown first, saved alongside the original, and then used as the source of truth for HTML generation.

### Check if a markdown version already exists

Before doing any conversion, check if a `.md` file with the same base name already exists in the same directory (e.g., for `my-book.pdf`, check for `my-book.md`). If it exists, use it directly and skip conversion.

### Conversion by format

- **`.md`**: Already in working format. Use directly.
- **`.txt`**: Rename/copy to `.md` or treat as markdown directly (text files are already plain text).
- **`.pdf`**: Read the full PDF using the Read tool with `pages` parameter (20 pages at a time for large files). Convert the extracted content into well-structured markdown: add headings for chapters/sections, preserve paragraph breaks, format lists, and clean up any extraction artifacts (broken words, stray page numbers, headers/footers). Save the resulting markdown as `<source-name>.md` in the same directory as the PDF.
- **URL**: Use Firecrawl MCP (`mcp__firecrawl__firecrawl_scrape`) to scrape the page content. Save the scraped markdown as `<topic-name>.md` in the appropriate Knowledge directory.
- **Other formats** (`.epub`, `.docx`, `.rtf`, etc.): Attempt to read with the Read tool. If the content is intelligible, convert it to clean markdown and save as `<source-name>.md` alongside the original. If the content is garbled or unreadable, inform the user and ask them to provide a `.md` or `.pdf` version instead.

### After conversion

Confirm to the user: the title, approximate length, topic, and the path where the `.md` file was saved. From this point forward, all content extraction works from the `.md` file, never from the original format.

## Step 2: Ask the User Two Questions

Before generating anything, ask:

**Question 1: Mode**
> "Would you like me to:
> (A) Just explain the key principles and frameworks from this source, or
> (B) Personalize it: explain the principles AND apply them specifically to you based on your context?"

**Question 2: Depth**
> "How deep should this go?
> (A) Executive summary: the 3 to 5 biggest ideas, compact (single page feel)
> (B) Comprehensive: all major concepts, frameworks, and principles covered in full sections
> (C) Deep dive: everything above plus detailed breakdowns, diagrams, and supporting arguments"

Wait for the user's answers before proceeding.

## Step 3: Extract the Core Content

Read the full source carefully and identify:

- **The central thesis / big idea**: What is the ONE thing this source is really about?
- **Key frameworks**: Any named models, diagrams, processes, or systems
- **Core principles**: The major ideas, usually 3 to 10 depending on source length
- **Memorable quotes**: 2 to 4 powerful quotes that capture the essence
- **Actionable techniques**: Specific practices, exercises, or methods the author recommends
- **Contrasts and tensions**: What the source argues against (old way vs new way, common mistake vs correct approach)

Write these down as structured notes before moving to HTML generation.

## Step 4: If Personalized Mode, Read Context

If the user chose personalized (B), read these files to understand their situation:

- `/Users/Shared/Domain/Personal/Context/me/about.md`
- `/Users/Shared/Domain/Personal/Context/me/experience.md`
- `/Users/Shared/Domain/Personal/Context/me/skills.md`
- `/Users/Shared/Domain/Personal/Context/me/preferences.md`
- `/Users/Shared/Domain/Personal/Context/plans/` (read the master plan or current active plan)

Use this context to:
- Apply each principle specifically to the reader's situation
- Create "YOU:" annotations that connect book concepts to their real life
- Design personalized exercises and action items
- Identify which principles are most relevant to their current challenges
- Map frameworks to their actual goals, businesses, habits, and circumstances

If context files don't exist or the user is not Amadej, ask the user to briefly describe their situation, goals, and current challenges so you can personalize effectively.

## Step 5: Generate the HTML

Create a single, self-contained HTML file. No external dependencies except Google Fonts. The design language must match the established visual system:

### Design System

**Typography:**
- Import: `Inter` (300, 400, 500, 600, 700, 800, 900) and `Playfair Display` (700, 700 italic)
- Body: Inter. Headlines and hero: Playfair Display.
- Hero title: `clamp(44px, 6.5vw, 88px)`
- Section titles: `clamp(32px, 4vw, 48px)`
- Body text: 15 to 17px. Dim text: 13 to 14px.
- Labels: 11 to 13px, uppercase, letter-spacing 2 to 3px, font-weight 700

**Color System (CSS custom properties in `:root`):**
- Background: very dark (near-black with a subtle hue, e.g. `#06060c`, `#0a0a0f`)
- Cards: slightly lighter dark (`#0e0e18`, `#111118`)
- Card hover: one step lighter (`#141420`, `#16161f`)
- Border: subtle (`#1a1a2e`, `#1e1e2a`)
- Text: light (`#e4e4f0`, `#e8e8f0`)
- Text dim: muted (`#7a7a96`, `#8888a0`)
- Accent: ONE primary accent color chosen to match the source's theme/mood
  - Warm gold/amber for self-improvement, psychology, mindset books
  - Purple for creativity, philosophy, spirituality
  - Teal/cyan for science, technology, systems thinking
  - Blue for business, strategy, leadership
  - Green for health, nature, sustainability
  - Orange for energy, entrepreneurship, action
- Accent glow: the accent at 8 to 15% opacity for subtle backgrounds
- Semantic colors: always include green (positive), red (negative/warning), and 2 to 3 supporting colors with their glow variants

**Layout:**
- Container: `max-width: 1100px; margin: 0 auto; padding: 0 24px;`
- Sections: `padding: 100px 0;`
- Dividers between sections: `linear-gradient(90deg, transparent, var(--border), transparent)`

**Cards:**
- Background: `var(--card)`, border: `1px solid var(--border)`, border-radius: 14 to 20px
- Hover: `translateY(-2px)` and border-color change, `transition: all 0.3s ease`
- Big idea cards: larger padding (48px), subtle radial gradient glow in corner

**Tags/Pills:**
- Inline-block, 11px uppercase, letter-spacing 2px
- Background: semantic color at 8 to 12% opacity, text in the semantic color
- Padding: `4px 12px`, border-radius: 6px

**Structure (top to bottom):**

1. **Hero section**: full viewport height, centered. Label (uppercase small text), giant title (Playfair, gradient text), subtitle paragraph, meta line (author/date/category)
2. **Core Mechanism / Big Idea**: the central thesis explained with a big-idea card and optional diagram
3. **Key Principles / Frameworks**: each principle gets its own section or card grid. Use varied layouts:
   - 2-column card grids for comparisons (e.g. "old way vs new way", "success vs failure")
   - Vertical timelines for sequential processes
   - 3-column grids for collections of techniques/habits
   - Single large cards for big ideas that need space
4. **Diagrams**: for any process or system, create CSS-only diagrams (grids with arrows, node layouts, flow charts). No images needed.
5. **Quotes**: centered, Playfair italic, larger font, with cite element
6. **If personalized**: "Applied to You" sections interspersed throughout, with `YOU:` markers in accent color, personal action items, and specific techniques tied to the reader's situation
7. **Prescriptions / Action Items**: numbered cards with priority markers. If personalized, these are specific to the reader. If principles-only, these are the author's recommended practices.
8. **Closing section**: shorter hero-style section with gradient text headline and a single compelling closing paragraph

**Responsive Design (mandatory):**

Include a `@media (max-width: 768px)` block that:
- Collapses all grids to single column
- Reduces padding and font sizes proportionally
- Removes hover transforms (mobile has no hover)
- Stacks horizontal diagrams vertically with rotated arrows
- Adjusts hero to `min-height: auto`

Include a `@media (max-width: 380px)` block for small phones with further size reductions.

### Content Guidelines

- Write in clear, direct language. No filler, no fluff.
- Each section should stand alone as a useful explanation of that concept.
- Use the book's own terminology and frameworks, not generic self-help language.
- If the source has a specific structure (numbered principles, acronyms, chapters), honor that structure in the visual layout.
- Quotes should be the source's actual words, properly attributed.
- If personalized, the "YOU:" sections should be honest, specific, and actionable. Reference real details from the person's life, not vague encouragements.

## Step 6: Save the File

Save the HTML file in the same directory as the source file, named: `<source-name>-applied.html` (if personalized) or `<source-name>-visual.html` (if principles only).

If the source is a URL, save to `/Users/Shared/Domain/Knowledge/` in an appropriate subfolder.

Tell the user the file path and offer to open it in the browser with `open <path>`.

## Key Rules (Mode B)

- Never start generating HTML before getting the user's mode and depth answers
- The HTML must be a single self-contained file (inline CSS, no external stylesheets beyond Google Fonts)
- Every section needs both desktop and mobile styling
- Color scheme should feel intentional and themed to the source material
- If personalized, read the actual context files; do not guess or fabricate personal details
- No dashes as punctuation in any text content
- No dramatic fragment pairs ("Not X. Y.")
- Quotes must be real quotes from the source, never fabricated

---

# MODE P (Plan / PRD / Strategy Document Mode)

Use this branch when Step 0 selected Mode P. Mode P produces a sticky-nav, scroll-spy, decision-maker-ready single-file HTML with gantt timelines, risk heatmaps, budget charts, and collapsible appendices.

Do NOT ask the "mode / depth" questions from Mode B. Mode P renders the whole document; depth is controlled by collapsible sections, not by trimming content.

## Step 1p: Already Done

Mode P inherits Step 1 ingestion unchanged: convert to `.md` first, save alongside source, work from the `.md`.

## Step 2p: Parse the Document Structure

Produce an internal outline:

- Document title (first H1) and optional subtitle (first paragraph after H1).
- All H2 sections in order, with their H3 children.
- For each section: inventory tables, code blocks, fenced mermaid blocks, callouts.
- Classify each table:
  - **Timeline** if column headers include "week", "day", "date", "when", "phase", "sprint"
  - **Risk** if column headers include "likelihood", "impact", "probability", "severity", "mitigation"
  - **Budget / Cost** if any cell contains `€`, `$`, `£`, `USD`, `EUR`, `GBP`, `/yr`, `/mo`, or "total"
  - **Metric / SLO** if columns mention targets, SLOs, percentages, time units (ms, s)
  - **Mapping / Reference** for everything else

Classification drives rendering in Step 4p.

Also detect these high-value elements for the hero:
- A 5-bullet TL;DR list (if an H2/H3 called "TL;DR" or "5-bullet" exists)
- Budget totals (first prominent currency figure)
- Timeline span (first-week to last-week from a phase-plan table)
- Top 3 risks (first 3 rows of a risk table)

## Step 3p: Apply the Brand

**Nevron** document detection: path contains `/nevron/`, OR the first H1 or first paragraph mentions "Nevron", "NevronCore", "ebiplatform".

If Nevron: delegate to the `nevron-brand` agent via Task tool to fetch current brand tokens. Prompt the agent:
> I am building a single-file HTML presentation of a Nevron implementation plan. Return: (1) primary colour hex, (2) accent colour hex, (3) success / warning / danger hex, (4) display font family + Google Fonts URL, (5) body font family + Google Fonts URL, (6) any hard constraints (forbidden colours, spacing tokens). Reply as a small markdown table.

Use the returned tokens verbatim in CSS custom properties.

If not Nevron OR the agent fails, use these defaults:

```css
:root {
  --c-bg: #0B0F1A;
  --c-surface: #111726;
  --c-surface-2: #1A2138;
  --c-text: #F5F7FB;
  --c-text-mute: #A7B0C5;
  --c-primary: #6366F1;
  --c-accent: #22D3EE;
  --c-success: #10B981;
  --c-warning: #F59E0B;
  --c-danger: #EF4444;
  --c-border: #2A3250;
  --font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
}
```

## Step 4p: Generate the HTML

Write ONE single-file HTML document with this structure (adapt to source, but these sections are required when the source provides the data):

### 4p.1 `<head>`

- Viewport meta, theme-color meta, favicon (inline SVG dot in brand primary)
- Google Fonts preconnect + stylesheet for display + body fonts
- Inline `<style>` with custom properties from Step 3p and all layout rules
- Title: document title

### 4p.2 Header bar (sticky)

- Left: brand mark (SVG) + document title condensed
- Right: print button (`window.print()`), outline toggle (mobile), theme toggle (if light/dark both supported)

### 4p.3 Hero section (full viewport height on desktop)

- Eyebrow label (document version + date)
- Big H1 (document title, display font)
- Subtitle paragraph (first paragraph after H1 in source, if present)
- **TL;DR cards**: 5 cards from the detected TL;DR, each with a number badge + 1-line summary
- **Snapshot strip**: 3 or 4 big numbers pulled from the document — budget total, timeline span in weeks, risk count, decision count
- Subtle downward chevron / scroll hint

### 4p.4 Layout

Desktop:
```
[sticky header]
[left sidebar nav: 240px]  [main: flex, max 900px centered]
```

Mobile:
```
[sticky header with hamburger]
[nav drawer slides from left when open]
[main content full-width]
```

### 4p.5 Sticky left sidebar navigation

- Document title (small, muted)
- Ordered list of all H2 sections with section numbers
- Nested H3s visible when parent is active
- Scroll-spy: the currently-in-view section's nav item is highlighted (use IntersectionObserver)
- On click: smooth scroll to anchor
- `aria-current="page"` on active item

### 4p.6 Main content (per section)

For each H2 section in source order, output:

```html
<section id="sec-<slug>" class="plan-section">
  <header class="plan-section-header">
    <span class="plan-section-number">01</span>
    <h2>Executive Summary</h2>
    <p class="plan-section-lede">{first paragraph}</p>
  </header>
  <div class="plan-section-body">
    {rendered content}
  </div>
</section>
```

Content rendering rules:

- **Paragraphs**: standard, good typography (17px body, 1.6 line-height).
- **Bullet lists**: standard, but with brand-coloured custom markers.
- **Ordered lists**: brand-coloured number badges.
- **Tables (Timeline type)**: render as a horizontal gantt-style track. For a phase plan with weeks 1–8, produce 8 vertical swimlanes; within each, stack task cards. Card shows task title + owner badge + hours. Acceptance criteria go inside `<details>`.
- **Tables (Risk type)**: render as a grid of risk cards. Each card:
  - Left border colour by Likelihood × Impact (green = low×low, amber = medium, red = high/critical)
  - Header: risk name + `Lk | Im` badges
  - Body: mitigation + detection paragraphs
  - If the source orders risks by priority, preserve that order
- **Tables (Budget type)**: render as a two-panel layout. Left: line-item list with label + value right-aligned. Right: horizontal-bar chart (Chart.js) showing item weights. Bottom: total as a prominent card with large number. If two budget tables exist (one-time + recurring), render them side-by-side on desktop, stacked on mobile.
- **Tables (Metric type)**: render as a responsive stat grid, one card per row. Big number + unit + description. Small target badge.
- **Tables (Mapping/Reference type)**: native HTML table with sticky header, zebra striping, hover highlighting, horizontal scroll on mobile.
- **Code blocks**: Prism.js syntax highlighting via CDN. Add a small "Copy" button in the top-right that writes to clipboard. Language label badge in top-left.
- **Mermaid blocks**: render with mermaid.js via CDN. Centred, max-width 100 %, dark theme consistent with brand.
- **Quote blocks** (`> `): left-bordered pull quote in muted surface colour.

### 4p.7 Collapsible sections

By default collapse (with a "Show {N} items" button):
- Risk Register if > 8 rows
- Week-by-week Phase Plan (one `<details>` per week, collapsed)
- Every Appendix

User can click to expand. Print mode expands all.

### 4p.8 Footer

- Document version + date
- "Generated from {source path}" with a copy-path button
- Back-to-top floating button on mobile (appears after 400 px scroll)

## Step 5p: CDN Dependencies (only when needed)

Include via `<link>` / `<script>` in head or pre-body:

- Google Fonts: display + body fonts resolved in Step 3p
- `https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js` — ONLY if source has mermaid blocks
- `https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js` + theme CSS — ONLY if source has code blocks in known languages
- `https://cdn.jsdelivr.net/npm/chart.js@4` — ONLY if source has a Budget table with ≥ 3 line items

Do not pull in Tailwind, Bootstrap, or any framework. Write plain CSS with custom properties. Under 800 lines of inline CSS. Target output file size < 400 KB.

## Step 6p: Accessibility

- Contrast ratio ≥ 4.5:1 on text
- All interactive elements tab-focusable with visible focus ring
- `aria-expanded` on `<details>` + collapsibles
- `aria-current="page"` on active nav item
- `prefers-reduced-motion` disables smooth scroll + fade-in transitions
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`

## Step 7p: Save + Open

- Save to `<source-directory>/<source-basename>-visualization.html` (suffix `-visualization` to distinguish from Mode B's `-visual` / `-applied` suffixes).
- Run `open <path>` via Bash on macOS to open in the default browser.
- Report to user in ≤ 40 words: path saved, number of sections rendered, which table types were auto-converted (timeline, risks, budget, metrics).

## Step 8p: Self-Rate Before Announcing Done

Score 1–10 on five criteria:

1. **Visual hierarchy**: can a reader find any section in ≤ 5 s?
2. **Information fidelity**: is every non-appendix data point from the source present?
3. **Interaction quality**: scroll-spy, collapsibles, print all working?
4. **Brand consistency**: feels like a premium Nevron (or unbranded) output?
5. **File size**: under 500 KB (excluding CDN fetches)?

Any score < 8 → fix before announcing done.

## Mode P Failure Modes to Avoid

- Do NOT output multiple files. One `.html` file only.
- Do NOT depend on any locally-hosted asset that needs to be served separately.
- Do NOT translate the source content. Render as written.
- Do NOT add editorial commentary, caveats, or your own opinions in the output.
- Do NOT use emoji or long-dashes as punctuation (global rule).
- Do NOT strip information from tables in the name of "simplification". Convert to visuals OR keep as a table, never silently drop columns.
- Do NOT render a mermaid block twice (once as mermaid, once as fallback text). Render once via mermaid.js only.
- Do NOT ask the user mode/depth questions in Mode P. Just render.

## Mode P Examples

```
/visualize /Users/Shared/Domain/Business/Nevron/Context/mobile-apps/implementation-plan-phase1.md
```
Generates `…/implementation-plan-phase1-visualization.html` (Nevron-branded) and opens it.

```
/visualize ./roadmap-q3.md
```
Generates `./roadmap-q3-visualization.html` beside the source with neutral default palette.
