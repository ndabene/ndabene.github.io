#!/usr/bin/env ruby
# Script de normalisation des tags pour améliorer la pertinence des filtres Pagefind

require 'yaml'
require 'fileutils'
require 'date'
require 'time'

# Mapping de normalisation (de -> vers)
TAG_MAPPINGS = {
  # Intelligence Artificielle
  'AI' => 'IA',
  'Intelligence Artificielle' => 'IA',
  'IA générative' => 'IA',

  # Automatisation
  'automation' => 'automatisation',

  # PrestaShop versions consolidées
  'PrestaShop 8' => 'PrestaShop',
  'PrestaShop 9' => 'PrestaShop',
}.freeze

# Tags à conserver tels quels
KEEP_AS_IS = [
  'ChatGPT', 'GPT-5', 'Gemini', 'Claude', 'GitHub Copilot',
  'PHP', 'TypeScript', 'Symfony', 'n8n',
  'sécurité', 'SEO', 'e-commerce', 'API', 'architecture', 'Open Source',
  'MCP', 'LLM', 'prompt engineering', 'LinkedIn'
].freeze

def normalize_tag(tag)
  # Nettoyer les espaces
  clean_tag = tag.strip

  # Vérifier si le tag doit être mappé
  mapped_tag = TAG_MAPPINGS[clean_tag]
  return mapped_tag if mapped_tag

  # Sinon retourner le tag nettoyé
  clean_tag
end

def process_file(file_path, dry_run: true)
  content = File.read(file_path)

  # Extraire le front matter
  if content =~ /\A(---\s*\n.*?\n?)^(---\s*$\n?)/m
    front_matter = YAML.safe_load($1, permitted_classes: [Date, Symbol, Time], aliases: true)

    return unless front_matter['tags']

    original_tags = front_matter['tags']
    normalized_tags = original_tags.map { |tag| normalize_tag(tag) }.uniq.sort

    # Vérifier s'il y a des changements
    if original_tags.sort != normalized_tags
      puts "\n📄 #{file_path}"
      puts "   Avant: #{original_tags.join(', ')}"
      puts "   Après: #{normalized_tags.join(', ')}"

      unless dry_run
        # Mettre à jour le front matter
        front_matter['tags'] = normalized_tags
        new_front_matter = YAML.dump(front_matter).sub(/\A---\n/, '')

        # Remplacer dans le contenu
        new_content = content.sub(/\A(---\s*\n.*?\n?)^(---\s*$\n?)/m, "---\n#{new_front_matter}---\n")

        File.write(file_path, new_content)
        puts "   ✅ Fichier mis à jour"
      end

      return true
    end
  end

  false
end

# Programme principal
dry_run = !ARGV.include?('--apply')

puts "🏷️  Normalisation des tags"
puts "=" * 60
puts dry_run ? "Mode: DRY RUN (utilisez --apply pour appliquer)" : "Mode: APPLY (modification des fichiers)"
puts ""

# Traiter tous les fichiers markdown des posts
changed_count = 0
Dir.glob('_posts/**/*.md').each do |file|
  changed_count += 1 if process_file(file, dry_run: dry_run)
end

puts ""
puts "=" * 60
puts "📊 Résumé"
puts "   Fichiers modifiés: #{changed_count}"
puts ""

if dry_run && changed_count > 0
  puts "💡 Pour appliquer les changements, exécutez:"
  puts "   ruby scripts/normalize_tags.rb --apply"
end
