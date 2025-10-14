#!/usr/bin/env ruby
# Script pour réorganiser physiquement les fichiers selon la taxonomie

require 'yaml'
require 'fileutils'

# Configuration de la taxonomie
CATEGORY_FOLDERS = {
  'Tutoriels' => 'tutoriels',
  'Analyses' => 'analyses',
  'Techniques' => 'techniques',
  'Case Studies' => 'case-studies'
}

CATEGORY_MAPPING = {
  'Tutoriel' => 'Tutoriels',
  'Intelligence Artificielle' => 'Analyses',
  'Ecommerce' => 'Analyses',
  'PrestaShop' => 'Techniques',
  'Développement' => 'Tutoriels',
  'PHP' => 'Techniques',
  'Sécurité' => 'Techniques',
  'Analyse Marché' => 'Analyses',
  'Success Story' => 'Case Studies',
  'Entrepreneuriat' => 'Case Studies',
  'Automatisation' => 'Tutoriels',
  'Design' => 'Techniques'
}

def analyze_current_distribution
  puts "🔍 Analyse de la répartition actuelle des articles..."

  posts_by_category = Hash.new { |h, k| h[k] = [] }

  Dir.glob('_posts/*.md').each do |post_file|
    content = File.read(post_file)

    if content =~ /\A---\n(.*?)\n---\n/m
      begin
        front_matter = YAML.safe_load($1, permitted_classes: [Date])

        if front_matter['categories'].is_a?(Array) && front_matter['categories'].any?
          primary_category = front_matter['categories'].first
          mapped_category = CATEGORY_MAPPING[primary_category] || 'Analyses'
          posts_by_category[mapped_category] << post_file
        end
      rescue
        puts "⚠️  Erreur de parsing YAML pour #{post_file}"
      end
    end
  end

  puts "\n📊 Répartition par nouvelle catégorie:"
  total_posts = 0
  posts_by_category.each do |category, posts|
    puts "  • #{category}: #{posts.size} articles"
    total_posts += posts.size
  end
  puts "  • Total: #{total_posts} articles"

  posts_by_category
end

def create_folder_structure(posts_by_category, dry_run = true)
  puts "\n📁 Création de la structure de dossiers..."

  # Créer les dossiers pour les posts
  CATEGORY_FOLDERS.each do |cat_name, folder_name|
    post_folder = "_posts/#{folder_name}"
    image_folder = "assets/images/blog/#{folder_name}"

    if dry_run
      count = posts_by_category[cat_name]&.size || 0
      puts "  📂 #{post_folder}/ (#{count} articles)"
      puts "  🖼️  #{image_folder}/ (#{count} images)"
    else
      FileUtils.mkdir_p(post_folder)
      FileUtils.mkdir_p(image_folder)
      puts "  ✅ Créé: #{post_folder}/"
      puts "  ✅ Créé: #{image_folder}/"
    end
  end
end

def move_files(posts_by_category, dry_run = true)
  puts "\n📋 Déplacement des fichiers..."

  moved_posts = 0
  moved_images = 0

  posts_by_category.each do |category, posts|
    folder_name = CATEGORY_FOLDERS[category]

    posts.each do |post_file|
      basename = File.basename(post_file)

      # Déplacer l'article
      new_post_path = "_posts/#{folder_name}/#{basename}"
      if dry_run
        puts "  📄 #{post_file} → #{new_post_path}"
      else
        FileUtils.mv(post_file, new_post_path)
        puts "  ✅ Déplacé: #{basename}"
      end
      moved_posts += 1

      # Trouver et déplacer l'image correspondante
      image_basename = basename.sub('.md', '.jpg')
      image_path = "assets/images/blog/#{image_basename}"

      if File.exist?(image_path)
        new_image_path = "assets/images/blog/#{folder_name}/#{image_basename}"
        if dry_run
          puts "  🖼️  #{image_path} → #{new_image_path}"
        else
          FileUtils.mv(image_path, new_image_path)
          puts "  ✅ Image déplacée: #{image_basename}"
        end
        moved_images += 1
      end
    end
  end

  puts "\n📈 Résumé du déplacement:"
  puts "  • Articles déplacés: #{moved_posts}"
  puts "  • Images déplacées: #{moved_images}"
end

def update_jekyll_config
  puts "\n⚙️  Mise à jour de la configuration Jekyll..."

  config_file = '_config.yml'
  config_content = File.read(config_file)

  # Ajouter les collections pour les catégories
  collections_config = <<~YAML

  # Collections pour l'organisation du blog par catégories
  collections:
    tutoriels:
      output: true
      permalink: /blog/tutoriels/:name/
    analyses:
      output: true
      permalink: /blog/analyses/:name/
    techniques:
      output: true
      permalink: /blog/techniques/:name/
    case_studies:
      output: true
      permalink: /blog/case-studies/:name/

  YAML

  if config_content.include?('collections:')
    puts "⚠️  Collections déjà configurées dans _config.yml"
  else
    File.open(config_file, 'a') do |f|
      f.puts collections_config
    end
    puts "✅ Collections ajoutées à _config.yml"
  end
end

# Mode dry-run par défaut pour sécurité
if ARGV.include?('--execute')
  puts "🚨 MODE EXECUTION - Modifications réelles !"
  posts_by_category = analyze_current_distribution
  create_folder_structure(posts_by_category, false)
  move_files(posts_by_category, false)
  update_jekyll_config
else
  puts "🔍 MODE DRY-RUN - Simulation des changements"
  puts "Utilisez --execute pour appliquer les modifications"
  puts ""
  posts_by_category = analyze_current_distribution
  create_folder_structure(posts_by_category, true)
  move_files(posts_by_category, true)
end

puts "\n🎯 Structure finale proposée:"
puts "├── _posts/"
CATEGORY_FOLDERS.each do |cat_name, folder_name|
  count = posts_by_category[cat_name]&.size || 0
  puts "│   ├── #{folder_name}/ (#{count} articles)"
end
puts "└── assets/images/blog/"
CATEGORY_FOLDERS.each do |cat_name, folder_name|
  count = posts_by_category[cat_name]&.size || 0
  puts "    ├── #{folder_name}/ (#{count} images)"
end
