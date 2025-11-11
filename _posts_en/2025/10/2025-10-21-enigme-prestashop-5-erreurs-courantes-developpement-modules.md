---
layout: post
title: '🧩 PrestaShop Puzzle: Can You Find the 5 Errors?'
date: 2025-10-21
author: Nicolas Dabène
lang: en
ref: prestashop-puzzle-5-common-module-errors
categories:
- PrestaShop
- Development
- PHP
- Tutorial
tags:
- PrestaShop
- development
excerpt: PrestaShop developers, I challenge you! Discover the 5 common errors in this best-sellers module and improve your development skills.
image: /assets/images/blog/2025/10/2025-10-21-enigme-prestashop-erreurs.jpg
featured: true
difficulty: Intermediate
technologies:
- PrestaShop
- PHP
- MySQL
- Smarty
- Hook
estimated_reading_time: 15 minutes
is_future: true
faq:
- question: Why is parent::__construct() essential in a PrestaShop module?
  answer: parent::__construct() initializes the context ($this->context), configures the Smarty environment, prepares translations ($this->l()), and initializes all essential module properties. Without this call, you'll get fatal errors 'Call to undefined method' or 'Undefined property' as soon as you use these features.
- question: Why must you call parent::install() when installing a module?
  answer: parent::install() registers your module in the PrestaShop database (ps_module table), defines the activation status, and allows PrestaShop to 'see' your module. Without this call, the module seems installed but doesn't appear in the module list and hooks don't work.
- question: What is the correct way to access PrestaShop context in a hook?
  answer: 'Best practice is to use Context::getContext() which works everywhere and is more reliable. You can also use $this->context (possible after parent::__construct()). The context contains all information about the current environment: language, shop, customer, currency.'
- question: How to correctly assign variables to Smarty in PrestaShop?
  answer: Use $this->context->smarty->assign(array('products' => $bestSellers)) in array format. Smarty expects a complete associative array with all variables, not individual calls. It's more performant (one call), more readable (all variables in one place), and easier to maintain.
- question: What is the correct path structure for hook templates?
  answer: 'PrestaShop follows a strict convention: views/templates/hook/ for hook templates, views/templates/admin/ for administration, and views/templates/front/ for front-office controllers. The complete path in display() must be: $this->display(__FILE__, ''views/templates/hook/bestsellers.tpl'').'
---
# 🧩 PrestaShop Puzzle: Can You Find the 5 Errors?

PrestaShop developers, I challenge you! 🚀

Are you ready to take on the challenge? I've created a **medium level** puzzle that tests your PrestaShop module development knowledge. The code below contains **5 common errors** that every PrestaShop developer has probably encountered (or made 😅).

Imagine yourself as a detective in a mystery novel. You have seemingly innocent code before you, but it hides mysteries. Your mission: identify the 5 errors that could crash your module in production. Ready? Let's go!

## 🎯 The Puzzle Context

You need to create a module that displays the month's best-selling products with a special badge on the homepage. Nothing very complex apparently, but as often with PrestaShop, the devil is in the details.

Here's the code to analyze. Take your time, observe each line, and note the errors you spot. I'll give you a hint: these errors are extremely common and can cause bugs that are difficult to debug.

## 🔍 The Code to Analyze

```php
class BestSellersModule extends Module
{
    public function __construct()
    {
        $this->name = 'bestsellers';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'YourName';

        // ERROR 1: What's missing here?

        $this->displayName = $this->l('Best Sellers of the Month');
        $this->description = $this->l('Displays best-selling products');
    }

    public function install()
    {
        // ERROR 2: How to correctly install a module?
        return $this->registerHook('displayHome');
    }

    public function hookDisplayHome($params)
    {
        // ERROR 3: What's the right way to retrieve context?
        $id_lang = $this->context->language->id;
        $id_shop = $this->context->shop->id;

        $bestSellers = $this->getBestSellers($id_lang, $id_shop);

        // ERROR 4: How to correctly assign variables to Smarty?
        $this->smarty->assign('products', $bestSellers);

        // ERROR 5: What's the correct path for the template?
        return $this->display(__FILE__, 'bestsellers.tpl');
    }

    protected function getBestSellers($id_lang, $id_shop, $limit = 10)
    {
        $sql = new DbQuery();
        $sql->select('p.id_product, pl.name, p.price')
            ->from('product', 'p')
            ->leftJoin('product_lang', 'pl',
                'p.id_product = pl.id_product AND pl.id_lang = ' . (int)$id_lang)
            ->leftJoin('order_detail', 'od', 'p.id_product = od.product_id')
            ->where('p.active = 1')
            ->where('p.id_shop = ' . (int)$id_shop)
            ->groupBy('p.id_product')
            ->orderBy('SUM(od.product_quantity) DESC')
            ->limit($limit);

        return Db::getInstance()->executeS($sql);
    }
}
```

So, did you find them? Don't worry if you didn't spot everything on the first pass. Even experienced developers can miss these classic errors. Before giving you the solutions, let me explain why these errors are so important.

## 🤔 Why These Errors Are Crucial?

In PrestaShop development, certain errors can seem harmless but have dramatic consequences:

- An initialization error can crash your entire module
- A context problem can cause unpredictable bugs depending on the environment
- Poor template management can prevent display
- SQL problems can slow down your shop or display incorrect data

It's like building a house: if the foundations are poorly made, the entire structure risks collapsing. Now, let's discover the solutions together.

## ✅ DETAILED SOLUTIONS

### **Error 1: Missing `parent::__construct()` - The Fatal Oversight**

```php
public function __construct()
{
    $this->name = 'bestsellers';
    $this->tab = 'front_office_features';
    $this->version = '1.0.0';
    $this->author = 'YourName';

    parent::__construct(); // ✅ ESSENTIAL

    $this->displayName = $this->l('Best Sellers of the Month');
    $this->description = $this->l('Displays best-selling products');
}
```

**Why is this error critical?**

Imagine you're building a car. You assemble the engine, wheels, body, but you forget to connect the battery. The car will look perfect, but it will never start!

`parent::__construct()` plays exactly this "battery" role in PrestaShop. It:
- Initializes the context (`$this->context`)
- Configures the Smarty environment
- Prepares translations (`$this->l()`)
- Initializes all essential properties

**Consequence if omitted:** Fatal error "Call to undefined method" or "Undefined property" as soon as you use `$this->context` or `$this->l()`.

**Golden rule:** `parent::__construct()` must ALWAYS be called first in your constructor.

---

### **Error 2: `parent::install()` Not Called - The Ghost Module**

```php
public function install()
{
    return parent::install() // ✅ Registers the module in DB
        && $this->registerHook('displayHome');
}
```

**The restaurant analogy:**

You want to open a restaurant. You choose the location, decorate the interior, hire staff, but you forget to request the operating license. Your restaurant can cook the world's best dishes, but no one will ever know because it doesn't officially exist!

`parent::install()` registers your module in PrestaShop's database:
- It creates the entry in the `ps_module` table
- It defines the activation status
- It allows PrestaShop to "see" your module

**Consequence if omitted:** The module seems installed, but doesn't appear in the module list, and hooks don't work.

**Golden rule:** Always return `parent::install() && [your conditions]`.

---

### **Error 3: Context Access - The Faulty GPS**

```php
public function hookDisplayHome($params)
{
    $context = Context::getContext(); // ✅ Best practice
    $id_lang = $context->language->id;
    $id_shop = $context->shop->id;

    // OR: $id_lang = $this->context->language->id;
    // (only possible after parent::__construct())
```

**The GPS analogy:**

You're going on a trip with your GPS, but you don't turn it on. You know your destination, you have the map, but you don't know where you are currently. Result: you drive in circles!

PrestaShop context contains all information about the current environment:
- Current language
- Active shop (in multi-shop)
- Connected customer
- Currency used
- Etc.

**Why `Context::getContext()` is preferable:**
- It works everywhere, even outside Module classes
- It's more reliable than `$this->context` in certain cases
- It follows PrestaShop best practices

**Consequence if misused:** Unpredictable bugs depending on environment (incorrect language, wrong shop, etc.).

---

### **Error 4: Incorrect Smarty Assignment - The Distracted Delivery Person**

```php
$this->context->smarty->assign(array(
    'products' => $bestSellers
)); // ✅ Array format
```

**The delivery person analogy:**

You order a pizza and tell the delivery person: "Here's the address: 123 Peace Street. And also, don't forget to ring twice." But you don't tell them which pizza to order!

Smarty expects a complete associative array with all variables, not individual calls. It's like giving a complete shopping list at once rather than calling the store for each item.

**Why it's important:**
- Performance: One call instead of multiple
- Readability: All variables in one place
- Maintenance: Easier to debug

**Consequence if done wrong:** Variables not transmitted to template, incorrect display.

---

### **Error 5: Incorrect Template Path - The Lost Address**

```php
return $this->display(__FILE__, 'views/templates/hook/bestsellers.tpl'); // ✅
```

**The mailman analogy:**

You send an important letter, but you write the recipient's address on the envelope instead of using the correct address. The mailman won't know where to deliver it!

PrestaShop follows a very strict naming convention for templates:
- `views/templates/hook/` for hook templates
- `views/templates/admin/` for administration templates
- `views/templates/front/` for front-office controllers

**Why this structure:**
- Logical code organization
- Compatibility with child themes
- Easier updates

**Consequence if done wrong:** Template not found, display error.

## 💡 Bonus Questions for Experts

Now that we've corrected the basic errors, let's move on to optimizations for experienced developers!

### **1. How would you optimize the SQL query?**

```php
protected function getBestSellersOptimized($id_lang, $id_shop, $limit = 10)
{
    // Calculate current month
    $date_from = date('Y-m-01'); // First day of month
    $date_to = date('Y-m-t');   // Last day of month

    $sql = new DbQuery();
    $sql->select('p.id_product, pl.name, p.price, SUM(od.product_quantity) as total_sold')
        ->from('product', 'p')
        ->innerJoin('product_lang', 'pl', 'p.id_product = pl.id_product AND pl.id_lang = ' . (int)$id_lang)
        ->innerJoin('order_detail', 'od', 'p.id_product = od.product_id')
        ->innerJoin('orders', 'o', 'od.id_order = o.id_order')
        ->where('p.active = 1')
        ->where('p.id_shop = ' . (int)$id_shop)
        ->where('o.valid = 1') // ✅ Only validated orders
        ->where('o.date_add >= "' . pSQL($date_from) . '"')
        ->where('o.date_add <= "' . pSQL($date_to) . '"')
        ->groupBy('p.id_product')
        ->orderBy('SUM(od.product_quantity) DESC')
        ->limit($limit);

    // Use slave server for reads
    return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
}
```

**Optimizations made:**
- **Month filtering**: Only current month's sales
- **Validated orders only**: Avoids counting cancelled orders
- **INNER JOIN**: More performant than LEFT JOIN when you want results
- **Slave server**: Reduces load on master server

---

### **2. How would you add a caching system?**

```php
public function hookDisplayHome($params)
{
    // Create unique cache ID
    $cache_id = $this->getCacheId('bestsellers_' . $this->context->shop->id . '_' . $this->context->language->id);

    // Check if cache exists
    if (!$this->isCached('views/templates/hook/bestsellers.tpl', $cache_id)) {
        // If not cached, retrieve data
        $bestSellers = $this->getBestSellers(
            $this->context->language->id,
            $this->context->shop->id
        );

        // Format data for template
        $this->context->smarty->assign(array(
            'products' => $bestSellers,
            'module_name' => $this->name
        ));
    }

    // Return template (cached or not)
    return $this->display(__FILE__, 'views/templates/hook/bestsellers.tpl', $cache_id);
}
```

**Cache advantages:**
- **Performance**: Avoids repeated SQL queries
- **Scalable**: Supports multi-shop and multi-language
- **Automatic**: PrestaShop clears cache during important changes

---

### **3. What should you do in the `uninstall()` method?**

```php
public function uninstall()
{
    // Unregister hooks
    $this->unregisterHook('displayHome');

    // Delete custom configurations
    Configuration::deleteByName('BESTSELLERS_LIMIT');
    Configuration::deleteByName('BESTSELLERS_SHOW_PRICE');

    // Clean up any temporary files
    // (if your module creates them)

    // Call parent to finalize
    return parent::uninstall();
}
```

**Why it's crucial:**
- **Cleanliness**: Avoids orphaned data
- **Security**: Removes potential access
- **Maintenance**: Facilitates reinstallations

---

### **4. How to make the number of products configurable?**

In `getContent()` (method called from back-office):

```php
public function getContent()
{
    $output = '';

    // Form processing
    if (Tools::isSubmit('submit_' . $this->name)) {
        $limit = (int)Tools::getValue('BESTSELLERS_LIMIT');
        if ($limit > 0 && $limit <= 50) {
            Configuration::updateValue('BESTSELLERS_LIMIT', $limit);
            $output .= $this->displayConfirmation($this->l('Configuration updated'));
        } else {
            $output .= $this->displayError($this->l('Invalid value'));
        }
    }

    // Form display with HelperForm
    $helper = new HelperForm();
    // Helper configuration...

    $fields_form = array(
        'form' => array(
            'legend' => array('title' => $this->l('Configuration')),
            'input' => array(
                array(
                    'type' => 'text',
                    'label' => $this->l('Number of products'),
                    'name' => 'BESTSELLERS_LIMIT',
                    'required' => true,
                    'desc' => $this->l('Maximum 50 products')
                )
            ),
            'submit' => array('title' => $this->l('Save'))
        )
    );

    $helper->fields_value = array(
        'BESTSELLERS_LIMIT' => Configuration::get('BESTSELLERS_LIMIT', 10)
    );

    return $output . $helper->generateForm(array($fields_form));
}
```

---

### **5. Which method to use for formatting prices?**

```php
// Recommended method since PrestaShop 1.7.6
public function formatPrice($price, $id_currency = null)
{
    $context = Context::getContext();
    $id_currency = $id_currency ?: $context->currency->id;
    $currency = new Currency($id_currency);

    return $context->getCurrentLocale()->formatPrice(
        $price,
        $currency->iso_code
    );
}

// OR use Product::getProductsProperties to format automatically
public function hookDisplayHome($params)
{
    $bestSellers = $this->getBestSellers($this->context->language->id, $this->context->shop->id);

    // Get complete product properties (with formatted prices)
    $products = Product::getProductsProperties(
        $this->context->language->id,
        $bestSellers
    );

    $this->context->smarty->assign('products', $products);
    return $this->display(__FILE__, 'views/templates/hook/bestsellers.tpl');
}
```

**⚠️ IMPORTANT NOTICE:**
`Tools::displayPrice()` is **deprecated since PrestaShop 1.7.6** and should no longer be used. Always prefer `$context->getCurrentLocale()->formatPrice()`.

## 🎓 Conclusion: The Importance of Best Practices

This puzzle has shown you that PrestaShop development isn't just about code, but also rigor and knowledge of best practices. These 5 errors are:

1. **parent::__construct()** - The invisible foundation
2. **parent::install()** - Official registration
3. **Context::getContext()** - Current environment
4. **assign(array(...))** - Data transmission
5. **views/templates/hook/** - File organization

**Lesson to remember:** In PrestaShop, details matter enormously. A small error can make the difference between a module that works perfectly and one that causes sleepless debugging nights.

Feel free to share your answers in the comments, or propose your own puzzles! And remember: even the best developers have made these errors. It's by correcting them that we progress.

**Bonus question for you:** What's your most memorable PrestaShop error? Share it in comments to help the community! 🚀

---

*Find more PrestaShop tutorials on [my blog](/en/) and feel free to follow me on [LinkedIn](https://www.linkedin.com/in/nicolasdabene/) for more technical content!*
