#!/bin/bash

# Script pour générer les versions responsive de toutes les images blog
# Génère 480px, 720px, et 1080px pour chaque image originale

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🖼️  Génération des images responsive pour optimisation mobile..."
echo "📂 Répertoire projet: $PROJECT_ROOT"

# Vérifier que ImageMagick est installé
if ! command -v convert &> /dev/null; then
    echo "❌ ERREUR: ImageMagick n'est pas installé"
    echo "   Installation requise: sudo apt-get install imagemagick"
    exit 1
fi

echo "✅ ImageMagick détecté: $(convert --version | head -1)"

cd "$PROJECT_ROOT"

# Compteur
total=0
processed=0
skipped=0
errors=0

# Trouver toutes les images WebP originales
while IFS= read -r image; do
    total=$((total + 1))

    # Extraire le chemin et le nom
    dir=$(dirname "$image")
    filename=$(basename "$image" .webp)

    # Vérifier si les versions responsive existent déjà
    if [ -f "${dir}/${filename}-480.webp" ] && \
       [ -f "${dir}/${filename}-720.webp" ] && \
       [ -f "${dir}/${filename}-1080.webp" ]; then
        echo "⏭️  Déjà optimisé: $filename"
        skipped=$((skipped + 1))
        continue
    fi

    echo "⚙️  Traitement: $filename"

    # Générer les versions responsive avec détection d'erreurs
    if ! convert "$image" -resize 480x480 -quality 85 "${dir}/${filename}-480.webp" 2>&1; then
        echo "   ⚠️  Erreur génération 480px"
        errors=$((errors + 1))
    fi

    if ! convert "$image" -resize 720x720 -quality 85 "${dir}/${filename}-720.webp" 2>&1; then
        echo "   ⚠️  Erreur génération 720px"
        errors=$((errors + 1))
    fi

    if ! convert "$image" -resize 1080x1080 -quality 85 "${dir}/${filename}-1080.webp" 2>&1; then
        echo "   ⚠️  Erreur génération 1080px"
        errors=$((errors + 1))
    fi

    # Vérifier que les fichiers ont bien été créés
    if [ -f "${dir}/${filename}-480.webp" ] && \
       [ -f "${dir}/${filename}-720.webp" ] && \
       [ -f "${dir}/${filename}-1080.webp" ]; then
        echo "   ✅ 3 formats générés avec succès"
        processed=$((processed + 1))
    else
        echo "   ❌ Échec de génération pour $filename"
        errors=$((errors + 1))
    fi

    # Afficher la progression tous les 10 fichiers
    if [ $((processed % 10)) -eq 0 ]; then
        echo "📊 Progression: $processed/$total images traitées"
    fi

done < <(find assets/images -name "*.webp" -not -name "*-480.webp" -not -name "*-720.webp" -not -name "*-1080.webp" -type f)

echo ""
if [ $errors -gt 0 ]; then
    echo "⚠️  Terminé avec des erreurs!"
    echo "📈 Statistiques:"
    echo "   - Total images: $total"
    echo "   - Nouvellement optimisées: $processed"
    echo "   - Déjà optimisées: $skipped"
    echo "   - ❌ Erreurs: $errors"
    echo ""
    echo "⚠️  Certaines images n'ont pas pu être optimisées."
    echo "   Vérifiez les logs ci-dessus pour plus de détails."
    exit 1
else
    echo "✅ Terminé!"
    echo "📈 Statistiques:"
    echo "   - Total images: $total"
    echo "   - Nouvellement optimisées: $processed"
    echo "   - Déjà optimisées: $skipped"
    echo ""
    echo "💡 Économie d'espace estimée pour mobile:"
    echo "   - 480px: ~70% plus léger"
    echo "   - 720px: ~50% plus léger"
    echo "   - 1080px: ~30% plus léger"
fi
