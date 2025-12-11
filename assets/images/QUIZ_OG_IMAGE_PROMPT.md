# Image OpenGraph pour les Quiz - Prompt de génération

## Spécifications techniques
- **Dimensions**: 1200 × 630 pixels (format OpenGraph standard)
- **Format**: JPG ou WebP
- **Poids**: < 300KB pour optimiser le chargement
- **Nom du fichier**: `quiz-og-default.jpg`
- **Emplacement**: `/assets/images/quiz-og-default.jpg`

## Prompt pour IA générative d'images (DALL-E, Midjourney, Stable Diffusion)

```
Create a modern, professional OpenGraph image (1200x630px) for an interactive tech quiz platform.

Design elements:
- Dark gradient background (deep navy #0F172A to slate #1E293B)
- Main title text: "Quiz Technique" in large, bold, modern sans-serif font (white)
- Subtitle: "Testez vos compétences" in smaller text (light gray/white)
- Abstract geometric shapes: hexagons, circuits, or code symbols in subtle opacity
- Color accents: vibrant cyan (#06B6D4) or purple (#8B5CF6) highlights
- Minimalist tech/coding aesthetic with clean lines
- Professional corporate style suitable for developers and technical professionals
- Include subtle binary code or programming symbols in the background
- Modern glassmorphism effect with semi-transparent elements
- Ensure text is highly readable when shared on social media

Style: Modern, tech-focused, professional, minimalist
Mood: Smart, challenging, engaging, professional
Target audience: Developers, software architects, technical professionals
```

## Prompt alternatif (plus descriptif)

```
Design a 1200x630 pixel OpenGraph social media card for a technical quiz platform about PrestaShop and PHP development.

Visual composition:
1. Background:
   - Deep gradient from dark navy (#0F172A) top-left to slate gray (#1E293B) bottom-right
   - Subtle grid pattern or circuit board texture at 5% opacity

2. Main elements:
   - Large centered title "QUIZ TECHNIQUE" in bold Poppins or Inter font, white color
   - Subtitle below: "Évaluez vos compétences" in lighter weight, 60% opacity
   - 3-4 floating abstract elements: question mark icon, code brackets {}, hexagons
   - Subtle glow effects around key elements using cyan (#06B6D4) accent color

3. Additional details:
   - Small "Nicolas Dabène" watermark in bottom right corner
   - Decorative elements: dotted lines, small nodes, connecting lines suggesting a network
   - Modern tech icons: PHP logo ghost, Symfony symbol, or generic code symbols at 8% opacity

4. Typography:
   - All text must be crisp and highly legible
   - Use contemporary tech fonts (Inter, Poppins, or JetBrains Mono for code elements)
   - High contrast between text and background

5. Overall aesthetic:
   - Professional Silicon Valley startup vibe
   - Clean, modern, minimalist
   - Sophisticated tech branding
   - Would look premium on LinkedIn, Twitter, Facebook
```

## Instructions de création manuelle (Figma, Canva, Photoshop)

### Option 1 : Canva
1. Créer un design personnalisé 1200 × 630 px
2. Ajouter un rectangle plein écran avec gradient :
   - Couleur 1: #0F172A (coin supérieur gauche)
   - Couleur 2: #1E293B (coin inférieur droit)
3. Ajouter le texte principal "QUIZ TECHNIQUE" :
   - Police: Poppins ExtraBold ou Inter Bold
   - Taille: 96-110px
   - Couleur: #FFFFFF
   - Position: Centré
4. Ajouter le sous-titre "Testez vos compétences" :
   - Police: Poppins Regular
   - Taille: 36-42px
   - Couleur: #94A3B8 (gray-400)
   - Position: Sous le titre principal
5. Ajouter des éléments décoratifs :
   - Formes géométriques (hexagones, cercles)
   - Couleur: #06B6D4 ou #8B5CF6 avec 20% d'opacité
6. Exporter en JPG qualité maximale

### Option 2 : Figma
1. Frame 1200 × 630
2. Linear gradient background (135deg)
3. Add text layers with auto-layout
4. Export as JPG 2x for high quality

## Placement et configuration

### 1. Uploader l'image
Placer le fichier généré à :
```
/assets/images/quiz-og-default.jpg
```

### 2. Modifier le fichier head.html
Mettre à jour la section OpenGraph (lignes 130-136) :

```liquid
{% if page.layout == 'product' and page.product %}
  {% assign _og_image = page.product.image | absolute_url %}
{% elsif page.layout == 'quiz' %}
  {% assign _og_image = '/assets/images/quiz-og-default.jpg' | absolute_url %}
{% elsif page.image %}
  {% assign _og_image = page.image | absolute_url %}
{% else %}
  {% assign _og_image = '/assets/images/hero/profile-hero.jpg' | absolute_url %}
{% endif %}
```

### 3. (Optionnel) Créer des versions spécifiques par quiz
Pour des images personnalisées par quiz, ajouter dans le front matter :
```yaml
image: /assets/images/quiz/prestashop-9-quiz.jpg
```

## Validation

Après ajout de l'image, tester avec :
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Notes

- L'image actuelle par défaut est : `/assets/images/hero/profile-hero.jpg`
- Cette nouvelle image sera spécifique aux quiz uniquement
- Permet une meilleure identification visuelle des quiz lors du partage
