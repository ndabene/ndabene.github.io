---
layout: page
title: Mon Expertise
permalink: /expertise/
description: "Découvrez l'expertise technique approfondie de Nicolas Dabène en PHP, E-commerce PrestaShop, IA, et développement FullStack, fruit de plus de 15 ans d'expérience et d'apprentissage continu."
keywords: "expert php, consultant prestashop, orchestrateur ia, développeur fullstack, leadership technique, expertise logicielle, modules prestashop"
show_sidebar: false
---

<div class="container">
    <div class="page-header">
        <h1>{{ page.title }}</h1>
        <p class="section-description">Mon approche du développement logiciel s'appuie sur un mélange de maîtrise technique approfondie, de réflexion stratégique et d'engagement à créer une valeur business tangible. J'évolue continuellement pour rester à la pointe de la technologie, garantissant que les solutions que je conçois sont robustes, évolutives, innovantes et pérennes.</p>
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
                <h4>Compétences clés</h4>
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
        <h2>Besoin d'un expert pour votre projet ?</h2>
        <p>Je serais ravi d'échanger sur vos besoins et de vous proposer des solutions adaptées à votre contexte.</p>
        <a href="/contact/" class="btn btn--primary">Me contacter</a>
    </div>
</div>