---
layout: post
title: 'Au-delà de l''injection : L''avènement du "Promptware" et des vers IA auto-réplicants'
date: 2026-03-19
ref: promptware-ai-self-replicating-worms
author: Nicolas Dabène
category: intelligence-artificielle
subcategory: cybersecurite
categories:
  - Intelligence Artificielle
  - Cybersécurité
tags:
  - IA
  - Cybersécurité
  - Promptware
  - Injection de prompt
  - Morris II
  - MCP
  - Zero Trust
  - LLM
  - Agents IA
excerpt: L'injection de prompt n'est que la partie émergée de l'iceberg. Découvrez le "Promptware", une nouvelle classe de malwares où le langage naturel devient vecteur d'attaque, et comment le ver Morris II démontre la propagation autonome entre agents IA.
image: /assets/images/blog/2026/03/au-dela-injection-avenement-promptware-vers-ia-auto-replicants/image-principale.webp
difficulty: Avancé
technologies:
  - LLM
  - MCP
  - RAG
  - Agents IA
estimated_reading_time: 18 minutes
lang: fr
published: true
---

En novembre 1988, Robert Tappan Morris, un étudiant de Cornell, libérait ce qui allait devenir le premier ver informatique à paralyser l'Internet naissant. En exploitant des vulnérabilités techniques dans les protocoles sendmail et finger, il parvint à mettre hors ligne 10 % des machines mondiales. Trente-six ans plus tard, le "fantôme" de Morris revient nous hanter sous une forme radicalement plus insidieuse : le ver Morris II.

L'ironie est mordante pour la communauté cyber. Alors que nous avons passé trois décennies à blinder le code binaire et à sécuriser les accès bas niveau, nous avons ouvert les portes de nos infrastructures à une technologie qui traite le langage naturel — notre propre langage — comme du code exécutable. En 2025, nos agents IA ne sont plus de simples chatbots ; ce sont des assistants dotés de permissions "Read/Write" sur nos emails, nos calendriers et nos bases de données. Cette intégration profonde transforme la productivité en une "responsabilité d'intégration croisée" (cross-boundary liability), ouvrant la voie à des attaques autonomes "zero-click" capables de se propager à la vitesse des appels API.

## Le concept de "Promptware" : L'injection de prompt n'est que le début

Le terme "injection de prompt" est aujourd'hui devenu dangereusement réducteur. Il suggère une faille isolée, un simple "bug" de filtrage. En réalité, nous faisons face à l'émergence du **Promptware** : une classe de malwares où le langage naturel devient le vecteur d'une "Kill Chain" complète.

Contrairement au SQL, où l'on peut isoler la commande de la donnée, les LLM souffrent d'un **paradoxe de tokenisation** : ils traitent l'entrée comme une séquence unique et indifférenciée de tokens. Il n'existe aucune frontière architecturale entre les instructions du système et les données de l'utilisateur. C'est ce qui provoque l'attaque du "Confused Deputy" (le député confus) : l'IA, abusée par un contenu malveillant, utilise ses privilèges légitimes pour accomplir des actions criminelles.

À ce sujet, le National Cyber Security Centre (NCSC) du Royaume-Uni a émis un avertissement qui fait désormais autorité :

> « L'injection de prompt s'annonce comme l'un des problèmes les plus tenaces de la sécurité de l'IA. Traiter cela comme une simple variante de l'injection SQL est une erreur grave ; ce problème pourrait bien ne jamais être totalement "corrigé". »

## La "Kill Chain" du Promptware : Les 7 étapes de la compromission

S'appuyant sur les travaux de Bruce Schneier et de son équipe, nous pouvons désormais modéliser l'attaque Promptware selon une structure en sept étapes, révélant une sophistication qui dépasse de loin le simple sabotage de chatbot.

### 1. Accès initial

Le payload entre via une injection directe ou, plus souvent, indirecte. L'IA analyse un email, un document ou une page web empoisonnée, et le contenu malveillant s'introduit dans son contexte d'exécution.

### 2. Escalade de privilèges (Jailbreaking)

L'attaquant utilise des techniques de "persona" ou des suffixes adverses pour contourner les filtres de sécurité et forcer le modèle à ignorer ses directives éthiques.

### 3. Reconnaissance

Contrairement au malware classique, cette étape intervient après le jailbreak. L'attaque manipule l'IA pour qu'elle liste ses propres capacités, ses services connectés (Slack, GitHub) et ses accès aux données sensibles.

### 4. Persistance

Le malware empoisonne la mémoire RAG (Retrieval-Augmented Generation) ou l'historique de l'agent pour garantir que le payload soit réexécuté à chaque nouvelle session.

### 5. Commande et contrôle (C2)

L'IA est instruite d'aller chercher de nouvelles directives sur un serveur distant (par exemple via un fichier texte sur GitHub), transformant l'agent en un Trojan dynamique.

### 6. Mouvement latéral

L'infection se propage. Par exemple, l'IA est forcée de renvoyer le payload malveillant à tous les contacts de la boîte mail ou de l'injecter dans un espace Notion partagé.

### 7. Actions sur l'objectif

La phase finale. Les exemples réels sont déjà là : un agent crypto AiXBT manipulé pour voler 105 000 $ (55 ETH), ou un chatbot de concessionnaire automobile forcé de vendre un SUV pour 1 $. Dans l'étude "Invitation Is All You Need", les chercheurs ont même réussi à forcer une IA à lancer Zoom pour espionner l'utilisateur.

## Le "Lethal Trifecta" : Pourquoi vos agents sont si vulnérables

L'expert Simon Willison a défini le "Lethal Trifecta" (le brelan mortel), trois conditions qui, lorsqu'elles sont réunies, rendent une application IA virtuellement indéfendable :

1. **Accès aux données sensibles** : L'IA peut lire des informations privées (PII, secrets industriels).
2. **Exposition à du contenu non fiable** : L'IA traite des données provenant de l'extérieur (emails, résultats de recherche Web).
3. **Capacité à communiquer vers l'extérieur** : L'IA peut envoyer des requêtes API, des emails ou poster sur des forums.

Dans ce contexte, le LLM devient un exécuteur aveugle. Comme il n'y a pas de distinction sémantique entre "résume cet email" et "exécute l'ordre contenu dans cet email", l'agent devient l'arme de sa propre destruction.

## Morris II : Le premier ver IA auto-réplicant en action

Le ver Morris II n'est plus une théorie. Les chercheurs ont démontré qu'un email empoisonné peut déclencher une propagation autonome entre différents assistants (ChatGPT, Gemini, LLaVA).

Le scénario est terrifiant de simplicité : l'utilisateur reçoit un email. Il n'a même pas besoin de l'ouvrir. L'assistant IA, en tâche de fond pour indexer ou résumer la boîte de réception, traite le message. Le prompt malveillant contenu dans l'email "jailbreake" l'assistant, lui ordonne d'extraire les derniers contacts et de leur envoyer une copie de ce même email. C'est le retour du ver de 1988, mais sans faille logicielle : c'est une **défaillance sémantique pure**.

## Le Protocole MCP : Un nouveau terrain de jeu pour les attaquants

L'arrivée du Model Context Protocol (MCP) d'Anthropic visait à standardiser la connexion entre IA et outils. Pourtant, il élargit la surface d'attaque. Des analyses récentes montrent que **43 % des serveurs MCP sont vulnérables** à des injections de commandes. Le risque est particulièrement élevé pour les outils comme mcp-remote (plus de 437 000 installations), où une mauvaise configuration permet une exécution de code arbitraire (RCE).

La sécurité ici ne dépend pas du protocole, mais de son implémentation. Pour les serveurs distants, l'utilisation de OAuth 2.1 avec PKCE (Proof Key for Code Exchange) est impérative, bien que trop souvent négligée. Comme le soulignent les chercheurs : « Le protocole MCP ne peut pas appliquer la sécurité au niveau du protocole. »

## Défense : Passer des signatures au comportement

La nature adaptative et polymorphe du Promptware rend les antivirus traditionnels obsolètes. Nous devons passer d'une défense par signatures à une IA comportementale.

| Caractéristique | Menaces traditionnelles | Variantes Promptware (IA) |
|---|---|---|
| **Évolution du payload** | Code fixe ; signatures connues. | Apprend et réécrit ses prompts en temps réel (polymorphisme sémantique). |
| **Vecteur de propagation** | Failles d'OS ou de protocoles. | Manipulation d'APIs et communication inter-agents. |
| **Surface de détection** | Motifs réseau, fichiers binaires. | Anomalies de consommation de tokens et appels API inhabituels. |
| **Vitesse de propagation** | Minutes ou heures. | Secondes via les flux automatisés (RPA/Agents). |

### Stratégies de prévention impératives

- **Hiérarchie d'instructions** : Utiliser des délimiteurs stricts et des structures de prompt isolant les données des commandes système.
- **Segmentation stricte** : Isoler les modèles traitant du contenu externe des bases de données critiques (mTLS obligatoire pour les communications serveur à serveur).
- **Human-in-the-loop** : Exiger une approbation manuelle pour toute action à haut risque (transfert de fonds, suppression de fichiers, envoi massif d'emails).

## Conclusion : Vers une autonomie sous haute surveillance

L'autonomie des agents IA est une lame à double tranchant. Plus nous leur donnons de "mains" pour agir sur le monde, plus nous offrons de leviers aux attaquants. Le risque de voir des infrastructures entières compromises par une simple phrase cachée dans une signature d'email est une réalité technique de 2025.

La productivité offerte par l'IA ne peut justifier une telle fragilité architecturale. La seule réponse viable est l'adoption d'un modèle **Zero Trust appliqué aux agents** : ne jamais faire confiance aux entrées, vérifier chaque appel d'outil et surveiller chaque token consommé. La question n'est plus de savoir si vos agents seront ciblés, mais s'ils sont assez isolés pour ne pas devenir le patient zéro d'une épidémie virale d'un nouveau genre.
