---
layout: post
title: 'How AI Discovers Your MCP Tools?'
date: 2025-11-19
author: Nicolas Dabène
categories:
- AI
- PrestaShop
- E-commerce
tags:
- mcp
- prestashop
- ai
- automation
- natural-language
- business-intelligence
excerpt: 'Imagine an AI assistant managing your PrestaShop store like a tireless right-hand:
  accounting reports in the blink of an eye, automated targeted promotions, and much
  more. With the PS MCP Server and the MCP Tools Plus module, this vision becomes
  reality. Discover how these tools transform daily frustrations into growth opportunities
  for merchants and agencies.'
image: /assets/images/blog/2025/11/mcp-prestashop-banner.jpg
keywords:
- PS MCP Server
- MCP Tools Plus
- PrestaShop
- AI
- management assistant
- e-commerce
- automation
- natural language
- PrestaShop module
difficulty: ⭐️⭐️⭐️
technologies:
- PrestaShop
- MCP
- Claude
- ChatGPT
- Brevo
- Qonto
estimated_reading_time: 15 minutes
faq:
- question: "What is the MCP protocol?"
  answer: "MCP (Model Context Protocol) is an open-source protocol created by Anthropic
    to connect data servers to AI assistants like Claude."
- question: "Is MCP compatible with other AIs?"
  answer: "Currently, MCP is primarily designed for Claude, but the protocol is open-source
    and other AIs may adopt it."
- question: "Do I need programming knowledge?"
  answer: "Yes, basic knowledge of JavaScript/TypeScript is recommended to create
    MCP servers."
- question: "Are MCP servers free?"
  answer: "Yes, the MCP protocol is open-source and free. You can create as many
    servers as you want."
- question: "Can I use MCP in production?"
  answer: "Yes, make sure to implement all security measures: authentication, validation,
    rate limiting."
---

# How AI Discovers Your MCP Tools?

In the daily life of a PrestaShop e-merchant, repetitive tasks like sales reports or inventory analysis can quickly become a bottleneck to productivity. The PS MCP Server and the MCP Tools Plus module are changing the game by allowing an AI assistant to integrate directly with your store. These tools aren't here to revolutionize the world, but to solve concrete problems: save time on analyses, automate reports, and facilitate decisions based on reliable data.

This article explores how these tools work together, without diving into technical details. We'll look at practical challenges, key features of MCP Tools Plus, and concrete examples of their use. The goal? Show the real added value for merchants and agencies, focusing on measurable gains like reducing time spent on administrative tasks.

## Context and Challenges: Solving Daily Frictions

Managing a PrestaShop store often involves time-consuming exchanges between merchants and agencies. A merchant requests a sales report, the agency extracts data manually, and the delay lengthens. This impacts responsiveness: a poorly timed promotion or unadjusted inventory can be costly in lost revenue.

The PS MCP Server and MCP Tools Plus address these frictions by connecting an AI assistant directly to PrestaShop. The AI accesses data through structured tools, which speeds up processes. For a merchant, this means quick insights without waiting for human intervention. For an agency, this frees up time for higher-value tasks, like strategic optimization.

The main challenge is productivity: studies like those from McKinsey show that automation of analytical tasks can reduce time spent by 20-30%. Here, the MCP approach makes this accessible without advanced coding skills, based on natural language prompts.

## Deep Dive: The PS MCP Server and MCP Tools Plus Duo

The PS MCP Server acts as a secure intermediary between AI and PrestaShop, allowing access to basic data like products or orders. Launched in November 2025, it standardizes these interactions to avoid custom developments.

MCP Tools Plus, developed by BusinessTech and PrestaModule, extends this with a ready-to-use set of tools. This premium module exposes key metrics via MCP, allowing AI to analyze and act on aspects like sales, inventory, or customer service. It requires PrestaShop 8.2+, PHP 8.1+, and active PS MCP Server.

Here's a pragmatic overview of the tools provided by MCP Tools Plus. Each tool returns data in JSON, and dates are managed automatically by the AI (YYYY-MM-DD format). The prompt examples show how to use them in practice.

### Tools for Sales and Performance Analysis

- **get_country_codes**: Retrieves country IDs to filter data (e.g., France = 8). Call this first for any geographical analysis.
  *Prompt example*: "Get the country ID for France."

- **sales_analytics_dashboard**: Provides an overview of orders, revenue, and cart values over a period.
  *Prompt example*: "Give me a sales overview for the last 30 days, grouped by month."

- **customer_insights_analyzer**: Segments customers by country, group, or frequency, and lists top spenders.
  *Prompt example*: "Analyze customers from the last 30 days, segmented by country."

- **product_performance_tracker**: Ranks products by revenue or quantities sold, with filters (country, category, manufacturer) and top-N limit. Ideal for charts. Workflow: Start with get_country_codes, then apply filters.
  *Prompt example*: "Show the top 5 products sold in France over the last 3 months, as a pie chart with revenue on hover."

- **advanced_business_reports**: Order-level reports, with custom columns and filters. Use only for orders, not products.
  *Prompt example*: "Generate an order report with customer name and total paid, grouped by country, for the last 30 days."

- **tax_declaration_summary**: Aggregates pre-tax/incl-tax/VAT totals for tax returns.
  *Prompt example*: "Calculate the VAT summary for the last 30 days for my tax return."

- **customer_behavior_summary**: Provides total customer count, average spending, recurring customers, top 10, and distribution by country.
  *Prompt example*: "Summarize customer behavior for the last 30 days, highlighting recurring buyers."

- **order_fulfillment_tracker**: Counts orders and revenue by status to identify bottlenecks.
  *Prompt example*: "How many orders are awaiting payment versus shipped over the last 30 days?"

- **inventory_alerts_monitor**: Lists products with low stock (configurable threshold), including inactive ones if needed.
  *Prompt example*: "List up to 15 active products with stock below 8 units to plan restocking."

- **margin_performance_alerts**: Detects products with low or negative margins by comparing revenue and purchase costs.
  *Prompt example*: "Flag the 20 products with margins below 12% over the last 30 days."

- **returns_and_credits_tracker**: Lists credits and refunds with pre-tax/incl-tax totals for accounting.
  *Prompt example*: "Show all refunds issued over the last 30 days with pre-tax and incl-tax amounts."

- **multi_market_tax_analyzer**: Groups pre-tax/incl-tax/VAT totals by country or rate for multi-country returns.
  *Prompt example*: "Provide a VAT breakdown by country for the last 30 days, then by rate if possible."

These tools bring immediate value: a merchant can get a tax report in minutes instead of hours, reducing errors and speeding up decisions.

### Tools for Customer Service (with version 1.0.1 of MCP TOOLS + coming a few days after this article)

- **inbox_status_snapshot**: Counts threads by status and lists those awaiting response, with time window.
  *Prompt example*: "Give me an inbox snapshot for the last 14 days, with names and order references, and list up to 20 pending threads."

- **sla_breach_radar**: Lists threads where the last customer response is older than a threshold, pending.
  *Prompt example*: "Show threads where the last customer message is more than 24 hours old, with names and references, limited to 15."

- **open_threads_brief**: Lists open or pending threads, with customer details and limit.
  *Prompt example*: "List open and pending threads updated in the last 2 days, with customer names and references, limited to 50."

- **order_context_enricher**: For a given thread, provides order context (status, tracking, totals) and recent messages.
  *Prompt example*: "For thread 1234, give me the order status, tracking info, and the last 5 messages."

- **language_template_suggestion**: Detects language and suggests a response template based on the last message.
  *Prompt example*: "Suggest a response template for thread 1234 and indicate the language."

- **priority_routing**: Ranks and scores pending threads by SLA, wait time, and order value.
  *Prompt example*: "Give me the top 20 threads to handle as priority (24h SLA, order >120€)."

- **messages_by_date**: Searches messages over a period, filtered by status and sender.
  *Prompt example*: "Show customer messages from the last 7 days, regardless of status."

- **reply_drafter**: Generates a contextualized response draft; can send if configured.
  *Prompt example*: "Suggest a short and caring response for the last message of thread 456 and send it."

These tools optimize customer service: an agency can prioritize urgent tickets, reducing response times by 50% on average.

### Tools for SEO (with Geo suite module required)

- **list_faqs**: Lists FAQs with filters (type, language, status).
  *Prompt example*: "Show me all active FAQs for products in French."

- **get_faq**: Full details of a FAQ by ID.
  *Prompt example*: "Retrieve the full details of FAQ ID 123."

- **get_faq_statistics**: Statistics on FAQs (counts, breakdowns).
  *Prompt example*: "Give me a summary of our FAQ content in all languages."

- **list_products_missing_alt_texts**: Lists products without alt text for images.
  *Prompt example*: "Find products that need alt text for their images."

- **get_alt_text_status**: Alt text coverage status for a product.
  *Prompt example*: "Check the alt text status for product ID 456."

- **list_products_alt_text_status**: Alt text status for all products.
  *Prompt example*: "Show me the alt text completion status for all products."

- **get_geo_content**: GEO content for a product (AI phrases, URLs).
  *Prompt example*: "Retrieve the GEO content configured for product ID 789."

- **list_products_with_geo_content**: Lists products with GEO content.
  *Prompt example*: "Which products have GEO content configured?"

- **get_indexnow_queue_status**: IndexNow queue status.
  *Prompt example*: "Check the current status of the IndexNow queue."

- **get_indexnow_history**: Recent history of IndexNow submissions.
  *Prompt example*: "Show me the recent history of IndexNow submissions."

- **get_sitemap_status**: XML sitemap generation status.
  *Prompt example*: "Check when the sitemap was last generated and what it includes."

- **get_ai_bot_traffic_stats**: AI bot traffic stats.
  *Prompt example*: "Analyze AI bot traffic on our site this week."

These SEO tools help maintain an optimized site, improving Google ranking without constant manual effort.

For LLM choice, Claude excels in precision for complex analyses, while ChatGPT is more versatile for daily tasks. The added value: reports generated 5 times faster, according to internal tests.


## Vision and Future Impact: A Pragmatic Modular Approach

Long-term, MCP favors modularity where each module adds specific tools, enriching AI without complexity. For merchants, this means fewer routine tasks; for agencies, a focus on strategy.

Key skills: Master prompts for efficient workflows. The impact? Increased productivity of 20-30%, according to e-commerce benchmarks, making PrestaShop more adaptable.

## Conclusion: Modularity in Service of AI

The PS MCP Server and MCP Tools Plus offer pragmatic AI integration, exposing tools that solve real needs like quick analyses and automation. The added value is clear: time savings, error reduction, and better responsiveness. If you manage a PrestaShop store, test a simple prompt to see the impact. What will be your first query to this AI assistant?

---

*Article published on November 19, 2025 by Nicolas Dabène – PrestaShop & AI Expert with 15+ years of experience in e-commerce development.*
