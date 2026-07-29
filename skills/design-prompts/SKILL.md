---
name: design-prompts
description: "Write and manage UI/design image-render prompts that go to ChatGPT, Codex, or any image generator. All prompts live in a central location organized by project + version. Use when the user asks for image prompts, design mockup prompts, or wants to save/iterate on visual design ideas for a project.\n\n<example>\nuser: \"give me ChatGPT image prompts for the project detail page\"\nassistant: Asks which project, writes self-contained prompts to ~/Domain/Personal/Assets/design-prompts/<project>/<version>/\n</example>\n\n<example>\nuser: \"save these prompts somewhere we can find them later\"\nassistant: Determines project + version, writes each prompt to its own folder under the central design-prompts root\n</example>\n\n<example>\nuser: \"I want to iterate on the design with a different accent color\"\nassistant: Creates a new version folder, copies the prompts forward, applies the color change\n</example>"
user_invocable: true
---

# Design Prompts Skill

You manage the user's central image-render workflow. All UI/design prompts that get rendered into PNG mockups (by ChatGPT image, Codex, Midjourney, etc.) live in one canonical location, organized by project and version, with a consistent folder structure that any agent (Claude, Codex, Cursor) can read and write.

## Canonical root

```
~/Domain/Personal/Assets/design-prompts/
```

**Always write prompts here. Never write them inside a project's code repo, never in a session-temporary location, never directly in a project's `Assets/` folder (e.g. `~/Domain/Business/<Company>/Assets/` or `~/Domain/Personal/Assets/` — that's for finished assets, not prompts).**

## Folder structure (memorize this)

```
~/Domain/Personal/Assets/design-prompts/
├── README.md                          # the convention spec — read it once, follow always
├── <project-slug>/                    # kebab-case project name (e.g., personal-os, nativeai)
│   ├── README.md                      # project context: links, philosophy, version history
│   ├── _shared/                       # project-shared assets (design system blocks, palettes)
│   ├── <version-name>/                # kebab-case version (e.g., v3.5-teal, landing-redesign)
│   │   ├── STATUS.md                  # checklist of all prompts + their render status
│   │   └── <NN-slug>/                 # one folder per prompt (NN zero-padded)
│   │       ├── prompt.md              # self-contained prompt, paste-able anywhere
│   │       ├── render.png             # the rendered output (its presence = "done")
│   │       └── notes.md               # optional human feedback after seeing render
```

## Mandatory behavior

### 1. Always read the central README first

Before writing any prompt, read `~/Domain/Personal/Assets/design-prompts/README.md`. That's the convention spec — your contract with Codex and any other agent that reads from this folder. If it conflicts with this skill file, the central README wins (it's the cross-agent contract).

### 2. Determine project + version before writing anything

When the user asks for image prompts:

- **Project**: Infer from context if possible (e.g., user is in a project's code folder, or mentioned the project by name). If unclear, ASK: "Which project is this for? Existing projects under `~/Domain/Personal/Assets/design-prompts/` are: <list them>." Use kebab-case slug.
- **Version**: Look at the project folder. If versions exist, ask whether this is a continuation of the latest version or a new direction (different accent, different layout philosophy = new version). If new, confirm version name with user. Convention: `vX.Y-<descriptor>` like `v1-initial`, `v3.5-teal`, `v4-linear-pure`.
- **Never assume**. Two seconds of confirmation now beats refactoring later.

### 3. Self-contained prompts

Every `prompt.md` you write MUST be fully self-contained. That means:

- Inline the entire design system block (color palette, typography, chrome, forbidden patterns) at the top of every prompt. Don't reference `_shared/` from inside `prompt.md` — copy the content in.
- The user must be able to copy-paste `prompt.md`'s contents directly into ChatGPT, Codex, or Midjourney and get a render without any external context.
- Include the target resolution (e.g., 1440×900 for desktop, 390×844 for mobile) explicitly in the prompt body.
- Include a "Target output" header at the top of `prompt.md` stating: filename should be `render.png`, save in this folder.

### 4. One prompt = one folder

- Each prompt gets its own folder named `<NN-slug>/` where NN is zero-padded (01, 02, … 10, 11).
- Inside: `prompt.md` (required), `render.png` (created when done), `notes.md` (optional).
- NEVER put multiple prompts in one `prompt.md`. NEVER put `prompt.md` files at version-root level.
- The slug should describe the page/component (e.g., `01-projects-home`, `02-project-detail`, `05-mobile-project-detail`).

### 5. Always update STATUS.md

After creating or modifying prompts, update `<version>/STATUS.md`:

```markdown
# <version-name> — Render Status

System accent: <hex color or "n/a">
Date created: <D. M. YYYY>

## Prompts

- [ ] 01 <Title> — `01-slug/prompt.md`
- [ ] 02 <Title> — `02-slug/prompt.md`
...

## Recommended render order

1. <NN — Why this one first>
2. ...

## Previous version

<Link to or path of the previous version's renders, if applicable>
```

When a render is done (its `render.png` exists), the checkbox becomes `[x]`. File presence is the source of truth; STATUS.md is the human-readable mirror.

### 6. Versioning when iterating

If the user wants a meaningfully different direction (new accent color, new layout philosophy, new visual language):

- **Create a new version folder** — do NOT overwrite existing prompts.
- Copy forward only what makes sense; some prompts may not survive the version change.
- The previous version stays as historical record.
- Reference it from the new STATUS.md so the user can compare.

If the user just wants minor tweaks (rephrase a line, add a detail to one prompt), edit the existing prompt.md in place. Use judgment.

### 7. Never edit prompts without permission

`prompt.md` files are the user's inputs. Don't restructure them, don't auto-improve them, don't fix typos without asking. They're the spec.

`render.png` files are the outputs. Don't delete them; if a render needs regeneration, overwrite in place.

`notes.md` files are optional human commentary. You can append to them but don't restructure.

## Render fidelity: art direction vs screenshot-exact mockups

A prompt can target two very different outputs. Decide which one the task needs and write the prompt accordingly.

- **Art-direction imagery** — hero visuals, abstract/atmospheric backgrounds, illustrative scenes. Painterly interpretation is fine. (For premium web art direction, draw the rules from the `imagegen-frontend-web` skill.)
- **Screenshot-exact UI mockups** — a believable, pixel-accurate "screenshot" of a real interface: a web app, dashboard, mobile app, settings panel, or a specific tool's UI (ChatGPT, Linear, Notion, a CRM, etc.). The output must read as an actual screen capture, not an artist's impression. Codex / ChatGPT image generation can do this well **if the prompt is written for it.**

### Writing a screenshot-exact mockup prompt

When the user needs a UI/product screenshot from a prompt (because they have no live build to capture, or want a concept that does not exist yet), the `prompt.md` MUST include:

1. **Render mode, stated first:** "Render as a pixel-accurate, flat 2D UI screenshot — a real screen capture, not an illustration, painting, or 3D render. Straight-on (orthographic), no perspective, no camera bokeh, no artistic grain, no drop shadows outside the UI itself."
2. **The frame:** specify exactly one — bare viewport (no chrome), inside a **browser window** (with a realistic top bar and a plausible URL), a **macOS app window**, or a **device frame** (iPhone/Android/laptop). State the device frame only if wanted; otherwise say "no device frame, fill the canvas."
3. **Exact dimensions + aspect** (e.g. 1440×900 desktop, 390×844 mobile) so it is screenshot-shaped, not square.
4. **Verbatim real content.** AI renderers invent gibberish text unless you give them the strings. Spell out the actual nav items, headings, body copy, button labels, table rows, message text, numbers, and placeholder field text — exactly as they should appear. This is the single biggest driver of a believable screenshot.
5. **The exact layout**, region by region: sidebar (its items), top bar, main panel, message list / cards / table, input bar, footer. For replicating a known tool, describe that tool's real layout (e.g. ChatGPT: left conversation sidebar, centered message column with alternating user/assistant bubbles, a rounded input bar pinned to the bottom with a send button).
6. **The design system inline** (palette hex, fonts, corner radius, spacing feel, light/dark) per rule 3, so the chrome looks intentional and on-brand.
7. **Crispness demands:** "Text must be sharp and legible. Icons clean and consistent. UI elements aligned to a grid. No warped controls, no duplicated elements, no nonsense text, no watermark, no cursor."

### Getting an indistinguishable result

Modern Codex / ChatGPT image generation renders UI, chrome, and legible text well enough that a precisely-written prompt comes back looking like a genuine screen capture — most people cannot tell it was generated. **The prompt route is the confident default for screenshots.** The realism comes from the prompt, not luck. To make it indistinguishable:

- **Name the realism explicitly:** "This is a real screenshot taken on a [MacBook / iPhone 15 / Windows] — photographic screen-capture realism, exact native OS chrome." Naming a real device + OS pulls the model toward authentic chrome.
- **Give every string verbatim** (rule 4) so there is no text to hallucinate. This is what separates a flawless mockup from a warped one.
- **Anchor to a real reference when replicating a tool:** "matches the current ChatGPT web UI" / "Linear's issue list" — the model knows these and reproduces them faithfully.
- **Add quiet authenticity cues:** a plausible time/battery in the status bar, real-looking avatars, subtle real shadows, a believable URL, natural data values. Perfection-with-life beats sterile.
- **Keep one screen, one scale.** Density and legibility hold when the render is one focused screen at its true aspect, not a montage.
- **Iterate:** if a label warps or an element duplicates, regenerate that prompt with the offending string emphasized; a pass or two lands it cleanly.

When to build HTML + Playwright instead: only when you need a **provably exact** replica of a real product (a real logo rendered precisely, legally-exact copy, exact live data) and "indistinguishable to a human" is not enough. That is the same capture toolchain the landing-page-builder QA loop uses. For everything else, generate it.

Either way, never call an image API or Gemini; prompts render in Codex / ChatGPT.

## Render engines (the prompt is engine-agnostic)

This skill is the single front door for image prompts. **One prompt, then pick where to render it.** The same `prompt.md` drives whichever engine you choose; you do not rewrite the prompt per model.

- **Codex / GPT Image 2 (default)** — render via Codex; the STATUS.md / `render.png` convention above applies.
- **Higgsfield → GPT Image 2 or Nano Banana** — same prompt, pick either model in Higgsfield.
- The policy line that actually matters: **no `GEMINI_API_KEY`, no direct `gemini-*` image API calls.** Nano Banana is Google's image model, but reached *through Higgsfield* it is a platform render, not a direct Gemini key, so it is fine here. Never wire a Gemini API key just to generate an image.

For prompt **craft** (premium, conversion-aware web reference imagery), pull the rules from the **`imagegen-frontend-web`** skill. It is a craft reference, not a second prompt store: prompts still live and version here.

**Video is out of scope here.** Image-to-video / text-to-video is a different prompt type and a different engine (Kling via Higgsfield, or Veo 3 via a Gemini render-handoff). Handle it in the build/pipeline stage, not in this skill.

## Codex handoff

A mirrored skill on Codex's side reads from this same folder. The contract Codex follows:

1. Codex reads `~/Domain/Personal/Assets/design-prompts/<project>/<version>/STATUS.md`.
2. For each unchecked prompt:
   - Reads `<NN-slug>/prompt.md`.
   - Renders the image.
   - Saves as `<NN-slug>/render.png`.
   - Updates STATUS.md (changes `[ ]` to `[x]`).
3. A prompt is DONE when `render.png` exists in its folder. STATUS.md mirrors this.

When you (Claude) write prompts and the user wants to hand off to Codex, just tell them: "Prompts are ready at `~/Domain/Personal/Assets/design-prompts/<project>/<version>/`. Codex can render them following the convention in `~/Domain/Personal/Assets/design-prompts/README.md`."

## What to say when invoked

If invoked with `/design-prompts` and no specific task, respond:

```
Design prompts skill ready. I can:
- Write new image prompts for an existing or new project
- Save in-chat prompts to the central location
- Create a new version (iteration) of an existing project's prompts
- Update STATUS.md or check render progress

Which project + what do you need?
```

If invoked implicitly (user just asks for "image prompts" / "design mockup prompts"), determine project + version per rule 2, then write the prompts into the right folders.

## Existing projects (snapshot)

Check `~/Domain/Personal/Assets/design-prompts/` for the current list. As of skill creation:

- **personal-os/** — Personal Life OS Next.js rebuild. Active version: `v3.5-teal/`. Previous: v3-purple (renders at `~/Domain/Personal/Assets/personal-os/v3-visual-system/`).

## Forbidden

- Writing prompts to a project's code repo
- Writing prompts to `~/Desktop`, `~/Downloads`, or any session-temp folder
- Combining multiple prompts into one `prompt.md` file
- Editing existing `prompt.md` files without explicit user permission
- Deleting `render.png` files (always overwrite, never delete)
- Inventing project slugs without confirming with the user
- Auto-rendering — this skill writes prompts only. Codex (or the user) renders. Claude doesn't generate images.

## When in doubt

Read `~/Domain/Personal/Assets/design-prompts/README.md` and follow the convention there. It's the cross-agent contract — both you and Codex must agree on it.
