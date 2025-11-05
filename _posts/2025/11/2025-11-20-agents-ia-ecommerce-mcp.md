---
layout: post
title: "Agents IA et e-commerce : pourquoi exécuter du code vaut mieux qu'appeler des outils"
date: 2025-11-20
author: Nicolas Dabène
categories: [IA, E-commerce, Automatisation, Anthropic]
tags: [MCP, PrestaShop, AI, Agents, Code Execution]
excerpt: "De la méthode 'tool calling' à l'exécution de code avec MCP — comment la nouvelle approche d'Anthropic révolutionne la manière dont les agents IA interagissent avec les plateformes e-commerce."
image: /assets/images/blog/2025/11/mcp-code-execution-ecommerce.jpg
featured: false
difficulty: "Avancé"
technologies: ["MCP", "Anthropic", "PHP", "TypeScript", "PrestaShop"]
estimated_reading_time: "12 minutes"
---

# 🧠 Agents IA et e-commerce : pourquoi exécuter du code vaut mieux qu'appeler des outils

Chaque génération d'agents IA promet plus d'autonomie.
Pourtant, à mesure qu'ils gagnent en puissance, un problème persiste : **le coût du contexte**.

Chaque fois qu'un agent veut interagir avec une base de données, une API ou un CRM, il doit tout décrire au modèle : quoi faire, comment le faire, avec quelles données.
Résultat : des milliers de tokens gaspillés, des latences énormes, et des coûts qui explosent.

Fin 2024, **Anthropic** a proposé une réponse élégante : le **Model Context Protocol (MCP)** — un standard ouvert qui permet aux modèles d'IA **de se connecter à des outils et d'exécuter du code directement**, plutôt que de tout passer par le modèle.

Et cette évolution pourrait bien redéfinir la manière dont nous automatisons nos boutiques e-commerce.

---

## ⚙️ Qu'est-ce que le Model Context Protocol ?

Le **MCP** (*Model Context Protocol*) est un protocole ouvert qui définit **comment un agent IA communique avec des serveurs d'outils**.
Chaque serveur MCP expose des capacités — par exemple : récupérer des commandes, modifier un produit, générer un rapport — sous une forme standardisée (schémas, entrées, sorties, documentation).

Objectif : offrir un langage universel entre les modèles d'IA et les systèmes métiers, sans passer par des prompts flous ni des API propriétaires.

Mais ce qui rend MCP passionnant, ce sont les **deux façons de l'utiliser**.

---

## 🧩 1️⃣ L'approche "Tool Calling Direct"

C'est la méthode historique.
Le modèle charge **toutes les définitions d'outils** dans son contexte, puis appelle chaque outil séparément.

Avantage : simplicité.
Inconvénients :
- chaque schéma d'outil prend de la place dans la mémoire du modèle ;
- chaque résultat complet (parfois volumineux) transite par le modèle ;
- la latence et le coût explosent dès qu'on dépasse quelques milliers d'éléments.

### 🧾 Exemple e-commerce classique

Imaginons une IA connectée à une boutique PHP.
Elle veut **résumer les ventes du jour**.

```php
$orders = MCP::call('orders.getOrders', ['date' => '2024-11-05']);
$summary = OpenAI::summarize([
  'instruction' => 'Résume les ventes du jour',
  'data' => json_encode($orders)
]);
```

➡️ Le modèle reçoit ici toutes les commandes, parfois des dizaines de milliers de lignes JSON.
Il doit tout lire, tout comprendre, tout reformater.
Résultat : lent, cher, et fragile.

---

## ⚡ 2️⃣ L'approche "Code Execution with MCP"

C'est la grande nouveauté introduite par Anthropic.

Au lieu d'appeler les outils directement via le modèle, le modèle écrit et exécute un petit script (TypeScript, Python, PHP…) dans une sandbox sécurisée connectée aux serveurs MCP.

L'agent IA devient alors un développeur interne :
il écrit du code, l'exécute, filtre les résultats, et ne renvoie au modèle que ce qui est pertinent.

Résultat :
- seules les définitions d'outils nécessaires sont chargées ;
- les gros volumes de données ne passent plus par le modèle ;
- la consommation de tokens chute de plus de 98 % dans les tests d'Anthropic.

---

## 🛍️ Application concrète : l'agent e-commerce qui exécute du code

Imaginons un agent IA relié à une boutique PrestaShop.
Sa mission : analyser les commandes du jour et produire un rapport clair pour le marchand.

### 🧮 Approche classique : tout passe par le modèle

1. l'agent charge toutes les commandes du jour via API ;
2. il envoie les données au modèle pour calcul ;
3. le modèle résume et reformate ;
4. puis on renvoie la sortie vers le serveur.

Résultat : des milliers de tokens, des secondes de latence, et des données sensibles qui quittent la boutique.

### 🧩 Approche moderne : Code Execution avec MCP

Le modèle écrit et exécute un petit script PHP :

```php
<?php
use MCP\Tool\Http;
use MCP\Tool\OpenAI;

$orders = Http::get('https://shop.example.com/api/orders?date=2024-11-05');

// Agrégation locale (pas de passage par le modèle)
$summary = [
  'total_orders' => count($orders),
  'revenue' => array_sum(array_column($orders, 'total_paid')),
  'top_products' => array_slice(
    array_count_values(array_column($orders, 'product_name')),
    0, 3
  ),
];

// L'IA intervient uniquement pour rédiger le rapport
$report = OpenAI::generate([
  'instruction' => 'Rédige un résumé clair des ventes du jour.',
  'data' => json_encode($summary)
]);

file_put_contents('reports/2024-11-05.txt', $report);
?>
```

🧠 Ici, 95 % du travail est effectué localement : l'IA ne lit que le résumé final.
Le modèle devient sobre, rapide et précis.

---

## 📊 Comparatif des deux approches

| Critère | Tool Calling Direct | Code Execution avec MCP |
|---------|---------------------|-------------------------|
| **Consommation tokens** | Très élevée | Drastiquement réduite |
| **Latence** | Forte (beaucoup d'échanges) | Faible (calculs locaux) |
| **Sécurité** | Données transmises au modèle | Données traitées côté serveur |
| **Simplicité** | Facile à implémenter | Demande un environnement sandbox |
| **Évolutivité** | Limitée | Chaque script devient un "skill" réutilisable |

---

## 🚀 Ce que cela change pour le e-commerce

L'exécution de code avec MCP ouvre la voie à des agents capables de :

- Générer des rapports automatisés en PHP ou TypeScript,
- Calculer des indicateurs en direct sur les commandes,
- Identifier des anomalies produits,
- Mettre à jour des stocks ou relancer des clients,

sans jamais saturer le modèle d'informations inutiles.

On passe d'une IA "consultante" à une IA "opératrice" :
elle agit dans le système, plutôt que d'en parler.

---

## 🧭 Vision : la fusion entre IA et développement

Ce que propose Anthropic dépasse la simple optimisation technique.
C'est une nouvelle grammaire de collaboration entre les modèles et le code.

Le développeur écrit les outils.
L'IA apprend à les utiliser.
Puis elle écrit elle-même le code qui les orchestre.

Demain, nos agents ne seront plus de simples "prompts intelligents",
mais de véritables collaborateurs techniques capables de concevoir, tester et exécuter du code métier.

---

## ✨ Conclusion

Le futur du e-commerce ne se jouera pas sur le nombre de tokens,
mais sur la capacité des IA à agir efficacement à travers le code.

Grâce au Model Context Protocol, un modèle ne décrit plus ce qu'il ferait — il le fait.

Et pour nous, développeurs et marchands, c'est la promesse d'une automatisation plus fluide, plus sûre, et infiniment plus intelligente.

---

## 🧩 Sources

- [Anthropic — Code Execution with MCP: Building more efficient agents](https://www.anthropic.com/news/mcp-code-execution)
- [Model Context Protocol — Documentation officielle (GitHub)](https://github.com/anthropics/mcp)

---

*Article publié le 20 novembre 2025 par Nicolas Dabène - Expert e-commerce et IA avec 15+ ans d'expérience*
