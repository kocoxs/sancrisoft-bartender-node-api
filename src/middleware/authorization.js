const jwt = require("jsonwebtoken")
const { Users, Token } = require("../models")

const Authorization = async (req, res, next) => {
    
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const _token = await Token.findOne({
                where:  {
                    token
                },
                include: Users
            })

        if(!_token)
            throw new Error()
        
        req.user = _token.user

        next()

    } catch (error) {
        res.status(401).send({error: 'No estas autorizado'})
    }
}

module.exports = Authorization