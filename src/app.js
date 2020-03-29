const express = require('express')
const path = require('path')
const cors = require('cors')
require('./models/index.js')
const userRoutes = require('./routers/user.js')
const productRoutes = require('./routers/product.js')
const orderRoutes = require('./routers/order.js')

const app = express()

const corsOptions = { 
  origin: 'http://localhost:3000'
}

const publicDirectoryPath = path.join(__dirname,'../uploads/')

app.use(express.static(publicDirectoryPath))
app.use(cors(corsOptions))
app.use(express.json())
app.use(userRoutes)
app.use(productRoutes)
app.use(orderRoutes)

app.get('*', (req, res) => {
    res.send({
        error: 'Page Not Found 404'
    })
})

module.exports = app