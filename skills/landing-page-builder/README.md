# landing-page-builder

A skill that builds **world-class** landing pages end to end, at the level of a top design + copy + marketing agency: strategy, visual research, brand-voice copy, conversion-driven structure, a production build, a multi-discipline critique, and a browser-based visual QA loop. It produces a single self-contained Tailwind HTML file by default (Next.js page as a secondary option) plus a strategic Landing Page Brief.

It is opinionated. It refuses to ship generic, cookie-cutter pages and holds a Tesla-grade "last 2%" craft bar: clarity, inevitable hierarchy, a committed point of view, real proof, and conversion mechanics.

## When to use it

- A new landing page (product, service, offer, app, agency, event).
- A lead-gen, sales, waitlist, beta-signup, webinar, or download page.
- A rework of an existing landing page you provide (file, paste, or URL).

Not for: full multi-page sites or web apps, blog posts, internal dashboards. Use `impeccable` directly (or `ui-ux-pro-max` for a dashboard's chart/data patterns) or a project codebase for those.

## How to invoke

```
/landing-page-builder
```
Starts the full flow and asks the input questions.

```
/landing-page-builder a waitlist page for Acme Atlas. Goal: email signups. Voice: confident, technical, no hype. Beat this: https://some-competitor.com
```
Pre-fills project, goal, voice, and a competitor to study.

```
/landing-page-builder iterate on ./landing-pages/my-product/index.html. The hero is weak and the mobile CTA is buried.
```
Reads the existing page, diagnoses it, proposes targeted fixes, rebuilds, re-runs QA.

```
/landing-page-builder Next.js page for the Atlas codebase. Sales page for the Pro tier.
```
Produces a `page.tsx` plus components in the project's conventions instead of standalone HTML.

## What it asks for (Phase 0)

1. Project context (which business or named personal project this belongs to), which sets brand inputs, the form-notification email identity, and file location.
2. Offer / ICP: what is being offered and to whom.
3. Primary goal: lead gen, sale, waitlist, demo, download, newsletter.
4. Brand voice source: a file path, an existing site, a competitor to match, or two adjectives.
5. Inspiration / competitors (optional).
6. Output format: self-contained Tailwind HTML (default) or Next.js page (existing Next.js codebases only).

## The seven phases

| Phase | What happens | Gate |
|---|---|---|
| 0. Brief + discovery | Gather the minimum, load local brand context, load the agency lenses | none |
| 1. Strategy + direction | Positioning + awareness stage + core message; pull references; commit a look; **present a live hero concept board** (6 to 10 switchable variants + brief panel) or 2 to 3 prose options | Direction lock |
| 2. Copy | Full brand-voice copy deck against the copywriting playbook, hook variants, real proof only | none |
| 3. Structure + section boards | Map copy to a conversion-driven layout; for important pages, **section concept boards** (2 to 4 treatments per major section) to pick the strongest treatment each | Structure + copy lock |
| 4. Build | `impeccable`-built, `ui-ux-pro-max`-informed, `emil-design-eng` motion, to the craft-standards bar | none |
| 5. Critique + QA | Multi-discipline critique + screenshot at 3 viewports, inspect against the checklist, fix, repeat | Checklist + lenses pass |
| 6. Brief | One-page Landing Page Brief plus file paths plus deploy note | none |

## Supporting files

- `SKILL.md`: the workflow spine and rules.
- `references/discovery-brief.md`: the consultant's Phase 0 intake (what to extract vs. infer, how to run discovery).
- `references/agency-roles.md`: the expert disciplines and the multi-lens Phase 5 critique.
- `references/concept-boards.md`: the mockup-first method (live switchable hero + section variant boards before the full build).
- `references/copywriting-playbook.md`: world-class conversion copy (strategy, awareness stages, hooks, proof, objections, voice).
- `references/craft-standards.md`: the obsessive "last 2%" detail bar (type, spacing, color, depth, states, motion).
- `references/design-principles.md`: the structural and visual rules for Phases 1, 3, and 4.
- `references/conversion-checklist.md`: the Phase 5 QA gate. Every applicable item must pass before "done".

## How it works with other tools

- **`impeccable` skill**: the build engine. This skill keeps strategy/structure/copy/conversion and invokes it in Phase 4.
- **`design-taste-frontend` skill**: the anti-slop direction system and pre-ship checklist.
- **`ui-ux-pro-max` skill**: concrete palette / font pairing / style-per-product-type lookups.
- **`emil-design-eng` skill**: purposeful, well-eased motion.
- **`copywriting-storytelling` agent**: complex offers or multiple hook variants.
- **`design-visionary` agent**: an optional deeper design critique in the QA loop.
- **Playwright** for fixed-viewport QA screenshots to disk. **Firecrawl** for scraping inspiration and competitors. **context7** for current Tailwind / `next/font` setup syntax.

(The old `frontend-design` plugin is retired from this pipeline; `impeccable` + `design-taste-frontend` cover its visual-craft role.)

## Output locations

Per the global File Output rules. Nothing lands in the home root or a repo root.

- HTML deliverable + Brief: `<root>/Business/<Company>/Assets/landing-pages/<slug>/` (or `<root>/Personal/<project>/Assets/landing-pages/<slug>/`).
- QA screenshots: that project's `Assets/screenshots/`, named meaningfully.
- Next.js code: the project's `.Code/` tree, following its conventions.
