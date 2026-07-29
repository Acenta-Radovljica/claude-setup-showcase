---
name: content-skill-graph
description: Set up a personalized content creation system — 9-step onboarding that configures brand voice, audience, content pillars and workflows, then generates config files for branded content across platforms (X, LinkedIn, blog). Use when setting up or configuring a brand content system.
---

# /content-skill-graph

Set up a personalized content creation system for Claude Code. This skill walks you through a 9-step onboarding that configures your brand voice, audience, content pillars, and workflows, then generates all the config files Claude needs to create content that sounds like you.

## What This Does

The Content Skill Graph is a system of interconnected files that teach Claude how to create content for your brand across multiple platforms. It includes:

- **Engine files** (hooks, scheduling, repurposing rules, templates) that define content mechanics
- **Platform specs** (X, LinkedIn, blog, etc.) that define format rules per platform
- **Workflows** (article creation, repurposing, tool reviews) that define step-by-step pipelines
- **Quality gates** (calibration questions, content standards) that ensure quality

These template files are brand-agnostic. The onboarding generates your brand-specific configuration: voice, audience profiles, content pillars, visual brand, and proof points. After onboarding, the content creation skills (`/article`, `/repurpose`, `/new-tool`, `/tool-review`) use both to produce content that follows your brand voice and targets your audience.

## How to Run

Read the onboarding flow in `onboarding.md` (same directory as this file) and follow it step by step. The onboarding is interactive and conversational; each step presents options, Claude proposes based on what it learned, and the user confirms or adjusts.

### Before Starting

1. Confirm the **template location**: the content skill graph template files should be at a known path. Ask the user where they are. Default for this setup (the template files ship inside this skill): `C:/Users/maks1/.claude/skills/content-skill-graph/framework/`

2. Confirm the **output location**: where the generated config files will be saved. Ask the user to choose a directory. This is where their personalized content system will live. Suggest a sensible default based on their project context.

3. The onboarding takes 15 to 30 minutes depending on how much the user wants to customize.

### During Onboarding

- Follow the 9 steps in `onboarding.md` sequentially
- Each step has multiple input paths (describe, provide files, extract from URL, pick from presets)
- After each step, present what you understood and ask the user to confirm or adjust
- Save progress as you go: write each generated file immediately after the user confirms that step

### After Onboarding

- All config files are written to the output directory
- The content creation skills (`/article`, `/repurpose`, etc.) need to be configured to point at this directory
- Print a summary of everything that was generated and the next steps

## Output Structure

The onboarding generates these files in the user's output directory:

```
<output-directory>/
├── config.md              ← Brand basics, platforms, pipeline, distribution settings
├── pipeline.md            ← Visual map of your content flow (primary → derived → assets)
├── philosophy.md          ← Positions, arguments, recurring themes (starts as scaffold)
├── voice/
│   ├── brand-voice.md     ← Core tone of voice
│   ├── anti-patterns.md   ← What content must never do
│   └── [platform]-tone.md ← Per-platform tone variations (one per selected platform)
├── audience/
│   └── [icp].md           ← One file per target audience segment
├── pillars/
│   └── [pillar].md        ← One file per content theme
├── brand/
│   └── guidelines.md      ← Colors, fonts, visual style
└── proof/
    ├── personal-proof.md  ← Your results and credentials
    ├── industry-stats.md  ← Verified external statistics
    └── case-patterns.md   ← Anonymized patterns from your work
```
