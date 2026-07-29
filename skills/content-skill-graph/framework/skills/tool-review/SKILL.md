# /tool-review <tool-name>

Create a deep-dive review of a tool, product, or service after personal testing. Produces platform-native review posts for each of your configured platforms.

## Arguments

- `<tool-name>`: Name of the tool to review (required). Must be a tool you have personally tested for at least 2 weeks.

## Setup

```
TEMPLATE_DIR=~/.claude/skills/content-skill-graph/framework
CONFIG_DIR=<path-to-your-generated-config>
```

## IMPORTANT: Prerequisites

This is NOT a launch day reaction (that is `/new-tool`). This is a delayed, experience-based review. Before proceeding, confirm with the user:
1. Has the tool been used for at least 2 weeks?
2. What specific workflows was it tested in?
3. What were the surprises (positive and negative)?

If the tool has not been tested, suggest using `/new-tool` for a launch announcement instead.

## Execution

### Step 1: Understand the pipeline

Read `TEMPLATE_DIR/workflows/tool-deep-dive.md` for the review pipeline.

### Step 2: Ground in philosophy and pillars

Read `CONFIG_DIR/philosophy.md` for your positions and ecosystem context.
Read relevant pillars from `CONFIG_DIR/pillars/` that relate to tool evaluation.

### Step 3: Collect testing context

Ask the user about their experience:
- What specific tasks did they use the tool for?
- What worked better than expected?
- What disappointed?
- How does it compare to alternatives they have used?
- Would they recommend it, and to whom specifically?

### Step 4: Create review posts

For each platform selected in `CONFIG_DIR/config.md`:

1. Read the platform tone from `CONFIG_DIR/voice/`
2. Read the review template from `TEMPLATE_DIR/templates/tool-review-<platform>.md`
3. Read the platform format spec from `TEMPLATE_DIR/platforms/`
4. Write a platform-native review

Review structure (adapt framing per platform):
- What the tool claims vs what it actually does
- One specific workflow example showing it in action
- Pricing reality (hidden costs, tier limitations, what free tier gets you)
- Who should and should not use it
- Verdict

Each platform's review uses the same depth but different framing based on the audience.

### Step 5: Handle logo/image

Read `TEMPLATE_DIR/workflows/image-generation.md` for logo sourcing.
If the tool is already on your site, the logo exists. If not, follow the sourcing protocol.

### Step 6: Quality check

Read `TEMPLATE_DIR/quality/calibration.md` and run all 5 questions.
Read `CONFIG_DIR/voice/anti-patterns.md` and verify nothing violates the list.

### Step 7: Present for review

Show the user:
1. Review post for each platform (ready to copy-paste)
2. Any flags (unverified claims, missing context, pricing uncertainty)
3. If the review is substantial enough, suggest creating a full blog article using `/article`

## Key Rules

- This is experience-based, not marketing-based. Write from personal testing, not from the tool's website.
- Be honest about limitations. Real cons, not softened "areas for improvement."
- Pricing reality: include hidden costs, tier limitations, what the free tier actually gets you
- Each platform's review is written natively in its configured language
- Run the anti-patterns check before presenting
- Never generate tool logos with AI
