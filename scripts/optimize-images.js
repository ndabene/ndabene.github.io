const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

const imageDir = path.join(__dirname, '..', 'assets', 'images');

// Fonction pour optimiser une image avec Sharp
async function optimizeWithSharp(inputPath, outputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();

    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(inputPath)
        .jpeg({ quality: 80, progressive: true })
        .resize(null, null, { withoutEnlargement: true })
        .toFile(outputPath);
    } else if (ext === '.png') {
      await sharp(inputPath)
        .png({ quality: 80, compressionLevel: 9 })
        .resize(null, null, { withoutEnlargement: true })
        .toFile(outputPath);
    } else if (ext === '.webp') {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .resize(null, null, { withoutEnlargement: true })
        .toFile(outputPath);
    } else {
      // Copier les autres formats sans modification
      fs.copyFileSync(inputPath, outputPath);
    }

    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    console.log(`✅ ${path.basename(inputPath)}: ${originalSize} → ${optimizedSize} bytes (${savings}% économisé)`);
  } catch (error) {
    console.error(`❌ Erreur avec ${inputPath}:`, error.message);
  }
}

// Fonction pour traiter récursivement un dossier
async function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        const outputPath = fullPath; // Écraser le fichier original
        await optimizeWithSharp(fullPath, outputPath + '.tmp');

        // Remplacer le fichier original seulement si l'optimisation a réussi
        if (fs.existsSync(outputPath + '.tmp')) {
          fs.renameSync(outputPath + '.tmp', outputPath);
        }
      }
    }
  }
}

// Fonction principale
async function main() {
  console.log('🚀 Démarrage de l\'optimisation des images...');
  console.log(`📁 Traitement du dossier: ${imageDir}`);

  if (!fs.existsSync(imageDir)) {
    console.error(`❌ Dossier introuvable: ${imageDir}`);
    return;
  }

  const startTime = Date.now();
  await processDirectory(imageDir);
  const endTime = Date.now();

  console.log(`✅ Optimisation terminée en ${(endTime - startTime) / 1000}s`);
}

main().catch(console.error);
