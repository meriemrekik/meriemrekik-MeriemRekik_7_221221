
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        password: { type: Sequelize.STRING(255), allowNull: false, },
        nom: { type: Sequelize.STRING(255), allowNull: false, },
        prenom: { type: Sequelize.STRING(255), allowNull: false, },
        email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
    });

    return User;
};


