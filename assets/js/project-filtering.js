document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const techFilter = document.getElementById('tech-filter');
    const sortBy = document.getElementById('sort-by');
    const projectsContainer = document.getElementById('projects-container');

    if (!projectsContainer) return; // Exit if not on the projects page

    const projects = Array.from(projectsContainer.children); // Get all project cards

    const filterAndSortProjects = () => {
        const selectedCategories = Array.from(categoryFilter.selectedOptions).map(option => option.value).filter(value => value !== 'all');
        const selectedTechs = Array.from(techFilter.selectedOptions).map(option => option.value).filter(value => value !== 'all');
        const sortOrder = sortBy.value;

        let filteredProjects = projects.filter(project => {
            const projectCategories = project.dataset.categories ? project.dataset.categories.split(' ') : [];
            const projectTechs = project.dataset.technologies ? project.dataset.technologies.split(' ') : [];

            const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat => projectCategories.includes(cat));
            const techMatch = selectedTechs.length === 0 || selectedTechs.some(tech => projectTechs.includes(tech));

            return categoryMatch && techMatch;
        });

        // Sorting
        filteredProjects.sort((a, b) => {
            if (sortOrder === 'date-desc') {
                return parseInt(b.dataset.date) - parseInt(a.dataset.date);
            } else if (sortOrder === 'date-asc') {
                return parseInt(a.dataset.date) - parseInt(b.dataset.date);
            } else if (sortOrder === 'impact-desc') {
                return parseInt(b.dataset.impact) - parseInt(a.dataset.impact);
            }
            return 0;
        });

        // Clear current projects and append sorted/filtered ones
        projectsContainer.innerHTML = '';
        if (filteredProjects.length === 0) {
            projectsContainer.innerHTML = '<p class="no-projects">No projects match your criteria.</p>';
        } else {
            filteredProjects.forEach(project => projectsContainer.appendChild(project));
        }
    };

    categoryFilter.addEventListener('change', filterAndSortProjects);
    techFilter.addEventListener('change', filterAndSortProjects);
    sortBy.addEventListener('change', filterAndSortProjects);

    // Initial filter and sort on page load
    filterAndSortProjects();
});