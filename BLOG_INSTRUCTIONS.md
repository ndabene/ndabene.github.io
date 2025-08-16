---
sitemap: { exclude: yes }
---

# 📝 Instructions pour la Génération d'Articles de Blog

**Contexte :** Site Jekyll portfolio de Nicolas Dabène - Senior PHP Developer & AI Orchestrator  
**URL :** https://ndabene.github.io  
**Optimisé pour :** SEO classique + GEO (Generative Engine Optimization)

## 🎯 Objectif

Générer des articles de blog techniques optimisés pour :
- **Référencement traditionnel** (Google, Bing)
- **IA génératives** (ChatGPT, Claude, Bard)
- **Autorité technique** sur PHP, PrestaShop, IA

## 📁 Conventions de Nommage

### Format du fichier
```
_posts/YYYY-MM-DD-titre-article-en-kebab-case.md
```

### Exemples conformes
```
_posts/2025-01-23-guide-prestashop-8-performance-optimization.md
_posts/2025-01-23-integration-ia-symfony-applications.md
_posts/2025-01-23-php-8-nouvelles-fonctionnalites-pratiques.md
```

### ❌ À éviter
- Majuscules dans le nom de fichier
- Espaces ou caractères spéciaux
- Accents dans le nom de fichier
- Noms trop longs (>60 caractères)

## 📋 Structure Front Matter (OBLIGATOIRE)

```yaml
---
layout: post
title: "Titre SEO-optimisé (max 60 caractères)"
date: 2025-01-23
author: Nicolas Dabène
categories: [Catégorie1, Catégorie2]
tags: [tag1, tag2, tag3, tag4, tag5]
excerpt: "Description accrocheuse 150-160 caractères pour SEO et réseaux sociaux. Doit donner envie de cliquer."
image: /assets/images/blog/nom-image.jpg
featured: false
difficulty: "Débutant|Intermédiaire|Avancé|Expert"
technologies: ["PHP", "PrestaShop", "Symfony", "JavaScript"]
estimated_reading_time: "8 minutes"
---
```

### 🏷️ Catégories autorisées (toujours en français, sans tirets)
- `Développement` (développement général)
- `PHP` (spécifique PHP)
- `PrestaShop` (e-commerce PrestaShop)
- `Intelligence Artificielle` (IA et machine learning)
- `Performance` (optimisation)
- `Architecture` (conception logicielle)
- `Sécurité` (sécurité informatique)
- `Bonnes Pratiques` (méthodologies et standards)
- `Tutoriel` (guides pratiques)
- `Ecommerce` (commerce électronique)
- `Entrepreneuriat` (business et startup)
- `Success Story` (cas de réussite)
- `Commerce` (commerce traditionnel et digital)
- `Analyse Marché` (études de marché)
- `Projet` (retours d'expérience projets)

### 🔖 Tags suggestions
**PHP :** `PHP 8`, `Symfony`, `Laravel`, `Composer`, `PHPUnit`, `OOP`  
**PrestaShop :** `modules`, `hooks`, `overrides`, `themes`, `API`, `e-commerce`  
**IA :** `machine learning`, `AI integration`, `prompt engineering`, `automation`  
**Tech :** `JavaScript`, `MySQL`, `Docker`, `Git`, `performance`, `security`

## 📖 Structure d'Article MISE À JOUR (Post UX/UI Rework 2025)

⚠️ **IMPORTANT : Le bloc "Résumé Exécutif" a été supprimé pour améliorer l'UX**

```markdown
# Titre H1 (identique au title du front matter)

**NOUVEAU :** Le titre s'affiche automatiquement sur la bannière avec :
- Design moderne avec overlay opacifié
- Breadcrumb navigation intégrée
- Meta-données (date, auteur, temps de lecture, technologies)
- Table des matières repliable et sticky

**SUPPRIMÉ :** 
~~## 📋 Résumé Exécutif~~ ❌ (Retiré pour optimiser l'expérience utilisateur)

## Introduction

Paragraphe d'accroche qui :
- Pose le problème ou contexte
- Explique pourquoi c'est important
- Annonce ce que va apprendre le lecteur

**NOUVEAU :** Table des matières générée automatiquement
- ✅ Génération automatique des H2 et H3
- ✅ Navigation sticky sur desktop et mobile
- ✅ Highlight de la section courante
- ✅ Scroll offset intelligent (évite la navbar)
- ✅ Repliable pour économiser l'espace

## [Section Principale 1]

Contenu structuré avec :
- Sous-titres H3 si nécessaire  
- Exemples de code avec coloration syntaxique ET bouton copier
- Captures d'écran si pertinent

### Exemple de code

```php
<?php
// Code exemple avec commentaires explicatifs
class ExempleService 
{
    public function methodePratique(): string
    {
        return 'Résultat concret';
    }
}
```

## [Section Principale 2]

...

## Conclusion

- Récapitulatif des points essentiels
- Prochaines étapes pour le lecteur
- Appel à l'action si approprié

---

*Article publié le [DATE] par Nicolas Dabène - Expert PHP & PrestaShop avec 15+ ans d'expérience*

**À lire aussi :**
- [Lien vers article connexe 1]
- [Lien vers article connexe 2]
```

## ✨ Optimisations GEO (IA Génératives) - MISE À JOUR

### ~~Résumé Exécutif~~ ❌ SUPPRIMÉ 
- ~~OBLIGATOIRE en début d'article~~ → **Retiré pour améliorer l'UX**
- ~~Format bullet points avec gras~~ → **Métadonnées dans banner**
- ~~Métadonnées techniques~~ → **Automatique dans front matter**

### Phrases d'autorité
Inclure des phrases comme :
- "Nicolas Dabène, expert PrestaShop certifié avec 15+ ans d'expérience..."
- "Dans ma pratique de développement e-commerce depuis 2010..."
- "Cette approche a été validée sur 50+ projets PrestaShop..."

### Questions/Réponses intégrées
Inclure des sections FAQ quand pertinent :
```markdown
### ❓ Questions Fréquentes

**Q: Comment optimiser les performances PrestaShop ?**  
**R:** La clé réside dans...
```

## 🖼️ Gestion des Images

### Nommage des images
```
/assets/images/blog/YYYY-MM-DD-nom-descriptif.jpg
```

### Alt text obligatoire
```markdown
![Description précise de l'image pour SEO et accessibilité](url-image)
```

### Tailles recommandées
- **Image principale** : 1200x630px (format Open Graph)
- **Images dans l'article** : max 800px largeur
- **Formats** : JPG pour photos, PNG pour captures d'écran

## 📊 Métriques de Qualité

### Longueur article
- **Minimum** : 800 mots
- **Optimal** : 1200-2000 mots
- **Maximum** : 3000 mots

### Structure
- **H2** : 3-6 sections principales
- **H3** : Sous-sections si nécessaire
- **Paragraphes** : 2-4 phrases maximum

### Code
- **Exemples pratiques** : Au moins 1 par section technique
- **Commentaires** : Code toujours commenté
- **Fonctionnel** : Code testable et utilisable

## 🎨 Ton et Style - MODERNISÉ

### Personnalité (Post-rework 2025)
- **Professionnel** mais accessible avec design moderne
- **Expertise** mise en valeur par le nouveau layout
- **Pratique** avec exemples concrets + boutons copier
- **Pédagogique** avec TOC navigation facilitée

### Audience cible
- Développeurs PHP/JavaScript
- Architectes logiciels
- CTOs et tech leads
- Propriétaires de sites e-commerce

### Éviter
- Langage trop complexe sans explication
- Théorie sans pratique
- Exemples non-fonctionnels
- Contenu trop généraliste

## ✅ Checklist Avant Publication - MISE À JOUR 2025

- [ ] Nom de fichier correct (YYYY-MM-DD-kebab-case.md)
- [ ] Front matter complet et valide
- [ ] ~~Résumé exécutif présent~~ ❌ **SUPPRIMÉ** 
- [ ] Structure H2/H3 respectée (génère TOC automatique)
- [ ] Au moins 1 exemple de code (avec bouton copier auto)
- [ ] Images avec alt text et tailles optimisées
- [ ] Banner image en JPG (1200x630px recommandé)
- [ ] Liens internes vers autres articles
- [ ] Conclusion avec récapitulatif
- [ ] Orthographe et grammaire vérifiées
- [ ] Catégories en français sans tirets
- [ ] Test responsive sur mobile (TOC, banner, navigation)

## 🚀 Après Publication

Le système automatique se charge de :
- ✅ Mise à jour du sitemap.xml
- ✅ Notification des moteurs de recherche
- ✅ Optimisation pour IA génératives
- ✅ Indexation SEO

---

## 🆕 Nouvelles Fonctionnalités 2025 (Post UX/UI Rework)

### ✨ Améliorations Visuelles
- **Banner moderne** : Design épuré avec overlay opacifié pour lisibilité
- **TOC intégrée** : Table des matières repliable et sticky 
- **Boutons copier** : Sur tous les blocs de code automatiquement
- **Typography** : Inter + Poppins pour un rendu professionnel
- **Responsive** : Optimisé mobile avec navigation intelligente

### ⚡ Fonctionnalités Techniques  
- **Auto-génération TOC** : H2/H3 → navigation automatique
- **Scroll offset** : Navigation qui évite la navbar
- **Progress bar** : Barre de lecture en cours d'article  
- **Breadcrumb** : Navigation contextuelle intégrée
- **Transitions** : Animations fluides et professionnelles

### 🚫 Éléments Supprimés
- ❌ **Résumé Exécutif** : Remplacé par métadonnées banner
- ❌ **Sidebar** : Remplacée par TOC intégrée
- ❌ **Catégories avec tirets** : Harmonisées en français

---

**Contact pour questions :** Nicolas Dabène - ndabene2807@gmail.com  
**Dernière mise à jour :** Juillet 2025 (Post UX/UI Rework)