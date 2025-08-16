#!/bin/bash
echo "Démarrage du serveur Jekyll en mode développement..."
bundle exec jekyll serve --livereload --config _config.yml,_config_dev.yml
