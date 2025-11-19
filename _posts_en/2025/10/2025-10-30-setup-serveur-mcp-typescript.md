---
layout: post
title: 'Create Your First MCP Server: Setup'
date: 2025-10-30
author: Nicolas Dabène
lang: en
ref: setup-serveur-mcp-typescript-2025-10
categories:
- Tutorial
- Artificial Intelligence
tags:
- AI
- development
excerpt: Let's get practical! Discover how to initialize a TypeScript project to create
  your first MCP server in minutes.
image: /assets/images/blog/2025/10/2025-10-30-setup-serveur-mcp-typescript.jpg
featured: false
difficulty: Beginner
technologies:
- TypeScript
- Node.js
- Express
- MCP
estimated_reading_time: 8 minutes
howto:
  name: Create Your First MCP Server with TypeScript
  description: Step-by-step guide to initialize a TypeScript project and configure
    the foundations of a functional MCP server in minutes
  total_time: PT30M
  estimated_cost:
    currency: EUR
    value: '0'
  tools:
  - Node.js 16+
  - npm (Node Package Manager)
  - Visual Studio Code or code editor
  - Terminal (Bash, Zsh, PowerShell)
  supplies:
  - Internet connection to download packages
  - Basic JavaScript/TypeScript knowledge
  steps:
  - name: Create folder and initialize project
    text: Create a new folder for your project with `mkdir mcp-server` then enter
      it with `cd mcp-server`. Initialize a Node.js project with `npm init -y` to
      automatically create the package.json file with default values.
  - name: Install TypeScript
    text: Install TypeScript and its development dependencies with `npm install typescript
      ts-node @types/node --save-dev`. This command installs the TypeScript compiler,
      ts-node runner and type definitions for Node.js.
  - name: Configure TypeScript
    text: 'Generate the TypeScript configuration file with `npx tsc --init`. Modify
      the generated tsconfig.json file to set target: ES2020, module: commonjs, outDir:
      ./dist, rootDir: ./src, and enable strict mode for better code security.'
  - name: Install Express.js
    text: Install Express and its TypeScript types with `npm install express` and
      `npm install @types/express --save-dev`. Express will be the web framework handling
      HTTP requests for your MCP server.
  - name: Create project structure
    text: Create the source folder with `mkdir src` then create the main file `src/index.ts`.
      This structure separates your TypeScript source code (in src/) from compiled
      JavaScript code (which will go in dist/).
  - name: Configure npm scripts
    text: 'Add development and build scripts in package.json: ''dev'' to launch ts-node
      in watch mode, ''build'' to compile TypeScript, and ''start'' to run compiled
      code. These scripts facilitate development and deployment.'
  - name: Verify installation
    text: Create a simple test file in src/index.ts with a console.log('Hello MCP!').
      Run `npm run dev` to verify everything works. If you see the message in the
      terminal, your environment is correctly configured.
faq:
- question: Why use TypeScript rather than JavaScript for an MCP server?
  answer: TypeScript adds static types that avoid many stupid errors during development.
    For a server that will handle AI requests and manipulate sensitive data, having
    this level of verification is reassuring. Moreover, auto-completion in your editor
    becomes magical with TypeScript, considerably accelerating development.
- question: What version of Node.js is needed to create an MCP server?
  answer: It's recommended to use Node.js version 16 or higher. You can check your
    version with the command `node --version` in your terminal. If you don't have
    Node.js installed, download it from the official nodejs.org website.
- question: What is the --save-dev flag in npm install?
  answer: The --save-dev flag indicates that installed packages are development dependencies,
    needed only during development, not in production. These dependencies will be
    listed in the devDependencies section of package.json. This is the case for TypeScript,
    ts-node and @types/node which are only used to compile and develop code.
- question: Why separate src and dist folders?
  answer: 'This structure separates your TypeScript source code (in src/) from compiled
    JavaScript code (in dist/). It''s a good practice that keeps your project organized:
    you develop in src/, TypeScript compiles to dist/, and it''s the dist/ content
    that runs in production. This avoids mixing source and compiled code.'
- question: What is the MCP protocol?
  answer: MCP (Model Context Protocol) is an open-source protocol created by Anthropic
    to connect data servers to AI assistants like Claude.
- question: Is MCP compatible with other AIs?
  answer: Currently, MCP is primarily designed for Claude, but the protocol is open-source
    and other AIs may adopt it.
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

# Create Your First MCP Server: TypeScript Project Setup

You understood the Model Context Protocol theory in our previous article? Perfect! It's time to get hands-on with code. We'll build together the foundations of a functional MCP server. Don't panic, we'll go step by step, as if we were building a house: first the foundations, then the walls, then the roof.

## Introduction

In my developer career, I've always been fascinated by that magical moment when theory becomes reality. Remember your first "Hello World"? That's exactly what we'll experience together, but MCP version. In this article, we'll prepare our development environment with Node.js, TypeScript and Express.js. Nothing complicated, just the right tools in the right place.

The goal is simple: at the end of this tutorial, you'll have a perfectly configured project, ready to host your MCP server logic. Think of this as preparing your workshop before starting a DIY project: we arrange tools, check we have everything we need, and then we can create serenely.

## Why These Technologies?

Before rushing headlong into commands, let's take a minute to understand our technological choices. You're not obliged to use exactly this stack, but here's why I recommend it for beginners.

### Node.js: The Runtime Environment

Node.js allows running JavaScript server-side. It's become an industry standard, with a massive community and thousands of available packages. For our MCP server, Node.js gives us access to the file system, network management and everything we need to create a bridge between AI and your data.

### TypeScript: Type Safety

TypeScript is like JavaScript with a safety net. It adds static types that save us from many stupid errors. When you build a server that will handle AI requests and potentially manipulate sensitive data, having this level of verification is reassuring. Moreover, auto-completion in your editor becomes magical with TypeScript.

### Express.js: The Minimalist Web Framework

Express is the Swiss Army knife of Node.js web development. It allows us to create routes, handle HTTP requests and structure our server properly. It's lightweight, fast and perfectly suited for our MCP server which will receive JSON commands.

## Prerequisites Before Starting

Make sure you have installed on your machine:

- **Node.js version 16 or higher**: Check with `node --version` in your terminal. If you don't have Node.js, download it from the official nodejs.org website
- **npm (Node Package Manager)**: It comes automatically with Node.js. Check with `npm --version`
- **A code editor**: Visual Studio Code is excellent for TypeScript, but use the one you're comfortable with
- **A terminal**: Bash, Zsh, PowerShell... doesn't matter, as long as you can launch commands

Everything ready? Perfect, let's open our terminal!

## Step 1: Folder Creation and Initialization

Let's start by creating our workspace. Open your terminal and type these commands:

```bash
mkdir mcp-server
cd mcp-server
npm init -y
```

**What just happened?**

The first line creates a new folder named `mcp-server`. It's our house, our project. The second line makes us enter it. The third line initializes a Node.js project with `npm init -y`.

The `-y` flag means "yes to all": it automatically accepts all default options. Without this flag, npm would ask you a series of questions (project name, version, description...). For now, default values are perfect.

This command creates a crucial file: `package.json`. It's your project's identity card. It lists all dependencies, available scripts and project metadata. If you open this file, you'll see something like this:

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

It's basic, but it will evolve as we go.

## Step 2: Installing TypeScript

Now, let's equip our project with TypeScript. Type this command:

```bash
npm install typescript ts-node @types/node --save-dev
```

**Let's break down this command:**

The `npm install` is fairly explicit: we're installing packages. The `--save-dev` indicates that these packages are development dependencies, needed only during development, not in production.

Here's what each package does:

- **typescript**: The TypeScript compiler itself. It transforms your TypeScript code into JavaScript that Node.js can run
- **ts-node**: A magical tool that allows directly running TypeScript code without having to compile manually. During development, this saves tons of time
- **@types/node**: Type definitions for the Node.js environment. Thanks to this, TypeScript understands native Node functions like `fs.readFile`, `path.join`, etc.

After installation, look at your `package.json`. A new section has appeared:

```json
"devDependencies": {
  "@types/node": "^20.10.0",
  "ts-node": "^10.9.2",
  "typescript": "^5.3.3"
}
```

Versions may vary depending on when you read this article, but the principle remains the same.

## Step 3: Configuring TypeScript

TypeScript needs a configuration file to know how to compile your code. Let's generate it:

```bash
npx tsc --init
```

**Small technical point:** `npx` runs a package without installing it globally. Here, it launches the TypeScript compiler (`tsc`) with the `--init` option which creates the configuration file.

This command generates a `tsconfig.json` file with lots of comments explaining each option. It's verbose, but instructive! Here are the most important options for our project:

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

**Some quick explanations:**

- **target**: The target JavaScript version. ES2020 is modern and well supported
- **module**: The module system. CommonJS is the Node.js standard
- **outDir**: Where to place compiled JavaScript files (we'll create this folder later)
- **rootDir**: Where our TypeScript source code is located
- **strict**: Activates all TypeScript strict checks. It's a bit picky, but it avoids bugs

For now, the generated default values are perfect. You can refine later according to your needs.

## Step 4: Installing Express.js

Last brick of our foundation: Express.js, the framework that will handle our HTTP requests. Install it with:

```bash
npm install express
npm install @types/express --save-dev
```

**Why two commands?**

- **express**: The library itself, needed in production. So we don't put `--save-dev`
- **@types/express**: Type definitions for Express, needed only during development. Hence the `--save-dev`

Your final `package.json` should now look like this:

```json
{
  "name": "mcp-server",
  "version": "1.0.0",
  "description": "MCP server for AI connection to local data",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["mcp", "ai", "server"],
  "author": "Your Name",
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

Version numbers may vary slightly, but the essentials are there.

## Installation Verification

Before going further, let's verify everything works. Create a `src` folder and a test file:

```bash
mkdir src
```

Create a `src/index.ts` file with this simple content:

```typescript
import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'MCP server operational!' });
});

app.listen(PORT, () => {
  console.log(`✅ Server launched on http://localhost:${PORT}`);
});
```

**What does this code do?**

We import Express and create an application. We define a GET route on `/` that returns a simple JSON message. We launch the server on port 3000.

To run this code, let's add a script in our `package.json`. Modify the `scripts` section:

```json
"scripts": {
  "dev": "ts-node src/index.ts",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

Now, launch:

```bash
npm run dev
```

If everything is well configured, you should see in your terminal:

```
✅ Server launched on http://localhost:3000
```

Open your browser and go to `http://localhost:3000`. You should see:

```json
{
  "message": "MCP server operational!"
}
```

**Congratulations!** Your environment is perfectly configured.

## Project Organization

Before finishing, let's organize our project a bit. Here's the structure I recommend:

```
mcp-server/
├── src/
│   ├── index.ts          # Server entry point
│   ├── routes/           # Express routes (to create later)
│   ├── tools/            # MCP tools (readFile, etc.)
│   └── types/            # Custom TypeScript definitions
├── dist/                 # Compiled code (automatically generated)
├── node_modules/         # Dependencies (ignored by Git)
├── package.json
├── tsconfig.json
└── .gitignore
```

Also create a `.gitignore` file to avoid versioning useless files:

```
node_modules/
dist/
*.log
.env
.DS_Store
```

## Next Steps

We now have a solid foundation! Here's what awaits us in the next articles of this series:

- **Part 3**: Create our first MCP `readFile` tool that will allow AI to read local files
- **Part 4**: Implement the tool discovery system (the famous "menu")
- **Part 5**: Manage permissions and security
- **Part 6**: Test our server with Claude or ChatGPT

## Conclusion

We've just laid the solid foundations of our MCP server. Sure, it doesn't do much for now, but all the tools are in place. It's like having prepared your kitchen before starting to cook a complex meal: everything is arranged, accessible, and we can focus on the essentials.

In the next article, we'll create our first real MCP tool: the `readFile` function that will allow an AI to read files on your machine. That's where the magic really begins!

Don't hesitate to experiment with this setup. Try adding other Express routes, play with TypeScript, familiarize yourself with the environment. The more comfortable you are with these basics, the more natural the rest will be.

---

**Also read:**
- [Understanding the Model Context Protocol (MCP): A Simple Conversation](/en/articles/2025/10/23/comprendre-mcp-conversation-simple)
- [Create Your First MCP Tool: The readFile Tool Explained](/en/articles/2025/11/12/creer-votre-premier-outil-mcp-l-outil-readfile-explique)
- [The MCP Menu: How AI Discovers and Uses Your Tools](/en/articles/2025/12/03/menu-mcp-comment-l-ia-decouvre-et-utilise-vos-outils)
- [Securing Your MCP Server: Permissions, Validation and Protection](/en/articles/2025/12/10/securiser-serveur-mcp-permissions-validation-protection)
- [Connect Your MCP Server to Claude Desktop: Complete Integration](/en/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete)
