# Plugin Jekyll pour génération automatique du sitemap
# Se déclenche à chaque build Jekyll

Jekyll::Hooks.register :site, :post_write do |site|
  # Génère un fichier de dernière mise à jour pour le sitemap
  sitemap_lastmod_file = File.join(site.dest, "sitemap-lastmod.txt")
  
  File.open(sitemap_lastmod_file, 'w') do |file|
    file.write(Time.now.strftime("%Y-%m-%d %H:%M:%S"))
  end
  
  # Log pour debug
  Jekyll.logger.info "Sitemap:", "Sitemap généré avec succès - #{Time.now}"
end

# Hook pour articles de blog spécifiquement
Jekyll::Hooks.register :posts, :post_write do |post|
  Jekyll.logger.info "Sitemap:", "Nouvel article détecté: #{post.data['title']}"
end

# Hook pour projets
Jekyll::Hooks.register :projects, :post_write do |project|
  Jekyll.logger.info "Sitemap:", "Nouveau projet détecté: #{project.data['title']}"
end