var Sequelize = require('sequelize');
const config = require('./config');

// Config de la base de donnnées
const dbConfig = {
    HOST: config.dbUrl,
    USER: config.dbUser,
    PASSWORD: config.dbPass,
    DB: config.dbName,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

// On crée une instance de Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// Objet db que l'on va importer dans les fichier où on va manipuler des éléments liés à la base de données
const db = {};
// On y stock la lib de Sequelize en générale
db.Sequelize = Sequelize;
// On y stock l'instance de sequilize que l'on a crée
db.sequelize = sequelize;

// On importe notre table  dansl'instance sequelize
db.user = require("./models/user.js")(sequelize, Sequelize);

// on importe notre table publication dans notre instance Sequelize
db.publication = require("./models/publication.js")(sequelize, Sequelize);
// Je crée une relation entre un user et sa publication, et on mentionne bien que si on supprime un joueur
// alors on aura la suppression des publications relié à ce user 
db.publication.belongsTo(db.user, { onDelete: 'CASCADE', foreignKey: { allowNull: false } });

// on importe notre model de commentaire dans notre instance de sequelize
db.comment = require("./models/comment.js")(sequelize, Sequelize);
// Chaque commentaire est relié à une publication et un joueur 
db.comment.belongsTo(db.publication, { onDelete: 'CASCADE', foreignKey: { allowNull: false } });
db.comment.belongsTo(db.user);

// on importe notre model de like dans notre instance de Sequelize
db.like = require("./models/like.js")(sequelize, Sequelize);
// Chaque like est lié à une publication et un seul user
db.like.belongsTo(db.publication, { onDelete: 'CASCADE', foreignKey: { allowNull: false } });
db.like.belongsTo(db.user);

module.exports = db;