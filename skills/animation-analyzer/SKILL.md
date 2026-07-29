---
name: animation-analyzer
description: >-
  Analyze a screen recording of a UI animation, motion-design piece, or page
  transition frame-by-frame and layer-by-layer to reverse-engineer it — exact
  timing, per-element transforms (translate / scale / rotate / opacity / blur /
  clip / color), easing curves, and stagger/sequence — then output a detailed
  motion spec PLUS recreation code (CSS keyframes, Framer Motion, or Lottie,
  auto-picked per animation). Use this whenever the user wants to dissect,
  reverse-engineer, reproduce, recreate, or deeply understand how an animation
  or transition works from a video/screen-recording (.mp4/.mov/.webm/.gif), or
  says things like "how does this animation work", "reverse engineer this
  motion", "recreate this transition", "analyze this animation frame by frame",
  "what are the animation curves here", "rebuild this in CSS/Framer/Lottie".
  Trigger on a video of UI/motion combined with intent to understand or rebuild
  it — even if they don't say the word "animation" (e.g. "how'd they do this
  reveal", "copy this loader", "match this micro-interaction"). ALSO use this to
  tear down a whole screen recording of a site or app — every page and section —
  into a recreate-ready design + motion reference (layout, components, verbatim
  copy, color/type/spacing tokens, and motion), e.g. "analyze this whole
  recording", "break down every screen in this video", "document this site from
  the recording so I can rebuild it", "what's the design system in this clip".
---

# Animation Analyzer

Reverse-engineer a motion design from a video by reading it the way an animator
would: pull the frames, lay them out as contact sheets, then decompose the
scene into independent layers and track each one over time — position, scale,
opacity, blur, the works — until you can state the timing and easing precisely
enough to rebuild it.

The goal is not a vibe summary ("the card slides up nicely"). The goal is a
**motion spec**: for every layer, *what property changes, from what value to
what value, starting at what millisecond, over what duration, with what easing*
— and then code that reproduces it.

## When this applies

A user hands you a screen recording (or a path to one) of a UI animation, page
transition, loader, reveal, micro-interaction, or any motion-design piece, and
wants to understand or recreate it. The classic workflow it automates: take a
screen recording of a great animation, extract it frame-by-frame, and reverse
engineer the curves.

## Two modes

**(A) Single-animation reverse-engineer** — the user points at one motion (a
reveal, a loader, a transition) and wants the exact curves. Output: a tight
motion spec + recreation code. This is the bulk of this doc (steps 1–8).

**(B) Whole-clip teardown** — the user recorded a whole site/app browse and
wants EVERY page/section/screen documented in enough detail to recreate any of
it later (layout, components, verbatim copy, design tokens, plus the motion).
Recreation code is usually NOT wanted here — the deliverable is a durable
reference doc. For this mode, see `references/teardown-mode.md` and produce a
`TEARDOWN.md` + saved reference frames. You still use the same extraction tools;
you just sweep the whole clip (scene-detect + 1fps overview to enumerate
sections) rather than zooming into one segment.

Pick the mode from intent: "how does this transition work / recreate this loader"
→ A. "analyze this whole recording / document every screen so I can rebuild the
site" → B.

## Prerequisites

`ffmpeg` and `ffprobe` must be installed (`ffmpeg -version` to check; on macOS
`brew install ffmpeg`). You read the extracted PNG frames with the `Read` tool —
your own vision is the measuring instrument here, so the whole method rests on
looking at frames carefully and comparing them.

## Workflow

Work through these in order. Don't skip the probe or the montage — the overview
is what lets you spend your detailed attention on the right 300ms.

### 0. Locate the animation (for long / unedited recordings)

If the recording is more than a few seconds (a real screen capture often has
idle time, scrolling, cursor wandering), don't extract the whole thing at full
fps — first find WHERE the motion is. Use ffmpeg freeze detection: the gaps
between "freeze" spans are the moving segments.

```
ffmpeg -hide_banner -i <video> -vf "freezedetect=n=-50dB:d=0.4" -map 0:v -f null - 2>&1 \
  | grep -iE "freeze_(start|end)"
```

Each `freeze_start … freeze_end` pair is a static span; the time BETWEEN a
`freeze_end` and the next `freeze_start` is animation. Pick the segment that
matches the animation the user cares about and pass it as `start`/`end` below. If
several segments look identical, it's probably a loop — analyze one period. If
the user already pointed at a moment ("the reveal at 0:12"), skip this and trim
straight to it.

### 1. Probe the source

Run `scripts/extract_frames.sh <video> <out_dir>` with no further args first, OR
call `ffprobe` directly, to learn: **fps, duration, resolution, frame count.**
Everything downstream depends on fps — that's how a frame index becomes a
timestamp (`time_ms = frame_index / fps * 1000`). Note the native fps; a 60fps
recording gives you ~16.7ms resolution, a 30fps one ~33ms.

### 2. Extract frames + build montages

Use the helper:

```
scripts/extract_frames.sh <video> <out_dir> [fps] [start] [end]
```

It writes:
- `<out_dir>/frames/f_0001.png …` — individual frames at the chosen fps.
- `<out_dir>/montage_001.png …` — contact-sheet grids (frames tiled, indexed) for
  fast scanning.
- `<out_dir>/meta.txt` — probe data + the fps actually used (so you can convert
  indices to ms).

Guidance on fps:
- Default to the **native fps** for the analysis pass so you don't miss a fast
  beat. If the file is long, first extract a low-fps montage of the WHOLE clip to
  locate the animated segment, then re-extract that segment at full fps via the
  `start`/`end` args.
- A typical UI animation is 200–800ms. At 60fps that's 12–48 frames — very
  tractable. Extract generously around the boundaries (a few idle frames before
  and after) so you can see the true start/rest states.

### 3. Read the montage → map the timeline

Open the montage contact sheet(s) with `Read`. Get the big picture: where does
motion start, where does it settle, what are the rough phases (e.g. "blur in →
card rises → island morphs → text fades"). Identify the **first moving frame**
and the **first fully-at-rest frame** — those bound the animation.

### 4. Decompose into layers

List every distinct visual element that moves or could move independently. Be
exhaustive — this is the "every layer" part the analysis lives or dies on:
- containers / cards / sheets / modals
- background (color, blur, dim/scrim, gradient)
- the "hero" element (the thing being revealed/morphed)
- text runs (often fade/slide independently and staggered)
- icons / badges / chrome (status bar, nav, dynamic island, tab bar)
- masks / clip paths / reveals (an element can be drawn by a moving clip, not by
  moving the element itself — watch for this)
- shadows / borders / glows
- particles / decorative motion

For each, decide whether it's truly independent or rides along with a parent.

### 5. Track each layer frame-by-frame

This is the core measurement. For the bounding segment, step through frames
(read them in small batches — e.g. every 2nd frame, then zoom into boundaries)
and for each layer record how its properties change:
- **position** (translate X/Y) — pick a reference edge/corner and estimate its
  pixel coordinate per frame.
- **scale** (width/height ratio vs rest state) — watch for non-uniform scale
  (the over-stretch-then-settle squash/stretch beloved in iOS reveals).
- **opacity** (fully transparent → opaque; estimate 0–100%).
- **blur** (background blur ramps are common; note radius going 0→N or N→0).
- **rotation, skew, corner radius, color/tint, clip/mask progress.**
- **enter/exit frames** — the frame a layer first appears and first reaches rest.

Convert every frame index to ms using the fps. Note that easing is read from the
**spacing of values across frames**, which is step 6.

### 6. Infer the easing curves

You can't read a cubic-bezier off a single frame — you read it off the *pattern
of change* across frames. See `references/easing-and-recreation.md` for the full
guide, but the intuition:
- Equal spacing per frame → **linear**.
- Big jumps early, small jumps near the end → **ease-out** (decelerate). Most UI
  entrances.
- Small jumps early, accelerating → **ease-in**. Most exits.
- Slow-fast-slow → **ease-in-out**.
- Overshoots past the target then comes back → **spring / back-out** (note the
  overshoot magnitude and settle frames; that maps to spring stiffness/damping).
- Oscillates around the target → **spring** with low damping.
Map the observed pattern to a concrete `cubic-bezier(...)` or spring params.

### 7. Write the motion spec

Produce the report using the template in `references/output-template.md`. At
minimum: a per-layer timeline table (layer · property · from → to · start ms ·
duration ms · easing), a plain-language sequence description (what happens in
what order and why it reads well), and the key insight a designer would want
(e.g. "the bottom edge settles independently and later than the top — that
staggered settle is what makes it feel physical").

### 8. Generate recreation code

Auto-pick the most faithful target for THIS animation (don't ask unless the user
specified one):
- **CSS `@keyframes` + cubic-bezier** — best for simple, declarative transforms /
  opacity / blur on DOM elements.
- **Framer Motion (React)** — best when there's spring physics, gesture coupling,
  orchestrated stagger, or layout transitions; springs and `staggerChildren` map
  cleanly.
- **Lottie JSON** — best for complex shape morphs, path/clip reveals, or vector
  illustration motion (and it pairs with the `lottie-specialist` agent — hand off
  there for production-grade Lottie). 
Match the timings and easings you measured, not generic defaults. See
`references/easing-and-recreation.md` for ready patterns in each.

## Quality bar

- Every moving layer accounted for, with numbers (ms + easing), not adjectives.
- Timings tied to measured frames, not guessed. If you're uncertain about a
  value, say so and give a range rather than inventing precision.
- The recreation code uses YOUR measured curves and would visibly resemble the
  source if run. Note anything you couldn't fully determine (e.g. exact blur
  radius) so the user knows where to eyeball.

## References

- `references/easing-and-recreation.md` — reading easing from frame spacing;
  cubic-bezier / spring / Lottie cheat sheets and code patterns.
- `references/output-template.md` — the exact motion-spec report structure.
- `scripts/extract_frames.sh` — ffprobe + frame extraction + contact-sheet montages.
