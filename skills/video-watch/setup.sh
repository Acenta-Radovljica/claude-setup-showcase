#!/usr/bin/env bash
# Setup for the video-watch skill: ffmpeg, yt-dlp, and a local faster-whisper venv.
# Idempotent. Safe to re-run (also use it to upgrade yt-dlp, which moves fast).
set -euo pipefail
SK="$(cd "$(dirname "$0")" && pwd)"
echo "video-watch setup ($SK)"

# 1. ffmpeg + ffprobe (frame + audio extraction)
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "installing ffmpeg..."; brew install ffmpeg
else
  echo "ffmpeg present: $(command -v ffmpeg)"
fi

# 2. yt-dlp (download + caption fetch across 1000+ sites). Keep it current.
if ! command -v yt-dlp >/dev/null 2>&1; then
  echo "installing yt-dlp..."; brew install yt-dlp
else
  echo "yt-dlp present: $(yt-dlp --version). upgrading..."; brew upgrade yt-dlp 2>/dev/null || true
fi

# 3. Local Whisper (free, offline transcription) via a dedicated uv venv
if ! command -v uv >/dev/null 2>&1; then
  echo "uv not found. Install it (https://docs.astral.sh/uv/) or rely on cloud Whisper keys instead."
  exit 1
fi
if [ ! -x "$SK/.venv/bin/python" ]; then
  echo "creating venv..."; uv venv "$SK/.venv"
fi
echo "installing/upgrading faster-whisper..."
uv pip install --python "$SK/.venv/bin/python" --upgrade faster-whisper
"$SK/.venv/bin/python" -c "import faster_whisper; print('faster-whisper', faster_whisper.__version__)"

echo ""
echo "done. Local transcription is ready (free, offline)."
echo "Optional faster cloud transcription: set GROQ_API_KEY or OPENAI_API_KEY"
echo "(env, or in ~/.config/watch/.env)."
