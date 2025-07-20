// Navigation JavaScript - REFACTORED

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    // Ensure elements exist before adding listeners
    if (mobileMenuToggle && mainNav) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function() {
            const isOpen = mainNav.classList.contains('open');
            
            // Toggle classes
            mainNav.classList.toggle('open');
            mobileMenuToggle.classList.toggle('open');
            
            // Update ARIA attributes
            const newState = !isOpen;
            mobileMenuToggle.setAttribute('aria-expanded', newState.toString());
            
            // Update button text for screen readers
            mobileMenuToggle.setAttribute('aria-label', 
                newState ? 'Close mobile menu' : 'Open mobile menu'
            );
        });

        // Close menu when clicking navigation links (for mobile)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768 && mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    mobileMenuToggle.classList.remove('open');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenuToggle.setAttribute('aria-label', 'Open mobile menu');
                }
            });
        });

        // Close menu when clicking outside (mobile)
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                mobileMenuToggle.classList.remove('open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'Open mobile menu');
            }
        });

        // Close menu on window resize (when going from mobile to desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                mobileMenuToggle.classList.remove('open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.setAttribute('aria-label', 'Open mobile menu');
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without triggering page reload
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // Active navigation highlighting based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav-list a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        
        // Remove active class from all links first
        link.classList.remove('active');
        
        // Add active class if paths match
        if (linkPath === currentPath || 
            (currentPath === '/' && linkPath === '/') ||
            (currentPath !== '/' && linkPath !== '/' && currentPath.startsWith(linkPath))) {
            link.classList.add('active');
        }
    });

    // Keyboard navigation accessibility
    const focusableElements = mainNav ? mainNav.querySelectorAll('a, button') : [];
    
    focusableElements.forEach((element, index) => {
        element.addEventListener('keydown', function(e) {
            let nextIndex;
            
            switch(e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                    e.preventDefault();
                    nextIndex = (index + 1) % focusableElements.length;
                    focusableElements[nextIndex].focus();
                    break;
                    
                case 'ArrowUp':
                case 'ArrowLeft':
                    e.preventDefault();
                    nextIndex = (index - 1 + focusableElements.length) % focusableElements.length;
                    focusableElements[nextIndex].focus();
                    break;
                    
                case 'Escape':
                    if (mainNav.classList.contains('open')) {
                        e.preventDefault();
                        mainNav.classList.remove('open');
                        mobileMenuToggle.classList.remove('open');
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                        mobileMenuToggle.focus();
                    }
                    break;
                    
                case 'Enter':
                case ' ':
                    if (element === mobileMenuToggle) {
                        e.preventDefault();
                        mobileMenuToggle.click();
                    }
                    break;
            }
        });
    });

    // Initialize ARIA attributes
    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-controls', 'main-nav');
        mobileMenuToggle.setAttribute('aria-label', 'Open mobile menu');
    }
    
    if (mainNav) {
        mainNav.setAttribute('aria-hidden', 'false');
    }

    console.log('Navigation JavaScript initialized successfully');
});

// Navigation mobile functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function() {
            const isOpen = mobileNav.style.display === 'block';
            
            if (isOpen) {
                // Close mobile nav
                mobileNav.style.display = 'none';
                mobileToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            } else {
                // Open mobile nav
                mobileNav.style.display = 'block';
                mobileToggle.setAttribute('aria-expanded', 'true');
                body.style.overflow = 'hidden';
            }
        });

        // Close mobile nav when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.style.display = 'none';
                mobileToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileNav.contains(event.target) && !mobileToggle.contains(event.target)) {
                mobileNav.style.display = 'none';
                mobileToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    }

    // Active navigation highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.header-nav a, .mobile-nav a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
            link.classList.add('active');
        }
    });
});