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

    Users.associate = function({Rol, Token, Orders}) {
        Users.belongsTo(Rol);
        Users.hasMany(Token);
        Users.hasMany(Orders);
    };

    Users.findByCredentials = async ({email = '', password = ''}) =>  {

        if(email === '' || password === '')
            throw new Error ("Datos invalidos 1")

        const result =  await Users.findOne({
            where: { email },
            include:[{ model: sequelize.models.Rol }]
        })
        
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

    Users.prototype.toJSON =  function () {
        let values = Object.assign({}, this.get());
        delete values.password;
        return values;
    }

    return Users;
};