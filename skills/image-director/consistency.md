# Consistency system

Four kinds of consistency, each with a concrete mechanism on the built-in path.
All four were requested; all four are achievable without the API.

## The anchor: a persisted reference, auto-attached (the automation layer)

Mechanisms 2 to 4 below all work by passing a canonical render back as `--ref`.
Doing that by hand every time is exactly where drift sneaks in (a forgotten ref, the
wrong file). The **anchor** automates it per project/version so the set cannot drift
by accident:

1. **Set once.** When a render is approved as the canonical look/subject for a set,
   lock it: `scripts/anchor.sh set <project> <version> <approved.png>`. It is copied
   to `<store>/<project>/<version>/anchor.png` with `anchor.json` provenance. Set it
   from the first render you would be happy to see repeated.
2. **Auto-attach on every later render.** Pass `--anchor <project>/<version>` to
   `render.sh`; it resolves the saved anchor and adds it as a `-i` reference itself
   (in bash, so there is no fragile call-site word-splitting).
   ```bash
   render.sh --out <store>/<project>/<version>/<NN-slug>/render.png \
             --prompt-file prompt.txt --anchor <project>/<version>
   ```
3. **Still lock the words.** The anchor holds the *visual*; keep the locked
   style/design-system block in the prompt too (belt and braces with mechanisms 1, 3).

A new visual direction = a new `<version>/` with its own anchor; `anchor.sh clear`
removes one. The anchor is the single source of subject/style truth for a set.

## 1. Style / brand across a set
Every image in a batch shares palette, light, type feel, mood, finish.

**Mechanism: a locked style-token block.** Author it once, paste it VERBATIM into
every prompt in the set. Put it in the version's `_shared/style-tokens.md` and
inline it into each `spec.yaml` (`palette.locked: true`, same `tokens`, same
`light`/`finish` strings). Do not paraphrase between images — identical words
keep the look identical. This is the table-stakes one for marketing + UI sets.

## 2. Recurring subject identity
The same product / mascot / person looks identical across many scenes.

**Mechanism: reference image via `-i`.** Pass the canonical render of the subject
as `--ref` to `render.sh`; gpt-image-2 always uses high input fidelity, so it
holds identity. Proven in the spike: the LUMEN bottle + its label transferred
intact from the hero shot into a new marble-shelf scene.
- Restate the invariant features in the prompt too ("same bottle, same matte cap,
  same label reading 'LUMEN' / 'Vitamin C Serum' / '30ml'") — belt and braces.
- **Force `quality: high` on reference renders specifically.** The spike's first
  reference pass came back soft because edit/reference mode under-rendered; the
  second pass with quality high + explicit scene direction fixed it. Never let a
  reference render fall back to medium.
- Keep one "canonical" render per subject as the reference of record.

## 3. UI design-system consistency
Many app screens share one nav, components, spacing, palette.

**Mechanism: a locked design-system block** (same idea as #1, UI flavour): one
block describing the sidebar, top bar, component shapes, radii, type, and exact
palette hex, inlined into every screen's prompt. Plus `--ref` the first finished
screen when rendering subsequent screens so chrome stays identical. Give each
screen's verbatim strings; keep the shared chrome wording byte-identical.

## 4. Exact reproducibility
Re-rendering yields (near-)the-same image so you can tweak one variable.

**Mechanism: spec-locking, not seeds.** The built-in tool does not expose a seed,
so pixel-identical reproduction is not available. What IS available and sufficient:
keep `spec.yaml` as the immutable source, change exactly ONE field, recompile, and
re-render with the previous render as `--ref`. Same words + same reference =
high visual stability with a single controlled delta. If a task genuinely needs
deterministic seeds, that is an API-only feature — flag it to the user rather than
pretending the built-in path can do it.

## Rule of thumb
Consistency = identical INPUT. Lock the words (style/design-system blocks) and
lock the subject (reference image). The moment you paraphrase a shared block or
drop the reference, drift creeps in. When in doubt, copy-paste; don't re-describe.
