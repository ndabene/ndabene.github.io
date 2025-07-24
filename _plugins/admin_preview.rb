# Plugin pour gérer la prévisualisation admin des futurs posts
# Permet de voir les articles futurs si on est admin

Jekyll::Hooks.register :site, :pre_render do |site|
  # Récupération de l'IP du visiteur (pour les environnements locaux)
  # En production, vous devrez adapter ce système selon votre serveur
  
  # Vérifier si nous sommes en mode preview admin
  if ENV['JEKYLL_ADMIN_PREVIEW'] == 'true' || 
     site.config['admin_preview'] == true
    
    # Modifier temporairement la configuration pour afficher les futurs posts
    site.config['future'] = true
    
    # Marquer les posts futurs comme preview admin
    site.posts.docs.each do |post|
      if post.date > site.time
        post.data['admin_preview'] = true
      end
    end
    
    puts "🔮 Mode Admin Preview activé - Futurs posts visibles"
  end
end

# Hook pour traiter les paramètres de requête
Jekyll::Hooks.register :pages, :pre_render do |page, liquid|
  # Vérifier si le paramètre admin_preview est présent dans l'URL
  # Ceci est géré côté client par JavaScript
end

# Générateur de page d'index des séries
class SeriesPageGenerator < Jekyll::Generator
  safe true
  priority :low

  def generate(site)
    # Créer une page d'index pour chaque série
    series_data = site.data['series'] || {}
    
    series_data.each do |series_name, series_info|
      # Récupérer tous les posts de cette série
      series_posts = site.posts.docs.select { |post| post.data['series'] == series_name }
      
      if series_posts.any?
        # Créer une page pour la série
        series_page = SeriesPage.new(site, site.source, series_name, series_info, series_posts)
        site.pages << series_page
      end
    end
  end
end

class SeriesPage < Jekyll::Page
  def initialize(site, base, series_name, series_info, posts)
    @site = site
    @base = base
    @dir = 'series'
    @name = "#{Jekyll::Utils.slugify(series_name)}.html"

    self.process(@name)
    self.read_yaml(File.join(base, '_layouts'), 'series.html') rescue self.data = {}

    self.data['title'] = "Série : #{series_name}"
    self.data['series_name'] = series_name
    self.data['series_info'] = series_info
    self.data['series_posts'] = posts.sort_by { |p| p.data['series_part'] || 1 }
    self.data['layout'] = 'series'
  end
end