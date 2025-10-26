// Layout debug helper: highlight elements causing horizontal overflow
// Enable by adding ?debugLayout to the URL
document.addEventListener('DOMContentLoaded', function () {
  try {
    var params = new URLSearchParams(window.location.search);
    if (!params.has('debugLayout')) return;

    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var offenders = [];

    document.querySelectorAll('body *').forEach(function (el) {
      // Skip hidden/script/style elements
      if (!el.getBoundingClientRect) return;
      var rect = el.getBoundingClientRect();
      var scrollW = el.scrollWidth;
      // Allow 1px tolerance for subpixel rounding
      if (rect.width - viewportWidth > 1 || scrollW - viewportWidth > 1) {
        el.style.outline = '2px solid rgba(220,38,38,.8)';
        el.style.outlineOffset = '-1px';
        offenders.push(el);
      }
    });

    // Debug output (uncomment to enable console logging)
    // console.log('[layout-debug] viewportWidth=', viewportWidth, 'offenders=', offenders.length, offenders);
  } catch (e) {
    console.error('[layout-debug] error', e);
  }
});


