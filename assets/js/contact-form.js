/**
 * Contact Form Handler with Formspree Integration
 * Handles form validation, submission, and user feedback
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const messagesDiv = document.getElementById('form-messages');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('sent') === 'true') {
        showMessage('success', 'Merci ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.');
        // Remove the parameter from URL without refreshing
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        // Submit form via AJAX to avoid redirect
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showMessage('success', 'Merci ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.');
                form.reset();
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        })
        .catch(error => {
            showMessage('error', 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou m\'envoyer un email directement.');
            console.error('Form submission error:', error);
        })
        .finally(() => {
            setLoadingState(false);
        });
    });
    
    // Form validation
    function validateForm() {
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const contactType = form.querySelector('#contact-type') ? form.querySelector('#contact-type').value.trim() : '';
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        // Basic validation
        if (!name || !email || !subject || !message || (form.querySelector('#contact-type') && !contactType)) {
            showMessage('error', 'Veuillez remplir tous les champs obligatoires.');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('error', 'Veuillez saisir une adresse email valide.');
            return false;
        }
        
        // Message length validation
        if (message.length < 10) {
            showMessage('error', 'Votre message doit contenir au moins 10 caractères.');
            return false;
        }
        
        return true;
    }
    
    // Show messages to user
    function showMessage(type, text) {
        messagesDiv.innerHTML = `<div class="alert alert--${type}">${text}</div>`;
        messagesDiv.style.display = 'block';
        messagesDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messagesDiv.style.display = 'none';
            }, 5000);
        }
    }
    
    // Loading state management
    function setLoadingState(loading) {
        if (loading) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Envoi en cours...</span>';
            submitButton.classList.add('loading');
        } else {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Envoyer le message';
            submitButton.classList.remove('loading');
        }
    }
    
    // Real-time validation feedback
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling when user starts typing
            this.classList.remove('error');
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        
        if (!value) {
            field.classList.add('error');
            return false;
        }
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('error');
                return false;
            }
        }
        
        field.classList.remove('error');
        return true;
    }
});