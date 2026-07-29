---
name: premortem
description: Prospective-hindsight stress test (Kahneman's premortem). Assumes the plan, decision, design, or launch has ALREADY FAILED six months from now and works backward to explain exactly how it died, which bypasses the optimism and agreeableness bias that makes "is this a good plan?" return reassurance, and surfaces the real failure modes instead. Use when the user says "premortem", "premortem this", "pre-mortem", "how could this fail", "stress-test this", "red-team this", or "poke holes in this". ALSO invoke PROACTIVELY, and err toward using it MORE rather than less, before any hard-to-reverse, expensive, multi-week, public, or strategic move: before a launch or publish, before committing to an architecture, schema, data model, vendor, framework, positioning, pricing, GTM, hiring, or spend decision, before building on top of a freshly approved plan, and whenever a plan is about to be executed. When unsure whether a decision is big enough, run it. Skip only for trivial, cheap, easily reversible actions.
---

# Premortem

A premortem runs the clock forward and assumes defeat. Instead of asking "what could go wrong?", which invites a list of mild, hedge-able risks, you declare the plan already dead six months from now and force an explanation of the autopsy. The failure is a given, so the only work left is finding the cause. That flips the frame from defending the plan to dissecting it, which is why Kahneman called prospective hindsight one of the most effective debiasing techniques there is: people generate far more, and far more specific, reasons for an outcome they are told already happened than for one they are merely asked to imagine.

It works on the model for the same reason. Asked "is this a good plan?", the pull is to confirm it. Told "this plan failed, explain how", there is nothing to confirm, so the honest move is to find the real fracture lines.

## When to run it

Run it on demand the moment the user says premortem, pre-mortem, "how could this fail", "stress-test this", "red-team this", or "poke holes in this".

Run it proactively, and lean toward running it more often than feels necessary, before anything expensive, public, slow to reverse, or strategic: a launch or publish, an architecture, schema, data-model, vendor, or framework choice, a positioning, pricing, GTM, hiring, or budget decision, or before building on top of a freshly approved plan. The cost of a premortem is two minutes of thinking; the cost of skipping one is the weeks spent building on a flaw that was visible from the start. When unsure whether a decision is big enough, run it.

Skip it for trivial, cheap, easily reversible actions (a one-line fix, a reversible config change, a quick lookup). A premortem on everything becomes noise.

## The procedure

### 1. Pin the target and define success
State the plan in one sentence, and define what "success at the horizon" concretely looked like (the number, the milestone, the state of the world). Failure has to be measured against something specific, or the autopsy stays vague. Pick the horizon that fits the bet (six months is the default; use weeks for a small test, a year-plus for a big build).

### 2. Declare it dead, then autopsy
Open with the frame literally: "It is [horizon] from now. This plan has already failed. It did not half-work, it is dead." Then generate the distinct ways it died. Aim for five to eight; stop when new ones are just rephrasings.

For each failure mode, write:
- **How it died:** a short, concrete story, the actual sequence (what happened first, what cascaded), not a risk category like "execution risk".
- **Early warning signs:** the leading indicators visible weeks before the death, the things that, if watched, would have caught it early. This is the part the user can act on.
- **Likelihood × severity:** rough tags. Likelihood high / medium / low, severity fatal / major / minor. These drive the synthesis.

Push for variety across the causal chain: demand and market, the plan's own assumptions, execution and bandwidth, external dependencies, second-order effects, and the failure where the plan "worked" but did not matter. People cluster failures around the part they find interesting and miss the boring upstream killers, so deliberately probe the links you and they would rather not look at.

### 3. Synthesize
Pull it together into four things:
- **Most likely** failure (highest likelihood).
- **Most dangerous** failure (highest severity, even if less likely, because fatal-but-unlikely still ends the plan).
- **The single biggest hidden assumption** the whole plan rests on, the one load-bearing belief that, if false, takes down several failure modes at once. This is usually the most valuable line in the exercise, so spend real effort finding it, not a throwaway.
- **The revised plan:** the original with the top one to three gaps closed, plus the specific leading indicators to watch so the predicted deaths get caught early. The output of a premortem is a stronger plan, not just a list of fears.

## Output template

Use this structure inline; it is readable and scannable.

```
PREMORTEM: <plan in one line>
Success by <horizon> was: <concrete definition>

It is <horizon> from now. The plan is dead. Here is the autopsy.

1. <Failure name> [likelihood / severity]
   How it died: <story>
   Early signs: <leading indicators>
2. ...

SYNTHESIS
- Most likely: <which, why>
- Most dangerous: <which, why>
- Biggest hidden assumption: <the load-bearing belief>
- Revised plan: <original + gaps closed + indicators to watch>
```

## Quality bar

A good premortem is specific and uncomfortable. A bad one is generic and reassuring.

- Each failure should be a story a reader can picture, with a named mechanism, not a risk label.
- At least one failure should be one the user did not want to hear. If every failure is comfortable, you flinched; look at the link being avoided.
- The hidden assumption should make the user pause. If it is obvious, dig deeper.
- Do not hedge the synthesis into "any of these could happen." Commit to the most likely and the most dangerous, and say why.
- Honor the global writing rules in all output: no dashes as punctuation, no dramatic two-fragment pairs.

## Escalation and rendering

This is the fast, universal version. If the premortem exposes that the real problem is strategic (a venture with no validated demand, a wrong constraint, a positioning or pricing question that needs first-principles work), escalate to `/reason-business` for the heavier constraint-finding engine and feed it what the premortem surfaced.

Default to delivering the premortem inline. For a complex case with many interacting failures, or when the user will share it, offer to render it as a visual artifact via `/visual-plan` or a Lavish surface so the failures and the revised plan sit side by side.

## Mini-example (shape, not a script)

> PREMORTEM: spend 150 EUR on Meta ads to a clinic landing page to test if owners pay a 100 EUR deposit.
> Success by 2 weeks was: at least one paid deposit, or a clear click-to-checkout gradient.
>
> It is 2 weeks from now. The test told us nothing. Autopsy:
> 1. Thin traffic [high / major]. 150 EUR bought ~40 clicks; zero deposits from that is statistically meaningless, so a good niche reads as a fail. Early sign: forecast CPC above ~2 EUR on day one.
> 2. Trust floor [high / fatal-to-the-read]. Cold owners will not pay an unknown stranger anything, so the test measures trust, not demand. Early sign: high page dwell, zero checkout starts.
>
> SYNTHESIS. Most likely: thin traffic. Most dangerous: trust floor, because it invalidates the whole instrument. Hidden assumption: that a paid deposit is achievable cold at all; if false, switch the signal to a booked call and price later. Revised: keep the deposit CTA, add an email-capture gradient and a free-estimate step, and read clicks and checkout-starts, not only payments.

That is the move: assume death, find the cause, harden the plan.
