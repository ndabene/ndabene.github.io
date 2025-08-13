#!/bin/bash

# Script de test pour vérifier la génération du sitemap
echo "🔍 Test de génération du sitemap..."

# Build Jekyll
echo "📦 Build Jekyll..."
bundle exec jekyll build --config _config.yml,_config_github.yml

# Vérifier que le sitemap existe
if [ -f "_site/sitemap.xml" ]; then
    echo "✅ Sitemap généré avec succès !"
    
    # Afficher quelques statistiques
    echo ""
    echo "📊 Statistiques du sitemap :"
    echo "- Taille du fichier : $(wc -c < _site/sitemap.xml) bytes"
    echo "- Nombre d'URLs : $(grep -c '<url>' _site/sitemap.xml)"
    echo "- Dernière modification : $(grep -o '<lastmod>[^<]*</lastmod>' _site/sitemap.xml | head -1)"
    
    # Vérifier que le sitemap est valide XML
    echo ""
    echo "🔍 Validation XML..."
    if command -v xmllint >/dev/null 2>&1; then
        if xmllint --noout _site/sitemap.xml; then
            echo "✅ XML valide"
        else
            echo "❌ XML invalide"
            exit 1
        fi
    else
        echo "⚠️ xmllint non disponible, validation XML ignorée"
    fi
    
    # Afficher les premiers éléments pour vérification
    echo ""
    echo "🔍 Premiers éléments du sitemap :"
    head -20 _site/sitemap.xml
    
    echo ""
    echo "✅ Test du sitemap réussi !"
    echo "🌐 Sitemap accessible à : http://localhost:4000/sitemap.xml"
    
else
    echo "❌ Erreur : Sitemap non généré"
    echo "🔍 Vérifiez les erreurs Jekyll :"
    bundle exec jekyll build --config _config.yml,_config_github.yml --verbose
    exit 1
fi