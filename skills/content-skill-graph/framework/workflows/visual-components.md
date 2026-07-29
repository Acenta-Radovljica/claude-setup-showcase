# Visual Components Workflow

> A framework for creating visual content elements that make abstract concepts tangible. Documents a reusable component library (component types, when to use each, and structural patterns) and the process for creating new ones. Implementation details (HTML/CSS, framework components, CMS blocks) depend on your platform as configured in [[config.md]].

References: [[brand-voice]], [[image-generation]], [[information-design]]

---

## How Visual Components Work

Visual components are structured visual elements embedded in your article content. They go beyond standard images by presenting data, comparisons, and relationships in designed layouts that communicate at a glance.

The implementation depends on your publishing platform:

- **Static site generators with custom renderers:** Inline HTML blocks with CSS in your global stylesheet
- **React/Next.js sites:** React components or raw HTML in `dangerouslySetInnerHTML` contexts
- **CMS platforms (WordPress, Ghost, Webflow):** Custom HTML blocks, shortcodes, or native visual blocks
- **Markdown-based platforms:** HTML blocks where the parser supports raw HTML passthrough

Regardless of implementation, the design patterns and component types described here are universal.

### Wrapper Pattern

Every visual component should be wrapped in a consistent container. This provides uniform spacing and shared styling:

```html
<div class="article-visual">
  <!-- Component markup here -->
</div>
```

Name this wrapper class whatever fits your CSS conventions (`.article-visual`, `.content-block`, `.visual-component`, etc.).

---

## Component Library

### 1. Capability Grid

**What it communicates:** A set of parallel capabilities, features, or functions that together paint a complete picture. Each item should be roughly equal in weight.

**Visual structure:** A grid of cards (typically 3x2 for 6 items, or 2x2 for 4 items), each with an icon, a label, and a short description. Cards have hover effects for interactivity. On mobile, cards stack vertically.

**When to use it:**
- Showing a product's core capabilities
- Listing features of a methodology or framework
- Presenting 4 to 6 equal-weight items that belong together

**Design notes:**
- Icons should be consistent in style (all line-based, all filled, or all monochrome)
- Keep descriptions under 15 words
- 6 cards works best for the 3x2 layout; 5 cards creates an unbalanced row

**Example:** Showing a tool's six core capabilities (reads files, writes files, executes commands, connects to tools, browses the web, follows instructions).

---

### 2. Analogy Visual

**What it communicates:** A direct parallel between two things, showing that the same pattern or principle applies to both. The visual weight of the connector makes the comparison feel inevitable.

**Visual structure:** Two cards side by side with a connector between them (equals sign, arrow, or custom symbol). Each card has a logo/icon, a title, and a subtitle. On mobile, the cards stack vertically.

**When to use it:**
- Drawing direct parallels between familiar and unfamiliar concepts
- Showing that the same pattern repeats in different domains
- Making abstract concepts concrete through comparison

**Design notes:**
- Use official logos for both sides (adds instant recognition)
- Keep subtitles to 2 short lines for visual balance
- The = symbol works best for parallel analogies; use an arrow for causal or evolutionary relationships
- Keep titles short (1 to 2 words)

**Example:** Excel (built for accountants, now used by everyone) = Claude Code (built for developers, works for everyone).

---

### 3. Ecosystem Map

**What it communicates:** How a central system or tool connects to many peripheral tools, services, or capabilities. Effective for showing scale and breadth.

**Visual structure:** A radial hub-and-spoke layout. A central node sits at the top, with connector lines leading to categorized groups below. Each group has a colored header dot, a category label with a count, and pill-shaped nodes for individual items. The center node can have a subtle pulse animation.

**When to use it:**
- Tool integration ecosystems
- Platform architectures (core + plugins/extensions)
- Organizational structures (central team + departments)
- Any "one to many" relationship where categories matter

**Design notes:**
- Color-code each category for visual differentiation
- Node labels should be 1 to 3 words
- The sublabel under the center name should be a brief descriptor
- Three categories work well visually; a fourth requires additional styling

**Example:** A tool as the central brain, with rings for Agents (27), MCP Connections (16+), and Knowledge System.

---

### 4. Adoption Gap Visual

**What it communicates:** A surprising gap between expectation and reality. The visual weight difference between the hero stat and the reality stats communicates the argument before the reader processes the numbers.

**Visual structure:** A large hero stat sits at the top inside a glowing or emphasized card. Below a labeled divider ("but in reality"), smaller stat cards show the contrasting reality. A takeaway line closes the visual.

**When to use it:**
- Revealing gaps between stated adoption and actual results
- Showing expectation vs reality with data
- Any situation where contrasting data points tell a story

**Design notes:**
- Every number MUST have a real source. Never fabricate statistics.
- The divider label can be customized ("but in reality", "meanwhile", "the actual numbers", etc.)
- Use a failure/negative color accent sparingly (one stat maximum) to draw attention to the most striking contrast
- The takeaway should be one sentence that captures the argument the numbers support
- Three reality stats work best visually for a 3-column grid

**Example:** 88% adoption vs. 5% meaningful adoption, 1% maturity, 95% pilot failure.

---

### 5. Terminal Block

**What it communicates:** Terminal commands, CLI examples, or bash scripts in a familiar terminal window interface.

**Visual structure:** A simulated terminal window with traffic light dots in the title bar, a label, and monospace code with `$` prompts. Dark background with styled text.

**Implementation:** Most content platforms support code blocks with language tags. Use ` ```bash ` (or `terminal`, `shell`, `sh`) to trigger terminal-style rendering. If your platform does not auto-style these, create the HTML structure manually.

---

### 6. Prompt / Input Block

**What it communicates:** An example prompt, query, or input that readers can copy and use themselves.

**Visual structure:** A styled input interface with a prompt icon or caret, monospace text, and a "Copy" button. Designed to look like the interface of the tool being discussed.

**Implementation:** Use a custom code block language tag (e.g., ` ```prompt `) if your renderer supports it, or build the HTML structure manually with a copy-to-clipboard button.

---

## Creating New Visual Components

When an article needs a visual that does not fit any existing component, follow this process:

### Step 1: Design

Determine the visual's purpose. Provide:
- What concept the visual needs to communicate
- What data or content goes into it
- How it fits into the article flow (what comes before and after)
- Reference any similar patterns from the existing library or from [[information-design]]

If you have a design-focused agent, delegate the design step. Otherwise, sketch the layout in your mind or on paper before coding.

### Step 2: Build the Markup

Write the markup appropriate for your platform:

```html
<div class="article-visual">
  <div class="new-component-name">
    <!-- Component structure -->
  </div>
</div>
```

Important rules:
- The markup must start with a valid block-level element for your renderer to recognize it as a visual block (not inline text)
- Use class-based styling, not inline styles (except for one-off values like specific colors on logos)
- Keep the markup clean and semantic

### Step 3: Write the Styles

Add CSS for the new component to your global or component stylesheet.

Key considerations:

**Line-height inheritance:** If your article content container sets a generous line-height for readable body text (e.g., 1.85), any visual component inside it will inherit this, which makes card layouts, grids, and compact elements look too spaced out. Reset it on your component's container:

```css
.new-component-name {
  line-height: 1;
  /* rest of styles */
}
```

**Use your design system:** Reference your brand's CSS custom properties for colors, fonts, spacing, and transitions. This keeps components consistent with the rest of your site.

**Responsive design:** Include breakpoints for tablet (~768px) and mobile (~480px). Plan for horizontal layouts to stack vertically on mobile.

**Accessibility:** Add `@media (prefers-reduced-motion: reduce)` rules for any animations or transforms. Ensure color contrast meets WCAG guidelines.

**Naming:** Use descriptive, component-specific class names to avoid conflicts with other styles.

### Step 4: Test

Verify the component:
- Renders correctly on your dev server
- Looks correct in both light and dark mode (if your site supports both)
- Is responsive (check at desktop, tablet, and mobile widths)
- Respects reduced-motion preferences
- Does not break article text flow above and below it
- Official logos are used (never generated logos)

---

## Logo Usage in Visual Components

When a visual component includes logos (common in analogy visuals and ecosystem maps):

- Use `<img>` tags pointing to your assets directory
- Always include meaningful `alt` text: `alt="Claude Code logo"`, not `alt="logo"`
- Let your CSS handle sizing; do not set width/height on the `<img>` tag unless overriding
- NEVER use AI image generators to create logos. Always source official logos. See [[image-generation]] for the logo search protocol.

---

## Component Decision Guide

| What you want to show | Component |
|------------------------|----------|
| 4 to 6 parallel capabilities or features | Capability Grid |
| "A is to B as C is to D" comparison | Analogy Visual |
| A central system connected to many tools | Ecosystem Map |
| A surprising gap between two data sets | Adoption Gap Visual |
| Terminal/CLI commands | Terminal Block |
| A copyable prompt or input | Prompt Block |
| Something that fits none of the above | Create a new component (follow the process above) |

For additional patterns (timelines, funnels, quadrant matrices, layer stacks), see [[information-design]].
