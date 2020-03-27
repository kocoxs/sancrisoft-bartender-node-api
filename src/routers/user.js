const express = require("express")

const router = new express.Router()

router.post('/login', async (req, res)=>{
    try {
        const email = req.body.email
        const password = req.body.password

        //const user = await User(req.body).findByCredentials({email, password})
        //const token = await user.generateToken();

        res.send({response: `Login`})

    } catch (error) {
        //console.log(error)
        res.status(400).send()        
    }
})

module.exports = router;