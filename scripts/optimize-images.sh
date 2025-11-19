#!/bin/bash

################################################################################
# Script d'optimisation automatique des images
# Convertit JPG/PNG en WebP + Compresse les originaux
# Usage: ./scripts/optimize-images.sh
################################################################################

set -e

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}  Optimisation Images - nicolas-dabene.fr${NC}"
echo -e "${BLUE}================================${NC}\n"

# Vérifier que cwebp est installé
if ! command -v cwebp &> /dev/null; then
    echo -e "${RED}❌ cwebp n'est pas installé${NC}"
    echo -e "${YELLOW}Installation:${NC}"
    echo "  - Ubuntu/Debian: sudo apt-get install webp"
    echo "  - macOS: brew install webp"
    echo "  - Windows: télécharger depuis https://developers.google.com/speed/webp/download"
    exit 1
fi

# Vérifier que jpegoptim est installé
if ! command -v jpegoptim &> /dev/null; then
    echo -e "${YELLOW}⚠️  jpegoptim non installé (optionnel pour compression JPG)${NC}"
    echo "  Installation: sudo apt-get install jpegoptim (ou brew install jpegoptim)"
    JPEGOPTIM_AVAILABLE=false
else
    JPEGOPTIM_AVAILABLE=true
fi

# Compteurs
TOTAL_JPG=0
TOTAL_PNG=0
CONVERTED_WEBP=0
COMPRESSED_JPG=0
TOTAL_SIZE_BEFORE=0
TOTAL_SIZE_AFTER=0

# Répertoires à traiter
IMAGE_DIRS=(
    "assets/images/blog"
    "assets/images/modules"
    "assets/images/hero"
)

# Fonction pour obtenir la taille d'un fichier en octets
get_file_size() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        stat -f%z "$1" 2>/dev/null || echo 0
    else
        # Linux
        stat -c%s "$1" 2>/dev/null || echo 0
    fi
}

# Fonction pour formater les octets en KB/MB
format_size() {
    local size=$1
    if [ $size -lt 1024 ]; then
        echo "${size}B"
    elif [ $size -lt 1048576 ]; then
        echo "$((size / 1024))KB"
    else
        echo "$((size / 1048576))MB"
    fi
}

echo -e "${YELLOW}📁 Analyse des répertoires...${NC}\n"

# Traiter chaque répertoire
for DIR in "${IMAGE_DIRS[@]}"; do
    if [ ! -d "$DIR" ]; then
        echo -e "${YELLOW}⚠️  Répertoire non trouvé: $DIR${NC}"
        continue
    fi

    echo -e "${BLUE}📂 Traitement: $DIR${NC}"

    # Traiter les fichiers JPG/JPEG
    while IFS= read -r -d '' file; do
        TOTAL_JPG=$((TOTAL_JPG + 1))
        SIZE_BEFORE=$(get_file_size "$file")
        TOTAL_SIZE_BEFORE=$((TOTAL_SIZE_BEFORE + SIZE_BEFORE))

        # Nom du fichier WebP
        WEBP_FILE="${file%.*}.webp"

        # Convertir en WebP si pas déjà fait
        if [ ! -f "$WEBP_FILE" ]; then
            echo -e "  ${GREEN}→${NC} Converting: $(basename "$file")"
            cwebp -q 85 -m 6 "$file" -o "$WEBP_FILE" -quiet
            CONVERTED_WEBP=$((CONVERTED_WEBP + 1))

            WEBP_SIZE=$(get_file_size "$WEBP_FILE")
            SAVING=$((SIZE_BEFORE - WEBP_SIZE))
            SAVING_PERCENT=$((SAVING * 100 / SIZE_BEFORE))
            echo -e "    WebP: $(format_size $SIZE_BEFORE) → $(format_size $WEBP_SIZE) ${GREEN}(-${SAVING_PERCENT}%)${NC}"
        fi

        # Compresser le JPG original (pour fallback)
        if [ "$JPEGOPTIM_AVAILABLE" = true ]; then
            jpegoptim --max=85 --strip-all --preserve --quiet "$file"
            SIZE_AFTER=$(get_file_size "$file")
            if [ $SIZE_AFTER -lt $SIZE_BEFORE ]; then
                COMPRESSED_JPG=$((COMPRESSED_JPG + 1))
                SAVING=$((SIZE_BEFORE - SIZE_AFTER))
                SAVING_PERCENT=$((SAVING * 100 / SIZE_BEFORE))
                echo -e "    JPG:  $(format_size $SIZE_BEFORE) → $(format_size $SIZE_AFTER) ${GREEN}(-${SAVING_PERCENT}%)${NC}"
            fi
            TOTAL_SIZE_AFTER=$((TOTAL_SIZE_AFTER + SIZE_AFTER + WEBP_SIZE))
        else
            TOTAL_SIZE_AFTER=$((TOTAL_SIZE_AFTER + SIZE_BEFORE))
        fi

    done < <(find "$DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0)

    # Traiter les fichiers PNG
    while IFS= read -r -d '' file; do
        TOTAL_PNG=$((TOTAL_PNG + 1))
        SIZE_BEFORE=$(get_file_size "$file")
        TOTAL_SIZE_BEFORE=$((TOTAL_SIZE_BEFORE + SIZE_BEFORE))

        # Nom du fichier WebP
        WEBP_FILE="${file%.*}.webp"

        # Convertir en WebP si pas déjà fait
        if [ ! -f "$WEBP_FILE" ]; then
            echo -e "  ${GREEN}→${NC} Converting: $(basename "$file")"
            cwebp -q 90 -m 6 "$file" -o "$WEBP_FILE" -quiet
            CONVERTED_WEBP=$((CONVERTED_WEBP + 1))

            WEBP_SIZE=$(get_file_size "$WEBP_FILE")
            SAVING=$((SIZE_BEFORE - WEBP_SIZE))
            SAVING_PERCENT=$((SAVING * 100 / SIZE_BEFORE))
            echo -e "    WebP: $(format_size $SIZE_BEFORE) → $(format_size $WEBP_SIZE) ${GREEN}(-${SAVING_PERCENT}%)${NC}"

            TOTAL_SIZE_AFTER=$((TOTAL_SIZE_AFTER + SIZE_BEFORE + WEBP_SIZE))
        fi

    done < <(find "$DIR" -type f -iname "*.png" -print0)

    echo ""
done

# Rapport final
echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}  Rapport d'optimisation${NC}"
echo -e "${BLUE}================================${NC}"
echo -e "${GREEN}✅ Images JPG/JPEG traitées:${NC} $TOTAL_JPG"
echo -e "${GREEN}✅ Images PNG traitées:${NC} $TOTAL_PNG"
echo -e "${GREEN}✅ Fichiers WebP créés:${NC} $CONVERTED_WEBP"
if [ "$JPEGOPTIM_AVAILABLE" = true ]; then
    echo -e "${GREEN}✅ JPG compressés:${NC} $COMPRESSED_JPG"
fi

if [ $TOTAL_SIZE_BEFORE -gt 0 ]; then
    TOTAL_SAVING=$((TOTAL_SIZE_BEFORE - TOTAL_SIZE_AFTER))
    TOTAL_SAVING_PERCENT=$((TOTAL_SAVING * 100 / TOTAL_SIZE_BEFORE))
    echo -e "\n${YELLOW}📊 Économie totale:${NC}"
    echo -e "   Avant:  $(format_size $TOTAL_SIZE_BEFORE)"
    echo -e "   Après:  $(format_size $TOTAL_SIZE_AFTER)"
    echo -e "   Gagné:  $(format_size $TOTAL_SAVING) ${GREEN}(-${TOTAL_SAVING_PERCENT}%)${NC}"
fi

echo -e "\n${GREEN}✅ Optimisation terminée !${NC}"
echo -e "${YELLOW}📝 Prochaine étape:${NC} Mettre à jour les templates pour utiliser WebP"
echo -e "   Voir: scripts/update-templates.md\n"
