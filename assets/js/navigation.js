// Navigation JavaScript - Optimized
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
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Skip empty anchors
            
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
    
    // Add scroll event listener for header shadow
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header-executive');
        if (header) {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
});