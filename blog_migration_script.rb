#!/usr/bin/env ruby
# Script de migration automatique du blog vers les nouveaux standards
# Usage: ruby blog_migration_script.rb [--dry-run] [--file=article.md]

require 'yaml'
require 'fileutils'
require 'optparse'

POSTS_DIR = '_posts'
BACKUP_DIR = '_posts_backup'

# Mapping des catégories anciennes vers nouvelles
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
  'Bonnes Pratiques' => 'Techniques'
}

# Fonction pour normaliser les tags
def normalize_tags(tags)
  return [] unless tags.is_a?(Array)

  tags.map do |tag|
    # Remplacer les espaces par des tirets
    normalized = tag.downcase.gsub(' ', '-').gsub('_', '-')

    # Ajouter des préfixes selon le domaine
    case normalized
    when /prestashop/
      normalized
    when /ia|intelligence|chatgpt|claude|gemini|mcp|openai/
      normalized.start_with?('ia-') ? normalized : "ia-#{normalized}"
    when /dev|typescript|javascript|php|node|react|vue/
      normalized.start_with?('dev-') ? normalized : "dev-#{normalized}"
    when /security|sécurité|authentification|permissions/
      normalized.start_with?('security-') ? normalized : "security-#{normalized}"
    else
      normalized
    end
  end.uniq
end

# Fonction pour déterminer la difficulté basée sur le contenu
def determine_difficulty(content, tags)
  # Compter les mots techniques
  tech_words = [
    'api', 'sql', 'docker', 'kubernetes', 'aws', 'git', 'terminal', 'cli',
    'algorithme', 'architecture', 'framework', 'library', 'protocole'
  ]

  tech_count = tech_words.count { |word| content.downcase.include?(word) }

  # Facteurs de difficulté
  has_code = content.include?('```') || content.include?('{% highlight')
  has_mcp = tags.any? { |t| t.include?('mcp') }
  has_advanced = content.downcase.include?('avancé') || content.downcase.include?('expert')

  if tech_count >= 5 || has_code || has_mcp || has_advanced
    'Avancé'
  elsif tech_count >= 2 || tags.include?('Tutoriel')
    'Intermédiaire'
  else
    'Débutant'
  end
end

# Fonction pour détecter les séries
SERIES_PATTERNS = {
  'MCP Protocol Complet' => [
    /mcp.*protocole/i, /mcp.*guide/i, /mcp.*introduction/i,
    /mcp.*outil/i, /mcp.*menu/i, /mcp.*découverte/i,
    /mcp.*sécur/i, /mcp.*claude/i, /mcp.*desktop/i
  ]
}

def detect_series(title, content, tags)
  SERIES_PATTERNS.each do |series_name, patterns|
    if patterns.any? { |pattern| title =~ pattern || content =~ pattern } ||
       tags.any? { |tag| tag.include?('mcp') }
      return series_name
    end
  end
  nil
end

# Fonction principale de migration
def migrate_post(file_path, options = {})
  puts "🔄 Migration de: #{file_path}"

  content = File.read(file_path)

  # Séparer front matter et contenu
  if content =~ /\A---\n(.*?)\n---\n(.*)/m
    front_matter_raw = $1
    body_content = $2

    begin
      front_matter = YAML.safe_load(front_matter_raw, permitted_classes: [Date])
    rescue Psych::DisallowedClass
      # Fallback parsing
      front_matter = {}
      front_matter_raw.each_line do |line|
        if line =~ /^(\w+):\s*(.+)$/
          key, value = $1, $2.strip
          case key
          when 'categories'
            front_matter[key] = value.scan(/[\w\s]+/).map(&:strip) if value.include?('[')
          when 'tags'
            front_matter[key] = value.scan(/[\w\s\-]+/).map(&:strip) if value.include?('[')
          else
            front_matter[key] = value
          end
        end
      end
    end

    # Appliquer les transformations
    new_front_matter = front_matter.dup

    # 1. Recatégoriser
    if front_matter['categories'].is_a?(Array) && front_matter['categories'].length > 0
      primary_category = front_matter['categories'].first
      new_front_matter['categories'] = [CATEGORY_MAPPING[primary_category] || primary_category]
    end

    # 2. Normaliser les tags
    if front_matter['tags'].is_a?(Array)
      new_front_matter['tags'] = normalize_tags(front_matter['tags'])
    end

    # 3. Déterminer la difficulté
    new_front_matter['difficulty'] = determine_difficulty(body_content, new_front_matter['tags'] || [])

    # 4. Détecter les séries
    series_name = detect_series(
      front_matter['title'] || '',
      body_content,
      new_front_matter['tags'] || []
    )
    if series_name
      new_front_matter['series'] = series_name
      # Logique pour déterminer l'épisode (à implémenter selon les patterns)
    end

    # 5. Calculer le nombre de mots
    word_count = body_content.split(/\s+/).length
    new_front_matter['word_count'] = word_count

    # 6. Calculer le temps de lecture (mots/minute = 200)
    reading_time = (word_count / 200.0).ceil
    new_front_matter['estimated_reading_time'] = "#{reading_time} minutes"

    # Générer le nouveau front matter
    new_front_matter_yaml = new_front_matter.to_yaml

    # Créer le nouveau contenu
    new_content = "---\n#{new_front_matter_yaml}---\n#{body_content}"

    if options[:dry_run]
      puts "📋 DRY RUN - Modifications proposées pour #{file_path}:"
      puts "  • Catégories: #{front_matter['categories']} → #{new_front_matter['categories']}"
      puts "  • Tags: #{front_matter['tags']&.first(3)} → #{new_front_matter['tags']&.first(3)}"
      puts "  • Difficulté: #{front_matter['difficulty']} → #{new_front_matter['difficulty']}"
      puts "  • Série détectée: #{new_front_matter['series']}"
      puts "  • Temps de lecture: #{new_front_matter['estimated_reading_time']}"
    else
      # Sauvegarde
      FileUtils.mkdir_p(BACKUP_DIR)
      FileUtils.cp(file_path, "#{BACKUP_DIR}/#{File.basename(file_path)}")

      # Écriture du nouveau fichier
      File.write(file_path, new_content)
      puts "✅ Migré: #{file_path}"
    end

  else
    puts "❌ Format non reconnu: #{file_path}"
  end
end

# Interface CLI
options = {}
OptionParser.new do |opts|
  opts.banner = "Usage: ruby blog_migration_script.rb [options] [file]"

  opts.on("--dry-run", "Aperçu des modifications sans les appliquer") do
    options[:dry_run] = true
  end

  opts.on("--file=FILE", "Migrer un fichier spécifique") do |file|
    options[:file] = file
  end

  opts.on("--all", "Migrer tous les fichiers") do
    options[:all] = true
  end
end.parse!

# Exécution
if options[:file]
  migrate_post(options[:file], options)
elsif options[:all]
  Dir.glob("#{POSTS_DIR}/*.md").each do |file|
    migrate_post(file, options)
  end
else
  puts "Utilisation:"
  puts "  ruby blog_migration_script.rb --dry-run --all    # Aperçu de toutes les migrations"
  puts "  ruby blog_migration_script.rb --all             # Migrer tous les articles"
  puts "  ruby blog_migration_script.rb --file=article.md # Migrer un article spécifique"
end
