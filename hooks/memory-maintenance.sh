#!/usr/bin/env bash
# SessionStart hook.
# Vsakih 7 dni vbrizgne opomnik, naj se pregleda MEMORY.md za zastarele/podvojene
# vnose. NE poganja AI v ozadju (brez nepričakovane porabe) — samo opozori.

STATE="$HOME/.claude/memory-maintenance-state"
now=$(date +%s)
last=0
[ -f "$STATE" ] && last=$(cat "$STATE" 2>/dev/null || echo 0)
case "$last" in ''|*[!0-9]*) last=0 ;; esac

days=$(( (now - last) / 86400 ))

if [ "$days" -ge 7 ]; then
  echo "$now" > "$STATE"
  printf '%s' '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"VZDRŽEVANJE SPOMINA: Od zadnjega pregleda je minilo 7+ dni. Ob primernem trenutku (ne sredi naloge) predlagaj Maksu kratek pregled MEMORY.md — poišči zastarele, podvojene ali že nerelevantne vnose in jih posodobi ali izbriši. Ne sproži tega samodejno."}}'
fi
