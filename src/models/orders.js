module.exports = (sequelize, Sequelize) => {

    const Orders = sequelize.define("Orders", {
        subTotal: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        total: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    });

    //belong to tips
    Orders.associate = function({Tips, Users, OrdersProducts}) {
        Orders.belongsTo(Tips);
        Orders.belongsTo(Users);
        Orders.hasMany(OrdersProducts);
    };

    return Orders;
};