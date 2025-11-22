#!/bin/bash

# Script de validation de la structure des articles
# Usage: bash .claude/validate-articles.sh

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 VALIDATION DE LA STRUCTURE DES ARTICLES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

ERRORS=0

# ============================================================================
# 1. Vérifier les suffixes interdits
# ============================================================================
echo "📋 [1/7] Vérification des suffixes interdits (-fr.md / -en.md)..."

SUFFIXED_FILES=$(find _posts -name "*-fr.md" -o -name "*-en.md" 2>/dev/null || true)
if [ -n "$SUFFIXED_FILES" ]; then
  echo "   ❌ ERREUR: Fichiers avec suffixes -fr/-en trouvés dans _posts/"
  echo "$SUFFIXED_FILES" | while read -r file; do
    echo "      → $file"
  done
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ Aucun fichier avec suffixe trouvé"
fi

SUFFIXED_EN=$(find _posts_en -name "*-fr.md" -o -name "*-en.md" 2>/dev/null || true)
if [ -n "$SUFFIXED_EN" ]; then
  echo "   ❌ ERREUR: Fichiers avec suffixes -fr/-en trouvés dans _posts_en/"
  echo "$SUFFIXED_EN" | while read -r file; do
    echo "      → $file"
  done
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ Aucun fichier avec suffixe trouvé dans _posts_en/"
fi

echo ""

# ============================================================================
# 2. Vérifier les fichiers mal placés (à la racine des années)
# ============================================================================
echo "📂 [2/7] Vérification des fichiers mal placés..."

MISPLACED_FR=$(find _posts/2025 -maxdepth 1 -name "*.md" 2>/dev/null || true)
if [ -n "$MISPLACED_FR" ]; then
  echo "   ❌ ERREUR: Fichiers à la racine de _posts/2025/ (doivent être dans MM/)"
  echo "$MISPLACED_FR" | while read -r file; do
    echo "      → $file"
  done
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ Aucun fichier mal placé dans _posts/2025/"
fi

MISPLACED_EN=$(find _posts_en/2025 -maxdepth 1 -name "*.md" 2>/dev/null || true)
if [ -n "$MISPLACED_EN" ]; then
  echo "   ❌ ERREUR: Fichiers à la racine de _posts_en/2025/ (doivent être dans MM/)"
  echo "$MISPLACED_EN" | while read -r file; do
    echo "      → $file"
  done
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ Aucun fichier mal placé dans _posts_en/2025/"
fi

echo ""

# ============================================================================
# 3. Vérifier les doublons de titres
# ============================================================================
echo "📝 [3/7] Vérification des doublons de titres..."

DUPLICATE_TITLES=$(grep -rh "^title:" _posts _posts_en 2>/dev/null | sort | uniq -d)
if [ -n "$DUPLICATE_TITLES" ]; then
  echo "   ❌ ERREUR: Titres en double détectés:"
  echo "$DUPLICATE_TITLES" | while read -r title; do
    echo "      → $title"
    grep -r "$title" _posts _posts_en 2>/dev/null | cut -d: -f1 | while read -r file; do
      echo "         dans: $file"
    done
  done
  ERRORS=$((ERRORS + 1))
else
  echo "   ✅ Aucun doublon de titre détecté"
fi

echo ""

# ============================================================================
# 4. Vérifier les fichiers avec lang: mais sans ref:
# ============================================================================
echo "🔗 [4/7] Vérification de la cohérence lang: / ref:..."

MISSING_REF=0
while IFS= read -r file; do
  HAS_LANG=$(grep "^lang:" "$file" 2>/dev/null | wc -l)
  HAS_REF=$(grep "^ref:" "$file" 2>/dev/null | wc -l)

  if [ "$HAS_LANG" -gt 0 ] && [ "$HAS_REF" -eq 0 ]; then
    if [ $MISSING_REF -eq 0 ]; then
      echo "   ❌ ERREUR: Articles avec lang: mais sans ref:"
    fi
    echo "      → $file"
    MISSING_REF=$((MISSING_REF + 1))
  fi
done < <(find _posts _posts_en -name "*.md" -type f 2>/dev/null)

if [ $MISSING_REF -eq 0 ]; then
  echo "   ✅ Tous les articles avec lang: ont une ref:"
else
  ERRORS=$((ERRORS + 1))
fi

echo ""

# ============================================================================
# 5. Vérifier les correspondances FR/EN
# ============================================================================
echo "🌐 [5/7] Vérification des correspondances bilingues..."

# Récupérer toutes les refs
REFS=$(grep -rh "^ref:" _posts _posts_en 2>/dev/null | sed 's/ref: //' | sort -u)

MISSING_TRANSLATIONS=0
for ref in $REFS; do
  FR_COUNT=$(grep -r "^ref: $ref" _posts 2>/dev/null | wc -l)
  EN_COUNT=$(grep -r "^ref: $ref" _posts_en 2>/dev/null | wc -l)

  if [ "$FR_COUNT" -gt 0 ] && [ "$EN_COUNT" -eq 0 ]; then
    if [ $MISSING_TRANSLATIONS -eq 0 ]; then
      echo "   ⚠️  ATTENTION: Articles FR sans traduction EN:"
    fi
    FR_FILE=$(grep -r "^ref: $ref" _posts 2>/dev/null | cut -d: -f1)
    echo "      → ref: $ref (dans $FR_FILE)"
    MISSING_TRANSLATIONS=$((MISSING_TRANSLATIONS + 1))
  elif [ "$EN_COUNT" -gt 0 ] && [ "$FR_COUNT" -eq 0 ]; then
    if [ $MISSING_TRANSLATIONS -eq 0 ]; then
      echo "   ⚠️  ATTENTION: Articles EN sans traduction FR:"
    fi
    EN_FILE=$(grep -r "^ref: $ref" _posts_en 2>/dev/null | cut -d: -f1)
    echo "      → ref: $ref (dans $EN_FILE)"
    MISSING_TRANSLATIONS=$((MISSING_TRANSLATIONS + 1))
  fi
done

if [ $MISSING_TRANSLATIONS -eq 0 ]; then
  echo "   ✅ Toutes les traductions sont complètes"
else
  echo "   ℹ️  $MISSING_TRANSLATIONS traduction(s) manquante(s) (non bloquant)"
fi

echo ""

# ============================================================================
# 6. Vérifier les noms de fichiers correspondants
# ============================================================================
echo "📄 [6/7] Vérification des noms de fichiers FR/EN..."

MISMATCHED_NAMES=0
for ref in $REFS; do
  FR_FILE=$(grep -r "^ref: $ref" _posts 2>/dev/null | cut -d: -f1 | head -1)
  EN_FILE=$(grep -r "^ref: $ref" _posts_en 2>/dev/null | cut -d: -f1 | head -1)

  if [ -n "$FR_FILE" ] && [ -n "$EN_FILE" ]; then
    FR_BASENAME=$(basename "$FR_FILE")
    EN_BASENAME=$(basename "$EN_FILE")

    if [ "$FR_BASENAME" != "$EN_BASENAME" ]; then
      if [ $MISMATCHED_NAMES -eq 0 ]; then
        echo "   ⚠️  ATTENTION: Noms de fichiers FR/EN différents:"
      fi
      echo "      → ref: $ref"
      echo "         FR: $FR_BASENAME"
      echo "         EN: $EN_BASENAME"
      MISMATCHED_NAMES=$((MISMATCHED_NAMES + 1))
    fi
  fi
done

if [ $MISMATCHED_NAMES -eq 0 ]; then
  echo "   ✅ Tous les noms de fichiers FR/EN correspondent"
else
  echo "   ℹ️  $MISMATCHED_NAMES paire(s) avec noms différents (non bloquant mais recommandé)"
fi

echo ""

# ============================================================================
# 7. Statistiques générales
# ============================================================================
echo "📊 [7/7] Statistiques..."

FR_COUNT=$(find _posts -name "*.md" -type f 2>/dev/null | wc -l)
EN_COUNT=$(find _posts_en -name "*.md" -type f 2>/dev/null | wc -l)

echo "   📚 Articles FR : $FR_COUNT"
echo "   📚 Articles EN : $EN_COUNT"
echo "   📚 Total      : $((FR_COUNT + EN_COUNT))"

echo ""

# ============================================================================
# Résumé final
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
  echo "✅ VALIDATION RÉUSSIE - Aucune erreur bloquante détectée"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 0
else
  echo "❌ VALIDATION ÉCHOUÉE - $ERRORS erreur(s) bloquante(s) détectée(s)"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "🔧 Actions à effectuer :"
  echo "   1. Corriger les erreurs listées ci-dessus"
  echo "   2. Relancer ce script pour vérifier"
  echo "   3. Consulter .claude/article-publication-guidelines.md"
  echo ""
  exit 1
fi
