/**
 * GA4 Micro-Conversions Tracking
 * Tracks user engagement signals to qualify traffic quality
 *
 * Events tracked:
 * - scroll_depth: User scrolled past 25/50/75/90% thresholds on article pages
 * - scroll_depth_75: User scrolled more than 75% (non-article pages, compatibility)
 * - internal_cta_click: Click on internal CTAs and links
 * - internal_navigation: Natural navigation between articles (distinct from CTAs)
 * - engaged_session: Session duration exceeds 90 seconds
 * - article_read: User spent 60 seconds reading an article
 * - code_copy: User copied a code block
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    scrollDepthThreshold: 75, // Percentage (legacy, non-article pages)
    articleScrollThresholds: [25, 50, 75, 90], // Multi-threshold for article pages
    engagedSessionTime: 90000, // 90 seconds in milliseconds
    articleReadTime: 60000, // 60 seconds in milliseconds
    debounceDelay: 300, // Milliseconds for scroll debouncing
  };

  // Helper: is current page an article?
  const isArticlePage = window.location.pathname.includes('/articles/');

  // Tracking state to avoid duplicate events
  const trackingState = {
    scrollDepth75Tracked: false,
    articleScrollTracked: new Set(),
    engagedSessionTracked: false,
    articleReadTracked: false,
    sessionStartTime: Date.now(),
  };

  /**
   * Wait for GA to be loaded before tracking
   */
  function waitForGA(callback) {
    if (typeof gtag !== 'undefined') {
      callback();
    } else {
      setTimeout(() => waitForGA(callback), 100);
    }
  }

  /**
   * Track a micro-conversion event to GA4
   */
  function trackMicroConversion(eventName, eventParams = {}) {
    if (typeof gtag === 'undefined') {
      console.warn('GA4 not loaded, micro-conversion not tracked:', eventName);
      return;
    }

    // Add common parameters
    const params = {
      event_category: 'engagement',
      page_path: window.location.pathname,
      page_title: document.title,
      ...eventParams
    };

    gtag('event', eventName, params);
    console.log('Micro-conversion tracked:', eventName, params);
  }

  /**
   * 1. SCROLL DEPTH TRACKING
   * - Article pages (/articles/): fires at 25%, 50%, 75%, 90% with article_title
   * - Other pages: fires once at 75% (backward-compatible event name scroll_depth_75)
   */
  function initScrollDepthTracking() {
    let scrollTimeout;
    const articleTitle = document.querySelector('h1')?.textContent.trim() || document.title;

    function checkScrollDepth() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;

      if (isArticlePage) {
        // Multi-threshold tracking on article pages
        CONFIG.articleScrollThresholds.forEach(function(threshold) {
          if (!trackingState.articleScrollTracked.has(threshold) && scrollPercentage >= threshold) {
            trackingState.articleScrollTracked.add(threshold);
            trackMicroConversion('scroll_depth', {
              event_label: 'Article scroll depth ' + threshold + '%',
              scroll_percentage: threshold,
              article_title: articleTitle,
              value: threshold >= 75 ? 0.5 : 0.2
            });
          }
        });

        // Remove listener once all thresholds are tracked
        if (trackingState.articleScrollTracked.size === CONFIG.articleScrollThresholds.length) {
          window.removeEventListener('scroll', handleScroll);
        }
      } else {
        // Legacy single-threshold tracking on non-article pages
        if (trackingState.scrollDepth75Tracked) return;
        if (scrollPercentage >= CONFIG.scrollDepthThreshold) {
          trackingState.scrollDepth75Tracked = true;
          trackMicroConversion('scroll_depth_75', {
            event_label: 'Deep scroll engagement',
            scroll_percentage: Math.round(scrollPercentage),
            value: 0.5
          });
          window.removeEventListener('scroll', handleScroll);
        }
      }
    }

    function handleScroll() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkScrollDepth, CONFIG.debounceDelay);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * 1b. ARTICLE READ TRACKING (60 seconds on /articles/ pages)
   * Fires article_read event when user stays on an article for 60 seconds
   */
  function initArticleReadTracking() {
    if (!isArticlePage) return;
    const articleTitle = document.querySelector('h1')?.textContent.trim() || document.title;

    setTimeout(function() {
      if (trackingState.articleReadTracked) return;
      trackingState.articleReadTracked = true;
      trackMicroConversion('article_read', {
        event_label: 'Article read 60 seconds',
        article_title: articleTitle,
        time_spent: 60,
        value: 1
      });
    }, CONFIG.articleReadTime);
  }

  /**
   * 2. INTERNAL CTA CLICK TRACKING
   * Tracks clicks on internal links and CTAs
   */
  function initInternalCTATracking() {
    // Target internal links but exclude external and already tracked links
    const selectors = [
      'a[href^="/"]',           // Internal links
      'a[href^="./"]',          // Relative links
      'a[href^="../"]',         // Parent relative links
      '.cta-button',            // CTA buttons
      '.btn-primary',           // Primary buttons
      '.btn-secondary',         // Secondary buttons
    ].join(', ');

    document.addEventListener('click', function(e) {
      const target = e.target.closest(selectors);
      if (!target) return;

      // Skip external links (already tracked in conversion-tracking.js)
      const href = target.getAttribute('href');
      if (!href ||
          href.includes('addons.prestashop.com') ||
          href.includes('businesstech.fr') ||
          href.includes('http://') ||
          href.includes('https://')) {
        return;
      }

      const linkText = target.textContent.trim();
      const linkHref = href;
      const linkLocation = getElementLocation(target);
      const linkClasses = target.className;

      trackMicroConversion('internal_cta_click', {
        event_label: linkText,
        link_text: linkText,
        link_url: linkHref,
        link_location: linkLocation,
        link_classes: linkClasses,
        value: 0.3
      });
    });
  }

  /**
   * 3. INTERNAL NAVIGATION TRACKING (ARTICLE TO ARTICLE)
   * Tracks natural navigation between articles, distinct from CTA clicks
   */
  function initInternalNavigationTracking() {
    document.addEventListener('click', function(e) {
      const target = e.target.closest('a[href^="/articles/"], a[href^="/blog/"]');
      if (!target) return;

      // Skip if it's a CTA button (already tracked by internal_cta_click)
      if (target.classList.contains('cta-button') ||
          target.classList.contains('btn-primary') ||
          target.classList.contains('btn-secondary') ||
          target.classList.contains('contextual-cta-button')) {
        return;
      }

      const destinationUrl = target.getAttribute('href');
      const linkText = target.textContent.trim();
      const linkLocation = getElementLocation(target);

      trackMicroConversion('internal_navigation', {
        event_label: 'Article to Article Navigation',
        link_text: linkText,
        destination_url: destinationUrl,
        link_location: linkLocation,
        value: 0.2
      });
    });
  }

  /**
   * 4. ENGAGED SESSION TRACKING (> 90s)
   * Tracks when user stays on page for more than 90 seconds
   */
  function initEngagedSessionTracking() {
    setTimeout(() => {
      if (trackingState.engagedSessionTracked) return;

      const sessionDuration = Date.now() - trackingState.sessionStartTime;
      trackingState.engagedSessionTracked = true;

      trackMicroConversion('engaged_session', {
        event_label: 'Session > 90 seconds',
        session_duration_seconds: Math.round(sessionDuration / 1000),
        value: 1
      });
    }, CONFIG.engagedSessionTime);
  }

  /**
   * 5. CODE COPY TRACKING
   * Tracks when user copies code from code blocks
   */
  function initCodeCopyTracking() {
    // Target code blocks (common selectors for Jekyll/Markdown sites)
    const codeBlockSelectors = [
      'pre code',
      '.highlight',
      '.highlighter-rouge',
      'code[class*="language-"]'
    ].join(', ');

    document.addEventListener('copy', function(e) {
      const selection = window.getSelection();
      if (!selection || selection.toString().length === 0) return;

      // Check if the copied text is from a code block
      let node = selection.anchorNode;
      while (node && node !== document.body) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches && node.matches(codeBlockSelectors)) {
            const copiedText = selection.toString();
            const codeLanguage = extractCodeLanguage(node);
            const codeLength = copiedText.length;

            trackMicroConversion('code_copy', {
              event_label: 'Code copied from article',
              code_language: codeLanguage,
              code_length: codeLength,
              article_title: document.querySelector('h1')?.textContent.trim() || 'Unknown',
              value: 0.8
            });
            break;
          }
        }
        node = node.parentNode;
      }
    });
  }

  /**
   * Helper: Extract code language from code block classes
   */
  function extractCodeLanguage(codeElement) {
    const classes = codeElement.className;

    // Try to extract from class names like "language-javascript" or "lang-python"
    const langMatch = classes.match(/language-(\w+)|lang-(\w+)/);
    if (langMatch) {
      return langMatch[1] || langMatch[2];
    }

    // Try to find from parent highlight container
    const highlightParent = codeElement.closest('[class*="highlight"]');
    if (highlightParent) {
      const highlightMatch = highlightParent.className.match(/highlight-(\w+)/);
      if (highlightMatch) return highlightMatch[1];
    }

    return 'unknown';
  }

  /**
   * Helper: Get element location on page
   */
  function getElementLocation(element) {
    if (element.closest('nav, header')) return 'header';
    if (element.closest('footer')) return 'footer';
    if (element.closest('.hero, [class*="hero"]')) return 'hero';
    if (element.closest('[class*="cta"]')) return 'cta_section';
    if (element.closest('article, .post-content, .content')) return 'article_content';
    if (element.closest('aside, .sidebar')) return 'sidebar';
    return 'body';
  }

  /**
   * Initialize all micro-conversion tracking
   */
  function initMicroConversionTracking() {
    console.log('Initializing GA4 micro-conversion tracking...');

    // 1. Track scroll depth (multi-threshold on articles, 75% on other pages)
    initScrollDepthTracking();

    // 1b. Track article read (60s on /articles/ pages)
    initArticleReadTracking();

    // 2. Track internal CTA clicks
    initInternalCTATracking();

    // 3. Track internal navigation (article to article)
    initInternalNavigationTracking();

    // 4. Track engaged sessions
    initEngagedSessionTracking();

    // 5. Track code copying
    initCodeCopyTracking();

    console.log('GA4 micro-conversion tracking initialized');
  }

  /**
   * Start tracking when DOM is ready and GA is loaded
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      waitForGA(initMicroConversionTracking);
    });
  } else {
    waitForGA(initMicroConversionTracking);
  }

})();
