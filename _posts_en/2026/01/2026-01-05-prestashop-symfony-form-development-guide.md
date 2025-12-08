---
layout: post
title: 'Tutorial: Creating a Symfony/Twig Form in a PrestaShop Module'
date: 2026-01-05
lang: en
ref: prestashop-symfony-form-guide
author: Nicolas Dabène
categories:
- PrestaShop
- Development
- Symfony
tags:
- prestashop
- symfony
- twig
- forms
- module
- back-office
- mvc
- psr-4
excerpt: 'This tutorial is designed for developers already familiar with creating classic PrestaShop modules (legacy) who want to transition to the modern approach using Symfony and Twig for administration forms.'
image: /assets/images/blog/2026/prestashop-symfony-form-guide.webp
keywords:
- PrestaShop Symfony
- Symfony Forms
- Modern PrestaShop Module
- Twig PrestaShop
- PrestaShop MVC Architecture
- PSR-4 PrestaShop
- PrestaShop Back-office
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

# Tutorial: Creating a Symfony/Twig Form in a PrestaShop Module

This tutorial is designed for developers already familiar with creating classic PrestaShop modules (legacy) who want to transition to the modern approach using Symfony and Twig for administration forms.

## The Evolution of PrestaShop Modules

Since version 1.7, PrestaShop has been progressively integrating the Symfony framework into its architecture. This transition represents a major shift in how modules are developed, particularly for administration interfaces.

### 👵 Classic Approach (Legacy)

- Architecture based on standard PHP classes and Smarty templates
- Use of `HelperForm` to generate forms
- Manual management of CSRF tokens and validation
- PrestaShop-specific implementation with less standardization

### 🚀 Modern Approach (Symfony)

- Clear separation between logic and presentation
- Robust form system with integrated validation
- Automatic CSRF protection and enhanced security
- Standardized and maintainable architecture

Although the legacy approach is still supported, the trend is clearly toward adopting Symfony standards for developing new modules or refactoring existing ones. PrestaShop has migrated the majority of its back-office to this architecture.

## What You Will Learn

In this tutorial, we'll create a complete administration form using Symfony components integrated into PrestaShop. Through a simple but concrete example, you'll discover:

**Architecture**: How to structure your module according to PSR-4 standards and Symfony conventions

**Forms**: Creating and managing forms with automatic validation and customization

**Templates**: Using the Twig template engine for clear and maintainable presentation

### 📝 Prerequisites

This tutorial assumes you already have basic knowledge of PrestaShop, PHP, and module creation. We'll focus on Symfony and Twig integration without revisiting the fundamental concepts of PrestaShop development.

By the end of this guide, you'll be able to create professional, secure, and maintainable administration interfaces for your PrestaShop modules, in line with modern web development best practices.

## Tutorial Scope

This tutorial aims to be comprehensive regarding form creation with Symfony in PrestaShop, but doesn't cover all advanced aspects of the Symfony ecosystem, such as:

- Doctrine ORM for data and entity management, which will be covered in a dedicated tutorial later
- Advanced security aspects and ACLs (Access Control Lists)

This guide primarily focuses on detailed explanation of the different elements of Symfony architecture in PrestaShop and how they articulate. The objective is to help you understand the underlying mechanisms and relationships between components, rather than offering an exhaustive practical tutorial. This understanding will provide you with a solid foundation to explore further and deepen your mastery of the Symfony ecosystem in PrestaShop.

## Required File Structure

Here's the file structure we'll set up for our modern form:

```
monmodule/
  ├── config/                    # Folder containing Symfony configurations
  │   └── routes.yml            # Admin route definitions
  │
  ├── src/                      # Source code following PSR-4
  │   ├── Controller/           # Symfony controllers
  │   │   └── AdminController.php # Controller managing our form
  │   └── Form/                 # Symfony form types
  │       └── MessageConfigType.php # Our form definition
  │
  ├── templates/                # Twig templates
  │   └── admin/                # Administration templates
  │       └── message_config.html.twig # Our form view
  │
  └── monmodule.php             # Main module file (unchanged in structure)
```

This structure represents a modern organization of a PrestaShop module fully leveraging the integrated Symfony framework:

### `config/` Folder

This folder contains all Symfony-specific configurations. In our case, we define routes that allow access to our administration interface. PrestaShop automatically loads files from this folder during initialization.

- **routes.yml**: Defines accessible URLs and associated controllers.

### `src/` Folder

This is the heart of our module, structured according to PSR-4 standards for class autoloading. This organization facilitates code maintenance and extension.

- **Controller/**: Contains Symfony controllers that handle HTTP requests, apply business logic, and return responses.
  - Example: `AdminController.php`

- **Form/**: Groups form definitions that handle validation and data processing.
  - Example: `MessageConfigType.php`

### `templates/` Folder

Stores all Twig templates for display. The separation between logic (PHP) and presentation (Twig) is a modern practice that improves maintainability.

- **admin/**: Back-office specific templates.
  - Example: `message_config.html.twig`

### `monmodule.php` File

Traditional entry point of the PrestaShop module, which now triggers Symfony framework loading and redirection to our modern controller.

This component-oriented architecture is much more modular than PrestaShop's classic approach, allowing you to develop, test, and maintain each part independently.

## The Main Module File

The main file remains similar to a classic module, but we add a redirect to our Symfony controller:

```php
public function getContent()
{
    // Instead of displaying the form directly,
    // we redirect to the Symfony controller
    Tools::redirectAdmin(
        $this->context->link->getAdminLink('MonModuleAdmin')
    );
}
```

This code plays a crucial gateway role between PrestaShop's Legacy ecosystem and the Symfony framework:

**`getContent()` Function**: Standard PrestaShop method called when the user accesses module configuration from the back-office.

**`redirectAdmin()` Method**: Redirects the user to a specific administration page, using PrestaShop's integrated security mechanisms.

**Call to `getAdminLink()`**: Generates the correct URL to our Symfony controller using the identifier `'MonModuleAdmin'` which will be defined in our routes file.

### Advantages of This Approach

- Compatibility with PrestaShop's back-office menu system
- Maintains PrestaShop's access controls and security
- Smooth transition to Symfony architecture without disruption

## The Symfony Router: config/routes.yml

**Role**: This file defines the URLs for accessing our Symfony controller. It creates a mapping between a URL and a controller method.

```yaml
# This file tells PrestaShop how to route HTTP requests to our controllers
mon_module_admin:
    # The relative URL from /admin-xxx/
    path: /monmodule/admin
    # Allowed HTTP methods (GET to display, POST to submit)
    methods: [GET, POST]
    # Route configuration
    defaults:
        # Format: 'Namespace\Controller::method'
        _controller: 'MonModule\\Controller\\AdminController::configureAction'
        # For PrestaShop to recognize our controller in navigation
        _legacy_controller: 'MonModuleAdmin'
        _legacy_link: 'MonModuleAdmin'
```

The routes file plays a fundamental role in Symfony architecture:

**Route name `mon_module_admin`**: Unique identifier used to generate URLs in the application. This identifier will be used in calls to:
- `$this->redirectToRoute('mon_module_admin')`
- `$this->generateUrl('mon_module_admin')`

**`path` Property**: Defines the URL path that will activate this route. In PrestaShop, this path is relative to the administration root.
- `path: /monmodule/admin` → Accessible via: `https://your-shop.com/admin-xxx/monmodule/admin`

**`methods` Property**: Specifies allowed HTTP methods for this route.
- **GET**: To display the form
- **POST**: To submit data

**`_controller` Property**: Indicates which method of which controller should be called when this route is activated.
- `MonModule\Controller\AdminController::configureAction`
  - Namespace: `MonModule\Controller`
  - Class: `AdminController`
  - Method: `configureAction`

**`_legacy_controller` and `_legacy_link` Properties**: PrestaShop-specific parameters that ensure integration with the back-office navigation, permissions, and security system.
- `_legacy_controller: 'MonModuleAdmin'`
- `_legacy_link: 'MonModuleAdmin'`
- ↪ These values must match the identifier used in `getAdminLink()`:
  ```php
  $this->context->link->getAdminLink('MonModuleAdmin')
  ```

💡 **Important note**: The route name must be unique throughout PrestaShop. To avoid conflicts, prefix it with your module name. If you add multiple routes, continue with this prefix: `mon_module_admin_detail`, `mon_module_admin_delete`, etc.

## The Controller: src/Controller/AdminController.php

**Role**: The controller is the orchestrator that:
- Initializes the form with existing data
- Processes submissions
- Saves data
- Returns the appropriate view

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
     * Handles form display and processing
     */
    public function configureAction(Request $request): Response
    {
        // 1. Create form with existing data
        $form = $this->createForm(MessageConfigType::class, [
            'mon_message' => Configuration::get('MONMODULE_MESSAGE'),
        ]);

        // 2. Process form submission
        $form->handleRequest($request);

        // 3. If form is submitted and valid
        if ($form->isSubmitted() && $form->isValid()) {
            // Retrieve data
            $data = $form->getData();

            // Save in PrestaShop configuration
            Configuration::updateValue('MONMODULE_MESSAGE', $data['mon_message']);

            // Confirmation message
            $this->addFlash('success', 'Message saved successfully');

            // Redirect to avoid multiple submissions
            return $this->redirectToRoute('mon_module_admin');
        }

        // 4. Display form (first visit or after error)
        return $this->render('@Modules/monmodule/templates/admin/message_config.html.twig', [
            'messageForm' => $form->createView(),
            'enableSidebar' => true,
            'help_link' => false,
        ]);
    }
}
```

The controller is the centerpiece of our Symfony architecture. Let's analyze its operation in detail:

### Structure and Inheritance

**Namespace**: Using a module-specific namespace enables PSR-4 autoloading.
```php
namespace MonModule\Controller;
```

**Inheritance**: Our controller extends `FrameworkBundleAdminController`, which provides methods adapted to PrestaShop administration.
```php
class AdminController extends FrameworkBundleAdminController
```

### Dependency Injection

Symfony automatically injects the `Request` object containing all HTTP request data.
```php
public function configureAction(Request $request): Response
```

### Form Lifecycle

**1. Creation**: `$this->createForm()` instantiates the form using our `MessageConfigType` class.
```php
$form = $this->createForm(MessageConfigType::class, [
  'mon_message' => Configuration::get('MONMODULE_MESSAGE'),
]);
```
- Initial data is provided as an associative array
- We retrieve the current value from PrestaShop configuration

**2. Processing**: `$form->handleRequest($request)` analyzes the HTTP request.
```php
$form->handleRequest($request);
```
- If the request is POST type, data is extracted and validated
- Data is mapped to the form according to defined fields

**3. Validation and Saving**: Only if the form is submitted and valid.
```php
if ($form->isSubmitted() && $form->isValid()) {
  $data = $form->getData();
  Configuration::updateValue('MONMODULE_MESSAGE', $data['mon_message']);
  $this->addFlash('success', 'Message saved successfully');
  return $this->redirectToRoute('mon_module_admin');
}
```
- Validated data is retrieved via `$form->getData()`
- We use PrestaShop's `Configuration` class to save
- A flash message is added to inform the user of successful operation

**4. Redirection**: We redirect to the same page to avoid multiple submissions (PRG pattern - Post/Redirect/Get).

💡 The PRG (Post/Redirect/Get) pattern prevents duplicate submissions and the "F5" problem after a form

### Template Rendering

**render Method**: Generates final HTML using the Twig template engine.
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

**Template Path**: `@Modules/monmodule/templates/admin/message_config.html.twig` uses PrestaShop's naming convention to locate the file in our module.
- The `@Modules` prefix is a Symfony alias pointing to PrestaShop's `modules/` folder

**Transmitted Variables**:
1. `messageForm`: Form view usable by Twig
2. `enableSidebar`: PrestaShop parameter to enable back-office sidebar
3. `help_link`: Optional help link (disabled here)

⚠️ **Best Practices**: A controller should remain lightweight and delegate business logic to dedicated services. For a more complex module, create service classes in a `src/Service` folder to manage business logic.

## The Form Definition: src/Form/MessageConfigType.php

**Role**: This file defines the form structure, its fields, their types and constraints.

```php
<?php
namespace MonModule\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class MessageConfigType extends AbstractType
{
    /**
     * Builds the form structure
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('mon_message', TextType::class, [
                'label' => 'My message',
                'help' => 'Enter the message you want to save',
                'required' => true,
                'attr' => [
                    'placeholder' => 'Enter your message here',
                ],
            ]);
        // You can add other fields here
    }
}
```

The `MessageConfigType` class encapsulates the complete definition of our form and represents one of Symfony's great strengths:

### Principle and Architecture

**Inheritance**: Our class extends `AbstractType`, the base class for all Symfony form types.
```php
class MessageConfigType extends AbstractType
```

**Single Responsibility**: It only deals with defining the form structure, without processing logic.
- Separation of concerns
- Reusability: This form type can be used in different contexts and controllers.
- DRY (Don't Repeat Yourself)

### Field Definition

The `buildForm` method uses the `FormBuilderInterface` to define form fields:

```php
public function buildForm(FormBuilderInterface $builder, array $options)
{
  $builder
    ->add('mon_message', TextType::class, [
      'label' => 'My message',
      'help' => 'Enter the message you want to save',
      'required' => true,
      'attr' => [
        'placeholder' => 'Enter your message here',
      ],
    ]);
  // You can add other fields here
}
```

### Field Types

Symfony offers a vast library of types for all needs:
- TextType
- TextareaType
- ChoiceType
- CheckboxType
- EmailType
- DateType
- +30 others

### Configuration Options

- **label**: Text displayed next to the field
- **help**: Explanatory help message
- **required**: Indicates if the field is mandatory
- **attr**: Custom HTML attributes

### Easy Extension

You can easily add other fields by chaining calls to `add()`:
```php
$builder
  ->add('name', TextType::class, [...])
  ->add('email', EmailType::class, [...])
  ->add('category', ChoiceType::class, [...]);
```

### Automatic Validation

Symfony automatically validates submitted data according to defined constraints.

**Validation methods:**
- Use constraints via the `constraints` option
- Implement the `configureOptions` method
- Use annotations on an associated data class

### Advanced Field Types

For more sophisticated forms, you can use:
- **CollectionType**: For element collections (arrays, one-to-many relationships)
- **EntityType**: To select database entities
- **FileType**: For file uploads
- **CustomType**: Custom types for reusable components

💡 **Tip**: For complex forms, use form nesting by creating dedicated FormType classes for each section and assembling them with `FormType::class`.

## The Template: templates/admin/message_config.html.twig

**Role**: This file defines the user interface of our form using the Twig template engine.

```twig
{% extends '@PrestaShop/Admin/layout.html.twig' %}

{% block content %}
    <div class="row justify-content-center">
        <div class="col-xl-10">
            {# Card containing our form #}
            <div class="card">
                <h3 class="card-header">
                    <i class="material-icons">settings</i> Message Configuration
                </h3>

                <div class="card-body">
                    {# Opening the form #}
                    {{ form_start(messageForm) }}

                        {# We can display all fields automatically #}
                        {{ form_widget(messageForm) }}

                        {# Submit button #}
                        <div class="form-group row">
                            <div class="col-sm-10 offset-sm-2">
                                <button class="btn btn-primary" type="submit">
                                    <i class="material-icons">save</i>
                                    {{ 'Save'|trans({}, 'Admin.Actions') }}
                                </button>
                            </div>
                        </div>

                    {# Closing the form #}
                    {{ form_end(messageForm) }}
                </div>
            </div>
        </div>
    </div>
{% endblock %}
```

The Twig template represents the presentation layer of our module, completely separating the user interface from business logic:

### Inheritance and Structure

- **`extends` Directive**: Extends the PrestaShop back-office base template, ensuring perfect visual integration.
- **`content` Block**: Overrides only the main content area, preserving the back-office header, navigation, and footer.
- **Bootstrap Structure**: Uses CSS classes from the Bootstrap framework integrated into PrestaShop (columns, cards, buttons, etc.).

### Symfony Form Rendering

Twig offers several functions for rendering Symfony forms:

- **`form_start(messageForm)`**: Generates the opening `<form>` tag with all necessary attributes (action, method, enctype, CSRF token, etc.).
- **`form_widget(messageForm)`**: Automatically displays all form fields with their labels, error messages, and help text.
- **`form_end(messageForm)`**: Closes the form tag and adds any hidden fields (like the CSRF token).

### Custom Rendering

For finer control over field display, you can use:

- **`form_row(messageForm.mon_message)`**: A specific field with its label
- **`form_label(messageForm.mon_message)`**: Only the label
- **`form_widget(messageForm.mon_message)`**: Only the field
- **`form_errors(messageForm.mon_message)`**: Only the errors
- **`form_help(messageForm.mon_message)`**: Only the help text

### Twig Features

The template leverages several powerful Twig features:

- **Comments**: `{# ... #}` to document code
- **Control structures**: `{% if/for/block %}` for logic
- **Expressions**: `{{ ... }}` to display variables
- **Filters**: `|trans` to transform data
- **Functions**: `form_start()` for complex operations

💡 **Tip for complex templates**: For more elaborate interfaces, use Twig template inheritance with `{% extends %}` and `{% block %}` to create reusable layouts. You can also include template fragments with `{% include %}`.

## How Everything Fits Together

Understanding the complete flow of data and requests is essential to master this modern architecture:

### 1. Module Initialization

The administrator clicks on module configuration in the PrestaShop menu, which triggers the following process:

```
Module → getContent() → Tools::redirectAdmin() → Symfony Controller
```

- The administrator clicks "Configure" in the modules list
- The module's `getContent()` method is called
- This method uses `Tools::redirectAdmin()` to redirect to the Symfony controller URL

💡 This redirection is the gateway between PrestaShop's classic hook system and the integrated Symfony framework.

This strict MVC (Model-View-Controller) architecture ensures a clear separation of responsibilities, facilitating code maintenance and evolution.

## Advantages of This Approach Over Legacy

- **Separation of responsibilities**: Each file has a specific and well-defined role
- **Enhanced security**: Symfony automatically handles CSRF tokens and validation
- **Easier maintenance**: Code is more structured and follows modern standards
- **Extensibility**: Easy to add new fields or features
- **Visual consistency**: Perfect integration with PrestaShop's back-office interface

This approach requires more files than a legacy module, but offers a clearer and more maintainable structure in the long term.

## Best Practices to Adopt

- Organize code according to responsibilities
- Separate business logic from presentation
- Use services to manage business logic
- Respect Symfony and PSR-4 conventions
- Document code to facilitate maintenance

These best practices will help you create cleaner, more maintainable, and more scalable code.

## Going Further

In this section, we'll share additional tips and best practices from the PrestaShop community to help you perfect your Symfony form development skills.

### Community Advice

#### Managing Configuration with Configuration Storage Service

PrestaShop provides a powerful configuration storage service for saving and retrieving configuration values:

```php
// Access the service (recommended approach)
$configuration = $this->get('prestashop.adapter.legacy.configuration');

// Store a configuration value
$configuration->set('MODULE_CUSTOM_SETTING', $value, ShopConstraint::allShops());

// Retrieve a configuration value
$value = $configuration->get('MODULE_CUSTOM_SETTING', $defaultValue);

// Check if a configuration exists
if ($configuration->has('MODULE_CUSTOM_SETTING')) {
    // Do something
}

// Delete a configuration
$configuration->remove('MODULE_CUSTOM_SETTING');
```

For more details, consult the [official documentation](https://devdocs.prestashop-project.org/).

#### Correct Use of @AdminSecurity Annotation

When using the @AdminSecurity annotation with is_granted(), avoid using an array to check multiple rights. Instead, use explicit logical operators:

```php
// Incorrect - Don't use an array
/**
 * @AdminSecurity("is_granted(['read', 'update'], request.get('_legacy_controller'))")
 */
public function editAction()
{
    // ...
}

// Correct - Use explicit logical operators
/**
 * @AdminSecurity("is_granted('read', request.get('_legacy_controller')) && is_granted('update', request.get('_legacy_controller'))")
 */
public function editAction()
{
    // ...
}
```

This approach makes the code more readable and avoids potential issues with permission checking.

### Best Practices for Forms and Translations

Here are some important tips for managing forms and translations in PrestaShop:

#### 1. Using Twig's trans Filter

```twig
{# Incorrect - Hardcoded text #}
Submit form

{# Correct - Using trans filter #}
{{ 'Submit form'|trans }}

{# With parameters #}
{{ 'Hello %name%'|trans({'%name%': username}) }}
```

#### 2. Form Error Handling

```php
// In your controller
if ($form->isSubmitted()) {
    if ($form->isValid()) {
        // Process form
        $this->addFlash('success', 'Form submitted successfully');
    } else {
        foreach ($form->getErrors(true) as $error) {
            $this->addFlash('error', $error->getMessage());
        }
    }
}
```

#### 3. Using Constraints in Form Types

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

These practices ensure better code maintainability, proper validation, and internationalization support.

### Additional Resources

- [Official PrestaShop developer documentation](https://devdocs.prestashop-project.org/) - The official technical documentation for PrestaShop module developers.
- [Symfony documentation on forms](https://symfony.com/doc/current/forms.html) - Complete guide on creating and managing forms in Symfony.
- [Twig documentation](https://twig.symfony.com/doc/) - Official documentation for the Twig template engine used in PrestaShop.

## Conclusion

By following this tutorial, you've learned to create a modern administration form with Symfony and Twig in a PrestaShop module. You've also explored fundamental concepts of Symfony architecture and separation of responsibilities. Don't hesitate to consult the Going Further section to discover community tips and additional resources. Also remember to consult the official Symfony and PrestaShop documentation to deepen your knowledge of these powerful tools.

---

*Article published on January 5, 2026 by Nicolas Dabène*
