# Compte Rendu de TP - Angular Pokédex

## Installation

1. Cloner le projet sur votre machine locale.
2. Ouvrir le projet dans votre IDE.
3. Ouvrir un terminal et exécuter la commande `npm install` pour installer les dépendances.
4. Exécuter la commande `ng serve` pour lancer le serveur de développement.
5. Ouvrir un navigateur et accéder à l'adresse `http://localhost:4200/`.

## Fonctionnalités du Pokédex Angular

Le Pokédex Angular que nous avons développé offre les fonctionnalités suivantes :

1. **Recherche par Nom ou ID:**
   - Les utilisateurs peuvent rechercher un Pokémon en saisissant son nom ou son ID dans un champ de recherche.

2. **Affichage des informations Pokémon:**
   - Les informations détaillées d'un Pokémon, telles que l'ID, le nom en français, les types, et les statistiques, sont affichées.

3. **Navigation dans l'interface:**
   - Les utilisateurs peuvent se déplacer dans l'interface pour sélectionner différents Pokémon. La navigation peut se faire de manière séquentielle ou aléatoire.

4. **Affichage en mode liste:**
   - Une vue en mode liste permet aux utilisateurs de visualiser tous les Pokémon disponibles.

## Technologies utilisées

- **TailwindCSS:** Le Framework TailwindCSS a été choisi pour styliser l'interface utilisateur.

## Points à souligner

- **Différence entre `(ngModel)` et `[(ngModel)]`:**
  Nous avons pris le temps de clarifier la distinction entre `(ngModel)` (pour les événements de sortie) et `[(ngModel)]` (pour le data-binding bidirectionnel).

- **Différence dans la consommation d'API REST:**
En provenance de frameworks tels que Vue.js, nous avons noté une différence notable dans la manière dont Angular gère la consommation d'API REST. Alors que dans d'autres frameworks, l'approche peut souvent être basée sur des await et des promesses (Promise), Angular adopte un modèle basé sur des observables. Les promesses traitent des valeurs asynchrones uniques, tandis que les observables gèrent des flux continus de valeurs asynchrones avec des fonctionnalités plus avancées.