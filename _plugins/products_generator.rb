# frozen_string_literal: true

# Generate one detail page per product defined in _data/produits.yml
# Output URLs: /boutique/:slug/

module Jekyll
  class ProductsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      data = site.data['produits']
      return if !data || !data.is_a?(Array) || data.empty?

      data.each do |product|
        name = product['nom']
        next unless name && !name.to_s.strip.empty?

        # Skip inactive products
        active = product['active'] || product['actif'] || product['enabled']
        status = product['status']
        next if active == false || status == 'inactive'

        slug = Utils.slugify(name.to_s, mode: 'pretty')
        dest_dir = File.join('boutique', slug)

        page = PageWithoutAFile.new(site, site.source, dest_dir, 'index.html')
        page.data['layout'] = 'product'
        page.data['title'] = name
        page.data['product'] = product
        page.data['permalink'] = "/boutique/#{slug}/"
        # GEO meta for product pages
        page.data['ai_intent'] = 'view_and_purchase_training'
        page.data['ai_primary_action'] = 'buy_training'
        page.data['ai_topics'] = [product['univers'], product['categorie'], product['format']].compact

        site.pages << page
      end
    end
  end
end


