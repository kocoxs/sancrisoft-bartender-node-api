const request = require('supertest')
const app = require('../src/app.js')
const mysql = require('../src/models')
const path = require('path')
const { setUpDB } = require('./bd/bd.js') 

//beforeEach(setUpDB)

test('crear producto con imagen', async () =>{
    const user = await mysql.Users.findByPk(1,{
        include: [
            {model: mysql.Token}
        ]
    })

    const filepath = path.join(__dirname,'./asset/martini.png')

    const response = await request(app)
    .post('/product')
    .set('Authorization', `Bearer ${user.Tokens[0].token}`)
    .attach("icon", filepath)
    .field("name", "martini")
    .field("price", "2.55")
    .expect(200)

    const product = await mysql.Products.findByPk(response.body.product.id)

    expect(product).not.toBeNull()
    expect(product.name).toBe("martini")
    expect(product.price).toBe("2.55")
    
})
