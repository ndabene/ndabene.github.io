// Améliorations des filtres Pagefind
// - Mode de filtrage ET/OU
// - Suggestions de tags liés
// - Tri par pertinence

(function() {
    'use strict';

    // Relations entre tags (co-occurrence fréquente)
    const TAG_RELATIONSHIPS = {
        'IA': ['ChatGPT', 'prompt engineering', 'automatisation', 'MCP'],
        'ChatGPT': ['IA', 'prompt engineering', 'OpenAI'],
        'PrestaShop': ['e-commerce', 'PHP', 'Symfony'],
        'PHP': ['PrestaShop', 'Symfony', 'développement'],
        'sécurité': ['API', 'authentification', 'développement'],
        'automatisation': ['IA', 'n8n', 'workflow'],
        'MCP': ['IA', 'Claude', 'protocole'],
        'SEO': ['e-commerce', 'PrestaShop', 'marketing']
    };

    // Récupérer le mode de filtrage actuel
    function getFilterMode() {
        const modeSelector = document.querySelector('input[name="filter-mode"]:checked');
        return modeSelector ? modeSelector.value : 'OR';
    }

    // Mettre à jour les suggestions de tags en fonction des filtres actifs
    function updateTagSuggestions(activeFilters) {
        const suggestionsContainer = document.getElementById('tag-suggestions');
        if (!suggestionsContainer) return;

        // Si aucun filtre actif, masquer les suggestions
        if (activeFilters.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        // Collecter les tags suggérés basés sur les relations
        const suggestions = new Set();
        activeFilters.forEach(filter => {
            const related = TAG_RELATIONSHIPS[filter];
            if (related) {
                related.forEach(tag => {
                    // Ne pas suggérer un tag déjà actif
                    if (!activeFilters.includes(tag)) {
                        suggestions.add(tag);
                    }
                });
            }
        });

        // Afficher les suggestions
        if (suggestions.size > 0) {
            suggestionsContainer.style.display = 'block';

            let html = '<div class="suggestions-header">';
            html += '<i class="fas fa-lightbulb"></i> Tags suggérés:';
            html += '</div>';
            html += '<div class="suggestions-list">';

            suggestions.forEach(tag => {
                html += `
                    <button class="suggested-tag" data-tag="${tag}">
                        <i class="fas fa-plus-circle"></i> ${tag}
                    </button>
                `;
            });

            html += '</div>';

            suggestionsContainer.innerHTML = html;

            // Ajouter les événements de clic
            suggestionsContainer.querySelectorAll('.suggested-tag').forEach(btn => {
                btn.addEventListener('click', function() {
                    const tag = this.getAttribute('data-tag');
                    // Appeler la fonction de toggle du script principal
                    if (window.toggleTagFilter) {
                        window.toggleTagFilter(tag);
                    }
                });
            });
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }

    // Afficher un indicateur du nombre de résultats par tag disponible
    function showTagResultCounts(availableTags) {
        const allTagLinks = document.querySelectorAll('.tag-pill-large[data-tag-filter]');

        allTagLinks.forEach(link => {
            const tag = link.getAttribute('data-tag-filter');
            const count = availableTags[tag] || 0;

            // Ajouter/mettre à jour le compteur
            let countSpan = link.querySelector('.tag-result-count');
            if (!countSpan) {
                countSpan = document.createElement('span');
                countSpan.className = 'tag-result-count';
                link.appendChild(countSpan);
            }

            if (count === 0) {
                link.classList.add('tag-no-results');
                countSpan.textContent = '(0)';
            } else {
                link.classList.remove('tag-no-results');
                countSpan.textContent = `(${count})`;
            }
        });
    }

    // Calculer le score de pertinence d'un article
    function calculateRelevanceScore(post, activeFilters, searchQuery) {
        let score = 0;

        // Score basé sur le match de tags
        const postTags = (post.getAttribute('data-tags') || '').toLowerCase().split(' ');
        activeFilters.forEach(filter => {
            if (postTags.includes(filter.toLowerCase())) {
                score += 10;
            }
        });

        // Score basé sur la correspondance avec la requête de recherche
        if (searchQuery) {
            const title = (post.querySelector('.post-news-title')?.textContent || '').toLowerCase();
            const excerpt = (post.querySelector('.post-news-excerpt')?.textContent || '').toLowerCase();

            const queryTerms = searchQuery.toLowerCase().split(/\s+/);
            queryTerms.forEach(term => {
                if (title.includes(term)) score += 5;
                if (excerpt.includes(term)) score += 2;
            });
        }

        // Score bonus pour les articles featured
        if (post.querySelector('.featured-badge')) {
            score += 3;
        }

        return score;
    }

    // Trier les résultats par pertinence
    function sortResultsByRelevance(container, activeFilters, searchQuery) {
        const posts = Array.from(container.querySelectorAll('.post-preview-wrapper'));
        const visiblePosts = posts.filter(post => post.style.display !== 'none');

        visiblePosts.sort((a, b) => {
            const scoreA = calculateRelevanceScore(a, activeFilters, searchQuery);
            const scoreB = calculateRelevanceScore(b, activeFilters, searchQuery);
            return scoreB - scoreA; // Tri décroissant
        });

        // Réorganiser le DOM
        visiblePosts.forEach(post => {
            container.appendChild(post);
        });
    }

    // Exposer les fonctions globalement
    window.filterEnhancements = {
        getFilterMode,
        updateTagSuggestions,
        showTagResultCounts,
        sortResultsByRelevance
    };

    console.log('✨ Améliorations des filtres chargées');
})();
