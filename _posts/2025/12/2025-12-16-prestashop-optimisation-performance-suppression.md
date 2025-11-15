---
layout: post
title: 'PrestaShop Optimisation Performance : Arrêtez d''Ajouter, Supprimez !'
date: 2025-12-16
author: Nicolas Dabène
categories:
- Tutoriel
- PrestaShop
- E-commerce
tags:
- prestashop
- optimisation
- performance
- vitesse
- nettoyage
- core-web-vitals
- e-commerce
excerpt: 'Votre PrestaShop est lent avec plus de 50 modules ? Découvrez comment une optimisation par la suppression peut booster votre performance. Gagnez en vitesse de chargement, améliorez vos Core Web Vitals et votre SEO en nettoyant votre boutique.'
image: /assets/images/blog/2025/12/2025-12-16-prestashop-optimisation-performance-suppression.webp
featured: false
difficulty: Intermédiaire
technologies:
- PrestaShop
estimated_reading_time: 12 minutes
faq:
- question: "Pourquoi mon site PrestaShop est-il si lent ?"
  answer: "La lenteur d'un site PrestaShop provient souvent d'une accumulation : trop de modules (même inactifs), des images non optimisées, une base de données surchargée par d'anciennes données, et un thème lourd ou mal codé. Chaque ajout, même petit, contribue à alourdir le système."
- question: "Combien de modules est-ce trop pour PrestaShop ?"
  answer: "Il n'y a pas de chiffre magique, mais la plupart des experts s'accordent à dire qu'au-delà de 40-50 modules, la performance commence à se dégrader notablement. La qualité et l'utilité des modules sont plus importantes que leur nombre, mais la quantité finit toujours par avoir un impact négatif."
- question: "Quelle est la différence entre désactiver et désinstaller un module PrestaShop ?"
  answer: "Désactiver un module l'empêche de s'exécuter sur le front-office, mais ses fichiers restent sur le serveur et ses tables dans la base de données. Désinstaller supprime complètement le module, ses fichiers et, idéalement, nettoie la base de données. Pour une réelle optimisation, la désinstallation est nécessaire."
- question: "Supprimer des modules peut-il casser mon site ?"
  answer: "Oui, c'est un risque. Il est impératif de faire une sauvegarde complète (fichiers + base de données) avant toute suppression. Procédez module par module sur un environnement de pré-production pour tester l'impact et vous assurer qu'aucune fonctionnalité essentielle n'est cassée."
- question: "Le nettoyage de la base de données est-il vraiment utile ?"
  answer: "Absolument. Des tables de statistiques, de logs ou de paniers abandonnés peuvent contenir des millions de lignes inutiles, ralentissant chaque requête à la base de données. Un nettoyage régulier peut considérablement accélérer le back-office et le front-office."
---

# PrestaShop Optimisation Performance : Arrêtez d'Ajouter, Commencez à Supprimer !

Votre site PrestaShop est lent ? Votre premier réflexe est probablement de chercher sur la marketplace Addons "LE" module de cache ou d'optimisation miracle qui va tout résoudre. C'est une réaction normale, nourrie par un dogme tenace dans l'écosystème e-commerce : pour améliorer, il faut ajouter. Je vous propose aujourd'hui d'inverser totalement ce paradigme. La véritable **PrestaShop optimisation performance** en 2025 ne consiste pas à ajouter une couche de complexité, mais à en retirer.

Le problème est simple : chaque module, chaque image, chaque fonctionnalité ajoutée est une brique de plus sur un mur déjà chancelant. Individuellement, l'impact semble minime. Collectivement, c'est la garantie d'un site qui rame, de clients qui fuient et d'un score Google PageSpeed qui vire au rouge écarlate. La vraie optimisation, la plus efficace et la plus durable, c'est la dé-complexification. C'est un grand nettoyage de printemps.

Dans ce guide contre-intuitif, nous n'allons pas installer un énième module. Nous allons apprendre à identifier et à supprimer sans pitié tout ce qui alourdit inutilement votre boutique pour retrouver un site rapide, efficace et apprécié par Google et vos clients.

## Le Mythe de l'Optimisation par l'Ajout : Une Dangereuse Illusion

Le marché des modules PrestaShop est florissant, et pour cause : il répond à une demande. "Comment ajouter X ?", "Comment améliorer Y ?". Le réflexe est de chercher un module, l'installer, et passer à autre chose. Mais c'est un piège.

*   **Conflits potentiels** : Chaque module ajoute du code PHP, JavaScript et CSS. Plus il y en a, plus le risque de conflits qui cassent l'affichage ou les fonctionnalités est élevé.
*   **Surcharge de la base de données** : De nombreux modules créent leurs propres tables dans la base de données, ajoutent des requêtes à chaque chargement de page et alourdissent l'ensemble.
*   **Maintenance complexifiée** : Mettre à jour 60 modules est un casse-tête bien plus grand que d'en gérer 20, augmentant les risques de sécurité si les mises à jour ne sont pas faites.
*   **Effet "pansement sur une jambe de bois"** : Un module de cache est utile, mais si vous l'installez sur un site déjà obèse, il ne fera que masquer la misère. La solution est de soigner la cause, pas seulement le symptôme.

La vérité, c'est qu'un PrestaShop "vanilla" (une installation propre) est nativement rapide. C'est ce que **vous** y ajoutez qui le ralentit. L'objectif est donc de tendre vers cette simplicité originelle, pas de s'en éloigner.

## Audit Express : Comment Identifier ce qui Ralentit VRAIMENT votre PrestaShop ?

Avant de supprimer quoi que ce soit, il faut mesurer. Agir à l'aveugle est le meilleur moyen de casser votre boutique.

### 1. Mesurez la Performance Actuelle

Utilisez des outils externes pour avoir une vision objective. Ne vous fiez pas à votre propre perception, souvent faussée par le cache de votre navigateur.

*   **Outils recommandés** :
    *   [Google PageSpeed Insights](https://pagespeed.web.dev/) : Indispensable pour connaître votre score aux yeux de Google et vos Core Web Vitals (LCP, FID/INP, CLS).
    *   [GTmetrix](https://gtmetrix.com/) : Fournit une "cascade" (waterfall) très visuelle qui montre le temps de chargement de chaque fichier (CSS, JS, images). C'est une mine d'or pour identifier les coupables.

Lancez plusieurs tests sur votre page d'accueil, une page catégorie et une page produit pour avoir une vision complète. Notez les scores. C'est votre point de départ.

### 2. Activez le Mode "Profiling" de PrestaShop

C'est l'arme secrète intégrée à PrestaShop. Le mode "Profiling" (ou profilage) vous montre en détail ce qui se passe sur votre serveur à chaque chargement de page.

1.  **Pour l'activer** : Allez dans le fichier `config/defines.inc.php` de votre installation PrestaShop.
2.  Trouvez la ligne `define('_PS_MODE_DEV_', false);` et passez-la à `true`.
3.  Juste en dessous, la ligne `define('_PS_DEBUG_PROFILING_', false);` doit être passée à `true`.
4.  Enregistrez le fichier.

Maintenant, en bas de chaque page de votre site (front et back-office), vous verrez un tableau détaillé montrant le temps d'exécution des hooks, des modules et des requêtes SQL. C'est ici que vous démasquerez les modules trop gourmands.

## Les 5 Catégories d'Éléments à Supprimer d'Urgence

Armé de vos mesures, il est temps de passer à l'action. Voici les cibles prioritaires.

### 1. Les Modules "Gadgets" et Inutilisés

Faites une liste honnête de tous vos modules. Pour chacun, posez-vous la question : "Ce module génère-t-il directement du chiffre d'affaires ou améliore-t-il une fonctionnalité **critique** pour mes clients ?".

*   Les modules de "flocons de neige à Noël".
*   Les pop-ups de notifications "machin a acheté truc" qui agacent plus qu'ils ne convertissent.
*   Les 3 modules de slider différents installés "pour tester".
*   Les modules qui n'ont pas été mis à jour depuis 2 ans.

**Action** : Désactivez-les un par un, en re-testant la performance à chaque fois. Si l'impact est positif et que le site fonctionne toujours, **désinstallez-les complètement**.

### 2. Le Thème et les Modules de Démo

Quand vous installez un thème premium, il vient souvent avec des dizaines de modules et d'options pour construire n'importe quel type de site. C'est bien pour la démo, mais un désastre pour la production.

*   Désinstallez les modules liés au thème que vous n'utilisez pas (ex: le blog si vous n'en avez pas, le lookbook, le portfolio...).
*   Dans les options du thème, désactivez toutes les fonctionnalités non essentielles (animations, effets de survol complexes, etc.).

### 3. La Base de Données : le Grenier Numérique

Votre base de données est comme un grenier. Avec le temps, elle accumule des tonnes de choses inutiles qui la rendent lente et difficile à parcourir.

*   **Statistiques** : Les statistiques internes de PrestaShop (`ps_connections`, `ps_page_not_found`, etc.) peuvent peser des Gigaoctets. Si vous utilisez un outil externe comme Google Analytics, ces données sont redondantes. Videz ces tables (après sauvegarde !).
*   **Paniers abandonnés** : Inutile de conserver les paniers abandonnés datant de plus de 6 mois.
*   **Anciennes commandes et clients** : Selon la législation, vous devez conserver les données, mais les très vieilles commandes pourraient être archivées.

Un nettoyage de base de données peut faire gagner plusieurs secondes de chargement, surtout dans le back-office.

### 4. Les Surcharges (Overrides) Obsolètes

Les surcharges permettent de modifier le comportement du cœur de PrestaShop sans le toucher directement. C'est une bonne pratique, mais les surcharges laissées par d'anciens modules désinstallés peuvent créer des bugs et des lenteurs.

**Action** : Vérifiez le dossier `/override/` de votre installation. Comparez les fichiers présents avec la liste de vos modules actifs. Si vous trouvez des surcharges d'un module que vous avez supprimé, sauvegardez-les puis supprimez-les du dossier. Videz ensuite le cache (via `var/cache`).

### 5. Les Médias : Images et Vidéos

Ce n'est pas une suppression à proprement parler, mais une optimisation drastique qui s'apparente à un régime. Selon des études de marché, le temps de chargement est un facteur clé de conversion.

*   **Images** : Aucune image ne devrait dépasser 150 Ko. Utilisez le format WebP, plus léger. Compressez systématiquement chaque visuel avec des outils comme [TinyPNG](https://tinypng.com/).
*   **Vidéos** : Ne les hébergez jamais sur votre serveur. Intégrez-les depuis YouTube ou Vimeo, en activant le "lazy loading".

Cette stratégie de simplification rappelle celle adoptée par des géants de la tech qui privilégient l'efficacité et la légèreté à la complexité.

## La Méthode de Nettoyage Pas à Pas (en toute sécurité)

1.  **Étape 0 : SAUVEGARDE COMPLÈTE !** C'est la règle d'or. Sauvegardez vos fichiers (via FTP) et votre base de données (via phpMyAdmin) avant de toucher à quoi que ce soit. Idéalement, faites toute la procédure sur un environnement de test (pré-production).
2.  **Étape 1 : Identifier une Cible** : Choisissez un module suspecté d'être lent ou inutile.
3.  **Étape 2 : Désactiver et Mesurer** : Désactivez-le dans le back-office. Videz le cache de PrestaShop. Relancez un test PageSpeed / GTmetrix. Le gain est-il significatif ? Le site fonctionne-t-il toujours correctement ?
4.  **Étape 3 : Supprimer Proprement** : Si les tests sont concluants, utilisez la fonction "Désinstaller" du module. Cela devrait supprimer ses fichiers et nettoyer la base de données.
5.  **Étape 4 : Vérification Finale** : Vérifiez que le dossier du module a bien disparu de `/modules/` et qu'il n'a pas laissé de surcharge orpheline.
6.  **Rincez et Répétez** : Passez au module suivant.

## Conclusion : La Performance par la Soustraction

L'optimisation de la performance PrestaShop n'est pas une course à l'armement, mais un art de l'épuration. En cessant de considérer l'ajout de modules comme la solution à tout, et en adoptant une démarche méthodique de suppression de l'inutile, vous obtiendrez des résultats bien plus spectaculaires et durables.

Un site plus léger est un site plus rapide. Un site plus rapide offre une meilleure expérience utilisateur, améliore le taux de conversion et est récompensé par Google avec un meilleur référencement. Avant d'acheter le prochain module "magique", posez-vous la question : "Que puis-je retirer aujourd'hui pour que mon site aille plus vite ?". La réponse est souvent la clé d'une **PrestaShop optimisation performance** réellement efficace.
