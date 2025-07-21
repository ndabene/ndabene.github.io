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
            <button class="filter-btn" data-filter="marketing">Marketing</button>
        </div>

        <div class="projects-list">
            {% assign projects = site.projects | sort: 'date' | reverse %}
            {% for project in projects %}
                <div class="project-item" data-categories="{{ project.categories | join: ' ' }}">
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
                        {% for tag in project.tags limit:5 %}
                            {% include tech-badge.html tech=tag.tech category=tag.category %}
                        {% endfor %}
                        {% if project.tags.size > 5 %}
                            <span class="more-tags">+{{ project.tags.size | minus: 5 }}</span>
                        {% endif %}
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
                            <div class="tech-pills-container">
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
        
        // Animation des projets au chargement
        projectItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('appear');
            }, 100 * index);
        });
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects with animation
                let visibleCount = 0;
                projectItems.forEach(item => {
                    item.classList.remove('appear');
                    
                    if (filter === 'all' || (item.getAttribute('data-categories') && item.getAttribute('data-categories').includes(filter))) {
                        setTimeout(() => {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.classList.add('appear');
                            }, 50);
                        }, 50 * visibleCount);
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });
</script>