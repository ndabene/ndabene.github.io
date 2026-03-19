#!/bin/bash

# Script pour générer les versions responsive de toutes les images blog
# Génère 480px, 720px, et 1080px en WebP et AVIF pour chaque image originale

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

generate_size() {
    local src="$1"
    local dest="$2"
    local size="$3"
    local fmt="$4"

    if [ -f "$dest" ]; then
        return 0
    fi

    if ! convert "$src" -resize "${size}x${size}>" -quality 85 "$dest" 2>/dev/null; then
        echo "   ⚠️  Erreur génération ${size}px ${fmt}"
        return 1
    fi
}

# Trouver toutes les images WebP originales
while IFS= read -r image; do
    total=$((total + 1))

    dir=$(dirname "$image")
    filename=$(basename "$image" .webp)

    # Vérifier si toutes les variantes existent déjà (WebP + AVIF)
    if [ -f "${dir}/${filename}-480.webp" ] && \
       [ -f "${dir}/${filename}-720.webp" ] && \
       [ -f "${dir}/${filename}-1080.webp" ] && \
       [ -f "${dir}/${filename}-480.avif" ] && \
       [ -f "${dir}/${filename}-720.avif" ] && \
       [ -f "${dir}/${filename}-1080.avif" ]; then
        echo "⏭️  Déjà optimisé: $filename"
        skipped=$((skipped + 1))
        continue
    fi

    echo "⚙️  Traitement: $filename"
    err=0

    for size in 480 720 1080; do
        generate_size "$image" "${dir}/${filename}-${size}.webp" "$size" "WebP" || err=$((err + 1))
        generate_size "$image" "${dir}/${filename}-${size}.avif" "$size" "AVIF" || err=$((err + 1))
    done

    if [ $err -gt 0 ]; then
        echo "   ❌ Échec partiel pour $filename ($err erreurs)"
        errors=$((errors + err))
    else
        echo "   ✅ 6 variantes générées (3×WebP + 3×AVIF)"
        processed=$((processed + 1))
    fi

    if [ $((processed % 10)) -eq 0 ] && [ $processed -gt 0 ]; then
        echo "📊 Progression: $processed/$total images traitées"
    fi

done < <(find assets/images -name "*.webp" -not -name "*-480.webp" -not -name "*-720.webp" -not -name "*-1080.webp" -type f | sort)

echo ""
if [ $errors -gt 0 ]; then
    echo "⚠️  Terminé avec des erreurs!"
    echo "📈 Statistiques:"
    echo "   - Total images: $total"
    echo "   - Nouvellement optimisées: $processed"
    echo "   - Déjà optimisées: $skipped"
    echo "   - ❌ Erreurs: $errors"
    echo ""
    echo "   Vérifiez les logs ci-dessus pour plus de détails."
    exit 1
else
    echo "✅ Terminé!"
    echo "📈 Statistiques:"
    echo "   - Total images: $total"
    echo "   - Nouvellement optimisées: $processed"
    echo "   - Déjà optimisées: $skipped"
fi
