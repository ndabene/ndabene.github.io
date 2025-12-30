---
layout: post
title: 'Understanding MCP Protocol: Complete Guide'
date: 2025-10-23
author: Nicolas Dabène
lang: en
ref: comprendre-mcp-conversation-simple-2025-10
categories:
- artificial intelligence
- Tutorial
tags:
- API
- ChatGPT
- AI
- development
excerpt: Discover how AIs can access your files and data through MCP, explained through
  a simple and educational conversation.
image: /assets/images/blog/2025/10/2025-10-23-comprendre-mcp-conversation-simple.webp
featured: true
difficulty: Beginner
technologies:
- MCP
- TypeScript
- AI
- JSON
estimated_reading_time: 10 minutes
faq:
- question: Does MCP replace traditional APIs?
  answer: No, MCP is a layer on top of existing APIs. It standardizes how AIs interact
    with these APIs, but APIs remain the technical means of accessing data.
- question: Can I create an MCP server without being an AI expert?
  answer: Absolutely! MCP uses standard web technologies (TypeScript, JSON). If you
    know how to create a basic REST API, you can create an MCP server.
- question: Is my data sent to the AI?
  answer: Yes, but only after your explicit authorization. The MCP server reads your
    data and transmits it to the AI for processing. This is why trust in the AI provider
    remains important.
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

# Understanding the Model Context Protocol (MCP): A Simple Conversation

Have you ever wondered how artificial intelligences like ChatGPT or Claude could access your personal files, your emails or your database? The answer comes down to three letters: **MCP** (Model Context Protocol). But before diving into code, let's take time to understand this revolutionary architecture through a simple analogy and a guided conversation.

## Introduction

In my development practice for over 15 years, I've seen many protocols and architectures come and go. MCP stands out for its elegance: it transforms isolated AIs into true assistants capable of interacting with the real world. Imagine being able to ask Claude: "Summarize the report.pdf on my desk" and see the AI actually access your file, read it and give you a summary. That's exactly what MCP enables.

But how does it actually work? This is what we'll discover together, not through complex technical diagrams, but by following the natural path of a question asked to an AI.

## The Three Actors of the MCP Theater

Before understanding the protocol, let's first visualize the characters in this play. The MCP ecosystem relies on three main actors, each with a well-defined role.

### 🤖 The AI Application: The Isolated Brain

Take Claude, ChatGPT or any large language model. These AIs are incredibly good at understanding and generating text. They can reason, create, analyze... but they have a fundamental limitation: **they are completely isolated from the outside world**.

It's like having a genie locked in a lamp. It can answer your questions with infinite wisdom, but it can't open your house door or read what's on your desk.

### 💻 The MCP Server: The Intelligent Bridge

This is precisely what we'll build together. The MCP server is the bridge between AI and the real world. Its job consists of:

- Exposing capabilities ("I can read files", "I can send emails")
- Translating these capabilities into a language the AI understands
- Executing AI requests securely

Imagine an interpreter who not only translates languages but also intentions into concrete actions.

### 📄 The Resource: The Final Destination

This is the actual data source or tool we want to access: a folder on your computer, a PostgreSQL database, the Google Drive API, your Gmail inbox... In short, anything that contains information or allows actions to be performed.

## The Journey of a Simple Question

Now that we know the actors, let's follow together the path of a user request. Imagine you say to Claude:

> "Can you summarize the report.pdf file on my desk?"

### Step 1: Discovering the Menu

First important question: **how does the AI know it can read files?**

It's exactly like entering a restaurant. Before ordering a specific dish, you ask for the menu to discover what the establishment offers. The AI does the same with our MCP server.

Our server therefore presents a "menu" of its capabilities. For a server that accesses local files, this menu would look like this:

**Available tool: `readFile`**
- **Description**: "Reads the content of a text file"
- **Required parameter**: `file_path` (a character string)

**Available tool: `listFiles`**
- **Description**: "Lists files in a folder"
- **Required parameter**: `folder_path` (a character string)

See the logic? Each tool is clearly described with its parameters. The AI can thus "understand" what it can do and how to do it.

### Step 2: The Security Question

Now that the AI knows it can use `readFile`, do you think it can directly access any file on your computer?

**Of course not!** That would be a security nightmare. This is where a crucial step comes in: **the permission request**.

The AI application (ChatGPT, Claude...) will ask you directly:

> "Do you authorize this server to read the report.pdf file?"

It's you, the human user, who keeps control. Only after your explicit agreement can the AI proceed. This human validation step is fundamental in MCP philosophy.

### Step 3: The Structured Command

Once authorization is obtained, the AI will formulate its request to the server. But be careful, it won't write a complete sentence as we would. Computers prefer clear, unambiguous structures.

Here's how the AI structures its command in JSON format (a standard format for exchanging data):

```json
{
  "tool_name": "readFile",
  "parameters": {
    "file_path": "/Users/you/Desktop/report.pdf"
  }
}
```

Let's break down this structure:
- **`tool_name`**: The name of the tool to use (here `readFile`)
- **`parameters`**: An object containing all necessary parameters
  - **`file_path`**: The exact path to the file to read

It's simple, clear and unambiguous. The server knows exactly what to do.

### Step 4: Execution and Response

Our MCP server receives this structured command. It will then:

1. **Validate** the command (are all required parameters present?)
2. **Execute** the action (read the file on the hard drive)
3. **Return** the result to the AI

The response might look like this:

```json
{
  "content": "Q4 2024 Quarterly Report\n\nRevenue: €2.5M\nGrowth: +15%\n...",
  "success": true
}
```

The AI receives this response and can now use the file content to give you a relevant summary.

## Understanding the Complete Flow Through Example

Let's go through our scenario from the beginning with a simple conversational diagram:

**👤 You**: "Claude, summarize the report.pdf file on my desk."

**🤖 Claude**: *"I can't directly access files, but I see an MCP 'filesystem' server is available. Let me check its capabilities..."*

**💻 MCP Server**: *"Here's my menu: I can `readFile` and `listFiles`."*

**🤖 Claude**: *"Perfect! I'll request to read the file."*

**🖥️ Application**: *"User, do you authorize reading /Users/you/Desktop/report.pdf?"*

**👤 You**: "Yes, authorized."

**🤖 Claude**: *Sends the structured command to the server*

**💻 MCP Server**: *Reads the file and returns the content*

**🤖 Claude**: "Here's your report summary: Q4 2024 revenue reaches €2.5M with 15% growth..."

## Key Principles to Remember

Before moving to code, let's consolidate our understanding with MCP's fundamental principles:

### 1. Discovery Before Action

The AI can't guess what a server knows how to do. It always starts by asking for the "menu" of available capabilities. It's like arriving in a new city: you first consult a map before moving around.

### 2. Security by Design

Each action requires human validation. MCP is not a backdoor allowing AIs to dig through your data. It's a protocol where **you remain in control** of what's accessible.

### 3. Structured Communication

Commands and responses follow a standardized JSON format. This rigor avoids misunderstandings and allows any MCP-compatible AI to communicate with any MCP server.

### 4. Separation of Responsibilities

Each actor has a clear role:
- The AI understands natural language and reasons
- The MCP server translates and executes
- The resource stores or processes data

## Why This Architecture is Revolutionary

MCP represents a major advance in integrating AIs into our daily workflows. Before MCP, each AI had to develop its own specific integrations. If you wanted ChatGPT to access your Google Drive, OpenAI had to code this integration. If Claude wanted to do the same, Anthropic had to redo the work.

With MCP, **a single server can be used by all compatible AIs**. It's like moving from proprietary electrical outlets to a universal standard outlet. Develop an MCP server for Google Drive, and all AIs can use it immediately.

This standardization opens infinite possibilities:
- Secure access to personal data
- Integration with enterprise tools
- Automation of complex tasks
- Creation of AI assistants truly useful in daily life

## Conclusion

We've come a long way together! From the simple question "How can an AI read my files?" we've arrived at understanding a complete protocol with its actors, its flows and its security philosophy.

The most beautiful part of all this? What we just learned was only theory. The real magic begins when we move to code and see our own MCP server come to life, allowing an AI to actually interact with our data.

In a future article, we'll get our hands in the code: TypeScript project initialization, creation of our first `readFile` tool, permission management and testing with Claude. But for now, you've acquired the essential conceptual understanding. It's the solid foundation on which we'll build our MCP server.

---

**Also read:**
- [Create Your First MCP Server: TypeScript Project Setup](/en/articles/2025/10/30/setup-serveur-mcp-typescript)
- [Create Your First MCP Tool: The readFile Tool Explained](/en/articles/2025/11/12/creer-votre-premier-outil-mcp-l-outil-readfile-explique)
- [The MCP Menu: How AI Discovers and Uses Your Tools](/en/articles/2025/12/03/menu-mcp-comment-l-ia-decouvre-et-utilise-vos-outils)
- [Securing Your MCP Server: Permissions, Validation and Protection](/en/articles/2025/12/10/securiser-serveur-mcp-permissions-validation-protection)
- [Connect Your MCP Server to Claude Desktop: Complete Integration](/en/articles/2025/12/17/connecter-serveur-mcp-claude-desktop-integration-complete)
