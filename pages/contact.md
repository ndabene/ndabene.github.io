---
layout: page
title: Me Contacter
description: "Contactez Nicolas Dabène pour vos projets, collaborations ou consultations techniques."
keywords: "contact développeur php, expert prestashop, consultant ai orchestrator, consultation technique, développeur freelance"
permalink: /contact/
---

<section class="contact-section">
    <div class="container">
        <h1>{{ page.title }}</h1>
        <p class="section-description">Que vous ayez un projet en tête, un défi technique à discuter, ou simplement envie d'échanger, j'aimerais avoir de vos nouvelles. Remplissez le formulaire ci-dessous ou contactez-moi directement.</p>

        <div class="contact-form-wrapper">
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
                        <label for="subject">Sujet :</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message :</label>
                        <textarea id="message" name="message" rows="6" required></textarea>
                    </div>
                    
                    <!-- Anti-spam honeypot field (hidden) -->
                    <input type="text" name="_gotcha" style="display:none;">
                    
                    <!-- Formspree settings -->
                    <input type="hidden" name="_next" value="https://ndabene.github.io/contact?sent=true">
                    <input type="hidden" name="_subject" value="Nouveau message depuis ndabene.github.io">
                    
                    <button type="submit" class="btn btn--primary">Envoyer le message</button>
                </form>
                <div id="form-messages" style="display:none;" class="form-messages"></div>
            </div>
        </div>
    </div>
</section>

<script src="{{ '/assets/js/contact-form.js' | relative_url }}"></script>

<style>
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
</style>