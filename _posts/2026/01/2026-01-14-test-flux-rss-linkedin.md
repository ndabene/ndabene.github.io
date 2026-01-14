---
layout: post
title: "Test du flux RSS LinkedIn avec images"
date: 2026-01-14 10:00:00
lang: fr
ref: test-flux-rss-linkedin
author: Nicolas Dabène
categories: [Test, Automation]
tags: [LinkedIn, RSS, n8n, Automation]
excerpt: "Article de test pour valider le flux RSS LinkedIn avec support des images via n8n. Ce post permet de vérifier que les balises image_url et enclosure fonctionnent correctement."
image: /assets/images/blog/2026/01/google-ucp-prestashop-agentic-commerce/image-principale.webp
linkedin: true
published: true
---

# Test du flux RSS LinkedIn

Ceci est un article de test pour valider le nouveau flux RSS LinkedIn avec support des images.

## Objectifs du test

1. ✅ Vérifier que le flag `linkedin: true` filtre correctement les articles
2. ✅ Valider que la balise `<image_url>` est bien générée
3. ✅ Confirmer que la balise `<enclosure>` est présente
4. ✅ Tester l'URL absolue de l'image pour LinkedIn

## Configuration testée

- **Flux RSS** : `/linkedin.xml`
- **Image** : URL absolue générée automatiquement
- **Tags** : Formatés avec # pour LinkedIn
- **Excerpt** : Limité à 300 caractères

## Intégration n8n

Ce flux permet à n8n de :
- Récupérer automatiquement les nouveaux articles
- Extraire l'URL de l'image via `image_url`
- Publier sur LinkedIn avec l'image jointe

Si vous voyez ce post sur LinkedIn avec son image, c'est que le système fonctionne parfaitement ! 🎉

---

**Note** : Cet article est un test technique et sera supprimé une fois la validation effectuée.
