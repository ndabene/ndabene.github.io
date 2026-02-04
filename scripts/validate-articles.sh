#!/usr/bin/env bash
set -euo pipefail

python <<'PY'
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
import re
import sys

try:
    import yaml  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    yaml = None


ROOTS = {
    "fr": Path("_posts"),
    "en": Path("_posts_en"),
}


@dataclass
class Article:
    path: Path
    lang_scope: str
    title: str | None
    lang: str | None
    ref: str | None


def parse_frontmatter(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}
    frontmatter = parts[1]
    if yaml is not None:
        data = yaml.safe_load(frontmatter) or {}
        if isinstance(data, dict):
            return data
    data = {}
    for line in frontmatter.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip().strip("'\"")
    return data


def collect_articles() -> list[Article]:
    articles: list[Article] = []
    for lang, root in ROOTS.items():
        for path in sorted(root.rglob("*.md")):
            meta = parse_frontmatter(path)
            articles.append(
                Article(
                    path=path,
                    lang_scope=lang,
                    title=meta.get("title"),
                    lang=meta.get("lang"),
                    ref=meta.get("ref"),
                )
            )
    return articles


articles = collect_articles()
errors: list[str] = []
warnings: list[str] = []

# 1. Forbidden suffixes
for article in articles:
    if article.path.name.endswith(("-fr.md", "-en.md")):
        errors.append(f"Suffixe interdit: {article.path}")

# 2. Misplaced files (outside YYYY/MM)
for article in articles:
    try:
        rel = article.path.relative_to(ROOTS[article.lang_scope])
    except ValueError:
        errors.append(f"Chemin invalide: {article.path}")
        continue
    if len(rel.parts) < 3:
        errors.append(f"Fichier mal placé: {article.path}")
        continue
    year, month = rel.parts[0], rel.parts[1]
    if not re.fullmatch(r"\d{4}", year) or not re.fullmatch(r"\d{2}", month):
        errors.append(f"Fichier mal placé: {article.path}")

# 3. Duplicate titles (per language)
titles_seen: dict[tuple[str, str], Path] = {}
for article in articles:
    if not article.title:
        continue
    key = (article.lang_scope, article.title.strip().lower())
    if key in titles_seen:
        errors.append(
            "Doublon de titre (%s): %s <> %s"
            % (article.lang_scope, titles_seen[key], article.path)
        )
    else:
        titles_seen[key] = article.path

# 4. Coherence lang/ref
for article in articles:
    if article.lang_scope == "en":
        if article.lang != "en":
            errors.append(f"lang manquant/incorrect (en attendu): {article.path}")
        if not article.ref:
            errors.append(f"ref manquant pour article EN: {article.path}")
    elif article.lang and article.lang != "fr":
        errors.append(f"lang incorrect (fr attendu): {article.path}")
    if article.lang and not article.ref:
        errors.append(f"lang défini sans ref: {article.path}")

# 5. Bilingual correspondences FR/EN
refs: dict[str, dict[str, Article]] = {}
for article in articles:
    if not article.ref:
        continue
    refs.setdefault(article.ref, {})[article.lang_scope] = article

fr_only = [ref for ref, by_lang in refs.items() if "fr" in by_lang and "en" not in by_lang]
en_only = [ref for ref, by_lang in refs.items() if "en" in by_lang and "fr" not in by_lang]
if fr_only:
    warnings.append(
        "Refs FR sans équivalent EN: " + ", ".join(sorted(fr_only))
    )
if en_only:
    warnings.append(
        "Refs EN sans équivalent FR: " + ", ".join(sorted(en_only))
    )

# 6. Filename parity between FR/EN
for ref, by_lang in refs.items():
    if "fr" not in by_lang or "en" not in by_lang:
        continue
    fr_name = by_lang["fr"].path.name
    en_name = by_lang["en"].path.name
    if fr_name != en_name:
        warnings.append(
            f"Nom de fichier différent pour ref {ref}: {fr_name} <> {en_name}"
        )

# 7. General stats
stats = {
    "fr": sum(1 for a in articles if a.lang_scope == "fr"),
    "en": sum(1 for a in articles if a.lang_scope == "en"),
    "refs": len(refs),
}

print("=== Validation des articles ===")
for message in errors:
    print(f"ERROR: {message}")
for message in warnings:
    print(f"WARNING: {message}")

print("---")
print(f"Articles FR: {stats['fr']}")
print(f"Articles EN: {stats['en']}")
print(f"Refs bilingues: {stats['refs']}")

if errors:
    sys.exit(1)
PY
