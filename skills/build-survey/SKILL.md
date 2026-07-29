---
name: build-survey
description: Generate a complete, single-file HTML survey/questionnaire from a text or markdown file containing questions and sections. Use when the user wants to create a web-based survey, quiz, assessment, or questionnaire.
disable-model-invocation: true
argument-hint: [path-to-questions-file]
allowed-tools: Read Write Bash(open *)
---

# Build HTML Survey from Questions Document

Read the questions document at: $ARGUMENTS

## What you must do

1. **Read the input file** and identify:
   - Survey title and subtitle
   - Sections/categories (each group of questions becomes a scored category)
   - Individual questions within each section
   - Answer options (if specified; otherwise create a 1-5 Likert scale)
   - Any scoring instructions

2. **Generate a single, self-contained HTML file** with everything inline (CSS + JS in the same file, no external dependencies except CDN libraries listed below).

3. **Save the output** to the same directory as the input file, named `survey.html` (or ask the user if they want a different name).

## Required features (include ALL of these)

### Core survey
- Clean, modern, mobile-responsive design
- One section visible at a time (step-by-step navigation)
- Progress bar showing completion
- "Next" and "Back" buttons between sections
- All questions required before advancing

### Scoring system
- Each answer has a numeric value (1-5 by default)
- Calculate a percentage score per section: (actual points / max points) * 100
- Calculate an overall score (average of section scores)
- Show results on a final "Results" screen

### Radar/spider chart
- Use Chart.js from CDN (https://cdn.jsdelivr.net/npm/chart.js)
- One axis per section/category
- Filled polygon showing the score profile
- Clean labels, readable on mobile

### Result sharing via URL
- Encode all section scores into a URL query string (base64 or simple params)
- "Copy link" button that copies the shareable URL
- When someone opens the URL with scores in it, skip straight to the results screen

### PDF export
- "Download PDF" button on the results screen
- Use html2canvas + jsPDF from CDN
- Export the results screen (chart + scores) as a one-page PDF

### Email webhook (Make.com / Zapier)
- Include a hidden form or fetch() call that sends results to a webhook URL
- The webhook URL should be a clearly marked placeholder: `YOUR_WEBHOOK_URL_HERE`
- Send: respondent name/email (if collected), section scores, overall score, shareable URL
- Trigger the webhook when results are calculated

## Styling guidelines
- Read the client's CLAUDE.md for brand colors, fonts, and tone
- If no brand info is available, use a clean neutral palette (white background, dark text, one accent color)
- Professional and trustworthy look -- this is for business use, not a fun quiz
- Smooth transitions between sections (CSS transitions, not jarring)
- Minimum font size 16px for readability

## Structure of the output HTML
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Survey Title]</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <style>/* All CSS here */</style>
</head>
<body>
  <!-- Welcome/intro screen -->
  <!-- Section screens (one per category) -->
  <!-- Results screen with chart, scores, share button, PDF button -->
  <script>/* All JS here */</script>
</body>
</html>
```

## Common beginner mistakes to avoid
- Do NOT forget `<meta name="viewport">` -- without it, the survey looks broken on phones
- Do NOT use document.write() -- use DOM manipulation
- Do NOT forget to URL-encode the shareable link parameters
- Do NOT load Chart.js before the canvas element exists -- initialize the chart in a function called after the results screen is shown
- Make sure the PDF export waits for the chart to fully render before capturing

## After generating
- Tell the user the file path where you saved it
- Explain how to replace YOUR_WEBHOOK_URL_HERE with their actual Make.com webhook
- Remind them to test on mobile (they can open the file locally or deploy to Netlify)
- Ask if they want to adjust colors, add/remove questions, or change the scoring logic
