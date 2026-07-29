# Conversion + Quality QA Checklist

The gate for Phase 5. The page is not done until every applicable item passes. Read this, then `Read` each screenshot and check against it. Tool success is not verification; you must look at the rendered output.

## 1. The 5-second test (clarity)

- [ ] From the hero screenshot alone, a stranger understands WHAT this is, WHO it is for, and WHY they should care.
- [ ] The headline states one specific promise or outcome, not a vague slogan.
- [ ] The subhead answers how / for whom / proof in one line.
- [ ] No jargon or cleverness that hides the meaning.

## 2. Visual hierarchy

- [ ] The eye lands on headline → subhead → primary CTA in that order, without effort.
- [ ] One dominant focal point above the fold, not three competing ones.
- [ ] Type scale is deliberate (clear jumps between H1, H2, body), not uniform mush.
- [ ] Whitespace guides attention; nothing is cramped or floating aimlessly.

## 3. Not generic (point of view)

- [ ] The page has a committed aesthetic, not default Inter-on-white with a purple gradient.
- [ ] Distinctive type pairing (display + body), not a single generic system font (unless brand-mandated).
- [ ] Intentional color: a dominant color and a sharp accent, not timid evenly-spread grey.
- [ ] At least one memorable element a visitor would recall afterward.
- [ ] Backgrounds have atmosphere/depth where the direction calls for it, not flat-default everywhere by accident.

## 4. CTA hierarchy and friction

- [ ] Primary CTA is visible above the fold.
- [ ] The same primary action repeats at natural decision points (after hero, after value, after proof, final).
- [ ] Secondary actions are visually subordinate; no two equal-weight CTAs competing.
- [ ] The form asks for the minimum viable fields for the goal.
- [ ] Reassurance microcopy sits under the submit (no spam, no card, unsubscribe anytime, etc.).
- [ ] Button labels are action + value ("Get my free audit"), not "Submit".

## 5. Trust and proof

- [ ] Proof is seeded early (logos, a stat, or a marquee quote near the hero).
- [ ] Heavy proof (testimonials with names/roles, case numbers) sits right before major CTAs.
- [ ] All proof is real and specific. No invented logos, fake testimonials, or fabricated statistics.
- [ ] Risk reversal is present where applicable (guarantee, free trial, cancel anytime).
- [ ] Any missing proof is flagged to the user, not faked.

## 6. Mobile first

- [ ] Mobile hero (390 wide) shows the promise and a reachable CTA without scrolling.
- [ ] Nothing is cut off, overflowing, or horizontally scrolling.
- [ ] Tap targets are at least 44px; the primary CTA is thumb-reachable.
- [ ] Body text is readable (no sub-14px body, adequate line length).
- [ ] The mobile stack is designed, not a squashed desktop.

## 7. Performance and polish (perceived speed)

- [ ] Fonts preloaded/preconnected; no flash of invisible text or fallback squares.
- [ ] No layout shift on load (CLS); above-the-fold renders cleanly.
- [ ] Below-the-fold imagery lazy-loads.
- [ ] Motion is purposeful (one orchestrated load beats scattered jitter) and respects `prefers-reduced-motion`.

## 8. Accessibility baseline

- [ ] Semantic landmarks (header, main, nav, footer), logical heading order.
- [ ] All images have alt text; decorative ones are marked.
- [ ] Form inputs have labels; focus states are visible.
- [ ] Contrast at least 4.5:1 for body, 3:1 for large headings.

## 9. Screenshot junk check (asset-production rule)

- [ ] No cookie banner, signup modal, or browser chrome in the captures.
- [ ] No scrollbar artifacts or visible overflow.
- [ ] No cropped or overflowing headings on multi-line text.
- [ ] No personal data leaked (real emails, internal URLs, draft watermarks).
- [ ] Official brand logo used (from the project's `Assets/` folder), never hand-rolled.
- [ ] Brand hex values used, not approximations; specified fonts loaded, not fallbacks.

## 10. Copy and brand rules

- [ ] No lorem ipsum, no `[placeholder]`, no TODO/TBD artifacts.
- [ ] No dashes used as punctuation (em, en, or hyphen-as-punctuation). Compound-word hyphens are fine.
- [ ] No dramatic fragment pairs ("Not X. Y.", "Less noise. More signal.").
- [ ] No specific school or educational institution names in public-facing copy.
- [ ] Voice matches the brand source.
- [ ] Form notification destination matches the correct email identity for whichever project owns the page.

## 11. Craft, the last 2% (full bar in `craft-standards.md`)

- [ ] One spacing scale and one type scale used throughout; no arbitrary one-off values.
- [ ] Large headlines have tuned negative tracking; no orphans/widows in headings or key subheads.
- [ ] Body measure is 60 to 75 characters; line-height comfortable on body, tight on headlines.
- [ ] Neutrals are tinted toward the brand hue, not pure black/white/flat grey.
- [ ] Every interactive element has hover, active, and focus-visible states; transitions short and eased.
- [ ] Shadows share one light source; borders are hairline tinted neutrals; radius family is consistent; no card-in-card-in-card.
- [ ] One icon family, consistent weight; real quotes/apostrophes; tabular figures in stats.
- [ ] The loupe pass is done: no 1px misalignments, inconsistent gaps, lonely wrapped words, off-center icons, or text touching mobile edges.

## 12. Multi-discipline critique (from `agency-roles.md`)

Review the rendered page once through each lens, separately. Write a one-line verdict per role; fix every rejection.

- [ ] **Strategist** — one positioning, one core message, close matches awareness stage.
- [ ] **Copy chief** — specific headline, outcomes not features, real proof, every line earns its place.
- [ ] **Art director** — committed point of view, distinctive type, intentional color, one memorable element.
- [ ] **UX/CRO** — inevitable hierarchy, value above the fold, one repeated primary CTA, minimal friction, mobile designed.
- [ ] **Motion** — purposeful, well-eased, reduced-motion honored, nothing gated behind animation.
- [ ] **Engineer/perf** — no CLS, no FOIT, real scale, clean semantic markup, deliberate first paint.
- [ ] **QA/a11y** — contrast, focus, labels, alt text, official logos, exact brand hex, zero placeholders.

## Pass rule

If any applicable box is unchecked, the page is "partially complete," not "done." Fix, re-screenshot, re-inspect. Report which items failed and what you changed. World-class means every box, not most of them.
