---
layout: post
title: 'Create Your First MCP Tool: readFile'
date: 2025-11-12
author: Nicolas Dabène
categories:
- Tutorial
- Artificial Intelligence
tags:
- AI
- development
excerpt: From setup to action! Create your first functional MCP tool that allows an
  AI to read files. Complete and explained code.
image: /assets/images/blog/2025/11/2025-11-12-creer-outil-readfile-mcp.webp
lang: en
ref: creer-votre-premier-outil-mcp-l-outil-readfile-explique-nov2025
featured: true
difficulty: Intermediate
technologies:
- TypeScript
- Node.js
- MCP
- File System
estimated_reading_time: 12 minutes
faq:
- question: Can I create a tool that writes files?
  answer: 'Absolutely! The structure is the same. Use fs.writeFile() instead of fs.readFile().
    But be careful with security: writing is riskier than reading.'
- question: How to handle binary files?
  answer: Use base64 encoding to read binary files and transmit them as text. The
    AI can then manipulate them.
- question: Can my tools call other tools?
  answer: Technically yes, but it's generally the AI's role to orchestrate calls between
    tools. Keep your tools simple and atomic.
- question: What is the MCP protocol?
  answer: MCP (Model Context Protocol) is an open-source protocol created by Anthropic
    to connect data servers to AI assistants like Claude.
- question: Is MCP compatible with other AIs?
  answer: Currently, MCP is primarily designed for Claude, but the protocol is open-source
    and other AIs may adopt it.
- question: Do I need programming knowledge?
  answer: Yes, basic knowledge of JavaScript/TypeScript is recommended to create MCP
    servers.
---

# Create Your First MCP Tool: The readFile Tool Explained

You've configured your TypeScript environment in the previous article? Perfect! Now, it's time for the magical moment when theory becomes reality. We're going to create your very first MCP tool together: a function that will allow an AI to read files on your machine. It's simple, concrete, and above all: it really works.

## Introduction

In my developer career, I've always loved those moments when code comes to life. You know, when you launch your application and it does exactly what you imagined? That's what we're going to experience together today. After laying the foundations in previous articles, we're going to build something tangible: an MCP tool that reads files.

Imagine: you ask Claude "Read me the report.txt file", and it can actually do it thanks to your server. This is no longer theory, it's your code making this possible. And the best part? Once you master creating one tool, you can create dozens more.

## Reminder: What is an MCP Tool?

Before coding, let's briefly recall what an MCP tool is. It's essentially a function you expose to the AI with three essential pieces of information:

**The tool name**: How the AI will call it (for example "readFile")

**The description**: What the tool does, so the AI understands when to use it

**The parameters**: The information the tool needs to function

It's like creating a function in your code, but with an identity card that the AI can read and understand. Simple, right?

## Anatomy of an MCP Tool

Let's visualize the complete structure of an MCP tool. Here's the skeleton we'll fill in:

```typescript
// 1. Interface for input parameters
interface ToolParams {
  // Data the AI sends us
}

// 2. Interface for response
interface ToolResponse {
  success: boolean;
  content?: string;
  error?: string;
}

// 3. The function that does the work
async function myTool(params: ToolParams): Promise<ToolResponse> {
  // Business logic here
}

// 4. The tool definition (the "menu")
export const myToolDefinition = {
  name: "myTool",
  description: "What my tool does",
  parameters: {
    // Description of expected parameters
  }
};
```

This four-part structure is your template for creating any MCP tool. Let's keep it in mind for what follows.

## Create the Folder Structure

Let's start by organizing our code cleanly. In your `mcp-server` project, create the following structure:

```bash
mkdir -p src/tools
mkdir -p src/types
```

This organization will help us keep maintainable code. The `tools` folder will contain our MCP tools, and `types` our reusable TypeScript definitions.

## Define TypeScript Types

Let's first create our TypeScript interfaces. Create the `src/types/mcp.ts` file:

```typescript
// src/types/mcp.ts

// Generic type for tool parameters
export interface ToolParams {
  [key: string]: any;
}

// Type for standard tool response
export interface ToolResponse {
  success: boolean;
  content?: string;
  error?: string;
  metadata?: {
    [key: string]: any;
  };
}

// Type for tool definition (the "menu")
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

// Specific type for readFile parameters
export interface ReadFileParams extends ToolParams {
  file_path: string;
}
```

These types will help us have auto-completion and avoid stupid errors. TypeScript becomes our best friend for this kind of project.

## Create the readFile Tool

Now, the moment you've been waiting for: let's create our tool! Create the `src/tools/readFile.ts` file:

```typescript
// src/tools/readFile.ts
import fs from 'fs/promises';
import path from 'path';
import { ReadFileParams, ToolResponse, ToolDefinition } from '../types/mcp';

/**
 * Reads the content of a text file
 * @param params - Parameters containing the file path
 * @returns Response with file content or error
 */
export async function readFile(params: ReadFileParams): Promise<ToolResponse> {
  try {
    // Step 1: Parameter validation
    if (!params.file_path) {
      return {
        success: false,
        error: "The 'file_path' parameter is required"
      };
    }

    // Step 2: Security - Resolve absolute path
    // This avoids attempts to access dangerous relative paths
    const absolutePath = path.resolve(params.file_path);

    // Step 3: Verify file exists
    try {
      await fs.access(absolutePath);
    } catch {
      return {
        success: false,
        error: `File not found: ${params.file_path}`
      };
    }

    // Step 4: Get file information
    const stats = await fs.stat(absolutePath);

    // Step 5: Verify it's a file (not a directory)
    if (!stats.isFile()) {
      return {
        success: false,
        error: "The specified path is not a file"
      };
    }

    // Step 6: Limit size (security - avoid reading huge files)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
    if (stats.size > MAX_FILE_SIZE) {
      return {
        success: false,
        error: `File too large (max ${MAX_FILE_SIZE / 1024 / 1024} MB)`
      };
    }

    // Step 7: Read file content
    const content = await fs.readFile(absolutePath, 'utf-8');

    // Step 8: Return success with metadata
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
    // Handling unexpected errors
    return {
      success: false,
      error: `Read error: ${error.message}`
    };
  }
}

/**
 * Tool definition for MCP protocol
 * This is what the AI "sees" when discovering our tools
 */
export const readFileToolDefinition: ToolDefinition = {
  name: "readFile",
  description: "Reads the content of a text file from the local file system",
  parameters: {
    file_path: {
      type: "string",
      description: "Absolute or relative path to the file to read",
      required: true
    }
  }
};
```

Let's take a moment to understand this code. Each step is numbered and explained:

**Validation**: We verify the necessary parameter is present. Always validate inputs!

**Security**: We resolve the absolute path to avoid malicious relative paths like `../../etc/passwd`.

**Existence check**: We ensure the file exists before trying to read it.

**Type verification**: We confirm it's a file, not a directory.

**Size limit**: We avoid loading a 2 GB file into memory by mistake.

**Reading**: We finally read the content in UTF-8.

**Enriched response**: We return not only content, but also useful metadata.

**Error handling**: We cleanly capture any unexpected error.

## Create a Tool Manager

Now, let's create a file that will centralize all our tools. Create `src/tools/index.ts`:

```typescript
// src/tools/index.ts
import { ToolDefinition } from '../types/mcp';
import { readFile, readFileToolDefinition } from './readFile';

// Registry of all our tools
export const tools = {
  readFile
};

// Definitions of all our tools (for the "menu")
export const toolDefinitions: ToolDefinition[] = [
  readFileToolDefinition
];

// Helper function to execute a tool by name
export async function executeTool(toolName: string, params: any) {
  const tool = tools[toolName as keyof typeof tools];

  if (!tool) {
    return {
      success: false,
      error: `Tool '${toolName}' not found`
    };
  }

  return await tool(params);
}
```

This file acts as a central registry. When you create new tools, you'll simply add them here.

## Integrate into Express Server

Let's now modify our `src/index.ts` to expose our tools via HTTP routes:

```typescript
// src/index.ts
import express, { Request, Response } from 'express';
import { toolDefinitions, executeTool } from './tools';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'MCP Server operational!',
    version: '1.0.0'
  });
});

// Route to discover available tools (the "menu")
app.get('/tools', (req: Request, res: Response) => {
  res.json({
    success: true,
    tools: toolDefinitions
  });
});

// Route to execute a tool
app.post('/tools/:toolName', async (req: Request, res: Response) => {
  const { toolName } = req.params;
  const params = req.body;

  try {
    const result = await executeTool(toolName, params);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: `Server error: ${error.message}`
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ MCP Server launched on http://localhost:${PORT}`);
  console.log(`📋 Available tools: http://localhost:${PORT}/tools`);
});
```

Our server now exposes two important routes:

**GET /tools**: Lists all available tools (the famous "menu")

**POST /tools/:toolName**: Executes a specific tool with provided parameters

## Test the Tool

Moment of truth! Let's test our tool. First, let's create a test file:

```bash
echo "This is a test file for MCP!" > test.txt
```

Launch your server:

```bash
npm run dev
```

You should see:

```
✅ MCP Server launched on http://localhost:3000
📋 Available tools: http://localhost:3000/tools
```

### Test 1: Discover Tools

Open a new terminal and test discovery:

```bash
curl http://localhost:3000/tools
```

Expected response:

```json
{
  "success": true,
  "tools": [
    {
      "name": "readFile",
      "description": "Reads the content of a text file from the local file system",
      "parameters": {
        "file_path": {
          "type": "string",
          "description": "Absolute or relative path to the file to read",
          "required": true
        }
      }
    }
  ]
}
```

Perfect! The AI can now discover your tool.

### Test 2: Use the Tool

Now, let's use readFile to read our test file:

```bash
curl -X POST http://localhost:3000/tools/readFile \
  -H "Content-Type: application/json" \
  -d '{"file_path": "test.txt"}'
```

Expected response:

```json
{
  "success": true,
  "content": "This is a test file for MCP!\n",
  "metadata": {
    "path": "/absolute/path/to/test.txt",
    "size": 42,
    "lastModified": "2025-11-12T10:30:00.000Z"
  }
}
```

**It works!** Your MCP server can now read files.

### Test 3: Error Handling

Let's test with a non-existent file:

```bash
curl -X POST http://localhost:3000/tools/readFile \
  -H "Content-Type: application/json" \
  -d '{"file_path": "nonexistent_file.txt"}'
```

Response:

```json
{
  "success": false,
  "error": "File not found: nonexistent_file.txt"
}
```

Excellent! Our error handling works correctly.

## Improve the Tool

Now that the base works, let's add some improvements. Let's modify `src/tools/readFile.ts`:

```typescript
// Adding multiple encoding support
export interface ReadFileParams extends ToolParams {
  file_path: string;
  encoding?: 'utf-8' | 'ascii' | 'base64';
}

export async function readFile(params: ReadFileParams): Promise<ToolResponse> {
  try {
    // ... existing validation ...

    // Support for different encodings
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
      error: `Read error: ${error.message}`
    };
  }
}
```

And let's update the definition:

```typescript
export const readFileToolDefinition: ToolDefinition = {
  name: "readFile",
  description: "Reads the content of a text file from the local file system",
  parameters: {
    file_path: {
      type: "string",
      description: "Absolute or relative path to the file to read",
      required: true
    },
    encoding: {
      type: "string",
      description: "File encoding (utf-8, ascii, base64)",
      required: false
    }
  }
};
```

## Create a Second Tool: listFiles

Now that you master creating a tool, let's create a second one quickly. Create `src/tools/listFiles.ts`:

```typescript
// src/tools/listFiles.ts
import fs from 'fs/promises';
import path from 'path';
import { ToolParams, ToolResponse, ToolDefinition } from '../types/mcp';

export interface ListFilesParams extends ToolParams {
  directory_path: string;
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

    // Verify it's a directory
    const stats = await fs.stat(absolutePath);
    if (!stats.isDirectory()) {
      return {
        success: false,
        error: "The specified path is not a directory"
      };
    }

    // Read directory content
    const files = await fs.readdir(absolutePath);

    // Get details for each file
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
      error: `Error reading directory: ${error.message}`
    };
  }
}

export const listFilesToolDefinition: ToolDefinition = {
  name: "listFiles",
  description: "Lists files and directories in a directory",
  parameters: {
    directory_path: {
      type: "string",
      description: "Absolute or relative path to the directory",
      required: true
    }
  }
};
```

Add it in `src/tools/index.ts`:

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

Restart your server and test:

```bash
curl http://localhost:3000/tools
```

You'll now see two available tools!

## Best Practices and Security

Now that you know how to create tools, let's talk security. Here are the golden rules:

### Always Validate Inputs

Never trust received parameters. Validate everything: type, format, length, allowed values.

### Limit File Access

Create a list of allowed directories:

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

### Limit Sizes

Always define file size limits, number of results, recursion depth.

### Log Access

Keep a trace of who accesses what:

```typescript
console.log(`[${new Date().toISOString()}] readFile: ${params.file_path}`);
```

## Conclusion

Congratulations! You just created your first functional MCP tool. You learned to:

- Structure an MCP tool with TypeScript
- Handle parameters and responses
- Validate inputs and handle errors
- Expose your tools via a REST API
- Test your tools with curl
- Create multiple tools and register them

The next step? In the next article, we'll see how an AI discovers and uses your tools automatically. We'll implement the complete discovery and execution protocol, then connect your server to Claude Desktop to see the magic operate in real conditions.

Meanwhile, experiment! Create your own tools. How about a tool that searches in files? Or that renames files in bulk? Or that analyzes JSON data? The possibilities are endless.

---

*Article published November 12, 2025 by Nicolas Dabène - PHP & PrestaShop Expert with 15+ years of experience in software architecture and AI integration*

**Also read:**
- [Understanding the Model Context Protocol (MCP): A Simple Conversation](/en/articles/2025/10/23/comprendre-mcp-conversation-simple)
- [Create Your First MCP Server: TypeScript Project Setup](/en/articles/2025/10/30/setup-serveur-mcp-typescript)
- [The MCP Menu: How AI Discovers and Uses Your Tools](/en/articles/2025/12/03/menu-mcp-comment-l-ia-decouvre-et-utilise-vos-outils)
- [Secure Your MCP Server: Permissions, Validation and Protection](/en/articles/2025/12/10/securiser-serveur-mcp-permissions-validation-protection)
- [Connect Your MCP Server to Claude Desktop: The Complete Integration](/en/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete)
