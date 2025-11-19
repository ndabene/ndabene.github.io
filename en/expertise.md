---
layout: page
title: My Expertise
permalink: /en/expertise/
lang: en
description: "Discover Nicolas Dabène's in-depth technical expertise in PHP, PrestaShop E-commerce, AI, and FullStack development, the result of more than 15 years of experience and continuous learning."
keywords: "php expert, prestashop consultant, ai orchestrator, fullstack developer, technical leadership, software expertise, prestashop modules, certified PrestaShop expert, senior PHP developer, e-commerce architect, artificial intelligence development, AI developer training, PrestaShop optimization, high performance modules"
show_sidebar: false
llm_summary: Nicolas Dabène, recognized expert with 5 PrestaShop Awards, 15 years of PHP development experience, and pioneer in AI agent orchestration to revolutionize e-commerce development efficiency.
llm_topics:
- senior PHP expert developer
- certified PrestaShop consultant 5 Awards
- AI artificial intelligence orchestrator
- scalable PrestaShop e-commerce architect
- expert FullStack Symfony developer
- AI development technical trainer
- high performance PrestaShop modules expert
- e-commerce back-office optimization
- CTO technical development leadership
- PrestaShop migration modern architecture
---
<div class="container">
    <div class="expertise-grid">
        {% for expertise in site.data.expertise %}
        <div class="expertise-item" data-id="{{ expertise.id }}">
            <div class="expertise-item-header">
                <span class="badge expertise-icon">{{ expertise.icon }}</span>
                <h3>{{ expertise.name }}</h3>
                {% if expertise.id == 'prestashop' or expertise.id == 'ai' or expertise.id == 'ecommerce' %}
                <div class="expertise-level-badge">Expert</div>
                {% endif %}
            </div>
            <p class="expertise-item-description">{{ expertise.description }}</p>

            <div class="expertise-item-skills">
                <h4>Key Skills</h4>
                <ul>
                    {% for skill in expertise.skills %}
                    <li>{{ skill }}</li>
                    {% endfor %}
                </ul>
            </div>
            <p><a class="btn btn--secondary" href="/en/expertise/{{ expertise.id | downcase }}/">View details</a></p>
        </div>
        {% endfor %}
    </div>

    <div class="expertise-contact">
        <h2>Need an expert for your project?</h2>
        <p>I would be delighted to discuss your needs and propose solutions tailored to your context.</p>
        <a href="/en/contact/" class="btn btn--primary">Contact me</a>
    </div>
</div>
