#!/bin/bash

# Script pour activer le mode admin preview des futurs posts
# Usage: ./scripts/admin-preview.sh [start|stop]

case "$1" in
  start)
    echo "🔮 Activation du mode Admin Preview..."
    echo "📍 URLs de production dans les helpers LinkedIn"
    echo "🌐 Serveur accessible sur toutes les interfaces réseau"
    export JEKYLL_ADMIN_PREVIEW=true
    bundle exec jekyll serve --future --incremental --host=0.0.0.0 --port=4000
    ;;
  stop)
    echo "👥 Retour au mode public..."
    unset JEKYLL_ADMIN_PREVIEW
    bundle exec jekyll serve --incremental
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    echo ""
    echo "  start  - Active le mode admin avec preview des futurs posts"
    echo "  stop   - Retour au mode public normal"
    echo ""
    echo "En mode admin preview, vous pourrez voir :"
    echo "  ✅ Tous les articles futurs"
    echo "  ✅ Navigation complète des séries"
    echo "  ✅ Barre d'administration"
    exit 1
    ;;
esac