---
layout: post
title: How We Scaled a PrestaShop to 1M+ Products
author: Nicolas Dabène
date: 2024-08-10 10:00:00 +0200
categories: [E-commerce, Performance, Case Study]
tags: [PrestaShop, Scalability, Optimization, Database, Caching]
excerpt: "A detailed technical case study on optimizing a PrestaShop instance to handle over a million products, focusing on database, caching, and infrastructure strategies."
read_time_minutes: 14
difficulty: Advanced
---

Scaling an e-commerce platform to handle a massive product catalog, such as over a million SKUs, presents unique technical challenges. While PrestaShop is a powerful platform, its default configuration and architecture are not inherently designed for such extreme scales. This case study details the strategies and optimizations we implemented to successfully scale a PrestaShop instance to manage and serve over 1 million products efficiently.

## The Challenge: A Growing Catalog and Lagging Performance

Our client, a rapidly expanding online retailer, was facing severe performance degradation as their product catalog approached the 500,000 SKU mark. Page load times were increasing, backend operations (like product imports and indexing) were taking hours, and the overall user experience was suffering. The goal was to not only resolve these issues but to build a foundation capable of supporting over 1 million products with optimal performance.

## Key Bottlenecks Identified

Through extensive profiling and analysis, we pinpointed the primary bottlenecks:

1.  **Database Overload:** Slow queries on product-related tables, inefficient indexing, and a high number of joins.
2.  **Caching Inefficiency:** Insufficient caching of product data, categories, and search results.
3.  **Image Handling:** Unoptimized image sizes and lack of efficient image delivery.
4.  **Search Indexing:** The default search indexing process was extremely slow and resource-intensive.
5.  **Server Resources:** PHP-FPM and MySQL configurations were not optimized for the increased load.

## Our Multi-faceted Scaling Strategy

We adopted a comprehensive approach, tackling optimizations across the application, database, and infrastructure layers.

### 1. Database Optimization & Refactoring

-   **Indexing Strategy:** Reviewed and optimized all database indexes, adding composite indexes where necessary and removing redundant ones. Focused on `ps_product`, `ps_product_lang`, `ps_category_product`, and `ps_feature_product` tables.
-   **Query Optimization:** Rewrote complex and slow SQL queries, particularly those used for product listings, filters, and search. Replaced N+1 queries with single, optimized queries.
-   **Database Sharding (Partial):** For the most heavily accessed product data, we implemented a form of logical sharding, distributing product data across multiple database instances to reduce contention.
-   **Read Replicas:** Configured MySQL read replicas to offload read traffic from the primary database, especially for public-facing storefront operations.

### 2. Advanced Caching Implementation

-   **Redis for Object Caching:** Replaced file-based caching with Redis for PrestaShop's object cache. This dramatically improved the speed of retrieving frequently accessed data like product details, configurations, and translations.
-   **Varnish Cache for Full-Page Caching:** Implemented Varnish as a reverse proxy to cache full HTML pages for anonymous users. This reduced the load on the PHP application by serving cached content directly.
-   **Smarty Cache Optimization:** Fine-tuned PrestaShop's Smarty template caching to ensure efficient compilation and retrieval of template files.

### 3. Efficient Image Management

-   **Image Optimization Pipeline:** Implemented an automated image optimization pipeline using tools like ImageMagick and WebP conversion. All new and existing images were converted to WebP format with appropriate fallbacks.
-   **CDN Integration:** Integrated a Content Delivery Network (CDN) to serve all product images and static assets. This reduced latency and offloaded traffic from the origin server.
-   **Lazy Loading:** Implemented native lazy loading for product images on category and search results pages to improve initial page load times.

### 4. Optimized Search & Indexing

-   **Elasticsearch Integration:** Replaced PrestaShop's default search with a dedicated Elasticsearch cluster. This provided significantly faster and more relevant search results.
-   **Asynchronous Indexing:** Developed a custom module to asynchronously update the Elasticsearch index whenever product data changed, preventing blocking operations on the main application.

### 5. Infrastructure & Server Tuning

-   **PHP-FPM Tuning:** Optimized PHP-FPM worker processes, memory limits, and request timeouts based on server resources and traffic patterns.
-   **Nginx Configuration:** Fine-tuned Nginx configurations for efficient request handling, Gzip compression, and HTTP/2 support.
-   **Server Resources:** Upgraded server hardware (CPU, RAM) and migrated to SSD-based storage for faster I/O operations.
-   **Load Balancing & Auto-scaling:** Deployed the application behind a load balancer with auto-scaling groups on AWS, ensuring the platform could dynamically adjust to traffic spikes.

## Results & Impact

Within three months of implementing these optimizations, the client experienced transformative results:

-   **Page Load Time:** Average page load time reduced by 70%, from 4-5 seconds to under 1.5 seconds.
-   **Backend Operations:** Product import and indexing times reduced by 80%, allowing for more frequent catalog updates.
-   **Scalability:** The platform successfully handled over 1 million products and a 3x increase in concurrent users without performance degradation.
-   **Conversion Rate:** A noticeable increase in conversion rates, directly attributed to improved site speed and user experience.
-   **Operational Efficiency:** Reduced server resource consumption and improved stability, leading to lower infrastructure costs.

## Key Learnings

-   **Holistic Approach:** Scaling a complex e-commerce platform requires a holistic approach, addressing bottlenecks across all layers (application, database, infrastructure).
-   **Profiling is Key:** Never guess where bottlenecks are; always use profiling tools to identify the root cause.
-   **Incremental Implementation:** Implement changes incrementally and monitor their impact to avoid introducing new issues.
-   **Caching is Your Friend:** Leverage multiple layers of caching effectively.
-   **Beyond the Core:** Don't be afraid to integrate external, specialized services (like Elasticsearch) when the platform's native capabilities are insufficient for extreme scale.

This project underscored the importance of deep technical expertise and a systematic approach to performance optimization, proving that even a large PrestaShop instance can be scaled to meet demanding enterprise requirements.