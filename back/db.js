var Sequelize = require('sequelize');
const config = require('./config');

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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./models/user.js")(sequelize, Sequelize);

db.publication = require("./models/publication.js")(sequelize, Sequelize);
db.publication.belongsTo(db.user, { onDelete: 'CASCADE', foreignKey: { allowNull: false } });

db.comment = require("./models/comment.js")(sequelize, Sequelize);
db.comment.belongsTo(db.publication, { onDelete: 'CASCADE', foreignKey: { allowNull: false } });
db.comment.belongsTo(db.user);

db.like = require("./models/like.js")(sequelize, Sequelize);
db.like.belongsTo(db.publication, { onDelete: 'CASCADE', foreignKey: { allowNull: false } });
db.like.belongsTo(db.user);

module.exports = db;