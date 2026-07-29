---
name: audit-claude
description: Ponovljiv audit Claude Code setupa — subagenti rudarijo pretekle seje za signale (ponavljanja, korekcije, trenja), križanje z inventarjem (skilli, agenti, hooki, memory, CLAUDE.md), rangirano poročilo z dokazi. Pokliči z /audit-claude vsake ~3 mesece ali ko imaš občutek, da workflow škripa. SAMO DIAGNOZA — nič ne implementira brez potrditve.
---

# /audit-claude — audit Claude Code setupa

Metodologija dokazana 2026-07-06 (Fable 5). Deluje tudi z Opusom (rudarji: Sonnet).
Prejšnje poročilo: `~/OneDrive/Desktop/claude-audit-2026-07.md` — preberi ga NAJPREJ in primerjaj (kaj je bilo popravljeno, kaj se je vrnilo, kaj je novo). Glej tudi memory `project_claude_code_audit_jul2026`.

## Faza 1 — Inventar (sam, brez subagentov)
- Skilli: `ls ~/.claude/skills/` (+ `_archived`), agenti: `~/.claude/agents/`, commandi: `~/.claude/commands/`
- `~/.claude/settings.json`: hooki, št. allow pravil, **ali je v permission stringih kak živ API ključ**
- **Testiraj vsak hook v živo** (echo sample JSON | bash hook) — hook, ki molči, je lahko mrtev, ne zdrav! (Lekcija: confirm-git je bil 6+ mesecev tiho mrtev zaradi python stuba.)
- Memory: `ls memory/*.md | wc -l` vs `grep -c '^- \[' MEMORY.md` → neindeksirane datoteke
- CLAUDE.md veriga: izmeri skupno velikost importov (`wc -c`); >5k tokenov globalno = kandidat za de-import
- Preveri directory-scoped skille v projektnih mapah (`acenta/.claude/skills/`) — se sploh naložijo tam, kjer Maks dela?

## Faza 2 — Rudarjenje sej (agent `session-miner`, način A — signali)
1. Seznam sej: `find ~/.claude/projects -name "*.jsonl" -size +100k -printf "%T@ %s %p\n" | sort -rn | head -60` — interaktivne. Preskoči trenutno sejo. Majhne (<30KB) enotne seje = headless SDK klici → 1 subagent samo karakterizira vzorec.
2. Razdeli ~40 sej med 5–6 paralelnih **`session-miner`** agentov (po datumih), vsakemu v prompt: seznam datotek + "način A — audit signali". Metodologija (digest skripta, tipi signalov, format) je v agentovi definiciji — ne podvajaj je v promptu.

## Faza 3 — Clustering in odločitev
Združi signale ČEZ seje. Za vsak grozd: NOV SKILL / AVTOMATIZACIJA / POPRAVEK obstoječega / ČIŠČENJE / NIČ (enkratno). Križaj z inventarjem: signal brez pokritja → novo; konfiguracija brez signalov → čiščenje; konflikt pravil → popravek.

## Faza 4 — Samokritika
Za 3 najšibkejše kandidate: "Ali dokazi to res podpirajo? Bi Maks to uporabljal vsak teden?" Šibke črtaj. **Ne predlagaj novih skillov, če problem rešuje popravek obstoječega — sprawl je bil najdba audita #1.**

## Faza 5 — Poročilo
Piši v `~/OneDrive/Desktop/claude-audit-YYYY-MM.md`, slovensko:
Povzetek (5 alinej) → Batch A/B/C (rangirano po prihranek×pogostost/strošek) → za vsak kandidat: Problem / Dokaz (seja+citat!) / Predlog / Tip / Strošek-prihranek → sekcija **"Kaj NE spreminjati"** → primerjava s prejšnjim auditom (popravljeno/regresija/novo).

## Pravila
- Read-only razen poročila. Vsak predlog MORA imeti dokaz (seja + citat) — brez dokaza ne gre v poročilo. Prepovedani generični nasveti.
- Po pregledu Maks reče "GO za X" → šele takrat implementiraj; po implementaciji posodobi status v poročilu + memory.
