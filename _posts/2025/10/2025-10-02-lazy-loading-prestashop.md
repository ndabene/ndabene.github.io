---
layout: post
title: Optimiser PrestaShop avec le lazy loading
date: 2025-10-02
ref: lazy-loading-prestashop-2025-10
author: Nicolas Dabène
category: prestashop-ecommerce
subcategory: developpement-prestashop
categories:
- PrestaShop
- développement
- Performance
tags:
- API
- PrestaShop
- développement
excerpt: Découvrez comment améliorer significativement les performances de vos modules
  PrestaShop grâce au lazy loading des services Symfony.
image: /assets/images/blog/2025/10/2025-10-02-lazy-loading-prestashop.webp
featured: true
difficulty: Intermédiaire
technologies:
- PHP
- PrestaShop
- Symfony
- YAML
estimated_reading_time: 8 minutes
faq:
- question: Qu'est-ce que le lazy loading des services Symfony ?
  answer: Le lazy loading est une technique où Symfony place un proxy au lieu d'instancier
    immédiatement votre service au démarrage. Le service réel n'est créé qu'au premier
    appel effectif. C'est comme un camion de livraison qui ne démarre que quand vous
    avez réellement un colis à livrer.
- question: Pourquoi le lazy loading est-il important pour les modules PrestaShop
    ?
  answer: Les modules PrestaShop contiennent souvent des services lourds (clients
    API, parsers Excel/CSV, générateurs PDF, clients Redis) que la plupart des pages
    n'utilisent pas. Sans lazy loading, vous gaspillez mémoire et temps de démarrage.
    Avec le lazy, ces services ne se chargent que quand réellement nécessaires.
- question: Comment activer le lazy loading dans un service PrestaShop ?
  answer: 'Dans votre fichier config/services.yml, ajoutez simplement lazy: true dans
    la configuration de votre service. Par exemple : MyVendor\MyModule\Infra\External\ApiClient:
    arguments: $apiKey: ''%env(MYMODULE_API_KEY)%'' lazy: true. Le proxy sera généré
    automatiquement par Symfony uniquement au besoin.'
- question: Quand faut-il éviter le lazy loading ?
  answer: Évitez le lazy loading pour les helpers simples et services légers utilisés
    partout, les services critiques utilisés dans chaque requête, et les services
    de logging qui doivent être disponibles immédiatement. Le lazy loading est bénéfique
    uniquement pour les services lourds utilisés occasionnellement.
- question: Comment résoudre le problème des classes final avec le lazy loading ?
  answer: 'Si votre service est une classe final, Symfony ne peut pas créer de proxy.
    Préférez une interface : créez une ApiClientInterface, faites implémenter votre
    classe final, puis configurez le service avec l''interface en class. Le lazy loading
    fonctionnera alors sur l''interface.'
- question: PrestaShop est-il gratuit?
  answer: Oui, PrestaShop est un CMS e-commerce open-source et gratuit. Vous payez
    uniquement l'hébergement et les modules premium.
---


# Optimiser vos modules PrestaShop avec le lazy loading des services Symfony

## Introduction

Depuis que PrestaShop repose sur Symfony (à partir de la version 1.7.6 et renforcé dans PrestaShop 8 et 9), nous avons accès à toute la puissance du **conteneur de services**. Pourtant, beaucoup de développeurs de modules continuent de charger leurs services « en eager »… même quand ceux-ci ne sont presque jamais utilisés.

Le résultat ? Plus de lenteur, plus de mémoire consommée pour rien. La solution : activer le **lazy loading** des services. Dans cet article, nous allons voir comment cette technique simple peut transformer les performances de vos modules PrestaShop.

## Comprendre le lazy loading des services

### Qu'est-ce que le lazy loading ?

Le principe est simple :
- **Sans lazy loading** → Symfony instancie votre service immédiatement au démarrage
- **Avec lazy loading** → Symfony place un **proxy**. Le service réel n'est créé qu'au premier appel

Pour bien comprendre, imaginons une métaphore : votre service est comme un camion de livraison 🚚.
- Sans lazy : le camion démarre à chaque requête, même s'il est vide
- Avec lazy : il ne démarre que quand vous avez effectivement un colis à livrer

### Les bénéfices concrets

Cette approche apporte plusieurs avantages :
- **Réduction de la consommation mémoire** : seuls les services utilisés sont instanciés
- **Temps de réponse plus rapides** : moins d'objets à créer au démarrage
- **Meilleure scalabilité** : votre module s'adapte mieux à la charge

## Pourquoi c'est particulièrement utile dans PrestaShop

Les modules PrestaShop contiennent souvent des services **lourds** :
- Clients API (Stripe, Amazon S3, ChatGPT, etc.)
- Parsers Excel/CSV pour l'import/export
- Générateurs PDF pour les factures
- Clients de cache Redis ou Elasticsearch

Le problème ? La plupart des pages de votre boutique **n'ont pas besoin** de ces services. Sans lazy loading, vous gaspillez des ressources précieuses. Avec le lazy loading, ces services ne se chargent que quand ils sont réellement nécessaires.

## Implémentation pratique dans un module

### Exemple d'un service externe lourd

Commençons par créer un service qui simule un client API externe :

```php
// src/Infra/External/ApiClient.php
namespace MyVendor\MyModule\Infra\External;

final class ApiClient 
{
    public function __construct(private string $apiKey) 
    {
        // Simulation d'une initialisation coûteuse
        // (connexion réseau, authentification, etc.)
    }
    
    public function fetchCatalog(): array 
    {
        // Appel API externe pour récupérer un catalogue
        // Opération potentiellement lente
        return [
            ['id' => 1, 'name' => 'Produit 1'],
            ['id' => 2, 'name' => 'Produit 2'],
        ];
    }
}
```

### Configuration des services avec lazy loading

Voici comment configurer ce service dans votre fichier `services.yml` :

```yaml
# modules/mymodule/config/services.yml
services:
  _defaults:
    autowire: true
    autoconfigure: true
    public: false

  MyVendor\MyModule\Infra\External\ApiClient:
    arguments:
      $apiKey: '%env(MYMODULE_API_KEY)%'
    lazy: true   # 💡 Le proxy est généré uniquement au besoin
```

### Service applicatif utilisant le client API

Créons maintenant un service qui utilise notre client API :

```php
// src/App/Catalog/SyncCatalog.php
namespace MyVendor\MyModule\App\Catalog;

use MyVendor\MyModule\Infra\External\ApiClient;

class SyncCatalog 
{
    public function __construct(private ApiClient $client) {}
    
    public function __invoke(): int 
    {
        $rows = $this->client->fetchCatalog();
        
        // Logique de synchronisation avec PrestaShop
        // (création/mise à jour des produits)
        
        return \count($rows);
    }
}
```

### Controller Symfony pour déclencher la synchronisation

Enfin, un contrôleur qui utilise notre service :

```php
// src/Ui/Controller/Admin/CatalogController.php
namespace MyVendor\MyModule\Ui\Controller\Admin;

use MyVendor\MyModule\App\Catalog\SyncCatalog;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

final class CatalogController extends AbstractController 
{
    public function sync(SyncCatalog $useCase): Response 
    {
        // C'est seulement ici que ApiClient sera réellement instancié
        $count = $useCase();
        
        $this->addFlash('success', "$count produits synchronisés !");
        return $this->redirectToRoute('mymodule_catalog_index');
    }
}
```

## Bonnes pratiques et cas d'usage

### Quand activer le lazy loading

Le lazy loading est particulièrement bénéfique pour :
- **Clients API externes** : Stripe, PayPal, services de livraison
- **Services de traitement lourd** : manipulation Excel, génération PDF, traitement d'images
- **Fonctionnalités d'export/import** : utilisées rarement mais coûteuses
- **Clients de cache** : Redis, Memcached quand ils ne sont pas toujours nécessaires

### Quand éviter le lazy loading

À l'inverse, évitez le lazy loading pour :
- **Helpers simples** : services légers utilisés partout
- **Services critiques** : utilisés dans chaque requête
- **Services de logging** : doivent être disponibles immédiatement

## Pièges à éviter et bonnes pratiques

### Attention aux classes finales

Si votre service est une classe `final`, Symfony ne peut pas créer de proxy. Préférez une interface :

```php
interface ApiClientInterface 
{
    public function fetchCatalog(): array;
}

final class ApiClient implements ApiClientInterface 
{
    // Implémentation...
}
```

```yaml
# Configuration avec interface
services:
  MyVendor\MyModule\Infra\External\ApiClientInterface:
    class: MyVendor\MyModule\Infra\External\ApiClient
    arguments:
      $apiKey: '%env(MYMODULE_API_KEY)%'
    lazy: true
```

### Évitez la sérialisation des proxies

Les proxies lazy ne doivent pas être sérialisés. Si vous devez persister l'état d'un service, extrayez d'abord les données nécessaires.

### Testez les performances

Utilisez des outils comme Blackfire ou le profiler Symfony pour mesurer l'impact réel :

```bash
# Débugger les services et leurs proxies
bin/console debug:container --show-private
```

## Technique avancée : Service Subscriber

Pour un contrôle encore plus fin, utilisez le pattern `ServiceSubscriberInterface` :

```php
use Symfony\Contracts\Service\ServiceSubscriberInterface;
use Psr\Container\ContainerInterface;

final class MyController extends AbstractController implements ServiceSubscriberInterface 
{
    public static function getSubscribedServices(): array 
    {
        return [
            'syncCatalog' => SyncCatalog::class,
            'apiClient' => ApiClientInterface::class,
        ];
    }
    
    public function __construct(private ContainerInterface $locator) {}
    
    public function sync(): Response 
    {
        // Le service n'est récupéré que quand on en a besoin
        $useCase = $this->locator->get('syncCatalog');
        $count = $useCase();
        
        $this->addFlash('success', "$count produits synchronisés !");
        return $this->redirectToRoute('mymodule_catalog_index');
    }
}
```

## Mesurer l'impact sur les performances

Pour évaluer l'efficacité du lazy loading dans votre contexte, voici quelques métriques à surveiller :

### Mémoire consommée

```php
// Avant et après activation du lazy loading
echo "Mémoire utilisée : " . memory_get_peak_usage(true) / 1024 / 1024 . " MB\n";
```

### Temps de chargement des pages

Utilisez le profiler Symfony ou des outils externes pour mesurer le temps de réponse des pages qui n'utilisent pas vos services lourds.

## Conclusion

Le **lazy loading** des services est un petit réglage de configuration qui peut avoir un impact considérable sur les performances de vos modules PrestaShop :
- Réduction significative de la consommation mémoire
- Temps de réponse plus rapides pour les pages non concernées
- Modules plus scalables et professionnels

La prochaine fois que vous développez un module avec des services lourds, pensez à ajouter cette simple ligne `lazy: true` dans votre configuration. Vos utilisateurs et votre serveur vous remercieront !

N'hésitez pas à tester cette technique sur vos projets existants et à partager vos résultats avec la communauté PrestaShop.

---
*Article publié le 2 octobre 2025 par Nicolas Dabène - Expert PHP & PrestaShop avec 15+ ans d'expérience*
