#!/usr/bin/env ruby
# frozen_string_literal: true

# Script de génération automatique des pages de tags
# Compatible avec GitHub Pages en mode safe
# Génère physiquement les fichiers blog/tags/[slug]/index.html avant le build Jekyll

require 'yaml'
require 'fileutils'
require 'set'
require 'date'

# Fonction pour slugifier un tag (identique à Jekyll.slugify)
def slugify(text)
  text.to_s.downcase
      .gsub(/[àáâãäå]/, 'a')
      .gsub(/[èéêë]/, 'e')
      .gsub(/[ìíîï]/, 'i')
      .gsub(/[òóôõö]/, 'o')
      .gsub(/[ùúûü]/, 'u')
      .gsub(/[ýÿ]/, 'y')
      .gsub(/[ñ]/, 'n')
      .gsub(/[ç]/, 'c')
      .gsub(/[œ]/, 'oe')
      .gsub(/[æ]/, 'ae')
      .gsub(/[^\w\s-]/, '')  # Supprimer les caractères spéciaux
      .gsub(/\s+/, '-')       # Espaces -> tirets
      .gsub(/-+/, '-')        # Tirets multiples -> un seul
      .gsub(/^-|-$/, '')      # Supprimer tirets début/fin
end

# Fonction pour parser le front matter YAML d'un fichier markdown
def extract_tags_from_post(file_path)
  content = File.read(file_path, encoding: 'utf-8')

  # Extraire le front matter YAML (entre --- et ---)
  if content =~ /\A---\s*\n(.*?\n?)^---\s*$\n?(.*)/m
    front_matter = YAML.safe_load(
      Regexp.last_match(1),
      permitted_classes: [Date, Time, Symbol],
      aliases: true
    )
    return front_matter['tags'] || []
  end

  []
rescue StandardError => e
  puts "⚠️  Erreur lors de la lecture de #{file_path}: #{e.message}"
  []
end

# Fonction pour générer le contenu HTML d'une page de tag
def generate_tag_page_content(tag, slug)
  description = "Découvrez tous les articles du blog liés au tag \"#{tag}\". " \
                "Retrouvez nos analyses, tutoriels et actualités sur ce sujet."

  <<~HTML
    ---
    layout: tag
    title: "Tag: #{tag}"
    tag: #{tag}
    description: "#{description}"
    permalink: /blog/tags/#{slug}/
    keywords: "#{tag}, tag #{tag}, articles #{tag}"
    sitemap:
      changefreq: "weekly"
      priority: 0.6
    ---
  HTML
end

puts "🚀 Génération automatique des pages de tags..."
puts "=" * 60

# Collecter tous les tags depuis les posts
all_tags = Set.new
posts_dir = '_posts'

if !Dir.exist?(posts_dir)
  puts "❌ Le dossier #{posts_dir} n'existe pas !"
  exit 1
end

# Scanner tous les fichiers markdown dans _posts/
post_files = Dir.glob("#{posts_dir}/**/*.md")
puts "📂 Analyse de #{post_files.length} articles..."

post_files.each do |file_path|
  tags = extract_tags_from_post(file_path)
  tags.each do |tag|
    all_tags.add(tag.to_s.strip) unless tag.to_s.strip.empty?
  end
end

puts "📊 #{all_tags.size} tags uniques trouvés"
puts ""

# Créer le dossier blog/tags/ s'il n'existe pas
tags_dir = 'blog/tags'
FileUtils.mkdir_p(tags_dir)

# Générer une page pour chaque tag
generated_count = 0
all_tags.sort.each do |tag|
  slug = slugify(tag)
  tag_page_dir = File.join(tags_dir, slug)
  tag_page_file = File.join(tag_page_dir, 'index.html')

  # Créer le dossier du tag
  FileUtils.mkdir_p(tag_page_dir)

  # Générer le contenu de la page
  content = generate_tag_page_content(tag, slug)

  # Écrire le fichier
  File.write(tag_page_file, content, encoding: 'utf-8')

  generated_count += 1
  puts "✅ Généré: /blog/tags/#{slug}/ (tag: #{tag})"
end

puts ""
puts "=" * 60
puts "✨ #{generated_count} pages de tags générées avec succès !"
puts "📁 Dossier de sortie: #{tags_dir}/"
puts ""
puts "Ces pages seront automatiquement:"
puts "  ✅ Incluses dans le sitemap.xml"
puts "  ✅ Indexées par IndexNow"
puts "  ✅ Crawlées par les moteurs de recherche"
puts ""
puts "🎉 Prêt pour le build Jekyll !"
