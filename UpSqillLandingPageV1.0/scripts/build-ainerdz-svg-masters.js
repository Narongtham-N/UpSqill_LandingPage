#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const masterDir = path.join(root, "frontend/assets/brand/aineardz/master");
const rasterDir = path.join(masterDir, "raster");

function readPngSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    throw new Error(`${filePath} is not a PNG file`);
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function writeEmbeddedPngSvg({ source, output, title, desc }) {
  const sourcePath = path.join(rasterDir, source);
  const outputPath = path.join(masterDir, output);
  const { width, height } = readPngSize(sourcePath);
  const data = fs.readFileSync(sourcePath).toString("base64");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">${desc}</desc>
  <image href="data:image/png;base64,${data}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/>
</svg>
`;

  fs.writeFileSync(outputPath, svg);
  console.log(`Wrote ${path.relative(root, outputPath)} (${width}x${height})`);
}

const masters = [
  {
    source: "aineardz-logo-light-source.png",
    output: "aineardz-logo-master.svg",
    title: "AINERDZ complete logo master",
    desc: "Pixel-perfect SVG master embedding the approved light AINERDZ logo lockup.",
  },
  {
    source: "aineardz-logo-dark-source.png",
    output: "aineardz-logo-master-dark.svg",
    title: "AINERDZ complete logo master dark",
    desc: "Pixel-perfect SVG master embedding the approved dark AINERDZ logo lockup.",
  },
  {
    source: "aineardz-symbol-source.png",
    output: "aineardz-symbol-master.svg",
    title: "AINERDZ rocket-node symbol master",
    desc: "Pixel-perfect SVG master embedding the approved AINERDZ rocket-node symbol.",
  },
  {
    source: "aineardz-wordmark-light-source.png",
    output: "aineardz-wordmark-master.svg",
    title: "AINERDZ wordmark master",
    desc: "Pixel-perfect SVG master embedding the approved light wordmark crop from the final lockup.",
  },
  {
    source: "aineardz-wordmark-dark-source.png",
    output: "aineardz-wordmark-master-dark.svg",
    title: "AINERDZ wordmark master dark",
    desc: "Pixel-perfect SVG master embedding the approved dark wordmark crop from the final lockup.",
  },
];

for (const master of masters) {
  writeEmbeddedPngSvg(master);
}
