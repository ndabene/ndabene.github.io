---
layout: quiz
title: "PrestaShop 9 - Developpeur Certifie"
permalink: /quizz/prestashop-9-developpeur-certifie/
lang: fr
difficulty: "Debutant"
questions_count: 20
topics:
  - Symfony
  - CQRS
  - Hooks
  - Services
  - Forms
subtitle: "20 questions techniques sur l'architecture moderne de PrestaShop 9 : Symfony, CQRS, Hooks, Services et bonnes pratiques."
cta_label: "Commencer le quiz"
alt_lang_url: "/en/quiz/prestashop-9-certified-developer/"
quiz:
  i18n:
    logoTitle: "Dev Quiz"
    logoSubtitle: "PRESTASHOP 9 EDITION"
    title: "Testez vos connaissances"
    description: "20 questions techniques sur l'architecture moderne de PrestaShop (Symfony, CQRS, Hooks, Services). Etes-vous pret pour la certification ?"
    startButton: "Commencer le Quiz"
    nextQuestion: "Question suivante"
    seeResults: "Voir les resultats"
    explanation: "Explication"
    finalResult: "Resultat final"
    resultExpert: "Expert PrestaShop !"
    resultGood: "Bon niveau, continuez !"
    resultNeedWork: "Encore quelques revisions..."
    shareButton: "Defier mon reseau"
    restartButton: "Recommencer"
    footer: "Design System v1.0 - Nicolas Dabene"
    shareText: |
      Je viens de tester mes competences techniques sur PrestaShop 9 !
      Score : {score}/{total} ({percentage}%).

      Je te defie de faire mieux !
      {url}

      #PrestaShop #Developer #Symfony #TechSkills #Challenge
  questions:
    - id: 1
      question: "Dans un module moderne PrestaShop 9, quelle est la methode recommandee pour gerer les dependances PHP externes ?"
      options:
        - { id: "a", text: "Inclure les fichiers manuellement avec require_once", isCorrect: false }
        - { id: "b", text: "Utiliser Composer et le fichier composer.json a la racine du module", isCorrect: true }
        - { id: "c", text: "Copier les bibliotheques dans le dossier /lib du core", isCorrect: false }
        - { id: "d", text: "Utiliser le gestionnaire de paquets npm", isCorrect: false }
      explanation: "Composer est le standard pour gerer les dependances et l'autoloading PSR-4 dans les modules modernes."
    - id: 2
      question: "Quelle classe devez-vous etendre pour un controleur Back-Office moderne (Symfony) ?"
      options:
        - { id: "a", text: "ModuleAdminController", isCorrect: false }
        - { id: "b", text: "PrestaShopBundle\\Controller\\Admin\\FrameworkBundleAdminController", isCorrect: true }
        - { id: "c", text: "AdminController", isCorrect: false }
        - { id: "d", text: "Symfony\\Component\\HttpKernel\\Controller", isCorrect: false }
      explanation: "Cette classe de base donne l'injection de dependances, le routing et Twig du Back-Office moderne."
    - id: 3
      question: "Comment injecter un service personnalise dans votre module ?"
      options:
        - { id: "a", text: "Avec 'new' dans le constructeur", isCorrect: false }
        - { id: "b", text: "Via Context::getContext()", isCorrect: false }
        - { id: "c", text: "En le declarant dans config/services.yml", isCorrect: true }
        - { id: "d", text: "Dans la table ps_configuration", isCorrect: false }
      explanation: "Le fichier services.yml enregistre vos services dans le conteneur Symfony."
    - id: 4
      question: "Dans l'architecture CQRS, quel est le role d'une Command ?"
      options:
        - { id: "a", text: "Recuperer des donnees (lecture)", isCorrect: false }
        - { id: "b", text: "Representer une intention de modifier l'etat (ecriture)", isCorrect: true }
        - { id: "c", text: "Gerer l'affichage Twig", isCorrect: false }
        - { id: "d", text: "Executer la logique directement dans le controleur", isCorrect: false }
      explanation: "CQRS separe la lecture (Query) de l'ecriture (Command)."
    - id: 5
      question: "Pour modifier une Grid existante (ex: liste produits), quel hook utiliser ?"
      options:
        - { id: "a", text: "displayBackOfficeHeader", isCorrect: false }
        - { id: "b", text: "actionObjectUpdate", isCorrect: false }
        - { id: "c", text: "action{GridDefinition}Modifier", isCorrect: true }
        - { id: "d", text: "Il est impossible de modifier les grilles", isCorrect: false }
      explanation: "Ces hooks permettent de manipuler l'objet GridDefinition (colonnes, filtres)."
    - id: 6
      question: "Quelle interface un module doit-il implementer pour les widgets Front-Office (Hummingbird) ?"
      options:
        - { id: "a", text: "WidgetInterface", isCorrect: true }
        - { id: "b", text: "ModuleInterface", isCorrect: false }
        - { id: "c", text: "ControllerInterface", isCorrect: false }
        - { id: "d", text: "FrontControllerInterface", isCorrect: false }
      explanation: "WidgetInterface standardise le rendu des blocs de contenu en front."
    - id: 7
      question: "Methode recommandee pour l'acces BDD dans un service moderne ?"
      options:
        - { id: "a", text: "Db::getInstance()->executeS()", isCorrect: false }
        - { id: "b", text: "Injection de Doctrine\\DBAL\\Connection", isCorrect: true }
        - { id: "c", text: "mysql_query()", isCorrect: false }
        - { id: "d", text: "Via l'objet Smarty", isCorrect: false }
      explanation: "L'injection de la connexion DBAL est plus propre et testable que les appels statiques."
    - id: 8
      question: "Quel est le role d'un Data Provider dans les formulaires Symfony ?"
      options:
        - { id: "a", text: "Definir le HTML", isCorrect: false }
        - { id: "b", text: "Valider les donnees", isCorrect: false }
        - { id: "c", text: "Fournir les donnees initiales pour pre-remplir le formulaire", isCorrect: true }
        - { id: "d", text: "Sauvegarder en base", isCorrect: false }
      explanation: "Il injecte les donnees (ex: produit existant) avant l'affichage du formulaire."
    - id: 9
      question: "Comment traduire du texte dans un template Twig ?"
      options:
        - { id: "a", text: "{l s='Text'}", isCorrect: false }
        - { id: "b", text: "{{ 'Text'|trans({}, 'Domain') }}", isCorrect: true }
        - { id: "c", text: "Translate::get('Text')", isCorrect: false }
        - { id: "d", text: "$this->l('Text')", isCorrect: false }
      explanation: "Le filtre |trans est le standard Symfony/PrestaShop dans Twig."
    - id: 10
      question: "Ou placer le fichier routes.yml dans un module ?"
      options:
        - { id: "a", text: "A la racine", isCorrect: false }
        - { id: "b", text: "Dans /controllers", isCorrect: false }
        - { id: "c", text: "Dans /config", isCorrect: true }
        - { id: "d", text: "Dans /src", isCorrect: false }
      explanation: "PrestaShop charge automatiquement config/routes.yml."
    - id: 11
      question: "Avantage principal du Repository Pattern ?"
      options:
        - { id: "a", text: "Ecrire du SQL dans les controleurs", isCorrect: false }
        - { id: "b", text: "Centraliser et decoupler la logique d'acces aux donnees", isCorrect: true }
        - { id: "c", text: "Remplacer les hooks", isCorrect: false }
        - { id: "d", text: "Ameliorer la vitesse de chargement CSS", isCorrect: false }
      explanation: "Le repository isole la recuperation des donnees du reste de l'application."
    - id: 12
      question: "A quoi sert le fichier theme.yml ?"
      options:
        - { id: "a", text: "Traductions du theme", isCorrect: false }
        - { id: "b", text: "CSS global", isCorrect: false }
        - { id: "c", text: "Configuration (meta, layout, modules) du theme", isCorrect: true }
        - { id: "d", text: "Liste des produits accueil", isCorrect: false }
      explanation: "C'est la carte d'identite technique et structurelle du theme."
    - id: 13
      question: "Commande CLI pour vider le cache et regenerer le conteneur ?"
      options:
        - { id: "a", text: "php bin/console cache:clear", isCorrect: true }
        - { id: "b", text: "php bin/console module:install", isCorrect: false }
        - { id: "c", text: "rm -rf /var/cache", isCorrect: false }
        - { id: "d", text: "index.php?clear_cache=1", isCorrect: false }
      explanation: "Commande standard Symfony pour nettoyer l'application."
    - id: 14
      question: "Pourquoi utiliser des Value Objects (ex: CustomerId) dans une Command ?"
      options:
        - { id: "a", text: "Reduire la memoire", isCorrect: false }
        - { id: "b", text: "Garantir le typage fort et l'integrite des donnees", isCorrect: true }
        - { id: "c", text: "Compatibilite PHP 5", isCorrect: false }
        - { id: "d", text: "Affichage Smarty direct", isCorrect: false }
      explanation: "Cela assure la type safety et evite les donnees invalides."
    - id: 15
      question: "Ou declarer la compatibilite stricte PrestaShop 8+ ?"
      options:
        - { id: "a", text: "config.xml", isCorrect: false }
        - { id: "b", text: "Propriete $ps_versions_compliancy dans le constructeur", isCorrect: true }
        - { id: "c", text: "Dans install()", isCorrect: false }
        - { id: "d", text: "composer.json uniquement", isCorrect: false }
      explanation: "C'est la propriete standard du module pour definir le min/max version."
    - id: 16
      question: "Role de Webpack ou Laravel Mix ?"
      options:
        - { id: "a", text: "Compiler le PHP", isCorrect: false }
        - { id: "b", text: "Gerer la base de donnees", isCorrect: false }
        - { id: "c", text: "Compiler et minifier les assets (JS/SCSS)", isCorrect: true }
        - { id: "d", text: "Servir les pages HTML", isCorrect: false }
      explanation: "Outil indispensable pour le JS moderne et le SCSS."
    - id: 17
      question: "Difference entre Hook Display et Action ?"
      options:
        - { id: "a", text: "Aucune", isCorrect: false }
        - { id: "b", text: "Display = Affichage (HTML), Action = Logique/Evenement", isCorrect: true }
        - { id: "c", text: "Action est asynchrone", isCorrect: false }
        - { id: "d", text: "Display est deprecie", isCorrect: false }
      explanation: "L'un montre la vue, l'autre reagit a l'evenement."
    - id: 18
      question: "Comment securiser un controleur Admin Symfony ?"
      options:
        - { id: "a", text: "If/Else dans la methode", isCorrect: false }
        - { id: "b", text: "Fichier .htaccess", isCorrect: false }
        - { id: "c", text: "Annotation ou attribut de securite (@AdminSecurity)", isCorrect: true }
        - { id: "d", text: "Rien, c'est automatique", isCorrect: false }
      explanation: "Les attributs permettent de definir les permissions requises par route."
    - id: 19
      question: "Pourquoi Module::getInstanceByName() plutot que new MyModule() ?"
      options:
        - { id: "a", text: "Pour avoir l'instance initialisee et geree par le Core", isCorrect: true }
        - { id: "b", text: "Constructeur prive", isCorrect: false }
        - { id: "c", text: "Gain de performance enorme", isCorrect: false }
        - { id: "d", text: "Obligatoire en PHP 8", isCorrect: false }
      explanation: "Garantit que le module est correctement charge avec son contexte."
    - id: 20
      question: "Quel composant Symfony gere les evenements systeme (hors Hooks) ?"
      options:
        - { id: "a", text: "HookManager", isCorrect: false }
        - { id: "b", text: "EventDispatcher", isCorrect: true }
        - { id: "c", text: "SignalSlot", isCorrect: false }
        - { id: "d", text: "Observer", isCorrect: false }
      explanation: "EventDispatcher est le standard Symfony pour la communication evenementielle."
---

Le contenu principal du quiz est gere par le layout et le moteur JS. Aucune section additionnelle ici.
