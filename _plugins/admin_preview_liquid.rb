# Plugin pour ajouter des filtres Liquid pour le mode admin preview

module Jekyll
  module AdminPreviewFilters
    
    # Filtre pour vérifier si on est en mode admin preview
    def is_admin_preview(input)
      # Vérifier les paramètres de requête côté serveur si possible
      # En Jekyll statique, on utilise JavaScript côté client
      false
    end
    
    # Filtre pour inclure les futurs posts si admin
    def include_future_posts(posts, admin_mode = false)
      if admin_mode
        posts
      else
        posts.select { |post| post.date <= Time.now }
      end
    end
    
  end
end

Liquid::Template.register_filter(Jekyll::AdminPreviewFilters)

# Hook pour traiter la génération avec futurs posts
Jekyll::Hooks.register :site, :post_read do |site|
  # Forcer l'inclusion des futurs posts dans site.posts pour le rendu
  # même si future: false dans _config.yml
  if ENV['JEKYLL_ADMIN_PREVIEW'] == 'true'
    puts "🔮 Admin Preview: Inclusion des futurs posts"
    
    # Réordonner tous les posts (passés et futurs) par date
    all_posts = site.posts.docs.sort_by(&:date).reverse
    site.posts.docs.replace(all_posts)
  end
end