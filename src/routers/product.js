const express = require("express")
const Authorization = require('../middleware/authorization.js')

const router = new express.Router()

//POST      /product       Create New
router.post('/product', Authorization, async (req, res)=>{
    
    console.log(req.body)
    res.send({
        response: "Crear producto",
        data: req.body
    })

});

//PATCH     /product/:id   Update
router.patch('/product/:id', Authorization, async (req, res)=>{
    
    console.log(req.params)
    const id = req.params.id
    res.send({
        response: `Actualizar producto id: ${id}`,
        data: req.body
    })

});

//DELETE    /product/:id   Delete producto
router.delete('/product/:id', Authorization, async (req, res) => {
   
    console.log(req.params)
    const id = req.params.id
    res.send({
        response: `Eliminar producto id: ${id}`
    })
    
})

//GET       /product/:id   Single
router.get('/product/:id', Authorization, async (req, res)=>{
    
    console.log(req.params)
    const id = req.params.id
    res.send({
        response: `Seleccionar el producto id: ${id}`
    }) 

})

//GET       /product       All
router.get('/product/', Authorization, async (req, res)=>{
    
    res.send({
        response: `Todos los productos`
    }) 
       
})

module.exports = router;