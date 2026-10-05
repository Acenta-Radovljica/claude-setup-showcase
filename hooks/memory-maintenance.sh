#!/usr/bin/env bash
# SessionStart hook.
# 1) Vsakih 7 dni vbrizgne opomnik, naj se pregleda MEMORY.md za zastarele/podvojene
#    vnose. NE poganja AI v ozadju (brez nepričakovane porabe) — samo opozori.
# 2) Ob vsakem zagonu preveri Syncthing konfliktne datoteke (*.sync-conflict-*) v ~/.claude
#    in v mapah spomina. ~/.claude se sinhronizira med dvema PC-jema brez verzioniranja,
#    zato konflikt pomeni, da sta oba PC-ja pisala isto datoteko (dodano 2. 10. 2026).

STATE="$HOME/.claude/memory-maintenance-state"
now=$(date +%s)
last=0
[ -f "$STATE" ] && last=$(cat "$STATE" 2>/dev/null || echo 0)
case "$last" in ''|*[!0-9]*) last=0 ;; esac

days=$(( (now - last) / 86400 ))
msg=""

if [ "$days" -ge 7 ]; then
  echo "$now" > "$STATE"
  msg="VZDRŽEVANJE SPOMINA: Od zadnjega pregleda je minilo 7+ dni. Ob primernem trenutku (ne sredi naloge) predlagaj Maksu kratek pregled MEMORY.md — poišči zastarele, podvojene ali že nerelevantne vnose in jih posodobi ali izbriši. Ne sproži tega samodejno."
fi

conflicts=$( {
  find "$HOME/.claude" -maxdepth 1 -name '*.sync-conflict-*' 2>/dev/null
  for d in "$HOME"/.claude/projects/*/memory; do
    [ -d "$d" ] && find "$d" -maxdepth 1 -name '*.sync-conflict-*' 2>/dev/null
  done
} )

if [ -n "$conflicts" ]; then
  n=$(printf '%s\n' "$conflicts" | wc -l | tr -d ' ')
  names=$(printf '%s\n' "$conflicts" | head -3 | sed 's#.*/\.claude/#~/.claude/#' | tr -d '"\\' | paste -sd ';' -)
  cmsg="SYNC KONFLIKT: Syncthing je ustvaril $n konfliktnih datotek (npr. $names). Oba PC-ja sta pisala isto datoteko. Na začetku odgovora Maksu to povej v eni vrstici in predlagaj, da različici primerjata in združita; nič ne briši brez pregleda."
  msg="${msg:+$msg }$cmsg"
fi

if [ -n "$msg" ]; then
  printf '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"%s"}}' "$msg"
fi
