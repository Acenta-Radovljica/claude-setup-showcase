# Mode B: whole-clip teardown

Goal: turn a screen recording of a whole site/app browse into a durable
reference that's detailed enough to recreate any page, section, element, or
motion later. The deliverable is a `TEARDOWN.md` + saved reference frames — NOT
recreation code (unless the user asks). Be specific: real hex values, verbatim
copy, real layout — never "a hero with a heading."

## Method

1. **Probe** (`ffprobe`) for fps/duration/resolution.
2. **Enumerate sections.** Two complementary sweeps:
   - Scene cuts (page changes, big jumps):
     `ffmpeg -i <vid> -vf "select='gt(scene,0.25)',showinfo" -vsync vfr scenes/s_%03d.png`
   - 1fps full-res overview (catches gradual scrolling within long pages):
     `scripts/extract_frames.sh "<vid>" <out> 1`
   Read the overview montages, then read individual full-res frames to read
   content. Scrolling a long landing page yields many sections at 1fps — that's
   expected; document each distinct one.
3. **Motion windows** (optional but cheap): `freezedetect` to find animated
   spans (see SKILL step 0). Zoom into any that matter at high fps.
4. **Document every distinct page/section** in scroll order, with the approx
   timestamp it appears.
5. **Save reference frames**: copy one (or a few) representative full-res frame
   per section into `<out-dir>/frames/`, named like `01-hero.png`,
   `05-services.png`, and reference them from the doc.

## TEARDOWN.md structure

```markdown
# <Site/app> — teardown (from screen recording)

## Overview
What it is, the overall style/vibe, and a tech guess (Framer / Webflow / Next /
Spline …) inferred from the chrome and behavior.

## Global design system
### Color palette
Table: role · hex (sampled as precisely as possible) · notes. Get the accent(s),
backgrounds, surfaces, text tiers, borders, status colors.
### Typography
Table: role · family (best guess) · weight · approx size. Note recurring patterns
(e.g. small uppercase tracked label above a large serif headline).
### Spacing & layout
Container width, section padding, grid gaps, radii, borders/dividers, shadows.
### Buttons / iconography / imagery
Per-variant button styles; icon/illustration style; photography treatment.

## Navigation & chrome
Nav items, logo, CTAs, sticky behavior.

## Section-by-section (scroll order)
For EACH: name · ~timestamp · purpose · layout (columns/grid) · components ·
**verbatim copy/text** · imagery/graphics · colors used · any motion.
Reference the saved frame: `frames/NN-name.png`.

## Additional pages
Same treatment for any nav pages / detail pages / modals visited.

## Motion & interactions
Hero/feature animations (type, loop, layer behavior, build verdict), scroll
reveals, hovers, accordions, page transitions — with timing where measurable.

## Recreation notes
Per section, the non-obvious things to get right (exact accent color, a specific
glass/blur treatment, spacing rhythm, a graphic's approach). Be honest about what
you could NOT determine (exact fonts without DevTools, sub-frame timing on a 1fps
scroll pass, responsive/mobile, pages not visited).
```

## Tips
- Quote on-screen text exactly — copy is half of what makes a rebuild faithful.
- Sample hex from the actual frames; give a small range if anti-aliasing makes it
  uncertain.
- Long pages = many sections. Don't merge them to save space; the user wants each.
- Where you genuinely can't tell (font family, exact easing on a 1fps scroll),
  say so rather than inventing precision — that honesty is what makes the doc
  trustworthy to rebuild from.
