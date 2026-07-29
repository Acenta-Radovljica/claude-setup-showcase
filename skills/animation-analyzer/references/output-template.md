# Motion-spec output template

Use this structure for the report. Fill every section with measured numbers, not
adjectives. Keep timings in ms, tied to frames you actually looked at.

```markdown
# Animation analysis: <name/source>

**Source:** <file> · **fps:** <n> · **resolution:** <wxh> · **analyzed segment:** <start>–<end>ms (<n> frames)
**Total animation duration:** <ms> (first motion → fully at rest)

## Sequence (plain language)
A short narrative of what happens in what order and *why it reads well* — the
director's commentary. 3–6 sentences. Call out the signature move (the thing that
makes it feel good).

## Phases
| Phase | Time (ms) | What happens |
|---|---|---|
| 1 | 0–120 | background blur + scrim ramp in |
| 2 | 80–360 | card rises + scales, top edge leads |
| … | | |

## Layers (the core spec)
One block per independent layer. Repeat as needed.

### <Layer name> (e.g. Card)
| Property | From → To | Start (ms) | Duration (ms) | Easing | Notes |
|---|---|---|---|---|---|
| translateY | 24px → 0 | 80 | 280 | cubic-bezier(0,0,0.2,1) | leads the motion |
| scale | 0.96 → 1 | 80 | 280 | same | uniform |
| opacity | 0 → 1 | 80 | 110 | linear | finishes early |
- Independent of / coupled to: <parent or other layers>
- Confidence: <high/med/low + what you'd eyeball to confirm>

### <Background / scrim>
…
### <Text run(s)>
… (note stagger: <ms> between lines)
### <Hero / morph element>
… (if reveal-by-clip, describe the mask path + its progress)

## Stagger & coordination
- <element group>: <ms> between each.
- Cross-layer timing relationships worth preserving.

## Uncertainties
Things you couldn't measure precisely (exact blur radius, sub-frame timing on a
30fps capture, occluded layers) — stated honestly so the user knows where to
fine-tune by eye.

## Recreation
Chosen target: <CSS | Framer Motion | Lottie> — and one line on why it fits this
animation. Then the code, using the measured values above.

```<lang>
<code>
```

How to verify the rebuild matches: <e.g. "run side-by-side with the recording at
0.25× speed; the top edge should reach rest ~80ms before the bottom">.
```
