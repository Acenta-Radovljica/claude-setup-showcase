# Visual Plan / Recap Auto-Invocation (Mandatory)

The `/visual-plan` and `/visual-recap` skills render an interactive HTML review surface in the
local Lavish Editor (`lavish-axi`), built for ANY substantial work, not just code. Fire them
proactively, not only when the slash command is typed. This extends `design-and-build`.

## When to fire

- **`/visual-plan` BEFORE** non-trivial, multi-step, or decision-heavy work: a new feature or
  app, a strategy / GTM / content / research plan, a substantial redesign, or a choice that is
  expensive to undo. It is the approval gate before execution. For a marketing landing page,
  plan here if useful but hand the BUILD to `landing-page-builder`.
- **`/visual-recap` AFTER** a substantial work unit completes: a multi-file diff, or a
  meaningful set of documents or decisions produced in the thread.

## When to skip

- Trivial or mechanical work, a one-line answer, a single well-specified change, or when the
  user said "just do it".
- When unsure on a borderline case, ASK once ("want a visual plan/recap for this?") rather than
  forcing a heavy artifact.

## Off switches

- Global: environment variable `VISUAL_AUTO=off` disables auto-invocation entirely (the slash
  commands still work on demand).
- Per session: if the user says "skip visual planning" (or similar), suppress auto-invocation
  for the rest of the session.

## Mechanism

Auto-invocation is this rule plus the trigger language in each skill's `description`; it is not
a `settings.json` shell hook (hooks run shell commands and cannot invoke a skill). Rendering of
the HTML is delegated to a Sonnet subagent to stay cheap and keep the markup out of the main
context; judgment stays on the orchestrator model.

Origin: 18. 6. 2026. Built from the visual-plan review (see `~/.claude/CHANGELOG-rules.md`).
Spec: `~/Domain/Personal/ai-tooling/my-claude-setup/Context/visual-plan-recap-spec.md`.
