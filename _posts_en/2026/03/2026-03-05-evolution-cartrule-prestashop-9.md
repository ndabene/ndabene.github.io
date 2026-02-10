---
layout: post
title: 'Evolution of CartRule.php: PrestaShop 9.0.x → 9.1.x'
date: 2026-03-05
ref: evolution-cartrule-prestashop-9-0-9-1
author: Nicolas Dabène
category: prestashop-ecommerce
subcategory: developpement-prestashop
categories:
- PrestaShop & E-commerce
- Development
tags:
- PrestaShop
- PHP
- CartRule
- Development
- Feature Flag
- Discounts
- 9.1.x
- Discount System
excerpt: Complete technical analysis of CartRule.php evolution between PrestaShop 9.0.x and 9.1.x. Discover the new discount system protected by feature flag, calculation changes, and impacts for module developers.
image: /assets/images/blog/2026/03/evolution-cartrule-prestashop-9/image-principale.webp
difficulty: Advanced
technologies:
- PrestaShop 9.1.x
- PHP 8.1+
- Symfony
- Feature Flags
estimated_reading_time: 15 minutes
lang: en
keywords:
- prestashop 9.1
- cartrule
- feature flag
- discount system
- prestashop development
- migration 9.0 9.1
published: true
---

## Context

The `9.1.x` branch of PrestaShop introduces a **new Discount system**, protected behind a feature flag. This structural change is directly reflected in `classes/CartRule.php`, which serves as the foundation for the new system while maintaining backward compatibility with the legacy cart rules system.

> **Sources**: [DevDocs 9.1.x](https://devdocs.prestashop-project.org/9/modules/core-updates/9.1/), [Official Blog](https://build.prestashop-project.org/news/2026/improved-discounts-system/), [Core Monthly January 2026](https://build.prestashop-project.org/news/2026/core-monthly-2026-01-01-2026-01-31/), GitHub `develop` branch.

---

## 1. New imports and dependencies

### 9.0.x
The `CartRuleCore` class in 9.0.x uses classic PrestaShop imports without dependency on the new discount system.

### 9.1.x (develop)
New `use` statements appear at the top of the file:

```php
use PrestaShop\PrestaShop\Adapter\ContainerFinder;
use PrestaShop\PrestaShop\Adapter\Discount\Application\DiscountApplicationService;
use PrestaShop\PrestaShop\Core\Domain\CartRule\CartRuleSettings;
use PrestaShop\PrestaShop\Core\Domain\Discount\DiscountSettings;
use PrestaShop\PrestaShop\Core\Domain\Discount\ValueObject\DiscountType;
use PrestaShop\PrestaShop\Core\FeatureFlag\FeatureFlagSettings;
use PrestaShop\PrestaShop\Core\FeatureFlag\FeatureFlagStateCheckerInterface;
```

**Impact**: The CartRule class now integrates with:
- **`DiscountType`**: a Value Object that distinguishes application levels (`ORDER_LEVEL`, `PRODUCT_LEVEL`)
- **`DiscountApplicationService`**: the service that orchestrates discount application in the new system
- **`FeatureFlagSettings` / `FeatureFlagStateCheckerInterface`**: to dynamically check if the new Discount system is enabled

---

## 2. Discount Feature Flag Integration

### New method: `isDiscountFeatureFlagEnabled()`

A key addition in 9.1.x is the private method that checks the feature flag state:

```php
private function isDiscountFeatureFlagEnabled(): bool
{
    return $this->getFeatureFlagManager() !== null
        && $this->getFeatureFlagManager()->isEnabled(FeatureFlagSettings::FEATURE_FLAG_DISCOUNT);
}
```

**Role**: This method acts as a switch throughout the file. When the flag is disabled (default), behavior remains identical to 9.0.x. When enabled, new calculation logic takes over.

### New method: `getFeatureFlagManager()`

Protected method that instantiates the `FeatureFlagStateCheckerInterface` from the Symfony container:

```php
protected function getFeatureFlagManager(): ?FeatureFlagStateCheckerInterface
```

---

## 3. New concept: `getType()` — Discount Typing

### Added in 9.1.x

The `getType()` method is introduced to classify a cart rule according to the new discount model with **4 types**:

| Type | Description |
|------|-------------|
| **Catalog** (`PRODUCT_LEVEL`) | Discount applied to a product or product segment |
| **Cart** (`ORDER_LEVEL`) | Discount on total cart amount (excluding shipping) |
| **Free Shipping** | Free shipping |
| **Free Gift** | Free product added to order |

This method returns a `DiscountType` Value Object based on the internal configuration of the cart rule (fields `reduction_product`, `free_shipping`, `gift_product`, etc.).

**Developer impact**: Modules that query the discount type can now use `$cartRule->getType()` instead of manually checking individual fields.

---

## 4. Changes in `getContextualValue()`

The `getContextualValue()` method — the core of discount calculation — contains the most significant changes.

### 4.1 Percentage reduction at order level (ORDER_LEVEL)

**9.0.x**: Percentage reduction is applied only to product total.

**9.1.x**: When the feature flag is enabled and type is `ORDER_LEVEL`:

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

**Key change**: The percentage now applies to **products + shipping costs** instead of products only.

### 4.2 Fixed amount reduction — capped differently

**9.0.x**: Reduction amount is capped at product total.

**9.1.x**: For `ORDER_LEVEL` with feature flag enabled, the cap includes shipping:

```php
if ($this->isDiscountFeatureFlagEnabled() && $this->getType() === DiscountType::ORDER_LEVEL) {
    $max_reduction_amount = $this->reduction_tax
        ? $cart_amount_ti + $context->cart->getOrderTotal(true, Cart::ONLY_SHIPPING, $package_products)
        : $cart_amount_te + $context->cart->getOrderTotal(false, Cart::ONLY_SHIPPING, $package_products);
    $reduction_amount = min($reduction_amount, $max_reduction_amount);
}
```

### 4.3 Current cart amount calculation

When a fixed amount reduction is applied (`reduction_amount > 0`), the `$current_cart_amount` calculation now includes shipping costs for `ORDER_LEVEL` discounts:

```php
if ($this->isDiscountFeatureFlagEnabled() && $this->getType() === DiscountType::ORDER_LEVEL) {
    $current_cart_amount += $this->reduction_tax
        ? $context->cart->getOrderTotal(true, Cart::ONLY_SHIPPING, $package_products)
        : $context->cart->getOrderTotal(false, Cart::ONLY_SHIPPING, $package_products);
}
```

---

## 5. Bug fix: variable inconsistency (PR #40424)

PR [#40424](https://github.com/PrestaShop/PrestaShop/pull/40424) by **@pjouglet** fixes variable usage inconsistency throughout the file.

**Before**: Some variables were used inconsistently (e.g., mixing `$cart_rule->name` and `htmlspecialchars($cart_rule->name)`).

**After**: Normalization of variable usage throughout the file, particularly in voucher compatibility error messages:

```php
// 9.1.x - with htmlspecialchars for XSS security
return (!$display_error) ? false : $this->trans(
    'This voucher is not combinable with an other voucher already in your cart: %s',
    [htmlspecialchars($cart_rule->name)],
    'Shop.Notifications.Error'
);
```

---

## 6. New discount compatibility system

### 9.0.x
The compatibility system relies on the `ps_cart_rule_combination` table and the `cart_rule_restriction` field. Each forbidden combination is stored as a pair in the table, causing exponential data explosion with many rules.

### 9.1.x
The new system introduces **compatibility by discount type**:

1. Discounts are no longer ordered by promo code vs. automatic
2. **Fixed application order**:
   - Catalog (product) → Cart (cart) → Free Shipping → Free Gift
3. **Within the same type**: sorted by priority (lower = applied first), then by creation date
4. **Dynamic re-evaluation** on each cart modification

---

## 7. Impact on `CartRuleCalculator.php`

While this file is separate from `CartRule.php`, the changes are intrinsically linked. The `CartRuleCalculator` (in `src/Core/Cart/`) integrates the same feature flag checks:

```php
if ($cartRule->getType() === DiscountType::ORDER_LEVEL
    && (float) $cartRule->reduction_percent > 0
    && $cartRule->reduction_product == 0) {
    if ($this->isDiscountFeatureFlagEnabled()) {
        // New calculation: products + shipping
        $initialShippingFees = $this->calculator->getFees()->getInitialShippingFees();
        $productsTotal = $this->calculator->getRowTotal();
        $orderTotal = $productsTotal->add($initialShippingFees);
        // ...
    }
}
```

---

## 8. Associated database changes

The 9.1.x introduces schema modifications to support the new discount system (visible in `install-dev/upgrade/sql/9.1.0.sql`). These changes are linked to the feature flag and don't alter existing tables as long as the flag remains disabled.

---

## 9. Changes summary table

| Aspect | 9.0.x | 9.1.x |
|--------|-------|-------|
| **Imports** | No Discount dependency | `DiscountType`, `DiscountSettings`, `FeatureFlagSettings` |
| **Feature Flag** | Absent | `isDiscountFeatureFlagEnabled()` present |
| **Discount typing** | Implicit (individual fields) | Explicit via `getType()` → `DiscountType` |
| **% on ORDER_LEVEL** | Products only | Products + shipping |
| **Fixed amount cap** | Product total | Product total + shipping (ORDER_LEVEL) |
| **XSS security messages** | `$cart_rule->name` | `htmlspecialchars($cart_rule->name)` |
| **Discount compatibility** | `cart_rule_combination` table | By type with fixed application order |
| **Backward compatibility** | — | ✅ Flag disabled = 9.0.x behavior |

---

## 10. Recommendations for module developers

1. **Don't override `CartRule.php`** if you plan to support 9.1.x — the file is actively evolving.

2. **Check the feature flag** in your modules if you interact with discounts:
   ```php
   $featureFlagManager = $this->get(FeatureFlagStateCheckerInterface::class);
   if ($featureFlagManager->isEnabled(FeatureFlagSettings::FEATURE_FLAG_DISCOUNT)) {
       // New system logic
   }
   ```

3. **Test both modes** (flag enabled and disabled) as merchants can switch between both.

4. **Use `getType()`** instead of manually checking `reduction_product`, `free_shipping`, `gift_product` etc.

5. **Be careful with shipping calculation**: if your module calculates discount totals, behavior changes based on discount type in 9.1.x.

---

## Sources and references

- [PrestaShop DevDocs — Changes in 9.1.x](https://devdocs.prestashop-project.org/9/modules/core-updates/9.1/)
- [Blog — Improved Discounts System in PrestaShop 9.1](https://build.prestashop-project.org/news/2026/improved-discounts-system/)
- [Blog — PrestaShop 9.1 Beta](https://build.prestashop-project.org/news/2026/prestashop-9-1-beta1/)
- [Core Monthly January 2026](https://build.prestashop-project.org/news/2026/core-monthly-2026-01-01-2026-01-31/)
- [GitHub — CartRule.php (develop/9.1.x)](https://github.com/PrestaShop/PrestaShop/blob/develop/classes/CartRule.php)
- [GitHub — CartRule.php (9.0.x)](https://github.com/PrestaShop/PrestaShop/blob/9.0.x/classes/CartRule.php)
- [PR #40424 — Fixed inconsistency use of variable in CartRule.php](https://github.com/PrestaShop/PrestaShop/pull/40424)
