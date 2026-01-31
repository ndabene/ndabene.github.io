
import os

files = {
    "_includes/blog-mcp-tools-plus-block-en.html": """<!-- Blog MCP Tools Plus Block (EN) Placeholder -->
<div class="mcp-tools-plus-block">
  <h3>MCP Tools Plus</h3>
  <p>Learn more about our advanced MCP tools.</p>
</div>""",
    "_includes/blog-post-loop.html": "<!-- Blog Post Loop Placeholder -->",
    "_includes/expertise-related.html": "<!-- Expertise Related Placeholder -->",
    "_includes/expertise-related-resources.html": "<!-- Expertise Related Resources Placeholder -->",
    "_includes/featured-article-card.html": "<!-- Featured Article Card Placeholder -->",
    "_includes/filter-mode-toggle.html": "<!-- Filter Mode Toggle Placeholder -->",
    "_includes/future-posts-data.html": "<!-- Future Posts Data Placeholder -->",
    "_includes/hero-article.html": "<!-- Hero Article Placeholder -->",
    "_includes/home-content/blog-featured.html": "<!-- Home Blog Featured Placeholder -->",
    "_includes/home-content/hero-creator.html": "<!-- Home Hero Creator Placeholder -->",
    "_includes/home-content/modules-showcase.html": "<!-- Home Modules Showcase Placeholder -->",
    "_includes/home-content/rss-subscribe.html": "<!-- Home RSS Subscribe Placeholder -->",
    "_includes/home-content/youtube-featured.html": "<!-- Home YouTube Featured Placeholder -->",
    "_includes/nexus/hero.html": """<section class="nexus-hero">
  <div class="nexus-hero__content">
    <h1 class="nexus-hero__title">
      Orchestrating <span>Intelligence</span>
    </h1>
    <p class="nexus-hero__description">
      Senior PHP Developer & AI Orchestrator turning complex requirements into elegant solutions.
    </p>
    <div class="nexus-hero__actions">
      <a href="/blog/" class="nexus-btn nexus-btn--primary">Read Articles</a>
      <a href="/pages/boutique.html" class="nexus-btn nexus-btn--glass">View Modules</a>
    </div>
  </div>
</section>""",
    "_includes/person-jsonld.html": "<!-- Person JSON-LD Placeholder -->",
    "_includes/product-card-formation.html": "<!-- Product Card Formation Placeholder -->",
    "_includes/tags-cloud.html": "<!-- Tags Cloud Placeholder -->",
    "_includes/tech-badge.html": "<!-- Tech Badge Placeholder -->",
    "_includes/youtube-seo-meta.html": "<!-- YouTube SEO Meta Placeholder -->"
}

for path, content in files.items():
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        # Force write as UTF-8
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {path}")
    except Exception as e:
        print(f"Error {path}: {e}")
