#!/usr/bin/env ruby
# Script de migration automatique du blog vers les nouveaux standards
# Usage: ruby blog_migration_script.rb [--dry-run] [--file=article.md]

require 'yaml'
require 'fileutils'
require 'optparse'

POSTS_DIR = '_posts'
BACKUP_DIR = '_posts_backup'

# Taxonomie optimisée basée sur l'analyse des 40 articles
CATEGORY_MAPPING = {
  # Catégorie principale : contenu pratique et pédagogique
  'Tutoriel' => 'Tutoriels',

  # Catégorie principale : analyses, études, tendances
  'Intelligence Artificielle' => 'Analyses',
  'Ecommerce' => 'Analyses',
  'Analyse Marché' => 'Analyses',
  'Startups' => 'Analyses',
  'Innovation' => 'Analyses',
  'Europe' => 'Analyses',

  # Catégorie principale : techniques, code, architecture
  'PrestaShop' => 'Techniques',
  'Développement' => 'Techniques',
  'PHP' => 'Techniques',
  'Sécurité' => 'Techniques',
  'Architecture' => 'Techniques',
  'Performance' => 'Techniques',
  'Bonnes Pratiques' => 'Techniques',
  'Commerce' => 'Techniques',

  # Catégorie principale : études de cas, success stories
  'Success Story' => 'Case Studies',
  'Entrepreneuriat' => 'Case Studies',

  # Catégories spécialisées conservées
  'Automatisation' => 'Tutoriels',
  'Design' => 'Techniques'
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

# Fonction pour détecter les séries d'articles
SERIES_PATTERNS = {
  'MCP Protocol Complet' => [
    /mcp.*protocole/i, /mcp.*guide/i, /mcp.*introduction/i,
    /mcp.*outil/i, /mcp.*menu/i, /mcp.*découverte/i,
    /mcp.*sécur/i, /mcp.*claude/i, /mcp.*desktop/i,
    /mcp.*typescript/i, /mcp.*setup/i, /mcp.*conversation/i
  ],

  'PrestaShop Architecture' => [
    /prestashop.*api/i, /prestashop.*admin.*api/i, /command.*bus/i,
    /prestashop.*doctrine/i, /prestashop.*lazy.*load/i,
    /prestashop.*symfony/i, /prestashop.*migration/i
  ],

  'IA E-commerce' => [
    /geo.*suite/i, /black.*friday.*geo/i, /google.*shopping.*gemini/i,
    /shopify.*chatgpt/i, /prestashop.*shopify/i
  ],

  'Sécurité IA' => [
    /ia.*sécur/i, /grok.*security/i, /chatgpt.*sécur/i,
    /ia.*danger/i, /ai.*act/i, /contrôles.*parentaux/i
  ]
}

def detect_series(title, content, tags)
  SERIES_PATTERNS.each do |series_name, patterns|
    title_content = "#{title} #{content}".downcase
    tag_string = tags.join(' ').downcase

    # Vérifier les patterns dans le titre/contenu ou les tags
    if patterns.any? { |pattern|
      title_content =~ pattern ||
      tag_string =~ pattern ||
      (series_name == 'MCP Protocol Complet' && (tag_string.include?('mcp') || content.include?('MCP')))
    }
      return series_name
    end
  end
  nil
end

# Fonction pour déterminer l'épisode dans une série
def determine_episode(series_name, title, content)
  case series_name
  when 'MCP Protocol Complet'
    if title =~ /introduction|guide|protocole/i || content =~ /introduction|premiers pas/i
      1
    elsif title =~ /setup|typescript/i
      2
    elsif title =~ /outil|readfile/i
      3
    elsif title =~ /menu|découverte/i
      4
    elsif title =~ /sécur/i
      5
    elsif title =~ /claude|desktop|integration/i
      6
    else
      nil
    end
  else
    nil
  end
end

# Fonction pour mapper les catégories avec logique de priorité
def map_category(old_categories)
  return 'Tutoriels' unless old_categories.is_a?(Array) && old_categories.any?

  # Logique de priorité : Case Studies > Techniques > Analyses > Tutoriels
  priority_order = ['Case Studies', 'Techniques', 'Analyses', 'Tutoriels']

  mapped_categories = old_categories.map { |old_cat| CATEGORY_MAPPING[old_cat] }.compact.uniq

  # Retourner la catégorie de plus haute priorité trouvée
  priority_order.each do |priority_cat|
    return priority_cat if mapped_categories.include?(priority_cat)
  end

  # Défaut si rien ne correspond
  'Analyses'
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

    # 1. Recatégoriser avec logique de priorité
    if front_matter['categories'].is_a?(Array) && front_matter['categories'].length > 0
      new_front_matter['categories'] = [map_category(front_matter['categories'])]
    end

    # 2. Normaliser les tags
    if front_matter['tags'].is_a?(Array)
      new_front_matter['tags'] = normalize_tags(front_matter['tags'])
    end

    # 3. Déterminer la difficulté
    new_front_matter['difficulty'] = determine_difficulty(body_content, new_front_matter['tags'] || [])

    # 4. Détecter les séries et épisodes
    series_name = detect_series(
      front_matter['title'] || '',
      body_content,
      new_front_matter['tags'] || []
    )
    if series_name
      new_front_matter['series'] = series_name
      episode = determine_episode(series_name, front_matter['title'] || '', body_content)
      new_front_matter['episode'] = episode if episode
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
