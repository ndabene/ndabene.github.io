document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('[data-slider]');
  sliders.forEach(slider => {
    const track = slider.querySelector('[data-track]');
    const prev = slider.querySelector('[data-prev]');
    const next = slider.querySelector('[data-next]');
    if (!track) return;

    // Step equals one slide width + gap for carousels with multiple visible items
    const getStep = () => {
      const children = track.querySelectorAll(':scope > *');
      if (!children.length) return track.clientWidth;
      const rect = children[0].getBoundingClientRect();
      let gap = 16;
      const styles = window.getComputedStyle(track);
      const g = parseFloat((styles.gap || styles.columnGap || styles.rowGap || '16').toString());
      if (!Number.isNaN(g)) gap = g;
      return Math.round(rect.width + gap);
    };

    const scrollLeft = () => track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    const scrollRight = () => track.scrollBy({ left: getStep(), behavior: 'smooth' });

    function updateDisabled() {
      const maxScroll = track.scrollWidth - track.clientWidth - 1;
      if (prev) prev.classList.toggle('disabled', track.scrollLeft <= 1);
      if (next) next.classList.toggle('disabled', track.scrollLeft >= maxScroll);
    }

    prev?.addEventListener('click', () => { scrollLeft(); setTimeout(updateDisabled, 250); });
    next?.addEventListener('click', () => { scrollRight(); setTimeout(updateDisabled, 250); });
    track.addEventListener('scroll', updateDisabled, { passive: true });
    window.addEventListener('resize', updateDisabled);
    updateDisabled();
  });
});


