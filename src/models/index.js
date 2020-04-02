const fs        = require('fs');
const path      = require('path');
const Sequelize = require("sequelize");
const bycript   = require("bcryptjs")
const basename  = path.basename(__filename)

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: false,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}); 

const db = {};


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const syncDataBase = async () => {
    //sync modelos
    await db.sequelize.sync({force: true});
}

const createDummyData = async () => { 
    await db.sequelize.sync({ force: true });
    try {
        await db.Rol.create({name:'Administrator'})
        await db.Rol.create({name:'Bartender'})
        
        const pass = await bycript.hash('123456789', 8)
    
        await db.Users.create({
            email: 'aaroncontreras1990@gmail.com',
            password: pass,
            RolId: 1
        })

        await db.Users.create({
            email: 'bartender@gmail.com',
            password: pass,
            RolId: 2
        })

        await db.Tips.create({name:'No tip', amount: 0.0})
        await db.Tips.create({name:'10%', amount: 0.1})
        await db.Tips.create({name:'20%', amount: 0.2})

    } catch (error) {
        console.log('ERROR: ', error)
    }
}


//syncDataBase()
//createDummyData()

module.exports = db