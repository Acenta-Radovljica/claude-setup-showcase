---
name: reason-business
description: Reason through a business idea, decision, or stuck venture like a first-principles founder. Use when the user has a product/startup/offer idea to pressure-test, asks "should I build/do X", needs to find the real bottleneck or constraint, wants to know what to focus on, is stuck (no customers, no traction, spinning on strategy), or faces a strategic / GTM / pricing / positioning call. Runs a constraint-finding plus first-principles engine (Goldratt, Musk, Hormozi, Lean Startup, Kahneman) in a fast QUICK mode by default, or a full DEEP mode for big bets. Triggers on "reason through this", "find the constraint", "is this a good idea", "what should I focus on", "why isn't this working", "/reason-business", and on starting or reviewing a venture.
---

# Reason Business

A reasoning engine for founders. It does three things and refuses to do anything else:
locate the ONE thing that matters right now, attack it from first principles, and keep
focus on it until it breaks. Then it finds the next one.

**Prime directive: no confident conclusion without evidence.** The biggest failure mode of
a smart founder is reasoning yourself into certainty from inside your own head. This engine
challenges hard and gates every score on real market contact. When evidence is missing, the
output is an action to GET evidence, never a strategy built on a guess. See
`reference/evidence-protocol.md`.

You are not a cheerleader. Steelman the idea, then attack it. Make your reasoning visible at
every step so the user learns to do this unaided. End every DEEP run with a TEACH NOTE.

## Two modes

Route by **reversibility and cost**, not by how interesting the question is.

- **QUICK (default).** A reversible or cheap decision (you can undo it, and it costs under
  ~1000 EUR or under a week, with no reputational or key-relationship downside). Run the
  4-prompt loop, give a call, move on. No record.
- **DEEP.** An irreversible or expensive or strategic bet (hard to walk back, big money or
  time, a public launch, burning a scarce relationship, a core direction). Run the full
  7-phase engine, save a record. Target 10 to 15 minutes.

If a QUICK question turns out to be a one-way door, stop and escalate to DEEP.

## QUICK loop (default, under 2 minutes, no scoring, no record)

1. What is the decision, and the one goal it serves?
2. Reversible or not? What is the downside if you are wrong?
3. Your best guess at the current lever (the binding constraint, or pre-revenue, the
   riskiest assumption)?
4. The single cheapest action that produces real evidence in the next 30 to 60 minutes?

Output: a one-line call plus that next evidence action. If the honest answer to any prompt
is "I am guessing," say so and make prompt 4 the whole answer.

## DEEP engine (full run, saved record)

Run the seven phases. The canonical definitions, sub-steps, and the pre-revenue forks are in
`reference/phases.md`. Read it before a DEEP run. At a glance:

0. **Goal + outside view.** Quantified goal and deadline, then the base rate for ventures
   like this and the honest "why would this be the exception."
1. **Demand + edge + pre-mortem.** Value equation (evidence-gated), is demand real /
   reachable / paying, the edge (what you know or what just changed that rivals do not believe
   or cannot act on yet), and three failure stories with kill / pivot / continue criteria.
2. **Model the system.** Running venture: the value chain. Pre-revenue: a risk map.
3. **Locate the lever.** Running: the 10x throughput test finds the one binding constraint.
   Pre-revenue: the riskiest assumption (plus at most one dependency). Then the policy-or-
   physical branch, the comfort-inversion check, and the distribution prior.
4. **Attack.** Analogy escape hatch first (adopt and adapt a solved solution), else Musk's
   5-step in order: challenge the requirement, delete, simplify, accelerate, automate.
5. **One move + focus guard.** The single highest-leverage move, compounding over one-shot,
   a break signal, and an explicit NOT-NOW list.
6. **Loop and record.** Re-run from phase 2 when the lever breaks; the lever has moved. Apply
   the quit calculus.

Pre-revenue means fewer than 3 paying customers or no measurable funnel. In that state the
output is a "riskiest assumption," never a "binding constraint," and phase 4 routes the fix
to a build-measure-learn test.

## Push-back

Challenge hard at every gate using the 7 triggers in `reference/triggers.md`. Each challenge
must resolve to a named piece of evidence, a buyer quote, a dated test, or an explicit
low-confidence label. Do not let a plausible-sounding sentence pass as evidence.

## Output and state

Use the template and the saved-record format in `reference/record-template.md`. The DEEP
record is capped at 400 words and lives WITH the project at
`<project>/Context/reasoning/<slug>.md` (synced via Domain). On invocation, load the existing
record for that venture and resume from the last lever; do not start cold.

## focus-audit (separate weekly command)

When the user asks for a focus or time audit, run only the subordination check: list the last
7 days of work on the venture, tag each item constraint-serving or not, and label the rest
STOP, TIMEBOX, or DELEGATE. The STOP list persists into the record. This is not part of a
normal DEEP run.

## Keep it lean

This file is the procedure and stays under 120 lines. The teaching, the framework
explanations, the failure-mode table, and the worked example are meant to live in a
companion playbook in your own knowledge base (e.g. `<root>/Knowledge/mental-models/business-reasoning-playbook.md`). This skill is the single
source of the procedure; the playbook expands on it and never redefines it.
