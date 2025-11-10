#!/usr/bin/env python3
"""
Script d'harmonisation automatique des tags du blog
Corrige les doublons et variations selon le rapport d'optimisation
"""

import os
import re
import yaml
from collections import defaultdict
from pathlib import Path

# Mapping de remplacement des tags (selon docs/migration-tags/RAPPORT_HARMONISATION_TAGS.md)
TAG_REPLACEMENTS = {
    # IA/AI - CRITIQUE
    "AI": "IA",
    "Intelligence Artificielle": "IA",
    "AI integration": "intégration IA",
    "IA integration": "intégration IA",

    # E-commerce
    "ecommerce": "e-commerce",

    # Automatisation
    "automation": "automatisation",
    "Automatisation": "automatisation",
    "design automation": "automatisation design",

    # Développement
    "Développement": "développement",
    "cloud development": "développement cloud",

    # Noms propres - casse correcte
    "prestashop": "PrestaShop",
    "symfony": "Symfony",

    # Simplifications
    "Gemini AI": "Gemini",
    "Copilot": "GitHub Copilot",
    "Agents": "agents IA",

    # Casse minuscule
    "No-code": "no-code",
    "Startup": "startup",
    "Prompt Engineering": "prompt engineering",
    "Module": "modules",

    # Protocol
    "protocol": "protocols",

    # Traductions
    "code quality": "qualité du code",
}

class TagHarmonizer:
    def __init__(self, posts_dir="_posts", dry_run=True):
        self.posts_dir = posts_dir
        self.dry_run = dry_run
        self.changes = defaultdict(list)  # fichier -> [changements]
        self.stats = {
            'files_scanned': 0,
            'files_modified': 0,
            'tags_replaced': 0,
        }

    def extract_front_matter(self, content):
        """Extrait le front matter YAML et le contenu du fichier"""
        match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)$', content, re.DOTALL)
        if not match:
            return None, None, content

        front_matter_str = match.group(1)
        body = match.group(2)

        try:
            front_matter = yaml.safe_load(front_matter_str)
            return front_matter, front_matter_str, body
        except yaml.YAMLError as e:
            print(f"⚠️  Erreur YAML : {e}")
            return None, None, content

    def harmonize_tags(self, tags):
        """Harmonise une liste de tags selon le mapping"""
        if not tags:
            return tags, []

        if isinstance(tags, str):
            tags = [t.strip() for t in tags.split(',')]

        harmonized = []
        changes = []

        for tag in tags:
            tag = tag.strip()
            if tag in TAG_REPLACEMENTS:
                new_tag = TAG_REPLACEMENTS[tag]
                harmonized.append(new_tag)
                changes.append(f"'{tag}' → '{new_tag}'")
                self.stats['tags_replaced'] += 1
            else:
                harmonized.append(tag)

        return harmonized, changes

    def process_file(self, filepath):
        """Traite un fichier markdown"""
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        front_matter, front_matter_str, body = self.extract_front_matter(content)

        if not front_matter:
            return False

        # Harmoniser les tags
        original_tags = front_matter.get('tags', [])
        harmonized_tags, changes = self.harmonize_tags(original_tags)

        if not changes:
            return False  # Aucun changement nécessaire

        # Mettre à jour le front matter
        front_matter['tags'] = harmonized_tags

        # Reconstruire le fichier
        new_front_matter = yaml.dump(front_matter, allow_unicode=True, sort_keys=False)
        new_content = f"---\n{new_front_matter}---\n{body}"

        # Sauvegarder (sauf si dry_run)
        if not self.dry_run:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

        # Enregistrer les changements
        filename = os.path.basename(filepath)
        self.changes[filename].extend(changes)
        self.stats['files_modified'] += 1

        return True

    def process_all(self):
        """Traite tous les fichiers markdown dans _posts"""
        posts_path = Path(self.posts_dir)

        if not posts_path.exists():
            print(f"❌ Erreur : Le répertoire {self.posts_dir} n'existe pas")
            return

        print(f"🔍 Scan du répertoire : {self.posts_dir}")
        print(f"📝 Mode : {'DRY RUN (simulation)' if self.dry_run else 'PRODUCTION (modification réelle)'}")
        print()

        # Trouver tous les fichiers .md
        md_files = list(posts_path.rglob("*.md"))

        for filepath in sorted(md_files):
            self.stats['files_scanned'] += 1
            self.process_file(filepath)

        self.print_report()

    def print_report(self):
        """Affiche le rapport de modifications"""
        print("=" * 80)
        print("📊 RAPPORT D'HARMONISATION DES TAGS")
        print("=" * 80)
        print()
        print(f"📁 Fichiers scannés : {self.stats['files_scanned']}")
        print(f"✏️  Fichiers modifiés : {self.stats['files_modified']}")
        print(f"🏷️  Tags remplacés : {self.stats['tags_replaced']}")
        print()

        if self.changes:
            print("=" * 80)
            print("DÉTAIL DES MODIFICATIONS")
            print("=" * 80)
            print()

            for filename, changes in sorted(self.changes.items()):
                print(f"📄 {filename}")
                for change in changes:
                    print(f"   • {change}")
                print()
        else:
            print("✅ Aucune modification nécessaire - tous les tags sont déjà harmonisés !")

        if self.dry_run:
            print("=" * 80)
            print("⚠️  MODE DRY RUN - Aucune modification réelle effectuée")
            print("Pour appliquer les changements, relancez avec : --apply")
            print("=" * 80)
        else:
            print("=" * 80)
            print("✅ MODIFICATIONS APPLIQUÉES AVEC SUCCÈS")
            print("=" * 80)
            print()
            print("Prochaines étapes :")
            print("1. Vérifiez les modifications : git diff")
            print("2. Testez votre site : bundle exec jekyll serve")
            print("3. Committez : git add . && git commit -m 'Harmonisation des tags'")
            print("4. Pushez : git push")

def main():
    import argparse

    parser = argparse.ArgumentParser(
        description='Harmonise automatiquement les tags des articles du blog'
    )
    parser.add_argument(
        '--apply',
        action='store_true',
        help='Applique réellement les modifications (par défaut : simulation)'
    )
    parser.add_argument(
        '--posts-dir',
        default='_posts',
        help='Répertoire des posts (défaut : _posts)'
    )

    args = parser.parse_args()

    # Créer l'harmonizer
    harmonizer = TagHarmonizer(
        posts_dir=args.posts_dir,
        dry_run=not args.apply
    )

    # Traiter tous les fichiers
    harmonizer.process_all()

if __name__ == '__main__':
    main()
