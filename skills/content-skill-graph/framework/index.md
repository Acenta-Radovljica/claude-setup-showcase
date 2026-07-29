# Content Skill Graph

A generalized content creation system for Claude Code. Manages content production across multiple platforms with configurable voice, audience, and workflows.

This is a **template system**. The files in this directory provide frameworks, pipelines, and format specs that work for any brand. Brand-specific configuration (voice, audience, pillars, proof points) is generated during onboarding and stored in the directories marked "generated" below.

## How It Works

1. **Run onboarding** (the skill at `~/.claude/skills/content-skill-graph/SKILL.md`) to configure your brand
2. Onboarding generates your voice, audience, pillars, brand guidelines, and proof points
3. Use the entry point skills (`/article`, `/repurpose`, `/tool-review`, `/new-tool`) to create content
4. Each skill reads from both the template files (this directory) and your generated config files

---

## Directory Structure

### Template files (brand-agnostic, ship as the system)

| Directory | Purpose | Files |
|-----------|---------|-------|
| `engine/` | Content mechanics: hooks, scheduling, power law, hit detection, repurposing | 7 |
| `platforms/` | Format specs per platform: X, LinkedIn, blog, resource pages | 8 |
| `workflows/` | Step-by-step pipelines: article creation, repurposing, tool reviews, image generation | 7 |
| `quality/` | Quality gates: calibration questions, content standards | 2 |
| `templates/` | Fill-in templates: post scaffolds, announcement formats, review formats | 8 |
| `skills/` | Entry point slash commands: `/article`, `/repurpose`, `/new-tool`, `/tool-review` | 4 |

### Generated during onboarding (brand-specific)

| Directory/File | Purpose |
|----------------|--------|
| `config.md` | Brand basics, selected platforms, languages, workflow choices |
| `philosophy.md` | Your positions, arguments, recurring themes |
| `voice/brand-voice.md` | Core tone of voice definition |
| `voice/anti-patterns.md` | What your content must never do |
| `voice/[platform]-tone.md` | Per-platform tone variations |
| `audience/[icp].md` | Target audience profiles |
| `pillars/[pillar].md` | Content themes and recurring topics |
| `brand/guidelines.md` | Colors, fonts, visual style for asset generation |
| `proof/[type].md` | Proof points, credentials, case patterns, stats |

---

## Node Map

### engine/

- **hooks.md** — Hook formulas that earn the next line on social platforms. Six types: specific result, counterintuitive, comparison, walkthrough, question reframe, pattern interrupt. Each includes structure, examples, and anti-examples.
- **repurpose-rules.md** — How to extract social posts from published articles. Criteria for standalone insights, drip scheduling, and platform adaptation rules.
- **templates.md** — Fill-in content templates: uncomfortable number, assumption breaker, behind the curtain, comparison frame. Each includes structure, example, and usage guidance.
- **content-repurposing.md** — Turning existing content assets (website pages, knowledge bases, resource libraries) into social content. Spotlight, comparison, and roundup formats.
- **power-law.md** — 80% fast volume + 20% big swings. Lottery ticket model for content distribution. Deliberate unevenness in effort allocation.
- **hit-detection.md** — Identifying breakout content (3x rolling average engagement) and compounding within 48 hours. Follow-up strategies and series potential detection.
- **scheduling.md** — Weekly content cadence with day-by-day guidance. Big swing timing, fast volume distribution, and batch drafting.

### platforms/

- **x-post.md** — Short X posts. One sharp point, specific detail, platform-native formatting.
- **x-long-post.md** — Extended X posts for reviews and detailed content. Single core argument with supporting evidence.
- **x-article.md** — Long-form X Articles with TOC and structured sections. For repurposing blog articles with a different angle.
- **linkedin-post.md** — LinkedIn posts for professional/business audiences. Narrative, practical, consequence framing.
- **linkedin-article.md** — Long-form LinkedIn articles for topics needing more space than a post.
- **linkedin-carousel.md** — 7-slide visual carousel format with slide-by-slide structure. HTML-to-image export pipeline.
- **website-blog.md** — Full blog articles with visual components, TOC, and SEO. Platform-agnostic structure.
- **website-tool.md** — Product/service review pages or resource pages on your site. Structured data approach with section patterns.

### workflows/

- **blog-article.md** — 10-phase article creation pipeline: alignment, research, outline, write, visuals, images, SEO, TOC, copy review, assembly.
- **repurpose-article.md** — Article to social posts pipeline. Extract standalone insights, create platform-native posts, sequence into a drip schedule.
- **new-tool.md** — Pipeline for reviewing and publishing a new tool, product, or resource: research, create data entry, source visuals, write announcements.
- **tool-deep-dive.md** — Delayed review pipeline for tools tested over at least 2 weeks of real use. Claims vs. reality, pricing, workflow examples, verdict.
- **image-generation.md** — AI image generation guidance: tool options, prompt strategies, logo sourcing, image optimization.
- **visual-components.md** — Framework for visual content creation: component types (stat blocks, comparison tables, timelines), design principles, implementation guidance.
- **information-design.md** — Decision framework mapping information types to 12 visual patterns. When to use each pattern, design principles, decision table.

### quality/

- **calibration.md** — Five questions to run against every piece of content: voice match, specificity, audience respect, audience comprehension, real work basis.
- **hormozi-standard.md** — Free content must be better than the competition's paid content. Applied to big swing posts and articles, not fast volume.

### templates/

- **content-data-scaffold.md** — Scaffold for structured content data entries (product reviews, resource pages).
- **tool-announce-x.md** — Short-form announcement template for new tools or resources.
- **tool-announce-linkedin.md** — Professional/business announcement template for new tools or resources.
- **article-extract-x.md** — Short-form post template extracted from article insights.
- **article-extract-linkedin.md** — Professional/business post template extracted from article insights.
- **article-scaffold.md** — New article entry scaffold with section structure and placeholders.
- **tool-review-x.md** — Deep-dive review template for short-form platforms.
- **tool-review-linkedin.md** — Deep-dive review template for professional/business platforms.

---

## Execution Routing

### /article <topic>

1. Read [[workflows/blog-article]] for the full pipeline
2. Read [[philosophy]] for consistent positioning
3. Identify which [[pillars/]] node the topic maps to
4. Read [[platforms/website-blog]] for format requirements
5. Read [[voice/brand-voice]] + [[voice/anti-patterns]]
6. Pull data from [[proof/]] for stats and credentials
7. Read [[workflows/visual-components]] for visual patterns
8. Read [[workflows/image-generation]] for image creation
9. Read [[templates/article-scaffold]] for assembly
10. Run [[quality/calibration]] + [[quality/hormozi-standard]]
11. Update [[philosophy]] evolution log

### /repurpose <slug>

1. Read [[workflows/repurpose-article]] for the full pipeline
2. Read [[engine/repurpose-rules]] for extraction criteria and drip schedule
3. Read [[philosophy]] for consistent positioning
4. Create folder structure in your content output directory
5. For each selected platform: read the matching [[platforms/]] spec and [[voice/]] tone
6. Generate posts using [[templates/article-extract-x]] and [[templates/article-extract-linkedin]]
7. Generate supporting images via [[workflows/image-generation]]
8. Run [[quality/calibration]] + [[voice/anti-patterns]]

### /new-tool <url>

1. Read [[workflows/new-tool]] for the procedure
2. Read [[templates/content-data-scaffold]] for data structure
3. Read [[platforms/website-tool]] for page format rules
4. Read platform tones + [[templates/tool-announce-x]] and [[templates/tool-announce-linkedin]] for announcements
5. Read [[workflows/image-generation]] for logo sourcing
6. Run [[quality/calibration]]

### /tool-review <tool-name>

1. Read [[workflows/tool-deep-dive]] for the pipeline
2. Read [[philosophy]] for positioning context
3. Read [[pillars/]] for relevant content themes
4. Read platform tones + [[templates/tool-review-x]] and [[templates/tool-review-linkedin]]
5. Read [[workflows/image-generation]] for logo sourcing
6. Run [[quality/calibration]]
