#!/usr/bin/env python3
"""
Script d'audit des références (ref) entre articles FR et EN
"""
import os
import re
from pathlib import Path
from collections import defaultdict

def extract_frontmatter(file_path):
    """Extract frontmatter from a markdown file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract frontmatter between --- markers
    match = re.search(r'^---\s*\n(.*?)\n---', content, re.DOTALL | re.MULTILINE)
    if not match:
        return None

    frontmatter = match.group(1)
    data = {}

    # Extract ref
    ref_match = re.search(r'^ref:\s*(.+)$', frontmatter, re.MULTILINE)
    if ref_match:
        data['ref'] = ref_match.group(1).strip()

    # Extract lang
    lang_match = re.search(r'^lang:\s*(.+)$', frontmatter, re.MULTILINE)
    if lang_match:
        data['lang'] = lang_match.group(1).strip()

    # Extract title
    title_match = re.search(r"^title:\s*['\"]?(.+?)['\"]?$", frontmatter, re.MULTILINE)
    if title_match:
        data['title'] = title_match.group(1).strip()

    # Extract date
    date_match = re.search(r'^date:\s*(.+)$', frontmatter, re.MULTILINE)
    if date_match:
        data['date'] = date_match.group(1).strip()

    return data

def audit_refs():
    """Audit all ref fields in FR and EN posts"""
    posts_dir = Path('/home/user/ndabene.github.io/_posts')
    posts_en_dir = Path('/home/user/ndabene.github.io/_posts_en')

    # Collect all posts with ref
    posts_by_ref = defaultdict(list)
    posts_without_ref = []

    # Process French posts
    if posts_dir.exists():
        for md_file in posts_dir.rglob('*.md'):
            data = extract_frontmatter(md_file)
            if data:
                relative_path = md_file.relative_to('/home/user/ndabene.github.io')
                entry = {
                    'path': str(relative_path),
                    'lang': data.get('lang', 'fr (implicit)'),
                    'title': data.get('title', 'N/A'),
                    'date': data.get('date', 'N/A')
                }

                if 'ref' in data:
                    posts_by_ref[data['ref']].append(entry)
                else:
                    posts_without_ref.append(entry)

    # Process English posts
    if posts_en_dir.exists():
        for md_file in posts_en_dir.rglob('*.md'):
            data = extract_frontmatter(md_file)
            if data:
                relative_path = md_file.relative_to('/home/user/ndabene.github.io')
                entry = {
                    'path': str(relative_path),
                    'lang': data.get('lang', 'en (implicit)'),
                    'title': data.get('title', 'N/A'),
                    'date': data.get('date', 'N/A')
                }

                if 'ref' in data:
                    posts_by_ref[data['ref']].append(entry)
                else:
                    posts_without_ref.append(entry)

    # Report
    print("=" * 80)
    print("AUDIT DES RÉFÉRENCES (ref) FR/EN")
    print("=" * 80)
    print()

    # Articles without ref
    if posts_without_ref:
        print(f"⚠️  Articles SANS ref: {len(posts_without_ref)}")
        print("-" * 80)
        for post in sorted(posts_without_ref, key=lambda x: x['path']):
            print(f"  📄 {post['path']}")
            print(f"     Lang: {post['lang']} | Date: {post['date']}")
            print(f"     Title: {post['title']}")
            print()
        print()

    # Articles with ref
    print(f"✅ Articles AVEC ref: {len(posts_by_ref)} références uniques")
    print("-" * 80)
    print()

    # Check for mismatches
    issues = []
    orphans = []

    for ref, posts in sorted(posts_by_ref.items()):
        langs = [p['lang'] for p in posts]

        # Check if we have both FR and EN
        has_fr = any('fr' in lang for lang in langs)
        has_en = any('en' in lang for lang in langs)

        if len(posts) == 1:
            orphans.append((ref, posts[0]))
        elif len(posts) > 2:
            issues.append((ref, posts, f"Plus de 2 articles avec le même ref"))
        elif not (has_fr and has_en):
            issues.append((ref, posts, f"Langues incohérentes: {langs}"))

    # Report orphans
    if orphans:
        print(f"🔍 Articles ORPHELINS (ref sans traduction): {len(orphans)}")
        print("-" * 80)
        for ref, post in orphans:
            print(f"  ref: {ref}")
            print(f"  📄 {post['path']}")
            print(f"     Lang: {post['lang']} | Date: {post['date']}")
            print(f"     Title: {post['title']}")
            print()
        print()

    # Report issues
    if issues:
        print(f"❌ PROBLÈMES DÉTECTÉS: {len(issues)}")
        print("-" * 80)
        for ref, posts, issue in issues:
            print(f"  ref: {ref}")
            print(f"  Problème: {issue}")
            for post in posts:
                print(f"    📄 {post['path']}")
                print(f"       Lang: {post['lang']} | Date: {post['date']}")
            print()
        print()

    # Report valid pairs
    valid_pairs = []
    for ref, posts in sorted(posts_by_ref.items()):
        langs = [p['lang'] for p in posts]
        has_fr = any('fr' in lang for lang in langs)
        has_en = any('en' in lang for lang in langs)

        if len(posts) == 2 and has_fr and has_en:
            valid_pairs.append((ref, posts))

    if valid_pairs:
        print(f"✅ Paires FR/EN VALIDES: {len(valid_pairs)}")
        print("-" * 80)
        for ref, posts in valid_pairs[:10]:  # Show first 10
            print(f"  ref: {ref}")
            for post in posts:
                print(f"    {post['lang']:15} {post['path']}")
            print()
        if len(valid_pairs) > 10:
            print(f"  ... et {len(valid_pairs) - 10} autres paires valides")
        print()

    # Summary
    print("=" * 80)
    print("RÉSUMÉ")
    print("=" * 80)
    print(f"Articles sans ref:        {len(posts_without_ref)}")
    print(f"Références uniques:       {len(posts_by_ref)}")
    print(f"Articles orphelins:       {len(orphans)}")
    print(f"Problèmes détectés:       {len(issues)}")
    print(f"Paires FR/EN valides:     {len(valid_pairs)}")
    print()

if __name__ == '__main__':
    audit_refs()
