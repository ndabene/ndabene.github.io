const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../assets/images');
const QUALITY = 85;

const SIZES = [480, 720, 1080];

async function convertToWebp(file) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

    // Skip variants themselves to avoid infinite recursion or processing them as sources
    if (file.match(/-\d+\.webp$/)) return;

    const baseName = file.substring(0, file.lastIndexOf('.'));
    const webpFile = baseName + '.webp';

    let status = 'skipped';

    try {
        // 1. Generate main WebP if it's a JPG/PNG and doesn't exist
        if (['.jpg', '.jpeg', '.png'].includes(ext) && !fs.existsSync(webpFile)) {
            await sharp(file)
                .webp({ quality: QUALITY })
                .toFile(webpFile);
            console.log(`✅ Converted: ${path.relative(IMAGES_DIR, file)} -> ${path.relative(IMAGES_DIR, webpFile)}`);
            status = 'converted';
        }

        // 2. Generate responsive variants if they don't exist
        // Use the original file as source if it exists, otherwise use the webp version
        const sourceForVariants = file;

        for (const size of SIZES) {
            const variantFile = `${baseName}-${size}.webp`;
            if (!fs.existsSync(variantFile)) {
                await sharp(sourceForVariants)
                    .resize(size, null, { withoutEnlargement: true })
                    .webp({ quality: QUALITY })
                    .toFile(variantFile);
                console.log(`   📱 Variant: ${path.basename(variantFile)} generated`);
                status = 'converted';
            }
        }

        return status;
    } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
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
