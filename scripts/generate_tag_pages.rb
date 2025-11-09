#!/usr/bin/env ruby
# frozen_string_literal: true

# Script de génération automatique des pages de tags - Version SEO optimisée
# Compatible avec GitHub Pages en mode safe
# Génère physiquement les fichiers blog/tags/[slug]/index.html avant le build Jekyll
#
# Stratégie SEO à 2 niveaux :
# - Tags avec ≥3 articles : indexés, descriptions enrichies, priority 0.7
# - Tags avec 1-2 articles : noindex (navigation seulement), priority 0.3

require 'yaml'
require 'fileutils'
require 'set'
require 'date'

# Seuil minimum d'articles pour indexation SEO
INDEXATION_THRESHOLD = 3

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

# Base de descriptions enrichies pour les tags principaux
TAG_DESCRIPTIONS = {
  'PrestaShop' => "PrestaShop est la solution e-commerce open-source leader en Europe. Découvrez nos guides techniques, tutoriels de développement de modules, et bonnes pratiques pour créer des boutiques performantes et évolutives.",
  'IA' => "L'Intelligence Artificielle révolutionne le développement web et l'e-commerce. Explorez nos articles sur l'intégration IA, les outils de codage assistés, et les stratégies d'automatisation intelligente.",
  'MCP' => "Le Model Context Protocol (MCP) est le standard émergent pour connecter les IA aux outils et données. Apprenez à créer des serveurs MCP, à intégrer le protocole, et à bâtir des agents intelligents.",
  'ChatGPT' => "ChatGPT d'OpenAI transforme la façon dont nous codons et créons du contenu. Découvrez les techniques de prompt engineering, les intégrations e-commerce, et les cas d'usage avancés pour développeurs.",
  'e-commerce' => "Le commerce électronique évolue constamment avec l'IA et les nouvelles technologies. Retrouvez nos analyses de plateformes, stratégies marketing digital, et outils d'optimisation de conversions.",
  'IA générative' => "L'IA générative (texte, images, code) ouvre de nouvelles possibilités créatives. Explorez les modèles comme GPT, Claude, Gemini et leurs applications pratiques dans le développement et le marketing.",
  'sécurité' => "La sécurité web et la protection des données sont essentielles en e-commerce. Découvrez nos guides sur la sécurisation PrestaShop, le RGPD, les failles communes et les bonnes pratiques de développement sécurisé.",
  'développement' => "Le développement web moderne exige des compétences variées et évolutives. Retrouvez nos tutoriels sur les frameworks, architectures, outils de productivité et méthodologies agiles.",
  'TypeScript' => "TypeScript apporte la typage statique à JavaScript pour des applications plus robustes. Apprenez à configurer TypeScript, à créer des serveurs MCP, et à développer avec les meilleures pratiques.",
  'API' => "Les APIs REST et GraphQL structurent les applications modernes. Découvrez comment concevoir, sécuriser et documenter vos APIs, notamment avec PrestaShop Admin API et autres intégrations.",
  'SEO' => "Le référencement naturel est crucial pour la visibilité e-commerce. Explorez nos stratégies SEO techniques, optimisations PrestaShop, et techniques d'indexation avec Google Shopping et IndexNow.",
  'prompt engineering' => "Le prompt engineering est l'art de communiquer efficacement avec les IA. Maîtrisez les techniques avancées pour obtenir des résultats précis avec ChatGPT, Claude, et autres modèles de langage.",
  'GitHub Copilot' => "GitHub Copilot révolutionne le codage avec l'assistance IA en temps réel. Découvrez comment l'utiliser efficacement, ses limites, et son intégration dans votre workflow de développement.",
  'modules' => "Les modules PrestaShop étendent les fonctionnalités de votre boutique. Apprenez à développer, débugger et optimiser vos modules avec les dernières versions de PrestaShop.",
  'Google Shopping' => "Google Shopping est essentiel pour la visibilité e-commerce. Maîtrisez les flux produits, les campagnes publicitaires, et l'intégration de l'IA pour optimiser vos performances.",
  'Black Friday' => "Le Black Friday est l'événement e-commerce majeur de l'année. Découvrez nos stratégies de préparation, modules essentiels, et techniques d'optimisation pour maximiser vos ventes.",
  'OpenAI' => "OpenAI développe les modèles d'IA les plus avancés comme GPT-4 et o1. Suivez l'actualité, les nouveautés API, et les possibilités d'intégration dans vos projets web et e-commerce.",
  'Gemini' => "Gemini de Google est un modèle multimodal puissant concurrent de GPT. Explorez ses capacités d'analyse d'images, de code, et son intégration dans l'écosystème Google.",
  'xAI' => "xAI d'Elon Musk développe Grok, une IA alternative avec accès à X (Twitter). Découvrez ses spécificités, sa philosophie open-source, et ses applications pour les développeurs.",
  'PrestaShop 9' => "PrestaShop 9 apporte des améliorations majeures de performance et sécurité. Préparez votre migration, découvrez les nouvelles fonctionnalités, et adaptez vos modules."
}.freeze

# Fonction pour générer une description enrichie selon le tag et le nombre d'articles
def generate_description(tag, article_count)
  # Vérifier si une description personnalisée existe
  if TAG_DESCRIPTIONS.key?(tag)
    return TAG_DESCRIPTIONS[tag]
  end

  # Descriptions génériques avec le compteur d'articles
  if article_count >= 5
    "Explorez #{article_count} articles approfondis sur #{tag}. Retrouvez nos analyses techniques, tutoriels pratiques, et retours d'expérience pour maîtriser ce sujet."
  elsif article_count >= 3
    "Découvrez #{article_count} articles détaillés sur #{tag}. Guides techniques et bonnes pratiques pour développeurs et e-commerçants."
  else
    "Découvrez tous les articles du blog liés au tag \"#{tag}\". Retrouvez nos analyses, tutoriels et actualités sur ce sujet."
  end
end

# Fonction pour générer le contenu HTML d'une page de tag
def generate_tag_page_content(tag, slug, article_count, should_index)
  description = generate_description(tag, article_count)

  # Déterminer les paramètres SEO selon le nombre d'articles
  if should_index
    robots = 'index, follow'
    priority = article_count >= 10 ? 0.8 : 0.7
    changefreq = 'weekly'
  else
    robots = 'noindex, follow'
    priority = 0.3
    changefreq = 'monthly'
  end

  <<~HTML
    ---
    layout: tag
    title: "Tag: #{tag}"
    tag: #{tag}
    description: "#{description}"
    permalink: /blog/tags/#{slug}/
    keywords: "#{tag}, tag #{tag}, articles #{tag}"
    article_count: #{article_count}
    robots: #{robots}
    sitemap:
      changefreq: "#{changefreq}"
      priority: #{priority}
    ---
  HTML
end

puts "🚀 Génération automatique des pages de tags (Version SEO optimisée)"
puts "=" * 70

# Collecter tous les tags depuis les posts ET compter leurs occurrences
tags_count = Hash.new(0)
posts_dir = '_posts'

if !Dir.exist?(posts_dir)
  puts "❌ Le dossier #{posts_dir} n'existe pas !"
  exit 1
end

# Scanner tous les fichiers markdown dans _posts/
post_files = Dir.glob("#{posts_dir}/**/*.md")
puts "📂 Analyse de #{post_files.length} articles..."
puts ""

post_files.each do |file_path|
  tags = extract_tags_from_post(file_path)
  tags.each do |tag|
    tag_clean = tag.to_s.strip
    tags_count[tag_clean] += 1 unless tag_clean.empty?
  end
end

# Statistiques
total_tags = tags_count.size
indexed_tags = tags_count.count { |_, count| count >= INDEXATION_THRESHOLD }
noindex_tags = total_tags - indexed_tags

puts "📊 STATISTIQUES"
puts "-" * 70
puts "Total de tags uniques : #{total_tags}"
puts "Tags indexés (≥#{INDEXATION_THRESHOLD} articles) : #{indexed_tags} (#{(indexed_tags.to_f/total_tags*100).round(1)}%)"
puts "Tags non-indexés (<#{INDEXATION_THRESHOLD} articles) : #{noindex_tags} (#{(noindex_tags.to_f/total_tags*100).round(1)}%)"
puts ""

# Distribution détaillée
with_1 = tags_count.count { |_, c| c == 1 }
with_2 = tags_count.count { |_, c| c == 2 }
with_3_5 = tags_count.count { |_, c| c >= 3 && c <= 5 }
with_6_10 = tags_count.count { |_, c| c >= 6 && c <= 10 }
with_10_plus = tags_count.count { |_, c| c > 10 }

puts "Distribution détaillée :"
puts "  • 1 article : #{with_1} tags (noindex)"
puts "  • 2 articles : #{with_2} tags (noindex)"
puts "  • 3-5 articles : #{with_3_5} tags (index)"
puts "  • 6-10 articles : #{with_6_10} tags (index)"
puts "  • 10+ articles : #{with_10_plus} tags (index, priorité haute)"
puts ""

# Afficher le top 10 des tags
puts "🏆 TOP 10 TAGS (indexés SEO)"
puts "-" * 70
tags_count.sort_by { |_, c| -c }.first(10).each_with_index do |(tag, count), i|
  puts "#{i+1}. #{tag} : #{count} articles"
end
puts ""

# Créer le dossier blog/tags/ s'il n'existe pas
tags_dir = 'blog/tags'
FileUtils.mkdir_p(tags_dir)

# Générer une page pour chaque tag
generated_indexed = 0
generated_noindex = 0

puts "📝 GÉNÉRATION DES PAGES"
puts "-" * 70

tags_count.sort.each do |tag, count|
  slug = slugify(tag)
  tag_page_dir = File.join(tags_dir, slug)
  tag_page_file = File.join(tag_page_dir, 'index.html')

  # Créer le dossier du tag
  FileUtils.mkdir_p(tag_page_dir)

  # Déterminer si le tag doit être indexé
  should_index = count >= INDEXATION_THRESHOLD

  # Générer le contenu de la page
  content = generate_tag_page_content(tag, slug, count, should_index)

  # Écrire le fichier
  File.write(tag_page_file, content, encoding: 'utf-8')

  # Compteurs
  if should_index
    generated_indexed += 1
    status_icon = "✅"
  else
    generated_noindex += 1
    status_icon = "⚪"
  end

  # Log uniquement pour les tags indexés ou avec beaucoup d'articles
  if should_index || count >= 2
    puts "#{status_icon} /blog/tags/#{slug}/ (#{count} article#{count > 1 ? 's' : ''}) - #{should_index ? 'INDEX' : 'noindex'}"
  end
end

puts ""
puts "=" * 70
puts "✨ RÉSUMÉ DE LA GÉNÉRATION"
puts "=" * 70
puts "Total de pages générées : #{generated_indexed + generated_noindex}"
puts "  • Pages indexées (SEO) : #{generated_indexed} pages"
puts "  • Pages non-indexées (navigation) : #{generated_noindex} pages"
puts ""
puts "📁 Dossier de sortie : #{tags_dir}/"
puts ""
puts "🎯 STRATÉGIE SEO APPLIQUÉE"
puts "-" * 70
puts "✅ Tags ≥#{INDEXATION_THRESHOLD} articles → index, follow (priority 0.7-0.8)"
puts "⚪ Tags <#{INDEXATION_THRESHOLD} articles → noindex, follow (priority 0.3)"
puts ""
puts "AVANTAGES :"
puts "  ✅ Évite le thin content (#{noindex_tags} pages noindex)"
puts "  ✅ Optimise le crawl budget"
puts "  ✅ Préserve la navigation interne (liens follow)"
puts "  ✅ Concentre l'autorité SEO sur #{indexed_tags} pages de qualité"
puts ""
puts "Ces pages seront automatiquement :"
puts "  ✅ Incluses dans le sitemap.xml (toutes)"
puts "  ✅ Indexées par IndexNow (toutes)"
puts "  ✅ Crawlées selon les directives robots (index/noindex)"
puts ""
puts "🎉 Prêt pour le build Jekyll !"
