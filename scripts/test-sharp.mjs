import sharp from 'sharp';
import path from 'path';

const ROOT = 'C:/Users/ndabe/Documents/site/ndabene.github.io';
const file = ROOT + '/assets/images/blog/2025/08/2025-08-27-gemini-flash-image-revolution.webp';
console.log('path:', file);
try {
  const m = await sharp(file).metadata();
  console.log('metadata OK:', m.format, m.width + 'x' + m.height, 'size:', m.size);
  // Test recompress
  const tmp = ROOT + '/assets/images/logo.webp.tmp';
  await sharp(file).webp({ quality: 82, effort: 3 }).toFile(tmp);
  console.log('recompress OK → wrote', tmp);
  // cleanup
  import('fs').then(({ default: fs }) => { fs.unlinkSync(tmp); console.log('cleanup OK'); });
} catch (e) {
  console.error('FAIL:', e.message);
}
