---
layout: post
title: 'AI Agents and E-commerce: Why Executing Code Is Better Than Calling Tools'
date: 2025-11-24
author: Nicolas Dabène
categories:
- AI
- E-commerce
- Automation
- Anthropic
tags:
- AI
- PrestaShop
- development
excerpt: From 'tool calling' method to code execution with MCP — how Anthropic's new approach revolutionizes how AI agents interact with e-commerce platforms.
image: /assets/images/blog/2025/11/mcp-code-execution-ecommerce.jpg
lang: en
ref: agents-ia-ecommerce-mcp-nov2025
featured: false
difficulty: Advanced
technologies:
- MCP
- Anthropic
- PHP
- TypeScript
- PrestaShop
estimated_reading_time: 12 minutes
faq:
- question: What is the Model Context Protocol (MCP)?
  answer: MCP is an open-source protocol from Anthropic that defines how an AI agent communicates with tool servers. Each MCP server exposes capabilities (retrieve orders, modify products, generate reports) in standardized form with schemas, inputs, outputs and documentation. It's a universal language between AI models and business systems.
- question: What's the difference between Direct Tool Calling and Code Execution with MCP?
  answer: Direct Tool Calling loads all tool definitions into model context which calls each tool separately (slow, expensive, high latency). Code Execution allows the model to write and execute a script in a sandbox connected to MCP servers, filtering results locally. Token consumption drops by over 98%.
- question: How does code execution benefit e-commerce?
  answer: Code execution allows agents to generate automated reports in PHP/TypeScript, calculate live indicators on orders, identify product anomalies, update stock or reactivate customers, without ever saturating the model with useless information. The agent becomes an operator rather than a consultant.
- question: Why is code execution more efficient than tool calls?
  answer: 'With Tool Calling, each complete result transits through the model (thousands of tokens, high latency). With Code Execution, 95% of work is done locally: AI only reads the final summary. Only necessary tool definitions are loaded, and large data volumes no longer pass through the model.'
- question: What does this change for e-commerce developers?
  answer: Developers write tools, AI learns to use them, then writes the code that orchestrates them itself. It's a new grammar of collaboration between models and code. Tomorrow, our agents will be true technical collaborators capable of designing, testing and executing autonomous business code.
---
# AI Agents and E-commerce: Why Executing Code Is Better Than Calling Tools

Each generation of AI agents promises more autonomy.
Yet as they gain power, one problem persists: **the cost of context**.

Each time an agent wants to interact with a database, API or CRM, it must describe everything to the model: what to do, how to do it, with what data.
Result: thousands of wasted tokens, huge latencies, and exploding costs.

Late 2024, **Anthropic** proposed an elegant answer: the **Model Context Protocol (MCP)** — an open standard that allows AI models **to connect to tools and execute code directly**, rather than passing everything through the model.

And this evolution could well redefine how we automate our e-commerce stores.

---

## What is the Model Context Protocol?

**MCP** (*Model Context Protocol*) is an open protocol that defines **how an AI agent communicates with tool servers**.
Each MCP server exposes capabilities — for example: retrieve orders, modify a product, generate a report — in a standardized form (schemas, inputs, outputs, documentation).

Objective: offer a universal language between AI models and business systems, without going through vague prompts or proprietary APIs.

But what makes MCP exciting are the **two ways to use it**.

---

## 1. The "Direct Tool Calling" Approach

This is the historical method.
The model loads **all tool definitions** into its context, then calls each tool separately.

Advantage: simplicity.
Disadvantages:
- each tool schema takes up space in model memory;
- each complete result (sometimes voluminous) transits through the model;
- latency and cost explode as soon as you exceed a few thousand elements.

### Classic E-commerce Example

Imagine an AI connected to a PHP store.
It wants **to summarize the day's sales**.

```php
$orders = MCP::call('orders.getOrders', ['date' => '2024-11-05']);
$summary = OpenAI::summarize([
  'instruction' => 'Summarize the day\'s sales',
  'data' => json_encode($orders)
]);
```

➡️ The model receives all orders here, sometimes tens of thousands of JSON lines.
It must read everything, understand everything, reformat everything.
Result: slow, expensive, and fragile.

---

## 2. The "Code Execution with MCP" Approach

This is the big novelty introduced by Anthropic.

Instead of calling tools directly via the model, the model writes and executes a small script (TypeScript, Python, PHP...) in a secure sandbox connected to MCP servers.

The AI agent then becomes an internal developer:
it writes code, executes it, filters results, and only sends back to the model what's relevant.

Result:
- only necessary tool definitions are loaded;
- large data volumes no longer pass through the model;
- token consumption drops by over 98% in Anthropic tests.

---

## Concrete Application: The E-commerce Agent That Executes Code

Imagine an AI agent connected to a PrestaShop store.
Its mission: analyze the day's orders and produce a clear report for the merchant.

### Classic Approach: Everything Goes Through the Model

1. the agent loads all the day's orders via API;
2. it sends data to the model for calculation;
3. the model summarizes and reformats;
4. then we send the output back to the server.

Result: thousands of tokens, seconds of latency, and sensitive data leaving the store.

### Modern Approach: Code Execution with MCP

The model writes and executes a small PHP script:

```php
<?php
use MCP\Tool\Http;
use MCP\Tool\OpenAI;

$orders = Http::get('https://shop.example.com/api/orders?date=2024-11-05');

// Local aggregation (no passage through model)
$summary = [
  'total_orders' => count($orders),
  'revenue' => array_sum(array_column($orders, 'total_paid')),
  'top_products' => array_slice(
    array_count_values(array_column($orders, 'product_name')),
    0, 3
  ),
];

// AI intervenes only to write the report
$report = OpenAI::generate([
  'instruction' => 'Write a clear summary of the day\'s sales.',
  'data' => json_encode($summary)
]);

file_put_contents('reports/2024-11-05.txt', $report);
?>
```

🧠 Here, 95% of work is done locally: AI only reads the final summary.
The model becomes lean, fast and precise.

---

## Comparing the Two Approaches

| Criteria | Direct Tool Calling | Code Execution with MCP |
|---------|---------------------|-------------------------|
| **Token consumption** | Very high | Drastically reduced |
| **Latency** | High (many exchanges) | Low (local calculations) |
| **Security** | Data transmitted to model | Data processed server-side |
| **Simplicity** | Easy to implement | Requires sandbox environment |
| **Scalability** | Limited | Each script becomes reusable "skill" |

---

## What This Changes for E-commerce

Code execution with MCP opens the way to agents capable of:

- Generating automated reports in PHP or TypeScript,
- Calculating live indicators on orders,
- Identifying product anomalies,
- Updating stock or reactivating customers,

without ever saturating the model with useless information.

We move from a "consultant" AI to an "operator" AI:
it acts in the system, rather than talking about it.

---

## Vision: The Fusion Between AI and Development

What Anthropic proposes goes beyond simple technical optimization.
It's a new grammar of collaboration between models and code.

Developers write tools.
AI learns to use them.
Then it writes the code that orchestrates them itself.

Tomorrow, our agents won't be simple "intelligent prompts",
but true technical collaborators capable of designing, testing and executing business code.

---

## Conclusion

The future of e-commerce won't be played out on the number of tokens,
but on AI's ability to act efficiently through code.

Thanks to the Model Context Protocol, a model no longer describes what it would do — it does it.

And for us, developers and merchants, it's the promise of smoother, safer, and infinitely more intelligent automation.

---

## Sources

- [Anthropic — Code Execution with MCP: Building more efficient agents](https://www.anthropic.com/news/mcp-code-execution)
- [Model Context Protocol — Official documentation (GitHub)](https://github.com/anthropics/mcp)

---

*Article published November 24, 2025 by Nicolas Dabène - E-commerce and AI expert with 15+ years of experience*
