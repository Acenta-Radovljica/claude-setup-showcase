# Platform Specification: LinkedIn Post

> The primary short form format on LinkedIn. Targets the audience defined in [[audience/]] using the voice defined in [[voice/linkedin-tone]], written in the language configured in [[config.md]].

References: [[voice/linkedin-tone]], [[voice/brand-voice]], [[engine/hooks]], [[engine/templates]], [[audience/]], [[voice/anti-patterns]], [[config.md]]

---

## What It Is

A LinkedIn post is the primary format for reaching your LinkedIn audience. The language, audience profile, and perspective are defined in [[config.md]] and [[audience/]]. The tone is practical and consequence driven: what does this mean for the reader's company, team, or operations?

These posts are original pieces written for the specific audience you serve on LinkedIn. If your X content serves a different audience (e.g., technical builders), your LinkedIn posts should not be translations of X content. They should be written from scratch for the LinkedIn audience's concerns and language.

---

## Format Constraints

- **Language:** Use the language configured for LinkedIn in [[config.md]]. Avoid unnecessary foreign jargon unless the term has no native equivalent (tool names like "ChatGPT" or "Slack" stay as they are).
- **Length:** Typically 200 to 800 words. LinkedIn shows a "see more" fold after approximately 3 lines on mobile, so the first 3 lines carry the entire weight of whether someone reads further.
- **Hashtags:** Zero preferred. Maximum 3 if strategically necessary, placed at the very end of the post, never inline.
- **Mentions:** Tag people or companies only when genuinely relevant to the content.
- **Links:** LinkedIn suppresses posts with external links. If a link is necessary, place it in the first comment, not in the post body. The post itself should be self-contained.
- **Emojis:** Do not use emojis. They undermine a professional, direct tone.

---

## Content Structure

Posts follow one of four patterns. Each pattern is designed for your LinkedIn audience and connects to [[engine/hooks]].

### Pattern 1: Weekly Story (Detail, Narrative, Concrete Observation)

Starts with a specific detail from real work, builds a short narrative around it, and lands on a concrete observation the reader can relate to from their own company. The detail must be specific enough to feel real: a number, a time, a situation.

### Pattern 2: Local Translation (Global Event, What It Means for Your Reader's Business)

Takes a global development (new tool launch, industry shift, big company announcement) and translates it into consequences for your reader's specific business context. The question this pattern answers: "What does this mean for a company like mine?"

### Pattern 3: Uncomfortable Truth (Situation Everyone Recognizes, Consequence Nobody Says Out Loud)

Starts with a workplace situation that your audience encounters regularly, then articulates a consequence or implication that people feel but do not say publicly. This pattern works because it validates what readers are already thinking.

### Pattern 4: Tool/Service Translation (Name, What It Does in Plain Language, Business Consequence)

Introduces a specific tool, service, or approach in language a non-technical decision maker can understand. Explains what it does, what business problem it solves, and what the consequence is of using it versus not using it. No technical jargon, no feature lists.

---

## Visual Requirements

Visuals are optional but recommended. LinkedIn posts with images get significantly more engagement.

- **Tool cards:** Use your image export pipeline to create visual cards, comparison visuals, or data visualizations
- **Dimensions:** LinkedIn standard single image is 1200x627 (1.91:1). For taller, more feed-dominant images, 1080x1350 (4:5 portrait) works well. Choose dimensions that suit your content.
- **Language on visuals:** Match the language of the post. Tool names and interface screenshots can stay in English.
- **Brand:** Apply your brand colors and typography consistently. Reference [[config.md]] or your brand guide for specifics.

---

## Voice Reference

Follow [[voice/linkedin-tone]].

Core principles: narrative rather than declarative, consequence framing rather than feature listing, respectful of the reader's intelligence, grounded in observable business reality. Write as someone who works with these tools daily and is sharing what they see, not as someone selling a service.

Review [[voice/anti-patterns]] before publishing. No hype words, no dramatic fragment pairs, no fabricated statistics.

---

## Examples

Adapt these structures with examples relevant to your brand and audience. Replace specific details (industries, currencies, job titles) with what matches your market.

### Example 1: The Number That Stings (Pattern 1)

```
14 hours.

That is how much time one person on the team spent last week manually checking data that an AI tool would have processed in 20 minutes.

Nobody flagged it. Nobody knew the tool existed. The manager only found out when they reviewed the time allocation for the month.

This is not a story about laziness or incompetence. It is a story about how fast the world is changing, and how slowly information reaches the people who need it.

Every week your team spends on tasks that could be automated is not just a cost of time. It is an opportunity cost: projects you do not start, customers you do not serve, improvements you do not implement.

The question is not whether you can afford AI tools. The question is whether you can afford to have your people spending hours on work that a machine does better and faster.
```

### Example 2: Uncomfortable Truth (Pattern 3)

```
In the middle of a meeting, the director asked: "Does this mean we will need fewer people?"

The question every leader thinks about but rarely asks out loud.

My answer: not necessarily fewer people. But certainly different people, or the same people doing different things.

AI does not replace the accountant. But an accountant who knows how to use AI does in one day what used to take three. And then the question becomes: what do they do the other two days? If the answer is "the same as before, just slower," you have a problem.

The companies that will be most successful in the next two years will not be the ones with the most employees or the best technology. They will be the ones that recognize fastest which tasks should be automated, and which tasks require human judgment that no algorithm can replace.

This is not a decision for the IT department. This is a strategic decision for leadership.
```

### Example 3: Uncomfortable Comparison (Pattern 1)

```
Yesterday I prepared a complete competitive analysis for a client, including pricing review, positioning, digital channels, and content strategy.

Time: 3 hours.

A year ago, the same analysis would have taken two weeks and an external consultant.

The difference is not that I got smarter. The difference is that I now have access to tools that do in minutes the research that used to take hours of manual browsing.

The client was surprised by the speed. But what surprised me more was something else: their competitors are not doing this analysis at all. Not because they do not want to. Because they think it is too expensive and too time consuming.

That is where the opportunity lies. A company that uses the right tools for analysis today is no longer competing with other companies. It is competing with their outdated assumptions about what is possible.
```

### Example 4: Local Translation (Pattern 2)

```
A company that today hires a new person for work that AI can do in 10 minutes is not making a hiring mistake. It is making a strategic mistake.

That sounds harsh. But look at the numbers.

Average salary for administrative work in [your market]: somewhere between [range]. Total employer cost with benefits and overhead: close to [amount] per month. Annual cost: [amount].

An AI tool that automates 80% of the repetitive tasks in that role: [amount] per month.

I am not saying fire people. I am saying that every new hire is an opportunity to ask: is this person doing work that requires human judgment, creativity, and empathy? Or are they doing work that a machine would do faster, cheaper, and with fewer errors?

Companies that do not ask themselves this question before every hire will discover in two years that their costs are twice those of competitors who did.
```

---

## Pre-Publish Checklist

1. The post is written in the language configured for LinkedIn in [[config.md]].
2. The first 3 lines (before LinkedIn's "see more" fold) create enough tension or curiosity to earn the click.
3. The post follows one of the four patterns (weekly story, local translation, uncomfortable truth, tool/service translation).
4. Every claim passes the "what does this mean for a company like mine" test for your audience.
5. No hashtags inline. Maximum 3 at the very end if used at all.
6. No links in the post body (place in first comment if needed).
7. No emojis.
8. Visual (if included) uses your brand guidelines and image export pipeline.
9. No hype words, no dramatic fragment pairs, no dashes as punctuation.
10. Voice matches [[voice/linkedin-tone]].
11. Reviewed against [[voice/anti-patterns]].
