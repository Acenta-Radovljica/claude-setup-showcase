# Platform Specification: X Post (Short)

> The atomic content unit on X. One idea, compressed into a format that can be scanned in under 30 seconds. Targets the audience defined in [[audience/]] using the voice defined in [[voice/x-tone]].

References: [[voice/x-tone]], [[voice/brand-voice]], [[engine/hooks]], [[engine/templates]], [[voice/anti-patterns]], [[config.md]]

---

## What It Is

A short X post delivers one sharp observation, one tool take, or one reframe. Your audience scrolls fast and engages only with content that earns their attention. The constraint is never character count; it is attention. Most short posts should land their point in a few sentences.

If your account is verified (X Premium), you have a 25,000 character limit. That limit is irrelevant for this format. Short posts are about compression, not expansion.

---

## Format Constraints

- **Character target:** Under 500 characters for most posts. This format is about density and clarity.
- **Thread policy:** No threads. If your account supports long single posts (verified), anything that would have been a thread becomes either a short post (if the idea is simple) or a long post ([[platforms/x-long-post]]).
- **Links:** If a link is included (article, landing page, resource page), it goes at the very end of the post. Never embed a link in the middle of a sentence or between paragraphs.
- **Hashtags:** Zero. The X algorithm does not reward hashtags for accounts with organic engagement. They reduce perceived quality.
- **Mentions:** Tag tools or people only when genuinely relevant, never for reach farming.
- **Language:** Write in the language configured for X in [[config.md]].

---

## Content Structure

Every short post follows one of the post patterns defined in [[engine/hooks]]:

| Pattern | What It Does | Example Shape |
|---------|-------------|---------------|
| Guide teaser | Surfaces one insight from a published article to drive clicks | Observation, supporting detail, link |
| Observation from today's work | Documents a real workflow moment or discovery | Situation, what happened, what it means |
| Tool take | States a clear opinion about a tool, framework, or practice | Claim, evidence from personal use, implication |
| Reframe | Takes a common belief and repositions it with a different angle | Common assumption, why it is wrong or incomplete, better framing |

The unifying rule: **one idea per post.** If you find yourself writing "also" or "another thing," the post contains two ideas. Split them.

### Line Breaks

Use line breaks to create visual rhythm. A wall of text gets scrolled past. Short paragraphs (1 to 3 sentences each) separated by blank lines are the standard format on X.

---

## Visual Requirements

Visuals are optional for short posts. Most short posts work as text only.

When a visual is included:

- **Format:** Standard X image dimensions (1600x900 recommended, 16:9 aspect ratio)
- **Generation:** Use your image export pipeline (HTML to PNG, design tool, or a clean screenshot of the tool/workflow being discussed)
- **Brand:** Apply your brand colors if you have designed graphics, but screenshots of actual tools are often more effective than polished visuals
- **Alt text:** Always include descriptive alt text for accessibility

Do not force a visual onto a post that works better as pure text. Visuals should add information, not decoration.

---

## Voice Reference

Follow [[voice/x-tone]] for all X posts.

Core principles: direct, technically competent but accessible, opinionated without being aggressive, grounded in real experience. Write as a practitioner sharing observations, not as a thought leader performing authority.

Review [[voice/anti-patterns]] before publishing. No hype words, no dramatic fragment pairs, no fabricated statistics.

---

## Examples

Adapt these structures with examples relevant to your brand and domain.

### Example 1: Tool Take

```
[Tool name] with [proper configuration/setup] is a fundamentally different tool than [tool name] without one.

The model is the same. The capabilities are the same. The difference is context, and context is what turns [generic category] into [specific value proposition].

Most people who say "[category] tools don't work" have never given the tool enough information to succeed.
```

### Example 2: Observation from Today's Work

```
Spent 3 hours today building [something specific] that would have taken [longer timeframe] with the old approach.

Not because I'm faster. Because I [described the specific method or tool configuration] and let [the tool] handle [the repetitive part] while I reviewed each step.

The leverage isn't speed. It is the ability to operate at a higher level of abstraction.
```

---

## Pre-Publish Checklist

1. The post contains exactly one idea. Reading it back, there is no "and also" moment.
2. A reader can extract the core point within 15 seconds of scanning.
3. No hashtags anywhere in the post.
4. If a link is present, it is at the very end.
5. The opening line would make someone stop scrolling (run it against [[engine/hooks]] patterns).
6. No hype words from [[voice/anti-patterns]].
7. No dramatic fragment pairs.
8. No dashes used as punctuation (commas, semicolons, or sentence restructuring instead).
9. The post sounds like something a real person would say to a colleague, not something a marketing team would approve.
10. Voice matches [[voice/x-tone]].
11. Language matches the X language configured in [[config.md]].
