# Blog Article Workflow

> Full 10-phase article creation pipeline. This is the most involved workflow in the content system; each phase has a clear purpose and gate before proceeding. Platform and brand details are configured in [[config.md]].

References: [[brand-voice]], [[anti-patterns]], [[philosophy]], [[calibration]], [[article-scaffold]], [[image-generation]], [[visual-components]]

---

## Phase 0: Alignment

**Purpose:** Prevent wasted effort by aligning on thesis, audience, and structure before a single word is written.

If the user has not fully elaborated their idea, ask clarifying questions:

- What is the core argument or insight?
- Who is the primary reader? (technical builders, business owners, both?)
- Which pillar does this map to? Check the `pillars/` directory for existing nodes.
- Is there a specific stat, experience, or observation that sparked this idea?
- What should someone be able to do or understand after reading this?

Then:

1. Suggest 2 to 3 angles based on the pillar mapping. Each angle should lead to a different article structure.
2. Present 2 to 3 title options with hook analysis (what creates curiosity, what promises value, what sets expectations).
3. Propose the section outline at headline level.

**Gate:** DO NOT start writing until both sides agree on: main thesis, target audience, key sections, and tone. Explicit confirmation required.

## Phase 1: Research

**Purpose:** Gather real data, expert perspectives, and source material. Every claim in the article must be grounded.

Use your preferred web search and scraping tools to find:

- Industry statistics relevant to the topic (look for recent surveys, reports, census data)
- Expert quotes from credible sources (practitioners, researchers, company leaders)
- Competing articles on the same topic (to identify gaps, not to copy)
- Relevant product announcements or changelogs
- Data points that support or challenge the thesis

For deep research that requires synthesis across multiple sources, use a research tool (Perplexity, deep web search, or equivalent). If automated access is unavailable, generate a ready-to-paste prompt for the user to run manually.

**Mandatory rule:** All statistics must be real and sourced. NEVER fabricate statistics, percentages, time savings, or performance metrics. If a stat cannot be verified, do not use it. Attribute every number to its source (organization name, publication, year).

Compile research into a structured brief:
- Key stats with sources
- Expert quotes with attribution
- Gaps in existing coverage (this is where the article adds value)
- Potential counterarguments to address

## Phase 1.5: Save Research Output

**Purpose:** Persist raw research so the repurpose workflow can include it in the distribution package.

Save the compiled research brief to your designated content directory under `research/<slug>.md`. Create the directory if it does not exist.

The file should contain:
- Key statistics with sources (organization, publication, year, URL)
- Expert quotes with attribution
- Gaps identified in existing coverage
- Potential counterarguments noted
- Any raw search results or notes that informed the article

This file is later picked up by the [[repurpose-article]] workflow and included in the distribution folder.

## Phase 2: Outline

**Purpose:** Create the structural blueprint before drafting.

1. Map the article to relevant `pillars/` nodes. Note which pillar themes should surface in the article.
2. Structure sections with clear progression. The reader should be able to follow the argument through section headings alone.
3. For each section, note:
   - The key point
   - Supporting evidence (stat, example, quote)
   - Where a visual component would add clarity (refer to [[visual-components]] for the component library)
   - Where an image would enhance the reading experience
4. Identify the "incompleteness hook": what does this article make the reader want to explore next? This connects to future articles and hub content.

Present the outline to the user for approval before proceeding.

## Phase 3: Write

**Purpose:** Draft the full article content.

Write the article in whatever format your blog platform requires (markdown, HTML, CMS fields, or a custom content format). Consult [[config.md]] for platform specifics. The content should be ready for direct publishing after the pipeline completes.

### Writing Rules

Apply [[brand-voice]] and [[anti-patterns]] throughout:

- Use the perspective defined in your brand voice (first person, second person, or third person as configured)
- Direct, specific, practitioner perspective
- No dashes as punctuation (use commas, periods, semicolons, or restructure)
- No dramatic fragment pairs ("Not X. Y.")
- No polished founder theatre or motivational language
- Real constraints and rough edges are welcome
- Every claim backed by evidence or personal experience
- Tool names when they matter, not for name-dropping
- Reference [[philosophy]] for consistent positioning on recurring themes

### Structure Guidelines

- Opening: hook with a stat, observation, or counterintuitive claim. Not a question. Not a definition.
- Each section should be self-contained enough to make sense if someone jumps to it from the table of contents
- Use clear section separators between major sections
- Close with a forward-looking observation, not a summary. The incompleteness principle: leave the reader with a thread they want to pull.

## Phase 4: Visual Components

**Purpose:** Design and build visual elements that make abstract concepts tangible.

For each visual component identified in the outline:

1. Design the component (either manually or by delegating to a design-focused agent)
2. Follow [[visual-components]] for the component library and creation guidelines
3. Embed the visual in the article using your platform's supported format (inline HTML, shortcodes, embedded components, or image references)
4. ALWAYS use official logos sourced from the web. NEVER generate or create logos.

Adapt the embedding approach to your platform:
- **Static site generators / custom renderers:** Inline HTML with CSS in your global stylesheet
- **CMS platforms (WordPress, Ghost, Webflow):** Use the platform's native visual blocks or custom HTML blocks
- **Markdown-based platforms:** Use image references or HTML blocks where supported

## Phase 5: Image Prompts

**Purpose:** Create image prompts for your preferred AI image generator that produce blog-quality visuals.

Follow [[image-generation]] for the complete workflow.

Required images:
- **Cover image**: the image shown on the blog listing page and at the top of the article. This is the most important one. Must convey the article's theme at a glance.
- **2 to 4 section images**: placed at section transitions to create visual rhythm and break up text.

Prompt style requirements (adjust to match your brand aesthetic as configured in [[config.md]]):
- Background color and mood consistent with your brand
- Subtle tech aesthetic, abstract and conceptual (or whichever style fits your brand)
- NO text in the image (text is added separately in overlays if needed)
- Professional, editorial feel
- Match the aesthetic established in previous articles for consistency

Write each prompt with a brief note on what it represents and where it goes in the article.

## Phase 6: SEO

**Purpose:** Ensure the article is discoverable.

Required elements:

- **metaTitle**: stat-driven or insight-driven. Under 60 characters. Include your brand name as a suffix per your convention.
- **metaDescription**: under 160 characters. Summarizes the core insight and what the reader will learn.
- **title**: the article title as displayed on the page. Can be longer than metaTitle. Should create curiosity or state a bold claim.
- **description**: 1 to 2 sentences shown on the blog listing page.
- **tags**: 5 to 8 relevant tags for internal categorization.
- **category**: one category string appropriate for your content taxonomy.

Ensure structured data (Article + BreadcrumbList) is configured per your platform's capabilities. Use YYYY-MM-DD format for all dates.

## Phase 7: Table of Contents Setup

**Purpose:** Configure the table of contents (if your platform supports one).

1. Extract all main headings from the article content
2. Verify that auto-generated anchor IDs work correctly for TOC linking
3. If any heading is too long for the sidebar or navigation, create a short label mapping per your platform's method
4. Test that scroll-to or intersection-based highlighting works with the generated IDs

If your platform does not support a table of contents, skip this phase.

## Phase 8: Copywriting Review

**Purpose:** Quality pass on voice, style, and anti-patterns.

Review the draft (either personally or by delegating to a copywriting-focused agent). Check:

- Compliance with [[brand-voice]] (correct perspective, tone, and positioning)
- Compliance with [[anti-patterns]] (no dashes, no fragment pairs, no motivational language)
- The incompleteness principle (does the ending leave a thread to pull?)
- Hook strength (does the opening create enough curiosity to keep reading?)
- Section flow (does each section earn the reader's attention for the next one?)
- Specificity (are claims backed by evidence or experience, not vague assertions?)
- Language quality for any non-English content (if your brand publishes in multiple languages per [[config.md]])

Fix any issues found before proceeding.

## Phase 9: Assembly

**Purpose:** Put all pieces together in your publishing platform.

1. Create or update the article entry in your blog platform, using [[article-scaffold]] as a template. Include all required fields:
   - Slug
   - Title and description
   - Author information (as configured in [[config.md]])
   - Publish date and last-updated date
   - Reading time (calculated from word count)
   - Category and tags
   - Cover image reference
   - Meta title and description
   - Full article content

2. Place images in your public assets directory:
   - Convert to your preferred web format (WebP recommended for web, PNG for social)
   - Name with SEO-friendly slugs
   - Cover image referenced in the article metadata
   - Section images referenced in the content body

3. Add any new CSS or styles required by visual components:
   - Follow your existing naming conventions
   - Include responsive breakpoints and reduced-motion variants

4. Calculate reading time: count words in the content (excluding markup/HTML tags), divide by 230 (average reading speed), round to nearest integer.

## Phase 10: Philosophy Update

**Purpose:** Keep the [[philosophy]] node current as your brand's thinking evolves.

1. Read the current `philosophy.md`
2. Extract the core arguments and positions from this article
3. Check: does this article introduce a new argument, or does it refine an existing one?
4. If new: append to the Evolution Log section with the article slug, date, and the new position
5. If refinement: update the relevant existing entry and note the evolution
6. This step ensures consistency across articles; future articles reference philosophy.md to avoid contradicting earlier positions

---

## Checklist Before Presenting to User

- [ ] Phase 0 alignment was completed (not skipped)
- [ ] All stats are real and sourced
- [ ] No dashes as punctuation in any text
- [ ] No dramatic fragment pairs in any text
- [ ] Visual components use official logos only
- [ ] Images have prompts written and placement noted
- [ ] TOC headings are concise and scannable (if applicable)
- [ ] Copywriting review was completed
- [ ] Article compiles and renders without errors on your platform
- [ ] Philosophy.md has been updated
- [ ] User has approved before any publishing or git operations
