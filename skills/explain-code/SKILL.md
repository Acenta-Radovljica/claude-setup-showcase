---
name: explain-code
description: Explain code in plain Slovenian at an experienced-operator level — intent, non-obvious mechanics, and the traps specific to this code. Use when the user pastes code and wants to understand it.
---

Razloži mi to kodo: $ARGUMENTS

Pravila:
- Začni z ENO povedjo: kaj ta koda naredi (namen, ne mehanika)
- Nato pojdi skozi kodo po odsekih — logično, ne vrstica po vrstica — in povej ZAKAJ je narejeno tako
- **Ne razlagaj osnov** (funkcije, zanke, async/await, promise, HTTP, ORM, Docker). Maks vzdržuje produkcijske sisteme v Node in Pythonu; glej `context.md`
- Zares nov koncept: ena vrstica definicije, nato naprej
- Izpostavi netrivialno: skrite predpostavke, robne primere, vrstni red, ki šteje, tiho požrte napake, mesta kjer se koda obnaša drugače kot izgleda
- Če je v kodi napaka, jo najprej opiši v navadni slovenščini in šele nato popravi
- Na koncu 2-3 konkretne pasti TE kode (ne splošnih napak), z opisom, kdaj počijo
- Če $ARGUMENTS ne vsebuje kode, prosi uporabnika, naj jo prilepi
