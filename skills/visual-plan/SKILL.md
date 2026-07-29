---
name: visual-plan
description: Turn a task into an interactive visual plan (HTML) reviewed and approved in the local Lavish Editor before work starts. Works for ANY work, not just code: a feature, a strategy, a GTM or content plan, research, an ops change, or a significant decision. Produces narrative, options/decisions, comparisons, timelines, diagrams, open questions, plus wireframes when there is a UI/visual deliverable, and code blocks (file map, planned code, data/API contracts) when it is a code change. Use before non-trivial, multi-step, or decision-heavy work, when the user says "plan this", "visual plan", "design this", or proactively before starting such work. Renders via a Sonnet subagent to keep it cheap and context-light. For building a marketing landing page specifically, hand off to landing-page-builder.
---

# Visual Plan

Build a plan **toward** work, approved before code or execution begins. Read
`references/artifact-core.md` in the sibling `visual-recap` skill directory
(`~/.claude/skills/visual-recap/references/artifact-core.md`) in full first; it owns the block
spec, the Opus-judgment + Sonnet-render split, the components, grounding/safety, and the Lavish
loop. Do not author the HTML in the main thread.

## When to fire

Before non-trivial, multi-step, or decision-heavy work: a new feature or app, a strategy / GTM
/ content / research plan, or a choice that is expensive to undo. Skip trivial or mechanical
work, a one-line answer, or when the user says "just do it". Gates and the off-switch live in
`~/.claude/rules/visual-plan-recap.md`. For a marketing landing page, plan here if useful but
hand the BUILD to `landing-page-builder`.

## Plan discipline

1. **Explore first, read-only.** Inspect the real files, actions, schema, data, and patterns;
   delegate wide exploration to a subagent when useful. Name actual files and symbols; lead
   with reuse. Make no edits while planning.
2. **Decide the hard-to-reverse bets first** (wire format, public ids, data-model shape, auth
   and ownership), then scope the smallest first cut that proves the approach, stating what is
   in and what is deferred.
3. **Keep examples at the right altitude**; separate the core abstraction from motivating
   examples.

## Build it

1. Classify mode (code vs general) and UI sub-detection per `artifact-core.md`.
2. Build the **block spec** describing the PLANNED state: objective and done-criteria
   (`narrative`), scope/non-goals, planned file map and planned code for code work
   (`fileTree`/`keyChanges`), data/API contracts (`dataModel`/`apiEndpoint`), options behind a
   decision (`options`/`comparison`), wireframes when there is a visual deliverable
   (`wireframe`), risks (`risk`), and a single `openQuestions` block (each with a recommended
   default). A verification step that exercises the real workflow.
3. Dispatch the **Sonnet renderer** (Agent tool, `model: "sonnet"`) with the spec + the
   `lavish-axi design` snippet + the wireframe rules. It writes `.lavish/plan-<slug>.html` and
   returns the path.
4. Run the **Lavish loop**. The artifact IS the approval gate: present it, request sign-off, do
   not ask a separate "does this look good?". On approval, carry the locked plan into execution
   (`writing-plans` for code). `end` + `stop` when done.

## On approval: emit a Build Handoff Spec (when the plan has UI screens)

The approved plan is a **binding spec**, not a reference — see
`~/.claude/rules/design-and-build.md`. When the approved plan contains wireframes or
references a locked prototype, write a per-screen build handoff spec BEFORE execution begins (a
section appended to the plan doc, or `.lavish/build-spec-<slug>.md`). It is the literal checklist
the builder follows and the design-diff verifier walks. For every screen:

1. **Screen + route** (e.g. "Money overview at `/money`").
2. **Component breakdown** — every component the screen uses, its props, and the source (reuse
   an existing component, or new component to create).
3. **Interactive-element inventory** — every button, filter, toggle, tab, link, input visible on
   the screen, each with the handler it needs (onClick / onChange / route / API) and the state it
   reads/writes. There is no "decorative" interactive control: if it's rendered it's wired.
4. **Affordance checklist** — the minimum actions the screen needs to be usable (add/create for
   any tracker, edit/delete/back for detail views, wired filters + responsive list). Mark each
   WIRED or DEFERRED (deferred = not rendered this phase).
5. **Responsive behavior** — what changes desktop vs mobile (layout shift, hidden elements,
   bottom sheet vs modal). Every screen has a mobile spec.

Skip this only for purely backend / strategy / non-visual plans. Build to the spec exactly, then
run the design diff in `design-and-build.md` before declaring done.
