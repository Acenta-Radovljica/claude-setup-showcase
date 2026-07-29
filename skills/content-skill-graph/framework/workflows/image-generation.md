# Image Generation Workflow

> Procedures for generating images across all content workflows. Covers AI-generated blog images, social media visuals (HTML-to-image export), and the mandatory protocol for handling official logos. Tool choices and brand aesthetic settings come from [[config.md]].

References: [[visual-components]], [[brand-voice]], [[config.md]]

---

## Blog Article Images (AI Image Generation)

### Tool Selection

Choose your preferred AI image generator. Strong options as of 2026 include:

- **Google Gemini (Imagen / Nanobanana models)**: Good for abstract, editorial-style images
- **Midjourney**: Strong aesthetic control, great for conceptual visuals
- **DALL-E (via ChatGPT or API)**: Versatile, accessible
- **Ideogram**: Good for compositions that need precise layout

Configure your preferred tool in [[config.md]]. If you use browser-based generators, open them in your browser. If API-based, integrate them into your pipeline.

### Prompt Style

All blog images should follow a consistent aesthetic defined by your brand. Establish these parameters in [[config.md]] and apply them to every prompt:

**Background:** Match your brand's primary background color and mood (e.g., dark #0a0a0a to #111111 for dark brands, light and clean for minimal brands).

**Aesthetic:** Define your visual style. Examples: subtle tech feel, editorial photography, organic and warm, geometric and precise. Be consistent across all articles.

**What to include:**
- Abstract representations of concepts (not literal illustrations)
- Geometric forms, light effects, gradients
- Depth and layering
- Intentional color accents matching your brand palette

**What to avoid:**
- NO text in the image. Text in AI-generated images is unreliable and looks amateur. Add text separately via HTML/CSS overlays if needed.
- No people's faces (they age the image and raise likeness concerns)
- No busy compositions with too many elements
- No stock photo cliches (handshakes, light bulbs, gears, brains)
- No cartoonish or illustration-heavy styles (unless your brand specifically calls for this)

**Tone:** Professional, editorial, slightly moody. The images should feel like they belong in a well-designed publication.

### Required Images Per Article

- **Cover image (1):** Shown on the blog listing page and at the top of the article. Must convey the article's theme at a glance. This is the most important image; spend extra time getting it right.
- **Section images (2 to 4):** Placed at section transitions to create visual rhythm. Each one should relate to the section that follows it, not literally illustrate it.

### Prompt Template

Write each prompt with this structure:

```
[Scene description]: [specific visual elements], [composition details]
Style: [background color/mood from config], [aesthetic references]
No text. No people. [additional negative constraints]
```

Example:

```
An abstract representation of organized knowledge flowing into a central processing point.
Translucent data streams converging through geometric corridors into a glowing central node.
The streams carry subtle visual texture suggesting documents, connections, and structure.
Style: dark background (#0a0a0a), editorial, clean, subtle cyan and blue accent lighting,
shallow depth of field, atmospheric perspective.
No text. No people. No literal computers or screens.
```

### Post-Generation Processing

After generating and saving images:

1. **Remove watermarks** if present (some free tiers include watermarks)
2. **Convert to your preferred web format** (WebP recommended for web performance):
   ```bash
   # Using cwebp
   cwebp -q 85 input.png -o output.webp

   # Using sips (macOS)
   sips -s format webp input.png --out output.webp

   # Using ImageMagick
   convert input.png -quality 85 output.webp
   ```
3. **Name with SEO-friendly slug:** `descriptive-name-matching-article-topic.webp`
4. **Place in your blog's public assets directory**
5. **Verify dimensions:** Cover images should be at least 1200px wide for social sharing previews

### Quality Gate

If generated images do not match your established aesthetic (too bright, too busy, text in image, wrong mood), write new prompts and regenerate. Do not settle for images that break the visual consistency of your blog.

Compare against your first article's images as the quality benchmark. Once you have a reference set, keep future images consistent with it.

---

## Social Media Visuals (HTML-to-Image Export)

### Approach

Create visuals as HTML/CSS and export them as PNG images. This gives you full control over typography, layout, brand colors, and data presentation.

### How It Works

1. Create an HTML file with your visual design
2. The HTML file defines slides or visual elements using styled containers
3. Export using your preferred HTML-to-image pipeline (see options below)
4. The output is a PNG at your target resolution

### Export Options

**Option A: Puppeteer script (recommended)**
Write a Node.js script using Puppeteer to load the HTML file and capture specific elements:
```bash
node export.js <html-file> <output-name>
```
Use `element.screenshot()` for precise capture of specific containers. Set `deviceScaleFactor: 2` for retina quality output.

**Option B: Browser screenshot**
Open the HTML file in a browser, use DevTools to set a specific viewport, and take a screenshot.

**Option C: Online services**
Use html-to-image APIs (htmlcsstoimage.com, etc.) if you do not want to set up a local pipeline.

### Design Guidelines

- Follow your brand colors and typography from [[config.md]]
- Background consistent with your blog aesthetic
- Clean, readable text at the exported resolution
- Official logos only (see Logo Protocol below)
- Keep text concise; social media visuals should communicate in 3 seconds

### When to Use

- Product announcement posts
- Article repurposing social posts
- Stat-based posts that benefit from a visual
- Any post where a visual would stop the scroll

### When NOT to Use

- If the post is text-only and works without a visual
- If a blog image already works at social dimensions (1200x628 for X/LinkedIn preview)

---

## Official Logos (Mandatory Protocol)

This applies to ALL visuals across ALL workflows. NEVER generate or create logos.

### Search Order

1. **Check existing assets:** Look in your public assets directory for a file matching the product or company name
2. **Company website:** Scrape the company's homepage, press page, or brand assets page. Look for: press kits, brand asset downloads, logo URLs in the page source
3. **GitHub repository:** If the product is open source, check the repo root and common asset directories (`/assets/`, `/branding/`, `/.github/`, `/docs/`) for logo files
4. **Wikimedia Commons:** Search `commons.wikimedia.org` for the company or product name
5. **Ask the user:** If none of the above produce a usable logo, explain what was tried and request the user provide one

### Format Preferences

- **SVG** is strongly preferred (scales perfectly, small file size)
- **PNG** is acceptable if SVG is unavailable (must be high resolution, at least 256px on the shortest side)
- Avoid JPEG logos (compression artifacts on edges)
- If only a favicon is available, note this and flag that a higher quality version is needed

### Licensing

- Company logos used for editorial/review purposes are generally covered under fair use
- If a company explicitly restricts logo usage in their brand guidelines, note this and flag to the user
- Always check press kit pages for usage terms

### Storage

Save logos to your public assets directory using kebab-case naming matching the product or company slug. Organize by type (tools, companies) if your directory structure supports it.

---

## Choosing the Right Image Method

| Scenario | Method |
|----------|--------|
| Blog cover image | AI image generator |
| Blog section images | AI image generator |
| Product announcement social post | HTML-to-image export |
| Article repurposing social post | HTML-to-image export (or reuse blog image if it works at social dimensions) |
| Stat-based social post | HTML-to-image export |
| Post that needs photorealistic imagery | AI image generator |
| Quick visual for a text post | HTML-to-image export |
| Product UI showcase | Screenshot-based (see below) |

---

## Screenshot-Based Visuals (Beta)

**Status:** Beta. Do not use without explicit user approval. When a post would benefit from a real screenshot, suggest this approach and wait for confirmation before proceeding.

### What It Is

Browser frame mockup visuals: real screenshots of products in action, placed inside a styled browser window mockup on your branded background. Exported via the same HTML-to-image pipeline as regular slides.

### When to Recommend

- Posts that showcase a specific product's UI or output
- Before/after comparisons
- Proof posts where showing the real interface adds credibility
- Any post where a real screenshot would outperform a styled data slide

### Collaborative Workflow

This is a human + AI workflow because many tools (terminal applications, local apps) cannot be screenshotted programmatically.

1. **Write a shot list:** Exact instructions for each screenshot: what to open, what to show, window dimensions, dark/light mode, what should and should not be visible, where to crop
2. **User takes the screenshots:** Saves them to a designated raw screenshots folder
3. **Frame and export:** Place screenshots in branded HTML slide templates with browser window mockup, headline text, and your branding. Export via your HTML-to-image pipeline.

### For Web-Based Screenshots (Automated)

When the screenshot target is a public URL, the capture can be automated using Puppeteer:

```bash
node capture.js <url> <css-selector> <output-path>
```

This captures a specific element or viewport from a live page at retina resolution.

### Browser Frame Mockup (CSS)

The frame includes: title bar with macOS traffic light dots (or your preferred window decoration), URL bar showing the source domain, rounded corners, drop shadow. The screenshot sits inside on a light background. All pure CSS, no images needed for the frame itself.
