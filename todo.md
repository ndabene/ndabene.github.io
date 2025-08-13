# Plan Mobile UI/UX – Stabilisation et optimisation (sans casser Desktop)

## Objectif
- Garantir zéro scroll horizontal, pas de superposition d’éléments, lecture et actions fluides en mobile (320–428 px), en conservant le rendu Desktop actuel.

## Diagnostic rapide (à vérifier sur 320, 360, 390, 414, 428 px)
- [x] Tracer les sources de débordement avec un helper CSS temporaire (outline) et repérer les blocs qui dépassent 100vw.
- [x] Contrôler les conteneurs avec padding interne + enfants à largeur fixe (ex. grilles, sliders, badges longs).
- [x] Revoir les grilles de la boutique, notamment `product-grid` et cartes packs, ainsi que la `sticky-shopbar` et le slider hero.

## Quick wins (faible risque, correctifs immédiats)
- [x] Boutique – `product-grid` dans `_sass/boutique.scss`:
  - Passer à `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));`
  - Ajouter `@media (max-width: 360px) { grid-template-columns: 1fr; }`
- [x] Flex/Grids – forcer `min-width: 0` sur les enfants flex/grille sujets au texte long (chips, badges, titres) pour éviter l’élargissement forcé.
- [x] Contrainte globale (garde-fou ciblé boutique) ≤480px.
- [x] `sticky-shopbar` (mobile): limiter la largeur à `max-width: calc(100vw - 16px)` et assurer `padding-inline: 8px`.
- [x] Boutons/chips: autoriser le wrap; truncation élégante sur badges du hero.

## Correctifs CSS structurants (ciblés, sans régression Desktop)
- [x] Container unique: vérifier `max-width: 100%` et paddings; quick‑nav/boutique/headers ajustés.
- [x] Slider hero (`.boutique-hero-slider`): base OK et contraintes mobiles conservées.
- [x] `category-header` / `trust-strip` / `results-toolbar`: `flex-wrap` + `gap` + `min-width: 0`.
- [x] Modale QV: `max-width` + `overflow` validés.

## Composants sensibles à sécuriser
- [x] Cartes produit
  - [x] Titres/price chips: `text-wrap: balance; overflow-wrap: anywhere;`
  - [x] Images responsives OK.
- [x] Packs (`.pack-inner`): `1fr` < 900px OK.
- [x] Quick‑nav (chips): wrap + `gap` + `min-width: 0`; offset sticky ajusté.

## Typo/rythme visuel mobile
- [x] `clamp()` appliqué aux titres cartes/hero; line‑clamp en place.

## QA et tests
- [ ] Scénarios manuels: iOS Safari, Chrome Android, Firefox Android, orientation portrait/paysage, zoom 200%.
- [x] Détection de débordement: helper `assets/js/layout-debug.js` (activer avec `?debugLayout`).
- [ ] Captures avant/après aux largeurs clés (320/360/390/414/428/768/1024/1280).

## Perf/Accessibilité (en parallèle)
- [ ] Vérifier LCP en mobile: lazy des images non visibles, `decoding="async"` déjà présent.
- [ ] Focus visible et pièges de focus dans la modale (déjà gérés; re-tester mobile).

## Déploiement
- [ ] Commit par étapes avec feature flag CSS si besoin.
- [x] Build Jekyll local OK.

## Suivi mobile spécifique (derniers correctifs)
- [x] Home: sticky jump repositionné et masqué près du haut
- [x] Boutique: shopbar mobile repositionnée et masquée near top
- [x] Articles: nav offset mobile + bannière ajuste; meta badges masqués ≤768px

## Ordre d’exécution recommandé
1) Quick wins (grid, min-width:0, wrap chips, sticky-shopbar width)
2) Slider/headers et containers (normaliser les paddings et wrap)
3) Typo/clamp et polish
4) QA complète + perf

---

Notes de code (emplacements):
- `_sass/boutique.scss`: `.product-grid`, `.category-header`, `.trust-strip`, `.results-toolbar`, `.sticky-shopbar`, `.boutique-hero-slider`
- `_sass/base.scss` et `_sass/layout.scss`: `.container`, règles globales de sections
- Composants: `pages/boutique.md` (structure), `_includes/product-card-formation.html` (contenu cartes)


