# 🏷️ Script d'Harmonisation des Tags

## Description

Ce script Python harmonise automatiquement les tags des articles du blog selon un mapping prédéfini pour garantir la cohérence SEO et l'expérience utilisateur.

## Utilisation

### Mode Simulation (Dry Run)

Affiche les changements sans les appliquer :

```bash
python3 harmonize_tags.py
```

### Mode Production

Applique réellement les modifications :

```bash
python3 harmonize_tags.py --apply
```

### Options

- `--apply` : Applique les modifications (par défaut : simulation)
- `--posts-dir <dir>` : Répertoire des posts (défaut : `_posts`)

## Fonctionnement

Le script :

1. **Scanne** tous les fichiers `.md` dans `_posts/`
2. **Extrait** le front matter YAML de chaque article
3. **Compare** les tags avec le mapping de remplacement
4. **Remplace** les tags selon les règles définies
5. **Sauvegarde** les fichiers modifiés (mode `--apply`)
6. **Génère** un rapport détaillé des modifications

## Règles d'Harmonisation

Le mapping de remplacement est défini dans le script :

### Corrections Critiques (Impact SEO)

| Ancien Tag | Nouveau Tag | Raison |
|------------|-------------|--------|
| `AI` | `IA` | Cohérence linguistique |
| `Intelligence Artificielle` | `IA` | Consolidation |
| `AI integration` | `intégration IA` | Traduction + cohérence |
| `IA integration` | `intégration IA` | Traduction |
| `ecommerce` | `e-commerce` | Orthographe standard |

### Automatisation

| Ancien Tag | Nouveau Tag |
|------------|-------------|
| `automation` | `automatisation` |
| `Automatisation` | `automatisation` |
| `design automation` | `automatisation design` |

### Noms Propres (Casse)

| Ancien Tag | Nouveau Tag |
|------------|-------------|
| `prestashop` | `PrestaShop` |
| `symfony` | `Symfony` |

### Simplifications

| Ancien Tag | Nouveau Tag |
|------------|-------------|
| `Gemini AI` | `Gemini` |
| `Copilot` | `GitHub Copilot` |
| `Agents` | `agents IA` |

### Casse Minuscule

| Ancien Tag | Nouveau Tag |
|------------|-------------|
| `No-code` | `no-code` |
| `Startup` | `startup` |
| `Prompt Engineering` | `prompt engineering` |
| `Module` | `modules` |

### Traductions

| Ancien Tag | Nouveau Tag |
|------------|-------------|
| `code quality` | `qualité du code` |
| `cloud development` | `développement cloud` |
| `protocol` | `protocols` |

## Intégration CI/CD

Le script est automatiquement exécuté lors de chaque build via GitHub Actions :

### Workflow Principal (`jekyll.yml`)

```yaml
- name: Harmonize tags
  run: |
    echo "🏷️  Harmonisation automatique des tags..."
    python3 harmonize_tags.py --apply
    echo "✅ Tags harmonisés avec succès"
```

### Workflow Quotidien (`daily-build.yml`)

Même étape ajoutée pour le build quotidien.

## Avantages

### SEO
- ✅ Consolidation des pages de tags
- ✅ Meilleur ranking sur les tags principaux
- ✅ Réduction de la fragmentation

### UX
- ✅ Navigation cohérente
- ✅ Découvrabilité améliorée
- ✅ Professionnalisme

### Maintenance
- ✅ Automatique à chaque build
- ✅ Pas d'intervention manuelle
- ✅ Garantie de cohérence

## Ajouter de Nouvelles Règles

Pour ajouter de nouvelles règles d'harmonisation, éditez le dictionnaire `TAG_REPLACEMENTS` dans le script :

```python
TAG_REPLACEMENTS = {
    # Vos nouvelles règles ici
    "ancien_tag": "nouveau_tag",
    ...
}
```

## Rapport de Modifications

Le script génère un rapport détaillé incluant :

- 📁 Nombre de fichiers scannés
- ✏️ Nombre de fichiers modifiés
- 🏷️ Nombre de tags remplacés
- 📄 Liste détaillée des changements par fichier

### Exemple de Sortie

```
================================================================================
📊 RAPPORT D'HARMONISATION DES TAGS
================================================================================

📁 Fichiers scannés : 54
✏️  Fichiers modifiés : 18
🏷️  Tags remplacés : 26

================================================================================
DÉTAIL DES MODIFICATIONS
================================================================================

📄 2025-11-20-agents-ia-ecommerce-mcp.md
   • 'AI' → 'IA'
   • 'Agents' → 'agents IA'
```

## Dépendances

- Python 3.11+
- PyYAML

Installation :

```bash
pip install pyyaml
```

## Fichiers Liés

- `harmonize_tags.py` - Script principal
- `RAPPORT_HARMONISATION_TAGS.md` - Analyse complète des tags
- `.github/workflows/jekyll.yml` - Workflow GitHub Actions
- `.github/workflows/daily-build.yml` - Workflow quotidien

## Support

Pour toute question ou demande de modification des règles d'harmonisation, référez-vous au `RAPPORT_HARMONISATION_TAGS.md`.

## Impact Mesuré

Selon l'analyse initiale :

- **18 articles** nécessitaient des corrections
- **26 tags** ont été harmonisés
- **Impact SEO estimé** : +15-25% de trafic organique sur les pages de tags
- **Consolidation** : de 238 à ~200 tags uniques

---

**Dernière mise à jour** : 9 novembre 2025
