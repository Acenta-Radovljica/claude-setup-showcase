# New Tool / Product / Resource Workflow

> Operational procedure for reviewing and publishing a new tool, product, or resource on your site, then announcing it on social platforms. Handles both new entries and updates to existing ones.

References: [[brand-voice]], [[anti-patterns]], [[calibration]], [[config.md]]

---

## Step 0: Detect New vs Update

Before doing anything else, determine whether this item already exists on your site.

1. Extract the likely slug from the URL (e.g., `stitch.google.com` becomes `stitch`, `firecrawl.dev` becomes `firecrawl`)
2. Check your content directory for an existing entry matching this slug. Also search for partial name matches in case the slug differs from the URL domain.
3. If the item **does not exist**: proceed as a **new entry** (full workflow below)
4. If the item **already exists**: switch to the **update path**

### Update Path

When updating an existing entry, the workflow changes:

- **Read the existing file first.** Understand the current content, structure, and what data is already captured. This is your baseline.
- **Review your content schema** (types, interfaces, data models) to confirm you follow the correct structure (these may have changed since the entry was originally added).
- **Research focuses on what changed.** Scrape the URL the user provided (often a blog post, changelog, or press release about the update). Also scrape the product's homepage and pricing page to catch any other changes.
- **Update the existing file, not create a new one.** Preserve the file path and identifiers. Update every section that the new information affects: description, features, pricing, pros, cons, deep dives, tagline, and any other fields where the update changes the facts.
- **Set `lastUpdated` to today's date** (YYYY-MM-DD format). If your site has "recently updated" features or badges, this date drives them.
- **Skip index registration** (Step 6). The entry is already registered.
- **Skip company/brand file creation.** The associated entity already exists.
- **Logo: check if the existing logo still works.** If the product rebranded or changed its icon, source the new one. Otherwise, keep the existing logo.
- **Validate after changes.** Run whatever type-checking, linting, or build verification your platform requires to confirm the updated file has no errors.
- **Social posts frame the update, not the product itself.** The announcement posts should highlight what changed and why it matters, not introduce the product from scratch.

After completing the update path, skip to Step 7 (Generate Announcement Posts) with the update framing, then continue through Steps 8, 9, and 10 as normal.

---

## Step 1: Scrape the Product

Use your preferred web scraping tool to scrape the provided URL. Extract:

- Product name
- Company or creator name
- Tagline or one-liner
- Core feature list
- How it works (architecture, technology, workflow)
- Pricing tiers (exact numbers, currency, interval, per-user or not)
- Integration points (what it connects with)
- Target audience signals

If the page is thin or gated, note what is missing and move to Step 2 to fill gaps.

## Step 2: Research

Scrape additional pages:

- **Pricing page**: Get every tier with exact features. If pricing is not public, note "contact for pricing" and flag this to the user.
- **Features page**: Full feature list with descriptions.
- **Docs/API page**: Developer access, API pricing if applicable, SDKs.
- **Company about page**: Founded year, team, mission, headquarters.
- **Blog/changelog**: Latest updates, release announcements.

Search for competitor context:

- Search for `"<product name> vs"` to find common comparisons.
- Search for `"<product name> review"` to find user sentiment.
- Search for `"<product name> pricing <current year>"` to verify pricing is current.

If deep research is needed (complex product, rapidly evolving space), use a research tool or generate a ready-to-paste prompt for the user.

## Step 3: Find Official Announcement Post (Optional)

If the product was recently launched or updated and you plan to create a quote-post on X (or similar platform), find the official announcement:

1. Search X for `from:<company_handle> <product_name>` sorted by most recent
2. If the company handle is unknown, search for `<company name> site:x.com` first
3. Find the official announcement or launch post
4. Copy the exact URL
5. If no official post exists, note this and plan a standalone post instead of a quote post

## Step 4: Find Official Logo

Search in this order. Stop when you find a usable logo.

1. **Check existing assets:** Look in your public assets directory for an existing logo file matching the product or company name
2. **Company website:** Scrape the company's homepage or press/brand page. Look for logo URLs, press kits, or brand asset downloads. SVG is preferred, high-resolution PNG is acceptable.
3. **GitHub repo:** If the product is open source, check the repository root for logo files (`logo.svg`, `logo.png`, files in `/assets/`, `/branding/`, or `.github/`)
4. **Wikimedia Commons:** Search for the company or product name on commons.wikimedia.org
5. **Ask the user:** If none of the above produce a usable logo, tell the user what you tried and ask them to provide one

Save the logo to your assets directory using a kebab-case filename matching the product slug. Always check licensing/attribution requirements before using.

### Format Preferences

- **SVG** is strongly preferred (scales perfectly, small file size)
- **PNG** is acceptable if SVG is unavailable (must be high resolution, at least 256px on the shortest side)
- Avoid JPEG logos (compression artifacts on edges)
- If only a favicon is available, note this and flag that a higher quality version is needed

## Step 5: Create the Content Entry

Create a new entry in your content system (file, CMS entry, or database record) following your site's data schema.

Key fields to get right:

- **slug**: kebab-case, matches the filename or URL path
- **name**: official product name
- **tagline**: one sentence that captures the core value proposition; keep it concise
- **category**: appropriate category for your taxonomy
- **icon/logo**: path to the logo file from Step 4
- **description**: 3 to 5 sentences explaining what the product does, when it was released, and who it is for. Write in present tense. Include concrete numbers (speed, limits, availability).
- **features**: 6 to 10 features, each with a name, description, and optional link to a detailed section
- **pricing**: every tier with exact numbers. Mark enterprise/contact-us tiers clearly. Highlight the recommended tier if applicable.
- **bestFor**: 4 to 6 bullet points describing ideal users and use cases
- **pros**: 5 to 7 honest advantages with specific details, not generic praise
- **cons**: 3 to 5 honest limitations. These must be real. Do not soften them.
- **gettingStarted**: 3 to 5 steps that get someone from zero to using the product
- **deepDive**: 3 to 5 sections covering architecture, comparison with competitors, key features in depth, and availability/integrations
- **links**: official site, pricing page, docs, blog posts, relevant videos
- **lastUpdated**: today's date in YYYY-MM-DD
- **relatedSlugs**: 3 to 5 slugs of related items already on your site
- **tags**: 8 to 12 relevant tags for search and filtering
- **metaTitle**: under 60 characters, includes the product name and your brand
- **metaDescription**: under 160 characters, includes key differentiator

All text must follow your writing rules from [[brand-voice]] and [[anti-patterns]]: no dashes as punctuation, no dramatic fragment pairs, complete sentences.

## Step 6: Register in Site Index

Add the new entry to your site's content index or registry:

1. Import or register the new content file
2. Add it to the master list/array/collection (follow alphabetical or categorical ordering conventions)
3. Verify the registration by checking that the import and reference match

If your site auto-discovers content files (filesystem-based routing, CMS auto-listing), this step may not be necessary. Verify that the new entry appears in your site's listing.

## Step 7: Generate Announcement Posts

Create announcement posts for each platform configured in [[config.md]].

### Short-form platform post (e.g., X)

If you found an official announcement post in Step 3, use a **quote post** format (your commentary above the embedded official post).

Structure:
- **Line 1**: Your take on why this product matters, rooted in first principles or ecosystem context. Not a restatement of the company's marketing.
- **Lines 2 to 4**: What it actually does, what is interesting about it, or what gap it fills. Be specific.
- **Line 5**: One sentence connecting it to your broader thesis or content pillar.
- **Final line**: Link to the product's page on your site
- **Below the text** (quote post only): Paste the company's official post URL

If no official post was found, write a standalone post (same structure, end with your site link only).

Tone: direct, specific, practitioner perspective. No hype. Follow [[brand-voice]] and [[anti-patterns]].

### Long-form platform post (e.g., LinkedIn)

Structure:
- **Opening**: What the product does, explained through a problem it solves, written in the platform's language per [[config.md]]
- **Middle**: What makes it different from alternatives, with specific details (pricing, speed, capabilities)
- **Closing**: Who should pay attention and why, with link to your site's page for this product

Tone: calm, concrete, practical. Written like explaining something you tested this week to a colleague. Follow [[brand-voice]] for this platform.

## Step 8: Quality Check

Run through [[calibration]] checklist:

- [ ] All pricing is verified and current (not from training data or memory)
- [ ] All stats have sources
- [ ] No dashes used as punctuation anywhere
- [ ] No dramatic fragment pairs anywhere
- [ ] Pros and cons are honest and specific
- [ ] The description explains the product to someone who has never heard of it
- [ ] Deep dive sections add genuine depth, not padding
- [ ] Logo is official, not generated
- [ ] Related slugs reference items that actually exist on your site
- [ ] Meta title is under 60 characters
- [ ] Meta description is under 160 characters
- [ ] Short-form post would make sense to someone who does not follow your brand
- [ ] Long-form post reads naturally in the target language

## Step 9: Present for Review

Show the user:

1. The complete content entry (full data file or CMS preview)
2. The short-form announcement post (ready to copy/paste)
3. The long-form announcement post (ready to copy/paste)
4. The logo file location
5. Any flags: missing pricing, unverified claims, logo licensing concerns, missing official announcement post

**Never commit, publish, or push without explicit user approval.** Wait for review and any requested changes.

---

## Dev Server Note

After creating the content entry and updating the index, verify that the new page renders correctly on your local development server. If you see module errors or stale cache, clear your build cache and restart the server.
