#!/usr/bin/env node
// Renders every slides/*.md deck to PowerPoint, one deck at a time, so a
// hang in one deck's Chromium render doesn't stall the whole batch and
// leaves no output. Skips decks whose .pptx is already newer than the
// source (and the theme). Usage: node scripts/build-pptx.js [outDir]
// Timeout per deck: PPTX_TIMEOUT_SECONDS env var, default 300.
// Editable (native, re-editable in PowerPoint) pptx instead of the default
// pre-rendered-image pptx: PPTX_EDITABLE=1. Experimental (marp-cli #82:
// https://github.com/orgs/marp-team/discussions/82) - needs LibreOffice
// Impress installed, and can fail on individual slides/themes; failures
// still surface per-deck in the summary below rather than hanging.
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const MARP_PKG = '@marp-team/marp-cli@^4.0.1';

const repoRoot = path.join(__dirname, '..');
// resolve (not join): an absolute argv[2] must override repoRoot, not be
// concatenated onto it.
const outDir = path.resolve(repoRoot, process.argv[2] || 'dist');
const slidesDir = path.join(repoRoot, 'slides');
const themeFile = path.join(repoRoot, 'themes', 'algorithms.css');

const timeoutSeconds = Number(process.env.PPTX_TIMEOUT_SECONDS) || 300;
const timeoutMs = timeoutSeconds * 1000;
const editable = /^(1|true)$/i.test(process.env.PPTX_EDITABLE || '');

function newestMtime(...files) {
  return Math.max(...files.map((f) => fs.statSync(f).mtimeMs));
}

function buildDeck(srcPath, destPath) {
  const args = [
    '--yes', MARP_PKG,
    srcPath,
    '--theme-set', themeFile,
    '--html', '--pptx', '--allow-local-files',
    '-o', destPath,
  ];
  if (editable) args.push('--pptx-editable');
  return spawnSync('npx', args, { timeout: timeoutMs, encoding: 'utf8' });
}

function main() {
  if (!fs.existsSync(slidesDir)) {
    console.log('No slides/ directory, nothing to build.');
    return;
  }
  fs.mkdirSync(outDir, { recursive: true });

  if (editable) {
    console.log('PPTX_EDITABLE=1: generating editable pptx (needs LibreOffice Impress; experimental).');
  }

  const decks = fs.readdirSync(slidesDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  let built = 0;
  let skipped = 0;
  const failed = [];

  for (const file of decks) {
    const srcPath = path.join(slidesDir, file);
    const destPath = path.join(outDir, file.replace(/\.md$/, '.pptx'));

    if (fs.existsSync(destPath)) {
      const destMtime = fs.statSync(destPath).mtimeMs;
      if (destMtime >= newestMtime(srcPath, themeFile)) {
        console.log(`Skipped ${file} (up to date)`);
        skipped += 1;
        continue;
      }
    }

    let attempt = 0;
    let ok = false;
    while (attempt < 2 && !ok) {
      attempt += 1;
      const start = Date.now();
      const result = buildDeck(srcPath, destPath);
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);

      if (result.error && result.error.code === 'ETIMEDOUT') {
        if (fs.existsSync(destPath)) fs.rmSync(destPath, { force: true });
        console.log(
          `Timed out ${file} after ${timeoutSeconds}s` +
          (attempt < 2 ? ' - retrying' : ' - giving up'),
        );
        continue;
      }

      if (result.status === 0 && fs.existsSync(destPath)) {
        console.log(`Built ${file} -> ${path.relative(repoRoot, destPath)} (${elapsed}s)`);
        built += 1;
        ok = true;
      } else {
        if (fs.existsSync(destPath)) fs.rmSync(destPath, { force: true });
        const stderr = (result.stderr || '').trim().split('\n').slice(-5).join('\n');
        console.log(`Failed ${file} (${elapsed}s)${stderr ? `:\n${stderr}` : ''}`);
        break;
      }
    }

    if (!ok) failed.push(file);
  }

  console.log(
    `Done: ${built} built, ${skipped} skipped, ${failed.length} failed` +
    (failed.length ? ` (${failed.join(', ')})` : ''),
  );
  if (failed.length) process.exitCode = 1;
}

main();
