# frozen_string_literal: true

# Generate one page per tag used in blog posts
# Output URLs: /blog/tags/:slug/

module Jekyll
  class TagsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # Collect all unique tags from published posts
      all_tags = Set.new

      site.posts.docs.each do |post|
        # Only process published posts (date <= current time)
        next if post.date > site.time

        if post.data['tags']
          post.data['tags'].each do |tag|
            all_tags.add(tag) if tag && !tag.to_s.strip.empty?
          end
        end
      end

      # Generate a page for each tag
      all_tags.each do |tag|
        slug = Utils.slugify(tag.to_s, mode: 'pretty')
        dest_dir = File.join('blog', 'tags', slug)

        page = PageWithoutAFile.new(site, site.source, dest_dir, 'index.html')
        page.data['layout'] = 'tag'
        page.data['title'] = "Tag: #{tag}"
        page.data['tag'] = tag
        page.data['description'] = generate_description(tag)
        page.data['permalink'] = "/blog/tags/#{slug}/"
        page.data['keywords'] = "#{tag}, tag #{tag}, articles #{tag}"

        site.pages << page
      end
    end

    private

    def generate_description(tag)
      # Generate a generic description for the tag
      "Découvrez tous les articles du blog liés au tag \"#{tag}\". " \
      "Retrouvez nos analyses, tutoriels et actualités sur ce sujet."
    end
  end
end
