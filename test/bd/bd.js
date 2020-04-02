const mysql = require('../../src/models')
const bycript = require("bcryptjs")

const userAdmin = {
    email: 'aaroncontreras1990@gmail.com',
    password: '123456789'
}

const setUpDB = async ( ) => {
   
    await mysql.sequelize.sync({ force: true });
    try {
        
        await mysql.Rol.create({name:'Administrator'})
        await mysql.Rol.create({name:'Bartender'})
        
        const pass = await bycript.hash('123456789', 8)
    
        const admin = await mysql.Users.create({
            email: 'aaroncontreras1990@gmail.com',
            password: pass,
            RolId: 1
        })

        await admin.generateToken();

        await mysql.Users.create({
            email: 'bartender@gmail.com',
            password: pass,
            RolId: 2
        })

        await mysql.Tips.create({name:'No tip', amount: 0.0})
        await mysql.Tips.create({name:'10%', amount: 0.1})
        await mysql.Tips.create({name:'20%', amount: 0.2})

    } catch (error) {
        console.log('ERROR: ', error)
    }

}

module.exports = {
    setUpDB,
    userAdmin
}