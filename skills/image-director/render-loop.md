# The closed render → inspect → refine loop

This is the core mechanic. `image-director` does not just write a prompt and stop;
it renders, looks at the result, critiques it against the intent-spec, and
re-renders with a targeted fix until the image matches or the cap is hit. This is
what caught and fixed the blur and the muddy-background failures in the spike.

## The loop

```
fill intent-spec  ──►  compile prompt  ──►  render (render.sh)  ──►  READ the PNG
        ▲                                                              │
        │                                                              ▼
        └──────── refine spec (ONE targeted change) ◄──── critique vs spec
                          (stop on match, or after MAX_PASSES)
```

### 1. Render
Always via `scripts/render.sh` — never a hand-rolled `codex exec`. It forces
`quality: high`, handles the `-C` workspace, the `-i`/stdin gotcha, and collects
the PNG. See `references/engine-gpt-image-2.md`.

```bash
~/.claude/skills/image-director/scripts/render.sh \
  --out  ~/Domain/Personal/Assets/image-director/<proj>/<ver>/<NN-slug>/render.png \
  --prompt-file <compiled prompt.txt> \
  [--ref <abs ref1.png> --ref <abs ref2.png>] \
  [--size 1536x1024]
```

### 2. Inspect (mandatory — never skip)
`Read` the produced PNG. This is `verify-before-done` by construction: you do not
report an image as done without looking at it. Critique against the intent-spec:

- **Sharpness:** any soft/blurry/hazy/over-denoised regions? (the #1 recurring defect)
- **Realism:** does a "photo" read as a photo, or as a CGI/3D render? (the 02 medium defect)
- **Text:** is every `verbatim_text` string present, correct, and unwarped? gibberish?
- **Layout/composition:** matches the spec? duplicated elements? cropped subject?
- **Palette:** matches `palette.tokens`? off-brand colour drift?
- **Background:** crisp and intentional, or a muddy smear? (the 02b defect)
- **Consistency:** if `references` set, did subject/brand identity hold?
- **Negatives:** did any banned thing show up (watermark, cursor, extra fingers)?

**Automated text gate — run it whenever the spec has `verbatim_text`.** Do not trust
the eyeball pass on text; the generating model rationalises gibberish as "close
enough." Run the objective gate:

```bash
scripts/ocr-check.sh --image render.png \
  --expect "New chat" --expect "Ask anything"     # one --expect per verbatim_text string
# or: --expect-file verbatim.txt   [--threshold 0.82] [--json]
```

It OCRs the render with Apple Vision and fuzzy-matches each string. Exit `0` = every
string present and legible; exit `2` = one or more missing/garbled (it prints which
and a per-string score); exit `3` = no OCR engine on this machine (then fall back to
the eyeball check and tell the user to install Xcode CLT or tesseract). A MISS makes
**warped/wrong text** the defect to fix in the next pass. This is the gate that
turns the flagship "real-like screenshot" use case from hope into a hard check.

### 3. Refine — ONE targeted change per pass
Change the smallest thing that fixes the worst defect; do not rewrite the whole
prompt (that introduces new variance). Typical fixes, all proven in the spike:

| Defect | Fix in the spec |
| --- | --- |
| Soft / blurry | strengthen the anti-softness clause; add detail anchors |
| CGI / plastic | add "photographic, real material physics, sensor grain, not a 3D render" |
| Muddy background | direct the background explicitly + "entire image in sharp focus" |
| Warped / wrong text | move the exact string up, emphasise it, shorten it |
| Lost subject identity | re-attach the reference; restate the invariant features |
| Off-brand colour | restate the locked hex tokens |

Re-render. Repeat.

### 4. Stop conditions
- **Match:** the image satisfies the spec on every inspected dimension → done.
- **Cap:** `MAX_PASSES` (default **3**) reached → stop, show the best pass, and
  tell the user exactly what still falls short. Never loop silently forever.
- Keep every pass's PNG during a session so the user can compare; the final
  selected one becomes `render.png`.

## Reporting
When you present an image, state the pass count and any residual defect honestly.
"Landed on pass 2; label is crisp, slight grain in the top-left I couldn't fully
clear" beats a silent "done." If a defect survives the cap, say so.

## Quick vs final
A throwaway composition check may use one quick pass. Anything delivered to the
user runs the full loop and ends at `quality: high`. Never ship a medium-quality
or un-inspected image.
