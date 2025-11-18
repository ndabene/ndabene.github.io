#!/usr/bin/env python3
"""
Analyse complète du blog pour identifier les problèmes de cohérence
"""
import os
import re
from pathlib import Path
from datetime import datetime
from collections import defaultdict

def extract_frontmatter(content):
    """Extract YAML frontmatter from markdown content"""
    pattern = r'^---\s*\n(.*?)\n---'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
    return None

def parse_frontmatter(frontmatter):
    """Parse YAML frontmatter to extract metadata"""
    metadata = {}

    # Extract title (handle both quoted and unquoted)
    title_match = re.search(r"^title:\s*['\"](.+?)['\"]", frontmatter, re.MULTILINE)
    if not title_match:
        title_match = re.search(r"^title:\s*(.+?)$", frontmatter, re.MULTILINE)
    if title_match:
        metadata['title'] = title_match.group(1).strip("'\"")

    # Extract date
    date_match = re.search(r"^date:\s*(.+?)\s*$", frontmatter, re.MULTILINE)
    if date_match:
        metadata['date'] = date_match.group(1).strip()

    # Extract categories
    categories_match = re.findall(r"categories:\s*\n((?:\s*-\s*.+\n?)+)", frontmatter, re.MULTILINE)
    if categories_match:
        categories = re.findall(r"-\s*(.+)", categories_match[0])
        metadata['categories'] = [c.strip() for c in categories]
    else:
        single_cat = re.search(r"categories?:\s*(.+)$", frontmatter, re.MULTILINE)
        if single_cat:
            metadata['categories'] = [single_cat.group(1).strip()]

    # Extract tags
    tags_match = re.findall(r"tags:\s*\n((?:\s*-\s*.+\n?)+)", frontmatter, re.MULTILINE)
    if tags_match:
        tags = re.findall(r"-\s*(.+)", tags_match[0])
        metadata['tags'] = [t.strip() for t in tags]

    # Extract excerpt
    excerpt_match = re.search(r"excerpt:\s*['\"](.+?)['\"]", frontmatter, re.MULTILINE | re.DOTALL)
    if excerpt_match:
        metadata['excerpt'] = excerpt_match.group(1)

    # Extract image
    image_match = re.search(r"image:\s*(.+)$", frontmatter, re.MULTILINE)
    if image_match:
        metadata['image'] = image_match.group(1).strip()

    return metadata

def analyze_posts_comprehensive(posts_dir):
    """Comprehensive analysis of all posts"""
    all_posts = []
    issues = {
        'date_mismatch': [],
        'missing_title': [],
        'missing_date': [],
        'missing_categories': [],
        'missing_excerpt': [],
        'missing_image': [],
        'future_posts': [],
        'title_inconsistencies': []
    }

    now = datetime.now()

    for root, dirs, files in os.walk(posts_dir):
        for filename in files:
            if not filename.endswith('.md'):
                continue

            filepath = os.path.join(root, filename)
            rel_path = os.path.relpath(filepath, posts_dir)

            # Extract date from filename
            filename_date_match = re.match(r'(\d{4}-\d{2}-\d{2})-(.+)\.md', filename)
            if not filename_date_match:
                continue

            filename_date = filename_date_match.group(1)
            filename_slug = filename_date_match.group(2)

            # Read file content
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                continue

            # Extract frontmatter
            frontmatter = extract_frontmatter(content)
            if not frontmatter:
                continue

            # Parse frontmatter
            metadata = parse_frontmatter(frontmatter)

            # Create post entry
            post = {
                'filepath': filepath,
                'filename': filename,
                'rel_path': rel_path,
                'filename_date': filename_date,
                'filename_slug': filename_slug,
                **metadata
            }

            all_posts.append(post)

            # Check for issues
            if not metadata.get('title'):
                issues['missing_title'].append(filepath)

            if not metadata.get('date'):
                issues['missing_date'].append(filepath)
            else:
                # Compare dates
                frontmatter_date = metadata['date'].split()[0]
                if frontmatter_date != filename_date:
                    issues['date_mismatch'].append({
                        'file': filepath,
                        'filename_date': filename_date,
                        'frontmatter_date': frontmatter_date
                    })

            if not metadata.get('categories'):
                issues['missing_categories'].append(filepath)

            if not metadata.get('excerpt'):
                issues['missing_excerpt'].append(filepath)

            if not metadata.get('image'):
                issues['missing_image'].append(filepath)

            # Check if it's a future post
            try:
                post_date = datetime.strptime(filename_date, '%Y-%m-%d')
                if post_date > now:
                    issues['future_posts'].append({
                        'file': filepath,
                        'title': metadata.get('title', 'Sans titre'),
                        'date': filename_date
                    })
            except:
                pass

    return all_posts, issues

def check_search_limitations():
    """Analyze search system limitations"""
    limitations = []

    # Read the search JavaScript file
    search_js_path = '/home/user/ndabene.github.io/assets/js/blog-filters.js'
    try:
        with open(search_js_path, 'r', encoding='utf-8') as f:
            search_content = f.read()

        # Analyze search functionality
        if 'toLowerCase()' in search_content:
            limitations.append("✓ La recherche est insensible à la casse")

        if 'includes(' in search_content:
            limitations.append("⚠️  La recherche utilise 'includes()' - pas de recherche floue ou de correction orthographique")

        if 'data-categories' in search_content and 'data-tags' in search_content:
            limitations.append("⚠️  La recherche ne cherche que dans les titres et extraits - PAS dans les catégories ou tags")

        # Check if it searches in full content
        if 'post.content' not in search_content and 'data-content' not in search_content:
            limitations.append("⚠️  LIMITATION MAJEURE : La recherche ne cherche PAS dans le contenu complet des articles")

        limitations.append("⚠️  Pas de recherche par synonymes ou mots-clés similaires")
        limitations.append("⚠️  Pas de suggestion de recherche en cas de 0 résultat")

    except Exception as e:
        limitations.append(f"❌ Impossible d'analyser le fichier de recherche: {e}")

    return limitations

def analyze_duplicate_titles(posts):
    """Check for duplicate or very similar titles"""
    title_groups = defaultdict(list)

    for post in posts:
        title = post.get('title', '').strip().lower()
        if title:
            title_groups[title].append(post)

    duplicates = {title: posts for title, posts in title_groups.items() if len(posts) > 1}

    return duplicates

def generate_report(posts, issues, search_limitations):
    """Generate comprehensive report"""
    report = []

    report.append("=" * 80)
    report.append("RAPPORT D'ANALYSE COMPLET DU BLOG")
    report.append("=" * 80)
    report.append("")

    # Statistics
    report.append("📊 STATISTIQUES GLOBALES")
    report.append("-" * 80)
    report.append(f"Total d'articles analysés : {len(posts)}")
    report.append(f"Articles futurs : {len(issues['future_posts'])}")
    report.append(f"Articles publiés : {len(posts) - len(issues['future_posts'])}")
    report.append("")

    # Issues summary
    total_issues = sum([
        len(issues['date_mismatch']),
        len(issues['missing_title']),
        len(issues['missing_date']),
        len(issues['missing_categories']),
        len(issues['missing_excerpt']),
        len(issues['missing_image'])
    ])

    report.append("⚠️  RÉSUMÉ DES PROBLÈMES")
    report.append("-" * 80)
    report.append(f"Total de problèmes détectés : {total_issues}")
    report.append(f"  • Incohérences de dates : {len(issues['date_mismatch'])}")
    report.append(f"  • Titres manquants : {len(issues['missing_title'])}")
    report.append(f"  • Dates manquantes : {len(issues['missing_date'])}")
    report.append(f"  • Catégories manquantes : {len(issues['missing_categories'])}")
    report.append(f"  • Extraits manquants : {len(issues['missing_excerpt'])}")
    report.append(f"  • Images manquantes : {len(issues['missing_image'])}")
    report.append("")

    # Date mismatches
    if issues['date_mismatch']:
        report.append("🔴 INCOHÉRENCES DE DATES (Priorité haute)")
        report.append("-" * 80)
        for issue in issues['date_mismatch']:
            report.append(f"Fichier : {issue['file']}")
            report.append(f"  Date dans le nom : {issue['filename_date']}")
            report.append(f"  Date frontmatter : {issue['frontmatter_date']}")
            report.append("")

    # Missing metadata
    if issues['missing_excerpt']:
        report.append("🟡 EXTRAITS MANQUANTS (Affecte l'affichage)")
        report.append("-" * 80)
        for filepath in issues['missing_excerpt'][:10]:
            report.append(f"  • {filepath}")
        if len(issues['missing_excerpt']) > 10:
            report.append(f"  ... et {len(issues['missing_excerpt']) - 10} autres")
        report.append("")

    if issues['missing_categories']:
        report.append("🟡 CATÉGORIES MANQUANTES (Affecte le filtrage)")
        report.append("-" * 80)
        for filepath in issues['missing_categories'][:10]:
            report.append(f"  • {filepath}")
        if len(issues['missing_categories']) > 10:
            report.append(f"  ... et {len(issues['missing_categories']) - 10} autres")
        report.append("")

    # Future posts
    if issues['future_posts']:
        report.append("📅 ARTICLES FUTURS (Non visibles sans mode admin)")
        report.append("-" * 80)
        for post in issues['future_posts']:
            report.append(f"  • {post['date']} : {post['title']}")
        report.append("")
        report.append("Note : Ces articles ne sont visibles que avec ?admin_preview=true")
        report.append("")

    # Search limitations
    report.append("🔍 LIMITATIONS DU MOTEUR DE RECHERCHE")
    report.append("-" * 80)
    for limitation in search_limitations:
        report.append(limitation)
    report.append("")

    # Duplicate titles
    duplicates = analyze_duplicate_titles(posts)
    if duplicates:
        report.append("⚠️  TITRES SIMILAIRES OU IDENTIQUES")
        report.append("-" * 80)
        for title, posts_with_title in duplicates.items():
            report.append(f"\nTitre : {title}")
            for post in posts_with_title:
                report.append(f"  • {post['rel_path']}")
        report.append("")

    # Articles overview
    report.append("📑 VUE D'ENSEMBLE DES ARTICLES")
    report.append("-" * 80)

    # Group by year/month
    posts_by_date = defaultdict(list)
    for post in posts:
        year_month = post['filename_date'][:7]  # YYYY-MM
        posts_by_date[year_month].append(post)

    for year_month in sorted(posts_by_date.keys(), reverse=True):
        posts_in_month = posts_by_date[year_month]
        report.append(f"\n{year_month} ({len(posts_in_month)} articles)")
        for post in sorted(posts_in_month, key=lambda p: p['filename_date'], reverse=True):
            title = post.get('title', 'SANS TITRE')
            report.append(f"  • {post['filename_date']} : {title[:60]}")

    return "\n".join(report)

# Main execution
print("🔍 Analyse en cours...")
print()

posts_dir = '_posts'
posts, issues = analyze_posts_comprehensive(posts_dir)
search_limitations = check_search_limitations()

report = generate_report(posts, issues, search_limitations)

print(report)

# Save to file
output_file = '/home/user/ndabene.github.io/comprehensive_analysis_report.txt'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(report)

print()
print("=" * 80)
print(f"✅ Rapport complet sauvegardé : {output_file}")
print("=" * 80)
