#!/usr/bin/env python3
"""
Script pour mettre à jour automatiquement les catégories et sous-catégories
dans le frontmatter de tous les articles du blog.
"""

import os
import re
import yaml
from pathlib import Path
from typing import Dict, Tuple, List, Optional

# Mapping des catégories et sous-catégories
CATEGORY_MAPPING = {
    # Intelligence Artificielle
    'intelligence-artificielle': {
        'fondamentaux-ia': {
            'tags': ['IA', 'AI', 'LLM', 'Intelligence Artificielle', 'agents', 'agents IA', 'agent IA', 'Artificial intelligence'],
            'keywords': ['LLM', 'agents autonomes', 'modèle de langage']
        },
        'developpement-assiste': {
            'tags': ['prompt engineering', 'PDD', 'BMAD', 'Vibe Coding', 'Vibecoding', 'Vibe-coding', 'Prompt Driven Development', 'développement-assisté'],
            'keywords': ['prompt', 'vibe coding', 'PDD', 'développement assisté', 'prompt driven']
        },
        'outils-plateformes': {
            'tags': ['ChatGPT', 'Claude', 'Gemini', 'Mistral', 'Deepseek', 'Anthropic', 'NotebookLM', 'Perplexity', 'GPT-4', 'GPT-5', 'Claude-4', 'Gemini-3', 'Grok'],
            'keywords': ['ChatGPT', 'Claude', 'Gemini', 'Mistral', 'DeepSeek', 'Anthropic', 'Grok', 'NotebookLM']
        },
        'ia-ecommerce': {
            'tags': ['MCP'],
            'keywords': ['MCP PrestaShop', 'IA PrestaShop', 'agent PrestaShop', 'automatisation PrestaShop', 'Cline PrestaShop'],
            'combined_tags': [['MCP', 'PrestaShop'], ['IA', 'PrestaShop'], ['automatisation', 'PrestaShop']]
        },
        'strategie-ia': {
            'tags': ['ia-emploi', 'future of work', 'avenir-travail', 'competences-2025', 'adaptation-professionnelle'],
            'keywords': ['futur IA', 'avenir IA', 'stratégie IA', 'tendances IA', 'IA emploi', 'industrialisation IA'],
            'combined_tags': [['IA', 'Stratégie'], ['IA', 'future'], ['IA', 'transformation']]
        },
        'securite-ia': {
            'tags': ['prompt leak', 'pig butchering', 'deepfakes'],
            'keywords': ['sécurité IA', 'prompt leak', 'données personnelles IA', 'AI Act', 'conversations exposées'],
            'combined_tags': [['IA', 'sécurité'], ['IA', 'RGPD'], ['IA', 'data-breach']]
        }
    },

    # PrestaShop & E-commerce
    'prestashop-ecommerce': {
        'fondamentaux-prestashop': {
            'tags': ['prestashop-8', 'prestashop-9', 'community', 'communauté'],
            'keywords': ['histoire PrestaShop', 'projet étudiant', 'écosystème PrestaShop', 'leader européen']
        },
        'developpement-prestashop': {
            'tags': ['modules-prestashop', 'modules', 'addons', 'hooks', 'advanced pack', 'Command Bus'],
            'keywords': ['module PrestaShop', 'développement PrestaShop', 'hooks PrestaShop', 'API PrestaShop', 'Command Bus'],
            'combined_tags': [['PrestaShop', 'développement'], ['PrestaShop', 'modules'], ['PrestaShop', 'API'], ['PrestaShop', 'Symfony']]
        },
        'securite-prestashop': {
            'keywords': ['sécurité PrestaShop', 'nettoyage PrestaShop', 'bloquée'],
            'combined_tags': [['PrestaShop', 'sécurité'], ['PrestaShop', 'RGPD'], ['PrestaShop', 'NIS2']]
        },
        'strategie-ecommerce': {
            'tags': ['e-commerce', 'Ecommerce', 'stratégie-ecommerce', 'strategie-ecommerce', 'marketplace', 'headless commerce', 'agentic commerce'],
            'keywords': ['stratégie e-commerce', 'Black Friday', 'SEO e-commerce', 'growth hacking', 'Google Shopping', 'Cyber Monday'],
            'combined_tags': [['e-commerce', 'Stratégie'], ['PrestaShop', 'Stratégie'], ['e-commerce', 'SEO']]
        },
        'alternatives': {
            'tags': ['Sylius', 'Shopify', 'vendor-lock-in', 'saas-vs-opensource'],
            'keywords': ['PrestaShop vs', 'Shopify', 'Sylius', 'comparaison', 'Enterprise vs Plus'],
            'combined_tags': [['PrestaShop', 'Shopify'], ['PrestaShop', 'Sylius']]
        }
    },

    # Développement Web
    'developpement-web': {
        'langages-frameworks': {
            'tags': ['PHP', 'php', 'PHP 8', 'PHP 8.5', 'Symfony', 'JavaScript', 'TypeScript'],
            'keywords': ['PHP', 'Symfony', 'histoire PHP', 'langage PHP']
        },
        'architecture-design': {
            'tags': ['architecture', 'SOLID', 'design patterns', 'architecture logicielle', 'architecture-logicielle', 'Doctrine'],
            'keywords': ['architecture', 'SOLID', 'patterns', 'design']
        },
        'qualite-bonnes-pratiques': {
            'tags': ['clean-code', 'best practices', 'bonnes-pratiques', 'tests', 'documentation', 'code'],
            'keywords': ['clean code', 'bonnes pratiques', 'qualité code', 'best practices']
        },
        'api-integration': {
            'tags': ['API'],
            'keywords': ['API', 'intégration', 'RESTful']
        },
        'performance-optimisation': {
            'tags': ['performance', 'performance-web'],
            'keywords': ['performance', 'optimisation', 'lazy loading']
        },
        'devops-deploiement': {
            'tags': ['GitHub Pages', 'Jekyll'],
            'keywords': ['GitHub Pages', 'Jekyll', 'déploiement', 'portfolio']
        }
    },

    # Automatisation
    'automatisation': {
        'mcp-protocol': {
            'tags': ['MCP', 'Model Context Protocol', 'MCP-protocol'],
            'keywords': ['MCP', 'Model Context Protocol', 'protocole MCP']
        },
        'outils-automatisation': {
            'tags': ['n8n', 'automatisation', 'automation', 'Automatisation E-commerce'],
            'keywords': ['n8n', 'automatisation', 'workflow', 'automation']
        },
        'cas-usage': {
            'keywords': ['automatiser', 'cas d\'usage']
        }
    },

    # Sécurité
    'securite': {
        'menaces-vulnerabilites': {
            'tags': ['ransomware', 'data-breach', 'infostealers', 'cyberattaque', 'fraud detection'],
            'keywords': ['ransomware', 'data breach', 'cyberattaque', 'menace', 'infostealers']
        },
        'compliance-regulation': {
            'tags': ['RGPD', 'NIS2', 'CNIL', 'AI Act', 'compliance'],
            'keywords': ['RGPD', 'NIS2', 'AI Act', 'conformité', 'règlement']
        },
        'bonnes-pratiques-securite': {
            'tags': ['sécurité', 'securite', 'cybersécurité'],
            'keywords': ['bonnes pratiques sécurité', 'contrôles', 'contrôles parentaux']
        }
    },

    # Stratégie & Marché
    'strategie-marche': {
        'strategie-metier': {
            'tags': ['Stratégie', 'business', 'Business', 'transformation', 'transformation-digitale', 'business-intelligence', 'strategie', 'strategie-digitale'],
            'keywords': ['stratégie', 'business model', 'transformation', 'business intelligence']
        },
        'analyse-marche': {
            'tags': ['geopolitics', 'innovation'],
            'keywords': ['analyse marché', 'tendances', 'industrie', 'géopolitique', 'semiconductors']
        },
        'carriere-competences': {
            'tags': ['Carrière', 'Entrepreneuriat', 'soft skills'],
            'keywords': ['carrière', 'compétences', 'développeur futur', 'entrepreneur']
        },
        'impact-industrie': {
            'tags': ['future'],
            'keywords': ['avenir', 'futur', 'impact', 'orchestrateurs']
        }
    },

    # SEO & Marketing
    'seo-marketing': {
        'seo-technique': {
            'tags': ['SEO', 'voice engine optimization'],
            'keywords': ['SEO', 'référencement', 'Google Shopping', 'voice engine']
        },
        'outils-strategies-seo': {
            'keywords': ['stratégie SEO', 'Google Ads', 'Google Slides']
        }
    },

    # Tutoriels
    'tutoriels': {
        'configuration': {
            'tags': ['configuration', 'setup', 'installation'],
            'keywords': ['configurer', 'installer', 'setup']
        },
        'guides-pratiques': {
            'tags': ['guide', 'tutoriel', 'how-to'],
            'keywords': ['guide', 'comment', 'tutoriel']
        },
        'resolution-problemes': {
            'tags': ['troubleshooting', 'debug', 'legacy-code', 'modernisation'],
            'keywords': ['résoudre', 'debug', 'erreur', 'bloquée', 'nettoyage']
        }
    },

    # Rétrospectives
    'retrospectives': {
        'retrospectives-annuelles': {
            'tags': ['rétrospective', '2025', '2026', 'bilan'],
            'keywords': ['rétrospective', 'bilan', 'année', 'back to school']
        },
        'analyses-approfondies': {
            'tags': ['analyse'],
            'keywords': ['analyse', 'étude', 'comparatif', 'évolution historique']
        }
    }
}


def normalize_string(s: str) -> str:
    """Normalise une chaîne pour la comparaison (minuscules, sans accents partiels)."""
    return s.lower().strip()


def find_category_and_subcategory(title: str, tags: List[str], excerpt: str = "") -> Tuple[Optional[str], Optional[str]]:
    """
    Détermine la catégorie et sous-catégorie d'un article.

    Args:
        title: Titre de l'article
        tags: Liste des tags de l'article
        excerpt: Extrait de l'article

    Returns:
        Tuple (category, subcategory) ou (None, None) si non trouvé
    """
    title_lower = normalize_string(title)
    tags_lower = [normalize_string(t) for t in tags]
    excerpt_lower = normalize_string(excerpt)

    # Score pour chaque combinaison catégorie/sous-catégorie
    scores = {}

    for category, subcategories in CATEGORY_MAPPING.items():
        for subcategory, criteria in subcategories.items():
            score = 0

            # Vérifier les mots-clés dans le titre (poids fort)
            if 'keywords' in criteria:
                for keyword in criteria['keywords']:
                    if normalize_string(keyword) in title_lower:
                        score += 10

            # Vérifier les tags (poids moyen)
            if 'tags' in criteria:
                for tag in criteria['tags']:
                    if normalize_string(tag) in tags_lower:
                        score += 5

            # Vérifier les combinaisons de tags (poids fort)
            if 'combined_tags' in criteria:
                for tag_combo in criteria['combined_tags']:
                    if all(normalize_string(t) in tags_lower for t in tag_combo):
                        score += 8

            # Vérifier les mots-clés dans l'excerpt (poids faible)
            if 'keywords' in criteria:
                for keyword in criteria['keywords']:
                    if normalize_string(keyword) in excerpt_lower:
                        score += 2

            if score > 0:
                scores[(category, subcategory)] = score

    # Retourner la combinaison avec le meilleur score
    if scores:
        best_match = max(scores.items(), key=lambda x: x[1])
        return best_match[0]

    return None, None


def extract_frontmatter(content: str) -> Tuple[Dict, str]:
    """Extrait le frontmatter YAML et le contenu d'un article."""
    if not content.startswith('---'):
        return {}, content

    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content

    try:
        frontmatter = yaml.safe_load(parts[1])
        body = parts[2]
        return frontmatter or {}, body
    except yaml.YAMLError:
        return {}, content


def build_frontmatter_string(frontmatter: Dict) -> str:
    """Reconstruit le frontmatter en string YAML."""
    # Ordre préféré des champs
    field_order = [
        'layout', 'title', 'date', 'ref', 'author',
        'category', 'subcategory', 'categories', 'tags',
        'excerpt', 'image', 'featured', 'difficulty', 'technologies',
        'estimated_reading_time', 'llm_summary', 'llm_topics', 'faq'
    ]

    ordered_fm = {}

    # Ajouter les champs dans l'ordre
    for field in field_order:
        if field in frontmatter:
            ordered_fm[field] = frontmatter[field]

    # Ajouter les champs restants
    for key, value in frontmatter.items():
        if key not in ordered_fm:
            ordered_fm[key] = value

    # Convertir en YAML
    yaml_str = yaml.dump(ordered_fm, allow_unicode=True, default_flow_style=False, sort_keys=False)
    return f"---\n{yaml_str}---\n"


def update_article(file_path: Path) -> bool:
    """Met à jour un article avec category et subcategory."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter, body = extract_frontmatter(content)

        if not frontmatter:
            print(f"⚠️  Pas de frontmatter dans {file_path.name}")
            return False

        # Extraire les informations
        title = frontmatter.get('title', '')
        tags = frontmatter.get('tags', [])
        excerpt = frontmatter.get('excerpt', '')

        # Trouver la catégorie et sous-catégorie
        category, subcategory = find_category_and_subcategory(title, tags, excerpt)

        if not category:
            print(f"❌ Aucune catégorie trouvée pour : {title}")
            return False

        # Mettre à jour le frontmatter
        frontmatter['category'] = category
        frontmatter['subcategory'] = subcategory

        # Reconstruire le fichier
        new_content = build_frontmatter_string(frontmatter) + body

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"✅ {file_path.name}: {category} → {subcategory}")
        return True

    except Exception as e:
        print(f"❌ Erreur lors du traitement de {file_path.name}: {e}")
        return False


def main():
    """Fonction principale."""
    posts_dir = Path('/home/user/ndabene.github.io/_posts')

    if not posts_dir.exists():
        print(f"❌ Le dossier {posts_dir} n'existe pas")
        return

    # Trouver tous les fichiers markdown
    md_files = list(posts_dir.rglob('*.md'))

    print(f"\n🔍 {len(md_files)} articles trouvés\n")

    success_count = 0
    fail_count = 0

    for md_file in sorted(md_files):
        if update_article(md_file):
            success_count += 1
        else:
            fail_count += 1

    print(f"\n📊 Résumé :")
    print(f"   ✅ Succès : {success_count}")
    print(f"   ❌ Échecs : {fail_count}")
    print(f"   📝 Total : {len(md_files)}\n")


if __name__ == '__main__':
    main()
