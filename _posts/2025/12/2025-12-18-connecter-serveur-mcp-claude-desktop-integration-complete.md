---
layout: post
title: "Connecter votre Serveur MCP à Claude Desktop : L'Intégration Complète"
date: 2025-12-18
author: Nicolas Dabène
categories: [Tutoriel, Intelligence Artificielle]
tags: [MCP, Claude Desktop, intégration, IA, configuration, test]
excerpt: "Le moment tant attendu : connectons votre serveur MCP sécurisé à Claude Desktop et voyons la magie opérer en conditions réelles."
image: /assets/images/blog/2025/12/2025-12-18-connecter-serveur-mcp-claude-desktop.jpg
featured: true
difficulty: "Intermédiaire"
technologies: ["MCP", "Claude Desktop", "TypeScript", "Configuration"]
estimated_reading_time: "14 minutes"
---

# Connecter votre Serveur MCP à Claude Desktop : L'Intégration Complète

Nous y sommes. Après avoir construit un serveur MCP de A à Z, créé des outils fonctionnels, implémenté la découverte automatique et ajouté quatre couches de sécurité, il est temps de voir tout ça fonctionner avec une vraie IA. Aujourd'hui, nous connectons votre serveur à Claude Desktop et vous verrez enfin Claude utiliser vos outils en temps réel. C'est le moment où tout prend sens.

## Introduction

Je me souviens encore de la première fois que j'ai vu Claude utiliser un de mes outils MCP. Après des heures de développement, de tests avec curl, de validation... le voir fonctionner naturellement dans une conversation était magique. C'est ce moment que vous allez vivre aujourd'hui.

Dans cet article final de la série, nous allons configurer Claude Desktop pour qu'il se connecte à votre serveur MCP, tester chaque outil en conditions réelles, debugger les problèmes courants, et explorer des cas d'usage avancés. À la fin, vous aurez un assistant IA personnel capable d'interagir avec vos fichiers, vos données, vos systèmes. Tout ça en toute sécurité.

## Prérequis

Avant de commencer, assurez-vous d'avoir :

**Claude Desktop installé** : Téléchargez-le depuis claude.ai/download si ce n'est pas déjà fait

**Votre serveur MCP fonctionnel** : Les parties 1-5 de cette série doivent être complètes

**Node.js et npm** : Pour lancer votre serveur

**Un compte Claude** : Gratuit ou Pro, les deux fonctionnent

## Comprendre l'Architecture de Connexion

Avant de configurer, visualisons comment Claude Desktop communique avec votre serveur :

```
┌─────────────────┐
│  Claude Desktop │
│   (Interface)   │
└────────┬────────┘
         │
         │ Lit la configuration
         ↓
┌─────────────────┐
│  Configuration  │
│  claude_desktop │
│   _config.json  │
└────────┬────────┘
         │
         │ Lance automatiquement
         ↓
┌─────────────────┐
│  Votre Serveur  │
│      MCP        │
│  (Node.js/TS)   │
└────────┬────────┘
         │
         │ Accède à vos ressources
         ↓
┌─────────────────┐
│   Fichiers /    │
│   Données /     │
│   Systèmes      │
└─────────────────┘
```

Claude Desktop lit un fichier de configuration, lance votre serveur MCP en arrière-plan, puis communique avec lui via stdio (entrée/sortie standard). Votre serveur n'a même pas besoin d'être un serveur HTTP pour cette intégration !

## Adapter le Serveur pour Stdio

Jusqu'à présent, notre serveur utilisait Express et HTTP. Pour l'intégration Claude Desktop, nous devons créer une version qui communique via stdio. Créez `src/mcp-stdio.ts` :

```typescript
// src/mcp-stdio.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';
import { toolRegistry } from './mcp/registry';
import { MCP_PROTOCOL_VERSION, SERVER_INFO } from './mcp/protocol';
import { ParameterValidator, ValidationError, PathValidator } from './security/validator';

/**
 * Serveur MCP pour Claude Desktop (stdio)
 */
class MCPStdioServer {
  private server: Server;
  private pathValidator: PathValidator;

  constructor() {
    // Initialiser le validateur de chemins
    this.pathValidator = new PathValidator([
      process.cwd(),
      process.env.HOME || '/home',
    ]);

    // Créer le serveur MCP
    this.server = new Server(
      {
        name: SERVER_INFO.name,
        version: SERVER_INFO.version,
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  /**
   * Configuration des handlers MCP
   */
  private setupHandlers() {
    // Handler pour lister les outils
    this.server.setRequestHandler(
      ListToolsRequestSchema,
      async () => {
        const tools = toolRegistry.getAllDescriptions();
        
        return {
          tools: tools.map(tool => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.input_schema,
          })),
        };
      }
    );

    // Handler pour exécuter un outil
    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request) => {
        const { name, arguments: args } = request.params;

        try {
          // Obtenir la description de l'outil
          const toolDescription = toolRegistry.getDescription(name);
          
          if (!toolDescription) {
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    success: false,
                    error: `Outil '${name}' introuvable`,
                  }),
                },
              ],
            };
          }

          // Valider les paramètres
          ParameterValidator.validate(args || {}, toolDescription.input_schema);

          // Validation spécifique des chemins pour les outils de fichiers
          if (name === 'readFile' || name === 'listFiles' || name === 'searchFiles') {
            const pathParam = args.chemin_du_fichier || args.chemin_du_dossier;
            if (pathParam) {
              args.validated_path = this.pathValidator.validatePath(pathParam);
            }
          }

          // Exécuter l'outil
          console.error(`[MCP] Exécution: ${name}`);
          const result = await toolRegistry.execute(name, args);

          // Formater la réponse
          return {
            content: [
              {
                type: 'text',
                text: result.success ? result.content || 'Opération réussie' : `Erreur: ${result.error}`,
              },
            ],
          };

        } catch (error: any) {
          console.error(`[MCP] Erreur:`, error);
          
          if (error instanceof ValidationError) {
            return {
              content: [
                {
                  type: 'text',
                  text: `Erreur de validation: ${error.message}`,
                },
              ],
              isError: true,
            };
          }

          return {
            content: [
              {
                type: 'text',
                text: `Erreur: ${error.message}`,
              },
            ],
            isError: true,
          };
        }
      }
    );
  }

  /**
   * Démarrer le serveur
   */
  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    console.error('[MCP] Serveur démarré et connecté via stdio');
    console.error(`[MCP] Outils disponibles: ${toolRegistry.count()}`);
  }
}

// Démarrage du serveur
const server = new MCPStdioServer();
server.start().catch((error) => {
  console.error('[MCP] Erreur fatale:', error);
  process.exit(1);
});
```

**Important** : Notez l'utilisation de `console.error()` pour les logs. Pourquoi ? Parce que stdout est réservé pour la communication MCP. Les logs doivent aller vers stderr.

Installez le SDK MCP :

```bash
npm install @modelcontextprotocol/sdk
```

Compilez votre projet :

```bash
npx tsc
```

Testez que ça compile sans erreurs. Le fichier compilé sera dans `dist/mcp-stdio.js`.

## Configuration de Claude Desktop

Claude Desktop cherche sa configuration à un emplacement spécifique selon votre OS :

**macOS** : `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows** : `%APPDATA%\Claude\claude_desktop_config.json`

**Linux** : `~/.config/Claude/claude_desktop_config.json`

Créez ou éditez ce fichier avec la configuration suivante :

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": [
        "/chemin/absolu/vers/votre/projet/dist/mcp-stdio.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

**Remplacez `/chemin/absolu/vers/votre/projet`** par le chemin réel vers votre dossier de projet.

Pour obtenir le chemin absolu facilement :

```bash
cd /votre/projet/mcp-server
pwd
# Copiez le résultat et ajoutez /dist/mcp-stdio.js
```

Exemple complet :

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": [
        "/Users/nicolas/Dev/mcp-server/dist/mcp-stdio.js"
      ],
      "env": {
        "NODE_ENV": "production",
        "PATH": "/usr/local/bin:/usr/bin:/bin"
      }
    }
  }
}
```

**Astuce** : Ajoutez la variable `PATH` si vous avez des problèmes de "command not found".

## Démarrer Claude Desktop

1. **Fermez complètement Claude Desktop** s'il est ouvert
2. **Relancez Claude Desktop**
3. **Ouvrez les Developer Tools** (sur macOS : View → Developer → Toggle Developer Tools)
4. **Regardez la console** pour voir les logs de connexion

Si tout fonctionne, vous devriez voir dans la console :

```
[MCP] Serveur démarré et connecté via stdio
[MCP] Outils disponibles: 3
```

## Vérifier que les Outils sont Disponibles

Dans Claude Desktop, démarrez une nouvelle conversation et tapez :

```
Quels outils as-tu à disposition ?
```

Claude devrait répondre quelque chose comme :

> Je dispose de plusieurs outils pour interagir avec le système de fichiers :
> 
> 1. **readFile** : Permet de lire le contenu d'un fichier texte
> 2. **listFiles** : Liste les fichiers et dossiers dans un répertoire
> 3. **searchFiles** : Recherche des fichiers par nom
> 
> Que voudrais-tu que je fasse ?

**Si Claude ne voit pas vos outils**, passez à la section Débogage ci-dessous.

## Premier Test : Lire un Fichier

Créons un fichier de test dans votre projet :

```bash
echo "Ceci est un test du serveur MCP avec Claude Desktop !" > test-claude.txt
```

Maintenant, dans Claude, demandez :

```
Lis le fichier test-claude.txt dans le répertoire courant et dis-moi ce qu'il contient.
```

Claude va :
1. Comprendre qu'il doit utiliser l'outil `readFile`
2. Demander votre permission
3. Exécuter l'outil
4. Vous montrer le contenu

**Exemple de conversation réelle** :

> **Vous** : Lis le fichier test-claude.txt
> 
> **Claude** : Je vais lire le fichier test-claude.txt pour vous.
> 
> [Demande de permission apparaît]
> 
> **[Vous cliquez "Autoriser"]**
> 
> **Claude** : Le fichier contient : "Ceci est un test du serveur MCP avec Claude Desktop !"

**C'est magique, non ?** Vous venez de voir Claude utiliser VOTRE code, VOS outils, en temps réel.

## Test Avancé : Liste et Recherche

Testons maintenant des interactions plus complexes :

```
Liste tous les fichiers TypeScript dans le dossier src
```

Claude va :
1. Utiliser `listFiles` pour lister src/
2. Filtrer les fichiers .ts dans sa réponse
3. Vous présenter une liste organisée

Ou essayez :

```
Trouve tous les fichiers qui contiennent "security" dans leur nom
```

Claude utilisera `searchFiles` avec le bon paramètre.

## Test de Validation : Sécurité en Action

Essayons maintenant de voir notre sécurité fonctionner :

```
Lis le fichier ../../../../etc/passwd
```

Claude va tenter d'utiliser `readFile` avec ce chemin, mais votre `PathValidator` va bloquer la requête. Vous verrez une erreur :

> Je n'ai pas pu lire ce fichier. L'erreur indique : "Les chemins avec ".." ne sont pas autorisés (path traversal)"

**Parfait !** Votre sécurité fonctionne même avec Claude.

## Cas d'Usage Avancés

Maintenant que la connexion fonctionne, explorons des scénarios réels :

### 1. Analyse de Code

```
Analyse tous les fichiers TypeScript du dossier src/tools et dis-moi combien de lignes de code il y a au total
```

Claude va :
- Lister les fichiers dans src/tools
- Lire chaque fichier .ts
- Compter les lignes
- Vous donner un rapport

### 2. Documentation Automatique

```
Crée-moi un README.md qui documente tous les outils disponibles dans src/tools avec leurs paramètres
```

Claude va :
- Lister les fichiers
- Lire chaque outil
- Extraire les informations importantes
- Générer un README formaté

### 3. Recherche et Résumé

```
Trouve tous les fichiers qui mentionnent "validation" et fais-moi un résumé de comment la validation est implémentée
```

Claude va :
- Chercher les fichiers pertinents
- Les lire
- Analyser le code
- Synthétiser l'information

### 4. Refactoring Assisté

```
Regarde le fichier src/tools/readFile.ts et suggère-moi des améliorations de performance
```

Claude va :
- Lire le fichier
- Analyser le code avec son expertise
- Proposer des optimisations concrètes

## Débogage : Problèmes Courants

### Problème 1 : Claude ne voit pas les outils

**Symptôme** : Claude répond "Je n'ai pas d'outils disponibles pour ça"

**Solutions** :

1. Vérifiez la configuration :
```bash
# macOS
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Vérifiez que le chemin est correct
ls /chemin/vers/votre/projet/dist/mcp-stdio.js
```

2. Vérifiez la compilation :
```bash
cd votre-projet
npx tsc
ls dist/mcp-stdio.js  # Doit exister
```

3. Testez manuellement :
```bash
node dist/mcp-stdio.js
# Ne devrait pas planter immédiatement
```

4. Regardez les Developer Tools de Claude Desktop :
   - Cherchez les erreurs en rouge
   - Cherchez "[MCP]" dans les logs

### Problème 2 : Erreur "command not found"

**Symptôme** : Dans les Developer Tools : "Error: spawn node ENOENT"

**Solution** : Ajoutez le PATH complet dans la config :

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "/usr/local/bin/node",
      "args": ["/chemin/absolu/dist/mcp-stdio.js"],
      "env": {
        "PATH": "/usr/local/bin:/usr/bin:/bin"
      }
    }
  }
}
```

Trouvez votre chemin node avec :
```bash
which node
```

### Problème 3 : Le serveur plante immédiatement

**Symptôme** : Les logs montrent que le serveur démarre puis s'arrête

**Vérifications** :

1. Testez le serveur en standalone :
```bash
node dist/mcp-stdio.js
# Tapez quelque chose et Entrée
# Le serveur devrait rester actif
```

2. Vérifiez les dépendances :
```bash
npm install
npm list @modelcontextprotocol/sdk
```

3. Regardez stderr :
```bash
node dist/mcp-stdio.js 2>error.log
# Regardez error.log pour les erreurs
```

### Problème 4 : Permission denied

**Symptôme** : "EACCES: permission denied"

**Solution** :

1. Vérifiez les permissions du fichier :
```bash
ls -l dist/mcp-stdio.js
chmod +x dist/mcp-stdio.js
```

2. Vérifiez les permissions des dossiers configurés :
```bash
# Dans PathValidator, vérifiez que les dossiers existent et sont lisibles
ls -ld ~/Documents
```

### Problème 5 : Les outils sont lents

**Symptôme** : Claude met du temps à exécuter les outils

**Optimisations** :

1. Mettez en cache les résultats coûteux
2. Limitez la taille des fichiers lus
3. Ajoutez des timeouts :

```typescript
// Dans votre outil
const result = await Promise.race([
  fs.readFile(path),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), 5000)
  )
]);
```

## Créer un Script de Diagnostic

Pour faciliter le débogage, créez `diagnose.sh` :

```bash
#!/bin/bash

echo "=== Diagnostic MCP Server ==="
echo ""

echo "1. Vérification Node.js:"
which node
node --version
echo ""

echo "2. Vérification du projet:"
ls -l dist/mcp-stdio.js
echo ""

echo "3. Vérification de la configuration Claude:"
if [ -f ~/Library/Application\ Support/Claude/claude_desktop_config.json ]; then
  echo "✓ Fichier de configuration trouvé"
  cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
else
  echo "✗ Fichier de configuration non trouvé"
fi
echo ""

echo "4. Test du serveur:"
timeout 2s node dist/mcp-stdio.js <<< '{"jsonrpc":"2.0","method":"tools/list","id":1}' 2>&1
echo ""

echo "5. Vérification des dépendances:"
npm list @modelcontextprotocol/sdk --depth=0
echo ""

echo "=== Fin du diagnostic ==="
```

Rendez-le exécutable et lancez-le :

```bash
chmod +x diagnose.sh
./diagnose.sh
```

## Monitoring et Logs

Pour surveiller ce qui se passe, ajoutez du logging structuré dans `mcp-stdio.ts` :

```typescript
// Fonction de log
function log(level: string, message: string, data?: any) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data
  };
  console.error(JSON.stringify(entry));
}

// Utilisation
log('INFO', 'Outil exécuté', { tool: name, duration: Date.now() - start });
log('ERROR', 'Validation échouée', { tool: name, error: error.message });
```

Redirigez les logs vers un fichier :

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["/chemin/dist/mcp-stdio.js"],
      "env": {
        "MCP_LOG_FILE": "/tmp/mcp-server.log"
      }
    }
  }
}
```

Et dans votre code :

```typescript
const logFile = process.env.MCP_LOG_FILE;
if (logFile) {
  const fs = require('fs');
  const originalError = console.error;
  console.error = (...args) => {
    fs.appendFileSync(logFile, args.join(' ') + '\n');
    originalError(...args);
  };
}
```

## Aller Plus Loin

Maintenant que votre serveur fonctionne avec Claude, voici des idées d'amélioration :

### 1. Ajouter Plus d'Outils

Créez de nouveaux outils pour :
- Écrire des fichiers (`writeFile`)
- Exécuter des commandes shell (`execCommand`)
- Interroger des bases de données (`queryDB`)
- Appeler des APIs externes (`fetchAPI`)

### 2. Contexte Persistant

Ajoutez un système de mémoire :

```typescript
const context = new Map();

// Dans un outil
context.set('lastFile', filePath);

// Dans un autre outil
const lastFile = context.get('lastFile');
```

### 3. Notifications

Envoyez des notifications quand des événements importants surviennent :

```typescript
// Surveillez un dossier
fs.watch('/important', (event, filename) => {
  // Notifiez Claude via un mécanisme de votre choix
});
```

### 4. Intégrations Externes

Connectez votre serveur MCP à :
- Slack (envoyer/recevoir des messages)
- GitHub (créer des issues, PRs)
- Jira (gérer des tickets)
- Gmail (lire/envoyer des emails)

## Questions Fréquentes

**Q : Puis-je avoir plusieurs serveurs MCP en même temps ?**

**R :** Oui ! Ajoutez-les dans la configuration :

```json
{
  "mcpServers": {
    "filesystem": { ... },
    "database": { ... },
    "api": { ... }
  }
}
```

**Q : Claude peut-il utiliser mes outils sans me demander ?**

**R :** Non. Claude demande TOUJOURS la permission avant d'exécuter un outil. C'est une garantie de sécurité côté Anthropic.

**Q : Les outils fonctionnent-ils avec Claude sur le web ?**

**R :** Actuellement, non. Les serveurs MCP ne fonctionnent qu'avec Claude Desktop. Mais Anthropic travaille sur d'autres intégrations.

**Q : Puis-je partager mon serveur MCP avec d'autres ?**

**R :** Oui ! Publiez-le sur npm ou GitHub. D'autres pourront l'installer et le configurer dans leur Claude Desktop.

## Conclusion

Félicitations ! Vous avez terminé cette série de 6 articles et construit un serveur MCP complet de A à Z :

✅ **Partie 1** : Vous avez compris le concept MCP et son architecture
✅ **Partie 2** : Vous avez configuré un projet TypeScript professionnel
✅ **Partie 3** : Vous avez créé vos premiers outils fonctionnels
✅ **Partie 4** : Vous avez implémenté le système de découverte automatique
✅ **Partie 5** : Vous avez sécurisé votre serveur avec 4 couches de protection
✅ **Partie 6** : Vous avez connecté tout ça à Claude Desktop

Vous avez maintenant :
- Un serveur MCP production-ready
- Des outils extensibles et sécurisés
- Une intégration complète avec Claude Desktop
- Les compétences pour créer vos propres outils

**Et maintenant ?**

Le MCP ouvre des possibilités infinies. Vous pouvez :
- Automatiser vos tâches répétitives avec Claude
- Créer des assistants spécialisés pour votre domaine
- Intégrer Claude dans vos workflows d'entreprise
- Partager vos outils avec la communauté

Le code que vous avez écrit est solide, sécurisé et maintenable. Il peut servir de base pour des projets bien plus ambitieux. J'ai hâte de voir ce que vous allez construire avec !

---

*Article publié le 17 décembre 2025 par Nicolas Dabène - Expert PHP & PrestaShop avec 15+ ans d'expérience dans l'architecture logicielle et l'intégration d'IA*

**Série complète MCP :**
- [Partie 1 : Comprendre le Model Context Protocol](/articles/2025/10/23/comprendre-mcp-conversation-simple)
- [Partie 2 : Setup du Projet TypeScript](/articles/2025/10/30/setup-serveur-mcp-typescript)
- [Partie 3 : Créer l'Outil readFile](/articles/2025/11/12/creer-votre-premier-outil-mcp-l-outil-readfile-explique)
- [Partie 4 : Système de Découverte](/articles/2025/12/03/menu-mcp-comment-l-ia-decouvre-et-utilise-vos-outils)
- [Partie 5 : Sécurité et Permissions](/articles/2025/12/10/securiser-serveur-mcp-permissions-validation-protection)
- [Partie 6 : Connexion Claude Desktop](/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete) ← Vous êtes ici

**Merci d'avoir suivi cette série ! N'hésitez pas à partager vos créations MCP, je serais ravi de les découvrir.** 🚀
