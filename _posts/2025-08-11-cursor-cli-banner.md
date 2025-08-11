---

## layout: post title: "Cursor CLI : guide complet + commandes /help" date: 2025-08-11 author: Nicolas Dabène categories: \[Développement, Tutoriel, Intelligence Artificielle] tags: \[Cursor, CLI, terminal, MCP, automation] excerpt: "Installez, configurez et maîtrisez Cursor CLI depuis le terminal. Inclus : toutes les commandes disponibles via /help, modes interactif et non-interactif, auth, règles et MCP." image: /assets/images/blog/2025-08-11-cursor-cli-banner.jpg featured: false difficulty: "Intermédiaire" technologies: \["JavaScript", "PHP", "Bash", "MCP"] estimated\_reading\_time: "12 minutes"

# Cursor CLI : guide complet + commandes /help

## Introduction

Cursor CLI permet d’interagir avec l’agent de Cursor directement depuis le terminal : écrire, revoir et modifier du code, exécuter des commandes approuvées, reprendre des sessions, et automatiser en CI. L’outil est **actuellement en bêta** : utilisez-le dans des environnements de confiance.

---

## Installation & mise à jour

### Installer (macOS, Linux, WSL)

```bash
# Installation en une commande
curl https://cursor.com/install -fsS | bash

# Vérifier l'installation
cursor-agent --version
```

Après installation, ajoutez `~/.local/bin` à votre `PATH` si nécessaire, puis lancez l’agent : `cursor-agent`. Pour mettre à jour manuellement : `cursor-agent update` ou `cursor-agent upgrade`.

### Authentification

Deux options : **login via navigateur (recommandé)** ou **clé API** (CI/CD).

```bash
# Login navigateur
cursor-agent login
cursor-agent status     # vérifier l'état
cursor-agent logout     # se déconnecter

# Clé API (CI)
export CURSOR_API_KEY=...   # ou --api-key ... en ligne de commande
cursor-agent "implement user authentication"
```

La page *Authentication* détaille l’état, les erreurs fréquentes et les flags utiles (`--endpoint`, `--insecure`).

---

## Modes d’utilisation

### Mode interactif (par défaut)

```bash
# Démarrer une session interactive
cursor-agent

# Démarrer avec un prompt initial
cursor-agent "refactor the auth module to use JWT tokens"
```

Idéal pour décrire l’objectif, examiner les propositions, approuver/annuler les commandes.

### Mode non-interactif (print)

```bash
# Sortie "text"
cursor-agent -p "find and fix performance issues" --model "gpt-5" --output-format text

# Sortie "json" (plus facile à parser en CI)
cursor-agent -p "review these changes for security issues" --output-format json
```

En mode non-interactif, Cursor peut écrire sans confirmations — à utiliser avec précaution.

### Sessions & historique

```bash
# Lister les conversations
cursor-agent ls

# Reprendre la dernière
cursor-agent resume

# Reprendre une session précise
cursor-agent --resume "chat-id-here"
```

Pratique pour conserver le contexte d’une itération à l’autre.

---

## Paramètres & options globales (essentiel)

Les options globales et commandes de base incluent : `--version`, `--api-key`, `-p/--print`, `--output-format {text|json|stream-json}`, `--resume`, `--model`, `--fullscreen`, `--force`, `--help`, ainsi que `login/logout/status`, `update|upgrade`, `ls`, `resume`. Tous les détails et syntaxes sont centralisés dans la référence *Parameters*.

Exemples :

```bash
# Forcer l'exécution de commandes sans prompts d'approbation explicites (à manier avec prudence)
cursor-agent --force -p "run the full test suite"

# Choisir un modèle
cursor-agent -m "gpt-5" -p "optimize database queries in this repo"

# Reprendre par ID
cursor-agent --resume abcd1234 -p "continue from where we left off"
```

---

## Règles, MCP & bonnes pratiques

* **Règles** : le CLI supporte le même système que l’IDE (`.cursor/rules`, `AGENT.md`, `CLAUDE.md`) pour injecter des consignes persistantes par dossier/fichier.
* **MCP (Model Context Protocol)** : le CLI détecte votre `mcp.json` et charge les mêmes serveurs/outils qu’en IDE.
* **Conseil de prompt** : explicitez l’intention (ex : *« ne pas écrire de code »* pendant la phase de planification) pour guider l’agent.

---

## Toutes les commandes disponibles via `/help`

En session interactive, tapez `/help` pour afficher l’aide intégrée. Voici **l’intégralité des commandes listées** dans la référence officielle *Slash commands* :

| Commande              | Description                                             | Exemple                                    |
| --------------------- | ------------------------------------------------------- | ------------------------------------------ |
| `/model <model>`      | Afficher/choisir le modèle courant.                     | `/model gpt-5`                             |
| `/auto-run [state]`   | Basculer ou fixer l’auto-run : `on` / `off` / `status`. | `/auto-run off`                            |
| `/new-chat`           | Démarre un nouveau chat (nouveau contexte).             | `/new-chat`                                |
| `/vim`                | Active/désactive les keybindings Vim.                   | `/vim`                                     |
| `/help [command]`     | Aide générale ou sur une commande donnée.               | `/help /model`                             |
| `/feedback <message>` | Envoie un feedback à l’équipe Cursor.                   | `/feedback great DX but slow on big repos` |
| `/resume <chat>`      | Reprend un chat par **nom de dossier**.                 | `/resume my-project`                       |
| `/copy-req-id`        | Copie l’ID de la dernière requête.                      | `/copy-req-id`                             |
| `/logout`             | Se déconnecte de Cursor.                                | `/logout`                                  |
| `/quit`               | Quitte la session.                                      | `/quit`                                    |

> 💡 Astuce : `/auto-run off` est utile pour valider étape par étape quand vous modifiez des fichiers ou exécutez des commandes.

---

## Exemples concrets

### 1) Atelier interactif : créer un module moderne PrestaShop (Symfony)

```text
$ cursor-agent
> /model gpt-5
> Tu es un expert PrestaShop 8/9 + Symfony. Ne rien écrire sans plan.
> Objectif : créer un module "ps_feature_badges" qui ajoute un badge sur la page produit via un hook et une page de configuration moderne (Symfony).
> Contraintes :
> - Autoload PSR-4 via composer.json (namespace PrestaShop\Module\PsFeatureBadges\)
> - Services Symfony dans config/services.yml
> - Admin controller moderne et route dans modules/ps_feature_badges/config/routes.yml
> - Formulaire de configuration Symfony (settings form), stockage via Configuration
> - Hook front : displayProductAdditionalInfo (ou displayProductExtraContent selon thème)
> - Respect PSR-12, pas d'override Core
> Planifie les étapes et demande mon accord (/auto-run off).
```

```text
> /auto-run off
> Étape 1 : squelette du module (ps_feature_badges.php, composer.json, src/, config/). Explique chaque fichier créé.
> Étape 2 : Admin Controller + route /modules/ps_feature_badges/configure et vue Twig minimale.
> Étape 3 : config/services.yml et un service BadgeProvider (expose getBadgeForProduct(int $idProduct)).
> Étape 4 : Settings Form Symfony (clé CONFIG_PSFB_BADGE_TEXT avec validation) + bouton Sauvegarder.
> Étape 5 : implémenter hookDisplayProductAdditionalInfo pour afficher le badge.
> Étape 6 : commandes d'installation et tests manuels.
```

### 2) Implémentation guidée (prompts prêts à l’emploi)

```text
# Étape 1 — squelette
Crée le squelette du module "ps_feature_badges" compatible PrestaShop 8/9 :
- Fichiers : ps_feature_badges.php, composer.json (autoload PSR-4 PrestaShop\Module\PsFeatureBadges\ => src/), README.md
- Dossiers : src/Controller/Admin, src/Service, config/{routes.yml,services.yml}, templates/admin/
- ps_versions_compliancy : ">=8.0.0"
- Méthodes install()/uninstall() et registerHook('displayProductAdditionalInfo')
N’écris pas encore de logique métier ; montre le diff et explique.
```

```text
# Étape 2 — page de configuration moderne (Symfony)
Ajoute un Admin Controller moderne ConfigurationController (hérite de FrameworkBundleAdminController) avec action index():
- Route dans modules/ps_feature_badges/config/routes.yml (nom psfb_configuration, préfixe /modules)
- Vue Twig @Modules/ps_feature_badges/templates/admin/configuration.html.twig
- Sécurité via attribut AdminSecurity (lecture/écriture selon droits Module)
- Lien Configurer depuis Module Manager OK
```

```text
# Étape 3 — services Symfony
Déclare dans config/services.yml un service psfb.badge_provider (classe src/Service/BadgeProvider.php) injectant TranslatorInterface et Configuration. Méthode getBadgeForProduct($idProduct) qui renvoie le texte configuré (fallback par défaut).
```

```text
# Étape 4 — Settings Form
Crée un formulaire Symfony pour CONFIG_PSFB_BADGE_TEXT (texte court) avec aperçu en live :
- Définis FormDataProvider et FormHandler si nécessaire
- Persistance via Configuration::updateValue('CONFIG_PSFB_BADGE_TEXT', ...)
- Valide longueur (1..32) et échappe HTML
- Rends le formulaire dans configuration.html.twig (UIKit BO)
```

```text
# Étape 5 — hook produit
Implémente hookDisplayProductAdditionalInfo($params) pour afficher le badge sous le bouton principal :
- Récupère idProduct depuis params
- Appelle BadgeProvider->getBadgeForProduct(idProduct)
- Retourne un snippet Twig ou HTML minimal (class="psfb-badge")
```

```text
# Étape 6 — commandes utiles
Commandes pour tester :
- composer dump-autoload -o
- php bin/console prestashop:module install ps_feature_badges
- php bin/console prestashop:module enable ps_feature_badges
- php bin/console cache:clear --no-warmup
Accès : /admin-dev/modules/ps_feature_badges/configure
```

### 3) CI non‑interactif : audit et tests

```bash
cursor-agent -p "Audit le module ps_feature_badges : respect PSR-12, structure PrestaShop, controllers Symfony, services, routes, formulaire de config, hooks. Propose des correctifs et le diff patch." --output-format json --model gpt-5
```

```bash
cursor-agent -p "Plan détaillé pour finir ps_feature_badges (services, formulaire, hook, tests). Ne pas modifier de fichiers, seulement le plan." --output-format text
```

```bash
cursor-agent -p "Relis hookDisplayProductAdditionalInfo de ps_feature_badges : sécurité, compatibilité thèmes (displayProductExtraContent), accessibilité ARIA et performance. Suggère un snippet Twig minimal." --output-format text
```

---

## Sécurité & limitations

Le CLI peut **lire/écrire/supprimer des fichiers** et **exécuter des commandes shell** (avec approbation en mode interactif). En non-interactif, la prudence s’impose : isolez en sandbox/CI, versionnez, révisez les diffs. Le projet est en **bêta** et les garde-fous évoluent.

---

## FAQ rapide

### Le CLI est-il disponible pour tous ?

Le CLI est en bêta et non disponible pour certains plans Enterprise à date.

### Puis-je piloter des intégrations MCP comme en IDE ?

Oui : le CLI lit `mcp.json` et charge les mêmes serveurs/outils.

### Comment obtenir l’aide détaillée en ligne de commande ?

Utilisez `cursor-agent help [commande]` pour la CLI, et `/help [commande]` en session interactive.

---

## Conclusion

Cursor CLI apporte l’agent Cursor **là où vous travaillez déjà** : le terminal et la CI. En combinant **modes interactif/non-interactif**, **règles**, **MCP** et **slash commands** (ci-dessus), vous pouvez passer du plan à l’exécution de manière fiable et traçable.

---

*Article publié le 11 août 2025 par Nicolas Dabène — Expert PHP & PrestaShop avec 15+ ans d'expérience*

**À lire aussi :**

* [Composer un ](/blog/agent-md-bonnes-pratiques)[`AGENT.md`](/blog/agent-md-bonnes-pratiques)[ efficace](/blog/agent-md-bonnes-pratiques)
* [MCP : connecter vos outils à l’agent](/blog/model-context-protocol-introduction)
