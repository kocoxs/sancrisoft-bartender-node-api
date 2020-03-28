const bycript = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = (sequelize, Sequelize) => {   

    const Users = sequelize.define("Users", {
        email: {
            type: Sequelize.STRING(50),
            unique: true
        },
        password: {
            type: Sequelize.STRING(100)
        }
    });

    Users.associate = function({Rol}) {
        Token.belongsTo(Rol);
    };

    Users.associate = function({Token}) {
        Users.hasMany(Token);
    };

    Users.findByCredentials = async ({email = '', password = ''}) =>  {

        if(email === '' || password === '')
            throw new Error ("Datos invalidos 1")

        const result =  await Users.findOne({where: { email }})
        
        if(!result)
            throw new Error ("Datos invalidos 2")

        const isValid =  await bycript.compare(password, result.password)

        console.group('isValid:', isValid)

        if(!isValid)
            throw new Error ("Datos invalidos 3")

        return result;
    }

    Users.prototype.generateToken = async function () {
        
        const token = jwt.sign({id: this.id.toString() }, process.env.JWT_SECRET)

        const { Token } = sequelize.models;

        const _token = await Token.create({token})

        await this.addToken(_token)
    
        return token
    }

    return Users;
};