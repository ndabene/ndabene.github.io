---
layout: page
title: Me Contacter
description: "Contactez Nicolas Dabène pour vos projets, collaborations ou consultations
  techniques."
keywords: "contact développeur php, expert prestashop, consultant ai orchestrator,
  consultation technique, développeur freelance"
permalink: /contact/
llm_summary: Contactez Nicolas Dabène pour vos projets, collaborations ou 
  consultations techniques.
llm_topics:
- contact développeur php
- expert prestashop
- consultant ai orchestrator
- consultation technique
- développeur freelance
---
<section class="contact-section">
    <div class="container">
        <h1>{{ page.title }}</h1>
        <p class="section-description">Que vous ayez un projet en tête, un défi technique à discuter, ou simplement envie d'échanger, j'aimerais avoir de vos nouvelles. Remplissez le formulaire ci-dessous ou contactez-moi directement.</p>
        <p class="section-note" aria-live="polite" style="margin:0.5rem 0 1.25rem; color:#555;">Délai de réponse : sous 24h ouvrées.</p>

        <div class="contact-form-wrapper">
            <div class="contact-columns">
                <div class="contact-services">
                    <div class="service-card">
                        <h3>Mission freelance</h3>
                        <p>Projets de développement, intégration, optimisation</p>
                    </div>
                    <div class="service-card">
                        <h3>Formation</h3>
                        <p>Sessions de formation IA, PrestaShop, PHP avancé</p>
                    </div>
                    <div class="service-card">
                        <h3>Conseil</h3>
                        <p>Audit technique, architecture, stratégie</p>
                    </div>
                </div>
                <div class="contact-form-container card">
                <form action="https://formspree.io/f/meozazzl" method="POST" class="contact-form">
                    <div class="form-group">
                        <label for="name">Nom :</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email :</label>
                        <input type="email" id="email" name="_replyto" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-type">Type de demande :</label>
                        <select id="contact-type" name="contact_type" required>
                            <option value="" disabled selected>Choisir...</option>
                            <option>Mission freelance</option>
                            <option>Formation</option>
                            <option>Conseil</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="subject">Sujet :</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message :</label>
                        <textarea id="message" name="message" rows="6" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="availability">Disponibilités souhaitées :</label>
                        <input type="text" id="availability" name="availability" placeholder="Ex: Sous 24h, semaine prochaine, dates…">
                    </div>
                    
                    <!-- Anti-spam honeypot field (hidden) -->
                    <input type="text" name="_gotcha" style="display:none;">
                    
                    <!-- Formspree settings -->
                    <input type="hidden" name="_next" value="https://nicolas-dabene.fr/contact?sent=true">
                    <input type="hidden" name="_subject" value="Nouveau message depuis nicolas-dabene.fr">
                    
                    <button type="submit" class="btn btn--primary">Envoyer le message</button>
                </form>
                <div id="form-messages" style="display:none;" class="form-messages"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="{{ '/assets/js/contact-form.js' | relative_url }}"></script>

<style>
/* Styling for contact form */
.contact-form-wrapper {
    width: 100%;
}

.contact-columns {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
}

.contact-services {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.service-card {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #0f172a;
}

.service-card h3 {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    color: #0f172a;
}

.service-card p {
    color: #475569;
    font-size: 0.95rem;
    margin: 0;
}

.contact-form-container {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
}

.form-messages {
    margin-top: 1rem;
}

.alert {
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.alert--success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.alert--error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.form-group input.error,
.form-group textarea.error {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.btn.loading {
    opacity: 0.7;
    cursor: not-allowed;
}

.btn.loading:hover {
    transform: none;
}

/* Highlight effects */
.service-card.active {
    border-left: 4px solid #0f172a;
    background-color: #f8fafc;
}

.highlight-selection {
    border-color: #0f172a !important;
    box-shadow: 0 0 0 0.2rem rgba(15, 23, 42, 0.25) !important;
    background-color: #f8fafc !important;
}

/* Responsive adjustments */
@media (max-width: 992px) {
    .contact-columns {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .contact-services {
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    .service-card {
        width: calc(33.33% - 1rem);
        flex: 1 1 calc(33.33% - 1rem);
    }
}

@media (max-width: 768px) {
    .contact-services {
        flex-direction: column;
    }
    
    .service-card {
        width: 100%;
    }
}
</style>