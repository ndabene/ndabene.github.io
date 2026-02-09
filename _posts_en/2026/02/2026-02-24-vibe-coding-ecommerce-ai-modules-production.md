---
layout: post
title: 'Vibe Coding in e-commerce: why 80% of AI-generated modules will never make
  it to production'
date: 2026-02-24
ref: vibe-coding-ecommerce-modules-ia-production-2026
author: Nicolas Dabène
category: prestashop-ecommerce
subcategory: ai-assisted-development
categories:
  - PrestaShop
  - Development
  - Artificial Intelligence
  - Security
tags:
  - PrestaShop
  - Vibe Coding
  - Artificial Intelligence
  - e-commerce
  - security
  - performance
  - multi-shop
  - technical debt
  - hooks
  - modules
excerpt: 'Vibe Coding is revolutionizing development, but applied to PrestaShop, it''s
  a minefield. Real-world examples, actual code, and lessons learned after 10 years
  of modules in production.'
image: /assets/images/blog/2026/02/vibe-coding-ecommerce-modules-ia-production/image-principale.webp
featured: true
difficulty: Advanced
technologies:
  - PrestaShop
  - PHP
  - Symfony
  - MySQL
  - Smarty
  - AI
estimated_reading_time: 15 minutes
llm_summary: 'In-depth analysis of Vibe Coding limitations when applied to PrestaShop
  module development. The article demonstrates, with concrete code examples, why 80%
  of AI-generated modules fail in production: poorly handled hooks, gaping security
  vulnerabilities (unprotected AJAX, SQL injections), N+1 performance issues, multi-shop
  incompatibility, and missing tests and upgrade files. Lessons learned from 10 years
  of modules in production.'
llm_topics:
  - PrestaShop
  - Vibe Coding
  - Artificial Intelligence
  - e-commerce modules
  - web security
  - SQL injection
  - CSRF
  - performance
  - multi-shop
  - PrestaShop hooks
  - technical debt
  - testing
  - code audit
  - production
faq:
  - question: Why do AI-generated PrestaShop modules fail in production?
    answer: Vibe-coded modules fail primarily on edge cases the AI doesn't know about
      — multi-shop management, forgotten action hooks, missing CSRF/permission security
      on AJAX endpoints, N+1 performance issues, and lack of upgrade files for database
      migrations. They work in demos but break under the load and real complexity of
      a production store.
  - question: What are the main security risks of AI-generated modules?
    answer: The major risks are AJAX endpoints without CSRF token verification or
      permission checks, SQL injections due to missing escaping (pSQL), lack of user
      input validation, and missing audit logging for sensitive actions. A simple curl
      call can be enough to change the prices of every product in a store.
  - question: How does AI handle PrestaShop multi-shop?
    answer: AI handles PrestaShop multi-shop very poorly. It systematically forgets
      joins on _shop and _lang tables, doesn't manage the 3 contexts (SHOP, GROUP,
      ALL), and never generates the crucial hookActionShopDataDuplication for store
      duplication. This leads to corrupted data across stores.
  - question: Is Vibe Coding completely useless for PrestaShop?
    answer: No, Vibe Coding remains useful as an accelerator in the hands of an experienced
      developer. It speeds up initial scaffolding (60%), Smarty template generation
      (50%), HelperForm forms (70%) and documentation (80%). But every generated line
      must be reviewed by an expert who knows PrestaShop's production pitfalls.
  - question: What is the right way to use AI in PrestaShop development?
    answer: The recommended approach is to specify precisely what you want (no vague
      prompts), review every line with a mental checklist (security, multi-shop, multi-language,
      performance, complete hooks, compatibility), and validate on a real store with
      real data in a multi-shop context. AI generates, the expert specifies, reviews
      and validates.
  - question: Is PrestaShop free?
    answer: Yes, PrestaShop is a free and open-source e-commerce CMS. You only pay
      for hosting and premium modules.
lang: en
published: true
---


# Vibe Coding in e-commerce: why 80% of AI-generated modules will never make it to production

**Reading time: 15 min**
**Last updated: February 2026**

## The dream they're selling vs. the reality on the ground

> "Describe what you want, AI codes it for you."

Since Gene Kim popularized the concept of **Vibe Coding** and tools like Cursor, Claude Code, and GitHub Copilot exploded onto the scene, an enticing narrative has taken hold: anyone can now create software. No need to understand the code — just "give the vibe."

And honestly? For a prototype, a demo, a side project... it works. It's even impressive.

But I've been developing PrestaShop modules for over 10 years. Modules running on stores processing 50,000 orders per month. Modules installed on multi-shop architectures with 12 stores, 4 languages, 3 currencies, business rules specific to each customer group, and an ERP plugged in behind it all.

And what I've been seeing over the past 6 months in my audits, code takeovers, and support requests is a wave of "vibe-coded" modules that all share the same fate:

**They work in demo. They break in production.**

This article isn't an anti-AI manifesto. I use AI every day in my workflow. But I'm going to show you, with concrete examples and real code, why Vibe Coding applied to e-commerce — and specifically to PrestaShop — is a minefield that only domain expertise can navigate.

---

## 1. Hooks: the #1 trap AI doesn't understand

### What AI generates

Ask an LLM to create a module that displays a reassurance block on the product page. You'll get something like:

```php
public function hookDisplayProductAdditionalInfo($params)
{
    $product = $params['product'];

    $this->context->smarty->assign([
        'product_name' => $product->name,
        'reassurance_text' => 'Free shipping over €49',
    ]);

    return $this->display(__FILE__, 'views/templates/hook/reassurance.tpl');
}
```

Looks clean. Works on a fresh PrestaShop install. The client is happy for 48 hours.

### What blows up in production

**Problem 1: `$params['product']` isn't what you think it is.**

Depending on the PrestaShop version (1.7.6 vs 1.7.8 vs 8.1), whether you're on the standard product page or in a quick-view module, depending on the theme used... `$params['product']` can be:

- A `Product` object
- An associative array (from `ProductPresenter`)
- `null` (if the hook is called in an unexpected context)
- An array with different keys depending on the version

Robust code looks like this:

```php
public function hookDisplayProductAdditionalInfo($params)
{
    // Defensive handling of the product parameter
    $product = null;

    if (isset($params['product'])) {
        if (is_array($params['product'])) {
            // PrestaShop 1.7.7+ with ProductPresenter
            $productId = (int) ($params['product']['id_product'] ?? $params['product']['id'] ?? 0);
            if ($productId > 0) {
                $product = new Product($productId, false, $this->context->language->id, $this->context->shop->id);
            }
        } elseif ($params['product'] instanceof Product) {
            $product = $params['product'];
        }
    }

    // Fallback to context if the hook doesn't provide anything usable
    if (!Validate::isLoadedObject($product)) {
        $productId = (int) Tools::getValue('id_product');
        if ($productId > 0) {
            $product = new Product($productId, false, $this->context->language->id, $this->context->shop->id);
        }
    }

    if (!Validate::isLoadedObject($product) || !$product->active) {
        return '';
    }

    // ... rest of the processing
}
```

Sexy? No. Necessary? Absolutely.

**Problem 2: the hook might not even exist.**

AI will suggest `hookDisplayProductAdditionalInfo` because it's in the official documentation. But on a real store with a custom theme (Flavor, Warehouse, etc.), this hook:

- may have been removed from the template
- may be called at a different position in the DOM
- may be competing with 4 other modules registered on it

A senior developer knows to check the target theme, offer a widget as an alternative, and implement a fallback with `hookDisplayFooterProduct` or `hookDisplayOverrideTemplate` if needed.

**Problem 3: forgotten action hooks.**

AI generates display hooks very well. It systematically forgets critical action hooks. A vibe-coded stock management module I audited last month:

- Handled `hookActionProductUpdate` to recalculate stock
- Forgot `hookActionObjectProductDeleteAfter` → ghost products in the database
- Forgot `hookActionProductAttributeUpdate` → product combinations never synchronized
- Forgot `hookActionObjectCombinationDeleteAfter` → ERP crash
- Didn't handle `hookActionObjectStockAvailableUpdateAfter` → conflict with native stock

**One forgotten hook = inconsistent data across hundreds of products.**

---

## 2. Security: the gaping hole AI leaves wide open

### Unprotected AJAX

This is the pattern I find in **90% of vibe-coded modules** with an admin interface:

```php
// front/ajax.php — AI-generated
include('../../config/config.inc.php');

$action = Tools::getValue('action');

if ($action === 'updatePrice') {
    $id_product = Tools::getValue('id_product');
    $new_price = Tools::getValue('price');

    $product = new Product($id_product);
    $product->price = $new_price;
    $product->save();

    die(json_encode(['success' => true]));
}
```

This code is a **wide-open door**. Anyone can change the price of any product in the store with a simple curl call:

```bash
curl "https://your-store.com/modules/mymodule/front/ajax.php?action=updatePrice&id_product=1&price=0.01"
```

Congratulations: all your products are now 1 cent.

### What secure code requires

```php
// controllers/front/ajax.php — secure version
class MyModuleAjaxModuleFrontController extends ModuleFrontController
{
    public function initContent()
    {
        // Verify this is actually an AJAX request
        if (!$this->ajax) {
            $this->ajaxRender(json_encode(['error' => 'Invalid request']));
            return;
        }

        parent::initContent();
    }

    public function displayAjaxUpdatePrice()
    {
        // 1. CSRF token verification
        if (!$this->isTokenValid()) {
            header('HTTP/1.1 403 Forbidden');
            $this->ajaxRender(json_encode(['error' => 'Invalid token']));
            return;
        }

        // 2. Permission check (admin employee logged in)
        $cookie = new Cookie('psAdmin');
        if (!$cookie->id_employee) {
            header('HTTP/1.1 401 Unauthorized');
            $this->ajaxRender(json_encode(['error' => 'Unauthorized']));
            return;
        }

        $employee = new Employee((int) $cookie->id_employee);
        if (!Validate::isLoadedObject($employee)
            || !$employee->hasAuthOnShop($this->context->shop->id)) {
            header('HTTP/1.1 403 Forbidden');
            $this->ajaxRender(json_encode(['error' => 'Insufficient permissions']));
            return;
        }

        // 3. Strict input validation
        $idProduct = (int) Tools::getValue('id_product');
        $newPrice = (float) Tools::getValue('price');

        if ($idProduct <= 0) {
            $this->ajaxRender(json_encode(['error' => 'Invalid product ID']));
            return;
        }

        if ($newPrice < 0 || $newPrice > 999999.99) {
            $this->ajaxRender(json_encode(['error' => 'Invalid price range']));
            return;
        }

        // 4. Verify the product belongs to the current shop context
        $product = new Product($idProduct, false, null, $this->context->shop->id);
        if (!Validate::isLoadedObject($product)) {
            $this->ajaxRender(json_encode(['error' => 'Product not found in current shop']));
            return;
        }

        // 5. Secure update with multi-shop handling
        $product->price = $newPrice;

        if (Shop::getContext() === Shop::CONTEXT_SHOP) {
            $product->save();
        } else {
            // In multi-shop context, force current shop
            $product->id_shop_default = $this->context->shop->id;
            $product->save();
        }

        // 6. Log the action for audit trail
        PrestaShopLogger::addLog(
            sprintf('Product #%d price updated to %f by employee #%d via module MyModule',
                $idProduct, $newPrice, (int) $cookie->id_employee),
            1,
            null,
            'Product',
            $idProduct,
            true,
            (int) $cookie->id_employee
        );

        // 7. Flush product price cache
        Product::flushPriceCache();

        $this->ajaxRender(json_encode([
            'success' => true,
            'product_id' => $idProduct,
            'new_price' => $newPrice,
        ]));
    }
}
```

We went from **8 lines to 65 lines**. And every additional line blocks a real attack vector.

### SQL injections: still here in 2026

AI loves generating "readable" SQL queries:

```php
// AI-generated — SQL injection
$sql = "SELECT * FROM " . _DB_PREFIX_ . "product
        WHERE reference = '" . $reference . "'";
$results = Db::getInstance()->executeS($sql);
```

```php
// Secure version
$sql = new DbQuery();
$sql->select('p.id_product, p.reference, p.price, pl.name');
$sql->from('product', 'p');
$sql->innerJoin('product_lang', 'pl', 'p.id_product = pl.id_product AND pl.id_lang = ' . (int) $this->context->language->id);
$sql->innerJoin('product_shop', 'ps', 'p.id_product = ps.id_product AND ps.id_shop = ' . (int) $this->context->shop->id);
$sql->where('p.reference = \'' . pSQL($reference) . '\'');
$sql->where('ps.active = 1');
$results = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
```

Notice the details AI systematically forgets:

- `pSQL()` to escape the value
- The `product_shop` join for multi-shop context
- The `product_lang` join for the current language
- Using `_PS_USE_SQL_SLAVE_` for read queries (performance)
- Filtering on `active = 1`

---

## 3. Performance: the silent serial killer

### The N+1 problem: the classic AI reproduces endlessly

A vibe-coded cross-selling module I recently audited:

```php
// AI-generated code — N+1 queries
public function hookDisplayShoppingCartFooter($params)
{
    $cart = $this->context->cart;
    $products = $cart->getProducts();
    $recommendations = [];

    foreach ($products as $product) {
        // Query 1 per product: fetch the category
        $category = new Category($product['id_category_default'], $this->context->language->id);

        // Query 2 per product: fetch products from the same category
        $categoryProducts = $category->getProducts($this->context->language->id, 1, 10);

        foreach ($categoryProducts as $catProduct) {
            // Query 3 per recommended product: check stock
            $stockAvailable = StockAvailable::getQuantityAvailableByProduct($catProduct['id_product']);

            if ($stockAvailable > 0) {
                // Query 4 per recommended product: fetch the image
                $image = Image::getCover($catProduct['id_product']);
                $catProduct['image_url'] = $this->context->link->getImageLink(
                    $catProduct['link_rewrite'],
                    $image['id_image'],
                    'home_default'
                );
                $recommendations[] = $catProduct;
            }
        }
    }

    $this->context->smarty->assign('recommendations', array_slice($recommendations, 0, 4));
    return $this->display(__FILE__, 'views/templates/hook/recommendations.tpl');
}
```

A cart with 5 products, in categories of 50 products each = potentially **1,000+ SQL queries** on every cart page display.

On a store with traffic, this module brings the server to its knees within 24 hours.

### The optimized version

```php
public function hookDisplayShoppingCartFooter($params)
{
    $cart = $this->context->cart;
    $products = $cart->getProducts();

    if (empty($products)) {
        return '';
    }

    // Cache: don't recalculate on every page load
    $cacheKey = 'mymodule_reco_' . $cart->id . '_' . md5(serialize(array_column($products, 'id_product')));

    if ($cachedOutput = $this->getCachedRecommendations($cacheKey)) {
        return $cachedOutput;
    }

    $productIds = array_column($products, 'id_product');
    $categoryIds = array_unique(array_column($products, 'id_category_default'));
    $idLang = (int) $this->context->language->id;
    $idShop = (int) $this->context->shop->id;

    // A SINGLE query to fetch everything
    $sql = new DbQuery();
    $sql->select('DISTINCT p.id_product, pl.name, pl.link_rewrite, p.price,
                   p.id_category_default, sa.quantity as stock,
                   IFNULL(img.id_image, 0) as id_image');
    $sql->from('product', 'p');
    $sql->innerJoin('product_lang', 'pl',
        'p.id_product = pl.id_product AND pl.id_lang = ' . $idLang . ' AND pl.id_shop = ' . $idShop);
    $sql->innerJoin('product_shop', 'ps',
        'p.id_product = ps.id_product AND ps.id_shop = ' . $idShop);
    $sql->innerJoin('stock_available', 'sa',
        'p.id_product = sa.id_product AND sa.id_product_attribute = 0 AND sa.id_shop = ' . $idShop);
    $sql->leftJoin('image_shop', 'img',
        'p.id_product = img.id_product AND img.id_shop = ' . $idShop . ' AND img.cover = 1');
    $sql->where('p.id_category_default IN (' . implode(',', array_map('intval', $categoryIds)) . ')');
    $sql->where('p.id_product NOT IN (' . implode(',', array_map('intval', $productIds)) . ')');
    $sql->where('ps.active = 1');
    $sql->where('sa.quantity > 0');
    $sql->orderBy('RAND()');
    $sql->limit(4);

    $recommendations = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);

    if (empty($recommendations)) {
        return '';
    }

    // Build image URLs in batch (no extra queries)
    foreach ($recommendations as &$reco) {
        if ($reco['id_image'] > 0) {
            $reco['image_url'] = $this->context->link->getImageLink(
                $reco['link_rewrite'],
                $reco['id_product'] . '-' . $reco['id_image'],
                ImageType::getFormattedName('home')
            );
        } else {
            $reco['image_url'] = $this->context->link->getImageLink(
                $reco['link_rewrite'],
                $this->context->language->iso_code . '-default',
                ImageType::getFormattedName('home')
            );
        }
    }

    $this->context->smarty->assign('recommendations', $recommendations);
    $output = $this->display(__FILE__, 'views/templates/hook/recommendations.tpl');

    // Cache for 30 minutes
    $this->cacheRecommendations($cacheKey, $output, 1800);

    return $output;
}
```

Result: **1 query instead of 1,000**. Caching included. Ready for traffic.

---

## 4. Multi-shop: AI's total blind spot

This is where the vast majority of vibe-coded modules collapse, because AI simply has **no idea** about the complexity of PrestaShop multi-shop.

### What AI doesn't know

PrestaShop multi-shop means 3 possible contexts:

```
Shop::CONTEXT_SHOP    → a single store
Shop::CONTEXT_GROUP   → a group of stores
Shop::CONTEXT_ALL     → all stores
```

And every database table potentially has an associated `_shop` table. When a vibe-coded module does:

```php
// Only works in single-shop mode
Configuration::updateValue('MY_MODULE_SETTING', $value);
```

In a multi-shop context, this line can:

- Overwrite the configuration of ALL stores (if ALL context)
- Only save for the group (if GROUP context)
- Work correctly (if SHOP context, and even then...)

### The correct approach

```php
// Explicit multi-shop handling
public function saveConfiguration()
{
    $shops = Shop::getShops(true, null, true);

    if (Shop::getContext() === Shop::CONTEXT_SHOP) {
        // Save for the current store only
        Configuration::updateValue(
            'MY_MODULE_SETTING',
            Tools::getValue('MY_MODULE_SETTING'),
            false,
            null,
            (int) $this->context->shop->id
        );
    } elseif (Shop::getContext() === Shop::CONTEXT_ALL) {
        // User wants to apply to all stores
        foreach ($shops as $idShop) {
            Configuration::updateValue(
                'MY_MODULE_SETTING',
                Tools::getValue('MY_MODULE_SETTING'),
                false,
                null,
                (int) $idShop
            );
        }
    }
}
```

### Multi-shop installation: the real nightmare

The `install()` of a vibe-coded module:

```php
// Naive installation
public function install()
{
    return parent::install()
        && $this->registerHook('displayProductAdditionalInfo')
        && $this->installDb();
}

private function installDb()
{
    $sql = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'mymodule_data` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `id_product` INT NOT NULL,
        `custom_field` VARCHAR(255) NOT NULL
    )';

    return Db::getInstance()->execute($sql);
}
```

The robust `install()`:

```php
// Multi-shop aware installation
public function install()
{
    if (Shop::isFeatureActive()) {
        Shop::setContext(Shop::CONTEXT_ALL);
    }

    if (!parent::install()) {
        $this->_errors[] = $this->l('Could not install module base');
        return false;
    }

    $hooks = [
        'displayProductAdditionalInfo',
        'displayBackOfficeHeader',
        'actionProductUpdate',
        'actionProductDelete',
        'actionShopDataDuplication', // ← Crucial for multi-shop!
        'actionObjectShopDeleteAfter',
    ];

    foreach ($hooks as $hook) {
        if (!$this->registerHook($hook)) {
            $this->_errors[] = sprintf($this->l('Could not register hook: %s'), $hook);
            return false;
        }
    }

    if (!$this->installDb()) {
        return false;
    }

    // Default configuration for all stores
    $this->initializeDefaultConfig();

    return true;
}

private function installDb()
{
    $sql = [];

    $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'mymodule_data` (
        `id_mymodule_data` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        `id_product` INT UNSIGNED NOT NULL,
        `custom_field` VARCHAR(255) NOT NULL,
        `date_add` DATETIME NOT NULL,
        `date_upd` DATETIME NOT NULL,
        INDEX (`id_product`)
    ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8mb4';

    // _shop table for multi-shop
    $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'mymodule_data_shop` (
        `id_mymodule_data` INT UNSIGNED NOT NULL,
        `id_shop` INT UNSIGNED NOT NULL,
        `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
        PRIMARY KEY (`id_mymodule_data`, `id_shop`),
        INDEX (`id_shop`)
    ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8mb4';

    // _lang table for multilingual support
    $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'mymodule_data_lang` (
        `id_mymodule_data` INT UNSIGNED NOT NULL,
        `id_lang` INT UNSIGNED NOT NULL,
        `id_shop` INT UNSIGNED NOT NULL DEFAULT 1,
        `custom_label` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`id_mymodule_data`, `id_lang`, `id_shop`),
        INDEX (`id_lang`),
        INDEX (`id_shop`)
    ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8mb4';

    foreach ($sql as $query) {
        if (!Db::getInstance()->execute($query)) {
            $this->_errors[] = $this->l('Database installation error');
            return false;
        }
    }

    return true;
}

// Crucial hook: when a store is duplicated, data must follow
public function hookActionShopDataDuplication($params)
{
    $oldShopId = (int) $params['old_id_shop'];
    $newShopId = (int) $params['new_id_shop'];

    Db::getInstance()->execute('
        INSERT INTO `' . _DB_PREFIX_ . 'mymodule_data_shop` (`id_mymodule_data`, `id_shop`, `active`)
        SELECT `id_mymodule_data`, ' . $newShopId . ', `active`
        FROM `' . _DB_PREFIX_ . 'mymodule_data_shop`
        WHERE `id_shop` = ' . $oldShopId
    );
}
```

AI **NEVER** generates `hookActionShopDataDuplication`. Never. And without it, store duplication breaks the module's data.

---

## 5. Tests and validation: what simply doesn't exist

A vibe-coded module has no tests. Zero. AI generates functional code, not quality infrastructure.

In a professional module, here's what exists beyond the code:

```
mymodule/
├── mymodule.php
├── config/
│   └── services.yml          ← Dependency injection
├── src/
│   ├── Controller/
│   ├── Repository/            ← Database abstraction layer
│   ├── Service/
│   └── Exception/             ← Typed business exceptions
├── tests/
│   ├── Unit/
│   │   ├── Service/
│   │   └── Repository/
│   └── Integration/
│       ├── HookTest.php
│       ├── MultiShopTest.php
│       └── InstallTest.php
├── upgrade/
│   ├── upgrade-1.1.0.php      ← Database migration
│   ├── upgrade-1.2.0.php
│   └── upgrade-2.0.0.php
├── views/
├── translations/
└── .github/
    └── workflows/
        └── ci.yml             ← Automated CI/CD
```

### Upgrade files: the great forgotten

When your module evolves, the database needs to migrate. AI never thinks to create upgrade files:

```php
// upgrade/upgrade-1.2.0.php
function upgrade_module_1_2_0($module)
{
    $sql = [];

    // Add a column without breaking existing data
    $sql[] = 'ALTER TABLE `' . _DB_PREFIX_ . 'mymodule_data`
              ADD COLUMN `priority` INT UNSIGNED NOT NULL DEFAULT 0 AFTER `custom_field`';

    // Migrate existing data
    $sql[] = 'UPDATE `' . _DB_PREFIX_ . 'mymodule_data` SET `priority` = 1 WHERE `active` = 1';

    // New hook needed
    if (!$module->registerHook('displayAfterBodyOpeningTag')) {
        return false;
    }

    foreach ($sql as $query) {
        if (!Db::getInstance()->execute($query)) {
            return false;
        }
    }

    // Clear cache
    if (method_exists('Cache', 'clean')) {
        Cache::clean('mymodule_*');
    }

    return true;
}
```

Without upgrade files, updating the module breaks all existing installations. That's the kind of thing you learn after receiving 200 support tickets in a single day.

---

## 6. Compatibility: the real craft

### Compatibility with other modules

A module never lives alone. On a typical PrestaShop store, there are 30 to 80 installed modules. A vibe-coded module:

- Overwrites overrides without checking if they already exist → crashes other modules
- Loads jQuery twice or loads an incompatible version → JavaScript broken everywhere
- Modifies ObjectModels without using hooks → modules observing these objects are never notified
- Adds CSS/JS everywhere instead of targeting relevant pages → global slowdown

```php
// What AI generates
public function hookDisplayHeader()
{
    // Loaded on ALL front pages
    $this->context->controller->addCSS($this->_path . 'views/css/style.css');
    $this->context->controller->addJS($this->_path . 'views/js/script.js');
}
```

```php
// What you should do
public function hookDisplayHeader()
{
    $controller = $this->context->controller;

    // Only load on relevant pages
    if ($controller instanceof ProductController) {
        $this->context->controller->registerStylesheet(
            'mymodule-product',
            'modules/' . $this->name . '/views/css/product.css',
            ['media' => 'all', 'priority' => 150]
        );
        $this->context->controller->registerJavascript(
            'mymodule-product',
            'modules/' . $this->name . '/views/js/product.js',
            ['position' => 'bottom', 'priority' => 150, 'attribute' => 'defer']
        );
    }
}
```

### PrestaShop version compatibility

A professional module must handle this:

```php
// Adapt code based on version
if (version_compare(_PS_VERSION_, '8.0.0', '>=')) {
    // PrestaShop 8: uses Symfony and Doctrine
    // Legacy AdminControllers are deprecated
    // Theme system has evolved
} elseif (version_compare(_PS_VERSION_, '1.7.7', '>=')) {
    // PrestaShop 1.7.7+: new hooks, new ProductPresenter
    // Symfony partially integrated
} else {
    // PrestaShop 1.7.x legacy
    // Still pre-Symfony code everywhere
}
```

---

## 7. The bottom line: what Vibe Coding does well, and where it stops

Let's be honest. Here's my assessment after 6 months of daily AI use in my PrestaShop development:

### What AI does very well

| Task | Time saved |
|------|-----------|
| Initial module scaffolding | ~60% |
| Basic Smarty template generation | ~50% |
| Writing simple SQL queries | ~40% |
| HelperForm form generation | ~70% |
| Code documentation | ~80% |
| Refactoring existing code | ~40% |

### What AI does poorly (or not at all)

| Problem | Production consequence |
|---------|----------------------|
| Security (tokens, permissions, SQL injection) | Store hacked, data stolen |
| Multi-shop | Corrupted data across stores |
| Performance (N+1, cache) | Server down during peak traffic |
| Complete action hooks | Inconsistent data, ERP/CRM desynchronized |
| Upgrade files | Module impossible to update |
| Cross-version compatibility | Module crashes on other versions |
| Robust error handling | White screens, 500 errors |
| GDPR compliance | Legal risk |
| Accessibility (a11y) | Legal non-compliance |

---

## 8. My method: AI as an accelerator, not a replacement

I'm not against Vibe Coding. **I'm against Vibe Coding without a safety net.**

Here's how I integrate AI into my daily workflow:

### 1. AI generates, I specify

I never ask *"create me a wishlist module"*. I ask:

> "Generate the WishlistRepository class with add, remove, getByCustomer methods. Use DbQuery, handle multi-shop with _shop joins, escape values with pSQL and (int). The getByCustomer method must use _PS_USE_SQL_SLAVE_."

### 2. AI codes, I review

Every generated line goes through my mental checklist:

- Security: token, permissions, escaping
- Multi-shop: context, _shop joins
- Multi-language: _lang joins
- Performance: number of queries, caching
- Hooks: complete (action + display)
- Compatibility: PS version, themes
- Errors: try/catch, Validate, fallbacks

### 3. AI iterates, I validate

AI is excellent at iterating quickly on variations. But the final validation is human, with tests on a real store, with real data, in a real multi-shop context.

---

## Conclusion: Vibe Coding doesn't replace 10 years of production failures

Vibe Coding is a wonderful tool **in the hands of a developer who knows what they're doing**. It accelerates work by 30 to 50%.

But in the hands of someone who doesn't know PrestaShop's pitfalls — and there are countless — it's a **technical debt generator**, a source of security vulnerabilities, and a recipe for unstable stores.

The 80% of vibe-coded modules that will never make it to production aren't modules that are poorly coded in a syntactic sense. AI writes code that compiles, that executes, that appears to work. **That's precisely what makes them dangerous.**

They fail on edge cases, specific contexts, inter-module interactions, load scaling, updates, and business constraints that only field experience can teach.

**The expertise of a senior PrestaShop developer isn't knowing how to write PHP. It's knowing everything that can go wrong in production, and preventing it before it happens.**

> Vibe Coding generates code.
> Experience generates trust.

And in e-commerce, when every minute of downtime costs thousands of euros, **trust is what has value**.

---

*You have an AI-generated module and you're wondering if it's ready for production? I offer a **comprehensive technical audit** with a detailed report, priority fixes, and technical debt assessment. Because the best time to find problems is before your customers do.*

*What about you — what's your experience with Vibe Coding on PrestaShop? Any AI modules that held up in production? Disasters narrowly avoided?*
