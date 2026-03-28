---
layout: default
title: "Agence PrestaShop IA — Squad d'agents spécialisés"
permalink: /agence-prestashop-ia/
ref: prestashop-ai-agency
description: "Découvrez la squad d'agents IA spécialisés PrestaShop : builder, ops, packager, traduction, sécurité, release et migration. Une équipe disponible 24h/24."
image: "/assets/images/agence-prestashop-ia/og-image.webp"
body_class: homepage-creator
---

<style>
.page-hero-section { background: linear-gradient(135deg, #0a0a12 0%, #12121f 100%) !important; }
.page-hero-section::before { background-image: radial-gradient(circle at 25% 25%, rgba(71, 117, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(71, 117, 255, 0.1) 0%, transparent 50%) !important; }
.page-hero-section .breadcrumb a { color: #9ca3af !important; }
.page-hero-section .breadcrumb span { color: white !important; background: rgba(71, 117, 255, 0.2) !important; }
.page-hero-section .hero-content h1 { background: linear-gradient(135deg, white 0%, #e2e8f0 100%) !important; -webkit-background-clip: text !important; background-clip: text !important; }
.page-hero-section .section-description { color: #9ca3af !important; }
</style>

{% capture hero_badges %}
<div class="hero-badge" style="display: inline-block; background: linear-gradient(135deg, #4775ff 0%, #2c5aa0 100%); color: white; padding: 0.5rem 1.25rem; border-radius: 50px; font-size: 0.9rem; font-weight: 600;">
    13 agents · PS 8 & 9 · 24h/24
</div>
{% endcapture %}

{% capture hero_description %}
Chaque agent est spécialisé sur un domaine précis du développement PrestaShop. Ensemble, ils couvrent l'intégralité du cycle de vie d'un module — de la spec fonctionnelle à la mise en production.
{% endcapture %}

{% include page-hero.html
    title="Une équipe d'experts disponibles 24h/24"
    description=hero_description
    modifier_class="page-hero-section--prestashop-ai page-hero-section--agence"
    section_class="fade-in is-visible"
    pre_content=hero_badges
    pre_content_class="page-hero-slot"
%}

<!-- SQUAD CORE -->
<section class="section-creator" style="padding: 3rem 0 4rem; background: #0d0d14; margin: 0;">
    <div class="container-creator">
        <div class="section-header-creator" style="text-align: center; margin-bottom: 3rem;">
            <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; color: #6b7280; margin-bottom: 0.5rem;">Squad core</p>
            <h2 class="section-title-creator" style="font-size: 1.75rem;">Conception, opérations, packaging</h2>
        </div>
        
        <div class="ecosystem-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            
            <!-- Mathieu - Builder -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <svg viewBox="0 0 100 100" width="70" height="70" style="flex-shrink: 0;">
                        <ellipse cx="50" cy="75" rx="25" ry="15" fill="#1a1a2e" stroke="#4775ff" stroke-width="2"/>
                        <circle cx="50" cy="45" r="22" fill="#1a1a2e" stroke="#4775ff" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="42" cy="42" r="3" fill="#4775ff"/>
                        <circle cx="58" cy="42" r="3" fill="#4775ff"/>
                        <path d="M42 52 Q50 58 58 52" stroke="#4775ff" stroke-width="2" fill="none"/>
                        <g transform="translate(50, 25)" opacity="0.4">
                            <circle cx="0" cy="0" r="8" stroke="#4775ff" stroke-width="2" fill="none"/>
                            <line x1="-8" y1="0" x2="8" y2="0" stroke="#4775ff" stroke-width="1.5"/>
                            <line x1="0" y1="-8" x2="0" y2="8" stroke="#4775ff" stroke-width="1.5"/>
                            <line x1="-6" y1="-6" x2="6" y2="6" stroke="#4775ff" stroke-width="1"/>
                            <line x1="6" y1="-6" x2="-6" y2="6" stroke="#4775ff" stroke-width="1"/>
                        </g>
                        <circle cx="85" cy="15" r="6" fill="#4775ff" opacity="0.3"/>
                        <circle cx="85" cy="15" r="3" fill="#4775ff"/>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: #4775ff; background: rgba(71, 117, 255, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">Builder</span>
                        <h3 style="font-size: 1.25rem; margin: 0.5rem 0 0; color: white;">Mathieu</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">Architecture module PS 8/9. Patterns Symfony, hooks CQRS, Command Bus. De la spec à l'implémentation.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">PRD</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Architecture</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Hooks</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">PHP</span>
                </div>
            </div>

            <!-- Sébastien - Ops -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <svg viewBox="0 0 100 100" width="70" height="70" style="flex-shrink: 0;">
                        <ellipse cx="50" cy="75" rx="25" ry="15" fill="#2a1515" stroke="#e85555" stroke-width="2"/>
                        <circle cx="50" cy="45" r="22" fill="#2a1515" stroke="#e85555" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="42" cy="42" r="3" fill="#e85555"/>
                        <circle cx="58" cy="42" r="3" fill="#e85555"/>
                        <path d="M42 52 Q50 58 58 52" stroke="#e85555" stroke-width="2" fill="none"/>
                        <g transform="translate(50, 30)" opacity="0.4">
                            <path d="M-8 -5 L-8 8 L8 8 L8 -5 L3 -10 L-3 -10 Z" stroke="#e85555" stroke-width="2" fill="none"/>
                            <path d="M-3 2 L0 5 L3 2" stroke="#e85555" stroke-width="2" fill="none"/>
                        </g>
                        <circle cx="85" cy="15" r="6" fill="#e85555" opacity="0.3"/>
                        <circle cx="85" cy="15" r="3" fill="#e85555"/>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: #e85555; background: rgba(232, 85, 85, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">Ops</span>
                        <h3 style="font-size: 1.25rem; margin: 0.5rem 0 0; color: white;">Sébastien</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">Sécurité OWASP, taint analysis, audit de vulnérabilités. Protection des données et conformité.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">OWASP</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Security</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">PHPUnit</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Multistore</span>
                </div>
            </div>

            <!-- Élise - Packager -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.5rem; transition: all 0.3s ease;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <svg viewBox="0 0 100 100" width="70" height="70" style="flex-shrink: 0;">
                        <ellipse cx="50" cy="75" rx="25" ry="15" fill="#1f1a0f" stroke="#f0b429" stroke-width="2"/>
                        <circle cx="50" cy="45" r="22" fill="#1f1a0f" stroke="#f0b429" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="42" cy="42" r="3" fill="#f0b429"/>
                        <circle cx="58" cy="42" r="3" fill="#f0b429"/>
                        <path d="M42 52 Q50 58 58 52" stroke="#f0b429" stroke-width="2" fill="none"/>
                        <g transform="translate(50, 25)" opacity="0.4">
                            <rect x="-10" y="-8" width="20" height="16" rx="2" stroke="#f0b429" stroke-width="2" fill="none"/>
                            <rect x="-3" y="-12" width="6" height="5" stroke="#f0b429" stroke-width="2" fill="none"/>
                        </g>
                        <circle cx="85" cy="15" r="6" fill="#f0b429" opacity="0.3"/>
                        <circle cx="85" cy="15" r="3" fill="#f0b429"/>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: #f0b429; background: rgba(240, 180, 41, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">Packager</span>
                        <h3 style="font-size: 1.25rem; margin: 0.5rem 0 0; color: white;">Élise</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">Release, CI/CD, packaging marketplace. PHP headers, PHPStan, changelog sémantique.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">CI/CD</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">PHPStan</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Pipeline</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Marketplace</span>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- SPÉCIALISTES -->
<section class="section-creator" style="padding: 3rem 0 4rem; background: #0a0a0f; margin: 0;">
    <div class="container-creator">
        <div class="section-header-creator" style="text-align: center; margin-bottom: 3rem;">
            <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; color: #6b7280; margin-bottom: 0.5rem;">Spécialistes</p>
            <h2 class="section-title-creator" style="font-size: 1.75rem;">Un expert par domaine</h2>
        </div>
        
        <div class="ecosystem-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
            
            {% assign specialists = "Julien:Release Manager:Étiquette losange:semver · Git tag · Release notes · Marketplace zip:Camille:Traducteur:Bulles dialogue:PHP MD5 legacy · XLIFF · Wording BO:Raphaël:API Webservice:Prise électrique:REST Webservice · Admin API PS9 · OAuth2:Inès:UX/UI Back-office:Moniteur:UX back-office · WCAG 2.1 AA · Composants BO:Thomas:Migration Upgrade:Flèche montants:PS 1.7→8→9 · Scripts migration · Rollback:Antoine:Compat Advisor:Doubles flèches:Tactician→Messenger · Command Bus PS8/9 · Adapters:Léa:Data Migration:Cylindre BDD:CSV · Imports · Upgrade scripts · Rollback" | split: ":" %}
            
            <!-- Julien - Release Manager -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <svg viewBox="0 0 100 100" width="55" height="55">
                        <ellipse cx="50" cy="75" rx="22" ry="13" fill="#0f1f1a" stroke="#34d399" stroke-width="2"/>
                        <circle cx="50" cy="45" r="20" fill="#0f1f1a" stroke="#34d399" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="43" cy="42" r="2.5" fill="#34d399"/>
                        <circle cx="57" cy="42" r="2.5" fill="#34d399"/>
                        <path d="M43 51 Q50 56 57 51" stroke="#34d399" stroke-width="1.5" fill="none"/>
                        <g transform="translate(50, 28)" opacity="0.4">
                            <rect x="-6" y="-4" width="12" height="10" transform="rotate(45)" stroke="#34d399" stroke-width="1.5" fill="none"/>
                            <circle cx="0" cy="0" r="2" fill="#34d399"/>
                        </g>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; color: #34d399; background: rgba(52, 211, 153, 0.1); padding: 0.15rem 0.4rem; border-radius: 3px;">Release</span>
                        <h3 style="font-size: 1.1rem; margin: 0.3rem 0 0; color: white;">Julien</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.8rem; line-height: 1.4; margin-bottom: 0.75rem;">Semver, Git tags, release notes, packaging marketplace.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Semver</span>
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Git</span>
                </div>
            </div>

            <!-- Camille - Traducteur -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <svg viewBox="0 0 100 100" width="55" height="55">
                        <ellipse cx="50" cy="75" rx="22" ry="13" fill="#0f1f1a" stroke="#34d399" stroke-width="2"/>
                        <circle cx="50" cy="45" r="20" fill="#0f1f1a" stroke="#34d399" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="43" cy="42" r="2.5" fill="#34d399"/>
                        <circle cx="57" cy="42" r="2.5" fill="#34d399"/>
                        <path d="M43 51 Q50 56 57 51" stroke="#34d399" stroke-width="1.5" fill="none"/>
                        <g transform="translate(50, 25)" opacity="0.4">
                            <rect x="-8" y="-5" width="10" height="7" rx="1" stroke="#34d399" stroke-width="1.5" fill="none"/>
                            <rect x="-8" y="2" width="10" height="7" rx="1" stroke="#34d399" stroke-width="1.5" fill="none"/>
                        </g>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; color: #34d399; background: rgba(52, 211, 153, 0.1); padding: 0.15rem 0.4rem; border-radius: 3px;">Traducteur</span>
                        <h3 style="font-size: 1.1rem; margin: 0.3rem 0 0; color: white;">Camille</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.8rem; line-height: 1.4; margin-bottom: 0.75rem;">PHP MD5 legacy, XLIFF, wording back-office.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">MD5</span>
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">XLIFF</span>
                </div>
            </div>

            <!-- Raphaël - API -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <svg viewBox="0 0 100 100" width="55" height="55">
                        <ellipse cx="50" cy="75" rx="22" ry="13" fill="#0f1f1a" stroke="#34d399" stroke-width="2"/>
                        <circle cx="50" cy="45" r="20" fill="#0f1f1a" stroke="#34d399" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="43" cy="42" r="2.5" fill="#34d399"/>
                        <circle cx="57" cy="42" r="2.5" fill="#34d399"/>
                        <path d="M43 51 Q50 56 57 51" stroke="#34d399" stroke-width="1.5" fill="none"/>
                        <g transform="translate(50, 28)" opacity="0.4">
                            <rect x="-7" y="-5" width="14" height="10" rx="1" stroke="#34d399" stroke-width="1.5" fill="none"/>
                            <line x1="-3" y1="-2" x2="-3" y2="2" stroke="#34d399" stroke-width="1.5"/>
                            <line x1="0" y1="-2" x2="0" y2="2" stroke="#34d399" stroke-width="1.5"/>
                            <line x1="3" y1="-2" x2="3" y2="2" stroke="#34d399" stroke-width="1.5"/>
                        </g>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; color: #34d399; background: rgba(52, 211, 153, 0.1); padding: 0.15rem 0.4rem; border-radius: 3px;">API</span>
                        <h3 style="font-size: 1.1rem; margin: 0.3rem 0 0; color: white;">Raphaël</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.8rem; line-height: 1.4; margin-bottom: 0.75rem;">REST Webservice, Admin API PS9, OAuth2.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">REST</span>
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">OAuth2</span>
                </div>
            </div>

            <!-- Inès - UX -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <svg viewBox="0 0 100 100" width="55" height="55">
                        <ellipse cx="50" cy="75" rx="22" ry="13" fill="#0f1f1a" stroke="#34d399" stroke-width="2"/>
                        <circle cx="50" cy="45" r="20" fill="#0f1f1a" stroke="#34d399" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="43" cy="42" r="2.5" fill="#34d399"/>
                        <circle cx="57" cy="42" r="2.5" fill="#34d399"/>
                        <path d="M43 51 Q50 56 57 51" stroke="#34d399" stroke-width="1.5" fill="none"/>
                        <g transform="translate(50, 25)" opacity="0.4">
                            <rect x="-8" y="-6" width="16" height="11" rx="1" stroke="#34d399" stroke-width="1.5" fill="none"/>
                            <line x1="-4" y1="0" x2="2" y2="0" stroke="#34d399" stroke-width="1.5"/>
                            <circle cx="5" cy="0" r="1.5" fill="#34d399"/>
                        </g>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; color: #34d399; background: rgba(52, 211, 153, 0.1); padding: 0.15rem 0.4rem; border-radius: 3px;">UX</span>
                        <h3 style="font-size: 1.1rem; margin: 0.3rem 0 0; color: white;">Inès</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.8rem; line-height: 1.4; margin-bottom: 0.75rem;">UX back-office, WCAG 2.1 AA, composants PrestaShop.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">WCAG</span>
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">BO</span>
                </div>
            </div>

            <!-- Thomas - Migration -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <svg viewBox="0 0 100 100" width="55" height="55">
                        <ellipse cx="50" cy="75" rx="22" ry="13" fill="#0f1f1a" stroke="#34d399" stroke-width="2"/>
                        <circle cx="50" cy="45" r="20" fill="#0f1f1a" stroke="#34d399" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="43" cy="42" r="2.5" fill="#34d399"/>
                        <circle cx="57" cy="42" r="2.5" fill="#34d399"/>
                        <path d="M43 51 Q50 56 57 51" stroke="#34d399" stroke-width="1.5" fill="none"/>
                        <g transform="translate(50, 28)" opacity="0.4">
                            <path d="M-3 -6 L0 -10 L3 -6" stroke="#34d399" stroke-width="1.5" fill="none"/>
                            <line x1="-5" y1="0" x2="5" y2="0" stroke="#34d399" stroke-width="1.5"/>
                        </g>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; color: #34d399; background: rgba(52, 211, 153, 0.1); padding: 0.15rem 0.4rem; border-radius: 3px;">Migration</span>
                        <h3 style="font-size: 1.1rem; margin: 0.3rem 0 0; color: white;">Thomas</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.8rem; line-height: 1.4; margin-bottom: 0.75rem;">PS 1.7→8→9, scripts migration, rollback.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Upgrade</span>
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Rollback</span>
                </div>
            </div>

            <!-- Antoine - Compat -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <svg viewBox="0 0 100 100" width="55" height="55">
                        <ellipse cx="50" cy="75" rx="22" ry="13" fill="#0f1f1a" stroke="#34d399" stroke-width="2"/>
                        <circle cx="50" cy="45" r="20" fill="#0f1f1a" stroke="#34d399" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="43" cy="42" r="2.5" fill="#34d399"/>
                        <circle cx="57" cy="42" r="2.5" fill="#34d399"/>
                        <path d="M43 51 Q50 56 57 51" stroke="#34d399" stroke-width="1.5" fill="none"/>
                        <g transform="translate(50, 28)" opacity="0.4">
                            <path d="M-8 0 L-5 -4 L-5 4 Z" stroke="#34d399" stroke-width="1.5" fill="none"/>
                            <path d="M8 0 L5 -4 L5 4 Z" stroke="#34d399" stroke-width="1.5" fill="none"/>
                            <line x1="-3" y1="0" x2="3" y2="0" stroke="#34d399" stroke-width="1" stroke-dasharray="2 1"/>
                        </g>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; color: #34d399; background: rgba(52, 211, 153, 0.1); padding: 0.15rem 0.4rem; border-radius: 3px;">Compat</span>
                        <h3 style="font-size: 1.1rem; margin: 0.3rem 0 0; color: white;">Antoine</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.8rem; line-height: 1.4; margin-bottom: 0.75rem;">Tactician→Messenger, Command Bus PS8/9.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Adapters</span>
                </div>
            </div>

            <!-- Léa - Data -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.25rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <svg viewBox="0 0 100 100" width="55" height="55">
                        <ellipse cx="50" cy="75" rx="22" ry="13" fill="#0f1f1a" stroke="#34d399" stroke-width="2"/>
                        <circle cx="50" cy="45" r="20" fill="#0f1f1a" stroke="#34d399" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="43" cy="42" r="2.5" fill="#34d399"/>
                        <circle cx="57" cy="42" r="2.5" fill="#34d399"/>
                        <path d="M43 51 Q50 56 57 51" stroke="#34d399" stroke-width="1.5" fill="none"/>
                        <g transform="translate(50, 25)" opacity="0.4">
                            <ellipse cx="0" cy="-5" rx="5" ry="2" stroke="#34d399" stroke-width="1.5" fill="none"/>
                            <ellipse cx="0" cy="0" rx="5" ry="2" stroke="#34d399" stroke-width="1.5" fill="none"/>
                            <ellipse cx="0" cy="5" rx="5" ry="2" stroke="#34d399" stroke-width="1.5" fill="none"/>
                            <line x1="0" y1="-8" x2="0" y2="8" stroke="#34d399" stroke-width="1"/>
                        </g>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; color: #34d399; background: rgba(52, 211, 153, 0.1); padding: 0.15rem 0.4rem; border-radius: 3px;">Data</span>
                        <h3 style="font-size: 1.1rem; margin: 0.3rem 0 0; color: white;">Léa</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.8rem; line-height: 1.4; margin-bottom: 0.75rem;">CSV, imports, upgrade scripts.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
                    <span style="font-size: 0.6rem; padding: 0.2rem 0.4rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Migration</span>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- INFRASTRUCTURE / SYSTÈME -->
<section class="section-creator" style="padding: 3rem 0 4rem; background: #0d0d14; margin: 0;">
    <div class="container-creator">
        <div class="section-header-creator" style="text-align: center; margin-bottom: 3rem;">
            <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; color: #6b7280; margin-bottom: 0.5rem;">Infrastructure</p>
            <h2 class="section-title-creator" style="font-size: 1.75rem;">Qualité, mémoire, supervision</h2>
        </div>
        
        <div class="ecosystem-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            
            <!-- Victor - Debugger -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <svg viewBox="0 0 100 100" width="70" height="70" style="flex-shrink: 0;">
                        <ellipse cx="50" cy="65" rx="20" ry="25" fill="#1a152a" stroke="#a78bfa" stroke-width="2"/>
                        <circle cx="50" cy="35" r="18" fill="#1a152a" stroke="#a78bfa" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="44" cy="32" r="3" fill="#a78bfa"/>
                        <circle cx="56" cy="32" r="3" fill="#a78bfa"/>
                        <path d="M45 40 Q50 44 55 40" stroke="#a78bfa" stroke-width="1.5" fill="none"/>
                        <line x1="30" y1="30" x2="20" y2="20" stroke="#a78bfa" stroke-width="1.5"/>
                        <line x1="30" y1="40" x2="18" y2="45" stroke="#a78bfa" stroke-width="1.5"/>
                        <line x1="70" y1="30" x2="80" y2="20" stroke="#a78bfa" stroke-width="1.5"/>
                        <line x1="70" y1="40" x2="82" y2="45" stroke="#a78bfa" stroke-width="1.5"/>
                        <circle cx="85" cy="15" r="6" fill="#a78bfa" opacity="0.3"/>
                        <circle cx="85" cy="15" r="3" fill="#a78bfa"/>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: #a78bfa; background: rgba(167, 139, 250, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">Debugger</span>
                        <h3 style="font-size: 1.25rem; margin: 0.5rem 0 0; color: white;">Victor</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">ReAct loop, root cause analysis, fix plan. Diagnostic rapide des problèmes complexes.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">ReAct</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Debug</span>
                </div>
            </div>

            <!-- Sophie - QA -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <svg viewBox="0 0 100 100" width="70" height="70" style="flex-shrink: 0;">
                        <ellipse cx="50" cy="75" rx="25" ry="15" fill="#1a152a" stroke="#a78bfa" stroke-width="2"/>
                        <circle cx="50" cy="45" r="22" fill="#1a152a" stroke="#a78bfa" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="42" cy="42" r="3" fill="#a78bfa"/>
                        <circle cx="58" cy="42" r="3" fill="#a78bfa"/>
                        <path d="M42 52 Q50 58 58 52" stroke="#a78bfa" stroke-width="2" fill="none"/>
                        <g transform="translate(50, 22)" opacity="0.4">
                            <rect x="-8" y="-10" width="16" height="20" rx="1" stroke="#a78bfa" stroke-width="2" fill="none"/>
                            <line x1="-4" y1="-4" x2="4" y2="-4" stroke="#a78bfa" stroke-width="1.5"/>
                            <line x1="-4" y1="2" x2="4" y2="2" stroke="#a78bfa" stroke-width="1.5"/>
                            <path d="M-2 6 L0 8 L2 6" stroke="#a78bfa" stroke-width="1.5" fill="none"/>
                        </g>
                        <circle cx="85" cy="15" r="6" fill="#a78bfa" opacity="0.3"/>
                        <circle cx="85" cy="15" r="3" fill="#a78bfa"/>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: #a78bfa; background: rgba(167, 139, 250, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">QA Gate</span>
                        <h3 style="font-size: 1.25rem; margin: 0.5rem 0 0; color: white;">Sophie</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">Checklist QA, détection régression, severity matrix. Validation avant mise en production.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Checklist</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Regression</span>
                </div>
            </div>

            <!-- Ariane - Mémoire -->
            <div class="ecosystem-card" style="background: #0f0f14; border: 1px solid #1f1f2e; border-radius: 12px; padding: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <svg viewBox="0 0 100 100" width="70" height="70" style="flex-shrink: 0;">
                        <ellipse cx="50" cy="75" rx="25" ry="15" fill="#1a152a" stroke="#a78bfa" stroke-width="2"/>
                        <circle cx="50" cy="45" r="22" fill="#1a152a" stroke="#a78bfa" stroke-width="2" stroke-dasharray="4 3"/>
                        <circle cx="42" cy="42" r="3" fill="#a78bfa"/>
                        <circle cx="58" cy="42" r="3" fill="#a78bfa"/>
                        <path d="M42 52 Q50 58 58 52" stroke="#a78bfa" stroke-width="2" fill="none"/>
                        <g transform="translate(50, 28)" opacity="0.4">
                            <circle cx="-8" cy="0" r="4" stroke="#a78bfa" stroke-width="1.5" fill="none"/>
                            <circle cx="8" cy="0" r="4" stroke="#a78bfa" stroke-width="1.5" fill="none"/>
                            <circle cx="0" cy="-8" r="4" stroke="#a78bfa" stroke-width="1.5" fill="none"/>
                            <line x1="-4" y1="0" x2="-4" y2="-4" stroke="#a78bfa" stroke-width="1"/>
                            <line x1="4" y1="0" x2="4" y2="-4" stroke="#a78bfa" stroke-width="1"/>
                            <line x1="-6" y1="-2" x2="-2" y2="-6" stroke="#a78bfa" stroke-width="1"/>
                            <line x1="6" y1="-2" x2="2" y2="-6" stroke="#a78bfa" stroke-width="1"/>
                        </g>
                        <circle cx="85" cy="15" r="6" fill="#a78bfa" opacity="0.3"/>
                        <circle cx="85" cy="15" r="3" fill="#a78bfa"/>
                    </svg>
                    <div>
                        <span style="font-family: monospace; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: #a78bfa; background: rgba(167, 139, 250, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">Mémoire</span>
                        <h3 style="font-size: 1.25rem; margin: 0.5rem 0 0; color: white;">Ariane</h3>
                    </div>
                </div>
                <p style="color: #9ca3af; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">READ, WRITE, LEARN. Décisions architecturales, patterns validés, contexte persistant.</p>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Contexte</span>
                    <span style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: #1f1f2e; color: #9ca3af; border-radius: 20px;">Patterns</span>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- CTA SECTION -->
<section class="section-creator" style="padding: 4rem 0; background: linear-gradient(135deg, #0f0f14 0%, #1a1a2e 100%); margin: 0;">
    <div class="container-creator">
        <div style="text-align: center; max-width: 600px; margin: 0 auto;">
            <h2 class="section-title-creator" style="font-size: 1.75rem; margin-bottom: 1rem;">Prêt à faire travailler la squad ?</h2>
            <p style="color: #9ca3af; font-size: 1rem; line-height: 1.6; margin-bottom: 2rem;">
                Réservez une session exploratoire gratuite pour évaluer comment cette orchestration peut s'appliquer à votre contexte PrestaShop.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="https://calendly.com/ndabene2807/mcp-tools-plus" class="btn-hero btn-hero-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #4775ff; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
                    <i class="fas fa-calendar-check"></i>
                    Réserver une session gratuite
                </a>
                <a href="/blog/2026/03/28/agents-ia-developpement-modules-prestashop/" class="btn-hero btn-hero-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border: 1px solid #4775ff; color: #4775ff; text-decoration: none; border-radius: 8px; font-weight: 600;">
                    <i class="fas fa-book-open"></i>
                    Lire l'article
                </a>
            </div>
        </div>
    </div>
</section>

<!-- SCHEMA.ORG JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Agence PrestaShop IA — Nicolas Dabène",
  "url": "https://nicolas-dabene.fr/agence-prestashop-ia/",
  "description": "Squad d'agents IA spécialisés PrestaShop couvrant le cycle de vie complet des modules : conception, sécurité, packaging, release, migration.",
  "provider": {
    "@type": "Person",
    "name": "Nicolas Dabène",
    "url": "https://nicolas-dabene.fr",
    "jobTitle": "AI Orchestrator & PrestaShop Expert"
  },
  "areaServed": "FR",
  "serviceType": "Développement modules PrestaShop avec agents IA"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce qu'une agence PrestaShop IA ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une agence PrestaShop IA est une organisation qui utilise des agents IA spécialisés pour développer, auditer et maintenir des modules PrestaShop. Chaque agent couvre un domaine précis : architecture, sécurité, packaging, traduction, migration. Ils travaillent en parallèle ou en séquence selon la complexité de la tâche."
      }
    },
    {
      "@type": "Question",
      "name": "Quels agents IA composent la squad PrestaShop de Nicolas Dabène ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La squad comprend 13 agents : Mathieu (builder, architecture PS 8/9), Sébastien (sécurité OWASP), Élise (packaging et CI/CD), Julien (release manager), Camille (traductions MD5/XLIFF), Raphaël (API REST et Admin API), Inès (UX back-office WCAG 2.1), Thomas (migration 1.7→8→9), Antoine (compatibilité Command Bus), Léa (data migration), Victor (debugger ReAct), Sophie (QA gate), Ariane (mémoire de contexte)."
      }
    },
    {
      "@type": "Question",
      "name": "Les agents IA remplacent-ils le développeur PrestaShop ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Les agents IA spécialisés délèguent le travail répétitif et contextuel (sécurité, packaging, traduction, release), mais le jugement sur les choix d'architecture, la dette technique et les priorités business reste humain. Nicolas Dabène orchestre la squad et valide les décisions clés."
      }
    },
    {
      "@type": "Question",
      "name": "Quelle est la différence entre ces agents et GitHub Copilot ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GitHub Copilot complète du code générique. Les agents spécialisés PrestaShop connaissent les patterns spécifiques à la plateforme, les incompatibilités entre PS 8 et PS 9, les règles de sécurité, les contraintes de packaging marketplace et les conventions de traduction MD5. Ils agissent en autonomie sur une tâche complète, pas ligne par ligne."
      }
    }
  ]
}
</script>

<!-- LLM Optimization -->
<!--
llm:page-type: team-page
llm:entity: Nicolas Dabène — PrestaShop AI Agency
llm:summary: Squad of 13 specialized AI agents for PrestaShop module development. Agents cover: architecture (Mathieu), security OWASP (Sébastien), packaging CI/CD (Élise), semantic release (Julien), MD5/XLIFF translation (Camille), REST API (Raphaël), back-office UX WCAG 2.1 (Inès), version migration 1.7→9 (Thomas), Command Bus compatibility (Antoine), data migration (Léa), ReAct debugger (Victor), QA gate (Sophie), context memory (Ariane). All agents specialize in PrestaShop 8 and 9. Orchestrated by Nicolas Dabène, AI Orchestrator, Antibes, France.
llm:keywords: prestashop ai agents, module development squad, prestashop 9, ai orchestration, nicolas dabene
-->
