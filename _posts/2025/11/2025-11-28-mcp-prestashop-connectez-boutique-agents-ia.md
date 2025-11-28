---
layout: post
title: 'MCP Server PrestaShop : Connecter votre boutique aux agents IA (Guide 2025)'
date: 2025-11-28
ref: mcp-server-prestashop-setup-guide
author: Nicolas Dabène
categories:
- PrestaShop
- Intelligence Artificielle
- Développement
tags:
- MCP
- PrestaShop
- IA
- PHP 8
- Agent IA
- Model Context Protocol
excerpt: 'Découvrez comment ps_mcp_server transforme votre boutique PrestaShop en
  plateforme IA-ready. Guide complet d''installation du MCP Server pour PrestaShop
  avec exemples pratiques et intégration Claude, ChatGPT, Gemini.'
image: /assets/images/blog/2025/11/mcp-prestashop-banner.jpg
featured: true
difficulty: Avancé
technologies:
- PrestaShop 8+
- PHP 8.1+
- MCP
- IA
estimated_reading_time: 10 minutes
keywords:
- MCP Server PrestaShop
- ps_mcp_server
- PrestaShop MCP integration
- Model Context Protocol PrestaShop
- PrestaShop AI automation
- MCP protocol e-commerce
- PrestaShop agent IA
- PHP MCP server
- PrestaShop 8 MCP
- Claude PrestaShop integration
faq:
- question: Qu'est-ce que le Model Context Protocol (MCP) ?
  answer: MCP est un protocole qui permet aux agents IA de communiquer avec des systèmes
    métiers comme PrestaShop. Il expose des outils via un serveur structuré, permettant
    aux LLM d'interagir avec votre boutique de manière sécurisée et contrôlée.
- question: Pourquoi utiliser MCP avec PrestaShop ?
  answer: 'MCP permet d''automatiser des tâches complexes via IA : gestion produits,
    analyse données, support client intelligent. Vos agents IA accèdent directement
    à la logique métier de votre boutique via des outils bien définis.'
- question: Quels sont les prérequis techniques pour ps_mcp_server ?
  answer: Vous devez avoir PrestaShop 8.x minimum et PHP 8.1 ou supérieur. Le module
    utilise les attributs PHP modernes et nécessite un client MCP compatible comme
    Claude, Dust ou Gemini CLI.
- question: Comment sécuriser l'accès au serveur MCP ?
  answer: Le module intègre une gestion de session avec token d'authentification.
    Seuls les clients possédant un token valide peuvent accéder aux outils exposés.
    Activez toujours les logs en développement pour surveiller l'activité.
- question: Quelle est la différence entre transport STDIO et HTTP ?
  answer: STDIO lance le serveur comme processus enfant (idéal pour debug ou modules
    autonomes). HTTP expose le serveur via API (usage production avec Claude, Dust,
    ChatGPT). STDIO est synchrone, HTTP permet connexions multiples.
- question: Comment créer mon premier outil MCP personnalisé ?
  answer: 'Déclarez votre module MCP-compliant avec isMcpCompliant(), créez une classe
    sous src/Mcp/Tools, utilisez l''attribut #[McpTool] avec description claire. Le
    module scanne automatiquement vos outils au démarrage.'
sources:
- title: Model Context Protocol Official Spec
  url: https://modelcontextprotocol.io
- title: PHP-MCP Documentation
  url: https://github.com/php-mcp
- title: ps_mcp_boilerplate Repository
  url: https://github.com/prestashop/ps_mcp_boilerplate
---


# MCP pour PrestaShop : Connectez Votre Boutique aux Agents IA

Imaginez un instant : vous demandez à Claude "Trouve-moi les 10 produits les plus vendus ce mois-ci et génère un rapport promotionnel". Quelques secondes plus tard, vous recevez un document complet avec statistiques, recommandations et suggestions de mise en avant. Science-fiction ? Non, c'est exactement ce que permet **ps_mcp_server**, le module PrestaShop qui connecte votre boutique aux agents IA via le Model Context Protocol (MCP).

Dans ma pratique de développement e-commerce depuis 15 ans, j'ai rarement vu une technologie aussi prometteuse pour l'automatisation intelligente. MCP transforme votre PrestaShop en véritable API conversationnelle, où les agents IA deviennent de véritables assistants métier capables d'exécuter des tâches complexes.

## Introduction

Le Model Context Protocol n'est pas qu'une énième API. C'est un protocole à état conçu spécifiquement pour les interactions IA-système. Contrairement aux API REST classiques où chaque requête est isolée, MCP maintient un contexte conversationnel : votre agent IA "se souvient" des préférences linguistiques, des produits consultés, des recherches précédentes.

**ps_mcp_server** est le pont entre ce protocole révolutionnaire et l'écosystème PrestaShop. Développé pour PHP 8.1+ et PrestaShop 8+, ce module expose votre logique métier sous forme d'outils que les LLM (Large Language Models) peuvent découvrir et utiliser automatiquement.

> **Note de compatibilité actuelle** : À l'heure de la publication de cet article, le MCP Server de PrestaShop est officiellement compatible avec ChatGPT. Cependant, le protocole MCP étant open-source et standardisé, cet article anticipe les futures compatibilités avec d'autres LLM majeurs (Claude, Gemini, Dust). L'architecture décrite ici est conçue pour fonctionner avec tous les agents IA compatibles MCP.

L'avantage de cette approche standardisée ? Vous définissez vos outils métier une seule fois, et tous les agents IA compatibles MCP peuvent les utiliser à mesure que le support s'étend. Plus besoin de développer des intégrations spécifiques pour chaque plateforme IA.

## Pourquoi MCP Change la Donne pour PrestaShop

### Un Protocole Pensé pour l'IA

MCP résout un problème fondamental : comment permettre aux IA d'interagir avec des systèmes métiers complexes de manière fiable ? Les approches traditionnelles (scraping, API génériques) échouent car elles ne fournissent pas le contexte structuré dont les LLM ont besoin.

Avec MCP, chaque outil exposé dispose d'une documentation intrinsèque que l'agent IA lit et comprend. Pensez-y comme à une API autodocumentée optimisée pour les machines intelligentes. L'agent sait précisément quels paramètres envoyer, quelles réponses attendre, et comment combiner plusieurs outils pour des workflows complexes.

### Architecture du Module ps_mcp_server

Le module intègre trois composants essentiels :

**Le serveur MCP embarqué** qui écoute les requêtes des agents IA, découvre automatiquement les outils disponibles via les attributs PHP, et maintient l'état des sessions.

**Le client MCP intégré** nécessaire pour la communication STDIO (Standard Input/Output), particulièrement utile pour le développement et les modules autonomes.

**Le système de découverte automatique** qui scanne vos modules à la recherche de classes annotées avec `#[McpTool]`, éliminant toute configuration manuelle fastidieuse.

Cette architecture garantit que votre serveur MCP reste toujours synchronisé avec votre code métier, sans maintenance supplémentaire.

## Installation et Configuration Initiale

### Prérequis Techniques

Avant de commencer, assurez-vous de disposer d'un environnement compatible :

- **PrestaShop 8.x minimum** - Le module exploite les fonctionnalités modernes de PrestaShop et nécessite cette version pour garantir la stabilité.
- **PHP 8.1 ou supérieur** - Les attributs PHP (annotations modernes) sont au cœur du système de découverte d'outils. PHP 8.1 introduit également des améliorations de performance cruciales pour les opérations IA gourmandes.
- **Un client MCP compatible** - Pour tester et utiliser votre serveur : Claude Desktop, Dust, Gemini CLI ou MCP Inspector (outil de debug sans IA).

### Structure des Fichiers

Le module crée automatiquement un dossier `.mcp` à sa racine contenant :

- **.cache** - Cache de découverte des outils pour optimiser les performances. Supprimez-le pour forcer un nouveau scan.
- **.logs** - Fichiers de logs détaillés (quand "Enable logs" est activé dans la configuration). Essentiel pour le debug des interactions IA.

Cette organisation permet de maintenir une séparation claire entre la configuration MCP et votre code PrestaShop standard.

## Déclarer Votre Module Compatible MCP

### La Méthode isMcpCompliant()

Avant d'exposer des outils, vous devez indiquer à **ps_mcp_server** que votre module supporte MCP. Cette déclaration explicite évite les scans inutiles et permet une gestion fine des modules IA-ready.

Ajoutez simplement cette méthode dans la classe principale de votre module :

```php
<?php

class Ps_MySuperModule extends Module
{
    /**
     * Déclare ce module comme compatible MCP
     *
     * Cette méthode permet à ps_mcp_server de découvrir
     * automatiquement les outils définis dans ce module
     * via les attributs PHP #[McpTool]
     */
    public function isMcpCompliant()
    {
        return true;
    }
}
```

C'est tout ! Une fois cette méthode présente, le module **ps_mcp_server** scannera automatiquement votre dossier `src/Mcp/Tools` à la recherche de classes contenant des outils MCP.

### Pourquoi Cette Approche ?

Cette méthode opt-in présente plusieurs avantages : elle évite le scan de tous les modules installés (performance), permet une activation progressive (vous choisissez quand rendre un module MCP-ready), et facilite le debug (logs clairs sur les modules scannés).

Dans les logs du module (`.mcp/.logs`), vous verrez apparaître votre module dans la liste des modules MCP-compliants découverts, avec le nombre d'outils trouvés.

## Créer Votre Premier Outil MCP

### Anatomie d'un Outil MCP

Un outil MCP est une méthode PHP enrichie d'attributs qui décrivent son comportement pour les agents IA. Créons un exemple concret : un outil de recherche de produits par nom.

Créez un fichier `src/Mcp/Tools/ProductSearchTool.php` dans votre module :

```php
<?php

namespace PrestaShop\Module\MySuperModule\Mcp\Tools;

use PhpMcp\Server\Attributes\McpTool;
use PhpMcp\Server\Attributes\Schema;
use Product;

class ProductSearchTool
{
    /**
     * Recherche des produits par nom avec correspondance floue
     *
     * @param string $searchTerms Termes de recherche séparés par des points-virgules
     * @param int $langId ID de la langue (par défaut : langue préférée)
     * @param int $limit Nombre maximum de résultats (par défaut : 10)
     * @return array Liste des produits trouvés avec détails
     */
    #[McpTool(
        name: 'search_product_by_name',
        description: 'Recherche produits dans la boutique par nom uniquement. Utilise la correspondance floue. Résultats triés par pertinence.'
    )]
    #[Schema(
        properties: [
            'searchTerms' => [
                'type' => 'string',
                'description' => 'Termes de recherche. Plusieurs termes possibles séparés par des points-virgules.'
            ],
            'langId' => [
                'type' => 'integer',
                'description' => 'Langue de recherche. Par défaut : langue préférée du contexte.',
                'default' => 1
            ],
            'limit' => [
                'type' => 'integer',
                'description' => 'Nombre maximum de résultats à retourner.',
                'default' => 10
            ]
        ],
        required: ['searchTerms']
    )]
    public function searchProducts(string $searchTerms, int $langId = 1, int $limit = 10): array
    {
        // Séparation des termes multiples
        $terms = explode(';', $searchTerms);

        // Logique de recherche floue PrestaShop
        $results = Product::searchByName($langId, $terms[0]);

        // Limitation des résultats
        return array_slice($results, 0, $limit);
    }
}
```

### Décortiquons les Attributs

**`#[McpTool]`** définit l'identité de votre outil :

- Le **name** doit être unique, descriptif et en snake_case. C'est le nom que l'agent IA utilisera pour appeler votre outil.
- La **description** est cruciale : elle guide l'agent sur quand et comment utiliser l'outil. Soyez explicite sur les cas d'usage, les limitations, le tri des résultats.

**`#[Schema]`** spécifie les paramètres acceptés :

- **properties** liste chaque paramètre avec son type, sa description détaillée, et éventuellement une valeur par défaut.
- **required** indique quels paramètres sont obligatoires. L'agent IA recevra une erreur claire s'il oublie un paramètre requis.

### Validation des Entrées

MCP valide automatiquement les types grâce au Schema, mais ajoutez toujours des sanity checks dans votre code :

```php
public function searchProducts(string $searchTerms, int $langId = 1, int $limit = 10): array
{
    // Validation basique
    if (empty(trim($searchTerms))) {
        throw new \InvalidArgumentException('Les termes de recherche ne peuvent pas être vides');
    }

    // Limite raisonnable pour éviter la surcharge
    if ($limit > 100) {
        $limit = 100;
    }

    // Vérification langue existante
    if (!Language::getLanguage($langId)) {
        throw new \InvalidArgumentException("Langue ID {$langId} invalide");
    }

    // Votre logique métier...
}
```

Les agents IA sont réputés pour "halluciner" des valeurs. Ces validations protègent votre système contre les comportements erratiques.

## Principes de Design d'Outils Efficaces

### Wording Explicite et Concis

La description de vos outils fait toute la différence. Un agent IA lit ces descriptions pour décider quel outil utiliser et comment l'utiliser. Voici un exemple de transformation :

❌ **Description vague** :
```php
description: 'Récupère des produits'
```

✅ **Description optimisée** :
```php
description: 'Recherche produits par nom uniquement. Correspondance floue activée. Résultats triés par pertinence. Pour recherche par catégorie ou prix, utiliser search_product_advanced.'
```

La version optimisée spécifie le type de recherche, le comportement (fuzzy matching), le tri des résultats, et même guide vers un outil alternatif pour d'autres besoins.

### Vocabulaire Cohérent

Utilisez la même terminologie à travers tous vos outils. Si vous appelez un paramètre `langId` dans un outil, ne l'appelez pas `languageId` dans un autre. Cette cohérence aide les agents à faire des connexions entre outils et à planifier des workflows complexes.

Exemple de vocabulaire unifié :

```php
// ✅ Cohérent dans tous les outils
'langId' => 'ID de la langue'
'limit' => 'Nombre maximum de résultats'
'offset' => 'Point de départ pour la pagination'

// ❌ Incohérent
Outil 1 : 'langId', 'maxResults', 'start'
Outil 2 : 'languageId', 'limit', 'offset'
```

### Limiter la Complexité des Requêtes

Protégez votre serveur contre les requêtes trop gourmandes. Un agent IA mal configuré pourrait demander 10 000 produits d'un coup, surchargeant votre base de données.

```php
#[Schema(
    properties: [
        'limit' => [
            'type' => 'integer',
            'description' => 'Nombre maximum de résultats (max : 100)',
            'default' => 10,
            'maximum' => 100  // Limite technique
        ]
    ]
)]
public function searchProducts(string $searchTerms, int $limit = 10): array
{
    // Double vérification au cas où
    $limit = min($limit, 100);

    // Logique de recherche avec limite appliquée...
}
```

Cette approche défensive garantit des performances stables même avec des agents IA mal optimisés.

## Gestion de l'État avec MCP

### Protocole Stateful : L'Avantage MCP

Contrairement aux API REST traditionnelles, MCP est **stateful** : le serveur maintient un contexte pour chaque client connecté. Cette caractéristique transforme l'expérience utilisateur.

Imaginez un agent IA qui aide un client francophone. Au lieu de spécifier `langId: 2` à chaque appel d'outil, l'agent peut stocker cette préférence dans l'état de session :

```php
// Premier appel : l'agent détecte la langue préférée
$context->setState('preferred_lang', 2);

// Appels suivants : utilisation automatique
$langId = $context->getState('preferred_lang', 1);
```

### Cas d'Usage de l'État

- **Personnalisation** : langue préférée, devise, pays de livraison.
- **Historique de recherche** : se souvenir des produits consultés pour affiner les recommandations.
- **Workflow multi-étapes** : un agent peut construire progressivement un panier en mémorisant les choix précédents.
- **Optimisation des requêtes** : mettre en cache des données fréquemment accédées dans la session.

L'état n'est pas obligatoire, mais il rend l'interaction beaucoup plus fluide et naturelle pour l'utilisateur final.

## Connexion HTTP pour la Production

### Avantages du Transport HTTP

En production, HTTP devient le transport privilégié pour plusieurs raisons :

- **Compatibilité universelle** : tous les clients MCP (Claude, ChatGPT, Dust, Gemini) supportent HTTP.
- **Scalabilité** : un serveur HTTP peut gérer des centaines de connexions simultanées.
- **Sécurité** : authentification via token, chiffrement HTTPS, gestion fine des permissions.
- **Monitoring** : logs centralisés, métriques de performance, détection d'anomalies.

### Configuration pour Différents Clients

**Claude Desktop** nécessite une configuration JSON locale pointant vers votre serveur avec le token :

```json
{
  "mcpServers": {
    "prestashop-shop": {
      "url": "https://votre-boutique.com/modules/ps_mcp_server/endpoint",
      "token": "votre-token-securise"
    }
  }
}
```

**Dust et Gemini CLI** offrent actuellement la connexion la plus simple : token simple sans OAuth. Recommandés pour vos premiers tests en production.

**ChatGPT** et d'autres clients nécessiteront OAuth2 dans les futures versions du module (V1). Pour l'instant, privilégiez Dust ou Gemini pour la production.

### Considérations de Sécurité

En HTTP, la sécurité est primordiale :

- Utilisez toujours **HTTPS** en production, jamais HTTP en clair.
- Renouvelez les tokens régulièrement (recommandé : tous les 30 jours).
- Activez les logs pour surveiller les appels d'outils suspects.
- Implémentez des rate limits pour éviter les abus (prochaine version du module).

## Debug et Monitoring

### Fichiers de Logs

Le dossier `.mcp/.logs` contient des informations précieuses pour le debugging :

- **mcp-server.log** : toutes les requêtes reçues, outils appelés, erreurs rencontrées.
- **tool-discovery.log** : résultats du scan de modules, outils découverts, erreurs d'annotations.
- **session.log** : création/destruction de sessions, gestion de l'état par client.

Activez les logs dans la configuration du module pendant le développement, désactivez-les en production pour des raisons de performance (sauf si vous diagnostiquez un problème).

### MCP Inspector : Votre Meilleur Allié

**MCP Inspector** est un outil de debug graphique qui se connecte à votre serveur sans faire intervenir d'IA. Parfait pour :

- Vérifier que vos outils sont correctement découverts.
- Tester les appels d'outils avec différents paramètres.
- Observer les réponses sans l'imprévisibilité d'un agent IA.
- Valider votre schéma JSON avant de connecter un vrai client IA.

Installez-le via npm et pointez-le vers votre serveur MCP. Vous verrez instantanément tous vos outils listés avec leur documentation complète.

### Erreurs Fréquentes et Solutions

**"Aucun outil découvert"** : vérifiez que `isMcpCompliant()` retourne true, que vos classes sont dans `src/Mcp/Tools`, et que les attributs `#[McpTool]` sont correctement importés.

**"Token invalide"** : régénérez un token dans la configuration du module, copiez-le exactement sans espaces supplémentaires.

**"Timeout de connexion"** : en mode STDIO, vérifiez que le processus PHP a les droits d'exécution. En HTTP, vérifiez la configuration de votre serveur web et les règles firewall.

## Bonnes Pratiques pour les Outils Agents IA

### Documentation Intrinsèque

Vos descriptions d'outils sont lues par des machines, pas des humains. Optimisez-les pour la compréhension des LLM :

- Soyez précis sur les formats : "Date au format YYYY-MM-DD" plutôt que "Date".
- Indiquez les limitations : "Maximum 100 résultats" dans la description ET dans le schema.
- Guidez vers les alternatives : "Pour recherche avancée, utiliser search_product_advanced".
- Expliquez le tri : "Résultats triés par pertinence décroissante".

### Gestion des Permissions

Même si MCP gère l'authentification, implémentez des vérifications de permissions dans vos outils :

```php
public function updateProduct(int $productId, array $data): array
{
    // Vérification des droits de l'utilisateur associé à la session
    if (!$this->context->employee->hasAccess('AdminProducts', 'edit')) {
        throw new \PrestaShopException('Permissions insuffisantes pour modifier des produits');
    }

    // Validation des données
    $this->validateProductData($data);

    // Mise à jour sécurisée
    $product = new Product($productId);
    $product->hydrate($data);
    $product->save();

    return ['success' => true, 'id' => $productId];
}
```

Cette approche défend en profondeur : même si un token est compromis, les permissions PrestaShop standard restent appliquées.

### Prévention des Boucles Infinies

Les agents IA peuvent parfois tomber dans des boucles : appeler le même outil encore et encore avec des paramètres similaires. Détectez ces comportements :

```php
private function detectLoop(string $toolName, array $params): void
{
    $sessionHistory = $this->context->getState('tool_history', []);

    // Ajout de l'appel actuel
    $sessionHistory[] = [
        'tool' => $toolName,
        'params' => $params,
        'timestamp' => time()
    ];

    // Conservation des 10 derniers appels
    $sessionHistory = array_slice($sessionHistory, -10);

    // Détection de 5 appels identiques
    $similarCalls = array_filter($sessionHistory, function($call) use ($toolName, $params) {
        return $call['tool'] === $toolName &&
               json_encode($call['params']) === json_encode($params);
    });

    if (count($similarCalls) >= 5) {
        throw new \RuntimeException("Comportement de boucle détecté : outil {$toolName} appelé 5 fois avec paramètres identiques");
    }

    $this->context->setState('tool_history', $sessionHistory);
}
```

Cette protection simple évite les scénarios catastrophiques où un agent défaillant surcharge votre serveur.

## Exemple Complet : Module Boilerplate

### Structure Recommandée

Pour démarrer rapidement, utilisez le repository **ps_mcp_boilerplate** qui fournit une structure complète :

```
ps_my_mcp_module/
├── ps_my_mcp_module.php          # Classe principale avec isMcpCompliant()
├── src/
│   └── Mcp/
│       └── Tools/
│           ├── ProductSearchTool.php
│           ├── OrderManagementTool.php
│           └── CustomerAnalyticsTool.php
├── config/
│   └── services.yml               # Configuration Symfony pour DI
└── README.md
```

### Implémentation Complète d'un Outil

Voici un exemple réel d'outil de gestion de commandes :

```php
<?php

namespace PrestaShop\Module\MyMcpModule\Mcp\Tools;

use PhpMcp\Server\Attributes\McpTool;
use PhpMcp\Server\Attributes\Schema;
use Order;
use Context;

class OrderManagementTool
{
    private Context $context;

    public function __construct(Context $context)
    {
        $this->context = $context;
    }

    #[McpTool(
        name: 'get_recent_orders',
        description: 'Récupère les commandes récentes avec filtres optionnels. Retourne ID, client, montant, statut. Triées par date décroissante.'
    )]
    #[Schema(
        properties: [
            'limit' => [
                'type' => 'integer',
                'description' => 'Nombre de commandes à retourner (max : 50)',
                'default' => 10
            ],
            'status' => [
                'type' => 'string',
                'description' => 'Filtrer par statut : pending, paid, shipped, delivered, cancelled',
                'default' => null
            ],
            'days' => [
                'type' => 'integer',
                'description' => 'Commandes des N derniers jours (max : 90)',
                'default' => 7
            ]
        ]
    )]
    public function getRecentOrders(
        int $limit = 10,
        ?string $status = null,
        int $days = 7
    ): array {
        // Validations
        $limit = min($limit, 50);
        $days = min($days, 90);

        // Construction de la requête
        $dateFrom = date('Y-m-d', strtotime("-{$days} days"));

        $orders = Order::getOrdersWithInformations(
            $limit,
            0, // offset
            ['date_add', 'DESC']
        );

        // Filtrage par statut si spécifié
        if ($status) {
            $orders = array_filter($orders, function($order) use ($status) {
                return strtolower($order['order_state']) === strtolower($status);
            });
        }

        // Formatage des résultats
        return array_map(function($order) {
            return [
                'id' => $order['id_order'],
                'reference' => $order['reference'],
                'customer' => [
                    'id' => $order['id_customer'],
                    'name' => $order['customer_name'],
                    'email' => $order['customer_email']
                ],
                'total' => (float) $order['total_paid'],
                'currency' => $order['currency'],
                'status' => $order['order_state'],
                'date' => $order['date_add']
            ];
        }, $orders);
    }
}
```

Cet outil illustre toutes les bonnes pratiques : validation stricte, description claire, typage fort, formatage structuré des résultats.

## Aller Plus Loin : MCP Tools Plus

Si vous souhaitez exploiter pleinement le potentiel du MCP Server de PrestaShop sans développer vos propres outils depuis zéro, **MCP Tools Plus** est une solution clé en main qui étend considérablement les capacités de base du serveur MCP.

### Une Implémentation Avancée Prête à l'Emploi

Développé par BusinessTech/PrestaModule, **MCP Tools Plus** est un module premium qui enrichit le PS MCP Server avec des outils de gestion avancés. Il transforme votre assistant IA en véritable partenaire de gestion capable de :

- **Générer des rapports comptables automatisés** - Extraction et formatage de données de vente pour votre comptabilité, avec export PDF et envoi email intégrés.
- **Orchestrer des actions marketing complexes** - Segmentation clients avancée, génération de codes promo personnalisés, et workflows multi-étapes.
- **Analyser et optimiser votre catalogue** - Détection automatique des produits à fort potentiel ou en perte de vitesse, avec suggestions d'actions concrètes.
- **Intégrer des services tiers** - Connexion native avec Qonto (vérification paiements), Brevo (campagnes email), et autres outils métier (en attente de l'adoption du protocole MCP par ces services).

### Une Approche Modulaire et Évolutive

L'architecture de MCP Tools Plus illustre parfaitement la vision modulaire de MCP : chaque fonctionnalité est exposée comme un outil indépendant que votre agent IA peut découvrir et combiner intelligemment. Cette approche permet une évolution continue et une personnalisation en fonction de vos besoins spécifiques.

Pour découvrir en détail les cas d'usage concrets, les scénarios réels d'automatisation et comprendre comment MCP Tools Plus peut transformer votre gestion quotidienne, consultez notre article dédié : [MCP Server PrestaShop : Piloter votre boutique avec MCP Tools Plus](/2025/11/20/mcp-server-prestashop-tools-plus-assistant-ia).

## Références et Ressources

### Documentation Officielle

**Model Context Protocol** : La spécification complète du protocole est disponible sur [modelcontextprotocol.io](https://modelcontextprotocol.io). Consultez-la pour comprendre les concepts avancés comme les resources, prompts et sampling.

**PHP-MCP** : Les bibliothèques serveur et client sont documentées sur [github.com/php-mcp](https://github.com/php-mcp). Vous y trouverez des exemples d'attributs avancés et des patterns de développement.

## Conclusion

MCP représente une révolution dans la façon dont nos boutiques PrestaShop interagissent avec l'intelligence artificielle. En exposant votre logique métier via des outils bien définis, vous créez un écosystème où les agents IA deviennent de véritables assistants capables d'automatiser des tâches complexes.

**ps_mcp_server** rend cette intégration accessible à tout développeur PHP familier avec PrestaShop. L'approche par attributs simplifie considérablement le développement : définissez vos outils, annotez-les, et le système se charge de les exposer aux agents IA.

Les cas d'usage sont infinis : gestion automatisée des produits, analyse prédictive des ventes, support client intelligent, génération de rapports sur demande, optimisation dynamique des prix. L'imagination est la seule limite.

Commencez par un outil simple (comme la recherche de produits), testez-le avec MCP Inspector, puis connectez Claude ou Gemini pour expérimenter l'automatisation intelligente. Vous découvrirez rapidement le potentiel transformateur de MCP pour votre e-commerce.
