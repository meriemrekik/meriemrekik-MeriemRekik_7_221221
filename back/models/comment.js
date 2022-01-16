
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        content: { type: Sequelize.STRING(255), allowNull: false, },
    });

    return Comment;
};


