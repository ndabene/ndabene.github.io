21
 <p class="section-description">{{ page.description }}</p>
22 </div>
23    
24
25
26
27<section class="section publications-page-section external-publications-section">
28 <div class="container">
29 <p class="intro">
30            Mon objectif pédagogique est de partager des ressources techniques et stratégiques pour aider votre boutique en ligne à progresser.
31            Pour approfondir ces thèmes, rendez-vous sur la page <a href="/formations/">Formations</a>.
32 </p>
33        {% assign grouped_publications = site.data.publications | group_by: "category" %}
34        {% for group in grouped_publications %}
35 <div class="publications-category-section">
36 <div class="category-header">
37 <h2 class="category-title">{{ group.name }}</h2>
38 <span class="category-count">{{ group.items.size }} articles</span>
39 </div>
40 
41 <div class="external-publications-grid">
42                {% for publication in group.items %}
43 <div class="external-publication-card">
44 <div class="publication-card-header">
45 <div class="publication-icon">
46 <i class="fas fa-newspaper"></i>
47 </div>
48 <div class="publication-meta">
49 <span>{{ group.name }}</span>
50 </div>
51 </div>
52 <div class="publication-card-content">
53 <h3 class="publication-title">
54 <a href="{{ publication.link }}" target="_blank">{{ publication.title }}</a>
55 </h3>
56                        {% if publication.description %}
57 <p class="publication-description">{{ publication.description | truncate: 120 }}</p>
58                        {% endif %}
59 </div>
60 <div class="publication-card-footer">
61 <a href="{{ publication.link }}" class="read-more-btn" target="_blank">Lire l'article</a>
62 </div>
63 </div>
64                {% endfor %}
65 </div>
66 </div>
67        {% endfor %}
68 
69 <div class="view-all-section publications-external-link">
70 <a href="https://www.businesstech.fr/landing/articles/index.html" class="view-all-btn" target="_blank">
71 <span class="btn-text">Voir tous mes articles sur Business Tech</span>
72 <svg viewBox="0 0 24 24" fill="currentColor">
73 <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
74 </svg>
75 </a>
76 </div>
77 
78 <p>Vous souhaitez aller plus loin ? Découvrez mes <a href="/formations/">formations</a>, parcourez mes <a href="/blog/">articles</a> ou <a href="/contact/">Contactez-moi pour échanger</a>.</p>
79 
80 </div>
81</section>
82
83</main>