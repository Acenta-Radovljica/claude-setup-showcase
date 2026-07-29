---
name: pdf
description: Acenta PDF orodja — render iz HTML s pravilnimi page break-i, extract teksta, branding logom in footerjem. Pokliči z /pdf <ukaz> <argumenti>. Reši probleme z grdimi prelomi strani v Puppeteer PDF outputih.
---

# Skill: PDF orodja (Acenta)

Acenta PDF skill. Generira lepe PDFje iz HTML, izvleče tekst iz PDFjev, doda Acenta branding na obstoječe PDFje, ali pomaga pri re-edit workflow-u.

**Lokacija orodij:** `C:/Users/maks1/OneDrive/Desktop/acenta/projects/pdf-tools/`
**CLI:** `node bin/pdf.js <ukaz>`

---

## Ukazi

| Ukaz | Kaj | Argumenti |
|------|-----|-----------|
| `/pdf render` | HTML → PDF z Acenta page-break CSS | `<input.html> [output.pdf]` |
| `/pdf extract` | PDF → tekst | `<input.pdf> [output.txt]` |
| `/pdf brand` | Doda Acenta logo + footer na obstoječ PDF | `<input.pdf> [output.pdf]` |
| `/pdf edit` | Najde HTML source za re-edit workflow | `<input.pdf>` |

---

## Korak za korak

### 1) Razčleni `$ARGUMENTS`

Format: `<ukaz> <pot>`. Primeri:
- `/pdf render templates/ponudba.html`
- `/pdf extract C:/Users/maks1/Downloads/brief.pdf`
- `/pdf brand poslano-klientu.pdf`

Če manjka pot ali ukaz, vprašaj uporabnika.

### 2) Poženi pravi ukaz

Vse ukaze poženi iz mape `pdf-tools/`:

```bash
cd "C:/Users/maks1/OneDrive/Desktop/acenta/projects/pdf-tools" && node bin/pdf.js <ukaz> "<pot>"
```

Pomembno: poti z presledki **obvezno v narekovajih**.

### 3) Razloži output uporabniku

Po Bash klicu:
- Če CLI uspe → povej kje je nova datoteka (1 stavek)
- Če napaka → preberi stderr, razloži v slovenščini, predlagaj fix

---

## Workflow: `/pdf render`

Najbolj pogost ukaz. Reši:
- ni paddinga na prehodih → margins v Puppeteer + @page CSS
- nesmiselne prelome → `break-inside: avoid` na vseh blokih + orphans/widows
- footer ne stoji na zadnji strani → Puppeteer footerTemplate na vsaki strani

CSS se vstavi avtomatsko v `<head>` HTMLja (`lib/pdf-style.css`).
Če uporabnik ne želi, dodaj v HTML komentar `<!-- no-acenta-style -->`.

---

## Workflow: `/pdf edit` (operacija A — popravi obstoječ PDF)

1. Poženi `node bin/pdf.js edit <pdf>` → izpiše seznam HTML kandidatov
2. Če najden 1 HTML → uporabnik pove kaj popraviti → ti popraviš HTML → `/pdf render`
3. Če najdenih več → vprašaj uporabnika kateri
4. Če nobeden → `/pdf extract <pdf>` da dobiš tekst, nato pomaga uporabniku rebuildati HTML

---

## Workflow: `/pdf brand` (operacija D — Acenta logo + footer na tujem PDF)

Klient pošlje PDF (npr. svoj brief), na katerega želiš dodati Acenta logotip in footer.

1. Poženi `node bin/pdf.js brand <pdf>` → ustvari `<ime>-branded.pdf`
2. Logo: zgoraj desno, prva stran. Footer: na vsaki strani.

---

## Workflow: `/pdf extract` (operacija C — PDF → tekst)

PDF source je nedostopen, rabiš tekst.

1. Poženi `node bin/pdf.js extract <pdf>` → ustvari `<ime>.txt`
2. Preberi .txt z Read in pokaži uporabniku (ali povzemi)

---

## Pomembno za pisanje HTML za render

- Ni ti treba pisati `@page` ali `break-inside: avoid` — Acenta CSS to že dela
- Označi vsebine, ki morajo ostati skupaj, z razredom `keep-together` ali `no-break`
- Eksplicitne prelome strani: `<div class="page-break"></div>` ali `class="nova-stran"`
- Slike: relativne poti delujejo (render vstavi `<base href>`)
- Brand barve so na voljo kot helper razredi: `.acenta-primary`, `.bg-acenta-light`, ...

---

## Kar NIKOLI ne smeš

- **Ne spreminjaj `acenta/ponudbe/render.js`** — to je obstoječi `ponudba` skill pipeline.
  `/pdf` je ločen sistem, da nič ne razbiješ.
- Ne predlagaj Make.com (uporabnik mu se izogiba).
- Ne izumljaj cen, datumov ali kontaktnih podatkov — vedno iz vira.
