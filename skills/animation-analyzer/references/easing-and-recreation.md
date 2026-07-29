# Reading easing + recreation patterns

## Reading easing from frame spacing

Easing is a curve of *progress over time*. You recover it from how much a tracked
value changes between consecutive frames. Pick one property of one layer (e.g.
the card's top-edge Y), record its value each frame, then look at the **deltas**:

| Pattern of per-frame delta | Easing | cubic-bezier (approx) |
|---|---|---|
| Constant | linear | `cubic-bezier(0,0,1,1)` |
| Large → small (decelerating) | ease-out | `cubic-bezier(0.0, 0.0, 0.2, 1)` (Material decel) |
| Small → large (accelerating) | ease-in | `cubic-bezier(0.4, 0.0, 1, 1)` |
| Small → large → small | ease-in-out | `cubic-bezier(0.4, 0.0, 0.2, 1)` |
| Overshoots target, returns | back-out / spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Oscillates around target | spring (low damping) | use a spring, not a bezier |

How to quantify:
- **Duration**: (rest_frame − first_moving_frame) / fps. In ms.
- **Overshoot**: peak value beyond the rest value, as a % of total travel. ~10%
  overshoot ≈ a gentle back-out; ~30%+ ≈ a bouncy spring.
- **Settle**: how many frames from peak to truly-still — long settle = low spring
  damping.
- A property that moves for only part of the window (e.g. opacity finishes at
  60% of the duration while position keeps going) means **independent tracks** —
  record them separately, do not assume one shared duration.

Springs: if you see overshoot + oscillation, prefer spring physics over a bezier.
Framer Motion `transition={{ type: "spring", stiffness, damping }}`: more
overshoot → higher stiffness or lower damping; faster settle → higher damping.
Rough starting point for a snappy-with-slight-overshoot UI spring:
`stiffness: 300, damping: 24`.

## Stagger

When several sibling elements do the same move offset in time (list items, text
lines, grid cells), measure the **delay between each one's start** (in frames →
ms). That single number is the stagger. In Framer Motion it's
`staggerChildren`; in CSS it's incremental `animation-delay`.

## Recreation patterns

### CSS @keyframes
Best for declarative transform/opacity/blur on DOM. Match your measured duration
and bezier; use `transform` (translate/scale/rotate) and `opacity`/`filter` so
it's GPU-friendly.

```css
@keyframes cardEnter {
  /* values + offsets come from your per-frame measurements */
  0%   { transform: translateY(24px) scale(0.96); opacity: 0; }
  60%  { opacity: 1; }                 /* opacity finished early — separate track */
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
.card {
  animation: cardEnter 420ms cubic-bezier(0.0, 0.0, 0.2, 1) both;
}
/* background blur ramp as its own element/track */
@keyframes scrimIn { from { backdrop-filter: blur(0);   opacity: 0; }
                     to   { backdrop-filter: blur(18px); opacity: 1; } }
```
Stagger siblings: `.item:nth-child(n) { animation-delay: calc(var(--i) * 40ms); }`.

### Framer Motion (React)
Best for springs, orchestration, gestures, layout transitions.

```tsx
const container = { show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } } };
const item = {
  hidden: { y: 24, scale: 0.96, opacity: 0 },
  show:   { y: 0, scale: 1, opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 } },
};
// opacity finishing earlier than position → give it its own transition:
//   opacity: { duration: 0.18 }
```

### Lottie
Best for shape morphs, path/clip reveals, vector illustration motion. Hand off to
the `lottie-specialist` agent for production Lottie — give it your measured
keyframes (value + frame + easing per property) as the spec. Lottie eases are per
-keyframe in/out bezier handles, which map directly to the bezier you inferred.

## Common UI-reveal ingredients to look for
- Background blur/scrim ramps **before** the foreground moves (sets depth).
- An element appears to grow but is actually revealed by a **moving clip/mask**.
- **Independent edge settling** (top edge arrives before bottom; corners settle on
  different frames) — this asymmetry is what makes motion feel physical.
- Opacity almost always finishes before position.
- Squash/stretch: brief non-uniform scale (over-stretch on entry, settle back).
