document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-fill');

    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const level = bar.style.width;
            bar.style.width = '0%'; // Reset width for animation
            setTimeout(() => {
                bar.style.width = level;
            }, 100);
        });
    };

    // Trigger animation when the skills section is in view
    const skillsSection = document.querySelector('.skills-summary');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

        observer.observe(skillsSection);
    }
});