const express = require("express")
const multer = require('multer')
const Authorization = require('../middleware/authorization.js')
const mysql = require('../models/index.js')
const router = new express.Router()
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products');
    },
    filename: function (req, file, cb) {
        const datetimestamp = Date.now();
        cb(null, datetimestamp + '-' + file.originalname)
    }
})
 

const upload = multer({
    storage,
    limits:{
        fileSize: 1048576
    },
    fileFilter(req, file, cb){

        if(!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)){
            cb(new Error('The file must be one of jpg/jpeg/png/svg '))
        }

        cb(undefined, true)

    }
})

const errorHandler = (error, req, res, next) => {
    res.status(400).send({error: error.message})
}

//POST      /product       Create New
router.post('/product', Authorization, upload.single('icon'), async (req, res)=>{

    const name = req.body.name
    const price = req.body.price ? parseFloat(req.body.price) : 0 
    const icon = req.file ? req.file.filename : ''

    try {
        
        const product = await mysql.Products.create({ name, price, icon })
    
        res.send({
            product
        })

    } catch (error) {
        
        if(req.file)
            fs.unlinkSync(req.file.path)

        res.status(400).send({error: error.message })
    }

}, errorHandler);

//PATCH     /product/:id   Update
router.patch('/product/:id', Authorization, upload.single('icon'), async (req, res)=>{
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'price']
    
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        return res.status(400).send({error: 'Field not valid'})
    }

    const id = req.params.id

    try {
        //seleccionar producto
        const product = await mysql.Products.findByPk(id)

        if(!product)
            throw new Error('Product doesnt exist')

        //actualizar datos
        req.body.name && req.body.name !== '' & (product.name = req.body.name)
        req.body.price && req.body.price !== '' & (product.price = parseFloat(req.body.price))

        if(req.file){
            const icon = req.file ? req.file.filename : ''
            //en caso de actualizar icono borrar el viejo
            fs.unlinkSync(`uploads/products/${product.icon}`)
            product.icon = icon
        }

        product.save();

        res.send({
            product
        })
    } catch (error) {
        //en caso de error borrar la imagen
        if(req.file)
            fs.unlinkSync(req.file.path)
        res.status(400).send({error: error.message })
    }

    

}, errorHandler);

//DELETE    /product/:id   Delete producto
router.delete('/product/:id', Authorization, async (req, res) => {
   
    try {
        const id = req.params.id
        //seleccionar producto
        const product = await mysql.Products.findByPk(id)

        if(!product)
            throw new Error('Product doesnt exist')

        product.status = 0

        await product.save();
        //await product.destroy()

        res.send({
            product
        })

    } catch (error) {
        //en caso de error borrar la imagen
        res.status(400).send({error: error.message })
    }
})

//GET       /product/:id   Single
router.get('/product/:id', Authorization, async (req, res)=>{
    
    try {
        
        const product = await mysql.Products.findByPk(req.params.id)

        if(!product)
            throw new Error('Product doesnt exist')

        res.send({
            product
        })

    } catch (error) {
        //en caso de error borrar la imagen
        res.status(400).send({error: error.message })
    }

})

//GET       /product       All
//GET       /product?offset=10
//GET       /product?limit=10
//GET       /product?sortBy=field
//GET       /product?sortDir=ASC/DESC
router.get('/product/', Authorization, async (req, res)=>{
    
    try {
        let query = {
            where: {
                status:1
            }
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

        const products = await mysql.Products.findAll(query)

        res.send({
            products
        })

    } catch (error) {
        //en caso de error borrar la imagen
        res.status(400).send({error: error.message })
    }
       
})

module.exports = router;