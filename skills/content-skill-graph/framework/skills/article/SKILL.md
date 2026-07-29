# /article <topic>

Write a thought leadership blog article using your Content Skill Graph configuration.

## Arguments

- `<topic>`: The article topic or angle (required). Can be a phrase, a question, or a rough idea.

## Setup

This skill requires two directories:

- **Template directory:** The Content Skill Graph template files (engine/, platforms/, workflows/, quality/, templates/). Set the path below.
- **Config directory:** Your generated config files from onboarding (voice/, audience/, pillars/, proof/, config.md, philosophy.md). Set the path below.

```
TEMPLATE_DIR=~/.claude/skills/content-skill-graph/framework
CONFIG_DIR=<path-to-your-generated-config>
```

Replace these paths with your actual directories before using this skill.

## IMPORTANT: Alignment First

Do NOT start writing immediately. The first step is alignment with the user:
1. Ask clarifying questions about the intended audience, depth level, and angle
2. Suggest 2 to 3 specific angles based on the topic
3. Present 3 title options
4. Agree on thesis, audience, sections, and tone before writing begins

Only proceed to writing after both sides agree.

## Execution

### Step 1: Understand the full pipeline

Read `TEMPLATE_DIR/workflows/blog-article.md` for the 10-phase article pipeline.

### Step 2: Ground in philosophy

Read `CONFIG_DIR/philosophy.md` for your living positions, analogies, and arguments. The article must be consistent with these positions.

### Step 3: Identify the content pillar

Read the relevant file from `CONFIG_DIR/pillars/` that this topic maps to. List the available pillars and select the best fit.

### Step 4: Understand the format

Read `TEMPLATE_DIR/platforms/website-blog.md` for article structure, visual component guidance, TOC behavior, and SEO requirements.

### Step 5: Understand voice and anti-patterns

Read `CONFIG_DIR/voice/brand-voice.md` for your brand voice.
Read `CONFIG_DIR/voice/anti-patterns.md` for the hard no list.

### Step 6: Gather proof points

Read `CONFIG_DIR/proof/industry-stats.md` for verified external statistics.
Read `CONFIG_DIR/proof/personal-proof.md` for your own results.
Only use stats that are verified and sourced. Never fabricate numbers.

### Step 7: Save research output

Save the compiled research to `CONFIG_DIR/content/research/<slug>.md`. This file is used by `/repurpose` later.

The file should contain:
- Key statistics with their sources (organization, publication, year, URL)
- Expert quotes with attribution
- Gaps identified in existing coverage
- Potential counterarguments noted
- Any raw notes or search results that informed the article

### Step 8: Create visual components

Read `TEMPLATE_DIR/workflows/visual-components.md` for visual content patterns. Apply your brand design from `CONFIG_DIR/brand/guidelines.md` for colors and fonts.

### Step 9: Handle images

Read `TEMPLATE_DIR/workflows/image-generation.md` for AI image generation guidance, logo sourcing, and image optimization.

### Step 10: Assemble the article

Read `TEMPLATE_DIR/templates/article-scaffold.md` for the article structure scaffold. Write the article in the format your blog platform expects (see `TEMPLATE_DIR/platforms/website-blog.md` for platform-specific notes).

### Step 11: Quality check

Read `TEMPLATE_DIR/quality/calibration.md` and run all 5 questions.
Read `TEMPLATE_DIR/quality/hormozi-standard.md` and verify the article passes the free-beats-paid test.

### Step 12: Update philosophy

After the article is finalized, update `CONFIG_DIR/philosophy.md` with any new positions, arguments, or analogies that emerged during writing.

### Step 13: Present for review

Show the user the complete article with all visual components described. Wait for approval.

## Key Rules

- Alignment before writing. Always.
- Every article connects to at least one content pillar
- The Hormozi standard: free content better than competition's paid content
- Run the anti-patterns check from `CONFIG_DIR/voice/anti-patterns.md` before presenting
- Visual components should use your brand colors and fonts from `CONFIG_DIR/brand/guidelines.md`
- Save research output so `/repurpose` can use it later
