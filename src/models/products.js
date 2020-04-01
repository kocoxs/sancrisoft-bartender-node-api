module.exports = (sequelize, Sequelize) => {

    const Products = sequelize.define("Products", {
        name: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false 
        },
        icon: {
            type: Sequelize.STRING(200),
            defaultValue: ''
        },
        status:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1 
        }
    });

    Products.associate = function({OrdersProducts}) {
        Products.hasMany(OrdersProducts);
    };

    return Products;
};