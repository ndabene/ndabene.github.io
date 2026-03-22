---
layout: post
title: "I Stopped Using BMAD. Here's What Replaced It."
date: 2026-04-14
lang: en
ref: "jai-arrete-bmad-voici-ce-qui-la-remplace"
author: "Nicolas Dabène"
category: "intelligence-artificielle"
subcategory: "developpement"
categories:
  - "Artificial Intelligence"
  - "Development"
tags:
  - "bmad"
  - "agentic-dev"
  - "orchestration-agents"
  - "methode-bmad"
  - "prestashop"
  - "ai"
excerpt: "I used BMAD successfully. Then on a project with 14 agents, manual coordination became a bottleneck. Here's how agentic orchestration replaced it."
image: "/assets/images/blog/2026/04/jai-arrete-bmad-voici-ce-qui-la-remplace/image-principale.webp"
featured: false
canonical_url: "https://nicolas-dabene.fr/articles/2026/04/14/jai-arrete-bmad-voici-ce-qui-la-remplace/"
difficulty: "Advanced"
technologies:
  - "PrestaShop"
  - "Claude Code"
  - "BMAD"
estimated_reading_time: "11 minutes"
llm_summary: "I stopped using BMAD and replaced it with multi-agent orchestration with 14 specialized agents. Real feedback: why manual coordination becomes a bottleneck, how the architecture solves it, and the real posture change — from supervising architect to governance decision-maker."
llm_topics:
  - "BMAD method"
  - "Agentic orchestration"
  - "Multi-agent systems"
  - "PrestaShop development"
  - "AI development workflow"
  - "Claude Code workflow"
  - "Human routing bottleneck"
llm_key_quote: "BMAD: you carry complexity in your head. Agentic orchestration: you transfer it to the architecture."
llm_target_queries:
  - "BMAD method vs agentic orchestration"
  - "multi-agent development workflow"
  - "when to switch from BMAD to orchestration"
  - "Claude Code multi-agent PrestaShop"
faq:
  - question: "Why stop BMAD when it was working well?"
    answer: "BMAD works for normal-sized projects, but on a complex project with 14 specialized agents in parallel, manual coordination becomes a bottleneck. Orchestration externalizes this complexity."
  - question: "Does agentic orchestration completely replace BMAD?"
    answer: "No. BMAD teaches you to think before generating. Orchestration executes better what you've already learned to frame. The two remain complementary."
  - question: "What's the entry cost of multi-agent orchestration?"
    answer: "Several weeks of work: building the architecture, defining agent scopes without overlap, writing skills that carry the business context."
---

*By Nicolas Dabène — AI-Native E-commerce Architect*

---

## This Is Not an Anti-BMAD Article

I want to be clear about this before I even start.

BMAD made me a better AI developer. The method forces something most people rush: thinking before generating. Structured brief, defined roles, sequential phases. When you used a single agent trying to do everything at once, BMAD taught you to decompose. That's a real gain.

But in March 2026, on a PrestaShop project involving 14 specialized agents in parallel, I realized I was still carrying BMAD as a mental framework when my needs had changed. I was still manually orchestrating things the architecture could — should — handle alone.

That's what this article is about. Not a problem with BMAD. An evolution beyond it.

---

## What BMAD Actually Solves

If you don't know BMAD, here's a short definition: it's an AI-assisted development method that structures work into phases (Brief, Method, Agent, Delivery). The core idea is that you don't throw a vague request at an LLM — you build a structured conversation with a clear role, precise expectations, a defined output.

What changes in practice:

- You stop getting generic answers because you're asking generic questions
- You think in systems (roles, responsibilities, outputs) rather than one-shot prompts
- You build continuity between sessions instead of starting from scratch

On normal-sized projects — a PrestaShop module, an n8n workflow, a structured blog post — BMAD is effective. The friction it introduces (framing, briefing, phase validation) is productive. It prevents you from going down the wrong path for an hour.

I worked this way for several months. My deliverables gained consistency. My Claude Code sessions became more predictable. PS9 BC breaks no longer caught me by surprise because I included them in the brief.

So BMAD works. That's not the question.

---

## The Project That Changed Everything

End of January, I was working on a complete rewrite of the `gmerchantcenter_pro` module — Google Merchant Center PRO, version 2.0.0. Rewriting the taxonomy system, custom labels, exclusion rules, and in parallel an update to the product tags and attributes system.

This isn't a simple module. It's a wide technical surface: PrestaShop 9 Admin API, CQRS, API Platform, Symfony 6, plus all the Google Merchant Center specific business logic. And in this project, I needed multiple expertise at once: architecture, implementation, security, Marketplace packaging, tests, changelog.

With BMAD, I orchestrated manually. I briefed an agent on architecture. I took their output, passed it to the implementation agent. I came back, checked security, launched packaging. Sequential. Controlled. Me at the center of every relay pass.

And that's when I saw the problem.

I was no longer a supervising architect. I had become a human router. My job was to copy-paste outputs from one context to another, reformulate what agent A had produced so agent B could understand it, maintain overall coherence in my head because no agent had it.

BMAD gave me structure. But that structure, I was carrying it entirely myself.

---

## What Happens When You Externalize Orchestration

The question I asked myself: is this manual coordination irreducible, or is it just accidental complexity I accepted out of habit?

The answer became obvious when I started describing what I was doing out loud: I took a request, analyzed its dependencies, decided who could work in parallel and who had to wait, routed, assembled, validated. That's exactly what an orchestrator does.

Except I was doing it manually, on every task, with all the cognitive load that implies.

Agentic orchestration, as I've implemented it since, externalizes this work. A `master` agent receives the request. It analyzes real dependencies. It launches specialized agents — in parallel when possible, in sequence when dependencies require it. It assembles. It returns a coherent output.

What changes for you: you decide what gets done, not how it's coordinated.

---

## What the Architecture Looks Like Today

I describe it in detail in [the March 31 article](https://nicolas-dabene.fr/articles/2026/03/31/pourquoi-orchestration-multi-agents-prestashop/), but here's the essential to understand the difference with BMAD.

**The `master` agent** is the single entry point. It doesn't touch code. It doesn't write. Its sole responsibility: understand the request, analyze dependencies, route to the right specialists, synthesize the result.

**14 specialized PrestaShop agents** — each with a strict scope. `prestashop-architect` designs, `prestashop-module-dev` implements, `prestashop-security` audits, `prestashop-phpstan` statically analyzes, `prestashop-packaging` prepares for Marketplace. They don't overlap. They don't compromise between two expertises.

**The skills** — Markdown files that carry business rules. PS9 conventions, BC breaks between versions, patterns to avoid on multistore, Marketplace validation checklist. Each agent loads its skills before acting. This replaces the "context brief" I was manually rewriting at every BMAD session.

The concrete difference: when I ask to create a PrestaShop admin page with filterable product listing, `master` analyzes the request and produces something like this —

Step 1 (sequential): `prestashop-architect` sets the structure — Symfony controller, Grid, services, hooks.  
Step 2 (parallel): `prestashop-module-dev` implements, `prestashop-security` audits permissions, `prestashop-testing` designs the test strategy. Simultaneously.  
Step 3: `qa-reviewer` validates before delivery.

With BMAD, this sequence, I was piloting it. Now it's in the architecture.

---

## What BMAD Does That Orchestration Doesn't Replace

I said it at the beginning, but it's important to specify here.

BMAD teaches you to think. Agentic orchestration executes better what you've already learned to think.

If you've never structured an AI request, if you still arrive with "make me a module that does X" without context or constraints or definition of what "done" means — orchestration won't save you. You'll just have 14 agents going in different directions very quickly.

BMAD, or any method that forces you to frame before acting, remains a necessary step. Not because it's the destination, but because it builds the reflexes you need to use orchestration correctly.

The transition I made wouldn't have happened if I hadn't spent months working with BMAD. I wouldn't have seen it coming because I wouldn't have known what I was trying to improve.

---

## The Real Break: Who Carries the Complexity

If I had to summarize the difference in one formulation, it would be this:

**BMAD:** you carry coordination complexity in your head, and you use the method to structure it.  
**Agentic orchestration:** you transfer this coordination complexity to the architecture, and you keep your energy for decisions that can't be automated.

It's not the same thing.

In BMAD, even well applied, you remain the pivot. You're the one who knows where the project stands, who knows which agents produced what, who maintains overall coherence. The method helps you do it well. But it's always you doing it.

In an orchestrated multi-agent architecture, overall coherence is in the system. `master` knows what was done, by whom, in what order. The skills carry the PrestaShop context you were rewriting manually. The dependency flow is analyzed, not memorized.

You go from AI project manager to AI systems architect. That's a posture change, not just a tooling change.

---

## Should You Make the Same Transition?

Probably not right now.

Multi-agent orchestration has a real entry cost. Building the architecture, defining agent scopes without overlap, writing skills that carry the right context — that's several weeks of work before drawing value from it. And if you do this without having integrated the framing reflexes BMAD teaches, you'll create complexity without structure, which is worse than having none.

The transition makes sense when you encounter this precise signal: you spend more time coordinating between agents than producing or deciding. When you find yourself being the human router of your own AI stack.

If that's not your case yet, stay on BMAD or the method that forces you to frame. Optimize execution. Build the reflexes.

If it is your case — if you recognize yourself in the "human router" I described — then the architecture deserves real investigation.

---

## What Comes Next

I don't think agentic orchestration is the final form.

What I see emerging is agents that manage the evolution of their skills themselves. That detect when a PrestaShop convention has changed and update their rules base. That know, without you telling them, that the project went from PS8 to PS9 and that some patterns are now deprecated.

We're not there yet. But the direction is clear: less human coordination, more human governance. Less "I manage the flow", more "I decide the rules of the flow".

BMAD was a step toward this. Agentic orchestration is another. The next one, I don't know exactly what form it will take — but I know it will always be a question of where to place intelligence: in the developer's head, in the method, or in the architecture itself.

The answer changes as tools change. What doesn't change: the quality of decisions we make about this placement.

---

*This article follows [Why Multi-Agent Orchestration Is No Longer Optional for PrestaShop](https://nicolas-dabene.fr/articles/2026/03/31/pourquoi-orchestration-multi-agents-prestashop/) — if you want the details of the architecture itself, that's where to look.*