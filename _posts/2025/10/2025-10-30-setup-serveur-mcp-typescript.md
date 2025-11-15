---
layout: post
title: 'Créer votre premier serveur MCP : Setup'
date: 2025-10-30
author: Nicolas Dabène
categories:
- Tutoriel
- Intelligence Artificielle
tags:
- IA
- développement
excerpt: Passons à la pratique ! Découvrez comment initialiser un projet TypeScript
  pour créer votre premier serveur MCP en quelques minutes.
image: /assets/images/blog/2025/10/2025-10-30-setup-serveur-mcp-typescript.jpg
featured: false
difficulty: Débutant
technologies:
- TypeScript
- Node.js
- Express
- MCP
estimated_reading_time: 8 minutes
howto:
  name: Créer son Premier Serveur MCP avec TypeScript
  description: Guide étape par étape pour initialiser un projet TypeScript et configurer
    les fondations d'un serveur MCP fonctionnel en quelques minutes
  total_time: PT30M
  estimated_cost:
    currency: EUR
    value: '0'
  tools:
  - Node.js 16+
  - npm (Node Package Manager)
  - Visual Studio Code ou éditeur de code
  - Terminal (Bash, Zsh, PowerShell)
  supplies:
  - Connexion internet pour télécharger les packages
  - Connaissances de base en JavaScript/TypeScript
  steps:
  - name: Création du dossier et initialisation du projet
    text: Créez un nouveau dossier pour votre projet avec `mkdir mcp-server` puis
      entrez dedans avec `cd mcp-server`. Initialisez un projet Node.js avec `npm
      init -y` pour créer automatiquement le fichier package.json avec les valeurs
      par défaut.
  - name: Installation de TypeScript
    text: Installez TypeScript et ses dépendances de développement avec `npm install
      typescript ts-node @types/node --save-dev`. Cette commande installe le compilateur
      TypeScript, l'exécuteur ts-node et les définitions de types pour Node.js.
  - name: Configuration de TypeScript
    text: 'Générez le fichier de configuration TypeScript avec `npx tsc --init`. Modifiez
      le fichier tsconfig.json généré pour définir target: ES2020, module: commonjs,
      outDir: ./dist, rootDir: ./src, et activez le mode strict pour une meilleure
      sécurité du code.'
  - name: Installation d'Express.js
    text: Installez Express et ses types TypeScript avec `npm install express` et
      `npm install @types/express --save-dev`. Express sera le framework web qui gérera
      les requêtes HTTP de votre serveur MCP.
  - name: Création de la structure du projet
    text: Créez le dossier source avec `mkdir src` puis créez le fichier principal
      `src/index.ts`. Cette structure sépare votre code source TypeScript (dans src/)
      du code compilé JavaScript (qui ira dans dist/).
  - name: Configuration des scripts npm
    text: 'Ajoutez les scripts de développement et build dans package.json : ''dev''
      pour lancer ts-node en mode watch, ''build'' pour compiler le TypeScript, et
      ''start'' pour exécuter le code compilé. Ces scripts facilitent le développement
      et le déploiement.'
  - name: Vérification de l'installation
    text: Créez un fichier de test simple dans src/index.ts avec un console.log('Hello
      MCP!'). Lancez `npm run dev` pour vérifier que tout fonctionne. Si vous voyez
      le message dans le terminal, votre environnement est correctement configuré.
faq:
- question: Pourquoi utiliser TypeScript plutôt que JavaScript pour un serveur MCP
    ?
  answer: TypeScript ajoute des types statiques qui évitent beaucoup d'erreurs stupides
    lors du développement. Pour un serveur qui va gérer des requêtes d'IA et manipuler
    des données sensibles, avoir ce niveau de vérification est rassurant. De plus,
    l'auto-complétion dans votre éditeur devient magique avec TypeScript, accélérant
    considérablement le développement.
- question: Quelle version de Node.js faut-il pour créer un serveur MCP ?
  answer: Il est recommandé d'utiliser Node.js version 16 ou supérieure. Vous pouvez
    vérifier votre version avec la commande `node --version` dans votre terminal.
    Si vous n'avez pas Node.js installé, téléchargez-le depuis le site officiel nodejs.org.
- question: Qu'est-ce que le flag --save-dev dans npm install ?
  answer: Le flag --save-dev indique que les packages installés sont des dépendances
    de développement, nécessaires uniquement pendant le développement, pas en production.
    Ces dépendances seront listées dans la section devDependencies du package.json.
    C'est le cas de TypeScript, ts-node et @types/node qui ne sont utilisés que pour
    compiler et développer le code.
- question: Pourquoi séparer les dossiers src et dist ?
  answer: 'Cette structure sépare votre code source TypeScript (dans src/) du code
    compilé JavaScript (dans dist/). C''est une bonne pratique qui garde votre projet
    organisé : vous développez dans src/, TypeScript compile vers dist/, et c''est
    le contenu de dist/ qui est exécuté en production. Cela évite de mélanger code
    source et code compilé.'
- question: Qu'est-ce que le protocole MCP?
  answer: MCP (Model Context Protocol) est un protocole open-source créé par Anthropic
    pour connecter des serveurs de données aux assistants IA comme Claude.
- question: MCP est-il compatible avec d'autres IA?
  answer: Actuellement, MCP est principalement conçu pour Claude, mais le protocole
    est open-source et d'autres IA pourront l'adopter.
sources:
- name: TypeScript Official Documentation
  url: https://www.typescriptlang.org/docs/
  organization: Microsoft
  type: Documentation
- name: Node.js Documentation
  url: https://nodejs.org/docs/
  organization: Node.js Foundation
  type: Documentation
- name: Express.js Guide
  url: https://expressjs.com/
  organization: Express
  type: Documentation
---

# Créer son Premier Serveur MCP : Setup du Projet TypeScript

Vous avez compris la théorie du Model Context Protocol dans notre article précédent ? Parfait ! Il est temps de mettre les mains dans le code. Nous allons construire ensemble les fondations d'un serveur MCP fonctionnel. Pas de panique, nous avançons étape par étape, comme si nous construisions une maison : d'abord les fondations, ensuite les murs, puis le toit.

## Introduction

Dans ma carrière de développeur, j'ai toujours été fasciné par ce moment magique où la théorie devient réalité. Vous vous souvenez de votre premier "Hello World" ? C'est exactement ce que nous allons vivre ensemble, mais version MCP. Dans cet article, nous allons préparer notre environnement de développement avec Node.js, TypeScript et Express.js. Rien de compliqué, juste les bons outils au bon endroit.

L'objectif est simple : à la fin de ce tutoriel, vous aurez un projet parfaitement configuré, prêt à accueillir la logique de votre serveur MCP. Pensez à cela comme la préparation de votre atelier avant de commencer un projet de bricolage : on range les outils, on vérifie qu'on a tout ce qu'il faut, et ensuite on peut créer sereinement.

## Pourquoi Ces Technologies ?

Avant de foncer tête baissée dans les commandes, prenons une minute pour comprendre nos choix technologiques. Vous n'êtes pas obligé d'utiliser exactement cette stack, mais voici pourquoi je la recommande pour débuter.

### Node.js : L'Environnement d'Exécution

Node.js permet d'exécuter du JavaScript côté serveur. C'est devenu un standard de l'industrie, avec une communauté massive et des milliers de packages disponibles. Pour notre serveur MCP, Node.js nous donne accès au système de fichiers, à la gestion réseau et à tout ce dont nous avons besoin pour créer un pont entre l'IA et vos données.

### TypeScript : La Sécurité du Typage

TypeScript, c'est comme JavaScript avec un filet de sécurité. Il ajoute des types statiques qui nous évitent beaucoup d'erreurs stupides. Quand vous construisez un serveur qui va gérer des requêtes d'IA et manipuler potentiellement des données sensibles, avoir ce niveau de vérification est rassurant. De plus, l'auto-complétion dans votre éditeur devient magique avec TypeScript.

### Express.js : Le Framework Web Minimaliste

Express est le couteau suisse du développement web en Node.js. Il nous permet de créer des routes, de gérer des requêtes HTTP et de structurer notre serveur proprement. C'est léger, rapide et parfaitement adapté pour notre serveur MCP qui recevra des commandes JSON.

## Prérequis Avant de Commencer

Assurez-vous d'avoir installé sur votre machine :

- **Node.js version 16 ou supérieure** : Vérifiez avec `node --version` dans votre terminal. Si vous n'avez pas Node.js, téléchargez-le depuis le site officiel nodejs.org
- **npm (Node Package Manager)** : Il vient automatiquement avec Node.js. Vérifiez avec `npm --version`
- **Un éditeur de code** : Visual Studio Code est excellent pour TypeScript, mais utilisez celui avec lequel vous êtes à l'aise
- **Un terminal** : Bash, Zsh, PowerShell... peu importe, du moment que vous pouvez lancer des commandes

Tout est prêt ? Parfait, ouvrons notre terminal !

## Étape 1 : Création du Dossier et Initialisation

Commençons par créer notre espace de travail. Ouvrez votre terminal et tapez ces commandes :

```bash
mkdir mcp-server
cd mcp-server
npm init -y
```

**Que vient-il de se passer ?**

La première ligne crée un nouveau dossier nommé `mcp-server`. C'est notre maison, notre projet. La deuxième ligne nous fait entrer dedans. La troisième ligne initialise un projet Node.js avec `npm init -y`.

Le flag `-y` signifie "yes to all" : il accepte automatiquement toutes les options par défaut. Sans ce flag, npm vous poserait une série de questions (nom du projet, version, description...). Pour l'instant, les valeurs par défaut sont parfaites.

Cette commande crée un fichier crucial : `package.json`. C'est la carte d'identité de votre projet. Il liste toutes les dépendances, les scripts disponibles et les métadonnées du projet. Si vous ouvrez ce fichier, vous verrez quelque chose comme ça :

```json
{
  "name": "mcp-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

C'est basique, mais ça va évoluer au fur et à mesure.

## Étape 2 : Installation de TypeScript

Maintenant, équipons notre projet avec TypeScript. Tapez cette commande :

```bash
npm install typescript ts-node @types/node --save-dev
```

**Décortiquons cette commande :**

Le `npm install` est assez explicite : on installe des packages. Le `--save-dev` indique que ces packages sont des dépendances de développement, nécessaires uniquement pendant le développement, pas en production.

Voici ce que fait chaque package :

- **typescript** : C'est le compilateur TypeScript lui-même. Il transforme votre code TypeScript en JavaScript que Node.js peut exécuter
- **ts-node** : Un outil magique qui permet d'exécuter directement du code TypeScript sans avoir à compiler manuellement. Pendant le développement, ça fait gagner un temps fou
- **@types/node** : Les définitions de types pour l'environnement Node.js. Grâce à ça, TypeScript comprend les fonctions natives de Node comme `fs.readFile`, `path.join`, etc.

Après l'installation, regardez votre `package.json`. Une nouvelle section est apparue :

```json
"devDependencies": {
  "@types/node": "^20.10.0",
  "ts-node": "^10.9.2",
  "typescript": "^5.3.3"
}
```

Les versions peuvent varier selon quand vous lisez cet article, mais le principe reste le même.

## Étape 3 : Configuration de TypeScript

TypeScript a besoin d'un fichier de configuration pour savoir comment compiler votre code. Générons-le :

```bash
npx tsc --init
```

**Petit point technique :** `npx` exécute un package sans l'installer globalement. Ici, il lance le compilateur TypeScript (`tsc`) avec l'option `--init` qui crée le fichier de configuration.

Cette commande génère un fichier `tsconfig.json` avec plein de commentaires expliquant chaque option. C'est verbeux, mais instructif ! Voici les options les plus importantes pour notre projet :

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**Quelques explications rapides :**

- **target** : La version JavaScript cible. ES2020 est moderne et bien supporté
- **module** : Le système de modules. CommonJS est le standard Node.js
- **outDir** : Où placer les fichiers JavaScript compilés (on créera ce dossier plus tard)
- **rootDir** : Où se trouve notre code source TypeScript
- **strict** : Active toutes les vérifications strictes de TypeScript. C'est un peu tatillon, mais ça évite des bugs

Pour l'instant, les valeurs par défaut générées conviennent parfaitement. Vous pourrez affiner plus tard selon vos besoins.

## Étape 4 : Installation d'Express.js

Dernière brique de notre fondation : Express.js, le framework qui gérera nos requêtes HTTP. Installez-le avec :

```bash
npm install express
npm install @types/express --save-dev
```

**Pourquoi deux commandes ?**

- **express** : C'est la bibliothèque elle-même, nécessaire en production. On ne met donc pas `--save-dev`
- **@types/express** : Les définitions de types pour Express, nécessaires uniquement pendant le développement. D'où le `--save-dev`

Votre `package.json` final devrait maintenant ressembler à ceci :

```json
{
  "name": "mcp-server",
  "version": "1.0.0",
  "description": "Serveur MCP pour connexion IA aux données locales",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["mcp", "ai", "server"],
  "author": "Votre Nom",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}
```

Les numéros de version peuvent légèrement varier, mais l'essentiel est là.

## Vérification de l'Installation

Avant d'aller plus loin, vérifions que tout fonctionne. Créons un dossier `src` et un fichier de test :

```bash
mkdir src
```

Créez un fichier `src/index.ts` avec ce contenu simple :

```typescript
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Serveur MCP opérationnel !' });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
```

**Que fait ce code ?**

On importe Express et on crée une application. On définit une route GET sur `/` qui renvoie un simple message JSON. On lance le serveur sur le port 3000.

Pour exécuter ce code, ajoutons un script dans notre `package.json`. Modifiez la section `scripts` :

```json
"scripts": {
  "dev": "ts-node src/index.ts",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

Maintenant, lancez :

```bash
npm run dev
```

Si tout est bien configuré, vous devriez voir dans votre terminal :

```
✅ Serveur lancé sur http://localhost:3000
```

Ouvrez votre navigateur et allez sur `http://localhost:3000`. Vous devriez voir :

```json
{
  "message": "Serveur MCP opérationnel !"
}
```

**Félicitations !** Votre environnement est parfaitement configuré.

## Organisation du Projet

Avant de terminer, organisons un peu notre projet. Voici la structure que je recommande :

```
mcp-server/
├── src/
│   ├── index.ts          # Point d'entrée du serveur
│   ├── routes/           # Routes Express (à créer plus tard)
│   ├── tools/            # Outils MCP (readFile, etc.)
│   └── types/            # Définitions TypeScript personnalisées
├── dist/                 # Code compilé (généré automatiquement)
├── node_modules/         # Dépendances (ignoré par Git)
├── package.json
├── tsconfig.json
└── .gitignore
```

Créez également un fichier `.gitignore` pour ne pas versionner les fichiers inutiles :

```
node_modules/
dist/
*.log
.env
.DS_Store
```

## Prochaines Étapes

Nous avons maintenant une base solide ! Voici ce qui nous attend dans les prochains articles de cette série :

- **Partie 3** : Créer notre premier outil MCP `readFile` qui permettra à l'IA de lire des fichiers locaux
- **Partie 4** : Implémenter le système de découverte des outils (le fameux "menu")
- **Partie 5** : Gérer les permissions et la sécurité
- **Partie 6** : Tester notre serveur avec Claude ou ChatGPT

## Conclusion

Nous venons de poser les fondations solides de notre serveur MCP. Certes, il ne fait pas grand-chose pour l'instant, mais tous les outils sont en place. C'est comme avoir préparé sa cuisine avant de commencer à cuisiner un repas complexe : tout est rangé, accessible, et on peut se concentrer sur l'essentiel.

Dans le prochain article, nous allons créer notre premier véritable outil MCP : la fonction `readFile` qui permettra à une IA de lire des fichiers sur votre machine. C'est là que la magie commence vraiment !

N'hésitez pas à expérimenter avec ce setup. Essayez d'ajouter d'autres routes Express, jouez avec TypeScript, familiarisez-vous avec l'environnement. Plus vous serez à l'aise avec ces bases, plus la suite sera naturelle.

---

**À lire aussi :**
- [Comprendre le Model Context Protocol (MCP) : Une Conversation Simple](/articles/2025/10/23/comprendre-mcp-conversation-simple)
- [Créer votre Premier Outil MCP : L'Outil readFile Expliqué](/articles/2025/11/12/creer-votre-premier-outil-mcp-l-outil-readfile-explique)
- [Le Menu MCP : Comment l'IA Découvre et Utilise vos Outils](/articles/2025/12/03/menu-mcp-comment-l-ia-decouvre-et-utilise-vos-outils)
- [Sécuriser votre Serveur MCP : Permissions, Validation et Protection](/articles/2025/12/10/securiser-serveur-mcp-permissions-validation-protection)
- [Connecter votre Serveur MCP à Claude Desktop : L'Intégration Complète](/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete)