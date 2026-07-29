# Repurpose Rules

> How to extract standalone social posts from published articles and long-form content. Every article contains multiple post-worthy insights, but extracting them requires more than pulling quotes. The insight must stand completely on its own for someone who will never read the article.

References: [[engine/templates]], [[engine/scheduling]], [[config]], [[voice/brand-voice]]

---

## Core Principle

An article is a container of insights. A social post is a single insight with enough context to be useful alone. The job of repurposing is to find the insights that work outside the container and present each one as if the article does not exist.

---

## Extraction Criteria

### What makes a good standalone insight

- It makes a single clear point that does not require the surrounding argument to land.
- It contains at least one specific detail: a number, a tool name, a friction point, a concrete example.
- A reader who has never seen the article would find it interesting, useful, or surprising on its own.
- It provokes a reaction: the reader wants to agree, disagree, save it, or share it.

### What only works inside the article

- A transitional argument that connects two sections ("this is why the next part matters").
- A supporting detail that only makes sense after the setup paragraphs.
- A nuance or qualification that softens a broader claim made earlier. Without the claim, the nuance has no anchor.
- A list of steps that requires the full sequence to be useful. Individual steps without context are confusing, not helpful.

---

## Drip Schedule

Never dump all extracted posts on the same day. Space them out to maximize reach and give each post its own window of engagement.

| Timing | Post type | What it does |
|--------|-----------|-------------|
| Same day as article | The hook | The single most surprising or provocative insight from the article. This is the post most likely to make someone stop scrolling. It can link to the article (in a reply, not the main post) but must stand alone. |
| Day 2 | The surprising detail | A specific detail, number, or example from the article that most readers would not expect. Not a summary; a single moment of "wait, really?" |
| Day 4 | The practical takeaway | The most actionable thing from the article. Something the reader can do today. Frame it as advice from experience, not as a teaser for the article. |

Adjust timing based on your posting frequency from [[engine/scheduling]]. The principle is that each extracted insight gets its own window of attention, spaced far enough apart that they do not compete with each other.

---

## Platform Rewriting Rules

Do not translate content line by line between languages or adapt a post from one platform to another by changing surface details. Take one raw idea and write it from scratch for each specific audience.

Refer to [[config]] for your active platforms and languages, and [[voice/brand-voice]] for tone guidelines on each.

### Technical/builder platform version

- Can stay narrower and more technical.
- Name specific tools, specific steps, specific numbers.
- The audience already works with these tools daily; they are looking for leverage, not motivation.
- Tone: builder to builder. See [[voice/brand-voice]] for your specific voice on this platform.

### Business/professional platform version

- Must land on time, cost, clarity, or workflow. Abstract insights about technical architecture do not resonate with business decision makers.
- Explain the business consequence, not the technical mechanism.
- Use natural, spoken language appropriate to your audience's market and culture.
- Cut jargon unless the tool name itself is necessary.
- Tone: practical peer explaining what they observed. See [[voice/brand-voice]] for your specific voice on this platform.

### What "writing it twice" looks like in practice

**Raw idea:** Organizing your business knowledge for AI produces dramatically better output than switching to a newer model.

**Technical platform version:** "Everyone is comparing models. I spent the last month organizing context. That is where the actual output quality comes from. Same task, same model, wildly different results depending on what the model knew before I typed anything."

**Business platform version:** "The difference is not that I became faster. The difference is that I gave the system enough context to understand what kind of business this is. Without that context, the same system produces generic text. With context, it produces something you actually use."

Same idea. Completely different posts. Neither is a translation of the other. Adapt this pattern to your own platforms and languages as configured in [[config]].

---

## The "New Article!" Anti-Pattern

Never post "just published a new article, check it out" with a link. This post format has near zero engagement because it offers the reader nothing in the post itself. The entire value proposition is "click this link," which most people will not do.

Instead, every post that relates to an article must contain a standalone insight that is valuable even if nobody clicks. The article link, if included at all, goes in a reply or at the very end as an optional resource.

---

## Checklist Before Posting an Extracted Insight

1. Does this make sense to someone who has never read the article?
2. Is there at least one specific detail (number, tool, example, friction point)?
3. Would I engage with this post if I saw it from someone else?
4. Is this genuinely one insight, not a compressed summary of the whole article?
5. Does the platform version match the audience? (Technical depth for builder audiences, business consequence for decision maker audiences.)

If any answer is no, rewrite or pick a different insight.
