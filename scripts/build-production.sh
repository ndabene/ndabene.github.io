#!/bin/bash

# Script de build production pour générer le sitemap avec les bonnes URLs
echo "🚀 Build de production en cours..."

# Variables d'environnement pour production
export JEKYLL_ENV=production

# Build Jekyll en mode production
echo "📦 Build Jekyll en mode production..."
if bundle exec jekyll build --config _config.yml; then
    echo "✅ Build Jekyll réussi !"
    
    # Vérifier le sitemap généré
    if [ -f "_site/sitemap.xml" ]; then
        echo "✅ Sitemap généré avec succès !"
        
        # Vérifier que les URLs sont correctes
        echo ""
        echo "🔍 Vérification des URLs dans le sitemap :"
        if grep -q "https://nicolas-dabene.fr" _site/sitemap.xml; then
            echo "✅ URLs de production détectées"
            echo "- Domaine principal : https://nicolas-dabene.fr"
        elif grep -q "localhost" _site/sitemap.xml; then
            echo "⚠️ URLs localhost détectées (mode développement)"
        else
            echo "❓ URLs non reconnues"
        fi
        
        # Statistiques
        echo ""
        echo "📊 Statistiques du sitemap de production :"
        echo "- Taille : $(wc -c < _site/sitemap.xml) bytes"
        echo "- Nombre d'URLs : $(grep -c '<url>' _site/sitemap.xml)"
        echo "- Dernière modification : $(grep -o '<lastmod>[^<]*</lastmod>' _site/sitemap.xml | head -1)"
        
        # Afficher les premières URLs pour vérification
        echo ""
        echo "🔍 Premières URLs du sitemap :"
        grep -o '<loc>[^<]*</loc>' _site/sitemap.xml | head -5
        
        echo ""
        echo "✅ Build de production terminé avec succès !"
        echo "📂 Site généré dans : _site/"
        echo "🗺️ Sitemap disponible : _site/sitemap.xml"
        
    else
        echo "❌ Erreur : Sitemap non généré"
        exit 1
    fi
    
else
    echo "❌ Erreur lors du build Jekyll"
    exit 1
fi