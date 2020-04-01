const express = require("express")
const Authorization = require('../middleware/authorization.js')
const mysql = require('../models/index.js')
const { Op } = require("sequelize");
const router = new express.Router()


const errorHandler = (error, req, res, next) => {
    res.status(400).send({error: error.message})
}

//POST      /order       Create New
/**
 * 
 * {
 *      "products" : [
 *          { "id" : 1 , "qty": 1},
 *          { "id" : 2 , "qty": 3},
 *      ],
 *      "tipId" : 1 
 * }
 * 
 */
router.post('/order', Authorization, async (req, res)=>{
    try {
        if(req.body.products && req.body.products.length > 0 && req.body.tipId && req.body.tipId !== ''){
            
            const products = req.body.products 
            const TipId = req.body.tipId
            const UserId = req.user.id
            const tip = await mysql.Tips.findByPk(TipId)
            
            if(!tip)
                throw new Error(`Tip does't exist`)

            let subTotal = 0
            
            //getting ids
            const productsid = products.map( (produc) => produc.id);

            const dbProducts = await mysql.Products.findAll({
                    where: {
                        id: productsid
                    }
                }
            );
            
            if(!dbProducts)
                throw new Error("There are no Products")

            const _productResult = dbProducts.map( (produc) => produc.id);

            //validar que todos los ids de los productos existan

            const isValid = productsid.every((product) => _productResult.includes(product))

            if(!isValid){
                throw new Error('There are invalid products ids')
            }
            
            dbProducts.forEach((product) => {
                subTotal += product.price * products.find((p) => p.id == product.id).qty
            });

            const total = tip.amount * subTotal + subTotal
            
            const order = await mysql.Orders.create({
                UserId,
                TipId,
                subTotal,
                total
            })

            if(!order)
                throw new Error('Error creating order')

            // Salvar los productos y cantidades
            let orderProducts = []
            
            for (let index = 0; index < products.length; index++) {
                let product = products[index];
                let item = await mysql.OrdersProducts.create({
                    OrderId: order.id,
                    ProductId: product.id,
                    quantity: product.qty
                })
                orderProducts.push(item)
            }

            if(orderProducts.length != products.length) { 
                //destroy order
                await order.destroy()
                for (let index = 0; index < orderProducts.length; index++) {
                    let item = orderProducts[index];
                    await item.destroy()
                }
                throw new Error("Error not all products were save")
            }
            
            const result = await mysql.Orders.findByPk(order.id,{
                include:[
                    { model:mysql.Tips },
                    { model:mysql.Users },
                    { 
                        model:mysql.OrdersProducts,
                        include:[
                            {model:mysql.Products}
                        ] 
                    }
                ]
            })
            
            res.send({result})
        }else{
            throw new Error("Los campos products y tipId son requeridos")
        }
    } catch (error) {
        res.status(400).send({error: error.message })
    }
},errorHandler);

router.get('/order', Authorization, async (req, res)=>{
    try {
        let query = {
            include:[
                { model:mysql.Tips },
                { model:mysql.Users },
                { 
                    model:mysql.OrdersProducts,
                    include:[
                        {model:mysql.Products}
                    ] 
                }
            ]
        }

        if(req.query.sortBy){
            const sortdir = req.query.sortDir.trim().toLowerCase() === 'asc' ? 'ASC'  : 'DESC'
            const order = [
                [req.query.sortBy, sortdir ]
            ]
            query.order = order
        }

        if(req.query.limit)
            query.limit = parseInt(req.query.limit)

        if(req.query.offset)
            query.offset = parseInt(req.query.offset)

        const orders = await mysql.Orders.findAll(query)

        res.send({
            orders
        })

    } catch (error) {
        //en caso de error borrar la imagen
        res.status(400).send({error: error.message })
    }
},errorHandler);

module.exports = router