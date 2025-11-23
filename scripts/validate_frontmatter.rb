# frozen_string_literal: true

# Validate blog posts frontmatter against editorial and structural rules

require 'yaml'
require 'date'

ROOT = File.expand_path('..', __dir__)
POSTS_DIRS = [
  File.join(ROOT, '_posts'),
  File.join(ROOT, '_posts_en')
].freeze

def read_frontmatter(file_path)
  content = File.read(file_path, encoding: 'UTF-8')

  # Extract frontmatter between --- delimiters
  match = content.match(/^---\s*\n(.*?)\n---\s*\n/m)
  return nil unless match

  YAML.safe_load(match[1], permitted_classes: [Date, Time], aliases: true)
rescue Psych::SyntaxError => e
  { _error: "YAML syntax error: #{e.message}" }
end

def file_exists_relative?(rel)
  File.exist?(File.join(ROOT, rel.to_s))
end

def validate_date_format(date_str)
  return false unless date_str

  # Accept YYYY-MM-DD format or YYYY-MM-DD HH:MM:SS +ZZZZ format
  date_str.to_s.match?(/^\d{4}-\d{2}-\d{2}(?:\s+\d{2}:\d{2}:\d{2}\s+[+-]\d{4})?$/)
end

def validate_filename_date(filename, frontmatter_date)
  # Extract date from filename (format: YYYY-MM-DD-title.md)
  filename_date = filename.match(/^(\d{4}-\d{2}-\d{2})-/)
  return true unless filename_date # Skip if no date in filename

  filename_date[1] == frontmatter_date.to_s
end

# Required fields for all posts
REQUIRED_FIELDS = %w[layout title date author categories tags excerpt image].freeze

# Allowed values
ALLOWED_LAYOUTS = %w[post].freeze
ALLOWED_LANGUAGES = %w[fr en].freeze
ALLOWED_DIFFICULTIES = ['Débutant', 'Intermédiaire', 'Avancé', 'Advanced', 'Beginner', 'Intermediate'].freeze

errors = []
warnings = []
posts_count = 0

POSTS_DIRS.each do |posts_dir|
  next unless Dir.exist?(posts_dir)

  Dir.glob(File.join(posts_dir, '**', '*.md')).each do |file_path|
    next if File.basename(file_path).start_with?('.')

    posts_count += 1
    relative_path = file_path.sub("#{ROOT}/", '')
    filename = File.basename(file_path, '.md')

    frontmatter = read_frontmatter(file_path)

    # Check for YAML syntax errors
    if frontmatter && frontmatter[:_error]
      errors << "#{relative_path}: #{frontmatter[:_error]}"
      next
    end

    unless frontmatter
      errors << "#{relative_path}: No valid frontmatter found (must be between --- delimiters)"
      next
    end

    id = frontmatter['title'] || relative_path

    # Required fields
    REQUIRED_FIELDS.each do |field|
      unless frontmatter.key?(field)
        errors << "#{relative_path}: missing required field '#{field}'"
      end
    end

    # Layout validation
    if frontmatter['layout'] && !ALLOWED_LAYOUTS.include?(frontmatter['layout'])
      errors << "#{relative_path}: invalid layout '#{frontmatter['layout']}'. Allowed: #{ALLOWED_LAYOUTS.join(', ')}"
    end

    # Date validation
    if frontmatter['date']
      unless validate_date_format(frontmatter['date'])
        errors << "#{relative_path}: invalid date format '#{frontmatter['date']}'. Expected YYYY-MM-DD"
      end

      # Check if filename date matches frontmatter date
      unless validate_filename_date(filename, frontmatter['date'])
        warnings << "#{relative_path}: filename date doesn't match frontmatter date"
      end
    end

    # Language validation
    if frontmatter['lang'] && !ALLOWED_LANGUAGES.include?(frontmatter['lang'])
      warnings << "#{relative_path}: unexpected language '#{frontmatter['lang']}'. Common values: #{ALLOWED_LANGUAGES.join(', ')}"
    end

    # Difficulty validation
    if frontmatter['difficulty'] && !ALLOWED_DIFFICULTIES.include?(frontmatter['difficulty'])
      warnings << "#{relative_path}: unexpected difficulty '#{frontmatter['difficulty']}'. Common values: #{ALLOWED_DIFFICULTIES.join(', ')}"
    end

    # Categories validation (should be an array)
    if frontmatter['categories']
      unless frontmatter['categories'].is_a?(Array)
        errors << "#{relative_path}: 'categories' must be an array"
      else
        if frontmatter['categories'].empty?
          warnings << "#{relative_path}: 'categories' is empty"
        end
      end
    end

    # Tags validation (should be an array)
    if frontmatter['tags']
      unless frontmatter['tags'].is_a?(Array)
        errors << "#{relative_path}: 'tags' must be an array"
      else
        if frontmatter['tags'].empty?
          warnings << "#{relative_path}: 'tags' is empty"
        end
      end
    end

    # Image validation
    if frontmatter['image']
      image_path = frontmatter['image'].to_s
      unless file_exists_relative?(image_path)
        warnings << "#{relative_path}: image not found at '#{image_path}'"
      end
    end

    # Excerpt validation
    if frontmatter['excerpt']
      excerpt = frontmatter['excerpt'].to_s.strip
      if excerpt.empty?
        warnings << "#{relative_path}: 'excerpt' is empty"
      elsif excerpt.length < 50
        warnings << "#{relative_path}: 'excerpt' is very short (#{excerpt.length} chars), recommended at least 50"
      elsif excerpt.length > 300
        warnings << "#{relative_path}: 'excerpt' is very long (#{excerpt.length} chars), recommended max 300"
      end
    end

    # Title validation
    if frontmatter['title']
      title = frontmatter['title'].to_s.strip
      if title.empty?
        errors << "#{relative_path}: 'title' is empty"
      elsif title.length > 120
        warnings << "#{relative_path}: 'title' is very long (#{title.length} chars), recommended max 120 for SEO"
      end
    end

    # Technologies validation (should be an array if present)
    if frontmatter['technologies']
      unless frontmatter['technologies'].is_a?(Array)
        errors << "#{relative_path}: 'technologies' must be an array"
      end
    end

    # FAQ validation
    if frontmatter['faq']
      unless frontmatter['faq'].is_a?(Array)
        errors << "#{relative_path}: 'faq' must be an array"
      else
        frontmatter['faq'].each_with_index do |faq_item, idx|
          unless faq_item.is_a?(Hash) && faq_item['question'] && faq_item['answer']
            errors << "#{relative_path}: faq[#{idx}] must have 'question' and 'answer' keys"
          end
        end
      end
    end

    # Author validation
    if frontmatter['author']
      author = frontmatter['author'].to_s.strip
      if author.empty?
        warnings << "#{relative_path}: 'author' is empty"
      end
    end

    # Featured validation (should be boolean)
    if frontmatter.key?('featured')
      unless [true, false].include?(frontmatter['featured'])
        warnings << "#{relative_path}: 'featured' should be true or false"
      end
    end
  end
end

puts "✅ Validated #{posts_count} blog posts"

unless warnings.empty?
  puts "\n⚠️  Warnings (#{warnings.length}):"
  warnings.each { |w| puts "  - #{w}" }
end

if errors.empty?
  puts "\n✅ SUCCESS: No errors found in frontmatter!"
  exit 0
else
  puts "\n❌ ERRORS (#{errors.length}):"
  errors.each { |e| puts "  - #{e}" }
  exit 1
end
