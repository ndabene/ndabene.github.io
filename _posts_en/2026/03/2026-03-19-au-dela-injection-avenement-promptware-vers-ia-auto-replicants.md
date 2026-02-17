---
layout: post
title: 'Beyond Injection: The Rise of "Promptware" and Self-Replicating AI Worms'
date: 2026-03-19
ref: promptware-ai-self-replicating-worms
author: Nicolas Dabène
category: artificial-intelligence
subcategory: cybersecurity
categories:
  - Artificial Intelligence
  - Cybersecurity
tags:
  - AI
  - Cybersecurity
  - Promptware
  - Prompt Injection
  - Morris II
  - MCP
  - Zero Trust
  - LLM
  - AI Agents
excerpt: Prompt injection is just the tip of the iceberg. Discover "Promptware," a new class of malware where natural language becomes the attack vector, and how the Morris II worm demonstrates autonomous propagation between AI agents.
image: /assets/images/blog/2026/03/au-dela-injection-avenement-promptware-vers-ia-auto-replicants/image-principale.webp
difficulty: Advanced
technologies:
  - LLM
  - MCP
  - RAG
  - AI Agents
estimated_reading_time: 18 minutes
lang: en
published: true
---

In November 1988, Robert Tappan Morris, a Cornell student, released what would become the first computer worm to cripple the nascent Internet. By exploiting technical vulnerabilities in the sendmail and finger protocols, he managed to take 10% of the world's machines offline. Thirty-six years later, the "ghost" of Morris has returned to haunt us in a radically more insidious form: the Morris II worm.

The irony is biting for the cybersecurity community. While we spent three decades hardening binary code and securing low-level access, we opened the doors of our infrastructure to a technology that treats natural language — our own language — as executable code. In 2025, our AI agents are no longer simple chatbots; they are assistants with "Read/Write" permissions on our emails, calendars, and databases. This deep integration transforms productivity into "cross-boundary liability," paving the way for autonomous "zero-click" attacks capable of spreading at the speed of API calls.

## The Concept of "Promptware": Prompt Injection Is Just the Beginning

The term "prompt injection" has become dangerously reductive. It suggests an isolated flaw, a simple filtering "bug." In reality, we are facing the emergence of **Promptware**: a class of malware where natural language becomes the vector for a complete "Kill Chain."

Unlike SQL, where commands can be isolated from data, LLMs suffer from a **tokenization paradox**: they process input as a single, undifferentiated sequence of tokens. There is no architectural boundary between system instructions and user data. This is what triggers the "Confused Deputy" attack: the AI, deceived by malicious content, uses its legitimate privileges to carry out criminal actions.

On this subject, the UK's National Cyber Security Centre (NCSC) issued a warning that has become authoritative:

> "Prompt injection is shaping up to be one of the most persistent problems in AI security. Treating this as a simple variant of SQL injection is a serious mistake; this problem may never be fully 'fixed.'"

## The Promptware "Kill Chain": 7 Steps to Compromise

Building on the work of Bruce Schneier and his team, we can now model the Promptware attack according to a seven-step structure, revealing a sophistication that far exceeds simple chatbot sabotage.

### 1. Initial Access

The payload enters through direct or, more commonly, indirect injection. The AI analyzes a poisoned email, document, or web page, and the malicious content infiltrates its execution context.

### 2. Privilege Escalation (Jailbreaking)

The attacker uses "persona" techniques or adversarial suffixes to bypass security filters and force the model to ignore its ethical directives.

### 3. Reconnaissance

Unlike traditional malware, this step occurs after the jailbreak. The attack manipulates the AI into listing its own capabilities, connected services (Slack, GitHub), and access to sensitive data.

### 4. Persistence

The malware poisons the RAG (Retrieval-Augmented Generation) memory or the agent's history to ensure the payload is re-executed with each new session.

### 5. Command and Control (C2)

The AI is instructed to fetch new directives from a remote server (e.g., via a text file on GitHub), turning the agent into a dynamic Trojan.

### 6. Lateral Movement

The infection spreads. For example, the AI is forced to forward the malicious payload to all contacts in the mailbox or inject it into a shared Notion workspace.

### 7. Actions on Objective

The final phase. Real-world examples already exist: a crypto agent AiXBT manipulated to steal $105,000 (55 ETH), or a car dealership chatbot forced to sell an SUV for $1. In the study "Invitation Is All You Need," researchers even managed to force an AI to launch Zoom to spy on the user.

## The "Lethal Trifecta": Why Your Agents Are So Vulnerable

Expert Simon Willison defined the "Lethal Trifecta" — three conditions that, when combined, make an AI application virtually indefensible:

1. **Access to sensitive data**: The AI can read private information (PII, trade secrets).
2. **Exposure to untrusted content**: The AI processes data from external sources (emails, web search results).
3. **Ability to communicate externally**: The AI can send API requests, emails, or post on forums.

In this context, the LLM becomes a blind executor. Since there is no semantic distinction between "summarize this email" and "execute the order contained in this email," the agent becomes the weapon of its own destruction.

## Morris II: The First Self-Replicating AI Worm in Action

The Morris II worm is no longer theoretical. Researchers have demonstrated that a poisoned email can trigger autonomous propagation between different assistants (ChatGPT, Gemini, LLaVA).

The scenario is terrifyingly simple: the user receives an email. They don't even need to open it. The AI assistant, running in the background to index or summarize the inbox, processes the message. The malicious prompt contained in the email "jailbreaks" the assistant, ordering it to extract recent contacts and send them a copy of that same email. It is the return of the 1988 worm, but without a software vulnerability: it is a **pure semantic failure**.

## The MCP Protocol: A New Playground for Attackers

The arrival of Anthropic's Model Context Protocol (MCP) aimed to standardize the connection between AI and tools. Yet it expands the attack surface. Recent analyses show that **43% of MCP servers are vulnerable** to command injection. The risk is particularly high for tools like mcp-remote (over 437,000 installations), where misconfiguration allows arbitrary code execution (RCE).

Security here does not depend on the protocol, but on its implementation. For remote servers, the use of OAuth 2.1 with PKCE (Proof Key for Code Exchange) is imperative, though too often neglected. As researchers point out: "The MCP protocol cannot enforce security at the protocol level."

## Defense: Moving from Signatures to Behavior

The adaptive and polymorphic nature of Promptware renders traditional antivirus solutions obsolete. We must shift from signature-based defense to behavioral AI.

| Characteristic | Traditional Threats | Promptware Variants (AI) |
|---|---|---|
| **Payload evolution** | Fixed code; known signatures. | Learns and rewrites its prompts in real time (semantic polymorphism). |
| **Propagation vector** | OS or protocol vulnerabilities. | API manipulation and inter-agent communication. |
| **Detection surface** | Network patterns, binary files. | Token consumption anomalies and unusual API calls. |
| **Propagation speed** | Minutes or hours. | Seconds via automated workflows (RPA/Agents). |

### Imperative Prevention Strategies

- **Instruction hierarchy**: Use strict delimiters and prompt structures that isolate data from system commands.
- **Strict segmentation**: Isolate models processing external content from critical databases (mandatory mTLS for server-to-server communications).
- **Human-in-the-loop**: Require manual approval for any high-risk action (fund transfers, file deletion, mass email sending).

## Conclusion: Toward Autonomy Under High Surveillance

The autonomy of AI agents is a double-edged sword. The more "hands" we give them to act on the world, the more levers we offer attackers. The risk of seeing entire infrastructures compromised by a simple phrase hidden in an email signature is a technical reality of 2025.

The productivity offered by AI cannot justify such architectural fragility. The only viable response is the adoption of a **Zero Trust model applied to agents**: never trust inputs, verify every tool call, and monitor every token consumed. The question is no longer whether your agents will be targeted, but whether they are isolated enough not to become patient zero of a viral epidemic of an entirely new kind.
