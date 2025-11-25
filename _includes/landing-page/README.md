# 🎨 Système de Landing Pages Modulaires

Ce système permet de créer des landing pages produits avec **différents designs** en réutilisant des composants flexibles.

## 📦 Composants Disponibles

### 1. Navigation (`navigation.html`)

**Paramètres :**
```yaml
logo: "url/to/logo.jpg"
product_name: "Mon Produit"
badge_text: "Module"
badge_icon: "fab fa-prestashop"
nav_links:
  - text: "Features"
    href: "#features"
  - text: "Pricing"
    href: "#pricing"
cta_text: "Get Now"
cta_url: "https://..."
style: 'modern' | 'minimal' | 'glassmorphism'
sticky: true
```

**Exemple :**
```liquid
{% include landing-page/navigation.html
  logo="https://example.com/logo.jpg"
  product_name="MCP Tools Plus"
  badge_text="Module"
  badge_icon="fab fa-prestashop"
  nav_links=page.nav_links
  cta_text="Acheter"
  cta_url=page.product.addons_url
  style='glassmorphism'
%}
```

---

### 2. Hero (`hero.html`)

**Paramètres :**
```yaml
layout: 'split' | 'centered' | 'minimal'
theme: 'gradient' | 'solid' | 'image'
title: "Titre <span class='text-gold'>accentué</span>"
subtitle: "Description..."
badges:
  - text: "PrestaShop 8.2+"
    icon: "fab fa-prestashop"
    color: "prestashop"
  - text: "AI Ready"
    icon: "fas fa-robot"
    color: "integration"
price: "9,90€"
price_period: "HT / Mois"
price_features:
  - "40+ outils inclus"
  - "Mises à jour incluses"
cta_primary_text: "Obtenir maintenant"
cta_primary_url: "https://..."
cta_secondary_text: "En savoir plus"
cta_secondary_url: "#features"
trust_badges:
  - "PrestaShop 8.2+"
  - "PHP 8.1+"
  - "Multistore Safe"
banner_text: "Par BusinessTech — Platinum Partner"
banner_icon: "fab fa-prestashop"
image_code_block: "<div>...</div>"
```

**Styles Disponibles :**
- **`split`** : Hero 2 colonnes (texte + image)
- **`centered`** : Hero centré
- **`minimal`** : Hero minimaliste

**Thèmes :**
- **`gradient`** : Fond dégradé
- **`solid`** : Fond uni
- **`image`** : Image de fond

---

### 3. Features Grid (`features-grid.html`)

**Paramètres :**
```yaml
title: "Pourquoi choisir ce produit ?"
subtitle: "Description..."
features:
  - icon: "fas fa-chart-line"
    icon_color: "#0F172A"
    title: "Analytics Ventes"
    description: "Suivez vos ventes en temps réel..."
  - icon: "fas fa-lock"
    icon_color: "#D4AF37"
    title: "Sécurisé"
    description: "Données cryptées..."
columns: 2 | 3 | 4
style: 'cards' | 'minimal' | 'bordered'
bg: 'white' | 'gray'
```

**Styles :**
- **`cards`** : Cartes avec ombre et hover
- **`minimal`** : Sans bordure
- **`bordered`** : Avec bordure

---

### 4. CTA Section (`cta-section.html`)

**Paramètres :**
```yaml
title: "Prêt à commencer ?"
subtitle: "Lancez-vous maintenant..."
banner_text: "Offre limitée"
banner_icon: "fas fa-fire"
price: "9,90€"
price_period: "HT / Mois"
cta_text: "Obtenir maintenant"
cta_url: "https://..."
cta_icon: "fab fa-prestashop"
style: 'gradient' | 'solid' | 'outlined'
```

---

## 🚀 Exemples d'Utilisation

### Exemple 1 : Landing Page Moderne (MCP Tools Plus)

```markdown
---
layout: product-landing
title: "Mon Produit"
nav_links:
  - text: "Features"
    href: "#features"
  - text: "Pricing"
    href: "#pricing"
---

{% include landing-page/navigation.html
  logo="https://..."
  product_name="MCP Tools Plus"
  nav_links=page.nav_links
  cta_url="https://addons.prestashop.com/..."
  style='glassmorphism'
%}

{% capture code_block %}
<div class="code-block p-6">
  <!-- Votre code block ici -->
</div>
{% endcapture %}

{% include landing-page/hero.html
  layout='split'
  theme='gradient'
  title='Module pour <span class="text-gold">IA & Analytics</span>'
  subtitle="Description..."
  price="9,90€"
  price_period="HT / Mois"
  price_features=page.price_features
  image_code_block=code_block
%}

{% include landing-page/features-grid.html
  title="Pourquoi MCP Tools Plus ?"
  features=page.features
  columns=3
  style='cards'
%}

{% include landing-page/cta-section.html
  title="Prêt à commencer ?"
  price="9,90€"
  cta_url="https://..."
%}
```

---

### Exemple 2 : Landing Page Minimaliste

```markdown
---
layout: product-landing
title: "Produit Simple"
---

{% include landing-page/navigation.html
  product_name="Simple Product"
  style='minimal'
  sticky=false
%}

{% include landing-page/hero.html
  layout='centered'
  theme='solid'
  title='Solution Simple et Efficace'
  subtitle="Sans fioritures, juste l'essentiel"
  cta_primary_text="Commencer"
%}

{% include landing-page/features-grid.html
  features=page.features
  columns=2
  style='minimal'
  bg='white'
%}
```

---

### Exemple 3 : Landing Page Premium

```markdown
---
layout: product-landing
title: "Produit Premium"
---

{% include landing-page/navigation.html
  product_name="Premium Product"
  style='glassmorphism'
  badge_text="Premium"
%}

{% include landing-page/hero.html
  layout='centered'
  theme='gradient'
  title='L\'Excellence à Votre Portée'
  banner_text="Offre de lancement -30%"
  banner_icon="fas fa-fire"
  price="99€"
  price_period="HT / An"
%}

{% include landing-page/features-grid.html
  features=page.features
  columns=4
  style='bordered'
  bg='gray'
%}

{% include landing-page/cta-section.html
  title="Rejoignez nos 1000+ clients"
  style='outlined'
%}
```

---

## 🎨 Personnalisation Avancée

### Option 1 : Utiliser les Includes (Recommandé)
✅ Design cohérent
✅ Maintenance facile
✅ Réutilisable

### Option 2 : HTML Custom dans le .md
✅ Liberté totale
✅ Design unique
⚠️ Moins maintenable

### Option 3 : Hybride (Meilleur des deux mondes)
✅ Includes pour sections standard
✅ HTML custom pour sections spécifiques
✅ Équilibre flexibilité/maintenabilité

**Exemple Hybride :**
```markdown
{% include landing-page/navigation.html ... %}
{% include landing-page/hero.html ... %}

<!-- Section custom unique à ce produit -->
<section class="py-24 bg-gradient-to-r from-purple-500 to-pink-500">
  <div class="max-w-[1200px] mx-auto">
    <h2>Ma Section Custom</h2>
    <!-- Design complètement personnalisé -->
  </div>
</section>

{% include landing-page/features-grid.html ... %}
{% include landing-page/cta-section.html ... %}
```

---

## 📚 Variables Front Matter

Définissez vos données dans le front matter pour les réutiliser :

```yaml
---
layout: product-landing
title: "Mon Produit"

# Navigation
nav_links:
  - text: "Features"
    href: "#features"
  - text: "Docs"
    href: "#docs"

# Hero
hero_title: "Titre produit"
price_features:
  - "Feature 1"
  - "Feature 2"

# Features
features:
  - icon: "fas fa-star"
    icon_color: "#D4AF37"
    title: "Feature 1"
    description: "Description..."
  - icon: "fas fa-lock"
    icon_color: "#059669"
    title: "Feature 2"
    description: "Description..."
---
```

Puis utilisez-les :
```liquid
{% include landing-page/hero.html
  title=page.hero_title
  price_features=page.price_features
%}
```

---

## 🎯 Bonnes Pratiques

1. **Définir les données dans le front matter** - Plus propre et réutilisable
2. **Utiliser les includes pour sections communes** - Navigation, footer, CTA
3. **HTML custom pour sections uniques** - Démos, témoignages, pricing complexe
4. **Tester mobile-first** - Tous les composants sont responsive
5. **Cohérence visuelle** - Utilisez les mêmes couleurs/styles pour une gamme de produits

---

## 🔧 Layouts Disponibles

- **`product-landing.html`** : Layout de base avec styles CSS inclus
- Ajoutez vos propres layouts si besoin !

---

## 🆘 Support

Questions ? Consultez :
- Exemples dans `/pages/modules/`
- Code source des includes dans `/_includes/landing-page/`
