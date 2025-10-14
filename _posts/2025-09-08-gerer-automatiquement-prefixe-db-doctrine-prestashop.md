---
layout: post
title: "Gérer automatiquement le préfixe DB dans Doctrine pour PrestaShop"
date: 2025-09-08
author: Nicolas Dabène
categories: [PrestaShop, PHP, Développement]
tags: ["doctrine", "prestashop-9", "orm", "database", "modules", "dev-php-8"]
excerpt: "Découvrez comment résoudre l'erreur 'Base table or view not found' avec Doctrine dans PrestaShop en automatisant la gestion des préfixes de tables dynamiques."
image: /assets/images/blog/2025-09-08-doctrine-prestashop-prefix.jpg
featured: false
difficulty: "Intermédiaire"
technologies: ["PHP", "PrestaShop", "Doctrine", "Symfony"]
estimated_reading_time: "8 minutes"
---

# Gérer automatiquement le préfixe DB dans Doctrine pour PrestaShop

Vous développez un module PrestaShop avec Doctrine et vous tombez sur cette erreur frustrante : `Base table or view not found`... alors que votre table existe bel et bien en base ? Le problème vient probablement du préfixe de table dynamique que PrestaShop ajoute automatiquement, mais que Doctrine ignore royalement.

Dans ma pratique de développement PrestaShop depuis plus de 15 ans, j'ai rencontré ce piège sur de nombreux projets. Aujourd'hui, je vais vous montrer comment résoudre élégamment ce problème avec un subscriber Doctrine personnalisé.

## Le symptôme qui vous fait perdre des heures

Imaginez : vous venez de créer votre entité Doctrine parfaitement annotée, vous lancez votre première requête et... boom :

```sql
SQLSTATE[42S02]: Base table or view not found: 1146 Table 'boutique.trade_in_request' doesn't exist
```

Pourtant, en vérifiant votre base de données, la table existe bien... mais elle s'appelle `ps_trade_in_request` ou `shop_trade_in_request` selon le préfixe configuré lors de l'installation.

## Pourquoi Doctrine ne trouve pas vos tables

Le problème est fondamental dans l'architecture PrestaShop :

### PrestaShop utilise des préfixes dynamiques

Dans PrestaShop, le préfixe de table est stocké dans la constante `_DB_PREFIX_` et peut varier selon l'installation :
- `ps_` (installation standard)
- `shop_` (installation personnalisée)  
- `abc123_` (pour la sécurité)
- Et bien d'autres possibilités...

### Doctrine lit les annotations littéralement

Quand vous déclarez votre entité comme ceci :

```php
/**
 * @ORM\Table(name="trade_in_request")
 * @ORM\Entity()
 */
class TradeInRequest
{
    // Vos propriétés...
}
```

Doctrine cherchera exactement la table `trade_in_request`, sans jamais ajouter le préfixe PrestaShop.

### L'erreur classique : préfixer en dur

La tentation est grande de faire ça :

```php
/**
 * @ORM\Table(name="ps_trade_in_request") // ❌ JAMAIS !
 * @ORM\Entity()
 */
class TradeInRequest { }
```

Mais c'est une très mauvaise idée :
- Ça ne marchera que sur les installations avec le préfixe `ps_`
- Impossible de déployer sur plusieurs environnements
- Violation des bonnes pratiques PrestaShop

## La solution élégante : un subscriber Doctrine

La meilleure approche consiste à intercepter le chargement des métadonnées Doctrine pour ajouter automatiquement le bon préfixe au runtime.

### Étape 1 : Créer le subscriber

Créez le fichier `src/Doctrine/TablePrefixSubscriber.php` dans votre module :

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
        
        // Limiter aux entités de notre module uniquement
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

### Étape 2 : Déclarer le service

Dans votre fichier `config/services.yml` :

```yaml
services:
  Vendor\YourModule\Doctrine\TablePrefixSubscriber:
    arguments:
      - '%database_prefix%'
    tags:
      - { name: doctrine.event_subscriber }
```

### Étape 3 : Garder vos entités propres

Vos entités restent sans préfixe :

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

    // Getters et setters...
}
```

### Étape 4 : Adapter votre SQL d'installation

Dans votre fichier `sql/install.sql`, utilisez toujours la variable de préfixe :

```sql
CREATE TABLE IF NOT EXISTS `{$prefix}trade_in_request` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `customer_email` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Déployer la solution

### Vider le cache Symfony

```bash
bin/console cache:clear --no-warmup
```

### Réinitialiser le module

```bash
bin/console prestashop:module reset yourmodule --no-interaction
```

Ou depuis le back-office : désinstaller puis réinstaller le module.

## Gestion des relations complexes

Le subscriber gère aussi les tables de jointure automatiquement. Pour une relation ManyToMany :

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

La table `trade_in_request_category` sera automatiquement préfixée en `{prefix}trade_in_request_category`.

## Tester votre implémentation

Créez un test simple pour vérifier que tout fonctionne :

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
        
        // Vérifier que le préfixe est bien appliqué
        $expectedTableName = _DB_PREFIX_ . 'customer_review';
        $this->assertEquals($expectedTableName, $metadata->getTableName());
    }
}
```

## Avantages de cette approche

Cette solution présente de nombreux avantages dans ma pratique quotidienne :

### Compatibilité universelle
- Fonctionne avec tous les préfixes de base de données
- Aucun code spécifique à un environnement
- Déploiement simplifié sur différentes instances

### Maintenance facilitée
- Centralisation de la logique de préfixage
- Pas de duplication de code
- Évolutivité garantie

### Conformité aux standards
- Respect des bonnes pratiques PrestaShop
- Code métier propre et lisible
- Séparation des responsabilités

## Points d'attention importants

### Limitation du scope

Toujours limiter le subscriber aux entités de votre module :

```php
$moduleNamespace = 'Vendor\\YourModule\\Entity\\';
if (!str_starts_with($classMetadata->getName(), $moduleNamespace)) {
    return; // Ne pas toucher aux autres entités
}
```

Cette précaution évite les conflits avec d'autres modules ou le core PrestaShop.

### Cohérence SQL/Doctrine

Assurez-vous que vos scripts SQL utilisent le même nom de base que vos entités :
- Entité : `@ORM\Table(name="my_table")`
- SQL : `CREATE TABLE {$prefix}my_table`

### Test en conditions réelles

Testez avec différents préfixes pour valider votre implémentation :

```php
// Dans votre environnement de test
define('_DB_PREFIX_', 'test_');
```

## Conclusion

La gestion automatique des préfixes de tables avec Doctrine dans PrestaShop n'est pas complexe une fois qu'on connaît la technique. Cette approche avec un subscriber événementiel offre une solution robuste et maintenable qui respecte les standards de la plateforme.

La prochaine fois que vous développez un module avec Doctrine, pensez à implémenter ce subscriber dès le démarrage. Votre futur vous-même (et vos collègues) vous remercieront !

---

*Article publié le 8 septembre 2025 par Nicolas Dabène - Expert PHP & PrestaShop avec 15+ ans d'expérience*
