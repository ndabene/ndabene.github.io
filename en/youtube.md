---
layout: youtube
title: "YouTube Videos - PrestaShop, PHP & AI Tutorials"
description: "Discover my YouTube videos on PrestaShop development, PHP, artificial intelligence and e-commerce. Technical tutorials, practical tips and in-depth analysis."
permalink: /en/youtube/
lang: en
keywords: "youtube videos, prestashop tutorials, php development, artificial intelligence, e-commerce, web development, developer training, technical videos, ndabene06"
author: "Nicolas Dabène"
date: 2025-10-15
last_modified_at: 2025-10-15
sitemap:
  changefreq: "daily"
  priority: 0.8

# SEO and GEO Optimization
llm_summary: "Complete collection of Nicolas Dabène's YouTube videos on PrestaShop development, PHP, AI and e-commerce. Regularly updated technical content."
llm_topics:
  - prestashop tutorials
  - php development
  - artificial intelligence
  - e-commerce
  - developer training
  - technical videos
  - development best practices

# Open Graph for social sharing
og_title: "YouTube Videos - Nicolas Dabène | PrestaShop & AI Development"
og_description: "Discover my technical tutorials on PrestaShop, PHP and AI. Regularly updated content with the latest technologies."
og_image: "/assets/images/logo.png"
og_url: "https://ndabene.github.io/en/youtube/"
og_type: "website"

# Twitter Cards
twitter_card: "summary_large_image"
twitter_title: "YouTube Videos - Nicolas Dabène"
twitter_description: "PrestaShop, PHP & AI Tutorials by a senior developer"
twitter_image: "/assets/images/logo.png"
twitter_site: "@nicolasdabene"
---

<section class="page-hero-section">
    <div class="container">
        <nav class="breadcrumb">
            <a href="/en/">Home</a>
            <span>{{ page.title }}</span>
        </nav>
        <div class="hero-content">
            <h1>YouTube Videos</h1>
            <p class="section-description">Explore my technical tutorials on PrestaShop, PHP and artificial intelligence. Discover practical tips, in-depth analysis and demonstrations to boost your development skills.</p>
        </div>
    </div>
</section>

<!-- Include SEO/GEO metadata -->
{% include youtube-seo-meta.html %}

<!-- Structured Data JSON-LD for SEO and GEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "YouTube Videos - Nicolas Dabène",
  "description": "Complete collection of Nicolas Dabène's YouTube videos on PrestaShop development, PHP, AI and e-commerce",
  "url": "https://ndabene.github.io/en/youtube/",
  "author": {
    "@type": "Person",
    "name": "Nicolas Dabène",
    "jobTitle": "Senior FullStack PHP Developer",
    "knowsAbout": ["PrestaShop", "PHP", "Artificial Intelligence", "E-commerce", "Web Development"],
    "sameAs": [
      "https://github.com/ndabene",
      "https://linkedin.com/in/nicolas-dabène-473a43b8",
      "https://www.youtube.com/@ndabene06",
      "https://x.com/nicolasdabene"
    ]
  },
  "mainEntity": {
    "@type": "VideoGallery",
    "name": "Technical YouTube Tutorials",
    "description": "Educational videos on PrestaShop development, PHP and artificial intelligence",
    "video": [
      {% for video in sorted_videos limit: 10 %}
      {
        "@type": "VideoObject",
        "name": "{{ video.title | escape }}",
        "description": "{{ video.description | escape | truncate: 200 }}",
        "url": "{{ video.url }}",
        "embedUrl": "https://www.youtube.com/embed/{{ video.video_id }}",
        "thumbnailUrl": "{{ video.thumbnail }}",
        "uploadDate": "{{ video.published_at | date: '%Y-%m-%dT%H:%M:%S%:z' }}",
        "duration": "{{ video.duration }}",
        "author": {
          "@type": "Person",
          "name": "Nicolas Dabène"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Nicolas Dabène",
          "logo": {
            "@type": "ImageObject",
            "url": "https://ndabene.github.io/assets/images/logo.png"
          }
        },
        "keywords": "{{ video.category }}",
        "inLanguage": "fr"
      }{% unless forloop.last %},{% endunless %}
      {% endfor %}
    ]
  },
  "about": [
    {
      "@type": "Thing",
      "name": "PrestaShop",
      "description": "Open source e-commerce platform"
    },
    {
      "@type": "Thing",
      "name": "PHP",
      "description": "Web programming language"
    },
    {
      "@type": "Thing",
      "name": "Artificial Intelligence",
      "description": "AI and machine learning technologies"
    },
    {
      "@type": "Thing",
      "name": "E-commerce",
      "description": "Electronic commerce and digital solutions"
    }
  ],
  "educationalUse": "professionalDevelopment",
  "teaches": ["web development", "PrestaShop", "PHP", "artificial intelligence", "e-commerce"],
  "inLanguage": "fr",
  "datePublished": "2025-10-15",
  "dateModified": "{{ site.time | date: '%Y-%m-%d' }}"
}
</script>

<section class="blog-content-section">
    <div class="container">
        {% assign sorted_videos = site.data.youtube_videos | sort: 'published_at' | reverse %}
        {% assign total_videos = sorted_videos | size %}

        <div class="blog-grid-news" itemscope itemtype="https://schema.org/CollectionPage">
            <div class="main-blog-content-news">
                <!-- Filters and sorting -->
                <div class="blog-filters-container">
                    <div class="blog-filters-header">
                        <h2 class="section-title" itemprop="name">YouTube Videos</h2>
                        <div class="videos-count-badge" itemprop="description">
                            <span class="count-number">{{ total_videos }}</span>
                            <span class="count-label">videos</span>
                        </div>
                        <button id="toggle-youtube-filters" class="toggle-filters-btn">
                            <i class="fas fa-filter"></i>
                            <span>Filters</span>
                            <i class="fas fa-chevron-down chevron-icon"></i>
                        </button>
                    </div>

                    <!-- Filters zone (hidden by default) -->
                    <div id="youtube-filters-content" class="filters-content" style="display: none;">
                        <!-- Search bar -->
                        <div class="blog-search-bar">
                            <div class="search-input-wrapper">
                                <i class="fas fa-search"></i>
                                <input type="text" id="youtube-search-input" placeholder="Search for a video...">
                                <button id="clear-youtube-search" class="clear-search-btn" style="display: none;">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <!-- YouTube channels pills -->
                        <div class="blog-category-pills">
                            <button class="category-pill active" data-channel="">
                                <i class="fab fa-youtube"></i> All channels
                            </button>
                            {% assign channels = sorted_videos | map: 'channel' | uniq %}
                            {% for channel in channels %}
                                {% assign channel_videos = sorted_videos | where: 'channel', channel %}
                                <button class="category-pill" data-channel="{{ channel }}">
                                    {{ channel }} <span>({{ channel_videos.size }})</span>
                                </button>
                            {% endfor %}
                        </div>

                        <!-- Categories pills -->
                        <div class="blog-category-pills">
                            <button class="category-pill active" data-category="">
                                <i class="fas fa-folder"></i> All categories
                            </button>
                            {% assign categories = sorted_videos | map: 'category' | compact | uniq | sort %}
                            {% for category in categories %}
                                {% assign category_videos = sorted_videos | where: 'category', category %}
                                <button class="category-pill" data-category="{{ category | slugify }}">
                                    {{ category }} <span>({{ category_videos.size }})</span>
                                </button>
                            {% endfor %}
                        </div>

                        <!-- Quick sort -->
                        <div class="blog-sort-bar">
                            <span class="sort-label">Sort by:</span>
                            <div class="sort-pills">
                                <button class="sort-pill active" data-sort="date-desc">
                                    <i class="fas fa-fire"></i> Recent
                                </button>
                                <button class="sort-pill" data-sort="date-asc">
                                    <i class="fas fa-history"></i> Old
                                </button>
                                <button class="sort-pill" data-sort="title">
                                    <i class="fas fa-sort-alpha-down"></i> A-Z
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="filter-results-info" id="youtube-filter-results-info">
                        <span class="results-count">All videos <span id="youtube-filtered-count">({{ total_videos }})</span></span>
                        <div class="active-filters" id="youtube-active-filters"></div>
                    </div>
                </div>

                <!-- Videos grid -->
                <div class="post-list-news grid-view" id="youtube-videos-container">
                    {% for video in sorted_videos %}
                        <div class="post-preview-wrapper" itemprop="hasPart" itemscope itemtype="https://schema.org/VideoObject">
                            <article class="post-preview-card" data-categories="{% if video.category %}{{ video.category | slugify }}{% endif %}" data-date="{{ video.published_at | date: '%s' }}" data-title="{{ video.title }}" data-channel="{{ video.channel }}">
                                <div class="post-preview-image">
                                    <a href="{{ video.url }}" target="_blank" class="post-image-link">
                                        <img src="{{ video.thumbnail }}" alt="{{ video.title }}" loading="lazy" itemprop="thumbnailUrl">
                                        <div class="post-preview-overlay">
                                            <div class="play-icon-large">
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                            </div>
                                            {% if video.duration %}
                                                <span class="video-duration">{{ video.duration | replace: 'PT', '' | replace: 'H', 'h ' | replace: 'M', 'm ' | replace: 'S', 's' }}</span>
                                            {% endif %}
                                        </div>
                                    </a>
                                    <meta itemprop="url" content="{{ video.url }}">
                                    <meta itemprop="name" content="{{ video.title }}">
                                    <meta itemprop="description" content="{{ video.description | truncate: 200 }}">
                                    <meta itemprop="uploadDate" content="{{ video.published_at | date: '%Y-%m-%dT%H:%M:%S%:z' }}">
                                    <meta itemprop="duration" content="{{ video.duration }}">
                                    <meta itemprop="inLanguage" content="fr">
                                    {% if video.category %}
                                    <meta itemprop="keywords" content="{{ video.category }}">
                                    {% endif %}
                                    <div itemprop="author" itemscope itemtype="https://schema.org/Person">
                                        <meta itemprop="name" content="Nicolas Dabène">
                                    </div>
                                    <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
                                        <meta itemprop="name" content="Nicolas Dabène">
                                        <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
                                            <meta itemprop="url" content="https://ndabene.github.io/assets/images/logo.png">
                                        </div>
                                    </div>
                                </div>

                                <div class="post-preview-content">
                                    <div class="post-preview-meta">
                                        <span class="post-category">
                                            {% if video.category %}
                                                {{ video.category }}
                                            {% else %}
                                                YouTube
                                            {% endif %}
                                        </span>
                                        <time class="post-date" datetime="{{ video.published_at | date: '%Y-%m-%d' }}" itemprop="datePublished">
                                            {% include date-fr.html date=video.published_at %}
                                        </time>
                                    </div>

                                    <h3 class="post-preview-title" itemprop="headline">
                                        <a href="{{ video.url }}" target="_blank">{{ video.title }}</a>
                                    </h3>

                                    {% if video.description %}
                                        <p class="post-preview-excerpt">{{ video.description | truncate: 160 }}</p>
                                    {% endif %}

                                    <div class="post-preview-footer">
                                        <a href="{{ video.url }}" class="read-more-link" target="_blank">
                                            <span>Watch video</span>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M5 12h14M12 5l7 7-7 7"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </div>
                    {% endfor %}
                </div>

                <!-- Message when no results -->
                <div class="no-results" id="youtube-no-results">
                    <div class="no-results-icon">
                        <i class="fab fa-youtube"></i>
                    </div>
                    <h3>No videos found</h3>
                    <p>No videos match your search criteria.</p>
                    <button id="reset-youtube-filters" class="btn btn--primary">Reset filters</button>
                </div>

                <!-- Pagination -->
                {% assign videos_per_page = 6 %}
                {% assign remaining_videos = total_videos | minus: 0 %}
                {% if remaining_videos > videos_per_page %}
                    <div class="pagination-container">
                        <div class="pagination">
                            <button id="youtube-prev-page" class="pagination-btn" disabled>&laquo; Previous</button>
                            <div id="youtube-pagination-numbers"></div>
                            <button id="youtube-next-page" class="pagination-btn">Next &raquo;</button>
                        </div>
                        <div class="pagination-info-wrapper">
                            Showing <span id="youtube-showing-range">1-6</span> of <span id="youtube-total-videos">{{ remaining_videos }}</span> videos
                        </div>
                    </div>
                {% endif %}

                <!-- CTA Section -->
                <div class="youtube-cta-section">
                    <div class="cta-card">
                        <div class="cta-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                            </svg>
                        </div>
                        <div class="cta-content">
                            <h3>All my YouTube videos</h3>
                            <p>Discover all my video content to deepen your technical knowledge.</p>
                            <a href="https://www.youtube.com/@ndabene06" class="cta-button-primary" target="_blank">
                                <span>Go to YouTube</span>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- YouTube Sidebar -->
            <aside class="blog-sidebar-news">
                <!-- Recent videos widget -->
                <div class="sidebar-widget-compact">
                    <h4><i class="fas fa-clock"></i> Recent videos</h4>
                    <div class="recent-posts-compact">
                        {% assign recent_videos = sorted_videos | slice: 0, 5 %}
                        {% for video in recent_videos %}
                            <article class="recent-post-compact">
                                {% if video.thumbnail %}
                                    <div class="recent-thumb-mini">
                                        <img src="{{ video.thumbnail }}" alt="{{ video.title }}" loading="lazy">
                                        <div class="recent-play-overlay">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                {% endif %}
                                <div class="recent-content-mini">
                                    <h5><a href="{{ video.url }}" target="_blank">{{ video.title | truncate: 45 }}</a></h5>
                                    <time>{% include date-fr.html date=video.published_at %}</time>
                                </div>
                            </article>
                        {% endfor %}
                    </div>
                </div>

                <!-- Categories widget -->
                <div class="sidebar-widget-compact">
                    <h4><i class="fas fa-folder"></i> Categories</h4>
                    <div class="categories-compact">
                        {% assign categories = sorted_videos | map: 'category' | compact | uniq | sort %}
                        {% for category in categories %}
                            {% assign category_videos = sorted_videos | where: 'category', category %}
                            <a href="javascript:void(0)" class="category-compact" data-category="{{ category | slugify }}">
                                {{ category }} <span>({{ category_videos.size }})</span>
                            </a>
                        {% endfor %}
                    </div>
                </div>
            </aside>
        </div>
    </div>
</section>

<script src="{{ '/assets/js/youtube-filters.js' | relative_url }}"></script>
<script src="{{ '/assets/js/youtube-pagination.js' | relative_url }}"></script>
