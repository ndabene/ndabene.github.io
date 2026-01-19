#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script pour ajouter automatiquement les champs ref manquants aux paires d'articles FR/EN
Usage: python3 scripts/add_missing_refs.py [--dry-run]
"""

import os
import re
import sys
from pathlib import Path
from collections import defaultdict
import yaml
import unicodedata

class RefAdder:
    def __init__(self, dry_run=False):
        self.posts_fr_dir = Path('_posts')
        self.posts_en_dir = Path('_posts_en')
        self.fr_posts = []
        self.en_posts = []
        self.dry_run = dry_run
        self.changes = []

    def slugify(self, text):
        """Créer un slug à partir du texte"""
        # Normaliser les caractères unicode
        text = unicodedata.normalize('NFKD', text)
        text = text.encode('ascii', 'ignore').decode('ascii')

        # Convertir en minuscules et remplacer les espaces
        text = text.lower()
        text = re.sub(r'[^a-z0-9\s-]', '', text)
        text = re.sub(r'[\s-]+', '-', text)
        text = text.strip('-')

        # Limiter à 50 caractères
        return text[:50].rstrip('-')

    def extract_frontmatter(self, content):
        """Extrait le frontmatter YAML d'un article"""
        match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.MULTILINE | re.DOTALL)
        if not match:
            return {}

        try:
            frontmatter = yaml.safe_load(match.group(1))
            return frontmatter if frontmatter else {}
        except:
            # Fallback: extraction manuelle
            result = {}
            for line in match.group(1).split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    result[key.strip()] = value.strip().strip('"\'')
            return result

    def collect_posts(self, directory):
        """Collecte tous les posts d'un répertoire"""
        posts = []
        if not directory.exists():
            return posts

        for md_file in directory.rglob('*.md'):
            try:
                with open(md_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                frontmatter = self.extract_frontmatter(content)

                # Extraire la date du nom de fichier
                filename = md_file.name
                date_match = re.match(r'^(\d{4}-\d{2}-\d{2})', filename)
                date_from_filename = date_match.group(1) if date_match else None

                # Obtenir la date complète du frontmatter ou du filename
                date_full = str(frontmatter.get('date', date_from_filename))

                posts.append({
                    'path': md_file,
                    'filename': filename,
                    'date': date_full,
                    'ref': frontmatter.get('ref'),
                    'title': frontmatter.get('title', 'Sans titre'),
                    'lang': frontmatter.get('lang', 'fr' if 'posts_en' not in str(md_file) else 'en'),
                    'content': content
                })
            except Exception as e:
                print(f"⚠️  Erreur lecture {md_file}: {e}")

        return posts

    def add_ref_to_frontmatter(self, file_path, content, ref):
        """Ajoute le champ ref après le champ date dans le frontmatter"""

        # Chercher la section frontmatter
        match = re.match(r'^(---\s*\n)(.*?)(\n---\s*\n.*)', content, re.MULTILINE | re.DOTALL)
        if not match:
            print(f"   ⚠️  Format frontmatter invalide dans {file_path}")
            return False

        before_frontmatter = match.group(1)
        frontmatter_content = match.group(2)
        after_frontmatter = match.group(3)

        # Vérifier si ref existe déjà
        if re.search(r'^ref:', frontmatter_content, re.MULTILINE):
            print(f"   ⏭️  Ref déjà présent dans {file_path.name}")
            return False

        # Ajouter ref après la ligne date
        lines = frontmatter_content.split('\n')
        new_lines = []
        ref_added = False

        for line in lines:
            new_lines.append(line)
            if line.startswith('date:') and not ref_added:
                new_lines.append(f'ref: {ref}')
                ref_added = True

        if not ref_added:
            # Si pas de ligne date trouvée, ajouter après title ou au début
            for i, line in enumerate(new_lines):
                if line.startswith('title:'):
                    new_lines.insert(i + 1, f'ref: {ref}')
                    ref_added = True
                    break

            if not ref_added:
                new_lines.insert(0, f'ref: {ref}')
                ref_added = True

        new_content = before_frontmatter + '\n'.join(new_lines) + after_frontmatter

        if self.dry_run:
            print(f"   [DRY-RUN] Ajouterait ref: {ref} dans {file_path.name}")
            return True
        else:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"   ✅ Ref ajouté dans {file_path.name}")
            return True

    def process_pairs(self):
        """Traite toutes les paires d'articles"""
        print("🔍 Collecte des articles...\n")

        self.fr_posts = self.collect_posts(self.posts_fr_dir)
        self.en_posts = self.collect_posts(self.posts_en_dir)

        print(f"📊 Statistiques:")
        print(f"   - Articles FR: {len(self.fr_posts)}")
        print(f"   - Articles EN: {len(self.en_posts)}\n")

        # Grouper par date
        fr_by_date = defaultdict(list)
        en_by_date = defaultdict(list)

        for p in self.fr_posts:
            fr_by_date[p['date']].append(p)

        for p in self.en_posts:
            en_by_date[p['date']].append(p)

        # Trouver les paires
        common_dates = set(fr_by_date.keys()) & set(en_by_date.keys())
        pairs_to_fix = []

        for date in sorted(common_dates):
            fr_articles = fr_by_date[date]
            en_articles = en_by_date[date]

            if len(fr_articles) == 1 and len(en_articles) == 1:
                fr_article = fr_articles[0]
                en_article = en_articles[0]

                # Vérifier si les deux ont le même ref
                if fr_article['ref'] and en_article['ref']:
                    if fr_article['ref'] == en_article['ref']:
                        continue  # Déjà liés correctement
                    else:
                        print(f"⚠️  Conflit de ref pour {date}:")
                        print(f"   FR: {fr_article['ref']}")
                        print(f"   EN: {en_article['ref']}")
                        continue

                # Un seul ou aucun n'a de ref
                pairs_to_fix.append((fr_article, en_article))

        print(f"🔧 Paires à corriger: {len(pairs_to_fix)}\n")

        if not pairs_to_fix:
            print("✅ Aucune correction nécessaire!")
            return

        # Traiter chaque paire
        for fr_article, en_article in pairs_to_fix:
            # Déterminer quel ref utiliser
            if fr_article['ref']:
                ref = fr_article['ref']
                print(f"📝 Utilisation du ref FR: {ref}")
            elif en_article['ref']:
                ref = en_article['ref']
                print(f"📝 Utilisation du ref EN: {ref}")
            else:
                # Générer un nouveau ref basé sur le titre EN (généralement plus court)
                ref = self.slugify(en_article['title'])
                print(f"📝 Génération d'un nouveau ref: {ref}")

            print(f"   🇫🇷 {fr_article['filename']}")
            print(f"   🇬🇧 {en_article['filename']}")

            # Ajouter le ref si nécessaire
            if not fr_article['ref']:
                self.add_ref_to_frontmatter(fr_article['path'], fr_article['content'], ref)

            if not en_article['ref']:
                self.add_ref_to_frontmatter(en_article['path'], en_article['content'], ref)

            print()

        if self.dry_run:
            print("\n⚠️  Mode DRY-RUN: aucun fichier modifié")
        else:
            print(f"\n✅ {len(pairs_to_fix)} paires corrigées avec succès!")

    def run(self):
        """Exécute le script"""
        if self.dry_run:
            print("🔍 MODE DRY-RUN: Aucun fichier ne sera modifié\n")

        self.process_pairs()

if __name__ == '__main__':
    dry_run = '--dry-run' in sys.argv or '-n' in sys.argv
    adder = RefAdder(dry_run=dry_run)
    adder.run()
