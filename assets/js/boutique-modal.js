document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.boutique-page-section');
  if (!container) return;

  function openModal(content) {
    const overlay = document.createElement('div');
    overlay.className = 'qv-overlay';

    const modal = document.createElement('div');
    modal.className = 'qv-modal';
    modal.innerHTML = content;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    function close() {
      overlay.remove();
      document.body.classList.remove('qv-open');
    }

    const closeBtn = document.createElement('button');
    closeBtn.className = 'qv-close';
    closeBtn.setAttribute('aria-label', 'Fermer');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', close);

    modal.prepend(closeBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    document.body.classList.add('qv-open');
  }

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-quickview]');
    if (!btn) return;
    const card = btn.closest('.product-card');
    if (!card) return;
    const tpl = card.querySelector('.quick-view-content');
    if (!tpl) return;
    openModal(tpl.innerHTML);
  });
});


