---
layout: post
title: 'Énigme PrestaShop : trouvez les 5 erreurs'
date: 2025-10-21
author: Nicolas Dabène
category: tutoriels
subcategory: resolution-problemes
categories:
- PrestaShop
- développement
- PHP
- Tutoriel
tags:
- PrestaShop
- développement
excerpt: Développeurs PrestaShop, je vous lance un défi ! Découvrez les 5 erreurs
  courantes dans ce module de best-sellers et améliorez vos compétences de développement.
image: /assets/images/blog/2025/10/2025-10-21-enigme-prestashop-erreurs.webp
featured: true
difficulty: Intermédiaire
technologies:
- PrestaShop
- PHP
- MySQL
- Smarty
- Hook
estimated_reading_time: 15 minutes
faq:
- question: Pourquoi parent::__construct() est-il indispensable dans un module PrestaShop
    ?
  answer: parent::__construct() initialise le contexte ($this->context), configure
    l'environnement Smarty, prépare les traductions ($this->l()) et initialise toutes
    les propriétés essentielles du module. Sans cet appel, vous obtiendrez des erreurs
    fatales 'Call to undefined method' ou 'Undefined property' dès l'utilisation de
    ces fonctionnalités.
- question: Pourquoi faut-il appeler parent::install() lors de l'installation d'un
    module ?
  answer: parent::install() enregistre votre module dans la base de données PrestaShop
    (table ps_module), définit le statut d'activation et permet à PrestaShop de 'voir'
    votre module. Sans cet appel, le module semble installé mais n'apparaît pas dans
    la liste des modules et les hooks ne fonctionnent pas.
- question: Quelle est la bonne façon d'accéder au contexte PrestaShop dans un hook
    ?
  answer: 'La meilleure pratique est d''utiliser Context::getContext() qui fonctionne
    partout et est plus fiable. Vous pouvez aussi utiliser $this->context (possible
    après parent::__construct()). Le contexte contient toutes les informations sur
    l''environnement actuel : langue, boutique, client, devise.'
- question: Comment assigner correctement des variables à Smarty dans PrestaShop ?
  answer: Utilisez $this->context->smarty->assign(array('products' => $bestSellers))
    en format tableau. Smarty attend un tableau associatif complet avec toutes les
    variables, pas des appels individuels. C'est plus performant (un seul appel),
    plus lisible (toutes les variables au même endroit) et plus facile à maintenir.
- question: Quelle est la structure de chemin correcte pour les templates de hooks
    ?
  answer: 'PrestaShop suit une convention stricte : views/templates/hook/ pour les
    templates de hooks, views/templates/admin/ pour l''administration, et views/templates/front/
    pour les contrôleurs front-office. Le chemin complet dans display() doit être
    : $this->display(__FILE__, ''views/templates/hook/bestsellers.tpl'').'
- question: PrestaShop est-il gratuit?
  answer: Oui, PrestaShop est un CMS e-commerce open-source et gratuit. Vous payez
    uniquement l'hébergement et les modules premium.
is_future: true
---


# 🧩 Énigme PrestaShop : Saurez-vous trouver les 5 erreurs ?

Développeurs PrestaShop, je vous lance un défi ! 🚀

Vous êtes prêts à relever le challenge ? J'ai créé une énigme de **niveau moyen** qui teste vos connaissances sur le développement de modules PrestaShop. Le code ci-dessous contient **5 erreurs courantes** que tout développeur PrestaShop a probablement déjà rencontrées (ou faites 😅).

Imaginez-vous comme un détective dans un roman policier. Vous avez devant vous un code apparemment innocent, mais qui cache des mystères. Votre mission : identifier les 5 erreurs qui pourraient faire planter votre module en production. Prêts ? C'est parti !

## 🎯 Le Contexte de l'Énigme

Vous devez créer un module qui affiche les produits les plus vendus du mois avec un badge spécial sur la page d'accueil. Rien de très complexe en apparence, mais comme souvent avec PrestaShop, le diable se cache dans les détails.

Voici le code à analyser. Prenez votre temps, observez chaque ligne, et notez les erreurs que vous repérez. Je vous donne un indice : ces erreurs sont extrêmement courantes et peuvent causer des bugs difficiles à débuguer.

## 🔍 Le Code à Analyser

```php
class BestSellersModule extends Module
{
    public function __construct()
    {
        $this->name = 'bestsellers';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'VotreNom';
        
        // ERREUR 1 : Que manque-t-il ici ?
        
        $this->displayName = $this->l('Best Sellers du Mois');
        $this->description = $this->l('Affiche les produits les plus vendus');
    }
    
    public function install()
    {
        // ERREUR 2 : Comment installer correctement un module ?
        return $this->registerHook('displayHome');
    }
    
    public function hookDisplayHome($params)
    {
        // ERREUR 3 : Quelle est la bonne façon de récupérer le contexte ?
        $id_lang = $this->context->language->id;
        $id_shop = $this->context->shop->id;
        
        $bestSellers = $this->getBestSellers($id_lang, $id_shop);
        
        // ERREUR 4 : Comment assigner correctement des variables à Smarty ?
        $this->smarty->assign('products', $bestSellers);
        
        // ERREUR 5 : Quel est le bon chemin pour le template ?
        return $this->display(__FILE__, 'bestsellers.tpl');
    }
    
    protected function getBestSellers($id_lang, $id_shop, $limit = 10)
    {
        $sql = new DbQuery();
        $sql->select('p.id_product, pl.name, p.price')
            ->from('product', 'p')
            ->leftJoin('product_lang', 'pl', 
                'p.id_product = pl.id_product AND pl.id_lang = ' . (int)$id_lang)
            ->leftJoin('order_detail', 'od', 'p.id_product = od.product_id')
            ->where('p.active = 1')
            ->where('p.id_shop = ' . (int)$id_shop)
            ->groupBy('p.id_product')
            ->orderBy('SUM(od.product_quantity) DESC')
            ->limit($limit);
        
        return Db::getInstance()->executeS($sql);
    }
}
```

Alors, les avez-vous trouvées ? Ne vous inquiétez pas si vous n'avez pas tout repéré du premier coup. Même les développeurs expérimentés peuvent passer à côté de ces erreurs classiques. Avant de vous donner les solutions, laissez-moi vous expliquer pourquoi ces erreurs sont si importantes.

## 🤔 Pourquoi ces erreurs sont cruciales ?

Dans le développement PrestaShop, certaines erreurs peuvent sembler anodines mais avoir des conséquences dramatiques :

- Une erreur d'initialisation peut faire planter tout votre module
- Un problème de contexte peut causer des bugs imprévisibles selon l'environnement
- Une mauvaise gestion des templates peut empêcher l'affichage
- Des problèmes SQL peuvent ralentir votre boutique ou afficher des données incorrectes

C'est comme construire une maison : si les fondations sont mal faites, tout l'édifice risque de s'effondrer. Maintenant, découvrons ensemble les solutions.

## ✅ LES SOLUTIONS DÉTAILLÉES

### **Erreur 1 : `parent::__construct()` manquant - L'oubli fatal**

```php
public function __construct()
{
    $this->name = 'bestsellers';
    $this->tab = 'front_office_features';
    $this->version = '1.0.0';
    $this->author = 'VotreNom';
    
    parent::__construct(); // ✅ INDISPENSABLE
    
    $this->displayName = $this->l('Best Sellers du Mois');
    $this->description = $this->l('Affiche les produits les plus vendus');
}
```

**Pourquoi cette erreur est critique ?**

Imaginez que vous construisez une voiture. Vous assemblez le moteur, les roues, la carrosserie, mais vous oubliez de connecter la batterie. La voiture aura l'air parfaite, mais elle ne démarrera jamais !

`parent::__construct()` joue exactement ce rôle de "batterie" dans PrestaShop. Il :
- Initialise le contexte (`$this->context`)
- Configure l'environnement Smarty
- Prépare les traductions (`$this->l()`)
- Initialise toutes les propriétés essentielles

**Conséquence si omis :** Erreur fatale "Call to undefined method" ou "Undefined property" dès que vous utilisez `$this->context` ou `$this->l()`.

**Règle d'or :** `parent::__construct()` doit TOUJOURS être appelé en premier dans votre constructeur.

---

### **Erreur 2 : `parent::install()` non appelé - Le module fantôme**

```php
public function install()
{
    return parent::install() // ✅ Enregistre le module en BDD
        && $this->registerHook('displayHome');
}
```

**L'analogie du restaurant :**

Vous voulez ouvrir un restaurant. Vous choisissez l'emplacement, décorez l'intérieur, embauchez le personnel, mais vous oubliez de demander la licence d'exploitation. Votre restaurant peut cuisiner les meilleurs plats du monde, personne ne le saura jamais car il n'existe pas officiellement !

`parent::install()` enregistre votre module dans la base de données de PrestaShop :
- Il crée l'entrée dans la table `ps_module`
- Il définit le statut d'activation
- Il permet à PrestaShop de "voir" votre module

**Conséquence si omis :** Le module semble installé, mais n'apparaît pas dans la liste des modules, et les hooks ne fonctionnent pas.

**Règle d'or :** Toujours retourner `parent::install() && [vos conditions]`.

---

### **Erreur 3 : Accès au contexte - Le GPS défaillant**

```php
public function hookDisplayHome($params)
{
    $context = Context::getContext(); // ✅ Bonne pratique
    $id_lang = $context->language->id;
    $id_shop = $context->shop->id;
    
    // OU : $id_lang = $this->context->language->id;
    // (possible seulement après parent::__construct())
```

**L'analogie du GPS :**

Vous partez en voyage avec votre GPS, mais vous ne l'allumez pas. Vous connaissez votre destination, vous avez la carte, mais vous ne savez pas où vous êtes actuellement. Résultat : vous tournez en rond !

Le contexte PrestaShop contient toutes les informations sur l'environnement actuel :
- Langue courante
- Boutique active (dans le multi-boutique)
- Client connecté
- Devise utilisée
- Etc.

**Pourquoi `Context::getContext()` est préférable :**
- Il fonctionne partout, même en dehors des classes Module
- Il est plus fiable que `$this->context` dans certains cas
- Il suit les bonnes pratiques PrestaShop

**Conséquence si mal utilisé :** Bugs imprévisibles selon l'environnement (langue incorrecte, mauvaise boutique, etc.).

---

### **Erreur 4 : Assignation Smarty incorrecte - Le livreur distrait**

```php
$this->context->smarty->assign(array(
    'products' => $bestSellers
)); // ✅ Format tableau
```

**L'analogie du livreur :**

Vous commandez une pizza et dites au livreur : "Voici l'adresse : 123 rue de la Paix. Et aussi, n'oubliez pas de sonner deux fois." Mais vous ne lui dites pas quelle pizza commander !

Smarty attend un tableau associatif complet avec toutes les variables, pas des appels individuels. C'est comme donner une liste de courses complète d'un coup plutôt que d'appeler le magasin pour chaque article.

**Pourquoi c'est important :**
- Performance : Un seul appel plutôt que plusieurs
- Lisibilité : Toutes les variables au même endroit
- Maintenance : Plus facile à déboguer

**Conséquence si mal fait :** Variables non transmises au template, affichage incorrect.

---

### **Erreur 5 : Chemin du template incorrect - L'adresse perdue**

```php
return $this->display(__FILE__, 'views/templates/hook/bestsellers.tpl'); // ✅
```

**L'analogie du facteur :**

Vous envoyez une lettre importante, mais vous écrivez l'adresse de destinataire sur l'enveloppe au lieu d'utiliser l'adresse correcte. Le facteur ne saura pas où la livrer !

PrestaShop suit une convention de nommage très stricte pour les templates :
- `views/templates/hook/` pour les templates de hooks
- `views/templates/admin/` pour les templates d'administration
- `views/templates/front/` pour les contrôleurs front-office

**Pourquoi cette structure :**
- Organisation logique du code
- Compatibilité avec les thèmes enfants
- Mises à jour plus faciles

**Conséquence si mal fait :** Template non trouvé, erreur d'affichage.

## 💡 Questions Bonus pour les Experts

Maintenant que nous avons corrigé les erreurs de base, passons aux optimisations pour les développeurs confirmés !

### **1. Comment optimiseriez-vous la requête SQL ?**

```php
protected function getBestSellersOptimized($id_lang, $id_shop, $limit = 10)
{
    // Calculer le mois en cours
    $date_from = date('Y-m-01'); // Premier jour du mois
    $date_to = date('Y-m-t');   // Dernier jour du mois
    
    $sql = new DbQuery();
    $sql->select('p.id_product, pl.name, p.price, SUM(od.product_quantity) as total_sold')
        ->from('product', 'p')
        ->innerJoin('product_lang', 'pl', 'p.id_product = pl.id_product AND pl.id_lang = ' . (int)$id_lang)
        ->innerJoin('order_detail', 'od', 'p.id_product = od.product_id')
        ->innerJoin('orders', 'o', 'od.id_order = o.id_order')
        ->where('p.active = 1')
        ->where('p.id_shop = ' . (int)$id_shop)
        ->where('o.valid = 1') // ✅ Seulement les commandes validées
        ->where('o.date_add >= "' . pSQL($date_from) . '"')
        ->where('o.date_add <= "' . pSQL($date_to) . '"')
        ->groupBy('p.id_product')
        ->orderBy('SUM(od.product_quantity) DESC')
        ->limit($limit);
    
    // Utiliser le serveur esclave pour les lectures
    return Db::getInstance(_PS_USE_SQL_SLAVE_)->executeS($sql);
}
```

**Optimisations apportées :**
- **Filtrage par mois** : Seules les ventes du mois en cours
- **Commandes validées uniquement** : Évite de compter les commandes annulées
- **INNER JOIN** : Plus performant que LEFT JOIN quand on veut des résultats
- **Serveur esclave** : Réduit la charge sur le serveur maître

---

### **2. Comment ajouteriez-vous un système de cache ?**

```php
public function hookDisplayHome($params)
{
    // Créer un ID de cache unique
    $cache_id = $this->getCacheId('bestsellers_' . $this->context->shop->id . '_' . $this->context->language->id);
    
    // Vérifier si le cache existe
    if (!$this->isCached('views/templates/hook/bestsellers.tpl', $cache_id)) {
        // Si pas en cache, récupérer les données
        $bestSellers = $this->getBestSellers(
            $this->context->language->id, 
            $this->context->shop->id
        );
        
        // Formater les données pour le template
        $this->context->smarty->assign(array(
            'products' => $bestSellers,
            'module_name' => $this->name
        ));
    }
    
    // Retourner le template (en cache ou non)
    return $this->display(__FILE__, 'views/templates/hook/bestsellers.tpl', $cache_id);
}
```

**Avantages du cache :**
- **Performance** : Évite les requêtes SQL répétées
- **Évolutif** : Supporte la multi-boutique et multi-langue
- **Automatique** : PrestaShop vide le cache lors des changements importants

---

### **3. Que devriez-vous faire dans la méthode `uninstall()` ?**

```php
public function uninstall()
{
    // Désenregistrer les hooks
    $this->unregisterHook('displayHome');
    
    // Supprimer les configurations personnalisées
    Configuration::deleteByName('BESTSELLERS_LIMIT');
    Configuration::deleteByName('BESTSELLERS_SHOW_PRICE');
    
    // Nettoyer les éventuels fichiers temporaires
    // (si votre module en crée)
    
    // Appeler le parent pour finaliser
    return parent::uninstall();
}
```

**Pourquoi c'est crucial :**
- **Propreté** : Évite les données orphelines
- **Sécurité** : Supprime les accès potentiels
- **Maintenance** : Facilite les réinstallations

---

### **4. Comment rendre le nombre de produits configurable ?**

Dans `getContent()` (méthode appelée depuis le back-office) :

```php
public function getContent()
{
    $output = '';
    
    // Traitement du formulaire
    if (Tools::isSubmit('submit_' . $this->name)) {
        $limit = (int)Tools::getValue('BESTSELLERS_LIMIT');
        if ($limit > 0 && $limit <= 50) {
            Configuration::updateValue('BESTSELLERS_LIMIT', $limit);
            $output .= $this->displayConfirmation($this->l('Configuration mise à jour'));
        } else {
            $output .= $this->displayError($this->l('Valeur invalide'));
        }
    }
    
    // Affichage du formulaire avec HelperForm
    $helper = new HelperForm();
    // Configuration du helper...
    
    $fields_form = array(
        'form' => array(
            'legend' => array('title' => $this->l('Configuration')),
            'input' => array(
                array(
                    'type' => 'text',
                    'label' => $this->l('Nombre de produits'),
                    'name' => 'BESTSELLERS_LIMIT',
                    'required' => true,
                    'desc' => $this->l('Maximum 50 produits')
                )
            ),
            'submit' => array('title' => $this->l('Enregistrer'))
        )
    );
    
    $helper->fields_value = array(
        'BESTSELLERS_LIMIT' => Configuration::get('BESTSELLERS_LIMIT', 10)
    );
    
    return $output . $helper->generateForm(array($fields_form));
}
```

---

### **5. Quelle méthode utiliser pour formatter les prix ?**

```php
// Méthode recommandée depuis PrestaShop 1.7.6
public function formatPrice($price, $id_currency = null)
{
    $context = Context::getContext();
    $id_currency = $id_currency ?: $context->currency->id;
    $currency = new Currency($id_currency);
    
    return $context->getCurrentLocale()->formatPrice(
        $price, 
        $currency->iso_code
    );
}

// OU utiliser Product::getProductsProperties pour formatter automatiquement
public function hookDisplayHome($params)
{
    $bestSellers = $this->getBestSellers($this->context->language->id, $this->context->shop->id);
    
    // Récupérer les propriétés complètes des produits (avec prix formatés)
    $products = Product::getProductsProperties(
        $this->context->language->id, 
        $bestSellers
    );
    
    $this->context->smarty->assign('products', $products);
    return $this->display(__FILE__, 'views/templates/hook/bestsellers.tpl');
}
```

**⚠️ ATTENTION IMPORTANTE :**
`Tools::displayPrice()` est **dépréciée depuis PrestaShop 1.7.6** et ne doit plus être utilisée. Préférez toujours `$context->getCurrentLocale()->formatPrice()`.

## 🎓 Conclusion : L'importance des bonnes pratiques

Cette énigme vous aura montré que le développement PrestaShop n'est pas seulement une question de code, mais aussi de rigueur et de connaissance des bonnes pratiques. Ces 5 erreurs sont :

1. **parent::__construct()** - La fondation invisible
2. **parent::install()** - L'enregistrement officiel  
3. **Context::getContext()** - L'environnement actuel
4. **assign(array(...))** - La transmission des données
5. **views/templates/hook/** - L'organisation des fichiers

**Leçon à retenir :** Dans PrestaShop, les détails comptent énormément. Une petite erreur peut faire la différence entre un module qui fonctionne parfaitement et un qui cause des nuits blanches au débogage.

N'hésitez pas à partager vos réponses dans les commentaires, ou à proposer vos propres énigmes ! Et souvenez-vous : même les meilleurs développeurs ont déjà fait ces erreurs. C'est en les corrigeant qu'on progresse.

**Question bonus pour vous :** Quelle est votre erreur PrestaShop la plus mémorable ? Partagez-la en commentaires pour aider la communauté ! 🚀

---

*Retrouvez d'autres tutoriels PrestaShop sur [mon blog](/) et n'hésitez pas à me suivre sur [LinkedIn](https://www.linkedin.com/in/nicolasdabene/) pour plus de contenu technique !*
