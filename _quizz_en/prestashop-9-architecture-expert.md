---
layout: quiz
title: "PrestaShop 9 - Architecture & Core"
permalink: /en/quiz/prestashop-9-architecture-expert/
lang: en
difficulty: "Expert"
questions_count: 10
topics:
  - Service Decorator
  - CQRS
  - Doctrine
  - Tactician
  - Core
subtitle: "10 advanced questions on PrestaShop 9 internals: Service Decorators, Tactician, ModuleRepository, Doctrine and Core mechanisms."
cta_label: "Take the challenge"
alt_lang_url: "/quizz/prestashop-9-architecture-expert/"
quiz:
  i18n:
    logoTitle: "Expert Certification"
    logoSubtitle: "PRESTASHOP CORE ARCHITECTURE"
    title: "Architecture & Core"
    description: "This quiz explores advanced internal mechanisms of PrestaShop 9. Answers require precise knowledge of the technical docs."
    startButton: "Start challenge"
    nextQuestion: "Next question"
    seeResults: "See my score"
    explanation: "Technical detail"
    finalResult: "Expert result"
    resultExpert: "Architect level confirmed!"
    resultGood: "Solid, but a few details to review."
    resultNeedWork: "Modern architecture takes practice."
    shareButton: "Challenge the experts"
    restartButton: "Restart"
    footer: "Design System v1.0 - Nicolas Dabene"
    shareText: |
      EXPERT level unlocked!
      Score: {score}/{total} ({percentage}%).

      Tested on advanced architecture (Symfony, CQRS, Service Decorators, Doctrine).
      Your turn to aim for a perfect score!
      {url}
  questions:
    - id: 1
      question: "You need to change behavior of an existing Core service without overrides. Which Symfony technique should you use?"
      options:
        - { id: "a", text: "Service decoration", isCorrect: true }
        - { id: "b", text: "Inheritance via 'parent'", isCorrect: false }
        - { id: "c", text: "CompilerPass", isCorrect: false }
        - { id: "d", text: "Circular dependency", isCorrect: false }
      explanation: "Decoration (decorates option) wraps the original service and intercepts calls cleanly."
    - id: 2
      question: "In a CQRS Command Handler (write), which exception should you throw to show a user-friendly error without a 500?"
      options:
        - { id: "a", text: "Symfony\\Component\\HttpKernel\\Exception\\BadRequestHttpException", isCorrect: false }
        - { id: "b", text: "PrestaShop\\PrestaShop\\Core\\Domain\\Exception\\DomainException", isCorrect: true }
        - { id: "c", text: "\\Exception", isCorrect: false }
        - { id: "d", text: "PrestaShopException", isCorrect: false }
      explanation: "DomainException is caught and converted into readable flash errors."
    - id: 3
      question: "Which Form Type automatically generates fields for each active language?"
      options:
        - { id: "a", text: "PrestaShopBundle\\Form\\Admin\\Type\\TranslatableType", isCorrect: true }
        - { id: "b", text: "Symfony CollectionType", isCorrect: false }
        - { id: "c", text: "PrestaShopBundle\\Form\\Admin\\Type\\TranslateType", isCorrect: false }
        - { id: "d", text: "PrestaShopBundle\\Form\\Admin\\Type\\SwitchType", isCorrect: false }
      explanation: "TranslatableType duplicates the inner field for each shop language."
    - id: 4
      question: "Which hook lets you modify the underlying SQL QueryBuilder of an existing Grid?"
      options:
        - { id: "a", text: "action{GridId}GridDefinitionModifier", isCorrect: false }
        - { id: "b", text: "action{GridId}GridQueryBuilderModifier", isCorrect: true }
        - { id: "c", text: "action{GridId}GridDataModifier", isCorrect: false }
        - { id: "d", text: "display{GridId}Grid", isCorrect: false }
      explanation: "It gives direct access to the Doctrine QueryBuilder before execution."
    - id: 5
      question: "Key difference between ModuleRepository and ModuleManager?"
      options:
        - { id: "a", text: "Repository = Front Office, Manager = Back Office", isCorrect: false }
        - { id: "b", text: "Repository scans disk, Manager handles install/enable/upgrade", isCorrect: true }
        - { id: "c", text: "ModuleManager is a legacy alias", isCorrect: false }
        - { id: "d", text: "No difference", isCorrect: false }
      explanation: "Repository lists what's on disk; Manager drives lifecycle operations."
    - id: 6
      question: "How do you add a Middleware to the Command Bus (Tactician)?"
      options:
        - { id: "a", text: "Via actionCommandBusExecute hook", isCorrect: false }
        - { id: "b", text: "By overriding the CommandBus class", isCorrect: false }
        - { id: "c", text: "Tag a service with 'tactician.middleware'", isCorrect: true }
        - { id: "d", text: "By editing config/packages/tactician.yaml", isCorrect: false }
      explanation: "Tactician is extensible via Symfony service tags."
    - id: 7
      question: "What is the dynamic hook name fired after adding a Product object?"
      options:
        - { id: "a", text: "actionProductAdd", isCorrect: false }
        - { id: "b", text: "actionObjectProductAddAfter", isCorrect: true }
        - { id: "c", text: "hookAfterCreateProduct", isCorrect: false }
        - { id: "d", text: "actionObjectAddAfter", isCorrect: false }
      explanation: "Pattern: actionObject + {ClassName} + {Action} + {Moment}."
    - id: 8
      question: "What return type is required for an upgrade script function (upgrade-x.x.x.php)?"
      options:
        - { id: "a", text: "Boolean (true/false)", isCorrect: true }
        - { id: "b", text: "void", isCorrect: false }
        - { id: "c", text: "array", isCorrect: false }
        - { id: "d", text: "Module instance", isCorrect: false }
      explanation: "If it doesn't explicitly return true, the upgrade is considered failed."
    - id: 9
      question: "In composer.json, which 'type' installs the module into /modules?"
      options:
        - { id: "a", text: "prestashop-addon", isCorrect: false }
        - { id: "b", text: "library", isCorrect: false }
        - { id: "c", text: "prestashop-module", isCorrect: true }
        - { id: "d", text: "symfony-bundle", isCorrect: false }
      explanation: "Handled by PrestaShop's composer plugin to extract into /modules."
    - id: 10
      question: "In @AdminSecurity, which parameter defines the user-facing error message?"
      options:
        - { id: "a", text: "error", isCorrect: false }
        - { id: "b", text: "redirect", isCorrect: false }
        - { id: "c", text: "label", isCorrect: false }
        - { id: "d", text: "message", isCorrect: true }
      explanation: "Example: @AdminSecurity(\"is_granted('read')\", message=\"Access denied\")"
---

Quiz content is rendered by the layout and JS engine. No additional markdown content needed.
