document.addEventListener('DOMContentLoaded', () => {
  const themeSwitcher = document.getElementById('theme-switcher');
  const body = document.body;

  // Appliquer le thème sauvegardé au chargement
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark');
  }

  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', () => {
      body.classList.toggle('dark');
      
      // Sauvegarder le choix de l'utilisateur
      if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.removeItem('theme');
      }
    });
  }
});
