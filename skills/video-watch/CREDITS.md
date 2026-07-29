# Credits and third-party notices

The core pipeline scripts in `scripts/` (`download.py`, `frames.py`, `transcribe.py`, `whisper.py`)
are vendored from the open-source video-watching engine:

- bradautomates/claude-video (https://github.com/bradautomates/claude-video) — MIT License
- packaged as the Claude Code skill Newuxtreme/watch-video-skill (https://github.com/Newuxtreme/watch-video-skill) — MIT License

These are reused under the MIT License. Original copyright belongs to their respective authors.

## Local additions (this skill)

- `scripts/whisper_local.py`: a local, offline transcription backend using faster-whisper
  (https://github.com/SYSTRAN/faster-whisper, MIT), added so the skill works fully free and
  offline with no API key.
- `scripts/watch.py`: adapted to add the `local` Whisper backend and a transcription-backend
  selection order (captions, then local faster-whisper, then optional cloud Groq/OpenAI).
- `setup.sh`: installs ffmpeg + yt-dlp and provisions the local faster-whisper venv.

## Runtime tools

- yt-dlp (https://github.com/yt-dlp/yt-dlp) — Unlicense
- ffmpeg (https://ffmpeg.org) — LGPL/GPL
- faster-whisper (https://github.com/SYSTRAN/faster-whisper) — MIT
