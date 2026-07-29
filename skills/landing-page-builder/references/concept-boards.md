# Concept Boards: mockup-first iteration

The fastest way to land a great page is to let the user react to real, live mockups instead of prose descriptions. A concept board is a single self-contained HTML file holding several **drastically different** full variants of one thing (the hero, then later each section), with a switcher to flip between them and a brief panel explaining each one's strategic bet. The user compares by gut in 30 seconds, picks one or two, and you iterate from a real artifact, not an imagined one.

Use it as the default for any page that matters.

## The progressive flow

1. **Hero board** — 6 to 10 drastically different heroes, each a different strategic bet (positioning, voice, palette, type, layout, CTA, lead magnet), not reskins. The user reacts and locks one or two.
2. **Section boards** — for the locked direction, build a board per major section (value/how-it-works, proof, pricing, etc.) with 2 to 4 treatments each. The user picks the strongest per section.
3. **Full page** — assemble the locked hero + locked section treatments into the complete page, then run the normal Build → Critique → QA phases.

Each round is cheap to produce and decisive to review. Do not skip to a full build on an important page; the board round is what prevents three full-page rebuilds.

## What makes a board good

- **Variants are genuinely different bets**, not the same layout in three colors. Each answers "who is the reader, what do they feel, what one idea does this sell, what do they do next" differently. If two variants could be A/B-test twins, cut one and make a sharper alternative.
- **Order by awareness stage**, least aware → most aware (Schwartz; see `copywriting-playbook.md`). The brief panel states each variant's stage so the user can match heroes to traffic sources.
- **Each variant is production-quality**, not a wireframe. Real copy, real type, real color, the craft bar from `craft-standards.md`. The board is how the user judges; a sketchy board gets a sketchy decision.
- **Live where it sharpens the idea.** If a concept's bet is "quantify the pain," build the working calculator; if it is "before/after," build the draggable slider. Interactivity sells the concept better than a static image.
- **A brief panel per variant** so the user reacts with strategy in view, not just aesthetics.

## The mechanics (reproduce this structure)

A single self-contained HTML file:

- **Concept panels.** Each variant is a full-viewport block (e.g. `.concept.c1`, `.c2`, …) set `display:none`, with the active one shown. Switching toggles an `active` class.
- **Display order array.** A JS `ORDER = ['c10','c2',…]` lists concepts least-aware → most-aware so navigation walks the funnel.
- **Switcher UI** (fixed, top corner): prev/next buttons, the concept name, and an `n / total` counter. Wire **arrow keys** (← →) too. Re-trigger entrance animations on each switch (set `animation:'none'`, force reflow, restore).
- **Brief panel** (fixed): rows populated per concept from a `BRIEFS` array, one object per variant in display order. Fields: **Bet** (the positioning/idea), **Best for** (buyer + traffic), **Awareness** (stage), **CTA**, **Lead magnet**.
- **Self-contained:** Tailwind via Play CDN or inline CSS, fonts preconnected, icons from a CDN set, no build step. It opens by double-clicking. Follows the same build rules as the full page (`SKILL.md` Phase 4) and the toolchain policy: any generated imagery goes through the `image-director` skill (prompt + Codex built-in render), never an image API; web fetches use Firecrawl.

## Companion files (write these alongside the board)

In the same folder as the board HTML:

- **`<board>-brief.md`** — the agency brief. An awareness-stage map table (stage → which concepts → traffic source), a short "how to read these," and one block per concept: the strategic bet, who it is for, the one idea, why it might win or lose. This is what turns a gut pick into an informed one.
- **`image-prompts.md`** — if any concept needs generated hero imagery, the Codex/ChatGPT image prompts, one per concept (one per section for a full page), so the user can render them and drop them in. Use the **`image-director`** skill; its web-marketing module handles the per-section art direction and it renders each one. Never call an image API.

## Exporting concepts to PNG (for quick sharing / side-by-side)

For each concept, capture a desktop screenshot so the user can flip through images or share them without opening the file:

- Use Playwright: navigate to the `file://` board, activate each concept (set its `active` class or click next), and `browser_take_screenshot` at a desktop viewport (1440). For full-bleed heroes use the concept element bounds or `fullPage`.
- If the project has a dedicated screenshot/export script (e.g. a Puppeteer `asset-generator` that captures elements at 2x retina), use it when a crisp export is wanted.
- Name exports `<prefix>-c<N>-<slug>.png` (e.g. `hc-c1-manifesto.png`) in the board's folder, matching the concept names in the brief.

## File placement

Boards live with their page assets, per the File Output rules:
`<root>/Business/<Company>/Assets/landing-pages/<page-slug>/concepts/` (hero board, section boards, brief, image prompts, PNG exports). For a standalone hero exploration an `Assets/landing-hero/` pattern is also fine. Never the home root.

## When to skip boards

For a tiny page, a fast internal page, or when the user explicitly says "just build it," skip straight to the full build with 2 to 3 prose directions (Phase 1 default). Boards are for pages where getting the direction right matters more than speed.
