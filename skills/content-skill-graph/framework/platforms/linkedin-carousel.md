# Platform Specification: LinkedIn Carousel

> Multi-slide visual format uploaded as a PDF document on LinkedIn. One of the highest engagement formats on the platform. Each slide is a standalone point that builds toward a conclusion across the full sequence.

References: [[voice/linkedin-tone]], [[voice/x-tone]], [[workflows/image-generation]], [[engine/hooks]], [[voice/anti-patterns]], [[config.md]]

---

## What It Is

A LinkedIn carousel is a multi-slide visual format uploaded as a PDF document. Readers swipe through slides in the LinkedIn feed, making it one of the highest engagement formats on the platform. Each slide is a standalone point that also builds toward a conclusion across the full sequence.

Carousels can serve any audience. The language is determined by the target audience for each specific carousel, as configured in [[config.md]] and [[audience/]].

---

## Format Constraints

- **Slide count:** 7 slides is the standard. Range of 5 to 10 is acceptable, but 7 is the default unless the content clearly demands more or fewer.
- **Dimensions:** 1080x1350 per slide (portrait orientation). This is the LinkedIn standard for carousel content and takes up maximum feed real estate on mobile.
- **File format:** Each slide is exported as a PNG, then all slides are combined into a single PDF for LinkedIn upload.
- **Text density:** Each slide should be readable in 5 to 8 seconds. If a slide requires more than 10 seconds to read, it has too much text.
- **Language:** Use the language configured for your target audience in [[config.md]].

---

## Content Structure

### Slide 1: The Hook

Big text, bold claim, or a striking number. This is what appears in the LinkedIn feed and determines whether someone starts swiping. The hook must create enough curiosity or tension to earn the first swipe.

Design: large typography, minimal supporting text, brand consistent background. The hook should be readable from a phone screen without zooming.

### Slides 2 through 6: The Body

Each slide makes one point. Structure per slide:

- **Headline:** A clear, concise statement (1 line, 2 maximum)
- **Supporting text:** 1 to 3 sentences that explain, evidence, or contextualize the headline
- **Optional visual element:** An icon, a simple diagram, or a number/stat that reinforces the point

The slides should build toward the conclusion. Reading just the headlines in sequence should tell a coherent story.

Do not repeat information across slides. Each slide adds a new piece to the argument.

### Slide 7: The Takeaway

Summarizes the core insight or reframes it with a new angle. Optionally includes a soft CTA in the form of a question (e.g., "How many hours per week does your team spend on tasks that AI could handle in minutes?") rather than a pitch (e.g., "Contact us for...").

The question format invites comments, which drives engagement. A pitch kills the conversation.

---

## Visual Requirements

### Brand and Design

- **Background:** Use your brand colors. Dark backgrounds with light text are common for readability on mobile. Reference your brand guide or [[config.md]] for specifics.
- **Typography:** Clean, readable fonts. Headline text should be large enough to read on mobile. Body text should be at least 24px equivalent at the export resolution.
- **Layout:** Consistent layout across all slides. The headline position, text area, and brand element placement should feel unified.
- **Brand element:** Include a small logo or wordmark on each slide, positioned consistently (typically bottom left or bottom right). Subtle, not dominant.

### Production Pipeline

The carousel production process follows this general flow:

1. **Design the slides:** Create the carousel as individual slide designs. If using HTML, create an HTML file with separate `.slide` elements (one per slide).
2. **Export to PNG:** Use your image export pipeline to render each slide as a high resolution PNG. Common approaches include:
   - HTML to PNG via a headless browser tool (Puppeteer, Playwright, or similar)
   - Design tool export (Figma, Canva, or similar)
   - Programmatic image generation (e.g., satori, sharp, canvas)
3. **Combine into PDF:** Merge the individual PNGs into a single PDF for LinkedIn upload. Command line tools like ImageMagick (`convert slide-*.png carousel.pdf`) or dedicated PDF tools work for this.
4. **Upload to LinkedIn:** Upload the PDF as a document attachment on a LinkedIn post.

If you have an automated agent or script for carousel generation, reference it here.

### Dimensions and Resolution

- **Slide dimensions:** 1080x1350 (portrait, 4:5 aspect ratio)
- **Export resolution:** Export at 2x (deviceScaleFactor: 2) for retina displays, producing 2160x2700 per slide
- **Quality:** PNG export ensures crisp text and clean edges. Do not use JPEG for text heavy slides.

---

## Voice Reference

- **LinkedIn audience carousels:** Follow [[voice/linkedin-tone]]. Practical, consequence driven, written for decision makers.
- **X audience carousels:** Follow [[voice/x-tone]]. Direct, technical, written for builders and practitioners.

The carousel format demands even more compression than posts. Every word must earn its place on the slide. Remove adjectives, remove qualifiers, remove anything that does not add information.

---

## Examples

Adapt these structures with examples relevant to your brand and audience.

### Example 1: Business Audience Carousel Outline

```
Slide 1: "5 tasks your team is still doing manually (that AI handles in minutes)"

Slide 2: "1. Manual data verification"
    Your team member spends 3 hours per week comparing spreadsheets.
    An AI tool does it in 2 minutes with fewer errors.

Slide 3: "2. Writing meeting summaries"
    45 minutes after every meeting.
    Transcription and summary tool: 30 seconds.

Slide 4: "3. Answering repetitive customer questions"
    Same questions, same answers, every day.
    An AI chatbot resolves 80% of these without a human.

Slide 5: "4. Searching through internal documents"
    "Where is that document from last year?"
    AI search over your internal knowledge base: answer in seconds.

Slide 6: "5. Creating proposals from templates"
    Copy, paste, adjust the numbers, send.
    AI generates a draft proposal from client data.

Slide 7: "Total: 10+ hours per week your team could spend on work that AI cannot do."
    How many hours per week does your team spend on tasks that could be automated?
```

### Example 2: Technical Audience Carousel Outline

```
Slide 1: "Why your context file matters more than your model choice"

Slide 2: "The same model, two setups"
    Without context: generic suggestions, constant corrections.
    With a proper context file: architecturally consistent, project aware.

Slide 3: "What goes in the context file"
    Tech stack, conventions, file structure, testing patterns, deployment rules.

Slide 4: "The compound effect"
    Every prompt builds on the context. By day 3, the model
    knows your codebase better than a new hire would after a month.

Slide 5: "Common mistake: too much context"
    A 2000 line file is worse than no file at all.
    Keep it under 300 lines. Specific, operational, current.

Slide 6: "Common mistake: wrong context"
    Do not describe what your app does. Describe how to work on it.
    The model reads your code; it needs your conventions.

Slide 7: "Context engineering is the skill. The model is the commodity."
    What is in your context file right now?
```

---

## Pre-Publish Checklist

1. The carousel has exactly 7 slides (or a justified deviation between 5 and 10).
2. Slide 1 is a hook that earns the first swipe. Test: would you swipe if you saw this in your feed?
3. Each slide makes exactly one point. No slide tries to cover two ideas.
4. Reading just the headlines in sequence tells a coherent story.
5. Each slide is readable in under 8 seconds on a phone screen.
6. Slide 7 ends with a takeaway and a question, not a pitch.
7. Dimensions are 1080x1350 per slide.
8. Export uses your image pipeline (HTML to PNG to PDF, design tool, or equivalent).
9. Brand colors and logo are consistently applied.
10. Language is correct for the target audience (per [[config.md]]).
11. No hype words, no dramatic fragment pairs, no dashes as punctuation.
12. Voice matches [[voice/linkedin-tone]] or [[voice/x-tone]] depending on target audience.
13. Reviewed against [[voice/anti-patterns]].
