#!/usr/bin/env ruby
# Script d'audit du blog pour identifier les problèmes de structure
# Usage: ruby blog_audit_script.rb

require 'yaml'
require 'pathname'
require 'json'

POSTS_DIR = '_posts'
IMAGES_DIR = 'assets/images/blog'

def analyze_posts
  posts = Dir.glob("#{POSTS_DIR}/*.md").sort.reverse

  puts "📊 ANALYSE DES ARTICLES"
  puts "=" * 50

  posts_data = []
  missing_images = []
  category_stats = Hash.new(0)
  tag_stats = Hash.new(0)

  posts.each do |post_file|
    content = File.read(post_file)

    # Extraire le front matter
    if content =~ /\A---\n(.*?)\n---\n/m
      begin
        front_matter = YAML.safe_load($1, permitted_classes: [Date])
        posts_data << front_matter.merge('file' => post_file)
      rescue Psych::DisallowedClass
        # Fallback: parse manually for dates
        front_matter_raw = $1
        front_matter = {}

        # Simple parsing for key fields
        front_matter['title'] = front_matter_raw.match(/title:\s*(.+)/)&.[](1)&.gsub(/^["']|["']$/, '')
        front_matter['date'] = front_matter_raw.match(/date:\s*(.+)/)&.[](1)
        front_matter['author'] = front_matter_raw.match(/author:\s*(.+)/)&.[](1)&.gsub(/^["']|["']$/, '')

        # Parse categories and tags (arrays)
        if front_matter_raw =~ /categories:\s*\[(.*?)\]/
          front_matter['categories'] = $1.split(',').map { |c| c.strip.gsub(/^["']|["']$/, '') }
        end

        if front_matter_raw =~ /tags:\s*\[(.*?)\]/
          front_matter['tags'] = $1.split(',').map { |t| t.strip.gsub(/^["']|["']$/, '') }
        end

        front_matter['image'] = front_matter_raw.match(/image:\s*(.+)/)&.[](1)&.gsub(/^["']|["']$/, '')
        front_matter['featured'] = front_matter_raw.match(/featured:\s*(.+)/)&.[](1) == 'true'

        posts_data << front_matter.merge('file' => post_file)
      end

      # Statistiques des catégories
      if front_matter['categories']
        front_matter['categories'].each { |cat| category_stats[cat] += 1 }
      end

      # Statistiques des tags
      if front_matter['tags']
        front_matter['tags'].each { |tag| tag_stats[tag] += 1 }
      end

      # Vérifier l'image
      if front_matter['image']
        image_path = front_matter['image'].gsub('/assets/images/blog/', '')
        unless File.exist?("#{IMAGES_DIR}/#{image_path}")
          missing_images << {
            'post' => post_file,
            'expected_image' => image_path,
            'image_field' => front_matter['image']
          }
        end
      else
        missing_images << {
          'post' => post_file,
          'missing_field' => true
        }
      end
    end
  end

  # Résultats
  puts "📈 Statistiques générales:"
  puts "  • Total articles: #{posts.size}"
  puts "  • Période couverte: #{posts_data.last['date']} → #{posts_data.first['date']}"

  puts "\n🏷️  Top 10 catégories:"
  category_stats.sort_by { |k,v| -v }.first(10).each do |cat, count|
    puts "  • #{cat}: #{count} articles"
  end

  puts "\n🏷️  Top 15 tags:"
  tag_stats.sort_by { |k,v| -v }.first(15).each do |tag, count|
    puts "  • #{tag}: #{count} articles"
  end

  puts "\n🖼️  Images manquantes:"
  if missing_images.empty?
    puts "  ✅ Toutes les images sont présentes!"
  else
    missing_images.each do |missing|
      if missing['missing_field']
        puts "  ❌ #{missing['post']}: Champ 'image' manquant"
      else
        puts "  ❌ #{missing['post']}: #{missing['expected_image']} introuvable"
      end
    end
  end

  # Analyse des patterns de nommage
  puts "\n🔍 Patterns de nommage des images:"
  image_files = Dir.glob("#{IMAGES_DIR}/*.jpg") + Dir.glob("#{IMAGES_DIR}/*.png") + Dir.glob("#{IMAGES_DIR}/*.webp")
  naming_patterns = {
    'date-slug' => 0,
    'autre' => 0
  }

  image_files.each do |img|
    basename = File.basename(img, '.*')
    if basename =~ /^\d{4}-\d{2}-\d{2}-/
      naming_patterns['date-slug'] += 1
    else
      naming_patterns['autre'] += 1
    end
  end

  puts "  • Format YYYY-MM-DD-slug: #{naming_patterns['date-slug']} images"
  puts "  • Autres formats: #{naming_patterns['autre']} images"

  # Export JSON pour analyse détaillée
  File.write('blog_audit_results.json', {
    posts_data: posts_data,
    missing_images: missing_images,
    category_stats: category_stats,
    tag_stats: tag_stats,
    naming_patterns: naming_patterns
  }.to_json)

  puts "\n💾 Résultats exportés dans blog_audit_results.json"
end

def suggest_improvements
  puts "\n💡 SUGGESTIONS D'AMÉLIORATION"
  puts "=" * 50

  puts "1. 📁 Structure des catégories proposée:"
  puts "   ├── /tutoriels/ (#{['Tutoriel', 'Développement'].join(', ')})"
  puts "   ├── /analyses/ (#{['Intelligence Artificielle', 'Ecommerce', 'Analyse Marché'].join(', ')})"
  puts "   ├── /case-studies/ (#{['Success Story', 'Entrepreneuriat'].join(', ')})"
  puts "   └── /techniques/ (#{['PrestaShop', 'PHP', 'Sécurité'].join(', ')})"

  puts "\n2. 🏷️ Standardisation des tags:"
  puts "   • Utiliser des tirets au lieu d'espaces: 'e-commerce' → 'ecommerce'"
  puts "   • Catégoriser par domaine: 'prestashop-', 'ia-', 'dev-'"
  puts "   • Langue cohérente: français pour tout"

  puts "\n3. 📸 Gestion des images:"
  puts "   • Renommer toutes les images au format: YYYY-MM-DD-slug.jpg"
  puts "   • Dimensions standard: 1200x630px pour couvertures"
  puts "   • Format optimisé: WebP avec fallback JPG"
  puts "   • Sous-dossiers par année/mois"

  puts "\n4. 📊 Métadonnées enrichies:"
  puts "   • Ajouter 'difficulty' varié (Débutant, Intermédiaire, Avancé, Expert)"
  puts "   • Champ 'series' pour les séries d'articles"
  puts "   • Liens 'related_posts' et 'prerequisites'"
  puts "   • Métriques: 'word_count', 'reading_time' calculé automatiquement"

  puts "\n5. 🔗 Navigation améliorée:"
  puts "   • Pages de catégories avec filtres"
  puts "   • Navigation séries d'articles"
  puts "   • Articles connexes automatiques"
  puts "   • Recherche par tags/catégories"
end

# Exécution
analyze_posts
suggest_improvements
