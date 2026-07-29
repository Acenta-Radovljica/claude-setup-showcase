# Engine reference: gpt-image-2 via Codex built-in `image_gen`

Authoritative, validated facts about the render engine `image-director` drives.
Grounded in the Codex `imagegen` skill docs (`~/.codex/skills/.system/imagegen/`)
and the 2026-06-19 empirical spike (`~/Domain/Personal/Assets/image-director/spike-2026-06-19/`).

## The engine

- **Model: `gpt-image-2`** — OpenAI's current state-of-the-art image model
  ("ChatGPT Images 2.0"): native up-to-4K, ~99% text accuracy, genuine
  photorealism. Verified current as of 2026-06-19. The built-in `image_gen` tool
  uses this model; we never call an API or another model.
- **Access path: Codex built-in `image_gen` tool only.** Driven through
  `codex exec` (bundled binary `/Applications/Codex.app/Contents/Resources/codex`).
  No `OPENAI_API_KEY`, no `scripts/image_gen.py` CLI, no Gemini. This is a
  standing user decision (2026-06-19): built-in only, zero per-image API cost.

## The single most important setting

**`quality: high`. Always. Forced on every call.**

The spike's biggest finding: the built-in tool defaults to `quality: medium`,
and medium is the trap that makes output look cheap, soft, and CGI-ish. The same
model + same prompt at `high` produced a genuinely photographic, studio-grade
result. Medium → high was the entire difference between "this is shit" and "this
is the output I expected." `render.sh` hard-codes the instruction to use high.

## What the built-in tool CAN do (validated)

| Capability | How | Spike proof |
| --- | --- | --- |
| Photoreal / high quality | force `quality: high` in the instruction | `02-product-HIGH.png` |
| Real-like UI screenshots | verbatim on-screen strings + exact layout | `01-chatgpt-ui.png` |
| Crisp (not blurry) output | anti-soft directives + detail anchors | `03-abstract-crisp.png`, hero |
| Reliable save to a path | run with `-C <outdir>`; tool copies into workspace | hero + consistency renders |
| Subject / brand consistency | attach reference(s) via `-i`; reuse exact product | `02b`/`02c` (LUMEN bottle held) |
| Variants | issue N separate calls, pick the best | (built-in does one asset per call) |
| Transparency | generate on flat chroma-key bg, strip locally with `remove_chroma_key.py` | (available, untested in spike) |
| Aspect / size hint | request `1024x1024` / `1536x1024` / `1024x1536` | landscape renders honoured |

## What the built-in tool does NOT expose (CLI/API-only — out of scope)

- Explicit large sizing (2K / 4K, arbitrary `WIDTHxHEIGHT`). Built-in tops out
  at the standard presets; for UI screenshots, marketing, and product shots
  1536×1024 high is more than enough.
- Inpainting **masks** (change only one region).
- `n`-variants in one call (we loop calls instead).
- `input_fidelity`, `output_compression`, `moderation`, native `background=transparent`.
- True 4K. (gpt-image-2 supports it via API up to 3840px / 8.29M px, but only
  through the CLI we are not using.)

If a future task genuinely needs 4K or masks, that is the one reason to revisit
the API decision — flag it to the user, do not silently switch.

## Operational gotchas (all handled by `render.sh`)

1. **Sandbox write boundary.** `codex exec -s workspace-write` only writes to its
   workspace + `/tmp`. If the target path is outside that, the image generates
   but never saves and you wrongly conclude "no PNG produced." Fix: `-C <outdir>`
   so the output folder IS the workspace.
2. **`-i` is variadic.** It will eat a positional prompt as a second image
   ("No prompt provided via stdin"). Fix: pipe the prompt via stdin with a
   trailing `-`.
3. **Export location is inconsistent.** Sometimes the file lands in the
   workspace, sometimes `/tmp`, sometimes `~/.codex/generated_images/`.
   `render.sh` checks all three and copies the result to `--out`.
4. **Skill-load + MCP-auth errors in the log are noise.** Lines containing
   `failed to load skill` and `rmcp::transport::worker` are unrelated to image
   generation; ignore them.

## Cost / latency

- Built-in path bills nothing per image beyond the Codex subscription.
- `quality: high` is slower than medium (~1–3 min/image here). Worth it for
  finals. Use a quick medium pass only for throwaway composition checks, never
  for anything delivered.

## Pricing / model currency note

Model IDs and capabilities move fast. `gpt-image-2` was verified current on
2026-06-19. Before asserting a newer model or a pricing figure, web-check first
(per the global fast-moving-identifiers rule). Do not "upgrade" the model from
memory.
