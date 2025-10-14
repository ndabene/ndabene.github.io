---
layout: post
title: "Quick Start : Contribuer rapidement à l’Admin API PrestaShop 9"
date: 2025-09-12
author: Nicolas Dabène
categories: [PrestaShop, Développement]
tags: ["prestashop-9", "api", "admin-api", "cqrs", "api-platform", "oauth"]
excerpt: "Un guide pédagogique pour créer vos premiers endpoints dans l’Admin API PrestaShop 9. Découvrez les 8 concepts essentiels et commencez à contribuer dès aujourd’hui."
image: /assets/images/blog/2025-09-12-prestashop-admin-api-quickstart.jpg
featured: true
difficulty: "Intermédiaire"
technologies: ["PrestaShop", "API Platform", "PHP", "Symfony"]
estimated_reading_time: 12 minutes
---

# Quick Start : Contribuer rapidement à l’Admin API PrestaShop 9

![Carte mentale des 8 concepts essentiels pour l’Admin API PrestaShop 9](/assets/images/blog/article_content/2025-09-12-carte-mental.png)

Contribuer au **nouvel Admin API de PrestaShop 9** peut sembler intimidant.
On lit des mots comme **CQRS**, **API Platform**, **OAuth2**… et beaucoup de développeurs pensent :

> *“Ouh là, il va falloir suivre des semaines de formation avant de poser ma première pierre.”*

En réalité, c’est faux ✅
Avec seulement **8 concepts bien compris**, vous pouvez créer un endpoint fonctionnel en **moins d’une heure**.

Dans ce guide, je vais vous expliquer chaque brique **comme si nous étions ensemble en salle de cours** :
je pose le contexte, j’illustre avec un exemple concret, puis on avance pas à pas.

---

## 1. `#[ApiResource]` : l’étiquette magique

Imaginez une bibliothèque.
Tant qu’un livre n’a pas de code-barres, impossible de l’emprunter.

Dans PrestaShop, ce **code-barres**, c’est `#[ApiResource]`.
Il dit à API Platform : *“Cette classe est une ressource exposée par l’API.”*

* Sans ça → la classe reste invisible.
* Avec ça → elle devient une **porte d’entrée REST**.

📚 [Lire la doc officielle ApiResource](https://symfonycasts.com/screencast/api-platform/operations)

---

## 2. CQRSGet et CQRSCreate : séparer lire et agir

PrestaShop 9 applique une discipline claire :

* **Lire des données** → c’est le rôle des *Queries*
* **Modifier des données** → c’est le rôle des *Commands*

👉 C’est le **pattern CQRS** (*Command Query Responsibility Segregation*).

Concrètement :

* `CQRSGet` → “Quand on fait un GET, exécute telle Query.”
* `CQRSCreate` → “Quand on fait un POST, exécute telle Command, puis retourne le résultat grâce à telle Query.”

📚 [En savoir plus sur CQRS dans PrestaShop](https://devdocs.prestashop-project.org/9/development/architecture/domain/cqrs/)

---

## 3. Les URI Templates : l’adresse de vos ressources

Chaque ressource a besoin d’une **adresse lisible et structurée**.

```php
'/products/{productId}'
```

➡️ Ici, l’API répond à `/products/123` avec `123` comme paramètre.

Vous pouvez imbriquer plusieurs niveaux :

```
/categories/{categoryId}/products/{productId}
```

👉 Pensez-y comme un plan de ville : vos URI sont les rues où les développeurs vont circuler.

📚 [Doc sur les API Resources](https://devdocs.prestashop-project.org/9/admin-api/resource_server/api-resources/)

---

## 4. Les DTO : des sacs de données

Un **DTO** (*Data Transfer Object*) = un sac à dos 🎒
Il ne fait rien par lui-même, il transporte juste des données.

Exemple minimaliste :

```php
class Product {
    public int $id;
    public string $name;
}
```

Pas besoin de logique métier ici.
👉 Toute l’intelligence vit déjà dans vos **Commands** et **Queries**.

---

## 5. Scopes OAuth : les badges d’accès

Une API, c’est une porte ouverte. Mais qui a le droit d’entrer ?
La réponse : les **scopes OAuth2**.

Chaque opération déclare les permissions nécessaires. Exemples :

* `product_read` → lire des produits
* `product_write` → modifier des produits

Voyez-les comme des **badges d’accès en entreprise**. Sans le bon badge → pas d’entrée.

📚 [Doc OAuth de l’Admin API](https://devdocs.prestashop-project.org/9/admin-api/)

---

## 6. Requirements : filtrer dès la porte

Un endpoint `/products/{productId}` doit recevoir un identifiant numérique.
Mais que faire si quelqu’un envoie `/products/abc` ?

👉 Ajoutez un **requirement** :

```php
requirements: ['productId' => '\\d+']
```

Résultat : seules les URLs avec un nombre (`/products/123`) sont acceptées.
C’est le **videur** à l’entrée de la boîte de nuit : pas la bonne tenue → pas d’entrée.

---

## 7. L’identifier : la carte d’identité de votre ressource

API Platform doit savoir quel champ représente l’identifiant unique.
Sinon, impossible de gérer correctement vos ressources.

On ajoute donc :

```php
#[ApiProperty(identifier: true)]
public int $id;
```

Un seul champ doit jouer ce rôle.
👉 C’est le **numéro de sécurité sociale** de votre ressource.

---

## 8. Organisation : un dossier par entité

Dernier concept : un peu de discipline !
Dans `ps_apiresources`, chaque ressource vit dans son dossier :

```
ps_apiresources/src/ApiPlatform/Resources/Product/
```

👉 Comme un cartable bien rangé : une matière = un cahier, une ressource = un dossier.

📚 [Explorer le repo GitHub ps\_apiresources](https://github.com/PrestaShop/ps_apiresources)

---

## Exemple concret : ressource `Product`

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

## Astuce : la “triche” avec Commands et Queries existants

Le secret ?
Pas besoin de tout réinventer : la majorité des **Commands** et **Queries** existent déjà dans le cœur de PrestaShop !

Pour les découvrir :

```bash
php bin/console prestashop:list:commands-and-queries
```

Exemples :

* `AddProductCommand` / `GetProductForEditing`
* `AddCategoryCommand` / `GetCategoryForEditing`
* `AddCustomerCommand` / `GetCustomerForEditing`

📚 [Liste officielle Commands/Queries](https://devdocs.prestashop-project.org/9/development/components/console/prestashop-list-commands-and-queries/)

---

## Comment démarrer dès aujourd’hui ?

1. **Rejoignez le Slack `#cfc-adminapi`** pour poser vos questions.
2. **Explorez les ressources existantes** dans [ps\_apiresources](https://github.com/PrestaShop/ps_apiresources).
3. **Copiez le template ci-dessus**, adaptez-le, proposez une **Pull Request**.

---

## Conclusion : apprendre en marchant

Beaucoup hésitent à contribuer car ils croient devoir *tout maîtriser* avant de commencer.
La vérité : on apprend **en contribuant**.

Avec ces **8 concepts simples**, vous avez déjà les clés pour écrire un endpoint.
Les notions avancées (State Providers, Processors, Serialization Groups…) viendront naturellement avec la pratique.

👉 Le meilleur moment pour commencer, c’était hier.
Le deuxième meilleur moment, c’est aujourd’hui.

---

## ❓ Questions Fréquentes

**Q: Dois-je créer mes propres Commands et Queries ?**
**R:** Non. Dans la majorité des cas, elles existent déjà dans le cœur de PrestaShop. Vous n’avez qu’à les brancher correctement.

**Q: Quelle est la différence entre l’Admin API et l’ancienne Webservice API ?**
**R:** L’Admin API repose sur Symfony + API Platform et supporte OAuth2, CQRS et une approche moderne, alors que l’ancienne API XML est héritée et limitée.

**Q: Puis-je tester mes endpoints sans front ?**
**R:** Oui, avec un client HTTP comme Postman, Insomnia ou même `curl`, vous pouvez tester vos endpoints rapidement.

**Q: Où poser mes questions si je bloque ?**
**R:** Le Slack communautaire `#cfc-adminapi` est l’endroit idéal pour échanger avec d’autres contributeurs.

---

🔗 **Ressources utiles**

* [Documentation Admin API](https://devdocs.prestashop-project.org/9/admin-api/)
* [CQRS dans PrestaShop](https://devdocs.prestashop-project.org/9/development/architecture/domain/cqrs/)
* [Repo ps\_apiresources](https://github.com/PrestaShop/ps_apiresources)
* [Liste Commands/Queries](https://devdocs.prestashop-project.org/9/development/components/console/prestashop-list-commands-and-queries/)

---

*Article publié le 12 septembre 2025 par Nicolas Dabène – Expert PrestaShop & contributeur open source depuis 2010.*
