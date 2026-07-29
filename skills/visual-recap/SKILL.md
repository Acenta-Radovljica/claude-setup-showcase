---
name: visual-recap
description: Turn the result of completed work into an interactive visual recap (HTML) reviewed in the local Lavish Editor. Works for ANY work, not just code: a code diff (working tree, PR, ref range) becomes file map + annotated diffs + schema/API deltas + before/after wireframes for UI changes; non-code work becomes narrative + comparison + decisions + a wireframe only when there is a visual deliverable. Use after finishing a substantial work unit, when the user says "recap this", "show me what changed", "visual recap", "recap this PR/branch", or proactively after a multi-file diff or a meaningful set of documents/decisions. Renders via a Sonnet subagent to keep it cheap and context-light.
---

# Visual Recap

Build a recap **from** completed work, the reverse of forward planning. Read
`references/artifact-core.md` in this directory in full first; it owns the block spec, the
Opus-judgment + Sonnet-render split, the components, grounding/safety, and the Lavish loop. Do
not author the HTML in the main thread.

## When to fire

After a substantial work unit: a multi-file diff, or a meaningful set of documents or decisions
produced in the thread. Skip a trivial or single-file change that reviews faster as plain text.
Auto-invocation gates and the off-switch live in `~/.claude/rules/visual-plan-recap.md`.

## Resolve the input

- **Default (no arg):** uncommitted working tree. `git diff HEAD` for content,
  `git status --porcelain` + `git diff --stat` for the file list and per-file counts. Tracked
  changes can be ANY file type, not only code.
- **PR (`<n>`, `#<n>`, or a PR URL):** `gh pr diff <n>` for content, `gh pr view <n> --json
  title,body,files,headRefName` for metadata. Owner `amadejdemsar-create`.
- **Ref range (`main..HEAD`, a sha range):** passed straight to `git diff`.
- **General mode (no on-disk changes):** recap from the work-unit narrative, what was decided
  or produced in the thread.

Scope to the whole work unit, not just the last edit. Exclude unrelated pre-existing dirty
files; state the assumption if scope is ambiguous.

## Build it

1. Classify mode (code vs general) and UI sub-detection per `artifact-core.md`.
2. Build the **block spec** mechanically from the real input (no invented facts; redact
   secrets). Diff to block mapping: schema/migration → `dataModel`; API/route → `apiEndpoint`;
   meaningful hunks → `keyChanges` (split, grouped in tabs, summary + a few annotations each);
   files added/removed/renamed → `fileTree`; rendered UI change → `wireframe` (before/after);
   architecture/data-flow → `diagram`; the why → `narrative`; risks → `risk`. General mode uses
   the core blocks only.
3. Dispatch the **Sonnet renderer** (Agent tool, `model: "sonnet"`) with the spec + the
   `lavish-axi design` snippet + the wireframe rules. It writes `.lavish/recap-<slug>.html` and
   returns the path.
4. Run the **Lavish loop** (open, poll backgrounded, apply annotated feedback to the code or
   the recap, reply, repeat). `end` + `stop` when done.

A recap is bidirectional: annotations drive fixes back into the work, the same close-the-loop
flow forward plans use.
