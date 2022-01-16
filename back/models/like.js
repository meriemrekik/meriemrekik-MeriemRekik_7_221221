
module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        value: { type: Sequelize.STRING(255), allowNull: false, },
    });

    return Like;
};


