---
layout: default
title: Technical Skills
permalink: /en/skills/
lang: en
description: "15+ years of expertise in web development, PrestaShop e-commerce and artificial intelligence. 150K+ active installations, 5 PrestaShop Awards, 30+ modules created."
keywords: "technical skills, prestashop expert, php developer, artificial intelligence, e-commerce, symfony, laravel, mysql"
body_class: "page-skills-modern"
---

<!-- HERO SKILLS -->
<section class="hero-skills">
    <div class="container">
        <h1>Technical Skills</h1>
        <p class="lead">Over 15 years of experience in web development, e-commerce and AI integration</p>

        <div class="stats-pills">
            {% for stat in site.data.skills_featured.hero_stats %}
            <div class="stat-pill">
                <i class="fas {{ stat.icon }}"></i>
                <div>
                    <span class="stat-value">{{ stat.value }}</span>
                    <span class="stat-label">{{ stat.label }}</span>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>

<!-- PRESTASHOP & E-COMMERCE -->
<section class="skills-category-section">
    <div class="container">
        <div class="category-header">
            <div class="category-icon">{{ site.data.skills_featured.prestashop.icon }}</div>
            <h2>{{ site.data.skills_featured.prestashop.title }}</h2>
            <p class="category-subtitle">{{ site.data.skills_featured.prestashop.subtitle }}</p>
        </div>

        <div class="skills-grid">
            {% for skill in site.data.skills_featured.prestashop.skills %}
            <article class="skill-card-modern prestashop">
                <div class="skill-card-header">
                    <span class="skill-category-badge">{{ skill.category }}</span>
                    <h3>{{ skill.name }}</h3>
                </div>
                <div class="skill-card-content">
                    <p>{{ skill.description }}</p>
                    <div class="skill-metric">
                        <i class="fas fa-chart-line"></i>
                        <span>{{ skill.metric }}</span>
                    </div>
                </div>
                <div class="skill-card-footer">
                    <div class="skill-tags">
                        {% for tag in skill.tags %}
                        <span class="tag-pill">#{{ tag }}</span>
                        {% endfor %}
                    </div>
                </div>
            </article>
            {% endfor %}
        </div>
    </div>
</section>

<!-- PHP & BACKEND -->
<section class="skills-category-section">
    <div class="container">
        <div class="category-header">
            <div class="category-icon">{{ site.data.skills_featured.backend.icon }}</div>
            <h2>{{ site.data.skills_featured.backend.title }}</h2>
            <p class="category-subtitle">{{ site.data.skills_featured.backend.subtitle }}</p>
        </div>

        <div class="skills-grid">
            {% for skill in site.data.skills_featured.backend.skills %}
            <article class="skill-card-modern backend">
                <div class="skill-card-header">
                    <span class="skill-category-badge">{{ skill.category }}</span>
                    <h3>{{ skill.name }}</h3>
                </div>
                <div class="skill-card-content">
                    <p>{{ skill.description }}</p>
                    <div class="skill-metric">
                        <i class="fas fa-chart-line"></i>
                        <span>{{ skill.metric }}</span>
                    </div>
                </div>
                <div class="skill-card-footer">
                    <div class="skill-tags">
                        {% for tag in skill.tags %}
                        <span class="tag-pill">#{{ tag }}</span>
                        {% endfor %}
                    </div>
                </div>
            </article>
            {% endfor %}
        </div>
    </div>
</section>

<!-- INTELLIGENCE ARTIFICIELLE -->
<section class="skills-category-section">
    <div class="container">
        <div class="category-header">
            <div class="category-icon">{{ site.data.skills_featured.ai.icon }}</div>
            <h2>{{ site.data.skills_featured.ai.title }}</h2>
            <p class="category-subtitle">{{ site.data.skills_featured.ai.subtitle }}</p>
        </div>

        <div class="skills-grid">
            {% for skill in site.data.skills_featured.ai.skills %}
            <article class="skill-card-modern ai">
                <div class="skill-card-header">
                    <span class="skill-category-badge">{{ skill.category }}</span>
                    <h3>{{ skill.name }}</h3>
                </div>
                <div class="skill-card-content">
                    <p>{{ skill.description }}</p>
                    <div class="skill-metric">
                        <i class="fas fa-chart-line"></i>
                        <span>{{ skill.metric }}</span>
                    </div>
                </div>
                <div class="skill-card-footer">
                    <div class="skill-tags">
                        {% for tag in skill.tags %}
                        <span class="tag-pill">#{{ tag }}</span>
                        {% endfor %}
                    </div>
                </div>
            </article>
            {% endfor %}
        </div>
    </div>
</section>

<!-- FRONTEND & UX -->
<section class="skills-category-section">
    <div class="container">
        <div class="category-header">
            <div class="category-icon">{{ site.data.skills_featured.frontend.icon }}</div>
            <h2>{{ site.data.skills_featured.frontend.title }}</h2>
            <p class="category-subtitle">{{ site.data.skills_featured.frontend.subtitle }}</p>
        </div>

        <div class="skills-grid">
            {% for skill in site.data.skills_featured.frontend.skills %}
            <article class="skill-card-modern frontend">
                <div class="skill-card-header">
                    <span class="skill-category-badge">{{ skill.category }}</span>
                    <h3>{{ skill.name }}</h3>
                </div>
                <div class="skill-card-content">
                    <p>{{ skill.description }}</p>
                    <div class="skill-metric">
                        <i class="fas fa-chart-line"></i>
                        <span>{{ skill.metric }}</span>
                    </div>
                </div>
                <div class="skill-card-footer">
                    <div class="skill-tags">
                        {% for tag in skill.tags %}
                        <span class="tag-pill">#{{ tag }}</span>
                        {% endfor %}
                    </div>
                </div>
            </article>
            {% endfor %}
        </div>
    </div>
</section>

<!-- DEVOPS & TOOLS -->
<section class="skills-category-section">
    <div class="container">
        <div class="category-header">
            <div class="category-icon">{{ site.data.skills_featured.devops.icon }}</div>
            <h2>{{ site.data.skills_featured.devops.title }}</h2>
            <p class="category-subtitle">{{ site.data.skills_featured.devops.subtitle }}</p>
        </div>

        <div class="skills-grid">
            {% for skill in site.data.skills_featured.devops.skills %}
            <article class="skill-card-modern devops">
                <div class="skill-card-header">
                    <span class="skill-category-badge">{{ skill.category }}</span>
                    <h3>{{ skill.name }}</h3>
                </div>
                <div class="skill-card-content">
                    <p>{{ skill.description }}</p>
                    <div class="skill-metric">
                        <i class="fas fa-chart-line"></i>
                        <span>{{ skill.metric }}</span>
                    </div>
                </div>
                <div class="skill-card-footer">
                    <div class="skill-tags">
                        {% for tag in skill.tags %}
                        <span class="tag-pill">#{{ tag }}</span>
                        {% endfor %}
                    </div>
                </div>
            </article>
            {% endfor %}
        </div>
    </div>
</section>

<!-- LEADERSHIP & EXCELLENCE -->
<section class="skills-category-section">
    <div class="container">
        <div class="category-header">
            <div class="category-icon">{{ site.data.skills_featured.leadership.icon }}</div>
            <h2>{{ site.data.skills_featured.leadership.title }}</h2>
            <p class="category-subtitle">{{ site.data.skills_featured.leadership.subtitle }}</p>
        </div>

        <div class="skills-grid">
            {% for skill in site.data.skills_featured.leadership.skills %}
            <article class="skill-card-modern leadership">
                <div class="skill-card-header">
                    <span class="skill-category-badge">{{ skill.category }}</span>
                    <h3>{{ skill.name }}</h3>
                </div>
                <div class="skill-card-content">
                    <p>{{ skill.description }}</p>
                    <div class="skill-metric">
                        <i class="fas fa-chart-line"></i>
                        <span>{{ skill.metric }}</span>
                    </div>
                </div>
                <div class="skill-card-footer">
                    <div class="skill-tags">
                        {% for tag in skill.tags %}
                        <span class="tag-pill">#{{ tag }}</span>
                        {% endfor %}
                    </div>
                </div>
            </article>
            {% endfor %}
        </div>
    </div>
</section>

<!-- CTA SECTION -->
<section class="skills-cta-section">
    <div class="container">
        <h2>Want to go further?</h2>
        <p>Discover my AI training courses, browse my technical articles or contact me to discuss your projects</p>

        <div class="cta-buttons">
            <a href="{{ '/en/shop/' | relative_url }}" class="btn-cta btn-primary">
                <i class="fas fa-graduation-cap"></i>
                <span>View my training courses</span>
            </a>
            <a href="{{ '/en/blog/' | relative_url }}" class="btn-cta btn-secondary">
                <i class="fas fa-blog"></i>
                <span>Read my articles</span>
            </a>
            <a href="{{ '/en/contact/' | relative_url }}" class="btn-cta btn-secondary">
                <i class="fas fa-envelope"></i>
                <span>Contact me</span>
            </a>
        </div>
    </div>
</section>
