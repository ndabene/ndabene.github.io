# Configuration de la taxonomie optimisée du blog
# Ce fichier définit les règles de classification automatique

TAXONOMY_CONFIG = {
  # Définition des 4 catégories principales
  categories: {
    'Tutoriels' => {
      description: 'Contenu pratique et pédagogique : guides, tutoriels, how-to',
      keywords: ['tutoriel', 'guide', 'how-to', 'apprendre', 'débutant'],
      color: '#10b981', # vert
      icon: '📚'
    },

    'Analyses' => {
      description: 'Études, comparatifs, tendances et analyses de marché',
      keywords: ['analyse', 'comparatif', 'tendance', 'étude', 'marché', 'intelligence artificielle'],
      color: '#3b82f6', # bleu
      icon: '🔍'
    },

    'Techniques' => {
      description: 'Contenu technique : code, architecture, bonnes pratiques',
      keywords: ['technique', 'code', 'architecture', 'performance', 'sécurité', 'debug'],
      color: '#8b5cf6', # violet
      icon: '⚙️'
    },

    'Case Studies' => {
      description: 'Études de cas, success stories et entrepreneurship',
      keywords: ['case study', 'success story', 'entrepreneuriat', 'startup'],
      color: '#f59e0b', # orange
      icon: '💼'
    }
  },

  # Mapping automatique des anciennes catégories
  category_mapping: {
    # Vers Tutoriels
    'Tutoriel' => 'Tutoriels',

    # Vers Analyses
    'Intelligence Artificielle' => 'Analyses',
    'Ecommerce' => 'Analyses',
    'Analyse Marché' => 'Analyses',
    'Startups' => 'Analyses',
    'Innovation' => 'Analyses',
    'Europe' => 'Analyses',

    # Vers Techniques
    'PrestaShop' => 'Techniques',
    'Développement' => 'Techniques',
    'PHP' => 'Techniques',
    'Sécurité' => 'Techniques',
    'Architecture' => 'Techniques',
    'Performance' => 'Techniques',
    'Bonnes Pratiques' => 'Techniques',
    'Commerce' => 'Techniques',

    # Vers Case Studies
    'Success Story' => 'Case Studies',
    'Entrepreneuriat' => 'Case Studies',

    # Cas spéciaux
    'Automatisation' => 'Tutoriels',
    'Design' => 'Techniques'
  },

  # Règles de difficulté
  difficulty_rules: {
    keywords: {
      'débutant' => 'Débutant',
      'intermédiaire' => 'Intermédiaire',
      'avancé' => 'Avancé',
      'expert' => 'Expert'
    },

    # Règles automatiques basées sur le contenu
    content_rules: {
      'Débutant' => {
        max_tech_words: 3,
        has_code: false,
        has_advanced_concepts: false
      },
      'Intermédiaire' => {
        max_tech_words: 8,
        has_code: true,
        has_advanced_concepts: false
      },
      'Avancé' => {
        min_tech_words: 5,
        has_code: true,
        has_advanced_concepts: true
      }
    }
  },

  # Séries d'articles définies
  series: {
    'MCP Protocol Complet' => {
      total_episodes: 6,
      episodes: {
        1 => { title: 'Introduction au MCP', pattern: /introduction|guide|protocole/i },
        2 => { title: 'Setup TypeScript', pattern: /setup|typescript/i },
        3 => { title: 'Premier outil', pattern: /outil|readfile/i },
        4 => { title: 'Menu et découverte', pattern: /menu|découverte/i },
        5 => { title: 'Sécurisation', pattern: /sécur/i },
        6 => { title: 'Intégration Claude Desktop', pattern: /claude|desktop|integration/i }
      }
    },

    'PrestaShop Architecture' => {
      total_episodes: 4,
      episodes: {
        1 => { title: 'API Admin', pattern: /admin.*api/i },
        2 => { title: 'Command Bus', pattern: /command.*bus/i },
        3 => { title: 'Doctrine & DB', pattern: /doctrine/i },
        4 => { title: 'Lazy Loading', pattern: /lazy.*load/i }
      }
    },

    'IA E-commerce' => {
      total_episodes: 3,
      episodes: {
        1 => { title: 'GEO Suite', pattern: /geo.*suite/i },
        2 => { title: 'Google Shopping IA', pattern: /google.*shopping/i },
        3 => { title: 'Comparatifs plateformes', pattern: /shopify|comparatif/i }
      }
    }
  },

  # Préfixes de tags standardisés
  tag_prefixes: {
    'prestashop' => 'prestashop-',
    'ia' => 'ia-',
    'dev' => 'dev-',
    'security' => 'security-',
    'ecommerce' => 'ecommerce-'
  },

  # Mots-clés techniques pour la détection automatique
  tech_keywords: [
    'api', 'sql', 'docker', 'kubernetes', 'aws', 'git', 'terminal', 'cli',
    'algorithme', 'architecture', 'framework', 'library', 'protocole',
    'database', 'orm', 'migration', 'symfony', 'laravel', 'react', 'vue',
    'typescript', 'javascript', 'php', 'python', 'java', 'c++',
    'json', 'xml', 'rest', 'graphql', 'oauth', 'jwt', 'security',
    'performance', 'optimization', 'cache', 'lazy loading', 'async'
  ]
}

# Fonction utilitaire pour obtenir la configuration d'une catégorie
def get_category_config(category_name)
  TAXONOMY_CONFIG[:categories][category_name]
end

# Fonction pour déterminer la catégorie principale basée sur les anciennes catégories
def map_category(old_categories)
  return 'Tutoriels' unless old_categories.is_a?(Array) && old_categories.any?

  # Prendre la première catégorie mappée
  old_categories.each do |old_cat|
    mapped = TAXONOMY_CONFIG[:category_mapping][old_cat]
    return mapped if mapped
  end

  # Défaut
  'Analyses'
end

# Fonction pour valider une taxonomie
def validate_taxonomy
  puts "🔍 Validation de la taxonomie..."

  # Vérifier que tous les mappings existent
  all_old_categories = TAXONOMY_CONFIG[:category_mapping].keys
  all_new_categories = TAXONOMY_CONFIG[:categories].keys

  TAXONOMY_CONFIG[:category_mapping].values.each do |new_cat|
    unless all_new_categories.include?(new_cat)
      puts "❌ Catégorie inconnue dans le mapping: #{new_cat}"
    end
  end

  puts "✅ Taxonomie validée"
end

# Exécuter la validation si appelé directement
validate_taxonomy if __FILE__ == $0
