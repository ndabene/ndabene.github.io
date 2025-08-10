# frozen_string_literal: true

# Lightweight validators for other YAML data files

require 'yaml'

ROOT = File.expand_path('..', __dir__)

def read_yaml(path)
  YAML.safe_load(File.read(path), permitted_classes: [Date, Time], aliases: true)
rescue Psych::SyntaxError => e
  abort("YAML syntax error in #{path}: #{e.message}")
end

def file_exists_relative?(rel)
  File.exist?(File.join(ROOT, rel.to_s))
end

errors = []
warnings = []

# Validate navigation.yml
nav_path = File.join(ROOT, '_data', 'navigation.yml')
if File.exist?(nav_path)
  nav = read_yaml(nav_path)
  unless nav.is_a?(Array)
    errors << "navigation.yml must be an array"
  else
    nav.each_with_index do |item, i|
      unless item.is_a?(Hash)
        errors << "navigation.yml[#{i}] must be a mapping"
        next
      end
      errors << "navigation.yml[#{i}] missing 'name'" unless item['name'].is_a?(String)
      errors << "navigation.yml[#{i}] missing 'link'" unless item['link'].is_a?(String)
      if item['link'].is_a?(String) && !item['link'].start_with?('/')
        warnings << "navigation.yml[#{i}] link should start with '/'"
      end
    end
  end
else
  warnings << "navigation.yml not found"
end

# Validate modules.yml
modules_path = File.join(ROOT, '_data', 'modules.yml')
if File.exist?(modules_path)
  mods = read_yaml(modules_path)
  unless mods.is_a?(Array)
    errors << "modules.yml must be an array"
  else
    title_counts = Hash.new(0)
    mods.each { |m| title_counts[m['title']] += 1 if m.is_a?(Hash) }
    title_counts.each { |t, c| warnings << "modules.yml duplicate title '#{t}' (#{c})" if c > 1 }

    mods.each_with_index do |mod, i|
      unless mod.is_a?(Hash)
        errors << "modules.yml[#{i}] must be a mapping"
        next
      end
      %w[title description link image].each do |k|
        errors << "modules.yml[#{i}] missing '#{k}'" unless mod[k].is_a?(String)
      end
      if mod['link'].is_a?(String) && !(mod['link'] =~ %r{^https?://})
        errors << "modules.yml[#{i}] link must be http(s) URL"
      end
      if mod['image'].is_a?(String) && !file_exists_relative?(mod['image'])
        errors << "modules.yml[#{i}] image not found at '#{mod['image']}'"
      end

      if mod['tags']
        unless mod['tags'].is_a?(Array)
          warnings << "modules.yml[#{i}] 'tags' should be an array"
        else
          mod['tags'].each_with_index do |tag, j|
            next unless tag.is_a?(Hash)
            warnings << "modules.yml[#{i}].tags[#{j}] missing 'tech'" unless tag['tech'].is_a?(String)
            warnings << "modules.yml[#{i}].tags[#{j}] missing 'category'" unless tag['category'].is_a?(String)
          end
        end
      end
    end
  end
else
  warnings << "modules.yml not found"
end

puts 'Validated navigation.yml and modules.yml'
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


