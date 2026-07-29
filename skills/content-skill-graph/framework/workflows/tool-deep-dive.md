# Tool / Product Deep Dive Workflow

> Pipeline for producing honest, experience-based review posts for tools and products you have actually tested. This workflow is reserved for the best (or most interesting) items; not everything on your site gets a deep dive.

References: [[brand-voice]], [[anti-patterns]], [[calibration]], [[blog-article]], [[config.md]]

---

## Prerequisites

Before starting, confirm:

1. **You have actually tested this product.** This is not optional. Deep dives are based on real usage, not research. If you have not tested it, this workflow does not apply. Suggest adding it to your site via the [[new-tool]] workflow instead.
2. **The product is worth recommending or warning about.** Mediocre products do not get deep dives. The review should either be a genuine endorsement or an honest "this is not ready yet" assessment.

## Step 1: Collect Testing Notes

Ask the user to share:

- **How long they have used it** (days, weeks, months)
- **What they used it for** (specific tasks, not general impressions)
- **Key findings**: what worked better than expected, what disappointed, what surprised them
- **How it fits in the ecosystem**: does it replace something, complement something, or create a new capability?
- **Specific numbers**: time saved, quality difference, cost comparison, anything measurable from their experience
- **Limitations encountered**: bugs, missing features, pricing gotchas, documentation gaps

If the user provides partial notes, ask targeted follow-up questions until you have enough material for an honest, specific review.

## Step 2: Positioning Context

Reference your content pillars to determine how this product fits into the bigger picture:

- How does this product fit into the broader tool stack or landscape? Is it a foundation layer, a specialized tool, or a convenience wrapper?
- If you reason from first principles about what this product does (not what it says it does), what capability does it actually provide? Does the marketing match the reality?

Identify the positioning angle:
- Is this product solving a problem that most people do not know they have?
- Is it a better version of something that already exists?
- Is it opening a new category?
- Is it overhyped relative to what it delivers?

The angle should emerge from the testing notes and positioning context, not be forced.

## Step 3: Find Official Logo

Follow the logo search protocol:

1. Check your existing assets directory for logos matching this product or company
2. Scrape the company website for press kit or brand assets
3. Check their GitHub repo for logo files
4. Wikimedia Commons
5. Ask the user

ALWAYS use official logos. NEVER generate or create logos.

## Step 4: Create Short-Form Platform Post (e.g., X)

Structure:

**Opening (1 to 2 sentences):** Lead with the most interesting finding from the testing. Not "I tested X." Instead, the finding itself. Example: "After three weeks of running [tool] on real projects, I found one thing that changes how I think about [category]."

**Testing context (2 to 3 sentences):** What you tested it on, for how long, and what you compared it against. This establishes credibility and scope.

**Key findings (3 to 5 points):** The most important observations from real usage. Be specific. Include numbers where you have them. Include negatives; honest reviews build more trust than glowing endorsements.

**Ecosystem context (1 to 2 sentences):** How this product fits (or does not fit) into the broader stack. Reference related items on your site when relevant.

**Honest assessment (1 to 2 sentences):** Would you keep using it? Who should try it? Who should skip it?

**Link:** Your site's page URL for this product

Tone: the short-form voice from [[brand-voice]]. Direct, technical when useful, slightly skeptical, specific. Written by someone who ships, not someone who reviews.

## Step 5: Create Long-Form Platform Post (e.g., LinkedIn)

Structure:

**Opening:** Frame the product through a business problem. Not "I tested X" but "Every week, [business task] takes [amount of time]. I found a tool that changes that."

**What it does (plain language):** Explain the product without jargon. Someone who has never heard of this category should understand what it does and why it matters. Write in the language configured for this platform in [[config.md]].

**Testing results:** Practical findings framed as business impact. Time saved, quality improved, cost reduced, or capability gained.

**Who it is for:** Be specific about which types of businesses or roles would benefit. Not everyone.

**Link:** Your site's page URL

Tone: the long-form voice from [[brand-voice]]. Calm, concrete, practical. Written like explaining something you discovered to a colleague over coffee.

## Step 6: Blog Article Seed (Optional)

If the product review has enough depth, create a blog article outline. This is optional and depends on whether the product and findings justify a full article.

Indicators that a blog article is warranted:
- The product represents a category shift (new type of tool, new paradigm)
- The testing revealed counterintuitive findings that need explanation
- The ecosystem implications are significant enough to explore in detail
- There is enough material for 2000+ words without padding

If yes, create an outline following the structure in [[blog-article]] Phase 2, and present it to the user as a suggestion.

If no, note that the social posts are sufficient for this product.

## Step 7: Quality Check

Run through [[calibration]]:

- [ ] All claims are based on actual testing, not research or marketing material
- [ ] Honest negatives are included (at least 1 to 2 limitations or caveats)
- [ ] No dashes as punctuation
- [ ] No dramatic fragment pairs
- [ ] Official logo found and used
- [ ] Site page slug/URL is correct
- [ ] Short-form post would be valuable to someone already using tools in this space
- [ ] Long-form post would make sense to the platform's audience, even if they are unfamiliar with the product
- [ ] Numbers from testing are accurate (not rounded up or inflated)
- [ ] The review does not read like sponsored content

## Step 8: Present for Review

Show the user:

1. Short-form post (ready to copy/paste)
2. Long-form post (ready to copy/paste)
3. Blog article outline (if applicable, as a suggestion)
4. Logo location
5. Any flags: claims that need verification, comparisons that might be outdated, features that changed since testing

Wait for user approval before publishing or committing anything.

---

## What This Workflow is NOT

This is not a product comparison workflow. If the user wants to compare two products, that belongs in a comparison page or article (different format). This workflow is for single-product reviews based on hands-on experience.

This is not a product announcement workflow. If the product is new and the user has not tested it, use [[new-tool]] instead.
