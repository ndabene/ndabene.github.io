---
layout: post
title: 'Vibe Coding en e-commerce : pourquoi 80% des modules generés par IA ne passeront
  jamais en production'
date: 2026-02-24
ref: vibe-coding-ecommerce-modules-ia-production-2026
author: Nicolas Dabène
category: prestashop-ecommerce
subcategory: developpement-assiste
categories:
  - PrestaShop
  - développement
  - Intelligence Artificielle
  - Sécurité
tags:
  - PrestaShop
  - Vibe Coding
  - Intelligence Artificielle
  - e-commerce
  - sécurité
  - performance
  - multi-shop
  - dette technique
  - hooks
  - modules
excerpt: 'Le Vibe Coding révolutionne le développement, mais appliqué à PrestaShop,
  c''est un champ de mines. Exemples concrets, vrai code, et retour d''expérience
  après 10 ans de modules en production.'
image: /assets/images/blog/2026/02/vibe-coding-ecommerce-modules-ia-production/image-principale.webp
featured: true
difficulty: Avancé
technologies:
  - PrestaShop
  - PHP
  - Symfony
  - MySQL
  - Smarty
  - IA
estimated_reading_time: 15 minutes
llm_summary: 'Analyse approfondie des limites du Vibe Coding appliqué au développement
  de modules PrestaShop. L''article démontre, avec des exemples de code concrets,
  pourquoi 80% des modules générés par IA échouent en production : hooks mal gérés,
  failles de sécurité béantes (AJAX sans protection, injections SQL), problèmes de
  performance N+1, incompatibilité multi-shop, absence de tests et de fichiers d''upgrade.
  Retour d''expérience de 10 ans de modules en production.'
llm_topics:
  - PrestaShop
  - Vibe Coding
  - Intelligence Artificielle
  - modules e-commerce
  - sécurité web
  - injection SQL
  - CSRF
  - performance
  - multi-shop
  - hooks PrestaShop
  - dette technique
  - tests
  - audit de code
  - production
faq:
  - question: Pourquoi les modules PrestaShop générés par IA échouent-ils en production ?
    answer: Les modules vibe-codés échouent principalement sur les cas limites que
      l'IA ne connaît pas - la gestion multi-shop, les hooks d'action oubliés, l'absence
      de sécurité CSRF/permissions sur les endpoints AJAX, les problèmes de performance
      N+1, et le manque de fichiers d'upgrade pour les migrations de base de données.
      Ils fonctionnent en démo mais cassent sous la charge et la complexité réelle
      d'une boutique en production.
  - question: Quels sont les principaux risques de sécurité des modules générés par
      IA ?
    answer: Les risques majeurs sont les endpoints AJAX sans vérification de token
      CSRF ni contrôle de permissions, les injections SQL par absence d'échappement
      (pSQL), l'absence de validation des entrées utilisateur, et le manque de journalisation
      des actions sensibles. Un simple appel curl peut suffire à modifier les prix
      de tous les produits d'une boutique.
  - question: Comment l'IA gère-t-elle le multi-shop PrestaShop ?
    answer: L'IA gère très mal le multi-shop PrestaShop. Elle oublie systématiquement
      les jointures sur les tables _shop et _lang, ne gère pas les 3 contextes (SHOP,
      GROUP, ALL), et ne génère jamais le hook hookActionShopDataDuplication crucial
      pour la duplication de boutiques. Cela entraîne des données corrompues entre
      boutiques.
  - question: Le Vibe Coding est-il totalement inutile pour PrestaShop ?
    answer: Non, le Vibe Coding reste utile comme accélérateur entre les mains d'un
      développeur expérimenté. Il accélère le scaffolding initial (60%), la génération
      de templates Smarty (50%), les formulaires HelperForm (70%) et la documentation
      (80%). Mais chaque ligne générée doit être revue par un expert qui connaît les
      pièges de PrestaShop en production.
  - question: Quelle est la bonne méthode pour utiliser l'IA dans le développement
      PrestaShop ?
    answer: La méthode recommandée est de spécifier précisément ce que l'on veut (pas
      de prompts vagues), de review chaque ligne avec une checklist mentale (sécurité,
      multi-shop, multi-langue, performance, hooks complets, compatibilité), et de
      valider sur une vraie boutique avec de vraies données en contexte multi-shop.
      L'IA génère, l'expert spécifie, review et valide.
  - question: PrestaShop est-il gratuit ?
    answer: Oui, PrestaShop est un CMS e-commerce open-source et gratuit. Vous payez
      uniquement l'hébergement et les modules premium.
lang: fr
---


# Vibe Coding en e-commerce : pourquoi 80% des modules générés par IA ne passeront jamais en production

**Temps de lecture : 15 min**
**Dernière mise à jour : 24 février 2026**

## Le rêve vendu vs. la réalité du terrain

> "Décris ce que tu veux, l'IA code pour toi."

Depuis qu'Andrej Karpathy a popularisé le concept de **Vibe Coding** dans un tweet viral de février 2025 — et que des outils comme Cursor, Claude Code ou GitHub Copilot ont explosé — un narratif séduisant s'est installé : tout le monde peut désormais créer des logiciels. Plus besoin de comprendre le code, il suffit de "donner le vibe".

Et franchement ? Pour un prototype, une démo, un side-project... ça marche. C'est même bluffant.

Mais moi, je développe des modules PrestaShop depuis plus de 10 ans. Des modules qui tournent sur des boutiques qui font 50 000 commandes par mois. Des modules installés sur des architectures multi-shop avec 12 boutiques, 4 langues, 3 devises, des règles métier spécifiques par groupe client et un ERP branché derrière.

Et ce que je vois arriver depuis 6 mois dans mes audits, mes reprises de code et mes demandes de support, c'est une vague de modules "vibe-codés" qui partagent tous le même destin :

**Ils fonctionnent en démo. Ils cassent en production.**

Cet article n'est pas un pamphlet anti-IA. J'utilise l'IA tous les jours dans mon workflow. Mais je vais vous montrer, avec des exemples concrets et du vrai code, pourquoi le Vibe Coding appliqué à l'e-commerce — et spécifiquement à PrestaShop — est un champ de mines que seule l'expertise métier permet de traverser.

---

## 1. Les hooks : le piège n°1 que l'IA ne comprend pas

### Ce que l'IA génère

Demandez à un LLM de créer un module qui affiche un bloc de réassurance sur la page produit. Vous obtiendrez quelque chose comme :

```php
public function hookDisplayProductAdditionalInfo($params)
{
    $product = $params['product'];

    $this->context->smarty->assign([
        'product_name' => $product->name,
        'reassurance_text' => 'Livraison gratuite dès 49€',
    ]);

    return $this->display(__FILE__, 'views/templates/hook/reassurance.tpl');
}
```

Ça a l'air propre. Ça fonctionne sur une installation fraîche de PrestaShop. Le client est content pendant 48 heures.

### Ce qui explose en production

**Problème 1 : `$params['product']` n'est pas ce que vous croyez.**

Selon la version de PrestaShop (1.7.6 vs 1.7.8 vs 8.1), selon que vous êtes sur la page produit standard ou dans un module de quick-view, selon le thème utilisé... `$params['product']` peut être :

- Un objet `Product`
- Un tableau associatif (retour de `ProductPresenter`)
- `null` (si le hook est appelé dans un contexte inattendu)
- Un tableau avec des clés différentes selon la version

Le code robuste ressemble à ça :

```php
public function hookDisplayProductAdditionalInfo($params)
{
    // Gestion défensive du paramètre product
    $product = null;

    if (isset($params['product'])) {
        if (is_array($params['product'])) {
            // PrestaShop 1.7.7+ avec ProductPresenter
            $productId = (int) ($params['product']['id_product'] ?? $params['product']['id'] ?? 0);
            if ($productId > 0) {
                $product = new Product($productId, false, $this->context->language->id, $this->context->shop->id);
            }
        } elseif ($params['product'] instanceof Product) {
            $product = $params['product'];
        }
    }

    // Fallback sur le contexte si le hook ne fournit rien d'exploitable
    if (!Validate::isLoadedObject($product)) {
        $productId = (int) Tools::getValue('id_product');
        if ($productId > 0) {
            $product = new Product($productId, false, $this->context->language->id, $this->context->shop->id);
        }
    }

    if (!Validate::isLoadedObject($product) || !$product->active) {
        return '';
    }

    // ... suite du traitement
}
```

Sexy ? Non. Nécessaire ? Absolument.

**Problème 2 : le hook n'existe peut-être même pas.**

L'IA va vous proposer `hookDisplayProductAdditionalInfo` parce que c'est dans la doc officielle. Mais sur une boutique réelle avec un thème custom (flavor flavor, Warehouse, flavor flavor...), ce hook :

- peut avoir été supprimé du template
- peut être appelé à un endroit différent dans le DOM
- peut être en concurrence avec 4 autres modules qui s'enregistrent dessus

Un développeur senior sait qu'il faut vérifier le thème cible, proposer un widget comme alternative, et implémenter un fallback avec `hookDisplayFooterProduct` ou un `hookDisplayOverrideTemplate` si nécessaire.

**Problème 3 : les hooks d'action oubliés.**

L'IA génère très bien les hooks d'affichage (display). Elle oublie systématiquement les hooks d'action critiques. Un module de gestion de stock vibe-codé que j'ai audité le mois dernier :

- Gérait `hookActionProductUpdate` pour recalculer le stock
- Oubliait `hookActionObjectProductDeleteAfter` → produits fantômes en base
- Oubliait `hookActionProductAttributeUpdate` → déclinaisons jamais synchronisées
- Oubliait `hookActionObjectCombinationDeleteAfter` → crash de l'ERP
- Ne gérait pas `hookActionObjectStockAvailableUpdateAfter` → conflit avec le stock natif

**Un seul hook oublié = des données incohérentes sur des centaines de produits.**

> **Note technique :** Les hooks `actionObject[ClassName][Add/Update/Delete]Before/After` sont des hooks dynamiques générés par `ObjectModel`. Ils ne peuvent pas être enregistrés via `$this->registerHook()` dans `install()`. Pour les utiliser, votre module doit implémenter la méthode correspondante (ex : `hookActionObjectCombinationDeleteAfter`) — PrestaShop l'appellera automatiquement si elle existe. Pas besoin de `registerHook`, contrairement aux hooks display.

---

## 2. La sécurité : le trou béant que l'IA laisse grand ouvert

### L'AJAX sans protection

C'est le pattern que je retrouve dans **90% des modules vibe-codés** avec une interface d'administration :

```php
// front/ajax.php — généré par IA
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

Ce code est une **porte ouverte totale**. N'importe qui peut modifier le prix de n'importe quel produit de la boutique avec un simple appel curl :

```bash
curl "https://votre-boutique.com/modules/monmodule/front/ajax.php?action=updatePrice&id_product=1&price=0.01"
```

Félicitations : tous vos produits sont à 1 centime.

### Ce que le code sécurisé impose

```php
// controllers/front/ajax.php — version sécurisée
class MonModuleAjaxModuleFrontController extends ModuleFrontController
{
    public function initContent()
    {
        // Vérification que c'est bien une requête AJAX
        if (!$this->ajax) {
            $this->ajaxRender(json_encode(['error' => 'Invalid request']));
            return;
        }

        parent::initContent();
    }

    public function displayAjaxUpdatePrice()
    {
        // 1. Vérification du token CSRF
        if (!$this->isTokenValid()) {
            header('HTTP/1.1 403 Forbidden');
            $this->ajaxRender(json_encode(['error' => 'Invalid token']));
            return;
        }

        // 2. Vérification des permissions (employé admin connecté)
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

        // 3. Validation stricte des entrées
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

        // 4. Vérification que le produit appartient au shop context
        $product = new Product($idProduct, false, null, $this->context->shop->id);
        if (!Validate::isLoadedObject($product)) {
            $this->ajaxRender(json_encode(['error' => 'Product not found in current shop']));
            return;
        }

        // 5. Mise à jour sécurisée avec gestion multi-shop
        $product->price = $newPrice;

        if (Shop::getContext() === Shop::CONTEXT_SHOP) {
            $product->save();
        } else {
            // En contexte multi-shop, on force le shop courant
            $product->id_shop_default = $this->context->shop->id;
            $product->save();
        }

        // 6. Log de l'action pour audit trail
        PrestaShopLogger::addLog(
            sprintf('Product #%d price updated to %f by employee #%d via module MonModule',
                $idProduct, $newPrice, (int) $cookie->id_employee),
            1,
            null,
            'Product',
            $idProduct,
            true,
            (int) $cookie->id_employee
        );

        // 7. Purge du cache produit
        Product::flushPriceCache();

        $this->ajaxRender(json_encode([
            'success' => true,
            'product_id' => $idProduct,
            'new_price' => $newPrice,
        ]));
    }
}
```

On est passé de **8 lignes à 65 lignes**. Et chaque ligne supplémentaire bloque un vecteur d'attaque réel.

> **Point d'architecture :** Cet exemple illustre la sécurisation d'un endpoint front. Mais modifier le prix d'un produit est une action d'administration — elle devrait idéalement passer par un `ModuleAdminController` ou un controller Symfony avec vérification de permissions native. Sur PrestaShop 8+, le cookie `psAdmin` est en cours de dépréciation au profit du système d'auth Symfony. Pour une action admin réelle, préférez un endpoint déclaré dans `config/routes.yml` avec `@IsGranted('ROLE_MOD_TAB_MONMODULE_UPDATE')`.

### Les injections SQL : toujours là en 2026

L'IA adore générer des requêtes SQL "lisibles" :

```php
// Généré par IA — injection SQL
$sql = "SELECT * FROM " . _DB_PREFIX_ . "product
        WHERE reference = '" . $reference . "'";
$results = Db::getInstance()->executeS($sql);
```

```php
// Version sécurisée
$sql = new DbQuery();
$sql->select('p.id_product, p.reference, p.price, pl.name');
$sql->from('product', 'p');
$sql->innerJoin('product_lang', 'pl', 'p.id_product = pl.id_product AND pl.id_lang = ' . (int) $this->context->language->id);
$sql->innerJoin('product_shop', 'ps', 'p.id_product = ps.id_product AND ps.id_shop = ' . (int) $this->context->shop->id);
$sql->where('p.reference = \'' . pSQL($reference) . '\'');
$sql->where('ps.active = 1');
$results = Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
```

Notez les détails que l'IA oublie systématiquement :

- `pSQL()` pour échapper la valeur
- La jointure `product_shop` pour le contexte multi-shop
- La jointure `product_lang` pour la langue courante
- L'utilisation de `_PS_USE_SQL_SLAVE_` pour les requêtes en lecture (performance)
- Le filtrage sur `active = 1`

---

## 3. Les performances : le serial killer silencieux

### Le problème N+1 : le classique que l'IA reproduit à l'infini

Un module de cross-selling vibe-codé que j'ai audité récemment :

```php
// Code généré par IA — N+1 queries
public function hookDisplayShoppingCartFooter($params)
{
    $cart = $this->context->cart;
    $products = $cart->getProducts();
    $recommendations = [];

    foreach ($products as $product) {
        // Requête 1 par produit : récupérer la catégorie
        $category = new Category($product['id_category_default'], $this->context->language->id);

        // Requête 2 par produit : récupérer les produits de la même catégorie
        $categoryProducts = $category->getProducts($this->context->language->id, 1, 10);

        foreach ($categoryProducts as $catProduct) {
            // Requête 3 par produit recommandé : vérifier le stock
            $stockAvailable = StockAvailable::getQuantityAvailableByProduct($catProduct['id_product']);

            if ($stockAvailable > 0) {
                // Requête 4 par produit recommandé : récupérer l'image
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

Un panier avec 5 produits, dans des catégories de 50 produits chacune = potentiellement **1 000+ requêtes SQL** sur chaque affichage du panier.

Sur une boutique avec du trafic, ce module met le serveur à genoux en 24 heures.

### La version optimisée

```php
public function hookDisplayShoppingCartFooter($params)
{
    $cart = $this->context->cart;
    $products = $cart->getProducts();

    if (empty($products)) {
        return '';
    }

    // Cache : on ne recalcule pas à chaque affichage
    $cacheKey = 'monmodule_reco_' . $cart->id . '_' . md5(serialize(array_column($products, 'id_product')));

    // Mise en cache via le système natif PrestaShop
    $cacheId = 'MonModule_reco_' . $cacheKey;

    if (Cache::isStored($cacheId)) {
        return Cache::retrieve($cacheId);
    }

    $productIds = array_column($products, 'id_product');
    $categoryIds = array_unique(array_column($products, 'id_category_default'));
    $idLang = (int) $this->context->language->id;
    $idShop = (int) $this->context->shop->id;

    // UNE SEULE requête pour tout récupérer
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

    // Construction des URLs d'images en batch (pas de requête supplémentaire)
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

    // Mise en cache via le système natif PrestaShop
    Cache::store($cacheId, $output);
    // Note : Cache::getInstance() utilise CacheFs par défaut (filesystem).
    // Pour du Memcached ou Redis, configurer dans Paramètres Avancés > Performances.

    return $output;
}
```

Résultat : **1 requête au lieu de 1 000**. Cache en prime. Prêt pour le trafic.

> **Note** : Sur des installations haute performance, préférer une clé d'invalidation liée au `date_upd` du panier pour éviter de servir un cache obsolète après modification du panier.

---

## 4. Le multi-shop : l'angle mort total de l'IA

C'est ici que l'immense majorité des modules vibe-codés s'effondrent, parce que l'IA n'a tout simplement **aucune idée** de la complexité du multi-shop PrestaShop.

### Ce que l'IA ne sait pas

Le multi-shop PrestaShop, c'est 3 contextes possibles :

```
Shop::CONTEXT_SHOP    → une seule boutique
Shop::CONTEXT_GROUP   → un groupe de boutiques
Shop::CONTEXT_ALL     → toutes les boutiques
```

Et chaque table de la base a potentiellement une table `_shop` associée. Quand un module vibe-codé fait :

```php
// Ne fonctionne qu'en mono-shop
Configuration::updateValue('MON_MODULE_SETTING', $value);
```

En contexte multi-shop, cette ligne peut :

- Écraser la configuration de TOUTES les boutiques (si contexte ALL)
- Ne sauvegarder que pour le groupe (si contexte GROUP)
- Fonctionner correctement (si contexte SHOP, et encore...)

### La gestion correcte

```php
// Gestion multi-shop explicite
public function saveConfiguration()
{
    $shops = Shop::getShops(true, null, true);

    if (Shop::getContext() === Shop::CONTEXT_SHOP) {
        // Sauvegarde pour la boutique courante uniquement
        Configuration::updateValue(
            'MON_MODULE_SETTING',
            Tools::getValue('MON_MODULE_SETTING'),
            false,
            null,
            (int) $this->context->shop->id
        );
    } elseif (Shop::getContext() === Shop::CONTEXT_ALL) {
        // L'utilisateur veut appliquer à toutes les boutiques
        foreach ($shops as $idShop) {
            Configuration::updateValue(
                'MON_MODULE_SETTING',
                Tools::getValue('MON_MODULE_SETTING'),
                false,
                null,
                (int) $idShop
            );
        }
    }
}
```

### L'installation multi-shop : le vrai cauchemar

Le `install()` d'un module vibe-codé :

```php
// Installation naïve
public function install()
{
    return parent::install()
        && $this->registerHook('displayProductAdditionalInfo')
        && $this->installDb();
}

private function installDb()
{
    $sql = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'monmodule_data` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `id_product` INT NOT NULL,
        `custom_field` VARCHAR(255) NOT NULL
    )';

    return Db::getInstance()->execute($sql);
}
```

Le `install()` robuste :

```php
// Installation multi-shop aware
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
        'actionShopDataDuplication', // ← Crucial pour le multi-shop !
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

    // Configuration par défaut pour toutes les boutiques
    $this->initializeDefaultConfig();

    return true;
}

private function installDb()
{
    $sql = [];

    $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'monmodule_data` (
        `id_monmodule_data` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        `id_product` INT UNSIGNED NOT NULL,
        `custom_field` VARCHAR(255) NOT NULL,
        `date_add` DATETIME NOT NULL,
        `date_upd` DATETIME NOT NULL,
        INDEX (`id_product`)
    ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8mb4';

    // Table _shop pour le multi-shop
    $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'monmodule_data_shop` (
        `id_monmodule_data` INT UNSIGNED NOT NULL,
        `id_shop` INT UNSIGNED NOT NULL,
        `active` TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
        PRIMARY KEY (`id_monmodule_data`, `id_shop`),
        INDEX (`id_shop`)
    ) ENGINE=' . _MYSQL_ENGINE_ . ' DEFAULT CHARSET=utf8mb4';

    // Table _lang pour le multilingue
    $sql[] = 'CREATE TABLE IF NOT EXISTS `' . _DB_PREFIX_ . 'monmodule_data_lang` (
        `id_monmodule_data` INT UNSIGNED NOT NULL,
        `id_lang` INT UNSIGNED NOT NULL,
        `id_shop` INT UNSIGNED NOT NULL DEFAULT 1,
        `custom_label` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`id_monmodule_data`, `id_lang`, `id_shop`),
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

// Hook crucial : quand une boutique est dupliquée, les données doivent suivre
public function hookActionShopDataDuplication($params)
{
    $oldShopId = (int) $params['old_id_shop'];
    $newShopId = (int) $params['new_id_shop'];

    Db::getInstance()->execute('
        INSERT INTO `' . _DB_PREFIX_ . 'monmodule_data_shop` (`id_monmodule_data`, `id_shop`, `active`)
        SELECT `id_monmodule_data`, ' . $newShopId . ', `active`
        FROM `' . _DB_PREFIX_ . 'monmodule_data_shop`
        WHERE `id_shop` = ' . $oldShopId
    );
}
```

L'IA ne génère **JAMAIS** `hookActionShopDataDuplication`. Jamais. Et sans ça, la duplication de boutique casse les données du module.

---

## 5. Les tests et la validation : ce qui n'existe tout simplement pas

Un module vibe-codé n'a aucun test. Zéro. L'IA génère le code fonctionnel, pas l'infrastructure de qualité.

Sur un module professionnel, voici ce qui existe en plus du code :

```
monmodule/
├── monmodule.php
├── config/
│   └── services.yml          ← Injection de dépendances
├── src/
│   ├── Controller/
│   ├── Repository/            ← Couche d'abstraction BDD
│   ├── Service/
│   └── Exception/             ← Exceptions métier typées
├── tests/
│   ├── Unit/
│   │   ├── Service/
│   │   └── Repository/
│   └── Integration/
│       ├── HookTest.php
│       ├── MultiShopTest.php
│       └── InstallTest.php
├── upgrade/
│   ├── upgrade-1.1.0.php      ← Migration de BDD
│   ├── upgrade-1.2.0.php
│   └── upgrade-2.0.0.php
├── views/
├── translations/
└── .github/
    └── workflows/
        └── ci.yml             ← CI/CD automatisé
```

### Les fichiers d'upgrade : le grand oublié

Quand votre module évolue, la base de données doit migrer. L'IA ne pense jamais à créer les fichiers d'upgrade :

```php
// upgrade/upgrade-1.2.0.php
function upgrade_module_1_2_0($module)
{
    $sql = [];

    // Ajout d'une colonne sans casser les données existantes
    $sql[] = 'ALTER TABLE `' . _DB_PREFIX_ . 'monmodule_data`
              ADD COLUMN `priority` INT UNSIGNED NOT NULL DEFAULT 0 AFTER `custom_field`';

    // Migration des données existantes
    $sql[] = 'UPDATE `' . _DB_PREFIX_ . 'monmodule_data` SET `priority` = 1 WHERE `active` = 1';

    // Nouveau hook nécessaire
    if (!$module->registerHook('displayAfterBodyOpeningTag')) {
        return false;
    }

    foreach ($sql as $query) {
        if (!Db::getInstance()->execute($query)) {
            return false;
        }
    }

    // Nettoyage du cache
    if (method_exists('Cache', 'clean')) {
        Cache::clean('monmodule_*');
    }

    return true;
}
```

Sans fichier d'upgrade, la mise à jour du module casse toutes les installations existantes. C'est le genre de chose qu'on apprend après avoir reçu 200 tickets de support en une journée.

> **Important PS 8+ :** Depuis PrestaShop 8.0, les scripts d'upgrade du Core ont été entièrement déplacés dans le module `autoupgrade`. Pour vos propres modules, les fichiers `upgrade/upgrade-X.Y.Z.php` restent la bonne approche et sont toujours pris en charge. Mais assurez-vous que votre module déclare correctement sa version dans `monmodule.php` (`$this->version`) et dans `config.xml` — c'est ce que le système d'upgrade utilise pour déclencher les bons scripts de migration.

---

## 6. La compatibilité : le vrai métier

### Compatibilité avec les autres modules

Un module ne vit jamais seul. Sur une boutique PrestaShop typique, il y a 30 à 80 modules installés. Un module vibe-codé :

- Écrase les overrides sans vérifier s'ils existent déjà → crash d'autres modules
- Charge jQuery en double ou charge une version incompatible → JavaScript cassé partout
- Modifie des ObjectModel sans utiliser les hooks → les modules qui observent ces objets ne sont jamais notifiés
- Ajoute du CSS/JS partout au lieu de cibler les pages concernées → ralentissement global

```php
// Ce que l'IA génère
public function hookDisplayHeader()
{
    // Chargé sur TOUTES les pages front
    $this->context->controller->addCSS($this->_path . 'views/css/style.css');
    $this->context->controller->addJS($this->_path . 'views/js/script.js');
}
```

```php
// Ce qu'il faut faire
public function hookDisplayHeader()
{
    // Méthode recommandée par PrestaShop devdocs
    if ($this->context->controller->php_self === 'product') {
        $this->context->controller->registerStylesheet(
            'monmodule-product',
            'modules/' . $this->name . '/views/css/product.css',
            ['media' => 'all', 'priority' => 150]
        );
        $this->context->controller->registerJavascript(
            'monmodule-product',
            'modules/' . $this->name . '/views/js/product.js',
            ['position' => 'bottom', 'priority' => 150, 'attribute' => 'defer']
        );
    }
}
```

> **Pourquoi `php_self` plutôt que `instanceof` ?** La propriété `$php_self` est une string définie sur chaque controller PrestaShop (`'product'`, `'category'`, `'cart'`, etc.) et reste cohérente même avec des thèmes custom ou des surcharges de controller. L'`instanceof` dépend de la chaîne d'héritage et peut être brisé par des overrides.

### Compatibilité de version PrestaShop

Un module professionnel doit gérer ça :

```php
// Adapter le code selon la version
if (version_compare(_PS_VERSION_, '8.0.0', '>=')) {
    // PrestaShop 8 : utilise Symfony et Doctrine
    // Les AdminController legacy sont dépréciés
    // Le système de thème a évolué
} elseif (version_compare(_PS_VERSION_, '1.7.7', '>=')) {
    // PrestaShop 1.7.7+ : nouveaux hooks, nouveau ProductPresenter
    // Symfony partiellement intégré
} else {
    // PrestaShop 1.7.x legacy
    // Encore du code pre-Symfony partout
}
```

---

## 7. PrestaShop 9 : les ruptures que l'IA ignore complètement

Si les sections précédentes s'appliquaient à PrestaShop 1.7.x et 8.x, PrestaShop 9.0 (sorti en juin 2025) introduit des ruptures supplémentaires qui rendent les modules vibe-codés encore plus fragiles.

**La page produit legacy est supprimée.**

Dans PrestaShop 8, deux pages produit coexistaient (legacy et Symfony). Dans PrestaShop 9, **seule la page Symfony existe**. Tout module qui ciblait `hookActionProductSave` ou les hooks de la legacy page produit sans adaptation Symfony est cassé sans migration.

```php
// Ce pattern fonctionnait en PS 8 legacy — cassé en PS 9
public function hookActionProductSave($params) { ... }

// PS 9 : utiliser les nouveaux Form Handlers
public function hookActionAfterUpdateCreateProductFormHandler($params) { ... }
public function hookActionAfterCreateCreateProductFormHandler($params) { ... }
```

**Les hooks d'alias déclenchent des deprecation notices.**

PrestaShop 8.0 avait introduit une alerte en mode développeur quand un alias de hook est utilisé. En PS 9, `Using a hook alias will trigger a deprecation notice` est documenté officiellement. Si votre module utilise encore `displayProductButtons` (alias de `displayProductAdditionalInfo`), préparez-vous à devoir le corriger.

**L'authentification admin back-office est désormais 100% Symfony.**

Fini `Context::$cookie` pour l'auth admin. Le système est maintenant basé sur Symfony Security avec des sessions côté serveur. Tout module qui lisait `$cookie->id_employee` pour vérifier une permission admin dans un contexte non-standard doit être revu.

**Le bon réflexe avant de commencer un module en 2026 :**

```
1. Vérifier la version cible : PS 1.7 / PS 8 / PS 9
2. Consulter "Changes in PrestaShop X.0.x" sur devdocs.prestashop-project.org
3. Vérifier la liste des hooks supprimés pour cette version
4. Adapter l'architecture en conséquence (legacy vs Symfony)
```

> Un module vibe-codé en 2024 ciblant PS 1.7 peut être incompatible avec PS 9 sur 40% de ses fonctionnalités. L'IA qui génère du code en 2026 ne sait pas forcément quelle version vous ciblez — et ne le demandera jamais.

---

## 8. Le bilan : ce que le Vibe Coding fait bien, et où il s'arrête

Soyons honnête. Voici mon bilan après 6 mois d'utilisation quotidienne de l'IA dans mon développement PrestaShop :

### Ce que l'IA fait très bien

| Tâche | Gain de temps |
|-------|--------------|
| Scaffolding initial d'un module | ~60% |
| Génération de templates Smarty basiques | ~50% |
| Écriture de requêtes SQL simples | ~40% |
| Génération de formulaires HelperForm | ~70% |
| Documentation du code | ~80% |
| Refactoring de code existant | ~40% |

### Ce que l'IA fait mal (ou pas du tout)

| Problème | Conséquence en production |
|----------|--------------------------|
| Sécurité (tokens, permissions, SQL injection) | Boutique piratée, données volées |
| Multi-shop | Données corrompues entre boutiques |
| Performance (N+1, cache) | Serveur down en période de charge |
| Hooks d'action complets | Données incohérentes, ERP/CRM désynchronisés |
| Fichiers d'upgrade | Module impossible à mettre à jour |
| Compatibilité cross-version | Module qui crashe sur d'autres versions |
| Compatibilité PS 9 (page produit legacy) | Module cassé sur toutes les boutiques PS 9.0+ |
| Hooks dynamiques `actionObject*` mal utilisés | `registerHook()` silencieux, hook jamais déclenché |
| Gestion d'erreurs robuste | Écrans blancs, 500 errors |
| Conformité RGPD | Risque juridique |
| Accessibilité (a11y) | Non conformité légale |

---

## 9. Ma méthode : l'IA comme accélérateur, pas comme remplaçant

Je ne suis pas contre le Vibe Coding. **Je suis contre le Vibe Coding sans filet.**

Voici comment j'intègre l'IA dans mon workflow quotidien :

### 1. L'IA génère, je spécifie

Je ne demande jamais *"crée-moi un module de wishlist"*. Je demande :

> "Génère la classe WishlistRepository avec les méthodes add, remove, getByCustomer. Utilise DbQuery, gère le multi-shop avec jointure sur _shop, échappe les valeurs avec pSQL et (int). La méthode getByCustomer doit utiliser _PS_USE_SQL_SLAVE_."

### 2. L'IA code, je review

Chaque ligne générée passe par ma checklist mentale :

- Sécurité : token, permissions, échappement
- Multi-shop : contexte, jointures _shop
- Multi-langue : jointures _lang
- Performance : nombre de requêtes, cache
- Hooks : complets (action + display)
- Compatibilité : version PS, thèmes
- Erreurs : try/catch, Validate, fallbacks

### 3. L'IA itère, je valide

L'IA est excellente pour itérer rapidement sur des variantes. Mais la validation finale est humaine, avec des tests sur une vraie boutique, avec de vraies données, dans un vrai contexte multi-shop.

---

## Conclusion : le Vibe Coding ne remplace pas 10 ans de production cassée

Le Vibe Coding est un outil formidable **entre les mains d'un développeur qui sait ce qu'il fait**. Il accélère le travail de 30 à 50%.

Mais entre les mains de quelqu'un qui ne connaît pas les pièges de PrestaShop — et ils sont innombrables — c'est un **générateur de dette technique**, de failles de sécurité et de boutiques instables.

Les 80% de modules vibe-codés qui ne passeront jamais en production, ce ne sont pas des modules mal codés au sens syntaxique. L'IA écrit du code qui compile, qui s'exécute, qui a l'air de fonctionner. **C'est précisément ce qui les rend dangereux.**

Ils échouent sur les cas limites, les contextes spécifiques, les interactions entre modules, les montées en charge, les mises à jour, et les contraintes métier que seule l'expérience terrain permet de connaître.

**L'expertise d'un développeur senior PrestaShop, ce n'est pas de savoir écrire du PHP. C'est de savoir tout ce qui peut mal tourner en production, et de l'empêcher avant que ça arrive.**

> Le Vibe Coding génère du code.
> L'expérience génère de la confiance.

Et en e-commerce, quand chaque minute de downtime coûte des milliers d'euros, **c'est la confiance qui a de la valeur**.

---

*Vous avez un module généré par IA et vous vous demandez s'il est prêt pour la production ? Je propose un **audit technique complet** avec rapport détaillé, corrections prioritaires et estimation de la dette technique. Parce que le meilleur moment pour trouver les problèmes, c'est avant que vos clients ne les trouvent.*

*Et vous, quelle est votre expérience avec le Vibe Coding sur PrestaShop ? Des modules IA qui ont tenu en production ? Des catastrophes évitées de justesse ?*
