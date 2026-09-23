---
name: first-principles
description: Reason through ANY problem from first principles instead of by analogy: a price or estimate, a tech/architecture choice, a process, a service offer, a "we always do it this way" assumption. Brakes first (is it worth it, or is analogy good enough?), separates form from function, decomposes into parts, labels every claim proven / standard / assumption, rebuilds only from what is proven, and ends with the single cheapest test of the biggest assumption. Use when the user says "first principles", "razstavi to", "iz česa je to sestavljeno", "a je to res tako", "zakaj to stane toliko", "razmisli od začetka", "/first-principles", or when a quoted price, effort estimate, or convention looks suspiciously large or unquestioned. For a venture/startup/GTM bet hand off to /reason-business; for an expensive-to-reverse plan add /premortem.
---

# First Principles

Reasoning by analogy (copy what works, accept the going rate) is the right default: cheap, fast, usually correct. This skill is for the cases where the analogy has stopped holding, and it has to prove that before doing the heavy work.

**Prime directive: a first-principles claim is only as good as its "facts."** The classic failure is treating an unchecked assumption as a fundamental truth and rebuilding confidently on sand. Every building block gets a label, and nothing labeled *domneva* is allowed to carry the conclusion.

Output in Slovenian. Honor the global writing rules (no dashes as punctuation, no filler, start with content).

## The procedure

### 0. Brake: is it worth it?
State the problem in one sentence and the decision it feeds. Then check:
- Cheap and reversible (under ~1 day or ~500 EUR, easy to undo)? → Say "analogija je dovolj", give the conventional answer, stop.
- Is there a gap signal? A price, estimate, or effort that looks far larger than what the thing is made of; a convention nobody can justify; a technology change (AI, new tooling) that shifts the cost structure the convention was built on.
No gap signal and low stakes → stop here. Only continue when there is a gap or the decision is expensive.

### 1. Form vs function
What does this thing actually DO, independent of who or what does it today? Strip the label ("a computer used to be a job title"; "a report" is really "the client understands whether spend works"). Write the function in one line. Everything after this is judged against the function, not the current form.

### 2. Decompose
Break it into its real components: cost lines, hours per step, moving parts, dependencies, the people involved. Be concrete and quantified where possible. Stop at the level where a part can be checked (measured, looked up, tested), not at atoms for their own sake.

### 3. Label every claim
Tag each component and each belief about it:
- **dokazano**: measured or checked in this context (data, invoice, file, live test). Say where it comes from.
- **standardno**: industry/common knowledge, reasonable but not verified here.
- **domneva**: a guess, a habit ("tako se dela"), or secondhand.
Look hardest at the component that costs the most and at anything the current approach takes for granted. If a key number can be checked right now with a tool (read a file, query data, fetch a page), check it and upgrade the label instead of guessing.

### 4. Rebuild
Construct the solution using only *dokazano* and *standardno* parts, aimed at the function from step 1. Ask per component: can it be deleted, simplified, done by a machine, or bought solved? Keep a human step only where it is genuinely load-bearing (judgment, approval, relationship), and name why. Compare the rebuilt version with the conventional one: what is the real gap (in EUR, hours, risk)?

### 5. One test
Name the single biggest *domneva* the rebuilt answer depends on and the cheapest action that turns it into *dokazano* (ideally under an hour). If the conclusion rests on guesses, the test IS the answer, not the conclusion.

## Output template

```
PRVINE: <problem in one line>
Zavora: <zakaj se splača / "analogija je dovolj" + konvencionalni odgovor>

Funkcija: <kaj stvar dejansko opravi>

Sestava:
| Del | Vrednost | Oznaka | Vir |
|-----|----------|--------|-----|

Nova sestava: <rešitev iz dokazanega> 
Razlika proti konvenciji: <EUR / ure / tveganje>

Največja domneva: <katera>
Test: <najcenejši korak, ki jo preveri>
```

## Quality bar
- The brake must actually fire. Running the full procedure on a trivial choice is a failure of this skill.
- At least one component should be relabeled from what the user assumed (a "fact" that is really *standardno* or *domneva*). If every label is comfortable, look again.
- Numbers over adjectives. "Drago" is not a component; "32 h × 60 EUR" is.
- Do not overshoot into "automate everything." A human step that is the actual bottleneck of adoption (the approver, the operator who has to change a habit) is part of the physics, not waste.

## Handoffs
- Venture, startup, GTM, "should I build this business" → `/reason-business` (DEEP), feeding it the decomposition.
- The rebuilt plan is expensive or hard to reverse → `/premortem` on it before committing.
- The user wants to be questioned rather than handed an answer → run steps 2 and 3 as questions, one at a time.
