const express = require("express")

const router = new express.Router()

//POST      /product       Create New
router.post('/product', async (req, res)=>{
    
    console.log(req.body)
    res.send({
        response: "Crear producto",
        data: req.body
    })

});

//PATCH     /product/:id   Update
router.patch('/product/:id', async (req, res)=>{
    
    console.log(req.params)
    const id = req.params.id
    res.send({
        response: `Actualizar producto id: ${id}`,
        data: req.body
    })

});

//DELETE    /product/:id   Delete producto
router.delete('/product/:id', async (req, res) => {
   
    console.log(req.params)
    const id = req.params.id
    res.send({
        response: `Eliminar producto id: ${id}`
    })
    
})

//GET       /product/:id   Single
router.get('/product/:id', async (req, res)=>{
    
    console.log(req.params)
    const id = req.params.id
    res.send({
        response: `Seleccionar el producto id: ${id}`
    }) 

})

//GET       /product       All
router.get('/product/', async (req, res)=>{
    
    res.send({
        response: `Todos los productos`
    }) 
       
})

module.exports = router;