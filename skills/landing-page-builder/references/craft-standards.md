# Craft Standards: the last 2%

The difference between a page that looks "made by AI" and one that looks "made by a studio that sweats every pixel" is almost never the big decisions. It is the hundred small ones. This file is the detail bar. Build to it in Phase 4 and verify it in Phase 5. If you are tempted to skip an item because "no one will notice," that is exactly the item that separates world-class from competent. People feel these things even when they cannot name them.

Read alongside `impeccable` and `emil-design-eng`, which own the deep craft; this file is the concrete checklist of what "done to the last 2%" means for a landing page.

## Typography

- **One type scale, applied everywhere.** Pick a modular scale (e.g. 1.25 or 1.333 ratio) and use only those sizes. No arbitrary one-off `text-[17px]`.
- **Headline tracking.** Large display text needs negative letter-spacing (roughly `-0.02em` to `-0.04em` for big headlines). Default tracking on a 60px headline looks loose and amateur.
- **Measure (line length).** Body copy at 60 to 75 characters per line. Full-width paragraphs on desktop are a tell.
- **Line height scales inversely with size.** Tight on headlines (1.0 to 1.15), comfortable on body (1.5 to 1.65).
- **No orphans or widows** in headlines and key subheads. A single word alone on the last line of a headline is sloppy; use `text-wrap: balance` on headings and `text-wrap: pretty` on body, or a non-breaking space to control the break.
- **Two type families max** (display + body), occasionally one with multiple weights. Three families is usually noise.
- **Numerals.** Use tabular figures in stats/pricing tables so digits align.
- **Punctuation.** Real quotes and apostrophes (" " ' '), not straight ones. No dashes as punctuation (house rule). No double spaces.

## Spacing and layout

- **A single spacing scale** (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128). Every margin and padding is a value on it. Arbitrary spacing is the most common amateur tell.
- **Vertical rhythm between sections is generous and consistent.** Cramped sections read cheap. World-class pages breathe; section padding is large and even.
- **Optical alignment, not just mathematical.** Icons, bullets, and arrows often need a pixel of nudge to look aligned even when their boxes are aligned. Align to the visual edge of a glyph, not its bounding box.
- **Consistent container width and gutters.** Content sits in a max-width container (typically 1100 to 1280px) with equal gutters. Nothing touches the viewport edge by accident.
- **Grid discipline.** If it is a grid, items align to it. Off-grid placement is a deliberate move, never an accident.
- **Hug related, separate unrelated** (proximity). A label sits closer to its field than to the next field. Group by space before you reach for borders.

## Color

- **Tinted neutrals, never pure.** Pure `#000` and `#FFF` and flat `#808080` grey look lifeless. Tint neutrals slightly toward the brand hue. "Black" is a very dark brand-tinted charcoal; "white" is a faint warm or cool off-white.
- **A dominant color plus one or two sharp accents.** A timid evenly-spread palette has no point of view. Commit.
- **Exact brand hex from the brand file**, never approximated.
- **Contrast is verified, not assumed:** ≥4.5:1 for body, ≥3:1 for large text and meaningful UI. Check the actual values.
- **Accent used sparingly = it stays powerful.** If everything is the accent color, nothing is. Reserve it for the primary CTA and one or two emphasis moments.

## Depth, shadow, borders

- **Shadows imitate one consistent light source.** Same direction, believable softness. Multiple conflicting shadow directions look broken.
- **Layered, soft shadows beat one hard drop shadow** for premium depth (a small tight shadow + a larger diffuse one).
- **Borders are 1px and low-contrast** (a tinted neutral, not pure grey). Hairline dividers, not heavy rules.
- **Radius is consistent and scales with element size.** A 4px-radius button inside a 24px-radius card looks off; keep the family coherent.
- **No card-inside-card-inside-card.** Nesting bordered/filled surfaces three deep is a known slop pattern.

## Interactive states (every interactive element)

- **Hover, active, and focus-visible are all defined.** A button with only a default state feels dead. Hover gives feedback, active confirms the press, focus-visible serves keyboard users.
- **Transitions are short and eased** (100 to 200ms, ease-out). No linear, no 0ms snaps on hover.
- **The primary CTA has the most considered states** of anything on the page; it is the most important pixel.
- **Cursor and affordance match.** Clickable things look clickable; non-clickable things do not.

## Motion (with `emil-design-eng`)

- **One orchestrated above-the-fold entrance** with a tasteful stagger (30 to 80ms between elements) beats scattered scroll effects.
- **Ease-out for entrances; never linear for UI.** Durations mostly under 300ms.
- **Animate transform and opacity only** (GPU-friendly); never animate width/height/top/left for motion.
- **`prefers-reduced-motion` is honored**, and no content or CTA is ever gated behind an animation.

## Imagery and icons

- **One icon family**, consistent weight and size. Never mix outline and filled randomly; never use emoji as structural icons.
- **Images are intentional and on-brand**, correctly compressed (WebP/AVIF), with reserved space to prevent layout shift, and real alt text.
- **No misleading stock** that misrepresents the product. If a real asset is missing, use an honest labeled placeholder and flag it.
- **Generated imagery is never made by an image API or Gemini.** Use the `image-director` skill (it writes the prompt and renders it via the Codex built-in tool), then drop it in. Build with a correctly-sized placeholder in the meantime.
- **Logos are official files** from the brand assets folder, never hand-rolled or AI-generated.

## Copy finish (with the copy chief)

- Every sentence earns its place; delete anything that survives deletion.
- Button labels are action + value, never "Submit" / "Learn more".
- Microcopy reassures at the moment of friction (under the form, near the price).
- Numbers are specific and real. No invented precision.

## The loupe pass (run before calling done)

Zoom in. Look for: a 1px misalignment, an inconsistent gap, a heading that wraps to a lonely word, a button with no hover, a near-but-not-exact color, a fallback font flash, a shadow going the wrong way, an icon a hair off-center, text touching a container edge on mobile. Fix every one. This pass is the job.
