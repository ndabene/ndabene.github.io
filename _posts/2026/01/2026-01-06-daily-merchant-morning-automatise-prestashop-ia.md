---
layout: post
title: 'Fini le café devant Excel : Votre "Daily Merchant Morning" 100% automatisé avec PrestaShop et l''IA 🚀'
date: 2026-01-06
lang: fr
ref: daily-merchant-morning-automation
author: Nicolas Dabène
categories:
- IA
- PrestaShop
- E-commerce
- Automatisation
tags:
- IA
- PrestaShop
- n8n
- MCP
- Automatisation
- GPT-4
- E-commerce
excerpt: Découvrez comment transformer votre routine matinale e-commerce en recevant chaque matin un briefing stratégique complet généré par l'IA pendant que vous dormez. Un workflow n8n + MCP + PrestaShop qui change la donne.
image: /assets/images/blog/2026/01/2026-01-06-daily-merchant-morning.webp
featured: true
difficulty: Intermédiaire
technologies:
- PrestaShop
- n8n
- OpenAI GPT-4
- Model Context Protocol (MCP)
- HTML
estimated_reading_time: 12 minutes
---

Il est 7h55. Vous avez votre café en main. Vous ouvrez votre ordinateur, vous vous logguez sur le back-office de votre PrestaShop.

Clic sur "Tableau de bord". Clic sur "Commandes". Clic sur "Stats". Vous filtrez sur "Hier". Vous essayez de vous rappeler si le chiffre est meilleur que mardi dernier. Vous allez voir les stocks...

**Stop. 🛑**

Ce rituel, nous le connaissons tous. Il est rassurant, mais il est terriblement passif. Et si je vous disais que pendant que vous dormiez encore, une Intelligence Artificielle a déjà scanné votre boutique, analysé vos ventes, détecté une baisse de volume anormale et vous a préparé un briefing stratégique complet dans votre boîte mail ?

Ce n'est pas de la science-fiction. C'est ce que j'appelle le **"Daily Merchant Morning"**.

Aujourd'hui, je vais vous montrer comment construire ce système. Pas avec des usines à gaz ou des développements sur-mesure coûteux, mais avec une stack moderne, élégante et redoutable : **n8n, l'IA, et le standard qui est en train de tout changer : le protocole MCP**.

## Partie 1 : Le problème n'est pas la donnée, c'est l'attention

En tant que développeur et expert e-commerce, je fais un constat simple : **le commerçant moderne ne manque pas de données, il manque de clarté.**

PrestaShop regorge d'informations. Mais pour transformer ces lignes de commandes en décisions business, il faut du temps.

- "Est-ce que ma promo d'hier a fonctionné ?"
- "Pourquoi mon panier moyen baisse ?"
- "Quels produits vont être en rupture dans 48h ?"

Jusqu'à présent, pour répondre à ces questions automatiquement, il fallait :

- Soit payer des outils de B.I. (Business Intelligence) hors de prix.
- Soit demander à un développeur de créer des exports CSV complexes ou des scripts API fragiles.

Mais l'arrivée des **LLM (Large Language Models)** et des outils d'automatisation Low-Code comme **n8n** change la donne. Nous pouvons désormais créer des **Agents capables de raisonner sur la donnée**.

Le défi technique, c'était la connexion. Comment brancher "le cerveau" (ChatGPT) sur "la mémoire" (PrestaShop) de manière simple et sécurisée ?

C'est là qu'entre en scène le **Model Context Protocol (MCP)**.

## Partie 2 : Décryptage de l'architecture MCP (Le secret de la fluidité)

Oubliez les API REST classiques où vous devez coder chaque requête (`GET /orders?date=yesterday...`). Avec **MCP**, nous entrons dans l'ère de **l'IA outillée**.

Pour réaliser notre "Daily Merchant Morning", nous avons besoin d'une architecture précise côté PrestaShop. C'est comme une fusée à deux étages :

### 1. Le Socle : PrestaShop MCP Server 🛡️

C'est la fondation indispensable. Développé par la **Team PrestaShop** (et gratuit sur Addons), ce module transforme votre boutique en un "Serveur MCP".

Concrètement ? Il ouvre une porte sécurisée et standardisée. Il gère l'authentification et permet à un agent IA de se connecter à votre boutique sans que vous ayez à gérer des tokens OAuth complexes manuellement.

**C'est le tuyau.**

### 2. Le Carburant : MCP Tools Plus ⚡

Une fois le tuyau posé, il faut faire passer des choses intéressantes dedans. Le serveur de base est génial, mais pour une analyse business poussée, il nous faut des **outils spécifiques**.

C'est là qu'intervient **MCP Tools Plus** (le module BusinessTech/PrestaModule). Il vient se greffer sur le serveur pour ajouter des "Tools" avancés que l'IA va pouvoir appeler :

- `get_advanced_sales_stats` : Pour avoir le CA, le panier moyen, la comparaison N-1.
- `get_best_sellers` : Pour identifier les produits stars de la veille.
- `analyze_stock_levels` : Pour repérer les urgences logistiques.

C'est cette combinaison **Infrastructure (PrestaShop) + Intelligence (Tools Plus)** qui rend le système surpuissant.

## Partie 3 : La mise en pratique (Votre Workflow n8n)

Passons au concret. Voici comment j'ai orchestré tout ça dans n8n.

**L'objectif :** Recevoir un email formaté HTML chaque matin à 7h00.

### Le Workflow en un coup d'œil

![Workflow n8n Daily Merchant Morning](/assets/images/blog/2026/01/2026-01-06-workflow-n8n.webp)
*Le schéma de mon workflow actuel*

Voici la mécanique, étape par étape :

#### Étape 1 : Le Réveil (Schedule Trigger)

Rien de sorcier ici. Un nœud cron configuré sur **Every Day at 07:00**. La régularité est la clé du rituel.

#### Étape 2 : Le Cerveau (AI Agent + MCP Client)

C'est ici que **la magie opère**.

J'utilise un nœud **AI Agent** (connecté à OpenAI GPT-4o ou un modèle performant). Mais attention, je ne lui donne pas juste du texte. Je lui attache un "Tool" via le nœud **MCP Client**.

Dans la configuration du MCP Client, je renseigne simplement les accès fournis par le module PrestaShop.

La beauté du truc ? **Je n'ai pas besoin de dire à l'IA comment aller chercher le CA.**

Mon prompt système ressemble à ça :

```
Tu es un expert E-commerce. Utilise les outils à ta disposition pour récupérer les ventes d'hier.
Compare-les à la même journée de la semaine passée. Identifie les produits en alerte stock.
Rédige un rapport de synthèse au format HTML.
```

L'IA va d'elle-même décider : *"Tiens, pour répondre à Nicolas, je vais utiliser l'outil `get_sales_stats` du module MCP Tools Plus."*

#### Étape 3 : Le Résultat (Gmail)

L'agent me renvoie un bloc de code HTML parfaitement structuré. Je n'ai plus qu'à le passer dans le nœud **Gmail** pour l'envoyer.

### Le Rendu Final

Et voilà ce qui arrive dans ma poche au réveil :

![Exemple de mail Daily Merchant Morning](/assets/images/blog/2026/01/2026-01-06-mail-demo.webp)
*Le rendu du mail matinal généré par l'IA*

Regardez le niveau de détail :

- **KPIs Dynamiques** : Variation de CA, panier moyen.
- **Analyse Sémantique** : L'IA a écrit : *"Bien, mais pas suffisant. Le volume recule..."*. Elle **interprète** les chiffres !
- **Actions Prioritaires** : Elle me suggère de *"Booster l'acquisition sur le Top 3"*. Elle devient **force de proposition**.

## Partie 4 : Vision & Impact Futur 🔮

Ce que nous venons de voir dépasse le simple gadget technique. C'est un **changement de paradigme** pour nous, développeurs et e-commerçants.

### 1. Le rôle du développeur évolue.

Nous ne sommes plus seulement des "pisseurs de code" qui créent des modules rigides. Nous devenons des **orchestrateurs**. Notre valeur ajoutée réside dans notre capacité à connecter des briques intelligentes (PrestaShop, MCP, IA) pour créer des **flux de valeur**.

### 2. Le commerce devient proactif.

Avec ce type de workflow, le marchand ne subit plus sa journée. Il l'attaque avec un **plan de bataille** généré sur la base de données réelles. On passe du "Constat" à "L'Action".

### 3. L'accessibilité technique.

Grâce à MCP, l'IA "comprend" votre boutique. Demain, ce workflow pourra être adapté pour :

- Répondre automatiquement aux avis clients.
- Générer des descriptions produits basées sur vos meilleures ventes.
- Réorganiser votre page d'accueil en fonction des tendances de la veille.

Les possibilités sont **infinies**, et la barrière technique n'a jamais été aussi basse.

## Conclusion : Prenez de l'avance

L'automatisation n'est pas là pour remplacer le commerçant, mais pour lui rendre la ressource la plus précieuse : **son temps de cerveau disponible**.

Mettre en place ce "Daily Merchant Morning", c'est s'offrir un assistant data analyst senior, disponible 24/7, pour le prix de quelques tokens API.

---

## 🎁 Envie de mettre ça en place demain matin ?

Je sais que configurer n8n, trouver les bons prompts pour avoir un beau tableau HTML et régler les connexions MCP peut être intimidant si c'est une première fois.

Pour vous faire gagner du temps, **j'ai exporté mon Workflow n8n complet** (fichier JSON).

Il est prêt à l'emploi. Il contient :

- ✅ La structure complète du flux.
- ✅ Le System Prompt avancé (optimisé pour l'analyse e-commerce et le rendu HTML).
- ✅ La pré-configuration pour les outils MCP Tools Plus.

Pour démarrer, il vous suffit de suivre ces 3 étapes :

1. Installer le module gratuit **PrestaShop MCP Server** pour sécuriser la connexion.
2. Ajouter le module **MCP Tools Plus** pour débloquer les outils d'analyse IA.
3. Télécharger le fichier JSON ci-dessous et l'importer dans n8n.

👉 [**Télécharger le Workflow JSON "Daily Merchant Morning" ici**](https://ndabene.lemonsqueezy.com/buy/715fe7f7-8e2e-41af-8683-8b4a7178bd7c)

**À vous de jouer.** Faites travailler votre boutique pour vous, pas l'inverse !

---

*Vous avez aimé cet article ? Partagez-le à un ami e-commerçant qui passe trop de temps sur Excel ! 🚀*
