---
layout: quiz
title: "PrestaShop 9 - Architecture & Core"
permalink: /quizz/prestashop-9-architecture-expert/
lang: fr
difficulty: "Expert"
questions_count: 10
topics:
  - Service Decorator
  - CQRS
  - Doctrine
  - Tactician
  - Core
subtitle: "10 questions avancees sur l'architecture interne de PrestaShop 9 : Service Decorators, Tactician, ModuleRepository, Doctrine et mecanismes Core."
cta_label: "Relever le defi"
alt_lang_url: "/en/quiz/prestashop-9-architecture-expert/"
quiz:
  i18n:
    logoTitle: "Certification Expert"
    logoSubtitle: "PRESTASHOP CORE ARCHITECTURE"
    title: "Architecture & Core"
    description: "Ce quiz explore les mecanismes internes avances de PrestaShop 9. Les reponses demandent une connaissance precise de la documentation technique."
    startButton: "Lancer le defi"
    nextQuestion: "Question suivante"
    seeResults: "Voir mon score"
    explanation: "Detail technique"
    finalResult: "Resultat Expert"
    resultExpert: "Niveau Architecte confirme !"
    resultGood: "Solide, mais des details a revoir."
    resultNeedWork: "L'architecture moderne demande de la pratique."
    shareButton: "Defier les experts"
    restartButton: "Recommencer"
    footer: "Design System v1.0 - Nicolas Dabene"
    shareText: |
      Niveau EXPERT PrestaShop atteint !
      Score : {score}/{total} ({percentage}%).

      Test sur l'architecture avancee (Symfony, CQRS, Services Decorators, Doctrine).
      A ton tour de faire un sans-faute !
      {url}
  questions:
    - id: 1
      question: "Vous devez modifier le comportement d'un service Core existant sans override. Quelle technique Symfony utiliser ?"
      options:
        - { id: "a", text: "Decoration de service", isCorrect: true }
        - { id: "b", text: "Heritage via 'parent'", isCorrect: false }
        - { id: "c", text: "CompilerPass", isCorrect: false }
        - { id: "d", text: "Dependance circulaire", isCorrect: false }
      explanation: "La decoration (option decorates) enveloppe le service original et intercepte proprement les appels."
    - id: 2
      question: "Dans un Handler de Command CQRS (ecriture), quelle exception lancer pour afficher un message d'erreur sans 500 ?"
      options:
        - { id: "a", text: "Symfony\\Component\\HttpKernel\\Exception\\BadRequestHttpException", isCorrect: false }
        - { id: "b", text: "PrestaShop\\PrestaShop\\Core\\Domain\\Exception\\DomainException", isCorrect: true }
        - { id: "c", text: "\\Exception", isCorrect: false }
        - { id: "d", text: "PrestaShopException", isCorrect: false }
      explanation: "Les DomainException sont interceptees et converties en messages lisibles dans l'interface."
    - id: 3
      question: "Quel Form Type genere automatiquement des champs pour chaque langue active ?"
      options:
        - { id: "a", text: "PrestaShopBundle\\Form\\Admin\\Type\\TranslatableType", isCorrect: true }
        - { id: "b", text: "Symfony CollectionType", isCorrect: false }
        - { id: "c", text: "PrestaShopBundle\\Form\\Admin\\Type\\TranslateType", isCorrect: false }
        - { id: "d", text: "PrestaShopBundle\\Form\\Admin\\Type\\SwitchType", isCorrect: false }
      explanation: "TranslatableType duplique le champ interne pour chaque langue de la boutique."
    - id: 4
      question: "Quel hook pour modifier la requete SQL (QueryBuilder) d'une Grid existante ?"
      options:
        - { id: "a", text: "action{GridId}GridDefinitionModifier", isCorrect: false }
        - { id: "b", text: "action{GridId}GridQueryBuilderModifier", isCorrect: true }
        - { id: "c", text: "action{GridId}GridDataModifier", isCorrect: false }
        - { id: "d", text: "display{GridId}Grid", isCorrect: false }
      explanation: "Ce hook donne acces direct a l'objet QueryBuilder avant execution."
    - id: 5
      question: "Difference fondamentale entre ModuleRepository et ModuleManager ?"
      options:
        - { id: "a", text: "Repository = Front, Manager = Back", isCorrect: false }
        - { id: "b", text: "Repository scanne le disque, Manager gere installation/activation", isCorrect: true }
        - { id: "c", text: "ModuleManager est un alias legacy", isCorrect: false }
        - { id: "d", text: "Aucune difference", isCorrect: false }
      explanation: "Repository lit le disponible, Manager pilote le cycle de vie (install, enable, upgrade)."
    - id: 6
      question: "Comment ajouter un Middleware au Command Bus (Tactician) ?"
      options:
        - { id: "a", text: "Via le hook actionCommandBusExecute", isCorrect: false }
        - { id: "b", text: "En surchargeant la classe CommandBus", isCorrect: false }
        - { id: "c", text: "En taguant un service avec 'tactician.middleware'", isCorrect: true }
        - { id: "d", text: "En modifiant config/packages/tactician.yaml", isCorrect: false }
      explanation: "Tactician est extensible via les tags de services Symfony."
    - id: 7
      question: "Quel est le nom du hook dynamique declenche apres l'ajout d'un objet Product ?"
      options:
        - { id: "a", text: "actionProductAdd", isCorrect: false }
        - { id: "b", text: "actionObjectProductAddAfter", isCorrect: true }
        - { id: "c", text: "hookAfterCreateProduct", isCorrect: false }
        - { id: "d", text: "actionObjectAddAfter", isCorrect: false }
      explanation: "Pattern : actionObject + {NomClasse} + {TypeAction} + {Moment}."
    - id: 8
      question: "Quel type de retour est requis pour la fonction principale d'un script d'upgrade (upgrade-x.x.x.php) ?"
      options:
        - { id: "a", text: "Booleen (true/false)", isCorrect: true }
        - { id: "b", text: "void", isCorrect: false }
        - { id: "c", text: "array", isCorrect: false }
        - { id: "d", text: "Module instance", isCorrect: false }
      explanation: "Sans true explicite, la mise a jour est consideree comme echouee."
    - id: 9
      question: "Dans composer.json, quel 'type' installe le module dans /modules ?"
      options:
        - { id: "a", text: "prestashop-addon", isCorrect: false }
        - { id: "b", text: "library", isCorrect: false }
        - { id: "c", text: "prestashop-module", isCorrect: true }
        - { id: "d", text: "symfony-bundle", isCorrect: false }
      explanation: "Le plugin composer de PrestaShop extrait ce type au bon endroit."
    - id: 10
      question: "Dans l'annotation @AdminSecurity, quel parametre definit le message d'erreur utilisateur ?"
      options:
        - { id: "a", text: "error", isCorrect: false }
        - { id: "b", text: "redirect", isCorrect: false }
        - { id: "c", text: "label", isCorrect: false }
        - { id: "d", text: "message", isCorrect: true }
      explanation: "Exemple : @AdminSecurity(\"is_granted('read')\", message=\"Acces interdit\")"
---

Le contenu principal du quiz est gere par le layout et le moteur JS. Aucune section additionnelle ici.
