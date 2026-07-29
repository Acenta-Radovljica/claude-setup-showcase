# Repurpose Article Workflow

> Takes a published blog article and produces the complete distribution package: platform-specific article rewrites, multiple weeks of repurposing posts with visual assets, and all supporting files saved to disk. Platform and language settings come from [[config.md]].

References: [[brand-voice]], [[anti-patterns]], [[calibration]], [[visual-components]], [[image-generation]]

---

## Step 1: Read the Article

Read the published article from your blog platform (file, CMS, or database).

Extract and note:
- Title
- Core thesis
- Key sections and their arguments
- All statistics with their sources
- All analogies and metaphors
- All expert quotes with attribution
- The cover image path and all image references
- All embedded visual components (HTML blocks, shortcodes, or embedded elements)

## Step 2: Create blog-article/article.md

Create a clean markdown reference copy of the published article:

1. Take the article content from your publishing format
2. Strip any platform-specific wrappers (template literals, CMS fields, shortcodes)
3. Replace embedded visual components with `[IMAGE: filename]` placeholders (descriptive name based on the component's purpose)
4. Strip purely decorative markup (style tags, decorative divs), keep semantic content
5. Ensure markdown formatting is clean
6. Save to `blog-article/article.md`

This is a human reference copy, not consumed by automation.

## Step 3: Copy Research File

Check if a research file exists for this article (created during the [[blog-article]] pipeline, saved at `research/<slug>.md`). If yes, copy to `blog-article/research.md`. If not, note in the README that research was not captured.

## Step 4: Create Folder Structure

Determine the next article number by checking existing folders in your content distribution directory.

Create the full directory tree:

```
<NN>-<slug>/
├── README.md
├── repurposing-plan.md
├── blog-article/
│   ├── article.md              (original draft, internal reference)
│   ├── research.md             (raw research, if available)
│   └── images/                 (blog images in web format)
├── social-articles/
│   ├── platform-1-article/
│   │   └── article.md          (rewritten for platform 1)
│   ├── platform-2-article/
│   │   ├── article.md          (rewritten for platform 2)
│   │   └── share-hooks.md      (share dialog hook options)
│   └── images/                 (all images in PNG for social media)
└── repurposing-posts/
    ├── week-1/
    │   ├── platform-1-post-1-<descriptor>/    (post.md + visual.png)
    │   ├── platform-2-post-1-<descriptor>/    (post.md + visual.png)
    │   └── ...
    ├── week-2/
    ├── week-3/
    └── week-4/
```

Adjust platform names and folder names to match the platforms configured in [[config.md]].

## Step 5: Extract Insight Units

Go through the article systematically and identify:

**(a) The most surprising stat**
A data point that challenges assumptions or reveals a gap. The kind of number that makes someone stop scrolling. Include the source.

**(b) The most counterintuitive claim**
An argument the article makes that goes against conventional wisdom or common advice. This is the angle that provokes discussion and replies.

**(c) The most actionable takeaway**
A specific thing the reader can do after reading. Not vague advice; a concrete action with a clear outcome.

**(d) Any strong analogy or metaphor**
Visual or conceptual comparisons that make abstract ideas click. These often perform well as standalone posts because they compress complex ideas into something shareable.

**(e) Any personal experience or result**
First-person accounts of building, testing, or operating. These carry authenticity that data alone cannot.

Target: 4 to 6 insight units. Each becomes the seed for one or more platform posts.

## Step 6: Generate Platform-Specific Article Rewrites

For each platform configured in [[config.md]], rewrite the blog article for that platform's specific audience. Each rewrite is NOT a copy or condensed version. It is a different article written from a different angle for a different reader.

### Rewrite dimensions to vary per platform

| Dimension | Adjust for each platform |
|-----------|---------------------------|
| Audience framing | Match the platform's primary audience (e.g., technical builders vs. business decision-makers) |
| Tone | Match the platform's norms (e.g., direct and opinionated for X, professional and practical for LinkedIn) |
| Evidence style | Adjust to what resonates (e.g., personal experience and code for X, case studies and business results for LinkedIn) |
| Structure | Platform-optimized (e.g., SEO headers for blog, selective depth for X, business framing for LinkedIn) |
| CTA | Platform-appropriate (e.g., discussion question for X, soft service awareness for LinkedIn) |
| Language | Use the language configured for that platform in [[config.md]] |
| Visual components | Use `[IMAGE: filename]` placeholders for manual insertion on platforms that do not support embedded HTML |

Format: strip all HTML components from text, add `[IMAGE: filename]` placeholders where visuals should appear. Word count should match platform norms (1,500 to 4,000 for long-form X articles, 1,000 to 3,000 for LinkedIn articles, etc.).

**Cover image:** Use the blog cover image (PNG from `social-articles/images/`) as the article cover. Remove the first image from the article body to avoid showing it twice (the cover image already appears at the top).

For platforms that benefit from document format for pasting (like LinkedIn's editor), convert to docx:

```bash
pandoc <article>.md -o <article>.docx
```

## Step 7: Generate Article Share Hooks

When articles are published on platforms that have share dialogs (LinkedIn, etc.), the platform shows a text field where the author writes a short hook. This text appears below the article link in the feed and is the primary driver of clicks.

Generate 3 to 5 hook versions for each platform that uses share dialogs. Save to the platform's article folder as `share-hooks.md`.

### Format

```markdown
# Share Hooks

### V1: [angle label]
[hook text]

### V2: [angle label]
[hook text]

...
```

### Hook principles

Each version should take a **different angle** from the article. Good angles include:

- **Concrete scene:** Open with a specific moment or task from the article, create curiosity about the outcome
- **The gap stat:** Use a surprising statistic that reveals a disconnect the reader has not considered
- **Reframe:** Challenge what the reader thinks they know about a familiar concept
- **Analogy:** Use the article's strongest analogy as a standalone hook
- **Personal admission:** Start with an honest statement about the creator's background that makes the reader curious about what follows

### Quality rules

- Follow your brand voice for the target platform's language and tone
- No dashes as punctuation, no dramatic fragment pairs
- No superlatives, no FOMO, no fake founder voice
- Each hook must work standalone in a feed without the article title visible
- Keep each hook to 2 to 4 sentences maximum
- The hook must create curiosity or recognition, not summarize the article

### What to avoid

- Throat-clearing openings ("I just wrote an article about...")
- Direct summaries of the article content
- Generic hype ("AI is changing everything...")
- CTAs or promotional language
- Repeating the article title

Present the hooks to the user for selection. The chosen hook is entered manually into the platform's share dialog when publishing.

## Step 8: Export Visual Assets

### 8a: Copy blog images

Copy all images referenced in the article from your blog's public assets directory to `blog-article/images/`.

### 8b: Export embedded visual components

For each embedded visual component found in the article:

1. Create a standalone HTML file suitable for screenshot or image export
2. Self-contained: all CSS inline, fixed width appropriate for your target resolution
3. Export using your preferred HTML-to-image tool (Puppeteer script, browser screenshot, or a service like html-to-image)
4. Copy exported PNGs to `social-articles/images/`

If you have a dedicated asset generator or export pipeline, use that. If not, alternatives include:
- Puppeteer with `element.screenshot()` for precise element capture
- Browser-based screenshot tools
- Online HTML-to-image conversion services

### 8c: Convert blog images to PNG for social use

Blog images may be in web-optimized formats (WebP, AVIF). Convert to PNG for social media compatibility:

```bash
# macOS
sips -s format png <source-image>.webp --out <destination>.png

# Cross-platform (requires ImageMagick)
convert <source-image>.webp <destination>.png
```

After this step, `social-articles/images/` contains ALL images in PNG format: blog images converted from web formats plus exported visual components.

## Step 9: Create Platform Posts

For each extracted insight, create posts following the weekly schedule.

### Post subfolder format

Each post gets its own subfolder inside the week folder. The subfolder name is the post identifier. Inside are two files:

- `post.md` with this structure:
  ```markdown
  # <Platform> Post <N>: <Descriptor>

  **Image:** visual.png
  **Link:** <your-blog-url>/<slug>

  ---

  <Post text, ready to copy-paste>
  ```

- `visual.png` is the matching image for this post

Example:
```
week-1/
├── x-post-1-article-launch/
│   ├── post.md
│   └── visual.png
├── linkedin-post-1-article-launch/
│   ├── post.md
│   └── visual.png
└── ...
```

### Visual asset pairing

Each post's `visual.png` is either:
- Copied from `social-articles/images/` (blog image or exported visual that matches the post's insight)
- A newly created visual exported through your image export pipeline

### Weekly distribution

Adapt this schedule to the platforms configured in [[config.md]]. The pattern below is a template; adjust platform names and posting frequency to match your setup.

**Week 1 (launch):**
- Platform A: launch post (hook, link to article) + 1 to 2 standalone insight posts
- Platform B: launch post + 1 analogy or context post

**Week 2:**
- Platform A: 2 to 3 posts (deeper angles, stats, setup reveals)
- Platform B: 1 to 2 posts (adoption gap, build story)

**Week 3:**
- Platform A: 2 to 3 posts (analogy, tool agnostic, misconception)
- Platform B: 1 post (deeper concept)

**Week 4:**
- Platform A: 1 to 2 posts (deep dive angles, forward-looking)
- Platform B: 1 post (implications, future)

Target total: aim for 10+ posts on your primary short-form platform, 5+ on your primary long-form platform. Scale up or down based on the depth of the source article and the number of insight units extracted.

### Short-form platform posts (e.g., X)

- Standalone, one sharp point, concrete detail
- Open with the insight itself, not a reference to the article
- Link at the end or in a reply, never as the hook
- Follow the platform-specific voice from [[brand-voice]]

### Long-form platform posts (e.g., LinkedIn)

- Rewrite the insight for the platform's audience (not a direct copy from the article)
- Frame around relevant consequences: business impact, efficiency, competitive positioning
- Natural tone that sounds conversational, not translated
- Follow the platform-specific voice from [[brand-voice]]

## Step 10: Generate Supporting Files

### repurposing-plan.md

Document the full distribution plan:
- Full article versions (which platforms, which languages)
- Week by week schedule with post titles
- Image inventory
- Additional repurposing options (carousel, video script, newsletter)

### README.md

Document the folder:
- Article title, slug, URL, publish date
- File tree with descriptions
- Distribution plan summary
- Notes (which files are for publishing vs internal reference)

## Step 11: Quality Check

Run through [[calibration]] for each post and all article rewrites:

- [ ] No dashes as punctuation
- [ ] No dramatic fragment pairs
- [ ] All stats sourced
- [ ] Posts stand alone (not teasers)
- [ ] Platform-specific posts match the target platform's voice
- [ ] Non-English content reads naturally (not translated English)
- [ ] Each post has a clear single point
- [ ] Links are correct (pointing to your published blog URL)
- [ ] Every post subfolder has both `post.md` and `visual.png`
- [ ] No privacy violations (check [[config.md]] for any exclusion rules)
- [ ] Week by week schedule is realistic

## Step 12: Present Summary

Show the user:

1. Folder structure (tree view)
2. Article rewrite previews (first 3 paragraphs of each)
3. Post count per week with titles
4. Image inventory (sources and assignments)
5. Article share hooks (all versions for each platform)
6. Any quality issues found

**Never commit or push without explicit user approval.**

## Step 13: Schedule Posts (Optional)

If you have a social media scheduling tool connected (Buffer, Typefully, Publer, or similar), schedule the approved posts automatically.

### Scheduling workflow

1. **Host images:** Place post images in a publicly accessible location (your website's public assets directory, CDN, or image hosting service). Commit and deploy if needed.

2. **Configure scheduling:** Use your scheduling tool's API or MCP integration to create posts with:
   - The post text from `post.md`
   - The image URL
   - The scheduled date and time based on your posting cadence

3. **Posting cadence:** Define your optimal posting times per platform in [[config.md]]. Consider:
   - Your audience's timezone and browsing habits
   - Platform-specific best practices for posting times
   - Spacing posts across the week to avoid clustering

4. **Timezone handling:** If your scheduling tool requires UTC or ISO 8601 timestamps, calculate the correct offset based on your local timezone and DST rules.

5. **Free tier limits:** If on a free plan, check post limits per channel. Schedule in batches if needed.

6. **Confirm:** After scheduling, present a summary table with date, time, platform, post title, and status.

If no scheduling tool is available, the post files in the folder structure serve as a manual publishing guide.

---

## Reference

Use the output from your first complete repurpose run as the quality and structure benchmark. That run establishes the standard for folder structure, post count, visual quality, and voice calibration. Every subsequent run should match or exceed it.
