---
layout: post
title: Comment l'IA découvre vos outils MCP?
date: 2025-12-04
ref: mcp-menu-ai-tool-discovery-2025
author: Nicolas Dabène
category: automatisation
subcategory: mcp-protocol
categories:
- Tutoriel
- Intelligence Artificielle
tags:
- API
- IA
- SEO
- développement
excerpt: Votre IA sait maintenant lire des fichiers. Mais comment découvre-t-elle
  vos outils ? Plongeons dans le système de découverte du MCP.
image: /assets/images/blog/2025/12/2025-12-04-menu-mcp-decouverte-outils.webp
featured: true
difficulty: Intermédiaire
technologies:
- TypeScript
- MCP
- API REST
- JSON
estimated_reading_time: 14 minutes
faq:
- question: Puis-je avoir plusieurs serveurs MCP avec des outils différents ?
  answer: Absolument ! Chaque serveur peut exposer ses propres outils. L'IA peut même
    combiner des outils de plusieurs serveurs dans une même conversation.
- question: Comment gérer les outils qui nécessitent une authentification ?
  answer: Le MCP ne spécifie pas d'authentification standard, mais vous pouvez implémenter
    JWT, API keys, ou OAuth selon vos besoins. L'endpoint de découverte peut être
    protégé.
- question: Les outils peuvent-ils communiquer entre eux ?
  answer: Oui, mais c'est généralement le rôle de l'IA d'orchestrer les appels. Cependant,
    vos outils peuvent appeler d'autres outils via le registre si nécessaire.
- question: Comment versionner mes outils ?
  answer: Incluez la version dans la description de l'outil et dans les métadonnées
    du serveur. L'IA peut alors décider si elle supporte cette version.
- question: Qu'est-ce que le protocole MCP?
  answer: MCP (Model Context Protocol) est un protocole open-source créé par Anthropic
    pour connecter des serveurs de données aux assistants IA comme Claude.
- question: MCP est-il compatible avec d'autres IA?
  answer: Actuellement, MCP est principalement conçu pour Claude, mais le protocole
    est open-source et d'autres IA pourront l'adopter.
---


# Le Menu MCP : Comment l'IA Découvre et Utilise vos Outils

Vous avez créé votre premier outil `readFile` dans l'article précédent. Félicitations ! Mais imaginez que vous arriviez dans un restaurant sans menu. Comment sauriez-vous ce qui est disponible ? C'est exactement le problème que résout le système de découverte du MCP. Aujourd'hui, nous allons implémenter le "menu" complet qui permet à une IA de découvrir automatiquement tous vos outils et de les utiliser intelligemment.

## Introduction

Dans mes 15 ans de développement d'API, j'ai vu beaucoup de systèmes d'intégration. Mais le MCP a quelque chose d'élégant : l'auto-découverte. Plutôt que de coder en dur chaque intégration, l'IA interroge votre serveur pour découvrir ce qu'il peut faire. C'est comme si votre API pouvait se présenter elle-même.

Cette approche change tout. Au lieu d'avoir des connecteurs spécifiques pour chaque IA, vous créez un standard que toutes les IA compatibles MCP peuvent comprendre. Une fois que vous maîtriserez ce système, vous pourrez exposer des dizaines d'outils sans jamais modifier le code de l'IA.

## Rappel : Le Parcours Complet d'une Requête

Avant de coder, visualisons le parcours complet d'une interaction entre une IA et votre serveur MCP. C'est crucial pour comprendre où se situe le système de découverte.

### Phase 1 : Découverte (ce que nous allons coder aujourd'hui)

**Vous** : "Claude, liste les fichiers de mon dossier projets"

**Claude** : *"Je ne connais pas encore les outils de ce serveur. Laisse-moi les découvrir..."*

**Claude → Serveur** : `GET /mcp/tools`

**Serveur → Claude** : Voici tous mes outils disponibles avec leurs descriptions

**Claude** : *"Ah ! Il y a un outil `listFiles`. C'est exactement ce dont j'ai besoin."*

### Phase 2 : Validation (gérée par l'application Claude)

**Application Claude → Vous** : "Autorisez-vous l'utilisation de l'outil `listFiles` sur le dossier `/projets` ?"

**Vous** : "Oui, autorisé"

### Phase 3 : Exécution

**Claude → Serveur** : `POST /mcp/execute` avec `{"tool": "listFiles", "params": {"chemin": "/projets"}}`

**Serveur → Claude** : Résultat de l'exécution

**Claude → Vous** : "Voici les fichiers dans votre dossier projets : ..."

Aujourd'hui, nous nous concentrons sur la Phase 1 : la découverte.

## Le Format Standard de Découverte MCP

Le protocole MCP définit un format standard pour décrire vos outils. Voici la structure JSON que l'IA attend :

```json
{
  "protocol_version": "1.0",
  "server_info": {
    "name": "Mon Serveur MCP",
    "version": "1.0.0",
    "description": "Serveur MCP pour accès aux fichiers locaux"
  },
  "tools": [
    {
      "name": "readFile",
      "description": "Lit le contenu d'un fichier texte",
      "input_schema": {
        "type": "object",
        "properties": {
          "chemin_du_fichier": {
            "type": "string",
            "description": "Chemin vers le fichier à lire"
          }
        },
        "required": ["chemin_du_fichier"]
      }
    }
  ]
}
```

Cette structure contient trois informations clés :

**protocol_version** : Quelle version du MCP vous implémentez

**server_info** : Métadonnées sur votre serveur

**tools** : La liste complète de vos outils avec leur schéma d'entrée

Le `input_schema` utilise le standard JSON Schema. C'est comme une documentation auto-générée que l'IA peut lire et comprendre.

## Créer le Gestionnaire de Protocole

Commençons par structurer notre implémentation du protocole MCP. Créez le fichier `src/mcp/protocol.ts` :

```typescript
// src/mcp/protocol.ts

/**
 * Version du protocole MCP implémenté
 */
export const MCP_PROTOCOL_VERSION = "1.0";

/**
 * Informations sur le serveur
 */
export interface ServerInfo {
  name: string;
  version: string;
  description: string;
  author?: string;
  capabilities?: string[];
}

/**
 * Schéma d'entrée pour un outil (JSON Schema)
 */
export interface InputSchema {
  type: "object";
  properties: {
    [paramName: string]: {
      type: string;
      description: string;
      enum?: string[];
      default?: any;
    };
  };
  required: string[];
}

/**
 * Description complète d'un outil MCP
 */
export interface ToolDescription {
  name: string;
  description: string;
  input_schema: InputSchema;
}

/**
 * Réponse de découverte complète
 */
export interface DiscoveryResponse {
  protocol_version: string;
  server_info: ServerInfo;
  tools: ToolDescription[];
}

/**
 * Informations sur notre serveur
 */
export const SERVER_INFO: ServerInfo = {
  name: "MCP File Server",
  version: "1.0.0",
  description: "Serveur MCP pour la gestion de fichiers locaux",
  author: "Nicolas Dabène",
  capabilities: [
    "file_reading",
    "directory_listing",
    "file_search"
  ]
};
```

Ces types TypeScript nous donnent une structure solide. Chaque outil devra fournir une `ToolDescription` conforme à ce format.

## Convertir nos Outils au Format MCP

Actuellement, nos outils ont une définition simple. Transformons-les au format MCP complet. Modifions `src/tools/readFile.ts` :

```typescript
// src/tools/readFile.ts
import fs from 'fs/promises';
import path from 'path';
import { ToolResponse } from '../types/mcp';
import { ToolDescription, InputSchema } from '../mcp/protocol';

export interface ReadFileParams {
  chemin_du_fichier: string;
  encoding?: 'utf-8' | 'ascii' | 'base64';
}

export async function readFile(params: ReadFileParams): Promise<ToolResponse> {
  try {
    if (!params.chemin_du_fichier) {
      return {
        success: false,
        error: "Le paramètre 'chemin_du_fichier' est requis"
      };
    }

    const absolutePath = path.resolve(params.chemin_du_fichier);
    
    try {
      await fs.access(absolutePath);
    } catch {
      return {
        success: false,
        error: `Fichier introuvable : ${params.chemin_du_fichier}`
      };
    }

    const stats = await fs.stat(absolutePath);
    
    if (!stats.isFile()) {
      return {
        success: false,
        error: "Le chemin spécifié n'est pas un fichier"
      };
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (stats.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `Fichier trop volumineux (max ${MAX_FILE_SIZE / 1024 / 1024} MB)`
      };
    }

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

/**
 * Schéma d'entrée au format JSON Schema
 */
const readFileInputSchema: InputSchema = {
  type: "object",
  properties: {
    chemin_du_fichier: {
      type: "string",
      description: "Chemin absolu ou relatif vers le fichier à lire"
    },
    encoding: {
      type: "string",
      description: "Encodage du fichier",
      enum: ["utf-8", "ascii", "base64"],
      default: "utf-8"
    }
  },
  required: ["chemin_du_fichier"]
};

/**
 * Description MCP complète de l'outil
 */
export const readFileDescription: ToolDescription = {
  name: "readFile",
  description: "Lit le contenu d'un fichier texte depuis le système de fichiers local. Supporte différents encodages (UTF-8, ASCII, Base64).",
  input_schema: readFileInputSchema
};
```

Vous voyez la différence ? Nous avons maintenant :

**Un schéma JSON formel** qui décrit exactement les paramètres attendus

**Des métadonnées enrichies** comme les valeurs par défaut et les énumérations

**Une description détaillée** qui aide l'IA à comprendre quand utiliser cet outil

Faisons de même pour `listFiles`. Modifiez `src/tools/listFiles.ts` :

```typescript
// src/tools/listFiles.ts
import fs from 'fs/promises';
import path from 'path';
import { ToolResponse } from '../types/mcp';
import { ToolDescription, InputSchema } from '../mcp/protocol';

export interface ListFilesParams {
  chemin_du_dossier: string;
  include_hidden?: boolean;
  recursive?: boolean;
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
    
    const stats = await fs.stat(absolutePath);
    if (!stats.isDirectory()) {
      return {
        success: false,
        error: "Le chemin spécifié n'est pas un dossier"
      };
    }

    // Lire le contenu du dossier
    let files = await fs.readdir(absolutePath);
    
    // Filtrer les fichiers cachés si nécessaire
    if (!params.include_hidden) {
      files = files.filter(file => !file.startsWith('.'));
    }
    
    // Obtenir les détails de chaque fichier
    const filesWithDetails = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(absolutePath, file);
        const fileStats = await fs.stat(filePath);
        
        return {
          name: file,
          type: fileStats.isDirectory() ? 'directory' : 'file',
          size: fileStats.size,
          lastModified: fileStats.mtime,
          permissions: fileStats.mode
        };
      })
    );
    
    return {
      success: true,
      content: JSON.stringify(filesWithDetails, null, 2),
      metadata: {
        path: absolutePath,
        count: filesWithDetails.length,
        include_hidden: params.include_hidden || false
      }
    };
    
  } catch (error: any) {
    return {
      success: false,
      error: `Erreur lors de la lecture du dossier : ${error.message}`
    };
  }
}

const listFilesInputSchema: InputSchema = {
  type: "object",
  properties: {
    chemin_du_dossier: {
      type: "string",
      description: "Chemin absolu ou relatif vers le dossier à lister"
    },
    include_hidden: {
      type: "boolean",
      description: "Inclure les fichiers cachés (commençant par .)",
      default: false
    },
    recursive: {
      type: "boolean",
      description: "Lister récursivement les sous-dossiers",
      default: false
    }
  },
  required: ["chemin_du_dossier"]
};

export const listFilesDescription: ToolDescription = {
  name: "listFiles",
  description: "Liste les fichiers et dossiers dans un répertoire donné. Peut inclure les fichiers cachés et supporter la récursivité.",
  input_schema: listFilesInputSchema
};
```

## Créer le Registre d'Outils Centralisé

Maintenant, créons un registre qui rassemble tous nos outils. Créez `src/mcp/registry.ts` :

```typescript
// src/mcp/registry.ts
import { ToolDescription } from './protocol';
import { ToolResponse } from '../types/mcp';
import { readFile, readFileDescription } from '../tools/readFile';
import { listFiles, listFilesDescription } from '../tools/listFiles';

/**
 * Type pour une fonction outil
 */
type ToolFunction = (params: any) => Promise<ToolResponse>;

/**
 * Registre central de tous les outils disponibles
 */
class ToolRegistry {
  private tools: Map<string, ToolFunction> = new Map();
  private descriptions: Map<string, ToolDescription> = new Map();

  /**
   * Enregistrer un nouvel outil
   */
  register(description: ToolDescription, implementation: ToolFunction) {
    this.tools.set(description.name, implementation);
    this.descriptions.set(description.name, description);
    console.log(`✅ Outil enregistré : ${description.name}`);
  }

  /**
   * Obtenir tous les outils disponibles
   */
  getAllDescriptions(): ToolDescription[] {
    return Array.from(this.descriptions.values());
  }

  /**
   * Obtenir la description d'un outil spécifique
   */
  getDescription(toolName: string): ToolDescription | undefined {
    return this.descriptions.get(toolName);
  }

  /**
   * Exécuter un outil
   */
  async execute(toolName: string, params: any): Promise<ToolResponse> {
    const tool = this.tools.get(toolName);
    
    if (!tool) {
      return {
        success: false,
        error: `Outil '${toolName}' introuvable. Outils disponibles : ${Array.from(this.tools.keys()).join(', ')}`
      };
    }

    try {
      return await tool(params);
    } catch (error: any) {
      return {
        success: false,
        error: `Erreur lors de l'exécution de '${toolName}' : ${error.message}`
      };
    }
  }

  /**
   * Vérifier si un outil existe
   */
  has(toolName: string): boolean {
    return this.tools.has(toolName);
  }

  /**
   * Obtenir le nombre d'outils enregistrés
   */
  count(): number {
    return this.tools.size;
  }
}

// Instance singleton du registre
export const toolRegistry = new ToolRegistry();

// Enregistrement de tous nos outils au démarrage
toolRegistry.register(readFileDescription, readFile);
toolRegistry.register(listFilesDescription, listFiles);
```

Ce registre est le cœur de notre système. C'est lui qui :

**Maintient la liste de tous les outils** disponibles

**Gère l'exécution** des outils de manière unifiée

**Fournit les descriptions** pour la découverte

**Gère les erreurs** de manière centralisée

## Implémenter les Endpoints MCP

Modifions maintenant notre serveur Express pour implémenter les endpoints MCP standards. Remplaçons `src/index.ts` :

```typescript
// src/index.ts
import express, { Request, Response } from 'express';
import { MCP_PROTOCOL_VERSION, SERVER_INFO, DiscoveryResponse } from './mcp/protocol';
import { toolRegistry } from './mcp/registry';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES MCP STANDARD
// ============================================

/**
 * Endpoint racine - Informations sur le serveur
 */
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Serveur MCP File Server',
    version: SERVER_INFO.version,
    protocol_version: MCP_PROTOCOL_VERSION,
    status: 'operational',
    endpoints: {
      discovery: '/mcp/tools',
      execute: '/mcp/execute',
      health: '/health'
    }
  });
});

/**
 * Endpoint de découverte - Le "menu" complet
 * C'est ici que l'IA découvre tous vos outils
 */
app.get('/mcp/tools', (req: Request, res: Response) => {
  const response: DiscoveryResponse = {
    protocol_version: MCP_PROTOCOL_VERSION,
    server_info: SERVER_INFO,
    tools: toolRegistry.getAllDescriptions()
  };
  
  console.log(`📋 Découverte demandée - ${toolRegistry.count()} outils disponibles`);
  res.json(response);
});

/**
 * Endpoint d'exécution unifié
 * Format : POST /mcp/execute
 * Body : { "tool": "nomOutil", "params": {...} }
 */
app.post('/mcp/execute', async (req: Request, res: Response) => {
  const { tool, params } = req.body;
  
  // Validation
  if (!tool) {
    return res.status(400).json({
      success: false,
      error: "Le paramètre 'tool' est requis"
    });
  }

  console.log(`⚙️  Exécution demandée : ${tool}`);
  
  // Exécution via le registre
  const result = await toolRegistry.execute(tool, params || {});
  
  // Log du résultat
  if (result.success) {
    console.log(`✅ Exécution réussie : ${tool}`);
  } else {
    console.log(`❌ Échec d'exécution : ${tool} - ${result.error}`);
  }
  
  res.json(result);
});

/**
 * Endpoint de description d'un outil spécifique
 */
app.get('/mcp/tools/:toolName', (req: Request, res: Response) => {
  const { toolName } = req.params;
  const description = toolRegistry.getDescription(toolName);
  
  if (!description) {
    return res.status(404).json({
      success: false,
      error: `Outil '${toolName}' introuvable`
    });
  }
  
  res.json(description);
});

/**
 * Health check
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    tools_count: toolRegistry.count(),
    timestamp: new Date().toISOString()
  });
});

// ============================================
// RÉTROCOMPATIBILITÉ (optionnel)
// ============================================

/**
 * Ancien endpoint direct (pour tests rapides)
 * @deprecated Utilisez /mcp/execute à la place
 */
app.post('/tools/:toolName', async (req: Request, res: Response) => {
  const { toolName } = req.params;
  const params = req.body;
  
  console.log(`⚠️  Utilisation de l'ancien endpoint /tools/${toolName} (déprécié)`);
  
  const result = await toolRegistry.execute(toolName, params);
  res.json(result);
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

app.listen(PORT, () => {
  console.log('═══════════════════════════════════════');
  console.log('🚀 MCP File Server');
  console.log('═══════════════════════════════════════');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📋 Découverte: http://localhost:${PORT}/mcp/tools`);
  console.log(`⚙️  Exécution: POST http://localhost:${PORT}/mcp/execute`);
  console.log(`🔧 Outils disponibles: ${toolRegistry.count()}`);
  console.log('═══════════════════════════════════════');
});
```

Notre serveur implémente maintenant le protocole MCP complet avec trois endpoints principaux :

**GET /mcp/tools** : Découverte de tous les outils

**POST /mcp/execute** : Exécution unifiée de n'importe quel outil

**GET /mcp/tools/:toolName** : Détails d'un outil spécifique

## Tester le Système de Découverte

Relançons notre serveur et testons le système complet :

```bash
npm run dev
```

Vous devriez voir :

```
═══════════════════════════════════════
🚀 MCP File Server
═══════════════════════════════════════
📍 URL: http://localhost:3000
📋 Découverte: http://localhost:3000/mcp/tools
⚙️  Exécution: POST http://localhost:3000/mcp/execute
🔧 Outils disponibles: 2
═══════════════════════════════════════
✅ Outil enregistré : readFile
✅ Outil enregistré : listFiles
```

### Test 1 : Découverte Complète

```bash
curl http://localhost:3000/mcp/tools | json_pp
```

Réponse (formatée) :

```json
{
  "protocol_version": "1.0",
  "server_info": {
    "name": "MCP File Server",
    "version": "1.0.0",
    "description": "Serveur MCP pour la gestion de fichiers locaux",
    "author": "Nicolas Dabène",
    "capabilities": [
      "file_reading",
      "directory_listing",
      "file_search"
    ]
  },
  "tools": [
    {
      "name": "readFile",
      "description": "Lit le contenu d'un fichier texte depuis le système de fichiers local. Supporte différents encodages (UTF-8, ASCII, Base64).",
      "input_schema": {
        "type": "object",
        "properties": {
          "chemin_du_fichier": {
            "type": "string",
            "description": "Chemin absolu ou relatif vers le fichier à lire"
          },
          "encoding": {
            "type": "string",
            "description": "Encodage du fichier",
            "enum": ["utf-8", "ascii", "base64"],
            "default": "utf-8"
          }
        },
        "required": ["chemin_du_fichier"]
      }
    },
    {
      "name": "listFiles",
      "description": "Liste les fichiers et dossiers dans un répertoire donné. Peut inclure les fichiers cachés et supporter la récursivité.",
      "input_schema": {
        "type": "object",
        "properties": {
          "chemin_du_dossier": {
            "type": "string",
            "description": "Chemin absolu ou relatif vers le dossier à lister"
          },
          "include_hidden": {
            "type": "boolean",
            "description": "Inclure les fichiers cachés (commençant par .)",
            "default": false
          },
          "recursive": {
            "type": "boolean",
            "description": "Lister récursivement les sous-dossiers",
            "default": false
          }
        },
        "required": ["chemin_du_dossier"]
      }
    }
  ]
}
```

Parfait ! L'IA peut maintenant découvrir tous vos outils avec leurs descriptions complètes.

### Test 2 : Exécution via l'Endpoint Unifié

```bash
curl -X POST http://localhost:3000/mcp/execute \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "readFile",
    "params": {
      "chemin_du_fichier": "test.txt"
    }
  }'
```

Réponse :

```json
{
  "success": true,
  "content": "Ceci est un fichier de test pour le MCP !\n",
  "metadata": {
    "path": "/chemin/absolu/vers/test.txt",
    "size": 42,
    "encoding": "utf-8",
    "lastModified": "2025-11-12T10:30:00.000Z"
  }
}
```

### Test 3 : Détails d'un Outil Spécifique

```bash
curl http://localhost:3000/mcp/tools/listFiles | json_pp
```

Cela retourne uniquement les informations sur `listFiles`, utile pour une IA qui veut en savoir plus sur un outil spécifique.

## Créer un Client de Test Simple

Pour mieux visualiser le fonctionnement, créons un petit script client. Créez `src/test-client.ts` :

```typescript
// src/test-client.ts

/**
 * Client de test simple pour démontrer l'interaction MCP
 */

const SERVER_URL = 'http://localhost:3000';

interface ToolDescription {
  name: string;
  description: string;
  input_schema: any;
}

interface DiscoveryResponse {
  protocol_version: string;
  server_info: any;
  tools: ToolDescription[];
}

/**
 * Étape 1 : Découvrir les outils disponibles
 */
async function discoverTools(): Promise<ToolDescription[]> {
  console.log('\n📋 Étape 1 : Découverte des outils...\n');
  
  const response = await fetch(`${SERVER_URL}/mcp/tools`);
  const data: DiscoveryResponse = await response.json();
  
  console.log(`Serveur : ${data.server_info.name} v${data.server_info.version}`);
  console.log(`Protocole MCP : ${data.protocol_version}`);
  console.log(`\nOutils disponibles : ${data.tools.length}\n`);
  
  data.tools.forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name}`);
    console.log(`   ${tool.description}`);
    console.log(`   Paramètres requis : ${tool.input_schema.required.join(', ')}`);
    console.log('');
  });
  
  return data.tools;
}

/**
 * Étape 2 : Utiliser un outil
 */
async function useTool(toolName: string, params: any) {
  console.log(`\n⚙️  Étape 2 : Utilisation de l'outil "${toolName}"...\n`);
  console.log(`Paramètres : ${JSON.stringify(params, null, 2)}`);
  
  const response = await fetch(`${SERVER_URL}/mcp/execute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tool: toolName,
      params: params
    })
  });
  
  const result = await response.json();
  
  if (result.success) {
    console.log('\n✅ Succès !');
    console.log(`Résultat : ${result.content.substring(0, 200)}...`);
    if (result.metadata) {
      console.log(`Métadonnées : ${JSON.stringify(result.metadata, null, 2)}`);
    }
  } else {
    console.log('\n❌ Échec !');
    console.log(`Erreur : ${result.error}`);
  }
}

/**
 * Simulation complète d'interaction IA
 */
async function simulateAIInteraction() {
  console.log('═══════════════════════════════════════');
  console.log('🤖 Simulation d\'interaction IA avec MCP');
  console.log('═══════════════════════════════════════');
  
  try {
    // Découverte
    const tools = await discoverTools();
    
    // L'IA "choisit" un outil basé sur une tâche
    console.log('\n💭 L\'IA analyse la demande : "Liste les fichiers du dossier courant"');
    console.log('💭 L\'IA identifie que l\'outil "listFiles" correspond à la demande\n');
    
    // Exécution
    await useTool('listFiles', {
      chemin_du_dossier: '.',
      include_hidden: false
    });
    
    console.log('\n═══════════════════════════════════════');
    
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Exécution
simulateAIInteraction();
```

Ajoutez un script dans votre `package.json` :

```json
"scripts": {
  "dev": "ts-node src/index.ts",
  "test-client": "ts-node src/test-client.ts"
}
```

Exécutez le client de test :

```bash
npm run test-client
```

Vous verrez une simulation complète de l'interaction IA :

```
═══════════════════════════════════════
🤖 Simulation d'interaction IA avec MCP
═══════════════════════════════════════

📋 Étape 1 : Découverte des outils...

Serveur : MCP File Server v1.0.0
Protocole MCP : 1.0

Outils disponibles : 2

1. readFile
   Lit le contenu d'un fichier texte depuis le système de fichiers local. Supporte différents encodages (UTF-8, ASCII, Base64).
   Paramètres requis : chemin_du_fichier

2. listFiles
   Liste les fichiers et dossiers dans un répertoire donné. Peut inclure les fichiers cachés et supporter la récursivité.
   Paramètres requis : chemin_du_dossier

💭 L'IA analyse la demande : "Liste les fichiers du dossier courant"
💭 L'IA identifie que l'outil "listFiles" correspond à la demande

⚙️  Étape 2 : Utilisation de l'outil "listFiles"...

Paramètres : {
  "chemin_du_dossier": ".",
  "include_hidden": false
}

✅ Succès !
Résultat : [
  {
    "name": "node_modules",
    "type": "directory",
    "size": 4096,
    "lastModified": "2025-12-03T08:15:23.000Z",
    "permissions": 16877
  },
  ...
]
Métadonnées : {
  "path": "/chemin/absolu/vers/projet",
  "count": 8,
  "include_hidden": false
}

═══════════════════════════════════════
```

Parfait ! Vous venez de simuler exactement comment une IA utilise votre serveur MCP.

## Comprendre l'Impact Architecturale

Ce système de découverte change fondamentalement l'architecture des intégrations IA :

### Avant MCP : Intégrations Rigides

Chaque IA devait être programmée spécifiquement pour chaque outil :

```typescript
// Code dans l'IA pour intégrer un outil spécifique
if (userWantsToReadFile) {
  callReadFileAPI(userParams);
} else if (userWantsToListFiles) {
  callListFilesAPI(userParams);
}
```

### Après MCP : Auto-Découverte

L'IA découvre dynamiquement les capacités :

```typescript
// L'IA peut maintenant découvrir et utiliser n'importe quel outil
const tools = await discoverTools();
const tool = tools.find(t => matchesUserRequest(t));
await executeTool(tool.name, userParams);
```

## Avantages pour les Développeurs

### Évolutivité

Vous pouvez ajouter de nouveaux outils sans toucher au code de l'IA. Il suffit de les enregistrer dans le registre.

### Standardisation

Toutes les IA compatibles MCP peuvent utiliser vos outils automatiquement.

### Maintenance Simplifiée

Un seul endroit pour gérer tous vos outils : le registre centralisé.

## Sécurité et Bonnes Pratiques

### Validation des Requêtes

Toujours valider que l'outil demandé existe avant de l'exécuter :

```typescript
if (!toolRegistry.has(toolName)) {
  return res.status(404).json({
    success: false,
    error: `Outil '${toolName}' non trouvé`
  });
}
```

### Logging et Monitoring

Loggez toutes les interactions pour le debugging et la sécurité :

```typescript
console.log(`[${new Date().toISOString()}] ${req.ip} - ${toolName} - ${result.success ? 'SUCCESS' : 'ERROR'}`);
```

### Rate Limiting

Implémentez des limites de fréquence pour éviter les abus :

```typescript
// Exemple simple de rate limiting
const requests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 1000; // 1 minute
  const maxRequests = 100; // 100 requêtes par minute

  const userRequests = requests.get(ip) || [];
  const recentRequests = userRequests.filter(time => now - time < window);

  if (recentRequests.length >= maxRequests) {
    return true;
  }

  recentRequests.push(now);
  requests.set(ip, recentRequests);
  return false;
}
```

## Conclusion : Un Nouveau Paradigme

Le système de découverte MCP représente un changement de paradigme dans l'intégration des IA. Au lieu de créer des connecteurs spécifiques pour chaque cas d'usage, vous créez des "blocs de construction" standardisés que toutes les IA compatibles peuvent assembler dynamiquement.

Dans cet article, nous avons vu comment :

- Implémenter le protocole MCP complet avec découverte et exécution
- Créer un registre centralisé d'outils
- Structurer les outils avec des schémas JSON Schema
- Tester le système avec des clients HTTP
- Simuler l'interaction complète IA-serveur

La prochaine étape ? Connecter votre serveur MCP à une vraie IA comme Claude Desktop. Vous verrez alors la magie opérer : votre IA pourra réellement lire vos fichiers, lister vos dossiers, et utiliser tous vos outils personnalisés.

Le MCP n'est pas qu'un protocole technique : c'est une nouvelle façon de penser l'intégration homme-IA. Vos outils deviennent des extensions naturelles des capacités de l'IA, sans friction technique.

---

*Article publié le 12 novembre 2025 par Nicolas Dabène - Expert PHP & PrestaShop avec 15+ ans d'expérience dans l'architecture logicielle et l'intégration d'IA*

**À lire aussi :**
- [Comprendre le Model Context Protocol (MCP) : Une Conversation Simple](/articles/2025/10/23/comprendre-mcp-conversation-simple)
- [Créer son Premier Serveur MCP : Setup du Projet TypeScript](/articles/2025/10/30/setup-serveur-mcp-typescript)
- [Créer votre Premier Outil MCP : L'Outil readFile Expliqué](/articles/2025/11/12/creer-votre-premier-outil-mcp-l-outil-readfile-explique)
- [Sécuriser votre Serveur MCP : Permissions, Validation et Protection](/articles/2025/12/10/securiser-serveur-mcp-permissions-validation-protection)
- [Connecter votre Serveur MCP à Claude Desktop : L'Intégration Complète](/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete)

