#!/usr/bin/env ruby
# frozen_string_literal: true
# encoding: utf-8

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

require 'yaml'
require 'find'
require 'pathname'

# Script pour identifier les articles manquants entre FR et EN
# Usage: ruby scripts/check_missing_translations.rb

class MissingTranslationChecker
  POSTS_FR_DIR = '_posts'
  POSTS_EN_DIR = '_posts_en'

  def initialize
    @fr_posts = collect_posts(POSTS_FR_DIR)
    @en_posts = collect_posts(POSTS_EN_DIR)
  end

  def run
    puts "🔍 Vérification des traductions manquantes...\n\n"

    puts "📊 Statistiques:"
    puts "   - Articles FR: #{@fr_posts.count}"
    puts "   - Articles EN: #{@en_posts.count}"
    puts "   - Différence: #{(@fr_posts.count - @en_posts.count).abs}\n\n"

    missing_en = find_missing_translations(@fr_posts, @en_posts)
    missing_fr = find_missing_translations(@en_posts, @fr_posts)

    display_missing_translations("🇫🇷 → 🇬🇧 Articles FR sans traduction EN", missing_en)
    display_missing_translations("🇬🇧 → 🇫🇷 Articles EN sans traduction FR", missing_fr)

    generate_report(missing_en, missing_fr)

    exit_code = (missing_en.empty? && missing_fr.empty?) ? 0 : 1
    exit exit_code
  end

  private

  def collect_posts(dir)
    posts = []
    return posts unless Dir.exist?(dir)

    Find.find(dir) do |path|
      next unless path.end_with?('.md')

      begin
        content = File.read(path)
        frontmatter = extract_frontmatter(content)

        posts << {
          path: path,
          filename: File.basename(path),
          ref: frontmatter['ref'],
          title: frontmatter['title'],
          date: frontmatter['date'],
          lang: frontmatter['lang']
        }
      rescue => e
        puts "⚠️  Erreur lors de la lecture de #{path}: #{e.message}"
      end
    end

    posts
  end

  def extract_frontmatter(content)
    match = content.match(/\A---\s*\n(.*?)\n---\s*\n/m)
    return {} unless match

    YAML.safe_load(match[1], permitted_classes: [Date, Time, Symbol], aliases: true) || {}
  rescue => e
    # Silently ignore YAML errors - we'll still get basic data
    {}
  end

  def find_missing_translations(source_posts, target_posts)
    missing = []

    source_posts.each do |source|
      # Chercher par ref (meilleure méthode)
      if source[:ref]
        found = target_posts.any? { |t| t[:ref] == source[:ref] }
      else
        # Fallback: chercher par nom de fichier
        found = target_posts.any? { |t| t[:filename] == source[:filename] }
      end

      missing << source unless found
    end

    missing.sort_by { |p| p[:date] || '' }.reverse
  end

  def display_missing_translations(title, missing_posts)
    puts "#{title} (#{missing_posts.count}):"
    puts "=" * 80

    if missing_posts.empty?
      puts "✅ Aucune traduction manquante!\n\n"
      return
    end

    missing_posts.each_with_index do |post, index|
      puts "\n#{index + 1}. #{post[:title]}"
      puts "   📅 Date: #{post[:date]}"
      puts "   📁 Fichier: #{post[:filename]}"
      puts "   🔗 Ref: #{post[:ref] || 'N/A'}"
      puts "   📂 Chemin: #{post[:path]}"
    end

    puts "\n" + "=" * 80 + "\n\n"
  end

  def generate_report(missing_en, missing_fr)
    report_path = 'missing_translations_report.md'

    File.open(report_path, 'w') do |f|
      f.puts "# Rapport des traductions manquantes"
      f.puts "\nGénéré le: #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}\n"

      f.puts "\n## 📊 Statistiques\n"
      f.puts "- **Articles FR**: #{@fr_posts.count}"
      f.puts "- **Articles EN**: #{@en_posts.count}"
      f.puts "- **Articles FR sans traduction EN**: #{missing_en.count}"
      f.puts "- **Articles EN sans traduction FR**: #{missing_fr.count}"
      f.puts "- **Total de traductions manquantes**: #{missing_en.count + missing_fr.count}"

      if missing_en.any?
        f.puts "\n## 🇫🇷 → 🇬🇧 Articles FR sans traduction EN (#{missing_en.count})\n"
        missing_en.each_with_index do |post, index|
          f.puts "\n### #{index + 1}. #{post[:title]}"
          f.puts "- **Date**: #{post[:date]}"
          f.puts "- **Fichier**: `#{post[:filename]}`"
          f.puts "- **Ref**: #{post[:ref] || 'N/A'}"
          f.puts "- **Chemin**: `#{post[:path]}`"
        end
      end

      if missing_fr.any?
        f.puts "\n## 🇬🇧 → 🇫🇷 Articles EN sans traduction FR (#{missing_fr.count})\n"
        missing_fr.each_with_index do |post, index|
          f.puts "\n### #{index + 1}. #{post[:title]}"
          f.puts "- **Date**: #{post[:date]}"
          f.puts "- **Fichier**: `#{post[:filename]}`"
          f.puts "- **Ref**: #{post[:ref] || 'N/A'}"
          f.puts "- **Chemin**: `#{post[:path]}`"
        end
      end

      f.puts "\n## 📝 Actions recommandées\n"
      f.puts "1. Traduire les articles manquants les plus récents en priorité"
      f.puts "2. Ajouter un champ `ref` identique dans les frontmatters des articles traduits"
      f.puts "3. Vérifier que le champ `lang` est correctement défini (fr/en)"
      f.puts "4. Relancer ce script régulièrement pour suivre l'avancement"
    end

    puts "📝 Rapport détaillé généré: #{report_path}\n\n"
  end
end

# Exécution
if __FILE__ == $0
  checker = MissingTranslationChecker.new
  checker.run
end
