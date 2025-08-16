#!/bin/bash

# Script de mise à jour automatique du sitemap
# À exécuter après ajout d'un nouvel article ou page

echo "🔄 Mise à jour du sitemap en cours..."

# Rebuild Jekyll pour regénérer les sitemaps
bundle exec jekyll build --config _config.yml,_config_github.yml

# Vérification que l'index de sitemap a été généré
if [ -f "_site/sitemap_index.xml" ]; then
    echo "✅ Sitemap index généré avec succès"

    # Optionnel : Ping Google et Bing pour notification
    echo "📡 Notification des moteurs de recherche..."
    curl -s "https://www.google.com/ping?sitemap=https://ndabene.github.io/sitemap_index.xml" > /dev/null
    curl -s "https://www.bing.com/ping?sitemap=https://ndabene.github.io/sitemap_index.xml" > /dev/null
    echo "✅ Moteurs de recherche notifiés"

    # Affichage des stats
    echo "📊 Statistiques du sitemap :"
    total_urls=0
    for file in sitemap_pages.xml sitemap_posts.xml sitemap_projects.xml sitemap_case_studies.xml sitemap_images.xml; do
        if [ -f "_site/$file" ]; then
            count=$(grep -c '<url>' "_site/$file")
            total_urls=$((total_urls + count))
        fi
    done
    echo "- URLs totales : $total_urls"
    echo "- Dernière mise à jour : $(date)"
else
    echo "❌ Erreur : Sitemap index non généré"
    exit 1
fi

echo "🎉 Mise à jour terminée !"
