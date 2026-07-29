# /new-tool <url>

Review and publish a new tool, product, or resource on your site, then generate announcement posts for your configured platforms.

## Arguments

- `<url>`: The tool's website URL, or a blog post / changelog / press release about an update (required)

## Setup

```
TEMPLATE_DIR=~/.claude/skills/content-skill-graph/framework
CONFIG_DIR=<path-to-your-generated-config>
```

## Execution

### Step 1: Detect new vs update

Read `TEMPLATE_DIR/workflows/new-tool.md`, starting with the detection step.

Check if this tool already exists in your content system or on your site. Tell the user which path: "This is a new tool, I will add it" or "This tool already exists, I will update it."

### Step 2: Understand the data structure

Read `TEMPLATE_DIR/templates/content-data-scaffold.md` for the structured data scaffold.
Read `TEMPLATE_DIR/platforms/website-tool.md` for page format rules and section patterns.

If updating: also read the existing tool entry to understand what needs to change.

### Step 3: Research the tool

1. Scrape the tool URL to understand features, positioning, and pricing
2. Check the tool's docs for technical details
3. Research pricing tiers, limitations, and hidden costs
4. Look for the official announcement on X (for quote posting if available)
5. If updating: scrape the homepage and pricing page to catch additional changes

### Step 4: Create or update the tool entry

Follow the procedure in `TEMPLATE_DIR/workflows/new-tool.md`:
- Create the structured data entry for your site
- Source the official logo (never generate logos with AI; use the 5-step sourcing protocol from `TEMPLATE_DIR/workflows/image-generation.md`)
- If updating: compare new info against the existing entry and update affected sections

### Step 5: Generate announcement posts

For each platform selected in `CONFIG_DIR/config.md`:

1. Read the platform tone from `CONFIG_DIR/voice/`
2. Read the announcement template from `TEMPLATE_DIR/templates/tool-announce-<platform>.md`
3. Write a platform-native announcement

Each platform gets a genuinely different post. The insight can be the same; the framing and language must be native to the platform and its audience.

If an official X release post exists, use quote post format on X.

### Step 6: Quality check

Read `TEMPLATE_DIR/quality/calibration.md` and run all 5 questions against the tool entry and announcement posts.
Read `CONFIG_DIR/voice/anti-patterns.md` and verify nothing violates the list.

### Step 7: Present for review

Show the user:
1. The tool data entry (noting what changed if this is an update)
2. Announcement post for each platform (ready to copy-paste)
3. Logo file location
4. Any flags (missing pricing, unverified claims, logo issues, missing X post)

## Key Rules

- Never fabricate statistics or pricing. Verify from the tool's actual website.
- Never generate logos with AI. Source the official logo.
- Each platform's announcement is written natively, not translated
- Write each post in the language configured for that platform in `config.md`
- Run the anti-patterns check before presenting
