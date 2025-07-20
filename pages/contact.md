---
layout: page
title: Contact Me
description: "Get in touch with Nicolas Dabène for inquiries, collaborations, or technical consultations."
keywords: "contact php developer, hire prestashop expert, ai orchestrator consultant, technical consultation, freelance developer"
---

<section class="contact-section">
    <div class="container">
        <h1>{{ page.title }}</h1>
        <p class="section-description">Whether you have a project in mind, a technical challenge to discuss, or just want to connect, I'd love to hear from you. Please fill out the form below or reach out directly.</p>

        <div class="contact-grid">
            <div class="contact-form-container card">
                <form action="https://formspree.io/f/yourformid" method="POST" class="contact-form">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="_replyto" required>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject:</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message:</label>
                        <textarea id="message" name="message" rows="6" required></textarea>
                    </div>
                    <button type="submit" class="btn btn--primary">Send Message</button>
                </form>
                <p class="form-note">*Please replace `yourformid` in the form action with your actual Formspree form ID.</p>
            </div>

            <div class="contact-info-container card">
                <h3>Direct Contact</h3>
                <p>Feel free to reach out through the following channels:</p>
                <ul>
                    <li><strong>Email:</strong> <a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a></li>
                    <li><strong>LinkedIn:</strong> <a href="{{ site.linkedin_url }}" target="_blank" rel="noopener noreferrer">{{ site.linkedin_username }}</a></li>
                    <li><strong>GitHub:</strong> <a href="{{ site.github_url }}" target="_blank" rel="noopener noreferrer">{{ site.github_username }}</a></li>
                </ul>

                <h3>Availability</h3>
                <p>I typically respond to inquiries within 24-48 hours during business days. For urgent matters, please indicate so in your message subject.</p>
            </div>
        </div>
    </div>
</section>