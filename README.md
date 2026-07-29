# Claude Code Setup · Maks (Acenta.si)

Pregled celotnega mojega Claude Code ekosistema in **način, da si dele od njega namestiš pri sebi z enim ukazom**.

**Živa stran:** https://acenta-radovljica.github.io/claude-setup-showcase/

---

## Za sodelavce: kako si namestiš skill

### Najlažje: prilepi Claudu

Odpri svež Claude Code in prilepi vsebino [`share/PROMPT.md`](./share/PROMPT.md). Claude sam prenese installer, ti pojasni, kaj počne, in ga po tvoji potrditvi zažene.

### Terminal

```bash
curl -fsSL https://raw.githubusercontent.com/Acenta-Radovljica/claude-setup-showcase/main/install.sh -o /tmp/i.sh
bash /tmp/i.sh --list                         # kaj je na voljo
bash /tmp/i.sh transcreate visualize verifier # namesti po imenu
bash /tmp/i.sh --all                          # vsi skilli, agenti in ukazi
bash /tmp/i.sh --dry-run --all                # najprej poglej, kaj bi naredil
```

Installer je idempotenten: prepiše samo tisto, kar izrecno zahtevaš, pred prepisom naredi varnostno kopijo v `~/.claude/.showcase-backup/<datum>/`, in se ne dotakne tvojega `settings.json`, `CLAUDE.md` ali spomina.

Po namestitvi **restartaj Claude Code**.

### Ročno

```bash
git clone --depth 1 https://github.com/Acenta-Radovljica/claude-setup-showcase.git
cp -r claude-setup-showcase/skills/transcreate ~/.claude/skills/
cp claude-setup-showcase/agents/verifier.md ~/.claude/agents/
```

---

## Dva sloja: javno in interno

| Sloj | Kaj je | Kje so datoteke |
|---|---|---|
| **javno** | Splošno uporabna orodja brez podatkov strank | v tem repozitoriju, namestljivo |
| **interno** | Vezano na podatke strank, naslove strežnikov ali interne finančne procese | **samo lokalno**, v repo ne gre nič |

Interne kartice na strani pokažejo, **čemu orodje služi**, ne pa njegove vsebine. Če takšno orodje rabiš pri delu, mi piši in ti ga predam neposredno.

Delitev ni ročna presoja od primera do primera: `build.mjs` na koncu prežene celoten izhod skozi vzorce za IP-je strežnikov, ID-je računov, interne domene, imena strank in oblike ključev. **Če se karkoli od tega pojavi v izhodu, se build ustavi in ne objavi ničesar.**

---

## Kako je stran narejena

Stran ni pisana na roko. `build.mjs` prebere `~/.claude`, združi z klasifikacijo iz `manifest.json` in zgenerira `index.html`.

```bash
node build.mjs             # sinhroniziraj javne datoteke + zgeneriraj index.html
node build.mjs --no-sync   # samo zgeneriraj stran, brez kopiranja datotek
```

Zato stran ne more lagati o tem, kaj je dejansko v setupu: opisi, seznami datotek in vsebina pridejo iz živih datotek, ne iz ločenega opisa, ki bi se sčasoma razšel z resnico.

### Struktura

```
manifest.json     klasifikacija (javno/interno), kategorije, blurbi za interne, MCP, načela
build.mjs         generator + varnostni gate
index.html        generirano — NIKOLI ne urejaj na roko
install.sh        installer za prejemnike
skills/           javne kopije skillov (sinhronizirano)
agents/           javne kopije agentov
commands/         javni slash ukazi
rules/  hooks/    javna pravila in hooki
share/PROMPT.md   prompt za prilepiti v Claude Code
```

### Dodajanje novega skilla na stran

1. Skill obstaja v `~/.claude/skills/<ime>/`.
2. Dodaj vnos v `manifest.json` → `skills` z `tier`, `cat` in ikono. Če je `internal`, dodaj še `blurb` in `why`.
3. `node build.mjs`
4. Odpri `index.html`, klikni novo kartico in preveri, da se modal odpre.
5. Commit in push.

Koraka 2 se ne da preskočiti: kar ni v manifestu, se na strani ne pojavi. Ni možnosti, da kartica obstaja brez podatkov (klasična past ročno vzdrževanih showcase strani).

### Kaj ni v repo kopijah

Binarne in zelo velike datoteke (fonti, `__pycache__`, arhivi, datoteke nad 400 kB) se ne kopirajo. Modal pri takem skillu pove, koliko datotek je izpuščenih. Skill deluje tudi brez njih; če katera manjka, jo dodaj ročno iz izvora.

---

## Tech

Ena statična HTML datoteka, brez build koraka pri obiskovalcu in brez odvisnosti med izvajanjem. Exo 2 + JetBrains Mono prek Google Fonts. Generator je čisti Node, brez npm paketov.
