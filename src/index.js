const app = require('./app.js')

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Servidor esta corriendo en el puerto: ${port}`)
})