module.exports = (sequelize, Sequelize) => {

    const Products = sequelize.define("Products", {
        name: {
            type: Sequelize.STRING(200),
            allowNull: false,
            unique: true 
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false 
        },
        icon: {
            type: Sequelize.STRING(200),
            defaultValue: ''
        }
    });

    Products.associate = function({OrdersProducts}) {
        Products.hasMany(OrdersProducts);
    };

    return Products;
};