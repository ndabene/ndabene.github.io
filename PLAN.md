# Plan d'action pour la refonte du site MVP

Ce document détaille les étapes nécessaires pour transformer le site actuel en une version MVP (Minimum Viable Product) fonctionnelle, esthétique et professionnelle.

## Phase 1 : Correction de la structure et du contenu

### Étape 1.1 : Réparer la navigation et les liens

1.  **Corriger `_data/navigation.yml` :**
    *   Supprimer l'entrée "About" qui est redondante avec "Accueil".
    *   Ajouter une nouvelle entrée pour "Publications".
    *   Vérifier que tous les liens correspondent aux pages existantes.
2.  **Mettre à jour `_includes/header.html` :**
    *   Remplacer la navigation statique par une boucle Jekyll qui utilise `site.data.navigation` pour générer les liens dynamiquement (si ce n'est pas déjà fait).
    *   Assurer que le lien "Accueil" pointe vers `/` et que la classe `.active` est correctement appliquée.
3.  **Nettoyer les pages :**
    *   Supprimer les fichiers de page en double à la racine du projet (ex: `about.md`, `contact.md`, etc.).
    *   Garder uniquement les fichiers dans le dossier `pages/`.

### Étape 1.2 : Mettre à jour le contenu de la page d'accueil

1.  **Modifier `index.md` :**
    *   Remplacer le texte d'introduction par le nouveau contenu que vous avez fourni.
2.  **Mettre à jour les modules PrestaShop :**
    *   Créer un fichier `_data/modules.yml`.
    *   Y ajouter les nouveaux modules avec leur titre, une brève description, et le lien.
    *   Exemples : "Geo Suite", "Google Pay", "Facebook Dynamic Ads".
    *   Modifier `index.md` pour charger dynamiquement ces modules à partir du fichier de données.
3.  **Créer la section "Mes Publications" :**
    *   Créer un fichier `_data/publications.yml`.
    *   Y ajouter les articles externes avec leur titre et le lien.
    *   Exemples : "Optimiser les données structurées", "Tutoriel module Symfony", etc.
    *   Ajouter une nouvelle section sur `index.md` pour afficher ces publications.
4.  **Refactoriser la section "Expertise" (si nécessaire) :**
    *   S'assurer que le contenu de la section "Expertise" est chargé depuis `_data/expertise.yml` pour une maintenance facile.

## Phase 2 : Refonte du Design et des Styles

### Étape 2.1 : Définir une nouvelle identité visuelle

1.  **Palette de couleurs :**
    *   Ouvrir `_sass/variables.scss`.
    *   Définir une nouvelle palette de couleurs professionnelles (ex: un bleu marine pour le fond, un blanc cassé pour le texte, une couleur d'accentuation vive pour les liens et boutons).
2.  **Typographie :**
    *   Dans `_sass/variables.scss`, choisir des polices de caractères modernes et lisibles (ex: Inter, Poppins, ou Lato depuis Google Fonts).
    *   Définir des tailles de police claires pour les titres (`h1`, `h2`, `h3`) et le corps du texte.
3.  **Mise en page générale :**
    *   Dans `_sass/layout.scss`, ajuster les marges, le padding et la largeur maximale du conteneur pour une meilleure lisibilité et un aspect plus aéré.

### Étape 2.2 : Améliorer les composants UI

1.  **Barre de navigation (`_sass/navigation.scss`) :**
    *   Revoir complètement les styles pour qu'elle soit responsive, claire et moderne.
    *   Styliser l'état `:hover` et `.active` des liens.
2.  **Cartes (`_sass/components.scss`) :**
    *   Redessiner les cartes (projets, publications, expertise) avec des ombres subtiles, des bordures arrondies et des espacements cohérents.
3.  **Boutons (`_sass/components.scss`) :**
    *   Créer des styles de boutons primaires et secondaires distincts et attrayants.
4.  **Badges (`_sass/badges.scss`) :**
    *   Améliorer le design des badges de technologie pour qu'ils soient plus lisibles et visuellement intégrés au nouveau design.

## Phase 3 : Finalisation et Déploiement

1.  **Vérification complète :**
    *   Naviguer sur l'ensemble du site pour vérifier tous les liens.
    *   Tester l'affichage sur mobile, tablette et ordinateur.
2.  **Nettoyage final :**
    *   Supprimer tous les fichiers de données ou de style qui ne sont plus utilisés.
3.  **Déploiement :**
    *   Une fois que tout est validé, vous pourrez déployer la nouvelle version du site. 