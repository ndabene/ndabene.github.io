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
    if (file.match(/-\d+\.(webp|avif)$/)) return;

    const baseName = file.substring(0, file.lastIndexOf('.'));
    const dirName = path.dirname(file);

    // Handle "image-principale.png" -> "image.webp" naming convention
    const isPrincipale = path.basename(file).startsWith('image-principale');
    const targetBaseName = isPrincipale 
        ? path.join(dirName, 'image')
        : baseName;
    const webpFile = targetBaseName + '.webp';

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
        const sourceForVariants = file;

        for (const size of SIZES) {
            const variantFile = `${targetBaseName}-${size}.webp`;
            if (!fs.existsSync(variantFile)) {
                await sharp(sourceForVariants)
                    .resize(size, null, { withoutEnlargement: true })
                    .webp({ quality: QUALITY })
                    .toFile(variantFile);
                console.log(`   📱 Variant: ${path.basename(variantFile)} generated`);
                status = 'converted';
            }
        }

        // 3. Generate AVIF variants if they don't exist
        for (const size of SIZES) {
            const avifFile = `${targetBaseName}-${size}.avif`;
            if (!fs.existsSync(avifFile)) {
                await sharp(sourceForVariants)
                    .resize(size, null, { withoutEnlargement: true })
                    .avif({ quality: QUALITY })
                    .toFile(avifFile);
                console.log(`   🖼️ AVIF: ${path.basename(avifFile)} generated`);
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

    if (errors > 0) {
        console.error(`\n❌ ${errors} erreur(s) lors de la génération WebP — build annulé.`);
        process.exit(1);
    }
})();
