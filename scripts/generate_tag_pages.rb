#!/usr/bin/env ruby
# encoding: UTF-8
# Script pour générer automatiquement les pages de tags
# Usage: ruby scripts/generate-tag-pages.rb

require 'yaml'
require 'set'
require 'date'
require 'time'

# Force l'encodage UTF-8
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

# Fonction pour slugifier un tag (similaire au filtre Jekyll slugify)
def slugify(text)
  text.to_s.downcase
    .strip
    .gsub(/\s+/, '-')           # Remplace espaces par tirets
    .gsub(/[àáâãäå]/, 'a')
    .gsub(/[èéêë]/, 'e')
    .gsub(/[ìíîï]/, 'i')
    .gsub(/[òóôõö]/, 'o')
    .gsub(/[ùúûü]/, 'u')
    .gsub(/[ç]/, 'c')
    .gsub(/[^a-z0-9\-]/, '')    # Supprime caractères non alphanumériques
    .gsub(/\-{2,}/, '-')        # Remplace tirets multiples par un seul
    .gsub(/^-|-$/, '')          # Supprime tirets au début/fin
end

# Collecte tous les tags de tous les posts (FR et EN)
tags = Set.new

Dir.glob('{_posts,_posts_en}/**/*.md').each do |post_file|
  begin
    content = File.read(post_file)

    # Extrait le front matter
    if content =~ /\A---\s*\n(.*?)\n---\s*\n/m
      front_matter = YAML.safe_load($1, permitted_classes: [Date, Time, Symbol])

      if front_matter && front_matter['tags']
        post_tags = front_matter['tags']
        post_tags = [post_tags] unless post_tags.is_a?(Array)
        post_tags.each { |tag| tags.add(tag.to_s.strip) }
      end
    end
  rescue Psych::SyntaxError => e
    puts "⚠️  ERREUR YAML dans le fichier: #{post_file}"
    puts "    #{e.message}"
    exit 1
  end
end

puts "Nombre total de tags uniques trouvés: #{tags.size}"
puts "Tags: #{tags.to_a.sort.join(', ')}"

# Crée le dossier blog/tags s'il n'existe pas
tags_dir = 'blog/tags'
Dir.mkdir(tags_dir) unless Dir.exist?(tags_dir)

# Génère une page pour chaque tag
created_count = 0
skipped_count = 0

tags.each do |tag|
  slug = slugify(tag)
  tag_file = File.join(tags_dir, "#{slug}.md")

  # Vérifie si le fichier existe déjà
  if File.exist?(tag_file)
    puts "  - Existe déjà: #{tag} (#{slug})"
    skipped_count += 1
    next
  end

  # Génère une description pour le tag
  description = "Découvrez tous les articles de blog sur #{tag}. Guides techniques, tutoriels et analyses approfondies."

  # Contenu de la page du tag
  tag_page_content = <<~MARKDOWN
    ---
    layout: tag
    tag: "#{tag}"
    title: "Articles sur #{tag}"
    description: "#{description}"
    permalink: /blog/tags/#{slug}/
    ---
  MARKDOWN

  # Écrit le fichier
  File.write(tag_file, tag_page_content)
  puts "  ✓ Créé: #{tag} → #{tag_file}"
  created_count += 1
end

puts "\n✅ Génération terminée !"
puts "   - Pages créées: #{created_count}"
puts "   - Pages existantes: #{skipped_count}"
puts "   - Total de tags: #{tags.size}"
