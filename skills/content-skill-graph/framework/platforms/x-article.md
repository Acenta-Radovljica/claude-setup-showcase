# Platform Specification: X Article (Long Form)

> Native long form publishing on X. Used for comprehensive reviews, detailed workflow documentation, technical deep dives, and repurposing blog articles with a different angle for the X audience.

References: [[voice/x-tone]], [[workflows/repurpose-article]], [[engine/repurpose-rules]], [[platforms/website-blog]], [[voice/anti-patterns]], [[config.md]]

---

## What It Is

X Articles are a native long form content format within the X platform. They support rich formatting (headers, bold, italic, links, images, code blocks) and appear in followers' feeds with a preview that functions like a regular post. Clicking through opens the full article in X's reading interface.

This format is used when a topic requires more depth than even a long post can provide: comprehensive tool comparisons, detailed workflow documentation, technical deep dives, or full article repurposing for the X audience.

An X Article is **not** a copy of your blog article. It is a complete rewrite with a different angle. Your blog article may be optimized for search and business outcomes. The X Article is written for practitioners: more technical, more opinionated, more "here is how I actually do this."

---

## Format Constraints

- **Length:** 1,500 to 4,000 words. Long enough for genuine depth, short enough that a motivated reader finishes it in one sitting.
- **Formatting support:** Headers (H2, H3), bold, italic, inline links, images, code blocks. X Articles render rich text natively.
- **Code blocks:** Supported. Use for CLI commands, configuration examples, and code snippets. Keep them short and focused.
- **Images:** Inline images supported. They appear at full width within the article body.
- **TOC:** X Articles do not have a native table of contents widget, but you can create a manual TOC at the top using linked headers or a numbered list of sections.
- **Language:** Write in the language configured for X in [[config.md]].

---

## Content Structure

### Feed Hook (appears in the timeline)

The first paragraph of the X Article doubles as the post preview in followers' feeds. This paragraph must work as a standalone hook that earns the click through to the full article. Write it as if it were a regular X post: punchy, specific, and curiosity generating.

### Introduction

After the hook, a brief section (2 to 3 paragraphs) that frames the article's core question or thesis. What is this article about, why does it matter right now, and what will the reader know by the end?

### Manual TOC (optional but recommended for articles over 2,000 words)

A simple numbered list of section titles. This gives the reader a map of what is ahead and sets expectations for length.

### Body Sections

Each section should be self-contained enough that a reader who skips to it still gets value. Structure each section with:

- **H2 header** that clearly communicates what the section covers
- **Opening sentence** that states the section's key point
- **Evidence and examples** that ground the point in real experience
- **Closing insight** that connects back to the article's thesis

Subsections (H3) are used when a section needs internal organization, but keep nesting shallow. H2 to H3 is the maximum depth.

### Closing

End with a discussion question or a thought that invites engagement. X Articles thrive on replies and quotes. The closing should make readers want to share their own experience or perspective.

Do not end with a sales pitch or CTA. A discussion question is the strongest closer for this format.

---

## Repurposing from Blog Articles

When an X Article is derived from a blog article, follow [[engine/repurpose-rules]] and [[workflows/repurpose-article]].

Key differences from the blog version:

| Dimension | Blog Article | X Article |
|-----------|-------------|----------|
| Audience framing | Business outcomes, ROI, decision making (per your blog audience) | Technical practice, workflow efficiency, builder perspective (per your X audience) |
| Tone | Authoritative but approachable | Opinionated and direct, peer to peer |
| Evidence style | Case studies, business results | Personal experience, specific tool configurations, code examples |
| Structure | SEO optimized headers, comprehensive coverage | Selective depth on the most interesting angles |
| CTA | Soft service or product awareness | Discussion question, no pitch |
| Visual components | Designed HTML components | Screenshots, annotated images, simpler formatting |

The X Article should feel like a completely different piece of content that happens to cover related ground, not like a reformatted version of the same article.

---

## Visual Requirements

- **Inline images:** Use images from the blog article when they are relevant, or generate new ones for X context
- **Screenshots:** Preferred over designed graphics for a technical audience. Real tool interfaces are more credible than polished marketing visuals.
- **Annotated screenshots:** Add callouts or highlights to draw attention to the relevant detail
- **Code screenshots:** For longer code examples, a well formatted screenshot can be more readable than X's code block rendering
- **Dimensions:** X Articles display images at full article width. No specific dimension constraint, but 16:9 or 4:3 aspect ratios work well.
- **Alt text:** Required on all images

---

## Voice Reference

Follow [[voice/x-tone]].

X Articles allow the most space for nuance and depth among X formats, but the voice remains the same: direct, technical, opinionated, grounded in real experience. The additional length is for developing arguments and showing real examples, not for hedging or filler.

---

## Examples

### Example: Article Structure Outline

```
# [Provocative Title That Challenges a Common Assumption]

[Hook paragraph that appears in feed]
I spent last month testing [specific approach/tools/methods].
Most [your audience] are leaving [significant value] on the table because of
[surprising root cause], not because of [what they think the problem is].

## [Section 1: The Problem Nobody Talks About]

[Section introducing the core thesis]

## [Section 2: What the Right Approach Actually Looks Like]

[Detailed walkthrough with specific tools, configurations, methods]

## [Section 3: The Approaches I Compared]

[Comparison with real testing, specific results]

## [Section 4: Real Results from Real Projects]

[Specific projects, specific measurements, specific outcomes]

## [Section 5: What This Means for Your Workflow]

[Practical takeaways the reader can implement today]

[Closing: discussion question about readers' own approaches]
```

---

## Pre-Publish Checklist

1. The first paragraph works as a standalone X post that earns the click through.
2. The article develops a clear thesis and every section connects back to it.
3. The content is a genuine rewrite for the X audience, not a reformatted blog post. Compare side by side with the source article to verify different framing.
4. Length is between 1,500 and 4,000 words. Under 1,500, it should be a long post. Over 4,000, it needs tighter editing.
5. Each section is self-contained enough to deliver value if read in isolation.
6. At least three concrete examples, workflow details, or real results are included.
7. The closing is a discussion question, not a pitch or CTA.
8. All images have alt text.
9. No hype words, no dramatic fragments, no dashes as punctuation.
10. Voice matches [[voice/x-tone]] throughout.
11. Reviewed against [[voice/anti-patterns]].
12. If repurposed from a blog article, verified against [[engine/repurpose-rules]].
13. Language matches the X language configured in [[config.md]].
