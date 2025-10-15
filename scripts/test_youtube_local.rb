#!/usr/bin/env ruby
# Script de test local pour la récupération YouTube
# Usage: ruby scripts/test_youtube_local.rb

require 'net/http'
require 'json'
require 'uri'

def test_youtube_api
  api_key = ENV['YOUTUBE_API_KEY']

  if api_key.nil? || api_key.empty?
    puts "❌ ERREUR: Variable d'environnement YOUTUBE_API_KEY non définie"
    puts ""
    puts "Pour tester en local, définissez votre clé API :"
    puts "export YOUTUBE_API_KEY=votre_clé_api_ici"
    puts "ruby scripts/test_youtube_local.rb"
    puts ""
    puts "Ou obtenez une clé API sur : https://console.developers.google.com/"
    return false
  end

  puts "🔑 Clé API trouvée ✓"
  puts "🔍 Test de l'API YouTube..."

  # Test avec la chaîne principale
  channel_id = 'UCUVY-O2kPvU3mibvP3xdM7A'

  begin
    # Construire l'URL de test
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
      'key' => api_key,
      'channelId' => channel_id,
      'part' => 'snippet',
      'order' => 'date',
      'type' => 'video',
      'maxResults' => '5'  # Juste 5 vidéos pour le test
    }

    uri = URI(url)
    uri.query = URI.encode_www_form(params)

    puts "📡 Requête vers: #{uri}"

    # Faire la requête
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.open_timeout = 10
    http.read_timeout = 10

    request = Net::HTTP::Get.new(uri)
    response = http.request(request)

    puts "📊 Code de réponse: #{response.code}"

    if response.code == '200'
      data = JSON.parse(response.body)

      puts "✅ API YouTube accessible ✓"
      puts "📹 Nombre de vidéos trouvées: #{data['items']&.size || 0}"

      if data['items'] && data['items'].size > 0
        puts ""
        puts "🎬 Dernières vidéos de la chaîne:"
        data['items'].first(3).each do |item|
          snippet = item['snippet']
          video_id = item['id']['videoId']
          puts "  • #{snippet['title']} (#{video_id})"
        end

        puts ""
        puts "🎉 Test réussi ! Le script principal devrait fonctionner."
        puts "Lancez maintenant: ruby scripts/fetch_youtube_videos.rb"
      else
        puts "⚠️  Aucune vidéo trouvée sur cette chaîne"
        puts "Vérifiez que l'ID de chaîne est correct: #{channel_id}"
      end

      return true
    else
      puts "❌ ERREUR API: #{response.code}"
      puts "Réponse: #{response.body}"
      return false
    end

  rescue Net::OpenTimeout, Net::ReadTimeout
    puts "❌ ERREUR: Timeout - Vérifiez votre connexion internet"
    return false
  rescue JSON::ParserError
    puts "❌ ERREUR: Réponse JSON invalide"
    return false
  rescue => e
    puts "❌ ERREUR inattendue: #{e.message}"
    return false
  end
end

def show_usage
  puts "=== Test YouTube API Local ==="
  puts ""
  puts "Ce script teste la connexion à l'API YouTube avec votre clé API."
  puts ""
  puts "Étapes pour tester:"
  puts "1. Obtenez une clé API YouTube sur https://console.developers.google.com/"
  puts "2. Définissez la variable d'environnement:"
  puts "   export YOUTUBE_API_KEY=votre_clé_api"
  puts "3. Lancez ce script:"
  puts "   ruby scripts/test_youtube_local.rb"
  puts ""
  puts "Une fois le test réussi, vous pourrez lancer le script principal:"
  puts "   ruby scripts/fetch_youtube_videos.rb"
  puts ""
end

# Point d'entrée
if __FILE__ == $0
  if ARGV.include?('--help') || ARGV.include?('-h')
    show_usage
    exit 0
  end

  puts "=== Test YouTube API Local ==="
  puts ""

  success = test_youtube_api

  puts ""
  if success
    puts "✅ Configuration valide - Prêt pour la récupération des vidéos !"
    exit 0
  else
    puts "❌ Configuration invalide - Vérifiez les étapes ci-dessus"
    exit 1
  end
end
