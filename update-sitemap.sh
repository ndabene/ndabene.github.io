#!/bin/bash

# Script de mise à jour automatique du sitemap
# À exécuter après ajout d'un nouvel article ou page

echo "🔄 Mise à jour du sitemap en cours..."

# Rebuild Jekyll pour regénérer le sitemap
bundle exec jekyll build

# Vérification que le sitemap a été généré
if [ -f "_site/sitemap.xml" ]; then
    echo "✅ Sitemap généré avec succès"
    
    # Optionnel : Ping Google pour notification
    echo "📡 Notification des moteurs de recherche..."
    
    # Google
    curl -s "https://www.google.com/ping?sitemap=https://ndabene.github.io/sitemap.xml" > /dev/null
    
    # Bing
    curl -s "https://www.bing.com/ping?sitemap=https://ndabene.github.io/sitemap.xml" > /dev/null
    
    echo "✅ Moteurs de recherche notifiés"
    
    # Affichage des stats
    echo "📊 Statistiques du sitemap :"
    echo "- URLs totales : $(grep -c '<url>' _site/sitemap.xml)"
    echo "- Dernière mise à jour : $(date)"
    
else
    echo "❌ Erreur : Sitemap non généré"
    exit 1
fi

echo "🎉 Mise à jour terminée !"