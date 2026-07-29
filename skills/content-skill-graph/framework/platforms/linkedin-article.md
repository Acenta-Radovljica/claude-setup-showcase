# Platform Specification: LinkedIn Article (Long Form)

> Native long form publishing on LinkedIn. Used for walkthroughs, deep comparisons, market analysis, and blog article repurposing for your LinkedIn audience.

References: [[voice/linkedin-tone]], [[workflows/repurpose-article]], [[engine/repurpose-rules]], [[platforms/website-blog]], [[audience/]], [[voice/anti-patterns]], [[config.md]]

---

## What It Is

A LinkedIn Article is the long form native publishing format on LinkedIn. It supports rich formatting (headers, bold, italic, bullet points, images, links) and appears in followers' feeds with a preview image and title. Unlike a LinkedIn post, which lives in the feed and is consumed quickly, a LinkedIn Article is a destination: the reader clicks through and reads it in LinkedIn's article reader.

This format is used when a topic needs more space than an 800 word post can provide: a walkthrough of how specific tools apply to a certain industry, a deep comparison of approaches, a market analysis relevant to your audience, or a repurposed blog article rewritten for LinkedIn readers.

---

## Format Constraints

- **Language:** Use the language configured for LinkedIn in [[config.md]]. Headers, body text, and image captions should all be in the same language. Tool names stay in English only when no equivalent exists.
- **Length:** 1,000 to 3,000 words. Long enough for genuine depth, short enough that a busy professional reads it during a coffee break.
- **Formatting:** LinkedIn Articles support H2 headers, bold, italic, bullet points, numbered lists, inline images, and hyperlinks. Code blocks are not well supported; avoid them or use screenshots instead.
- **Headers:** Write headers in the same language as the body text.
- **Links:** Inline links are acceptable in LinkedIn Articles (unlike posts, articles are not suppressed for containing links).

---

## Content Structure

### Hook Paragraph

The opening paragraph must do two jobs: function as the preview text that appears in the LinkedIn feed, and orient the reader once they click through. Start with a specific situation, observation, or number that your audience would immediately recognize.

### Sections with Headers

Break the article into 4 to 7 sections, each with a clear H2 header. Every section should be self-contained: a reader who skips to it should still get value.

Within each section:

- **Opening:** State the section's key point in 1 to 2 sentences
- **Body:** Develop the point with evidence, examples, or practical explanation
- **Grounding:** Connect the point to the reality your audience faces (their industry, company size, market, role)

### The "What Does This Mean for My Company" Test

Every section must pass this test. If a section explains a concept, technology, or trend without connecting it to what it means for a company in your audience's profile, the section is incomplete. Your readers are not interested in the technology itself; they are interested in its consequences for their business.

### Practical Examples

Include at least two concrete examples that your audience can relate to. These should reference situations, industries, or challenges that are familiar in the market you serve. Generic examples do not land; specific ones do.

### Closing Insight

End with a thought that the reader can relate to from their own experience. This is not a CTA, not a pitch, and not a summary of what was already said. It is a new angle on the topic that the reader takes away and thinks about after closing the article.

Do not end with a pitch or any variation of "reach out to learn more." The closing earns trust, not leads.

---

## Repurposing from Blog Articles

When a LinkedIn Article is derived from your blog, follow [[engine/repurpose-rules]] and [[workflows/repurpose-article]].

Critical distinction: the LinkedIn Article is **not** a translation of the blog post. It is a complete rewrite.

| Dimension | Blog Article | LinkedIn Article |
|-----------|-------------|------------------|
| Audience | Your blog audience (per [[audience/]]) | Your LinkedIn audience (per [[audience/]]) |
| Language | Blog language (per [[config.md]]) | LinkedIn language (per [[config.md]]) |
| Framing | Per blog audience interests (e.g., technical depth, SEO intent) | Business consequences, team impact, competitive positioning |
| Examples | Global or industry standard | Localized to your LinkedIn audience's market, company size, and industry |
| Tone | Per [[voice/brand-voice]] | Per [[voice/linkedin-tone]], more advisory and practical |
| Closing | Per blog format conventions | Relatable business thought, no pitch |

The LinkedIn Article should share the same underlying research and knowledge as the blog article but present it through a completely different lens.

---

## Visual Requirements

- **Images:** Can include visuals from the blog article, but any text in images should be understandable by your LinkedIn audience. If a blog visual contains text in a different language, either recreate it or choose a different visual.
- **Cover image:** LinkedIn Articles display a cover image at the top. This appears in the feed preview. Use a relevant image that works at both wide (article header) and square (feed card) crops.
- **Inline images:** Supported. Use to break up long sections or illustrate specific points.
- **Dimensions:** LinkedIn Article images display at full article width. Standard landscape aspect ratios (16:9, 3:2) work well.
- **Generation:** Use your image export pipeline for designed visuals, screenshots for tool interfaces.

---

## Voice Reference

Follow [[voice/linkedin-tone]].

The voice for LinkedIn Articles is the same as for LinkedIn posts but with room for more developed arguments. Narrative, practical, consequence driven. Write as someone who works with these tools daily and translates that experience into business language for people who make operational decisions.

The additional length compared to a post is for depth and evidence, not for filler or repetition. Every paragraph should earn its place.

---

## Example: Article Structure Outline

```
# [Title That Addresses a Business Concern Your Audience Feels]

[Hook paragraph: specific business situation your audience recognizes]

## [Section 1: The Cost of Inaction, Made Concrete]

[Concrete cost analysis of delayed action for a typical company in your audience]

## [Section 2: What [the concept] Actually Means for a [size] Company]

[Practical definition, sized for your audience's reality, not the enterprise version]

## [Section 3: Three Areas Where Companies Like Yours Are Already Doing This (and Results)]

[Real examples from your market or industry, anonymized if needed]

## [Section 4: The Most Common Objection: "We Are Too Small for This"]

[Addressing the objection with evidence that companies of this size benefit most]

## [Section 5: How to Start Without a Massive Budget]

[Practical first steps, low cost, low risk]

[Closing insight: relatable thought about the reader's own company situation]
```

---

## Pre-Publish Checklist

1. The article is written in the language configured for LinkedIn in [[config.md]].
2. The hook paragraph works as a LinkedIn feed preview that earns the click through.
3. Every section passes the "what does this mean for my company" test.
4. At least two concrete examples reference situations familiar to your LinkedIn audience.
5. Length is between 1,000 and 3,000 words. Under 1,000, it should be a post. Over 3,000, it needs tighter editing.
6. The closing is a relatable business thought, not a CTA or pitch.
7. All images with text are understandable by your audience (language match).
8. Cover image is included and works at both wide and square crops.
9. No hype words, no dramatic fragment pairs, no dashes as punctuation.
10. Voice matches [[voice/linkedin-tone]].
11. Reviewed against [[voice/anti-patterns]].
12. If repurposed from a blog article, verified against [[engine/repurpose-rules]] and confirmed to be a genuine rewrite, not a translation.
