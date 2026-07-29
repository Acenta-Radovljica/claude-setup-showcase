---
name: devtakeover
description: "Full project development takeover. Works on EXISTING codebases (audits, then builds custom ecosystem) AND NEW projects from scratch (discovers requirements, scaffolds architecture, then builds custom ecosystem). Produces agents, skills, rules, hooks, visual HTML guides, and a setup script. One command."
user_invocable: true
---

# /devtakeover — Project Development Takeover

You are executing a full project development takeover. This works in TWO modes:

- **Existing project:** Audit the codebase, then design and build a custom Claude Code ecosystem tailored to what already exists.
- **New project:** Discover what needs to be built, scaffold the architecture, then design and build a custom Claude Code ecosystem tailored to the chosen patterns.

The mode is detected automatically based on whether the directory has an existing codebase or is empty/near-empty.

**Quality standard: This must be thorough enough that a team of non-developers can use Claude Code to develop this project without writing code manually. Every agent must know the codebase patterns. Every rule must prevent real mistakes. Every skill must solve a real workflow problem. No placeholders, no generic content.**

---

## EXECUTION QUALITY BAR (READ FIRST)

**This is a multi-phase, multi-deliverable spec. The global `Execution Quality Bar (Mandatory)` rule in `~/.claude/CLAUDE.md` applies in full. In particular:**

1. **Read this entire SKILL.md end to end before starting.** Do not start executing Phase 0 after reading only the first few sections.

2. **Extract an explicit deliverables list and present it to the user BEFORE starting work.** Use the deliverables checklist in the "DELIVERABLES CHECKLIST" section below. This list is what "complete" means.

3. **Quality reference files.** Every phase should have reference examples that define the quality bar. Read them before generating anything. Do not skip this step.

4. **Under-delegation is a form of cutting corners.** If a phase has 5 independent deliverables, spawn 5 subagents, not 1. Do not serialize work that could run in parallel.

5. **Iteration loops are mandatory, not optional.** Every phase has a quality check. If a deliverable fails the check, regenerate it. Do not accept undersized or shallow output.

6. **Forbidden phrases when gaps exist.** After completion, you may NOT say "complete", "all done", "finished", "ready" unless EVERY item in the deliverables checklist is marked DONE. If any are SKIPPED or NOT DONE, use "partially complete" and explain exactly what remains.

7. **The quality bar for the entire output is:** would a world-class engineering team (SpaceX-level attention to detail) accept this as production-ready ecosystem documentation? If not, keep iterating.

---

## DELIVERABLES CHECKLIST

Before starting, present this list to the user and state "I will create all of the following. Starting now with phase 0."

```
[ ] Phase 0: Project profile + workspace + STATE.json
[ ] Phase 1-E: audit/ARCHITECTURE.md (10KB+, exhaustive)
[ ] Phase 1-E: audit/PATTERNS.md (10KB+, exhaustive)
[ ] Phase 1-E: audit/DOMAIN_AND_RISKS.md (10KB+, exhaustive)
[ ] Phase 1-E: audit/PROJECT_GUIDE.md (synthesized, human-readable)
[ ] Phase 1-E: audit/MACHINE_CONTEXT.md (synthesized, machine-dense)
[ ] Phase 2: design/ECOSYSTEM_DESIGN.md (full spec of every agent, skill, rule, hook)
[ ] Phase 3: CLAUDE.md at project root (under 250 lines, all @imports valid)
[ ] Phase 3: .claude/rules/*.md (4+ rules files, each with frontmatter on line 1, project-specific content)
[ ] Phase 3: .claude/agents/*.md (3+ agents, each 150+ lines, 5+ file path references, frontmatter on line 1)
[ ] Phase 3: .claude/skills/{name}/SKILL.md (5+ skills, each with complete workflow)
[ ] Phase 3: .claude/settings.json (valid JSON, hooks + permissions)
[ ] Phase 3: .claude/COMPONENT_CATALOG.md (every reusable component cataloged)
[ ] Phase 3: {working-directory}/ (e.g., .ascendflow/) with README.md and subdirs
[ ] Phase 3: implementation/INVENTORY.md (file counts, verification results)
[ ] Phase 4: guides/01-architecture.html (100KB+, design-visionary generated)
[ ] Phase 4: guides/02-ecosystem.html (100KB+, design-visionary generated)
[ ] Phase 4: guides/03-usage-guide.html (100KB+, design-visionary generated)
[ ] Phase 5: config-repo/ with README.md, setup.sh, all config files
[ ] Completion: Present DELIVERABLES CHECKLIST with every line marked DONE/SKIPPED/NOT DONE
```

If new project mode, add:
```
[ ] Phase 0-N: discovery/REQUIREMENTS.md
[ ] Phase 0-N: discovery/TECH_DECISIONS.md
[ ] Phase 1-N: scaffold/MANIFEST.md + full scaffolded project
```

---

## MODE DETECTION

Count the number of source files in the current directory (excluding `.git/`, `node_modules/`, `__pycache__/`, `.venv/`, `vendor/`). 

- **10+ source files** → EXISTING PROJECT MODE (skip to Phase 0-E below)
- **Fewer than 10 source files** → NEW PROJECT MODE (continue to Phase 0-N below)

---

# ═══════════════════════════════════════════════════
# NEW PROJECT MODE
# ═══════════════════════════════════════════════════

## PHASE 0-N: DISCOVERY (5-10 minutes)

This replaces the audit for new projects. Instead of reading code, you interview the user to understand what needs to be built.

### Step 1: Core questions (ask conversationally, not as a checklist dump)

**What are we building?**
- What does this product/tool/app do? (one paragraph)
- Who uses it? (end users, admins, API consumers, internal team)
- Is this a web app, mobile app, CLI tool, API service, library, or something else?

**Team and workflow:**
- Who is the team? (a) developers only, (b) mixed technical and non-technical, (c) solo developer, (d) non-developers who manage through Claude Code
- How many people will work on this?
- Any specific workflow needs? (e.g., PR reviews required, specific deployment target)

**Technical preferences (suggest sensible defaults, let user override):**
- Based on what we're building, I recommend [stack]. Sound good?
  - Web app → Next.js or Django + React/Angular depending on complexity
  - API service → FastAPI or Express depending on language preference
  - Mobile → React Native or Flutter
  - CLI → language of choice
- Database: PostgreSQL (default for most), SQLite (for simple apps), none (for CLIs/libraries)
- Deployment target: Docker (default), serverless, static hosting
- Any existing tools or services to integrate with?

**Business context (if non-developer team):**
- What are the main revenue drivers or success metrics?
- What's the MVP scope vs. future plans?
- Any deadlines or demos coming up?

### Step 2: Create workspace

Same workspace structure as existing project mode, but also save:
- `{output-dir}/discovery/REQUIREMENTS.md` — All answers organized by category
- `{output-dir}/discovery/TECH_DECISIONS.md` — Stack choices with reasoning

### Step 3: Architecture design

Based on the answers, design the project architecture. Present it as:

```
PROJECT ARCHITECTURE: {name}
==============================

Stack: {chosen tech stack with reasoning}

Directory structure:
{proposed directory tree}

Key patterns:
- {pattern 1 and why}
- {pattern 2 and why}

Database schema (if applicable):
- {key entities and relationships}

API design (if applicable):
- {key endpoints}

Services/infrastructure:
- {what runs where}
```

Ask: "Does this architecture look right? Any changes before I scaffold?"

Wait for approval.

## PHASE 1-N: SCAFFOLD (5-10 minutes)

Create the entire project structure:

### What to create

**Always:**
- Directory structure matching the approved architecture
- `README.md` with project description, setup instructions, and development commands
- `.gitignore` appropriate for the tech stack
- `docker-compose.yml` if Docker was chosen
- `Dockerfile` for each service
- `.env.example` with all required environment variables (no real secrets)
- CI pipeline (`.github/workflows/ci.yml`) with lint, type check, test jobs

**Based on stack:**
- Package files (`package.json`, `requirements.txt`, `pyproject.toml`, etc.) with initial dependencies
- Config files (tsconfig, eslint, prettier, ruff, etc.) with sensible defaults
- Entry point files (main.ts, manage.py, main.go, etc.)
- Initial models/schemas based on the database design
- Initial route/endpoint stubs
- Test setup with one example test
- Development scripts (start, test, lint, build)

**Key principle:** Scaffold enough that `docker compose up` (or equivalent) starts a working app with a health check endpoint. The team should see something running immediately.

### After scaffolding

Run a quick verification:
- All files created successfully
- Package files have correct syntax
- Docker compose file is valid YAML
- The directory structure matches the approved architecture

Write the scaffold manifest to `{output-dir}/scaffold/MANIFEST.md`.

Now continue to **PHASE 2** (Design the Ecosystem) below, which is shared between both modes. The ecosystem design will reference the scaffolded patterns instead of audited ones.

---

# ═══════════════════════════════════════════════════
# EXISTING PROJECT MODE  
# ═══════════════════════════════════════════════════

## PHASE 0-E: DETECT AND ORIENT (2 minutes)

### Step 1: Identify the project

Scan the current directory for:
- Package files: `package.json`, `requirements.txt`, `Cargo.toml`, `go.mod`, `pyproject.toml`, `pom.xml`, `build.gradle`, `Gemfile`, `composer.json`
- Config files: `docker-compose.yml`, `Dockerfile`, `Makefile`, `.env*`, `tsconfig.json`, `angular.json`, `next.config.*`, `vite.config.*`, `webpack.config.*`
- Framework indicators: `manage.py` (Django), `artisan` (Laravel), `bin/rails` (Rails), `src/main.rs` (Rust), `cmd/` (Go)
- CI/CD: `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, `.circleci/`
- Monorepo indicators: multiple package.json files, `nx.json`, `turbo.json`, `lerna.json`, workspace configs

Build a project profile:
- **Name**: from package.json, pyproject.toml, or directory name
- **Tech stack**: languages, frameworks, databases, major dependencies
- **Architecture**: monolith, monorepo, microservices, single app
- **Sub-projects**: if monorepo, list each sub-project with its tech
- **Build/run commands**: how to start, test, lint, build
- **Team tools**: what CI/CD, deployment, testing tools are in use

### Step 2: Ask exactly these questions

1. **"Who is the team?"** Options: (a) developers only, (b) mixed technical and non-technical, (c) solo developer, (d) non-developers who manage through Claude Code
2. **"Any specific pain points, areas to focus on, or context I should know?"** (optional, free text)
3. **"Where should I save the output?"** Suggest a default path based on the project name (e.g., `/Users/Shared/Domain/Context/Business/projects/{project-name}/devtakeover/` or `./.takeover/` in the project). Let the user choose.

Wait for answers before continuing.

### Step 3: Create workspace

Create the output directory with:
```
{output-dir}/
  STATE.json          # Tracks progress
  audit/              # Phase 1 outputs
  design/             # Phase 2 outputs  
  implementation/     # Phase 3 tracking
  guides/             # Phase 4 HTML files
  config-repo/        # Phase 5 exportable package
```

Write `STATE.json`:
```json
{
  "project": "{name}",
  "path": "{absolute path}",
  "stack": "{detected stack summary}",
  "team": "{team type from question 1}",
  "painPoints": "{from question 2}",
  "phase": 0,
  "startedAt": "{ISO date}",
  "phases": {
    "0_detect": "complete",
    "1_audit": "pending",
    "2_design": "pending",
    "3_implement": "pending",
    "4_visualize": "pending",
    "5_package": "pending"
  }
}
```

Report: "Project detected: {name} ({stack}). Workspace created at {path}. Starting deep audit..."

---

## PHASE 1-E: DEEP CODEBASE AUDIT (15-25 minutes, existing projects only)

**Skip this phase for new projects. New projects go from Phase 1-N (scaffold) directly to Phase 2.**

This is the most critical phase. The audit quality determines everything downstream. A weak audit means weak agents, weak rules, and weak guides. Do not skip steps.

### Quality bar for audit documents

Each audit file (ARCHITECTURE.md, PATTERNS.md, DOMAIN_AND_RISKS.md) must:
- Be 10KB+ of dense, exhaustive content (not summaries)
- Include 30+ exact file path references with absolute paths
- Cover EVERY item in its section list (not "the main ones")
- Read at least 20 actual source files before writing
- Quote specific code snippets where relevant

### Reference quality examples

Read these existing audit files to internalize the bar before generating:
- `/Users/Shared/Domain/Context/Business/projects/ascend-devtakeover/audit/ARCHITECTURE.md`
- `/Users/Shared/Domain/Context/Business/projects/ascend-devtakeover/audit/PATTERNS.md`
- `/Users/Shared/Domain/Context/Business/projects/ascend-devtakeover/audit/DOMAIN_AND_RISKS.md`
- `/Users/Shared/Domain/Context/Business/projects/ascend-devtakeover/audit/MACHINE_CONTEXT.md`

### Critical: Subagent type matters

**DO NOT use the `Explore` subagent for the auditors.** Explore is read-only and CANNOT write files. The auditor will produce its findings in chat instead of writing to disk, and you will have to re-write everything yourself.

**Use `general-purpose` subagent type with explicit Write tool access.** Verify the subagent has `Read, Write, Glob, Grep, Bash` tools at minimum. Or use a specialized writing-capable agent like `senior-architect` for this phase.

### Parallelization

Launch THREE subagents in parallel (one tool call with three Agent invocations) so all three audits run simultaneously. Do not serialize. Each writes its findings DIRECTLY to its file in the workspace.

### Subagent 1: Architecture Auditor

Launch with Agent tool (subagent_type: general-purpose or senior-architect). Prompt:

"You are auditing the architecture of the project at `{project-path}`. Write your findings to `{output-dir}/audit/ARCHITECTURE.md`. Be exhaustive.

Cover:
1. **Repository structure**: Every top-level directory and its purpose. If monorepo, map each sub-project.
2. **Entry points**: How the app starts (main files, server configs, Docker entrypoints).
3. **Routing/URL structure**: How requests flow from entry to handler. Map all routes/endpoints.
4. **Database**: Schema, ORM, migrations, multi-tenant patterns if any.
5. **Authentication and authorization**: How users log in, how permissions work, token types.
6. **Configuration**: Environment variables, config files, feature flags, settings hierarchy.
7. **Infrastructure**: Docker services, CI/CD pipelines, deployment targets, external services.
8. **Dependencies**: Key external libraries and what they do. Note any outdated or risky ones.
9. **Build and run commands**: Exact commands to start, test, build, deploy.

For each finding, include exact file paths. Do not summarize what you think might be there; read the actual files and report what IS there."

### Subagent 2: Code Patterns Auditor

Launch with Agent tool. Prompt:

"You are auditing code patterns and conventions in the project at `{project-path}`. Write your findings to `{output-dir}/audit/PATTERNS.md`. Be exhaustive.

Cover:
1. **Naming conventions**: How files, classes, functions, variables are named. Find the pattern by reading 10+ files.
2. **Code organization**: How is code structured within each module/app/package? Is there a consistent pattern (MVC, services/selectors, controllers/models, etc.)?
3. **State management**: How is application state handled? (Redux, signals, Vuex, context, services, etc.)
4. **API patterns**: How are API endpoints structured? Request/response formats, pagination, error handling.
5. **Component/module patterns**: How are reusable pieces built? Is there a shared component library?
6. **Testing patterns**: What testing exists? Unit, integration, E2E? What frameworks? What's the coverage like?
7. **Error handling**: How are errors caught, logged, reported?
8. **Code quality tools**: Linters, formatters, type checkers, pre-commit hooks.
9. **Reusable patterns catalog**: List every reusable component, service, utility, and base class with exact file paths. For each, describe what it does, what inputs it takes, and which files use it. This becomes the component catalog.
10. **Deviations and inconsistencies**: Where does the code deviate from its own patterns? Which modules are messy?

For pattern identification, read at least 5 examples of each pattern to identify what's consistent vs. what varies. Reference specific files."

### Subagent 3: Domain and Risk Auditor

Launch with Agent tool. Prompt:

"You are auditing the business domain and risks of the project at `{project-path}`. Write your findings to `{output-dir}/audit/DOMAIN_AND_RISKS.md`. Be exhaustive.

Cover:
1. **Business domain**: What does this software do? Who are the users? What are the key entities and relationships?
2. **Domain glossary**: List every domain-specific term with a plain-language definition.
3. **Key workflows**: Trace 3-5 critical user journeys end to end (e.g., user registers, places an order, admin creates content). Show which files are touched at each step.
4. **Data flow traces**: Pick 2-3 complex operations and trace the data from user action through every layer to database and back.
5. **Critical risks**: Bugs that would crash if triggered, security vulnerabilities, data integrity risks. For each: file path, line number, what goes wrong, business impact.
6. **Performance concerns**: N+1 queries, unbounded loops, missing pagination, large file handling.
7. **Technical debt**: Duplicated code, half-completed migrations, dead code, TODO/FIXME items, inconsistent patterns.
8. **Missing features**: What the code structure implies should exist but doesn't (empty test files, stub implementations, commented-out features).

Rate each risk as Critical (data loss/security), High (crashes if triggered), Medium (developer friction), or Low (cosmetic). Include exact file paths and line numbers."

### Iteration loop for audit files (mandatory)

After all three subagents return:

1. **Verify each file exists on disk:** `ls -la {output-dir}/audit/`
2. **Verify each file is 10KB+:** `wc -c {output-dir}/audit/*.md`
3. **If any file is missing or under 10KB → REJECT and re-run that auditor.** Common cause: Explore subagent type (read-only). Re-run with general-purpose subagent.
4. **Spot-check coverage:** open each file and verify it covers every numbered item in its prompt. If sections are missing → re-run with feedback.
5. **Spot-check file references:** each audit must contain 30+ exact file paths. If fewer → audit was shallow → re-run.

Do not proceed to synthesis until all three audit files pass quality checks.

### After all three subagents complete

Read all three audit files. Synthesize them into two documents:

**`{output-dir}/audit/PROJECT_GUIDE.md`** — The human-readable guide. Written for the team type identified in Phase 0. If the team are non-developers, explain everything without jargon (e.g., "Think of schemas as separate filing cabinets"). Structure:

1. The Big Picture (what this software does, who uses it)
2. Architecture (how the pieces connect, with analogies)
3. Key Workflows (step-by-step user journeys)
4. How to Run It (commands, URLs, credentials if findable)
5. Risk Areas (what to be careful about)
6. Reusable Patterns (what already exists to build on)

**`{output-dir}/audit/MACHINE_CONTEXT.md`** — The machine-optimized reference. Dense, exact, no analogies. Structure:

1. Codebase Map (directory tree with annotations)
2. Architecture Patterns (with code examples)
3. Implementation Recipes (how to add a new feature, step by step)
4. Danger Zones (every risk with file:line references)
5. Per-Module Quick Reference (every module/app summarized)
6. Component Registry (every reusable piece with exact paths)

Update STATE.json: phase 1 complete.

Report: "Audit complete. Found {X} apps/modules, {Y} risks ({Z} critical), {W} reusable patterns. Starting ecosystem design..."

---

## PHASE 2: DESIGN THE ECOSYSTEM (10-15 minutes, both modes)

**For existing projects:** Read `{output-dir}/audit/MACHINE_CONTEXT.md` and `{output-dir}/audit/PROJECT_GUIDE.md` IN FULL. Do not skim. The design quality is bounded by how well you understand the audit.
**For new projects:** Read `{output-dir}/discovery/REQUIREMENTS.md`, `{output-dir}/discovery/TECH_DECISIONS.md`, and `{output-dir}/scaffold/MANIFEST.md`. The scaffolded code IS your "audit" since you just created it and know every pattern.

### Reference quality examples

Read existing high-quality Claude Code ecosystems as the quality bar before designing. Good reference ecosystems exhibit:

- A project-specific `CLAUDE.md` (not generic) at the repo root
- Dedicated subagents in `.claude/agents/` with real file-path references (not just abstract descriptions)
- A `.claude/skills/` directory with named, domain-specific skills
- Service or code-pattern rules in `.claude/rules/`
- A `COMPONENT_CATALOG.md` or equivalent that names every reusable piece

Study reference ecosystems for: depth, file path density, project specificity, real code examples, the "search the codebase first" directive, color choices, tool selections, frontmatter format.

If you do not have your own reference ecosystem, ask the user for a public one to study, or inspect the ecosystem of a well-run open-source project the user trusts.

Design a custom Claude Code ecosystem. The design must be SPECIFIC to this project, not generic. Every agent, skill, and rule must reference actual patterns, files, and conventions found in the audit.

### Agents

Determine which agents this project needs based on:

**Always create (for any project):**
- A code reviewer agent (knows the project's patterns, checks compliance)
- A feature planner agent (translates business language to technical plans)

**Create if the project has a UI (web app, mobile app, dashboard, etc.):**
- A `ui-verifier` agent — uses Playwright MCP to navigate the running app, take screenshots, check console errors, verify changes work end-to-end. **This is mandatory for any project with a browser-renderable UI.**

**Create based on tech stack:**
- One development agent per major sub-project (e.g., backend agent, frontend agent, mobile agent). Each knows that sub-project's specific patterns, frameworks, and conventions.
- If multi-tenant/multi-user: a safety checker agent (data isolation audit)
- If database-heavy: a migration planner agent (shows SQL, assesses risk)
- If the project has complex integrations: an integration checker agent

**Create based on team type:**
- If non-developer team: a researcher agent (cross-industry innovation, options with pros/cons)
- If non-developer team: an explainer skill (code to business language)

For each agent, define:
- Name (kebab-case)
- Model: opus
- Tools (read-only for auditors, full for developers)
- Color
- Complete system prompt referencing actual codebase patterns, actual file paths, actual conventions. Include: "The team are not developers. Explain everything in business language." if team type is non-dev. Include: "Before creating anything new, search for similar implementations in the codebase."

**MANDATORY for every frontend/UI agent:** Add a non-negotiable rule to its system prompt that says: "After every UI change, you MUST invoke the `ui-verifier` agent via the Task tool, wait for the verification report, and only report success after verification PASSES. If verification FAILS, fix the issue and re-verify. Include the verifier's verdict in your final report."

This rule ensures that no UI change is reported as done until it has been actually tested in a browser. It's the difference between "the code compiles" and "the page works."

### Skills

Determine which skills based on project needs:

**Always create:**
- `/xx:plan` — Planning pipeline (discovery questions, research if non-dev team, PRD, task prompts). Adapted to this project's workflow.
- `/xx:review` — Code review + any safety checks combined
- `/xx:save` — Save session state to workspace
- `/xx:continue` — Resume from saved state
- `/xx:test` — Smart test runner for this project's test setup

**Create if the project has a UI:**
- `/xx:verify-ui` — Manual wrapper for the ui-verifier agent. Lets the team verify a page on demand without making changes. Useful for "did my last session actually work?" checks.

**Create based on needs:**
- `/xx:deploy-check` — Pre-merge validation. **For projects with a UI, this skill MUST include a UI verification step that runs the ui-verifier agent on changed frontend files.**
- `/xx:explain` — Business language explainer (if non-dev team)
- `/xx:db-change` — Migration safety (if database-heavy)
- Any project-specific skills identified from the pain points

The `xx` prefix should be a 2-3 letter abbreviation of the project name.

### Rules

Create rules files based on what the audit found:
- One per major coding convention (backend patterns, frontend patterns, etc.)
- One for the domain glossary (if the project has domain-specific terminology)
- One per critical safety concern (data isolation, security patterns, etc.)
- One for API conventions (if the project has APIs)
- One for testing expectations

Each rule must have proper frontmatter with `description:` and `globs:` scoped to the relevant files.

### Hooks

Design hooks based on the project's tools:
- PostToolUse: auto-format after file saves (detect which formatter the project uses: ruff, prettier, eslint, rustfmt, gofmt, etc.)
- PostToolUse: safety warnings for patterns identified as risky in the audit
- PreToolUse: block dangerous operations (migrations, dependency installs, destructive commands)

### CLAUDE.md

Design the main CLAUDE.md (under 250 lines):
- Project identity (one paragraph)
- Critical safety rules
- Essential commands (from the audit)
- Architecture brief
- Communication style (adapted to team type)
- **Mandatory Agent Workflow section** (see below)
- What NOT to do
- @import references to all rules files

### Mandatory Agent Workflow (MUST be in every CLAUDE.md)

Every CLAUDE.md generated by devtakeover MUST include a section titled "Mandatory Development Workflow" that enforces the orchestrator pattern. Claude is the coordinator, NOT the implementor. The section must contain:

1. **A CRITICAL rule** at the top: "Never implement code changes directly. Claude acts as the orchestrator: reads the request, picks the right agents and skills, delegates the work, and synthesizes results. Direct code edits are only acceptable for trivial changes (constants, typos). Anything touching business logic, models, views, services, components, or templates MUST go through the appropriate agent."

2. **Agent reference table** listing every agent created for the project, with columns: Agent name, When to use, Tools available.

3. **Required workflow steps:**
   - Step 1: Understand the request (read code, check component catalog)
   - Step 2: Plan (use feature-planner or the project's plan skill for non-trivial features)
   - Step 3: Implement via surface agents (delegate to the correct agent; for cross-surface features, run agents in parallel)
   - Step 4: Verify (run test skill after backend changes, verify-ui after frontend changes, review skill after any changes)

4. **Skill reference table** with columns: Command, Purpose, When to use. The "When to use" column is critical because it tells Claude when to trigger each skill proactively, not just when the user asks.

5. **Orchestrator vs Agent responsibility matrix** showing what Claude does (reads request, writes agent prompts, synthesizes results, explains to team, runs verification skills) vs what agents do (reads patterns, implements code, runs builds/tests, follows component catalog).

6. **A matching rules file** (`.claude/rules/{prefix}-workflow.md`) with NO globs restriction so it loads on every file. This contains a condensed version of the same mandate: "Claude is the orchestrator. Delegate to {agent-name} for backend, {agent-name} for frontend, etc. After implementation, run /xx:test, /xx:verify-ui, /xx:review."

This pattern is the standard for all projects going forward. Without it, Claude defaults to implementing everything itself, which bypasses the specialized agents and their deep knowledge of project conventions.

### Write the design document

Save the complete design to `{output-dir}/design/ECOSYSTEM_DESIGN.md` with every agent, skill, rule, and hook fully specified.

### Checkpoint: Present and get approval

Present a summary to the user:
- How many agents, skills, rules, hooks
- One-line description of each agent and skill
- The safety guardrails
- Ask: "Does this look right? Any changes before I build everything?"

Wait for approval. Adjust if requested.

Update STATE.json: phase 2 complete.

---

## PHASE 3: IMPLEMENT EVERYTHING (20-30 minutes)

Read `{output-dir}/design/ECOSYSTEM_DESIGN.md` IN FULL.

Create all files in the project directory. Use parallel subagents at the right granularity.

### Quality bar per file type

| File type | Min size | Required content |
|-----------|----------|-----------------|
| CLAUDE.md | 100 lines | Project identity, 6+ safety rules, commands, architecture brief, danger zones, @imports |
| Rules file | 50 lines | Frontmatter on line 1, project-specific patterns with code examples, glob scope |
| Agent | 150 lines | Frontmatter, model: opus, tools, 5+ example trigger phrases, 5+ actual file path references, "search first" directive |
| Skill | 60 lines | Frontmatter (name, description, user_invocable: true), complete workflow with bash commands, when to use, example output |
| settings.json | valid JSON | Permissions allow/deny, at least 1 PostToolUse hook |
| COMPONENT_CATALOG.md | 100 lines | Every reusable component with file path, purpose, key props |

**If a generated file does not meet the quality bar, REJECT and regenerate.**

### Parallelization strategy: spawn one subagent per file group, not one per phase

Launch subagents in parallel (single message, multiple Agent calls). Use `senior-architect` subagent type for these (it has Write tool access).

**Parallel batch:**
- Subagent A: Creates ALL rules files (4-6 files)
- Subagent B: Creates ALL agent files (3-5 files)
- Subagent C: Creates ALL skill files (5-8 files in subdirectories)
- Subagent D: Creates COMPONENT_CATALOG.md
- Subagent E: Creates working directory (.{project}flow/) with README.md and subdirs

After all 5 subagents complete, the MAIN agent creates these (small, need precise assembly):
- `CLAUDE.md` — under 250 lines, all @imports valid, MUST include the "Mandatory Development Workflow" section from Phase 2 design (agent table, workflow steps, skill table, orchestrator vs agent matrix)
- `.claude/settings.json` — valid JSON with hooks and permissions
- `BUSINESS_CONTEXT.md` (only if team is non-dev)

### Subagent A: Rules files

Each rules file must:
- Have frontmatter on line 1 (`---` with NO blank line before it)
- Include `description:` and `globs:` in frontmatter
- Contain 50+ lines of project-specific content (actual patterns, actual file paths, actual conventions from the audit)
- Include code examples from the actual codebase
- No placeholder content

### Subagent B: Agents

Each agent file must:
- Have frontmatter on line 1
- Include `name`, `description` (with quoted string and examples), `model: opus`, `color`, `tools`
- System prompt 150+ lines, project-specific
- Reference at least 5 actual file paths from the audit
- Include 5+ example trigger phrases in the description
- Include "Before creating anything new, search the codebase for similar implementations first"
- Include "The team are not developers. Explain everything in business language." if team type is non-dev

### Subagent C: Skills

Each skill file must:
- Be in the correct subdirectory structure (`.claude/skills/{name}/SKILL.md`)
- Have `name`, `description`, `user_invocable: true` in frontmatter
- Have 60+ lines of complete workflow (not stubs)
- Reference the project's actual tools, commands, and conventions
- Include bash commands the user can copy

### Subagent D: COMPONENT_CATALOG.md

Must catalog EVERY reusable component from the audit. Group by category. For each: file path, one-line purpose, where it's used, key props.

### Subagent E: Working directory

Create the working directory (e.g., `.{project}flow/`) with:
- `README.md` explaining what this directory is for
- Empty subdirs: `features/`, `sessions/`, `reviews/`

### Main agent: CLAUDE.md + settings.json

Create these directly:

**CLAUDE.md** (under 250 lines, all @imports valid):
- Project identity (one paragraph)
- Critical safety rules
- Essential commands
- Architecture brief
- **"Mandatory Development Workflow" section** — this is NON-NEGOTIABLE. It must include:
  - CRITICAL rule: "Never implement code changes directly. Claude is the orchestrator."
  - Agent reference table (every agent created, when to use, tools)
  - Required 4-step workflow (understand → plan → implement via agents → verify via skills)
  - Skill reference table with "When to use" column
  - Orchestrator vs Agent responsibility matrix
- Communication style (adapted to team type)
- What NOT to do
- @import references to all rules files (including the workflow rule)

**`.claude/rules/{prefix}-workflow.md`** (NO globs, always loaded):
- Condensed version: "Claude is the orchestrator. Delegate to {agent} for {surface}. After implementation, run /xx:test, /xx:verify-ui, /xx:review."

**`.claude/settings.json`** — valid JSON with hooks and permissions

### Iteration loop for implementation (mandatory)

After all subagents complete:

1. **List all created files with sizes:** `find .claude -type f -exec wc -l {} \;`
2. **Check sizes against quality bar table above.** Any file under the minimum → REJECT, send back to that subagent for expansion.
3. **Verify all @imports in CLAUDE.md point to existing files.** Run `grep "@import" CLAUDE.md` and check each path exists.
4. **Verify all agents have frontmatter on line 1.** `head -1 .claude/agents/*.md` should all be `---`.
5. **Verify all skills are in correct subdirectory structure.** `ls .claude/skills/*/SKILL.md` should list all skills.
6. **Verify settings.json is valid JSON.** `cat .claude/settings.json | python3 -m json.tool > /dev/null`
7. **Verify no file contains placeholder content.** `grep -l "TODO\|PLACEHOLDER\|FIXME\|TBD" .claude/` should return nothing.
8. **Spot-check content depth.** Read 1 agent and 1 skill end-to-end. Are they project-specific or generic? If generic → reject and regenerate.

Write the inventory to `{output-dir}/implementation/INVENTORY.md`.

Update STATE.json: phase 3 complete.

Report file counts AND verification results AND quality check pass/fail per file.

---

## PHASE 4: GENERATE VISUAL HTML GUIDES (15-30 minutes, NOT 5-10)

**QUALITY BAR (non-negotiable): Each HTML file must be 100KB+ of rich, visual, dense content. Anything smaller is a failure.**

### Reference quality examples (READ FIRST before generating)

Before writing a single line of HTML, the generating agent MUST read these reference files to internalize the quality bar:

Use high-density, visually rich reference guides as your quality bar. A good reference HTML file is 100KB+, dense with diagrams, cards, code blocks, stat grids, flow charts, and comparison tables.

One public example: <https://amadejdemsar-create.github.io/my-claude-setup/> (the "My Claude Code Setup" showcase page, ~190KB dense HTML).

If you do not have reference files yourself, ask the user to provide URLs or local paths to visual HTML guides they trust. Without a reference bar to measure against, visual output will default to a generic docs look.

Study reference files for: information density, visual variety (diagrams, cards, code blocks, stat grids, flow charts, comparison tables), heading rhythm, color usage, typography hierarchy, interactive elements, how information is made both scannable and deep.

### Correct subagent for HTML generation

**Use `design-visionary` subagent, NOT `senior-architect`.** This is visual/UX work, not code. The design-visionary agent has the right instincts for visual hierarchy, aesthetics, and density.

If that agent is unavailable, the main agent must read the reference files and generate the HTML directly, not delegate to a code-focused subagent.

### Iteration loop (mandatory)

1. Generate the 3 HTML files
2. Check file sizes: `wc -c guides/*.html`
3. If ANY file is under 100KB → REJECT and regenerate with more content. Do not accept undersized guides.
4. Open one in a browser and visually compare to the reference files. Is the density comparable? Is the polish comparable?
5. If not, send back for another pass with specific feedback (more diagrams, more code examples, more visual variety, etc.)

### Generate standalone HTML files using this design system:

### Visual Design Tokens (Dark Theme)

```css
:root {
  --bg: #06060c;
  --bg2: #0a0a12;
  --card: #0e0e18;
  --card-hover: #141422;
  --border: #1a1a2e;
  --text: #e4e4f0;
  --text-dim: #7a7a96;
  --accent: #00d4aa;
  --accent-glow: rgba(0, 212, 170, 0.1);
  --accent2: #6c5ce7;
  --accent2-glow: rgba(108, 92, 231, 0.08);
  --blue: #448aff;
  --blue-glow: rgba(68, 138, 255, 0.08);
  --green: #00c853;
  --green-glow: rgba(0, 200, 83, 0.1);
  --red: #ff5252;
  --red-glow: rgba(255, 82, 82, 0.08);
  --orange: #ff9100;
  --orange-glow: rgba(255, 145, 0, 0.08);
  --purple: #6c5ce7;
  --cyan: #00b4d8;
  --yellow: #ffd600;
}
```

### Required HTML files

**1. `{output-dir}/guides/01-architecture.html`** — Project architecture (MUST be 100KB+)
- Hero section with stats row (file count, model count, endpoint count, etc.)
- The Big Picture: entity cards with detailed explanations
- Tech Stack: grid of 10+ technology cards with versions AND why each was chosen
- Entity Model: visual ERD showing all models with fields, relationships, indexes
- Architecture Layers: multi-layer pipeline visualization with actual file examples for each layer
- Request Flow: end-to-end trace of a key operation with code snippets at each step
- Data Models Deep Dive: detailed cards for EACH model with fields, indexes, relationships
- View/Feature System: grid covering all major features
- Risk Areas: EVERY identified risk from the audit with severity badges and file:line references (not just top 5)
- Deployment architecture diagram

**2. `{output-dir}/guides/02-ecosystem.html`** — The Claude Code ecosystem (MUST be 100KB+)
- Hero with stats (agent count, skill count, rule count, hook count)
- Why This Exists: explain devtakeover concept and the quality goal
- EACH Agent: large detailed card with full purpose, tool list, 5+ example trigger phrases, what patterns it enforces, actual file references it knows
- EACH Skill: detailed card with command syntax, step-by-step workflow, when to use, example output
- CLAUDE.md Breakdown: all safety rules as cards, each explaining WHY and what could go wrong
- Rules Files: card per rules file with code examples
- Safety System: hooks visualized
- Danger Zones: warning cards documenting known fragile areas with specific remediation steps
- Working Directory: structure visualization
- Component Catalog: stats and category breakdown

**3. `{output-dir}/guides/03-usage-guide.html`** — Daily workflow (MUST be 100KB+)
- Hero
- Getting Started: terminal walkthrough with code blocks
- The Daily Loop: visual flow (plan → implement → test → review → ship)
- Common Tasks: 10+ task recipe cards with step-by-step, code references, gotchas
- Architecture Recipes: FULL code examples with syntax highlighting for every major pattern (new service method, new API route, new hook with cache invalidation, new MCP tool, etc.)
- Commands Reference: comprehensive table of all commands
- Entity Quick Reference: compact table mapping entities to service/hooks/routes/tools/components
- Troubleshooting: 10+ common issues with Symptom / Cause / Fix pattern
- Deployment walkthrough
- Session handoff flow

All HTML files must:
- Use the same sticky navigation bar linking all pages
- Font: Inter for body, Playfair Display for headings
- Be fully responsive (mobile breakpoints)
- Work as standalone files (no external dependencies except Google Fonts)
- Use the visual pattern: section-label (uppercase, colored) > section-title (large serif) > section-sub (gray description) > content cards

### Also generate (if applicable):

**4. `{output-dir}/guides/04-component-library.html`** — Reusable component visual reference
Only generate this if the project has a significant shared component library (5+ reusable components found in the audit). Show each component with a description and where to find it in the live app.

Save all HTML files. Update STATE.json: phase 4 complete.

---

## PHASE 5: PACKAGE FOR DISTRIBUTION (5-10 minutes)

### Reference quality example

If you have previous config repos, read them first to internalize the structure and quality bar. A good config repo exhibits:

- A `setup.sh` that idempotently installs all agents, skills, rules, and hooks
- A `README.md` that explains the project, each agent's role, and the install procedure in plain language
- The same directory structure as `~/.claude/` so files can be copied directly
- A changelog or versioning note so team members know when to re-run setup

Create `{output-dir}/config-repo/` with:

```
config-repo/
  README.md           # Setup instructions
  setup.sh            # Copies files into the project
  agents/             # All agent .md files
  skills/             # All skill subdirectories
  rules/              # All rule .md files
  settings.json       # Hooks and permissions
  CLAUDE.md           # Main instructions
  COMPONENT_CATALOG.md
  BUSINESS_CONTEXT.md (if created)
  {workdir}/README.md  # Working directory readme
```

The `setup.sh` must:
- Accept the project path as argument
- Validate the path looks like the right project (check for key files)
- Create all necessary directories
- Copy all files to the right locations
- Run `git update-index --skip-worktree` on tracked files that get overwritten
- Print a summary of what was installed
- Print next steps

The `README.md` must explain:
- What this repo contains
- How to run setup
- How to update when config changes

Optionally ask: "Want me to create a GitHub repo and push this? (y/n)"

Update STATE.json: phase 5 complete.

---

## COMPLETION

### MANDATORY: Run the deliverables checklist before declaring done

You MUST go through every item from the DELIVERABLES CHECKLIST at the top of this skill and mark each one. You may NOT skip this step. You may NOT use the words "complete", "done", "finished", "ready" unless every item is DONE.

Present this exact format:

```
DELIVERABLES CHECKLIST RESULT
==============================

Phase 0: Project profile + workspace + STATE.json — DONE
Phase 1-E: audit/ARCHITECTURE.md (10KB+, exhaustive) — DONE (12KB, 47 file refs)
Phase 1-E: audit/PATTERNS.md (10KB+, exhaustive) — DONE (15KB, 52 file refs)
Phase 1-E: audit/DOMAIN_AND_RISKS.md (10KB+, exhaustive) — DONE (13KB, 38 file refs)
Phase 1-E: audit/PROJECT_GUIDE.md — DONE
Phase 1-E: audit/MACHINE_CONTEXT.md — DONE
Phase 2: design/ECOSYSTEM_DESIGN.md — DONE
Phase 3: CLAUDE.md at project root — DONE (180 lines, all imports valid)
Phase 3: .claude/rules/*.md — DONE (5 files: backend, frontend, api, testing, safety)
Phase 3: .claude/agents/*.md — DONE (4 agents, all 150+ lines, all reference 5+ files)
Phase 3: .claude/skills/{name}/SKILL.md — DONE (6 skills)
Phase 3: .claude/settings.json — DONE (valid JSON, hooks + permissions)
Phase 3: .claude/COMPONENT_CATALOG.md — DONE (340 lines, 92 components)
Phase 3: {workdir}/ with README and subdirs — DONE
Phase 3: implementation/INVENTORY.md — DONE
Phase 4: guides/01-architecture.html — DONE (124 KB)
Phase 4: guides/02-ecosystem.html — DONE (118 KB)
Phase 4: guides/03-usage-guide.html — DONE (109 KB)
Phase 5: config-repo/ with README, setup.sh, all configs — DONE

ALL DELIVERABLES: DONE
```

If ANY item is SKIPPED or NOT DONE, you must instead present:

```
DELIVERABLES CHECKLIST RESULT
==============================

[mark every item with DONE / SKIPPED (reason) / NOT DONE (reason)]

ALL DELIVERABLES: PARTIALLY COMPLETE
Skipped/missing: [list]

This run is NOT complete. To finish:
[specific next steps to complete the missing items]
```

DO NOT use the word "complete" in your summary unless every checkbox is DONE.

### Final summary (only after all checkboxes are DONE)

```
PROJECT TAKEOVER COMPLETE
==========================

Project: {name}
Stack: {tech stack}
Time: {total duration}

Created:
  {X} agents — specialized AI assistants for this codebase
  {Y} skills — slash commands for common workflows
  {Z} rules — coding standards and safety guards
  {W} hooks — automatic formatting and safety checks

Guides:
  {list of HTML files with paths and SIZES}

Config repo:
  {path to config-repo/}
  Setup: cd config-repo && bash setup.sh {project-path}

Next steps:
  1. Review the HTML guides to understand the ecosystem
  2. Run setup.sh to install everything
  3. Open Claude Code in the project and start working
```

---

## CRITICAL RULES

1. **Never generate generic content.** Every agent prompt, every rule, every skill must reference actual patterns, files, and conventions from the audit. If the audit found that the project uses Redux for state management, the frontend agent must know Redux patterns. If the project uses a specific ORM, the backend agent must know its conventions.

2. **Frontmatter on line 1.** Every agent file must start with `---` on line 1. A blank line before it causes silent failure.

3. **Skills in subdirectories.** Every skill goes in `skills/{name}/SKILL.md`, not at the skills root.

4. **No placeholders.** If a section cannot be filled with real content from the audit, do not create it. Better to have fewer, complete files than many incomplete ones.

5. **Explain changes in before/after format.** When the ecosystem is used, Claude must explain every change as: what was the problem (visible symptom), why it happened (simple cause), what changed, before vs after (what the team will see differently), what to test.

6. **Context window management.** Use subagents for heavy work. The main conversation should orchestrate, not do all the reading. Write intermediate results to disk immediately. If context is getting long between phases, suggest `/clear` and explain how to resume with `/devtakeover status`.

7. **The HTML guides must be beautiful AND 100KB+ each.** They are the team's first impression of the ecosystem. Use the dark theme design system consistently. Every section needs a label, title, description, and visual content (cards, grids, pipelines, flow diagrams). No walls of text. Use the `design-visionary` subagent (NOT `senior-architect`) for HTML generation. Read the reference files in Phase 4 before generating.

8. **Use the right subagent type for the job.** Auditors need Write tool access (general-purpose or senior-architect, NOT Explore). Code/structure work uses senior-architect. Visual/UX work uses design-visionary. Mismatched subagent types are the #1 cause of phase failure.

9. **Iteration loops are mandatory.** Every phase has a quality check with explicit pass/fail criteria. Check sizes, check coverage, check content depth. If a deliverable fails, regenerate it. Do NOT accept undersized or shallow output.

10. **Quality bar reference files are mandatory reading.** Every phase should have reference examples of comparable work to study. Read them BEFORE generating to internalize the bar. Do not skip this step. Skipping reference files is the #2 cause of phase failure.

11. **Run the deliverables checklist before declaring complete.** The Completion phase has a mandatory checklist. You may NOT use the words "complete", "done", "finished", "ready" unless every item is DONE. If any are SKIPPED or NOT DONE, use "partially complete" and explain what remains.

12. **Under-delegation is cutting corners.** If a phase has 5 independent file groups (rules, agents, skills, catalog, working dir), spawn 5 parallel subagents. Do not serialize.

13. **Quality bar question.** Before declaring done, ask: would a SpaceX-level engineering team accept this as production-ready? If not, keep iterating.
