---
layout: post
title: 'Comprendre le Model Context Protocol (MCP) : Une Conversation Simple'
date: 2025-10-23
ref: comprendre-mcp-conversation-simple-2025-10
author: Nicolas Dabène
category: automatisation
subcategory: mcp-protocol
categories:
- Intelligence Artificielle
- Tutoriel
tags:
- API
- ChatGPT
- IA
- développement
excerpt: Découvrez comment les IA peuvent accéder à vos fichiers et données grâce
  au MCP, expliqué à travers une conversation simple et pédagogique.
image: /assets/images/blog/2025/10/2025-10-23-comprendre-mcp-conversation-simple.webp
featured: true
difficulty: Débutant
technologies:
- MCP
- TypeScript
- IA
- JSON
estimated_reading_time: 10 minutes
faq:
- question: Le MCP remplace-t-il les API traditionnelles ?
  answer: Non, le MCP est une couche au-dessus des API existantes. Il standardise
    la façon dont les IA interagissent avec ces API, mais les API restent le moyen
    technique d'accès aux données.
- question: Puis-je créer un serveur MCP sans être expert en IA ?
  answer: Absolument ! Le MCP utilise des technologies web standard (TypeScript, JSON).
    Si vous savez créer une API REST basique, vous pouvez créer un serveur MCP.
- question: Mes données sont-elles envoyées à l'IA ?
  answer: Oui, mais seulement après votre autorisation explicite. Le serveur MCP lit
    vos données et les transmet à l'IA pour traitement. C'est pourquoi la question
    de la confiance envers le fournisseur d'IA reste importante.
- question: Qu'est-ce que le protocole MCP?
  answer: MCP (Model Context Protocol) est un protocole open-source créé par Anthropic
    pour connecter des serveurs de données aux assistants IA comme Claude.
- question: MCP est-il compatible avec d'autres IA?
  answer: Actuellement, MCP est principalement conçu pour Claude, mais le protocole
    est open-source et d'autres IA pourront l'adopter.
- question: Ai-je besoin de connaissances en programmation?
  answer: Oui, une connaissance de JavaScript/TypeScript est recommandée pour créer
    des serveurs MCP.
---


# Comprendre le Model Context Protocol (MCP) : Une Conversation Simple

Vous êtes-vous déjà demandé comment les intelligences artificielles comme ChatGPT ou Claude pourraient accéder à vos fichiers personnels, vos e-mails ou votre base de données ? La réponse tient en trois lettres : **MCP** (Model Context Protocol). Mais avant de plonger dans le code, prenons le temps de comprendre cette architecture révolutionnaire à travers une analogie simple et une conversation guidée.

## Introduction

Dans ma pratique de développement depuis plus de 15 ans, j'ai vu défiler de nombreux protocoles et architectures. Le MCP se distingue par son élégance : il transforme des IA isolées en véritables assistants capables d'interagir avec le monde réel. Imaginez pouvoir demander à Claude : "Résume-moi le rapport.pdf sur mon bureau" et voir l'IA accéder réellement à votre fichier, le lire et vous en faire un résumé. C'est exactement ce que permet le MCP.

Mais comment ça marche concrètement ? C'est ce que nous allons découvrir ensemble, non pas à travers des schémas techniques complexes, mais en suivant le cheminement naturel d'une question posée à une IA.

## Les Trois Acteurs du Théâtre MCP

Avant de comprendre le protocole, visualisons d'abord les personnages de cette pièce. L'écosystème MCP repose sur trois acteurs principaux, chacun ayant un rôle bien défini.

### 🤖 L'Application IA : Le Cerveau Isolé

Prenons Claude, ChatGPT ou n'importe quel grand modèle de langage. Ces IA sont incroyablement douées pour comprendre et générer du texte. Elles peuvent raisonner, créer, analyser... mais elles ont une limitation fondamentale : **elles sont complètement isolées du monde extérieur**.

C'est comme avoir un génie enfermé dans une lampe. Il peut répondre à vos questions avec une sagesse infinie, mais il ne peut pas ouvrir la porte de votre maison, ni lire ce qu'il y a sur votre bureau.

### 💻 Le Serveur MCP : Le Pont Intelligent

C'est précisément ce que nous allons construire ensemble. Le serveur MCP est le pont entre l'IA et le monde réel. Son travail consiste à :

- Exposer des capacités ("je peux lire des fichiers", "je peux envoyer des e-mails")
- Traduire ces capacités dans un langage que l'IA comprend
- Exécuter les demandes de l'IA de manière sécurisée

Imaginez un interprète qui non seulement traduit les langues, mais aussi les intentions en actions concrètes.

### 📄 La Ressource : La Destination Finale

C'est la source de données réelle ou l'outil auquel on veut accéder : un dossier sur votre ordinateur, une base de données PostgreSQL, l'API de Google Drive, votre boîte Gmail... Bref, tout ce qui contient de l'information ou permet d'effectuer des actions.

## Le Voyage d'une Question Simple

Maintenant que nous connaissons les acteurs, suivons ensemble le parcours d'une demande utilisateur. Imaginons que vous disiez à Claude :

> "Peux-tu me résumer le fichier rapport.pdf sur mon bureau ?"

### Étape 1 : La Découverte du Menu

Première question importante : **comment l'IA sait-elle qu'elle peut lire des fichiers ?**

C'est exactement comme entrer dans un restaurant. Avant de commander un plat spécifique, vous demandez la carte pour découvrir ce que l'établissement propose. L'IA fait la même chose avec notre serveur MCP.

Notre serveur présente donc un "menu" de ses capacités. Pour un serveur qui accède aux fichiers locaux, ce menu ressemblerait à ceci :

**Outil disponible : `readFile`**
- **Description** : "Lit le contenu d'un fichier texte"
- **Paramètre requis** : `chemin_du_fichier` (une chaîne de caractères)

**Outil disponible : `listFiles`**
- **Description** : "Liste les fichiers dans un dossier"
- **Paramètre requis** : `chemin_du_dossier` (une chaîne de caractères)

Vous voyez la logique ? Chaque outil est décrit clairement avec ses paramètres. L'IA peut ainsi "comprendre" ce qu'elle peut faire et comment le faire.

### Étape 2 : La Question de Sécurité

Maintenant que l'IA sait qu'elle peut utiliser `readFile`, pensez-vous qu'elle puisse directement accéder à n'importe quel fichier sur votre ordinateur ?

**Bien sûr que non !** Ce serait un cauchemar en termes de sécurité. C'est ici qu'intervient une étape cruciale : **la demande de permission**.

L'application IA (ChatGPT, Claude...) va vous demander directement :

> "Autorisez-vous ce serveur à lire le fichier rapport.pdf ?"

C'est vous, l'utilisateur humain, qui gardez le contrôle. Seulement après votre accord explicite, l'IA peut procéder. Cette étape de validation humaine est fondamentale dans la philosophie MCP.

### Étape 3 : La Commande Structurée

Une fois l'autorisation obtenue, l'IA va formuler sa demande au serveur. Mais attention, elle ne va pas écrire une phrase complète comme nous le ferions. Les ordinateurs préfèrent les structures claires et sans ambiguïté.

Voici comment l'IA structure sa commande au format JSON (un format standard pour échanger des données) :

```json
{
  "tool_name": "readFile",
  "parameters": {
    "chemin_du_fichier": "/Users/vous/Bureau/rapport.pdf"
  }
}
```

Décortiquons cette structure :
- **`tool_name`** : Le nom de l'outil à utiliser (ici `readFile`)
- **`parameters`** : Un objet contenant tous les paramètres nécessaires
  - **`chemin_du_fichier`** : Le chemin exact vers le fichier à lire

C'est simple, clair et sans ambiguïté. Le serveur sait exactement quoi faire.

### Étape 4 : L'Exécution et la Réponse

Notre serveur MCP reçoit cette commande structurée. Il va alors :

1. **Valider** la commande (est-ce que tous les paramètres requis sont présents ?)
2. **Exécuter** l'action (lire le fichier sur le disque dur)
3. **Renvoyer** le résultat à l'IA

La réponse pourrait ressembler à ceci :

```json
{
  "content": "Rapport Trimestriel Q4 2024\n\nChiffre d'affaires : 2,5M€\nCroissance : +15%\n...",
  "success": true
}
```

L'IA reçoit cette réponse et peut maintenant utiliser le contenu du fichier pour vous faire un résumé pertinent.

## Comprendre le Flux Complet par l'Exemple

Reprenons notre scénario depuis le début avec un schéma conversationnel simple :

**👤 Vous** : "Claude, résume-moi le fichier rapport.pdf sur mon bureau."

**🤖 Claude** : *"Je ne peux pas accéder directement aux fichiers, mais je vois qu'un serveur MCP 'filesystem' est disponible. Laissez-moi vérifier ses capacités..."*

**💻 Serveur MCP** : *"Voici mon menu : je peux `readFile` et `listFiles`."*

**🤖 Claude** : *"Parfait ! Je vais demander à lire le fichier."*

**🖥️ Application** : *"Utilisateur, autorisez-vous la lecture de /Users/vous/Bureau/rapport.pdf ?"*

**👤 Vous** : "Oui, autorisé."

**🤖 Claude** : *Envoie la commande structurée au serveur*

**💻 Serveur MCP** : *Lit le fichier et renvoie le contenu*

**🤖 Claude** : "Voici le résumé de votre rapport : Le chiffre d'affaires du Q4 2024 atteint 2,5M€ avec une croissance de 15%..."

## Les Principes Clés à Retenir

Avant de passer au code, consolidons notre compréhension avec les principes fondamentaux du MCP :

### 1. La Découverte Avant l'Action

L'IA ne peut pas deviner ce qu'un serveur sait faire. Elle commence toujours par demander le "menu" des capacités disponibles. C'est comme arriver dans une nouvelle ville : vous consultez d'abord un plan avant de vous déplacer.

### 2. La Sécurité par Design

Chaque action nécessite une validation humaine. Le MCP n'est pas une backdoor permettant aux IA de fouiller dans vos données. C'est un protocole où **vous restez maître** de ce qui est accessible.

### 3. La Communication Structurée

Les commandes et réponses suivent un format JSON standardisé. Cette rigueur évite les malentendus et permet à n'importe quelle IA compatible MCP de communiquer avec n'importe quel serveur MCP.

### 4. La Séparation des Responsabilités

Chaque acteur a un rôle clair :
- L'IA comprend le langage naturel et raisonne
- Le serveur MCP traduit et exécute
- La ressource stocke ou traite les données

## Pourquoi Cette Architecture Est Révolutionnaire

Le MCP représente une avancée majeure dans l'intégration des IA dans nos workflows quotidiens. Avant MCP, chaque IA devait développer ses propres intégrations spécifiques. Si vous vouliez que ChatGPT accède à votre Google Drive, OpenAI devait coder cette intégration. Si Claude voulait faire pareil, Anthropic devait recommencer le travail.

Avec MCP, **un seul serveur peut être utilisé par toutes les IA compatibles**. C'est comme le passage de prises électriques propriétaires à une prise standard universelle. Développez un serveur MCP pour Google Drive, et toutes les IA peuvent l'utiliser immédiatement.

Cette standardisation ouvre des possibilités infinies :
- Accès sécurisé aux données personnelles
- Intégration avec des outils d'entreprise
- Automatisation de tâches complexes
- Création d'assistants IA véritablement utiles au quotidien

## Conclusion

Nous avons fait un long chemin ensemble ! De la simple question "Comment une IA peut-elle lire mes fichiers ?" nous sommes arrivés à comprendre un protocole complet avec ses acteurs, ses flux et sa philosophie de sécurité.

Le plus beau dans tout ça ? Ce que nous venons d'apprendre n'était que la théorie. La vraie magie commence quand on passe au code et qu'on voit notre propre serveur MCP prendre vie, permettant à une IA de réellement interagir avec nos données.

Dans un prochain article, nous mettrons les mains dans le code : initialisation du projet TypeScript, création de notre premier outil `readFile`, gestion des permissions et tests avec Claude. Mais pour l'instant, vous avez acquis la compréhension conceptuelle essentielle. C'est la fondation solide sur laquelle nous construirons notre serveur MCP.

---

**À lire aussi :**
- [Créer son Premier Serveur MCP : Setup du Projet TypeScript](/articles/2025/10/30/setup-serveur-mcp-typescript)
- [Créer votre Premier Outil MCP : L'Outil readFile Expliqué](/articles/2025/11/12/creer-votre-premier-outil-mcp-l-outil-readfile-explique)
- [Le Menu MCP : Comment l'IA Découvre et Utilise vos Outils](/articles/2025/12/03/menu-mcp-comment-l-ia-decouvre-et-utilise-vos-outils)
- [Sécuriser votre Serveur MCP : Permissions, Validation et Protection](/articles/2025/12/10/securiser-serveur-mcp-permissions-validation-protection)
- [Connecter votre Serveur MCP à Claude Desktop : L'Intégration Complète](/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete)