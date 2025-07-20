---
layout: page
title: Publications
description: "Retrouvez mes articles et tutoriels techniques publiés sur le blog de Business Tech, couvrant le développement PrestaShop, l'optimisation des performances et les meilleures pratiques."
keywords: "articles techniques, tutoriels prestashop, optimisation performance, développement web, blog business tech"
---

<section class="publications-page-section">
    <div class="container">
        <h1>{{ page.title }}</h1>
        <p class="section-description">Retrouvez mes articles et tutoriels techniques publiés sur le blog de Business Tech. Ces publications couvrent mes domaines d'expertise : développement PrestaShop, optimisation des performances, architecture web et intégration de technologies modernes.</p>

        <div class="publications-grid">
            {% for publication in site.data.publications %}
            <article class="card publication-item">
                <div class="card-content">
                    <h2 class="publication-title">
                        <a href="{{ publication.link }}" target="_blank" rel="noopener">
                            {{ publication.title }}
                        </a>
                    </h2>
                    <div class="publication-meta">
                        <span class="publication-source">Business Tech Blog</span>
                        <span class="external-link-indicator">Article externe <span class="external-icon">↗</span></span>
                    </div>
                </div>
                <div class="card-footer">
                    <a href="{{ publication.link }}" target="_blank" rel="noopener" class="btn btn--outline">
                        Lire l'article <span class="external-icon">↗</span>
                    </a>
                </div>
            </article>
            {% endfor %}
        </div>

        <div class="publications-cta">
            <h2>Vous souhaitez en savoir plus ?</h2>
            <p>Pour découvrir d'autres articles et rester informé des dernières publications, visitez le blog de Business Tech ou contactez-moi directement.</p>
            <div class="cta-actions">
                <a href="https://www.businesstech.fr/landing/articles/" target="_blank" rel="noopener" class="btn btn--primary">
                    Voir tous les articles <span class="external-icon">↗</span>
                </a>
                <a href="/contact" class="btn btn--secondary">Me contacter</a>
            </div>
        </div>
    </div>
</section>

<style>
.publications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.publication-item {
    height: 100%;
}

.publication-title a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s ease;
}

.publication-title a:hover {
    color: var(--primary-color, #2563EB);
}

.publication-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #718096;
}

.external-link-indicator {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.publications-cta {
    text-align: center;
    padding: 3rem 2rem;
    background-color: #F7FAFC;
    border-radius: 8px;
}

.publications-cta h2 {
    margin-bottom: 1rem;
}

.publications-cta p {
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.cta-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .publications-grid {
        grid-template-columns: 1fr;
    }
    
    .cta-actions {
        flex-direction: column;
        align-items: center;
    }
}
</style> 