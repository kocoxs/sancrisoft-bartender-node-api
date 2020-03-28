module.exports = (sequelize, Sequelize) => {

    const OrdersProducts = sequelize.define("OrdersProducts", {
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    //belong to orders
    OrdersProducts.associate = function({Orders}) {
        OrdersProducts.belongsTo(Orders);
    };
    //belongs to products
    OrdersProducts.associate = function({Products}) {
        OrdersProducts.belongsTo(Products);
    };

    return OrdersProducts;
};