# frozen_string_literal: true

# Validate that all articles with an `image:` frontmatter field have their
# full set of responsive image variants (WebP + AVIF in 480/720/1080px).
#
# Run AFTER image generation scripts (generate:webp + generate:variants).
# Fails with exit 1 if any required file is missing.

require 'yaml'
require 'date'

ROOT = File.expand_path('..', __dir__)
POSTS_DIRS = [
  File.join(ROOT, '_posts'),
  File.join(ROOT, '_posts_en')
].freeze
SIZES = [480, 720, 1080].freeze

def read_frontmatter(file_path)
  content = File.read(file_path, encoding: 'UTF-8')
  match = content.match(/^---\s*\n(.*?)\n---\s*\n/m)
  return nil unless match

  YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: true)
rescue Psych::SyntaxError
  nil
end

errors = []

POSTS_DIRS.each do |dir|
  next unless Dir.exist?(dir)

  Dir.glob(File.join(dir, '**', '*.md')).sort.each do |file|
    fm = read_frontmatter(file)
    next unless fm.is_a?(Hash)

    image_path = fm['image'].to_s.strip
    next if image_path.empty?

    # Only validate images in the isolated blog folder pattern (2026+)
    next unless image_path.match?(%r{^/assets/images/blog/\d{4}/\d{2}/[^/]+/.+\.webp$})

    relative = file.sub("#{ROOT}/", '')
    base = image_path.sub(/\.webp$/, '')

    # Check base WebP
    unless File.exist?(File.join(ROOT, image_path))
      errors << "#{relative}: base image missing: #{image_path}"
    end

    # Check all responsive variants
    SIZES.each do |size|
      webp_variant = "#{base}-#{size}.webp"
      avif_variant = "#{base}-#{size}.avif"

      unless File.exist?(File.join(ROOT, webp_variant))
        errors << "#{relative}: missing WebP variant: #{webp_variant}"
      end

      unless File.exist?(File.join(ROOT, avif_variant))
        errors << "#{relative}: missing AVIF variant: #{avif_variant}"
      end
    end
  end
end

if errors.empty?
  puts "✅ Toutes les images d'articles sont complètes (base WebP + variants WebP/AVIF)"
  exit 0
else
  puts "❌ #{errors.size} fichier(s) image manquant(s) — build bloqué pour éviter une MEP incomplète:\n"
  errors.each { |e| puts "   ❌ #{e}" }
  puts "\nLancez `npm run generate:webp && npm run generate:variants` pour générer les fichiers manquants."
  exit 1
end
