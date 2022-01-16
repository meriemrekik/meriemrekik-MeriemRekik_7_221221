const User = require('../db').user;

module.exports = (sequelize, Sequelize) => {
    const Publication = sequelize.define("publication", {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: Sequelize.STRING(255), allowNull: false, },
        description: { type: Sequelize.STRING(255), allowNull: false, },
        imageUrl: { type: Sequelize.STRING(255), allowNull: false, unique: true },
        // comments on les rajoutera dans la 
        // likes: {type: Sequelize., allowNull: false, unique: true   },
        // dislikes: {type: Sequelize.STRING(255), allowNull: false, unique: true   },
    });
    return Publication;
};


