---
layout: post
title: 'Évolution de CartRule.php : PrestaShop 9.0.x → 9.1.x'
date: 2026-03-05
ref: evolution-cartrule-prestashop-9-0-9-1
author: Nicolas Dabène
category: prestashop-ecommerce
subcategory: developpement-prestashop
categories:
- PrestaShop & E-commerce
- Développement
tags:
- PrestaShop
- PHP
- CartRule
- Développement
- Feature Flag
- Remises
- 9.1.x
- Discount System
excerpt: Analyse technique complète de l'évolution de CartRule.php entre PrestaShop 9.0.x et 9.1.x. Découvrez le nouveau système de remises protégé par feature flag, les changements de calcul, et les impacts pour les développeurs de modules.
image: /assets/images/blog/2026/03/evolution-cartrule-prestashop-9/image-principale.webp
difficulty: Avancé
technologies:
- PrestaShop 9.1.x
- PHP 8.1+
- Symfony
- Feature Flags
estimated_reading_time: 15 minutes
lang: fr
keywords:
- prestashop 9.1
- cartrule
- feature flag
- système remises
- discount system
- développement prestashop
- migration 9.0 9.1
published: true
---

## Contexte

La branche `9.1.x` de PrestaShop introduit un **nouveau système de remises (Discounts)**, protégé derrière un feature flag. Ce changement structurel se reflète directement dans `classes/CartRule.php`, qui sert de fondation au nouveau système tout en maintenant la rétro-compatibilité avec le système historique de cart rules.

> **Sources** : [DevDocs 9.1.x](https://devdocs.prestashop-project.org/9/modules/core-updates/9.1/), [Blog officiel](https://build.prestashop-project.org/news/2026/improved-discounts-system/), [Core Monthly Janvier 2026](https://build.prestashop-project.org/news/2026/core-monthly-2026-01-01-2026-01-31/), branche `develop` de GitHub.

---

## 1. Nouveaux imports et dépendances

### 9.0.x
La classe `CartRuleCore` dans la 9.0.x utilise les imports classiques PrestaShop sans dépendance vers le nouveau système de remises.

### 9.1.x (develop)
De nouveaux `use` statements apparaissent en tête de fichier :

```php
use PrestaShop\PrestaShop\Adapter\ContainerFinder;
use PrestaShop\PrestaShop\Adapter\Discount\Application\DiscountApplicationService;
use PrestaShop\PrestaShop\Core\Domain\CartRule\CartRuleSettings;
use PrestaShop\PrestaShop\Core\Domain\Discount\DiscountSettings;
use PrestaShop\PrestaShop\Core\Domain\Discount\ValueObject\DiscountType;
use PrestaShop\PrestaShop\Core\FeatureFlag\FeatureFlagSettings;
use PrestaShop\PrestaShop\Core\FeatureFlag\FeatureFlagStateCheckerInterface;
```

**Impact** : La classe CartRule s'intègre désormais avec :
- **`DiscountType`** : un Value Object qui distingue les niveaux d'application (`ORDER_LEVEL`, `PRODUCT_LEVEL`)
- **`DiscountApplicationService`** : le service qui orchestre l'application des remises dans le nouveau système
- **`FeatureFlagSettings` / `FeatureFlagStateCheckerInterface`** : pour vérifier dynamiquement si le nouveau système Discount est activé

---

## 2. Intégration du Feature Flag Discount

### Nouvelle méthode : `isDiscountFeatureFlagEnabled()`

Un ajout clé dans la 9.1.x est la méthode privée qui vérifie l'état du feature flag :

```php
private function isDiscountFeatureFlagEnabled(): bool
{
    return $this->getFeatureFlagManager() !== null
        && $this->getFeatureFlagManager()->isEnabled(FeatureFlagSettings::FEATURE_FLAG_DISCOUNT);
}
```

**Rôle** : Cette méthode agit comme un aiguillage dans l'ensemble du fichier. Quand le flag est désactivé (par défaut), le comportement reste identique à la 9.0.x. Quand il est activé, les nouvelles logiques de calcul prennent le relais.

### Nouvelle méthode : `getFeatureFlagManager()`

Méthode protégée qui instancie le `FeatureFlagStateCheckerInterface` depuis le container Symfony :

```php
protected function getFeatureFlagManager(): ?FeatureFlagStateCheckerInterface
```

---

## 3. Nouveau concept : `getType()` — Typage des remises

### Ajout dans 9.1.x

La méthode `getType()` est introduite pour classifier une cart rule selon le nouveau modèle de remises à **4 types** :

| Type | Description |
|------|-------------|
| **Catalog** (`PRODUCT_LEVEL`) | Remise appliquée à un produit ou segment de produits |
| **Cart** (`ORDER_LEVEL`) | Remise sur le montant total du panier (hors frais de port) |
| **Free Shipping** | Livraison gratuite |
| **Free Gift** | Produit offert ajouté à la commande |

Cette méthode retourne un `DiscountType` Value Object basé sur la configuration interne de la cart rule (champs `reduction_product`, `free_shipping`, `gift_product`, etc.).

**Impact développeur** : Les modules qui interrogent le type de remise peuvent désormais utiliser `$cartRule->getType()` au lieu de vérifier manuellement les champs individuels.

---

## 4. Modifications dans `getContextualValue()`

La méthode `getContextualValue()` — le cœur du calcul des remises — contient les changements les plus significatifs.

### 4.1 Réduction en pourcentage au niveau commande (ORDER_LEVEL)

**9.0.x** : La réduction en pourcentage est appliquée uniquement sur le total produits.

**9.1.x** : Quand le feature flag est activé et que le type est `ORDER_LEVEL` :

```php
if ($this->getType() === DiscountType::ORDER_LEVEL
    && $this->reduction_percent > 0.00
    && $this->reduction_product == 0) {
    $order_products_total = $context->cart->getOrderTotal($use_tax, Cart::ONLY_PRODUCTS, $package_products);
    $order_shipping_total = $context->cart->getOrderTotal($use_tax, Cart::ONLY_SHIPPING, $package_products);
    $order_total = $order_products_total + $order_shipping_total;
    $reduction_value += $order_total * $this->reduction_percent / 100;
}
```

**Changement clé** : Le pourcentage s'applique maintenant sur **produits + frais de port** au lieu de produits seuls.

### 4.2 Réduction en montant fixe — plafonné différemment

**9.0.x** : Le montant de réduction est plafonné au total produits.

**9.1.x** : Pour `ORDER_LEVEL` avec le feature flag activé, le plafond inclut les frais de port :

```php
if ($this->isDiscountFeatureFlagEnabled() && $this->getType() === DiscountType::ORDER_LEVEL) {
    $max_reduction_amount = $this->reduction_tax
        ? $cart_amount_ti + $context->cart->getOrderTotal(true, Cart::ONLY_SHIPPING, $package_products)
        : $cart_amount_te + $context->cart->getOrderTotal(false, Cart::ONLY_SHIPPING, $package_products);
    $reduction_amount = min($reduction_amount, $max_reduction_amount);
}
```

### 4.3 Calcul du montant courant du panier

Quand une réduction en montant fixe est appliquée (`reduction_amount > 0`), le calcul du `$current_cart_amount` inclut désormais les frais de port pour les remises `ORDER_LEVEL` :

```php
if ($this->isDiscountFeatureFlagEnabled() && $this->getType() === DiscountType::ORDER_LEVEL) {
    $current_cart_amount += $this->reduction_tax
        ? $context->cart->getOrderTotal(true, Cart::ONLY_SHIPPING, $package_products)
        : $context->cart->getOrderTotal(false, Cart::ONLY_SHIPPING, $package_products);
}
```

---

## 5. Correction de bug : incohérence de variable (PR #40424)

Le PR [#40424](https://github.com/PrestaShop/PrestaShop/pull/40424) par **@pjouglet** corrige une incohérence dans l'utilisation des variables à travers le fichier.

**Avant** : Certaines variables étaient utilisées de manière inconsistante (par ex. mélange entre `$cart_rule->name` et `htmlspecialchars($cart_rule->name)`).

**Après** : Normalisation de l'utilisation des variables dans tout le fichier, notamment dans les messages d'erreur de compatibilité entre vouchers :

```php
// 9.1.x - avec htmlspecialchars pour la sécurité XSS
return (!$display_error) ? false : $this->trans(
    'This voucher is not combinable with an other voucher already in your cart: %s',
    [htmlspecialchars($cart_rule->name)],
    'Shop.Notifications.Error'
);
```

---

## 6. Nouveau système de compatibilité entre remises

### 9.0.x
Le système de compatibilité repose sur la table `ps_cart_rule_combination` et le champ `cart_rule_restriction`. Chaque combinaison interdite est stockée comme un couple dans la table, ce qui provoque une explosion exponentielle des données avec de nombreuses règles.

### 9.1.x
Le nouveau système introduit une **compatibilité par type de remise** :

1. Les remises ne sont plus ordonnées par code promo vs. automatique
2. **Ordre d'application fixe** :
   - Catalog (produit) → Cart (panier) → Free Shipping → Free Gift
3. **Au sein d'un même type** : tri par priorité (plus basse = appliquée en premier), puis par date de création
4. **Réévaluation dynamique** à chaque modification du panier

---

## 7. Impact sur `CartRuleCalculator.php`

Bien que ce fichier soit distinct de `CartRule.php`, les changements sont intrinsèquement liés. Le `CartRuleCalculator` (dans `src/Core/Cart/`) intègre les mêmes vérifications de feature flag :

```php
if ($cartRule->getType() === DiscountType::ORDER_LEVEL
    && (float) $cartRule->reduction_percent > 0
    && $cartRule->reduction_product == 0) {
    if ($this->isDiscountFeatureFlagEnabled()) {
        // Nouveau calcul : produits + frais de port
        $initialShippingFees = $this->calculator->getFees()->getInitialShippingFees();
        $productsTotal = $this->calculator->getRowTotal();
        $orderTotal = $productsTotal->add($initialShippingFees);
        // ...
    }
}
```

---

## 8. Changements de base de données associés

La 9.1.x introduit des modifications de schéma pour supporter le nouveau système de remises (visible dans `install-dev/upgrade/sql/9.1.0.sql`). Ces changements sont liés au feature flag et n'altèrent pas les tables existantes tant que le flag reste désactivé.

---

## 9. Tableau récapitulatif des changements

| Aspect | 9.0.x | 9.1.x |
|--------|-------|-------|
| **Imports** | Pas de dépendance Discount | `DiscountType`, `DiscountSettings`, `FeatureFlagSettings` |
| **Feature Flag** | Absent | `isDiscountFeatureFlagEnabled()` présent |
| **Typage des remises** | Implicite (champs individuels) | Explicite via `getType()` → `DiscountType` |
| **% sur ORDER_LEVEL** | Produits seuls | Produits + frais de port |
| **Plafond montant fixe** | Total produits | Total produits + frais de port (ORDER_LEVEL) |
| **Sécurité XSS messages** | `$cart_rule->name` | `htmlspecialchars($cart_rule->name)` |
| **Compatibilité remises** | Table `cart_rule_combination` | Par type avec ordre d'application fixe |
| **Rétro-compatibilité** | — | ✅ Flag désactivé = comportement 9.0.x |

---

## 10. Recommandations pour les développeurs de modules

1. **Ne pas surcharger `CartRule.php` en override** si vous comptez supporter la 9.1.x — le fichier est en pleine évolution.

2. **Vérifier le feature flag** dans vos modules si vous interagissez avec les remises :
   ```php
   $featureFlagManager = $this->get(FeatureFlagStateCheckerInterface::class);
   if ($featureFlagManager->isEnabled(FeatureFlagSettings::FEATURE_FLAG_DISCOUNT)) {
       // Logique nouveau système
   }
   ```

3. **Tester les deux modes** (flag activé et désactivé) car les marchands peuvent basculer entre les deux.

4. **Utiliser `getType()`** au lieu de vérifier manuellement `reduction_product`, `free_shipping`, `gift_product` etc.

5. **Attention au calcul des frais de port** : si votre module calcule des totaux de réduction, le comportement change selon le type de remise en 9.1.x.

---

## Sources et références

- [PrestaShop DevDocs — Changes in 9.1.x](https://devdocs.prestashop-project.org/9/modules/core-updates/9.1/)
- [Blog — Improved Discounts System in PrestaShop 9.1](https://build.prestashop-project.org/news/2026/improved-discounts-system/)
- [Blog — PrestaShop 9.1 Beta](https://build.prestashop-project.org/news/2026/prestashop-9-1-beta1/)
- [Core Monthly Janvier 2026](https://build.prestashop-project.org/news/2026/core-monthly-2026-01-01-2026-01-31/)
- [GitHub — CartRule.php (develop/9.1.x)](https://github.com/PrestaShop/PrestaShop/blob/develop/classes/CartRule.php)
- [GitHub — CartRule.php (9.0.x)](https://github.com/PrestaShop/PrestaShop/blob/9.0.x/classes/CartRule.php)
- [PR #40424 — Fixed inconsistency use of variable in CartRule.php](https://github.com/PrestaShop/PrestaShop/pull/40424)
