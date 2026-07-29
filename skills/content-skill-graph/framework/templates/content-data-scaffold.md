# Template: Content Data Scaffold

> Generic scaffold for structuring a new content entry (tool review, product page, resource listing, etc.) in a structured data format. Adapt this to your publishing system's data layer. Referenced by the **new-content-page** workflow.
>
> This template provides a universal content structure. Customize the fields for your specific use case (tool reviews, product comparisons, resource directories, etc.).

---

## Core Fields

Every content entry needs these fundamental fields, regardless of your publishing platform:

```yaml
# ─── Identity ───────────────────────────────────────────────
slug: "{{kebab-case-slug}}"
# URL path segment. Always kebab-case, lowercase.
# Examples: "claude-code", "nano-banana", "google-ai-studio"

name: "{{Display Name}}"
# Human readable name as officially marketed.
# Examples: "Claude Code", "Nano Banana 2", "Google AI Studio"

tagline: "{{One to two sentence pitch. What it does and why someone should care.}}"
# Shows on cards in listings and at the top of the detail page.
# Keep under 200 characters. Include the key differentiator.

category: "{{category}}"
# Use existing categories when possible. Create new ones sparingly.

icon: "{{path-to-icon}}"
# Path to the icon/logo image.
# Use PNG format, ideally 128x128 or larger, transparent background.
# File name matches the slug.

# ─── Content ────────────────────────────────────────────────
overview: "{{2 to 4 paragraph plain text overview. What this is, when it was released or created, what problem it solves, who made it, and what makes it notable. No markdown, no HTML. Just flowing prose.}}"
# This is the primary introduction visitors read. Write it for someone who has
# never heard of this before. Include: what it does, who built it, when it launched
# or was last updated, what makes it different from alternatives, and how people
# access it.

features:
  - name: "{{Feature Name}}"
    description: "{{What this feature does and why it matters. 1 to 2 sentences.}}"
  # Add 6 to 10 features. Each should be a distinct capability.

pricing:
  - name: "Free"
    price: 0
    currency: "USD"
    interval: "month"
    per_user: false
    description: "{{What the free tier includes and its limitations.}}"
    features:
      - "{{Feature 1 included in this tier}}"
      - "{{Feature 2}}"
  - name: "{{Paid Tier Name}}"
    price: 0  # number or null (null = "Contact sales")
    currency: "USD"  # "USD" or "EUR"
    interval: "month"  # "month" | "year" | "one-time" | "usage-based"
    per_user: false  # true if price is per seat
    highlighted: true  # marks as the recommended tier
    description: "{{What this tier adds over the previous one.}}"
    features:
      - "{{Feature 1}}"
      - "{{Feature 2}}"
  # Add all pricing tiers. Order from cheapest to most expensive.

best_for:
  - "{{Persona 1: who they are and what they would use this for}}"
  - "{{Persona 2}}"
  - "{{Persona 3}}"
  # 3 to 5 entries. Each describes a specific person AND their use case.
  # Start with the person ("Small business owners who..."), not the feature.

pros:
  - "{{Specific advantage with enough detail to be useful, not just 'fast' but what is fast and why it matters}}"
  # 5 to 7 pros. Each should be honest and specific.
  # Include concrete details: speeds, numbers, comparisons.

cons:
  - "{{Specific limitation. Be honest. Every product has real downsides.}}"
  # 3 to 5 cons. Must be genuine, not soft praise disguised as criticism.
  # "Could be even better" is not a real con. "Free tier limited to 10 requests/day" is.

getting_started:
  - step: 1
    title: "{{Action verb + what to do}}"
    description: "{{1 to 3 sentences explaining this step. Be specific enough that someone can follow it without guessing.}}"
    links:
      - label: "{{Link text}}"
        url: "{{https://...}}"
  # 3 to 5 steps. Walk someone from zero to their first meaningful use.
  # Step 1 is always about getting access (signing up, installing, opening).
  # Final step should involve doing something real, not just "explore more."

deep_dive:
  - id: "{{kebab-case-id}}"
    title: "{{Section Title}}"
    summary: "{{1 to 2 sentence preview.}}"
    content: "{{Long form content. Use your publishing system's formatting.}}"
  # 3 to 5 deep dive sections. These are the meat of the page.
  # Common patterns:
  #   "how-it-works" for architecture or methodology
  #   "comparison" for vs. competitors
  #   "use-cases" for real world applications
  #   "limitations" for honest assessment of what does not work well

links:
  - label: "Official Website"
    url: "https://..."
    type: "official"
  - label: "Pricing"
    url: "https://..."
    type: "pricing"
  - label: "Documentation"
    url: "https://..."
    type: "docs"
  # Include at minimum: official site, pricing page, docs.
  # Add blog posts, videos, or feature pages when they add genuine value.

# ─── Metadata ───────────────────────────────────────────────
last_updated: "{{YYYY-MM-DD}}"
# Date this entry was last reviewed and confirmed accurate.

related_slugs:
  - "{{slug-1}}"
  - "{{slug-2}}"
  - "{{slug-3}}"
  # 3 to 5 slugs of related entries. These appear in a "Related" section.

tags:
  - "{{tag-1}}"
  - "{{tag-2}}"
  # 5 to 12 tags is the sweet spot. Include the name, category keywords,
  # key capabilities, and common search terms.

# ─── SEO ────────────────────────────────────────────────────
meta_title: "{{Name}} Review {{Year}}: {{Key Differentiator}} | {{Your Brand}}"
# Under 60 characters. Include the year and one selling point.

meta_description: "{{Under 160 characters. Summarize what it does, its standout feature, and the value of this page.}}"
```

---

## Naming Conventions

| Field | Convention | Example |
|-------|-----------|--------|
| slug | kebab-case, lowercase | `google-ai-studio` |
| file name | matches slug | `google-ai-studio` |
| icon file | matches slug | `google-ai-studio.png` |
| tags | lowercase, spaces for multi-word | `"image generation"` |
| dates | ISO 8601 | `"2026-03-19"` |

---

## Quality Checklist

Before considering a content entry complete:

- [ ] `overview` reads naturally and covers: what, who built it, when, why it matters, how to access it
- [ ] Features are distinct capabilities, not overlapping descriptions of the same thing
- [ ] Pricing matches the official pricing page (check the date; pricing changes frequently)
- [ ] Pros are specific with concrete details, not vague superlatives
- [ ] Cons are genuine limitations, not disguised compliments
- [ ] Getting started steps are actionable by someone with zero prior knowledge
- [ ] Deep dive sections add real depth beyond what features and pros/cons cover
- [ ] Links are verified and working
- [ ] Tags include the name, company/creator name, and common search terms
- [ ] SEO title is under 60 characters, description under 160
- [ ] Passes [[quality/calibration]] question 2 (concrete details) and question 3 (expert respect)
- [ ] Content is registered/indexed in your publishing system's entry list

---

## Wikilink References

- [[quality/calibration]]
- [[quality/hormozi-standard]]
- [[voice/brand-voice]]
- [[config]]
