#!/usr/bin/env bash
# ocr-check.sh — text-accuracy gate for image-director renders.
# OCRs a PNG and fuzzy-matches it against the spec's verbatim_text strings.
# Exit: 0 = all strings present, 2 = one or more missing/garbled,
#       3 = no OCR engine available, 4 = OCR/image error, 64 = bad usage.
#
# Usage:
#   ocr-check.sh --image render.png --expect "New chat" --expect "Send a message"
#   ocr-check.sh --image render.png --expect-file verbatim.txt [--threshold 0.82] [--json]
#   ocr-check.sh --image render.png            # no --expect: just dump OCR text
set -u
SELF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

IMG=""; THRESH="0.82"; JSON=0; EXPECTS=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --image)       IMG="${2:-}"; shift 2;;
    --expect)      EXPECTS+=("${2:-}"); shift 2;;
    --expect-file) while IFS= read -r l || [[ -n "$l" ]]; do [[ -n "$l" ]] && EXPECTS+=("$l"); done < "${2:-/dev/null}"; shift 2;;
    --threshold)   THRESH="${2:-}"; shift 2;;
    --json)        JSON=1; shift;;
    -h|--help)     grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0;;
    *) echo "ocr-check: unknown arg: $1" >&2; exit 64;;
  esac
done
[[ -z "$IMG" ]]   && { echo "ocr-check: --image required" >&2; exit 64; }
[[ ! -f "$IMG" ]] && { echo "ocr-check: image not found: $IMG" >&2; exit 64; }

# --- OCR engine: Apple Vision (swift, compile-cached) > tesseract > none ---
run_ocr() {
  if command -v swiftc >/dev/null 2>&1; then
    local bin="$SELF_DIR/.ocr-bin" src="$SELF_DIR/ocr.swift"
    if [[ ! -x "$bin" || "$src" -nt "$bin" ]]; then
      swiftc -O "$src" -o "$bin" >/dev/null 2>&1 || return 9
    fi
    "$bin" "$IMG"; return $?
  elif command -v tesseract >/dev/null 2>&1; then
    tesseract "$IMG" - 2>/dev/null; return $?
  fi
  return 9
}

TEXT="$(run_ocr)"; rc=$?
if [[ $rc -eq 9 ]]; then
  echo "ocr-check: no OCR engine. Install Xcode CLT (xcode-select --install) for Vision, or 'brew install tesseract'." >&2
  exit 3
elif [[ $rc -ne 0 ]]; then
  echo "ocr-check: OCR failed (rc=$rc) on $IMG" >&2
  exit 4
fi

if [[ ${#EXPECTS[@]} -eq 0 ]]; then
  printf '%s\n' "$TEXT"      # no expectations: just surface what the image says
  exit 0
fi

EXP_FILE="$(mktemp)"; TXT_FILE="$(mktemp)"
printf '%s\n' "${EXPECTS[@]}" > "$EXP_FILE"
printf '%s'   "$TEXT"          > "$TXT_FILE"

python3 - "$TXT_FILE" "$EXP_FILE" "$THRESH" "$JSON" <<'PY'
import sys, re, json, difflib
txt     = open(sys.argv[1], encoding='utf-8', errors='replace').read()
expects = [l.rstrip('\n') for l in open(sys.argv[2], encoding='utf-8', errors='replace') if l.strip()]
thresh  = float(sys.argv[3]); as_json = sys.argv[4] == '1'

def norm(s):
    s = s.lower()
    s = re.sub(r'[^\w ]', ' ', s)   # drop punctuation so OCR comma/quote noise doesn't fail a match
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

ntxt = norm(txt); tt = ntxt.split()

def score(exp):
    ne = norm(exp)
    if not ne: return 1.0
    if ne in ntxt: return 1.0
    et = ne.split(); w = len(et)
    best = difflib.SequenceMatcher(None, ne, ntxt).ratio() if w <= 2 else 0.0
    for i in range(0, max(1, len(tt) - w + 1)):     # best aligned window of equal token length
        r = difflib.SequenceMatcher(None, ne, ' '.join(tt[i:i+w])).ratio()
        if r > best: best = r
    return best

results, allpass = [], True
for e in expects:
    sc = score(e); ok = sc >= thresh
    allpass &= ok
    results.append({'expect': e, 'score': round(sc, 3), 'pass': ok})

if as_json:
    print(json.dumps({'pass': allpass, 'threshold': thresh,
                      'matched': sum(r['pass'] for r in results), 'total': len(results),
                      'results': results, 'ocr_chars': len(txt)}, ensure_ascii=False))
else:
    for r in results:
        print(f"  [{'PASS' if r['pass'] else 'MISS'}] {r['score']:.2f}  {r['expect']!r}")
    print(f"OCR text-gate: {'PASS' if allpass else 'MISS'} "
          f"({sum(r['pass'] for r in results)}/{len(results)} strings @ threshold {thresh})")
sys.exit(0 if allpass else 2)
PY
rc=$?
rm -f "$EXP_FILE" "$TXT_FILE"
exit $rc
