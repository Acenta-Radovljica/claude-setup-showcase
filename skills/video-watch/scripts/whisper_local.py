#!/usr/bin/env python3
"""Local Whisper transcription via faster-whisper (CTranslate2). Free, offline, no API key.

Returns segments in the same {start, end, text} shape as transcribe.parse_vtt and
whisper._segments_from_response, so watch.py can use it interchangeably with the
cloud backends. This is the zero-config default when a video has no captions.
"""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent.resolve()
sys.path.insert(0, str(SCRIPT_DIR))

from whisper import extract_audio  # reuse the mono 16k mp3 extractor (pure stdlib)

DEFAULT_MODEL = os.environ.get("VIDEO_WATCH_WHISPER_MODEL", "small")
DEFAULT_COMPUTE = os.environ.get("VIDEO_WATCH_WHISPER_COMPUTE", "int8")


def is_available() -> bool:
    """True if faster-whisper can be imported in this interpreter."""
    try:
        import faster_whisper  # noqa: F401
        return True
    except Exception:
        return False


def transcribe_local(video_path: str, audio_out: Path, model_size: str | None = None) -> list[dict]:
    try:
        from faster_whisper import WhisperModel
    except Exception as exc:
        raise SystemExit(
            "faster-whisper is not installed in this interpreter. Run the skill's "
            f"setup.sh to create the venv, then run watch.py with that venv's python. ({exc})"
        )

    model_size = model_size or DEFAULT_MODEL
    print("[watch] extracting audio for local Whisper...", file=sys.stderr)
    audio_path = extract_audio(video_path, audio_out)

    print(
        f"[watch] loading faster-whisper '{model_size}' (first run downloads the model)...",
        file=sys.stderr,
    )
    model = WhisperModel(model_size, device="cpu", compute_type=DEFAULT_COMPUTE)

    print("[watch] transcribing locally...", file=sys.stderr)
    segments_iter, info = model.transcribe(str(audio_path))
    out: list[dict] = []
    for seg in segments_iter:
        text = (seg.text or "").strip()
        if not text:
            continue
        out.append({
            "start": round(float(seg.start or 0.0), 2),
            "end": round(float(seg.end or 0.0), 2),
            "text": text,
        })
    if not out:
        raise SystemExit("Local Whisper returned no segments (silent track or no audio).")
    print(f"[watch] transcribed {len(out)} segments locally (lang={info.language})", file=sys.stderr)
    return out


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("usage: whisper_local.py <video-path> [audio-out.mp3] [--model SIZE]", file=sys.stderr)
        raise SystemExit(2)
    video = sys.argv[1]
    audio_out = (
        Path(sys.argv[2]) if len(sys.argv) > 2 and not sys.argv[2].startswith("--") else Path("audio.mp3")
    )
    model = sys.argv[sys.argv.index("--model") + 1] if "--model" in sys.argv else None
    segs = transcribe_local(video, audio_out, model_size=model)
    print(json.dumps({"backend": "faster-whisper", "segments": segs}, indent=2))
