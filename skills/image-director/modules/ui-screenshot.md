# Module: UI Screenshot (real-like app/tool/dashboard captures)

Expert decisions for generating pixel-accurate, believable screenshots of real or
invented interfaces. This is the skill's flagship domain; the spike proved that
gpt-image-2 at quality:high produces near-indistinguishable UI captures when the
prompt is specific enough about layout, content, and design system.

## Render mode statement (state first in every prompt)

Open every compiled prompt with:

> A pixel-accurate flat 2D screenshot of [app/tool]. Captured straight-on,
> orthographic, as if taken with macOS screenshot (Cmd+Shift+4) or a browser
> DevTools capture. NOT an illustration, NOT a 3D render, NOT a painting. No
> camera bokeh, no artistic film grain, no drop shadows outside the UI itself,
> no perspective tilt, no depth of field.

This anchors the model away from "artistic interpretation" mode and into
flat-capture mode. It is the single most important framing line.

## Frame choice (pick exactly one)

| Frame | When to use | Prompt fragment |
|-------|-------------|-----------------|
| Bare viewport | Showing just the app surface, no OS chrome | "bare viewport, no browser or OS chrome, the UI fills the entire canvas edge to edge" |
| Browser window | Web app that would naturally live in a tab | "inside a real Chrome browser window with a realistic top bar showing [plausible URL], standard tab strip, address bar, navigation buttons" |
| macOS app window | Native Mac app or Electron app | "inside a macOS Sequoia window with a native title bar, traffic-light buttons (red/yellow/green), [app name] in the title" |
| Windows app window | Windows native software | "inside a Windows 11 app window with a standard title bar, minimize/maximize/close buttons" |
| Device frame (phone) | Mobile app | "displayed on an iPhone 16 Pro, realistic device frame, status bar showing [time] and [carrier/wifi/battery]" |
| Device frame (laptop) | Marketing hero showing the app on a computer | "displayed on a MacBook Pro screen, thin bezel, realistic aluminium body, slight reflection on the display glass" |
| No frame, fill canvas | When the UI IS the deliverable (e.g. a Figma export) | "no device frame, no browser chrome, the interface fills the canvas completely" |

Default: bare viewport for dashboards and tools; browser window for web apps the
user would open in Chrome; device frame for mobile. Ask only if ambiguous.

## Dimensions and aspect ratio

Map to the built-in presets (the only sizes available):

| Use case | Preset | intent-spec `aspect` |
|----------|--------|---------------------|
| Desktop app, dashboard, web tool | 1536x1024 (landscape) | `1536x1024` |
| Mobile app screen | 1024x1536 (portrait) | `1024x1536` |
| Square social/thumbnail (rare for UI) | 1024x1024 | `1024x1024` |

Never default to square for a UI screenshot; it reads as uncanny. Desktop is
landscape, mobile is portrait.

## Verbatim content: the #1 realism driver

**This field makes or breaks believability.** gpt-image-2 renders text accurately
when the prompt spells it out; it generates gibberish or warped glyphs when left
to improvise. The module's job is to extract or invent every visible string.

Fill `verbatim_text` in the intent-spec with ALL of the following:

1. **Navigation items** (sidebar labels, tab names, breadcrumbs)
2. **Page headings and subheadings**
3. **Body text** (messages, descriptions, summaries, list items)
4. **Button labels** (primary CTA, secondary actions, icon tooltips)
5. **Table headers and representative row data** (2 to 4 rows is enough)
6. **Input placeholders** ("Search...", "Type a message...")
7. **Metadata** (timestamps, user names, status badges, counts, file sizes)
8. **System chrome** (URL bar text, window title, status bar time/battery)

If the user has not provided this content, infer realistic defaults for the app
being depicted. For a known tool (ChatGPT, Linear, Notion), use its real labels.
For an invented app, write plausible professional content. Never leave it to the
model to guess.

**Length limit:** keep individual strings short. The model handles labels, single
sentences, and short paragraphs well. Multi-paragraph body text increases the risk
of warped characters; summarise it or show just the first few lines with an
ellipsis.

## Layout specification (region by region)

Describe the layout as named regions, top to bottom, left to right. Be explicit
about what lives in each area. Example structure:

```
Layout (left to right, top to bottom):
- TOP BAR: [logo/app icon] left, [page title] center, [avatar + notifications] right
- LEFT SIDEBAR (240px, dark bg): [nav items listed top to bottom]
- MAIN PANEL: [heading], [subheading], [content area: cards/list/table/chat]
- BOTTOM BAR / INPUT: [text input with placeholder], [send button]
```

For a known tool, anchor to its real layout by name: "matches the current ChatGPT
web UI layout" or "Linear's issue list view with the left sidebar, filters bar,
and table." The model knows these tools and will reproduce their structure when
prompted specifically.

## Design system (inline in every prompt)

Specify the visual identity so the output looks intentional, not generic:

```
Design system:
- Background: #1E1E1E (main), #2A2A2A (sidebar), #FFFFFF (light mode alternative)
- Text: #FFFFFF primary, #A0A0A0 secondary
- Accent: #7C5CFC (buttons, active states, links)
- Font: Inter or SF Pro (system sans-serif, clean)
- Border radius: 8px cards, 4px inputs, full-round avatars
- Spacing: 16px grid, comfortable density
- Mode: dark / light (pick one, state it)
```

For replicating a known tool, name its palette: "OpenAI's ChatGPT dark theme
(#212121 bg, #ECECEC text, green accent #10A37F)" or "Linear's dark mode
(#1B1B1F bg, purple accent)." When the tool's exact hex values are known, use them.

## Crispness demands (always include)

Add to the compiled prompt:

> Sharp, legible text at every size. Clean vector-like icons. Pixel-grid
> alignment on all elements. No warped or duplicated UI controls. No nonsense
> placeholder text. No watermark. No mouse cursor visible. Every label readable
> at 100% zoom. Anti-aliased edges, no jagged rendering artifacts.

These directives feed into the `negatives` field in the intent-spec and the
anti-softness clause.

## Realism amplifiers

Layer these into the prompt to push the output from "illustration of a UI" toward
"a real screenshot someone took":

1. **Name the device and OS**: "a real screenshot taken on a MacBook Pro running
   macOS Sequoia" or "captured on an iPhone 16 Pro running iOS 19."
2. **Quiet authenticity cues**: a plausible time in the status bar (e.g. 10:42),
   realistic battery level (78%), a believable Wi-Fi icon, a URL that makes sense
   (e.g. `chat.openai.com`, `app.linear.app/team-1/issues`).
3. **Natural data**: real-looking names (not "John Doe" and "Jane Smith"), varied
   avatar initials or photos, timestamps that feel like a real session ("2m ago",
   "Yesterday at 14:30"), uneven list lengths, a scroll indicator if appropriate.
4. **One screen, one scale**: never a montage of multiple screens. One viewport
   at one zoom level. If showing multiple states, render separate images.
5. **Active state**: one element should look "in use" (a selected sidebar item, a
   focused input, a hover state on a button) so it reads as a live app, not a
   wireframe.

## Inspect checklist (feed to the render-loop critique step)

When inspecting the rendered PNG, check these in order:

- [ ] Every `verbatim_text` string is present and spelled correctly
- [ ] No warped, blurry, or repeated characters in any label
- [ ] Sidebar items are distinct (not duplicated or merged)
- [ ] Layout regions match the spec (correct column count, correct stacking)
- [ ] Design system colours hold (check bg, text, accent against specified hex)
- [ ] No duplicated chrome (double title bars, repeated browser tabs)
- [ ] Text density is legible (not too small, not comically large)
- [ ] No stray cursors, watermarks, or "generated by" text
- [ ] Frame type matches the spec (browser chrome present/absent as requested)
- [ ] Active/selected state is visible on the correct element
- [ ] Overall impression: would a colleague mistake this for a real screenshot?

Failures on the first three items are the most common and warrant an immediate
targeted refine pass (move the misspelled string earlier in the prompt, shorten
it, or break it onto fewer words per line).

## Multi-screen consistency

When generating a set of screenshots from the same app (e.g. three views of a
dashboard), follow `consistency.md`:

1. Lock the design-system block (identical hex, fonts, radii, spacing) across all
   renders by setting `palette.locked: true` in the intent-spec.
2. After the first screen is accepted, use it as a `--ref` reference image for
   subsequent renders so the model anchors to the same chrome style.
3. Keep the sidebar/nav identical across screens; only change the main panel.

## Worked example 1: ChatGPT web app

```
intent:
  domain: ui-screenshot
  use: hero image for a blog post about AI assistants
  output:
    aspect: 1536x1024
    format: png
  subject: the ChatGPT web app in a conversation
  style: authentic product screenshot
  composition: straight-on, full viewport capture
  light: N/A (UI is self-lit, dark theme)
  optics: N/A (flat 2D capture)
  palette:
    locked: false
    tokens: ["#212121", "#2F2F2F", "#ECECEC", "#10A37F"]
  finish: crisp digital render, no grain, no texture

  verbatim_text:
    - "ChatGPT"
    - "GPT-4o"
    - "How can I help you today?"
    - "Write a Python script that connects to a PostgreSQL database and exports all users to CSV"
    - "Here's a Python script using psycopg2..."
    - "import psycopg2"
    - "import csv"
    - "Message ChatGPT"
    - "Today"
    - "Yesterday"
    - "Previous 7 Days"
    - "Database export script"
    - "Marketing plan Q3"
    - "API rate limiting strategy"

  references: []
  consistency_kind: none
  negatives: >
    no soft Gaussian blur, no hazy wash, no over-denoised look, crisp with
    fine detail, no watermark, no cursor, no warped text, no duplicated
    sidebar items, no 3D render, no artistic stylisation

  engine:
    tool: codex-builtin-image_gen
    model: gpt-image-2
    quality: high
```

Compiled prompt (prose):

> A pixel-accurate flat 2D screenshot of the ChatGPT web application, dark theme,
> captured straight-on as a real macOS screenshot. Matches the current ChatGPT web
> UI layout exactly. Left sidebar (#2F2F2F) with "ChatGPT" logo at top, sections
> "Today", "Yesterday", "Previous 7 Days" with conversation titles "Database
> export script", "Marketing plan Q3", "API rate limiting strategy". Main chat
> panel (#212121) with model selector showing "GPT-4o". The conversation shows a
> user message: "Write a Python script that connects to a PostgreSQL database and
> exports all users to CSV" and the beginning of an assistant response: "Here's a
> Python script using psycopg2..." followed by a code block starting with "import
> psycopg2" and "import csv". Bottom input bar with placeholder "Message ChatGPT".
> Green accent #10A37F on active elements. Sharp legible text, clean icons,
> pixel-grid alignment, no warped characters, no duplicated elements, no
> watermark, no cursor. 1536x1024 landscape.

## Worked example 2: Mobile fitness app

```
intent:
  domain: ui-screenshot
  use: App Store listing screenshot
  output:
    aspect: 1024x1536
    format: png
  subject: a fitness tracking app showing today's workout summary
  style: authentic iOS screenshot
  composition: full device viewport, portrait
  light: N/A
  optics: N/A
  palette:
    locked: false
    tokens: ["#000000", "#1C1C1E", "#FFFFFF", "#30D158", "#FF453A"]
  finish: crisp iOS native rendering

  verbatim_text:
    - "Today's Workout"
    - "Push Day"
    - "Duration: 47 min"
    - "Volume: 12,450 kg"
    - "Bench Press"
    - "4 x 8 @ 80kg"
    - "Overhead Press"
    - "3 x 10 @ 45kg"
    - "Incline Dumbbell Press"
    - "3 x 12 @ 28kg"
    - "Cable Flyes"
    - "3 x 15 @ 14kg"
    - "10:42"
    - "Home"
    - "Workouts"
    - "Progress"
    - "Profile"

  references: []
  consistency_kind: none
  negatives: >
    no blur, no haze, no watermark, no cursor, no warped text, no Android
    styling, crisp iOS native appearance, no 3D perspective, no artistic filter

  engine:
    tool: codex-builtin-image_gen
    model: gpt-image-2
    quality: high
```

Compiled prompt (prose):

> A pixel-accurate flat 2D screenshot of an iOS fitness app on iPhone 16 Pro,
> captured as a native iOS screenshot. Status bar shows 10:42, Wi-Fi, 78% battery.
> Dark theme (#1C1C1E background, #FFFFFF text). Screen title "Today's Workout"
> with subtitle "Push Day". Summary cards showing "Duration: 47 min" and "Volume:
> 12,450 kg" with green accent #30D158. Exercise list below: "Bench Press" with
> "4 x 8 @ 80kg", "Overhead Press" with "3 x 10 @ 45kg", "Incline Dumbbell
> Press" with "3 x 12 @ 28kg", "Cable Flyes" with "3 x 15 @ 14kg". Each
> exercise row has a checkmark icon in green. Bottom tab bar with icons and labels:
> "Home", "Workouts" (active, green), "Progress", "Profile". Native iOS styling,
> SF Pro font, standard iOS spacing and corner radii. Sharp legible text at every
> size, no warped characters, no duplicated elements, no watermark. 1024x1536
> portrait.
