module.exports = (sequelize, Sequelize) => {
    

    const Token = sequelize.define("Token", {
        token: {
            type: Sequelize.STRING(200)
        }
    });

    Token.associate = function({Users}) {
        Token.belongsTo(Users);
    };

    return Token;
};