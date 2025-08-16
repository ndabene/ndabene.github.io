#!/bin/bash

# Script de mise à jour automatique du sitemap
# À exécuter après ajout d'un nouvel article ou page

echo "🔄 Mise à jour du sitemap en cours..."

# Vérifier que feed.xml existe
if [ ! -f "feed.xml" ]; then
    echo "⚠️ Création du fichier feed.xml..."
    cat > feed.xml << EOF
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{{ site.title | xml_escape }}</title>
    <description>{{ site.description | xml_escape }}</description>
    <link>{{ site.url }}{{ site.baseurl }}/</link>
    <atom:link href="{{ site.url }}{{ site.baseurl }}/feed.xml" rel="self" type="application/rss+xml"/>
    <pubDate>{{ site.time | date_to_rfc822 }}</pubDate>
    <lastBuildDate>{{ site.time | date_to_rfc822 }}</lastBuildDate>
    <generator>Jekyll v{{ jekyll.version }}</generator>
    {% for post in site.posts limit:10 %}
      <item>
        <title>{{ post.title | xml_escape }}</title>
        <description>{{ post.content | xml_escape }}</description>
        <pubDate>{{ post.date | date_to_rfc822 }}</pubDate>
        <link>{{ site.url }}{{ site.baseurl }}{{ post.url }}</link>
        <guid isPermaLink="true">{{ site.url }}{{ site.baseurl }}{{ post.url }}</guid>
        {% for tag in post.tags %}
        <category>{{ tag | xml_escape }}</category>
        {% endfor %}
        {% for cat in post.categories %}
        <category>{{ cat | xml_escape }}</category>
        {% endfor %}
      </item>
    {% endfor %}
  </channel>
</rss>
EOF
    echo "✅ feed.xml créé"
fi

# Rebuild Jekyll pour regénérer les sitemaps
echo "🔨 Construction du site Jekyll..."
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config_github.yml

# Vérification que l'index de sitemap a été généré
if [ -f "_site/sitemap_index.xml" ]; then
    echo "✅ Sitemap index généré avec succès"

    # Optionnel : Ping Google et Bing pour notification
    echo "📡 Notification des moteurs de recherche..."
    curl -s "https://www.google.com/ping?sitemap=https://nicolas-dabene.fr/sitemap_index.xml" > /dev/null
    curl -s "https://www.bing.com/ping?sitemap=https://nicolas-dabene.fr/sitemap_index.xml" > /dev/null
    echo "✅ Moteurs de recherche notifiés"

    # Affichage des stats
    echo "📊 Statistiques du sitemap :"
    total_urls=0
    for file in sitemap_pages.xml sitemap_posts_2025.xml sitemap_projects.xml sitemap_case_studies.xml sitemap_images.xml; do
        if [ -f "_site/$file" ]; then
            count=$(grep -c '<url>' "_site/$file" || echo "0")
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
