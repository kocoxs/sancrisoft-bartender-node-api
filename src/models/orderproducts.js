module.exports = (sequelize, Sequelize) => {

    const OrdersProducts = sequelize.define("OrdersProducts", {
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    //belong to orders
    OrdersProducts.associate = function({Orders, Products}) {
        OrdersProducts.belongsTo(Orders);
        OrdersProducts.belongsTo(Products);
    };

    return OrdersProducts;
};