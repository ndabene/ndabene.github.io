const fs = require('fs');
const path = require('path');
const { PurgeCSS } = require('purgecss');

async function analyzeUnusedCSS() {
  const siteDir = path.join(__dirname, '..', '_site');
  const cssFile = path.join(siteDir, 'assets', 'css', 'style.css');

  if (!fs.existsSync(cssFile)) {
    console.error('❌ Fichier CSS introuvable:', cssFile);
    return;
  }

  // Collecter tous les fichiers HTML générés
  function getAllHtmlFiles(dirPath, files = []) {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        getAllHtmlFiles(fullPath, files);
      } else if (stat.isFile() && item.endsWith('.html')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  const htmlFiles = getAllHtmlFiles(siteDir);
  console.log(`📊 Analyse de ${htmlFiles.length} fichiers HTML...`);

  const purgeCSSResults = await new PurgeCSS().purge({
    content: htmlFiles,
    css: [cssFile],
    safelist: [
      // Classes dynamiques connues
      /^nav-/,
      /^mobile-/,
      /^hero-/,
      /^btn-/,
      /^card-/,
      /^post-/,
      /^project-/,
      /^sidebar-/,
      /^footer-/,
      /^header-/,
      /^animate-/,
      /^fade-/,
      /^slide-/,
      /^scale-/,
      /^rotate-/,
      /^float-/,
      /^bounce-/,
      /^pulse-/,
      /^shake-/,
      /^flip-/,
      /^roll-/,
      /^lightSpeed-/,
      /^hinge-/,
      /^jackIn-/,
      /^rollIn-/,
      /^zoomIn-/,
      /^slideIn-/,
      /^rotateIn-/,
      /^flipIn-/,
      /^bounceIn-/,
      /^backIn-/,
      /^jackInTheBox-/,
      /^lightSpeedIn-/,
      /^hinge-/,
      /^rollOut-/,
      /^zoomOut-/,
      /^slideOut-/,
      /^rotateOut-/,
      /^flipOut-/,
      /^bounceOut-/,
      /^backOut-/,
      /^lightSpeedOut-/,
      /^hinge-/,
      // Classes JavaScript
      /^active$/,
      /^open$/,
      /^closed$/,
      /^hidden$/,
      /^visible$/,
      /^expanded$/,
      /^collapsed$/,
      /^selected$/,
      /^current$/,
      /^loading$/,
      /^loaded$/,
      /^error$/,
      /^success$/,
      /^warning$/,
      /^info$/,
      // Media queries et états
      /^is-/,
      /^has-/,
      /^no-/,
      /^with-/,
      /^without-/,
      // Breakpoints
      /^sm:/,
      /^md:/,
      /^lg:/,
      /^xl:/,
      // États hover/focus
      /^hover:/,
      /^focus:/,
      /^active:/,
      /^visited:/,
      // Positions
      /^top-/,
      /^right-/,
      /^bottom-/,
      /^left-/,
      // Couleurs
      /^text-/,
      /^bg-/,
      /^border-/,
      // Tailles
      /^w-/,
      /^h-/,
      /^text-/,
      /^p-/,
      /^m-/,
      // Layout
      /^flex-/,
      /^grid-/,
      /^justify-/,
      /^items-/,
      /^self-/,
      /^order-/,
      /^col-/,
      /^row-/,
      // Utilitaires
      /^rounded-/,
      /^shadow-/,
      /^opacity-/,
      /^z-/,
      // Animations
      /^animate__/,
      /^animate-/,
      // État des formulaires
      /^valid:/,
      /^invalid:/,
      /^required:/,
      /^optional:/,
      /^checked:/,
      /^unchecked:/,
      /^disabled:/,
      /^enabled:/,
    ]
  });

  const result = purgeCSSResults[0];
  const originalSize = fs.statSync(cssFile).size;
  const purgedSize = Buffer.byteLength(result.css, 'utf8');
  const savings = originalSize - purgedSize;
  const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

  console.log(`📈 Analyse terminée:`);
  console.log(`   Taille originale: ${originalSize} bytes`);
  console.log(`   Taille purgé: ${purgedSize} bytes`);
  console.log(`   Économies: ${savings} bytes (${savingsPercent}%)`);

  // Créer un fichier avec le CSS purgé pour comparaison
  const purgedFile = path.join(__dirname, '..', 'assets', 'css', 'style-purged.css');
  fs.writeFileSync(purgedFile, result.css);
  console.log(`💾 CSS purgé sauvegardé: ${purgedFile}`);

  return result;
}

analyzeUnusedCSS().catch(console.error);
