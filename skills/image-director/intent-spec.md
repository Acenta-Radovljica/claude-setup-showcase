# The intent-spec (source of truth)

Every image starts as a filled-in **intent-spec**: a small structured block the
skill fills from the user's description. The spec is the single source of truth.
It compiles to the actual prompt text, it is where consistency tokens live, and
it is what you diff when iterating ("change one variable at a time").

You do not show the user a raw schema unless they ask. You fill it internally,
infer aggressively, and ask only for the un-inferable hard facts (see SKILL.md).

## Schema

```yaml
intent:
  domain: ui-screenshot | web-marketing | photography | architecture-product
  # which expert module drives craft. Inferred from the request; pick ONE primary.

  use: <one line>            # what it's for (ad hero, app store shot, brand post, mockup)
  output:
    aspect: 1536x1024 | 1024x1024 | 1024x1536   # built-in presets only
    format: png
  subject: <the literal subject, concrete and specific>

  # --- craft (the module fills these with expert decisions, not adjectives) ---
  style: <art direction: editorial / clinical / cinematic / brutalist / etc.>
  composition: <framing, camera angle, rule-of-thirds placement, negative space>
  light: <setup: softbox key + rim, golden hour, clean studio, hard noir, etc.>
  optics: <lens/DoF for photography: 100mm macro f/8, 35mm environmental, etc.>
  palette:
    locked: false           # true when part of a consistent set (see consistency.md)
    tokens: [<#hex>, <#hex>, ...]   # the exact colours; reused verbatim if locked
  finish: <grain, texture, material physics, surface detail cues>

  # --- content (the realism driver, esp. for UI) ---
  verbatim_text:            # EXACT strings to render; the #1 anti-gibberish lever
    - "<string exactly as it must appear>"

  # --- consistency ---
  references: []            # abs paths of -i reference images (subject/brand/style)
  consistency_kind: none | style-set | subject | design-system | reproducible
  anchor: none             # "<project>/<version>" to auto-attach that set's saved
                           # anchor.png on render (render.sh --anchor); see consistency.md

  # --- guardrails ---
  negatives: <the anti-list: e.g. no soft Gaussian blur, no CGI plastic, no
              warped text, no extra fingers, no watermark, no cursor>

  # --- engine (constant for this skill) ---
  engine:
    tool: codex-builtin-image_gen
    model: gpt-image-2
    quality: high           # ALWAYS high. Never medium. Non-negotiable.
```

## Two universal clauses (every spec, every domain)

1. **Anti-softness clause** — always include in `negatives` unless the user
   explicitly wants a soft look: `no soft Gaussian blur, no hazy wash, no
   over-denoised airbrushed look, crisp and sharp with fine high-frequency
   detail, defined edges`. This is what fixed the "everything looks off / blurry"
   complaint. Soft subjects (glow, plasma, bokeh) still need it most.
2. **Quality clause** — `quality: high` is fixed in `engine`. `render.sh` enforces
   it; the spec records it so it is never forgotten.

## Compile step (spec → prompt)

The spec compiles to a **natural-language prompt** by default (gpt-image-2 is
steered best by rich prose). Order, per the engine's own prompting guidance:

> scene/backdrop → subject → key craft details → verbatim content → constraints/negatives → output intent

A **JSON-structured** prompt is an option only when a task is highly
parametric and reproducibility matters (e.g. a strict UI spec). The spike did not
find JSON to beat well-ordered prose for gpt-image-2, so **prose is the default**;
reach for JSON only when the user asks or when a layout is too rule-heavy for
prose. Either way the intent-spec is the source; the format is just how it serialises.

## Where specs + renders live

Store: `~/Domain/Personal/Assets/image-director/<project>/<version>/<NN-slug>/`
- `spec.yaml`     — the filled intent-spec (source of truth)
- `prompt.txt`    — the compiled prompt actually sent to the engine
- `render.png`    — the output (presence = done)
- `notes.md`      — optional: what was refined and why

One image = one folder. New visual direction = new `<version>/`. This mirrors the
old design-prompts convention (now retired) so anything already there stays readable.
