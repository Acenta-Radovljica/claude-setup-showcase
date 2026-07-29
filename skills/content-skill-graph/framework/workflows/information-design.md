# Information Design Patterns

> A decision framework for choosing how to visualize information. Maps the type of data or concept you want to communicate to the visual pattern that makes it easiest to understand. Works across all formats: blog articles, social slides, carousels, and presentations.

References: [[visual-components]], [[image-generation]]

---

## How to Use This Document

1. Identify what type of information you have (comparison, process, quantity, etc.)
2. Find the matching pattern below
3. Check which format it works in (blog component, social slide, or both)
4. Use the implementation reference to build it

The goal is always the same: a reader should understand the point in 3 seconds from the visual alone, before reading any surrounding text.

---

## Pattern Library

### 1. Side-by-Side Comparison

**Information type:** Two things contrasted on the same dimensions. Old vs new, with vs without, assumption vs reality, tool A vs tool B.

**How it works:** Two columns or cards placed next to each other. One side is marked negative (red/muted), the other positive (green/brand color). Each side lists 3 to 5 parallel points. A result line at the bottom summarizes the takeaway for each side.

**When to use:**
- Before/after transformations
- Debunking assumptions ("what people think" vs "what it actually does")
- Context vs no context output quality
- Pricing or feature comparison between two options

**When NOT to use:**
- Comparing more than 2 things (use a matrix instead)
- When the two sides are not directly comparable on the same dimensions
- When one side has significantly more items than the other

**Visual cues that help:**
- Color coding: red/muted for the "wrong" side, brand color for the "right" side
- Icons: X mark for negative, checkmark for positive
- Result line in a colored box at the bottom of each side

---

### 2. Stat Block

**Information type:** 1 to 3 numbers that tell a story together. The numbers should create contrast or surprise when seen side by side.

**How it works:** Large numbers (48px+) with a short label underneath and an optional source citation. Numbers arranged horizontally in equal-width columns. One number can be highlighted (brand color or red for failure stats) to draw the eye to the most surprising data point.

**When to use:**
- Opening hooks that establish a gap or problem (88% / 1% / 95%)
- ROI or time savings (4 hours to 5 minutes)
- Scale indicators (27 agents, 16+ connections, 100+ skills)

**When NOT to use:**
- When the numbers need explanation to make sense (add context below instead)
- When you have more than 4 numbers (too dense, pick the most important 3)
- When the exact number does not matter (use qualitative framing instead)

**Visual cues that help:**
- Size hierarchy: the most important number should be largest
- Color: use red for failure/negative stats, brand color for positive, amber for surprising
- Source labels in small monospace text add credibility
- A takeaway sentence below the stats ties the numbers to an argument

---

### 3. Analogy Visual

**Information type:** "A is like B" or "A = B in a different domain." Two parallel things that share a structural similarity.

**How it works:** Two cards side by side with an equals sign, arrow, or connector between them. Each card has a logo/icon, a name, and a short subtitle. The visual weight of the connector makes the comparison feel inevitable.

**When to use:**
- Explaining unfamiliar concepts through familiar ones
- Showing that the same pattern repeats in different domains
- Making abstract concepts concrete

**When NOT to use:**
- When the analogy is a stretch (if you have to explain why they are similar, the visual will not work)
- When there are more than 2 things being compared (use a matrix or grid)

**Visual cues that help:**
- Official logos for both sides add instant recognition
- Keep subtitles to exactly 2 short lines for visual balance
- The = symbol works best for parallel analogies; use an arrow for causal or evolutionary relationships

---

### 4. Hub and Spoke / Ecosystem Map

**Information type:** One central thing connected to many peripheral things, organized by category.

**How it works:** A central node (with icon and label) at the top, connected by vertical lines to categorized groups below. Each group has a colored header dot, a category label with a count, and pill-shaped nodes for individual items.

**When to use:**
- Tool integration ecosystems
- Organizational structures (central team + departments)
- Platform architectures (core product + plugins/extensions)
- Any "one to many" relationship where categories matter

**When NOT to use:**
- When relationships between the peripheral items matter (use a network graph)
- When hierarchy/depth matters (use a tree diagram)
- When there is no clear center

**Visual cues that help:**
- Color-coded categories (each ring gets its own accent color)
- Counts in the category headers show scale at a glance
- Subtle pulse animation on the center node draws the eye to the starting point
- Keep node labels to 1 to 3 words

---

### 5. Linear Flow / Process

**Information type:** A sequence of steps where order matters. Input to transformation to output.

**How it works:** Numbered or labeled boxes connected by arrows or lines, flowing left to right (horizontal) or top to bottom (vertical). Each step has a short label and optionally a brief description. The flow direction implies causation or sequence.

**When to use:**
- Explaining how a workflow operates step by step
- Setup guides (install, configure, use)
- Data pipelines (raw data to processed to output)
- Decision processes (if X then do Y, if Z then do W)

**When NOT to use:**
- When steps can happen in any order (use a grid/checklist)
- When there are more than 6 steps (simplify or group into phases)

**Visual cues that help:**
- Arrow connectors between steps make the flow direction obvious
- Number badges on each step reinforce sequence
- Color gradient from muted to bright as the flow progresses suggests improvement
- Final step in brand color signals the desired outcome
- For mobile: rotate horizontal flows to vertical with downward arrows

---

### 6. Layer Stack

**Information type:** Things that build on each other from bottom to top. Each layer depends on the one below it.

**How it works:** Horizontal bars or cards stacked vertically, wider at the bottom, narrower at the top (or equal width with visual hierarchy). Labels on each layer. Optional connecting lines or overlap to show dependency.

**When to use:**
- Architecture diagrams (infrastructure to platform to application to UI)
- Maturity models (basic to intermediate to advanced)
- Technology stacks
- Any layered dependency relationship

**When NOT to use:**
- When layers do not have a dependency relationship (use a grid instead)
- When the order is arbitrary

**Visual cues that help:**
- Bottom layers in muted colors, top layers in bright/brand colors
- Subtle border overlap between layers suggests they connect
- Labels on the left, descriptions on the right of each layer
- Arrow on the side showing "builds up"

---

### 7. Feature Matrix / Grid

**Information type:** Multiple items compared across multiple dimensions. More than 2 items, each evaluated on 3+ criteria.

**How it works:** A table or card grid where rows are items and columns are features, or cards are items with feature lists inside. Checkmarks, X marks, or values fill the intersections.

**When to use:**
- Tool comparisons across multiple criteria
- Plan/pricing comparisons
- Feature availability across product tiers
- Any situation where a reader asks "which one should I pick?"

**When NOT to use:**
- When comparing only 2 things on a few dimensions (use side-by-side instead)
- When the dimensions are not truly comparable

**Visual cues that help:**
- Highlight the recommended row/column with brand border
- Use checkmarks and X marks rather than yes/no text
- Gray out unavailable features rather than showing red X (less aggressive)
- Sticky header row for scrollable tables

---

### 8. Timeline

**Information type:** Events or milestones in chronological order. Past events, evolution, or roadmap.

**How it works:** A vertical or horizontal line with dated nodes along it. Each node has a date/year, a label, and optionally a short description. The line connects them to show progression.

**When to use:**
- Technology evolution
- Company or product history
- Roadmaps and planned phases
- "Where we were, where we are, where we are going" narratives

**When NOT to use:**
- When exact dates do not matter (use a flow instead)
- When events are not chronological

**Visual cues that help:**
- "Now" marker that highlights the current position on the timeline
- Past events in muted colors, future in brand color or dashed lines
- Alternating left/right placement prevents visual monotony
- Keep to 4 to 7 nodes; more becomes unreadable

---

### 9. Funnel

**Information type:** Progressive narrowing. Many inputs, few outputs. Each stage filters or reduces.

**How it works:** Trapezoid or narrowing bars showing volume at each stage. Top is widest (most items), bottom is narrowest (fewest items). Numbers or percentages at each level.

**When to use:**
- Adoption funnels (88% try, 5% adopt, 1% mature)
- Sales pipelines
- Content production (ideas to drafts to published)
- Any "many to few" reduction

**When NOT to use:**
- When stages do not reduce (use a flow instead)
- When the narrowing is not the point

**Visual cues that help:**
- Each level should be proportionally sized to its number
- Color shifts from cool/muted at top to warm/brand at bottom
- Percentage labels on each level
- Drop-off percentages between levels highlight where the loss happens

---

### 10. Quadrant / 2x2 Matrix

**Information type:** Items positioned along two dimensions simultaneously. High/low on X axis, high/low on Y axis.

**How it works:** A 2x2 grid with labeled axes. Items are placed in one of four quadrants based on their scores on both dimensions. Each quadrant gets a label that characterizes items in it.

**When to use:**
- Tool positioning (easy/hard to use vs narrow/broad capability)
- Priority matrices (effort vs impact)
- Market positioning (price vs capability)
- Strategy decisions (risk vs reward)

**When NOT to use:**
- When one dimension is clearly more important than the other (use a ranked list)
- When items do not map cleanly to two axes

**Visual cues that help:**
- The "best" quadrant (e.g., low effort + high impact) highlighted in brand color
- Subtle grid lines separating quadrants
- Items as small circles or labels positioned within their quadrant
- Axis labels at the edges

---

### 11. Callout / Pull Quote

**Information type:** A single statement that deserves emphasis. A key insight, a surprising claim, or a memorable phrase.

**How it works:** A large-text block visually separated from the surrounding content. Can include a left border, a background card, or quotation marks. Used inline within content to break up long text.

**When to use:**
- Key thesis statements within articles
- Quotes from authoritative sources
- Takeaway lines that summarize a section

**When NOT to use:**
- For decorative purposes (every callout should contain genuine insight)
- More than once per major section (overuse dilutes impact)

**Visual cues that help:**
- Left border in brand color
- Larger font size (1.3x to 1.5x body text)
- Slightly indented or with extra padding
- Contrasting font family for distinction from body text

---

## Decision Table

| You have... | Use this pattern | Format |
|---|---|---|
| Two things to compare | Side-by-Side Comparison | Blog + Slides |
| 1 to 3 numbers that tell a story | Stat Block | Blog + Slides |
| "A is like B" parallel | Analogy Visual | Blog + Slides |
| One thing connected to many | Hub and Spoke | Blog (slides: build from blog pattern) |
| Steps in order | Linear Flow | Both (may need template) |
| Layers that build on each other | Layer Stack | Both (may need template) |
| Multiple items, multiple criteria | Feature Matrix | Blog (too dense for slides) |
| Events over time | Timeline | Both (may need template) |
| Progressive narrowing | Funnel | Both (may need template) |
| Two-dimension positioning | Quadrant Matrix | Both (may need template) |
| One key statement to emphasize | Callout / Pull Quote | Blog + Slides |
| Product UI in action | Screenshot in Browser Frame | Slides (beta, see [[image-generation]]) |

---

## Principles

**1. One idea per visual.** If you need two concepts, make two visuals. A visual that tries to show a comparison AND a process will confuse rather than clarify.

**2. The visual should work without the surrounding text.** If someone screenshots just the visual and shares it, the point should still be clear. This also makes visuals naturally shareable on social media.

**3. Numbers are more powerful than words.** "88% of companies" hits harder than "most companies." Always prefer quantified claims with sources over qualitative statements.

**4. Contrast creates comprehension.** The most effective visuals show a gap between two things: expectation vs reality, before vs after, with vs without. The gap IS the insight.

**5. Three is the magic number.** Three stat blocks, three comparison points, three flow steps. Two feels incomplete, four starts to overwhelm. When you have more, group into threes.

**6. Color has meaning.** Red = negative/failure. Green = positive/success. Brand color = the thing you are advocating for. Muted = the old way. Do not use color randomly; it should reinforce the argument.

**7. Mobile breaks horizontal layouts.** Any pattern wider than 600px needs a stacked mobile variant. Side-by-side becomes top-and-bottom. Horizontal flows become vertical. Plan for this from the start.
