---
layout: page
title: My Expertise
translation_id: expertise
permalink: /en/expertise/
description: "Discover the in-depth technical expertise of Nicolas Dabène in PHP, PrestaShop E-commerce, AI, and FullStack development, the result of over 15 years of experience and continuous learning."
keywords: "php expert, prestashop consultant, ai orchestrator, fullstack developer, technical leadership, software expertise, prestashop modules"
show_sidebar: false
---

<div class="container">
    <div class="page-header">
        <h1>{{ page.title }}</h1>
        <p class="section-description">My approach to software development is based on a blend of deep technical mastery, strategic thinking, and a commitment to creating tangible business value. I continuously evolve to stay at the forefront of technology, ensuring that the solutions I design are robust, scalable, innovative, and future-proof.</p>
    </div>

    <div class="expertise-grid">
        {% for expertise in site.data.expertise %}
        <div class="expertise-item" data-id="{{ expertise.id }}">
            <div class="expertise-item-header">
                <span class="badge badge--{{ expertise.icon }}">{{ expertise.icon }}</span>
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
        </div>
        {% endfor %}
    </div>

    <div class="expertise-contact">
        <h2>Need an expert for your project?</h2>
        <p>I would be delighted to discuss your needs and offer solutions tailored to your context.</p>
        <a href="/en/contact/" class="btn btn--primary">Contact Me</a>
    </div>
</div>
