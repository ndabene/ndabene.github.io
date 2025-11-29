---
layout: post
title: What if AI Rejected Your Code Wrongly?
date: 2025-11-13
author: Nicolas Dabène
categories:
- AI
- Development
- Ethics
tags:
- AI
- development
- security
excerpt: What if AI rejected your code not because it's bad, but because it *thinks*
  it is? This article explores the hidden biases of automated code review systems
  and their consequences on our development practices.
image: /assets/images/blog/2025/11/ia-biais-code-review.webp
lang: en
ref: ia-biais-code-review-nov2025
featured: true
difficulty: Advanced
estimated_reading_time: 10 minutes
technologies:
- Generative AI
- LLM
- GitHub Copilot
- SonarQube
faq:
- question: Why aren't AI code review tools neutral?
  answer: No AI is neutral because every AI reflects its data, designers and training
    choices. Models learn mainly from Western English-language code in certain dominant
    languages. If your code doesn't resemble what they know, it will be judged abnormal,
    not wrong, just non-standard.
- question: What are the main types of bias in AI reviewers?
  answer: Training biases (mostly Western English-language data), evaluation biases
    (preference for most-seen forms even if not optimal in your context), and context
    biases (AI doesn't understand your business constraints, technical debt, business
    priorities).
- question: How do AI biases concretely affect developers?
  answer: 'Developers unconsciously align with majority conventions, avoid atypical
    structures, write to please the machine rather than humans. In large companies
    with automated CI/CD review, bias becomes systemic: poorly rated code can delay
    deployment, distort performance evaluation, influence HR decisions.'
- question: How to make AI reviewers fairer?
  answer: Diversify datasets (varied languages, styles, structures), reintroduce humans
    with human-in-the-loop system to contextualize, document model logic (explain
    why code is judged problematic), and train developers to detect when AI feedback
    is legitimate or arbitrary.
- question: Should we trust automated code review tools?
  answer: AI should assist, not judge alone. Good code isn't what pleases an AI, but
    what serves its user, respects its context and keeps clear intent. Humans retain
    final responsibility, machines provide assistance. Delegating judgment entirely
    risks automating conformism.
- question: Is Claude free?
  answer: Claude offers a limited free version and Pro ($20/month) and Team ($30/month
    per user) subscriptions.
---

# What if AI Rejected Your Code for the Wrong Reasons?
## Hidden Biases in Automated Code Review Tools

---

### Imagine the Scene

You submit your pull request.
Everything is clean, tested, functional.
But your code is rejected.

Not because it's bad...
But because an AI *thinks* it is.

The automated comment appears:
> "This method seems inefficient. Consider refactoring."

Except that — you know — your approach is intentional. Optimized for your business context.
And then, a question crosses your mind:
**What if AI wasn't as neutral as we think?**

---

### The (Too Good to Be True) Promise of AI in Code Review

In recent years, automated code review tools have established themselves as indispensable allies for developers.
GitHub Copilot, SonarQube, Amazon CodeWhisperer, Codacy... all promise to make code "better, faster, safer".

The argument is seductive:
- Fewer bugs.
- Consistent style.
- Increased productivity.

And above all, **an "objective" code evaluation**.
AI has no ego, no human biases... in theory.

But in reality, **no AI is neutral**.
Because every AI reflects its data, its designers and their training choices.
In other words: our review tools reproduce, in their own way, our own blind spots.

---

### Where Biases Are Born: Under the Hood of Intelligent Reviewers

#### 1. Training Biases
The models that evaluate your code learn from huge volumes of public data — often from GitHub, Stack Overflow or popular open-source projects.

Problem:
- These projects come **mainly from Western, English-speaking developers**,
- written in **certain dominant languages** (Python, JavaScript, Java),
- and respecting **specific conventions** (PEP8, PSR-12...).

Result: if your code doesn't resemble what they know, it will be judged... *abnormal*.
Not wrong, not dangerous, just *non-standard*.
And that's where bias begins.

#### 2. Evaluation Biases
AIs tend to value code they've seen most.
A model will "prefer":
- a verbose function over a concise lambda,
- a mainstream design pattern over a more minimalist approach,
- a useless comment rather than self-documented code.

Why?
Because in its data, these forms appear as "best practices".
Not because they are *in your context*.

#### 3. Context Biases
A human reviewer understands project constraints: technical debt, compatibility, performance, business priority.
AI only sees code.
And without context, it misinterprets.
What it perceives as "inefficiency" may actually be a perfectly controlled compromise.

---

### Concrete Examples

**Case #1 — Too Concise Code.**
A dev writes an elegant function, three lines, purely functional.
AI comments:
> "This code is hard to read. Consider expanding logic."
Translation: *I didn't understand, so it's bad.*

**Case #2 — Non-English Conventions.**
A `prix_total` variable is flagged as non-compliant:
> "Variable name should be in English."
Why? Because AI learned that "good code" = English.
The code is however clear, coherent, localized — but negatively judged.

**Case #3 — The Forbidden Word.**
An automated reviewer blocks a PR containing `blacklist` and `whitelist`, without context.
The intent was technical (IP lists), but automatic correction creates a false positive.
Once again, the machine doesn't understand meaning, only correlation.

---

### Invisible Consequences

These biases are not trivial.
Little by little, they modify our behaviors:
- we unconsciously align with majority conventions,
- we avoid "atypical" structures,
- we write *to please the machine*, not for humans.

And in large companies, where these review systems are integrated into CI/CD, **bias becomes systemic**.
Poorly rated code can delay deployment, distort performance evaluation, even influence HR decisions.
The risk is no longer just technical — it becomes organizational.

---

### How to Make AI Reviewers Fairer?

#### 1. Diversify Datasets
Train models on varied code: languages, styles, structures, constraints.
Break out of the default GitHub prism.

#### 2. Reintroduce Humans
AI should assist, not judge alone.
A *human-in-the-loop* system allows contextualizing, validating, nuancing verdicts.

#### 3. Document Model Logic
Transparency = trust.
Review tools should explain *why* code is judged problematic, and on what basis.
A clear explanation is worth a thousand automatic alerts.

#### 4. Train Developers to Detect Bias
Learn to recognize when AI feedback is legitimate... or arbitrary.
Code ethics becomes a skill in its own right.

---

### Towards a New Development Ethics

We're entering a fascinating era where AI doesn't just generate code — it judges it.
But if we want this evolution to be beneficial, we must **restore symmetry**:
humans retain responsibility, machines provide assistance.

> Good code isn't what pleases an AI.
> It's what serves its user, respects its context and keeps clear intent.

The future of development won't be played out only on productivity...
It will be played out on **algorithmic justice** in our tools.

---

### Going Further

This subject raises an essential question:
**how far can we delegate our judgment to a machine?**

We trust AI to detect our errors,
but sometimes, it invents others.
And if, by wanting to automate quality,
we end up automating conformism?

> The future of code doesn't just depend on what we write,
> but on **what we accept to let judge in our place.**

Reflecting on these biases is already taking a step toward fairer AI —
and toward development that remains profoundly human.
