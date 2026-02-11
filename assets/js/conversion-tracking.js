/**
 * Conversion Tracking for Google Analytics 4
 * Tracks important user actions as conversions
 */

(function() {
  'use strict';

  // Wait for GA to be loaded
  function waitForGA(callback) {
    if (typeof gtag !== 'undefined') {
      callback();
    } else {
      setTimeout(function() {
        waitForGA(callback);
      }, 100);
    }
  }

  // Track conversion event
  function trackConversion(eventName, eventParams = {}) {
    if (typeof gtag === 'undefined') {
      console.warn('Google Analytics not loaded, conversion not tracked:', eventName);
      return;
    }

    // Send event to GA4
    gtag('event', eventName, eventParams);

    console.log('Conversion tracked:', eventName, eventParams);
  }

  // Initialize conversion tracking
  function initConversionTracking() {

    // 1. Track clicks on PrestaShop Addons marketplace links
    trackMarketplaceClicks();

    // 2. Track contact form submissions
    trackContactFormSubmissions();

    // 3. Track product page visits
    trackProductPageVisits();

    // 4. Track CTA block interactions
    trackCTABlockClicks();

    // 5. Track other product links
    trackOtherProductClicks();

    // 6. Track social media clicks (optional)
    trackSocialMediaClicks();

    // 7. Track LinkedIn profile clicks (distinct from social sharing)
    trackLinkedInProfileClicks();

    // 8. Track resource downloads (PDFs, docs, etc.)
    trackResourceDownloads();
  }

  // Track clicks on marketplace links (PRIMARY CONVERSION)
  function trackMarketplaceClicks() {
    // Find all links to PrestaShop Addons
    const marketplaceLinks = document.querySelectorAll('a[href*="addons.prestashop.com"]');

    marketplaceLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const url = this.href;
        const productId = url.match(/\/(\d+)-/)?.[1] || 'unknown';
        const productName = extractProductName(url) || 'Unknown Product';
        const linkText = this.textContent.trim();
        const linkLocation = getElementLocation(this);

        trackConversion('marketplace_click', {
          event_category: 'conversion',
          event_label: productName,
          product_id: productId,
          link_text: linkText,
          link_location: linkLocation,
          destination_url: url,
          value: 1
        });
      });
    });
  }

  // Track contact form submissions (PRIMARY CONVERSION)
  function trackContactFormSubmissions() {
    const contactForms = document.querySelectorAll('form[action*="formspree.io"], form.contact-form');

    contactForms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        const contactType = form.querySelector('[name="contact_type"]')?.value || 'Not specified';
        const subject = form.querySelector('[name="subject"]')?.value || '';

        trackConversion('contact_form_submission', {
          event_category: 'conversion',
          event_label: contactType,
          form_subject: subject,
          value: 5
        });
      });
    });
  }

  // Track product page visits
  function trackProductPageVisits() {
    // Check if we're on a product page
    const isProductPage = window.location.pathname.includes('/modules/');

    if (isProductPage) {
      const productName = document.querySelector('h1')?.textContent.trim() || 'Unknown Product';
      const pageLanguage = document.documentElement.lang || 'fr';

      trackConversion('product_page_view', {
        event_category: 'engagement',
        event_label: productName,
        page_language: pageLanguage,
        value: 0.5
      });
    }
  }

  // Track CTA block clicks
  function trackCTABlockClicks() {
    // Track clicks on the MCP Tools Plus CTA block in blog posts
    const ctaLinks = document.querySelectorAll('.mcp-tools-plus-blog-btn, .blog-mcp-tools-plus-section a');

    ctaLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const destination = this.href;
        const linkText = this.textContent.trim();
        const articleTitle = document.querySelector('h1.post-title, article h1')?.textContent.trim() || 'Unknown Article';

        trackConversion('cta_block_click', {
          event_category: 'engagement',
          event_label: 'MCP Tools Plus CTA',
          article_title: articleTitle,
          link_text: linkText,
          destination_url: destination,
          value: 0.3
        });
      });
    });
  }

  // Track other product/module clicks
  function trackOtherProductClicks() {
    // Track clicks on other products (Geo Suite, Google Pay, etc.)
    const productLinks = document.querySelectorAll('a[href*="businesstech.fr"]');

    productLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const url = this.href;
        const linkText = this.textContent.trim();
        const productName = extractProductName(url) || linkText;

        trackConversion('other_product_click', {
          event_category: 'engagement',
          event_label: productName,
          destination_url: url,
          value: 0.5
        });
      });
    });
  }

  // Track social media clicks (OPTIONAL - MICRO-CONVERSION)
  function trackSocialMediaClicks() {
    const socialLinks = document.querySelectorAll('.social-icon, a[href*="linkedin.com"], a[href*="github.com"]');

    socialLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const platform = extractSocialPlatform(this.href);

        trackConversion('social_media_click', {
          event_category: 'engagement',
          event_label: platform,
          value: 0.1
        });
      });
    });
  }

  // Track LinkedIn profile clicks (DISTINCT FROM SOCIAL SHARING)
  function trackLinkedInProfileClicks() {
    // Target specific LinkedIn profile links (not article sharing)
    const linkedInProfileLinks = document.querySelectorAll(
      'a[href*="linkedin.com/in/ndabene"], a[href*="linkedin.com/in/nicolasdabene"], .linkedin-profile-link'
    );

    linkedInProfileLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const linkLocation = getElementLocation(this);
        const destinationUrl = this.href;

        trackConversion('click_linkedin_profile', {
          event_category: 'engagement',
          event_label: 'LinkedIn Profile Visit',
          link_location: linkLocation,
          destination_url: destinationUrl,
          value: 0.5
        });
      });
    });
  }

  // Track resource downloads (FUTURE-PROOFING)
  function trackResourceDownloads() {
    // Find all downloadable resource links
    const downloadLinks = document.querySelectorAll(
      'a[href$=".pdf"], a[href$=".zip"], a[href$=".doc"], a[href$=".docx"], a[href$=".ppt"], a[href$=".pptx"], a[download], .download-resource'
    );

    downloadLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const url = this.href;
        const fileName = extractFileName(url);
        const resourceType = extractFileType(url);
        const linkLocation = getElementLocation(this);

        trackConversion('download_resource', {
          event_category: 'conversion',
          event_label: fileName,
          resource_type: resourceType,
          link_location: linkLocation,
          value: 2
        });
      });
    });
  }

  // Helper: Extract product name from URL
  function extractProductName(url) {
    // Try to extract from URL pattern like /12345-product-name.html
    const match = url.match(/\/\d+-([\w-]+)\.html/);
    if (match) {
      return match[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Try to extract from path
    const pathParts = new URL(url).pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      return pathParts[pathParts.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    return null;
  }

  // Helper: Extract social platform from URL
  function extractSocialPlatform(url) {
    if (url.includes('linkedin.com')) return 'LinkedIn';
    if (url.includes('github.com')) return 'GitHub';
    if (url.includes('youtube.com')) return 'YouTube';
    if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter/X';
    if (url.includes('facebook.com')) return 'Facebook';
    if (url.includes('dev.to')) return 'Dev.to';
    return 'Other';
  }

  // Helper: Get element location on page
  function getElementLocation(element) {
    // Determine where on the page the element is located
    if (element.closest('nav, header')) return 'header';
    if (element.closest('footer')) return 'footer';
    if (element.closest('.hero-gradient, section[class*="hero"]')) return 'hero';
    if (element.closest('section[class*="cta"]')) return 'cta_section';
    if (element.closest('article, .post-content')) return 'article_content';
    if (element.closest('.blog-mcp-tools-plus-section')) return 'article_cta_block';
    return 'body';
  }

  // Helper: Extract file name from URL
  function extractFileName(url) {
    try {
      const urlObj = new URL(url, window.location.origin);
      const pathname = urlObj.pathname;
      const fileName = pathname.split('/').pop();
      return fileName || 'unknown_file';
    } catch (e) {
      return 'unknown_file';
    }
  }

  // Helper: Extract file type from URL
  function extractFileType(url) {
    const extension = url.split('.').pop().toLowerCase();
    const typeMap = {
      'pdf': 'PDF Document',
      'zip': 'ZIP Archive',
      'doc': 'Word Document',
      'docx': 'Word Document',
      'ppt': 'PowerPoint',
      'pptx': 'PowerPoint',
      'xls': 'Excel Spreadsheet',
      'xlsx': 'Excel Spreadsheet'
    };
    return typeMap[extension] || extension.toUpperCase();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      waitForGA(initConversionTracking);
    });
  } else {
    waitForGA(initConversionTracking);
  }

})();
