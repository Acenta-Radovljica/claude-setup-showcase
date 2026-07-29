# Design and Build: Prototype First, Fidelity Always (Mandatory)

One lifecycle, one rule (merged 21. 7. 2026 from `design-prototype-first.md` and `design-fidelity-contract.md`): **spec → HTML design prototype (iterate visually) → implementation plan → build EXACTLY what was approved → design-diff verify.** Part 1 governs the prototype step; Part 2 makes the approved design a binding contract for the build.

## Part 1: Design-prototype-first for bigger projects

For any **bigger or design-heavy project** (a new app, dashboard, web tool, multi-screen product, or a substantial redesign), do NOT jump from spec straight to building the real application. Insert an HTML design-prototype step and iterate on it visually before writing the production app. Seeing real screens and reacting beats approving an abstract spec.

**Triggers:** a new application or internal tool; anything with multiple distinct screens or non-trivial UI/information architecture; a substantial redesign of an existing product. **Does NOT trigger:** a single component, a bug fix, a script, a CLI, an API-only change, a tiny page, or work where the user explicitly says "just build it."

### How to do the prototype right (so it is not throwaway)

The prototype is a **translatable design spike**, not a sketch and not the final code:

1. **Use the real design tokens and component structure** the production app will use (same color/spacing/type system, same conceptual components: Card, Stat, Chart, Board). The markup and CSS should translate to the framework, not be rebuilt from scratch.
2. **Use realistic representative data**, not lorem ipsum. For a data app, show believable numbers, real-looking records, actual insights/charts.
3. **Cover the key screens**, not every screen: the 2 to 4 highest-stakes views (Home/overview, the primary working view, one detail view).
4. **Iterate visually**: render, screenshot, open in the browser, get reactions, refine. Lock the design before the production build.
5. **Be honest about its limits**: a static prototype proves the look and the information architecture, NOT the live data, the backend, or the interactivity. The prototype de-risks design; it does not de-risk the system.

### Mockup and wireframe quality bar

Applies to every prototype screen, wireframe, or mockup (HTML spike, before/after comparison, single-screen mock):

1. **Real content, never lorem or gray bars.** Real labels, counts, dates, names, button text grounded in the actual screen. Placeholder bars belong only in a genuine loading/skeleton state.
2. **Modify, do not redesign.** When changing an existing screen, reproduce its current layout and footprint first, then change only the delta and call it out. Match the real app's density, sidebars, toolbars, overflow menus, chrome. Do not restack the page into a new layout.
3. **Before/after must be comparable.** Keep unchanged controls present in both states so the reviewer sees exactly what moved. Same frame size, padding, density on both sides. Put the new affordance where the implementation actually puts it. Name states with a column/section header, never a pill baked into the screen.
4. **Theme-safe color.** Drive every custom color through CSS variables/tokens, never hardcoded hex, so light and dark both render. Pairs with `html-authoring.md`.
5. **Full-width chrome, pinned bottom bars.** Top bars and toolbars are full-width flex rows with a spacer pushing trailing actions right. Bottom bars pin to the frame bottom (flex column at `height:100%`, scrolling body `flex:1`, bar last child).
6. **Fill the frame, keep labels short, do not wrap single-line rows.** `white-space: nowrap` (plus ellipsis) on toolbars, tab rails, breadcrumbs, file/branch names. Shorten copy rather than letting it wrap.
7. **No decorative shadows** unless the real product UI already has them. Mockups read as flat, bordered surfaces.
8. **Zoom in on sub-surfaces, do not redraw the page.** For a popover, menu, dialog, or toast: show the full screen once, then a separate small frame with only that sub-surface at its real footprint.
9. **Inspect before handoff.** Open the rendered screen and look at it (overlap, clipping, contrast, empty bands, wrapped labels) before asking for approval. This is Part 2 of `completion-discipline.md` applied to mockups.

### Decide the hard-to-reverse bets first

When the work touches backend, data, or an API, the plan must settle the decisions that are expensive to undo once data or callers depend on them (wire format, public ids, data-model shape, auth and ownership boundaries) before most of the feature ships. Get those right in the plan, then scope to the smallest first cut that proves the approach without foreclosing it, stating explicitly what is in and what is deferred.

## Part 2: Design fidelity contract

An approved design (a Lavish plan, an HTML prototype, a wireframe, or any visual artifact the user explicitly approved or "locked": "approved", "ship it", "build it", "looks good") is a **binding visual spec**. Not a suggestion, not a reference, not a starting point to riff on. The whole reason the user approves a design before the build is so the build comes out exactly like it. Build it exactly. Keep the prototype files in the project (e.g. `design-prototype/`) as the visual reference until the real UI matches them.

### The contract (non-negotiable once approved)

1. **Fidelity.** Every screen, every state (desktop AND mobile), every card, layout, color, gradient, and spacing choice in the approved design appears in the build. Do not restructure markup, rename classes, drop a section, or "improve" the layout unless the user asks. If the prototype uses specific CSS class names, port the actual CSS for them; writing the class names and skipping the styles silently produces a broken screen.

2. **No dead controls.** Every interactive element rendered in the build (button, filter, toggle, tab, link, dropdown, checkbox, slider, input, "add" affordance) MUST be wired to real behavior: a handler, a route, a state change, or an API call. If it cannot be wired in this phase, **do not render it.** A visible control that does nothing on click is a defect, full stop. Before declaring a screen done, click/toggle every interactive element and confirm it does something.

3. **Feature-completeness (affordance audit).** Before building any screen, enumerate the minimum affordances it needs to be usable, and verify each is present AND functional before done:
   - Every tracker (expenses, transactions, subscriptions, habits, goals) needs a working **add/create** action.
   - Every list/table needs its create/add, and where appropriate edit, delete, sort, filter.
   - Every filter group: all filters wired, active-state styling, and the list actually responds.
   - Every detail view: back navigation, plus edit/delete/status where it makes sense.
   - Every form: submit, validation feedback, cancel/back.

### Pre-done verification: the design diff

Before declaring a design-derived build "done", compare screen by screen:

1. Open the approved prototype/Lavish artifact and the built page side by side (Playwright/browser), at **desktop AND mobile** widths.
2. For every screen in the prototype: layout structure, colors/tokens, typography, spacing, presence AND function of every interactive element, each state (empty / populated / mobile).
3. Fix every divergence before saying done. If the prototype has N screens, verify all N plus mobile variants, not a subset.

A screen that "looks close but has a restructured grid, 3 unwired filters, and a missing add button" is a FAIL, not a pass-with-notes.

### When Part 2 does NOT apply

Work with no approved design (free-form build, bug fix, backend-only); the user explicitly said "use the design as inspiration, not a spec"; trivial changes where no approval step occurred.

## After the prototype is locked

Carry the locked design into the implementation plan (`writing-plans`) and the production build. The prototype's tokens, layout, and component breakdown become the front-end's starting point. `/visual-plan` (see `visual-plan-recap.md`) is the standard approval surface for the plan itself.

## Origin

Merged 21. 7. 2026. Part 1 added 4. 6. 2026 (NativeAI OS design session; landing-page work proved HTML-mockup-first converges faster than spec-only review), extended 18. 6. 2026 with the quality bar and hard-to-reverse bets (distilled from Steve Sewell's `/visual-plan`). Part 2 added 23. 6. 2026 after the Personal OS Money pillar build diverged from the approved Lavish design (restructured markup, class names without CSS, dead filters, missing add-expense). Incident narratives: `~/.claude/CHANGELOG-rules.md`. Reference runs: `~/Domain/Personal/ai-tooling/my-claude-setup/`.
