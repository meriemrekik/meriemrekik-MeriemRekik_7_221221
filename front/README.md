# Projet Groupomania Frontend

On a utilisé VueCli pour créer notre projet.

## Installation

Utiliser la commande suivante pour installer le projet

````
npm install
````


## Démarrage

### locale

Il faut utiliser la commande suivante pour lancer notre application en locale.

````
npm run serve
````

L'application est déjà configuré pour cibler une API lancé sur localhost:3000. Dans le cas où on aurait besoin de changer l'url de l'api il faut modifier le fichier ./src/config/developement.js

````
export default {
    API_URL: 'http://localhost:3000/api'
}
````