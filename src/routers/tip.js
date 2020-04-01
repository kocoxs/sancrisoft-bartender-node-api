const express = require("express")
const mysql = require('../models/index.js')
const Authorization = require('../middleware/authorization.js')
const router = new express.Router()

router.get('/tips', Authorization, async (req, res)=>{
    try {
        
        const tips = await mysql.Tips.findAll()

        res.send({tips})

    } catch (error) {
        res.status(400).send()        
    }
})

module.exports = router;