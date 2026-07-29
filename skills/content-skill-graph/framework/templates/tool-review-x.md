# Template: Product/Tool Review (Short Form / X)

> Template for an in-depth short form post about a product or tool you have personally tested. This is NOT for products seen in announcements; it is only for products used in real workflows. Referenced by the **tool-review** workflow.
>
> Voice: [[voice/brand-voice]]
> Audience: [[audience/]] (use the audience profile for your short form platform)
> Platform: [[platforms/x-post]] or equivalent short form platform
> Pillars: [[pillars/tool-infrastructure]], [[pillars/first-principles]]

---

## Prerequisites

This template should only be used when:
- You have personally tested the product (not just read about it)
- There is a specific workflow or use case to describe
- There is an honest assessment with both strengths and limitations
- Concrete details are available: time spent, tasks completed, actual results

If any of these are missing, use [[templates/tool-announce-x]] instead.

---

## Post Structure

```
[Hook: what surprised you most about this product]

[Your testing context: what you used it for, how long, what workflow]

[2 to 3 key findings: what works well, what does not, honest assessment]

[Ecosystem context: how it fits with other tools, what it replaces or complements]

[Verdict: who should use this and who should skip it]
```

---

## Hook: The Surprise

Start with the most unexpected finding. This is what separates a review from a feature list.

**Hook patterns:**

### Positive surprise
> "I expected {{tool}} to be {{assumption}}. After {{time period}} of using it for {{task}}, the actual standout is {{unexpected thing}}."

### Negative surprise
> "{{Tool}} does {{marketed feature}} well. What nobody mentions is {{limitation or friction point}} that affects the experience more than you would expect."

### Reframing surprise
> "{{Tool}} is marketed as {{category/positioning}}. After using it for {{specific work}}, I think the better frame is {{alternative framing}}."

### Ecosystem surprise
> "I added {{tool}} to my setup expecting it to replace {{other tool}}. Instead, it turned out to complement it in a way I did not anticipate."

---

## Testing Context

Establish credibility by being specific about how you actually used it.

**What to include:**
- What you used it for (specific tasks, not vague categories)
- How long you tested it (days, weeks, specific period)
- What workflow it was part of (what came before it, what came after it)
- What you compared it to (directly or implicitly)

**Example patterns:**
- "I used {{tool}} for {{X weeks}} to {{specific task}} as part of my {{workflow description}}."
- "My setup: {{tool}} connected to {{other tools}} via {{integration method}}, running on {{context}}."
- "I tested this against {{alternative}} on the same task: {{task description}}."

**Rules:**
- Only claim testing you actually did
- Include the timeframe and scope
- Mention your setup when it matters for interpreting results
- If testing was limited, say so ("I only tested {{specific feature}}, not the full suite")

---

## Key Findings

2 to 3 findings, each presented as a concrete observation backed by your experience.

**Structure for each finding:**

```
[What you found, stated directly]
[Specific evidence from your testing: what happened, what you measured, what you observed]
[What this means for someone considering the product]
```

**Balance rules:**
- At least one finding should be a genuine strength
- At least one finding should be a genuine limitation or caveat
- Avoid "balanced" statements that say nothing ("It is good but could be better")
- Concrete details matter: speeds, error rates, specific tasks that worked or failed

**Example findings:**
- "The {{feature}} works as advertised on {{task type}}. I generated {{N outputs}} and {{X%}} were usable without editing. On {{other task type}} it fell apart: {{specific failure mode}}."
- "Speed was the biggest factor. {{Task}} that took {{time}} in {{alternative}} took {{shorter time}} in {{tool}}. Over {{period}}, that compounded into roughly {{total time saved}}."
- "The limitation nobody talks about: {{specific issue}}. In practice this means {{consequence for real workflow}}."

---

## Ecosystem Context

Position the product within the broader stack. This is where your perspective adds value beyond a standard review.

**What to cover (pick 1 to 2):**
- What this product replaces or could replace in a typical stack
- What it complements (tools that work well alongside it)
- Where it sits in the category landscape (is it a new entrant, an evolution, a niche tool?)
- How it changes the cost or complexity of a workflow
- Whether it overlaps with tools the audience likely already uses

---

## Verdict

Clear recommendation with specific qualifiers. No hedging, no "it depends on your needs" without specifying which needs.

**Verdict patterns:**

> "Use {{tool}} if you {{specific situation}}. Skip it if you {{other situation}}."

> "This replaces {{tool}} for {{task}} if your volume is {{range}}. For {{different use case}}, {{alternative}} is still better."

> "Worth adding to your stack if {{condition}}. Not worth the switching cost if {{other condition}}."

---

## Voice Notes

**Sound like:** Someone who tested a product, formed an honest opinion, and is sharing the findings. Not a reviewer trying to be balanced for balance's sake. Not a promoter. Not a complainer.

**What to use:**
- First person: "I tested," "I used," "In my setup," "What I found"
- Concrete details: hours, tasks, outputs, specific features
- Named alternatives when the comparison matters
- Honest qualifiers about scope of testing
- Tool names and technical terms when precision matters

**What to avoid:**
- Feature lists copied from the landing page
- "I was blown away by..." (hype framing)
- "This is a must-have for..." (prescriptive without evidence)
- Generic praise: "The UX is clean" (clean compared to what? for what task?)
- Reviewing products you have not actually used in a real workflow

**Visual assets:**
If creating any visual for the review post, use the official product/company logo. Do not create custom graphics that misrepresent the brand.

See [[voice/brand-voice]] for your complete voice guidelines.

---

## Example

```
I expected Firecrawl to be another scraping tool. After 6 weeks of using it for competitive research across 200+ URLs, the actual value is not scraping; it is the structured output.

My workflow: point Firecrawl at a competitor's site, get clean markdown back, feed it into an AI tool for analysis. Before Firecrawl, this involved custom scripts, HTML parsing, and manual cleanup. Now it is a single API call.

Three findings from real use:

Speed and reliability on JavaScript heavy sites is excellent. Out of roughly 200 pages scraped, maybe 5 failed on first attempt. The retry logic handled most of those. Clean markdown output means no manual parsing step before AI analysis.

The search endpoint is underrated. I use it more than the scraping endpoint. Passing a search query and getting structured results back is faster than going through Google and then scraping each result page individually.

Rate limiting on the free tier is aggressive enough to be frustrating for any real project. You will hit limits quickly if you are doing more than casual testing.

If you are doing any kind of web research and feeding results into AI tools, Firecrawl replaces a messy chain of scripts with a clean API. If you are doing simple, static page scraping with no JS rendering needs, it is overkill.
```

---

## Wikilink References

- [[voice/brand-voice]]
- [[audience/]]
- [[platforms/x-post]]
- [[pillars/tool-infrastructure]]
- [[pillars/first-principles]]
- [[quality/calibration]]
- [[proof/personal-proof]]
- [[config]]
