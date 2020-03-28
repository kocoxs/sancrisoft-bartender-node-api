const express = require("express")
const mysql = require('../models/index.js')

const router = new express.Router()

router.post('/login', async (req, res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        
        const user = await mysql.Users.findByCredentials({email, password})

        const token = await user.generateToken();

        res.send({user, token})

    } catch (error) {
        res.status(400).send()        
    }
})

module.exports = router;