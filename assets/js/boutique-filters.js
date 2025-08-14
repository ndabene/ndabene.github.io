document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.boutique-page-section');
  if (!container) return;

  const facetBar = document.getElementById('boutique-filters');
  const quickNav = document.querySelector('.boutique-quick-nav');
  const quickSearch = null; // recherche désactivée
  const clearBtn = document.getElementById('clear-filters');
  const activeFiltersBar = document.getElementById('active-filters');
  const cards = Array.from(container.querySelectorAll('.product-card'));
  const searchInput = document.getElementById('facet-search');
  const noResults = document.getElementById('no-results');
  const loadMoreBtn = document.getElementById('load-more');
  const sortSelect = document.getElementById('sort-select');
  const resultsCount = document.getElementById('results-count');

  // Pagination client-side simple
  const PAGE_SIZE = 24;
  let shown = 0;

  const state = {
    univers: 'all',
    categorie: 'all',
    niveau: 'all',
    format: 'all',
    search: ''
  };

  function applyFilters() {
    let visible = 0;
    // Reset sections visibility to avoid residual headers
    const sections = container.querySelectorAll('.product-category-section');
    sections.forEach(sec => sec.style.display = 'none');
    // Working array for sorting
    const sortedCards = [...cards];

    // Apply sorting
    if (sortSelect) {
      switch ((sortSelect.value || 'relevance')) {
        case 'price-asc':
          sortedCards.sort((a,b) => (parseFloat(a.dataset.price||'0')||0) - (parseFloat(b.dataset.price||'0')||0));
          break;
        case 'price-desc':
          sortedCards.sort((a,b) => (parseFloat(b.dataset.price||'0')||0) - (parseFloat(a.dataset.price||'0')||0));
          break;
        case 'new':
          sortedCards.sort((a,b) => new Date(b.dataset.updated||0) - new Date(a.dataset.updated||0));
          break;
        case 'popularity':
          sortedCards.sort((a,b) => (parseInt(b.dataset.popularity||'0',10)||0) - (parseInt(a.dataset.popularity||'0',10)||0));
          break;
        case 'relevance':
        default:
          // keep original order
          break;
      }
    }

    sortedCards.forEach((card, idx) => {
      const u = (card.dataset.univers || '').toLowerCase();
      const c = (card.dataset.categorie || '').toLowerCase();
      const level = (card.dataset.niveau || '').toLowerCase();
      const fmt = (card.dataset.format || '').toLowerCase();
      const n = (card.dataset.name || '').toLowerCase();

      const matchUnivers = state.univers === 'all' || u === state.univers.toLowerCase();
      const matchCat = state.categorie === 'all' || c === state.categorie.toLowerCase();
      const matchNiveau = state.niveau === 'all' || level === state.niveau.toLowerCase();
      const matchFormat = state.format === 'all' || fmt === state.format.toLowerCase();
      const matchSearch = true; // recherche désactivée

      const match = matchUnivers && matchCat && matchNiveau && matchFormat && matchSearch;
      if (match && visible < shown) {
        card.style.display = '';
        visible++;
        const sec = card.closest('.product-category-section');
        if (sec) sec.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    const totalMatches = cards.filter(card => {
      const u = (card.dataset.univers || '').toLowerCase();
      const c = (card.dataset.categorie || '').toLowerCase();
      const level = (card.dataset.niveau || '').toLowerCase();
      const fmt = (card.dataset.format || '').toLowerCase();
      const n = (card.dataset.name || '').toLowerCase();
      return (state.univers === 'all' || u === state.univers.toLowerCase()) &&
             (state.categorie === 'all' || c === state.categorie.toLowerCase()) &&
             (state.niveau === 'all' || level === state.niveau.toLowerCase()) &&
              (state.format === 'all' || fmt === state.format.toLowerCase());
    }).length;

    if (resultsCount) {
      const label = totalMatches <= 1 ? 'résultat' : 'résultats';
      resultsCount.textContent = `${totalMatches} ${label}`;
    }

    if (totalMatches > shown) {
      loadMoreBtn.style.display = '';
    } else {
      loadMoreBtn.style.display = 'none';
    }

    noResults.style.display = totalMatches === 0 ? '' : 'none';

    updateActiveFiltersBar();

    // Compteur de résultats retiré avec l'UI de tri
  }

  function setActive(button, groupSelector) {
    const group = button.closest(groupSelector);
    if (!group) return;
    group.querySelectorAll('.facet-button').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
  }

  function slugify(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function updateActiveFiltersBar() {
    if (!activeFiltersBar) return;
    const chips = [];
    if (state.univers !== 'all') chips.push({ key: 'univers', label: `Univers: ${state.univers}` });
    if (state.categorie !== 'all') chips.push({ key: 'categorie', label: `Catégorie: ${state.categorie}` });
    if (state.niveau !== 'all') chips.push({ key: 'niveau', label: `Niveau: ${state.niveau}` });
    if (state.format !== 'all') chips.push({ key: 'format', label: `Format: ${state.format.toUpperCase()}` });
    // recherche désactivée

    if (chips.length === 0) {
      activeFiltersBar.innerHTML = '';
      activeFiltersBar.style.display = 'none';
      return;
    }

    activeFiltersBar.style.display = '';
    activeFiltersBar.innerHTML = chips.map((c) => `
      <button class="active-chip" data-remove="${c.key}" aria-label="Retirer ${c.label}">
        ${c.label}
        <span aria-hidden="true">×</span>
      </button>
    `).join('');
  }

  // Init events facets (bar)
  // Deprecated facet bar removed on page

  loadMoreBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    shown += PAGE_SIZE;
    applyFilters();
  });

  // Init
  shown = Math.min(PAGE_SIZE, cards.length);
  applyFilters();

  // Quick-nav (chips) → synchronise filtres (univers / catégories / niveaux / formats)
  quickNav?.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-chip');
    if (!btn) return;
    const u = btn.getAttribute('data-univers');
    const c = btn.getAttribute('data-categorie');
    const level = btn.getAttribute('data-niveau');
    const fmt = btn.getAttribute('data-format');
    if (u) {
      state.univers = u;
      shown = PAGE_SIZE;
      quickNav.querySelectorAll('[data-univers]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
      if (u !== 'all') {
        const secs = Array.from(container.querySelectorAll('.product-category-section'));
        const firstVisible = secs.find(s => s.style.display !== 'none');
        if (firstVisible) {
          firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
          firstVisible.classList.add('category-highlight');
          setTimeout(() => firstVisible.classList.remove('category-highlight'), 1200);
        }
      }
    }
    if (c) {
      state.categorie = c;
      shown = PAGE_SIZE;
      quickNav.querySelectorAll('[data-categorie]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
      // Nouveau layout: une seule section de grille. On remonte simplement au catalogue.
      const sec = container.querySelector('.product-category-section');
      if (sec) {
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        sec.classList.add('category-highlight');
        setTimeout(() => sec.classList.remove('category-highlight'), 1200);
      }
    }
    if (level) {
      state.niveau = level;
      shown = PAGE_SIZE;
      quickNav.querySelectorAll('[data-niveau]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    }
    if (fmt) {
      state.format = fmt;
      shown = PAGE_SIZE;
      quickNav.querySelectorAll('[data-format]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    }
  });

  // recherche désactivée

  // Retirer un filtre depuis la barre d'état
  activeFiltersBar?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove]');
    if (!btn) return;
    const key = btn.getAttribute('data-remove');
    switch (key) {
      case 'univers': state.univers = 'all'; quickNav.querySelectorAll('[data-univers]').forEach(b => b.classList.remove('active')); break;
      case 'categorie': state.categorie = 'all'; quickNav.querySelectorAll('[data-categorie]').forEach(b => b.classList.remove('active')); break;
      case 'niveau': state.niveau = 'all'; quickNav.querySelectorAll('[data-niveau]').forEach(b => b.classList.remove('active')); break;
      case 'format': state.format = 'all'; quickNav.querySelectorAll('[data-format]').forEach(b => b.classList.remove('active')); break;
      // recherche désactivée
      default: break;
    }
    shown = PAGE_SIZE;
    applyFilters();
  });

  // Bouton réinitialiser
  clearBtn?.addEventListener('click', () => {
    state.univers = 'all';
    state.categorie = 'all';
    state.niveau = 'all';
    state.format = 'all';
    state.search = '';
    quickNav.querySelectorAll('.nav-chip').forEach(b => b.classList.remove('active'));
    const universAll = quickNav.querySelector('[data-univers="all"]');
    universAll?.classList.add('active');
    if (quickSearch) quickSearch.value = '';
    shown = PAGE_SIZE;
    applyFilters();
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  sortSelect?.addEventListener('change', () => {
    shown = Math.min(PAGE_SIZE, cards.length);
    applyFilters();
  });
});


