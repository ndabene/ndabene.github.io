#!/bin/bash

echo "🧹 Nettoyage des fichiers CSS générés..."
rm -rf _site/assets/css/*

echo "🔨 Reconstruction du site Jekyll..."
bundle exec jekyll build --force_polling

echo "✅ CSS mis à jour !"
echo "📂 Fichiers CSS générés:"
ls -la _site/assets/css/