---
layout: post
title: Rapport exhaustif sur les protocoles de sécurité et les standards de développement pour les modules PrestaShop
date: 2026-01-05
lang: fr
ref: rapport-securite-modules-prestashop
author: Nicolas Dabène
categories:
- PrestaShop
- Sécurité
- Développement
tags:
- prestashop
- securite
- modules
- developpement
- bonnes-pratiques
- compliance
- php
- symfony
excerpt: Référentiel complet pour concevoir des modules PrestaShop 1.7 et 8 durcis contre SQLi, XSS, CSRF et traversées de répertoire.
image: /assets/images/blog/2026/01/securite-prestashop.webp
keywords:
- PrestaShop
- Sécurité
- Modules PrestaShop
- Standards de développement
- Validation des données
difficulty: Avancé
technologies:
- PrestaShop 1.7
- PrestaShop 8
- PHP 8
- Symfony
estimated_reading_time: 18 minutes
---

# Rapport exhaustif sur les protocoles de sécurité et les standards de développement pour les modules PrestaShop

## 1. Introduction : le paysage de la cybersécurité dans l'écosystème e-commerce

Les plateformes de commerce électronique manipulent des données à très forte valeur (identifiants, paiements, données clients) et constituent des cibles privilégiées. Dans PrestaShop, la surface d'attaque est largement conditionnée par la qualité des modules tiers : un seul connecteur vulnérable suffit à compromettre toute la boutique. Ce rapport propose un référentiel complet des pratiques de sécurité pour le développement de modules PrestaShop (1.7 et 8), en s'appuyant sur la documentation officielle, les exigences de la Marketplace Addons et les retours d'audits de la communauté (notamment Friends of Presta). Objectif : produire un code résilient face aux injections SQL, XSS, CSRF, traversées de répertoires et failles structurelles.

## 2. Architecture et intégrité structurelle : la première ligne de défense

### 2.1 Protection du contexte d'exécution et isolation des processus

Tout fichier PHP doit être exécuté uniquement depuis le dispatcher du noyau. Ajoutez systématiquement le garde-fou suivant en tête de chaque fichier PHP (classes, helpers, scripts d'installation, vues PHP) pour bloquer tout accès direct :

```php
<?php
if (!defined('_PS_VERSION_')) {
    exit;
}
```

Si `_PS_VERSION_` n'est pas défini, l'appel ne provient pas de PrestaShop : l'exécution s'arrête avant toute fuite d'information ou exécution partielle.

### 2.2 Prévention du listage de répertoires (directory listing)

Placez un `index.php` dans chaque répertoire et sous-répertoire du module afin d'empêcher toute énumération de fichiers (y compris dans les dossiers d'assets). Exemple minimal :

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

Pour Apache, ajoutez un `.htaccess` à la racine du module pour interdire l'accès direct aux templates et fichiers de configuration.

### 2.3 Gestion rigoureuse des dépendances et le cas PHPUnit

Les dépendances tierces peuvent introduire des risques supply chain (ex. inclusion involontaire de PHPUnit et du fichier vulnérable `eval-stdin.php`). Bonnes pratiques :

- Exclure du ZIP de production les dossiers de tests (`tests/`, `spec/`), les fichiers de configuration de tests (`phpunit.xml`) et les dépendances `require-dev`.
- Installer en production via `composer install --no-dev --optimize-autoloader`.
- Mettre à jour régulièrement les bibliothèques tierces pour intégrer les correctifs de sécurité.

### 2.4 Déclaration de compatibilité et cycle de vie

Déclarez explicitement la compatibilité du module via `ps_versions_compliancy` et évitez toute borne dynamique illimitée :

```php
$this->ps_versions_compliancy = ['min' => '1.7.0.0', 'max' => '8.99.99'];
```

Cela protège l'administrateur en bloquant l'installation sur des versions non supportées.

## 3. Validation et assainissement des données : théorie et pratique

### 3.1 L'abstraction des entrées via `Tools::getValue()`

L'accès direct aux superglobales (`$_GET`, `$_POST`) est proscrit. Utilisez `Tools::getValue($key, $defaultValue)` pour centraliser l'accès, bénéficier d'un décodage URL et éviter les indices non définis. Cette méthode ne fait pas de sanitization complète : elle doit être suivie d'une validation stricte.

### 3.2 La classe `Validate` : rempart contre les données malformées

Avant tout traitement métier ou persistance, appliquez les méthodes `Validate` adaptées :

- Numérique et booléen : `Validate::isInt()`, `Validate::isUnsignedInt()`, `Validate::isFloat()`, `Validate::isBool()`.
- Chaînes et HTML : `Validate::isGenericName()` pour les libellés, `Validate::isCleanHtml()` pour le contenu riche (option `$allow_iframe` avec parcimonie).
- Spécifiques : `Validate::isFileName()` pour sécuriser les uploads, `Validate::isHookName()` pour les hooks dynamiques.

### 3.3 Prévention des attaques "path traversal"

Pour toute référence de fichier issue d'une entrée utilisateur, neutralisez les séquences de chemin et restreignez l'accès au dossier prévu :

```php
$safeFilename = basename(Tools::getValue('file'));
if (!Validate::isFileName($safeFilename)) {
    die('Bad filename');
}

$targetDir = _PS_MODULE_DIR_.'monmodule/uploads/';
if (file_exists($targetDir.$safeFilename)) {
    // Traitement autorisé
}
```

L'utilisation d'une liste blanche (fichiers attendus) réduit encore la surface d'attaque.

## 4. Sécurité de la base de données : prévention des injections SQL

### 4.1 La classe `Db` et les mécanismes de casting

Toute requête doit passer par `Db` (pas de PDO/mysqli direct). Échappez toujours selon le type :

- Entiers : cast `(int)$id`.
- Chaînes : `pSQL($name)`.
- Identifiants SQL (table/colonne) : `bqSQL($table)`.
- Tableaux : `array_map('intval', $ids)` ou `array_map('pSQL', $values)` avant `implode`.

### 4.2 Sécurisation des clauses `IN` et des listes

```php
$ids = Tools::getValue('ids', []);
$safeList = implode(',', array_map('intval', (array) $ids));
$sql = 'SELECT * FROM '._DB_PREFIX_."product WHERE id_product IN ($safeList)";
```

Pour des listes de chaînes, encapsulez chaque valeur après `pSQL` dans des guillemets simples.

### 4.3 L'abstraction via `DbQuery`

Structurez les requêtes avec `DbQuery` pour réduire les concaténations à risque et faciliter l'audit :

```php
$query = new DbQuery();
$query->select('p.id_product, pl.name');
$query->from('product', 'p');
$query->leftJoin('product_lang', 'pl', 'p.id_product = pl.id_product');
$query->where('pl.id_lang = '.(int) $context->language->id);
$query->where('p.reference = "'.pSQL($ref).'"');
```

### 4.4 Les pratiques prohibées

- Ne jamais modifier les tables du Core (préférez des tables satellites).
- Toujours préfixer les tables avec `_DB_PREFIX_`.

## 5. Sécurité de l'affichage et prévention XSS

### 5.1 Les modifiers d'échappement Smarty

Chaque variable affichée dans un `.tpl` doit être échappée selon le contexte :

- HTML : `{$var|escape:'htmlall':'UTF-8'}`
- Attribut HTML : `{$var|escape:'html':'UTF-8'}`
- JavaScript : `{$var|escape:'javascript':'UTF-8'}`
- URL : `{$var|escape:'url'}`

### 5.2 La controverse du `nofilter`

`{$content nofilter}` désactive toute protection XSS. Ne l'utiliser que sur du HTML validé en amont avec `Validate::isCleanHtml()`. Jamais sur une entrée brute (`Tools::getValue`).

## 6. Authentification, autorisation et protection CSRF

### 6.1 Protection contre la falsification de requête (CSRF)

#### 6.1.1 Contexte Back-Office (Admin)

- Génération : `Tools::getAdminTokenLite('AdminMyController')`.
- Validation explicite pour les actions personnalisées ou AJAX :

```php
if (!Tools::isSubmit('submitAction') || Tools::getValue('token') !== Tools::getAdminTokenLite('AdminMyController')) {
    die('Forbidden');
}
```

Les liens générés via `Context::getContext()->link->getAdminLink(...)` incluent le token automatiquement.

#### 6.1.2 Contexte Front-Office

- Génération : `Tools::getToken()` (lié à la session client).
- Validation côté contrôleur avant tout traitement.
- Forcer HTTPS dans un `ModuleFrontController` avec `$this->ssl = true;` pour protéger le transport du token.

### 6.2 Évolution du hachage des mots de passe

PrestaShop 1.7/8 utilise bcrypt via les services du Core (`PrestaShop\PrestaShop\Core\Crypto\Hashing`). Pour les modules gérant l'authentification, prévoir la vérification des anciens hashs MD5 lors d'une migration, puis re-hacher en bcrypt lors de la connexion réussie.

## 7. Modernisation et standards PrestaShop 8

### 7.1 Typage strict et rigueur PHP

PrestaShop 8 supporte PHP 8.0/8.1 : respectez les signatures (types d'arguments et retours) lorsque vous surchargez le Core, et privilégiez `declare(strict_types=1);` pour réduire les comportements implicites.

### 7.2 Architecture orientée services (Symfony)

Définissez vos contrôleurs comme services (`config/services.yml`) et injectez les dépendances (repositories, translator, logger) au lieu d'utiliser des appels statiques. Cela améliore la testabilité et permet d'appliquer les politiques de sécurité Symfony.

### 7.3 Suppression des fonctionnalités dépréciées

Les méthodes legacy retirées en 8 imposent un audit des appels dépréciés avant migration. Remplacez les accès directs à la base ou aux fichiers par les services modernes.

## 8. Assurance qualité et outils de validation

### 8.1 Le validateur PrestaShop

Soumettez systématiquement le module sur validator.prestashop.com : détection des structures incorrectes, fonctions PHP interdites (`eval`, `shell_exec`), problèmes d'échappement Smarty ou de licence.

### 8.2 PHPStan : analyse statique avancée

Intégrez `prestashop/php-dev-tools` et PHPStan dans votre CI pour détecter les erreurs de type, méthodes inexistantes et branches mortes avant exécution.

### 8.3 Veille et transparence : Friends of Presta

Suivez les avis de sécurité publiés par Friends of Presta pour anticiper les vecteurs d'attaque observés (SQLi via `Tools::getValue`, path traversal, etc.) et mettre à jour vos modules rapidement.

## Conclusion

Sécuriser un module PrestaShop implique une défense en profondeur : garde-fous structurels (fichiers `index.php`, `.htaccess`), validation et assainissement stricts (`Tools`, `Validate`, `pSQL`), protections d'affichage (échappements Smarty), mécanismes anti-CSRF, et adoption des standards modernes de PrestaShop 8. En combinant ces pratiques avec des outils d'audit (Validator, PHPStan) et une veille active, les développeurs peuvent livrer des modules robustes qui protègent marchands et clients contre les menaces actuelles.
