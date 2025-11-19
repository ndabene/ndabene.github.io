#!/usr/bin/env python3
import os
import re
import yaml
from collections import Counter

posts_dir = "./_posts"

articles = []

# Parcourir tous les fichiers markdown
for root, dirs, files in os.walk(posts_dir):
    for file in files:
        if file.endswith('.md'):
            filepath = os.path.join(root, file)

            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

                # Extraire le front matter YAML
                match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
                if match:
                    try:
                        front_matter = yaml.safe_load(match.group(1))
                        if front_matter:
                            articles.append({
                                'file': file,
                                'title': front_matter.get('title', ''),
                                'description': front_matter.get('description', ''),
                                'tags': front_matter.get('tags', [])
                            })
                    except yaml.YAMLError:
                        pass

# Afficher les articles avec leurs tags
print(f"=== ANALYSE THÉMATIQUE DES ARTICLES ===\n")
print(f"Total: {len(articles)} articles\n")

# Grouper par thématique principale (basé sur les tags)
themes = {
    'PrestaShop/E-commerce': [],
    'IA/ChatGPT/MCP': [],
    'Développement/Sécurité': [],
    'SEO/Marketing': [],
    'Autre': []
}

for article in articles:
    tags = [t.lower() if isinstance(t, str) else str(t) for t in article['tags']]

    if any(t in ['prestashop', 'e-commerce', 'modules', 'shopify', 'woocommerce'] for t in tags):
        themes['PrestaShop/E-commerce'].append(article)
    elif any(t in ['ia', 'chatgpt', 'mcp', 'claude', 'gemini', 'openai', 'github copilot', 'ia générative'] for t in tags):
        themes['IA/ChatGPT/MCP'].append(article)
    elif any(t in ['développement', 'sécurité', 'typescript', 'api', 'architecture'] for t in tags):
        themes['Développement/Sécurité'].append(article)
    elif any(t in ['seo', 'geo', 'marketing digital', 'google shopping'] for t in tags):
        themes['SEO/Marketing'].append(article)
    else:
        themes['Autre'].append(article)

# Afficher les thématiques
for theme, articles_list in themes.items():
    print(f"\n{'='*60}")
    print(f"THÉMATIQUE: {theme} ({len(articles_list)} articles)")
    print(f"{'='*60}\n")

    for article in articles_list[:10]:  # Limiter à 10 articles par thème pour la lisibilité
        print(f"📄 {article['title']}")
        print(f"   Tags: {', '.join(article['tags'][:8])}")  # Limiter à 8 tags
        print()
