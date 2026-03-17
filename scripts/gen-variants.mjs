/**
 * Generate missing -480, -720, -1080 WebP + AVIF variants
 * for image-principale.webp files that have none.
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..').split(path.sep).join('/');
const ASSETS = ROOT + '/assets/images';
const SIZES = [480, 720, 1080];

function walk(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = dir + '/' + entry.name;
    if (entry.isDirectory()) results.push(...walk(full));
    else if (entry.name === 'image-principale.webp') results.push(full);
  }
  return results;
}

function sizeKB(file) { return Math.round(fs.statSync(file).size / 1024); }

const files = walk(ASSETS).filter(f => !SIZES.some(s => f.includes(`-${s}.`)));

// Filter: only those missing at least one variant
const targets = files.filter(f => {
  const base = f.replace(/\.webp$/, '');
  return SIZES.some(s => !fs.existsSync(`${base}-${s}.webp`));
});

console.log(`Found ${targets.length} image(s) missing variants\n`);

for (const src of targets) {
  const base = src.replace(/\.webp$/, '');
  const inputBuf = fs.readFileSync(src);
  const meta = await sharp(inputBuf).metadata();
  console.log(`Processing: ${src.replace(ROOT + '/', '')} (${meta.width}x${meta.height}, ${sizeKB(src)}KB)`);

  for (const size of SIZES) {
    const w = Math.min(size, meta.width);

    // WebP variant
    const webpOut = `${base}-${size}.webp`;
    if (!fs.existsSync(webpOut)) {
      const buf = await sharp(inputBuf).resize(w).webp({ quality: 85 }).toBuffer();
      fs.writeFileSync(webpOut, buf);
      console.log(`  ✓ WebP ${size}w → ${sizeKB(webpOut)}KB`);
    } else {
      console.log(`  · WebP ${size}w already exists`);
    }

    // AVIF variant
    const avifOut = `${base}-${size}.avif`;
    if (!fs.existsSync(avifOut)) {
      const variantBuf = fs.readFileSync(webpOut);
      const buf = await sharp(variantBuf).avif({ quality: 60, effort: 6 }).toBuffer();
      fs.writeFileSync(avifOut, buf);
      console.log(`  ✓ AVIF ${size}w → ${sizeKB(avifOut)}KB`);
    } else {
      console.log(`  · AVIF ${size}w already exists`);
    }
  }
}

console.log('\n=== Done ===');
