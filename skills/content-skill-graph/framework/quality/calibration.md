# Calibration

> Five questions to run against every piece of content before publishing. These are the minimum quality gate. If a piece fails any of these, it needs revision before it goes out. The questions are designed to catch the most common failure modes: generic AI slop, ungrounded claims, audience mismatch, and content that sounds written rather than said.

References: [[voice/brand-voice]], [[voice/anti-patterns]], [[quality/hormozi-standard]]

---

## The Five Questions

### 1. Does this sound like it was written in your brand voice?

**What a "yes" looks like:** The content has natural phrasing, personality, and reads like someone explaining something they know well to someone they respect. It uses "I" when appropriate. It references real work rather than abstract principles. A reader familiar with your brand would recognize the voice. (See [[voice/brand-voice]] for your specific voice definition.)

**What a "no" looks like:** The content uses phrases no human would naturally say: "In today's rapidly evolving landscape," "leverage synergies," "unlock the full potential." It reads like a press release or a corporate blog. The sentences are all the same length and rhythm. There is no personality, no opinion, no edge. (See [[voice/anti-patterns]] for a full list of patterns to avoid.)

**How to fix a "no":** Read the piece out loud. Every sentence that sounds wrong when spoken needs rewriting. Replace abstract phrasing with specific references to actual work. Add one concrete detail from real experience. Remove any sentence that could have been written about any company by any AI.

---

### 2. Is there at least one concrete detail in it?

**What a "yes" looks like:** The content mentions specific numbers ("4 hours to 5 minutes"), specific tools ("Notion with 3 integrated databases"), specific processes ("onboarding 12 new clients in a single week"), or specific observations from real work. The reader walks away with at least one fact they did not have before.

**What a "no" looks like:** The content speaks entirely in generalities. "AI can save you time." "Automation improves efficiency." "The right tools make a difference." Every sentence is true but none of them are useful. A reader could nod along and remember nothing.

**How to fix a "no":** Add one real number, one real tool name, one real process description, or one real outcome. If you cannot find a concrete detail to add, the content might not be worth publishing because it means there is no real experience behind it.

---

### 3. Would a knowledgeable person in your space respect it?

**What a "yes" looks like:** The details are accurate. Tool names are spelled correctly with correct capitalization. The described workflow actually works the way the content claims. The content does not oversimplify to the point of being wrong. Someone experienced in your field reading it would think "this person actually knows what they are talking about" rather than "this person read a blog post about this topic."

**What a "no" looks like:** The content misuses terminology, conflates different tools or approaches, or describes a workflow that would not actually work. Buzzwords are used as substitutes for understanding. The content claims results without explaining the mechanism. An expert reading it would think "this person is writing about something they do not understand."

**How to fix a "no":** Verify every claim against actual experience or documentation. If you are not sure a workflow works the way you described, test it or caveat it. Remove any term you cannot explain in plain language. Add the "how" alongside the "what."

---

### 4. Would your target audience understand it without effort?

**What a "yes" looks like:** The content uses language your target audience (see [[audience/]]) actually uses. Business consequences are stated explicitly. Jargon is either avoided or explained immediately in the same sentence. If you are writing in a language other than English (see [[config.md]] for platform language settings), the phrasing is natural in that language, not translated from English.

**What a "no" looks like:** Sentences that require specialized background to parse. Jargon used without explanation. Abstract benefits without concrete consequences. Content that assumes the reader already agrees with your premise, when they might still be evaluating whether the topic is relevant to them at all.

**How to fix a "no":** Translate every technical concept into a consequence your audience cares about. Add a "so what" after every claim. If you are writing in a non-English language, rewrite any sentence that follows English sentence structure instead of natural phrasing in the target language.

---

### 5. Did this come from real work, real observation, or a real belief?

**What a "yes" looks like:** You can trace every claim back to either (a) something you built or experienced, (b) something you observed while working, or (c) a belief you hold and can defend. The content has a source, whether that source is personal experience, documented proof points, or a clearly stated opinion.

**What a "no" looks like:** The content contains claims you included because they sound good, not because they are grounded. "AI will transform every industry" (do you actually believe this, or is it filler?). "Teams report 10x productivity gains" (which teams? where is this from?). Anything that, if challenged, you could not back up with specifics.

**How to fix a "no":** For every claim, identify the source. Personal experience? Write "I built X and saw Y." Industry stat? Cite the source from [[proof/industry-stats]]. Belief? Frame it as opinion: "I believe X because Y." If a claim has no source and no grounding, cut it.

---

## Platform-Specific Calibration

Adapt these checks to the platforms you publish on. Below are common examples; customize the tables to match the platforms defined in [[config.md]].

### Short Form Posts (e.g., X, Threads)

| Check | What to verify |
|-------|----------------|
| Accuracy | Tool names, version numbers, workflow descriptions are correct |
| Specificity | At least one concrete detail, number, or named tool per post |
| Peer respect test | Would someone experienced in your field nod along? |
| Personality | Does it have a point of view, or could anyone have written it? |
| Framing | Does this present your experience as one example, or as the universal recommendation? |
| Currency | Are all named tools, models, or references still current? |

### Long Form Posts (e.g., LinkedIn, Facebook)

| Check | What to verify |
|-------|----------------|
| Language naturalness | If writing in a non-English language, does it sound natural, not translated? |
| Business consequence | Is the "so what for the reader" stated explicitly? |
| Jargon free test | Could someone outside your technical bubble follow the argument? |
| Story structure | Is there a before/after or observation/insight structure? |

### Blog Articles

| Check | What to verify |
|-------|----------------|
| All five questions | Every article must pass all five calibration questions |
| Depth | Does it teach something specific enough to be actionable? |
| Visual quality | Are images, diagrams, or code examples production quality? |
| Copy paste value | Is there at least one thing the reader can directly use (a prompt, a config, a template, a framework)? |
| [[quality/hormozi-standard]] | Would a reader get more value from this than from a paid course on the same topic? |

### Social Images

| Check | What to verify |
|-------|----------------|
| Brand consistency | Colors, fonts, and layout match your brand guide (see [[config.md]]) |
| Readability | Text is legible at the size it will appear on the platform |
| Information density | The image communicates one clear idea without clutter |
| Standalone value | The image makes sense even without reading the accompanying text |

---

## Wikilink References

- [[voice/brand-voice]]
- [[voice/anti-patterns]]
- [[quality/hormozi-standard]]
- [[proof/personal-proof]]
- [[proof/industry-stats]]
- [[config]]
- [[audience/]]
