# image-director — design & provenance

Locked design for the `image-director` skill, built 2026-06-21 after a brainstorm
and an empirical spike. This is the spec; the skill files implement it.

## What it is
A director-level, multi-domain image generator. The user describes an image; the
skill applies the right expert craft, writes the optimal gpt-image-2 prompt,
renders it via the Codex built-in `image_gen` tool at quality:high, inspects the
result, and self-corrects until it is world-class. It replaces the retired
`design-prompts` skill (which was a prompt store that never rendered).

## Decisions locked in brainstorm
1. **Scope:** all four domains from day one (UI screenshot, web/marketing,
   photography, architecture/product), as independent modules under one skill.
2. **Prompt format:** hybrid. A structured **intent-spec** is the source of truth;
   it compiles to natural-language prose by default (best for gpt-image-2), JSON
   only when a task is highly parametric. Prose won the spike.
3. **Render loop:** closed, auto-iterate. Render → inspect the PNG → critique →
   one targeted refine → re-render, to match or a 3-pass cap.
4. **Consistency:** all four kinds (style-set, recurring subject, UI design-system,
   reproducibility) via locked style/design-system blocks + reference images.
5. **Interaction:** infer aggressively, ask only un-inferable hard facts (verbatim
   text, exact brand hex, dimensions).

## Architecture (Approach A)
One skill, modular inside:
- `SKILL.md` — the brain / front door / flow.
- `intent-spec.md` — the source-of-truth schema + compile rules.
- `render-loop.md` + `scripts/render.sh` — the validated render mechanic.
- `consistency.md` — the four consistency mechanisms.
- `modules/{ui-screenshot,web-marketing,photography,architecture-product}.md` — craft.
- `references/engine-gpt-image-2.md` — validated engine facts.

## Hard constraint: built-in tool only
User decision (2026-06-19): render through the Codex built-in `image_gen` tool via
`codex exec`. No `OPENAI_API_KEY`, no `image_gen.py` CLI, no Gemini. Trade-offs
accepted: no explicit 4K, no inpainting masks (both API-only). If a task truly
needs those, flag the API trade-off to the user; never switch silently.

## Spike findings (2026-06-19) — why the skill is shaped this way
Store: `~/Domain/Personal/Assets/image-director/spike-2026-06-19/`.
- **Model is gpt-image-2** (current SOTA: 4K-capable, ~99% text accuracy). Right model.
- **quality:high is the single biggest lever.** The first renders looked cheap/CGI
  because the built-in tool defaults to `medium`. Same model+prompt at `high` was
  studio-grade. `render.sh` forces high.
- **The blur was prompt-fixable, not an engine defect** (crisp UI text + crisp
  filament detail proved it). Anti-softness clause added to every spec.
- **Reference-image consistency works on built-in** (the LUMEN bottle held across
  scenes), but reference renders must force quality:high (first pass came back soft).
- **The closed loop fixed a real failure** (a muddy background) in one pass.
- **Operational gotchas** now handled by `render.sh`: `-C` writable workspace, the
  variadic `-i` swallowing the prompt (pipe via stdin), inconsistent export path.

## Validated render recipe (the heart)
`codex exec --skip-git-repo-check -s workspace-write -C <outdir> [-i <ref>...] -`
with the prompt on stdin, instruction forcing `quality: high`, then collect the
PNG from workspace / /tmp / generated_images. Wrapped in `scripts/render.sh`.

## Wiring
- Global `~/.claude/CLAUDE.md`: routing rule sending all image-generation needs here.
- `design-prompts` skill archived to backlog (store data kept). `imagegen-frontend-web`
  superseded as the web-marketing craft home (folded into the module).
