# Module: Web Marketing & Branded Imagery

Expert craft for landing-page heroes, section visuals, social graphics, brand/atmosphere
imagery, and product comps that read like premium real website concepts (Awwwards-level).
Optimized for businesses like a lime/dark AI agency and a hotel SaaS.

**This module supersedes `imagegen-frontend-web` as the canonical web-marketing craft home.**
All portable art-direction rules from that skill are distilled here; the old skill file
remains read-only legacy. New web-marketing renders route through `image-director` and this
module exclusively.

---

## 1. Anti-Default Directive (named patterns to avoid)

These are the overused AI image patterns. Name them so you recognize and reject them:

| Pattern name | What it looks like | Why it fails |
|---|---|---|
| Centered Dark Hero | dark bg, centered headline, symmetrical glow | every AI tool produces this first; zero distinctiveness |
| Purple/Blue AI Glow | neon purple or blue gradient edges, orbs | screams "generated," not a real brand choice |
| Floating Blobs | meaningless spheres, glassmorphism clusters | decorative noise, no structural role |
| Dashboard Card Spam | 3+ fake UI cards floating at angles | filler that says nothing about the product |
| Weak Hierarchy | everything the same size, no dominant element | no scan path, no hook |
| Cloned Sections | identical layout repeated top to bottom | boring, template energy |
| Beige Serif "Luxury" | cream bg + thin serif + no visual courage | lazy shorthand, not actual premium |
| Rainbow Mesh Gradient | multicolor mesh blob as hero bg | AI slop signature |
| Gradient Text Premium | headline text with gradient fill as the only premium cue | cheap trick |
| Stock Symmetry | perfectly mirrored, lifeless balance | real design uses intentional tension |

Before compiling a prompt, mentally check: does this spec accidentally reproduce any of
the above? If yes, change the composition or palette decision.

---

## 2. Hero Composition Variety

**Never default to left-text / right-image.** Pick the composition that fits the brand and
brief. Decision tree:

```
Is the brand cinematic / luxury / atmospheric?
  → centered-over-background, bottom-left over image, image-as-canvas

Is it editorial / magazine / fashion?
  → off-grid editorial, top-left lead, inverted classic (right-text / left-image)

Is it minimalist / swiss / clean?
  → stacked center, mini-minimalist (tiny logo + statement + thin CTA)

Is it SaaS / product / dashboard?
  → mid editorial, bottom-right CTA cluster, centered statement

Is it agency / creative studio?
  → giant statement, off-grid editorial, image-as-canvas
```

Full composition menu (pick ONE per section):
1. Centered over background (text lower 40%)
2. Bottom-left over image
3. Bottom-right over image
4. Top-left lead, support bottom-right
5. Stacked center (all centered, ultra minimalist)
6. Image-as-canvas (text in a clean safe area)
7. Off-grid editorial offset (asymmetric pull)
8. Mini-minimalist (tiny logo + short statement + thin CTA, mostly negative space)
9. Inverted classic (right-text / left-image)
10. Left-text / right-image (classic; use ONLY when genuinely best, never by reflex)

---

## 3. Hero Scale

| Scale | When to use | Visual character |
|---|---|---|
| Giant Statement | cinematic, luxury, agency, bold brand, portfolio showcase | massive type or image, dominant first viewport, single clear statement |
| Mid Editorial | SaaS, product, fintech, trust-driven, balanced | balanced type/image ratio, controlled but cinematic |
| Mini Minimalist | typography-first, swiss, ultra clean, confident restraint | tiny logo + short text + thin CTA, vast negative space; NOT weak, just restrained |

Pick ONE per page. Do not split the difference. The brief dictates: "bold/cinematic/luxury"
= Giant; "clean/product/trust" = Mid; "minimalist/swiss/typography" = Mini.

---

## 4. Background Mode

Pick per section; vary across a multi-section set so the page never feels monotone:

- **Solid surface** with inline asset
- **Subtle texture** (paper, grid, noise, tactile material)
- **Full-bleed image** with tonal overlay (dark, light, or brand-color tint; text stays readable)
- **Duotone** treated photograph (two-color, palette-locked)
- **Gradient** (palette-matched, low chroma, professional; NEVER rainbow/mesh/AI-default)
- **Color-blocked diptych** (two flat fields meeting, modernist)
- **Editorial side-image** (50/50 or 60/40 split)
- **Soft radial vignette + product crop** (luxury/editorial feel)
- **Micro-noise gradient over solid** (tactile depth without color noise)
- **Atmospheric photo with strong color grade** (single-tone, brand mood)

Background-image freedom: backgrounds are a primary design tool, not a risk. Be confident.
For non-minimalist briefs, at least one section should use a full-bleed or atmospheric bg.

---

## 5. Brief-to-Direction Mapping

Read the user's brief. Bias every decision from it. **The brief always overrides defaults.**

| Brief signal | Hero scale | Background bias | Composition bias | Dials override |
|---|---|---|---|---|
| minimalist / clean / swiss / typography-only | Mini | solid, subtle texture, skip full-bleed | stacked center, generous negative space | density 2, variance 5, spacing 9 |
| editorial / magazine / art-directed / fashion | Mid or Giant | editorial side-image, duotone, atmospheric photo | off-grid editorial, asymmetric pulls | variance 9, art-direction 9 |
| cinematic / luxury / atmospheric / bold / premium | Giant | full-bleed + tonal overlay, radial vignette, micro-noise | bottom-left over image, centered low, image-as-canvas | art-direction 9, image-usage 9 |
| SaaS / product / dashboard / fintech / infra | Mid | solid + inline asset, flat block + detail crop | clear product framing, trust anchors | clarity 9, density 5, conversion 9 |
| agency / creative studio / portfolio | Giant or Mini (decisive) | vary boldly (full-bleed, diptych, duotone) | off-grid, poster-like | variance 9, layout-variation 9 |
| e-commerce / shop / product page | Mid (product-focused) | full-bleed product photo, vignette + crop | product-led; CTAs unmistakable | conversion 9, image-usage 9 |

If the brief is silent on style: use baseline dials (section 6) and pick a scale decisively.

---

## 6. Dials (baseline; adapt per brief)

These map to the intent-spec `style` and `composition` fields as guidance. Override from
the brief; never force a dial value that contradicts explicit user direction.

| Dial | Baseline | Meaning |
|---|---|---|
| design-variance | 8 | 1 = rigid/symmetrical, 10 = artsy/asymmetric |
| visual-density | 4 | 1 = airy/gallery, 10 = packed/intense |
| art-direction | 8 | 1 = safe commercial, 10 = bold creative statement |
| implementation-clarity | 9 | 1 = loose moodboard, 10 = very codeable reference |
| image-usage | 9 | 1 = mostly typographic, 10 = strongly image-led |
| spacing-generosity | 8 | 1 = compact/tight, 10 = very spacious/breathable |
| layout-variation | 8 | 1 = same anchor repeats, 10 = bold variety across sections |
| conversion-discipline | 8 | 1 = pure art moodboard, 10 = clear funnel + premium design |

Bias toward: strong concepts, breathable spacing, readable hierarchy. The page should feel
open, composed, balanced, confident. Not cramped, noisy, or visually exhausted.

---

## 7. One Image Per Section

If the user requests a landing page or multi-section site, each section is its own render.
N sections = N separate calls to `render.sh`. Never a single tall image containing
the whole page.

Across the set: lock ONE palette (use `palette.locked: true` in the intent-spec and the
identical `tokens` array on every render). Same type scale, same CTA family, same image
treatment. Variation is allowed in composition anchor, background mode, and density.
See `consistency.md` for the locked style-token block pattern.

Format: always horizontal (1536x1024 landscape for most sections).

---

## 8. Conversion Awareness

Each section has a job. Even for artistic brands, the page must read as a real product site:

| Section type | Job | Design implication |
|---|---|---|
| Hero | hook in seconds, one obvious next action | dominant visual, short headline, single CTA |
| Trust bar | prove credibility fast | logos or metrics, restrained, not a marquee of mosquito blobs |
| Features | educate on capabilities | clear hierarchy, not card-spam |
| Social proof | earn trust | real quotes, not three identical stat columns |
| CTA / close | convert | decisive, unmistakable primary action, single strong trust cue |

This skill produces the IMAGE, not the code. But the image must imply a conversion
architecture that a developer can read and implement.

---

## 9. Crispness & On-Brand

Non-negotiable for every marketing render:

- **quality: high** (engine constant; medium looks cheap in marketing context)
- **Anti-softness clause** in `negatives`: `no soft Gaussian blur, no hazy wash, no over-denoised airbrushed look, crisp and sharp with fine high-frequency detail, defined edges`
- **Palette hex tokens** stated explicitly in the prompt (e.g. "primary: #BEF264, background: #0A0A0C, text: #FAFAFA")
- **Verbatim text**: spell out every headline, CTA label, and nav item that appears in the render. This is what prevents gibberish type.
- **Type rendering**: include "legible, properly kerned typography rendered as if from a design tool" in the prompt when text is prominent.

---

## 10. Inspect Checklist (feeds render-loop.md)

After rendering, critique vs the spec on these marketing-specific dimensions:

1. **On-brand?** Does the palette match the locked hex tokens? Is the type family consistent?
2. **Composition varied?** Is this the cliche (centered dark hero, left-text/right-image) or the intended alternate anchor?
3. **Breathable?** Sufficient negative space, or crammed and noisy?
4. **Text crisp?** Every `verbatim_text` string present, correct, unwarped, readable?
5. **Anti-slop?** Free of purple glow, floating blobs, dashboard-card spam, gradient-text headlines, meaningless orbs?
6. **Conversion-clear?** Can you identify the section's job and its primary action at a glance?
7. **Premium feel?** Does it read as a real Awwwards-level website concept, or as a template?
8. **Background intentional?** Not a muddy smear or an afterthought solid?

If any dimension fails, refine per `render-loop.md` (one targeted change per pass).

---

## 11. Worked Prompt Examples

### Example A: Giant-Statement Hero for a Lime/Dark AI Agency

```
intent:
  domain: web-marketing
  use: landing-page hero section
  output:
    aspect: 1536x1024
    format: png
  subject: AI automation agency hero section
  style: bold cinematic, high-contrast dark mode, editorial confidence
  composition: bottom-left text cluster over full-bleed atmospheric background, vast negative space top-right, single lime CTA pill
  light: cool ambient with a single warm lime accent glow from the left edge, not a halo
  palette:
    locked: true
    tokens: ["#BEF264", "#0A0A0C", "#FAFAFA", "#18181B"]
  finish: subtle film grain, anti-airbrushed, sharp edges on all type, matte dark surface
  verbatim_text:
    - "AI systems that run your business"
    - "Book a demo"
  negatives: no soft Gaussian blur, no hazy wash, no over-denoised look, crisp with fine detail, no purple/blue AI glow, no floating orbs, no dashboard cards, no gradient text, no centered symmetrical layout
  engine:
    tool: codex-builtin-image_gen
    model: gpt-image-2
    quality: high
```

Compiled prompt (prose):

> A premium dark-mode landing page hero section for an AI automation agency. Full-bleed near-black (#0A0A0C) background with subtle film grain texture. Text cluster positioned bottom-left: large bold white (#FAFAFA) headline reading exactly "AI systems that run your business" in a clean geometric sans-serif, properly kerned. Below the headline, a small lime (#BEF264) pill button reading exactly "Book a demo". Vast negative space fills the top-right, creating cinematic tension. A subtle warm lime accent light spills from the left edge, casting a soft directional glow on the surface without forming a halo or orb. The overall feel is editorial, bold, high-contrast, Awwwards-level web design. Crisp and sharp with fine high-frequency detail, defined edges. No soft Gaussian blur, no hazy wash, no floating blobs, no dashboard cards, no purple glow. Horizontal 1536x1024.

### Example B: Cinematic Full-Bleed Hotel Hero

```
intent:
  domain: web-marketing
  use: hotel SaaS landing hero section
  output:
    aspect: 1536x1024
    format: png
  subject: luxury boutique hotel terrace at golden hour, used as full-bleed bg for a SaaS hero
  style: cinematic luxury, warm editorial photography with dark tonal overlay for text readability
  composition: image-as-canvas, centered-low text block (lower 35%), nav bar at top
  light: golden hour warm light from the right, deep shadows on left, filmic color grade
  palette:
    locked: true
    tokens: ["#F5F0E8", "#1A1A1A", "#C9A96E", "#FFFFFF"]
  finish: photographic grain (ISO 400 feel), warm color grade, real material physics on stone and linen, anti-CGI
  verbatim_text:
    - "Revenue intelligence for boutique hotels"
    - "Start free trial"
    - "Pricing"
    - "Product"
  negatives: no soft Gaussian blur, no CGI plastic look, no over-denoised surfaces, no stock-photo cliche, no beige-serif-only luxury, crisp with defined edges, not a 3D render
  engine:
    tool: codex-builtin-image_gen
    model: gpt-image-2
    quality: high
```

Compiled prompt (prose):

> A premium website hero section for a hotel revenue SaaS. The entire frame is a full-bleed cinematic photograph of a luxury boutique hotel terrace at golden hour: warm directional light from the right illuminates stone balustrades and linen-draped furniture, deep atmospheric shadows on the left. A dark tonal overlay (semi-transparent #1A1A1A) sits over the lower third to ensure text readability. Centered in the lower 35%: a large cream (#F5F0E8) headline reading exactly "Revenue intelligence for boutique hotels" in an elegant geometric sans-serif with tight tracking. Below it, a gold (#C9A96E) pill button reading exactly "Start free trial". At the top of the frame, a minimal navigation bar with white text items "Pricing" and "Product" on the left, brand wordmark centered. The photograph has genuine film grain (ISO 400 feel), warm color grade, real material physics on stone and fabric. Photographic, not a 3D render. Crisp and sharp throughout with defined edges, no soft Gaussian blur, no hazy wash, no over-denoised airbrushed look. Horizontal 1536x1024.
