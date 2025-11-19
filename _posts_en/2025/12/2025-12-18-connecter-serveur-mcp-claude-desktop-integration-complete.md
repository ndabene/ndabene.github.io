---
layout: post
title: How to Connect MCP Server to Claude?
date: 2025-12-18
author: Nicolas Dabène
categories:
- Tutorial
- Artificial Intelligence
tags:
- API
- AI
- development
excerpt: 'The long-awaited moment: let''s connect your secured MCP server to Claude
  Desktop and see the magic happen in real conditions.'
image: /assets/images/blog/2025/12/2025-12-18-connecter-serveur-mcp-claude-desktop.jpg
featured: true
difficulty: Intermediate
technologies:
- MCP
- Claude Desktop
- TypeScript
- Configuration
estimated_reading_time: 14 minutes
lang: en
ref: connect-mcp-server-claude-desktop-2025
faq:
- question: Can I have multiple MCP servers at the same time?
  answer: Yes! Add them in the JSON configuration with multiple entries in mcpServers.
    Each server will have its own name and configuration.
- question: Can Claude use my tools without asking me?
  answer: No. Claude ALWAYS asks permission before executing a tool. This is a security
    guarantee from Anthropic's side.
- question: Do tools work with Claude on the web?
  answer: Currently, no. MCP servers only work with Claude Desktop. But Anthropic
    is working on other integrations.
- question: Can I share my MCP server with others?
  answer: Yes! Publish it on npm or GitHub. Others can install and configure it in
    their Claude Desktop.
- question: What is the MCP protocol?
  answer: MCP (Model Context Protocol) is an open-source protocol created by Anthropic
    to connect data servers to AI assistants like Claude.
- question: Is MCP compatible with other AIs?
  answer: Currently, MCP is primarily designed for Claude, but the protocol is open-source
    and other AIs may adopt it.
---

# Connect Your MCP Server to Claude Desktop: The Complete Integration

Here we are. After building an MCP server from A to Z, creating functional tools, implementing automatic discovery, and adding four layers of security, it's time to see it all work with a real AI. Today, we're connecting your server to Claude Desktop and you'll finally see Claude use your tools in real time. This is the moment when everything makes sense.

## Introduction

I still remember the first time I saw Claude use one of my MCP tools. After hours of development, testing with curl, validation... seeing it work naturally in a conversation was magical. This is the moment you're going to experience today.

In this final article of the series, we'll configure Claude Desktop to connect to your MCP server, test each tool in real conditions, debug common problems, and explore advanced use cases. By the end, you'll have a personal AI assistant capable of interacting with your files, your data, your systems. All securely.

## Prerequisites

Before starting, make sure you have:

**Claude Desktop installed**: Download it from claude.ai/download if not already done

**Your functional MCP server**: Parts 1-5 of this series must be complete

**Node.js and npm**: To run your server

**A Claude account**: Free or Pro, both work

## Understanding the Connection Architecture

Before configuring, let's visualize how Claude Desktop communicates with your server:

```
┌─────────────────┐
│  Claude Desktop │
│   (Interface)   │
└────────┬────────┘
         │
         │ Reads configuration
         ↓
┌─────────────────┐
│  Configuration  │
│  claude_desktop │
│   _config.json  │
└────────┬────────┘
         │
         │ Launches automatically
         ↓
┌─────────────────┐
│  Your Server    │
│      MCP        │
│  (Node.js/TS)   │
└────────┬────────┘
         │
         │ Accesses your resources
         ↓
┌─────────────────┐
│   Files /       │
│   Data /        │
│   Systems       │
└─────────────────┘
```

Claude Desktop reads a configuration file, launches your MCP server in the background, then communicates with it via stdio (standard input/output). Your server doesn't even need to be an HTTP server for this integration!

## Adapting the Server for Stdio

Until now, our server used Express and HTTP. For Claude Desktop integration, we need to create a version that communicates via stdio. Create `src/mcp-stdio.ts`:

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
 * MCP server for Claude Desktop (stdio)
 */
class MCPStdioServer {
  private server: Server;
  private pathValidator: PathValidator;

  constructor() {
    // Initialize path validator
    this.pathValidator = new PathValidator([
      process.cwd(),
      process.env.HOME || '/home',
    ]);

    // Create MCP server
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
   * MCP handlers configuration
   */
  private setupHandlers() {
    // Handler to list tools
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

    // Handler to execute a tool
    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request) => {
        const { name, arguments: args } = request.params;

        try {
          // Get tool description
          const toolDescription = toolRegistry.getDescription(name);

          if (!toolDescription) {
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    success: false,
                    error: `Tool '${name}' not found`,
                  }),
                },
              ],
            };
          }

          // Validate parameters
          ParameterValidator.validate(args || {}, toolDescription.input_schema);

          // Specific path validation for file tools
          if (name === 'readFile' || name === 'listFiles' || name === 'searchFiles') {
            const pathParam = args.file_path || args.directory_path;
            if (pathParam) {
              args.validated_path = this.pathValidator.validatePath(pathParam);
            }
          }

          // Execute tool
          console.error(`[MCP] Execution: ${name}`);
          const result = await toolRegistry.execute(name, args);

          // Format response
          return {
            content: [
              {
                type: 'text',
                text: result.success ? result.content || 'Operation successful' : `Error: ${result.error}`,
              },
            ],
          };

        } catch (error: any) {
          console.error(`[MCP] Error:`, error);

          if (error instanceof ValidationError) {
            return {
              content: [
                {
                  type: 'text',
                  text: `Validation error: ${error.message}`,
                },
              ],
              isError: true,
            };
          }

          return {
            content: [
              {
                type: 'text',
                text: `Error: ${error.message}`,
              },
            ],
            isError: true,
          };
        }
      }
    );
  }

  /**
   * Start the server
   */
  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    console.error('[MCP] Server started and connected via stdio');
    console.error(`[MCP] Available tools: ${toolRegistry.count()}`);
  }
}

// Server startup
const server = new MCPStdioServer();
server.start().catch((error) => {
  console.error('[MCP] Fatal error:', error);
  process.exit(1);
});
```

**Important**: Note the use of `console.error()` for logs. Why? Because stdout is reserved for MCP communication. Logs must go to stderr.

Install the MCP SDK:

```bash
npm install @modelcontextprotocol/sdk
```

Compile your project:

```bash
npx tsc
```

Test that it compiles without errors. The compiled file will be in `dist/mcp-stdio.js`.

## Claude Desktop Configuration

Claude Desktop looks for its configuration at a specific location depending on your OS:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Linux**: `~/.config/Claude/claude_desktop_config.json`

Create or edit this file with the following configuration:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "node",
      "args": [
        "/absolute/path/to/your/project/dist/mcp-stdio.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

**Replace `/absolute/path/to/your/project`** with the real path to your project folder.

To get the absolute path easily:

```bash
cd /your/project/mcp-server
pwd
# Copy the result and add /dist/mcp-stdio.js
```

Complete example:

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

**Tip**: Add the `PATH` variable if you have "command not found" issues.

## Starting Claude Desktop

1. **Completely close Claude Desktop** if it's open
2. **Restart Claude Desktop**
3. **Open Developer Tools** (on macOS: View → Developer → Toggle Developer Tools)
4. **Look at the console** to see connection logs

If everything works, you should see in the console:

```
[MCP] Server started and connected via stdio
[MCP] Available tools: 3
```

## Verifying Tools Are Available

In Claude Desktop, start a new conversation and type:

```
What tools do you have available?
```

Claude should respond something like:

> I have several tools to interact with the file system:
>
> 1. **readFile**: Allows reading the content of a text file
> 2. **listFiles**: Lists files and folders in a directory
> 3. **searchFiles**: Searches for files by name
>
> What would you like me to do?

**If Claude doesn't see your tools**, go to the Debugging section below.

## First Test: Reading a File

Let's create a test file in your project:

```bash
echo "This is a test of the MCP server with Claude Desktop!" > test-claude.txt
```

Now, in Claude, ask:

```
Read the test-claude.txt file in the current directory and tell me what it contains.
```

Claude will:
1. Understand it needs to use the `readFile` tool
2. Ask your permission
3. Execute the tool
4. Show you the content

**Example of real conversation**:

> **You**: Read the test-claude.txt file
>
> **Claude**: I'll read the test-claude.txt file for you.
>
> [Permission request appears]
>
> **[You click "Authorize"]**
>
> **Claude**: The file contains: "This is a test of the MCP server with Claude Desktop!"

**Magical, isn't it?** You just saw Claude use YOUR code, YOUR tools, in real time.

## Advanced Test: List and Search

Now let's test more complex interactions:

```
List all TypeScript files in the src folder
```

Claude will:
1. Use `listFiles` to list src/
2. Filter .ts files in its response
3. Present you with an organized list

Or try:

```
Find all files that contain "security" in their name
```

Claude will use `searchFiles` with the right parameter.

## Validation Test: Security in Action

Let's now see our security working:

```
Read the file ../../../../etc/passwd
```

Claude will attempt to use `readFile` with this path, but your `PathValidator` will block the request. You'll see an error:

> I couldn't read this file. The error indicates: "Paths with ".." are not allowed (path traversal)"

**Perfect!** Your security works even with Claude.

## Advanced Use Cases

Now that the connection works, let's explore real scenarios:

### 1. Code Analysis

```
Analyze all TypeScript files in the src/tools folder and tell me how many lines of code there are in total
```

Claude will:
- List files in src/tools
- Read each .ts file
- Count lines
- Give you a report

### 2. Automatic Documentation

```
Create a README.md that documents all available tools in src/tools with their parameters
```

Claude will:
- List files
- Read each tool
- Extract important information
- Generate a formatted README

### 3. Search and Summary

```
Find all files that mention "validation" and give me a summary of how validation is implemented
```

Claude will:
- Search for relevant files
- Read them
- Analyze the code
- Synthesize the information

### 4. Assisted Refactoring

```
Look at the src/tools/readFile.ts file and suggest performance improvements
```

Claude will:
- Read the file
- Analyze the code with its expertise
- Propose concrete optimizations

## Debugging: Common Problems

### Problem 1: Claude doesn't see the tools

**Symptom**: Claude responds "I don't have tools available for that"

**Solutions**:

1. Check configuration:
```bash
# macOS
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Check that path is correct
ls /path/to/your/project/dist/mcp-stdio.js
```

2. Check compilation:
```bash
cd your-project
npx tsc
ls dist/mcp-stdio.js  # Must exist
```

3. Test manually:
```bash
node dist/mcp-stdio.js
# Shouldn't crash immediately
```

4. Look at Claude Desktop's Developer Tools:
   - Search for errors in red
   - Search for "[MCP]" in logs

### Problem 2: "command not found" error

**Symptom**: In Developer Tools: "Error: spawn node ENOENT"

**Solution**: Add full PATH in config:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "/usr/local/bin/node",
      "args": ["/absolute/path/dist/mcp-stdio.js"],
      "env": {
        "PATH": "/usr/local/bin:/usr/bin:/bin"
      }
    }
  }
}
```

Find your node path with:
```bash
which node
```

### Problem 3: Server crashes immediately

**Symptom**: Logs show server starts then stops

**Checks**:

1. Test server standalone:
```bash
node dist/mcp-stdio.js
# Type something and Enter
# Server should stay active
```

2. Check dependencies:
```bash
npm install
npm list @modelcontextprotocol/sdk
```

3. Look at stderr:
```bash
node dist/mcp-stdio.js 2>error.log
# Look at error.log for errors
```

## Conclusion

Congratulations! You've completed this 6-article series and built a complete MCP server from A to Z:

✅ **Part 1**: You understood the MCP concept and its architecture
✅ **Part 2**: You configured a professional TypeScript project
✅ **Part 3**: You created your first functional tools
✅ **Part 4**: You implemented automatic discovery system
✅ **Part 5**: You secured your server with 4 protection layers
✅ **Part 6**: You connected it all to Claude Desktop

You now have:
- A production-ready MCP server
- Extensible and secure tools
- Complete integration with Claude Desktop
- The skills to create your own tools

**And now?**

MCP opens infinite possibilities. You can:
- Automate your repetitive tasks with Claude
- Create specialized assistants for your domain
- Integrate Claude into your enterprise workflows
- Share your tools with the community

The code you've written is solid, secure, and maintainable. It can serve as a foundation for much more ambitious projects. I can't wait to see what you'll build with it!

---

*Article published on December 17, 2025 by Nicolas Dabène - PHP & PrestaShop Expert with 15+ years of experience in software architecture and AI integration*

**Complete MCP series:**
- [Part 1: Understanding the Model Context Protocol](/en/articles/2025/10/23/comprendre-mcp-conversation-simple)
- [Part 2: TypeScript Project Setup](/en/articles/2025/10/30/setup-serveur-mcp-typescript)
- [Part 3: Create the readFile Tool](/en/articles/2025/11/12/creer-votre-premier-outil-mcp-l-outil-readfile-explique)
- [Part 4: Discovery System](/en/articles/2025/12/03/menu-mcp-comment-l-ia-decouvre-et-utilise-vos-outils)
- [Part 5: Security and Permissions](/en/articles/2025/12/10/securiser-serveur-mcp-permissions-validation-protection)
- [Part 6: Claude Desktop Connection](/en/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete) ← You are here

**Thank you for following this series! Feel free to share your MCP creations, I'd love to discover them.**
