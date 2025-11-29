#!/bin/bash

# =============================================================================
# Script de génération automatique des images WebP
# =============================================================================
# Ce script parcourt le dossier assets/images et génère automatiquement
# les versions WebP de toutes les images JPG/PNG qui n'ont pas encore été
# converties.
#
# Usage:
#   bash scripts/generate-webp.sh
#   npm run generate:webp
#
# En environnement CI/CD, installe automatiquement webp si nécessaire.
# =============================================================================

set -e  # Arrêter en cas d'erreur

# Couleurs pour l'affichage
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🖼️  Génération automatique des images WebP${NC}"
echo ""

# =============================================================================
# Installation de webp si nécessaire (pour CI/CD)
# =============================================================================
if ! command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}⚠️  cwebp n'est pas installé. Installation en cours...${NC}"

    # Détection de l'OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        if command -v apt-get &> /dev/null; then
            sudo apt-get update -qq
            sudo apt-get install -y webp
        elif command -v yum &> /dev/null; then
            sudo yum install -y libwebp-tools
        else
            echo "❌ Impossible d'installer webp automatiquement"
            echo "Installez-le manuellement : apt-get install webp ou yum install libwebp-tools"
            exit 1
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        if command -v brew &> /dev/null; then
            brew install webp
        else
            echo "❌ Installez Homebrew puis exécutez : brew install webp"
            exit 1
        fi
    else
        echo "❌ OS non supporté pour l'installation automatique"
        exit 1
    fi

    echo -e "${GREEN}✓ webp installé avec succès${NC}"
    echo ""
fi

# =============================================================================
# Configuration
# =============================================================================
IMAGES_DIR="assets/images"
QUALITY=85  # Qualité WebP (bon compromis qualité/taille)
CONVERTED=0
SKIPPED=0
ERRORS=0

# =============================================================================
# Fonction de conversion
# =============================================================================
convert_to_webp() {
    local source_file="$1"
    local base_name="${source_file%.*}"
    local webp_file="${base_name}.webp"

    # Vérifier si le WebP existe déjà
    if [ -f "$webp_file" ]; then
        ((SKIPPED++))
        return 0
    fi

    # Convertir en WebP
    if cwebp -q "$QUALITY" "$source_file" -o "$webp_file" &> /dev/null; then
        echo -e "${GREEN}✓${NC} ${source_file} → ${webp_file}"
        ((CONVERTED++))
    else
        echo -e "❌ Échec: ${source_file}"
        ((ERRORS++))
    fi
}

# =============================================================================
# Parcourir et convertir les images
# =============================================================================
if [ ! -d "$IMAGES_DIR" ]; then
    echo "❌ Le dossier $IMAGES_DIR n'existe pas"
    exit 1
fi

echo "📁 Parcours de $IMAGES_DIR..."
echo ""

# Trouver toutes les images JPG/PNG et les convertir
# Note: On désactive temporairement set -e pour la boucle
set +e
while IFS= read -r -d '' image; do
    convert_to_webp "$image"
done < <(find "$IMAGES_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0)
set -e

# =============================================================================
# Résumé
# =============================================================================
echo ""
echo "========================================="
echo -e "${GREEN}✓ Génération terminée${NC}"
echo "========================================="
echo "Images converties    : $CONVERTED"
echo "Images déjà existantes : $SKIPPED"
echo "Erreurs              : $ERRORS"
echo "========================================="

# Sortir avec un code d'erreur si des conversions ont échoué
if [ $ERRORS -gt 0 ]; then
    exit 1
fi

exit 0
