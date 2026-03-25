---
layout: default
title: De l'IA Native au E-commerce de Demain
permalink: /skills/
description: "Expert AI-Native E-commerce Architect. 15+ ans, 5 PrestaShop Awards, 150K+ installations. MCP Protocol, AI agents, PrestaShop 9. Architecte de la transition IA du e-commerce."
keywords: "AI-Native E-commerce, PrestaShop Expert, MCP Protocol, AI Agents, PrestaShop 9, Claude integration, e-commerce architect, PHP, Symfony"
body_class: "page-skills-modern"
---

<!-- HERO SKILLS -->
{% capture skills_hero_badges %}
<div class="hero-badge">
    <span class="badge-ai">AI-Native</span>
    <span class="badge-pioneer">Pionnier MCP Protocol</span>
</div>
{% endcapture %}
{% capture skills_hero_stats %}
<div class="stats-pills">
    {% for stat in site.data.skills_featured.hero_stats %}
    <div class="stat-pill">
        <i class="fas {{ stat.icon }}"></i>
        <div class="stat-pill-content">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
        </div>
    </div>
    {% endfor %}
</div>
{% endcapture %}
{% include page-hero.html
  title="De l'IA Native au E-commerce de Demain"
  description="15+ ans d'architecture e-commerce • 5 PrestaShop Awards • 150K+ installations"
  description_class="lead"
  modifier_class="page-hero-section--prestashop-ai page-hero-section--skills-index"
  section_class="fade-in is-visible"
  content_class="hero-content--skills"
  pre_content=skills_hero_badges
  pre_content_class="page-hero-slot page-hero-slot--pre"
  post_content=skills_hero_stats
  post_content_class="page-hero-slot page-hero-slot--post"
%}

<!-- INTELLIGENCE ARTIFICIELLE -->
<section class="skills-category-section ai-section">
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
            <a href="{{ '/modules/mcp-tools-plus/' | relative_url }}" class="btn-cta btn-primary">
                <i class="fas fa-robot"></i>
                <span>MCP Tools Plus</span>
            </a>
            <a href="{{ '/blog/' | relative_url }}" class="btn-cta btn-secondary">
                <i class="fas fa-blog"></i>
                <span>Articles IA & E-commerce</span>
            </a>
            <a href="https://versus.pro/fr/contact?subject=AI+Consulting&utm_source=ndabene.github.io&utm_medium=website" class="btn-cta btn-secondary">
                <i class="fas fa-envelope"></i>
                <span>Me contacter</span>
            </a>
        </div>
    </div>
</section>
