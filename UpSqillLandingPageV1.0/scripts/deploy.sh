#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
TERRAFORM_DIR="${ROOT_DIR}/terraform"
FRONTEND_DIR="${ROOT_DIR}/frontend"
ASSETS_DIR="${FRONTEND_DIR}/assets"
BUILD_DIR="${ROOT_DIR}/.tmp-deploy"

cleanup() {
  rm -rf "${BUILD_DIR}"
}

trap cleanup EXIT

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_file() {
  if [ ! -f "$1" ]; then
    echo "Missing required file: $1" >&2
    exit 1
  fi
}

require_command aws
require_command terraform
require_file "${FRONTEND_DIR}/index.html"
require_file "${FRONTEND_DIR}/styles.css"
require_file "${FRONTEND_DIR}/script.js"

if [ ! -d "${ASSETS_DIR}" ]; then
  echo "Missing required directory: ${ASSETS_DIR}" >&2
  exit 1
fi

BUCKET="$(terraform -chdir="${TERRAFORM_DIR}" output -raw s3_frontend_bucket)"
DISTRIBUTION_ID="$(terraform -chdir="${TERRAFORM_DIR}" output -raw cloudfront_distribution_id)"

rm -rf "${BUILD_DIR}"
mkdir -p "${BUILD_DIR}/assets"

cp "${FRONTEND_DIR}/index.html" "${BUILD_DIR}/index.html"
cp "${FRONTEND_DIR}/styles.css" "${BUILD_DIR}/styles.css"
cp "${FRONTEND_DIR}/script.js" "${BUILD_DIR}/script.js"

if [ -f "${FRONTEND_DIR}/404.html" ]; then
  cp "${FRONTEND_DIR}/404.html" "${BUILD_DIR}/404.html"
fi

cp -R "${ASSETS_DIR}/." "${BUILD_DIR}/assets/"

aws s3 sync "${BUILD_DIR}/" "s3://${BUCKET}/" \
  --delete \
  --exclude "index.html" \
  --exclude "404.html" \
  --cache-control "public,max-age=300,must-revalidate"

aws s3 cp "${BUILD_DIR}/index.html" "s3://${BUCKET}/index.html" \
  --cache-control "no-cache,no-store,must-revalidate" \
  --content-type "text/html; charset=utf-8"

if [ -f "${BUILD_DIR}/404.html" ]; then
  aws s3 cp "${BUILD_DIR}/404.html" "s3://${BUCKET}/404.html" \
    --cache-control "no-cache,no-store,must-revalidate" \
    --content-type "text/html; charset=utf-8"
fi

aws cloudfront create-invalidation \
  --distribution-id "${DISTRIBUTION_ID}" \
  --paths "/*" >/dev/null

echo "Deployed to s3://${BUCKET}"
echo "Invalidated CloudFront distribution ${DISTRIBUTION_ID}"
