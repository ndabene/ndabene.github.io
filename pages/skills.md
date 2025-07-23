---
layout: page
title: Mes Compétences Techniques
permalink: /skills/
description: "Découvrez l'ensemble de mes compétences techniques, classées par catégorie et niveau de maîtrise, incluant PHP, Symfony, PrestaShop, IA, Frontend, DevOps et Leadership."
keywords: "compétences techniques, php, symfony, prestashop, ia, frontend, devops, leadership, nicolas dabène"
show_sidebar: false
---

<div class="skills-page-modern">
    <div class="page-header">
        <h1>{{ page.title }}</h1>
        <p class="section-description">Voici un aperçu détaillé de mes compétences techniques et humaines, acquises et affinées au fil de mes années d'expérience. Chaque compétence reflète ma passion pour l'excellence et l'innovation continue.</p>
    </div>

    <div class="container">
        <div class="skills-filter">
            <button class="skill-filter-btn active" data-filter="all">Toutes les compétences</button>
            {% assign categories = site.data.skills | map: "category" | uniq %}
            {% for cat in categories %}
                {% assign category_name = cat | replace: "-", " " | replace: "php backend", "PHP & Backend" | replace: "soft skills", "Soft Skills" | replace: "frontend", "Frontend & Design" | replace: "learning", "Apprentissage" %}
                <button class="skill-filter-btn" data-filter="{{ cat }}">{{ category_name }}</button>
            {% endfor %}
        </div>

        {% assign categories = site.data.skills | group_by: "category" %}
        {% for category in categories %}
        <div class="skills-category-modern visible" data-category="{{ category.name }}">
            <div class="category-header-modern">
                {% assign category_display = category.name | replace: "-", " " | replace: "php backend", "PHP & Backend" | replace: "soft skills", "Soft Skills" | replace: "frontend", "Frontend & Design" | replace: "learning", "Apprentissage" | replace: "integrations", "Intégrations & APIs" %}
                <h2>{{ category_display | capitalize }}</h2>
                <div class="category-description">
                    {% if category.name == "php-backend" %}
                        Développement backend robuste et architecture moderne avec PHP, Symfony et bases de données.
                    {% elsif category.name == "ecommerce" %}
                        Expertise e-commerce avec PrestaShop, gestion de produits digitaux et solutions marchandes.
                    {% elsif category.name == "ai" %}
                        Intelligence artificielle, machine learning et orchestration d'agents automatisés.
                    {% elsif category.name == "frontend" %}
                        Interfaces utilisateur modernes, design UX/UI et technologies web interactives.
                    {% elsif category.name == "devops" %}
                        Déploiement, intégration continue et infrastructure cloud moderne.
                    {% elsif category.name == "integrations" %}
                        Intégrations API, résolution de problèmes complexes et revue de code.
                    {% elsif category.name == "leadership" %}
                        Leadership technique, gestion de projet et management d'équipes.
                    {% elsif category.name == "soft-skills" %}
                        Communication, empathie et compétences interpersonnelles essentielles.
                    {% elsif category.name == "learning" %}
                        Apprentissage continu, adaptabilité et veille technologique permanente.
                    {% endif %}
                </div>
            </div>
            
            <div class="skills-grid-circular">
                {% for skill in category.items %}
                <div class="skill-card-circular" data-category="{{ skill.category }}">
                    <div class="skill-visual-circular">
                        <div class="circular-progress-container">
                            <svg class="circular-progress" width="80" height="80" viewBox="0 0 36 36">
                                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2"/>
                                <path class="circle" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="2" stroke-dasharray="{{ skill.level }}, 100" data-level="{{ skill.level }}"/>
                            </svg>
                            <div class="progress-percentage">{{ skill.level }}%</div>
                        </div>
                        <div class="skill-icon-circular" data-skill="{{ skill.name | downcase | replace: ' ', '-' }}">
                            {% assign skill_name = skill.name | downcase %}
                            {% if skill_name == "php" %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.01 10.49c-.86 0-1.4.2-1.4.2l-.33 1.64s.51-.19 1.28-.19c.73 0 1.24.18 1.24.77 0 .14-.02.3-.05.49-.32 1.97-.97 2.18-1.71 2.18-.85 0-1.26-.52-1.26-.52l-.36 1.78s.53.39 1.74.39c1.76 0 2.77-.88 3.16-3.13.02-.14.05-.29.08-.46.34-2.06-.71-2.55-2.39-2.55zm11.53 0c-.86 0-1.4.2-1.4.2l-.33 1.64s.51-.19 1.28-.19c.73 0 1.24.18 1.24.77 0 .14-.02.3-.05.49-.32 1.97-.97 2.18-1.71 2.18-.85 0-1.26-.52-1.26-.52l-.36 1.78s.53.39 1.74.39c1.76 0 2.77-.88 3.16-3.13.02-.14.05-.29.08-.46.34-2.06-.71-2.55-2.39-2.55zM12 5.5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm-4.89 9.64c-.05.24-.11.46-.19.64-.5 1.16-1.47 1.72-2.88 1.72-1.36 0-2.23-.98-1.96-2.35.26-1.37 1.33-2.35 2.69-2.35 1.41 0 2.38.56 2.88 1.72.08.18.14.4.19.64H4.11z"/></svg>
                            {% elsif skill_name == "symfony" %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM6.343 14.9c-.236.022-.416.264-.416.506 0 .506.646.922 1.394.922.646 0 1.169-.326 1.169-.731 0-.28-.236-.482-.652-.591-.506-.132-1.327-.28-1.327-.842 0-.394.348-.652.874-.652.394 0 .719.154.719.461 0 .175-.11.329-.263.329-.088 0-.175-.044-.175-.132 0-.22.132-.329.329-.329-.088-.088-.263-.154-.41-.154-.236 0-.417.132-.417.329 0 .175.132.329.373.394.416.11 1.058.236 1.058.797 0 .461-.438.797-1.017.797-.571 0-1.058-.263-1.058-.664 0-.22.154-.417.373-.417.132 0 .263.066.263.175 0 .154-.11.279-.263.329.066.066.175.11.307.11.263 0 .439-.175.439-.394 0-.284-.285-.461-.664-.571-.482-.132-.874-.329-.874-.708 0-.373.329-.631.796-.631.329 0 .631.11.83.307l-.044.088c-.175-.154-.373-.241-.631-.241-.307 0-.526.175-.526.417 0 .263.22.373.571.461.664.154 1.08.373 1.08.797 0 .505-.461.863-1.102.863-.571 0-1.08-.285-1.08-.708 0-.263.175-.482.439-.482.175 0 .329.088.329.22 0 .175-.11.307-.263.373.088.088.197.132.329.132.241 0 .417-.154.417-.373 0-.307-.307-.483-.708-.593-.461-.132-.83-.307-.83-.686 0-.351.307-.593.752-.593.263 0 .505.088.686.241l-.044.088c-.154-.132-.329-.197-.527-.197-.263 0-.461.154-.461.351z"/></svg>
                            {% elsif skill_name == "prestashop" %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.279 3.855h-.928l-1.459 6.36L12.39 4.054l-1.464 6.161L9.478 3.855H8.55l-2.426 10.52h.927l1.84-7.894 1.538 6.36h.926l1.538-6.36 1.84 7.894h.927l-2.427-10.52zM4.772 4.785c-.514 0-.928.414-.928.928 0 .513.414.927.928.927.513 0 .927-.414.927-.927 0-.514-.414-.928-.927-.928zm14.456 0c-.514 0-.928.414-.928.928 0 .513.414.927.928.927.513 0 .927-.414.927-.927 0-.514-.414-.928-.927-.928zm-9.65 15.43c-.514 0-.928.414-.928.928 0 .513.414.927.928.927.513 0 .927-.414.927-.927 0-.514-.414-.928-.927-.928z"/></svg>
                            {% elsif skill_name == "mysql" %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.405 5.676c-.348 0-.682.033-1 .096l-.006.002c-.334.065-.652.162-.952.29l-.006.003c-.608.26-1.128.632-1.543 1.096l-.003.003c-.831.931-1.286 2.183-1.286 3.544 0 1.36.455 2.613 1.286 3.544l.003.003c.415.464.935.836 1.543 1.096l.006.003c.3.128.618.225.952.29l.006.002c.318.063.652.096 1 .096s.682-.033 1-.096l.006-.002c.334-.065.652-.162.952-.29l.006-.003c.608-.26 1.128-.632 1.543-1.096l.003-.003c.831-.931 1.286-2.183 1.286-3.544 0-1.36-.455-2.613-1.286-3.544l-.003-.003c-.415-.464-.935-.836-1.543-1.096l-.006-.003c-.3-.128-.618-.225-.952-.29l-.006-.002c-.318-.063-.652-.096-1-.096zm0 1.5c.652 0 1.176.27 1.575.81.399.54.615 1.29.615 2.014 0 .724-.216 1.474-.615 2.014-.399.54-.923.81-1.575.81-.652 0-1.176-.27-1.575-.81-.399-.54-.615-1.29-.615-2.014 0-.724.216-1.474.615-2.014.399-.54.923-.81 1.575-.81z"/></svg>
                            {% elsif skill_name contains "javascript" %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>
                            {% elsif skill_name contains "react" %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.23 12.004c0-1.107-.896-2.004-2-2.004s-2 .897-2 2.004.896 2.004 2 2.004 2-.897 2-2.004zM12 2.004c5.523 0 10 4.477 10 10 0 5.522-4.477 10-10 10s-10-4.478-10-10c0-5.523 4.477-10 10-10zm6.93 5.176c-1.374-.607-2.896-.967-4.531-1.025.16-.486.298-.956.415-1.405.498-1.91.359-3.435-.387-3.923-.746-.488-2.018.29-3.389 1.832-.14.158-.279.323-.416.492-.164-.158-.332-.31-.506-.457C8.746.248 7.475-.53 6.729-.042c-.746.488-.885 2.013-.387 3.923.117.449.255.919.415 1.405-1.635.058-3.157.418-4.531 1.025-1.807.799-2.895 1.926-2.895 3.097 0 1.171 1.088 2.298 2.895 3.097 1.374.607 2.896.967 4.531 1.025-.16.486-.298.956-.415 1.405-.498 1.91-.359 3.435.387 3.923.746.488 2.018-.29 3.389-1.832.14-.158.279-.323.416-.492.164.158.332.31.506.457 1.37 1.453 2.641 2.231 3.387 1.743.746-.488.885-2.013.387-3.923-.117-.449-.255-.919-.415-1.405 1.635-.058 3.157-.418 4.531-1.025 1.807-.799 2.895-1.926 2.895-3.097 0-1.171-1.088-2.298-2.895-3.097zM12 15.492c-1.932 0-3.492-1.56-3.492-3.488S10.068 8.516 12 8.516s3.492 1.56 3.492 3.488-1.56 3.488-3.492 3.488z"/></svg>
                            {% elsif skill_name contains "html" %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>
                            {% elsif skill_name contains "css" or skill_name contains "scss" %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>
                            {% elsif skill_name contains "git" %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.421-.228-.605-.406-.545-.544-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>
                            {% elsif skill_name contains "aws" %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.763 10.036c0 .296.032.535.088.738.064.202.144.392.256.576.048.08.064.16.064.24 0 .103-.08.207-.24.31l-.8.532c-.112.08-.224.12-.32.12-.128 0-.256-.064-.384-.183-.112-.12-.208-.248-.288-.392-.08-.144-.168-.304-.248-.488-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.19-1.605-.571-.4-.38-.603-.904-.603-1.565 0-.695.248-1.254.744-1.677.496-.424 1.157-.636 1.997-.636.28 0 .568.024.88.08.312.056.632.144.967.248v-.814c0-.847-.176-1.439-.528-1.789-.352-.35-.952-.526-1.805-.526-.39 0-.791.048-1.205.143-.414.096-.815.207-1.205.335-.18.072-.32.12-.396.151-.077.032-.133.048-.168.048-.147 0-.22-.108-.22-.32v-.518c0-.168.024-.295.077-.375.053-.08.149-.16.288-.231.39-.2.86-.368 1.413-.499C3.593.077 4.211.006 4.893.006c1.445 0 2.5.335 3.181 1.006.678.67 1.018 1.694 1.018 3.062v6.002l-.329-.04zm-3.255 1.214c.27 0 .55-.048.854-.151.303-.103.574-.271.798-.527.135-.151.23-.32.287-.52.056-.2.088-.44.088-.718v-.351c-.231-.08-.478-.144-.742-.183-.264-.04-.526-.056-.798-.056-.568 0-.983.112-1.237.335-.255.224-.383.538-.383.956 0 .392.104.677.32.869.215.191.527.287.95.287l.863.039zm6.866.876c-.184 0-.31-.032-.375-.103-.064-.072-.12-.216-.168-.43L7.254 3.618c-.048-.16-.072-.264-.072-.327 0-.128.064-.2.184-.2h.758c.192 0 .327.033.39.104.065.071.121.215.169.43l2.26 8.906 2.1-8.906c.04-.215.09-.36.15-.43.058-.07.197-.104.39-.104h.622c.193 0 .327.033.39.104.064.071.112.215.151.43l2.124 9.022 2.329-9.022c.048-.216.104-.36.168-.43.064-.072.2-.104.392-.104h.718c.12 0 .184.063.184.2 0 .039-.008.08-.024.135-.016.056-.048.151-.104.288L16.78 11.539c-.048.215-.104.36-.168.431-.064.072-.2.104-.375.104h-.67c-.193 0-.327-.032-.39-.104-.064-.071-.112-.216-.151-.43L12.902 3.428l-2.124 8.113c-.04.215-.088.36-.151.43-.064.072-.198.104-.391.104h-.67l.004-.951z"/></svg>
                            {% elsif skill_name contains "intelligence artificielle" or skill_name contains "ai" %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                            {% else %}
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            {% endif %}
                        </div>
                    </div>
                    
                    <div class="skill-info-circular">
                        <h3 class="skill-name-circular">{{ skill.name }}</h3>
                        {% if skill.description %}
                        <div class="skill-description-circular">
                            {{ skill.description }}
                        </div>
                        {% endif %}
                    </div>
                </div>
                {% endfor %}
            </div>
        </div>
        {% endfor %}
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Animation des progress circulaires
    function animateCircularProgress() {
        const circles = document.querySelectorAll('.circle');
        const percentages = document.querySelectorAll('.progress-percentage');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const level = parseInt(circle.getAttribute('data-level'));
                    const container = circle.closest('.skill-card-circular');
                    const percentageEl = container.querySelector('.progress-percentage');
                    
                    // Animation du cercle
                    setTimeout(() => {
                        circle.style.strokeDasharray = `${level}, 100`;
                    }, 200);
                    
                    // Animation du compteur
                    let currentValue = 0;
                    const increment = level / 60; // 60 frames pour 1 seconde
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= level) {
                            currentValue = level;
                            clearInterval(timer);
                        }
                        percentageEl.textContent = Math.round(currentValue) + '%';
                    }, 16); // ~60fps
                    
                    observer.unobserve(circle);
                }
            });
        }, { threshold: 0.3 });

        circles.forEach(circle => observer.observe(circle));
    }

    // Gestion du filtrage
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillCategories = document.querySelectorAll('.skills-category-modern');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Mise à jour du bouton actif
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filtrage des catégories avec animation
            skillCategories.forEach(category => {
                const categoryName = category.getAttribute('data-category');
                
                if (filter === 'all' || categoryName === filter) {
                    category.style.display = 'block';
                    setTimeout(() => {
                        category.classList.add('visible');
                    }, 10);
                } else {
                    category.classList.remove('visible');
                    setTimeout(() => {
                        category.style.display = 'none';
                    }, 300);
                }
            });

            // Re-animer les progress circulaires visibles
            setTimeout(animateCircularProgress, 400);
        });
    });

    // Initialiser les animations
    animateCircularProgress();

    // Animation d'apparition des cartes
    const cards = document.querySelectorAll('.skill-card-circular');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animationDelay = (index * 0.1) + 's';
                    entry.target.classList.add('animate-in');
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => cardObserver.observe(card));
});
</script>

<style>
.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.skills-category-modern {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease-out;
}

.skills-category-modern.visible {
    opacity: 1;
    transform: translateY(0);
}
</style>