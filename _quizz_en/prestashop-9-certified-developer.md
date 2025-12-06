---
layout: quiz
title: "PrestaShop 9 - Certified Developer"
permalink: /en/quiz/prestashop-9-certified-developer/
lang: en
difficulty: "Beginner"
questions_count: 20
topics:
  - Symfony
  - CQRS
  - Hooks
  - Services
  - Forms
subtitle: "20 technical questions on modern PrestaShop 9 architecture: Symfony, CQRS, Hooks, Services and best practices."
cta_label: "Start the quiz"
alt_lang_url: "/quizz/prestashop-9-developpeur-certifie/"
quiz:
  i18n:
    logoTitle: "Dev Quiz"
    logoSubtitle: "PRESTASHOP 9 EDITION"
    title: "Test your skills"
    description: "20 technical questions on modern PrestaShop architecture (Symfony, CQRS, Hooks, Services). Ready for certification?"
    startButton: "Start Quiz"
    nextQuestion: "Next question"
    seeResults: "See results"
    explanation: "Explanation"
    finalResult: "Final result"
    resultExpert: "PrestaShop Expert!"
    resultGood: "Solid level, keep going!"
    resultNeedWork: "Still some work to do..."
    shareButton: "Challenge my network"
    restartButton: "Restart"
    footer: "Design System v1.0 - Nicolas Dabene"
    shareText: |
      I just tested my technical skills on PrestaShop 9!
      Score: {score}/{total} ({percentage}%).

      Can you beat my score?
      {url}

      #PrestaShop #Developer #Symfony #TechSkills #Challenge
  questions:
    - id: 1
      question: "In a modern PrestaShop 9 module, what is the recommended way to handle external PHP dependencies?"
      options:
        - { id: "a", text: "Manually include files with require_once", isCorrect: false }
        - { id: "b", text: "Use Composer with composer.json at the module root", isCorrect: true }
        - { id: "c", text: "Copy libraries into /lib inside core", isCorrect: false }
        - { id: "d", text: "Use npm", isCorrect: false }
      explanation: "Composer is the standard for dependencies and PSR-4 autoloading in modern modules."
    - id: 2
      question: "Which class should you extend for a modern Back Office (Symfony) controller?"
      options:
        - { id: "a", text: "ModuleAdminController", isCorrect: false }
        - { id: "b", text: "PrestaShopBundle\\Controller\\Admin\\FrameworkBundleAdminController", isCorrect: true }
        - { id: "c", text: "AdminController", isCorrect: false }
        - { id: "d", text: "Symfony\\Component\\HttpKernel\\Controller", isCorrect: false }
      explanation: "This base class gives DI, routing, and Twig for the modern Back Office."
    - id: 3
      question: "How do you inject a custom service into your module?"
      options:
        - { id: "a", text: "Using 'new' in the constructor", isCorrect: false }
        - { id: "b", text: "Via Context::getContext()", isCorrect: false }
        - { id: "c", text: "Declare it in config/services.yml", isCorrect: true }
        - { id: "d", text: "In the ps_configuration table", isCorrect: false }
      explanation: "services.yml registers your services in the Symfony container."
    - id: 4
      question: "In CQRS, what is the role of a Command?"
      options:
        - { id: "a", text: "Fetch data (read)", isCorrect: false }
        - { id: "b", text: "Represent an intention to change state (write)", isCorrect: true }
        - { id: "c", text: "Manage Twig rendering", isCorrect: false }
        - { id: "d", text: "Execute logic directly inside the controller", isCorrect: false }
      explanation: "CQRS separates read (Query) from write (Command)."
    - id: 5
      question: "To modify an existing Grid (e.g., product list), which hook should you use?"
      options:
        - { id: "a", text: "displayBackOfficeHeader", isCorrect: false }
        - { id: "b", text: "actionObjectUpdate", isCorrect: false }
        - { id: "c", text: "action{GridDefinition}Modifier", isCorrect: true }
        - { id: "d", text: "It is impossible to modify grids", isCorrect: false }
      explanation: "These hooks let you manipulate the GridDefinition object (columns, filters)."
    - id: 6
      question: "Which interface must a module implement for Front Office widgets (Hummingbird)?"
      options:
        - { id: "a", text: "WidgetInterface", isCorrect: true }
        - { id: "b", text: "ModuleInterface", isCorrect: false }
        - { id: "c", text: "ControllerInterface", isCorrect: false }
        - { id: "d", text: "FrontControllerInterface", isCorrect: false }
      explanation: "WidgetInterface standardizes rendering of blocks in front."
    - id: 7
      question: "Recommended way to access the database in a modern service?"
      options:
        - { id: "a", text: "Db::getInstance()->executeS()", isCorrect: false }
        - { id: "b", text: "Inject Doctrine\\DBAL\\Connection", isCorrect: true }
        - { id: "c", text: "mysql_query()", isCorrect: false }
        - { id: "d", text: "Via the Smarty object", isCorrect: false }
      explanation: "Injecting DBAL is cleaner and more testable than static calls."
    - id: 8
      question: "What is the role of a Data Provider in Symfony forms?"
      options:
        - { id: "a", text: "Define the HTML", isCorrect: false }
        - { id: "b", text: "Validate data", isCorrect: false }
        - { id: "c", text: "Provide initial data to prefill the form", isCorrect: true }
        - { id: "d", text: "Persist to database", isCorrect: false }
      explanation: "It injects data (e.g., existing product) before form display."
    - id: 9
      question: "How do you translate text in a Twig template?"
      options:
        - { id: "a", text: "{l s='Text'}", isCorrect: false }
        - { id: "b", text: "{{ 'Text'|trans({}, 'Domain') }}", isCorrect: true }
        - { id: "c", text: "Translate::get('Text')", isCorrect: false }
        - { id: "d", text: "$this->l('Text')", isCorrect: false }
      explanation: "The |trans filter is the Symfony/PrestaShop standard in Twig."
    - id: 10
      question: "Where should routes.yml be placed in a module?"
      options:
        - { id: "a", text: "At the root", isCorrect: false }
        - { id: "b", text: "Inside /controllers", isCorrect: false }
        - { id: "c", text: "Inside /config", isCorrect: true }
        - { id: "d", text: "Inside /src", isCorrect: false }
      explanation: "PrestaShop auto-loads config/routes.yml."
    - id: 11
      question: "Main advantage of the Repository Pattern?"
      options:
        - { id: "a", text: "Write SQL in controllers", isCorrect: false }
        - { id: "b", text: "Centralize and decouple data access logic", isCorrect: true }
        - { id: "c", text: "Replace hooks", isCorrect: false }
        - { id: "d", text: "Speed up CSS loading", isCorrect: false }
      explanation: "It isolates data retrieval from the rest of the app."
    - id: 12
      question: "What is theme.yml used for?"
      options:
        - { id: "a", text: "Theme translations", isCorrect: false }
        - { id: "b", text: "Global CSS", isCorrect: false }
        - { id: "c", text: "Theme configuration (meta, layout, modules)", isCorrect: true }
        - { id: "d", text: "Homepage products list", isCorrect: false }
      explanation: "It is the technical and structural ID card of the theme."
    - id: 13
      question: "CLI command to clear cache and rebuild the container?"
      options:
        - { id: "a", text: "php bin/console cache:clear", isCorrect: true }
        - { id: "b", text: "php bin/console module:install", isCorrect: false }
        - { id: "c", text: "rm -rf /var/cache", isCorrect: false }
        - { id: "d", text: "index.php?clear_cache=1", isCorrect: false }
      explanation: "Standard Symfony command to clean the app."
    - id: 14
      question: "Why use Value Objects (e.g., CustomerId) inside a Command?"
      options:
        - { id: "a", text: "Reduce memory usage", isCorrect: false }
        - { id: "b", text: "Guarantee strong typing and data integrity", isCorrect: true }
        - { id: "c", text: "PHP 5 compatibility", isCorrect: false }
        - { id: "d", text: "Direct Smarty rendering", isCorrect: false }
      explanation: "It enforces type safety and prevents invalid data."
    - id: 15
      question: "Where to declare strict PrestaShop 8+ compatibility?"
      options:
        - { id: "a", text: "config.xml", isCorrect: false }
        - { id: "b", text: "Property $ps_versions_compliancy in the constructor", isCorrect: true }
        - { id: "c", text: "In install()", isCorrect: false }
        - { id: "d", text: "composer.json only", isCorrect: false }
      explanation: "This property defines min/max supported versions."
    - id: 16
      question: "Role of Webpack or Laravel Mix?"
      options:
        - { id: "a", text: "Compile PHP", isCorrect: false }
        - { id: "b", text: "Manage database", isCorrect: false }
        - { id: "c", text: "Compile and minify assets (JS/SCSS)", isCorrect: true }
        - { id: "d", text: "Serve HTML pages", isCorrect: false }
      explanation: "Essential for modern JS and SCSS."
    - id: 17
      question: "Difference between Display and Action hooks?"
      options:
        - { id: "a", text: "None", isCorrect: false }
        - { id: "b", text: "Display = Rendering (HTML), Action = Logic/Event", isCorrect: true }
        - { id: "c", text: "Action is asynchronous", isCorrect: false }
        - { id: "d", text: "Display is deprecated", isCorrect: false }
      explanation: "One shows (View), the other reacts (Logic)."
    - id: 18
      question: "How to secure a Symfony Admin controller?"
      options:
        - { id: "a", text: "If/Else in the method", isCorrect: false }
        - { id: "b", text: ".htaccess file", isCorrect: false }
        - { id: "c", text: "Security Annotation/Attribute (@AdminSecurity)", isCorrect: true }
        - { id: "d", text: "Nothing, it's automatic", isCorrect: false }
      explanation: "Attributes let you define required permissions per route."
    - id: 19
      question: "Why Module::getInstanceByName() instead of new MyModule()?"
      options:
        - { id: "a", text: "To have the instance initialized and managed by Core", isCorrect: true }
        - { id: "b", text: "Private constructor", isCorrect: false }
        - { id: "c", text: "Huge performance gain", isCorrect: false }
        - { id: "d", text: "Required in PHP 8", isCorrect: false }
      explanation: "Ensures the module is properly loaded with its context."
    - id: 20
      question: "Symfony component for system events (outside Hooks)?"
      options:
        - { id: "a", text: "HookManager", isCorrect: false }
        - { id: "b", text: "EventDispatcher", isCorrect: true }
        - { id: "c", text: "SignalSlot", isCorrect: false }
        - { id: "d", text: "Observer", isCorrect: false }
      explanation: "Symfony standard for internal event communication."
---

Quiz content is rendered by the layout and JS engine. No additional markdown content needed.
