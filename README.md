# Projet Groupomania

Projet réalisé dans le cadre d'un projet de fin d'étude de la formation Open Classroom.

On livre ici deux projets:
 - Une application frontend VueJs se trouvant dans le dossier ./front.
 - Une api développé en NodeJS présente dans le dossier ./back
 - # Projet Groupomania Frontend

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

L'application est desormais disponible sur le navigateur à l'adresse [http://localhost:8080/](http://localhost:8080/)
