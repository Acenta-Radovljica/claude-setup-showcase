# Content Skill Graph Onboarding

Interactive 9-step onboarding that configures the Content Skill Graph for a specific brand. Each step collects information through conversation, generates config files, and confirms with the user before moving on.

## General Principles

- **Conversational, not form-like.** Each step is a dialogue. Present options, ask questions, propose based on what you have learned so far. Never dump a wall of questions.
- **Confirm before writing.** After each step, present what you understood in a clean summary. Write the config file only after the user confirms.
- **Multiple input paths.** Every step offers at least two ways to provide input (describe it, provide a file, give a URL, pick from presets). Meet the user where they are.
- **Progressive refinement.** Later steps build on earlier ones. Use what you learned in Step 1 to make smarter suggestions in Steps 5 and 6.
- **Save as you go.** Write each config file to disk immediately after confirmation. If the session is interrupted, the user keeps what was already generated.

---

## Pre-Onboarding Setup

Before starting the 9 steps, establish two things:

### 1. Template Location

Ask: "Where are the Content Skill Graph template files? These are the engine/, platforms/, workflows/, quality/, and templates/ directories."

If the user does not know, search for `content-skill-graph/framework/index.md` on their system. The default for this setup (the template files ship inside this skill) is:
`C:/Users/maks1/.claude/skills/content-skill-graph/framework/`

Verify the directory exists and contains the expected subdirectories.

### 2. Output Location

Ask: "Where should I save your personalized content system? This is where your voice, audience, pillars, and other config files will live."

Suggest a sensible default based on context:
- If working in a specific project: `<project-root>/content-system/`
- If no clear project: `~/content-system/` or a location the user prefers

Create the output directory if it does not exist.

### 3. Confirm and Begin

Tell the user:
- Template files at: [path]
- Config files will be saved to: [path]
- The onboarding has 9 steps and takes 15 to 30 minutes
- You can stop and resume later; completed steps are already saved to disk

---

## Step 1: Who Are You

**Purpose:** Establish the basics about the brand so every subsequent step has context.

**What to collect:**
- Brand/company name
- What you do (one sentence)
- Industry or domain
- What you offer (products, services, content)
- How long you have been operating
- What makes you different from competitors (optional at this stage)

**Input paths:**

**Path A: Tell me.** Ask the user to describe their brand in a few sentences. Follow up with clarifying questions if anything is vague.

**Path B: Website extraction.** Ask for the company URL. Scrape the homepage, about page, and any pricing/product pages. Extract the information above and present it back: "Based on your website, here is what I understand about your brand..." Let the user correct anything.

**Path C: Existing document.** Ask the user to point to an existing brand doc, pitch deck, strategy document, or README. Read it and extract the relevant information.

**After confirmation, write:** `config.md`

```markdown
# Content System Configuration

## Brand
- **Name:** [brand name]
- **Description:** [one-sentence description]
- **Industry:** [industry/domain]
- **Offerings:** [what you offer]
- **Operating since:** [year or duration]
- **Differentiator:** [what makes you different]

## Platforms
[filled in Step 2]

## Workflows
[filled in Step 8]
```

---

## Step 2: Platforms

**Purpose:** Determine which platforms the user publishes to and in what language.

**What to collect:**
- Which platforms to activate (select from list)
- Language for each platform
- Any platform-specific accounts or handles (optional, for context)

**Supported platforms** (from the template files):
- X (formerly Twitter): short posts, long posts, articles
- LinkedIn: posts, articles, carousels
- Blog/Website: articles, resource pages
- Email/Newsletter: newsletters, sequences, announcements, nurture campaigns
- Instagram: posts, stories, reels (format spec can be extended)
- TikTok: scripts (format spec can be extended)
- YouTube: scripts, descriptions (format spec can be extended)

**How to present:**

List the platforms and ask which ones the user is active on or wants to be active on. For each selected platform, ask what language they publish in.

Example dialogue:
> "Which platforms do you create content for? Here are the ones the system supports:
> 1. X (short posts, long posts, articles)
> 2. LinkedIn (posts, articles, carousels)
> 3. Blog/Website (articles, resource pages)
> 4. Email/Newsletter (newsletters, sequences, announcements)
> 5. Instagram
> 6. TikTok
> 7. YouTube
>
> Pick the ones you use, and I will ask about language for each."

If the user selects Email/Newsletter, also ask:
- What type of emails? (Newsletter, product updates, nurture sequences, cold outreach, announcements)
- What tool do you use? (Mailchimp, ConvertKit, Beehiiv, Substack, Ghost, Resend, other)
- How often do you send? (Weekly, biweekly, monthly, campaign-based)

**After confirmation, update:** `config.md` (add platforms section)

```markdown
## Platforms

| Platform | Language | Handle/URL |
|----------|----------|------------|
| X | English | @handle |
| LinkedIn | English | /in/profile |
| Blog | English | example.com/blog |
```

Also note which platforms need per-platform tone files (generated in Step 3).

---

## Step 3: Tone of Voice

**Purpose:** Define the brand's core voice so all content sounds consistent.

**What to collect:**
- Overall voice character (who does the brand sound like?)
- Voice traits to use (list of 4 to 8 traits with descriptions)
- Voice traits to avoid (list of traits that are off-brand)
- Reference examples (optional, extremely helpful)

**Input paths:**

**Path A: Presets with examples.** Present 5 voice presets, each with a sample paragraph so the user can hear the difference:

1. **The Practitioner:** Calm confidence, shows work, specific details, honest qualifiers. "I spent 3 hours setting this up. The next morning, it drafted a report that referenced my actual data. The setup time paid for itself on the first use."

2. **The Educator:** Clear, structured, builds understanding step by step. "There are four things these tools actually do: read, write, connect, and follow instructions. Once you see it that way, the question changes from 'can I code?' to 'can I explain what I want?'"

3. **The Challenger:** Bold opinions backed by evidence, questions assumptions. "Everyone talks about which AI model is best. That is the wrong question. The model matters less than the context you give it. A mediocre model with great context outperforms a brilliant model with none."

4. **The Storyteller:** Narrative-driven, personal, draws the reader in through experience. "Last Tuesday I sat down to write a proposal. Three hours later I had a finished document, a slide deck, and a follow-up email sequence. A year ago, that would have been a full week."

5. **The Analyst:** Data-first, measured, lets numbers speak. "88% of companies report using AI. Only 4% operate it at scale. The gap is not about tools or budgets; it is about whether someone owns the implementation."

The user can pick one preset as a starting point, combine elements from multiple, or say "none of these" and describe their own.

**Path B: Extract from examples.** Ask the user to share 3 to 5 pieces of content they have written (or URLs to published content) that represent how they want to sound. Read them and extract voice traits: sentence structure, vocabulary patterns, level of formality, use of first person, humor style, technical depth. Present the analysis: "Based on your writing, your voice tends to be..."

**Path C: Describe it.** Ask the user to describe their voice in their own words. Ask follow-up questions: "If your brand were a person at a dinner party, how would they talk? Who are creators or brands whose tone you admire? What tone do you absolutely hate?"

**After confirmation, write:** `voice/brand-voice.md`

Structure the file like the template's voice guide:
- The voice in one sentence
- Voice traits to use (4 to 8 traits, each with a name, description, and example)
- Voice traits to avoid (4 to 6 traits, each with what it looks like and why it fails)
- Reference comparison (optional, if the user named specific creators they admire or want to differentiate from)
- A good example and a bad example written in the user's voice

**Also write per-platform tone files** for each platform selected in Step 2:
- `voice/x-tone.md` (if X was selected)
- `voice/linkedin-tone.md` (if LinkedIn was selected)
- etc.

Each tone file adapts the core voice to the platform's audience, norms, and language. Ask the user if their tone shifts between platforms: "Do you sound the same on X as on LinkedIn, or do you adjust? For example, more casual on X, more professional on LinkedIn?" Use their answer to differentiate the tone files.

---

## Step 4: Anti-Patterns

**Purpose:** Define what the brand's content must never do. This is the quality gate that prevents generic AI slop.

**How this step works:**

This step is different from the others because it starts with a quick yes/no question, then optionally goes deeper.

### Path A: Quick start with the "Don't Sound Like AI" preset

**Start by offering this.** Before proposing any custom anti-patterns, ask:

> "Want me to add the 'Don't Sound Like AI' preset? These are 12 writing patterns that immediately signal content was AI-generated. Most people want all of them blocked. You can say 'yes' and we move on, or we can go through them one by one."

If the user says yes, include all 12 automatically. These are universal, not brand-specific. They apply to any brand that wants content to read as human-written.

**The 12 "Don't Sound Like AI" anti-patterns:**

| # | Pattern | The AI tell |
|---|---------|-------------|
| 1 | **Short dramatic fragment pairs** | "Not X. Y." "Less noise. More signal." The single most recognizable AI writing pattern. Write complete sentences instead. |
| 2 | **Dashes as punctuation** | Em dashes, en dashes, and hyphens between clauses. AI's default sentence connector. Use commas, semicolons, or restructure. |
| 3 | **Hype words** | "Game changer," "revolutionary," "unlock," "supercharge," "skyrocket." AI defaults to these because they sound energetic without saying anything specific. Replace with the concrete detail the hype word is hiding. |
| 4 | **Superlatives as hooks** | "The ONLY guide you need," "the ULTIMATE," "the #1 skill." AI inflates every claim to maximum. Let specificity be the hook instead. |
| 5 | **Long abstract preamble** | "In today's rapidly evolving digital landscape..." Three paragraphs of context before the point. AI buries the insight under setup. Start with the point. |
| 6 | **Generic AI hype** | "AI is changing everything." "The future of work is here." Content equivalent of white noise. Start with a specific observation instead. |
| 7 | **Fake founder voice** | "Excited to announce..." "Humbled and grateful for this journey." Performative enthusiasm that readers scroll past reflexively. State what happened directly. |
| 8 | **Motivational filler** | "Believe in yourself." "Your time is now." "You've got this." Padding that adds zero information. Cut it entirely. |
| 9 | **Empty motivation** | "Just start. Stop overthinking." Without a specific first step, this is indistinguishable from a motivational Instagram account. Provide the concrete next action. |
| 10 | **Fabricated statistics** | "This saves 10x the time." "300% increase." AI confidently invents numbers. Use only verified stats with sources or personal numbers from real work. |
| 11 | **Hashtag walls** | 10+ hashtags at the end. Signals content optimized for algorithms, not humans. Zero to 3 relevant hashtags maximum. |
| 12 | **"Two types of people" framing** | "There are two types of founders..." AI loves false binaries because they create engagement. Real situations have spectrums. Describe the actual range. |

For each anti-pattern included, write the full entry with: name, what it looks like (example), why it fails, and what to do instead.

### Path B: Custom review

If the user says no to the preset, or wants to review each one, present the 12 patterns individually and let them accept or reject each. Then continue to the custom additions below.

### Additional custom anti-patterns

After the preset decision, propose 3 to 5 additional anti-patterns based on:
- The voice from Step 3 (e.g., if "The Practitioner," add an anti-pattern about theoretical content without real examples)
- The platforms from Step 2 (e.g., if LinkedIn is selected, add anti-patterns about cross-posted content or content calendar filler)
- The industry from Step 1 (e.g., if B2B SaaS, add anti-patterns about generic thought leadership)

Present these and ask:
> "Here are a few more patterns I would flag as off-brand based on your voice and audience. Keep, remove, or add your own."

Each anti-pattern should have:
- A name
- What it looks like (1 to 2 sentence example)
- Why it fails for this brand (1 to 2 sentences)
- What to do instead (1 to 2 sentences)

**After confirmation, write:** `voice/anti-patterns.md`

Structure it as a numbered list with the format above for each anti-pattern, plus a quick-reference checklist table at the end.

---

## Step 5: Audience

**Purpose:** Define who the content is for, so every piece targets a specific reader.

**What to collect per audience segment:**
- Segment name (a descriptive label, not jargon)
- Who they are (role, company size, industry)
- What they care about (goals, priorities)
- What frustrates them (pain points, bottlenecks)
- What language they use (technical terms, colloquial phrases)
- Where they hang out (which platforms from Step 2)
- What makes them trust or distrust content

**Input paths:**

**Path A: Describe them.** Ask: "Who reads your content? Describe your ideal reader on each platform." Follow up with pain point and language questions.

**Path B: Extract from website.** If the user's site has an "About," "For Teams," "Pricing," or "Use Cases" page, scrape those and infer the audience segments. Present back: "It looks like you target [segment A] and [segment B]. Here is what I inferred about each..."

**Path C: Pick from archetypes.** Present common audience archetypes and let the user pick and customize:
- **Technical builders** (developers, engineers, technical founders): care about how things work, skeptical of hype, value specificity
- **Business operators** (managers, directors, VPs): care about ROI, time savings, team impact, risk
- **Founders and solopreneurs:** care about leverage, doing more with less, competitive advantage
- **Marketing and content teams:** care about output quality, brand consistency, scale
- **Industry specialists** (specific vertical like hospitality, healthcare, legal): care about domain-specific applications, compliance, proven results

The user picks 1 to 4 archetypes, then customizes each with their specific details.

**After confirmation, write:** one file per segment in `audience/`
- `audience/[segment-name].md` for each segment

Each file includes: who they are, what they care about, their pain points, their language patterns, which platforms they are on, and trust/distrust signals.

---

## Step 6: Content Pillars

**Purpose:** Define 3 to 7 recurring themes that all content maps to. Pillars prevent random topic selection and build cumulative authority.

**How this step works:**

Claude proposes pillars based on everything learned so far (brand from Step 1, platforms from Step 2, voice from Step 3, audience from Step 5). The user confirms, adjusts, adds, or removes.

**Claude proposes 4 to 6 pillars.** Each proposal includes:
- Pillar name
- One-sentence description of what this pillar covers
- Why this pillar matters for the audience(s)
- 3 example topics that fall under this pillar
- Which platform(s) this pillar performs best on

**Present the proposals:**
> "Based on your brand, audience, and platforms, here are the content themes I would suggest. These are the topics your content will keep returning to, building authority over time."

**Ask the user to:**
- Confirm which pillars to keep
- Adjust any descriptions or scoping
- Add pillars Claude missed
- Remove any that do not fit
- (Optional) Rank them by priority

**After confirmation, write:** one file per pillar in `pillars/`
- `pillars/[pillar-name].md` for each pillar

Each file includes: the pillar name, description, why it matters, example topics, which audience segments it serves, which platforms it works best on, and key arguments or positions within this pillar.

---

## Step 7: Brand Design Guidelines

**Purpose:** Define visual identity so generated assets (carousels, images, visual components) match the brand.

**What to collect:**
- Primary and secondary colors (hex codes)
- Accent color(s) if any
- Font preferences (heading font, body font)
- Logo location or description
- Visual style keywords (minimal, bold, technical, warm, etc.)
- Any design constraints (accessibility, specific brand guide requirements)

**Input paths:**

**Path A: Provide brand guide.** Ask if the user has an existing brand guide, style guide, or design system document. Read it and extract the relevant values.

**Path B: Extract from website.** Scrape the user's website and extract: primary colors from CSS/design tokens, font stacks, visual patterns. Present: "From your website, I see these colors and fonts..."

**Path C: Pick a preset palette.** Present 5 palette options and let the user pick one as a starting point:
1. **Clean minimal:** White backgrounds, single accent color, sans-serif fonts, lots of whitespace
2. **Dark technical:** Dark backgrounds, bright accent (green/blue/cyan), monospace headings, code-editor feel
3. **Warm professional:** Cream/warm gray backgrounds, earth tone accents, serif headings, approachable
4. **Bold modern:** Strong primary color, high contrast, geometric sans-serif, energetic
5. **Corporate neutral:** Light gray backgrounds, navy/teal accent, system fonts, conservative

The user picks one and customizes colors and fonts.

**Path D: Skip for now.** If the user does not care about visual assets yet, generate a minimal guidelines file with sensible defaults that can be updated later.

**After confirmation, write:** `brand/guidelines.md`

Include: color palette (hex codes for primary, secondary, accent, background, text), typography (heading font, body font, code font), visual style keywords, logo notes, and any constraints.

---

## Step 8: Content Pipeline & Workflows

**Purpose:** Configure the content creation pipeline: what you create first, what gets derived from it, how assets flow through the chain, and how content gets distributed. This is the system architecture of your content operation.

This step has four parts. Walk through them in order.

---

### Part A: Primary Content Format

**Purpose:** Establish what the user creates first. Everything else derives from this.

Ask: "What is the content you typically create first, that other content gets derived from? For most people this is one primary format, but some people have two."

**Options:**

| # | Primary Format | Description |
|---|----------------|-------------|
| 1 | **Blog article** | Long-form written content on your site |
| 2 | **Email/newsletter** | Regular emails to a subscriber list |
| 3 | **Social post** | Short-form content on X, LinkedIn, or other platforms |
| 4 | **Video script** | Scripts for YouTube, TikTok, Reels, or other video |
| 5 | **Tool/product review** | In-depth reviews or comparisons |

Most users pick one primary format. Some have two (e.g., articles AND newsletters as independent primary formats, not derived from each other).

**Follow-up question:** "Do you also create [other formats] independently, or do those always come from your [primary format]?"

This distinction matters: an article that gets summarized into an email is a different workflow than an article AND a newsletter that are both created from scratch.

---

### Part B: Content Flow (Pipeline Configuration)

**Purpose:** Map how content flows from primary format to derived formats. This is the core of the system.

Based on the primary format from Part A, present the relevant flow options. The user selects which derivations they want active.

**If primary is Article:**
```
Article
  ├── → Social posts (extract insights, one per platform)
  ├── → Email/newsletter (summarize or announce to subscribers)
  ├── → Carousel (visual summary of key points)
  └── → Video script (convert to talking points)
```

**If primary is Email/Newsletter:**
```
Email
  ├── → Social posts (teasers, key insights, or quotes)
  ├── → Blog article (expand deeper topics into full articles)
  ├── → Carousel (visual version of email content)
  └── → Email sequence (turn one-off into nurture series)
```

**If primary is Social Post:**
```
Social post
  ├── → Blog article (compile popular posts into long-form)
  ├── → Email/newsletter (roundup of best posts)
  ├── → Carousel (expand a text post into visual slides)
  └── → Email sequence (turn a thread into a drip)
```

**If primary is Video Script:**
```
Video script
  ├── → Social posts (key quotes, clips, takeaways)
  ├── → Blog article (written version of the content)
  ├── → Email (announce or summarize for subscribers)
  └── → Carousel (visual highlights)
```

**If primary is Tool/Product Review:**
```
Review
  ├── → Social posts (verdict, key findings, comparisons)
  ├── → Email (review digest to subscribers)
  ├── → Blog article (the full review itself, if not already an article)
  └── → Carousel (comparison slides, ratings breakdown)
```

**How to present:**

Show the flow diagram for their primary format. Ask them to select which derivations they want. Example:

> "Your primary format is blog articles. Here is what the system can derive from each article. Which of these do you want active?"

Then ask if there are any **reverse flows** or **independent formats** they also need. Example: "Do you also write standalone social posts that are NOT derived from articles? Do you write emails independently?"

For each active flow, note whether it is:
- **Automatic** (every time you create the primary, the derived content gets created too)
- **On demand** (you trigger it when you want, not every time)

---

### Part C: Asset Generation

**Purpose:** Configure what visual assets get generated for each content type in the pipeline.

Ask: "For each content type in your pipeline, what visual assets do you need?"

**Asset types:**

| Asset | Description | Typical use |
|-------|-------------|-------------|
| **Cover image** | Hero/banner image for the content | Blog articles, email headers |
| **Social image** | Platform-sized image with a key quote or stat | X posts, LinkedIn posts |
| **Carousel slides** | Multi-slide visual content | LinkedIn carousels, Instagram |
| **Infographic** | Data visualization or process diagram | Blog articles, social sharing |
| **Email header** | Branded header for newsletters | Email/newsletter |
| **Thumbnail** | Small preview image | Video thumbnails, link previews |

**How to present:**

For each content type the user activated in Part B, ask what assets they want generated. Example:

> "For your blog articles, do you want: cover image, social sharing images, infographics? For your social posts: standalone images, carousels?"

Some users want heavy visual content (an asset for every post). Others are text-focused and only want cover images for articles. Match their preference.

Also ask about asset generation approach:
- **AI-generated images** (DALL-E, Midjourney, etc.)
- **Template-based** (HTML to image with brand colors/fonts)
- **Manual** (user provides or sources images themselves)
- **Mix** (templates for social, AI for articles, manual for specific needs)

---

### Part D: Distribution & Scheduling

**Purpose:** Configure how finished content gets distributed.

**Questions to ask:**

1. **Social scheduling:** "Do you use a scheduling tool?"
   - Buffer, Hootsuite, Later, Publer, native platform scheduling, manual posting
   - "Do you want Claude to help with scheduling, or just draft the content?"

2. **Email distribution:** "How do you send emails?" (only if email is in the pipeline)
   - Mailchimp, ConvertKit, Beehiiv, Resend, Substack, Ghost, manual
   - "Do you want Claude to draft emails ready to paste into your tool, or just the content?"

3. **Publishing:** "How do you publish articles?" (only if articles are in the pipeline)
   - CMS (WordPress, Ghost, Webflow, custom)
   - Markdown files (static site, GitHub)
   - Manual copy/paste

4. **Cadence:** "How often do you want to publish?"
   - Per content type: articles (weekly, biweekly, monthly), social (daily, 3x/week), email (weekly, biweekly)
   - Or: "I do not have a fixed schedule, I publish when content is ready"

5. **Batch vs. continuous:** "Do you prefer to batch-create content (e.g., write 5 posts in one session) or create one piece at a time?"

---

### After confirmation, write: update `config.md` with full pipeline configuration

```markdown
## Content Pipeline

### Primary Format
- **Type:** Blog article
- **Cadence:** Weekly

### Content Flow
| Source | Derived | Mode | Assets |
|--------|---------|------|--------|
| Article | Social posts (X, LinkedIn) | Automatic | Social images |
| Article | Email newsletter | On demand | Email header |
| Article | LinkedIn carousel | On demand | Carousel slides |

### Independent Formats
| Format | Cadence | Assets |
|--------|---------|--------|
| Standalone social posts | 3x/week | Optional social image |

### Asset Generation
- **Approach:** Template-based (HTML to image) for social, AI-generated for article covers
- **Brand assets:** Read from brand/guidelines.md

### Distribution
| Channel | Tool | Claude's Role |
|---------|------|---------------|
| Social | Buffer | Draft + schedule |
| Email | ConvertKit | Draft only |
| Blog | WordPress | Draft as markdown |

### Scheduling
- **Style:** Batch (weekly content session)
- **Article day:** Monday
- **Social drip:** Tue, Thu, Sat
- **Email:** Friday
```

Also write: `pipeline.md` in the output directory

```markdown
# Content Pipeline

> Visual map of your content flow. Reference this when creating content to remember what gets derived from what.

## Flow

[Primary] → [Derived 1] → [Assets]
         → [Derived 2] → [Assets]
         → [Derived 3] → [Assets]

## When you create a new [primary format]:
1. Create the [primary] using /[skill]
2. Run /repurpose to generate [derived formats]
3. Review and adjust each derived piece
4. Schedule via [tool]

## Standalone content:
- [Independent formats] are created directly, not derived
- Use the appropriate platform spec from the framework
```

---

## Step 9: Proof Points (Optional)

**Purpose:** Collect credentials, results, stats, and case patterns that give content authority. This step is optional because not everyone has proof points ready, and they can be added over time.

**What to collect:**

**Personal proof:** Concrete results from your own work.
- "What results have you achieved that you could reference in content?"
- "Any specific numbers? Time saved, output increased, problems solved?"
- "What have you built or shipped that demonstrates your expertise?"

**Industry stats:** Verified external statistics relevant to your domain.
- "Are there industry stats you frequently cite?"
- "Any research reports, surveys, or benchmarks you reference?"
- For each stat: the number, the source, the date verified

**Case patterns:** Anonymized before/after patterns from your work.
- "Can you share any before/after stories from your work?"
- "These can be anonymized; we need the pattern, not the client name."
- For each: the before state, the after state, what made the difference

**Input paths:**

**Path A: Tell me.** Walk through each category conversationally. Ask follow-up questions to get specific numbers and context.

**Path B: Skip for now.** Create empty scaffold files that the user can fill in later. Proof points are the most optional step; the system works without them, it just produces content that relies more on arguments than evidence.

**After confirmation, write:** files in `proof/`
- `proof/personal-proof.md` (your results and credentials)
- `proof/industry-stats.md` (verified external statistics with sources)
- `proof/case-patterns.md` (anonymized before/after patterns)

Each stat or proof point includes enough context to be used credibly in content. For industry stats, always include the source and verification date.

---

## Post-Onboarding

After all 9 steps are complete:

### 1. Generate philosophy.md

Create a scaffold `philosophy.md` in the output directory. This file is a living document where the user records their positions, arguments, and recurring analogies. Start it with:

```markdown
# Content Philosophy

> Living document. Your positions, arguments, and analogies that content should be consistent with. Update this as your thinking evolves.

## Core Positions

[Add your key positions here. What do you believe about your industry/domain that not everyone agrees with?]

## Recurring Analogies

[Add analogies you use frequently to explain complex ideas.]

## Evolution Log

| Date | Change | Context |
|------|--------|--------|
| [today] | Initial setup | Content Skill Graph onboarding |
```

### 2. Print Summary

Show the user everything that was generated:

```
Content Skill Graph setup complete.

Config files saved to: [output directory]

Generated files:
  config.md              — Brand basics, platforms, pipeline, distribution
  pipeline.md            — Visual map of your content flow
  philosophy.md          — Positions scaffold (fill in over time)
  voice/brand-voice.md   — Core tone of voice
  voice/anti-patterns.md — Content quality gates
  voice/x-tone.md        — X platform tone [if selected]
  voice/linkedin-tone.md — LinkedIn platform tone [if selected]
  voice/email-tone.md    — Email tone [if selected]
  audience/[name].md     — [N] audience segments
  pillars/[name].md      — [N] content pillars
  brand/guidelines.md    — Visual brand identity
  proof/personal-proof.md    — Your proof points [or scaffold]
  proof/industry-stats.md    — Industry statistics [or scaffold]
  proof/case-patterns.md     — Case patterns [or scaffold]

Next steps:
1. Review the generated files and make any adjustments
2. Fill in philosophy.md with your core positions over time
3. Review pipeline.md to confirm your content flow
4. Use the content creation skills to produce on-brand content
5. The skills read from both the template files
   and your generated config to produce on-brand content
```

### 3. Remind About Template Location

Tell the user where the template files are (engine/, platforms/, workflows/, quality/, templates/) and that the content creation skills need to know both locations: template files and their generated config.
