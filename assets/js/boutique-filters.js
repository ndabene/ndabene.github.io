document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.boutique-page-section');
  if (!container) return;

  const facetBar = document.getElementById('boutique-filters');
  const quickNav = document.querySelector('.boutique-quick-nav');
  const quickSearch = document.getElementById('quick-search');
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
    // Reset sections visibility to avoid residual headers
    const sections = container.querySelectorAll('.product-category-section');
    sections.forEach(sec => sec.style.display = 'none');
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
        const sec = card.closest('.product-category-section');
        if (sec) sec.style.display = '';
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

  function slugify(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Init events facets (bar)
  // Deprecated facet bar removed on page

  loadMoreBtn?.addEventListener('click', () => {
    shown += PAGE_SIZE;
    applyFilters();
  });

  // Init
  shown = Math.min(PAGE_SIZE, cards.length);
  applyFilters();

  // Quick-nav → synchronise avec les mêmes filtres (univers / catégorie)
  quickNav?.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-chip');
    if (!btn) return;
    const u = btn.getAttribute('data-univers');
    const c = btn.getAttribute('data-categorie');

    if (u) {
      state.univers = u;
      shown = PAGE_SIZE;
      // UI active
      quickNav.querySelectorAll('[data-univers]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
    if (c) {
      state.categorie = c;
      shown = PAGE_SIZE;
      quickNav.querySelectorAll('[data-categorie]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
    applyFilters();

    // Smooth scroll to target section for categories
    if (c && c !== 'all') {
      const id = slugify(c);
      const sec = container.querySelector(`.product-category-section#${id}`);
      if (sec) {
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        sec.classList.add('category-highlight');
        setTimeout(() => sec.classList.remove('category-highlight'), 1200);
      }
    }
    // For univers, scroll to first visible section
    if (u && u !== 'all') {
      const secs = Array.from(container.querySelectorAll('.product-category-section'));
      const firstVisible = secs.find(s => s.style.display !== 'none');
      if (firstVisible) {
        firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
        firstVisible.classList.add('category-highlight');
        setTimeout(() => firstVisible.classList.remove('category-highlight'), 1200);
      }
    }
  });

  // Quick search in top nav
  quickSearch?.addEventListener('input', (e) => {
    state.search = (e.target.value || '').trim().toLowerCase();
    shown = PAGE_SIZE;
    applyFilters();
  });
});


