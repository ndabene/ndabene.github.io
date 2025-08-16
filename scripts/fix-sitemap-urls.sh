#!/bin/bash

# Script pour corriger les URLs du sitemap après génération en mode développement
echo "🔧 Correction des URLs du sitemap..."

SITEMAP_FILE="_site/sitemap_index.xml"

if [ -f "$SITEMAP_FILE" ]; then
    echo "📍 Sitemap trouvé : $SITEMAP_FILE"
    
    # Vérifier s'il y a des URLs localhost à corriger
    if grep -q "localhost:4000" "$SITEMAP_FILE"; then
        echo "🔄 Remplacement des URLs localhost par les URLs de production..."
        
        # Faire le remplacement
        sed -i 's/http:\/\/localhost:4000/https:\/\/nicolas-dabene.fr/g' "$SITEMAP_FILE"
        
        # Vérifier le résultat
        if grep -q "https://nicolas-dabene.fr" "$SITEMAP_FILE"; then
            echo "✅ URLs corrigées avec succès !"
            
            # Afficher les statistiques
            echo ""
            echo "📊 Statistiques du sitemap corrigé :"
            echo "- URLs avec nicolas-dabene.fr : $(grep -c 'nicolas-dabene.fr' "$SITEMAP_FILE")"
            echo "- URLs restantes avec localhost : $(grep -c 'localhost' "$SITEMAP_FILE")"
            
            # Afficher quelques exemples d'URLs corrigées
            echo ""
            echo "🔍 Exemples d'URLs corrigées :"
            grep -o '<loc>[^<]*</loc>' "$SITEMAP_FILE" | head -3
            
        else
            echo "❌ Erreur lors de la correction des URLs"
            exit 1
        fi
        
    else
        echo "✅ Le sitemap contient déjà les bonnes URLs"
    fi
    
    echo ""
    echo "✅ Correction du sitemap terminée !"
    echo "🌐 Sitemap accessible à : https://nicolas-dabene.fr/sitemap_index.xml"
    
else
    echo "❌ Erreur : Sitemap non trouvé à $SITEMAP_FILE"
    echo "💡 Générez d'abord le site avec : bundle exec jekyll build --config _config.yml,_config_github.yml"
    exit 1
fi