const express = require("express")
const mysql = require('../models/index.js')
const Authorization = require('../middleware/authorization.js')
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

router.post('/logout', Authorization, async (req, res)=>{
    try {
        
        req.token.destroy()
        const user = req.user;
        res.send({user})

    } catch (error) {
        res.status(400).send()        
    }
})

module.exports = router;