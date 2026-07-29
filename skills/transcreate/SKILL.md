---
name: transcreate
description: |
  Native-quality transcreation of text between any language pair, not literal machine translation. Produces output a native professional would write from scratch: kills calques, false friends, and translationese, gets case/gender/aspect and locale right, matches register, and stays consistent via a persistent glossary (translation memory). Runs a two-pass loop (transcreate, then an independent native review that never sees the source) by dispatching the native-transcreator agent in separate contexts, with an optional back-translation accuracy gate and few-shot native voice matching. Use whenever translating a deck, email, post, page, or document into Slovenian, Croatian, Italian, German, English, or any language, especially when the usual AI translation reads as foreign.
---

# Transcreate

Turns the manual "translate, then have a native rewrite it" loop into one command, and adds the machinery a professional translation desk uses: a translation memory (glossary), an accuracy back-check, and native voice matching. It dispatches the `native-transcreator` agent in separate, isolated contexts, the independence is what makes the output native rather than translated-twice.

## Arguments

`$ARGUMENTS` is free-form; parse these out (order-flexible):

- **Source** (required): a file path, or inline text in quotes for short snippets. Accepts `.md`, `.html`, `.txt`, or raw text.
- **`to:<lang>`** (required): target language code or name. Repeatable to fan out (`to:sl to:hr`).
- **`from:<lang>`** (optional): source language. Default: auto-detect.
- **`register:<reg>`** (optional): `formal` / `business` / `marketing` / `casual` / `legal`. Default: auto-detect (required when source is short, see Pre-flight).
- **`out:<path>`** (optional): output file. Default: source path with a `-<lang>` suffix. Inline text prints to chat.
- **`style:<note>`** (optional): house-style override (e.g. `style:"»« quotes"`). Overrides auto-detection.
- **`voice:<file-or-name>`** (optional): a file of real native target-language copy to match, or a saved voice name under `~/.claude/transcreate/voice/<name>.md`. Few-shot voice anchoring.
- **`verify:back`** (optional): run the back-translation accuracy gate. Auto-on for `register:legal` and for any source containing prices, statistics, or contractual claims.
- **`glossary:off`** (optional): skip the glossary (rarely needed).

Examples:
- `/transcreate slides.md to:sl register:marketing`
- `/transcreate ./decks/deck-en.md to:sl to:hr verify:back`
- `/transcreate landing.md to:de register:marketing voice:competitor-de.md`
- `/transcreate "Your hotel, finally answered." to:sl register:marketing`

## Pre-flight

1. **Resolve the source.** Path: read it. Missing file: stop and say so. Inline: use directly.
2. **Confirm at least one `to:` target.** If none, ask.
3. **Register safety.** Source under ~200 words with no `register:`: ask for the register (one quick question). Short text gives the agent too little to infer from.
4. **Big-document chunking.** Over ~3.000 words: process in natural sections (slides, headings, blocks), tracked so nothing drops.
5. **Load the glossary (translation memory).** Unless `glossary:off`, for each target language read, in this order, and merge (project wins over global on conflicts):
   - Global: `~/.claude/transcreate/glossary/<lang>.md`
   - Project: if the source lives under a project, the nearest `_transcreate/glossary-<lang>.md` (e.g. `./<project>/_transcreate/glossary-sl.md`).
   Pass the merged locked + non-locked term pairs to the agent.
6. **Auto-detect house style.** If no `style:` was given, inspect the target context for existing conventions before falling back to the language default:
   - If writing into or beside existing target-language files (same folder, or an existing `out:` file), grep them for quote style (`»«` vs `„"` vs `"`), decimal/percent format, and date format, and adopt what is already there.
   - If the target audience or project has a known house quote style, apply it (e.g. `style:"»« quotes"` for a publication that prefers guillemets).
   - Otherwise use the language default. State which you chose.
7. **Resolve the voice sample.** If `voice:` is a path, read it; if a saved name, read `~/.claude/transcreate/voice/<name>.md`. Pass its text to the agent as the voice to match.

## Step 1: Transcreate (pass 1)

For each target language, dispatch `native-transcreator` via the Agent tool, `model: opus`:

```
mode: transcreate
source language: <from, or "auto-detect">
target language: <to>
register: <register, or "auto-detect from source; state your assumption">
house style: <resolved style, or "language default">
glossary:
<merged source -> target | locked? rows, or "none">
voice sample:
<the voice text, or "none">
do-not-translate: <brand names, fixed terms, or "none">

SOURCE:
<the full source text, or the current section if chunking>
```

Collect the transcreated output, its Transcreation notes, any inline `⟦?: …⟧` confidence marks, and any Glossary proposals. Do not edit the agent's output yourself; you orchestrate, you do not co-translate.

## Step 2: Independent native review (pass 2)

Dispatch `native-transcreator` AGAIN, a **fresh, separate** Agent call (new context), `model: opus`. **Do NOT include the source text.** Pass only:

```
mode: review
target language: <to>
intended register: <register>
house style: <resolved style>
glossary:
<the locked terms only, so the reviewer can verify they held, or "none">
what this is: <one line, e.g. "Slovenian hotel marketing copy from a sales deck">

TARGET TEXT TO REVIEW:
<the pass-1 output for this language/section, including its ⟦?: …⟧ marks>
```

Withholding the source is mandatory: a reviewer who sees the original anchors to its structure and re-introduces the calques it is meant to catch. Collect the corrected text (no confidence marks remaining) and the Review change log.

## Step 3 (optional): Accuracy gate

Run this when `verify:back` is set (or auto-triggered for legal/pricing/contractual sources). It catches meaning drift that a nativeness review cannot see, native-sounding text that quietly dropped a qualifier or flipped a number.

1. Dispatch `native-transcreator`, fresh context, `mode: backtranslate`, passing the **reviewed target text** and the source language (NOT the source text). Get the faithful back-translation.
2. Dispatch `native-transcreator`, fresh context, `mode: accuracy`, passing the **original source text** and the **back-translation**. Get the Meaning-drift report.
3. If the report flags `major` drift, surface it prominently and, for each item, either fix the target (a small targeted re-transcreation of that span) or flag it for the user's decision. `minor` drift is reported, not auto-fixed.

## Step 4: Assemble, persist, deliver

1. If chunked, reassemble in order, structure intact.
2. **Show the user:** the pass-2 change log (what the independent native caught), any accuracy-gate drift, and any "untranslatable / needs a human call" items. This is where the value is visible.
3. **Glossary write-back.** If the agent returned Glossary proposals, present them and ask which to save. On confirmation, append the chosen rows to the appropriate glossary file (project glossary if the source is in a project, else global), so the next job stays consistent. Never overwrite existing locked entries without asking.
4. **Write output** to `out:` (or the defaulted `-<lang>` path); inline short text prints to chat.
5. **Verify before done** (per the global rule): for HTML or rendered decks, screenshot a couple of the most text-dense slides and confirm the longer target-language strings still fit; for markdown, confirm structure is intact. Re-check the house style held (quotes, number formats).
6. **Report per language:** output path, register, house style chosen, voice matched or not, number of review fixes, and accuracy-gate verdict if run.

## Evals (quality measurement)

A graded test set lives at `~/.claude/transcreate/evals/<lang>.md` (human-readable) and `~/.claude/transcreate/evals/_datasets.json` (machine), with hard source phrases, the WRONG machine output, and the GOLDEN native output per case. Use it to measure the agent and catch regressions after editing the agent file:

- To run: Read `~/.claude/transcreate/evals/_datasets.json`, then invoke the Workflow tool with `scriptPath: "~/.claude/transcreate/run-evals.workflow.js"` and `args: { datasets: <the parsed json>, lang: "sl" }` (or `lang: "all"`, optional `sample: N` to cap cases). The runner transcreates each case via the `native-transcreator` agent, has an independent judge score PASS/FAIL against the golden (and checks the wrong calque is absent), and reports pass rate per category (calque, false_friend, grammar, idiom, register, locale). Passing `datasets` is required because workflow scripts cannot read files.
- When you edit `~/.claude/agents/native-transcreator.md`, re-run the evals for the affected languages to confirm no regression before relying on it.
- Add a new eval case whenever a real job surfaces a miss the test set did not catch, so the suite reflects actual failures.

## Notes

- The passes are SEQUENTIAL (each needs the prior output) and each needs an isolated context, so they are separate Agent dispatches, not a Workflow and not one agent reviewing its own work in the same context.
- Fanning out to multiple `to:` languages: the per-language chains are independent and may run in parallel.
- Deep reference knowledge: Slovenian, Croatian, Italian, German, English. Other languages still work via the agent's general native command; it flags when a language is outside the deep set so you give the result an extra look.
- All output obeys the global writing rules in every language: no dashes as punctuation, no dramatic fragment pairs.
