# Template: Article Extract (LinkedIn)

> Template for a shorter LinkedIn post extracted from a published blog article. Takes one insight from the article and reframes it in business terms for your LinkedIn audience. Referenced by the **article-repurpose** workflow.
>
> Voice: [[voice/brand-voice]]
> Audience: [[audience/]] (use the audience profile for your LinkedIn platform)
> Platform: [[platforms/linkedin-post]]

---

## Post Structure

```
[Hook: the insight translated into a business consequence the audience recognizes]

[3 to 5 sentences: what this means practically for the reader]

[Natural bridge to the full article]

Full article: {{link}}
```

---

## Extraction Criteria

Same core criteria as the short form version ([[templates/article-extract-x]]), but with a different filter: the insight must translate into something your LinkedIn audience experiences in their daily work.

**Good extracts for this audience:**
- A stat that connects to wasted time, money, or effort in their business
- A concept that explains why something they tried did not work
- A practical example they can relate to their own operations
- An analogy that uses familiar business situations, not obscure technical metaphors

**What to skip for this audience:**
- Deeply technical comparisons (unless the business consequence is clear)
- Architecture details without operational implications
- Niche community references your audience does not follow
- Abstract future predictions without practical relevance

---

## Hook: Business Consequence Framing

The hook must land in 1 to 2 sentences using language your audience actually uses at work.

**Reframing patterns:**

Original insight (from article): "Context, not model choice, determines output quality."
LinkedIn hook: "Most companies compare which AI model is better. The question that actually determines the result is entirely different."

Original insight: "88% adopt AI, 1% reach maturity."
LinkedIn hook: "88% of companies already use AI. Only 1% say it actually helps. The difference is not the tool."

Original insight: "Agentic tools are general purpose, not just for developers."
LinkedIn hook: "Tools with 'Code' in the name have nothing to do with programming. They are tools for anyone who works with information."

**What makes a good hook for this audience:**
- It uses their vocabulary (hours, costs, employees, processes, clients)
- It describes a situation they recognize from their own work
- It creates a gap between what they assumed and what is actually true
- If writing in a non-English language (see [[config.md]]), it avoids loanwords when native equivalents exist

**Language note:** If your LinkedIn platform targets a non-English audience, write the hook natively in that language. Do not translate English phrasing; rewrite the argument for a person with different concerns and in their natural language patterns.

---

## Body: Practical Meaning

Write 3 to 5 sentences that develop the insight in operational terms.

**Writing rules (these are critical):**
- Do not literally copy the source article text. Rewrite the argument for your LinkedIn audience, who may have different concerns and context than your blog readers.
- Technical concepts need business equivalents: "context layer" becomes "organized knowledge about your business," "agentic tool" becomes "a tool that executes tasks on its own"
- Use examples from your audience's business reality: team sizes, budget constraints, generalist employees wearing multiple hats
- Reference concrete work situations your audience recognizes: preparing proposals, answering client emails, creating reports, managing social media, handling invoices

**What to include:**
- One concrete "before and after" scenario (manual vs. automated)
- What this means for someone at your audience's scale
- An honest qualifier about who this applies to and who it does not

---

## Bridge to the Full Article

Keep it natural. The reader just got a complete thought; the article offers more depth if they want it.

**Good bridges:**
- "I wrote about this in more detail here: {{link}}"
- "The full article also covers {{X}} and {{Y}}: {{link}}"
- "Full context with examples: {{link}}"

**Bridges to avoid:**
- "More at the link!" (empty, pushy)
- "Click for more" (obvious call to action)
- "This is just the tip of the iceberg" (dramatic cliche)

---

## Voice Notes

Follow your [[voice/brand-voice]] guidelines for the LinkedIn platform:
- Plain language, calm, concrete, practical
- Written like a person explaining something they saw this week
- Lean on: wasted time, handoffs, manual work, admin drag, simple examples from real business
- Avoid: translated sentence structures (if writing in a non-English language), agency style inspiration, corporate jargon, pretending every business needs the same setup

---

## Example

**Extract from an adoption gap insight:**

```
88% of companies already use AI. Only 1% say they have reached maturity. 95% of pilot projects fail.

Why? Because most bought a tool but never organized the knowledge the tool needs. Imagine hiring a new employee and telling them nothing about the company: who the clients are, how you communicate, what your standards are. The result will be generic and useless.

The same thing happens with AI. The tool is the same for everyone. The difference is how much context you prepared in advance: about your clients, processes, standards, and way of working.

I wrote about this in more detail here: https://yourbrand.com/blog/article-slug
```

**Extract from a "not just for developers" insight:**

```
Tools like Claude Code have the word "Code" in the name, so most people skip them. "That is for programmers."

What these tools actually do: read files, write documents, connect to email, calendar, and other tools, and follow instructions. None of that is programming. The model inside is a general reasoning engine that can write a contract just as well as it can prepare a marketing strategy.

I do not have a programming background. I still used AI tools to build a website, a fitness app, and an entire business knowledge management system. The key skill was not coding; it was clarity about what I needed.

Full article with examples: https://yourbrand.com/blog/article-slug
```

---

## Wikilink References

- [[voice/brand-voice]]
- [[audience/]]
- [[platforms/linkedin-post]]
- [[quality/calibration]]
- [[config]]
