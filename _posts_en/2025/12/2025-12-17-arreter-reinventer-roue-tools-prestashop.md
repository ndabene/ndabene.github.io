---
layout: post
title: "Stop Reinventing the Wheel: 5 Hidden Gems in PrestaShop's Tools.php File"
date: 2025-12-17
lang: en
ref: prestashop-tools-hidden-gems
author: Nicolas Dabène
categories:
- PrestaShop
- Development
- Best Practices
tags:
- prestashop
- legacy-code
- productivity
- php
- backend
excerpt: >
  Think "Clean Code" is the only way? Think again. Sometimes brutal efficiency hides in old attics. I've dug through the Tools.php file for you: here are 5 native functions you should absolutely use before recoding anything.
image: /assets/images/blog/2025/12/2025-12-17-prestashop-tools-legacy.webp
difficulty: Intermediate
technologies:
- PrestaShop 9
- PHP
- Legacy Code
estimated_reading_time: 10 minutes
faq:
- question: "Isn't the Tools class an anti-pattern?"
  answer: "From a pure architecture standpoint, yes. But in the PrestaShop context, it's a proven utility library that handles edge cases you probably haven't anticipated."
- question: "Are these functions compatible with PrestaShop 9?"
  answer: "Yes, all the functions presented are maintained in the latest version of PrestaShop and will remain so for backward compatibility reasons."
- question: "Can I use Tools in my modules?"
  answer: "Absolutely! It's even recommended to stay consistent with the PrestaShop ecosystem and benefit from core security fixes."
---

# Stop Reinventing the Wheel: 5 Hidden Gems in PrestaShop's Tools.php File

## 🧠 Introduction: The Modern Developer's Paradox

There's a tension I often feel when talking with developers coming from the pure Symfony universe.

On one side, the ideal: clean code, decoupled, respecting SOLID principles.
On the other, the reality of e-commerce field work: a rushed client, a shared server configured oddly, and the need to move fast.

Intuition pushes us to flee PrestaShop's `Tools` class. It's what's called a "God Class". A monolithic file of over 4000 lines (in the develop branch) that does everything: file management, HTTP, string manipulation...

Yet today, I'm going to ask you to do something counter-intuitive: **stop rewriting helpers that PrestaShop has maintained for 15 years**.

I've audited the source code of the latest version for you. Here are 5 very real functions (no hallucination here) that will simplify your code and make it more robust.

## ⚡ Part 1 – Context: Why Dig Into This File?

In modern software architecture, a class full of static methods like `Tools::myMethod()` is often considered a bad practice (tight coupling).

But `Tools.php` is PrestaShop's immune memory.
Each somewhat odd line of code, each nested `if` in this file is often the scar of an old bug or obscure server compatibility you haven't encountered yet.

**The stakes**: Do you want to spend 3 hours coding a recursive directory deletion that handles Windows and Linux permissions, or use a proven line of code?

In the age of AI and automation, the real skill is no longer knowing how to code a loop, but knowing **which building block to use** to build solid.

## 🚀 Part 2 – Analysis: 5 Native Functions (Verified)

Forget imaginary functions. Here's what's actually in the PrestaShop engine that you should use.

### 1. Tools::getOctets(): Speaking the Server's Language

**The problem**: You want to check if an uploaded file exceeds the `upload_max_filesize` limit from php.ini. You retrieve the value with `ini_get` and PHP proudly responds `"128M"` or `"2G"`.
If you try to compare mathematically (`if $file_size > "128M"`), it crashes or means nothing.

**The PrestaShop solution**:
Don't write your own switch/case to multiply by 1024.

```php
$maxSize = Tools::getOctets(ini_get('upload_max_filesize'));
// If the config is "128M", returns the integer: 134217728
```

It's simple, reliable, and handles K, M, G without you having to think about it.

### 2. Tools::deleteDirectory(): Painless Deep Cleaning

**The problem**: Deleting a folder in PHP is a pain. The `rmdir()` function only works if the folder is empty. So you have to code a recursive function that opens the folder, lists files, deletes them one by one, goes into subdirectories... A maintenance horror.

**The PrestaShop solution**:
PrestaShop does it natively, and even handles hidden files (except `.svn` and `.git`, handy for devs).

```php
if (Tools::deleteDirectory($myTempFolder)) {
    // Folder and all its contents cleanly deleted.
}
```

This is a function I see rewritten in 50% of third-party modules. Stop. Use this one.

### 3. Tools::str2url(): The SEO King

**The problem**: You need to generate a "slug" (simplified URL) from a product name: `"Christmas & Wonders: 2025 edition!"`.
You need to handle accents, spaces, punctuation, capitals...

**The PrestaShop solution**:
This is the function used by the core to generate product URLs.

```php
$slug = Tools::str2url("Christmas & Wonders: 2025 edition!");
// Result: "christmas-wonders-2025-edition"
```

It uses `iconv` or `mb_string` depending on what's available on the server to clean exotic encodings. It's the de facto standard to stay consistent with the rest of the store.

### 4. Tools::getRemoteAddr(): Smarter Than $_SERVER

**The problem**: You want the client's IP for a security log. The reflex: `$_SERVER['REMOTE_ADDR']`.
**The trap**: If the store uses Cloudflare or a Load Balancer, `REMOTE_ADDR` will give you Cloudflare's IP, not the client's.

**The PrestaShop solution**:
This function is paranoid. It checks a cascade of headers (`HTTP_CLIENT_IP`, `HTTP_X_FORWARDED_FOR`, etc.) to find the user's real IP.

```php
// Essential for payment or anti-fraud modules
$userIp = Tools::getRemoteAddr();
```

**Note**: It even handles anonymization if necessary according to configuration.

### 5. Tools::file_get_contents(): The Network Diplomat

**The problem**: You need to call an external API (fetch JSON, exchange rate). You use PHP's native `file_get_contents()` function.
**The crash**: On your client's shared hosting, `allow_url_fopen` is disabled for security. Your module crashes.

**The PrestaShop solution**:
This method (which has the same name as the native one, hence the confusion sometimes) is an intelligent wrapper.

- It checks if cURL is available and uses it as priority (faster, more secure).
- Otherwise, it tries the native method.
- It handles timeouts and SSL contexts.

```php
$json = Tools::file_get_contents('https://api.my-service.com/data');
```

It's the 4x4 of simple HTTP requests (GET). For complex POST, we'd prefer Guzzle (integrated in recent versions), but for a quick call, Tools remains unbeatable.

## 🧮 Part 3 – Practical Application: The Senior Reflex

Imagine a common scenario: You're creating a module that generates a catalog export CSV file and sends it to a remote server.

**"I recode everything" approach**:
You spend 2 hours writing a function to clean file names, another to check memory limit, and a Curl library for sending.

**"Orchestrator" approach (with Tools)**:

```php
public function exportCatalog($name) {
    // 1. Clean the file name (SEO friendly, no spaces)
    $safeName = Tools::str2url($name) . '.csv';

    // 2. Check we won't blow up the server's memory
    $memoryLimit = Tools::getOctets(ini_get('memory_limit'));
    if ($memoryLimit < 128000000) { // < 128MB
        throw new Exception("Increase your memory_limit!");
    }

    // 3. If export already exists, delete previous temp folder
    if (is_dir(_PS_TMP_IMG_DIR_ . 'export')) {
        Tools::deleteDirectory(_PS_TMP_IMG_DIR_ . 'export');
    }

    // ... export logic ...
}
```

This code is shorter, more readable, and above all, will behave predictably on any PrestaShop hosting.

## 🌍 Part 4 – Vision: AI and Code Archaeology

Why am I talking about `Tools.php` in 2025?

Because the developer's job is changing. With the arrival of AI assistants (Copilot, ChatGPT, Claude), generating code has become trivial. But **generating context-appropriate code** is rare.

If you ask an AI *"Make me a function to delete a folder"*, it will give you a generic snippet from StackOverflow.
If you tell it *"Use PrestaShop's `Tools::deleteDirectory`"*, you save lines of code and technical debt.

**The developer of the future is an orchestrator**. They know the tools available in the framework (even old "legacy" tools) to assemble robust solutions without reinventing the wheel.

## 🎯 Conclusion

Don't be snobbish with "Legacy" code. PrestaShop runs on hundreds of thousands of stores thanks to the resilience of files like `Tools.php`.

Next time you have a utility task to do (manipulate a URL, clean a file, check an IP), have the reflex to open this file on GitHub or in your IDE. Do a `CTRL+F`.

**Kindness in code means building on others' work to focus on your project's added value.**

Happy coding to all! 🚀
