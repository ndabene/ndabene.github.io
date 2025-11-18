#!/usr/bin/env python3
"""
Script pour ajouter automatiquement des extraits aux articles qui n'en ont pas
"""
import os
import re
from pathlib import Path

def extract_frontmatter_and_content(file_path):
    """Extract frontmatter and main content separately"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract frontmatter
    fm_pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
    match = re.search(fm_pattern, content, re.DOTALL)

    if not match:
        return None, None, None

    frontmatter = match.group(1)
    body = match.group(2)

    return content, frontmatter, body

def has_excerpt(frontmatter):
    """Check if frontmatter already has an excerpt"""
    return bool(re.search(r'^excerpt:', frontmatter, re.MULTILINE))

def extract_smart_excerpt(body):
    """Extract a smart excerpt from the article body"""
    # Remove any markdown headers
    body_no_headers = re.sub(r'^#+\s+.*$', '', body, flags=re.MULTILINE)

    # Remove HTML comments
    body_no_comments = re.sub(r'<!--.*?-->', '', body_no_headers, flags=re.DOTALL)

    # Remove code blocks
    body_no_code = re.sub(r'```.*?```', '', body_no_comments, flags=re.DOTALL)

    # Remove links but keep text
    body_clean = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', body_no_code)

    # Remove markdown formatting
    body_clean = re.sub(r'[*_`]', '', body_clean)

    # Split into paragraphs
    paragraphs = [p.strip() for p in body_clean.split('\n\n') if p.strip()]

    if not paragraphs:
        return None

    # Find first substantial paragraph (more than 50 chars)
    for para in paragraphs:
        if len(para) > 50:
            # Get first 2 sentences (approximately)
            sentences = re.split(r'[.!?]+\s+', para)
            excerpt = '. '.join(sentences[:2]).strip()

            # Limit to ~150 characters
            if len(excerpt) > 150:
                excerpt = excerpt[:147] + '...'
            else:
                excerpt = excerpt + '.'

            return excerpt

    return None

def add_excerpt_to_file(file_path, excerpt):
    """Add excerpt to frontmatter"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the end of frontmatter
    fm_pattern = r'^(---\s*\n.*?)(---\s*\n)'

    def replacer(match):
        frontmatter = match.group(1)
        closing = match.group(2)

        # Add excerpt before closing ---
        new_frontmatter = frontmatter + f"excerpt: '{excerpt}'\n"
        return new_frontmatter + closing

    new_content = re.sub(fm_pattern, replacer, content, count=1, flags=re.DOTALL)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

# Main execution
print("=" * 80)
print("AJOUT D'EXTRAITS AUX ARTICLES")
print("=" * 80)
print()

posts_dir = '_posts'
count_processed = 0
count_added = 0
articles_without_excerpt = []

for root, dirs, files in os.walk(posts_dir):
    for filename in files:
        if not filename.endswith('.md'):
            continue

        filepath = os.path.join(root, filename)
        count_processed += 1

        # Extract content
        full_content, frontmatter, body = extract_frontmatter_and_content(filepath)

        if not frontmatter or not body:
            print(f"⚠️  Impossible de parser: {filepath}")
            continue

        # Check if excerpt exists
        if has_excerpt(frontmatter):
            continue

        # Article needs excerpt
        articles_without_excerpt.append(filepath)

        # Extract smart excerpt
        excerpt = extract_smart_excerpt(body)

        if excerpt:
            print(f"📝 Ajout excerpt pour: {os.path.basename(filepath)}")
            print(f"   Excerpt: {excerpt[:80]}...")
            add_excerpt_to_file(filepath, excerpt)
            count_added += 1
        else:
            print(f"⚠️  Impossible de générer excerpt pour: {filepath}")

print()
print("=" * 80)
print(f"✅ Articles traités: {count_processed}")
print(f"✅ Extraits ajoutés: {count_added}")
print(f"⚠️  Articles sans excerpt au départ: {len(articles_without_excerpt)}")
print("=" * 80)
