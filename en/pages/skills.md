---
layout: default
title: Expertise & Achievements
translation_id: skills
permalink: /en/skills/
description: "Recognized PrestaShop expert with 5 official Awards, 150k+ active installations, and revolutionary AI expertise. Autonomous developer specializing in e-commerce."
keywords: "prestashop expert, prestashop awards, senior php developer, ai orchestration, nicolas dabène, businesstech, prestashop modules"
show_sidebar: false
body_class: "page-skills"
---

<section class="page-hero-section">
    <div class="container">
        <nav class="breadcrumb">
            <a href="/en/">Home</a>
            <span>{{ page.title }}</span>
        </nav>
        <div class="hero-content">
            <h1>{{ page.title }}</h1>
            <p class="section-description">Autonomous developer, capable of taking full responsibility for a product from its technical conception to its commercial success, combining technical rigor, cross-functional curiosity, and relational excellence.</p>
        </div>
    </div>
</section>

<section class="skills-main-section">
    <div class="container">
        <!-- Key Metrics -->
        <div class="skills-metrics">
            <div class="metric-card">
                <div class="metric-number">100k+</div>
                <div class="metric-label">Equipped Stores</div>
            </div>
            <div class="metric-card">
                <div class="metric-number">5</div>
                <div class="metric-label">PrestaShop Awards</div>
            </div>
            <div class="metric-card">
                <div class="metric-number">30</div>
                <div class="metric-label">Modules Developed</div>
            </div>
            <div class="metric-card">
                <div class="metric-number">4x</div>
                <div class="metric-label">AI Productivity Gain</div>
            </div>
        </div>

        <!-- Value Trilogy -->
        <div class="value-trilogy">
            <div class="value-card">
                <div class="value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <h3>Adaptability</h3>
                <p>Technical and relational flexibility according to context</p>
            </div>
            <div class="value-card">
                <div class="value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                </div>
                <h3>Intelligent Sharing</h3>
                <p>Transmission of expertise to technical and non-technical teams</p>
            </div>
            <div class="value-card">
                <div class="value-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
                    </svg>
                </div>
                <h3>Intelligent Coding</h3>
                <p>AI orchestration to multiply efficiency (4x gain on deadlines)</p>
            </div>
        </div>

        <!-- SECTIONS SEPARATED BY CATEGORY -->
        {% assign categories = site.data.skills | group_by: "category" %}
        {% for category in categories %}

        <!-- SECTION {{ category.name | upcase }} -->
        <section class="skills-category-section" data-category="{{ category.name }}">
            <div class="category-header-section">
                {% comment %} Retrieving title from YAML file {% endcomment %}
                {% assign category_title = '' %}
                {% assign category_icon = '' %}
                {% if category.name == 'php-backend' %}
                    {% assign category_title = "PHP & Backend - 15 years of expertise" %}
                    {% assign category_icon = '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>' %}
                {% elsif category.name == 'ecommerce' %}
                    {% assign category_title = "PrestaShop - Elite Expert (12 years)" %}
                    {% assign category_icon = '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>' %}
                {% elsif category.name == 'ai' %}
                    {% assign category_title = "Artificial Intelligence - Innovation & Efficiency" %}
                    {% assign category_icon = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v6M15 1v6M9 17v6M15 17v6M1 9h6M1 15h6M17 9h6M17 15h6"/>' %}
                {% elsif category.name == 'frontend' %}
                    {% assign category_title = "Frontend & UX - E-commerce Specialization" %}
                    {% assign category_icon = '<polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>' %}
                {% elsif category.name == 'devops' %}
                    {% assign category_title = "DevOps & Tools - Technical Autonomy" %}
                    {% assign category_icon = '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>' %}
                {% elsif category.name == 'integrations' %}
                    {% assign category_title = "Integrations & Problem Solving" %}
                    {% assign category_icon = '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>' %}
                {% elsif category.name == 'leadership' %}
                    {% assign category_title = "Leadership & Autonomy" %}
                    {% assign category_icon = '<path d="M9 12l2 2 4-4M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>' %}
                {% elsif category.name == 'soft-skills' %}
                    {% assign category_title = "Relational Excellence" %}
                    {% assign category_icon = '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' %}
                {% elsif category.name == 'learning' %}
                    {% assign category_title = "Innovation & Adaptability" %}
                    {% assign category_icon = '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' %}
                {% endif %}

                <div class="category-icon-section">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        {{ category_icon }}
                    </svg>
                </div>
                <h2 class="category-title-section">{{ category_title }}</h2>
                <div class="category-skills-count">{{ category.items.size }} skills</div>
            </div>

            <div class="skills-grid-section">
                {% for skill in category.items %}
                <div class="skill-card-section" data-category="{{ skill.category }}">

                    <div class="skill-content-section">
                        <h3 class="skill-name-section">{{ skill.name }}</h3>
                        <p class="skill-description-section">{{ skill.description }}</p>

                        {% if skill.achievements %}
                        <div class="skill-achievements-section">
                            <div class="achievement-item-section">
                                <svg class="achievement-icon-section" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="8" r="7"/>
                                    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
                                </svg>
                                <span class="achievement-text-section">{{ skill.achievements }}</span>
                            </div>
                        </div>
                        {% endif %}

                        {% if skill.impact %}
                        <div class="skill-impact-section">
                            <div class="impact-item-section">
                                <svg class="impact-icon-section" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
                                </svg>
                                <span class="impact-text-section">{{ skill.impact }}</span>
                            </div>
                        </div>
                        {% endif %}
                    </div>
                </div>
                {% endfor %}
            </div>
        </section>

        {% endfor %}
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Skill level animation
    function animateSkillLevels() {
        const levelCircles = document.querySelectorAll('.level-circle[data-level]');

        levelCircles.forEach((circle, index) => {
            const level = parseInt(circle.getAttribute('data-level'));

            setTimeout(() => {
                circle.style.setProperty('--level', level);
                circle.style.background = `conic-gradient(from 0deg, #059669 0%, #059669 ${level * 3.6}deg, #e2e8f0 ${level * 3.6}deg, #e2e8f0 100%)`;
            }, index * 100);
        });
    }

    // Filtering system temporarily disabled
    // Filtering will be re-implemented in a future version

    // Metrics animation
    function animateMetrics() {
        const metrics = document.querySelectorAll('.metric-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;

                    if (finalValue.includes('k+') || finalValue.includes('x')) {
                        const numericValue = parseInt(finalValue);
                        if (!isNaN(numericValue)) {
                            let currentValue = 0;
                            const increment = numericValue / 50;

                            const counter = setInterval(() => {
                                currentValue += increment;
                                if (currentValue >= numericValue) {
                                    currentValue = numericValue;
                                    clearInterval(counter);
                                }

                                if (finalValue.includes('k+')) {
                                    target.textContent = Math.round(currentValue) + 'k+';
                                } else if (finalValue.includes('x')) {
                                    target.textContent = Math.round(currentValue) + 'x';
                                } else {
                                    target.textContent = Math.round(currentValue);
                                }
                            }, 50);
                        }
                    }

                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        metrics.forEach(metric => observer.observe(metric));
    }

    // Initialization
    animateSkillLevels();
    animateMetrics();
});
</script>
