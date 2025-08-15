@echo off
echo Démarrage du serveur Jekyll en mode développement...
SET JEKYLL_ENV=development
bundle exec jekyll serve --livereload
pause
