---
layout: post
title: Exhaustive report on security protocols and development standards for PrestaShop modules
date: 2026-01-05
lang: en
ref: rapport-securite-modules-prestashop
author: Nicolas Dabene
categories:
- PrestaShop
- Security
- Development
tags:
- prestashop
- security
- modules
- development
- best-practices
- compliance
- php
- symfony
excerpt: Comprehensive reference to harden PrestaShop 1.7 and 8 modules against SQLi, XSS, CSRF, and path traversal.
image: /assets/images/blog/2026/01/securite-prestashop.webp
keywords:
- PrestaShop
- Security
- PrestaShop modules
- Development standards
- Data validation
difficulty: Advanced
technologies:
- PrestaShop 1.7
- PrestaShop 8
- PHP 8
- Symfony
estimated_reading_time: 18 minutes
---

# Exhaustive report on security protocols and development standards for PrestaShop modules

## 1. Introduction: the cybersecurity landscape in e-commerce

E-commerce platforms handle high-value data (credentials, payments, customer records) and are prime targets. In PrestaShop, the attack surface depends heavily on module quality: a single vulnerable connector can compromise the whole shop. This report provides a complete security reference for building PrestaShop modules (1.7 and 8), based on official documentation, Marketplace Addons requirements, and community audits (including Friends of Presta). Goal: deliver resilient code against SQL injection, XSS, CSRF, path traversal, and structural flaws.

## 2. Architecture and structural integrity: first line of defense

### 2.1 Execution context protection and isolation

Every PHP file must run only through the core dispatcher. Add this guard at the top of every PHP file (classes, helpers, install scripts, PHP views) to block direct access:

```php
<?php
if (!defined('_PS_VERSION_')) {
    exit;
}
```

If `_PS_VERSION_` is not defined, the call did not come from PrestaShop; execution stops before any leak or partial run.

### 2.2 Directory listing prevention

Place an `index.php` in every directory and subdirectory of the module to prevent file enumeration (including asset folders). Minimal example:

```php
<?php
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('Location: ../');
exit;
```

For Apache, add a `.htaccess` at the module root to deny direct access to templates and config files.

### 2.3 Dependency hygiene and the PHPUnit case

Third-party libraries can introduce supply chain risks (e.g., accidentally shipping PHPUnit with the vulnerable `eval-stdin.php`). Good practices:

- Exclude from the production ZIP any test folders (`tests/`, `spec/`), test configs (`phpunit.xml`), and `require-dev` dependencies.
- Install in production via `composer install --no-dev --optimize-autoloader`.
- Keep libraries updated to integrate security fixes.

### 2.4 Compatibility declaration and lifecycle

Declare compatibility explicitly via `ps_versions_compliancy` and avoid open-ended bounds:

```php
$this->ps_versions_compliancy = ['min' => '1.7.0.0', 'max' => '8.99.99'];
```

This protects merchants by blocking installs on unsupported versions.

## 3. Data validation and sanitization: theory and practice

### 3.1 Input abstraction with `Tools::getValue()`

Direct access to `$_GET` and `$_POST` is discouraged. Use `Tools::getValue($key, $defaultValue)` to centralize access, benefit from URL decoding, and avoid undefined indexes. It does not sanitize: follow with strict validation.

### 3.2 The `Validate` class: barrier against malformed data

Before any business logic or persistence, apply the right `Validate` methods:

- Numeric and boolean: `Validate::isInt()`, `Validate::isUnsignedInt()`, `Validate::isFloat()`, `Validate::isBool()`.
- Strings and HTML: `Validate::isGenericName()` for labels, `Validate::isCleanHtml()` for rich content (`$allow_iframe` only when strictly needed).
- Specific: `Validate::isFileName()` for uploads, `Validate::isHookName()` for dynamic hooks.

### 3.3 Path traversal prevention

For any file reference coming from user input, strip path sequences and confine access to the intended folder:

```php
$safeFilename = basename(Tools::getValue('file'));
if (!Validate::isFileName($safeFilename)) {
    die('Bad filename');
}

$targetDir = _PS_MODULE_DIR_.'mymodule/uploads/';
if (file_exists($targetDir.$safeFilename)) {
    // Allowed processing
}
```

Using a whitelist of expected files further reduces exposure.

## 4. Database security: preventing SQL injection

### 4.1 The `Db` class and casting

All queries must go through `Db` (no direct PDO/mysqli). Escape by type:

- Integers: cast `(int)$id`.
- Strings: `pSQL($name)`.
- SQL identifiers (table/column): `bqSQL($table)`.
- Arrays: `array_map('intval', $ids)` or `array_map('pSQL', $values)` before `implode`.

### 4.2 Securing `IN` clauses and lists

```php
$ids = Tools::getValue('ids', []);
$safeList = implode(',', array_map('intval', (array) $ids));
$sql = 'SELECT * FROM '._DB_PREFIX_."product WHERE id_product IN ($safeList)";
```

For string lists, wrap each `pSQL` value in single quotes.

### 4.3 Abstraction with `DbQuery`

Structure queries with `DbQuery` to reduce risky concatenations and ease audits:

```php
$query = new DbQuery();
$query->select('p.id_product, pl.name');
$query->from('product', 'p');
$query->leftJoin('product_lang', 'pl', 'p.id_product = pl.id_product');
$query->where('pl.id_lang = '.(int) $context->language->id);
$query->where('p.reference = "'.pSQL($ref).'"');
```

### 4.4 Prohibited practices

- Never alter core tables (create satellite tables instead).
- Always prefix tables with `_DB_PREFIX_`.

## 5. Output security and XSS prevention

### 5.1 Smarty escaping modifiers

Each variable in `.tpl` must be escaped according to context:

- HTML: `{$var|escape:'htmlall':'UTF-8'}`
- HTML attribute: `{$var|escape:'html':'UTF-8'}`
- JavaScript: `{$var|escape:'javascript':'UTF-8'}`
- URL: `{$var|escape:'url'}`

### 5.2 The `nofilter` controversy

`{$content nofilter}` disables XSS protections. Use it only on HTML validated upstream with `Validate::isCleanHtml()`. Never apply it to raw user input (`Tools::getValue`).

## 6. Authentication, authorization, and CSRF protection

### 6.1 Cross-Site Request Forgery (CSRF)

#### 6.1.1 Back Office (Admin)

- Generation: `Tools::getAdminTokenLite('AdminMyController')`.
- Explicit validation for custom actions or AJAX:

```php
if (!Tools::isSubmit('submitAction') || Tools::getValue('token') !== Tools::getAdminTokenLite('AdminMyController')) {
    die('Forbidden');
}
```

Links generated via `Context::getContext()->link->getAdminLink(...)` include the token automatically.

#### 6.1.2 Front Office

- Generation: `Tools::getToken()` (session-bound).
- Validate server-side before any processing.
- In `ModuleFrontController`, set `$this->ssl = true;` to force HTTPS and protect token transport.

### 6.2 Password hashing evolution

PrestaShop 1.7/8 uses bcrypt through core services (`PrestaShop\PrestaShop\Core\Crypto\Hashing`). For modules handling authentication, support verification of legacy MD5 hashes during migration, then rehash to bcrypt on successful login.

## 7. Modernization and PrestaShop 8 standards

### 7.1 Strict typing and PHP rigor

PrestaShop 8 supports PHP 8.0/8.1: respect method signatures (parameter and return types) when overriding the core, and favor `declare(strict_types=1);` to reduce implicit behaviors.

### 7.2 Service-oriented architecture (Symfony)

Declare controllers as services (`config/services.yml`) and inject dependencies (repositories, translator, logger) instead of static calls. This improves testability and lets you apply Symfony security policies.

### 7.3 Removal of deprecated features

Legacy APIs removed in 8 require an audit of deprecated calls before migration. Replace direct database or file access with modern services.

## 8. Quality assurance and validation tools

### 8.1 PrestaShop Validator

Always submit the module to validator.prestashop.com: it detects structural errors, forbidden PHP functions (`eval`, `shell_exec`), Smarty escaping issues, and licensing problems.

### 8.2 PHPStan: advanced static analysis

Integrate `prestashop/php-dev-tools` and PHPStan into CI to catch type errors, missing methods, and dead branches before runtime.

### 8.3 Threat intelligence: Friends of Presta

Follow security advisories from Friends of Presta to anticipate attack patterns seen in the wild (SQLi via `Tools::getValue`, path traversal, etc.) and patch modules promptly.

## Conclusion

Securing a PrestaShop module requires defense in depth: structural guards (`index.php`, `.htaccess`), strict validation and sanitization (`Tools`, `Validate`, `pSQL`), safe output (Smarty escaping), anti-CSRF mechanisms, and adoption of modern PrestaShop 8 standards. Coupled with audit tools (Validator, PHPStan) and active monitoring, developers can ship robust modules that protect merchants and customers against current threats.
