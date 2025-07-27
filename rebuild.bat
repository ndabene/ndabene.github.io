@echo off
echo Nettoyage du cache Jekyll...
rmdir /s /q _site 2>nul
rmdir /s /q .jekyll-cache 2>nul

echo Construction du site...
bundle exec jekyll build

echo Lancement du serveur...
bundle exec jekyll serve --port 4000

pause