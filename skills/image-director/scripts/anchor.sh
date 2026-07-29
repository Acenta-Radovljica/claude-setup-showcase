#!/usr/bin/env bash
# anchor.sh — persisted consistency anchor for an image-director project/version.
# The first approved render (or a dedicated style-frame / character-sheet) is saved
# as anchor.png; subsequent renders in the same project auto-attach it as --ref so a
# look or subject holds across the whole set without re-specifying it each time.
#
# Store base: $IMAGE_DIR_STORE (default ~/Domain/Personal/Assets/image-director)
# Layout:     <store>/<project>/<version>/anchor.png  (+ anchor.json provenance)
#
# Subcommands:
#   anchor.sh set   <project> <version> <png>   copy png -> anchor.png (+ provenance)
#   anchor.sh ref   <project> <version>         print "--ref <abs>" if set (exit 1 if none)
#   anchor.sh path  <project> <version>         print abs anchor path (exit 1 if none)
#   anchor.sh clear <project> <version>         remove the anchor
#
# Typical use in the render loop:
#   render.sh --out ... --prompt-file p.txt $(anchor.sh ref myproj v1)
set -u
STORE="${IMAGE_DIR_STORE:-$HOME/Domain/Personal/Assets/image-director}"
cmd="${1:-}"; proj="${2:-}"; ver="${3:-}"
dir() { printf '%s/%s/%s' "$STORE" "$proj" "$ver"; }
need_pv() { [[ -n "$proj" && -n "$ver" ]] || { echo "anchor: <project> and <version> required" >&2; exit 64; }; }

case "$cmd" in
  set)
    need_pv
    png="${4:-}"
    [[ -z "$png" ]]   && { echo "usage: anchor.sh set <project> <version> <png>" >&2; exit 64; }
    [[ ! -f "$png" ]] && { echo "anchor: png not found: $png" >&2; exit 64; }
    d="$(dir)"; mkdir -p "$d"
    cp "$png" "$d/anchor.png"
    printf '{\n  "source": "%s",\n  "set_at": "%s"\n}\n' "$png" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$d/anchor.json"
    echo "anchor set: $d/anchor.png"
    ;;
  ref)
    need_pv
    a="$(dir)/anchor.png"
    [[ -f "$a" ]] && printf -- '--ref %s\n' "$a" || exit 1
    ;;
  path)
    need_pv
    a="$(dir)/anchor.png"
    [[ -f "$a" ]] && echo "$a" || exit 1
    ;;
  clear)
    need_pv
    rm -f "$(dir)/anchor.png" "$(dir)/anchor.json" && echo "anchor cleared for $proj/$ver"
    ;;
  -h|--help|"")
    grep '^#' "$0" | sed 's/^# \{0,1\}//'
    ;;
  *)
    echo "anchor: unknown subcommand: $cmd" >&2; exit 64;;
esac
