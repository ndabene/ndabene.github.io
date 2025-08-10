# frozen_string_literal: true

# Validate _data/produits.yml against editorial and structural rules

require 'yaml'
require 'json'

ROOT = File.expand_path('..', __dir__)
DATA_FILE = File.join(ROOT, '_data', 'produits.yml')

def read_yaml(path)
  YAML.safe_load(File.read(path), permitted_classes: [Date, Time], aliases: true)
rescue Psych::SyntaxError => e
  abort("YAML syntax error in #{path}: #{e.message}")
end

def file_exists_relative?(rel)
  File.exist?(File.join(ROOT, rel.to_s))
end

required_keys = %w[nom description image categorie prix type format file_format univers]
allowed_types = %w[ebook formation pack]
allowed_univers = [
  'IA', 'PrestaShop', 'Développement', 'Development', 'Dev', 'VTT'
]

products = read_yaml(DATA_FILE)
unless products.is_a?(Array)
  abort("Expected an array of products in #{DATA_FILE}")
end

errors = []
warnings = []

# Duplicate name detection
name_counts = Hash.new(0)
products.each { |p| name_counts[p['nom']] += 1 if p['nom'] }
name_counts.each do |name, count|
  next unless count > 1
  errors << "Duplicate 'nom': #{name.inspect} (#{count} occurrences)"
end

products.each_with_index do |p, idx|
  id = p['nom'] || "<produit ##{idx + 1}>"

  # Required keys
  required_keys.each do |k|
    errors << "#{id}: missing required key '#{k}'" unless p.key?(k)
  end

  # prix format
  if p['prix'] && !(p['prix'].to_s.strip =~ /^\d+(?:[.,]\d+)?€ \/ HT$/)
    errors << "#{id}: invalid prix format '#{p['prix']}'. Expected like '49€ / HT'"
  end

  # type
  if p['type'] && !allowed_types.include?(p['type'].to_s)
    errors << "#{id}: invalid type '#{p['type']}'. Allowed: #{allowed_types.join(', ')}"
  end

  # univers
  if p['univers'] && !allowed_univers.include?(p['univers'].to_s)
    warnings << "#{id}: univers '#{p['univers']}' not in controlled list #{allowed_univers.join(', ')}"
  end

  # image exists
  if p['image'] && !file_exists_relative?(p['image'])
    errors << "#{id}: image not found at '#{p['image']}'"
  end

  # duration typography
  if p['duree'] && p['duree'].to_s.include?('-') && !p['duree'].to_s.include?('–')
    warnings << "#{id}: 'duree' should use en dash '–' instead of '-' (e.g., '2–3 h')"
  end

  # pack inclus present
  is_pack = (p['type'].to_s == 'pack') || (p['categorie'].to_s == 'Pack')
  if is_pack
    errors << "#{id}: key 'inclus' is required for packs and must be a non-empty array" unless p['inclus'].is_a?(Array) && !p['inclus'].empty?
    errors << "#{id}: unexpected key 'inclut' — use 'inclus'" if p.key?('inclut')
  end

  # micro_extraits rules
  if p.key?('micro_extraits')
    if !p['micro_extraits'].is_a?(Array)
      errors << "#{id}: 'micro_extraits' must be an array of 1..3 strings"
    else
      if p['micro_extraits'].length > 3
        warnings << "#{id}: 'micro_extraits' has more than 3 items; only first 3 are displayed"
      end
      p['micro_extraits'].each_with_index do |txt, i|
        if !txt.is_a?(String) || txt.strip.empty?
          errors << "#{id}: micro_extraits[#{i}] must be a non-empty string"
          next
        end
        unless txt.strip.start_with?('Vous')
          warnings << "#{id}: micro_extraits[#{i}] should start with 'Vous …'"
        end
        unless txt.strip.end_with?('.')
          warnings << "#{id}: micro_extraits[#{i}] should end with a period '.'"
        end
        len = txt.strip.length
        if len < 90 || len > 140
          warnings << "#{id}: micro_extraits[#{i}] length #{len} chars; recommended 90–140"
        end
      end
    end
  end
end

puts "Validated #{products.length} products from _data/produits.yml"

unless warnings.empty?
  puts "\nWarnings (#{warnings.length}):"
  warnings.each { |w| puts "  - #{w}" }
end

if errors.empty?
  puts "\nOK: no errors."
  exit 0
else
  puts "\nErrors (#{errors.length}):"
  errors.each { |e| puts "  - #{e}" }
  exit 1
end


