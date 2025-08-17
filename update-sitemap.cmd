@echo off
setlocal

echo 🔄 Mise à jour du sitemap en cours...

REM Vérifier que feed.xml existe
if not exist feed.xml (
    echo ⚠️ Création du fichier feed.xml...
    (
        echo ---
        echo layout: null
        echo ---
        echo ^<?xml version="1.0" encoding="UTF-8"?^>
        echo ^<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"^>
        echo   ^<channel^>
        echo     ^<title^>{{ site.title | xml_escape }}^</title^>
        echo     ^<description^>{{ site.description | xml_escape }}^</description^>
        echo     ^<link^>{{ site.url }}{{ site.baseurl }}/^</link^>
        echo     ^<atom:link href="{{ site.url }}{{ site.baseurl }}/feed.xml" rel="self" type="application/rss+xml"/^>
        echo     ^<pubDate^>{{ site.time | date_to_rfc822 }}^</pubDate^>
        echo     ^<lastBuildDate^>{{ site.time | date_to_rfc822 }}^</lastBuildDate^>
        echo     ^<generator^>Jekyll v{{ jekyll.version }}^</generator^>
        echo     {%% for post in site.posts limit:10 %%}
        echo       ^<item^>
        echo         ^<title^>{{ post.title | xml_escape }}^</title^>
        echo         ^<description^>{{ post.content | xml_escape }}^</description^>
        echo         ^<pubDate^>{{ post.date | date_to_rfc822 }}^</pubDate^>
        echo         ^<link^>{{ site.url }}{{ site.baseurl }}{{ post.url }}^</link^>
        echo         ^<guid isPermaLink="true"^>{{ site.url }}{{ site.baseurl }}{{ post.url }}^</guid^>
        echo         {%% for tag in post.tags %%}
        echo         ^<category^>{{ tag | xml_escape }}^</category^>
        echo         {%% endfor %%}
        echo         {%% for cat in post.categories %%}
        echo         ^<category^>{{ cat | xml_escape }}^</category^>
        echo         {%% endfor %%}
        echo       ^</item^>
        echo     {%% endfor %%}
        echo   ^</channel^>
        echo ^</rss^>
    ) > feed.xml
    echo ✅ feed.xml créé
)

REM Vérifier que redirect.html existe
if not exist redirect.html (
    echo ⚠️ Création du fichier redirect.html...
    (
        echo ---
        echo layout: null
        echo sitemap:
        echo   exclude: "yes"
        echo ---
        echo ^<!DOCTYPE html^>
        echo ^<html^>
        echo ^<head^>
        echo   ^<meta charset="utf-8"^>
        echo   ^<meta name="robots" content="noindex"^>
        echo   ^<meta http-equiv="refresh" content="0; url={{ site.url }}"^>
        echo   ^<link rel="canonical" href="{{ site.url }}"^>
        echo ^</head^>
        echo ^<body^>
        echo   ^<p^>Redirection en cours...^</p^>
        echo ^</body^>
        echo ^</html^>
    ) > redirect.html
    echo ✅ redirect.html créé
)

REM Vérifier que sitemap.xml existe
if not exist sitemap.xml (
    echo ⚠️ Création du fichier sitemap.xml...
    (
        echo ---
        echo layout: null
        echo ---
        echo ^<?xml version="1.0" encoding="UTF-8"?^>
        echo ^<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"^>
        echo   ^<url^>
        echo     ^<loc^>{{ site.url }}/sitemap_index.xml^</loc^>
        echo     ^<lastmod^>{{ site.time | date: "%%Y-%%m-%%dT%%H:%%M:%%S%%:z" }}^</lastmod^>
        echo     ^<changefreq^>weekly^</changefreq^>
        echo     ^<priority^>1.0^</priority^>
        echo   ^</url^>
        echo ^</urlset^>
    ) > sitemap.xml
    echo ✅ sitemap.xml créé
)

REM Rebuild Jekyll pour regénérer les sitemaps
echo 🔨 Construction du site Jekyll...
set JEKYLL_ENV=production
call bundle exec jekyll build --config _config.yml,_config_github.yml

REM Vérification que l'index de sitemap a été généré
if exist _site\sitemap_index.xml (
    echo ✅ Sitemap index généré avec succès
    
    REM Ping Google et Bing pour notification
    echo 📡 Notification des moteurs de recherche...
    powershell -Command "(New-Object System.Net.WebClient).DownloadString('https://www.google.com/ping?sitemap=https://nicolas-dabene.fr/sitemap_index.xml')" > nul
    powershell -Command "(New-Object System.Net.WebClient).DownloadString('https://www.bing.com/ping?sitemap=https://nicolas-dabene.fr/sitemap_index.xml')" > nul
    echo ✅ Moteurs de recherche notifiés

    REM Affichage des stats
    echo 📊 Statistiques du sitemap :
    set total_urls=0
    for %%f in (sitemap_pages.xml sitemap_posts_2025.xml sitemap_projects.xml sitemap_case_studies.xml sitemap_images.xml) do (
        if exist _site\%%f (
            for /f %%a in ('powershell -Command "(Get-Content '_site\%%f' | Select-String '<url>' -AllMatches).Matches.Count"') do set /a total_urls+=%%a
        )
    )
    echo - URLs totales : %total_urls%
    echo - Dernière mise à jour : %date% %time%
) else (
    echo ❌ Erreur : Sitemap index non généré
    exit /b 1
)

echo 🎉 Mise à jour terminée !
endlocal
