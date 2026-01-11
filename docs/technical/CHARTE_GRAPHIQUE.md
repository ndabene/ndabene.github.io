# Charte Graphique - ndabene.github.io

## Table des matières
1. [Palette de couleurs](#palette-de-couleurs)
2. [Typographie](#typographie)
3. [Espacements et Layout](#espacements-et-layout)
4. [Composants UI](#composants-ui)
5. [Animations](#animations)
6. [Breakpoints Responsive](#breakpoints-responsive)
7. [Ombres et Effets](#ombres-et-effets)

---

## 1. Palette de couleurs

### Couleurs de base
| Nom | Hex | Usage |
|-----|-----|-------|
| Blanc pur | `#FFFFFF` | Fond principal, éléments clairs |
| Noir journal | `#111827` | Texte principal |
| Gris anthracite | `#1E293B` | Texte secondaire, surfaces |
| Gris ardoise | `#475569` | Texte tertiaire |
| Gris clair | `#E2E8F0` | Bordures, séparateurs |
| Fond papier léger | `#FAFAFA` | Sections alternées |

### Couleurs primaires
| Nom | Hex | Usage |
|-----|-----|-------|
| Marine profond | `#0F172A` | Couleur primaire principale |
| Marine très sombre | `#020617` | Variante sombre de la primaire |

### Couleurs secondaires
| Nom | Hex | Usage |
|-----|-----|-------|
| Gris anthracite | `#1E293B` | Couleur secondaire |
| Noir journal | `#111827` | Texte principal |
| Gris lecture | `#374151` | Texte léger |

### Couleurs d'accentuation
| Nom | Hex | Usage |
|-----|-----|-------|
| Or sourd | `#D4AF37` | Achievements, badges premium |
| Vert technique | `#059669` | Validations, succès |

### Couleurs de feedback
| Nom | Hex | Usage |
|-----|-----|-------|
| Vert technique | `#059669` | Messages de succès |
| Rouge professionnel | `#DC2626` | Erreurs |
| Or sourd | `#D4AF37` | Avertissements |

### Couleurs spécifiques aux tags tech
| Nom | Hex | Usage |
|-----|-----|-------|
| PrestaShop | `#DF3163` | Tag PrestaShop |
| API | `#0F172A` | Tag API (primaire) |
| Integration | `#059669` | Tag intégration |
| E-commerce | `#F59E0B` | Tag e-commerce |

### Gradients
```scss
// Gradient primaire
linear-gradient(135deg, #0F172A 0%, #1E293B 100%)

// Gradient hero
linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)

// Gradient or
linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)
```

---

## 2. Typographie

### Familles de polices

#### Police principale (corps de texte)
- **Nom**: Inter
- **Poids disponibles**: 400, 500, 600, 700, 900
- **Import Google Fonts**:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet">
```

#### Police des titres
- **Nom**: Poppins
- **Poids disponibles**: 600, 700, 800, 900
- **Import Google Fonts**:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet">
```

#### Police monospace
- **Nom**: JetBrains Mono
- **Usage**: Code, données techniques

### Échelle typographique
| Élément | Taille | Poids | Hauteur de ligne |
|---------|--------|-------|------------------|
| H1 | 40px (2.5rem) | 700 | 1.3 |
| H2 | 32px (2rem) | 700 | 1.3 |
| H3 | 24px (1.5rem) | 700 | 1.3 |
| H4 | 20px (1.25rem) | 700 | 1.3 |
| Corps de texte | 16px (1rem) | 400 | 1.6 |
| Texte large | 18px (1.125rem) | 400 | 1.6 |
| Texte petit | 14px (0.875rem) | 400 | 1.6 |
| Texte extra-petit | 12px (0.75rem) | 400 | 1.6 |

### Poids de police
| Nom | Valeur |
|-----|--------|
| Regular | 400 |
| Medium | 500 |
| Semi-bold | 600 |
| Bold | 700 |
| Black | 900 |

---

## 3. Espacements et Layout

### Système d'espacement (basé sur 8px)
| Nom | Valeur | Usage |
|-----|--------|-------|
| xs | 4px (0.25rem) | Espacement minimal |
| sm | 8px (0.5rem) | Petit espacement |
| md | 16px (1rem) | Espacement standard |
| lg | 24px (1.5rem) | Grand espacement |
| xl | 32px (2rem) | Très grand espacement |
| 2xl | 40px (2.5rem) | Espacement extra-large |
| 3xl | 48px (3rem) | Espacement entre sections |
| 4xl | 64px (4rem) | Espacement très large |

### Conteneur
- **Largeur maximale**: 1200px
- **Padding latéral**: 24px (1.5rem)
- **Padding mobile**: 16px (1rem)

### Grilles
```scss
// Grille 2 colonnes
grid-template-columns: repeat(2, 1fr);
gap: 32px;

// Grille 3 colonnes
grid-template-columns: repeat(3, 1fr);
gap: 32px;
```

---

## 4. Composants UI

### Boutons

#### Bouton primaire
```scss
background: #0F172A;
color: #FFFFFF;
padding: 1rem 2rem;
border-radius: 8px;
font-weight: 600;
transition: all 0.3s ease-in-out;

// Hover
background: #020617;
transform: translateY(-2px);
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
```

#### Bouton secondaire
```scss
background: #FFFFFF;
color: #0F172A;
border: 1px solid #E2E8F0;
padding: 1rem 2rem;
border-radius: 8px;
```

#### Bouton outline
```scss
background: transparent;
color: #0F172A;
border: 2px solid #0F172A;
padding: 1rem 2rem;
border-radius: 8px;
```

### Cartes (Cards)
```scss
background: #FFFFFF;
border-radius: 8px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
padding: 1.5rem;
transition: all 0.3s ease-in-out;

// Hover
transform: translateY(-4px);
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
```

### Badges
```scss
padding: 0.25rem 0.5rem;
border-radius: 20px;
font-size: 14px (0.875rem);
font-weight: 500;
```

**Couleurs de badges par catégorie**:
- PHP/Symfony/Backend: `#0F172A`
- PrestaShop/E-commerce: `#ED8936`
- AI/ML: `#7C3AED`
- DevOps/Docker: `#38B2AC`
- Frontend/JavaScript: `#F59E0B`
- Database: `#059669`

### Border Radius
| Nom | Valeur | Usage |
|-----|--------|-------|
| None | 0 | Pas d'arrondi |
| Small | 4px (0.25rem) | Arrondi léger |
| Default | 8px (0.5rem) | Arrondi standard |
| Medium | 8px (0.5rem) | Arrondi moyen |
| Large | 12px (0.75rem) | Grand arrondi |
| XL | 16px (1rem) | Très grand arrondi |
| 2XL | 24px (1.5rem) | Arrondi extra-large |
| Full | 9999px | Arrondi complet (cercle) |

---

## 5. Animations

### Transitions de base
```scss
// Rapide
transition: 150ms ease-in-out;

// Normal
transition: 250ms ease-in-out;

// Lente
transition: 350ms ease-in-out;

// Base (par défaut)
transition: all 0.3s ease-in-out;
```

### Animations clés

#### Float (flottement)
```scss
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
animation: float 3s ease-in-out infinite;
```

#### Fade In Up
```scss
@keyframes fadeInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
animation: fadeInUp 0.8s ease-out;
```

#### Pulse
```scss
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
animation: pulse 2s infinite;
```

### Effets de hover

#### Lift (élévation)
```scss
transition: all 0.25s ease-in-out;

&:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

#### Scale (agrandissement)
```scss
transition: all 0.15s ease-in-out;

&:hover {
  transform: scale(1.05);
}
```

---

## 6. Breakpoints Responsive

| Nom | Valeur | Usage |
|-----|--------|-------|
| Mobile | 576px | Petits smartphones |
| Tablet | 768px | Tablettes |
| Desktop | 1024px | Ordinateurs |
| Large | 1200px | Grands écrans |

### Media queries
```scss
// Mobile
@media (max-width: 576px) { }

// Tablet
@media (max-width: 768px) { }

// Desktop
@media (max-width: 1024px) { }

// Large
@media (max-width: 1200px) { }
```

---

## 7. Ombres et Effets

### Ombres (Shadows)
```scss
// Small
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

// Medium
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

// Large
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);

// XL
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);

// Colored (avec couleur primaire)
box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
```

### Effet Glass (verre)
```scss
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### Z-Index Scale
| Élément | Valeur |
|---------|--------|
| Dropdown | 1000 |
| Sticky | 1020 |
| Fixed | 1030 |
| Modal backdrop | 1040 |
| Modal | 1050 |
| Popover | 1060 |
| Tooltip | 1070 |

---

## 8. Icons et Assets

### Logo
- Formats disponibles: PNG, WebP
- Localisation: `/assets/images/logo.png`, `/assets/images/logo.webp`

### Font Icons
Le site utilise Font Awesome pour les icônes.

---

## 9. Guidelines d'utilisation

### Principes de design
1. **Simplicité**: Design épuré et professionnel
2. **Lisibilité**: Hiérarchie typographique claire
3. **Cohérence**: Respect strict du système d'espacement
4. **Performance**: Optimisation des animations pour mobile
5. **Accessibilité**: Contraste suffisant, support reduced-motion

### Bonnes pratiques
- Toujours utiliser le système d'espacement (multiples de 8px)
- Respecter la hiérarchie typographique (H1 > H2 > H3 > H4)
- Utiliser les couleurs d'accentuation avec parcimonie
- Limiter les animations sur mobile pour les performances
- Tester sur différents breakpoints

### Palette de couleurs pour les états
```scss
// Hover sur liens
color: #1D4ED8; // Bleu légèrement plus clair

// Focus
outline: 2px solid #0F172A;
outline-offset: 2px;

// Disabled
opacity: 0.5;
cursor: not-allowed;
```

---

## 10. Exemples de mise en œuvre

### Section Hero
```scss
background: linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%);
padding: 3rem 0;

h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

p {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  color: #374151;
  line-height: 1.7;
}
```

### Card Component
```scss
.card {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
}
```

---

## Ressources

### Fichiers sources
- Variables: `_sass/variables.scss`
- Base: `_sass/base.scss`
- Composants: `_sass/components.scss`
- Animations: `_sass/animations.scss`

### Polices
- Inter: https://fonts.google.com/specimen/Inter
- Poppins: https://fonts.google.com/specimen/Poppins
- JetBrains Mono: https://www.jetbrains.com/lp/mono/

---

**Version**: 1.0
**Date**: 2025-11-25
**Auteur**: Nicolas Dabene

