# The Agency: Disciplines and the Multi-Lens Critique

A world-class page is not made by one generalist doing a competent pass. It is made by a room of specialists, each obsessed with one dimension, each willing to send the work back. You are emulating that room. Read this at the start of a build so you carry the right lens into each phase, and again in Phase 5 to run the critique.

The mechanism that matters: **after the page is built, review it once through each discipline's eyes, separately.** A single holistic pass blends everything into "looks fine." Seven sharp, separate passes catch what blending hides. Each role below ends with "what this person rejects on sight" — that is your critique checklist.

---

## 1. The Strategist (positioning + message)

Owns: why this page wins, not just how it looks. Before a word is designed, the strategist has answered: what category does this compete in, what is the one thing we want remembered, what is the single objection in the way, and what stage of awareness is the visitor at (unaware → problem-aware → solution-aware → product-aware → most-aware). Awareness stage dictates everything: an unaware visitor needs the problem dramatized before any pitch; a most-aware visitor just needs the offer and a reason to act now.

**Rejects on sight:** a page that lists features with no positioning; a headline that could belong to any competitor; trying to say five things; a close that is harder or softer than the awareness stage warrants.

## 2. The Copy Chief (conversion writing)

Owns the words, which carry the conversion. Every line earns its place or is cut. The headline makes one specific promise. Body copy is in the visitor's language, about their outcome, not the product's mechanics. Proof is concrete and named. See `copywriting-playbook.md`.

**Rejects on sight:** vague clever headlines that hide the offer; feature lists masquerading as benefits; "revolutionary / seamless / cutting-edge" filler; fabricated or vague proof ("trusted by many"); dashes as punctuation; dramatic fragment pairs; any sentence that survives deletion without loss.

## 3. The Art Director (visual identity)

Owns the look and its discipline. One committed aesthetic point of view, distinctive type, intentional color, real atmosphere, one memorable element. Restraint is a feature: a single bold move beats five competing ones. The page should be identifiable as *this brand* with the logo cropped out.

**Rejects on sight:** Inter/Roboto/Arial-on-white with a purple gradient; three identical feature cards; a timid evenly-spread grey palette; decoration with no purpose; blending three aesthetics; a hero that looks like every other SaaS hero.

## 4. The UX + CRO Lead (structure + friction)

Owns the path from arrival to action. Hierarchy is inevitable (headline → subhead → CTA). The full value proposition is above the fold. One primary action, repeated at decision points, secondaries subordinate. Shortest viable form. Trust seeded early, heavy proof stacked before each CTA. Scannable in 8 seconds. Mobile-first, thumb-reachable CTA.

**Rejects on sight:** two equal-weight competing CTAs; a long form at top of funnel; the promise buried below the fold; proof placed where doubt has already won; a wall of text with no scan path; a desktop layout squashed onto mobile.

## 5. The Motion Designer (`emil-design-eng`)

Owns movement. Motion conveys meaning and guides attention; it is never decoration. One orchestrated above-the-fold entrance with a considered stagger beats scattered micro-interactions. Easing is correct (ease-out for entrances, never linear UI motion), durations are tuned (most UI under 300ms), and `prefers-reduced-motion` is honored. Content and CTAs are never gated behind animation.

**Rejects on sight:** linear easing on UI; bounce/elastic where it doesn't belong; everything animating at once; scroll-jacking; motion that delays the visitor reaching the CTA; no reduced-motion fallback.

## 6. The Front-End Engineer (`impeccable`) + Performance

Owns the build quality and perceived speed. Semantic HTML, a real spacing/type scale, no layout shift, fonts preloaded, critical CSS inline, lazy-loaded below-the-fold imagery, a deliberate first paint. The file opens correctly by double-clicking. Code is clean enough to hand to a developer.

**Rejects on sight:** layout shift on load; FOIT / fallback-square flash; arbitrary one-off spacing values instead of a scale; render-blocking junk; a page that only "works" in the tool's preview; markup with no landmarks.

## 7. The QA Director + Accessibility (the gate)

Owns "done." Runs the loupe: optical alignment, consistent spacing, headline tracking, no orphans/widows, every interactive element has hover/active/focus, contrast ≥4.5:1 body and 3:1 large, alt text, labeled inputs, keyboard path, no screenshot junk (cookie banners, scrollbars, cropped headings, leaked data), official logos and exact brand hex. Nothing ships with a placeholder or a "TODO." See `craft-standards.md` and `conversion-checklist.md`.

**Rejects on sight:** anything from `craft-standards.md` left undone; a missing focus state; an unlabeled input; a cropped heading; a hand-rolled logo; a placeholder shipped as final; "done" while any checklist item is open.

---

## Running the critique (Phase 5)

After the build, go role by role down this list against the rendered screenshots. For each, write a one-line verdict: pass, or the specific thing that role would reject. Fix every rejection, re-render, re-check. Only when all seven pass, plus the full `conversion-checklist.md`, is the page done.

This is slower than one glance. That is the point. The gap between "good" and "world-class" lives almost entirely in the rejections a tired single pass waves through.
