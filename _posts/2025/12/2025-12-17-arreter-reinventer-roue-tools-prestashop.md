---
layout: post
title: "Arrêtez de réinventer la roue : 5 pépites cachées dans le fichier Tools.php de PrestaShop"
date: 2025-12-17
lang: fr
ref: prestashop-tools-hidden-gems
author: Nicolas Dabène
categories:
- PrestaShop
- Développement
- Best Practices
tags:
- prestashop
- legacy-code
- productivity
- php
- backend
excerpt: >
  Vous pensez que le "Clean Code" est la seule voie ? Détrompez-vous. Parfois, l'efficacité brutale se cache dans les vieux greniers. J'ai fouillé le fichier Tools.php pour vous : voici 5 fonctions natives à utiliser absolument avant de recoder quoi que ce soit.
image: /assets/images/blog/2025/12/2025-12-17-prestashop-tools-legacy.jpg
difficulty: Intermédiaire
technologies:
- PrestaShop 9
- PHP
- Legacy Code
estimated_reading_time: 10 minutes
faq:
- question: "La classe Tools n'est-elle pas un anti-pattern ?"
  answer: "D'un point de vue architecture pure, oui. Mais dans le contexte PrestaShop, c'est une bibliothèque utilitaire éprouvée qui gère des cas limites que vous n'avez probablement pas anticipés."
- question: "Ces fonctions sont-elles compatibles avec PrestaShop 9 ?"
  answer: "Oui, toutes les fonctions présentées sont maintenues dans la dernière version de PrestaShop et le resteront pour des raisons de rétrocompatibilité."
- question: "Puis-je utiliser Tools dans mes modules ?"
  answer: "Absolument ! C'est même recommandé pour rester cohérent avec l'écosystème PrestaShop et bénéficier des correctifs de sécurité du core."
---

# Arrêtez de réinventer la roue : 5 pépites cachées dans le fichier Tools.php de PrestaShop

## 🧠 Introduction : Le paradoxe du développeur moderne

Il y a une tension que je ressens souvent quand je discute avec des développeurs qui viennent de l'univers Symfony pur.

D'un côté, l'idéal : le code propre, découplé, respectueux des principes SOLID.
De l'autre, la réalité du terrain e-commerce : un client pressé, un serveur mutualisé configuré étrangement, et le besoin d'aller vite.

L'intuition nous pousse à fuir la classe `Tools` de PrestaShop. C'est ce qu'on appelle une "God Class". Un fichier monolithique de plus de 4000 lignes (dans la branche develop) qui fait tout : gestion de fichiers, HTTP, chaînes de caractères...

Pourtant, aujourd'hui, je vais vous demander de faire quelque chose de contre-intuitif : **arrêtez de réécrire des helpers que PrestaShop maintient depuis 15 ans**.

J'ai audité le code source de la dernière version pour vous. Voici 5 fonctions bien réelles (pas d'hallucination ici) qui vont simplifier votre code et le rendre plus robuste.

## ⚡ Partie 1 – Contexte : Pourquoi fouiller dans ce fichier ?

Dans l'architecture logicielle moderne, une classe pleine de méthodes statiques comme `Tools::maMethode()`, c'est souvent considéré comme une mauvaise pratique (couplage fort).

Mais `Tools.php` est la mémoire immunitaire de PrestaShop.
Chaque ligne de code un peu bizarre, chaque `if` imbriqué dans ce fichier est souvent la cicatrice d'un vieux bug ou d'une compatibilité serveur obscure que vous n'avez pas encore rencontrée.

**L'enjeu** : Est-ce que vous voulez passer 3 heures à coder une suppression récursive de dossiers qui gère les permissions Windows et Linux, ou utiliser une ligne de code éprouvée ?

À l'ère de l'IA et de l'automatisation, la vraie compétence n'est plus de savoir coder une boucle, mais de savoir **quelle brique utiliser** pour construire solide.

## 🚀 Partie 2 – Analyse : 5 fonctions natives (et vérifiées)

Oubliez les fonctions imaginaires. Voici ce qui se trouve réellement dans le moteur de PrestaShop et que vous devriez utiliser.

### 1. Tools::getOctets() : Comprendre le langage du serveur

**Le problème** : Vous voulez vérifier si un fichier uploadé dépasse la limite `upload_max_filesize` du php.ini. Vous récupérez la valeur avec `ini_get` et PHP vous répond fièrement `"128M"` ou `"2G"`.
Si vous essayez de comparer ça mathématiquement (`if $file_size > "128M"`), ça plante ou ça ne veut rien dire.

**La solution PrestaShop** :
N'écrivez pas votre propre switch/case pour multiplier par 1024.

```php
$maxSize = Tools::getOctets(ini_get('upload_max_filesize'));
// Si la config est "128M", retourne l'entier : 134217728
```

C'est tout bête, c'est fiable, et ça gère les K, M, G sans que vous ayez à y penser.

### 2. Tools::deleteDirectory() : Le grand nettoyage sans douleur

**Le problème** : Supprimer un dossier en PHP est une plaie. La fonction `rmdir()` ne marche que si le dossier est vide. Vous devez donc coder une fonction récursive qui ouvre le dossier, liste les fichiers, les supprime un par un, descend dans les sous-dossiers... Une horreur à maintenir.

**La solution PrestaShop** :
PrestaShop le fait nativement, et gère même les fichiers cachés (sauf `.svn` et `.git`, pratique pour les devs).

```php
if (Tools::deleteDirectory($monDossierTemporaire)) {
    // Dossier et tout son contenu supprimés proprement.
}
```

C'est une fonction que je vois réécrite dans 50% des modules tiers. Arrêtez. Utilisez celle-ci.

### 3. Tools::str2url() : Le roi du SEO

**Le problème** : Vous devez générer un "slug" (URL simplifiée) à partir d'un nom de produit : `"Noël & Merveilles : l'édition 2025 !"`.
Il faut gérer les accents, les espaces, la ponctuation, les majuscules...

**La solution PrestaShop** :
C'est la fonction utilisée par le cœur pour générer les URLs des produits.

```php
$slug = Tools::str2url("Noël & Merveilles : l'édition 2025 !");
// Résultat : "noel-merveilles-l-edition-2025"
```

Elle utilise `iconv` ou `mb_string` selon ce qui est dispo sur le serveur pour nettoyer les encodages exotiques. C'est le standard de facto pour rester cohérent avec le reste de la boutique.

### 4. Tools::getRemoteAddr() : Plus malin que $_SERVER

**Le problème** : Vous voulez l'IP du client pour un log de sécurité. Le réflexe : `$_SERVER['REMOTE_ADDR']`.
**Le piège** : Si la boutique utilise Cloudflare ou un Load Balancer, `REMOTE_ADDR` vous donnera l'IP de Cloudflare, pas celle du client.

**La solution PrestaShop** :
Cette fonction est paranoïaque. Elle vérifie une cascade d'en-têtes (`HTTP_CLIENT_IP`, `HTTP_X_FORWARDED_FOR`, etc.) pour trouver la vraie IP de l'internaute.

```php
// Indispensable pour les modules de paiement ou anti-fraude
$userIp = Tools::getRemoteAddr();
```

**Note** : Elle gère même l'anonymisation si nécessaire selon la configuration.

### 5. Tools::file_get_contents() : Le diplomate réseau

**Le problème** : Vous devez appeler une API externe (récupérer un JSON, un taux de change). Vous utilisez la fonction native PHP `file_get_contents()`.
**Le crash** : Sur l'hébergement mutualisé de votre client, `allow_url_fopen` est désactivé pour la sécurité. Votre module plante.

**La solution PrestaShop** :
Cette méthode (qui porte le même nom que la native, d'où la confusion parfois) est un wrapper intelligent.

- Elle vérifie si cURL est dispo et l'utilise en priorité (plus rapide, plus sécurisé).
- Sinon, elle tente la méthode native.
- Elle gère les timeouts et les contextes SSL.

```php
$json = Tools::file_get_contents('https://api.mon-service.com/data');
```

C'est le 4x4 des requêtes HTTP simples (GET). Pour du POST complexe, on préférera Guzzle (intégré dans les versions récentes), mais pour un appel rapide, Tools reste imbattable.

## 🧮 Partie 3 – Application concrète : Le réflexe senior

Imaginons un scénario fréquent : Vous créez un module qui génère un fichier CSV d'export catalogue et l'envoie sur un serveur distant.

**Approche "Je recode tout"** :
Vous passez 2h à écrire une fonction pour nettoyer les noms de fichiers, une autre pour vérifier la taille limite mémoire, et une librairie Curl pour l'envoi.

**Approche "Orchestrateur" (avec Tools)** :

```php
public function exportCatalog($name) {
    // 1. Nettoyage du nom du fichier (SEO friendly, sans espace)
    $safeName = Tools::str2url($name) . '.csv';

    // 2. Vérification qu'on ne va pas exploser la mémoire du serveur
    $memoryLimit = Tools::getOctets(ini_get('memory_limit'));
    if ($memoryLimit < 128000000) { // < 128Mo
        throw new Exception("Augmentez votre memory_limit !");
    }

    // 3. Si l'export existe déjà, on supprime le dossier temporaire précédent
    if (is_dir(_PS_TMP_IMG_DIR_ . 'export')) {
        Tools::deleteDirectory(_PS_TMP_IMG_DIR_ . 'export');
    }

    // ... logique d'export ...
}
```

Ce code est plus court, plus lisible, et surtout, il se comportera de manière prévisible sur n'importe quel hébergement PrestaShop.

## 🌍 Partie 4 – Vision : L'IA et l'Archéologie du Code

Pourquoi je vous parle de `Tools.php` en 2025 ?

Parce que le métier de développeur change. Avec l'arrivée des assistants IA (Copilot, ChatGPT, Claude), générer du code est devenu trivial. Mais **générer du code adapté au contexte** est rare.

Si vous demandez à une IA *"Fais-moi une fonction pour supprimer un dossier"*, elle va vous sortir un snippet générique de StackOverflow.
Si vous lui dites *"Utilise `Tools::deleteDirectory` de PrestaShop"*, vous économisez des lignes de code et de la dette technique.

**Le développeur du futur est un orchestrateur**. Il connaît les outils à sa disposition dans le framework (même les vieux outils "legacy") pour assembler des solutions robustes sans réinventer l'eau chaude.

## 🎯 Conclusion

Ne soyez pas snob avec le code "Legacy". PrestaShop tourne sur des centaines de milliers de boutiques grâce à la résilience de fichiers comme `Tools.php`.

La prochaine fois que vous avez une tâche utilitaire à faire (manipuler une URL, nettoyer un fichier, vérifier une IP), ayez le réflexe d'ouvrir ce fichier sur GitHub ou dans votre IDE. Faites un `CTRL+F`.

**La bienveillance en code, c'est de s'appuyer sur le travail des autres pour se concentrer sur la valeur ajoutée de votre projet.**

Bon code à tous ! 🚀
