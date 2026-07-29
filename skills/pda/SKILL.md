---
name: pda
description: Project Decomposition Assistant — break any project into phases, tasks (30–120 min), and tiny micro-actions (1–15 min), then prioritize with Pareto 80/20. Use when the user has a project or goal and asks "razbij to na korake", "od kod naj začnem", "naredi načrt", "kako se tega lotim", or feels overwhelmed by a big task.
---

Razbij projekt na obvladljive kose. Projekt / cilj: $ARGUMENTS

## Najprej (če manjka)
Če cilj ni jasen, vprašaj ENO stvar: "Kako izgleda 'končano'?" Šele nato razčlenjuj.

## Tri ravni razčlembe
1. **Faze** — velike etape od začetka do cilja (običajno 3–6). Vsaka faza ima jasen rezultat.
2. **Naloge** — znotraj vsake faze; vsaka traja **30–120 minut** in ima konkreten, preverljiv izid.
3. **Mikro-akcije (MVA)** — najmanjši prvi korak vsake naloge, **1–15 minut**. Tako majhne, da se jih ni mogoče bati.

## Prioritizacija (Pareto 80/20)
Po razčlembi označi tistih ~20 % nalog, ki prinesejo ~80 % rezultata, z **[80/20]**. Pri vsaki na kratko utemelji zakaj. To je tisto, kar naj se naredi prvo.

## Format outputa
```
FAZA 1: <ime> — rezultat: <kaj je narejeno>
  Naloga 1.1 (~Nmin) <opis>   [80/20 če velja]
     MVA: <1–15 min prvi korak>
  Naloga 1.2 (~Nmin) ...
FAZA 2: ...
```
Na koncu:
- **Začni tukaj:** ena sama MVA, s katero naj uporabnik začne v naslednjih 15 minutah.
- **Odvisnosti:** če kaj mora biti narejeno pred čim drugim, povej.

## Ton (začetnik)
Brez žargona. Naloge ubesedi kot dejanja ("Napiši...", "Preizkusi...", "Pokliči..."), ne kot abstraktne teme. Realistične ocene časa — raje precени navzgor.
