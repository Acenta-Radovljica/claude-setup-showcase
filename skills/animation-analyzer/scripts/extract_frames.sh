#!/usr/bin/env bash
# Extract frames + contact-sheet montages from a video for animation analysis.
#
# Usage:
#   extract_frames.sh <video> <out_dir> [fps] [start] [end]
#
#   <video>    path to the screen recording (.mp4/.mov/.webm/.gif)
#   <out_dir>  where to write frames/, montages, and meta.txt
#   [fps]      frames per second to sample. Default: source native fps.
#              Pass a small number (e.g. 6) for a quick whole-clip overview,
#              then re-run at native fps on the trimmed segment.
#   [start]    optional start time (seconds or HH:MM:SS.xxx) to trim from
#   [end]      optional end time to trim to
#
# Writes:
#   <out_dir>/meta.txt          probe data + the fps actually used
#   <out_dir>/frames/f_0001.png individual frames at <fps>
#   <out_dir>/montage_001.png   6x6 contact sheets (36 frames each), indexed
#
# Frame index -> time:  time_ms = (index - 1) / fps * 1000
set -euo pipefail

VIDEO="${1:?usage: extract_frames.sh <video> <out_dir> [fps] [start] [end]}"
OUT="${2:?usage: extract_frames.sh <video> <out_dir> [fps] [start] [end]}"
FPS_ARG="${3:-}"
START="${4:-}"
END="${5:-}"

command -v ffmpeg >/dev/null  || { echo "ffmpeg not found (brew install ffmpeg)"; exit 1; }
command -v ffprobe >/dev/null || { echo "ffprobe not found (brew install ffmpeg)"; exit 1; }
[ -f "$VIDEO" ] || { echo "no such file: $VIDEO"; exit 1; }

mkdir -p "$OUT/frames"

# ---- probe ----
RFR=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$VIDEO" | head -1)
NUM=${RFR%/*}; DEN=${RFR#*/}; [ "$DEN" = "0" ] && DEN=1
NATIVE_FPS=$(awk "BEGIN{printf \"%.3f\", $NUM/$DEN}")
WH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$VIDEO" | head -1)
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIDEO" | head -1)

FPS="${FPS_ARG:-$NATIVE_FPS}"

# ---- trim args ----
TRIM=()
[ -n "$START" ] && TRIM+=(-ss "$START")
[ -n "$END" ]   && TRIM+=(-to "$END")

# ---- meta ----
{
  echo "video:       $VIDEO"
  echo "resolution:  $WH"
  echo "duration_s:  $DUR"
  echo "native_fps:  $NATIVE_FPS"
  echo "fps_used:    $FPS"
  [ -n "$START" ] && echo "trim_start:  $START"
  [ -n "$END" ]   && echo "trim_end:    $END"
  echo ""
  echo "frame index -> time_ms = (index - 1) / $FPS * 1000"
} > "$OUT/meta.txt"

# ---- individual frames ----
ffmpeg -hide_banner -loglevel error ${TRIM[@]+"${TRIM[@]}"} -i "$VIDEO" \
  -vf "fps=$FPS" -fps_mode passthrough "$OUT/frames/f_%04d.png"

N=$(find "$OUT/frames" -name 'f_*.png' | wc -l | tr -d ' ')
echo "frames:      $N" >> "$OUT/meta.txt"

# ---- contact-sheet montages: 6x6 grids, ~240px wide thumbs ----
# drawtext stamps each thumb with its frame index so you can read timing off the grid.
HASTEXT=$(ffmpeg -hide_banner -filters 2>/dev/null | grep -c drawtext || true)
if [ "$HASTEXT" -gt 0 ]; then
  LABEL=",drawtext=text='%{n}':x=4:y=4:fontsize=16:fontcolor=yellow:box=1:boxcolor=black@0.5"
else
  LABEL=""
fi
ffmpeg -hide_banner -loglevel error ${TRIM[@]+"${TRIM[@]}"} -i "$VIDEO" \
  -vf "fps=$FPS,scale=360:-1${LABEL},tile=5x5" "$OUT/montage_%03d.png" 2>/dev/null || \
ffmpeg -hide_banner -loglevel error ${TRIM[@]+"${TRIM[@]}"} -i "$VIDEO" \
  -vf "fps=$FPS,scale=360:-1,tile=5x5" "$OUT/montage_%03d.png"

M=$(find "$OUT" -maxdepth 1 -name 'montage_*.png' | wc -l | tr -d ' ')
echo "montages:    $M (5x5 grids; numbers on thumbs = frame index, 0-based per ffmpeg)" >> "$OUT/meta.txt"

cat "$OUT/meta.txt"
echo ""
echo "Next: Read the montage_*.png for an overview, then Read individual frames/f_*.png around the transition."
