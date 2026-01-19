#!/usr/bin/env ruby
# frozen_string_literal: true
# encoding: utf-8

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

require 'yaml'
require 'find'
require 'pathname'
require 'digest'

# Script pour ajouter automatiquement les champs ref manquants
# Usage: ruby scripts/fix_missing_refs.rb

class RefFixer
  POSTS_FR_DIR = '_posts'
  POSTS_EN_DIR = '_posts_en'

  def initialize
    @fr_posts = collect_posts(POSTS_FR_DIR)
    @en_posts = collect_posts(POSTS_EN_DIR)
    @changes = []
  end

  def run
    puts "🔧 Correction des références manquantes...\n\n"

    puts "📊 Statistiques:"
    puts "   - Articles FR: #{@fr_posts.count}"
    puts "   - Articles EN: #{@en_posts.count}\n\n"

    # Trouver les paires par date
    find_pairs_by_date

    puts "\n📝 Résumé des changements:"
    if @changes.empty?
      puts "✅ Aucun changement nécessaire!\n"
    else
      @changes.each_with_index do |change, index|
        puts "\n#{index + 1}. #{change[:type]}"
        puts "   FR: #{change[:fr_file]}"
        puts "   EN: #{change[:en_file]}"
        puts "   Ref: #{change[:ref]}"
      end

      puts "\n💾 Appliquer les changements? (y/n)"
      response = STDIN.gets.chomp.downcase

      if response == 'y' || response == 'yes'
        apply_changes
        puts "\n✅ Changements appliqués avec succès!"
      else
        puts "\n❌ Changements annulés."
      end
    end
  end

  private

  def collect_posts(dir)
    posts = []
    return posts unless Dir.exist?(dir)

    Find.find(dir) do |path|
      next unless path.end_with?('.md')

      begin
        content = File.read(path, encoding: 'UTF-8')
        frontmatter = extract_frontmatter(content)

        # Extraire la date du nom de fichier si elle n'est pas dans le frontmatter
        filename = File.basename(path)
        date_from_filename = filename.match(/^(\d{4}-\d{2}-\d{2})/)&.[](1)

        posts << {
          path: path,
          filename: filename,
          ref: frontmatter['ref'],
          title: frontmatter['title'],
          date: frontmatter['date']&.to_s || date_from_filename,
          lang: frontmatter['lang'],
          content: content,
          frontmatter_raw: extract_frontmatter_raw(content)
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

    begin
      YAML.safe_load(match[1], permitted_classes: [Date, Time, Symbol], aliases: true) || {}
    rescue => e
      # Fallback: parse manuel basique
      result = {}
      match[1].split("\n").each do |line|
        if line =~ /^(\w+):\s*(.+)$/
          key = $1
          value = $2.strip.gsub(/^['"]|['"]$/, '')
          result[key] = value
        end
      end
      result
    end
  end

  def extract_frontmatter_raw(content)
    match = content.match(/\A---\s*\n(.*?)\n---\s*\n/m)
    match ? match[1] : nil
  end

  def find_pairs_by_date
    # Grouper par date
    fr_by_date = @fr_posts.group_by { |p| p[:date] }
    en_by_date = @en_posts.group_by { |p| p[:date] }

    # Trouver les dates communes
    common_dates = fr_by_date.keys & en_by_date.keys

    common_dates.each do |date|
      fr_articles = fr_by_date[date]
      en_articles = en_by_date[date]

      next if fr_articles.nil? || en_articles.nil?

      # Si même date et même nombre d'articles
      if fr_articles.count == 1 && en_articles.count == 1
        fr_article = fr_articles.first
        en_article = en_articles.first

        # Vérifier si les deux ont déjà un ref
        if fr_article[:ref] && en_article[:ref]
          if fr_article[:ref] != en_article[:ref]
            puts "⚠️  Conflit de ref pour #{date}:"
            puts "   FR: #{fr_article[:ref]}"
            puts "   EN: #{en_article[:ref]}"
          end
        elsif fr_article[:ref] || en_article[:ref]
          # Un seul a un ref, copier sur l'autre
          ref = fr_article[:ref] || en_article[:ref]
          if fr_article[:ref].nil?
            @changes << {
              type: "Ajouter ref manquant (FR)",
              fr_file: fr_article[:path],
              en_file: en_article[:path],
              ref: ref,
              add_to: :fr,
              article: fr_article
            }
          else
            @changes << {
              type: "Ajouter ref manquant (EN)",
              fr_file: fr_article[:path],
              en_file: en_article[:path],
              ref: ref,
              add_to: :en,
              article: en_article
            }
          end
        else
          # Aucun des deux n'a de ref, en créer un
          ref = generate_ref(fr_article[:title] || en_article[:title], date)
          @changes << {
            type: "Créer nouveau ref",
            fr_file: fr_article[:path],
            en_file: en_article[:path],
            ref: ref,
            add_to: :both,
            fr_article: fr_article,
            en_article: en_article
          }
        end
      end
    end
  end

  def generate_ref(title, date)
    # Créer un slug à partir du titre
    slug = title.to_s
      .downcase
      .gsub(/[àáâãäå]/, 'a')
      .gsub(/[èéêë]/, 'e')
      .gsub(/[ìíîï]/, 'i')
      .gsub(/[òóôõö]/, 'o')
      .gsub(/[ùúûü]/, 'u')
      .gsub(/[ç]/, 'c')
      .gsub(/[^a-z0-9\s-]/, '')
      .gsub(/\s+/, '-')
      .gsub(/-+/, '-')
      .strip

    # Limiter à 50 caractères
    slug = slug[0..49] if slug.length > 50

    slug
  end

  def apply_changes
    @changes.each do |change|
      case change[:add_to]
      when :fr
        add_ref_to_file(change[:article], change[:ref])
      when :en
        add_ref_to_file(change[:article], change[:ref])
      when :both
        add_ref_to_file(change[:fr_article], change[:ref])
        add_ref_to_file(change[:en_article], change[:ref])
      end
    end
  end

  def add_ref_to_file(article, ref)
    content = article[:content]

    # Trouver la position après 'date:'
    if content =~ /\A(---\s*\n.*?^date:.*?\n)(.*?---\s*\n)/m
      before_date = $1
      after_date = $2

      # Vérifier si ref existe déjà
      if after_date =~ /^ref:/
        puts "   ⚠️  Ref déjà présent dans #{article[:path]}"
        return
      end

      # Ajouter ref après date
      new_content = "#{before_date}ref: #{ref}\n#{after_date}"

      File.write(article[:path], new_content, encoding: 'UTF-8')
      puts "   ✅ Ref ajouté à #{article[:path]}"
    else
      puts "   ⚠️  Impossible d'ajouter ref à #{article[:path]} (format non standard)"
    end
  end
end

# Exécution
if __FILE__ == $0
  fixer = RefFixer.new
  fixer.run
end
