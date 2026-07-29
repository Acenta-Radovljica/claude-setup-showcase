# Template: Article Data Scaffold

> Scaffold for structuring a new blog article. Adapt the data format to match your publishing system (CMS, static site, markdown files, etc.). This template defines the essential fields every article needs regardless of platform. Referenced by the **new-article** workflow.

---

## Article Structure

Every article entry needs these core fields. The format below uses a generic key/value structure; adapt it to your CMS, static site generator, or data layer.

---

## Full Scaffold

```
slug: "{{kebab-case-slug}}"
# URL path: /blog/{{slug}}
# Use descriptive, SEO-friendly slugs.
# Examples: "what-claude-code-actually-is", "ai-native-company-blueprint"

title: "{{Article Title}}"
# The headline. Should be stat-driven, insight-driven, or question-driven.
# Good: "88% of Companies Use AI. Almost None of Them Use the Right Tools."
# Avoid: "My Thoughts on AI Tools" (vague, no hook)

description: "{{1 to 2 sentence description for the listing page and meta tags.}}"
# Shows on the blog index page and in social previews.
# Should communicate the value proposition: what the reader will learn or gain.

author:
  name: "{{Your Name}}"
  role: "{{Your Role}}"

published_date: "{{YYYY-MM-DD}}"
last_updated: "{{YYYY-MM-DD}}"
# Both use ISO 8601 date format. last_updated can match published_date initially.

reading_time_minutes: {{number}}
# Estimate based on ~200 words per minute for technical content.
# Round to the nearest whole number.

category: "{{category}}"
# Use existing categories when possible. Create new ones sparingly.
# Example categories: "Strategy", "Tool Deep Dive", "Technical Guide", "First Principles"

tags:
  - "{{tag-1}}"
  - "{{tag-2}}"
  - "{{tag-3}}"
  # kebab-case tags. Include: primary topic, tools mentioned,
  # key concepts, audience keywords.
  # 4 to 8 tags per article.

meta_title: "{{SEO Title | Your Brand}}"
# Under 60 characters total (including your brand suffix).
# Include the key insight or hook. Does not need to match the article title exactly.

meta_description: "{{Under 160 characters. Includes the key insight and value promise.}}"
# What shows in search results. Should make someone want to click.
# Include: what they will learn, why it matters, who it is for.

cover_image: "{{path-to-cover-image}}"
# Use .webp format when possible for best compression.
# File name should be descriptive and SEO-friendly, kebab-case.

content: "{{Full article content in markdown}}"
```

---

## Writing the Content

### Markdown Features to Use

- **Headings:** `##` for main sections, `###` for subsections. Avoid `#` (typically reserved for the page title).
- **Bold and italic:** `**bold**` and `*italic*`
- **Lists:** Both `- unordered` and `1. ordered`
- **Links:** `[text](url)`
- **Images:** `![alt text](/path/to/image.webp)`
- **Code blocks:** Triple backticks with language identifier
- **Horizontal rules:** `---` for section breaks
- **Blockquotes:** `> text`

### Code Block Types

````
```bash
# Terminal commands
npm install something
```

```prompt
# AI interaction blocks
> Write a competitive analysis for {{company}}
```

```python
# Code examples in any language
result = process(data)
```
````

### Visual Blocks (Optional)

If your publishing system supports raw HTML in markdown, you can embed visual components for stat callouts, comparison tables, and highlighted quotes. Define these in your platform's component library.

---

## Cover Image Conventions

| Aspect | Convention |
|--------|----------|
| Format | .webp (preferred) or .png |
| Naming | Descriptive, SEO-friendly, kebab-case |
| Dimensions | 1200x630 or 1600x900 (social preview friendly) |
| Content | Should visually represent the article topic |

**Good file names:**
- `what-is-claude-code-ai-tool-beyond-coding.webp`
- `ai-native-company-six-layer-blueprint.webp`
- `context-vs-model-ai-output-quality.webp`

**Bad file names:**
- `cover.webp` (not descriptive)
- `article-2-image.webp` (not SEO friendly)
- `IMG_2847.webp` (meaningless)

---

## Title Formulas

### Stat-driven
> "{{Stat}}. {{What it implies}}."
> Example: "88% of Companies Use AI. Almost None of Them Use the Right Tools."

### Insight-driven
> "{{The counterintuitive insight, stated directly}}"
> Example: "The Biggest Variable in AI Output Quality Is Not Which Model You Use"

### Question-driven
> "{{A question your audience is asking but getting wrong answers to}}"
> Example: "Why Does the Same AI Give You Generic Output and Someone Else Custom Analysis?"

### Capability-driven
> "{{What is now possible that was not before}}"
> Example: "Build a Complete Business Operating System Without Writing a Line of Code"

**What to avoid in titles:**
- "My Journey With X" (too personal, no value signal)
- "The Ultimate Guide to X" (superlative, overused)
- "X is Dead" (clickbait, loses trust)
- "You Won't Believe X" (pure clickbait)

---

## Quality Checklist

Before considering an article entry complete:

- [ ] Slug is descriptive and SEO-friendly
- [ ] Title has a hook (stat, insight, or question) that makes someone want to read
- [ ] Description communicates what the reader gains, not just what the article covers
- [ ] Category matches an existing category or is a genuinely new one
- [ ] Tags include the primary topic, tools mentioned, and audience keywords
- [ ] Meta title is under 60 characters total
- [ ] Meta description is under 160 characters and makes someone want to click
- [ ] Cover image exists with the correct file name and path
- [ ] Content uses ## for main sections and ### for subsections (never #)
- [ ] Code blocks have appropriate language identifiers
- [ ] All image paths are correct and files exist
- [ ] Reading time estimate is realistic (content word count / 200)
- [ ] Passes all five [[quality/calibration]] questions
- [ ] Passes the [[quality/hormozi-standard]] for depth and actionability

---

## Wikilink References

- [[quality/calibration]]
- [[quality/hormozi-standard]]
- [[voice/brand-voice]]
- [[config]]
