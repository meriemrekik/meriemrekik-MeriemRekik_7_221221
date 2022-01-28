# Projet Groupomania Backend

On a utilisé Express pour créer notre projet NodeJs.

## Installation

Utiliser la commande suivante pour installer le projet

````
npm install
````


## Démarrage

### Variables d'environnements

Pour fonctionner notre Api a besoin de variables d'environnements. Il faut créer un fichier d'environnement à partr du fichier `.env.example` présent à la racine du répertoire back.

````
DB_URL="url_base_de_donnees"
DB_NAME="nom_base_donnees" 
DB_USER="user_base_donnee"
DB_PASSWORD="password_base_donnees"

RANDOM_TOKEN_SECRET="chaine_caractere_aleatoire"
````

Notre api fonctionne avec une base de données MySql. Une fois la base prête il faudra remplir les variables concernant l'url de la base, son nom, le nom d'un user et son mot de passe.

Enfin `RANDOM_TOKEN_SECRET` est une chaine de caratère aléatoire que l'on utilisera pour hasher les mots de passes des users.

### Base de données

Nous avons utilisés une base de données MySQL pour ce projet. Dans le code de l'application on a utilisé l'ORM Sequelize pour gérer la création des tables et des relations entre elles.

Lors du démarrage de l'application et pour permettre la création des tables il faut dans le [fichier](https://github.com/meriemrekik/meriemrekik-MeriemRekik_7_221221/blob/cda97f03b6ecdd0d18ca70bb2dd293eb31f8703c/back/server.js#L49) `server.js`  mettre à `true` la variable permettant de forcer la synchronisation.

````
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
````

On vérifie alors que les tables ont bien été crée en base de données. Si c'est le cas on revient sur notre script et on repasse la variable à `false`.

````
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});
````

En effet si on laisse cette variable à `true` n'importe quel modification de nos models executera la synchronisation qui efface le contenu des tables.

### Locale

Il faut utiliser la commande suivante pour lancer notre application en locale.

````
nodemon server.js
````

Notre api est alors disponible sur à l'adresse [http://localhost:3000](http://localhost:3000)