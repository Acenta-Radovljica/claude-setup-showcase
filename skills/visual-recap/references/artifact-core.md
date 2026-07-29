# Visual artifact core (shared by /visual-plan and /visual-recap)

Single source of truth for HOW the HTML review artifact is built and reviewed. Read this in
full before authoring any plan or recap artifact. Local-first: nothing leaves the machine.

## The two-model split (cost + context)

Judgment stays on the orchestrator model; the verbose HTML rendering is delegated to Sonnet.

1. **Orchestrator (this session)** does the thinking: explore, ground the facts, classify mode,
   decide the plan/recap content, interpret feedback. It produces a **compact block spec
   (JSON)** that is the source of truth, never the HTML directly.
2. **Renderer (Sonnet subagent)** turns the block spec into HTML. Dispatch it with the Agent
   tool, `model: "sonnet"`, `subagent_type: "general-purpose"`. Hand it: the block-spec JSON,
   the `lavish-axi design` snippet, this file's component rules, and the wireframe quality bar.
   It writes `.lavish/<slug>.html` and returns ONLY the file path plus any issues. The markup
   never enters the main context.

Re-renders are surgical: patch the block spec, re-dispatch the renderer with the changed blocks
(or have it edit the existing HTML with a targeted find/replace for a one-element change).

This is a deliberate, scoped Sonnet exception (rendering only); see `~/.claude/CLAUDE.md` Model
Preference. For the simplest structural artifacts Haiku is acceptable, but Sonnet is the
default so the wireframe quality bar holds.

## Block spec (source of truth)

```json
{
  "mode": "code | general",
  "title": "short, <= 70 chars",
  "brief": "1 to 3 sentences",
  "stats": [{ "label": "...", "value": "..." }],
  "blocks": [ { "type": "narrative|options|comparison|timeline|wireframe|diagram|fileTree|keyChanges|dataModel|apiEndpoint|openQuestions|risk", "...": "type-specific data" } ]
}
```

Each block carries DATA, not HTML. The renderer maps each to a DaisyUI component.

## Components

**Core blocks (any work):** `narrative` (outcome-first prose), `options` (choices with
pros/cons + a recommended default), `comparison` (current vs target side by side),
`timeline` (phases/steps/roadmap), `wireframe` (before/after screens, only when there is a
visual deliverable), `diagram` (two-dimensional relationships, not a left-to-right chain),
`openQuestions` (decisions, each with a recommended default), `risk` (risk + mitigation).

**Code add-ons (only when the work is a diff):** `fileTree` (changed files with
added/modified/removed/renamed flags + counts), `keyChanges` (tabbed before/after diffs of
load-bearing files, 3 to 8 tabs, one-line summary + a few margin notes each, under ~150 lines
per tab), `dataModel`/`apiEndpoint` (schema/contract deltas with change flags and prior values).

## Design system (resolve live, never hardcode)

Run `npx -y lavish-axi design` and author with the returned Tailwind v4 browser runtime +
DaisyUI v5 CDN snippet and components. Use semantic theme colors (`bg-base-100`,
`text-base-content`, `btn-primary`, `alert-warning`), a dark theme by default (`data-theme="dim"`),
`min-width:0` on grid/flex children, no horizontal overflow. ALWAYS style scrollbars explicitly
(webkit + firefox) for dark themes; the OS default is invisible on dark hi-DPI. Use `<pre>` /
`mockup-code` for any preformatted block (white-space preserved). For deeper guidance run
`npx -y lavish-axi playbook plan` (forward) or `playbook diff` (recap) or `playbook input`
(in-surface decisions).

## Wireframe quality bar

Before authoring ANY wireframe, the renderer must follow the mockup/wireframe quality bar in
`~/.claude/rules/design-and-build.md` verbatim: real content not lorem, modify don't
redesign, comparable before/after, theme tokens not hex, full-width chrome, pinned bottom bars,
fill the frame, no fake shadows, zoom in on sub-surfaces.

## Mode and UI detection

**Code vs general:** code mode when the work is a diff (working tree with code changes, a PR, a
ref range), else general mode. **UI sub-detection:** draw wireframes only when the work has a
visual deliverable, or in code mode when changed files match frontend signals
(`.tsx/.jsx/.vue/.svelte/.astro`, `.css/.scss`, Tailwind config, `components/ app/ pages/ public/ src/ui/`)
AND the hunks alter rendered structure, not just logic. Be conservative; flags
`--wireframes` / `--no-wireframes` override. State the detected mode + scope at the top and
render a cheap structural pass before any expensive wireframe.

## Grounding and safety

- **No invented facts.** Every `fileTree`, `keyChanges`, `dataModel`, `apiEndpoint`, and stat is
  built mechanically from the real input (diff/files/git). The model writes only prose. Mark
  anything inferred (not extracted) as inferred.
- **Redact secrets.** Never copy API keys, tokens, `.env` values, or webhook URLs into any
  block; use `sk-•••` / `<redacted>`.
- **No silent caps.** On a large input, sample the key items and state what was dropped.
- **Inspect before handoff** (completion-discipline): open the rendered artifact and check for
  overlap, clipping, empty bands, wrapped labels before asking for review.

## The Lavish review loop

Artifacts live in `.lavish/<slug>.html` in the repo working directory (gitignored). Commands
(invoke `lavish-axi` if it is on PATH, otherwise `npx -y lavish-axi`):

```bash
lavish-axi .lavish/<slug>.html                       # open/resume in browser
lavish-axi poll .lavish/<slug>.html                  # long-poll for annotations (run backgrounded)
# read the returned dom_snapshot + prompts; map anchors to block ids; patch the spec; re-render
lavish-axi poll <file> --agent-reply "<what changed>" # reply in-surface + wait for more
lavish-axi end <file>  &&  lavish-axi stop            # close the session and shut the server
```

Always `end` + `stop` when the review is done. Run `poll` backgrounded so the main turn is not
blocked; process feedback when it returns.
