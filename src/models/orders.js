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
    Orders.associate = function({Tips}) {
        Orders.belongsTo(Tips);
    };
    //belongs to user
    Orders.associate = function({Users}) {
        Orders.belongsTo(Users);
    };
    //has many productsorder
    Orders.associate = function({OrdersProducts}) {
        Orders.hasMany(OrdersProducts);
    };

    return Orders;
};