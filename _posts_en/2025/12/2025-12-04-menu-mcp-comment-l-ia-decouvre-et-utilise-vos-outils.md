---
layout: post
title: 'The MCP Menu: How AI Discovers and Uses Your Tools'
date: 2025-12-04
author: Nicolas Dabène
categories:
- Tutorial
- Artificial Intelligence
tags:
- API
- AI
- SEO
- development
excerpt: Your AI can now read files. But how does it discover your tools? Let's dive into the MCP discovery system.
image: /assets/images/blog/2025/12/2025-12-04-menu-mcp-decouverte-outils.jpg
featured: true
difficulty: Intermediate
technologies:
- TypeScript
- MCP
- REST API
- JSON
estimated_reading_time: 14 minutes
lang: en
ref: mcp-menu-ai-tool-discovery-2025
faq:
- question: Can I have multiple MCP servers with different tools?
  answer: Absolutely! Each server can expose its own tools. The AI can even combine tools from multiple servers in the same conversation.
- question: How to handle tools requiring authentication?
  answer: MCP doesn't specify standard authentication, but you can implement JWT, API keys, or OAuth according to your needs. The discovery endpoint can be protected.
- question: Can tools communicate with each other?
  answer: Yes, but it's generally the AI's role to orchestrate calls. However, your tools can call other tools via the registry if necessary.
- question: How to version my tools?
  answer: Include the version in the tool description and server metadata. The AI can then decide if it supports this version.
---
# The MCP Menu: How AI Discovers and Uses Your Tools

You created your first `readFile` tool in the previous article. Congratulations! But imagine arriving at a restaurant without a menu. How would you know what's available? This is exactly the problem that the MCP discovery system solves. Today, we'll implement the complete "menu" that allows an AI to automatically discover all your tools and use them intelligently.

## Introduction

In my 15 years of API development, I've seen many integration systems. But MCP has something elegant: auto-discovery. Rather than hard-coding each integration, the AI queries your server to discover what it can do. It's as if your API could introduce itself.

This approach changes everything. Instead of having specific connectors for each AI, you create a standard that all MCP-compatible AIs can understand. Once you master this system, you can expose dozens of tools without ever modifying the AI's code.

## Reminder: The Complete Journey of a Request

Before coding, let's visualize the complete journey of an interaction between an AI and your MCP server. This is crucial to understand where the discovery system fits.

### Phase 1: Discovery (what we'll code today)

**You**: "Claude, list the files in my projects folder"

**Claude**: *"I don't know the tools of this server yet. Let me discover them..."*

**Claude → Server**: `GET /mcp/tools`

**Server → Claude**: Here are all my available tools with their descriptions

**Claude**: *"Ah! There's a `listFiles` tool. That's exactly what I need."*

### Phase 2: Validation (handled by Claude application)

**Claude Application → You**: "Do you authorize the use of the `listFiles` tool on the `/projects` folder?"

**You**: "Yes, authorized"

### Phase 3: Execution

**Claude → Server**: `POST /mcp/execute` with `{"tool": "listFiles", "params": {"path": "/projects"}}`

**Server → Claude**: Execution result

**Claude → You**: "Here are the files in your projects folder: ..."

Today, we focus on Phase 1: discovery.

## The Standard MCP Discovery Format

The MCP protocol defines a standard format for describing your tools. Here's the JSON structure the AI expects:

```json
{
  "protocol_version": "1.0",
  "server_info": {
    "name": "My MCP Server",
    "version": "1.0.0",
    "description": "MCP server for local file access"
  },
  "tools": [
    {
      "name": "readFile",
      "description": "Reads the content of a text file",
      "input_schema": {
        "type": "object",
        "properties": {
          "file_path": {
            "type": "string",
            "description": "Path to the file to read"
          }
        },
        "required": ["file_path"]
      }
    }
  ]
}
```

This structure contains three key pieces of information:

**protocol_version**: Which version of MCP you're implementing

**server_info**: Metadata about your server

**tools**: The complete list of your tools with their input schema

The `input_schema` uses the JSON Schema standard. It's like auto-generated documentation that the AI can read and understand.

## Creating the Protocol Manager

Let's start by structuring our MCP protocol implementation. Create the file `src/mcp/protocol.ts`:

```typescript
// src/mcp/protocol.ts

/**
 * Implemented MCP protocol version
 */
export const MCP_PROTOCOL_VERSION = "1.0";

/**
 * Server information
 */
export interface ServerInfo {
  name: string;
  version: string;
  description: string;
  author?: string;
  capabilities?: string[];
}

/**
 * Input schema for a tool (JSON Schema)
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
 * Complete description of an MCP tool
 */
export interface ToolDescription {
  name: string;
  description: string;
  input_schema: InputSchema;
}

/**
 * Complete discovery response
 */
export interface DiscoveryResponse {
  protocol_version: string;
  server_info: ServerInfo;
  tools: ToolDescription[];
}

/**
 * Our server information
 */
export const SERVER_INFO: ServerInfo = {
  name: "MCP File Server",
  version: "1.0.0",
  description: "MCP server for local file management",
  author: "Nicolas Dabène",
  capabilities: [
    "file_reading",
    "directory_listing",
    "file_search"
  ]
};
```

These TypeScript types give us a solid structure. Each tool will have to provide a `ToolDescription` compliant with this format.

## Converting Our Tools to MCP Format

Currently, our tools have a simple definition. Let's transform them to the complete MCP format. Modify `src/tools/readFile.ts`:

```typescript
// src/tools/readFile.ts
import fs from 'fs/promises';
import path from 'path';
import { ToolResponse } from '../types/mcp';
import { ToolDescription, InputSchema } from '../mcp/protocol';

export interface ReadFileParams {
  file_path: string;
  encoding?: 'utf-8' | 'ascii' | 'base64';
}

export async function readFile(params: ReadFileParams): Promise<ToolResponse> {
  try {
    if (!params.file_path) {
      return {
        success: false,
        error: "The 'file_path' parameter is required"
      };
    }

    const absolutePath = path.resolve(params.file_path);

    try {
      await fs.access(absolutePath);
    } catch {
      return {
        success: false,
        error: `File not found: ${params.file_path}`
      };
    }

    const stats = await fs.stat(absolutePath);

    if (!stats.isFile()) {
      return {
        success: false,
        error: "The specified path is not a file"
      };
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (stats.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `File too large (max ${MAX_FILE_SIZE / 1024 / 1024} MB)`
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
      error: `Error reading file: ${error.message}`
    };
  }
}

/**
 * Input schema in JSON Schema format
 */
const readFileInputSchema: InputSchema = {
  type: "object",
  properties: {
    file_path: {
      type: "string",
      description: "Absolute or relative path to the file to read"
    },
    encoding: {
      type: "string",
      description: "File encoding",
      enum: ["utf-8", "ascii", "base64"],
      default: "utf-8"
    }
  },
  required: ["file_path"]
};

/**
 * Complete MCP description of the tool
 */
export const readFileDescription: ToolDescription = {
  name: "readFile",
  description: "Reads the content of a text file from the local file system. Supports different encodings (UTF-8, ASCII, Base64).",
  input_schema: readFileInputSchema
};
```

See the difference? We now have:

**A formal JSON schema** that describes exactly the expected parameters

**Enriched metadata** like default values and enumerations

**A detailed description** that helps the AI understand when to use this tool

Let's do the same for `listFiles`. Modify `src/tools/listFiles.ts`:

```typescript
// src/tools/listFiles.ts
import fs from 'fs/promises';
import path from 'path';
import { ToolResponse } from '../types/mcp';
import { ToolDescription, InputSchema } from '../mcp/protocol';

export interface ListFilesParams {
  directory_path: string;
  include_hidden?: boolean;
  recursive?: boolean;
}

export async function listFiles(params: ListFilesParams): Promise<ToolResponse> {
  try {
    if (!params.directory_path) {
      return {
        success: false,
        error: "The 'directory_path' parameter is required"
      };
    }

    const absolutePath = path.resolve(params.directory_path);

    const stats = await fs.stat(absolutePath);
    if (!stats.isDirectory()) {
      return {
        success: false,
        error: "The specified path is not a directory"
      };
    }

    // Read directory content
    let files = await fs.readdir(absolutePath);

    // Filter hidden files if necessary
    if (!params.include_hidden) {
      files = files.filter(file => !file.startsWith('.'));
    }

    // Get details for each file
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
      error: `Error reading directory: ${error.message}`
    };
  }
}

const listFilesInputSchema: InputSchema = {
  type: "object",
  properties: {
    directory_path: {
      type: "string",
      description: "Absolute or relative path to the directory to list"
    },
    include_hidden: {
      type: "boolean",
      description: "Include hidden files (starting with .)",
      default: false
    },
    recursive: {
      type: "boolean",
      description: "List subdirectories recursively",
      default: false
    }
  },
  required: ["directory_path"]
};

export const listFilesDescription: ToolDescription = {
  name: "listFiles",
  description: "Lists files and folders in a given directory. Can include hidden files and support recursion.",
  input_schema: listFilesInputSchema
};
```

## Creating the Centralized Tool Registry

Now, let's create a registry that gathers all our tools. Create `src/mcp/registry.ts`:

```typescript
// src/mcp/registry.ts
import { ToolDescription } from './protocol';
import { ToolResponse } from '../types/mcp';
import { readFile, readFileDescription } from '../tools/readFile';
import { listFiles, listFilesDescription } from '../tools/listFiles';

/**
 * Type for a tool function
 */
type ToolFunction = (params: any) => Promise<ToolResponse>;

/**
 * Central registry of all available tools
 */
class ToolRegistry {
  private tools: Map<string, ToolFunction> = new Map();
  private descriptions: Map<string, ToolDescription> = new Map();

  /**
   * Register a new tool
   */
  register(description: ToolDescription, implementation: ToolFunction) {
    this.tools.set(description.name, implementation);
    this.descriptions.set(description.name, description);
    console.log(`✅ Tool registered: ${description.name}`);
  }

  /**
   * Get all available tools
   */
  getAllDescriptions(): ToolDescription[] {
    return Array.from(this.descriptions.values());
  }

  /**
   * Get the description of a specific tool
   */
  getDescription(toolName: string): ToolDescription | undefined {
    return this.descriptions.get(toolName);
  }

  /**
   * Execute a tool
   */
  async execute(toolName: string, params: any): Promise<ToolResponse> {
    const tool = this.tools.get(toolName);

    if (!tool) {
      return {
        success: false,
        error: `Tool '${toolName}' not found. Available tools: ${Array.from(this.tools.keys()).join(', ')}`
      };
    }

    try {
      return await tool(params);
    } catch (error: any) {
      return {
        success: false,
        error: `Error executing '${toolName}': ${error.message}`
      };
    }
  }

  /**
   * Check if a tool exists
   */
  has(toolName: string): boolean {
    return this.tools.has(toolName);
  }

  /**
   * Get the number of registered tools
   */
  count(): number {
    return this.tools.size;
  }
}

// Singleton instance of the registry
export const toolRegistry = new ToolRegistry();

// Register all our tools at startup
toolRegistry.register(readFileDescription, readFile);
toolRegistry.register(listFilesDescription, listFiles);
```

This registry is the heart of our system. It's the one that:

**Maintains the list of all available tools**

**Manages tool execution** in a unified way

**Provides descriptions** for discovery

**Handles errors** in a centralized manner

## Implementing MCP Endpoints

Now let's modify our Express server to implement standard MCP endpoints. Replace `src/index.ts`:

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
// STANDARD MCP ROUTES
// ============================================

/**
 * Root endpoint - Server information
 */
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'MCP File Server',
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
 * Discovery endpoint - The complete "menu"
 * This is where the AI discovers all your tools
 */
app.get('/mcp/tools', (req: Request, res: Response) => {
  const response: DiscoveryResponse = {
    protocol_version: MCP_PROTOCOL_VERSION,
    server_info: SERVER_INFO,
    tools: toolRegistry.getAllDescriptions()
  };

  console.log(`📋 Discovery requested - ${toolRegistry.count()} available tools`);
  res.json(response);
});

/**
 * Unified execution endpoint
 * Format: POST /mcp/execute
 * Body: { "tool": "toolName", "params": {...} }
 */
app.post('/mcp/execute', async (req: Request, res: Response) => {
  const { tool, params } = req.body;

  // Validation
  if (!tool) {
    return res.status(400).json({
      success: false,
      error: "The 'tool' parameter is required"
    });
  }

  console.log(`⚙️  Execution requested: ${tool}`);

  // Execution via registry
  const result = await toolRegistry.execute(tool, params || {});

  // Log result
  if (result.success) {
    console.log(`✅ Execution successful: ${tool}`);
  } else {
    console.log(`❌ Execution failed: ${tool} - ${result.error}`);
  }

  res.json(result);
});

/**
 * Endpoint for specific tool description
 */
app.get('/mcp/tools/:toolName', (req: Request, res: Response) => {
  const { toolName } = req.params;
  const description = toolRegistry.getDescription(toolName);

  if (!description) {
    return res.status(404).json({
      success: false,
      error: `Tool '${toolName}' not found`
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
// BACKWARD COMPATIBILITY (optional)
// ============================================

/**
 * Old direct endpoint (for quick tests)
 * @deprecated Use /mcp/execute instead
 */
app.post('/tools/:toolName', async (req: Request, res: Response) => {
  const { toolName } = req.params;
  const params = req.body;

  console.log(`⚠️  Using old endpoint /tools/${toolName} (deprecated)`);

  const result = await toolRegistry.execute(toolName, params);
  res.json(result);
});

// ============================================
// SERVER STARTUP
// ============================================

app.listen(PORT, () => {
  console.log('═══════════════════════════════════════');
  console.log('🚀 MCP File Server');
  console.log('═══════════════════════════════════════');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📋 Discovery: http://localhost:${PORT}/mcp/tools`);
  console.log(`⚙️  Execution: POST http://localhost:${PORT}/mcp/execute`);
  console.log(`🔧 Available tools: ${toolRegistry.count()}`);
  console.log('═══════════════════════════════════════');
});
```

Our server now implements the complete MCP protocol with three main endpoints:

**GET /mcp/tools**: Discovery of all tools

**POST /mcp/execute**: Unified execution of any tool

**GET /mcp/tools/:toolName**: Details of a specific tool

## Testing the Discovery System

Let's restart our server and test the complete system:

```bash
npm run dev
```

You should see:

```
═══════════════════════════════════════
🚀 MCP File Server
═══════════════════════════════════════
📍 URL: http://localhost:3000
📋 Discovery: http://localhost:3000/mcp/tools
⚙️  Execution: POST http://localhost:3000/mcp/execute
🔧 Available tools: 2
═══════════════════════════════════════
✅ Tool registered: readFile
✅ Tool registered: listFiles
```

### Test 1: Complete Discovery

```bash
curl http://localhost:3000/mcp/tools | json_pp
```

Perfect! The AI can now discover all your tools with their complete descriptions.

### Test 2: Execution via Unified Endpoint

```bash
curl -X POST http://localhost:3000/mcp/execute \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "readFile",
    "params": {
      "file_path": "test.txt"
    }
  }'
```

## Understanding the Architectural Impact

This discovery system fundamentally changes the architecture of AI integrations:

### Before MCP: Rigid Integrations

Each AI had to be specifically programmed for each tool:

```typescript
// Code in the AI to integrate a specific tool
if (userWantsToReadFile) {
  callReadFileAPI(userParams);
} else if (userWantsToListFiles) {
  callListFilesAPI(userParams);
}
```

### After MCP: Auto-Discovery

The AI dynamically discovers capabilities:

```typescript
// The AI can now discover and use any tool
const tools = await discoverTools();
const tool = tools.find(t => matchesUserRequest(t));
await executeTool(tool.name, userParams);
```

## Conclusion: A New Paradigm

The MCP discovery system represents a paradigm shift in AI integration. Instead of creating specific connectors for each use case, you create standardized "building blocks" that all compatible AIs can dynamically assemble.

In this article, we saw how to:

- Implement the complete MCP protocol with discovery and execution
- Create a centralized tool registry
- Structure tools with JSON Schema
- Test the system with HTTP clients
- Simulate complete AI-server interaction

The next step? Connect your MCP server to a real AI like Claude Desktop. You'll then see the magic happen: your AI will be able to actually read your files, list your folders, and use all your custom tools.

MCP is not just a technical protocol: it's a new way of thinking about human-AI integration. Your tools become natural extensions of AI capabilities, without technical friction.

---

*Article published on November 12, 2025 by Nicolas Dabène - PHP & PrestaShop Expert with 15+ years of experience in software architecture and AI integration*

**Also read:**
- [Understanding the Model Context Protocol (MCP): A Simple Conversation](/en/articles/2025/10/23/comprendre-mcp-conversation-simple)
- [Create Your First MCP Server: TypeScript Project Setup](/en/articles/2025/10/30/setup-serveur-mcp-typescript)
- [Create Your First MCP Tool: The readFile Tool Explained](/en/articles/2025/11/12/creer-votre-premier-outil-mcp-l-outil-readfile-explique)
- [Secure Your MCP Server: Permissions, Validation and Protection](/en/articles/2025/12/10/securiser-serveur-mcp-permissions-validation-protection)
- [Connect Your MCP Server to Claude Desktop: The Complete Integration](/en/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete)
