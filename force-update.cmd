@echo off
echo 🔄 Force la mise à jour des styles...

rem Supprime les fichiers de cache
if exist _site rmdir /s /q _site
if exist .jekyll-cache rmdir /s /q .jekyll-cache

echo ✅ Cache supprimé

rem Recompile le site
echo 🔨 Recompilation...
call bundle exec jekyll build --config _config.yml,_config_github.yml

echo ✅ Site recompilé !
echo.
echo 🚀 Vous pouvez maintenant lancer votre serveur :
echo bundle exec jekyll serve --port 4000
echo.
pause