module.exports = (sequelize, Sequelize) => {
    const Rol = sequelize.define("Rol", {
        name: {
            type: Sequelize.STRING(50),
            unique: true
        }
    });

    Rol.associate = function({Users}) {
        Rol.hasMany(Users);
    };

    return Rol;
};