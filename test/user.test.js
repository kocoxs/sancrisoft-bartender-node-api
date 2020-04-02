const request = require('supertest')
const app = require('../src/app.js')
const mysql = require('../src/models')
const { setUpDB, userAdmin } = require('./bd/bd.js') 


beforeEach(setUpDB)

test('hacer login y verificar que el token pertenezca al usuario', async () =>{
    const response = await request(app).post('/login').send({
        email: userAdmin.email,
        password: userAdmin.password
    }).expect(200)

    const token = await mysql.Token.findOne({
        where : {
            token: response.body.token
        }
    })
    
    expect(token.UserId).toBe(response.body.user.id)
})

test('No debe logear usuarios que que tengan mal los datos', async () => {
    await request(app).post('/login').send({
        email: 'anything@anything.com',
        password: 'password'
    }).expect(400)
})