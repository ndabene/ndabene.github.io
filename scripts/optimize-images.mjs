/**
 * Image optimization script — P3 & P4
 *
 * P3a: Convert JPG/PNG → WebP (quality 85) if no WebP counterpart exists
 * P3b: Recompress oversized WebP files (> 300 KB)
 * P3c: Update _posts front matter image: .jpg/.png → .webp
 * P4:  Generate AVIF variants (-480, -720, -1080) for images using the responsive system
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..').split(path.sep).join('/');
const ASSETS = ROOT + '/assets/images';
const POSTS_DIRS = [path.join(ROOT, '_posts'), path.join(ROOT, '_posts_en')];

// ─── helpers ────────────────────────────────────────────────────────────────

function walk(dir, exts) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = dir + '/' + entry.name;
    if (entry.isDirectory()) results.push(...walk(full, exts));
    else if (exts.some(e => entry.name.toLowerCase().endsWith(e))) results.push(full);
  }
  return results;
}

// Normalize path to forward slashes (sharp fails on Windows backslash paths)
function norm(p) { return p.split(path.sep).join('/'); }

function sizeKB(file) {
  return Math.round(fs.statSync(file).size / 1024);
}

function isVariant(file) {
  return /-\d+\.(webp|avif)$/.test(file);
}

// ─── P3a: JPG/PNG → WebP ────────────────────────────────────────────────────

async function convertToWebp() {
  console.log('\n── P3a: Converting JPG/PNG → WebP ──');
  const sources = walk(ASSETS, ['.jpg', '.jpeg', '.png']).filter(f => !isVariant(f));
  let converted = 0;
  let skipped = 0;

  for (const src of sources) {
    const webpPath = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    if (fs.existsSync(webpPath)) { skipped++; continue; }
    try {
      const buf = fs.readFileSync(src);
      const out = await sharp(buf).webp({ quality: 85 }).toBuffer();
      fs.writeFileSync(webpPath, out);
      const before = sizeKB(src);
      const after = sizeKB(webpPath);
      console.log(`  ✓ ${path.relative(ROOT, src)} (${before}KB → ${after}KB webp)`);
      converted++;
    } catch (e) {
      console.error(`  ✗ ${path.relative(ROOT, src)}: ${e.message}`);
    }
  }
  console.log(`  → ${converted} converted, ${skipped} already had WebP`);
  return converted;
}

// ─── P3b: Recompress oversized WebP ─────────────────────────────────────────

async function recompressOversized() {
  console.log('\n── P3b: Recompressing WebP > 300 KB ──');
  const THRESHOLD_KB = 300;
  const webpFiles = walk(ASSETS, ['.webp']).filter(f => !isVariant(f));
  let recompressed = 0;

  for (const file of webpFiles) {
    const kb = sizeKB(file);
    if (kb <= THRESHOLD_KB) continue;

    const tmp = file + '.tmp';
    try {
      // Read file as buffer to bypass Windows path handling in libvips
      const inputBuf = fs.readFileSync(file);
      const outputBuf = await sharp(inputBuf).webp({ quality: 82, effort: 6 }).toBuffer();
      const after = Math.round(outputBuf.length / 1024);
      if (after < kb) {
        fs.chmodSync(file, 0o644);
        fs.writeFileSync(file, outputBuf);
        console.log(`  ✓ ${path.relative(ROOT, file)}: ${kb}KB → ${after}KB`);
        recompressed++;
      }
    } catch (e) {
      console.error(`  ✗ ${path.relative(ROOT, file)}: ${e.message}`);
    }
  }
  console.log(`  → ${recompressed} files recompressed`);
}

// ─── P3c: Update front matter image references ──────────────────────────────

function updateFrontMatter() {
  console.log('\n── P3c: Updating front matter image: .jpg/.png → .webp ──');
  const mdFiles = POSTS_DIRS.flatMap(d => walk(d, ['.md']));
  let updated = 0;

  for (const md of mdFiles) {
    const content = fs.readFileSync(md, 'utf8');
    const newContent = content.replace(
      /^(image:\s+)(\/assets\/images\/[^\s]+)\.(jpg|jpeg|png)(\s*)$/m,
      (match, prefix, imgPath, ext, tail) => {
        const webpAbs = path.join(ROOT, imgPath + '.webp');
        return fs.existsSync(webpAbs) ? `${prefix}${imgPath}.webp${tail}` : match;
      }
    );
    if (newContent !== content) {
      fs.writeFileSync(md, newContent, 'utf8');
      console.log(`  ✓ ${path.relative(ROOT, md)}`);
      updated++;
    }
  }
  console.log(`  → ${updated} posts updated`);
}

// ─── P4: Generate AVIF variants ─────────────────────────────────────────────

async function generateAvifVariants() {
  console.log('\n── P4: Generating AVIF variants (-480, -720, -1080) ──');
  const SIZES = [480, 720, 1080];
  const allWebp = walk(ASSETS, ['.webp']).filter(f => !isVariant(f));
  let generated = 0;
  let skipped = 0;

  for (const webpFile of allWebp) {
    const base = webpFile.replace(/\.webp$/, '');
    // Only process images that use the responsive variant system
    const hasVariants = SIZES.some(s => fs.existsSync(`${base}-${s}.webp`));
    if (!hasVariants) continue;

    for (const size of SIZES) {
      const sourceVariant = `${base}-${size}.webp`;
      const avifVariant = `${base}-${size}.avif`;

      if (fs.existsSync(avifVariant)) { skipped++; continue; }
      if (!fs.existsSync(sourceVariant)) continue;

      try {
        const buf = fs.readFileSync(sourceVariant);
        const out = await sharp(buf).avif({ quality: 60, effort: 6 }).toBuffer();
        fs.writeFileSync(avifVariant, out);
        const srcKb = sizeKB(sourceVariant);
        const kb = sizeKB(avifVariant);
        console.log(`  ✓ ${path.relative(ROOT, avifVariant)} (${srcKb}KB → ${kb}KB)`);
        generated++;
      } catch (e) {
        console.error(`  ✗ ${path.relative(ROOT, avifVariant)}: ${e.message}`);
      }
    }
  }
  console.log(`  → ${generated} AVIF variants generated, ${skipped} already existed`);
}

// ─── main ────────────────────────────────────────────────────────────────────

(async () => {
  console.log('=== Image optimization ===\n');
  await convertToWebp();
  await recompressOversized();
  updateFrontMatter();
  await generateAvifVariants();
  console.log('\n=== Done ===');
})();
