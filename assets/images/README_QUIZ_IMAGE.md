# Instructions pour l'image OpenGraph des quiz

## 📋 Action requise

Une image OpenGraph par défaut doit être créée pour les pages de quiz.

### Fichier attendu
- **Chemin**: `/assets/images/quiz-og-default.jpg`
- **Dimensions**: 1200 × 630 pixels
- **Format**: JPG
- **Taille**: < 300 KB

### Options de création

#### Option 1: Générer avec une IA (Recommandé)
Utilisez le prompt détaillé dans `QUIZ_OG_IMAGE_PROMPT.md` avec :
- DALL-E 3 (ChatGPT Plus)
- Midjourney
- Stable Diffusion XL

#### Option 2: Créer manuellement
Utilisez Canva, Figma ou Photoshop avec les instructions dans `QUIZ_OG_IMAGE_PROMPT.md`

#### Option 3: Convertir le placeholder SVG
```bash
# Si vous avez ImageMagick installé
convert -background none -density 300 quiz-og-placeholder.svg -resize 1200x630 -quality 90 quiz-og-default.jpg
```

## 📁 Fichiers actuels

- `QUIZ_OG_IMAGE_PROMPT.md` - Prompts et instructions détaillées
- `quiz-og-placeholder.svg` - Image SVG temporaire (non utilisée pour OG)

## ✅ Une fois l'image créée

1. Placer `quiz-og-default.jpg` dans `/assets/images/`
2. Vérifier que le code dans `_includes/head.html` (lignes 142-148) fonctionne
3. Tester avec les validateurs :
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

## 🎨 Personnalisation par quiz (optionnel)

Pour une image spécifique à un quiz, ajoutez dans le front matter :

```yaml
image: /assets/images/quiz/prestashop-9-specific.jpg
```

Le système utilisera automatiquement cette image à la place de l'image par défaut.
