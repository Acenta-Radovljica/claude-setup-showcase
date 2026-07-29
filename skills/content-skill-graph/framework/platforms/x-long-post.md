# Platform Specification: X Long Post

> Extended single posts that use the verified account's character limit for tool reviews, article extracts, and detailed workflow walkthroughs. Still a single post, never a thread.

References: [[voice/x-tone]], [[engine/hooks]], [[engine/templates]], [[voice/anti-patterns]], [[config.md]]

---

## What It Is

A long X post occupies the space between a short post and a full X Article. It is a single post (never a thread) that takes advantage of the verified account's extended character limit to develop an argument with supporting evidence, walk through a specific workflow, or deliver a tool review with enough detail to be genuinely useful.

The audience is the same as your short posts (defined in [[audience/]]). The difference is that the reader has already been hooked (by the opening lines visible in their feed) and has chosen to tap "Show more" to read the full post.

---

## Format Constraints

- **Character range:** Typically 500 to 2,000 characters. Long enough to develop one argument with evidence, short enough to be read in under two minutes.
- **Thread policy:** No threads. This is always a single post. If the content exceeds 2,000 characters and cannot be compressed, consider writing an X Article ([[platforms/x-article]]) instead.
- **Links:** Same rule as short posts. If included, the link goes at the very end.
- **Hashtags:** Zero.
- **Line breaks:** Essential. Long posts without visual breathing room get abandoned. Use blank lines between paragraphs (1 to 3 sentences each).
- **Language:** Write in the language configured for X in [[config.md]].

---

## Content Structure

The long post follows a four part structure:

### 1. Hook (1 to 2 sentences)

The first lines visible before "Show more" in the feed. This must work as a standalone statement that creates enough curiosity or recognition to earn the tap. Apply [[engine/hooks]] patterns.

### 2. Body (core argument with evidence)

The main substance. One core argument supported by concrete evidence: a specific workflow, a real result, a direct comparison, or a technical detail that proves the point. Avoid abstract claims without grounding.

### 3. Specific Example or Workflow Detail

A concrete moment that makes the argument tangible. "Here is exactly what that looks like" followed by a real scenario, a tool configuration, a before/after comparison, or a step by step description. This is what separates a long post from a short post: the room to show, not just tell.

### 4. Optional Link

If the post connects to a blog article, product page, or external resource, it goes here at the very end. Not every long post needs a link; many stand on their own.

---

## Common Use Cases

| Use Case | Source | Approach |
|----------|--------|----------|
| Tool review | Hands on experience with a tool | Structured opinion with specific evidence from your usage |
| Article extract | A blog article repurposed for X | Pull the sharpest insight and expand with X native framing |
| Workflow walkthrough | A real process worth documenting | Step by step with specific tool names and configurations |
| Detailed take | An opinion that needs evidence | Claim, evidence, implication, with room for nuance |

---

## Visual Requirements

Visuals are recommended (not required) for long posts. They increase engagement significantly on posts that ask readers to invest more time.

Effective visual types:

- **Tool review image:** Screenshot or designed card showing the tool interface, a key feature, or a comparison
- **Comparison visual:** Side by side layout showing before/after, tool A vs tool B, or old workflow vs new workflow
- **Annotated screenshot:** A real screenshot with callouts highlighting the relevant detail
- **Workflow diagram:** A simple visual showing the steps described in the post

Specifications:

- **Format:** 1600x900 (16:9) for single images
- **Generation:** Use your image export pipeline for designed visuals, direct screenshots for tool interfaces
- **Alt text:** Always include descriptive alt text

---

## Voice Reference

Follow [[voice/x-tone]].

Long posts allow slightly more nuance and technical depth than short posts, but the voice stays the same: direct, grounded in real experience, opinionated but fair. The additional length is for evidence and examples, not for hedging or padding.

---

## Examples

Adapt these structures with examples relevant to your brand and domain.

### Example 1: Tool Review Extract

```
Tested [Tool A], [Tool B], and [Tool C] side by side on the same [task/project] for a week.

The results were not close.

[Tool A] and [Tool B] are excellent for [specific strength]. They [do specific thing well], and the [specific UX detail] is smooth. For [user type], these tools feel natural.

[Tool C] operates differently. You [describe the different approach], and it [delivers specific value]. It [understands/handles/manages] your [specific context] and makes [decisions/changes] that are [specific quality].

The gap shows up on [specific scenario]. That is where [Tools A and B] start requiring constant manual guidance, and where [Tool C] pulls ahead because [specific reason].

If your work is mostly [simple scenario], [Tool A] is great. If you are [complex scenario], [Tool C] is the better investment.
```

### Example 2: Workflow Walkthrough

```
Here is the actual workflow I use to go from "[starting point]" to "[end result]" in [timeframe].

Step 1: I [specific preparation action]. This takes [time] and is the highest leverage work in the entire process.

Step 2: I [specific tool/action], point it at [the prepared context], and describe the [first task]. It [reads/processes] the context, understands [what], and starts [doing what].

Step 3: I review each [output] before it is [applied/shipped]. This is not autopilot; it is [metaphor for the collaborative dynamic].

Step 4: After each [milestone], I [verify/test] and note issues. These become the next [input/prompt].

Total time: [range] depending on complexity. The [key preparation artifact] is reusable for every subsequent [task].
```

---

## Pre-Publish Checklist

1. The hook (first 1 to 2 sentences) works as a standalone statement that earns the "Show more" tap.
2. The post develops exactly one core argument. Multiple arguments belong in separate posts or an X Article.
3. At least one concrete example, specific workflow detail, or real result is included (not just abstract claims).
4. Character count is between 500 and 2,000. Under 500, it should be a short post. Over 2,000, consider an X Article.
5. Visual is included if it adds information (not decoration). Alt text is present.
6. No hashtags.
7. Link (if any) is at the very end.
8. No hype words, no dramatic fragments, no dashes as punctuation.
9. Voice matches [[voice/x-tone]].
10. Reviewed against [[voice/anti-patterns]].
11. Language matches the X language configured in [[config.md]].
