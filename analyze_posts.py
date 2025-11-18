#!/usr/bin/env python3
import os
import re
from pathlib import Path
from datetime import datetime

def extract_frontmatter(content):
    """Extract YAML frontmatter from markdown content"""
    pattern = r'^---\s*\n(.*?)\n---'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
    return None

def parse_frontmatter(frontmatter):
    """Parse YAML frontmatter to extract title and date"""
    title = None
    date = None

    # Extract title
    title_match = re.search(r"^title:\s*['\"]?(.+?)['\"]?\s*$", frontmatter, re.MULTILINE)
    if title_match:
        title = title_match.group(1).strip("'\"")

    # Extract date
    date_match = re.search(r"^date:\s*(.+?)\s*$", frontmatter, re.MULTILINE)
    if date_match:
        date = date_match.group(1).strip()

    return title, date

def analyze_posts(posts_dir):
    """Analyze all posts for inconsistencies"""
    issues = []
    posts_info = []

    for root, dirs, files in os.walk(posts_dir):
        for filename in files:
            if not filename.endswith('.md'):
                continue

            filepath = os.path.join(root, filename)

            # Extract date from filename
            filename_date_match = re.match(r'(\d{4}-\d{2}-\d{2})-(.+)\.md', filename)
            if not filename_date_match:
                issues.append(f"❌ Filename format incorrect: {filepath}")
                continue

            filename_date = filename_date_match.group(1)
            filename_slug = filename_date_match.group(2)

            # Read file content
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                issues.append(f"❌ Cannot read file: {filepath} - {e}")
                continue

            # Extract frontmatter
            frontmatter = extract_frontmatter(content)
            if not frontmatter:
                issues.append(f"❌ No frontmatter found: {filepath}")
                continue

            # Parse frontmatter
            title, date = parse_frontmatter(frontmatter)

            if not title:
                issues.append(f"❌ No title in frontmatter: {filepath}")

            if not date:
                issues.append(f"❌ No date in frontmatter: {filepath}")
            else:
                # Compare dates
                frontmatter_date = date.split()[0]  # Get just the date part
                if frontmatter_date != filename_date:
                    issues.append(f"⚠️  Date mismatch: {filepath}")
                    issues.append(f"   Filename: {filename_date} | Frontmatter: {frontmatter_date}")

            # Store post info
            posts_info.append({
                'filepath': filepath,
                'filename': filename,
                'filename_date': filename_date,
                'frontmatter_date': date,
                'title': title
            })

    return posts_info, issues

# Main execution
print("=" * 80)
print("ANALYSE DES ARTICLES DU BLOG")
print("=" * 80)

posts_dir = '_posts'
posts_info, issues = analyze_posts(posts_dir)

print(f"\n📊 Total d'articles trouvés: {len(posts_info)}")
print(f"⚠️  Total de problèmes trouvés: {len(issues)}")

if issues:
    print("\n" + "=" * 80)
    print("PROBLÈMES DÉTECTÉS")
    print("=" * 80)
    for issue in issues:
        print(issue)

# Print sample of posts for verification
print("\n" + "=" * 80)
print("ÉCHANTILLON D'ARTICLES (10 premiers)")
print("=" * 80)
for i, post in enumerate(posts_info[:10]):
    print(f"\n{i+1}. {post['filename']}")
    print(f"   Titre: {post['title']}")
    print(f"   Date fichier: {post['filename_date']}")
    print(f"   Date frontmatter: {post['frontmatter_date']}")

# Export all posts to a file for detailed review
with open('/home/user/ndabene.github.io/posts_analysis.txt', 'w', encoding='utf-8') as f:
    f.write("ANALYSE COMPLÈTE DES ARTICLES\n")
    f.write("=" * 80 + "\n\n")

    for i, post in enumerate(posts_info):
        f.write(f"{i+1}. {post['filepath']}\n")
        f.write(f"   Titre: {post['title']}\n")
        f.write(f"   Date fichier: {post['filename_date']}\n")
        f.write(f"   Date frontmatter: {post['frontmatter_date']}\n\n")

    if issues:
        f.write("\n" + "=" * 80 + "\n")
        f.write("PROBLÈMES DÉTECTÉS\n")
        f.write("=" * 80 + "\n\n")
        for issue in issues:
            f.write(issue + "\n")

print("\n✅ Analyse complète exportée dans: posts_analysis.txt")
