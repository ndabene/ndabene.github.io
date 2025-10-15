#!/usr/bin/env ruby
# Script pour récupérer automatiquement les vidéos YouTube
# Utilise l'API YouTube Data v3

require 'net/http'
require 'json'
require 'yaml'
require 'date'
require 'uri'

class YouTubeFetcher
  def initialize
    # Configuration des chaînes YouTube
    @channels = {
      'UCUVY-O2kPvU3mibvP3xdM7A' => 'ndabene06',  # Chaîne principale
      # Ajouter d'autres chaînes si nécessaire
    }

    # Clé API YouTube (à définir dans les variables d'environnement)
    @api_key = ENV['YOUTUBE_API_KEY']

    if @api_key.nil? || @api_key.empty?
      puts "Erreur: YOUTUBE_API_KEY non défini dans les variables d'environnement"
      puts "Obtenez une clé API sur: https://console.developers.google.com/"
      exit 1
    end

    @data_file = '_data/youtube_videos.yml'
  end

  def fetch_all_channels
    all_videos = []

    @channels.each do |channel_id, channel_name|
      puts "Récupération des vidéos pour la chaîne #{channel_name}..."
      videos = fetch_channel_videos(channel_id, channel_name)
      all_videos.concat(videos)
    end

    # Trier par date de publication (plus récent en premier)
    all_videos.sort_by! { |video| DateTime.parse(video['published_at']) }.reverse!

    save_videos(all_videos)
    puts "Mise à jour terminée: #{all_videos.size} vidéos récupérées"
  end

  def fetch_channel_videos(channel_id, channel_name)
    videos = []
    next_page_token = nil

    loop do
      url = build_search_url(channel_id, next_page_token)

      begin
        response = make_request(url)
        data = JSON.parse(response)

        data['items'].each do |item|
          video = extract_video_info(item, channel_name)
          videos << video if video
        end

        next_page_token = data['nextPageToken']
        break if next_page_token.nil? || videos.size >= 50 # Limiter à 50 vidéos par chaîne

      rescue => e
        puts "Erreur lors de la récupération: #{e.message}"
        break
      end
    end

    videos
  end

  def build_search_url(channel_id, page_token = nil)
    base_url = "https://www.googleapis.com/youtube/v3/search"
    params = {
      'key' => @api_key,
      'channelId' => channel_id,
      'part' => 'snippet',
      'order' => 'date',
      'type' => 'video',
      'maxResults' => '50'
    }
    params['pageToken'] = page_token if page_token

    uri = URI(base_url)
    uri.query = URI.encode_www_form(params)
    uri.to_s
  end

  def extract_video_info(item, channel_name)
    snippet = item['snippet']

    # Récupérer les détails supplémentaires de la vidéo
    video_id = item['id']['videoId']
    video_details = fetch_video_details(video_id)

    {
      'title' => snippet['title'],
      'video_id' => video_id,
      'url' => "https://www.youtube.com/watch?v=#{video_id}",
      'thumbnail' => "https://i.ytimg.com/vi/#{video_id}/hqdefault.jpg",
      'description' => snippet['description'],
      'published_at' => snippet['publishedAt'],
      'channel' => channel_name,
      'duration' => video_details['duration'],
      'category' => categorize_video(snippet['title'], snippet['description'])
    }
  rescue => e
    puts "Erreur lors de l'extraction des infos vidéo: #{e.message}"
    nil
  end

  def fetch_video_details(video_id)
    url = "https://www.googleapis.com/youtube/v3/videos"
    params = {
      'key' => @api_key,
      'id' => video_id,
      'part' => 'contentDetails'
    }

    uri = URI(url)
    uri.query = URI.encode_www_form(params)

    response = make_request(uri.to_s)
    data = JSON.parse(response)

    if data['items'] && data['items'].first
      data['items'].first['contentDetails']
    else
      {}
    end
  rescue => e
    puts "Erreur lors de la récupération des détails vidéo: #{e.message}"
    {}
  end

  def categorize_video(title, description)
    content = "#{title} #{description}".downcase

    if content.include?('prestashop') || content.include?('e-commerce') || content.include?('boutique')
      'PrestaShop & E-commerce'
    elsif content.include?('php') || content.include?('symfony') || content.include?('laravel')
      'PHP & Frameworks'
    elsif content.include?('ai') || content.include?('intelligence artificielle') || content.include?('machine learning')
      'IA & Automatisation'
    elsif content.include?('javascript') || content.include?('vue') || content.include?('react') || content.include?('frontend')
      'Frontend & JavaScript'
    elsif content.include?('docker') || content.include?('devops') || content.include?('déploiement')
      'DevOps & Infrastructure'
    else
      'Technique'
    end
  end

  def make_request(url)
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(uri)
    response = http.request(request)

    if response.code != '200'
      raise "Erreur API: #{response.code} - #{response.body}"
    end

    response.body
  end

  def save_videos(videos)
    # Charger les vidéos existantes pour éviter les doublons
    existing_videos = load_existing_videos
    existing_ids = existing_videos.map { |v| v['video_id'] }

    # Filtrer les nouvelles vidéos
    new_videos = videos.reject { |video| existing_ids.include?(video['video_id']) }

    # Combiner et sauvegarder
    all_videos = existing_videos + new_videos

    File.write(@data_file, all_videos.to_yaml)
    puts "#{new_videos.size} nouvelles vidéos ajoutées"
  end

  def load_existing_videos
    if File.exist?(@data_file)
      YAML.load_file(@data_file) || []
    else
      []
    end
  rescue => e
    puts "Erreur lors du chargement des vidéos existantes: #{e.message}"
    []
  end
end

# Point d'entrée du script
if __FILE__ == $0
  puts "=== YouTube Video Fetcher ==="
  puts "Début de la récupération des vidéos..."

  fetcher = YouTubeFetcher.new
  fetcher.fetch_all_channels

  puts "Terminé!"
end
