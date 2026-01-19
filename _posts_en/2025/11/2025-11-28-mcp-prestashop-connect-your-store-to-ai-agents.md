---
layout: post
title: 'PrestaShop MCP Server Tutorial: How to Connect Your Store to AI Agents (2025)'
date: 2025-11-28
ref: mcp-server-prestashop-setup-guide
author: Nicolas Dabène
lang: en
categories:
- PrestaShop
- artificial intelligence
- development
tags:
- MCP
- PrestaShop
- AI
- PHP 8
- AI Agent
- Model Context Protocol
excerpt: 'Complete step-by-step tutorial to install and configure ps_mcp_server on PrestaShop. Learn how to create your first MCP tools, expose your business logic to AI agents, and automate your e-commerce with Claude, ChatGPT or Gemini.'
image: /assets/images/blog/2025/11/mcp-prestashop-banner.webp
featured: true
difficulty: Advanced
technologies:
- PrestaShop 8+
- PHP 8.1+
- MCP
- AI
estimated_reading_time: 10 minutes
keywords:
- PrestaShop MCP tutorial
- how to install MCP Server PrestaShop
- ps_mcp_server guide
- PrestaShop MCP setup tutorial
- install Model Context Protocol PrestaShop
- create MCP tools PrestaShop
- PrestaShop AI agent tutorial
- how to connect PrestaShop to AI
- ps_mcp_server installation guide
- PHP MCP server tutorial
- PrestaShop 8 MCP guide
- learn MCP PrestaShop
faq:
- question: What is the Model Context Protocol (MCP)?
  answer: MCP is a protocol that allows AI agents to communicate with business systems
    like PrestaShop. It exposes tools through a structured server, enabling LLMs to
    interact with your store in a secure and controlled manner.
- question: Why use MCP with PrestaShop?
  answer: 'MCP enables automation of complex tasks via AI: product management, data
    analysis, intelligent customer support. Your AI agents directly access your store''s
    business logic through well-defined tools.'
- question: What are the technical requirements for ps_mcp_server?
  answer: You need PrestaShop 8.x minimum and PHP 8.1 or higher. The module uses modern
    PHP attributes and requires an MCP-compatible client like Claude, Dust, or Gemini
    CLI.
- question: How to secure access to the MCP server?
  answer: The module integrates session management with authentication tokens. Only
    clients with a valid token can access exposed tools. Always enable logs in development
    to monitor activity.
- question: What is the difference between STDIO and HTTP transport?
  answer: STDIO launches the server as a child process (ideal for debugging or standalone
    modules). HTTP exposes the server via API (production use with Claude, Dust, ChatGPT).
    STDIO is synchronous, HTTP allows multiple connections.
- question: How to create my first custom MCP tool?
  answer: 'Declare your module MCP-compliant with isMcpCompliant(), create a class
    under src/Mcp/Tools, use the #[McpTool] attribute with a clear description. The
    module automatically scans your tools at startup.'
sources:
- title: Model Context Protocol Official Spec
  url: https://modelcontextprotocol.io
- title: PHP-MCP Documentation
  url: https://github.com/php-mcp
- title: ps_mcp_boilerplate Repository
  url: https://github.com/prestashop/ps_mcp_boilerplate
schema_type: HowTo
how_to_steps:
- name: Check technical prerequisites
  text: Ensure you have PrestaShop 8.x minimum and PHP 8.1 or higher installed on your server.
- name: Declare your module MCP-compatible
  text: Add the isMcpCompliant() method to your PrestaShop module's main class to enable automatic tool discovery.
- name: Create your first MCP tool
  text: Create a class in src/Mcp/Tools with the #[McpTool] attribute to expose functionality to AI agents.
- name: Define the parameter schema
  text: Use the #[Schema] attribute to describe the parameters accepted by your tool, their types and default values.
- name: Test with MCP Inspector
  text: Use MCP Inspector to verify your tools are correctly discovered and test calls with different parameters.
- name: Configure HTTP connection
  text: Configure your MCP client (Claude, ChatGPT, Gemini) with your server URL and authentication token.
- name: Deploy to production
  text: Enable HTTPS, renew tokens regularly, and monitor logs to ensure your MCP server's security.
---


# MCP for PrestaShop: Connect Your Store to AI Agents

Imagine for a moment: you ask Claude "Find me the top 10 best-selling products this month and generate a promotional report". A few seconds later, you receive a complete document with statistics, recommendations, and merchandising suggestions. Science fiction? No, this is exactly what **ps_mcp_server** enables—the PrestaShop module that connects your store to AI agents via the Model Context Protocol (MCP).

In my 15 years of e-commerce development practice, I've rarely seen a technology as promising for intelligent automation. MCP transforms your PrestaShop into a true conversational API, where AI agents become genuine business assistants capable of executing complex tasks.

## Introduction

The Model Context Protocol is not just another API. It's a stateful protocol designed specifically for AI-system interactions. Unlike classic REST APIs where each request is isolated, MCP maintains a conversational context: your AI agent "remembers" language preferences, viewed products, and previous searches.

**ps_mcp_server** is the bridge between this revolutionary protocol and the PrestaShop ecosystem. Developed for PHP 8.1+ and PrestaShop 8+, this module exposes your business logic as tools that LLMs (Large Language Models) can discover and use automatically.

> **Current Compatibility Note**: At the time of this article's publication, PrestaShop's MCP Server is officially compatible with ChatGPT. However, since the MCP protocol is open-source and standardized, this article anticipates future compatibilities with other major LLMs (Claude, Gemini, Dust). The architecture described here is designed to work with all MCP-compatible AI agents.

The advantage of this standardized approach? You define your business tools once, and all MCP-compatible AI agents can use them as support expands. No need to develop specific integrations for each AI platform.

## Why MCP is a Game-Changer for PrestaShop

### A Protocol Designed for AI

MCP solves a fundamental problem: how to enable AIs to interact with complex business systems reliably? Traditional approaches (scraping, generic APIs) fail because they don't provide the structured context that LLMs need.

With MCP, each exposed tool has intrinsic documentation that the AI agent reads and understands. Think of it as a self-documented API optimized for intelligent machines. The agent knows precisely which parameters to send, what responses to expect, and how to combine multiple tools for complex workflows.

### Architecture of the ps_mcp_server Module

The module integrates three essential components:

**The embedded MCP server** that listens to AI agent requests, automatically discovers available tools via PHP attributes, and maintains session state.

**The integrated MCP client** necessary for STDIO (Standard Input/Output) communication, particularly useful for development and standalone modules.

**The automatic discovery system** that scans your modules for classes annotated with `#[McpTool]`, eliminating tedious manual configuration.

This architecture ensures your MCP server stays synchronized with your business code without additional maintenance.

## Installation and Initial Configuration

### Technical Prerequisites

Before starting, ensure you have a compatible environment:

- **PrestaShop 8.x minimum** - The module leverages modern PrestaShop features and requires this version to ensure stability.
- **PHP 8.1 or higher** - PHP attributes (modern annotations) are at the core of the tool discovery system. PHP 8.1 also introduces crucial performance improvements for resource-intensive AI operations.
- **An MCP-compatible client** - To test and use your server: Claude Desktop, Dust, Gemini CLI, or MCP Inspector (debugging tool without AI).

### File Structure

The module automatically creates a `.mcp` folder at his own root containing:

- **.cache** - Tool discovery cache to optimize performance. Delete it to force a new scan.
- **.logs** - Detailed log files (when "Enable logs" is activated in configuration). Essential for debugging AI interactions.

This organization maintains a clear separation between MCP configuration and your standard PrestaShop code.

## Declaring Your Module MCP-Compatible

### The isMcpCompliant() Method

Before exposing tools, you must tell **ps_mcp_server** that your module supports MCP. This explicit declaration avoids unnecessary scans and allows fine-grained management of AI-ready modules.

Simply add this method to your module's main class:

```php
<?php

class Ps_MySuperModule extends Module
{
    /**
     * Declares this module as MCP-compatible
     *
     * This method allows ps_mcp_server to automatically
     * discover tools defined in this module
     * via PHP attributes #[McpTool]
     */
    public function isMcpCompliant()
    {
        return true;
    }
}
```

That's it! Once this method is present, the **ps_mcp_server** module will automatically scan your `src/Mcp/Tools` folder for classes containing MCP tools.

### Why This Approach?

This opt-in method has several advantages: it avoids scanning all installed modules (performance), allows progressive activation (you choose when to make a module MCP-ready), and facilitates debugging (clear logs on scanned modules).

In the module logs (`.mcp/.logs`), you'll see your module appear in the list of discovered MCP-compliant modules, with the number of tools found.

## Creating Your First MCP Tool

### Anatomy of an MCP Tool

An MCP tool is a PHP method enriched with attributes that describe its behavior for AI agents. Let's create a concrete example: a product search tool by name.

Create a `src/Mcp/Tools/ProductSearchTool.php` file in your module:

```php
<?php

namespace PrestaShop\Module\MySuperModule\Mcp\Tools;

use PhpMcp\Server\Attributes\McpTool;
use PhpMcp\Server\Attributes\Schema;
use Product;

class ProductSearchTool
{
    /**
     * Search products by name with fuzzy matching
     *
     * @param string $searchTerms Search terms separated by semicolons
     * @param int $langId Language ID (default: preferred language)
     * @param int $limit Maximum number of results (default: 10)
     * @return array List of found products with details
     */
    #[McpTool(
        name: 'search_product_by_name',
        description: 'Search products in store by name only. Uses fuzzy matching. Results sorted by relevance.'
    )]
    #[Schema(
        properties: [
            'searchTerms' => [
                'type' => 'string',
                'description' => 'Search terms. Multiple terms possible separated by semicolons.'
            ],
            'langId' => [
                'type' => 'integer',
                'description' => 'Search language. Default: preferred context language.',
                'default' => 1
            ],
            'limit' => [
                'type' => 'integer',
                'description' => 'Maximum number of results to return.',
                'default' => 10
            ]
        ],
        required: ['searchTerms']
    )]
    public function searchProducts(string $searchTerms, int $langId = 1, int $limit = 10): array
    {
        // Split multiple terms
        $terms = explode(';', $searchTerms);

        // PrestaShop fuzzy search logic
        $results = Product::searchByName($langId, $terms[0]);

        // Limit results
        return array_slice($results, 0, $limit);
    }
}
```

### Dissecting the Attributes

**`#[McpTool]`** defines your tool's identity:

- The **name** must be unique, descriptive, and in snake_case. This is the name the AI agent will use to call your tool.
- The **description** is crucial: it guides the agent on when and how to use the tool. Be explicit about use cases, limitations, and result sorting.

**`#[Schema]`** specifies accepted parameters:

- **properties** lists each parameter with its type, detailed description, and optionally a default value.
- **required** indicates which parameters are mandatory. The AI agent will receive a clear error if it forgets a required parameter.

### Input Validation

MCP automatically validates types through the Schema, but always add sanity checks in your code:

```php
public function searchProducts(string $searchTerms, int $langId = 1, int $limit = 10): array
{
    // Basic validation
    if (empty(trim($searchTerms))) {
        throw new \InvalidArgumentException('Search terms cannot be empty');
    }

    // Reasonable limit to avoid overload
    if ($limit > 100) {
        $limit = 100;
    }

    // Check existing language
    if (!Language::getLanguage($langId)) {
        throw new \InvalidArgumentException("Invalid language ID {$langId}");
    }

    // Your business logic...
}
```

AI agents are known to "hallucinate" values. These validations protect your system against erratic behavior.

## Principles of Effective Tool Design

### Explicit and Concise Wording

Your tool descriptions make all the difference. An AI agent reads these descriptions to decide which tool to use and how to use it. Here's an example transformation:

❌ **Vague description**:
```php
description: 'Retrieves products'
```

✅ **Optimized description**:
```php
description: 'Search products by name only. Fuzzy matching enabled. Results sorted by relevance. For search by category or price, use search_product_advanced.'
```

The optimized version specifies the search type, behavior (fuzzy matching), result sorting, and even guides toward an alternative tool for other needs.

### Consistent Vocabulary

Use the same terminology across all your tools. If you call a parameter `langId` in one tool, don't call it `languageId` in another. This consistency helps agents make connections between tools and plan complex workflows.

Example of unified vocabulary:

```php
// ✅ Consistent across all tools
'langId' => 'Language ID'
'limit' => 'Maximum number of results'
'offset' => 'Starting point for pagination'

// ❌ Inconsistent
Tool 1: 'langId', 'maxResults', 'start'
Tool 2: 'languageId', 'limit', 'offset'
```

### Limiting Query Complexity

Protect your server against overly demanding queries. A poorly configured AI agent could request 10,000 products at once, overloading your database.

```php
#[Schema(
    properties: [
        'limit' => [
            'type' => 'integer',
            'description' => 'Maximum number of results (max: 100)',
            'default' => 10,
            'maximum' => 100  // Technical limit
        ]
    ]
)]
public function searchProducts(string $searchTerms, int $limit = 10): array
{
    // Double-check just in case
    $limit = min($limit, 100);

    // Search logic with applied limit...
}
```

This defensive approach ensures stable performance even with poorly optimized AI agents.

## State Management with MCP

### Stateful Protocol: The MCP Advantage

Unlike traditional REST APIs, MCP is **stateful**: the server maintains context for each connected client. This characteristic transforms the user experience.

Imagine an AI agent helping a French-speaking customer. Instead of specifying `langId: 2` on every tool call, the agent can store this preference in session state:

```php
// First call: agent detects preferred language
$context->setState('preferred_lang', 2);

// Subsequent calls: automatic use
$langId = $context->getState('preferred_lang', 1);
```

### State Use Cases

- **Personalization**: preferred language, currency, shipping country.
- **Search history**: remember viewed products to refine recommendations.
- **Multi-step workflow**: an agent can progressively build a cart by memorizing previous choices.
- **Query optimization**: cache frequently accessed data in session.

State isn't mandatory, but it makes interaction much smoother and more natural for the end user.

## HTTP Connection for Production

### HTTP Transport Advantages

In production, HTTP becomes the preferred transport for several reasons:

- **Universal compatibility**: all MCP clients (Claude, ChatGPT, Dust, Gemini) support HTTP.
- **Scalability**: an HTTP server can handle hundreds of simultaneous connections.
- **Security**: token authentication, HTTPS encryption, fine-grained permission management.
- **Monitoring**: centralized logs, performance metrics, anomaly detection.

### Configuration for Different Clients

**Claude Desktop** requires a local JSON configuration pointing to your server with the token:

```json
{
  "mcpServers": {
    "prestashop-shop": {
      "url": "https://your-store.com/modules/ps_mcp_server/endpoint",
      "token": "your-secure-token"
    }
  }
}
```

**Dust and Gemini CLI** currently offer the simplest connection: simple token without OAuth. Recommended for your first production tests.

**ChatGPT** and other clients will require OAuth2 in future module versions (V1). For now, favor Dust or Gemini for production.

### Security Considerations

In HTTP, security is paramount:

- Always use **HTTPS** in production, never plain HTTP.
- Renew tokens regularly (recommended: every 30 days).
- Enable logs to monitor suspicious tool calls.
- Implement rate limits to prevent abuse (next module version).

## Debug and Monitoring

### Log Files

The `.mcp/.logs` folder contains valuable information for debugging:

- **mcp-server.log**: all received requests, called tools, encountered errors.
- **tool-discovery.log**: module scan results, discovered tools, annotation errors.
- **session.log**: session creation/destruction, state management per client.

Enable logs in module configuration during development, disable them in production for performance reasons (unless diagnosing an issue).

### MCP Inspector: Your Best Ally

**MCP Inspector** is a graphical debugging tool that connects to your server without involving AI. Perfect for:

- Verifying your tools are correctly discovered.
- Testing tool calls with different parameters.
- Observing responses without the unpredictability of an AI agent.
- Validating your JSON schema before connecting a real AI client.

Install it via npm and point it to your MCP server. You'll instantly see all your tools listed with complete documentation.

### Common Errors and Solutions

**"No tools discovered"**: verify that `isMcpCompliant()` returns true, that your classes are in `src/Mcp/Tools`, and that `#[McpTool]` attributes are correctly imported.

**"Invalid token"**: regenerate a token in module configuration, copy it exactly without extra spaces.

**"Connection timeout"**: in STDIO mode, verify the PHP process has execution rights. In HTTP, check your web server configuration and firewall rules.

## Best Practices for AI Agent Tools

### Intrinsic Documentation

Your tool descriptions are read by machines, not humans. Optimize them for LLM understanding:

- Be precise about formats: "Date in YYYY-MM-DD format" rather than "Date".
- Indicate limitations: "Maximum 100 results" in both description AND schema.
- Guide toward alternatives: "For advanced search, use search_product_advanced".
- Explain sorting: "Results sorted by decreasing relevance".

### Permission Management

Even though MCP handles authentication, implement permission checks in your tools:

```php
public function updateProduct(int $productId, array $data): array
{
    // Check rights of user associated with session
    if (!$this->context->employee->hasAccess('AdminProducts', 'edit')) {
        throw new \PrestaShopException('Insufficient permissions to modify products');
    }

    // Data validation
    $this->validateProductData($data);

    // Secure update
    $product = new Product($productId);
    $product->hydrate($data);
    $product->save();

    return ['success' => true, 'id' => $productId];
}
```

This defense-in-depth approach: even if a token is compromised, standard PrestaShop permissions remain enforced.

### Infinite Loop Prevention

AI agents can sometimes fall into loops: calling the same tool again and again with similar parameters. Detect these behaviors:

```php
private function detectLoop(string $toolName, array $params): void
{
    $sessionHistory = $this->context->getState('tool_history', []);

    // Add current call
    $sessionHistory[] = [
        'tool' => $toolName,
        'params' => $params,
        'timestamp' => time()
    ];

    // Keep last 10 calls
    $sessionHistory = array_slice($sessionHistory, -10);

    // Detect 5 identical calls
    $similarCalls = array_filter($sessionHistory, function($call) use ($toolName, $params) {
        return $call['tool'] === $toolName &&
               json_encode($call['params']) === json_encode($params);
    });

    if (count($similarCalls) >= 5) {
        throw new \RuntimeException("Loop behavior detected: tool {$toolName} called 5 times with identical parameters");
    }

    $this->context->setState('tool_history', $sessionHistory);
}
```

This simple protection avoids catastrophic scenarios where a faulty agent overloads your server.

## Complete Example: Boilerplate Module

### Recommended Structure

To get started quickly, use the **ps_mcp_boilerplate** repository that provides a complete structure:

```
ps_my_mcp_module/
├── ps_my_mcp_module.php          # Main class with isMcpCompliant()
├── src/
│   └── Mcp/
│       └── Tools/
│           ├── ProductSearchTool.php
│           ├── OrderManagementTool.php
│           └── CustomerAnalyticsTool.php
├── config/
│   └── services.yml               # Symfony configuration for DI
└── README.md
```

### Complete Tool Implementation

Here's a real example of an order management tool:

```php
<?php

namespace PrestaShop\Module\MyMcpModule\Mcp\Tools;

use PhpMcp\Server\Attributes\McpTool;
use PhpMcp\Server\Attributes\Schema;
use Order;
use Context;

class OrderManagementTool
{
    private Context $context;

    public function __construct(Context $context)
    {
        $this->context = $context;
    }

    #[McpTool(
        name: 'get_recent_orders',
        description: 'Retrieves recent orders with optional filters. Returns ID, customer, amount, status. Sorted by descending date.'
    )]
    #[Schema(
        properties: [
            'limit' => [
                'type' => 'integer',
                'description' => 'Number of orders to return (max: 50)',
                'default' => 10
            ],
            'status' => [
                'type' => 'string',
                'description' => 'Filter by status: pending, paid, shipped, delivered, cancelled',
                'default' => null
            ],
            'days' => [
                'type' => 'integer',
                'description' => 'Orders from last N days (max: 90)',
                'default' => 7
            ]
        ]
    )]
    public function getRecentOrders(
        int $limit = 10,
        ?string $status = null,
        int $days = 7
    ): array {
        // Validations
        $limit = min($limit, 50);
        $days = min($days, 90);

        // Query construction
        $dateFrom = date('Y-m-d', strtotime("-{$days} days"));

        $orders = Order::getOrdersWithInformations(
            $limit,
            0, // offset
            ['date_add', 'DESC']
        );

        // Filter by status if specified
        if ($status) {
            $orders = array_filter($orders, function($order) use ($status) {
                return strtolower($order['order_state']) === strtolower($status);
            });
        }

        // Format results
        return array_map(function($order) {
            return [
                'id' => $order['id_order'],
                'reference' => $order['reference'],
                'customer' => [
                    'id' => $order['id_customer'],
                    'name' => $order['customer_name'],
                    'email' => $order['customer_email']
                ],
                'total' => (float) $order['total_paid'],
                'currency' => $order['currency'],
                'status' => $order['order_state'],
                'date' => $order['date_add']
            ];
        }, $orders);
    }
}
```

This tool illustrates all best practices: strict validation, clear description, strong typing, structured result formatting.

## Going Further: MCP Tools Plus

If you want to fully exploit the potential of PrestaShop's MCP Server without developing your own tools from scratch, **MCP Tools Plus** is a turnkey solution that significantly extends the base MCP server capabilities.

### An Advanced Implementation Ready to Use

Developed by BusinessTech/PrestaModule, **MCP Tools Plus** is a premium module that enriches the PS MCP Server with advanced management tools. It transforms your AI assistant into a true management partner capable of:

- **Generating automated accounting reports** - Sales data extraction and formatting for your accounting, with integrated PDF export and email sending.
- **Orchestrating complex marketing actions** - Advanced customer segmentation, personalized promo code generation, and multi-step workflows.
- **Analyzing and optimizing your catalog** - Automatic detection of high-potential or struggling products, with concrete action suggestions.
- **Integrating third-party services** - Native connection with Qonto (payment verification), Brevo (email campaigns), and other business tools (pending MCP protocol adoption by these services).

### A Modular and Scalable Approach

MCP Tools Plus architecture perfectly illustrates the modular vision of MCP: each feature is exposed as an independent tool that your AI agent can discover and combine intelligently. This approach enables continuous evolution and customization based on your specific needs.

To discover in detail the concrete use cases, real automation scenarios and understand how MCP Tools Plus can transform your daily management, check out our dedicated article: [PrestaShop MCP Server & MCP Tools Plus: Complete AI Assistant Guide](/en/articles/2025/11/24/agents-ia-ecommerce-mcp/).

## References and Resources

### Official Documentation

**Model Context Protocol**: The complete protocol specification is available at [modelcontextprotocol.io](https://modelcontextprotocol.io). Consult it to understand advanced concepts like resources, prompts, and sampling.

**PHP-MCP**: Server and client libraries are documented at [github.com/php-mcp](https://github.com/php-mcp). You'll find examples of advanced attributes and development patterns.

{% include blog-mcp-tools-plus-block-en.html %}

## Conclusion

MCP represents a revolution in how our PrestaShop stores interact with artificial intelligence. By exposing your business logic through well-defined tools, you create an ecosystem where AI agents become true assistants capable of automating complex tasks.

**ps_mcp_server** makes this integration accessible to any PHP developer familiar with PrestaShop. The attribute-based approach significantly simplifies development: define your tools, annotate them, and the system handles exposing them to AI agents.

Use cases are infinite: automated product management, predictive sales analysis, intelligent customer support, on-demand report generation, dynamic price optimization. Imagination is the only limit.

Start with a simple tool (like product search), test it with MCP Inspector, then connect Claude or Gemini to experiment with intelligent automation. You'll quickly discover MCP's transformative potential for your e-commerce.
