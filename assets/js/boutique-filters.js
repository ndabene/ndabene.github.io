document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.boutique-page-section');
  if (!container) return;

  const facetBar = document.getElementById('boutique-filters');
  const cards = Array.from(container.querySelectorAll('.product-card'));
  const searchInput = document.getElementById('facet-search');
  const noResults = document.getElementById('no-results');
  const loadMoreBtn = document.getElementById('load-more');

  // Pagination client-side simple
  const PAGE_SIZE = 24;
  let shown = 0;

  const state = {
    univers: 'all',
    categorie: 'all',
    search: ''
  };

  function applyFilters() {
    let visible = 0;
    cards.forEach((card, idx) => {
      const u = (card.dataset.univers || '').toLowerCase();
      const c = (card.dataset.categorie || '').toLowerCase();
      const n = (card.dataset.name || '').toLowerCase();

      const matchUnivers = state.univers === 'all' || u === state.univers.toLowerCase();
      const matchCat = state.categorie === 'all' || c === state.categorie.toLowerCase();
      const matchSearch = !state.search || n.includes(state.search);

      const match = matchUnivers && matchCat && matchSearch;
      if (match && visible < shown) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    const totalMatches = cards.filter(card => {
      const u = (card.dataset.univers || '').toLowerCase();
      const c = (card.dataset.categorie || '').toLowerCase();
      const n = (card.dataset.name || '').toLowerCase();
      return (state.univers === 'all' || u === state.univers.toLowerCase()) &&
             (state.categorie === 'all' || c === state.categorie.toLowerCase()) &&
             (!state.search || n.includes(state.search));
    }).length;

    if (totalMatches > shown) {
      loadMoreBtn.style.display = '';
    } else {
      loadMoreBtn.style.display = 'none';
    }

    noResults.style.display = totalMatches === 0 ? '' : 'none';
  }

  function setActive(button, groupSelector) {
    const group = button.closest(groupSelector);
    if (!group) return;
    group.querySelectorAll('.facet-button').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
  }

  // Init events facets
  facetBar?.querySelectorAll('.facet-group[data-facet="univers"] .facet-button')
    .forEach(btn => btn.addEventListener('click', () => {
      const v = btn.dataset.value || 'all';
      state.univers = v;
      setActive(btn, '.facet-group[data-facet="univers"]');
      shown = PAGE_SIZE; // reset pagination
      applyFilters();
    }));

  facetBar?.querySelectorAll('.facet-group[data-facet="categorie"] .facet-button')
    .forEach(btn => btn.addEventListener('click', () => {
      const v = btn.dataset.value || 'all';
      state.categorie = v;
      setActive(btn, '.facet-group[data-facet="categorie"]');
      shown = PAGE_SIZE;
      applyFilters();
    }));

  searchInput?.addEventListener('input', (e) => {
    state.search = (e.target.value || '').trim().toLowerCase();
    shown = PAGE_SIZE;
    applyFilters();
  });

  loadMoreBtn?.addEventListener('click', () => {
    shown += PAGE_SIZE;
    applyFilters();
  });

  // Init
  shown = Math.min(PAGE_SIZE, cards.length);
  applyFilters();
});


