#!/usr/bin/env python3
"""
Script de migration des tags du blog
Consolidation de 220 tags vers 11 tags stratégiques

Usage:
    python3 migrate_tags.py --dry-run  # Simulation sans modification
    python3 migrate_tags.py            # Migration réelle
"""

import os
import re
import yaml
import argparse
from collections import Counter, defaultdict

# Configuration
POSTS_DIR = "./_posts"
MAPPING_FILE = "tag_mapping.yaml"
REPORT_FILE = "RAPPORT_MIGRATION_TAGS.md"

# Tags stratégiques (les 11 seuls tags autorisés)
STRATEGIC_TAGS = [
    "IA",
    "PrestaShop",
    "e-commerce",
    "développement",
    "sécurité",
    "SEO",
    "GEO",
    "automatisation",
    "API",
    "ChatGPT",
    "prompt engineering"
]

def load_mapping():
    """Charge le fichier de mapping YAML"""
    with open(MAPPING_FILE, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def extract_front_matter(content):
    """Extrait le front matter YAML d'un fichier markdown"""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return None, content

def migrate_tags(old_tags, mapping):
    """Migre les anciens tags vers les nouveaux selon le mapping"""
    new_tags = set()

    for tag in old_tags:
        if tag in mapping:
            mapped_tags = mapping[tag]
            if mapped_tags:  # Si pas liste vide (tag à supprimer)
                new_tags.update(mapped_tags)
        else:
            # Tag non mappé : on le garde tel quel (sera signalé dans le rapport)
            print(f"⚠️  Tag non mappé trouvé: {tag}")
            new_tags.add(tag)

    # S'assurer qu'on a au moins 2 tags et max 4
    new_tags_list = sorted(list(new_tags))

    if len(new_tags_list) < 2:
        print(f"⚠️  Moins de 2 tags après migration: {new_tags_list}")
    elif len(new_tags_list) > 4:
        # Prioriser les tags stratégiques
        prioritized = []
        for strategic_tag in STRATEGIC_TAGS:
            if strategic_tag in new_tags_list:
                prioritized.append(strategic_tag)
                if len(prioritized) == 4:
                    break
        new_tags_list = prioritized

    return new_tags_list

def process_file(filepath, mapping, dry_run=True):
    """Traite un fichier markdown"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    front_matter_str, body = extract_front_matter(content)

    if not front_matter_str:
        return None

    try:
        front_matter = yaml.safe_load(front_matter_str)
    except yaml.YAMLError as e:
        print(f"❌ Erreur YAML dans {filepath}: {e}")
        return None

    if not front_matter or 'tags' not in front_matter:
        return None

    old_tags = front_matter['tags']
    if not old_tags:
        return None

    # Migration des tags
    new_tags = migrate_tags(old_tags, mapping)

    # Statistiques
    stats = {
        'file': os.path.basename(filepath),
        'title': front_matter.get('title', 'Sans titre'),
        'old_tags': old_tags,
        'new_tags': new_tags,
        'old_count': len(old_tags),
        'new_count': len(new_tags),
        'modified': old_tags != new_tags
    }

    # Écriture du fichier si pas en dry-run
    if not dry_run and stats['modified']:
        front_matter['tags'] = new_tags

        # Reconstruire le fichier
        new_front_matter = yaml.dump(front_matter, allow_unicode=True, sort_keys=False)
        new_content = f"---\n{new_front_matter}---\n{body}"

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"✅ Migré: {os.path.basename(filepath)}")
        print(f"   {len(old_tags)} tags → {len(new_tags)} tags")
        print(f"   Anciens: {', '.join(old_tags[:5])}{'...' if len(old_tags) > 5 else ''}")
        print(f"   Nouveaux: {', '.join(new_tags)}")
        print()

    return stats

def generate_report(all_stats, mapping):
    """Génère le rapport de migration"""
    modified_count = sum(1 for s in all_stats if s['modified'])
    total_count = len(all_stats)

    # Statistiques sur les tags
    old_tags_counter = Counter()
    new_tags_counter = Counter()

    for stats in all_stats:
        old_tags_counter.update(stats['old_tags'])
        new_tags_counter.update(stats['new_tags'])

    # Articles modifiés
    modified_articles = [s for s in all_stats if s['modified']]

    # Générer le rapport Markdown
    report = f"""# 📊 Rapport de Migration des Tags

**Date**: {__import__('datetime').datetime.now().strftime('%d %B %Y à %H:%M')}

---

## 🎯 Résumé Exécutif

### Statistiques Globales

| Métrique | Avant | Après | Évolution |
|----------|-------|-------|-----------|
| **Tags uniques** | {len(old_tags_counter)} | {len(new_tags_counter)} | **-{len(old_tags_counter) - len(new_tags_counter)}** (-{round((1 - len(new_tags_counter)/len(old_tags_counter))*100, 1)}%) |
| **Articles traités** | {total_count} | {total_count} | - |
| **Articles modifiés** | - | {modified_count} | {round(modified_count/total_count*100, 1)}% |
| **Tags par article (moyenne)** | {sum(s['old_count'] for s in all_stats)/total_count:.1f} | {sum(s['new_count'] for s in all_stats)/total_count:.1f} | {round((sum(s['new_count'] for s in all_stats)/total_count - sum(s['old_count'] for s in all_stats)/total_count) / (sum(s['old_count'] for s in all_stats)/total_count) * 100, 1)}% |

---

## 📈 Distribution des Nouveaux Tags

| Tag | Nombre d'articles | % du total |
|-----|-------------------|------------|
"""

    for tag, count in new_tags_counter.most_common():
        percentage = round(count / total_count * 100, 1)
        report += f"| **{tag}** | {count} | {percentage}% |\n"

    report += f"""
---

## 📋 Détail des Articles Modifiés ({modified_count} articles)

"""

    for stats in modified_articles:
        report += f"""
### 📄 {stats['title']}

**Fichier**: `{stats['file']}`

| Avant ({stats['old_count']} tags) | Après ({stats['new_count']} tags) |
|-----------------------------------|-----------------------------------|
"""
        max_tags = max(len(stats['old_tags']), len(stats['new_tags']))
        for i in range(max_tags):
            old_tag = stats['old_tags'][i] if i < len(stats['old_tags']) else ''
            new_tag = stats['new_tags'][i] if i < len(stats['new_tags']) else ''
            report += f"| {old_tag} | {new_tag} |\n"

    report += """
---

## ✅ Vérifications Post-Migration

### Conformité aux Règles

"""

    # Vérifications
    issues = []

    for stats in all_stats:
        if stats['new_count'] < 2:
            issues.append(f"⚠️ **{stats['file']}** : Seulement {stats['new_count']} tag(s)")
        elif stats['new_count'] > 4:
            issues.append(f"⚠️ **{stats['file']}** : {stats['new_count']} tags (> 4)")

        # Vérifier que tous les tags sont dans STRATEGIC_TAGS
        for tag in stats['new_tags']:
            if tag not in STRATEGIC_TAGS:
                issues.append(f"❌ **{stats['file']}** : Tag non stratégique trouvé: `{tag}`")

    if issues:
        report += "### ⚠️ Problèmes Détectés\n\n"
        for issue in issues:
            report += f"- {issue}\n"
    else:
        report += "### ✅ Aucun Problème Détecté\n\n"
        report += "Tous les articles respectent les règles :\n"
        report += "- Entre 2 et 4 tags par article\n"
        report += "- Uniquement des tags stratégiques\n"

    report += """
---

## 🎯 Les 11 Tags Stratégiques Finaux

1. **IA** - Intelligence Artificielle et outils IA
2. **PrestaShop** - Plateforme e-commerce
3. **e-commerce** - Commerce en ligne
4. **développement** - Développement logiciel
5. **sécurité** - Sécurité et confidentialité
6. **SEO** - Référencement et optimisation
7. **GEO** - Generative Engine Optimization (moteurs IA)
8. **automatisation** - Workflows et no-code
9. **API** - Intégrations et API
10. **ChatGPT** - Outil IA spécifique
11. **prompt engineering** - Techniques de prompting

---

## 📊 Tags Supprimés

Les tags suivants ont été supprimés ou consolidés :

"""

    # Tags qui ont disparu
    removed_tags = set(old_tags_counter.keys()) - set(new_tags_counter.keys())

    if removed_tags:
        for tag in sorted(removed_tags):
            count = old_tags_counter[tag]
            report += f"- `{tag}` ({count} occurrences)\n"
    else:
        report += "Aucun tag supprimé.\n"

    report += """
---

## ✅ Prochaines Étapes

1. ✅ Migration des tags effectuée
2. ⏳ Vérifier manuellement les 10 articles les plus populaires
3. ⏳ Tester la génération des pages de tags
4. ⏳ Vérifier le sitemap.xml
5. ⏳ Commit et push vers GitHub
6. ⏳ Soumettre le nouveau sitemap à Google Search Console
7. ⏳ Monitorer l'impact SEO sur 30 jours

---

**Fin du rapport**
"""

    # Écrire le rapport
    with open(REPORT_FILE, 'w', encoding='utf-8') as f:
        f.write(report)

    print(f"\n📄 Rapport généré : {REPORT_FILE}")

def main():
    parser = argparse.ArgumentParser(description='Migration des tags du blog')
    parser.add_argument('--dry-run', action='store_true',
                        help='Simulation sans modification des fichiers')
    args = parser.parse_args()

    print("="*60)
    print("🚀 MIGRATION DES TAGS DU BLOG")
    print("="*60)
    print()

    if args.dry_run:
        print("⚠️  MODE SIMULATION (--dry-run)")
        print("   Aucun fichier ne sera modifié\n")
    else:
        print("🔴 MODE PRODUCTION")
        print("   Les fichiers seront modifiés !\n")
        response = input("Continuer ? (oui/non) : ")
        if response.lower() not in ['oui', 'o', 'yes', 'y']:
            print("Annulé.")
            return

    # Charger le mapping
    print(f"📂 Chargement du mapping depuis {MAPPING_FILE}...")
    mapping = load_mapping()
    print(f"✅ {len(mapping)} mappings chargés\n")

    # Parcourir tous les articles
    all_stats = []

    for root, dirs, files in os.walk(POSTS_DIR):
        for file in sorted(files):
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                stats = process_file(filepath, mapping, dry_run=args.dry_run)
                if stats:
                    all_stats.append(stats)

    # Générer le rapport
    print("\n" + "="*60)
    print("📊 GÉNÉRATION DU RAPPORT")
    print("="*60)
    generate_report(all_stats, mapping)

    # Résumé final
    modified_count = sum(1 for s in all_stats if s['modified'])
    print("\n" + "="*60)
    print("✅ MIGRATION TERMINÉE")
    print("="*60)
    print(f"Articles traités : {len(all_stats)}")
    print(f"Articles modifiés : {modified_count}")
    print(f"Mode : {'SIMULATION' if args.dry_run else 'PRODUCTION'}")
    print()

    if args.dry_run:
        print("💡 Pour appliquer réellement les changements :")
        print("   python3 migrate_tags.py")
    else:
        print("✅ Les fichiers ont été modifiés avec succès !")
        print()
        print("📋 Prochaines étapes :")
        print("   1. Vérifier le rapport : cat RAPPORT_MIGRATION_TAGS.md")
        print("   2. Tester la génération du site")
        print("   3. Vérifier les pages de tags")
        print("   4. Commit et push")

if __name__ == '__main__':
    main()
