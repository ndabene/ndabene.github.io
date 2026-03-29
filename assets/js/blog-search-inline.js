// Blog Search Inline with Pagefind
// Recherche inline (desktop visible, mobile FAB) avec Pagefind

(function() {
  'use strict';

  const CONFIG = {
    DEBOUNCE_DELAY: 300,
    MAX_RESULTS_DESKTOP: 8,
    MAX_RESULTS_MOBILE: 3,
    EXCERPT_LENGTH: 100,
    MOBILE_BREAKPOINT: 768
  };

  // Detect page language
  const pageLang = document.documentElement.lang || 'fr';
  const i18n = {
    fr: {
      noResults: (q) => `Aucun résultat pour "${escapeHtml(q)}"`,
      seeAll: (n, q) => `Voir tous les ${n} résultats →`,
      noPostsFound: 'Aucun article trouvé',
      placeholder: 'Rechercher un article, un outil, une technologie...',
      mobilePlaceholder: 'Rechercher un article...',
      ariaLabel: 'Rechercher sur le blog',
      clearAria: 'Effacer la recherche',
      openAria: 'Ouvrir la recherche',
      closeAria: 'Fermer la recherche'
    },
    en: {
      noResults: (q) => `No results for "${escapeHtml(q)}"`,
      seeAll: (n, q) => `See all ${n} results →`,
      noPostsFound: 'No article found',
      placeholder: 'Search for an article, tool, technology...',
      mobilePlaceholder: 'Search for an article...',
      ariaLabel: 'Search the blog',
      clearAria: 'Clear search',
      openAria: 'Open search',
      closeAria: 'Close search'
    }
  };
  const t = i18n[pageLang] || i18n.fr;

  let pagefind = null;
  let isInitialized = false;
  let isMobile = false;

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function isMobileDevice() {
    return window.innerWidth <= CONFIG.MOBILE_BREAKPOINT;
  }

  function getMaxResults() {
    return isMobileDevice() ? CONFIG.MAX_RESULTS_MOBILE : CONFIG.MAX_RESULTS_DESKTOP;
  }

  // Initialize Pagefind
  async function initializePagefind() {
    if (isInitialized) return;

    try {
      const pagefindModule = await import('/pagefind/pagefind.js');
      pagefind = pagefindModule.default || pagefindModule;
      isInitialized = true;
      console.log('✅ Pagefind initialisé pour la recherche inline');
    } catch (error) {
      console.warn('⚠️ Pagefind non disponible, utilisation du fallback DOM:', error.message);
      isInitialized = false;
      // Mark fallback as active for debugging
      document.body?.classList.add('search-fallback-active');
    }
  }

  // Escape regex special characters
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Highlight matching terms
  function highlightText(text, query) {
    if (!query || !text) return text;
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length >= 2);
    let result = text;
    terms.forEach(term => {
      const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
      result = result.replace(regex, '<mark class="search-highlight">$1</mark>');
    });
    return result;
  }

  // Truncate excerpt
  function truncateExcerpt(text, maxLength) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  // Display search results in dropdown
  function displayResults(results, query, container, maxResults) {
    if (!results || results.length === 0) {
      container.innerHTML = `
        <div class="search-no-results">
          <i class="fas fa-search"></i>
          <span>${t.noResults(query)}</span>
        </div>
      `;
      container.style.display = 'block';
      return;
    }

    const limitedResults = results.slice(0, maxResults);
    let html = '';

    limitedResults.forEach(result => {
      const title = result.meta?.title || result.url || (pageLang === 'en' ? 'No title' : 'Sans titre');
      const excerpt = truncateExcerpt(result.excerpt || '', CONFIG.EXCERPT_LENGTH);
      const url = result.url || result.raw_url || '';

      html += `
        <a href="${url}" class="search-result-item" data-url="${url}">
          <div class="search-result-title">${highlightText(title, query)}</div>
          <div class="search-result-excerpt">${highlightText(excerpt, query)}</div>
        </a>
      `;
    });

    if (results.length > maxResults) {
      const blogUrl = pageLang === 'en' ? '/en/blog/' : '/blog/';
      html += `
        <div class="search-more-results">
          <a href="${blogUrl}?q=${encodeURIComponent(query)}">${t.seeAll(results.length, query)}</a>
        </div>
      `;
    }

    container.innerHTML = html;
    container.style.display = 'block';
  }

  // Display fallback results (DOM search) - Ameliore pour chercher dans tags et categories aussi
  function displayFallbackResults(query, container, maxResults) {
    const postsContainer = document.getElementById('blog-posts-container');
    const searchTerm = query.toLowerCase();
    const results = [];

    // Search visible rendered post cards
    if (postsContainer) {
      const posts = postsContainer.querySelectorAll('.post-preview-wrapper, .post-card, article.post, .post-item');

      posts.forEach(post => {
        const titleEl = post.querySelector('.post-news-title a, .post-title a, h2 a, h3 a, [class*="title"] a');
        const excerptEl = post.querySelector('.post-news-excerpt, .post-excerpt, .excerpt, [class*="excerpt"]');
        const tagsEl = post.querySelector('.post-tags, .tags, [class*="tag"]');
        const categoryEl = post.querySelector('.post-category, .category, [class*="category"]');

        const title = titleEl ? titleEl.textContent.trim() : '';
        const excerpt = excerptEl ? excerptEl.textContent.trim() : '';
        const tags = tagsEl ? tagsEl.textContent.trim() : '';
        const category = categoryEl ? categoryEl.textContent.trim() : '';
        const url = titleEl ? titleEl.getAttribute('href') : '';

        const searchContent = `${title} ${excerpt} ${tags} ${category}`.toLowerCase();

        if (searchContent.includes(searchTerm) && url) {
          results.push({
            meta: { title },
            excerpt: truncateExcerpt(excerpt, CONFIG.EXCERPT_LENGTH),
            url
          });
        }
      });
    }

    // P2 fix: also search hidden lazy-posts-data to catch posts not yet rendered by pagination
    const lazyContainer = document.getElementById('lazy-posts-data');
    if (lazyContainer) {
      const lazyPosts = lazyContainer.querySelectorAll('.lazy-post-data');
      const existingUrls = new Set(results.map(r => r.url));

      lazyPosts.forEach(post => {
        const url = post.dataset.url || '';
        if (!url || existingUrls.has(url)) return;

        const title = post.dataset.title || '';
        const excerpt = post.dataset.excerpt || '';
        const tags = post.dataset.tags || '';
        const categories = post.dataset.categories || '';

        const searchContent = `${title} ${excerpt} ${tags} ${categories}`.toLowerCase();

        if (searchContent.includes(searchTerm)) {
          results.push({
            meta: { title },
            excerpt: truncateExcerpt(excerpt, CONFIG.EXCERPT_LENGTH),
            url
          });
          existingUrls.add(url);
        }
      });
    }

    if (results.length === 0) {
      // Last resort: search all post links on the page
      return searchAllPageLinks(query, container, maxResults);
    }

    displayResults(results, query, container, maxResults);
  }

  // Search all links on the page as last resort
  function searchAllPageLinks(query, container, maxResults) {
    const searchTerm = query.toLowerCase();
    const results = [];
    
    // Search all links that look like blog posts
    const allLinks = document.querySelectorAll('a[href*="/blog/"], a[href*="/posts/"], a[href*="/articles/"]');
    
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      const text = link.textContent.trim().toLowerCase();
      
      if (text.includes(searchTerm) || href.toLowerCase().includes(searchTerm)) {
        // Avoid duplicates
        if (!results.some(r => r.url === href)) {
          results.push({
            meta: { title: link.textContent.trim() },
            excerpt: '',
            url: href
          });
        }
      }
    });

    displayResults(results.slice(0, maxResults), query, container, maxResults);
  }

  // Perform search with Pagefind
  async function performSearch(query, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const maxResults = getMaxResults();

    if (!query || query.trim().length < 2) {
      container.style.display = 'none';
      return;
    }

    const trimmedQuery = query.trim();

    if (!isInitialized) {
      await initializePagefind();
    }

    if (pagefind && isInitialized) {
      try {
        // P1 fix: filter by current page language to avoid cross-language results
        const search = await pagefind.search(trimmedQuery, {
          limit: maxResults + 5,
          filters: { lang: pageLang }
        });

        if (search.results.length > 0) {
          const data = await Promise.all(search.results.slice(0, maxResults + 3).map(r => r.data()));
          displayResults(data, trimmedQuery, container, maxResults);
        } else {
          displayResults([], trimmedQuery, container, maxResults);
        }
      } catch (error) {
        console.error('Erreur recherche Pagefind:', error);
        displayFallbackResults(trimmedQuery, container, maxResults);
      }
    } else {
      displayFallbackResults(trimmedQuery, container, maxResults);
    }
  }

  // Escape HTML
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Update dropdown width for responsiveness - now uses CSS position: absolute
  function updateDropdownPosition(inputId, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const container = document.getElementById('blog-search-inline');
    
    if (!dropdown || !container) return;
    
    // Width handled by CSS, just ensure proper display state
    const containerWidth = container.offsetWidth;
    if (containerWidth > 0) {
      dropdown.style.width = `${Math.min(700, containerWidth)}px`;
    }
  }

  // Handle input changes
  function handleInput(input, resultsContainerId) {
    const value = input.value.trim();
    const container = document.getElementById(resultsContainerId);
    const clearBtn = document.getElementById(input.id === 'mobile-search-input' ? 'mobile-search-close' : 'clear-search');

    if (clearBtn && clearBtn.id === 'clear-search') {
      clearBtn.style.display = value ? 'flex' : 'none';
    }

    if (container) {
      if (value.length < 2) {
        container.style.display = 'none';
      } else {
        // Update position for fixed dropdown before showing
        if (input.id === 'search-input') {
          updateDropdownPosition('search-input', 'search-results');
        }
        performSearch(value, resultsContainerId);
      }
    }
  }

  // Close dropdown when clicking outside
  function handleClickOutside(event, dropdownId, inputId) {
    const dropdown = document.getElementById(dropdownId);
    const input = document.getElementById(inputId);
    const container = document.getElementById('blog-search-inline');

    if (dropdown && input && container) {
      if (!dropdown.contains(event.target) && !input.contains(event.target)) {
        dropdown.style.display = 'none';
      }
    }
  }

  // Mobile FAB and Modal handling
  function setupMobileSearch() {
    const fab = document.getElementById('mobile-search-fab');
    const modal = document.getElementById('mobile-search-modal');
    const overlay = modal?.querySelector('.mobile-search-modal-overlay');
    const closeBtn = document.getElementById('mobile-search-close');
    const input = document.getElementById('mobile-search-input');

    if (!fab || !modal) return;

    // Open modal on FAB click
    fab.addEventListener('click', () => {
      modal.style.display = 'flex';
      if (input) {
        setTimeout(() => input.focus(), 100);
      }
    });

    // Close modal functions
    const closeModal = () => {
      modal.style.display = 'none';
      if (input) input.value = '';
      const results = document.getElementById('mobile-search-results');
      if (results) results.style.display = 'none';
    };

    if (overlay) overlay.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });

    // Setup mobile input
    const debouncedMobileSearch = debounce((value) => {
      handleInput({ value, id: 'mobile-search-input' }, 'mobile-search-results');
    }, CONFIG.DEBOUNCE_DELAY);

    if (input) {
      input.addEventListener('input', (e) => {
        debouncedMobileSearch(e.target.value);
      });
    }
  }

  // Initialize desktop search
  function initializeDesktopSearch() {
    const input = document.getElementById('search-input');
    const container = document.getElementById('blog-search-inline');

    if (!input || !container) return;

    const debouncedSearch = debounce((value) => {
      handleInput({ value, id: 'search-input' }, 'search-results');
    }, CONFIG.DEBOUNCE_DELAY);

    input.addEventListener('input', (e) => {
      debouncedSearch(e.target.value);
    });

    // Clear button
    const clearBtn = document.getElementById('clear-search');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        const results = document.getElementById('search-results');
        if (results) results.style.display = 'none';
        clearBtn.style.display = 'none';
        input.focus();
      });
    }

    // Click outside to close
    document.addEventListener('click', (e) => {
      handleClickOutside(e, 'search-results', 'search-input');
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
      const results = document.getElementById('search-results');
      if (!results || results.style.display === 'none') return;

      const items = results.querySelectorAll('.search-result-item');
      if (items.length === 0) return;

      let activeIndex = -1;
      items.forEach((item, index) => {
        if (item.classList.contains('active')) {
          activeIndex = index;
          item.classList.remove('active');
        }
      });

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        items[activeIndex].classList.add('active');
        items[activeIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        items[activeIndex].classList.add('active');
        items[activeIndex].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && items[activeIndex]) {
          window.location.href = items[activeIndex].dataset.url;
        }
      } else if (e.key === 'Escape') {
        results.style.display = 'none';
        input.blur();
      }
    });

    console.log('🔍 Recherche inline desktop initialisée');
  }

  // Preload Pagefind in background - essaie aussi lors du premier clic
  function preloadPagefind() {
    // Try immediately
    initializePagefind();
    
    // Then try again after a delay
    setTimeout(() => {
      if (!isInitialized) {
        initializePagefind();
      }
    }, 1500);
  }
  
  // Also try to initialize on first user interaction for faster search
  function setupSearchTriggers() {
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    
    const tryInit = () => {
      if (!isInitialized) {
        initializePagefind();
      }
    };
    
    searchInput?.addEventListener('focus', tryInit, { once: true });
    searchInput?.addEventListener('input', tryInit, { once: true });
    mobileSearchInput?.addEventListener('focus', tryInit, { once: true });
    mobileSearchInput?.addEventListener('input', tryInit, { once: true });
  }

  // Initialize on DOM ready
  function init() {
    isMobile = isMobileDevice();

    // Update on resize
    window.addEventListener('resize', debounce(() => {
      isMobile = isMobileDevice();
      // Update dropdown position if visible
      const dropdown = document.getElementById('search-results');
      if (dropdown && dropdown.style.display !== 'none') {
        updateDropdownPosition('search-input', 'search-results');
      }
    }, 250));
    
    // Fix: Ne plus recalculer la position au scroll pour eviter le detachement
    // La position est maintenantoren par CSS relative au conteneur parent

    initializeDesktopSearch();
    setupMobileSearch();
    setupSearchTriggers();
    preloadPagefind();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
