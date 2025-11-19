---
layout: page
title: Contact Me
description: "Contact Nicolas Dabène for your projects, collaborations or technical
  consultations."
keywords: "contact php developer, prestashop expert, ai orchestrator consultant,
  technical consultation, freelance developer"
permalink: /en/contact/
lang: en
llm_summary: Contact Nicolas Dabène for your projects, collaborations or
  technical consultations.
llm_topics:
- contact php developer
- prestashop expert
- ai orchestrator consultant
- technical consultation
- freelance developer
---
<section class="contact-section">
    <div class="container">
        <h1>{{ page.title }}</h1>
        <p class="section-description">Whether you have a project in mind, a technical challenge to discuss, or simply want to connect, I'd love to hear from you. Fill out the form below or contact me directly.</p>
        <p class="section-note" aria-live="polite" style="margin:0.5rem 0 1.25rem; color:#555;">Response time: within 24 business hours.</p>

        <div class="contact-form-wrapper">
            <div class="contact-columns">
                <div class="contact-services">
                    <div class="service-card">
                        <h3>Freelance Project</h3>
                        <p>Development, integration, optimization projects</p>
                    </div>
                    <div class="service-card">
                        <h3>Training</h3>
                        <p>AI, PrestaShop, advanced PHP training sessions</p>
                    </div>
                    <div class="service-card">
                        <h3>Consulting</h3>
                        <p>Technical audit, architecture, strategy</p>
                    </div>
                </div>
                <div class="contact-form-container card">
                <form action="https://formspree.io/f/meozazzl" method="POST" class="contact-form">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="_replyto" required>
                    </div>
                    <div class="form-group">
                        <label for="contact-type">Request type:</label>
                        <select id="contact-type" name="contact_type" required>
                            <option value="" disabled selected>Choose...</option>
                            <option>Freelance Project</option>
                            <option>Training</option>
                            <option>Consulting</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject:</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message:</label>
                        <textarea id="message" name="message" rows="6" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="availability">Desired availability:</label>
                        <input type="text" id="availability" name="availability" placeholder="E.g.: Within 24h, next week, dates...">
                    </div>

                    <!-- Anti-spam honeypot field (hidden) -->
                    <input type="text" name="_gotcha" style="display:none;">

                    <!-- Formspree settings -->
                    <input type="hidden" name="_next" value="https://nicolas-dabene.fr/en/contact?sent=true">
                    <input type="hidden" name="_subject" value="New message from nicolas-dabene.fr">

                    <button type="submit" class="btn btn--primary">Send message</button>
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

/* Select improvements */
.form-group select {
    font-weight: 500;
}

.form-group select:not([value=""]):not(:invalid) {
    color: #0f172a;
    font-weight: 600;
}

.form-group select option:first-child {
    color: #94a3b8;
    font-style: italic;
}

.form-group select option:not(:first-child) {
    color: #0f172a;
    font-weight: 500;
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
