#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script pour analyser les traductions FR/EN et identifier les actions nécessaires
Usage: python3 scripts/analyze_translations.py
"""

import os
import re
from pathlib import Path
from collections import defaultdict
import yaml

class TranslationAnalyzer:
    def __init__(self):
        self.posts_fr_dir = Path('_posts')
        self.posts_en_dir = Path('_posts_en')
        self.fr_posts = []
        self.en_posts = []

    def extract_frontmatter(self, content):
        """Extrait le frontmatter YAML d'un article"""
        match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.MULTILINE | re.DOTALL)
        if not match:
            return {}

        try:
            # Charger le YAML de manière sûre
            frontmatter = yaml.safe_load(match.group(1))
            return frontmatter if frontmatter else {}
        except:
            # Fallback: extraction manuelle basique
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

                # Obtenir la date du frontmatter ou du filename
                date = str(frontmatter.get('date', date_from_filename))

                posts.append({
                    'path': str(md_file),
                    'filename': filename,
                    'date': date,
                    'ref': frontmatter.get('ref'),
                    'title': frontmatter.get('title', 'Sans titre'),
                    'lang': frontmatter.get('lang', 'fr' if 'posts_en' not in str(md_file) else 'en')
                })
            except Exception as e:
                print(f"⚠️  Erreur lecture {md_file}: {e}")

        return posts

    def analyze(self):
        """Analyse les traductions et génère un rapport"""
        print("🔍 Analyse des traductions FR ↔ EN...\n")

        # Collecter les posts
        self.fr_posts = self.collect_posts(self.posts_fr_dir)
        self.en_posts = self.collect_posts(self.posts_en_dir)

        print(f"📊 Statistiques:")
        print(f"   - Articles FR: {len(self.fr_posts)}")
        print(f"   - Articles EN: {len(self.en_posts)}\n")

        # Grouper par ref
        fr_by_ref = {p['ref']: p for p in self.fr_posts if p['ref']}
        en_by_ref = {p['ref']: p for p in self.en_posts if p['ref']}

        # Grouper par date
        fr_by_date = defaultdict(list)
        en_by_date = defaultdict(list)

        for p in self.fr_posts:
            fr_by_date[p['date']].append(p)

        for p in self.en_posts:
            en_by_date[p['date']].append(p)

        # Analyser les correspondances
        print("=" * 80)
        print("✅ ARTICLES AVEC REF CORRESPONDANT")
        print("=" * 80)

        matched_by_ref = set()
        for ref, fr_post in fr_by_ref.items():
            if ref in en_by_ref:
                en_post = en_by_ref[ref]
                print(f"\n📎 Ref: {ref}")
                print(f"   🇫🇷 {fr_post['date']} - {fr_post['title'][:60]}")
                print(f"   🇬🇧 {en_post['date']} - {en_post['title'][:60]}")
                matched_by_ref.add(fr_post['filename'])
                matched_by_ref.add(en_post['filename'])

        print(f"\n✅ Total: {len(fr_by_ref & en_by_ref.keys())} paires avec ref\n")

        # Articles sans ref mais même date
        print("=" * 80)
        print("⚠️  ARTICLES MÊME DATE SANS REF (à lier)")
        print("=" * 80)

        pairs_without_ref = []
        for date in set(fr_by_date.keys()) & set(en_by_date.keys()):
            fr_articles = fr_by_date[date]
            en_articles = en_by_date[date]

            if len(fr_articles) == 1 and len(en_articles) == 1:
                fr_post = fr_articles[0]
                en_post = en_articles[0]

                # Ignorer si déjà matchés par ref
                if fr_post['filename'] in matched_by_ref:
                    continue

                # Si aucun des deux n'a de ref, ou un seul en a
                if not fr_post['ref'] or not en_post['ref']:
                    pairs_without_ref.append((fr_post, en_post))
                    print(f"\n📅 Date: {date}")
                    print(f"   🇫🇷 {fr_post['title'][:60]}")
                    print(f"      Ref: {fr_post['ref'] or '❌ MANQUANT'}")
                    print(f"   🇬🇧 {en_post['title'][:60]}")
                    print(f"      Ref: {en_post['ref'] or '❌ MANQUANT'}")

        print(f"\n⚠️  Total: {len(pairs_without_ref)} paires sans ref complet\n")

        # Articles vraiment sans traduction
        print("=" * 80)
        print("❌ ARTICLES SANS TRADUCTION")
        print("=" * 80)

        truly_missing_fr = []
        truly_missing_en = []

        # FR sans EN
        for fr_post in self.fr_posts:
            if fr_post['filename'] in matched_by_ref:
                continue

            # Vérifier si on a trouvé une paire par date
            found_in_pairs = any(pair[0]['filename'] == fr_post['filename'] for pair in pairs_without_ref)
            if found_in_pairs:
                continue

            truly_missing_fr.append(fr_post)

        # EN sans FR
        for en_post in self.en_posts:
            if en_post['filename'] in matched_by_ref:
                continue

            found_in_pairs = any(pair[1]['filename'] == en_post['filename'] for pair in pairs_without_ref)
            if found_in_pairs:
                continue

            truly_missing_en.append(en_post)

        print("\n🇫🇷 Articles FR sans traduction EN:")
        for post in sorted(truly_missing_fr, key=lambda x: x['date'], reverse=True)[:10]:
            print(f"   • {post['date']} - {post['title'][:60]}")
        if len(truly_missing_fr) > 10:
            print(f"   ... et {len(truly_missing_fr) - 10} autres")

        print(f"\n🇬🇧 Articles EN sans traduction FR:")
        for post in sorted(truly_missing_en, key=lambda x: x['date'], reverse=True)[:10]:
            print(f"   • {post['date']} - {post['title'][:60]}")
        if len(truly_missing_en) > 10:
            print(f"   ... et {len(truly_missing_en) - 10} autres")

        print("\n" + "=" * 80)
        print("📝 RÉSUMÉ")
        print("=" * 80)
        print(f"✅ Paires correctement liées par ref: {len(fr_by_ref & en_by_ref.keys())}")
        print(f"⚠️  Paires à lier (même date, ref manquant): {len(pairs_without_ref)}")
        print(f"❌ Articles FR vraiment sans traduction: {len(truly_missing_fr)}")
        print(f"❌ Articles EN vraiment sans traduction: {len(truly_missing_en)}")
        print(f"\n🎯 Actions recommandées:")
        print(f"   1. Ajouter les refs manquants aux {len(pairs_without_ref)} paires")
        print(f"   2. Traduire les {len(truly_missing_fr)} articles FR manquants")
        print(f"   3. Traduire les {len(truly_missing_en)} articles EN manquants")

if __name__ == '__main__':
    analyzer = TranslationAnalyzer()
    analyzer.analyze()
