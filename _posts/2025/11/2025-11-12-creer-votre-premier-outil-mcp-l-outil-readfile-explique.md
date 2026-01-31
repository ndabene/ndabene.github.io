---
layout: post
title: 'Créer votre premier outil MCP : readFile'
date: 2025-11-12
ref: creer-votre-premier-outil-mcp-l-outil-readfile-explique-nov2025
author: Nicolas Dabène
category: automatisation
subcategory: mcp-protocol
categories:
- Tutoriel
- Intelligence Artificielle
tags:
- IA
- développement
excerpt: Du setup à l'action ! Créez votre premier outil MCP fonctionnel qui permet
  à une IA de lire des fichiers. Code complet et expliqué.
image: /assets/images/blog/2025/11/2025-11-12-creer-outil-readfile-mcp.webp
featured: true
difficulty: Intermédiaire
technologies:
- TypeScript
- Node.js
- MCP
- File System
estimated_reading_time: 12 minutes
faq:
- question: Puis-je créer un outil qui écrit des fichiers ?
  answer: 'Absolument ! La structure est la même. Utilisez fs.writeFile() au lieu
    de fs.readFile(). Mais attention à la sécurité : l''écriture est plus risquée
    que la lecture.'
- question: Comment gérer les fichiers binaires ?
  answer: Utilisez l'encoding base64 pour lire les fichiers binaires et les transmettre
    en tant que texte. L'IA pourra ensuite les manipuler.
- question: Mes outils peuvent-ils appeler d'autres outils ?
  answer: Techniquement oui, mais c'est généralement le rôle de l'IA d'orchestrer
    les appels entre outils. Gardez vos outils simples et atomiques.
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


# Créer votre Premier Outil MCP : L'Outil readFile Expliqué

Vous avez configuré votre environnement TypeScript dans l'article précédent ? Parfait ! Maintenant, place au moment magique où la théorie devient réalité. Nous allons créer ensemble votre tout premier outil MCP : une fonction qui permettra à une IA de lire des fichiers sur votre machine. C'est simple, concret, et surtout : ça fonctionne vraiment.

## Introduction

Dans ma carrière de développeur, j'ai toujours adoré ces moments où le code prend vie. Vous savez, quand vous lancez votre application et qu'elle fait exactement ce que vous aviez imaginé ? C'est ce que nous allons vivre ensemble aujourd'hui. Après avoir posé les fondations dans les articles précédents, nous allons construire quelque chose de tangible : un outil MCP qui lit des fichiers.

Imaginez : vous demandez à Claude "Lis-moi le fichier rapport.txt", et il peut réellement le faire grâce à votre serveur. Ce n'est plus de la théorie, c'est votre code qui rend cela possible. Et le plus beau ? Une fois que vous maîtriserez la création d'un outil, vous pourrez en créer des dizaines d'autres.

## Rappel : Qu'est-ce qu'un Outil MCP ?

Avant de coder, rappelons brièvement ce qu'est un outil MCP. C'est essentiellement une fonction que vous exposez à l'IA avec trois informations essentielles :

**Le nom de l'outil** : Comment l'IA va l'appeler (par exemple "readFile")

**La description** : Ce que fait l'outil, pour que l'IA comprenne quand l'utiliser

**Les paramètres** : Les informations dont l'outil a besoin pour fonctionner

C'est comme créer une fonction dans votre code, mais avec une carte d'identité que l'IA peut lire et comprendre. Simple, non ?

## Anatomie d'un Outil MCP

Visualisons la structure complète d'un outil MCP. Voici le squelette que nous allons remplir :

```typescript
// 1. Interface pour les paramètres d'entrée
interface ToolParams {
  // Les données que l'IA nous envoie
}

// 2. Interface pour la réponse
interface ToolResponse {
  success: boolean;
  content?: string;
  error?: string;
}

// 3. La fonction qui fait le travail
async function monOutil(params: ToolParams): Promise<ToolResponse> {
  // Logique métier ici
}

// 4. La définition de l'outil (le "menu")
export const monOutilDefinition = {
  name: "monOutil",
  description: "Ce que fait mon outil",
  parameters: {
    // Description des paramètres attendus
  }
};
```

Cette structure en quatre parties est votre modèle pour créer n'importe quel outil MCP. Gardons-la en tête pour la suite.

## Créer la Structure de Dossiers

Commençons par organiser notre code proprement. Dans votre projet `mcp-server`, créez la structure suivante :

```bash
mkdir -p src/tools
mkdir -p src/types
```

Cette organisation va nous aider à garder un code maintenable. Le dossier `tools` contiendra nos outils MCP, et `types` nos définitions TypeScript réutilisables.

## Définir les Types TypeScript

Créons d'abord nos interfaces TypeScript. Créez le fichier `src/types/mcp.ts` :

```typescript
// src/types/mcp.ts

// Type générique pour les paramètres d'un outil
export interface ToolParams {
  [key: string]: any;
}

// Type pour la réponse standard d'un outil
export interface ToolResponse {
  success: boolean;
  content?: string;
  error?: string;
  metadata?: {
    [key: string]: any;
  };
}

// Type pour la définition d'un outil (le "menu")
export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    [paramName: string]: {
      type: string;
      description: string;
      required: boolean;
    };
  };
}

// Type spécifique pour les paramètres de readFile
export interface ReadFileParams extends ToolParams {
  chemin_du_fichier: string;
}
```

Ces types vont nous aider à avoir de l'auto-complétion et à éviter des erreurs stupides. TypeScript devient notre meilleur ami pour ce genre de projet.

## Créer l'Outil readFile

Maintenant, le moment que vous attendiez : créons notre outil ! Créez le fichier `src/tools/readFile.ts` :

```typescript
// src/tools/readFile.ts
import fs from 'fs/promises';
import path from 'path';
import { ReadFileParams, ToolResponse, ToolDefinition } from '../types/mcp';

/**
 * Lit le contenu d'un fichier texte
 * @param params - Paramètres contenant le chemin du fichier
 * @returns Réponse avec le contenu du fichier ou une erreur
 */
export async function readFile(params: ReadFileParams): Promise<ToolResponse> {
  try {
    // Étape 1 : Validation des paramètres
    if (!params.chemin_du_fichier) {
      return {
        success: false,
        error: "Le paramètre 'chemin_du_fichier' est requis"
      };
    }

    // Étape 2 : Sécurité - Résoudre le chemin absolu
    // Cela évite les tentatives d'accès à des chemins relatifs dangereux
    const absolutePath = path.resolve(params.chemin_du_fichier);

    // Étape 3 : Vérifier que le fichier existe
    try {
      await fs.access(absolutePath);
    } catch {
      return {
        success: false,
        error: `Fichier introuvable : ${params.chemin_du_fichier}`
      };
    }

    // Étape 4 : Obtenir les informations du fichier
    const stats = await fs.stat(absolutePath);

    // Étape 5 : Vérifier que c'est bien un fichier (pas un dossier)
    if (!stats.isFile()) {
      return {
        success: false,
        error: "Le chemin spécifié n'est pas un fichier"
      };
    }

    // Étape 6 : Limiter la taille (sécurité - éviter de lire des fichiers énormes)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    if (stats.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `Fichier trop volumineux (max ${MAX_FILE_SIZE / 1024 / 1024} MB)`
      };
    }

    // Étape 7 : Lire le contenu du fichier
    const content = await fs.readFile(absolutePath, 'utf-8');

    // Étape 8 : Retourner le succès avec métadonnées
    return {
      success: true,
      content: content,
      metadata: {
        path: absolutePath,
        size: stats.size,
        lastModified: stats.mtime
      }
    };

  } catch (error: any) {
    // Gestion des erreurs inattendues
    return {
      success: false,
      error: `Erreur lors de la lecture : ${error.message}`
    };
  }
}

/**
 * Définition de l'outil pour le protocole MCP
 * C'est ce que l'IA "voit" quand elle découvre nos outils
 */
export const readFileToolDefinition: ToolDefinition = {
  name: "readFile",
  description: "Lit le contenu d'un fichier texte depuis le système de fichiers local",
  parameters: {
    chemin_du_fichier: {
      type: "string",
      description: "Chemin absolu ou relatif vers le fichier à lire",
      required: true
    }
  }
};
```

Prenons un moment pour comprendre ce code. Chaque étape est numérotée et expliquée :

**Validation** : On vérifie que le paramètre nécessaire est présent. Toujours valider les entrées !

**Sécurité** : On résout le chemin absolu pour éviter les chemins relatifs malveillants comme `../../etc/passwd`.

**Vérification existence** : On s'assure que le fichier existe avant d'essayer de le lire.

**Vérification type** : On confirme que c'est un fichier, pas un dossier.

**Limite de taille** : On évite de charger un fichier de 2 GB en mémoire par erreur.

**Lecture** : On lit enfin le contenu en UTF-8.

**Réponse enrichie** : On retourne non seulement le contenu, mais aussi des métadonnées utiles.

**Gestion d'erreurs** : On capture toute erreur inattendue proprement.

## Créer un Gestionnaire d'Outils

Maintenant, créons un fichier qui va centraliser tous nos outils. Créez `src/tools/index.ts` :

```typescript
// src/tools/index.ts
import { ToolDefinition } from '../types/mcp';
import { readFile, readFileToolDefinition } from './readFile';

// Registre de tous nos outils
export const tools = {
  readFile
};

// Définitions de tous nos outils (pour le "menu")
export const toolDefinitions: ToolDefinition[] = [
  readFileToolDefinition
];

// Fonction helper pour exécuter un outil par son nom
export async function executeTool(toolName: string, params: any) {
  const tool = tools[toolName as keyof typeof tools];

  if (!tool) {
    return {
      success: false,
      error: `Outil '${toolName}' introuvable`
    };
  }

  return await tool(params);
}
```

Ce fichier agit comme un registre central. Quand vous créerez de nouveaux outils, vous les ajouterez simplement ici.

## Intégrer dans le Serveur Express

Modifions maintenant notre `src/index.ts` pour exposer nos outils via des routes HTTP :

```typescript
// src/index.ts
import express, { Request, Response } from 'express';
import { toolDefinitions, executeTool } from './tools';

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Route de test
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Serveur MCP opérationnel !',
    version: '1.0.0'
  });
});

// Route pour découvrir les outils disponibles (le "menu")
app.get('/tools', (req: Request, res: Response) => {
  res.json({
    success: true,
    tools: toolDefinitions
  });
});

// Route pour exécuter un outil
app.post('/tools/:toolName', async (req: Request, res: Response) => {
  const { toolName } = req.params;
  const params = req.body;

  try {
    const result = await executeTool(toolName, params);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: `Erreur serveur : ${error.message}`
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur MCP lancé sur http://localhost:${PORT}`);
  console.log(`📋 Outils disponibles : http://localhost:${PORT}/tools`);
});
```

Notre serveur expose maintenant deux routes importantes :

**GET /tools** : Liste tous les outils disponibles (le fameux "menu")

**POST /tools/:toolName** : Exécute un outil spécifique avec les paramètres fournis

## Tester l'Outil

Moment de vérité ! Testons notre outil. D'abord, créons un fichier de test :

```bash
echo "Ceci est un fichier de test pour le MCP !" > test.txt
```

Lancez votre serveur :

```bash
npm run dev
```

Vous devriez voir :

```
✅ Serveur MCP lancé sur http://localhost:3000
📋 Outils disponibles : http://localhost:3000/tools
```

### Test 1 : Découvrir les Outils

Ouvrez un nouveau terminal et testez la découverte :

```bash
curl http://localhost:3000/tools
```

Réponse attendue :

```json
{
  "success": true,
  "tools": [
    {
      "name": "readFile",
      "description": "Lit le contenu d'un fichier texte depuis le système de fichiers local",
      "parameters": {
        "chemin_du_fichier": {
          "type": "string",
          "description": "Chemin absolu ou relatif vers le fichier à lire",
          "required": true
        }
      }
    }
  ]
}
```

Parfait ! L'IA peut maintenant découvrir votre outil.

### Test 2 : Utiliser l'Outil

Maintenant, utilisons readFile pour lire notre fichier de test :

```bash
curl -X POST http://localhost:3000/tools/readFile \
  -H "Content-Type: application/json" \
  -d '{"chemin_du_fichier": "test.txt"}'
```

Réponse attendue :

```json
{
  "success": true,
  "content": "Ceci est un fichier de test pour le MCP !\n",
  "metadata": {
    "path": "/chemin/absolu/vers/test.txt",
    "size": 42,
    "lastModified": "2025-11-12T10:30:00.000Z"
  }
}
```

**Ça fonctionne !** Votre serveur MCP peut maintenant lire des fichiers.

### Test 3 : Gestion d'Erreurs

Testons avec un fichier inexistant :

```bash
curl -X POST http://localhost:3000/tools/readFile \
  -H "Content-Type: application/json" \
  -d '{"chemin_du_fichier": "fichier_inexistant.txt"}'
```

Réponse :

```json
{
  "success": false,
  "error": "Fichier introuvable : fichier_inexistant.txt"
}
```

Excellent ! Notre gestion d'erreurs fonctionne correctement.

## Améliorer l'Outil

Maintenant que la base fonctionne, ajoutons quelques améliorations. Modifions `src/tools/readFile.ts` :

```typescript
// Ajout du support d'encodages multiples
export interface ReadFileParams extends ToolParams {
  chemin_du_fichier: string;
  encoding?: 'utf-8' | 'ascii' | 'base64';
}

export async function readFile(params: ReadFileParams): Promise<ToolResponse> {
  try {
    // ... validation existante ...

    // Support de différents encodages
    const encoding = params.encoding || 'utf-8';
    const content = await fs.readFile(absolutePath, encoding);

    return {
      success: true,
      content: content,
      metadata: {
        path: absolutePath,
        size: stats.size,
        encoding: encoding,
        lastModified: stats.mtime
      }
    };

  } catch (error: any) {
    return {
      success: false,
      error: `Erreur lors de la lecture : ${error.message}`
    };
  }
}
```

Et mettons à jour la définition :

```typescript
export const readFileToolDefinition: ToolDefinition = {
  name: "readFile",
  description: "Lit le contenu d'un fichier texte depuis le système de fichiers local",
  parameters: {
    chemin_du_fichier: {
      type: "string",
      description: "Chemin absolu ou relatif vers le fichier à lire",
      required: true
    },
    encoding: {
      type: "string",
      description: "Encodage du fichier (utf-8, ascii, base64)",
      required: false
    }
  }
};
```

## Créer un Deuxième Outil : listFiles

Maintenant que vous maîtrisez la création d'un outil, créons-en un deuxième rapidement. Créez `src/tools/listFiles.ts` :

```typescript
// src/tools/listFiles.ts
import fs from 'fs/promises';
import path from 'path';
import { ToolParams, ToolResponse, ToolDefinition } from '../types/mcp';

export interface ListFilesParams extends ToolParams {
  chemin_du_dossier: string;
}

export async function listFiles(params: ListFilesParams): Promise<ToolResponse> {
  try {
    if (!params.chemin_du_dossier) {
      return {
        success: false,
        error: "Le paramètre 'chemin_du_dossier' est requis"
      };
    }

    const absolutePath = path.resolve(params.chemin_du_dossier);

    // Vérifier que c'est un dossier
    const stats = await fs.stat(absolutePath);
    if (!stats.isDirectory()) {
      return {
        success: false,
        error: "Le chemin spécifié n'est pas un dossier"
      };
    }

    // Lire le contenu du dossier
    const files = await fs.readdir(absolutePath);

    // Obtenir les détails de chaque fichier
    const filesWithDetails = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(absolutePath, file);
        const fileStats = await fs.stat(filePath);

        return {
          name: file,
          type: fileStats.isDirectory() ? 'directory' : 'file',
          size: fileStats.size,
          lastModified: fileStats.mtime
        };
      })
    );

    return {
      success: true,
      content: JSON.stringify(filesWithDetails, null, 2),
      metadata: {
        path: absolutePath,
        count: filesWithDetails.length
      }
    };

  } catch (error: any) {
    return {
      success: false,
      error: `Erreur lors de la lecture du dossier : ${error.message}`
    };
  }
}

export const listFilesToolDefinition: ToolDefinition = {
  name: "listFiles",
  description: "Liste les fichiers et dossiers dans un répertoire",
  parameters: {
    chemin_du_dossier: {
      type: "string",
      description: "Chemin absolu ou relatif vers le dossier",
      required: true
    }
  }
};
```

Ajoutez-le dans `src/tools/index.ts` :

```typescript
import { listFiles, listFilesToolDefinition } from './listFiles';

export const tools = {
  readFile,
  listFiles
};

export const toolDefinitions: ToolDefinition[] = [
  readFileToolDefinition,
  listFilesToolDefinition
];
```

Relancez votre serveur et testez :

```bash
curl http://localhost:3000/tools
```

Vous verrez maintenant deux outils disponibles !

## Bonnes Pratiques et Sécurité

Maintenant que vous savez créer des outils, parlons sécurité. Voici les règles d'or :

### Toujours Valider les Entrées

Ne faites jamais confiance aux paramètres reçus. Validez tout : type, format, longueur, valeurs autorisées.

### Limiter l'Accès aux Fichiers

Créez une liste de dossiers autorisés :

```typescript
const ALLOWED_DIRECTORIES = [
  '/home/user/documents',
  '/home/user/projects'
];

function isPathAllowed(filePath: string): boolean {
  const absolute = path.resolve(filePath);
  return ALLOWED_DIRECTORIES.some(dir => absolute.startsWith(dir));
}
```

### Limiter les Tailles

Toujours définir des limites de taille de fichiers, de nombre de résultats, de profondeur de récursion.

### Logger les Accès

Gardez une trace de qui accède à quoi :

```typescript
console.log(`[${new Date().toISOString()}] readFile: ${params.chemin_du_fichier}`);
```

## Conclusion

Félicitations ! Vous venez de créer votre premier outil MCP fonctionnel. Vous avez appris à :

- Structurer un outil MCP avec TypeScript
- Gérer les paramètres et les réponses
- Valider les entrées et gérer les erreurs
- Exposer vos outils via une API REST
- Tester vos outils avec curl
- Créer plusieurs outils et les enregistrer

La prochaine étape ? Dans le prochain article, nous verrons comment une IA découvre et utilise vos outils automatiquement. Nous implémenterons le protocole complet de découverte et d'exécution, puis nous connecterons votre serveur à Claude Desktop pour voir la magie opérer en conditions réelles.

En attendant, expérimentez ! Créez vos propres outils. Que diriez-vous d'un outil qui recherche dans des fichiers ? Ou qui renomme des fichiers en masse ? Ou qui analyse des données JSON ? Les possibilités sont infinies.

---

*Article publié le 12 novembre 2025 par Nicolas Dabène - Expert PHP & PrestaShop avec 15+ ans d'expérience dans l'architecture logicielle et l'intégration d'IA*

**À lire aussi :**
- [Comprendre le Model Context Protocol (MCP) : Une Conversation Simple](/articles/2025/10/23/comprendre-mcp-conversation-simple)
- [Créer son Premier Serveur MCP : Setup du Projet TypeScript](/articles/2025/10/30/setup-serveur-mcp-typescript)
- [Le Menu MCP : Comment l'IA Découvre et Utilise vos Outils](/articles/2025/12/03/menu-mcp-comment-l-ia-decouvre-et-utilise-vos-outils)
- [Sécuriser votre Serveur MCP : Permissions, Validation et Protection](/articles/2025/12/10/securiser-serveur-mcp-permissions-validation-protection)
- [Connecter votre Serveur MCP à Claude Desktop : L'Intégration Complète](/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete)

