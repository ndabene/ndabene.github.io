const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../assets/images');
const QUALITY = 85;

async function convertToWebp(file) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

    const webpFile = file.substring(0, file.lastIndexOf('.')) + '.webp';

    // Check if webp already exists
    if (fs.existsSync(webpFile)) {
        // console.log(`⏩ Skipped: ${path.relative(IMAGES_DIR, file)} (Already exists)`);
        return 'skipped';
    }

    try {
        await sharp(file)
            .webp({ quality: QUALITY })
            .toFile(webpFile);
        console.log(`✅ Converted: ${path.relative(IMAGES_DIR, file)} -> ${path.relative(IMAGES_DIR, webpFile)}`);
        return 'converted';
    } catch (err) {
        console.error(`❌ Error converting ${file}:`, err.message);
        return 'error';
    }
}

async function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(await walkDir(fullPath));
        } else {
            const status = await convertToWebp(fullPath);
            if (status) results.push(status);
        }
    }
    return results;
}

(async () => {
    console.log('🖼️  Generating WebP images using sharp...');
    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`❌ Directory not found: ${IMAGES_DIR}`);
        process.exit(1);
    }

    const start = Date.now();
    const results = await walkDir(IMAGES_DIR);
    const end = Date.now();

    const converted = results.filter(r => r === 'converted').length;
    const skipped = results.filter(r => r === 'skipped').length;
    const errors = results.filter(r => r === 'error').length;

    console.log('\n=========================================');
    console.log(`✨ Finished in ${((end - start) / 1000).toFixed(2)}s`);
    console.log(`Converted:    ${converted}`);
    console.log(`Skipped:      ${skipped}`);
    console.log(`Errors:       ${errors}`);
    console.log('=========================================');
})();
