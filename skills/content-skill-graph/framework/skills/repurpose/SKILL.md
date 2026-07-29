# /repurpose <slug>

Full content distribution pipeline for a published blog article. Creates platform-native posts for each of your configured platforms, organized into a multi-week drip schedule with supporting visuals.

## Arguments

- `<slug>`: The article identifier (required). Must match a published article.

## Setup

This skill requires two directories:

- **Template directory:** The Content Skill Graph template files. Set the path below.
- **Config directory:** Your generated config files from onboarding. Set the path below.

```
TEMPLATE_DIR=~/.claude/skills/content-skill-graph/framework
CONFIG_DIR=<path-to-your-generated-config>
```

Replace these paths with your actual directories before using this skill.

## Phase 1: Read and Understand

### Step 1.1: Read the skill graph

Read these files before proceeding:

From TEMPLATE_DIR:
1. `workflows/repurpose-article.md` for the full pipeline
2. `engine/repurpose-rules.md` for extraction criteria and drip schedule
3. `templates/article-extract-x.md` for short-form post template (if X is a selected platform)
4. `templates/article-extract-linkedin.md` for professional post template (if LinkedIn is selected)
5. `platforms/x-article.md` for long-form X Article format (if X is selected)
6. `platforms/linkedin-article.md` for long-form LinkedIn Article format (if LinkedIn is selected)

From CONFIG_DIR:
7. `config.md` for selected platforms and languages
8. Voice files for each selected platform (`voice/x-tone.md`, `voice/linkedin-tone.md`, etc.)
9. `voice/anti-patterns.md` for the hard no list
10. `philosophy.md` for consistent positioning

### Step 1.2: Read the source article

Read the published article. Extract and note:
- Title, slug, cover image path
- Core thesis
- Key sections and their arguments
- All statistics with their sources
- All analogies and metaphors
- All visual elements (images, diagrams, charts)

### Step 1.3: Determine output location

Create a folder for this article's repurposed content:
`CONFIG_DIR/content/articles/<slug>/`

---

## Phase 2: Create Folder Structure

Create the folder tree based on your selected platforms from `config.md`:

```
<slug>/
├── README.md
├── repurposing-plan.md
├── blog-article/
│   ├── article.md              (clean markdown reference copy)
│   ├── research.md             (if available from /article pipeline)
│   └── images/                 (original blog images)
├── social-articles/            (one subfolder per platform with long-form support)
│   ├── <platform>-article/
│   │   └── article.md
│   └── images/                 (all images in platform-ready format)
└── repurposing-posts/
    ├── week-1/
    │   ├── <platform>-post-1-<descriptor>/  (post.md + visual.png)
    │   └── ...
    ├── week-2/
    ├── week-3/
    └── week-4/
```

Create directories for each platform selected in `config.md`. Only create folders for platforms the user has configured.

---

## Phase 3: Generate Long-Form Articles (per platform)

For each platform that supports long-form articles (X Articles, LinkedIn Articles):

1. Read the platform spec from `TEMPLATE_DIR/platforms/`
2. Read the platform tone from `CONFIG_DIR/voice/`
3. Write the article in the language configured for that platform in `config.md`

Each long-form article is a **rewrite** for that platform's audience, not a reformatting. The core insights are the same; the framing, depth, and language are native to the platform.

**Cover image rule:** Use the blog cover image as the platform article cover. Remove the first image from the article body to avoid showing it twice.

---

## Phase 4: Extract Insight Units

Go through the source article and identify:

**(a)** The most surprising stat (challenges assumptions, reveals a gap)
**(b)** The most counterintuitive claim (goes against conventional wisdom)
**(c)** The most actionable takeaway (concrete action with clear outcome)
**(d)** Strong analogies or metaphors (compress complex ideas into something shareable)
**(e)** Personal experience or results (first-person authenticity)

Target: 4 to 6 insight units. Each becomes the seed for at least one post.

---

## Phase 5: Generate Repurposing Posts

### Step 5.1: Plan the drip schedule

Distribute posts across 4 weeks per the schedule in `TEMPLATE_DIR/engine/repurpose-rules.md`:
- Week 1 (launch): highest energy, strongest hooks, link to article
- Week 2: deep dives into specific insights
- Week 3: analogies, misconceptions, alternative angles
- Week 4: long-tail insights, follow-ups

For each selected platform, plan the post count. More posts for primary platforms, fewer for secondary.

### Step 5.2: Write each post

Each post gets its own subfolder inside the week folder:
- `post.md` with the post text, ready to copy-paste
- `visual.png` matching image for the post

Post format in `post.md`:
```
# <Platform> Post <N>: <Descriptor>

**Image:** visual.png
**Link:** <article-url>

---

<Post text, ready to copy-paste>
```

### Step 5.3: Post quality rules

Every post must:
- Stand alone without the article (not a teaser or "go read my article" link)
- Contain at least one specific detail (number, tool name, concrete example)
- Cover one insight per post, not a summary of the article
- Be written in the language configured for that platform
- Follow the platform tone from `CONFIG_DIR/voice/`
- Pass all checks in `CONFIG_DIR/voice/anti-patterns.md`
- Link to article at the end or naturally in text, never as the hook

---

## Phase 6: Export Visual Assets

1. Collect all images from the source article
2. Convert to platform-appropriate formats (PNG for social, WebP for web)
3. For HTML visual components: export to PNG using your preferred method
4. Apply brand colors from `CONFIG_DIR/brand/guidelines.md` for any new visuals
5. Place all platform-ready images in `social-articles/images/`

---

## Phase 7: Generate Supporting Files

### repurposing-plan.md
- Full distribution plan across all platforms
- Week-by-week post schedule with titles
- Image inventory and sources
- Additional repurposing options (carousel, video script)

### README.md
- Article title, slug, publish date
- File tree with descriptions
- Distribution summary
- Notes on which files are for publishing vs. internal reference

---

## Phase 8: Generate Share Hooks

For each platform that uses share dialogs, generate 3 to 5 share hook variations. Each takes a different angle: concrete scene, gap stat, reframe, analogy, or personal admission.

Save to `social-articles/<platform>-article/share-hooks.md`.

---

## Phase 9: Quality Check

1. Read `TEMPLATE_DIR/quality/calibration.md` and run all 5 questions against each post and article
2. Read `CONFIG_DIR/voice/anti-patterns.md` and verify nothing violates the list
3. Verify every post subfolder has both `post.md` and `visual.png`

---

## Phase 10: Present for Review

Show the user:
1. Folder structure (tree view)
2. Long-form article previews (first 3 paragraphs each)
3. Post count per week with titles
4. Image inventory
5. Share hooks
6. Any quality flags

## Key Rules

- This pipeline creates FILES ON DISK, not just conversation output
- Never translate line by line between platforms. Same idea, genuinely different posts.
- Each post lives in its own subfolder: `post.md` + `visual.png`
- Only create content for platforms selected in `config.md`
- Write each platform's content in the language configured for that platform
- Run the anti-patterns check before presenting
