# Canonical phases

This is the single source of truth for the engine. The SKILL.md summary and the playbook both
defer to this file. If anything conflicts, this file wins.

## The running vs pre-revenue split

Decide this first, it changes phases 2, 3, and 4.

- **Running venture:** 3 or more paying customers, or a measurable funnel with real traffic.
  Use throughput logic. The output of phase 3 is the **binding constraint**.
- **Pre-revenue venture:** fewer than 3 paying customers and no measurable funnel. Use
  discovery logic. The output of phase 3 is the **riskiest assumption**, not a constraint.
  Forcing a single bottleneck onto genuine multi-unknown discovery manufactures false
  precision; do not do it.

## QUICK loop (default mode)

Four prompts, no scoring, no saved record, under 2 minutes. Goal it serves, reversibility and
downside, best guess at the lever, cheapest 30-to-60-minute evidence action. If the decision
is irreversible, expensive, or strategic, abort QUICK and run DEEP. If the honest answer to
any prompt is that you are guessing, say so, and make the evidence action the whole answer.

## DEEP engine

### Phase 0. Goal and outside view
- State the goal as a number with a deadline. "Build an app" is not a goal; "1.000 EUR MRR
  from hotels by 1. 9." is. The lever depends entirely on the goal, so get it exact.
- Name the reference class (for example "solo, bootstrapped, B2B service, 12 to 15 h per
  week") and its honest base rate of reaching that goal by that date.
- Ask: what specific evidence puts THIS venture in the top slice, rather than at the base
  rate? If the answer is enthusiasm, that is not evidence.
- Steelman the status quo: the expected value of the same hours spent on the best alternative.
- Displacement: what concretely gets dropped to make room, and is that reversible?

### Phase 1. Demand, edge, pre-mortem
- **Value equation:** does it raise Dream Outcome and Perceived Likelihood and lower Time
  Delay and Effort versus the status quo? Score each, but cap the score at LOW confidence
  whenever it rests on no buyer evidence (see evidence-protocol.md).
- **Demand reality:** real (someone would pay now), reachable (you can get to buyers), paying
  (they have budget and intent).
- **Edge (the one question that merges secret and timing):** what do you know, or what has
  just changed in the last 6 to 12 months, that makes this winnable now, that competitors do
  not believe or cannot yet act on? First list the top 3 incumbents and how they already
  solve this, so the edge is judged against reality and not a blank market. No edge means you
  compete on execution alone; say so.
- **Pre-mortem:** write the 3 most likely ways this is dead in 12 months. For each, set a
  kill / pivot / continue criterion, each with a leading indicator and a disconfirming signal,
  not just a date. Write these into the record.
- **Gate:** no edge, plus a hostile base rate, plus no evidence, means stop or pivot here.
  "Stop or pivot" means stop the analysis from advancing to strategy; the output becomes the
  cheapest validation action, per evidence-protocol.md, not a recommendation to quit. A genuine
  quit recommendation needs tier-2 or higher evidence that the market is hostile, not the mere
  absence of evidence that it is friendly.

### Phase 2. Model the system
- **Running:** lay out the value chain of necessary links from nothing to the goal:
  Reach, Trust, Purchase, Delivered outcome, Retain, Profit. Adapt names to the business.
- **Pre-revenue:** lay out a risk map instead: problem risk, solution risk, market risk,
  channel risk, willingness-to-pay risk, scale risk. Each is an assumption that must hold.

### Phase 3. Locate the lever
- **Running, the 10x throughput test:** for each link, if you multiplied everything upstream
  by ten, would the goal move, or would it pile up at this link? The constraint is the first
  link where flow breaks. There is exactly one binding constraint; improving non-constraints
  yields zero gain.
- **Pre-revenue, the riskiest assumption test:** which assumption, if wrong, collapses the
  whole model? Rank by catastrophe times ignorance (how fatal if false, times how little you
  know). Output the single riskiest assumption. Allow a top-two PAIR only when one genuinely
  gates the other (for example you cannot judge reach before a buyer segment exists). If a
  longer dependency chain exists, take the most upstream assumption, the one the others depend
  on, as the riskiest.
- **Policy or physical?** Ask it first. A policy constraint is a rule, belief, price, or
  founder habit; attack it with Musk step 1 (who imposed this requirement, and is it real?).
  A physical constraint is a real resource limit; attack it with delete, simplify, and the
  rest. In startups the binding constraint is almost always a policy.
- **Comfort-inversion check:** which link do you LEAST want to work on? If that differs from
  what the test named, force a justification. Founders avoid the one thing that works.
- **Distribution prior:** assume the lever is in Reach or Trust unless you have evidence
  otherwise; most ventures die on getting attention and trust, not on the product. Zero
  buyer conversations in the last 30 days overrides everything else: the next move is a
  5-conversation sprint, full stop.

### Phase 4. Attack the lever
- **Analogy escape hatch first:** is this already well solved somewhere, in any industry, in
  a way that transfers? If yes, adopt and adapt it and skip the teardown. Do not reinvent a
  solved commodity problem.
- **Otherwise, Musk's 5-step in order:** (1) challenge the requirement that created the lever,
  every requirement needs a person's name, not a department; (2) delete the part or step, if
  you are not adding ~10% back later you did not delete enough; (3) simplify, only after
  deleting; (4) accelerate cycle time; (5) automate, last.
- **Idiot index, only when cost or pricing is the actual lever:** finished price divided by
  irreducible input cost. Above ~3x, a first-principles teardown is warranted.
- **Pre-revenue:** design 2 to 3 cheap build-measure-learn tests and pick the cheapest. Each
  is a hypothesis, a minimum viable test, a pass/fail line, and a date. For a willingness-to-pay
  test the price is the variable, so test at a real price, never for free.

### Phase 5. One move and focus guard
- Pick the single highest-leverage move: impact on the lever, times probability it works,
  divided by cost and time.
- **Compounding over one-shot:** does this build an asset that keeps paying (content,
  systems, templates), or reset to zero when you stop (one-off outreach)? For a solo founder,
  prefer compounding unless the lever demands a one-shot now.
- **Moat note:** does breaking this lever build an accumulating advantage, or just velocity a
  competitor can match?
- Define the **break signal** (what tells you the lever is broken and it is time to re-loop)
  and the explicit **NOT-NOW list** (what you will not touch until then).
- **Bandwidth check:** does the move fit this cycle's available hours? If not, cut scope until
  it ships. The test that ships beats the test that does not. Do not undercount your own effort;
  trigger 5 applies to your own prescription too.
- **Fail branch:** state what a failed test would tell you and which phase it sends you back
  to, so a negative result is learning, not a dead end.

### Phase 6. Loop and record
- When the lever breaks, re-run from phase 2. The lever has moved; do not keep fighting
  yesterday's constraint out of inertia.
- Check the kill / pivot / continue criteria before re-entering.
- **Quit calculus:** after 3 or more cycles with no movement on the One Metric That Matters,
  flip the default from "find the next lever" to "justify why continuing beats the
  alternative." Some ventures should be stopped, not optimized.
- **Cycle-time cap:** 2 weeks per loop pre-revenue, 4 weeks post-revenue. A loop that runs
  longer is a loop that is not learning.
- Save or update the record per record-template.md.
