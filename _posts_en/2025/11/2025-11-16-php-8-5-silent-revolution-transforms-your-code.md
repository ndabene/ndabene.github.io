---
layout: post
title: 'PHP 8.5: The Silent Web Revolution'
date: 2025-11-16
author: Nicolas Dabène
categories:
- PHP
- Development
tags:
- PHP 8.5
- performance
- security
- pipe operator
- new features
- modernization
excerpt: PHP 8.5 arrives in November 2025 with the pipe operator, smart cloning, and
  40+ improvements that transform the way you code. Discover how these innovations
  revolutionize the performance, security, and readability of your applications.
image: /assets/images/blog/2025/11/php-8-5-revolution-silencieuse.jpeg
featured: true
difficulty: Intermediate
technologies:
- PHP 8.5
- Zend Engine
- OPcache
- URI API
estimated_reading_time: 15 minutes
lang: en
faq:
- question: What is the pipe operator introduced in PHP 8.5?
  answer: 'The pipe operator |> allows you to chain function calls expressively, passing
    the result from the left as an argument to the right. For example: $result = ''Hello''
    |> strtoupper(...) |> strlen(...) transforms and counts in a single readable line.'
- question: Why is OPcache becoming mandatory in PHP 8.5?
  answer: OPcache is now always compiled and enabled by default to ensure all PHP
    applications automatically benefit from bytecode acceleration, eliminating suboptimal
    configurations and ensuring consistent performance everywhere.
- question: How does clone with simplify immutable object management?
  answer: 'The clone with syntax allows you to create a copy of an object while modifying
    certain properties in one statement: $newUser = clone $user with [''name'' =>
    ''Alice'']. This avoids complex factories or reflection to work around readonly.'
- question: What performance gains can we expect with PHP 8.5?
  answer: PHP 8.5 brings approximately 5-10% performance improvement on classic web
    applications thanks to OPcache and JIT optimizations, with a slight reduction
    in memory usage depending on use cases.
- question: Why is the new URI extension more secure than parse_url?
  answer: The URI extension provides an API compliant with RFC 3986 and WHATWG URL,
    eliminating known vulnerabilities in parse_url concerning malformed or encoded
    URLs. It prevents character confusion attacks and guarantees reliable, standardized
    parsing.
- question: What are the main deprecated functions in PHP 8.5?
  answer: Manual resource closing functions (curl_close, imagedestroy, finfo_close,
    xml_parser_free) are deprecated because the engine automatically manages their
    lifecycle. Non-canonical casts (boolean, integer, double) and the backtick operator
    are also deprecated.
- question: How do backtraces on fatal errors improve debugging?
  answer: In case of a fatal error, PHP 8.5 now provides the complete call stack via
    error_get_last, allowing you to immediately identify the faulty execution chain
    rather than just the final line. A huge time saver for diagnosing complex issues.
- question: Can PrestaShop benefit from PHP 8.5?
  answer: 'Absolutely. PrestaShop would benefit from 5-10% performance gains, the
    secure URI API for URL processing, Intl improvements for multilingual support,
    and new attributes like #[Override] to secure its module override system.'
---


# PHP 8.5: The Silent Revolution That Transforms Your Code

Imagine being able to write `$users |> filter(...) |> count(...)` instead of juggling temporary variables. Imagine cloning an object while modifying a property in one go. Imagine all your fatal errors finally displaying their true origin. This isn't science fiction: it's **PHP 8.5, and it's coming in November 2025**.

In my PHP development practice over more than 15 years, I've rarely seen a minor version bring so many concrete innovations while remaining so discreet. PHP 8.5 isn't a groundbreaking revolution like PHP 7 or 8 was. It's an intelligent evolution that transforms your daily development routine without making noise, but with formidable efficiency.

## Introduction

PHP 8.5 represents the culmination of the maturation begun with PHP 8.0. Where PHP 8.0 introduced the foundations (JIT, union types, attributes), PHP 8.5 refines the edifice with **over 40 targeted improvements** that touch every aspect of the language: syntax, performance, security, internationalization.

The philosophy of this version? **Eliminate daily friction.** Each new feature responds to a real developer frustration: verbose code, laborious debugging, obsolete or dangerous APIs, fragile URL parsing. PHP 8.5 doesn't reinvent the wheel, it finally makes it perfectly round.

This version perfectly illustrates the principle of *"Secure by Design"*: bad practices become impossible or deprecated, good practices become natural. Mandatory OPcache, automatic resource closing, standardized URI API, systematic backtraces... everything works together to make your applications more robust by default.

Let's dive into these innovations that will transform the way you code in PHP.

## The Pipe Operator: Finally Readable Functional Code

### The End of Useless Temporary Variables

How many times have you written this?

```php
$users = $userRepository->fetchUsers();
$admins = array_filter($users, fn($u) => $u->isAdmin());
$count = count($admins);
```

Three lines. Two throwaway variables that pollute your scope. An interrupted flow of thought.

PHP 8.5 introduces the pipe operator `|>`, inspired by functional languages (F#, Elixir, Hack), which radically changes the game:

```php
$count = $userRepository->fetchUsers()
    |> (fn($list) => array_filter($list, fn($u) => $u->isAdmin()))
    |> count(...);
```

A single expression. The result from the left becomes the argument on the right. Your intention reads like a sentence: *"Fetch the users, filter the admins, count them."* No noise, no distractions.

### Point-Free Style and Expressiveness

The pipe operator shines particularly with **first-class callables** (the `...` syntax introduced in PHP 8.1):

```php
// Elegant data transformation
$finalPrice = $product->getPrice()
    |> applyDiscount(...)
    |> addTax(...)
    |> round(..., 2);

// Validation pipeline
$isValid = $input
    |> trim(...)
    |> strtolower(...)
    |> validateEmail(...);
```

Note how the code reads naturally from top to bottom, following the transformation flow. This is the very essence of functional programming: composing pure functions to create complex transformations from simple operations.

### The Rules of the Game

The pipe operator isn't magic, it has strict rules that guarantee its predictability:

- **Left → right evaluation**: each expression is calculated sequentially
- **Single argument**: the function on the right must accept exactly one parameter
- **Consistent precedence**: `|>` is placed before comparisons, after arithmetic
- **No black magic**: it's syntactic sugar, no runtime overhead

```php
// ❌ ERROR: multi-argument function
$result = $data |> array_map(fn($x) => $x * 2, ...); // Compile error

// ✅ CORRECT: wrapper or partial application
$result = $data |> (fn($arr) => array_map(fn($x) => $x * 2, $arr));
```

This constraint may seem limiting, but it forces clear design: each step of the pipeline does one thing and does it well.

### Real-World Use Cases

In **PrestaShop**, imagine processing orders with a pipeline:

```php
$monthlyRevenue = Order::fetchByMonth($month)
    |> (fn($orders) => array_filter($orders, fn($o) => $o->isPaid()))
    |> (fn($orders) => array_map(fn($o) => $o->getTotalPaid(), $orders))
    |> array_sum(...);
```

Or building a dynamic pricing system:

```php
$displayPrice = $basePrice
    |> applyCustomerGroupDiscount($customer, ...)
    |> applyVolumeDiscount($quantity, ...)
    |> convertCurrency($targetCurrency, ...)
    |> formatPrice(...);
```

The benefit? The code becomes **self-documenting**. Each step is explicit, independently testable, and reusable. No more lengthy methods where you lose track.

## Clone With: The End of the Immutable Object Ordeal

### The Problem with Readonly Properties

PHP 8.1 introduced **readonly** properties, excellent for immutability... until you want to create a variant of an object:

```php
readonly class User {
    public function __construct(
        public string $name,
        public string $email,
        public int $age
    ) {}
}

// How to create a User with just the email changed?
// Option 1: Verbose factory
$newUser = new User($user->name, 'newemail@example.com', $user->age);

// Option 2: Reflection (breaks readonly, anti-pattern)
$reflection = new ReflectionProperty($user, 'email');
$reflection->setValue($user, 'newemail@example.com'); // 😱
```

Frustrating, right? Immutability is an excellent practice, but verbosity was killing adoption.

### The Elegant Solution: clone with

PHP 8.5 solves this problem with syntax inspired (again) by functional languages:

```php
$newUser = clone $user with ['email' => 'newemail@example.com'];
```

One line. Readable. Safe. The new object is a perfect copy of `$user`, except for email which takes the new value.

### In-Depth Operation

The magic operates in several steps:

1. **Classic cloning**: `clone` creates a shallow copy of the object
2. **Call to `__clone()`**: if defined, your custom cloning logic executes
3. **Property override**: the `with` array overwrites the specified values
4. **Hook respect**: if you use property hooks (PHP 8.4+), they are invoked

```php
readonly class Money {
    public function __construct(
        public float $amount,
        public string $currency
    ) {}

    public function __clone() {
        // Custom logic if necessary
        echo "Cloning money object\n";
    }
}

$euros = new Money(100.0, 'EUR');
$dollars = clone $euros with ['currency' => 'USD', 'amount' => 120.0];

// Output: "Cloning money object"
// $dollars->amount === 120.0
// $dollars->currency === 'USD'
```

### Clone as First-Class Callable

Cherry on top: `clone` becomes a first-class callable:

```php
$users = [/* ... */];
$userCopies = array_map(clone(...), $users);

// Or with uniform modifications
$anonymized = array_map(
    fn($user) => clone $user with ['email' => 'redacted@example.com'],
    $users
);
```

**Architectural impact**: Patterns like Event Sourcing, Value Objects, or Copy-on-Write become trivial to implement. No more complex builders or lengthy `withX()` methods (PSR-7 withers pattern).

## Mandatory OPcache: Guaranteed Performance for Everyone

### The End of an Anomaly

Historically, OPcache was an optional extension. You could compile PHP without it. **Big mistake.**

Why? Because without OPcache, PHP recompiles your code on every request. Imagine recompiling an e-commerce monolith on every visit: catastrophic.

Yet, production environments were still running without OPcache, due to lack of knowledge or deficient configuration. PHP 8.5 puts an end to this absurdity.

### OPcache: Always There, Always Active

Since PHP 8.5, OPcache is:

- **Compiled by default**: impossible to disable at compilation
- **Enabled by default**: `opcache.enable=1` from installation
- **Integral part of the engine**: not a third-party extension

Consequence? All PHP applications automatically benefit:

- Drastic CPU reduction: bytecode is cached
- Response times divided by 3 to 10 depending on complexity
- Improved scalability: less load per request

### What This Changes for You

If you develop with Docker, Kubernetes, or deploy on cloud platforms:

```dockerfile
# Before PHP 8.5: mandatory manual configuration
RUN docker-php-ext-install opcache
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini
RUN echo "opcache.memory_consumption=128" >> /usr/local/etc/php/conf.d/opcache.ini

# With PHP 8.5: OPcache already there, just optimize parameters
RUN echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini
```

For **PrestaShop**? It's huge. PrestaShop loads hundreds of classes per request. Without OPcache, each request recompiles megabytes of code. With mandatory OPcache, zero risk of botched config = guaranteed production performance.

### JIT: Incremental but Real Gains

The **JIT** (Just-In-Time compiler), introduced in PHP 8.0, continues to evolve. PHP 8.5 brings:

- 5-10% improvement on standard web applications
- Memory optimizations: reduced footprint in certain cases
- Better profiling: refined internal diagnostics

JIT remains especially beneficial for intensive computing (image processing, massive XML/JSON parsing, complex algorithms). For classic e-commerce (I/O-bound), the impact is moderate but cumulative.

## Backtraces on Fatal Errors: Debugging Revolutionized

### The Nightmare of "Fatal Error in Unknown on Line 42"

Who hasn't seen this in production?

```
Fatal error: Allowed memory size exhausted in /var/www/classes/Product.php on line 1247
```

Perfect. You know where it died. But why? What chain of calls led to this disaster?

Before PHP 8.5, you had to:

- Attempt to reproduce locally (good luck)
- Add logging everywhere (powerful but time-consuming)
- Enable Xdebug in production (🔥 performance hit)

### The Solution: Automatic Backtraces

PHP 8.5 solves this problem elegantly: all fatal errors now generate a complete backtrace.

```php
register_shutdown_function(function() {
    $error = error_get_last();

    if ($error && $error['type'] === E_ERROR) {
        // PHP 8.5 novelty: 'trace' key available!
        $trace = $error['trace'] ?? [];

        // Log the complete stack
        error_log("Fatal error stack trace:\n" . print_r($trace, true));

        // Send to your monitoring system
        Sentry::captureException(new ErrorException(
            $error['message'],
            0,
            $error['type'],
            $error['file'],
            $error['line']
        ), ['stacktrace' => $trace]);
    }
});
```

Result? In case of a fatal error, you immediately see:

```
Fatal error: Memory exhausted in Product.php:1247

Stack trace:
#0 CartController.php(89): Product->getImages()
#1 FrontController.php(156): CartController->displayCart()
#2 Dispatcher.php(412): FrontController->run()
#3 index.php(28): Dispatcher::dispatch()
```

Ah! The cart controller loads too many images. Diagnosis in 10 seconds instead of 2 hours.

### Impact on Frameworks

For PrestaShop, Symfony, Laravel... it's a game-changer:

- **Improved monitoring**: native integration with Sentry, Rollbar, Bugsnag
- **Production debugging**: trace root causes without disrupting service
- **Junior training**: understanding errors becomes educational

## URI Extension: Goodbye parse_url(), Hello Security

### The Hidden Flaws of parse_url()

`parse_url()` has served loyally for 25 years. But it has a shameful secret: **it's broken.**

A few examples that will give you chills:

```php
// Confusion with similar Unicode characters
parse_url('http://раураl.com/account'); // Cyrillic 'а' vs Latin 'a'
// Can bypass poorly implemented whitelists

// Inconsistent parsing with browsers
parse_url('http://user@evil.com:user@legit.com/');
// PHP: host = "evil.com", browsers: host = "legit.com"
// Open redirections possible

// Ambiguous encoding
parse_url('http://example.com/%2F../admin');
// Non-standard path normalization
```

These quirks have caused **real security vulnerabilities**: open redirections, filter bypasses, SSRF injections.

### The URI Extension: Standard and Robust

PHP 8.5 introduces a new `ext/uri` extension with two immutable classes:

```php
use Uri\Rfc3986\Uri;
use Uri\WhatWg\Url;

// RFC 3986 parsing (generic URIs)
$uri = Uri::parse('https://user:pass@example.com:8080/path?q=1#frag');

echo $uri->getScheme();   // "https"
echo $uri->getHost();     // "example.com"
echo $uri->getPort();     // 8080
echo $uri->getPath();     // "/path"
echo $uri->getQuery();    // "q=1"
echo $uri->getFragment(); // "frag"

// WHATWG parsing (modern web URLs)
$url = Url::parse('https://example.com/search?q=php 8.5');

// Automatic normalization
echo $url->getSearchParams()->get('q'); // "php 8.5" (decoded)
```

### Immutable and Safe Manipulation

The Uri and Url objects are immutable (pattern similar to PSR-7):

```php
$base = Uri::parse('https://api.example.com/v1');

$endpoint = $base
    ->withPath('/v2/users')
    ->withQuery('filter=active&limit=10');

echo $endpoint; // "https://api.example.com/v2/users?filter=active&limit=10"
echo $base;     // "https://api.example.com/v1" (unchanged)
```

**Relative URL resolution** (finally!):

```php
$base = Uri::parse('https://example.com/blog/');
$relative = Uri::parse('../images/logo.png');

$resolved = $base->resolve($relative);
echo $resolved; // "https://example.com/images/logo.png"
```

### Security by Design

Unlike `parse_url()`, the URI extension:

- Follows standards to the letter (RFC 3986, WHATWG URL)
- Normalizes encodings: no `%2F` vs `/` ambiguity
- Strictly validates: malformed URLs = exception
- Consistency with browsers: predictable behavior

```php
// Strict validation
try {
    $malicious = Uri::parse('http://раураl.com'); // Cyrillic lookalike
    // Exception raised if non-ASCII characters without encoding
} catch (ValueError $e) {
    // Handle gracefully
}

// Canonical comparison
$url1 = Url::parse('https://Example.COM/Path');
$url2 = Url::parse('https://example.com/Path');

echo $url1->equals($url2); // true (automatic normalization)
```

For **PrestaShop**? Validating redirection URLs, parsing payment webhooks, managing deep links in the mobile app... all these operations become robust and safe by default.

## New Utility Functions: Small Joys

### array_first() and array_last()

How many times have you written `reset($array)` or `end($array)` while cursing the side effect on the internal pointer?

```php
// Before PHP 8.5: verbose and fragile
$firstUser = reset($users); // Modifies internal pointer 😡
$lastUser = end($users);    // Same

// PHP 8.5: simple and no surprises
$firstUser = array_first($users);
$lastUser = array_last($users);

// Empty array? No warning, just null
$empty = [];
$first = array_first($empty); // null (no error)
```

**PrestaShop use case**:

```php
// Get first image of a product
$coverImage = array_first($product->getImages());

// Customer's latest order
$latestOrder = array_last($customer->getOrders());
```

### get_error_handler() and get_exception_handler()

Before, retrieving the current handler required contortions:

```php
// "Dirty" method pre-8.5
$oldHandler = set_error_handler(fn() => null);
restore_error_handler();
// $oldHandler contains the previous handler
```

PHP 8.5 simplifies:

```php
$currentErrorHandler = get_error_handler();
$currentExceptionHandler = get_exception_handler();

// null if no handler defined
// callable otherwise
```

**Usefulness**? For frameworks that want to chain handlers:

```php
class ErrorMiddleware {
    private $previousHandler;

    public function register() {
        $this->previousHandler = get_error_handler();

        set_error_handler(function($errno, $errstr, $errfile, $errline) {
            // Our custom logic
            $this->logError($errno, $errstr, $errfile, $errline);

            // Delegate to previous handler if exists
            if ($this->previousHandler) {
                return ($this->previousHandler)($errno, $errstr, $errfile, $errline);
            }

            return false; // Default behavior
        });
    }
}
```

### PHP_BUILD_DATE and PHP_BUILD_PROVIDER

Diagnosing differences between environments becomes trivial:

```php
echo "PHP Version: " . PHP_VERSION . "\n";
echo "Built on: " . PHP_BUILD_DATE . "\n";
echo "Provider: " . PHP_BUILD_PROVIDER . "\n";

// Example output:
// PHP Version: 8.5.0
// Built on: Nov 21 2025 14:32:10
// Provider: Ubuntu
```

**Why it's useful**? Because two servers with PHP 8.5 can have different behaviors depending on:

- Compiled extensions
- Distributor patches (Ubuntu vs Alpine vs official)
- Compilation flags (debug, ZTS, etc.)

These constants allow for quickly detecting discrepancies in production.

## Enhanced Attributes: Simplified Metaprogramming

### #[NoDiscard]: Force Return Usage

Some functions should **NEVER** be called without handling their return:

```php
#[\NoDiscard]
function executePayment(Order $order): PaymentResult {
    // Critical logic
    return new PaymentResult($success, $transactionId);
}

// ❌ This will trigger a warning
executePayment($order); // Warning: Result of executePayment() is not used

// ✅ Correct
$result = executePayment($order);
if ($result->isSuccess()) {
    // ...
}

// ✅ Or explicitly ignore
(void) executePayment($order); // Void cast = "I know what I'm doing"
```

**Use cases**: validation, DB transactions, API calls, file operations. Everything that can fail silently.

### #[Override] on Properties

Avoid typos and divergences in inheritance:

```php
class BaseProduct {
    public string $name;
    public float $price;
}

class DiscountedProduct extends BaseProduct {
    #[\Override]
    public float $price; // ✅ OK, exists in BaseProduct

    #[\Override]
    public float $discount; // ❌ Compile Error: no such property in parent
}
```

For **PrestaShop**? The module override system becomes safer. If the core changes a property, the `#[Override]` attribute immediately detects the breakage.

### #[Deprecated] for Traits

Mark a trait as obsolete:

```php
#[\Deprecated("Use NewHelperTrait instead", since: "2.5.0")]
trait OldHelperTrait {
    // ...
}

class MyClass {
    use OldHelperTrait; // Warning: OldHelperTrait is deprecated
}
```

Helps teams manage technical debt progressively.

## Advanced Internationalization with ext/intl

### IntlListFormatter: Natural Lists

Display lists respectfully according to locale:

```php
$formatter = new IntlListFormatter('fr_FR', IntlListFormatter::TYPE_AND);
echo $formatter->format(['pommes', 'bananes', 'oranges']);
// "pommes, bananes et oranges"

$formatter = new IntlListFormatter('en_US', IntlListFormatter::TYPE_OR);
echo $formatter->format(['red', 'green', 'blue']);
// "red, green, or blue"
```

**PrestaShop**? Display product attributes properly:

```php
$attributes = $product->getAttributeNames(); // ['Taille', 'Couleur', 'Matière']
$formatted = (new IntlListFormatter($locale))->format($attributes);
// FR: "Taille, Couleur et Matière"
// EN: "Size, Color, and Material"
```

### locale_is_right_to_left(): RTL Support

Automatically detect RTL languages:

```php
if (locale_is_right_to_left('ar_SA')) {
    echo '<body dir="rtl">';
} else {
    echo '<body dir="ltr">';
}
```

No more hardcoded mappings! PHP knows RTL locales (Arabic, Hebrew, Persian...).

### grapheme_levenshtein(): Unicode Distance

Calculate similarity between strings with accents and emojis:

```php
// Classic levenshtein() (bytes)
echo levenshtein('café', 'cafe'); // 2 (é = 2 UTF-8 bytes)

// grapheme_levenshtein() (graphemes)
echo grapheme_levenshtein('café', 'cafe'); // 1 (é = 1 grapheme)

// With emojis
echo grapheme_levenshtein('hello👋', 'hello'); // 1 (not 4!)
```

**Typo-tolerant search**: suggest "téléphone" when the user types "telephone".

## Partitioned Cookies (CHIPS): Modern Privacy

### The Problem with Third-Party Cookies

Third-party (cross-site) cookies enable advertising tracking. Browsers are increasingly blocking them.

**CHIPS** (Cookies Having Independent Partitioned State) is the new standard: third-party cookies are isolated by top-level site.

### Implementation in PHP 8.5

```php
// Partitioned cookie
setcookie('tracking', 'value', [
    'expires' => time() + 3600,
    'path' => '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None',
    'partitioned' => true  // 🆕 PHP 8.5
]);

// Partitioned session cookie
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None',
    'partitioned' => true  // 🆕
]);
session_start();
```

**When to use it**? If your PrestaShop app is embedded in an iframe on another domain (e.g., cart widget), partitioned cookies guarantee functionality without compromising privacy.

## Deprecations: Cleaning Up the Past

PHP 8.5 deprecates about fifty elements. Here are the most impactful:

### Manual Resource Closing

```php
// ❌ Deprecated in 8.5
curl_close($ch);
imagedestroy($img);
finfo_close($finfo);
xml_parser_free($parser);

// ✅ Nothing to do, automatic destructor
// Objects clean themselves up
```

**Reason**: Since PHP 7.4, resources are objects. Manual closing is redundant and error-prone (double-free, leaks).

### Non-Canonical Casts

```php
// ❌ Deprecated
$bool = (boolean) $value;
$int = (integer) $value;
$float = (double) $value;
$str = (binary) $value;

// ✅ Use standard forms
$bool = (bool) $value;
$int = (int) $value;
$float = (float) $value;
$str = (string) $value;
```

### Backtick Operator

```php
// ❌ Deprecated
$output = `ls -la`;

// ✅ Use shell_exec() explicitly
$output = shell_exec('ls -la');
```

**Security**: The backtick was a source of confusion and shell injections. `shell_exec()` is explicit.

### __sleep() and __wakeup()

```php
// ⚠️ Soft-deprecation: still supported but discouraged
class User {
    public function __sleep() {
        return ['name', 'email'];
    }

    public function __wakeup() {
        // Init logic
    }
}

// ✅ Prefer __serialize() / __unserialize()
class User {
    public function __serialize(): array {
        return ['name' => $this->name, 'email' => $this->email];
    }

    public function __unserialize(array $data): void {
        $this->name = $data['name'];
        $this->email = $data['email'];
    }
}
```

**Advantage**: `__serialize()` supports nested objects and avoids `__sleep()` pitfalls.

## PrestaShop and PHP 8.5: A Winning Combo

### Concrete Performance Gains

PrestaShop 8.x loads approximately 150-300 classes per front-office request. With mandatory OPcache:

- **Compilation time**: 0 (cached bytecode)
- **Response time**: -30% on average
- **Server capacity**: +50% requests/second

JIT optimizations (+5-10%) add up for complex pages (product listings, filters).

### Enhanced Security

PrestaShop manipulates:

- Redirection URLs (open redirections possible)
- Payment webhooks (critical parsing)
- Mobile deep links

The URI extension standardizes and secures these processes:

```php
// Before: fragile parse_url()
$redirect = $_GET['redirect'];
$parsed = parse_url($redirect);
if ($parsed['host'] === 'monshop.com') {
    header("Location: $redirect");
}
// ⚠️ Bypassable with Unicode, ambiguous encodings

// After: secure Uri
try {
    $uri = Uri\Rfc3986\Uri::parse($_GET['redirect']);
    if ($uri->getHost() === 'monshop.com') {
        header("Location: " . $uri);
    }
} catch (ValueError $e) {
    // Malformed URL = rejection
}
```

### Secure Override System

PrestaShop allows modules to override core classes. The `#[Override]` attribute detects incompatibilities:

```php
// In a module
class Product extends ProductCore {
    #[\Override]
    public string $reference; // ✅ Exists in ProductCore

    #[\Override]
    public function getPrice() { // ✅ Parent method exists
        return parent::getPrice() * 0.9; // 10% discount
    }
}

// If the core changes, immediate compilation error
// Instead of a silent bug in production
```

### Improved Internationalization

PrestaShop supports 75+ languages. Intl improvements facilitate:

```php
// Product attribute display
$attributes = ['XL', 'Rouge', 'Coton'];
$formatter = new IntlListFormatter($customer->getLocale());
echo $formatter->format($attributes);
// FR: "XL, Rouge et Coton"
// AR: "XL، أحمر و قطن" (automatic RTL order)

// RTL detection for themes
if (locale_is_right_to_left($language->locale)) {
    $smarty->assign('text_direction', 'rtl');
}

// Tolerant search
$query = 'telefone'; // typo
$suggestions = array_filter($products, function($p) use ($query) {
    return grapheme_levenshtein($query, $p->name) <= 2;
});
// Suggests "téléphone" even with missing accents
```

## Migration and Compatibility

### Migration Checklist

#### 1. Check Deprecations

```bash
# Analyze code with PHPStan
composer require --dev phpstan/phpstan
vendor/bin/phpstan analyse --level=8 src/

# Or Rector to automate fixes
composer require --dev rector/rector
vendor/bin/rector process src/ --dry-run
```

#### 2. Replace Deprecated Functions

| Deprecated | Replace with |
|----------|---------------|
| `curl_close($ch)` | Nothing (auto) |
| `imagedestroy($img)` | Nothing (auto) |
| `(boolean) $x` | `(bool) $x` |
| `` `cmd` `` | `shell_exec('cmd')` |
| `__sleep() / __wakeup()` | `__serialize() / __unserialize()` |

#### 3. Test Edge Cases

```php
// Backtraces: verify your handlers
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && isset($error['trace'])) {
        // New in 8.5, adapt your code
    }
});

// URI: replace parse_url()
// Before
$parts = parse_url($url);

// After
try {
    $uri = Uri\Rfc3986\Uri::parse($url);
    $parts = [
        'scheme' => $uri->getScheme(),
        'host' => $uri->getHost(),
        // ...
    ];
} catch (ValueError $e) {
    // Clean error handling
}
```

#### 4. Optimize with New Features

- Replace `reset() / end()` with `array_first() / array_last()`
- Adopt the pipe operator for data transformations
- Use `clone with` for immutable objects

### Compatibility with PHP 8.4

PHP 8.5 is backward compatible with 8.4. Your 8.4 code runs on 8.5 (except deprecations which emit warnings).

**Progressive migration strategy**:

- **Dev/Staging**: PHP 8.5 from December 2025
- **Intensive testing**: January-February 2026
- **Production**: March 2026 (after PHP 8.5.1-8.5.2 for bugfixes)

### Docker Environment

```dockerfile
FROM php:8.5-fpm-alpine

# OPcache already there, just configure
RUN echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.max_accelerated_files=20000" >> /usr/local/etc/php/conf.d/opcache.ini && \
    echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini

# URI extension: included by default
# Intl: install if not present
RUN apk add --no-cache icu-dev && \
    docker-php-ext-install intl

# Other classic extensions
RUN docker-php-ext-install pdo_mysql gd zip
```

## Conclusion

PHP 8.5 isn't a spectacular revolution. It's a surgical evolution that corrects 20 years of accumulated minor frustrations.

The pipe operator transforms your verbose code into expressive pipelines. Clone with finally makes immutability practicable. Mandatory OPcache guarantees performance everywhere. Backtraces on fatal errors divide your debugging time by 10. The URI extension eliminates an entire class of security vulnerabilities.

**Each new feature responds to a real pain point.** No gimmicks, no hype. Just pragmatic solutions to write safer, faster, more maintainable code.

For PrestaShop and e-commerce applications, PHP 8.5 is a **no-brainer**: measurable performance gains, enhanced security, facilitated internationalization, improved debugging. The few hours of adaptation (deprecations to correct) are largely compensated by long-term benefits.

**My advice**? Test PHP 8.5 as soon as it's released in November 2025. Adopt it in production after the first corrective versions (8.5.1-8.5.2, probably January 2026). You won't go back.

PHP 8.5 proves one thing: the maturity of a language isn't measured by its revolutions, but by its capacity for continuous evolution without breaking the existing. And from this perspective, PHP is at the peak of its art.

---

**Article published on November 16, 2025 by Nicolas Dabène - PHP & PrestaShop Expert with 15+ years of experience**
