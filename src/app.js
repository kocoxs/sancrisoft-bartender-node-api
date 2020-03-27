const express = require('express')

//require('./db/mongoose.js')
const userRoutes = require('./routers/user.js')
const productRoutes = require('./routers/product.js')

const app = express()

app.use(express.json())
app.use(userRoutes)
app.use(productRoutes)

module.exports = app