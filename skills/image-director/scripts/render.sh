#!/usr/bin/env bash
# image-director / render.sh
# The ONE validated way to drive Codex's built-in image_gen tool.
#
# Every lesson from the 2026-06-19 spike + 2026-06-21 hardening is baked in so no
# render regresses to cheap/blurry output or silently fails to save:
#   - quality:high is FORCED (medium is the trap that made output look like CGI).
#   - -C <outdir> makes the output folder the writable workspace, so the tool's
#     "copy final asset into the workspace" step can actually succeed.
#   - the prompt is piped via stdin with a trailing `-`, because codex exec's
#     -i/--image flag is VARIADIC and will otherwise swallow a positional prompt.
#   - the instruction is kept DEAD SIMPLE (just: use image_gen at high, copy the
#     file). A wordier instruction made the agent rabbit-hole into "nested Codex"
#     and env-var hunting and produce nothing.
#   - the built-in tool's headless save is occasionally flaky (renders inline
#     without writing a file), so we RETRY up to 3 times and collect whatever any
#     attempt left in the workspace, /tmp, or ~/.codex/generated_images.
#
# Built-in tool only. No OPENAI_API_KEY, no CLI fallback, no Gemini, ever.
#
# Usage:
#   render.sh --out /abs/path/img.png --prompt-file /path/prompt.txt \
#             [--ref /abs/ref1.png --ref /abs/ref2.png] [--size 1536x1024] \
#             [--anchor <project>/<version>]
#   render.sh --out /abs/path/img.png --prompt "inline prompt text" [...]
#
# --anchor <project>/<version> auto-attaches that project's saved consistency
# anchor (anchor.sh) as a reference image, so a look/subject holds across a set
# without re-passing --ref by hand. Resolution happens here in bash (not at the
# call site) so it is robust regardless of the caller's shell word-splitting.
set -uo pipefail

SELF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CODEX="/Applications/Codex.app/Contents/Resources/codex"
OUTPATH=""; PROMPT=""; PROMPTFILE=""; SIZE="1536x1024"; REFS=(); ANCHOR=""; DRY=0
MAX_ATTEMPTS=3

while [[ $# -gt 0 ]]; do
  case "$1" in
    --out)         OUTPATH="$2"; shift 2;;
    --prompt)      PROMPT="$2"; shift 2;;
    --prompt-file) PROMPT="$(cat "$2")"; shift 2;;
    --ref)         REFS+=("$2"); shift 2;;
    --size)        SIZE="$2"; shift 2;;
    --anchor)      ANCHOR="$2"; shift 2;;
    --dry-run)     DRY=1; shift;;
    *) echo "render.sh: unknown arg: $1" >&2; exit 2;;
  esac
done

[[ -z "$OUTPATH" ]] && { echo "render.sh: --out is required" >&2; exit 2; }
[[ -z "$PROMPT" ]] && { echo "render.sh: --prompt or --prompt-file is required" >&2; exit 2; }
[[ ! -x "$CODEX" ]] && { echo "render.sh: codex binary not found at $CODEX" >&2; exit 2; }

# Resolve a saved consistency anchor and attach it as a reference image.
if [[ -n "$ANCHOR" ]]; then
  ap="${ANCHOR%/*}"; av="${ANCHOR##*/}"
  apath="$("$SELF_DIR/anchor.sh" path "$ap" "$av" 2>/dev/null)" || apath=""
  if [[ -n "$apath" && -f "$apath" ]]; then
    REFS+=("$apath")
    echo "render.sh: auto-attached anchor for ${ap}/${av}: $apath" >&2
  else
    echo "render.sh: no anchor set for ${ap}/${av} (rendering without one)" >&2
  fi
fi

mkdir -p "$(dirname "$OUTPATH")"
OUTDIR="$(cd "$(dirname "$OUTPATH")" && pwd)"
FNAME="$(basename "$OUTPATH")"
LOG="${OUTDIR}/.${FNAME}.render.log"

# Dead-simple instruction. Force quality:high, save into the workspace, stop.
read -r -d '' FULL <<EOF || true
Generate one image with your built-in image_gen tool at quality: high (never medium), target size ${SIZE}. The image_gen tool returns the path of the PNG it creates under ~/.codex/generated_images/. Copy THAT exact returned path into the current working directory as ./${FNAME} and confirm ./${FNAME} exists. Do NOT pick the newest file in the folder and do NOT copy any other image; that folder is shared and contains unrelated images. Keep it simple: call image_gen once, then copy the exact file it returned. Do not start a nested Codex and do not search for environment variables.

Image prompt:
${PROMPT}
EOF

# Build -i args for reference images (skip missing files with a warning).
IARGS=()
for r in "${REFS[@]:-}"; do
  [[ -z "$r" ]] && continue
  if [[ -f "$r" ]]; then IARGS+=(-i "$r"); else echo "render.sh: ref not found, skipping: $r" >&2; fi
done

# --dry-run: report the resolved config (incl. any anchor ref) and stop before Codex.
if [[ $DRY -eq 1 ]]; then
  echo "render.sh DRY-RUN (no Codex call):"
  echo "  out:    $OUTPATH"
  echo "  size:   $SIZE   quality: high"
  echo "  refs:   $(( ${#IARGS[@]} / 2 )) image(s): ${IARGS[*]:-(none)}"
  echo "  prompt: ${#PROMPT} chars"
  exit 0
fi

# ~/.codex/generated_images is SHARED across all Codex runs and is polluted with
# unrelated images, some carrying future-dated mtimes, so "newest file there" is
# unreliable (it grabbed a stray blue circle once). Snapshot it BEFORE rendering so
# collect() can take the set-difference and only ever accept THIS run's new output.
GENDIR="$HOME/.codex/generated_images"
PRE_LIST="$(mktemp)"; trap 'rm -f "$PRE_LIST"' EXIT
find "$GENDIR" -type f -name '*.png' 2>/dev/null | sort > "$PRE_LIST"

# Collect THIS render's PNG into OUTPATH. Prefer a file the run newly created in the
# shared gen dir (set-difference vs the pre-render snapshot), then fall back to a
# copy the agent itself placed in the workspace or /tmp.
collect() {
  local newp
  newp="$(comm -13 "$PRE_LIST" <(find "$GENDIR" -type f -name '*.png' 2>/dev/null | sort) \
          | while IFS= read -r f; do [[ -f "$f" ]] && stat -f '%m %N' "$f"; done \
          | sort -rn | head -1 | cut -d' ' -f2-)"
  if [[ -n "$newp" && -f "$newp" ]]; then cp "$newp" "$OUTPATH" && return 0; fi
  [[ -f "$OUTPATH" ]] && return 0
  local cand
  for cand in "/tmp/${FNAME}" "/private/tmp/${FNAME}"; do
    [[ -f "$cand" ]] && { cp "$cand" "$OUTPATH" && return 0; }
  done
  return 1
}

for attempt in $(seq 1 $MAX_ATTEMPTS); do
  echo "render.sh: attempt ${attempt}/${MAX_ATTEMPTS} (quality:high, size=${SIZE}, refs=${#IARGS[@]}/2) -> ${OUTPATH}"
  rm -f "$OUTPATH"
  if [[ ${#IARGS[@]} -gt 0 ]]; then
    printf '%s' "$FULL" | "$CODEX" exec --skip-git-repo-check -s workspace-write -C "$OUTDIR" "${IARGS[@]}" - > "$LOG" 2>&1
  else
    printf '%s' "$FULL" | "$CODEX" exec --skip-git-repo-check -s workspace-write -C "$OUTDIR" - > "$LOG" 2>&1
  fi
  if collect; then
    echo "render.sh: OK -> ${OUTPATH} ($(stat -f%z "$OUTPATH" 2>/dev/null) bytes) on attempt ${attempt}"
    exit 0
  fi
  echo "render.sh: attempt ${attempt} produced no collectable PNG, retrying..." >&2
  sleep 3
done

echo "render.sh: FAIL - no PNG after ${MAX_ATTEMPTS} attempts. Last log (non-noise):" >&2
grep -a -v -e "load skill" -e "rmcp::transport" "$LOG" 2>/dev/null | tail -10 >&2
exit 1
