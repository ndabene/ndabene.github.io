---
layout: default
title: Mes Projets
permalink: /projects/
description: "Découvrez une sélection de mes projets, incluant des modules PrestaShop sur mesure, des frameworks internes et des solutions innovantes développées chez BusinessTech."
---

<section class="section projects-section">
    <div class="container">
        <div class="section-header">
            <h1>{{ page.title }}</h1>
            <p class="section-subtitle">{{ page.description }}</p>
        </div>

        <div class="projects-filters">
            <button class="filter-btn active" data-filter="all">Tous les projets</button>
            <button class="filter-btn" data-filter="prestashop">PrestaShop</button>
            <button class="filter-btn" data-filter="ai">Intelligence Artificielle</button>
            <button class="filter-btn" data-filter="opensource">Open Source</button>
            <button class="filter-btn" data-filter="payment">Paiement</button>
        </div>

        <div class="projects-list">
            {% assign projects = site.projects | sort: 'date' | reverse %}
            {% for project in projects %}
                <div class="project-item" data-categories="{{ project.tags | map: 'category' | join: ' ' }}">
                    <div class="project-header">
                        <h2 class="project-title">{{ project.title }}</h2>
                        <div class="project-meta">
                            <span class="project-company">{{ project.company }}</span>
                            <span class="project-date">
                                {% if project.end_date %}
                                {{ project.date | date: "%b %Y" }} - {{ project.end_date | date: "%b %Y" }}
                                {% else %}
                                {{ project.date | date: "%b %Y" }} - présent
                                {% endif %}
                            </span>
                        </div>
                    </div>
                    
                    <div class="project-tech-tags">
                        {% for tag in project.tags %}
                            {% include tech-badge.html tech=tag.tech category=tag.category %}
                        {% endfor %}
                    </div>
                    
                    <div class="project-content">
                        <p class="project-description">{{ project.description }}</p>
                        
                        {% if project.metrics %}
                        <div class="project-metrics">
                            {% if project.metrics.performance %}
                            <div class="metric">
                                <span class="metric-label">Performance</span>
                                <span class="metric-value">{{ project.metrics.performance }}</span>
                            </div>
                            {% endif %}
                            
                            {% if project.metrics.roi %}
                            <div class="metric">
                                <span class="metric-label">ROI</span>
                                <span class="metric-value">{{ project.metrics.roi }}</span>
                            </div>
                            {% endif %}
                            
                            {% if project.metrics.impact %}
                            <div class="metric">
                                <span class="metric-label">Impact</span>
                                <span class="metric-value">{{ project.metrics.impact }}</span>
                            </div>
                            {% endif %}
                        </div>
                        {% endif %}
                        
                        {% if project.role %}
                        <div class="project-role">
                            <span class="role-label">Rôle :</span>
                            <span class="role-value">{{ project.role }}</span>
                        </div>
                        {% endif %}
                        
                        <div class="project-technologies">
                            <h3>Technologies</h3>
                            <div class="technologies-list">
                                {% for tech in project.technologies %}
                                <span class="tech-pill">{{ tech }}</span>
                                {% endfor %}
                            </div>
                        </div>
                    </div>
                </div>
            {% endfor %}
        </div>
    </div>
</section>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        const categories = item.getAttribute('data-categories');
                        if (categories.includes(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    });
</script>