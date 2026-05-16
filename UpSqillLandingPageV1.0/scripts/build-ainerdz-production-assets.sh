#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/frontend/assets/brand/aineardz/exports"
MASTER_DIR="$ROOT_DIR/frontend/assets/brand/aineardz/master"
MASTER_RASTER_DIR="$MASTER_DIR/raster"

LOGO_LIGHT="$ROOT_DIR/frontend/assets/logos/aineardz-complete-logo-lockup-v1.png"
LOGO_DARK="$ROOT_DIR/frontend/assets/logos/aineardz-complete-logo-lockup-dark-v1.png"
SYMBOL="$ROOT_DIR/frontend/assets/logos/ainerdz-rocket-node-logo-v1.png"
MASCOT="$ROOT_DIR/frontend/assets/mascots/aineardz-mascot-insight-hologram-v3.png"
MASCOT_CHROMA="$OUT_DIR/aineardz-mascot-chromakey-source-1254.png"
MASCOT_ALPHA="$OUT_DIR/aineardz-mascot-transparent-1254.png"

mkdir -p \
  "$MASTER_RASTER_DIR" \
  "$OUT_DIR/logo-light/png" "$OUT_DIR/logo-light/webp" "$OUT_DIR/logo-light/avif" \
  "$OUT_DIR/logo-dark/png" "$OUT_DIR/logo-dark/webp" "$OUT_DIR/logo-dark/avif" \
  "$OUT_DIR/symbol/png" "$OUT_DIR/symbol/webp" "$OUT_DIR/symbol/avif" \
  "$OUT_DIR/mascot/png" "$OUT_DIR/mascot/webp" "$OUT_DIR/mascot/avif" \
  "$OUT_DIR/mascot-transparent/png" "$OUT_DIR/mascot-transparent/webp"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

render_png_width() {
  local src="$1"
  local width="$2"
  local out="$3"
  ffmpeg -hide_banner -loglevel error -y -i "$src" \
    -vf "scale=${width}:-1:flags=lanczos" \
    -frames:v 1 "$out"
}

render_square_png() {
  local src="$1"
  local size="$2"
  local out="$3"
  ffmpeg -hide_banner -loglevel error -y -i "$src" \
    -vf "scale=${size}:${size}:flags=lanczos" \
    -frames:v 1 "$out"
}

encode_webp() {
  local src="$1"
  local out="$2"
  cwebp -quiet -q 86 "$src" -o "$out"
}

encode_avif() {
  local src="$1"
  local out="$2"
  ffmpeg -hide_banner -loglevel error -y -i "$src" \
    -frames:v 1 -c:v libaom-av1 -still-picture 1 -crf 30 -cpu-used 6 "$out"
}

export_width_family() {
  local src="$1"
  local family="$2"
  shift 2
  for width in "$@"; do
    local png="$OUT_DIR/$family/png/$family-${width}w.png"
    render_png_width "$src" "$width" "$png"
    encode_webp "$png" "$OUT_DIR/$family/webp/$family-${width}w.webp"
    encode_avif "$png" "$OUT_DIR/$family/avif/$family-${width}w.avif"
  done
}

export_square_family() {
  local src="$1"
  local family="$2"
  shift 2
  for size in "$@"; do
    local png="$OUT_DIR/$family/png/$family-${size}.png"
    render_square_png "$src" "$size" "$png"
    encode_webp "$png" "$OUT_DIR/$family/webp/$family-${size}.webp"
    encode_avif "$png" "$OUT_DIR/$family/avif/$family-${size}.avif"
  done
}

require_cmd ffmpeg
require_cmd cwebp
require_cmd node

cp "$LOGO_LIGHT" "$MASTER_RASTER_DIR/aineardz-logo-light-source.png"
cp "$LOGO_DARK" "$MASTER_RASTER_DIR/aineardz-logo-dark-source.png"
cp "$SYMBOL" "$MASTER_RASTER_DIR/aineardz-symbol-source.png"
ffmpeg -hide_banner -loglevel error -y -i "$LOGO_LIGHT" \
  -vf crop=1280:360:540:235 \
  "$MASTER_RASTER_DIR/aineardz-wordmark-light-source.png"
ffmpeg -hide_banner -loglevel error -y -i "$LOGO_DARK" \
  -vf crop=1280:360:540:235 \
  "$MASTER_RASTER_DIR/aineardz-wordmark-dark-source.png"
node "$ROOT_DIR/scripts/build-ainerdz-svg-masters.js"

if [[ -f "$MASCOT_CHROMA" ]]; then
  ffmpeg -hide_banner -loglevel error -y -i "$MASCOT_CHROMA" \
    -vf "format=rgba,colorkey=0x00ff00:0.34:0.12,despill=type=green:mix=0.32:expand=0.08:green=-0.65:blue=0.08" \
    "$MASCOT_ALPHA"
else
  echo "Missing transparent mascot chroma source: $MASCOT_CHROMA" >&2
  echo "Keep the checked-in transparent PNG if already generated, or regenerate the chroma source first." >&2
fi

export_width_family "$LOGO_LIGHT" "logo-light" 320 640 960 1280 1870
export_width_family "$LOGO_DARK" "logo-dark" 320 640 960 1280 1875
export_square_family "$SYMBOL" "symbol" 128 256 512 1024 1254
export_square_family "$MASCOT" "mascot" 256 512 768 1024 1254

if [[ -f "$MASCOT_ALPHA" ]]; then
  for size in 256 512 768 1024 1254; do
    png="$OUT_DIR/mascot-transparent/png/mascot-transparent-${size}.png"
    render_square_png "$MASCOT_ALPHA" "$size" "$png"
    encode_webp "$png" "$OUT_DIR/mascot-transparent/webp/mascot-transparent-${size}.webp"
  done
fi

echo "AINERDZ production assets exported to $OUT_DIR"
