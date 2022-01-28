# Projet Groupomania Backend

On a utilisé Express pour créer notre projet NodeJs.

## Installation

Utiliser la commande suivante pour installer le projet

````
npm install
````


## Démarrage

### Locale

Il faut utiliser la commande suivante pour lancer notre application en locale.

````
nodemon server.js
````

### Variables d'environnements

Pour fonctionner notre Api a besoin de variables d'environnements. Il faut créer un fichier d'environnement à partr du fichier `.env.example` présent à la racine du répertoire back.

````
DB_URL=
DB_NAME=
DB_USER=
DB_PASSWORD=

RANDOM_TOKEN_SECRET=
````

Notre api fonctionne avec une base de données MySql. Une fois la base prête il faudra remplir les variables concernant l'url de la base, son nom, le nom d'un user et son mot de passe.

Enfin `RANDOM_TOKEN_SECRET` est une chaine de caratère aléatoire que l'on utilisera pour hasher les mots de passes des users.
