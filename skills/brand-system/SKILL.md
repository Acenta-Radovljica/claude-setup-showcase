---
name: brand-system
description: "Brand identity creation (voice, messaging, visual identity), three-layer design-token architecture (primitive/semantic/component), and shadcn/ui + Tailwind implementation reference. Use when creating or defining a brand, building design tokens or a design system, or implementing shadcn/Tailwind styling and theming. The pipeline: Part 1 brand creates, Part 2 tokens encode, Part 3 UI implements."
argument-hint: "[part] [args]"
license: MIT
metadata:
  author: claudekit
  version: "1.0.0"
---

# Brand System

Merged from the claudekit ckm skill pack (MIT). One skill covering three composed lanes: brand identity (Part 1), design tokens (Part 2), and UI styling (Part 3). Brand creates, tokens encode, UI implements.

## ⚠️ LOCAL ENVIRONMENT OVERRIDES, READ FIRST (these supersede everything below, all three parts)

This machine uses a fixed toolchain. These rules override every command, script reference, and instruction in the rest of this file:

1. **No Google Gemini, ever.** `GEMINI_API_KEY` / `GOOGLE_API_KEY` are intentionally not set and will not be. Do not call any `--model gemini-*` API and do not recreate any deleted Gemini scripts.
2. **Image generation → Codex prompt workflow.** When a background or visual needs to be generated rather than fetched, do NOT call any image API. Instead invoke the **`image-director`** skill, which writes a self-contained image-generation prompt and renders it at quality:high via the Codex built-in image_gen tool (built-in only, never an API, never Gemini). Token architecture, slide generation, and HTML/Chart.js work are unaffected and proceed normally.
3. **Stock backgrounds and web fetch.** `design-system/scripts/fetch-background.py` plus its curated Pexels/Unsplash URLs stay valid; use them for slide and section backgrounds as designed. For imagery beyond that curated set, or any other web lookup (fonts, references, broader image search), use the Firecrawl CLI (`firecrawl search "<query>"` to discover, `firecrawl scrape <url>` to pull; flags in `~/.claude/skills/firecrawl/SKILL.md`). Both are valid; Firecrawl is the catch-all.

---

# Part 1: Brand

Brand identity, voice, messaging, asset management, and consistency frameworks.

## When to Use

- Brand voice definition and content tone guidance
- Visual identity standards and style guide development
- Messaging framework creation
- Brand consistency review and audit
- Asset organization, naming, and approval
- Color palette management and typography specs

## Quick Start

**Inject brand context into prompts:**
```bash
node brand/scripts/inject-brand-context.cjs
node brand/scripts/inject-brand-context.cjs --json
```

**Validate an asset:**
```bash
node brand/scripts/validate-asset.cjs <asset-path>
```

**Extract/compare colors:**
```bash
node brand/scripts/extract-colors.cjs --palette
node brand/scripts/extract-colors.cjs <image-path>
```

## Brand Sync Workflow

```bash
# 1. Edit docs/brand-guidelines.md (or use /brand update)
# 2. Sync to design tokens
node brand/scripts/sync-brand-to-tokens.cjs
# 3. Verify
node brand/scripts/inject-brand-context.cjs --json | head -20
```

**Files synced:**
- `docs/brand-guidelines.md` is the source of truth
- `assets/design-tokens.json` holds token definitions
- `assets/design-tokens.css` holds CSS variables

## Subcommands

| Subcommand | Description | Reference |
|------------|-------------|-----------|
| `update` | Update brand identity and sync to all design systems | `brand/references/update.md` |

## References

| Topic | File |
|-------|------|
| Voice Framework | `brand/references/voice-framework.md` |
| Visual Identity | `brand/references/visual-identity.md` |
| Messaging | `brand/references/messaging-framework.md` |
| Consistency | `brand/references/consistency-checklist.md` |
| Guidelines Template | `brand/references/brand-guideline-template.md` |
| Asset Organization | `brand/references/asset-organization.md` |
| Color Management | `brand/references/color-palette-management.md` |
| Typography | `brand/references/typography-specifications.md` |
| Logo Usage | `brand/references/logo-usage-rules.md` |
| Approval Checklist | `brand/references/approval-checklist.md` |

## Scripts

| Script | Purpose |
|--------|---------|
| `brand/scripts/inject-brand-context.cjs` | Extract brand context for prompt injection |
| `brand/scripts/sync-brand-to-tokens.cjs` | Sync brand-guidelines.md to design-tokens.json/css |
| `brand/scripts/validate-asset.cjs` | Validate asset naming, size, format |
| `brand/scripts/extract-colors.cjs` | Extract and compare colors against palette |

## Templates

| Template | Purpose |
|----------|---------|
| `brand/templates/brand-guidelines-starter.md` | Complete starter template for new brands |

## Routing

1. Parse subcommand from `$ARGUMENTS` (first word)
2. Load corresponding `brand/references/{subcommand}.md`
3. Execute with remaining arguments

---

# Part 2: Design Tokens

Token architecture, component specifications, systematic design, slide generation.

## When to Use

- Design token creation
- Component state definitions
- CSS variable systems
- Spacing/typography scales
- Design-to-code handoff
- Tailwind theme configuration
- **Slide/presentation generation**

## Token Architecture

Load: `design-system/references/token-architecture.md`

### Three-Layer Structure

```
Primitive (raw values)
       ↓
Semantic (purpose aliases)
       ↓
Component (component-specific)
```

**Example:**
```css
/* Primitive */
--color-blue-600: #2563EB;

/* Semantic */
--color-primary: var(--color-blue-600);

/* Component */
--button-bg: var(--color-primary);
```

## Quick Start

**Generate tokens:**
```bash
node design-system/scripts/generate-tokens.cjs --config tokens.json -o tokens.css
```

**Validate usage:**
```bash
node design-system/scripts/validate-tokens.cjs --dir src/
```

## References

| Topic | File |
|-------|------|
| Token Architecture | `design-system/references/token-architecture.md` |
| Primitive Tokens | `design-system/references/primitive-tokens.md` |
| Semantic Tokens | `design-system/references/semantic-tokens.md` |
| Component Tokens | `design-system/references/component-tokens.md` |
| Component Specs | `design-system/references/component-specs.md` |
| States & Variants | `design-system/references/states-and-variants.md` |
| Tailwind Integration | `design-system/references/tailwind-integration.md` |

## Component Spec Pattern

| Property | Default | Hover | Active | Disabled |
|----------|---------|-------|--------|----------|
| Background | primary | primary-dark | primary-darker | muted |
| Text | white | white | white | muted-fg |
| Border | none | none | none | muted-border |
| Shadow | sm | md | none | none |

## Scripts

| Script | Purpose |
|--------|---------|
| `design-system/scripts/generate-tokens.cjs` | Generate CSS from JSON token config |
| `design-system/scripts/validate-tokens.cjs` | Check for hardcoded values in code |
| `design-system/scripts/search-slides.py` | BM25 search + contextual recommendations |
| `design-system/scripts/slide-token-validator.py` | Validate slide HTML for token compliance |
| `design-system/scripts/fetch-background.py` | Fetch images from Pexels/Unsplash |

## Templates

| Template | Purpose |
|----------|---------|
| `design-system/templates/design-tokens-starter.json` | Starter JSON with three-layer structure |

## Integration

**With brand (Part 1):** Extract primitives from brand colors/typography
**With ui-styling (Part 3):** Component tokens feed the Tailwind config

**Skill Dependencies:** brand (Part 1), ui-styling (Part 3)
**Primary Agents:** ui-ux-designer, frontend-developer

## Slide System

Brand-compliant presentations using design tokens + Chart.js + contextual decision system.

### Source of Truth

| File | Purpose |
|------|---------|
| `docs/brand-guidelines.md` | Brand identity, voice, colors |
| `assets/design-tokens.json` | Token definitions (primitive to semantic to component) |
| `assets/design-tokens.css` | CSS variables (import in slides) |
| `assets/css/slide-animations.css` | CSS animation library |

### Slide Search (BM25)

```bash
# Basic search (auto-detect domain)
python design-system/scripts/search-slides.py "investor pitch"

# Domain-specific search
python design-system/scripts/search-slides.py "problem agitation" -d copy
python design-system/scripts/search-slides.py "revenue growth" -d chart

# Contextual search (Premium System)
python design-system/scripts/search-slides.py "problem slide" --context --position 2 --total 9
python design-system/scripts/search-slides.py "cta" --context --position 9 --prev-emotion frustration
```

### Decision System CSVs

| File | Purpose |
|------|---------|
| `design-system/data/slide-strategies.csv` | 15 deck structures + emotion arcs + sparkline beats |
| `design-system/data/slide-layouts.csv` | 25 layouts + component variants + animations |
| `design-system/data/slide-layout-logic.csv` | Goal to Layout + break_pattern flag |
| `design-system/data/slide-typography.csv` | Content type to Typography scale |
| `design-system/data/slide-color-logic.csv` | Emotion to Color treatment |
| `design-system/data/slide-backgrounds.csv` | Slide type to Image category (Pexels/Unsplash) |
| `design-system/data/slide-copy.csv` | 25 copywriting formulas (PAS, AIDA, FAB) |
| `design-system/data/slide-charts.csv` | 25 chart types with Chart.js config |

### Contextual Decision Flow

```
1. Parse goal/context
        ↓
2. Search slide-strategies.csv → Get strategy + emotion beats
        ↓
3. For each slide:
   a. Query slide-layout-logic.csv → layout + break_pattern
   b. Query slide-typography.csv → type scale
   c. Query slide-color-logic.csv → color treatment
   d. Query slide-backgrounds.csv → image if needed
   e. Apply animation class from slide-animations.css
        ↓
4. Generate HTML with design tokens
        ↓
5. Validate with slide-token-validator.py
```

### Pattern Breaking (Duarte Sparkline)

Premium decks alternate between emotions for engagement:
```
"What Is" (frustration) ↔ "What Could Be" (hope)
```

System calculates pattern breaks at 1/3 and 2/3 positions.

### Slide Requirements

**ALL slides MUST:**
1. Import `assets/design-tokens.css`, the single source of truth
2. Use CSS variables: `var(--color-primary)`, `var(--slide-bg)`, etc.
3. Use Chart.js for charts (NOT CSS-only bars)
4. Include navigation (keyboard arrows, click, progress bar)
5. Center align content
6. Focus on persuasion/conversion

### Chart.js Integration

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<canvas id="revenueChart"></canvas>
<script>
new Chart(document.getElementById('revenueChart'), {
    type: 'line',
    data: {
        labels: ['Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            data: [5, 12, 28, 45],
            borderColor: '#FF6B6B',  // Use brand coral
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            fill: true,
            tension: 0.4
        }]
    }
});
</script>
```

### Token Compliance

```css
/* CORRECT - uses token */
background: var(--slide-bg);
color: var(--color-primary);
font-family: var(--typography-font-heading);

/* WRONG - hardcoded */
background: #0D0D0D;
color: #FF6B6B;
font-family: 'Space Grotesk';
```

### Reference Implementation

Working example with all features:
```
assets/designs/slides/claudekit-pitch-251223.html
```

### Command

```bash
/slides:create "10-slide investor pitch for ClaudeKit Marketing"
```

## Best Practices

1. Never use raw hex in components; always reference tokens
2. Semantic layer enables theme switching (light/dark)
3. Component tokens enable per-component customization
4. Use HSL format for opacity control
5. Document every token's purpose
6. **Slides must import design-tokens.css and use var() exclusively**

---

# Part 3: UI Styling

Comprehensive part for creating beautiful, accessible user interfaces combining shadcn/ui components, Tailwind CSS utility styling, and canvas-based visual design systems.

## Reference

- shadcn/ui: https://ui.shadcn.com/llms.txt
- Tailwind CSS: https://tailwindcss.com/docs

## When to Use This Part

Use when:
- Building UI with React-based frameworks (Next.js, Vite, Remix, Astro)
- Implementing accessible components (dialogs, forms, tables, navigation)
- Styling with utility-first CSS approach
- Creating responsive, mobile-first layouts
- Implementing dark mode and theme customization
- Building design systems with consistent tokens
- Generating visual designs, posters, or brand materials
- Rapid prototyping with immediate visual feedback
- Adding complex UI patterns (data tables, charts, command palettes)

## Core Stack

### Component Layer: shadcn/ui
- Pre-built accessible components via Radix UI primitives
- Copy-paste distribution model (components live in your codebase)
- TypeScript-first with full type safety
- Composable primitives for complex UIs
- CLI-based installation and management

### Styling Layer: Tailwind CSS
- Utility-first CSS framework
- Build-time processing with zero runtime overhead
- Mobile-first responsive design
- Consistent design tokens (colors, spacing, typography)
- Automatic dead code elimination

### Visual Design Layer: Canvas
- Museum-quality visual compositions
- Philosophy-driven design approach
- Sophisticated visual communication
- Minimal text, maximum visual impact
- Systematic patterns and refined aesthetics

## Quick Start

### Component + Styling Setup

**Install shadcn/ui with Tailwind:**
```bash
npx shadcn@latest init
```

CLI prompts for framework, TypeScript, paths, and theme preferences. This configures both shadcn/ui and Tailwind CSS.

**Add components:**
```bash
npx shadcn@latest add button card dialog form
```

**Use components with utility styling:**
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function Dashboard() {
  return (
    <div className="container mx-auto p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Analytics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">View your metrics</p>
          <Button variant="default" className="w-full">
            View Details
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Alternative: Tailwind-Only Setup

**Vite projects:**
```bash
npm install -D tailwindcss @tailwindcss/vite
```

```javascript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
export default { plugins: [tailwindcss()] }
```

```css
/* src/index.css */
@import "tailwindcss";
```

## Component Library Guide

**Comprehensive component catalog with usage patterns, installation, and composition examples.**

See: `ui-styling/references/shadcn-components.md`

Covers:
- Form & input components (Button, Input, Select, Checkbox, Date Picker, Form validation)
- Layout & navigation (Card, Tabs, Accordion, Navigation Menu)
- Overlays & dialogs (Dialog, Drawer, Popover, Toast, Command)
- Feedback & status (Alert, Progress, Skeleton)
- Display components (Table, Data Table, Avatar, Badge)

## Theme & Customization

**Theme configuration, CSS variables, dark mode implementation, and component customization.**

See: `ui-styling/references/shadcn-theming.md`

Covers:
- Dark mode setup with next-themes
- CSS variable system
- Color customization and palettes
- Component variant customization
- Theme toggle implementation

## Accessibility Patterns

**ARIA patterns, keyboard navigation, screen reader support, and accessible component usage.**

See: `ui-styling/references/shadcn-accessibility.md`

Covers:
- Radix UI accessibility features
- Keyboard navigation patterns
- Focus management
- Screen reader announcements
- Form validation accessibility

## Tailwind Utilities

**Core utility classes for layout, spacing, typography, colors, borders, and shadows.**

See: `ui-styling/references/tailwind-utilities.md`

Covers:
- Layout utilities (Flexbox, Grid, positioning)
- Spacing system (padding, margin, gap)
- Typography (font sizes, weights, alignment, line height)
- Colors and backgrounds
- Borders and shadows
- Arbitrary values for custom styling

## Responsive Design

**Mobile-first breakpoints, responsive utilities, and adaptive layouts.**

See: `ui-styling/references/tailwind-responsive.md`

Covers:
- Mobile-first approach
- Breakpoint system (sm, md, lg, xl, 2xl)
- Responsive utility patterns
- Container queries
- Max-width queries
- Custom breakpoints

## Tailwind Customization

**Config file structure, custom utilities, plugins, and theme extensions.**

See: `ui-styling/references/tailwind-customization.md`

Covers:
- @theme directive for custom tokens
- Custom colors and fonts
- Spacing and breakpoint extensions
- Custom utility creation
- Custom variants
- Layer organization (@layer base, components, utilities)
- Apply directive for component extraction

## Visual Design System

**Canvas-based design philosophy, visual communication principles, and sophisticated compositions.**

See: `ui-styling/references/canvas-design-system.md`

Covers:
- Design philosophy approach
- Visual communication over text
- Systematic patterns and composition
- Color, form, and spatial design
- Minimal text integration
- Museum-quality execution
- Multi-page design systems

## Utility Scripts

**Python automation for component installation and configuration generation.**

### shadcn_add.py
Add shadcn/ui components with dependency handling:
```bash
python ui-styling/scripts/shadcn_add.py button card dialog
```

### tailwind_config_gen.py
Generate tailwind.config.js with custom theme:
```bash
python ui-styling/scripts/tailwind_config_gen.py --colors brand:blue --fonts display:Inter
```

## Best Practices

1. **Component Composition**: Build complex UIs from simple, composable primitives
2. **Utility-First Styling**: Use Tailwind classes directly; extract components only for true repetition
3. **Mobile-First Responsive**: Start with mobile styles, layer responsive variants
4. **Accessibility-First**: Leverage Radix UI primitives, add focus states, use semantic HTML
5. **Design Tokens**: Use consistent spacing scale, color palettes, typography system
6. **Dark Mode Consistency**: Apply dark variants to all themed elements
7. **Performance**: Leverage automatic CSS purging, avoid dynamic class names
8. **TypeScript**: Use full type safety for better DX
9. **Visual Hierarchy**: Let composition guide attention, use spacing and color intentionally
10. **Expert Craftsmanship**: Every detail matters, treat UI as a craft

## Reference Navigation

**Component Library**
- `ui-styling/references/shadcn-components.md` - Complete component catalog
- `ui-styling/references/shadcn-theming.md` - Theming and customization
- `ui-styling/references/shadcn-accessibility.md` - Accessibility patterns

**Styling System**
- `ui-styling/references/tailwind-utilities.md` - Core utility classes
- `ui-styling/references/tailwind-responsive.md` - Responsive design
- `ui-styling/references/tailwind-customization.md` - Configuration and extensions

**Visual Design**
- `ui-styling/references/canvas-design-system.md` - Design philosophy and canvas workflows

**Automation**
- `ui-styling/scripts/shadcn_add.py` - Component installation
- `ui-styling/scripts/tailwind_config_gen.py` - Config generation

## Common Patterns

**Form with validation:**
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-6">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </Form>
  )
}
```

**Responsive layout with dark mode:**
```tsx
<div className="min-h-screen bg-white dark:bg-gray-900">
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Content
          </h3>
        </CardContent>
      </Card>
    </div>
  </div>
</div>
```

## Resources

- shadcn/ui Docs: https://ui.shadcn.com
- Tailwind CSS Docs: https://tailwindcss.com
- Radix UI: https://radix-ui.com
- Tailwind UI: https://tailwindui.com
- Headless UI: https://headlessui.com
- v0 (AI UI Generator): https://v0.dev
