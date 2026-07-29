#!/usr/bin/env bash
# PreToolUse hook (matcher: Bash).
# Če ukaz vsebuje "git commit" ali "git push", zahteva ročno potrditev.
# Vse ostale Bash ukaze pusti pri miru (tih izhod = ukaz teče normalno).
#
# 2026-07-06: python → node. `python` na tem sistemu kaže na Windows Store stub
# (ne obstaja pravi python v PATH), zato je bil hook tiho mrtev — parsing je
# vedno vrnil prazen string in varovalka se ni nikoli sprožila.

input=$(cat)
cmd=$(printf '%s' "$input" | node -e "
let d = '';
process.stdin.on('data', c => d += c).on('end', () => {
  try { process.stdout.write(JSON.parse(d).tool_input?.command || ''); } catch (e) {}
});
" 2>/dev/null)

# Fail-safe: če node odpove in je cmd prazen, preglej surov input —
# raje odvečna potrditev kot tiho mrtva varovalka.
if [ -z "$cmd" ]; then
  cmd="$input"
fi

case "$cmd" in
  *"git commit"*|*"git push"*)
    printf '%s' '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"Zaznan git commit/push — potrdi ročno. Varovalka pred nehotenim commit/push (npr. na master ali z razkritjem skrivnosti)."}}'
    ;;
  *)
    : # nič — ukaz se izvede brez vmešavanja
    ;;
esac
