#!/bin/bash

# Script pour créer un nouvel article de blog
# Usage: ./scripts/new-post.sh "Titre de l'article"

if [ -z "$1" ]; then
    echo "❌ Usage: ./scripts/new-post.sh \"Titre de l'article\""
    exit 1
fi

TITLE="$1"
DATE=$(date +%Y-%m-%d)
FILENAME="_posts/${DATE}-$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-zA-Z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g').md"

echo "📝 Création d'un nouvel article..."
echo "📁 Fichier: $FILENAME"

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
echo "🔄 Mise à jour du sitemap..."

# Rebuild automatique pour mettre à jour le sitemap
npm run update-sitemap

echo "📝 Vous pouvez maintenant éditer: $FILENAME"