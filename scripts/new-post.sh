#!/bin/bash
set -euo pipefail

# Script pour créer un nouvel article de blog
# Usage: ./scripts/new-post.sh "Titre de l'article" [options]
# Options:
#   --draft              : Créer en mode draft
#   --future YYYY-MM-DD  : Créer avec une date future
#   --preview-key KEY    : Ajouter une clé de preview sécurisée

TITLE=""
IS_DRAFT=false
FUTURE_DATE=""
PREVIEW_KEY=""

# Parsing des arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --draft)
            IS_DRAFT=true
            shift
            ;;
        --future)
            FUTURE_DATE="$2"
            shift 2
            ;;
        --preview-key)
            PREVIEW_KEY="$2"
            shift 2
            ;;
        *)
            if [ -z "$TITLE" ]; then
                TITLE="$1"
            fi
            shift
            ;;
    esac
done

if [ -z "$TITLE" ]; then
    echo "❌ Usage: ./scripts/new-post.sh \"Titre de l'article\" [options]"
    echo ""
    echo "Options disponibles:"
    echo "  --draft              : Créer en mode draft (non publié)"
    echo "  --future YYYY-MM-DD  : Créer avec une date future"
    echo "  --preview-key KEY    : Ajouter une clé de preview sécurisée"
    echo ""
    echo "Exemples:"
    echo "  ./scripts/new-post.sh \"Mon article\""
    echo "  ./scripts/new-post.sh \"Article future\" --future 2025-12-25"
    echo "  ./scripts/new-post.sh \"Draft secret\" --draft --preview-key secret123"
    exit 1
fi

# Déterminer la date
if [ -n "$FUTURE_DATE" ]; then
    DATE="$FUTURE_DATE"
else
    DATE=$(date +%Y-%m-%d)
fi

FILENAME="_posts/${DATE}-$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-zA-Z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g').md"

echo "📝 Création d'un nouvel article..."
echo "📁 Fichier: $FILENAME"

# Affichage du statut
if [ "$IS_DRAFT" = true ]; then
    echo "📋 Type: Draft (non publié)"
else
    echo "📋 Type: Article normal"
fi

if [ -n "$FUTURE_DATE" ]; then
    echo "📅 Date: $DATE (future)"
else
    echo "📅 Date: $DATE (aujourd'hui)"
fi

if [ -n "$PREVIEW_KEY" ]; then
    echo "🔐 Clé preview: $PREVIEW_KEY"
fi

# Création du fichier avec template
cat > "$FILENAME" << EOF
---
layout: post
title: "$TITLE"
date: $DATE
author: Nicolas Dabène
categories: [Development]
tags: [PHP, Development]
excerpt: "Description courte de l'article pour le référencement et les réseaux sociaux."
image: /assets/images/blog/default-blog.jpg
featured: false
difficulty: "Intermédiaire"
technologies: ["PHP", "JavaScript"]
published: true$(if [ "$IS_DRAFT" = true ]; then echo "
draft: true"; fi)$(if [ -n "$PREVIEW_KEY" ]; then echo "
preview_key: \"$PREVIEW_KEY\""; fi)
---

# $TITLE

## 📋 Résumé Exécutif

**Points clés à retenir de cet article :**

- Point clé 1
- Point clé 2
- Point clé 3

**Temps de lecture :** X minutes | **Niveau :** Intermédiaire | **Technologies :** PHP, JavaScript

---

## Introduction

Votre contenu commence ici...

## Section 1

Contenu...

## Conclusion

Résumé et points à retenir...

---

*Article publié le $(date +"%d %B %Y") par Nicolas Dabène*
EOF

echo "✅ Article créé avec succès !"

# Instructions selon le type d'article
if [ "$IS_DRAFT" = true ]; then
    echo ""
    echo "🔍 Pour prévisualiser ce draft:"
    if [ -n "$PREVIEW_KEY" ]; then
        echo "  🔐 URL sécurisée: https://nicolas-dabene.fr/articles/?preview_key=$PREVIEW_KEY"
    else
        echo "  🌐 URL publique: https://nicolas-dabene.fr/articles/?preview=true"
    fi
    echo ""
    echo "📝 Pour publier ce draft, modifiez le front matter:"
    echo "  - Changez 'draft: true' en 'draft: false'"
    echo "  - Ou supprimez complètement la ligne 'draft: true'"
elif [ -n "$FUTURE_DATE" ]; then
    echo ""
    echo "⏰ Article programmé pour le $DATE"
    echo "📅 Il apparaîtra automatiquement à cette date grâce à l'Action GitHub quotidienne"
    echo "🔍 Pour prévisualiser en local: ./scripts/admin-preview.sh start"
else
    echo ""
    echo "🔄 Mise à jour du sitemap..."
    npm run update-sitemap 2>/dev/null || echo "⚠️  Sitemap non mis à jour (normal si npm non configuré)"
fi

echo ""
echo "📝 Vous pouvez maintenant éditer: $FILENAME"