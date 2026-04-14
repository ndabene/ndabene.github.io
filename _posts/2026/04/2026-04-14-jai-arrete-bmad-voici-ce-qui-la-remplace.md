---
layout: post
title: "J'ai arrêté BMAD. Voici ce qui l'a remplacé."
date: 2026-04-14
ref: "jai-arrete-bmad-voici-ce-qui-la-remplace"
author: "Nicolas Dabène"
category: "intelligence-artificielle"
subcategory: "developpement"
categories:
  - "Intelligence Artificielle"
  - "Développement"
tags:
  - "bmad"
  - "agentic-dev"
  - "orchestration-agents"
  - "methode-bmad"
  - "prestashop"
  - "ia"
excerpt: "J'utilisais BMAD avec succès. Puis sur un projet à 14 agents, la coordination manuelle est devenue un goulot d'étranglement. Voici comment l'orchestration agentique l'a remplacée."
image: "/assets/images/blog/2026/04/jai-arrete-bmad-voici-ce-qui-la-remplace/image-principale.webp"
featured: false
canonical_url: "https://nicolas-dabene.fr/articles/2026/04/14/jai-arrete-bmad-voici-ce-qui-la-remplace/"
difficulty: "Avancé"
technologies:
  - "PrestaShop"
  - "Claude Code"
  - "BMAD"
estimated_reading_time: "11 minutes"
llm_summary: "J'ai arrêté BMAD et l'ai remplacé par une orchestration multi-agents avec 14 agents spécialisés. Retour d'expérience : pourquoi la coordination manuelle devient un goulot d'étranglement, comment l'architecture résout ce problème, et le vrai changement de posture — d'architecte qui supervise à gouvernance qui décide."
llm_topics:
  - "BMAD method"
  - "Agentic orchestration"
  - "Multi-agent systems"
  - "PrestaShop development"
  - "AI development workflow"
  - "Claude Code workflow"
  - "Human routing bottleneck"
llm_key_quote: "BMAD : tu portes la complexité dans ta tête. Orchestration agentique : tu la transfères à l'architecture."
llm_target_queries:
  - "BMAD method vs agentic orchestration"
  - "multi-agent development workflow"
  - "when to switch from BMAD to orchestration"
  - "Claude Code multi-agent PrestaShop"
faq:
  - question: "Pourquoi avoir abandonné BMAD alors qu'il fonctionnait bien ?"
    answer: "BMAD fonctionne pour des projets de taille normale, mais sur un projet complexe avec 14 agents spécialisés en parallèle, la coordination manuelle devient un goulot d'étranglement. L'orchestration externalise cette complexité."
  - question: "L'orchestration agentique remplace-t-elle complètement BMAD ?"
    answer: "Non. BMAD apprend à penser avant de générer. L'orchestration exécute mieux ce qu'on a déjà appris à cadrer. Les deux restent complémentaires."
  - question: "Quel est le coût d'entrée de l'orchestration multi-agents ?"
    answer: "Plusieurs semaines de travail : construire l'architecture, définir les périmètres d'agents sans chevauchement, écrire les skills qui portent le contexte métier."
---

## Ce n'est pas un article anti-BMAD

Je veux être clair là-dessus avant même de commencer.

BMAD m'a rendu meilleur développeur IA. La méthode force une chose que la plupart des gens bâclent : penser avant de faire générer. Brief structuré, rôles définis, phases séquencées. Quand tu utilisais un seul agent qui essayait de tout faire d'un coup, BMAD t'apprenait à décomposer. C'est un vrai acquis.

Mais en mars 2026, sur un chantier PrestaShop qui impliquait 14 agents spécialisés en parallèle, j'ai réalisé que je portais encore BMAD comme cadre mental alors que mes besoins avaient changé. Je continuais à orchestrer à la main des choses que l'architecture pouvait — devait — gérer seule.

Voilà ce dont cet article parle. Pas d'un problème avec BMAD. D'une évolution au-delà.

---

## Ce que BMAD résout vraiment

Si tu ne connais pas BMAD, une définition courte : c'est une méthode de développement assisté par IA qui structure le travail en phases (Brief, Méthode, Agent, Delivery). L'idée centrale est que tu ne balances pas une demande vague à un LLM — tu construis une conversation structurée avec un rôle clair, des attentes précises, une sortie définie.

Ce que ça change en pratique :

- Tu arrêtes d'obtenir des réponses génériques parce que tu poses des questions génériques
- Tu penses en systèmes (rôles, responsabilités, outputs) plutôt qu'en prompts one-shot
- Tu construis une continuité entre les sessions plutôt que de recommencer à zéro

Sur des projets de taille normale — un module PrestaShop, un workflow n8n, un article de blog structuré — BMAD est efficace. La friction qu'il introduit (cadrage, brief, validation de phase) est productive. Elle t'empêche de partir dans la mauvaise direction pendant une heure.

J'ai travaillé comme ça pendant plusieurs mois. Mes livrables ont gagné en cohérence. Mes sessions avec Claude Code sont devenues plus prévisibles. Les BC breaks PS9 ne me prenaient plus par surprise parce que je les incluais dans le brief.

Donc BMAD fonctionne. La question n'est pas là.

---

## Le projet qui a changé la donne

Fin janvier, je travaillais sur une refonte complète du module `gmerchantcenter_pro` — Google Merchant Center PRO, version 2.0.0. Réécriture du système de taxonomies, des labels personnalisés, des règles d'exclusion, et en parallèle une mise à jour du système de tags et d'attributs produits.

Ce n'est pas un module simple. C'est une surface technique large : Admin API PrestaShop 9, CQRS, API Platform, Symfony 6, plus toute la logique métier spécifique à Google Merchant Center. Et dans ce chantier, j'avais besoin de plusieurs expertises en même temps : architecture, implémentation, sécurité, packaging Marketplace, tests, changelog.

Avec BMAD, j'orchestrais à la main. Je briefais un agent sur l'architecture. Je prenais sa sortie, je la passais à l'agent d'implémentation. Je revenais, je vérifiait la sécurité, je lançais le packaging. Séquentiel. Controlé. Moi au centre de chaque passage de relais.

Et c'est là que j'ai vu le problème.

Je n'étais plus un architecte qui supervise. J'étais devenu un routeur humain. Mon travail consistait à copier-coller des sorties d'un contexte à l'autre, reformuler ce que l'agent A avait produit pour que l'agent B le comprenne, maintenir la cohérence d'ensemble dans ma tête parce qu'aucun agent ne l'avait.

BMAD me donnait de la structure. Mais cette structure, c'est moi qui la portais. Entièrement.

---

## Ce qui se passe quand tu externalises l'orchestration

La question que je me suis posée : est-ce que cette coordination manuelle est irréductible, ou est-ce que c'est juste de la complexité accidentelle que j'ai acceptée par habitude ?

La réponse est devenue évidente quand j'ai commencé à décrire ce que je faisais à voix haute : je prenais une demande, j'analysais ses dépendances, je décideais qui pouvait travailler en parallèle et qui devait attendre, je routais, j'assemblais, je validais. C'est exactement ce qu'un orchestrateur fait.

Sauf que moi, je le faisais à la main, à chaque tâche, avec toute la charge cognitive que ça implique.

L'orchestration agentique, telle que je l'ai mise en place depuis, externalise ce travail. Un agent `master` reçoit la demande. Il analyse les dépendances réelles. Il lance les agents spécialisés — en parallèle quand c'est possible, en séquence quand les dépendances l'imposent. Il assemble. Il te rend une sortie cohérente.

Ce que ça change pour toi : tu décides ce qu'on fait, pas comment on le coordinate.

---

## Ce que l'architecture ressemble aujourd'hui

Je la décris en détail dans l'article du 31 mars, mais voici l'essentiel pour comprendre la différence avec BMAD.

**L'agent `master`** est le seul point d'entrée. Il ne touche pas au code. Il ne rédige pas. Son unique responsabilité : comprendre la demande, analyser les dépendances, router vers les bons spécialistes, synthétiser le résultat.

**14 agents PrestaShop spécialisés** — chacun avec un périmètre strict. `prestashop-architect` conçoit, `prestashop-module-dev` implémente, `prestashop-security` audite, `prestashop-phpstan` analyse statiquement, `prestashop-packaging` prépare la Marketplace. Ils ne se chevauchent pas. Ils ne font pas de compromis entre deux expertises.

**Les skills** — des fichiers Markdown qui portent les règles métier. Conventions PS9, BC breaks entre versions, patterns à éviter sur le multistore, checklist de validation Marketplace. Chaque agent charge ses skills avant d'agir. C'est ce qui remplace le "brief de contexte" que je réécrivais manuellement à chaque session BMAD.

La différence concrète : quand je demande de créer une page admin PrestaShop avec un listing produits filtrable, `master` analyse la demande et produit quelque chose comme ça —

Étape 1 (séquentielle) : `prestashop-architect` pose la structure — contrôleur Symfony, Grid, services, hooks.  
Étape 2 (parallèle) : `prestashop-module-dev` implémente, `prestashop-security` audite les permissions, `prestashop-testing` conçoit la stratégie de tests. Simultanément.  
Étape 3 : `qa-reviewer` valide avant livraison.

Avec BMAD, cette séquence, c'est moi qui la pilotais. Maintenant elle est dans l'architecture.

---

## Ce que BMAD fait que l'orchestration ne remplace pas

Je l'ai dit en ouverture, mais c'est important de le préciser ici.

BMAD t'apprend à penser. L'orchestration agentique exécute mieux ce que tu as déjà appris à penser.

Si tu n'as jamais structuré une demande IA, si tu arrives encore avec "fais-moi un module qui fait X" sans contexte ni contrainte ni définition de ce que "fini" veut dire — l'orchestration ne te sauvera pas. Tu auras juste 14 agents qui partiront dans des directions différentes très vite.

BMAD, ou n'importe quelle méthode qui te force à cadrer avant d'agir, reste une étape nécessaire. Pas parce que c'est la destination, mais parce que c'est ce qui construit les réflexes dont tu as besoin pour utiliser l'orchestration correctement.

La transition que j'ai faite n'aurait pas eu lieu si je n'avais pas passé des mois à travailler avec BMAD. Je ne l'aurais pas vu venir parce que je n'aurais pas su ce que je cherchais à améliorer.

---

## La vraie rupture : qui porte la complexité

Si je devais résumer la différence en une formulation, ce serait celle-là :

**BMAD :** tu portes la complexité de coordination dans ta tête, et tu utilises la méthode pour la structurer.  
**Orchestration agentique :** tu transfères cette complexité de coordination à l'architecture, et tu gardés ton énergie pour les décisions qui ne peuvent pas être automatisées.

Ce n'est pas la même chose.

Dans BMAD, même bien appliqué, tu restes le pivot. Tu es celui qui sait où en est le projet, qui sait quels agents ont produit quoi, qui maintient la cohérence globale. La méthode t'aide à le faire bien. Mais c'est toujours toi qui le fais.

Dans une architecture multi-agents orchestrée, la cohérence globale est dans le système. `master` sait ce qui a été fait, par qui, dans quel ordre. Les skills portent le contexte PrestaShop que tu réécrivais à la main. Le flux de dépendances est analysé, pas mémorisé.

Tu passes de gestionnaire de projet IA à architecte de systèmes IA. C'est un changement de posture, pas juste d'outillage.

---

## Est-ce que tu devrais faire la même transition ?

Probablement pas tout de suite.

L'orchestration multi-agents a un coût d'entrée réel. Construire l'architecture, définir les périmètres d'agents sans chevauchement, écrire les skills qui portent le bon contexte — c'est plusieurs semaines de travail avant d'en tirer de la valeur. Et si tu fais ça sans avoir intégré les réflexes de cadrage que BMAD enseigne, tu vas créer de la complexité sans structure, ce qui est pire que d'en n'avoir aucune.

La transition fait sens quand tu rencontres ce signal précis : tu passes plus de temps à coordonner entre agents qu'à produire ou décider. Quand tu te retrouves à être le routeur de ta propre stack IA.

Si ce n'est pas encore ton cas, reste sur BMAD ou la méthode qui te force à cadrer. Optimise l'exécution. Construis les réflexes.

Si c'est ton cas — si tu te reconnais dans le "routeur humain" que je décrivais — alors l'architecture mérite une vraie investigation.

---

## Ce qui vient après

Je ne pense pas que l'orchestration multi-agents soit la forme finale.

Ce que je vois se dessiner, c'est des agents qui gèrent eux-mêmes l'évolution de leurs skills. Qui détectent quand une convention PrestaShop a changé et qui mettent à jour leur base de règles. Qui savent, sans que tu leur dises, que le projet est passé de PS8 à PS9 et que certains patterns sont maintenant dépréciés.

On n'y est pas encore. Mais la direction est claire : moins de coordination humaine, plus de gouvernance humaine. Moins "je gère le flux", plus "je décide des règles du flux".

BMAD était une étape vers ça. L'orchestration agentique en est une autre. La prochaine, je ne sais pas encore exactement quelle forme elle prendra — mais je sais que ce sera toujours une question de savoir où placer l'intelligence : dans la tête du développeur, dans la méthode, ou dans l'architecture elle-même.

La réponse change à mesure que les outils changent. Ce qui ne change pas : la qualité des décisions qu'on prend sur ce placement.
