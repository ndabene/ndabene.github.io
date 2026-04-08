---
layout: default
title: De l'IA Native au E-commerce de Demain
permalink: /skills/
description: "Expert AI-Native E-commerce Architect. 15+ ans, 5 PrestaShop Awards, 150K+ installations. MCP Protocol, AI agents, PrestaShop 9. Architecte de la transition IA du e-commerce."
keywords: "AI-Native E-commerce, PrestaShop Expert, MCP Protocol, AI Agents, PrestaShop 9, Claude integration, e-commerce architect, PHP, Symfony"
body_class: "page-skills-modern"
---

<!-- HERO SECTION - Same as homepage -->
<section class="hero-prestashop-ai" style="padding: 6rem 0 4rem;">
    <div class="container-creator">
        <div style="text-align: center; max-width: 800px; margin: 0 auto;">
            <span style="display: inline-block; background: linear-gradient(135deg, #4775ff 0%, #2c5aa0 100%); color: white; padding: 0.5rem 1.25rem; border-radius: 50px; font-size: 0.9rem; font-weight: 600; margin-bottom: 1.5rem;">
                AI-Native · Pionnier MCP Protocol
            </span>
            <h1 class="hero-title" style="font-size: 3rem; font-weight: 800; margin-bottom: 1.5rem; line-height: 1.2;">
                <span class="hero-title-main">De l'IA Native au E-commerce de Demain</span>
            </h1>
            <p class="hero-description" style="font-size: 1.15rem; line-height: 1.7; margin-bottom: 0; text-align: center;">
                15+ ans d'architecture e-commerce · 5 PrestaShop Awards · 150K+ installations
            </p>
        </div>
    </div>
    <div class="hero-decoration">
        <div class="hero-decoration-circle hero-decoration-circle-1"></div>
        <div class="hero-decoration-circle hero-decoration-circle-2"></div>
    </div>
</section>

<!-- INTELLIGENCE ARTIFICIELLE -->
<section class="skills-category-section ai-section" style="margin: 0;">
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
                    <span class="skill-category-badge ai-badge">{{ skill.category }}</span>
                    <h3>{{ skill.name }}</h3>
                </div>
                <div class="skill-card-content">
                    <p>{{ skill.description }}</p>
                    <div class="skill-metric ai-metric">
                        <i class="fas fa-bolt"></i>
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
        <h2> Parlons de votre projet IA-e-commerce</h2>
        <p>Découvrez comment intégrer l'IA native dans votre boutique PrestaShop ou échangeons sur vos enjeux de performance</p>
        
        <div class="cta-buttons">
            <a href="{{ '/blog/' | relative_url }}" class="btn-cta btn-secondary">
                <i class="fas fa-blog"></i>
                <span>Articles IA & E-commerce</span>
            </a>
            <a href="https://calendly.com/ndabene2807/mcp-tools-plus" class="btn-cta btn-secondary">
                <i class="fas fa-envelope"></i>
                <span>Me contacter</span>
            </a>
        </div>
    </div>
</section>
