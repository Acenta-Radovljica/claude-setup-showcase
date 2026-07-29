# claude-setup-showcase — navodila za delo v tem repozitoriju

Javna showcase stran mojega Claude Code setupa, ki hkrati služi kot distribucijski kanal za skille sodelavcem.

## Nedotakljivo pravilo

**`index.html` je generiran. Nikoli ga ne urejaj na roko.**

Vsaka sprememba gre prek `manifest.json` in/ali izvorne datoteke v `~/.claude`, nato:

```bash
node build.mjs
```

Ročni poseg v `index.html` se izgubi ob naslednjem buildu in hkrati obide varnostni gate. Če te mika urediti HTML neposredno, je pravi odgovor sprememba v `build.mjs`.

## Dva sloja

`manifest.json` vsakemu elementu določi `tier`:

- `public` — datoteke se sinhronizirajo v ta repo in so namestljive prek `install.sh`
- `internal` — v repo ne gre nobena datoteka; na strani se prikaže samo `blurb` in `why` iz manifesta

Novo orodje je privzeto **interno**, dokler ne preveriš, da v njem ni podatkov strank, naslovov strežnikov, ID-jev računov ali internih domen.

## Varnostni gate

`build.mjs` na koncu prežene generirani HTML in vsako sinhronizirano datoteko skozi vzorce (`HARD`). Ob zadetku se build **ustavi** z izpisom, kje je problem, in ne zapiše ničesar.

Ko gate ustavi build, sta pravilna odziva:
1. popravi izvorno datoteko v `~/.claude` (če je podatek tam odveč), **ali**
2. prestavi element v `manifest.json` na `"tier": "internal"`.

Nepravilen odziv: razrahljati vzorec, da gre skozi. Vzorci se širijo, ne ožijo. Če dodaš novo stranko ali strežnik, ga dodaj v `HARD`.

`SOFT` vzorci samo opozorijo (dvoumne besede, ki so lahko tudi navadne angleške besede). Te preglej z očmi ob vsakem buildu.

## Dodajanje elementa

1. Element obstaja v `~/.claude/{skills,agents,commands,rules,hooks}`.
2. Vnos v `manifest.json` (`tier`, `cat`, `icon`; za interne še `blurb` in `why`).
3. `node build.mjs`
4. **Odpri `index.html` v brskalniku in klikni novo kartico.** Če se modal ne odpre, delo ni končano.
5. Commit z opisom, kaj je dodano.

Element brez vnosa v manifest se na strani preprosto ne pojavi. To je namerno: nemogoče je narediti kartico brez podatkov.

## Preverba pred pushem

- `node build.mjs` se konča brez napake in brez nepričakovanih `SOFT` opozoril
- stran se odpre, iskanje filtrira, kategorije filtrirajo, preklop javno/interno deluje
- vsaj ena javna in ena interna kartica odprejo modal, gumbi za kopiranje delujejo
- `bash install.sh --list` našteje, kar pričakuješ
- `bash install.sh --dry-run <ime>` pokaže smiselne poti

## Kaj se ne kopira v repo

Binarno in veliko: `__pycache__`, fonti, arhivi, mediji, datoteke nad 400 kB. Nastavljeno v `SKIP_DIR`, `SKIP_EXT`, `MAX_FILE` v `build.mjs`.
