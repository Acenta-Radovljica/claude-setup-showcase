# Record template and state

A DEEP run saves or updates a reasoning record so the loop has memory across sessions. QUICK
runs save nothing.

## Where the record lives

With the project, under your workspace root, so it syncs across devices:

- A specific business: `<root>/Business/<Company>/Context/reasoning/<slug>.md`
- A personal or side project: `<root>/Personal/<project>/Context/reasoning/<slug>.md`
- An idea with no project yet: `<root>/Personal/Context/reasoning/<slug>.md`

`<slug>` is the venture or idea name in kebab-case. On invocation, look for the file first and
resume from the last lever; never start cold if a record exists.

## Frontmatter (the durable state)

```yaml
---
venture: <name>
goal: <number + deadline>
stage: pre-revenue | running
current_lever: <binding constraint, or riskiest assumption>
lever_history:
  - date: <D. M. YYYY>
    lever: <what it was>
    broke_by: <what action broke it>
    moved_to: <the next lever>
assumptions:
  - claim: <the belief>
    evidence_tier: 0-4
    confidence: low | medium | high
    source: <buyer quote + date, or "assumption">
criteria:
  - branch: kill | pivot | continue
    signal: <leading indicator>
    disconfirm: <what would prove it wrong>
    deadline: <D. M. YYYY>
    status: open | hit
omtm: <the one metric that matters this cycle>
cycles_without_progress: <integer>
updated: <D. M. YYYY>
---
```

## The DEEP output (capped at 400 words)

Print this to the user and save it under the frontmatter. Keep it to 400 words; the cap is
real, it forces signal over prose. The full kill / pivot / continue criteria live in the
frontmatter state block, not in the prose; the prose references them in one line, so the
400-word cap stays about the readable record.

1. **GOAL.** The number, the deadline, the honest base rate, and one line on the status-quo
   steelman and what this venture displaces (the phase 0 outputs).
2. **DEMAND + EDGE.** The value-equation read and the edge, each tagged with its evidence
   tier and confidence.
3. **SYSTEM or RISK MAP.** The chain or the risk map, one line.
4. **LEVER.** The binding constraint or riskiest assumption, plus the one-line anti-comfort
   note (did it differ from the link you least wanted to touch?).
5. **ATTACK.** Running: 2 or 3 ways to break the constraint, cheapest and most
   first-principles first. Pre-revenue: 2 or 3 cheap test designs, cheapest first.
6. **NEXT MOVE.** The single move, its break signal, and the NOT-NOW list.
7. **TEACH NOTE.** One paragraph: which phase produced the key insight, and the question to
   ask yourself unaided next time so you internalise the move rather than outsource it.
