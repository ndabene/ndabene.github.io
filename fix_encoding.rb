
require 'find'

def fix_encoding(dir)
  Find.find(dir) do |path|
    next unless File.file?(path)
    next if path.include?('.git') || path.include?('_site') || path.include?('node_modules') || path.include?('vendor')
    
    begin
      content = File.read(path, mode: 'rb')
      
      # Remove BOM if present
      if content.start_with?("\xEF\xBB\xBF".force_encoding("ASCII-8BIT"))
        content = content[3..-1]
        puts "Removed BOM from #{path}"
      end
      
      # Force encoding to UTF-8 and scrub invalid bytes
      content.force_encoding('UTF-8')
      unless content.valid_encoding?
        content = content.scrub
        puts "Fixed invalid UTF-8 in #{path}"
      end
      
      File.write(path, content)
    rescue => e
      puts "Error processing #{path}: #{e.message}"
    end
  end
end

puts " fixing _includes..."
fix_encoding('_includes')
puts " fixing _posts..."
fix_encoding('_posts')
puts " fixing _posts_en..."
fix_encoding('_posts_en')
