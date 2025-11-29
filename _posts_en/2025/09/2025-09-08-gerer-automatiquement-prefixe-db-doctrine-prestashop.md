---
layout: post
title: 'AI & Development: Avoiding Common Traps'
date: 2025-09-08
author: Nicolas Dabène
lang: en
ref: gerer-automatiquement-prefixe-db-doctrine-prestashop
categories:
- PrestaShop
- PHP
- Development
tags:
- PrestaShop
- development
excerpt: Discover how to solve the 'Base table or view not found' error with Doctrine
  in PrestaShop by automating dynamic table prefix management.
image: /assets/images/blog/2025/09/2025-09-08-doctrine-prestashop-prefix.webp
featured: false
difficulty: Intermediate
technologies:
- PHP
- PrestaShop
- Doctrine
- Symfony
estimated_reading_time: 8 minutes
faq:
- question: Why doesn't Doctrine find my PrestaShop tables?
  answer: Doctrine reads annotations literally and searches for exactly the name specified
    in @ORM\Table(name="trade_in_request") without ever adding the PrestaShop prefix
    (_DB_PREFIX_). Your table is called ps_trade_in_request but Doctrine searches
    for trade_in_request, hence the 'Base table or view not found' error.
- question: How to elegantly solve the DB prefix problem with Doctrine?
  answer: Create a TablePrefixSubscriber that intercepts Doctrine's loadClassMetadata
    event to automatically add the correct prefix at runtime. Declare it as a Doctrine
    service with the doctrine.event_subscriber tag and inject %database_prefix%. This
    centralized solution is maintainable and compatible with all environments.
- question: Should I hardcode the prefix in Doctrine annotations?
  answer: No, never hardcode the prefix like @ORM\Table(name="ps_trade_in_request").
    This will only work on installations with ps_ prefix, make multi-environment deployment
    impossible, and violate PrestaShop best practices. Instead, use an event subscriber
    that dynamically manages the prefix.
- question: Does the subscriber also handle ManyToMany join tables?
  answer: Yes, the TablePrefixSubscriber automatically handles join tables via the
    prefixJoinTables() method that traverses associations and prefixes joinTable.
    For a @ManyToMany relationship with joinTable(name="trade_in_request_category"),
    it will automatically be transformed to {prefix}trade_in_request_category.
- question: How to limit the subscriber to my module entities only?
  answer: In the loadClassMetadata() method, check the entity namespace with str_starts_with($classMetadata->getName(),
    'Vendor\\YourModule\\Entity\\'). If the entity doesn't match your module, return
    immediately. This precaution avoids conflicts with other modules or PrestaShop
    core.
- question: Is PrestaShop free?
  answer: Yes, PrestaShop is an open-source e-commerce CMS and is free. You only pay
    for hosting and premium modules.
---

# Automatically Manage DB Prefix in Doctrine for PrestaShop

You're developing a PrestaShop module with Doctrine and encounter this frustrating error: `Base table or view not found`... even though your table definitely exists in the database? The problem likely comes from the dynamic table prefix that PrestaShop adds automatically, but which Doctrine royally ignores.

In my PrestaShop development practice for over 15 years, I've encountered this trap on many projects. Today, I'll show you how to elegantly solve this problem with a custom Doctrine subscriber.

## The Symptom That Costs You Hours

Imagine: you've just created your perfectly annotated Doctrine entity, you launch your first query and... boom:

```sql
SQLSTATE[42S02]: Base table or view not found: 1146 Table 'shop.trade_in_request' doesn't exist
```

Yet, checking your database, the table exists... but it's called `ps_trade_in_request` or `shop_trade_in_request` depending on the prefix configured during installation.

## Why Doctrine Doesn't Find Your Tables

The problem is fundamental in PrestaShop architecture:

### PrestaShop Uses Dynamic Prefixes

In PrestaShop, the table prefix is stored in the `_DB_PREFIX_` constant and can vary by installation:
- `ps_` (standard installation)
- `shop_` (custom installation)
- `abc123_` (for security)
- And many other possibilities...

### Doctrine Reads Annotations Literally

When you declare your entity like this:

```php
/**
 * @ORM\Table(name="trade_in_request")
 * @ORM\Entity()
 */
class TradeInRequest
{
    // Your properties...
}
```

Doctrine will search for exactly the `trade_in_request` table, never adding the PrestaShop prefix.

### The Classic Mistake: Hardcoding the Prefix

The temptation is great to do this:

```php
/**
 * @ORM\Table(name="ps_trade_in_request") // ❌ NEVER!
 * @ORM\Entity()
 */
class TradeInRequest { }
```

But it's a very bad idea:
- It will only work on installations with `ps_` prefix
- Impossible to deploy on multiple environments
- Violation of PrestaShop best practices

## The Elegant Solution: A Doctrine Subscriber

The best approach is to intercept Doctrine metadata loading to automatically add the correct prefix at runtime.

### Step 1: Create the Subscriber

Create the file `src/Doctrine/TablePrefixSubscriber.php` in your module:

```php
<?php

namespace Vendor\YourModule\Doctrine;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Events;
use Doctrine\ORM\Event\LoadClassMetadataEventArgs;

class TablePrefixSubscriber implements EventSubscriber
{
    public function __construct(
        private readonly string $dbPrefix
    ) {}

    public function getSubscribedEvents(): array
    {
        return [Events::loadClassMetadata];
    }

    public function loadClassMetadata(LoadClassMetadataEventArgs $args): void
    {
        $classMetadata = $args->getClassMetadata();

        // Limit to our module entities only
        $moduleNamespace = 'Vendor\\YourModule\\Entity\\';
        if (!str_starts_with($classMetadata->getName(), $moduleNamespace)) {
            return;
        }

        $this->prefixTableName($classMetadata);
        $this->prefixJoinTables($classMetadata);
    }

    private function prefixTableName($classMetadata): void
    {
        $tableName = $classMetadata->getTableName();

        if (!str_starts_with($tableName, $this->dbPrefix)) {
            $classMetadata->setPrimaryTable([
                'name' => $this->dbPrefix . $tableName
            ]);
        }
    }

    private function prefixJoinTables($classMetadata): void
    {
        foreach ($classMetadata->getAssociationMappings() as &$mapping) {
            if (isset($mapping['joinTable']['name'])) {
                $joinTableName = $mapping['joinTable']['name'];

                if (!str_starts_with($joinTableName, $this->dbPrefix)) {
                    $mapping['joinTable']['name'] = $this->dbPrefix . $joinTableName;
                }
            }
        }
    }
}
```

### Step 2: Declare the Service

In your `config/services.yml` file:

```yaml
services:
  Vendor\YourModule\Doctrine\TablePrefixSubscriber:
    arguments:
      - '%database_prefix%'
    tags:
      - { name: doctrine.event_subscriber }
```

### Step 3: Keep Your Entities Clean

Your entities remain without prefix:

```php
<?php

namespace Vendor\YourModule\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="trade_in_request")
 * @ORM\Entity(repositoryClass="Vendor\YourModule\Repository\TradeInRequestRepository")
 */
class TradeInRequest
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $customerEmail;

    /**
     * @ORM\Column(type="datetime")
     */
    private \DateTime $createdAt;

    // Getters and setters...
}
```

### Step 4: Adapt Your Installation SQL

In your `sql/install.sql` file, always use the prefix variable:

```sql
CREATE TABLE IF NOT EXISTS `{$prefix}trade_in_request` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `customer_email` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Deploying the Solution

### Clear Symfony Cache

```bash
bin/console cache:clear --no-warmup
```

### Reset the Module

```bash
bin/console prestashop:module reset yourmodule --no-interaction
```

Or from the back office: uninstall then reinstall the module.

## Handling Complex Relationships

The subscriber also handles join tables automatically. For a ManyToMany relationship:

```php
/**
 * @ORM\ManyToMany(targetEntity="Category")
 * @ORM\JoinTable(name="trade_in_request_category",
 *     joinColumns={@ORM\JoinColumn(name="request_id", referencedColumnName="id")},
 *     inverseJoinColumns={@ORM\JoinColumn(name="category_id", referencedColumnName="id")}
 * )
 */
private Collection $categories;
```

The `trade_in_request_category` table will automatically be prefixed to `{prefix}trade_in_request_category`.

## Testing Your Implementation

Create a simple test to verify everything works:

```php
<?php

namespace Vendor\YourModule\Tests;

use Vendor\YourModule\Entity\CustomerReview;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class TablePrefixTest extends KernelTestCase
{
    public function testTablePrefixIsApplied(): void
    {
        self::bootKernel();

        $entityManager = self::getContainer()->get('doctrine.orm.entity_manager');
        $metadata = $entityManager->getClassMetadata(CustomerReview::class);

        // Verify prefix is properly applied
        $expectedTableName = _DB_PREFIX_ . 'customer_review';
        $this->assertEquals($expectedTableName, $metadata->getTableName());
    }
}
```

## Advantages of This Approach

This solution offers many advantages in my daily practice:

### Universal Compatibility
- Works with all database prefixes
- No environment-specific code
- Simplified deployment on different instances

### Facilitated Maintenance
- Centralization of prefixing logic
- No code duplication
- Guaranteed scalability

### Standards Compliance
- Respect for PrestaShop best practices
- Clean and readable business code
- Separation of concerns

## Important Points of Attention

### Scope Limitation

Always limit the subscriber to your module entities:

```php
$moduleNamespace = 'Vendor\\YourModule\\Entity\\';
if (!str_starts_with($classMetadata->getName(), $moduleNamespace)) {
    return; // Don't touch other entities
}
```

This precaution avoids conflicts with other modules or PrestaShop core.

### SQL/Doctrine Consistency

Ensure your SQL scripts use the same base name as your entities:
- Entity: `@ORM\Table(name="my_table")`
- SQL: `CREATE TABLE {$prefix}my_table`

### Testing in Real Conditions

Test with different prefixes to validate your implementation:

```php
// In your test environment
define('_DB_PREFIX_', 'test_');
```

## Conclusion

Automatic table prefix management with Doctrine in PrestaShop isn't complex once you know the technique. This event subscriber approach offers a robust and maintainable solution that respects platform standards.

Next time you develop a module with Doctrine, remember to implement this subscriber from the start. Your future self (and colleagues) will thank you!

---

*Article published on September 8, 2025 by Nicolas Dabène - PHP & PrestaShop Expert with 15+ years of experience*
