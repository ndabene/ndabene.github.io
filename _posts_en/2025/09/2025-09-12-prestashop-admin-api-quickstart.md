---
layout: post
title: Contribute to PrestaShop 9 Admin API
date: 2025-09-12
author: Nicolas Dabène
lang: en
ref: prestashop-admin-api-quickstart
categories:
- PrestaShop
- Development
tags:
- API
- PrestaShop
- development
- security
excerpt: A pedagogical guide to create your first endpoints in PrestaShop 9 Admin
  API. Discover the 8 essential concepts and start contributing today.
image: /assets/images/blog/2025/09/2025-09-12-prestashop-admin-api-quickstart.jpg
featured: true
difficulty: Intermediate
technologies:
- PrestaShop
- API Platform
- PHP
- Symfony
estimated_reading_time: 12 minutes
faq:
- question: Must I create my own Commands and Queries for the Admin API?
  answer: No, in most cases, Commands and Queries already exist in PrestaShop core.
    You simply need to wire them correctly in your API resource.
- question: What's the difference between Admin API and the old Webservice API?
  answer: Admin API is built on Symfony and API Platform with OAuth2 and CQRS support,
    offering a modern approach. The old XML Webservice API is legacy and limited in
    its features.
- question: Can I test my endpoints without a front interface?
  answer: Yes, you can use HTTP clients like Postman, Insomnia or curl to quickly
    test your API endpoints and check their functionality.
- question: Where to ask questions if I'm stuck on the Admin API?
  answer: 'The PrestaShop community Slack, #cfc-adminapi channel, is the ideal place
    to exchange with other contributors and get help.'
- question: Is PrestaShop free?
  answer: Yes, PrestaShop is an open-source e-commerce CMS and is free. You only pay
    for hosting and premium modules.
- question: Is PrestaShop suitable for beginners?
  answer: PrestaShop has a medium learning curve. With documentation, beginners can
    create their store in weeks.
---

# Quick Start: Contributing Quickly to PrestaShop 9 Admin API

![Mind map of 8 essential concepts for PrestaShop 9 Admin API](/en/assets/images/blog/article_content/2025-09-12-carte-mental.png)

Contributing to **PrestaShop 9's new Admin API** can seem intimidating.
We read words like **CQRS**, **API Platform**, **OAuth2**... and many developers think:

> *"Wow, I'll need to follow weeks of training before laying my first brick."*

Actually, it's false ✅
With only **8 well-understood concepts**, you can create a functional endpoint in **less than an hour**.

In this guide, I'll explain each building block **as if we were together in a classroom**:
I set the context, illustrate with a concrete example, then we move forward step by step.

---

## 1. `#[ApiResource]`: The Magic Label

Imagine a library.
As long as a book doesn't have a barcode, impossible to borrow it.

In PrestaShop, this **barcode** is `#[ApiResource]`.
It tells API Platform: *"This class is a resource exposed by the API."*

* Without it → the class remains invisible
* With it → it becomes a **REST entry point**

📚 [Read official ApiResource doc](https://symfonycasts.com/screencast/api-platform/operations)

---

## 2. CQRSGet and CQRSCreate: Separating Reading and Acting

PrestaShop 9 applies a clear discipline:

* **Reading data** → role of *Queries*
* **Modifying data** → role of *Commands*

👉 This is the **CQRS pattern** (*Command Query Responsibility Segregation*).

Concretely:

* `CQRSGet` → "When doing a GET, execute this Query."
* `CQRSCreate` → "When doing a POST, execute this Command, then return the result thanks to this Query."

📚 [Learn more about CQRS in PrestaShop](https://devdocs.prestashop-project.org/9/development/architecture/domain/cqrs/)

---

## 3. URI Templates: Your Resources' Address

Each resource needs a **readable and structured address**.

```php
'/products/{productId}'
```

➡️ Here, the API responds to `/products/123` with `123` as parameter.

You can nest multiple levels:

```
/categories/{categoryId}/products/{productId}
```

👉 Think of it as a city map: your URIs are the streets where developers will navigate.

📚 [Doc on API Resources](https://devdocs.prestashop-project.org/9/admin-api/resource_server/api-resources/)

---

## 4. DTOs: Data Bags

A **DTO** (*Data Transfer Object*) = a backpack 🎒
It does nothing by itself, just transports data.

Minimalist example:

```php
class Product {
    public int $id;
    public string $name;
}
```

No business logic here.
👉 All intelligence already lives in your **Commands** and **Queries**.

---

## 5. OAuth Scopes: Access Badges

An API is an open door. But who has the right to enter?
The answer: **OAuth2 scopes**.

Each operation declares necessary permissions. Examples:

* `product_read` → read products
* `product_write` → modify products

See them as **company access badges**. Without the right badge → no entry.

📚 [Admin API OAuth doc](https://devdocs.prestashop-project.org/9/admin-api/)

---

## 6. Requirements: Filtering at the Door

An endpoint `/products/{productId}` must receive a numeric identifier.
But what if someone sends `/products/abc`?

👉 Add a **requirement**:

```php
requirements: ['productId' => '\\d+']
```

Result: only URLs with a number (`/products/123`) are accepted.
It's the **bouncer** at the nightclub entrance: wrong outfit → no entry.

---

## 7. The Identifier: Your Resource's ID Card

API Platform must know which field represents the unique identifier.
Otherwise, impossible to properly manage your resources.

So we add:

```php
#[ApiProperty(identifier: true)]
public int $id;
```

Only one field must play this role.
👉 It's your resource's **social security number**.

---

## 8. Organization: One Folder per Entity

Last concept: a bit of discipline!
In `ps_apiresources`, each resource lives in its folder:

```
ps_apiresources/src/ApiPlatform/Resources/Product/
```

👉 Like a well-organized backpack: one subject = one notebook, one resource = one folder.

📚 [Explore ps\_apiresources GitHub repo](https://github.com/PrestaShop/ps_apiresources)

---

## Concrete Example: `Product` Resource

```php
<?php
namespace PrestaShop\Module\APIResources\ApiPlatform\Resources\Product;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;
use PrestaShopBundle\ApiPlatform\Metadata\CQRSGet;
use PrestaShopBundle\ApiPlatform\Metadata\CQRSCreate;

#[ApiResource(
    operations: [
        new CQRSGet(
            uriTemplate: '/products/{productId}',
            requirements: ['productId' => '\\d+'],
            CQRSQuery: GetProductForEditing::class,
            scopes: ['product_read']
        ),
        new CQRSCreate(
            uriTemplate: '/products',
            CQRSCommand: AddProductCommand::class,
            CQRSQuery: GetProductForEditing::class,
            scopes: ['product_write']
        )
    ]
)]
class Product
{
    #[ApiProperty(identifier: true)]
    public int $productId;

    public string $name;
    public float $price;
    public bool $active;
}
```

---

## Tip: "Cheating" with Existing Commands and Queries

The secret?
No need to reinvent everything: most **Commands** and **Queries** already exist in PrestaShop core!

To discover them:

```bash
php bin/console prestashop:list:commands-and-queries
```

Examples:

* `AddProductCommand` / `GetProductForEditing`
* `AddCategoryCommand` / `GetCategoryForEditing`
* `AddCustomerCommand` / `GetCustomerForEditing`

📚 [Official Commands/Queries list](https://devdocs.prestashop-project.org/9/development/components/console/prestashop-list-commands-and-queries/)

---

## How to Start Today?

1. **Join Slack `#cfc-adminapi`** to ask your questions.
2. **Explore existing resources** in [ps\_apiresources](https://github.com/PrestaShop/ps_apiresources).
3. **Copy the template above**, adapt it, propose a **Pull Request**.

---

## Conclusion: Learning by Walking

Many hesitate to contribute because they believe they must *master everything* before starting.
The truth: we learn **by contributing**.

With these **8 simple concepts**, you already have the keys to write an endpoint.
Advanced notions (State Providers, Processors, Serialization Groups...) will come naturally with practice.

👉 The best time to start was yesterday.
The second best time is today.

---

🔗 **Useful Resources**

* [Admin API Documentation](https://devdocs.prestashop-project.org/9/admin-api/)
* [CQRS in PrestaShop](https://devdocs.prestashop-project.org/9/development/architecture/domain/cqrs/)
* [ps\_apiresources Repo](https://github.com/PrestaShop/ps_apiresources)
* [Commands/Queries List](https://devdocs.prestashop-project.org/9/development/components/console/prestashop-list-commands-and-queries/)

---

*Article published on September 12, 2025 by Nicolas Dabène - PrestaShop Expert & open source contributor since 2010.*
