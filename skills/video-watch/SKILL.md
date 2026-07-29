---
name: video-watch
description: Watch, see, transcribe, or analyze a video from YouTube, TikTok, Instagram, X/Twitter, or a local file. Use when the user wants Claude to actually watch a video (not just read its title), summarize or take notes on a video, transcribe it, pull quotes, describe what is shown on screen, or answer questions about a specific video or a moment in it. Triggers on a pasted video URL with intent, or phrases like "watch this", "what happens in this video", "transcribe this", "summarize this reel/short/clip", "take notes on this video".
---

# Video Watch

Claude cannot stream video directly. This skill gives it eyes and ears: a Python pipeline downloads the video, extracts auto-scaled JPEG frames with ffmpeg, and pulls a timestamped transcript (native captions first, then local faster-whisper, then optional cloud Whisper). It prints a markdown report listing every frame path. Claude then `Read`s each frame, aligns it to the spoken text, and writes structured notes.

Works for YouTube, TikTok, Instagram, X/Twitter, Vimeo, and any of the 1000+ sites yt-dlp supports, plus local video files.

## Protect the context window: prefer the agent for anything non-trivial

Reading 40 to 100 frames into the main session burns a lot of context. For most requests, delegate to the **`video-analyst`** agent (Task tool, subagent_type `video-analyst`). It runs this pipeline, reads the frames in its own context, and returns just the structured summary. Run the pipeline inline only for short clips where the user wants the raw frames in the main conversation, or when already inside a subagent.

## Dependencies (one-time)

Run the setup once:

```
bash ~/.claude/skills/video-watch/setup.sh
```

It installs `ffmpeg` + `yt-dlp` (Homebrew) and creates a local faster-whisper venv at `.venv/`. Local transcription is free and offline. Optionally set `GROQ_API_KEY` or `OPENAI_API_KEY` (env or `~/.config/watch/.env`) for faster cloud transcription on long videos.

**Always run the pipeline with the venv python** so the local Whisper backend is importable:

```
~/.claude/skills/video-watch/.venv/bin/python ~/.claude/skills/video-watch/scripts/watch.py "<url-or-path>" [flags]
```

## Transcript priority

1. **Native captions** via yt-dlp (free, instant, best for YouTube and any captioned video).
2. **Local faster-whisper** (free, offline, the zero-config default when no captions exist). First run downloads the model (~0.5 GB for `small`). Model size via `VIDEO_WATCH_WHISPER_MODEL` (tiny|base|small|medium|large-v3, default `small`).
3. **Cloud Groq/OpenAI Whisper** only when forced with `--whisper groq|openai` and the matching key is set (fastest for long audio).

## Flags

- `--start T` / `--end T` (SS, MM:SS, or HH:MM:SS): focus on a section. Denser frames inside the range. Use for any question about a specific moment, or for any video over 10 minutes.
- `--max-frames N`: cap (default 80, hard max 100). Lower for a tighter token budget.
- `--resolution W`: frame width in px (default 512; bump to 1024 only if on-screen text is unreadable).
- `--whisper local|groq|openai`: force a transcription backend.
- `--no-whisper`: frames only, skip transcription entirely.
- `--out-dir DIR`: keep working files somewhere specific (default: an auto tmp dir).

Auto frame budget (full-video mode): up to 30s gets up to 30 frames; 30 to 60s about 40; 1 to 3 min about 60; 3 to 10 min about 80; over 10 min caps at 100 sparse (a warning prints; prefer `--start`/`--end`).

## Workflow

### 1. Run the pipeline

```
~/.claude/skills/video-watch/.venv/bin/python ~/.claude/skills/video-watch/scripts/watch.py "<source>"
```

For a long video where the question is about one part, focus it:

```
... watch.py "<source>" --start 2:15 --end 2:45
```

The script writes to a working directory and prints a markdown report to stdout containing a header, a `## Frames` section with `- \`<absolute-path>\` (t=MM:SS)` lines, a `## Transcript` section with `[MM:SS] text` lines, and a footer with the work dir.

### 2. Read every frame

Read all listed frame paths in a single message (parallel `Read` calls). The Read tool renders JPEGs as images. Pair each frame's `t=MM:SS` with the matching transcript line at that timestamp.

### 3. Write the summary

Default output: `<work-dir>/<slug>-notes.md`. If the user wants notes saved permanently, save under the relevant project's folder in your workspace root (ask if unclear), never the home root. Structure:

```markdown
# <Title>

**Source:** <URL or local path>
**Duration:** <mm:ss>  **Uploader:** <if available>  **Transcript source:** <captions / faster-whisper (local) / whisper (groq|openai) / none>

## One-line summary
<= 20 words, the core hook>

## TL;DR
<3 to 5 bullets of the main points>

## Timeline
- **[00:00]** <what is shown visually + the key line spoken>
- **[00:15]** ...

## Key quotes
> "<verbatim quote>" [mm:ss]

## Visual notes
<what the footage shows that the transcript alone misses: setting, B-roll, on-screen text, graphics, transitions, the subject's emotion>
```

### 4. Clean up

After the notes file is written, delete the work dir (it holds the full downloaded video + frames, which is large). The report footer prints `Work dir: <path>`. If the user passed a non-tmp `--out-dir`, ask before deleting.

## Platform notes and responsible use

- **YouTube:** most reliable. Age-restricted or members-only may need `--cookies-from-browser firefox` (or chrome/safari).
- **TikTok:** public content works; you usually get the watermarked version. Private/following-only needs cookies.
- **Instagram:** public posts and reels work; profiles, stories, and full resolution need login cookies (`--cookies-from-browser ...`).
- **X/Twitter:** public posts with video work; `x.com` links sometimes need rewriting to `twitter.com`.
- **Responsible use:** download only what you have the right to access, for analysis/summary, not redistribution. Respect each platform's terms of service and creators' rights. This is a tool for understanding content, not republishing it.

## Common gotchas

- yt-dlp moves fast. If a download fails on a platform, re-run `setup.sh` to upgrade it, and surface yt-dlp's stderr verbatim rather than retrying silently.
- No captions and the first local Whisper run will pause to download the model. That is expected once, then cached.
- Local file with no audio track: local Whisper errors cleanly. Use `--no-whisper` for frames only.
- Very long videos (over 30 min): confirm with the user. The 100-frame cap bounds cost, but a sparse scan of an hour-long video is rarely useful. Focus with `--start`/`--end`.

## What not to do

- Never invent a video's content from its title or thumbnail. If the pipeline fails, say so.
- Never write the summary before actually reading the frames. The transcript alone misses visual context.
- Never skip cleanup. Frame dumps and downloaded videos are large.

## Engine attribution

The stdlib pipeline scripts (`download.py`, `frames.py`, `transcribe.py`, `whisper.py`) are vendored from [bradautomates/claude-video](https://github.com/bradautomates/claude-video) / [Newuxtreme/watch-video-skill](https://github.com/Newuxtreme/watch-video-skill) (MIT). The local faster-whisper backend (`whisper_local.py`) and its selection logic were added here. See `CREDITS.md`.
