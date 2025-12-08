---
layout: post
title: 'Tutoriel : Créer un formulaire Symfony/Twig dans un module PrestaShop'
date: 2026-01-05
lang: fr
ref: prestashop-symfony-form-guide
author: Nicolas Dabène
categories:
- PrestaShop
- Développement
- Symfony
tags:
- prestashop
- symfony
- twig
- formulaires
- module
- back-office
- mvc
- psr-4
excerpt: "Ce tutoriel s'adresse aux développeurs déjà familiers avec la création de modules PrestaShop classiques (legacy) et qui souhaitent passer à l'approche moderne utilisant Symfony et Twig pour les formulaires d'administration."
image: /assets/images/blog/2026/prestashop-symfony-form-guide.webp
keywords:
- PrestaShop Symfony
- Formulaires Symfony
- Module PrestaShop moderne
- Twig PrestaShop
- Architecture MVC PrestaShop
- PSR-4 PrestaShop
- Back-office PrestaShop
- Symfony Forms
difficulty: ⭐️⭐️⭐️
technologies:
- PrestaShop
- Symfony 6.4
- PHP 8.4
- Twig
- Bootstrap
estimated_reading_time: 25 minutes
---

# Tutoriel : Créer un formulaire Symfony/Twig dans un module PrestaShop

Ce tutoriel s'adresse aux développeurs déjà familiers avec la création de modules PrestaShop classiques (legacy) et qui souhaitent passer à l'approche moderne utilisant Symfony et Twig pour les formulaires d'administration.

## L'évolution des modules PrestaShop

Depuis la version 1.7, PrestaShop intègre progressivement le framework Symfony dans son architecture. Cette transition représente un changement majeur dans la façon de développer des modules, en particulier pour les interfaces d'administration.

### 👵 Approche classique (Legacy)

- Architecture basée sur des classes PHP standards et des templates smarty
- Utilisation de `HelperForm` pour générer les formulaires
- Gestion manuelle des tokens CSRF et de la validation
- Implémentation spécifique à PrestaShop avec moins de standardisation

### 🚀 Approche moderne (Symfony)

- Séparation claire entre logique et présentation
- Système de formulaires robuste avec validation intégrée
- Protection CSRF automatique et sécurité renforcée
- Architecture standardisée et maintenable

Bien que l'approche legacy soit encore supportée, la tendance est clairement à l'adoption des standards Symfony pour le développement de nouveaux modules ou la refactorisation de modules existants. PrestaShop a d'ailleurs migré la majorité de son back-office vers cette architecture.

## Ce que vous allez apprendre

Dans ce tutoriel, nous allons créer un formulaire d'administration complet en utilisant les composants Symfony intégrés à PrestaShop. À travers un exemple simple mais concret, vous découvrirez :

**Architecture** : Comment structurer votre module selon les standards PSR-4 et les conventions Symfony

**Formulaires** : Création et gestion de formulaires avec validation automatique et personnalisation

**Templates** : Utilisation du moteur de template Twig pour une présentation claire et maintenable

### 📝 Prérequis

Ce tutoriel suppose que vous avez déjà une connaissance de base de PrestaShop, PHP et de la création de modules. Nous nous concentrerons sur l'intégration de Symfony et Twig, sans revenir sur les concepts fondamentaux du développement pour PrestaShop.

À la fin de ce guide, vous serez capable de créer des interfaces d'administration professionnelles, sécurisées et maintenables pour vos modules PrestaShop, en phase avec les meilleures pratiques modernes de développement web.

## Périmètre du tutoriel

Ce tutoriel se veut exhaustif concernant la création de formulaires avec Symfony dans PrestaShop, mais n'aborde pas tous les aspects avancés de l'écosystème Symfony, comme :

- Doctrine ORM pour la gestion des données et des entités, qui fera l'objet d'un tutoriel dédié ultérieurement
- Les aspects avancés de la sécurité et des ACL (Access Control Lists)

Ce guide se concentre principalement sur l'explication détaillée des différents éléments de l'architecture Symfony dans PrestaShop et de leur articulation. L'objectif est de vous aider à comprendre les mécanismes sous-jacents et les relations entre les composants, plutôt que d'offrir un tutoriel pratique exhaustif. Cette compréhension vous fournira une base solide pour explorer davantage et approfondir votre maîtrise de l'écosystème Symfony dans PrestaShop.

## Structure de fichiers nécessaires

Voici la structure de fichiers que nous allons mettre en place pour notre formulaire moderne :

```
monmodule/
  ├── config/                    # Dossier contenant les configurations Symfony
  │   └── routes.yml            # Définition des routes de l'admin
  │
  ├── src/                      # Code source suivant PSR-4
  │   ├── Controller/           # Contrôleurs Symfony
  │   │   └── AdminController.php # Contrôleur gérant notre formulaire
  │   └── Form/                 # Types de formulaires Symfony
  │       └── MessageConfigType.php # Définition de notre formulaire
  │
  ├── templates/                # Templates Twig
  │   └── admin/                # Templates d'administration
  │       └── message_config.html.twig # Vue de notre formulaire
  │
  └── monmodule.php             # Fichier principal du module (inchangé en structure)
```

Cette structure représente une organisation moderne d'un module PrestaShop exploitant pleinement le framework Symfony intégré :

### Dossier `config/`

Ce dossier contient toutes les configurations spécifiques à Symfony. Dans notre cas, nous y définissons les routes qui permettront d'accéder à notre interface d'administration. PrestaShop charge automatiquement les fichiers de ce dossier lors de l'initialisation.

- **routes.yml** : Définit les URL accessibles et les contrôleurs associés.

### Dossier `src/`

Il s'agit du cœur de notre module, structuré selon les standards PSR-4 pour l'autoloading des classes. Cette organisation facilite la maintenance et l'extension du code.

- **Controller/** : Contient les contrôleurs Symfony qui traitent les requêtes HTTP, appliquent la logique métier et renvoient les réponses.
  - Exemple : `AdminController.php`

- **Form/** : Regroupe les définitions de formulaires qui gèrent la validation et le traitement des données.
  - Exemple : `MessageConfigType.php`

### Dossier `templates/`

Stocke tous les templates Twig pour l'affichage. La séparation entre la logique (PHP) et la présentation (Twig) est une pratique moderne qui améliore la maintenabilité.

- **admin/** : Templates spécifiques au back-office.
  - Exemple : `message_config.html.twig`

### Fichier `monmodule.php`

Point d'entrée traditionnel du module PrestaShop, qui déclenche désormais le chargement du framework Symfony et la redirection vers notre contrôleur moderne.

Cette architecture orientée composants est bien plus modulaire que l'approche classique de PrestaShop, permettant de développer, tester et maintenir chaque partie indépendamment.

## Le fichier principal du module

Le fichier principal reste similaire à celui d'un module classique, mais nous ajoutons une redirection vers notre contrôleur Symfony :

```php
public function getContent()
{
    // Au lieu d'afficher directement le formulaire,
    // nous redirigeons vers le contrôleur Symfony
    Tools::redirectAdmin(
        $this->context->link->getAdminLink('MonModuleAdmin')
    );
}
```

Ce code joue un rôle crucial de passerelle entre l'écosystème Legacy de PrestaShop et le framework Symfony :

**Fonction `getContent()`** : Méthode standard de PrestaShop appelée lorsque l'utilisateur accède à la configuration du module depuis le back-office.

**Méthode `redirectAdmin()`** : Redirige l'utilisateur vers une page d'administration spécifique, en utilisant les mécanismes de sécurité intégrés de PrestaShop.

**Appel à `getAdminLink()`** : Génère l'URL correcte vers notre contrôleur Symfony en utilisant l'identifiant `'MonModuleAdmin'` qui sera défini dans notre fichier de routes.

### Avantages de cette approche

- Compatibilité avec le système de menu du back-office de PrestaShop
- Maintien des contrôles d'accès et de sécurité de PrestaShop
- Transition en douceur vers l'architecture Symfony sans rupture

## Le routeur Symfony : config/routes.yml

**Rôle** : Ce fichier définit les URL d'accès à notre contrôleur Symfony. Il permet de créer une correspondance entre une URL et une méthode de contrôleur.

```yaml
# Ce fichier indique à PrestaShop comment diriger les requêtes HTTP vers nos contrôleurs
mon_module_admin:
    # L'URL relative à partir de /admin-xxx/
    path: /monmodule/admin
    # Méthodes HTTP autorisées (GET pour afficher, POST pour soumettre)
    methods: [GET, POST]
    # Configuration de la route
    defaults:
        # Format: 'Namespace\Controller::methode'
        _controller: 'MonModule\\Controller\\AdminController::configureAction'
        # Pour que PrestaShop reconnaisse notre contrôleur dans la navigation
        _legacy_controller: 'MonModuleAdmin'
        _legacy_link: 'MonModuleAdmin'
```

Le fichier de routes joue un rôle fondamental dans l'architecture Symfony :

**Nom de la route `mon_module_admin`** : Identifiant unique utilisé pour générer des URL dans l'application. Cet identifiant sera utilisé dans les appels à :
- `$this->redirectToRoute('mon_module_admin')`
- `$this->generateUrl('mon_module_admin')`

**Propriété `path`** : Définit le chemin d'URL qui activera cette route. Dans PrestaShop, ce chemin est relatif à la racine de l'administration.
- `path: /monmodule/admin` → Accessible via : `https://votre-boutique.com/admin-xxx/monmodule/admin`

**Propriété `methods`** : Spécifie les méthodes HTTP autorisées pour cette route.
- **GET** : Pour afficher le formulaire
- **POST** : Pour soumettre les données

**Propriété `_controller`** : Indique quelle méthode de quel contrôleur doit être appelée lorsque cette route est activée.
- `MonModule\Controller\AdminController::configureAction`
  - Namespace : `MonModule\Controller`
  - Classe : `AdminController`
  - Méthode : `configureAction`

**Propriétés `_legacy_controller` et `_legacy_link`** : Paramètres spécifiques à PrestaShop qui assurent l'intégration avec le système de navigation, de permissions et de sécurité du back-office.
- `_legacy_controller: 'MonModuleAdmin'`
- `_legacy_link: 'MonModuleAdmin'`
- ↪ Ces valeurs doivent correspondre à l'identifiant utilisé dans `getAdminLink()` :
  ```php
  $this->context->link->getAdminLink('MonModuleAdmin')
  ```

💡 **Note importante** : Le nom de la route doit être unique dans tout PrestaShop. Pour éviter les conflits, préfixez-le avec le nom de votre module. Si vous ajoutez plusieurs routes, continuez avec ce préfixe : `mon_module_admin_detail`, `mon_module_admin_delete`, etc.

## Le contrôleur : src/Controller/AdminController.php

**Rôle** : Le contrôleur est le chef d'orchestre qui :
- Initialise le formulaire avec les données existantes
- Traite les soumissions
- Sauvegarde les données
- Renvoie la vue appropriée

```php
<?php
namespace MonModule\Controller;

use Configuration;
use MonModule\Form\MessageConfigType;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminController extends FrameworkBundleAdminController
{
    /**
     * Gère l'affichage et le traitement du formulaire
     */
    public function configureAction(Request $request): Response
    {
        // 1. Création du formulaire avec les données existantes
        $form = $this->createForm(MessageConfigType::class, [
            'mon_message' => Configuration::get('MONMODULE_MESSAGE'),
        ]);

        // 2. Traitement de la soumission du formulaire
        $form->handleRequest($request);

        // 3. Si le formulaire est soumis et valide
        if ($form->isSubmitted() && $form->isValid()) {
            // Récupération des données
            $data = $form->getData();

            // Sauvegarde dans la configuration de PrestaShop
            Configuration::updateValue('MONMODULE_MESSAGE', $data['mon_message']);

            // Message de confirmation
            $this->addFlash('success', 'Message sauvegardé avec succès');

            // Redirection pour éviter les soumissions multiples
            return $this->redirectToRoute('mon_module_admin');
        }

        // 4. Affichage du formulaire (première visite ou après erreur)
        return $this->render('@Modules/monmodule/templates/admin/message_config.html.twig', [
            'messageForm' => $form->createView(),
            'enableSidebar' => true,
            'help_link' => false,
        ]);
    }
}
```

Le contrôleur est la pièce maîtresse de notre architecture Symfony. Analysons son fonctionnement en détail :

### Structure et héritage

**Namespace** : L'utilisation d'un namespace spécifique à notre module permet l'autoloading PSR-4.
```php
namespace MonModule\Controller;
```

**Héritage** : Notre contrôleur étend `FrameworkBundleAdminController`, qui fournit des méthodes adaptées à l'administration de PrestaShop.
```php
class AdminController extends FrameworkBundleAdminController
```

### Injection de dépendances

Symfony injecte automatiquement l'objet `Request` qui contient toutes les données de la requête HTTP.
```php
public function configureAction(Request $request): Response
```

### Cycle de vie du formulaire

**1. Création** : `$this->createForm()` instancie le formulaire en utilisant notre classe `MessageConfigType`.
```php
$form = $this->createForm(MessageConfigType::class, [
  'mon_message' => Configuration::get('MONMODULE_MESSAGE'),
]);
```
- Les données initiales sont fournies sous forme de tableau associatif
- Nous récupérons la valeur actuelle depuis la configuration de PrestaShop

**2. Traitement** : `$form->handleRequest($request)` analyse la requête HTTP.
```php
$form->handleRequest($request);
```
- Si la requête est de type POST, les données sont extraites et validées
- Les données sont mappées sur le formulaire selon les champs définis

**3. Validation et sauvegarde** : Uniquement si le formulaire est soumis et valide.
```php
if ($form->isSubmitted() && $form->isValid()) {
  $data = $form->getData();
  Configuration::updateValue('MONMODULE_MESSAGE', $data['mon_message']);
  $this->addFlash('success', 'Message sauvegardé avec succès');
  return $this->redirectToRoute('mon_module_admin');
}
```
- Les données validées sont récupérées via `$form->getData()`
- Nous utilisons la classe `Configuration` de PrestaShop pour sauvegarder
- Un message flash est ajouté pour informer l'utilisateur du succès de l'opération

**4. Redirection** : Nous redirigeons vers la même page pour éviter les soumissions multiples (pattern PRG - Post/Redirect/Get).

💡 Le pattern PRG (Post/Redirect/Get) évite les soumissions duplicées et le problème du "F5" après un formulaire

### Rendu du template

**Méthode render** : Génère le HTML final en utilisant le moteur de template Twig.
```php
return $this->render(
  '@Modules/monmodule/templates/admin/message_config.html.twig',
  [
    'messageForm' => $form->createView(),
    'enableSidebar' => true,
    'help_link' => false,
  ]
);
```

**Chemin du template** : `@Modules/monmodule/templates/admin/message_config.html.twig` utilise la convention de nommage de PrestaShop pour localiser le fichier dans notre module.
- Le préfixe `@Modules` est un alias Symfony qui pointe vers le dossier `modules/` de PrestaShop

**Variables transmises** :
1. `messageForm` : Vue du formulaire utilisable par Twig
2. `enableSidebar` : Paramètre PrestaShop pour activer la barre latérale du back-office
3. `help_link` : Lien d'aide optionnel (désactivé ici)

⚠️ **Bonnes pratiques** : Un contrôleur doit rester léger et déléguer la logique métier à des services dédiés. Pour un module plus complexe, créez des classes de service dans un dossier `src/Service` pour gérer la logique métier.

## La définition du formulaire : src/Form/MessageConfigType.php

**Rôle** : Ce fichier définit la structure du formulaire, ses champs, leurs types et contraintes.

```php
<?php
namespace MonModule\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class MessageConfigType extends AbstractType
{
    /**
     * Construit la structure du formulaire
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('mon_message', TextType::class, [
                'label' => 'Mon message',
                'help' => 'Saisissez le message que vous souhaitez enregistrer',
                'required' => true,
                'attr' => [
                    'placeholder' => 'Entrez votre message ici',
                ],
            ]);
        // Vous pouvez ajouter d'autres champs ici
    }
}
```

La classe `MessageConfigType` encapsule la définition complète de notre formulaire et représente l'un des grands atouts de Symfony :

### Principe et architecture

**Héritage** : Notre classe étend `AbstractType`, la classe de base pour tous les types de formulaire Symfony.
```php
class MessageConfigType extends AbstractType
```

**Responsabilité unique** : Elle ne s'occupe que de définir la structure du formulaire, sans logique de traitement.
- Séparation des préoccupations
- Réutilisabilité : Ce type de formulaire peut être utilisé dans différents contextes et contrôleurs.
- DRY (Don't Repeat Yourself)

### Définition des champs

La méthode `buildForm` utilise le `FormBuilderInterface` pour définir les champs du formulaire :

```php
public function buildForm(FormBuilderInterface $builder, array $options)
{
  $builder
    ->add('mon_message', TextType::class, [
      'label' => 'Mon message',
      'help' => 'Saisissez le message que vous souhaitez enregistrer',
      'required' => true,
      'attr' => [
        'placeholder' => 'Entrez votre message ici',
      ],
    ]);
  // Vous pouvez ajouter d'autres champs ici
}
```

### Types de champs

Symfony propose une vaste bibliothèque de types pour tous les besoins :
- TextType
- TextareaType
- ChoiceType
- CheckboxType
- EmailType
- DateType
- +30 autres

### Options de configuration

- **label** : Texte affiché à côté du champ
- **help** : Message d'aide explicatif
- **required** : Indique si le champ est obligatoire
- **attr** : Attributs HTML personnalisés

### Extension facile

Vous pouvez facilement ajouter d'autres champs en chaînant des appels à `add()` :
```php
$builder
  ->add('nom', TextType::class, [...])
  ->add('email', EmailType::class, [...])
  ->add('categorie', ChoiceType::class, [...]);
```

### Validation automatique

Symfony valide automatiquement les données soumises selon les contraintes définies.

**Méthodes de validation :**
- Utiliser des contraintes via l'option `constraints`
- Implémenter la méthode `configureOptions`
- Utiliser des annotations sur une classe de données associée

### Types de champs avancés

Pour des formulaires plus sophistiqués, vous pouvez utiliser :
- **CollectionType** : Pour des collections d'éléments (tableaux, relations one-to-many)
- **EntityType** : Pour sélectionner des entités de la base de données
- **FileType** : Pour l'upload de fichiers
- **CustomType** : Types personnalisés pour des composants réutilisables

💡 **Astuce** : Pour les formulaires complexes, utilisez l'imbrication de formulaires en créant des classes FormType dédiées pour chaque section et en les assemblant avec `FormType::class`.

## Le template : templates/admin/message_config.html.twig

**Rôle** : Ce fichier définit l'interface utilisateur de notre formulaire en utilisant le moteur de template Twig.

```twig
{% raw %}
{% extends '@PrestaShop/Admin/layout.html.twig' %}

{% block content %}
    <div class="row justify-content-center">
        <div class="col-xl-10">
            {# Carte contenant notre formulaire #}
            <div class="card">
                <h3 class="card-header">
                    <i class="material-icons">settings</i> Configuration du message
                </h3>

                <div class="card-body">
                    {# Ouverture du formulaire #}
                    {{ form_start(messageForm) }}

                        {# Nous pouvons afficher tous les champs automatiquement #}
                        {{ form_widget(messageForm) }}

                        {# Bouton de soumission #}
                        <div class="form-group row">
                            <div class="col-sm-10 offset-sm-2">
                                <button class="btn btn-primary" type="submit">
                                    <i class="material-icons">save</i>
                                    {{ 'Save'|trans({}, 'Admin.Actions') }}
                                </button>
                            </div>
                        </div>

                    {# Fermeture du formulaire #}
                    {{ form_end(messageForm) }}
                </div>
            </div>
        </div>
    </div>
{% endblock %}
{% endraw %}
```

Le template Twig représente la couche de présentation de notre module, séparant complètement l'interface utilisateur de la logique métier :

### Héritage et structure

- **Directive `extends`** : Étend le template de base du back-office PrestaShop, garantissant ainsi une intégration visuelle parfaite.
- **Bloc `content`** : Surcharge uniquement la zone de contenu principal, en préservant l'en-tête, la navigation et le pied de page du back-office.
- **Structure Bootstrap** : Utilise les classes CSS du framework Bootstrap intégré à PrestaShop (colonnes, cartes, boutons, etc.).

### Rendu du formulaire Symfony

Twig offre plusieurs fonctions pour le rendu des formulaires Symfony :

- **`form_start(messageForm)`** : Génère la balise d'ouverture `<form>` avec tous les attributs nécessaires (action, method, enctype, CSRF token, etc.).
- **`form_widget(messageForm)`** : Affiche automatiquement tous les champs du formulaire avec leurs labels, messages d'erreur et textes d'aide.
- **`form_end(messageForm)`** : Ferme la balise formulaire et ajoute les champs cachés éventuels (comme le token CSRF).

### Rendu personnalisé

Pour un contrôle plus fin sur l'affichage des champs, vous pouvez utiliser :

- **`form_row(messageForm.mon_message)`** : Un champ spécifique avec son label
- **`form_label(messageForm.mon_message)`** : Uniquement le label
- **`form_widget(messageForm.mon_message)`** : Uniquement le champ
- **`form_errors(messageForm.mon_message)`** : Uniquement les erreurs
- **`form_help(messageForm.mon_message)`** : Uniquement le texte d'aide

### Fonctionnalités Twig

Le template exploite plusieurs fonctionnalités puissantes de Twig :

- **Commentaires** : `{# ... #}` pour documenter le code
- **Structures de contrôle** : `{% if/for/block %}` pour la logique
- **Expressions** : `{{ ... }}` pour afficher des variables
- **Filtres** : `|trans` pour transformer des données
- **Fonctions** : `form_start()` pour des opérations complexes

💡 **Astuce pour les templates complexes** : Pour des interfaces plus élaborées, utilisez l'héritage de templates Twig avec `{% extends %}` et `{% block %}` pour créer des layouts réutilisables. Vous pouvez également inclure des fragments de template avec `{% include %}`.

## Comment tout s'articule

Comprendre le flux complet des données et des requêtes est essentiel pour maîtriser cette architecture moderne :

### 1. Initialisation du module

L'administrateur clique sur la configuration du module dans le menu PrestaShop, ce qui déclenche le processus suivant :

```
Module → getContent() → Tools::redirectAdmin() → Contrôleur Symfony
```

- L'administrateur clique sur "Configurer" dans la liste des modules
- La méthode `getContent()` du module est appelée
- Cette méthode utilise `Tools::redirectAdmin()` pour rediriger vers l'URL du contrôleur Symfony

💡 Cette redirection est la passerelle entre le système de hooks PrestaShop classique et le framework Symfony intégré.

Cette architecture MVC (Modèle-Vue-Contrôleur) stricte assure une séparation claire des responsabilités, facilitant la maintenance et l'évolution du code.

## Avantages de cette approche par rapport au legacy

- **Séparation des responsabilités** : Chaque fichier a un rôle spécifique et bien défini
- **Sécurité améliorée** : Symfony gère automatiquement les tokens CSRF et la validation
- **Maintenance facilitée** : Le code est plus structuré et suit les standards modernes
- **Extensibilité** : Facile d'ajouter de nouveaux champs ou fonctionnalités
- **Cohérence visuelle** : Intégration parfaite avec l'interface du back-office PrestaShop

Cette approche nécessite plus de fichiers qu'un module legacy, mais offre une structure plus claire et maintenable sur le long terme.

## Bonnes pratiques à adopter

- Organiser le code en fonction des responsabilités
- Séparer la logique métier de la présentation
- Utiliser des services pour gérer la logique métier
- Respecter les conventions Symfony et PSR-4
- Documenter le code pour faciliter la maintenance

Ces bonnes pratiques vous aideront à créer un code plus propre, plus maintenable et plus évolutif.

## Pour aller plus loin

Dans cette section, nous partagerons des astuces et bonnes pratiques supplémentaires issues de la communauté PrestaShop pour vous aider à perfectionner vos compétences en développement de formulaires Symfony.

### Conseils de la communauté

#### Gérer la configuration avec Configuration Storage Service

PrestaShop fournit un puissant service de stockage de configuration pour enregistrer et récupérer les valeurs de configuration :

```php
// Accéder au service (approche recommandée)
$configuration = $this->get('prestashop.adapter.legacy.configuration');

// Stocker une valeur de configuration
$configuration->set('MODULE_CUSTOM_SETTING', $value, ShopConstraint::allShops());

// Récupérer une valeur de configuration
$value = $configuration->get('MODULE_CUSTOM_SETTING', $defaultValue);

// Vérifier si une configuration existe
if ($configuration->has('MODULE_CUSTOM_SETTING')) {
    // Faire quelque chose
}

// Supprimer une configuration
$configuration->remove('MODULE_CUSTOM_SETTING');
```

Pour plus de détails, consultez la [documentation officielle](https://devdocs.prestashop-project.org/).

#### Utilisation correcte de l'annotation @AdminSecurity

Lors de l'utilisation de l'annotation @AdminSecurity avec is_granted(), évitez d'utiliser un tableau pour vérifier plusieurs droits. Utilisez plutôt des opérateurs logiques explicites :

```php
// Incorrect - Ne pas utiliser un tableau
/**
 * @AdminSecurity("is_granted(['read', 'update'], request.get('_legacy_controller'))")
 */
public function editAction()
{
    // ...
}

// Correct - Utiliser des opérateurs logiques explicites
/**
 * @AdminSecurity("is_granted('read', request.get('_legacy_controller')) && is_granted('update', request.get('_legacy_controller'))")
 */
public function editAction()
{
    // ...
}
```

Cette approche rend le code plus lisible et évite les problèmes potentiels avec la vérification des permissions.

### Bonnes pratiques pour les formulaires et traductions

Voici quelques conseils importants pour la gestion des formulaires et des traductions dans PrestaShop :

#### 1. Utilisation du filtre trans de Twig

```twig
{% raw %}
{# Incorrect - Texte en dur #}
Envoyer le formulaire

{# Correct - Utilisation du filtre trans #}
{{ 'Submit form'|trans }}

{# Avec des paramètres #}
{{ 'Hello %name%'|trans({'%name%': username}) }}
{% endraw %}
```

#### 2. Gestion des erreurs de formulaire

```php
// Dans votre contrôleur
if ($form->isSubmitted()) {
    if ($form->isValid()) {
        // Traitement du formulaire
        $this->addFlash('success', 'Form submitted successfully');
    } else {
        foreach ($form->getErrors(true) as $error) {
            $this->addFlash('error', $error->getMessage());
        }
    }
}
```

#### 3. Utilisation des contraintes dans les Form Types

```php
use Symfony\Component\Validator\Constraints as Assert;

class ProductType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', TextType::class, [
                'constraints' => [
                    new Assert\NotBlank([
                        'message' => 'Product name is required'
                    ]),
                    new Assert\Length([
                        'min' => 3,
                        'max' => 255,
                        'minMessage' => 'Product name must be at least {{ limit }} characters',
                        'maxMessage' => 'Product name cannot exceed {{ limit }} characters'
                    ])
                ]
            ]);
    }
}
```

Ces pratiques assurent une meilleure maintenabilité du code, une validation appropriée et un support de l'internationalisation.

### Ressources complémentaires

- [Documentation développeur officielle de PrestaShop](https://devdocs.prestashop-project.org/) - La documentation technique officielle pour les développeurs de modules PrestaShop.
- [Documentation Symfony sur les formulaires](https://symfony.com/doc/current/forms.html) - Guide complet sur la création et la gestion des formulaires dans Symfony.
- [Documentation Twig](https://twig.symfony.com/doc/) - Documentation officielle du moteur de template Twig utilisé dans PrestaShop.

## Conclusion

En suivant ce tutoriel, vous avez appris à créer un formulaire d'administration moderne avec Symfony et Twig dans un module PrestaShop. Vous avez également exploré les concepts fondamentaux de l'architecture Symfony et de la séparation des responsabilités. N'hésitez pas à consulter la section Pour aller plus loin pour découvrir des astuces de la communauté et des ressources complémentaires. N'oubliez pas également de consulter la documentation officielle de Symfony et de PrestaShop pour approfondir vos connaissances sur ces outils puissants.

---

*Article publié le 5 janvier 2026 par Nicolas Dabène*
