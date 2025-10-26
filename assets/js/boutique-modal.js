document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.boutique-page-section');
  if (!container) return;

  // Defensive: ensure styles exist even if SCSS nesting changed
  const ensureStyles = () => {
    const probe = document.createElement('div');
    probe.className = 'qv-overlay';
    probe.style.display = 'none';
    document.body.appendChild(probe);
    const comp = window.getComputedStyle(probe);
    const hasFixed = comp.position === 'fixed';
    probe.remove();
    return hasFixed;
  };

  function openModal(content) {
    const overlay = document.createElement('div');
    overlay.className = 'qv-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('tabindex', '-1');

    const modal = document.createElement('div');
    modal.className = 'qv-modal';
    modal.innerHTML = content;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    function close() {
      overlay.remove();
      document.body.classList.remove('qv-open');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeydown);
    }

    // Add close button only if not provided by template
    if (!modal.querySelector('.qv-close')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'qv-close';
      closeBtn.setAttribute('aria-label', 'Fermer');
      closeBtn.type = 'button';
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', close);
      modal.prepend(closeBtn);
    } else {
      modal.querySelector('.qv-close').addEventListener('click', close);
    }
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.classList.add('qv-open');
    document.body.style.overflow = 'hidden';

    // Accessibility: close on ESC and set initial focus to overlay without scrolling content
    function onKeydown(ev){
      if (ev.key === 'Escape') { close(); return; }
      if (ev.key === 'Tab') {
        // Focus trap
        const focusables = modal.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (ev.shiftKey && document.activeElement === first) { last.focus(); ev.preventDefault(); }
        else if (!ev.shiftKey && document.activeElement === last) { first.focus(); ev.preventDefault(); }
      }
    }
    document.addEventListener('keydown', onKeydown);
    try { overlay.focus({ preventScroll: true }); } catch(_){}
    // Ensure focus moves inside
    const firstFocusable = modal.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) { try { firstFocusable.focus({ preventScroll: true }); } catch(_){} }
  }

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-quickview]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const card = btn.closest('.product-card');
    if (!card) return;
    const tpl = card.querySelector('.quick-view-content');
    if (!tpl) { /* console.warn('Quick-view template introuvable'); */ return; }
    const html = tpl.innerHTML && tpl.innerHTML.trim();
    if (!html) { /* console.warn('Quick-view template vide'); */ return; }
    openModal(html);
    // Inject lightweight JSON-LD for modal view (non-indexed) to help GEO tools parse context
    try {
      const name = card?.dataset?.name || '';
      const price = card?.dataset?.price || '';
      const img = card.querySelector('img')?.getAttribute('src') || '';
      const ld = {
        '@context': 'https://schema.org',
        '@type': ['Product','Course'],
        name,
        image: img,
        offers: { '@type': 'Offer', priceCurrency: 'EUR', price }
      };
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(ld);
      document.body.appendChild(script);
      setTimeout(() => script.remove(), 0);
    } catch(_){}
  });
});


