# Prompt za sodelavca

Prilepi vse med črtama v **svež** Claude Code pogovor.

---

Namesti mi skille in agente iz repozitorija `Acenta-Radovljica/claude-setup-showcase`.

Naredi po vrsti:

1. Preveri, da imam `git` (`git --version`). Če ga ni, ustavi se in mi povej.

2. Prenesi installer in mi v enem odstavku povej, kaj počne, preden ga zaženeš:
   ```
   curl -fsSL https://raw.githubusercontent.com/Acenta-Radovljica/claude-setup-showcase/main/install.sh -o /tmp/acenta-skills.sh
   ```

3. Pokaži mi, kaj je na voljo, in me vprašaj, kaj hočem:
   ```
   bash /tmp/acenta-skills.sh --list
   ```

4. Ko ti povem imena (ali rečem "vse"), najprej zaženi suhi tek, pokaži mi izpis, in šele po moji potrditvi zaženi pravo namestitev:
   ```
   bash /tmp/acenta-skills.sh --dry-run <imena>
   bash /tmp/acenta-skills.sh <imena>
   ```

5. Povej mi, naj restartam Claude Code, in preveri, kaj je res pristalo v `~/.claude/skills/` in `~/.claude/agents/`. Ne reci "končano", dokler tega nisi preveril.

Kontekst zame: installer prepiše samo to, kar izrecno zahtevam, pred prepisom naredi varnostno kopijo v `~/.claude/.showcase-backup/<datum>/`, in se ne dotakne mojega `settings.json`, `CLAUDE.md` ali spomina. Ponovni zagon ne podvoji ničesar.

Če kakšno ime ni na voljo, je verjetno interno (vezano na podatke strank) in ga v javnem repozitoriju ni. V tem primeru mi to povej, ne poskušaj iskati obvoda.

---

## Pregled, preden se odločiš

Vse skille, agente in ukaze z opisi in vsebino vidiš na
https://acenta-radovljica.github.io/claude-setup-showcase/

Vsaka kartica ima gumb za kopiranje namestitvenega ukaza, tako da lahko namestiš tudi samo eno stvar.
