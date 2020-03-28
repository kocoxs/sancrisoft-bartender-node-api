module.exports = (sequelize, Sequelize) => {

    const Tips = sequelize.define("Tips", {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        amount: {
            type: Sequelize.DECIMAL(4, 2),
            allowNull: false
        }
    });
    //has many orders
    Tips.associate = function({Orders}) {
        Tips.hasMany(Orders);
    };

    return Tips;
};