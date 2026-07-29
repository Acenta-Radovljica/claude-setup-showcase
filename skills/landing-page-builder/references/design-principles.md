# Landing Page Design Principles

The structural and visual rules for Phases 1, 3, and 4. These are opinionated. They exist to keep pages from converging on the same bland template. This file owns the conversion structure and the visual guardrails; `impeccable` owns the deeper build craft, `design-taste-frontend` owns the anti-slop direction, and `references/craft-standards.md` owns the obsessive "last 2%" detail bar. Use them together.

## Structure: the section order that converts

A high-converting page is a logical argument the visitor can skim. The default skeleton, top to bottom:

1. **Hero (above the fold).** Eyebrow (optional) + headline (the one promise) + subhead (how/for whom/proof) + primary CTA + one trust cue (logo strip, rating, or a single stat). The whole value proposition lives here. The visitor can convert without scrolling.
2. **Social proof strip.** Recognizable logos, a marquee testimonial, or a hard number. Borrows credibility immediately.
3. **Problem / stakes.** Name the pain in the visitor's own words. Make them feel understood before you pitch.
4. **Value / how it works.** 3 to 5 benefits as outcomes, not features. Each with a proof point. Visual support per benefit (icon, screenshot, illustration that matches the direction).
5. **Deeper proof.** Testimonials with name + role + photo, case-study numbers, before/after, a results panel.
6. **Objection handling / FAQ.** The 3 to 5 real hesitations, answered plainly.
7. **Risk reversal.** Guarantee, free trial, no card, cancel anytime. Lower the cost of saying yes.
8. **Final CTA.** Restate the promise and the action. This is the last push; make it strong.
9. **Footer.** Minimal: legal, contact, secondary links. Do not bury the final CTA under a fat footer.

Reorder for the specific offer (a waitlist page may collapse 3 to 7 into one tight section), but keep the logic: hook → proof → desire → objections → action.

## CTA mechanics

- **One primary action.** Decide the single thing you want the visitor to do. Everything serves it.
- **Repeat it** at natural decision points: end of hero, after value, after proof, final section. A long page with one CTA at the top loses people.
- **Subordinate secondary actions.** "Watch the demo" or "See pricing" are ghost/text buttons, never equal-weight to the primary.
- **Label with action + value.** "Start my free trial", "Get the audit", not "Submit" or "Learn more".
- **Form length tracks commitment.** Top-of-funnel: one field (email). Demo/sales: a few fields. Never ask for what you will not use. Add reassurance microcopy under the submit.

## Trust mechanics

- **Seed early, stack late.** A light proof cue near the hero (logos/rating/stat); the heavy proof (testimonials, case numbers) right before each CTA where doubt peaks.
- **Specific beats generic.** "Cut response time 63% for 40-room hotels" beats "trusted by businesses worldwide".
- **Real only.** Never fabricate logos, testimonials, or numbers. If the user lacks proof, design an honest placeholder and flag it.

## Visual craft (in concert with `impeccable` + `design-taste-frontend`; detail bar in `craft-standards.md`)

- **Commit to one aesthetic direction.** Refined minimal, editorial, bold maximalist, brutalist, luxury, retro-futuristic, organic, technical/utilitarian. Intentionality over intensity. Do not blend three.
- **Typography carries the personality.** Distinctive display font + refined body font. Avoid Inter/Roboto/Arial/system defaults unless the brand mandates them. Deliberate type scale with clear jumps. Do not converge on the same trendy font across every build.
- **Color: dominant + sharp accent.** A committed dominant color with one or two sharp accents outperforms a timid evenly-spread grey palette. Use CSS variables. Pull brand hex values from the brand file; never approximate.
- **Atmosphere over flat defaults.** Gradient meshes, noise/grain, geometric patterns, layered transparency, considered shadows where the direction calls for it. Avoid the cliched purple-gradient-on-white look.
- **Spatial composition.** Use asymmetry, overlap, grid-breaking, and generous negative space or controlled density on purpose. Avoid the centered-hero-plus-three-identical-cards default.
- **One memorable element.** The thing a visitor recalls afterward: a striking hero treatment, a signature interaction, a distinctive visual motif.

## Motion

- CSS-first for HTML. One orchestrated above-the-fold load with staggered reveals (`animation-delay`) beats scattered micro-interactions.
- High-impact moments only: hero entrance, hover states that surprise, scroll-triggered reveals for key sections.
- Respect `prefers-reduced-motion`. Never gate content or CTAs behind animation.

## Mobile first

- Design the mobile stack first, enhance upward. Most landing-page traffic is mobile.
- Tap targets at least 44px. Primary CTA reachable by thumb.
- Readable body (no sub-14px). Sensible line length. No horizontal scroll.
- Hero promise + CTA visible on a 390-wide screen without scrolling.

## Perceived performance

- Preconnect/preload the hero font; avoid FOIT and layout shift (CLS).
- Inline critical CSS for a self-contained file. Lazy-load below-the-fold imagery.
- Keep external requests minimal: fonts + Tailwind runtime + necessary images.
- A deliberate, clean above-the-fold first paint matters more than the absolute byte count.

## Accessibility baseline

- Semantic landmarks and logical heading order.
- Alt text on images; labels on inputs; visible focus states.
- Contrast at least 4.5:1 body, 3:1 large headings.

## Anti-patterns to refuse

- Inter-on-white with a purple gradient and three identical feature cards.
- Vague clever headlines that hide the offer.
- Two equal-weight competing CTAs.
- A long form at the top of the funnel.
- Fake logos, testimonials, or stats.
- Lorem ipsum, placeholders, TODO/TBD shipped as "done".
- Dashes as punctuation; dramatic fragment pairs ("Less noise. More signal.").
- A desktop design squashed onto mobile.
