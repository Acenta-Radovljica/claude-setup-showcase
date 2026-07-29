# The Discovery Brief: intake like a senior consultant

A world-class agency's first advantage shows up before any pixel: the discovery call. The expert already knows exactly what they need, asks for it efficiently, decides everything they are qualified to decide, and refuses to start on a brief too thin to produce great work. This file is that intake. The goal is a locked brief that makes the rest of the pipeline near-deterministic, gathered in as few questions as possible.

## The operating principle

**Be the expert, not the order-taker.** The user is busy and is paying for judgment. Every question you ask that you could have answered yourself erodes trust; every decision you punt that you should have made yourself does the same. So: mine what exists, ask only for what only the user knows, and propose strong defaults for everything else.

## Three tiers of input

### Tier 1 — Must extract from the user (cannot be inferred or faked)

If any of these is missing or wrong, the page is mediocre or dishonest. Get them.

- **Project / owner.** Which business or named personal project this belongs to. Determines brand inputs, the email identity a form notifies, and where files are saved. Never guess which project owns the page. (Often answerable from context; confirm if not.)
- **The real offer + audience.** What is actually being sold/offered, and to whom. One or two sentences. You cannot position what you do not understand.
- **The one action + its destination.** What the visitor should do (lead gen, sale, waitlist, demo, download, event, newsletter) AND where it goes: which form handler, inbox, calendar link, or backend. A CTA with nowhere to send the click is a broken page.
- **Real proof you may use.** Actual numbers, named testimonials, logos you have permission to show, case results. This is usually the single biggest driver of conversion and the thing most often missing. If there is none, you must know that now (you will design honestly around it, never fabricate).
- **Brand truth + hard constraints.** Voice source (file, site, competitor to match, or two adjectives), available assets (official logo, fonts, imagery), and any non-negotiables (legal lines, regulated claims, things that must/must-not appear). For public pages, the privacy and anonymity rules apply.

### Tier 2 — Ask only if quick and high-leverage

Worth a question if the answer materially changes the work and is not inferable:

- **A competitor or reference** to beat, match, or avoid resembling (a URL you can scrape is gold).
- **Awareness stage**, if genuinely unclear from the offer (most/least aware audience changes page length and tone). Usually you can infer and propose this.
- **Output format**, if not obvious: self-contained Tailwind HTML (default) or Next.js (only for an existing Next.js codebase).
- **Any deadline or channel** the page is for (an ad's destination reads differently from an organic hero).

### Tier 3 — Decide yourself, propose, do not ask

You are the expert; own these and present them as recommendations the user can veto. Asking the user to make these calls cold is abdicating the job:

- Positioning angle and the core message (you draft, they react).
- Awareness stage when inferable from the offer and audience.
- Section structure and order.
- Aesthetic direction, type pairing, palette (Phase 1 presents 2 to 3 options anyway).
- Copy, hooks, microcopy.
- Layout, motion, and every craft decision.

## How to run it (the conversation)

1. **Mine first.** Read the local brand context, any URL/page named, and the whole conversation. Resolve everything you can before opening your mouth.
2. **One batched round.** Ask the unresolved Tier-1 items plus any high-value Tier-2 item, together. Use `AskUserQuestion` for the structured choices (project, goal, output format) with smart defaults pre-selected; use prose for the open ones (offer, proof). Lead with the highest-leverage unknown.
3. **Pre-fill, do not interrogate.** Frame questions as "here is what I am assuming; correct me" wherever possible. The user should be editing a strong draft brief, not filling a blank form.
4. **Name the riskiest unknown** out loud, usually: "Do you have real, specific proof, or a sharp differentiator?" If the answer is thin, that is the conversation to have before anything else, because it decides whether the page can be great or merely clean.
5. **Mirror and lock.** Restate the brief in one short paragraph plus a bullet list of the assumptions you are making on Tier-3 items, and ask for a confirm/correct. Only then move to Phase 1.

## The brief you are trying to lock (restate this back)

> **Owner:** <project>. **Offer:** <one line>. **Audience:** <one line>. **Goal / action:** <action> → <destination>. **Awareness stage (assumed):** <stage>. **Core message (proposed):** <one line>. **Primary objection:** <one line>. **Proof available:** <real proof, or "none, designing honestly around it">. **Voice + brand:** <source + key assets>. **Format:** <HTML / Next.js>. **Constraints:** <any>.

If you can fill that paragraph from what you have plus one tight round of questions, you have run the discovery like a pro. If a Tier-1 line is still blank, do not start building; close that gap first.
