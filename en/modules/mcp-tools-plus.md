---
layout: product-landing
title: "MCP Tools Plus - PrestaShop Module for AI & Commerce Analytics"
permalink: /en/modules/mcp-tools-plus/
lang: en
description: "Production-ready PrestaShop module that exposes Model Context Protocol (MCP) tools to provide real-time commerce analytics to AI agents. Sales tracking, tax declarations, stock alerts and profitability metrics—all accessible in natural language."
image: /assets/images/produits/mcp-tools-plus-og.jpg

# SEO
keywords: [MCP, PrestaShop, AI, Artificial Intelligence, Analytics, PrestaShop Module, Commerce, E-commerce]
og_type: product
twitter_card: summary_large_image

# Product data
product:
  name: "MCP Tools Plus"
  price: "€9.90 excl. VAT / Month"
  currency: "EUR"
  availability: "https://schema.org/InStock"
  addons_url: "https://addons.prestashop.com/en/administration-tools-prestashop-modules/96638-mcp-tools-plus.html"
  requirements:
    - "PrestaShop 8.2+"
    - "PHP 8.1+"
    - "ps_mcp_server module"
---

<!-- Navigation -->
<nav class="fixed top-0 w-full z-50 glass-effect">
    <div class="max-w-[1200px] mx-auto px-6 lg:px-4">
        <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-3">
                <img src="https://assets.prestashop3.com/addons/pico/96638.jpg" alt="MCP Tools Plus Logo" class="w-10 h-10 rounded-lg">
                <span class="text-xl font-bold text-[#0F172A]">MCP Tools Plus</span>
                <span class="hidden sm:inline-block badge badge-prestashop text-xs">
                    <i class="fab fa-prestashop mr-1"></i>Module
                </span>
            </div>
            <div class="hidden md:flex items-center gap-8">
                <a href="#features" class="text-[#475569] hover:text-[#0F172A] transition font-medium">Features</a>
                <a href="#tools" class="text-[#475569] hover:text-[#0F172A] transition font-medium">Tools</a>
                <a href="#requirements" class="text-[#475569] hover:text-[#0F172A] transition font-medium">Requirements</a>
                <a href="#docs" class="text-[#475569] hover:text-[#0F172A] transition font-medium">Docs</a>
                <a href="{{ page.product.addons_url }}" target="_blank" rel="noopener" class="btn-primary text-sm py-2.5 px-5 flex items-center gap-2">
                    <i class="fas fa-shopping-cart"></i>
                    Get on Addons
                </a>
            </div>
            <button id="mobileMenuBtn" class="md:hidden text-[#0F172A]">
                <i class="fas fa-bars text-xl"></i>
            </button>
        </div>
    </div>
    <!-- Mobile Menu -->
    <div id="mobileMenu" class="hidden md:hidden bg-white border-t border-[#E2E8F0]">
        <div class="px-6 py-4 space-y-3">
            <a href="#features" class="block text-[#475569] hover:text-[#0F172A] font-medium">Features</a>
            <a href="#tools" class="block text-[#475569] hover:text-[#0F172A] font-medium">Tools</a>
            <a href="#requirements" class="block text-[#475569] hover:text-[#0F172A] font-medium">Requirements</a>
            <a href="#docs" class="block text-[#475569] hover:text-[#0F172A] font-medium">Docs</a>
            <a href="{{ page.product.addons_url }}" target="_blank" rel="noopener" class="btn-primary inline-block text-center w-full text-sm py-2.5">
                Get on Addons
            </a>
        </div>
    </div>
</nav>

<!-- Hero Section -->
<section class="hero-gradient min-h-screen flex items-center pt-16">
    <div class="max-w-[1200px] mx-auto px-6 lg:px-4 py-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div class="fade-in-up">
                <!-- PrestaShop Platinum Partner Banner -->
                <div class="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-[#DF3163]/10 border border-[#DF3163]/30 rounded-full">
                    <i class="fab fa-prestashop text-[#DF3163] text-xl"></i>
                    <span class="text-[#DF3163] font-semibold">By BusinessTech & PrestaModule — PrestaShop Platinum Partner</span>
                </div>

                <div class="flex flex-wrap gap-2 mb-6">
                    <span class="badge badge-prestashop">
                        <i class="fab fa-prestashop mr-1"></i>PrestaShop 8.2+
                    </span>
                    <span class="badge badge-api">
                        <i class="fas fa-plug mr-1"></i>MCP Protocol
                    </span>
                    <span class="badge badge-integration">
                        <i class="fas fa-robot mr-1"></i>AI Ready
                    </span>
                </div>
                <h1 class="text-4xl sm:text-5xl lg:text-[2.5rem] font-bold leading-[1.3] mb-6 text-[#111827]">
                    PrestaShop Module for <span class="text-gold">AI & Commerce Analytics</span>
                </h1>
                <p class="text-lg text-[#374151] mb-8 leading-relaxed">
                    Production-ready PrestaShop module that exposes Model Context Protocol (MCP) tools to provide real-time commerce analytics to AI agents. Sales tracking, tax declarations, stock alerts and profitability metrics—all accessible in natural language.
                </p>

                <!-- Price Card -->
                <div class="inline-flex items-center gap-4 mb-8 p-4 bg-white border-2 border-[#D4AF37] rounded-xl shadow-lg">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-[#D4AF37]">€9.90</div>
                        <div class="text-sm text-[#475569]">excl. VAT / Month</div>
                    </div>
                    <div class="h-12 w-px bg-[#E2E8F0]"></div>
                    <div class="text-sm text-[#374151]">
                        <div class="flex items-center gap-2 mb-1">
                            <i class="fas fa-check text-[#059669] text-xs"></i>
                            <span>40+ MCP tools included</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fas fa-check text-[#059669] text-xs"></i>
                            <span>Updates included</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-4 mb-10">
                    <a href="{{ page.product.addons_url }}" target="_blank" rel="noopener" class="btn-primary flex items-center gap-2">
                        <i class="fab fa-prestashop"></i>
                        Get on PrestaShop Addons
                    </a>
                </div>
                <div class="flex flex-wrap items-center gap-6 text-[#475569] text-sm">
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-[#059669]"></i>
                        <span>PrestaShop 8.2+</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-[#059669]"></i>
                        <span>PHP 8.1+</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="fas fa-check-circle text-[#059669]"></i>
                        <span>Multistore Safe</span>
                    </div>
                </div>
            </div>
            <div class="relative animate-float">
                <div class="code-block p-6 shadow-xl">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-3 h-3 rounded-full bg-[#DC2626]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#059669]"></div>
                        <span class="ml-4 text-[#475569] text-sm font-mono">MCP Agent Query</span>
                    </div>
                    <div class="space-y-3 text-sm font-mono">
                        <p class="text-[#475569]"># User prompt:</p>
                        <p class="text-[#D4AF37]">"Give me a sales overview for the last 30 days"</p>
                        <p class="text-[#475569] mt-4"># AI Agent calls:</p>
                        <p class="text-[#DF3163]">sales_analytics_dashboard()</p>
                        <div class="mt-4 p-3 bg-[#1E293B] rounded-lg">
                            <p class="text-[#059669]">{</p>
                            <p class="text-white pl-4">"total_orders": <span class="text-[#F59E0B]">1,247</span>,</p>
                            <p class="text-white pl-4">"revenue": <span class="text-[#F59E0B]">€89,432.50</span>,</p>
                            <p class="text-white pl-4">"avg_cart": <span class="text-[#F59E0B]">€71.72</span></p>
                            <p class="text-[#059669]">}</p>
                        </div>
                    </div>
                </div>
                <!-- Floating badges -->
                <div class="absolute -top-4 -right-4 px-4 py-2 bg-[#059669]/10 border border-[#059669]/30 rounded-full text-[#059669] text-sm font-medium">
                    <i class="fas fa-circle text-xs mr-2 animate-pulse"></i>Real-time Data
                </div>
                <div class="absolute -bottom-4 -left-4 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium">
                    <i class="fas fa-lock mr-2"></i>Secure SQL
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Stats Section -->
<section class="py-16 bg-[#FAFAFA] border-y border-[#E2E8F0]">
    <div class="max-w-[1200px] mx-auto px-6 lg:px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="text-center">
                <div class="text-4xl font-bold text-[#D4AF37] mb-2">40+</div>
                <div class="text-[#475569]">MCP Tools</div>
            </div>
            <div class="text-center">
                <div class="text-4xl font-bold text-[#D4AF37] mb-2">7</div>
                <div class="text-[#475569]">Tool Categories</div>
            </div>
            <div class="text-center">
                <div class="text-4xl font-bold text-[#D4AF37] mb-2">GA4</div>
                <div class="text-[#475569]">Integration</div>
            </div>
            <div class="text-center">
                <div class="text-4xl font-bold text-[#D4AF37] mb-2">100%</div>
                <div class="text-[#475569]">JSON Output</div>
            </div>
        </div>
    </div>
</section>

<!-- Schema.org Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "{{ page.product.name }}",
  "description": "{{ page.description }}",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "PrestaShop 8.2+",
  "offers": {
    "@type": "Offer",
    "price": "9.90",
    "priceCurrency": "{{ page.product.currency }}",
    "availability": "{{ page.product.availability }}",
    "url": "{{ page.product.addons_url }}"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "1"
  },
  "author": {
    "@type": "Organization",
    "name": "BusinessTech & PrestaModule",
    "url": "{{ site.url }}"
  },
  "softwareRequirements": "{{ page.product.requirements | join: ', ' }}",
  "softwareVersion": "1.0",
  "image": "{{ site.url }}{{ page.image }}",
  "url": "{{ site.url }}{{ page.url }}"
}
</script>

<script>
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
</script>
